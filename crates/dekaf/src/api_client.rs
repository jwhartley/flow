use anyhow::{anyhow, bail, Context};
use bytes::{Bytes, BytesMut};
use deadpool::managed::{self, Manager, Metrics, PoolError, RecycleResult};
use futures::{lock::Mutex, Sink, StreamExt};
use futures::{SinkExt, Stream, TryStreamExt};
use kafka_protocol::{
    error::ParseResponseErrorCode,
    indexmap::IndexMap,
    messages::{
        api_versions_response::ApiVersion, create_topics_request::CreatableTopic,
        metadata_request::MetadataRequestTopic, ApiKey, ApiVersionsRequest, ApiVersionsResponse,
        CreateTopicsRequest, FindCoordinatorRequest, MetadataRequest, RequestHeader,
        ResponseHeader, SaslAuthenticateRequest, SaslHandshakeRequest, TopicName,
    },
    protocol::{Decodable, Encodable, Request, StrBytes},
};
use rsasl::{config::SASLConfig, mechname::Mechname, prelude::SASLClient};
use std::{boxed::Box, collections::HashMap, fmt::Debug, io, time::Duration};
use std::{io::BufWriter, pin::Pin, sync::Arc};
use tokio::net::TcpStream;
use tokio_rustls::{
    rustls::{pki_types::ServerName, ClientConfig, RootCertStore},
    TlsConnector,
};
use tracing::instrument;
use url::Url;

trait StreamSink<I = Bytes, O = BytesMut, E = std::io::Error>:
    Stream<Item = Result<O, E>> + Sink<I, Error = E> + Unpin + Send
{
}

impl<T, I, O, E> StreamSink<I, O, E> for T where
    T: Stream<Item = Result<O, E>> + Sink<I, Error = E> + Unpin + Send
{
}

struct BoxedKafkaConnection(Pin<Box<dyn StreamSink<Bytes, BytesMut, io::Error> + Send + Unpin>>);

impl Stream for BoxedKafkaConnection {
    type Item = io::Result<BytesMut>;

    fn poll_next(
        mut self: Pin<&mut Self>,
        cx: &mut std::task::Context<'_>,
    ) -> std::task::Poll<Option<Self::Item>> {
        self.0.poll_next_unpin(cx)
    }
}

impl Sink<Bytes> for BoxedKafkaConnection {
    type Error = io::Error;

    fn poll_ready(
        mut self: Pin<&mut Self>,
        cx: &mut std::task::Context<'_>,
    ) -> std::task::Poll<Result<(), Self::Error>> {
        self.0.poll_ready_unpin(cx)
    }

    fn start_send(mut self: Pin<&mut Self>, item: Bytes) -> Result<(), Self::Error> {
        self.0.start_send_unpin(item)
    }

    fn poll_flush(
        mut self: Pin<&mut Self>,
        cx: &mut std::task::Context<'_>,
    ) -> std::task::Poll<Result<(), Self::Error>> {
        self.0.poll_flush_unpin(cx)
    }

    fn poll_close(
        mut self: Pin<&mut Self>,
        cx: &mut std::task::Context<'_>,
    ) -> std::task::Poll<Result<(), Self::Error>> {
        self.0.poll_close_unpin(cx)
    }
}

#[tracing::instrument(skip_all)]
async fn async_connect(broker_url: &str) -> anyhow::Result<BoxedKafkaConnection> {
    // Establish a TCP connection to the Kafka broker

    let parsed_url = Url::parse(broker_url)?;

    let mut root_cert_store = RootCertStore::empty();
    root_cert_store.extend(webpki_roots::TLS_SERVER_ROOTS.iter().cloned());

    let tls_config = ClientConfig::builder()
        .with_root_certificates(root_cert_store)
        .with_no_client_auth();

    let tls_connector = TlsConnector::from(Arc::new(tls_config));

    let hostname = parsed_url
        .host()
        .ok_or(anyhow!("Broker URL must contain a hostname"))?;
    let port = parsed_url.port().unwrap_or(9092);
    let dnsname = ServerName::try_from(hostname.to_string())?;

    tracing::debug!(port = port,host = ?hostname, "Attempting to connect");
    let tcp_stream = TcpStream::connect(format!("{hostname}:{port}")).await?;

    // Let's keep this stream alive
    let sock_ref = socket2::SockRef::from(&tcp_stream);
    let ka = socket2::TcpKeepalive::new()
        .with_time(Duration::from_secs(20))
        .with_interval(Duration::from_secs(20));
    sock_ref.set_tcp_keepalive(&ka)?;

    let stream = tls_connector.connect(dnsname, tcp_stream).await?;
    tracing::debug!(port = port,host = ?hostname, "Connection established");

    // https://kafka.apache.org/protocol.html#protocol_common
    // All requests and responses originate from the following:
    // > RequestOrResponse => Size (RequestMessage | ResponseMessage)
    // >   Size => int32
    let framed = tokio_util::codec::Framed::new(
        stream,
        tokio_util::codec::LengthDelimitedCodec::builder()
            .big_endian()
            .length_field_length(4)
            .max_frame_length(1 << 27) // 128 MiB
            .new_codec(),
    );

    Ok(BoxedKafkaConnection(Box::pin(framed)))
}

