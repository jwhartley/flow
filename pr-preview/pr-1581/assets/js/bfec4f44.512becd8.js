"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[4509],{58321:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>i,toc:()=>d});var t=n(74848),a=n(28453);const r={},o="Task shards",i={id:"concepts/advanced/shards",title:"Task shards",description:"Catalog tasks \u2014 captures, derivations, and materializations \u2014",source:"@site/docs/concepts/advanced/shards.md",sourceDirName:"concepts/advanced",slug:"/concepts/advanced/shards",permalink:"/pr-preview/pr-1581/concepts/advanced/shards",draft:!1,unlisted:!1,editUrl:"https://github.com/estuary/flow/edit/master/site/docs/concepts/advanced/shards.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Projections",permalink:"/pr-preview/pr-1581/concepts/advanced/projections"},next:{title:"Connectors",permalink:"/pr-preview/pr-1581/reference/Connectors/"}},c={},d=[{value:"Shard splits",id:"shard-splits",level:2},{value:"Transactions",id:"transactions",level:2},{value:"Recovery logs",id:"recovery-logs",level:2}];function l(e){const s={a:"a",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h1,{id:"task-shards",children:"Task shards"}),"\n",(0,t.jsxs)(s.p,{children:["Catalog ",(0,t.jsx)(s.a,{href:"/pr-preview/pr-1581/concepts/#tasks",children:"tasks"})," \u2014 captures, derivations, and materializations \u2014\nare executed by one or more task ",(0,t.jsx)(s.strong,{children:"shards"}),"."]}),"\n",(0,t.jsx)(s.p,{children:"Shards are a fault-tolerant and stateful unit of execution for a catalog task,\nwhich the Flow runtime assigns and runs on a scalable pool of compute resources.\nA single task can have many shards,\nwhich allow the task to scale across many machines to\nachieve more throughput and parallelism."}),"\n",(0,t.jsxs)(s.p,{children:["Shards are part of the Gazette project.\n",(0,t.jsx)(s.a,{href:"https://gazette.readthedocs.io/en/latest/consumers-concepts.html#shards",children:"See Gazette's Shard concepts page for details"}),"."]}),"\n",(0,t.jsx)(s.h2,{id:"shard-splits",children:"Shard splits"}),"\n",(0,t.jsx)(s.p,{children:"When a task is first created, it is initialized with a single shard.\nLater and as required, shards may be split into two shards.\nThis is done by the service operator on your behalf, depending on the size of your task.\nShard splitting doesn't require downtime; your task will continue to run as normal\non the old shard until the split occurs and then shift seamlessly to the new, split shards."}),"\n",(0,t.jsx)(s.p,{children:"This process can be repeated as needed until your required throughput is achieved.\nIf you have questions about how shards are split for your tasks, contact your Estuary account representative."}),"\n",(0,t.jsx)(s.h2,{id:"transactions",children:"Transactions"}),"\n",(0,t.jsxs)(s.p,{children:["Shards process messages in dynamic ",(0,t.jsx)(s.strong,{children:"transactions"}),"."]}),"\n",(0,t.jsx)(s.p,{children:"Whenever a message is ready to be processed by the task (when new documents appear at the source endpoint or collection),\na new transaction is initiated.\nThe transaction will continue so long as further messages are available for processing.\nWhen no more messages are immediately available, the transaction closes.\nA new transaction is started whenever the next message is available."}),"\n",(0,t.jsxs)(s.p,{children:["In general, shorter transaction durations decrease latency, while longer transaction durations\nincrease efficiency.\nFlow automatically balances these two extremes to optimize each task,\nbut it may be useful in some cases to control transaction duration.\nFor example, materializations to large analytical warehouses may benefit from longer transactions,\nwhich can reduce cost by performing more data reduction before landing data in the warehouse.\nSome endpoint systems, like ",(0,t.jsx)(s.a,{href:"/pr-preview/pr-1581/reference/Connectors/materialization-connectors/BigQuery#performance-considerations",children:"BigQuery"}),", limit the number of table operations you can perform.\nLonger transaction durations ensure that you don't exceed these limits."]}),"\n",(0,t.jsxs)(s.p,{children:["You can set the minimum and maximum transaction duration in a task's ",(0,t.jsx)(s.a,{href:"/pr-preview/pr-1581/reference/Configuring-task-shards",children:"shards configuration"}),"."]}),"\n",(0,t.jsx)(s.h2,{id:"recovery-logs",children:"Recovery logs"}),"\n",(0,t.jsx)(s.p,{children:"All task shards have associated state, which is managed in the shard's store."}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"Capture tasks must track incremental checkpoints of their endpoint connectors."}),"\n",(0,t.jsx)(s.li,{children:"Derivation tasks manage a potentially very large index of registers,\nas well as read checkpoints of sourced collection journals."}),"\n",(0,t.jsx)(s.li,{children:"Materialization tasks track incremental checkpoints of their endpoint connectors,\nas well as read checkpoints of sourced collection journals."}),"\n"]}),"\n",(0,t.jsxs)(s.p,{children:["Shard stores use\n",(0,t.jsx)(s.a,{href:"https://gazette.readthedocs.io/en/latest/consumers-concepts.html#recovery-logs",children:"recovery logs"}),"\nto replicate updates and implement transaction semantics."]}),"\n",(0,t.jsxs)(s.p,{children:["Recovery logs are regular ",(0,t.jsx)(s.a,{href:"/pr-preview/pr-1581/concepts/advanced/journals",children:"journals"}),",\nbut hold binary data and are not intended for direct use.\nHowever, they can hold your user data.\nRecovery logs of ",(0,t.jsx)(s.a,{href:"/pr-preview/pr-1581/concepts/derivations",children:"derivations"})," hold your derivation register values."]}),"\n",(0,t.jsxs)(s.p,{children:["Recovery logs are stored in your cloud storage bucket,\nand must have a configured ",(0,t.jsx)(s.a,{href:"/pr-preview/pr-1581/concepts/storage-mappings#recovery-logs",children:"storage mapping"}),"."]})]})}function h(e={}){const{wrapper:s}={...(0,a.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},28453:(e,s,n)=>{n.d(s,{R:()=>o,x:()=>i});var t=n(96540);const a={},r=t.createContext(a);function o(e){const s=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),t.createElement(r.Provider,{value:s},e.children)}}}]);