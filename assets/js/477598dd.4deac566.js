"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[6079],{73027:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>c,toc:()=>d});var r=t(74848),s=t(28453);const i={},o="Gladly",c={id:"reference/Connectors/capture-connectors/gladly",title:"Gladly",description:"This connector captures data from Gladly into Flow collections.",source:"@site/docs/reference/Connectors/capture-connectors/gladly.md",sourceDirName:"reference/Connectors/capture-connectors",slug:"/reference/Connectors/capture-connectors/gladly",permalink:"/reference/Connectors/capture-connectors/gladly",draft:!1,unlisted:!1,editUrl:"https://github.com/estuary/flow/edit/master/site/docs/reference/Connectors/capture-connectors/gladly.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"GitLab",permalink:"/reference/Connectors/capture-connectors/gitlab"},next:{title:"Google Ads",permalink:"/reference/Connectors/capture-connectors/google-ads"}},l={},d=[{value:"Supported data resources",id:"supported-data-resources",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Properties",id:"properties",level:3},{value:"Endpoint",id:"endpoint",level:4},{value:"Bindings",id:"bindings",level:4},{value:"Sample",id:"sample",level:3}];function a(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"gladly",children:"Gladly"}),"\n",(0,r.jsx)(n.p,{children:"This connector captures data from Gladly into Flow collections."}),"\n",(0,r.jsxs)(n.p,{children:["It is available for use in the Flow web application. For local development or open-source workflows, ",(0,r.jsx)(n.a,{href:"https://ghcr.io/estuary/source-gladly:dev",children:(0,r.jsx)(n.code,{children:"ghcr.io/estuary/source-gladly:dev"})})," provides the latest version of the connector as a Docker image. You can also follow the link in your browser to see past image versions."]}),"\n",(0,r.jsx)(n.h2,{id:"supported-data-resources",children:"Supported data resources"}),"\n",(0,r.jsxs)(n.p,{children:["This connector can be used to sync the following ",(0,r.jsx)(n.a,{href:"https://developer.gladly.com/rest/#tag/Events",children:"Event entity types"})," from Gladly:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"AGENT_AVAILABILITY"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"AGENT_STATUS"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"CONTACT"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"CONVERSATION"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"CUSTOMER"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"PAYMENT_REQUEST"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"TASK"})}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"By default, each entity type is mapped to a Flow collection through a separate binding."}),"\n",(0,r.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,r.jsxs)(n.p,{children:["To set up the Gladly source connector, you'll need a Gladly account with an ",(0,r.jsx)(n.a,{href:"https://connect.gladly.com/docs/implementation/article/get-your-api-tokens/",children:"API token"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,r.jsxs)(n.p,{children:["You configure connectors either in the Flow web app, or by directly editing the catalog specification file.\nSee ",(0,r.jsx)(n.a,{href:"/concepts/connectors#using-connectors",children:"connectors"})," to learn more about using connectors. The values and specification sample below provide configuration details specific to the Gladly source connector."]}),"\n",(0,r.jsx)(n.h3,{id:"properties",children:"Properties"}),"\n",(0,r.jsx)(n.h4,{id:"endpoint",children:"Endpoint"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Property"}),(0,r.jsx)(n.th,{children:"Title"}),(0,r.jsx)(n.th,{children:"Description"}),(0,r.jsx)(n.th,{children:"Type"}),(0,r.jsx)(n.th,{children:"Required/Default"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"/organization"})})}),(0,r.jsx)(n.td,{children:"Organization"}),(0,r.jsx)(n.td,{children:"Organization to Request Data From"}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"Required"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"/agentEmail"})})}),(0,r.jsx)(n.td,{children:"Agent Email"}),(0,r.jsx)(n.td,{children:"Agent Email Address to use for Authentication"}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"Required"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"/apiToken"})})}),(0,r.jsx)(n.td,{children:"API Token"}),(0,r.jsx)(n.td,{children:"API Token to use for Authentication"}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"Required"})]})]})]}),"\n",(0,r.jsx)(n.h4,{id:"bindings",children:"Bindings"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Property"}),(0,r.jsx)(n.th,{children:"Title"}),(0,r.jsx)(n.th,{children:"Description"}),(0,r.jsx)(n.th,{children:"Type"}),(0,r.jsx)(n.th,{children:"Required/Default"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"/name"})})}),(0,r.jsx)(n.td,{children:"Name"}),(0,r.jsx)(n.td,{children:"Name of this resource"}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"Required"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"/interval"})}),(0,r.jsx)(n.td,{children:"Interval"}),(0,r.jsx)(n.td,{children:"Interval between updates for this resource"}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{})]})]})]}),"\n",(0,r.jsx)(n.h3,{id:"sample",children:"Sample"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"\ncaptures:\n  ${PREFIX}/${CAPTURE_NAME}:\n    endpoint:\n      connector:\n        image: ghcr.io/estuary/source-gladly:dev\n        config:\n          organization:\n          agentEmail:\n          apiToken: <secret>\n    bindings:\n      - resource:\n          name: AgentAvailabilityEvents\n          interval: PT30S\n        target: ${PREFIX}/AgentAvailabilityEvents\n      {...}\n"})})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>c});var r=t(96540);const s={},i=r.createContext(s);function o(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);