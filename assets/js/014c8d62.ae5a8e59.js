"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[9184],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>k});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var d=a.createContext({}),s=function(e){var t=a.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=s(e.components);return a.createElement(d.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,d=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),c=s(n),u=r,k=c["".concat(d,".").concat(u)]||c[u]||m[u]||l;return n?a.createElement(k,i(i({ref:t},p),{},{components:n})):a.createElement(k,i({ref:t},p))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=u;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o[c]="string"==typeof e?e:r,i[1]=o;for(var s=2;s<l;s++)i[s]=n[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1358:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var a=n(7462),r=(n(7294),n(3905));const l={sidebar_position:3},i="Elasticsearch",o={unversionedId:"reference/Connectors/materialization-connectors/Elasticsearch",id:"reference/Connectors/materialization-connectors/Elasticsearch",title:"Elasticsearch",description:"This connector materializes Flow collections into indices in an Elasticsearch cluster.",source:"@site/docs/reference/Connectors/materialization-connectors/Elasticsearch.md",sourceDirName:"reference/Connectors/materialization-connectors",slug:"/reference/Connectors/materialization-connectors/Elasticsearch",permalink:"/reference/Connectors/materialization-connectors/Elasticsearch",draft:!1,editUrl:"https://github.com/estuary/flow/edit/master/site/docs/reference/Connectors/materialization-connectors/Elasticsearch.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Apache Parquet in S3",permalink:"/reference/Connectors/materialization-connectors/Parquet"},next:{title:"Firebolt",permalink:"/reference/Connectors/materialization-connectors/Firebolt"}},d={},s=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Properties",id:"properties",level:3},{value:"Endpoint",id:"endpoint",level:4},{value:"Bindings",id:"bindings",level:4},{value:"Sample",id:"sample",level:3},{value:"Delta updates",id:"delta-updates",level:2}],p={toc:s},c="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(c,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"elasticsearch"},"Elasticsearch"),(0,r.kt)("p",null,"This connector materializes Flow collections into indices in an Elasticsearch cluster."),(0,r.kt)("p",null,"It is available for use in the Flow web application. For local development or open-source workflows, ",(0,r.kt)("a",{parentName:"p",href:"https://ghcr.io/estuary/materialize-elasticsearch:dev"},(0,r.kt)("inlineCode",{parentName:"a"},"ghcr.io/estuary/materialize-elasticsearch:dev"))," provides the latest version of the connector as a Docker image. You can also follow the link in your browser to see past image versions."),(0,r.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,r.kt)("p",null,"To use this connector, you'll need:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"An Elastic cluster with a known ",(0,r.kt)("a",{parentName:"li",href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html#send-requests-to-elasticsearch"},"endpoint"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"If the cluster is on the Elastic Cloud, you'll need an Elastic user with a role that grants all privileges on indices you plan to materialize to within the cluster.\nSee Elastic's documentation on ",(0,r.kt)("a",{parentName:"li",href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/defining-roles.html#roles-indices-priv"},"defining roles")," and\n",(0,r.kt)("a",{parentName:"li",href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html#privileges-list-indices"},"security privileges"),"."))),(0,r.kt)("li",{parentName:"ul"},"At least one Flow collection")),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"If you haven't yet captured your data from its external source, start at the beginning of the ",(0,r.kt)("a",{parentName:"p",href:"/guides/create-dataflow"},"guide to create a dataflow"),". You'll be referred back to this connector-specific documentation at the appropriate steps.")),(0,r.kt)("h2",{id:"configuration"},"Configuration"),(0,r.kt)("p",null,"To use this connector, begin with data in one or more Flow collections.\nUse the below properties to configure an Elasticsearch materialization, which will direct the contents of these Flow collections into Elasticsearch indices."),(0,r.kt)("p",null,"By default, the connector attempts to map each field in the Flow collection to the most appropriate Elasticsearch ",(0,r.kt)("a",{parentName:"p",href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html"},"field type"),".\nHowever, because each JSON field type can map to multiple Elasticsearch field types,\nyou may want to override the defaults.\nYou can configure this by adding ",(0,r.kt)("inlineCode",{parentName:"p"},"field_overrides")," to the collection's ",(0,r.kt)("a",{parentName:"p",href:"#bindings"},"binding")," in the materialization specification.\nTo do so, provide a JSON pointer to the field in the collection schema, choose the output field type, and specify additional properties, if necessary."),(0,r.kt)("h3",{id:"properties"},"Properties"),(0,r.kt)("h4",{id:"endpoint"},"Endpoint"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Title"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Required/Default"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"strong"},"/endpoint"))),(0,r.kt)("td",{parentName:"tr",align:null},"Endpoint"),(0,r.kt)("td",{parentName:"tr",align:null},"Endpoint host or URL. If using Elastic Cloud, this follows the format ",(0,r.kt)("inlineCode",{parentName:"td"},"https://CLUSTER_ID.REGION.CLOUD_PLATFORM.DOMAIN:PORT"),"."),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"Required")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/password")),(0,r.kt)("td",{parentName:"tr",align:null},"Password"),(0,r.kt)("td",{parentName:"tr",align:null},"Password to connect to the endpoint."),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/username")),(0,r.kt)("td",{parentName:"tr",align:null},"Username"),(0,r.kt)("td",{parentName:"tr",align:null},"User to connect to the endpoint."),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null})))),(0,r.kt)("h4",{id:"bindings"},"Bindings"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Title"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Required/Default"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"strong"},"/delta_updates"))),(0,r.kt)("td",{parentName:"tr",align:null},"Delta updates"),(0,r.kt)("td",{parentName:"tr",align:null},"Whether to use standard or ",(0,r.kt)("a",{parentName:"td",href:"#delta-updates"},"delta updates")),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"false"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/field_overrides")),(0,r.kt)("td",{parentName:"tr",align:null},"Field overrides"),(0,r.kt)("td",{parentName:"tr",align:null},"Assign Elastic field type to each collection field."),(0,r.kt)("td",{parentName:"tr",align:null},"array"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"em"},"/field_overrides/-/es_type"))),(0,r.kt)("td",{parentName:"tr",align:null},"Elasticsearch type"),(0,r.kt)("td",{parentName:"tr",align:null},"The overriding Elasticsearch data type of the field."),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"em"},"/field_overrides/-/es_type/date_spec"))),(0,r.kt)("td",{parentName:"tr",align:null},"Date specifications"),(0,r.kt)("td",{parentName:"tr",align:null},"Configuration for the date field, effective if field","_","type is ","'","date","'",". See ",(0,r.kt)("a",{parentName:"td",href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/date.html"},"Elasticsearch docs"),"."),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"em"},"/field_overrides/-/es_type/date_spec/format"))),(0,r.kt)("td",{parentName:"tr",align:null},"Date format"),(0,r.kt)("td",{parentName:"tr",align:null},"Format of the date. See ",(0,r.kt)("a",{parentName:"td",href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-date-format.html"},"Elasticsearch docs"),"."),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"em"},"/field_overrides/-/es_type/field_type"))),(0,r.kt)("td",{parentName:"tr",align:null},"Field type"),(0,r.kt)("td",{parentName:"tr",align:null},"The Elasticsearch field data types. Supported types include: boolean, date, double, geo","_","point, geo","_","shape, keyword, long, null, text."),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"em"},"/field_overrides/-/es_type/keyword_spec"))),(0,r.kt)("td",{parentName:"tr",align:null},"Keyword specifications"),(0,r.kt)("td",{parentName:"tr",align:null},"Configuration for the keyword field, effective if field","_","type is ","'","keyword","'",". See ",(0,r.kt)("a",{parentName:"td",href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/keyword.html"},"Elasticsearch docs")),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"em"},"/field_overrides/-/es_type/keyword_spec/ignore_above"))),(0,r.kt)("td",{parentName:"tr",align:null},"Ignore above"),(0,r.kt)("td",{parentName:"tr",align:null},"Strings longer than the ignore","_","above setting will not be indexed or stored. See ",(0,r.kt)("a",{parentName:"td",href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/ignore-above.html"},"Elasticsearch docs")),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"em"},"/field_overrides/-/es_type/text_spec"))),(0,r.kt)("td",{parentName:"tr",align:null},"Text specifications"),(0,r.kt)("td",{parentName:"tr",align:null},"Configuration for the text field, effective if field","_","type is ","'","text","'","."),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"em"},"/field_overrides/-/es_type/text_spec/dual_keyword"))),(0,r.kt)("td",{parentName:"tr",align:null},"Dual keyword"),(0,r.kt)("td",{parentName:"tr",align:null},"Whether or not to specify the field as text","/","keyword dual field."),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"em"},"/field_overrides/-/es_type/text_spec/keyword_ignore_above"))),(0,r.kt)("td",{parentName:"tr",align:null},"Ignore above"),(0,r.kt)("td",{parentName:"tr",align:null},"Effective only if Dual Keyword is enabled. Strings longer than the ignore","_","above setting will not be indexed or stored. See ",(0,r.kt)("a",{parentName:"td",href:"https://www.elastic.co/guide/en/elasticsearch/reference/current/ignore-above.html"},"Elasticsearch docs"),"."),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("em",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"em"},"/field_overrides/-/pointer"))),(0,r.kt)("td",{parentName:"tr",align:null},"Pointer"),(0,r.kt)("td",{parentName:"tr",align:null},"A ","'","/","'","-delimited json pointer to the location of the overridden field."),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"strong"},"/index"))),(0,r.kt)("td",{parentName:"tr",align:null},"index"),(0,r.kt)("td",{parentName:"tr",align:null},"Name of the ElasticSearch index to store the materialization results."),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"Required")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/number_of_replicas")),(0,r.kt)("td",{parentName:"tr",align:null},"Number of replicas"),(0,r.kt)("td",{parentName:"tr",align:null},"The number of replicas in ElasticSearch index. If not set, default to be 0. For single-node clusters, make sure this field is 0, because the Elastic search needs to allocate replicas on different nodes."),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"0"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/number_of_shards")),(0,r.kt)("td",{parentName:"tr",align:null},"Number of shards"),(0,r.kt)("td",{parentName:"tr",align:null},"The number of shards in ElasticSearch index. Must set to be greater than 0."),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"1"))))),(0,r.kt)("h3",{id:"sample"},"Sample"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"materializations:\n  PREFIX/mat_name:\n    endpoint:\n      connector:\n         # Path to the latest version of the connector, provided as a Docker image\n        image: ghcr.io/estuary/materialize-elasticsearch:dev\n        config:\n          endpoint: https://ec47fc4d2c53414e1307e85726d4b9bb.us-east-1.aws.found.io:9243\n          username: flow_user\n          password: secret\n    # If you have multiple collections you need to materialize, add a binding for each one\n    # to ensure complete data flow-through\n        bindings:\n          - resource:\n              index: last-updated\n              delta_updates: false\n              field_overrides:\n                  - pointer: /updated-date\n                    es_type:\n                      field_type: date\n                        date_spec:\n                          format: yyyy-MM-dd\n            source: PREFIX/source_collection\n")),(0,r.kt)("h2",{id:"delta-updates"},"Delta updates"),(0,r.kt)("p",null,"This connector supports both standard and delta updates. You must choose an option for each binding."),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/concepts/materialization#delta-updates"},"Learn more about delta updates")," and the implications of using each update type."))}m.isMDXComponent=!0}}]);