"use strict";(self.webpackChunkterminology_example=self.webpackChunkterminology_example||[]).push([[2291],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},f="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),f=s(r),y=o,m=f["".concat(c,".").concat(y)]||f[y]||p[y]||a;return r?n.createElement(m,l(l({ref:t},u),{},{components:r})):n.createElement(m,l({ref:t},u))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,l=new Array(a);l[0]=y;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[f]="string"==typeof e?e:o,l[1]=i;for(var s=2;s<a;s++)l[s]=r[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},1262:(e,t,r)=>{r.d(t,{Z:()=>a});var n=r(7294),o=r(2389);function a(e){let{children:t,fallback:r}=e;return(0,o.Z)()?n.createElement(n.Fragment,null,t?.()):r??null}},9087:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>m,contentTitle:()=>p,default:()=>h,frontMatter:()=>f,metadata:()=>y,toc:()=>d});var n=r(7462),o=r(7294),a=r(3905),l=r(1262);function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,o,a=[],l=!0,i=!1;try{for(r=r.call(e);!(l=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);l=!0);}catch(c){i=!0,o=c}finally{try{l||null==r.return||r.return()}finally{if(i)throw o}}return a}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return s(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return s(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}const u=function(e){var t=c((0,o.useState)(),2),r=t[0],n=t[1];return(0,o.useEffect)((function(){if(void 0!==("undefined"==typeof window?"undefined":i(window))){var e=document.location.pathname.replace(/\/$/,""),t="".concat(e,".json");r||(window._cachedGlossary?n(window._cachedGlossary):fetch(t).then((function(e){return e.json()})).then((function(e){n(e),window._cachedGlossary=e})))}}),[r]),o.createElement(l.Z,{fallback:o.createElement("div",null,"The fallback content to display on prerendering")},(function(){return o.createElement("div",null,r?o.createElement(o.Fragment,null,Object.keys(r).map((function(e){return o.createElement("p",{key:e},o.createElement("a",{href:"/".concat(e)},r[e].metadata.title),": ",o.createElement("span",{style:{display:"inline-flex"},dangerouslySetInnerHTML:{__html:r[e].metadata.hoverText}}))}))):"loading...")}))},f={id:"glossary",title:"Glossary"},p=void 0,y={unversionedId:"glossary",id:"glossary",title:"Glossary",description:"This is my glossary file, I expect this to remain unaltered, and just append text below this line.",source:"@site/docs/glossary.md",sourceDirName:".",slug:"/glossary",permalink:"/baseSth/docs/glossary",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/glossary.md",tags:[],version:"current",frontMatter:{id:"glossary",title:"Glossary"},sidebar:"tutorialSidebar",previous:{title:"Translate your site",permalink:"/baseSth/docs/tutorial-extras/translate-your-site"},next:{title:"Example term",permalink:"/baseSth/docs/terms/example-term"}},m={},d=[],b={toc:d},g="wrapper";function h(e){let{components:t,...r}=e;return(0,a.kt)(g,(0,n.Z)({},b,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This is my glossary file, I expect this to remain unaltered, and just append text below this line."),(0,a.kt)(u,{mdxType:"Glossary"}))}h.isMDXComponent=!0}}]);