#[tracing::instrument(skip_all)]
async fn get_supported_sasl_mechanisms(
    params: &KafkaConnectionParams,
) -> anyhow::Result<Vec<String>> {
    // In order to pick the best method to use, we need to know the options supported by the server.
    // `SaslHandshakeResponse` contains this list, but you have to send a `SaslHandshakeRequest` to get it,
    // and if you send an invalid mechanism, Kafka will close the connection. So we need to open a throw-away
    // connection and send an invalid `SaslHandshakeRequest` all in order to discover the supported mechanisms.
    let mut new_conn = async_connect(&params.broker_url)
        .await
        .map_err(|e| io::Error::other(e))?;

    let discovery_handshake_req = SaslHandshakeRequest::default();

    let handshake_resp = send_request(&mut new_conn, discovery_handshake_req, None).await?;

    let offered_mechanisms: Vec<_> = handshake_resp
        .mechanisms
        .iter()
        .cloned()
        .map(|m| m.to_string())
        .collect();

    tracing::debug!(
        mechanisms = ?offered_mechanisms,
        "Discovered supported SASL mechanisms"
    );

    Ok(offered_mechanisms)
}

#[tracing::instrument(skip_all)]
async fn send_request<Req: Request + Debug, S: StreamSink>(
    conn: &mut S,
    req: Req,
    header: Option<RequestHeader>,
) -> anyhow::Result<Req::Response> {
    let mut req_buf = BytesMut::new();

    let req_api_key = ApiKey::try_from(Req::KEY).expect("API key should exist");

    let request_header = match header {
        Some(h) => h,
        None => RequestHeader::default()
            .with_request_api_key(Req::KEY)
            .with_request_api_version(Req::VERSIONS.max),
    };

    request_header.encode(
        &mut req_buf,
        Req::header_version(request_header.request_api_version),
    )?;

    tracing::debug!(api_key_name=?req_api_key, api_key=Req::KEY, api_version=request_header.request_api_version, "Sending request");

    req.encode(&mut req_buf, request_header.request_api_version)?;

    // Then write the message
    conn.send(req_buf.freeze()).await?;

    // Now we can read the whole message. Let's not worry about streaming this
    // for the moment. I don't think we'll get messages large enough to cause
    // issues with memory consumption... but I've been wrong about that before.
    let mut response_frame = conn
        .try_next()
        .await?
        .context("connection unexpectedly closed")?;

    let response_header_version =
        req_api_key.response_header_version(request_header.request_api_version);

    let resp_header = ResponseHeader::decode(&mut response_frame, response_header_version).unwrap();

    tracing::debug!(response_header_version, resp_header=?resp_header, "Got response header");

    let resp = Req::Response::decode(&mut response_frame, request_header.request_api_version)?;

    Ok(resp)
}

#[tracing::instrument(skip_all)]
async fn sasl_auth<S: StreamSink>(
    conn: &mut S,
    args: &KafkaConnectionParams,
) -> anyhow::Result<()> {
    let sasl = SASLClient::new(args.sasl_config.clone());

    let mechanisms = get_supported_sasl_mechanisms(args).await?;

    let maybe_offered_mechanisms: Result<Vec<_>, _> = mechanisms
        .iter()
        .map(|m| Mechname::parse(m.as_str().as_bytes()))
        .collect();

    let offered_mechanisms = maybe_offered_mechanisms?;

    // select the best offered mechanism that the user enabled in the `config`
    let mut session = sasl.start_suggested(offered_mechanisms.iter())?;

    let selected_mechanism = session.get_mechname().as_str().to_owned();

    tracing::debug!(mechamism=?selected_mechanism, "Starting SASL request with handshake");

    // Now we know which mechanism we want to request
    let handshake_req = SaslHandshakeRequest::default()
        .with_mechanism(StrBytes::from_utf8(Bytes::from(selected_mechanism))?);

    let handshake_resp = send_request(conn, handshake_req, None).await?;

    if handshake_resp.error_code > 0 {
        let err = kafka_protocol::ResponseError::try_from_code(handshake_resp.error_code)
            .map(|code| format!("{code:?}"))
            .unwrap_or(format!("Unknown error {}", handshake_resp.error_code));
        bail!(
            "Error performing SASL handshake: {err}. Supported mechanisms: {:?}",
            handshake_resp.mechanisms
        );
    }

    let mut state_buf = BufWriter::new(Vec::new());
    let mut state = session.step(None, &mut state_buf)?;

    // SASL can happen over multiple steps
    while state.is_running() {
        let authenticate_request = SaslAuthenticateRequest::default()
            .with_auth_bytes(Bytes::from(state_buf.into_inner()?));

        let auth_resp = send_request(conn, authenticate_request, None).await?;

        if auth_resp.error_code > 0 {
            let err = kafka_protocol::ResponseError::try_from_code(handshake_resp.error_code)
                .map(|code| format!("{code:?}"))
                .unwrap_or(format!("Unknown error {}", handshake_resp.error_code));
            bail!(
                "Error performing SASL authentication: {err} {:?}",
                auth_resp.error_message
            )
        }
        let data = Some(auth_resp.auth_bytes.to_vec());
        state_buf = BufWriter::new(Vec::new());
        state = session.step(data.as_deref(), &mut state_buf)?;
    }

    tracing::debug!("Successfully completed SASL flow");

    Ok(())
}

