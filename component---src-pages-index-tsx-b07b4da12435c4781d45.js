(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{NhXs:function(e){e.exports=JSON.parse('{"data":{"site":{"siteMetadata":{"tags":[{"key":"TYPESCRIPT","className":"tag-ts"},{"key":"JAVASCRIPT","className":"tag-js"},{"key":"CSS","className":"tag-css"},{"key":"REACT","className":"tag-react"},{"key":"ANGULAR","className":"tag-angular"},{"key":"RXJS","className":"tag-rxjs"},{"key":"RUST","className":"tag-rust"},{"key":"NODEJS","className":"tag-nodejs"},{"key":"GRAPHQL","className":"tag-graphql"},{"key":"FP","className":"tag-fp"}]}}}}')},QeBL:function(e,a,t){"use strict";t.r(a),t.d(a,"query",(function(){return f}));t("Vd3H"),t("f3/d");var s=t("9Dj+"),l=t("kCIJ"),r=t("q1tI"),n=t.n(r),c=(t("KKXr"),t("Z2Ku"),t("L9s1"),t("NhXs")),m=t("Wgwc"),i=t.n(m),d=t("Wbzz"),o=function(e){var a=e.source,t=a.frontmatter,s=a.excerpt,m=Object(l.useIntl)(),o=m.locale,u=m.formatMessage,f=c.data,g=Object(r.useCallback)((function(e){return e.site.siteMetadata.tags.filter((function(e){return t.tags.split(",").includes(e.key)}))}),[f]);return n.a.createElement("div",{className:"grid grid-cols-1"},n.a.createElement(d.Link,{"data-testid":"title",className:"text-pink-700 text-xl md:text-2xl font-semibold",to:"/"+o+t.path},t.title),n.a.createElement("div",{className:"flex flex-col text-sm text-pink-700 text-opacity-75"},n.a.createElement("div",{className:"mb-2 sm:mb-0 mr-3"},i()(t.date).locale(o).format(u({id:"date_format"}))),n.a.createElement("div",{className:"flex flex-row flex-wrap"},g(f).map((function(e){return n.a.createElement("div",{key:e.key,className:"tag "+e.className},u({id:e.key}))})))),n.a.createElement("div",{className:"pt-1"},s))},u=t("H8eV"),f=(a.default=function(e){var a=e.data,t=Object(l.useIntl)(),c=t.formatMessage,m=t.locale;Object(r.useEffect)((function(){Object(l.changeLocale)(m)}),[m]);var i=Object(r.useCallback)((function(){window.open(a.site.siteMetadata.githubUrl,"_blank")}),[]);return n.a.createElement(s.a,null,n.a.createElement(u.a,null),n.a.createElement("section",{className:"flex"},n.a.createElement("div",{className:"flex items-center pr-2"},n.a.createElement("img",{className:"p-0 m-0 w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer",src:a.allGithubData.edges[0].node.data.viewer.avatarUrl,onClick:i,alt:"avatar"})),n.a.createElement("div",{className:"pl-2 grid grid-cols-1 grid-rows-2"},n.a.createElement("span",{className:"text-xs md:text-sm"},c({id:"headline_1"})," ",n.a.createElement("a",{href:a.site.siteMetadata.githubUrl,rel:"noreferrer",target:"_blank",className:"underline text-pink-700"},a.allGithubData.edges[0].node.data.viewer.name)),n.a.createElement("span",{className:"text-xs md:text-sm"},c({id:"headline_2"})))),n.a.createElement("section",{className:"grid grid-cols-1 mt-6"},a.allMarkdownRemark.edges.sort((function(e,a){return[e.node.frontmatter.date,a.node.frontmatter.date].map(Date.parse).reduce((function(e,a){return a-e}))})).map((function(e){var a=e.node;return n.a.createElement("div",{key:a.id,className:"mb-6","data-testid":"post"},n.a.createElement(o,{source:a}))}))))},"1031256340")}}]);
//# sourceMappingURL=component---src-pages-index-tsx-b07b4da12435c4781d45.js.map