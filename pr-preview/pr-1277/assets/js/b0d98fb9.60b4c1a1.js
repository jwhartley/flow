"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[8073],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>h});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),l=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(i.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(r),f=o,h=p["".concat(i,".").concat(f)]||p[f]||d[f]||a;return r?n.createElement(h,c(c({ref:t},u),{},{components:r})):n.createElement(h,c({ref:t},u))}));function h(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,c=new Array(a);c[0]=f;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[p]="string"==typeof e?e:o,c[1]=s;for(var l=2;l<a;l++)c[l]=r[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},1198:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var n=r(7462),o=(r(7294),r(3905));const a={},c="PostgreSQL Batch Query Connector",s={unversionedId:"reference/Connectors/capture-connectors/postgres-batch",id:"reference/Connectors/capture-connectors/postgres-batch",title:"PostgreSQL Batch Query Connector",description:"This connector captures data from Postgres into Flow collections by periodically",source:"@site/docs/reference/Connectors/capture-connectors/postgres-batch.md",sourceDirName:"reference/Connectors/capture-connectors",slug:"/reference/Connectors/capture-connectors/postgres-batch",permalink:"/pr-preview/pr-1277/reference/Connectors/capture-connectors/postgres-batch",draft:!1,editUrl:"https://github.com/estuary/flow/edit/master/site/docs/reference/Connectors/capture-connectors/postgres-batch.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"MySQL Batch Query Connector",permalink:"/pr-preview/pr-1277/reference/Connectors/capture-connectors/mysql-batch"},next:{title:"Recharge",permalink:"/pr-preview/pr-1277/reference/Connectors/capture-connectors/recharge"}},i={},l=[],u={toc:l},p="wrapper";function d(e){let{components:t,...r}=e;return(0,o.kt)(p,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"postgresql-batch-query-connector"},"PostgreSQL Batch Query Connector"),(0,o.kt)("p",null,"This connector captures data from Postgres into Flow collections by periodically\nexecuting queries and translating the results into JSON documents."),(0,o.kt)("p",null,"We recommend using our ",(0,o.kt)("a",{parentName:"p",href:"http://go.estuary.dev/source-postgres"},"PostgreSQL CDC Connector")," instead\nif possible. Using CDC provides lower latency data capture, delete and update events, and usually\nhas a smaller impact on the source database."),(0,o.kt)("p",null,"However there are some circumstances where this might not be feasible. Perhaps you need\nto capture from a managed PostgreSQL instance which doesn't support logical replication.\nOr perhaps you need to capture the contents of a view or the result of an ad-hoc query.\nThat's the sort of situation this connector is intended for."),(0,o.kt)("p",null,"The number one caveat you need to be aware of when using this connector is that ",(0,o.kt)("strong",{parentName:"p"},"it will\nperiodically execute its update query over and over"),". At the default polling interval of\n5 minutes, a naive ",(0,o.kt)("inlineCode",{parentName:"p"},"SELECT * FROM foo")," query against a 100 MiB view will produce 30 GiB/day\nof ingested data, most of it duplicated."),(0,o.kt)("p",null,"This is why the connector's autodiscovery logic only returns ordinary tables of data, because\nin that particular case we can use the ",(0,o.kt)("inlineCode",{parentName:"p"},"xmin")," system column as a cursor and ask the database\nto ",(0,o.kt)("inlineCode",{parentName:"p"},"SELECT xmin, * FROM foo WHERE xmin::text::bigint > $1;"),"."),(0,o.kt)("p",null,'If you start editing these queries or manually adding capture bindings for views or to run\nad-hoc queries, you need to either have some way of restricting the query to "just the new\nrows since last time" or else have your polling interval set high enough that the data rate\n',(0,o.kt)("inlineCode",{parentName:"p"},"<DatasetSize> / <PollingInterval>")," is an amount of data you're willing to deal with."))}d.isMDXComponent=!0}}]);