#[derive(Clone)]
struct KafkaConnectionParams {
    broker_url: String,
    sasl_config: Arc<SASLConfig>,
}

impl Manager for KafkaConnectionParams {
    type Type = BoxedKafkaConnection;
    type Error = anyhow::Error;

    async fn create(&self) -> Result<BoxedKafkaConnection, anyhow::Error> {
        tracing::debug!("Attempting to establish a new connection!");
        let mut conn = async_connect(&self.broker_url).await?;
        tracing::debug!("Authenticating opened connection");
        sasl_auth(&mut conn, self).await?;
        tracing::debug!("Finished authenticating opened connection");
        Ok(conn)
    }

    async fn recycle(
        &self,
        _: &mut BoxedKafkaConnection,
        _: &Metrics,
    ) -> RecycleResult<anyhow::Error> {
        Ok(())
    }
}

type Pool = managed::Pool<KafkaConnectionParams>;

/// Exposes a low level Kafka wire protocol client. Used when we need to
/// make API calls at the wire protocol level, as opposed to higher-level producer/consumer
/// APIs that Kafka client libraries usually expose. Currently used to serve
/// the group management protocol requests by proxying to a real Kafka broker.
#[derive(Clone)]
pub struct KafkaApiClient {
    /// A raw IO stream to the Kafka broker.
    pool: Pool,
    url: String,
    sasl_config: Arc<SASLConfig>,
    versions: ApiVersionsResponse,
    coordinators: Arc<Mutex<HashMap<String, KafkaApiClient>>>,
}

impl KafkaApiClient {
    #[instrument(name = "api_client_connect", skip(sasl_config))]
    pub async fn connect(broker_url: &str, sasl_config: Arc<SASLConfig>) -> anyhow::Result<Self> {
        let pool = Pool::builder(KafkaConnectionParams {
            broker_url: broker_url.to_owned(),
            sasl_config: sasl_config.clone(),
        })
        .build()?;

        let mut conn = match pool.get().await {
            Ok(c) => c,
            Err(PoolError::Backend(e)) => return Err(e),
            Err(e) => {
                anyhow::bail!(e)
            }
        };

        let versions = send_request(
            conn.as_mut(),
            ApiVersionsRequest::default()
                .with_client_software_name(StrBytes::from_static_str("Dekaf"))
                .with_client_software_version(StrBytes::from_static_str("1.0")),
            None,
        )
        .await?;
        match versions.error_code.err() {
            None => {}
            Some(e) => bail!("Error connecting to broker: {e}"),
        };
        tracing::debug!(versions=?versions,"Got supported versions");
        drop(conn);

        Ok(Self {
            pool,
            url: broker_url.to_string(),
            sasl_config: sasl_config,
            versions,
            coordinators: Arc::new(Mutex::new(HashMap::new())),
        })
    }

    /// Send a request and wait for the response. Per Kafka wire protocol docs:
    /// The server guarantees that on a single TCP connection, requests will be processed in the order
    /// they are sent and responses will return in that order as well. The broker's request processing
    /// allows only a single in-flight request per connection in order to guarantee this ordering.
    /// https://kafka.apache.org/protocol.html
    pub async fn send_request<Req: Request + Debug>(
        &self,
        req: Req,
        header: Option<RequestHeader>,
    ) -> anyhow::Result<Req::Response> {
        // TODO: This could be optimized by pipelining.
        let mut conn = match self.pool.get().await {
            Ok(c) => c,
            Err(PoolError::Backend(e)) => return Err(e),
            Err(e) => {
                anyhow::bail!(e)
            }
        };

        send_request(conn.as_mut(), req, header).await
    }

    #[instrument(skip(self))]
    pub async fn connect_to_group_coordinator(&self, key: &str) -> anyhow::Result<KafkaApiClient> {
        let mut coordinators = self.coordinators.clone().lock_owned().await;
        match coordinators.get(key) {
            None => {
                // RedPanda only support v3 of this request
                let req = FindCoordinatorRequest::default()
                    .with_key(StrBytes::from_string(key.to_string()))
                    // https://github.com/apache/kafka/blob/trunk/clients/src/main/java/org/apache/kafka/common/requests/FindCoordinatorRequest.java#L119
                    .with_key_type(0); // 0: consumer, 1: transaction

                let resp = self
                    .send_request(
                        req,
                        Some(
                            RequestHeader::default()
                                .with_request_api_key(FindCoordinatorRequest::KEY)
                                .with_request_api_version(3),
                        ),
                    )
                    .await?;

                let (coord_host, coord_port) = if resp.coordinators.len() > 0 {
                    let coord = resp.coordinators.get(0).expect("already checked length");
                    (coord.host.as_str(), coord.port)
                } else {
                    (resp.host.as_str(), resp.port)
                };

                let coord_url = format!("tcp://{}:{}", coord_host.to_string(), coord_port);

                Ok(
                    if coord_url.eq(self.url.as_str())
                        || (coord_host.len() == 0 && coord_port == -1)
                    {
                        coordinators.insert(key.to_string(), self.clone());
                        self.to_owned()
                    } else {
                        let mut coord = Self::connect(&coord_url, self.sasl_config.clone()).await?;
                        coord.coordinators = self.coordinators.clone();
                        coordinators.insert(key.to_string(), coord.clone());
                        coord
                    },
                )
            }
            Some(coord) => Ok(coord.clone()),
        }
    }

    #[instrument(skip(self))]
    pub async fn connect_to_controller(&self) -> anyhow::Result<KafkaApiClient> {
        let req = MetadataRequest::default();
        let resp = self.send_request(req, None).await?;

        let controller = resp
            .brokers
            .get(&resp.controller_id)
            .context("Failed to find controller")?;

        let controller_url = format!("tcp://{}:{}", controller.host.to_string(), controller.port);

        Ok(if controller_url.eq(self.url.as_str()) {
            self.to_owned()
        } else {
            let mut controller_client =
                Self::connect(&controller_url, self.sasl_config.clone()).await?;
            controller_client.coordinators = self.coordinators.clone();
            controller_client
        })
    }

    pub fn supported_versions<R: Request>(&self) -> anyhow::Result<ApiVersion> {
        let api_key = R::KEY;

        let version = self
            .versions
            .api_keys
            .get(&api_key)
            .context(format!("Unknown API key {api_key}"))?;

        Ok(version.to_owned())
    }

    #[instrument(skip_all)]
    pub async fn ensure_topics(&self, topic_names: Vec<TopicName>) -> anyhow::Result<()> {
        let req = MetadataRequest::default()
            .with_topics(Some(
                topic_names
                    .iter()
                    .map(|name| MetadataRequestTopic::default().with_name(Some(name.clone())))
                    .collect(),
            ))
            .with_allow_auto_topic_creation(true);

        let coord = self.connect_to_controller().await?;
        let resp = coord.send_request(req, None).await?;
        tracing::debug!(metadata=?resp, "Got metadata response");

        if resp
            .topics
            .iter()
            .all(|(name, topic)| topic_names.contains(&name) && topic.error_code == 0)
        {
            return Ok(());
        } else {
            let mut topics_map = IndexMap::new();
            for topic_name in topic_names.into_iter() {
                topics_map.insert(
                    topic_name,
                    CreatableTopic::default()
                        .with_replication_factor(2)
                        .with_num_partitions(-1),
                );
            }
            let create_req = CreateTopicsRequest::default().with_topics(topics_map);
            let create_resp = coord.send_request(create_req, None).await?;
            tracing::debug!(create_response=?create_resp, "Got create response");

            for (name, topic) in create_resp.topics {
                if topic.error_code > 0 {
                    let err = kafka_protocol::ResponseError::try_from_code(topic.error_code);
                    tracing::warn!(
                        topic = name.to_string(),
                        error = ?err,
                        message = topic.error_message.map(|m|m.to_string()),
                        "Failed to create topic"
                    );
                    bail!("Failed to create topic");
                }
            }

            Ok(())
        }
    }
}