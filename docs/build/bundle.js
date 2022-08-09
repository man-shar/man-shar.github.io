var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function r(){return Object.create(null)}function s(t){t.forEach(n)}function a(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(e,...n){if(null==e)return t;const r=e.subscribe(...n);return r.unsubscribe?()=>r.unsubscribe():r}function c(t,e,n){t.$$.on_destroy.push(i(e,n))}function l(t,e,n,r){if(t){const s=u(t,e,n,r);return t[0](s)}}function u(t,n,r,s){return t[1]&&s?e(r.ctx.slice(),t[1](s(n))):r.ctx}function h(t,e,n,r,s,a,o){const i=function(t,e,n,r){if(t[2]&&r){const s=t[2](r(n));if(void 0===e.dirty)return s;if("object"==typeof s){const t=[],n=Math.max(e.dirty.length,s.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|s[r];return t}return e.dirty|s}return e.dirty}(e,r,s,a);if(i){const s=u(e,n,r,o);t.p(s,i)}}function f(t){const e={};for(const n in t)"$"!==n[0]&&(e[n]=t[n]);return e}function p(t){return null==t?"":t}function m(t,e){t.appendChild(e)}function d(t,e,n){t.insertBefore(e,n||null)}function g(t){t.parentNode.removeChild(t)}function $(t){return document.createElement(t)}function v(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function y(t){return document.createTextNode(t)}function w(){return y(" ")}function b(){return y("")}function x(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function E(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const r in e)null==e[r]?t.removeAttribute(r):"style"===r?t.style.cssText=e[r]:"__value"===r?t.value=t[r]=e[r]:n[r]&&n[r].set?t[r]=e[r]:x(t,r,e[r])}function I(t){return Array.from(t.childNodes)}function k(t,e,n,r){for(let r=0;r<t.length;r+=1){const s=t[r];if(s.nodeName===e){let e=0;const a=[];for(;e<s.attributes.length;){const t=s.attributes[e++];n[t.name]||a.push(t.name)}for(let t=0;t<a.length;t++)s.removeAttribute(a[t]);return t.splice(r,1)[0]}}return r?v(e):$(e)}function A(t,e){for(let n=0;n<t.length;n+=1){const r=t[n];if(3===r.nodeType)return r.data=""+e,t.splice(n,1)[0]}return y(e)}function S(t){return A(t," ")}let T;function R(t){T=t}function N(){if(!T)throw new Error("Function called outside component initialization");return T}function O(){const t=N();return(e,n)=>{const r=t.$$.callbacks[e];if(r){const s=function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(e,n);r.slice().forEach(e=>{e.call(t,s)})}}}function j(t,e){N().$$.context.set(t,e)}function D(t){return N().$$.context.get(t)}const P=[],H=[],L=[],_=[],C=Promise.resolve();let M=!1;function B(t){L.push(t)}let G=!1;const U=new Set;function V(){if(!G){G=!0;do{for(let t=0;t<P.length;t+=1){const e=P[t];R(e),z(e.$$)}for(R(null),P.length=0;H.length;)H.pop()();for(let t=0;t<L.length;t+=1){const e=L[t];U.has(e)||(U.add(e),e())}L.length=0}while(P.length);for(;_.length;)_.pop()();M=!1,G=!1,U.clear()}}function z(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(B)}}const K=new Set;let F;function W(){F={r:0,c:[],p:F}}function q(){F.r||s(F.c),F=F.p}function J(t,e){t&&t.i&&(K.delete(t),t.i(e))}function X(t,e,n,r){if(t&&t.o){if(K.has(t))return;K.add(t),F.c.push(()=>{K.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}}function Y(t,e){const n={},r={},s={$$scope:1};let a=t.length;for(;a--;){const o=t[a],i=e[a];if(i){for(const t in o)t in i||(r[t]=1);for(const t in i)s[t]||(n[t]=i[t],s[t]=1);t[a]=i}else for(const t in o)s[t]=1}for(const t in r)t in n||(n[t]=void 0);return n}function Z(t){return"object"==typeof t&&null!==t?t:{}}function Q(t){t&&t.c()}function tt(t,e){t&&t.l(e)}function et(t,e,r){const{fragment:o,on_mount:i,on_destroy:c,after_update:l}=t.$$;o&&o.m(e,r),B(()=>{const e=i.map(n).filter(a);c?c.push(...e):s(e),t.$$.on_mount=[]}),l.forEach(B)}function nt(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function rt(t,e){-1===t.$$.dirty[0]&&(P.push(t),M||(M=!0,C.then(V)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function st(e,n,a,o,i,c,l=[-1]){const u=T;R(e);const h=n.props||{},f=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:i,bound:r(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:r(),dirty:l,skip_bound:!1};let p=!1;if(f.ctx=a?a(e,h,(t,n,...r)=>{const s=r.length?r[0]:n;return f.ctx&&i(f.ctx[t],f.ctx[t]=s)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](s),p&&rt(e,t)),n}):[],f.update(),p=!0,s(f.before_update),f.fragment=!!o&&o(f.ctx),n.target){if(n.hydrate){const t=I(n.target);f.fragment&&f.fragment.l(t),t.forEach(g)}else f.fragment&&f.fragment.c();n.intro&&J(e.$$.fragment),et(e,n.target,n.anchor),V()}R(u)}class at{$destroy(){nt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ot=[];function it(e,n=t){let r;const s=[];function a(t){if(o(e,t)&&(e=t,r)){const t=!ot.length;for(let t=0;t<s.length;t+=1){const n=s[t];n[1](),ot.push(n,e)}if(t){for(let t=0;t<ot.length;t+=2)ot[t][0](ot[t+1]);ot.length=0}}}return{set:a,update:function(t){a(t(e))},subscribe:function(o,i=t){const c=[o,i];return s.push(c),1===s.length&&(r=n(a)||t),o(e),()=>{const t=s.indexOf(c);-1!==t&&s.splice(t,1),0===s.length&&(r(),r=null)}}}}function ct(e,n,r){const o=!Array.isArray(e),c=o?[e]:e,l=n.length<2;return{subscribe:it(r,e=>{let r=!1;const u=[];let h=0,f=t;const p=()=>{if(h)return;f();const r=n(o?u[0]:u,e);l?e(r):f=a(r)?r:t},m=c.map((t,e)=>i(t,t=>{u[e]=t,h&=~(1<<e),r&&p()},()=>{h|=1<<e}));return r=!0,p(),function(){s(m),f()}}).subscribe}}const lt={},ut={};function ht(t){return{...t.location,state:t.history.state,key:t.history.state&&t.history.state.key||"initial"}}const ft=function(t,e){const n=[];let r=ht(t);return{get location(){return r},listen(e){n.push(e);const s=()=>{r=ht(t),e({location:r,action:"POP"})};return t.addEventListener("popstate",s),()=>{t.removeEventListener("popstate",s);const r=n.indexOf(e);n.splice(r,1)}},navigate(e,{state:s,replace:a=!1}={}){s={...s,key:Date.now()+""};try{a?t.history.replaceState(s,null,e):t.history.pushState(s,null,e)}catch(n){t.location[a?"replace":"assign"](e)}r=ht(t),n.forEach(t=>t({location:r,action:"PUSH"}))}}}(Boolean("undefined"!=typeof window&&window.document&&window.document.createElement)?window:function(t="/"){let e=0;const n=[{pathname:t,search:""}],r=[];return{get location(){return n[e]},addEventListener(t,e){},removeEventListener(t,e){},history:{get entries(){return n},get index(){return e},get state(){return r[e]},pushState(t,s,a){const[o,i=""]=a.split("?");e++,n.push({pathname:o,search:i}),r.push(t)},replaceState(t,s,a){const[o,i=""]=a.split("?");n[e]={pathname:o,search:i},r[e]=t}}}}()),{navigate:pt}=ft,mt=/^:(.+)/;function dt(t,e){return t.substr(0,e.length)===e}function gt(t){return"*"===t[0]}function $t(t){return t.replace(/(^\/+|\/+$)/g,"").split("/")}function vt(t){return t.replace(/(^\/+|\/+$)/g,"")}function yt(t,e){return{route:t,score:t.default?0:$t(t.path).reduce((t,e)=>(t+=4,!function(t){return""===t}(e)?!function(t){return mt.test(t)}(e)?gt(e)?t-=5:t+=3:t+=2:t+=1,t),0),index:e}}function wt(t,e){let n,r;const[s]=e.split("?"),a=$t(s),o=""===a[0],i=function(t){return t.map(yt).sort((t,e)=>t.score<e.score?1:t.score>e.score?-1:t.index-e.index)}(t);for(let t=0,s=i.length;t<s;t++){const s=i[t].route;let c=!1;if(s.default){r={route:s,params:{},uri:e};continue}const l=$t(s.path),u={},h=Math.max(a.length,l.length);let f=0;for(;f<h;f++){const t=l[f],e=a[f];if(void 0!==t&&gt(t)){u["*"===t?"*":t.slice(1)]=a.slice(f).map(decodeURIComponent).join("/");break}if(void 0===e){c=!0;break}let n=mt.exec(t);if(n&&!o){const t=decodeURIComponent(e);u[n[1]]=t}else if(t!==e){c=!0;break}}if(!c){n={route:s,params:u,uri:"/"+a.slice(0,f).join("/")};break}}return n||r||null}function bt(t,e){return t+(e?"?"+e:"")}function xt(t,e){return vt("/"===e?t:`${vt(t)}/${vt(e)}`)+"/"}function Et(t){let e;const n=t[6].default,r=l(n,t,t[5],null);return{c(){r&&r.c()},l(t){r&&r.l(t)},m(t,n){r&&r.m(t,n),e=!0},p(t,[e]){r&&r.p&&32&e&&h(r,n,t,t[5],e,null,null)},i(t){e||(J(r,t),e=!0)},o(t){X(r,t),e=!1},d(t){r&&r.d(t)}}}function It(t,e,n){let r,s,a,{$$slots:o={},$$scope:i}=e,{basepath:l="/"}=e,{url:u=null}=e;const h=D(lt),f=D(ut),p=it([]);c(t,p,t=>n(10,a=t));const m=it(null);let d=!1;const g=h||it(u?{pathname:u}:ft.location);c(t,g,t=>n(9,s=t));const $=f?f.routerBase:it({path:l,uri:l});c(t,$,t=>n(8,r=t));const v=ct([$,m],([t,e])=>{if(null===e)return t;const{path:n}=t,{route:r,uri:s}=e;return{path:r.default?n:r.path.replace(/\*.*$/,""),uri:s}});var y;return h||(y=()=>ft.listen(t=>{g.set(t.location)}),N().$$.on_mount.push(y),j(lt,g)),j(ut,{activeRoute:m,base:$,routerBase:v,registerRoute:function(t){const{path:e}=r;let{path:n}=t;if(t._path=n,t.path=xt(e,n),"undefined"==typeof window){if(d)return;const e=function(t,e){return wt([t],e)}(t,s.pathname);e&&(m.set(e),d=!0)}else p.update(e=>(e.push(t),e))},unregisterRoute:function(t){p.update(e=>{const n=e.indexOf(t);return e.splice(n,1),e})}}),t.$$set=t=>{"basepath"in t&&n(3,l=t.basepath),"url"in t&&n(4,u=t.url),"$$scope"in t&&n(5,i=t.$$scope)},t.$$.update=()=>{if(256&t.$$.dirty){const{path:t}=r;p.update(e=>(e.forEach(e=>e.path=xt(t,e._path)),e))}if(1536&t.$$.dirty){const t=wt(a,s.pathname);m.set(t)}},[p,g,$,l,u,i,o]}class kt extends at{constructor(t){super(),st(this,t,It,Et,o,{basepath:3,url:4})}}const At=t=>({params:2&t,location:16&t}),St=t=>({params:t[1],location:t[4]});function Tt(t){let e,n,r,s;const a=[Nt,Rt],o=[];function i(t,e){return null!==t[0]?0:1}return e=i(t),n=o[e]=a[e](t),{c(){n.c(),r=b()},l(t){n.l(t),r=b()},m(t,n){o[e].m(t,n),d(t,r,n),s=!0},p(t,s){let c=e;e=i(t),e===c?o[e].p(t,s):(W(),X(o[c],1,1,()=>{o[c]=null}),q(),n=o[e],n||(n=o[e]=a[e](t),n.c()),J(n,1),n.m(r.parentNode,r))},i(t){s||(J(n),s=!0)},o(t){X(n),s=!1},d(t){o[e].d(t),t&&g(r)}}}function Rt(t){let e;const n=t[10].default,r=l(n,t,t[9],St);return{c(){r&&r.c()},l(t){r&&r.l(t)},m(t,n){r&&r.m(t,n),e=!0},p(t,e){r&&r.p&&530&e&&h(r,n,t,t[9],e,At,St)},i(t){e||(J(r,t),e=!0)},o(t){X(r,t),e=!1},d(t){r&&r.d(t)}}}function Nt(t){let n,r,s;const a=[{location:t[4]},t[1],t[2]];var o=t[0];function i(t){let n={};for(let t=0;t<a.length;t+=1)n=e(n,a[t]);return{props:n}}return o&&(n=new o(i())),{c(){n&&Q(n.$$.fragment),r=b()},l(t){n&&tt(n.$$.fragment,t),r=b()},m(t,e){n&&et(n,t,e),d(t,r,e),s=!0},p(t,e){const s=22&e?Y(a,[16&e&&{location:t[4]},2&e&&Z(t[1]),4&e&&Z(t[2])]):{};if(o!==(o=t[0])){if(n){W();const t=n;X(t.$$.fragment,1,0,()=>{nt(t,1)}),q()}o?(n=new o(i()),Q(n.$$.fragment),J(n.$$.fragment,1),et(n,r.parentNode,r)):n=null}else o&&n.$set(s)},i(t){s||(n&&J(n.$$.fragment,t),s=!0)},o(t){n&&X(n.$$.fragment,t),s=!1},d(t){t&&g(r),n&&nt(n,t)}}}function Ot(t){let e,n,r=null!==t[3]&&t[3].route===t[7]&&Tt(t);return{c(){r&&r.c(),e=b()},l(t){r&&r.l(t),e=b()},m(t,s){r&&r.m(t,s),d(t,e,s),n=!0},p(t,[n]){null!==t[3]&&t[3].route===t[7]?r?(r.p(t,n),8&n&&J(r,1)):(r=Tt(t),r.c(),J(r,1),r.m(e.parentNode,e)):r&&(W(),X(r,1,1,()=>{r=null}),q())},i(t){n||(J(r),n=!0)},o(t){X(r),n=!1},d(t){r&&r.d(t),t&&g(e)}}}function jt(t,n,r){let s,a,{$$slots:o={},$$scope:i}=n,{path:l=""}=n,{component:u=null}=n;const{registerRoute:h,unregisterRoute:p,activeRoute:m}=D(ut);c(t,m,t=>r(3,s=t));const d=D(lt);c(t,d,t=>r(4,a=t));const g={path:l,default:""===l};let $={},v={};var y;return h(g),"undefined"!=typeof window&&(y=()=>{p(g)},N().$$.on_destroy.push(y)),t.$$set=t=>{r(13,n=e(e({},n),f(t))),"path"in t&&r(8,l=t.path),"component"in t&&r(0,u=t.component),"$$scope"in t&&r(9,i=t.$$scope)},t.$$.update=()=>{8&t.$$.dirty&&s&&s.route===g&&r(1,$=s.params);{const{path:t,component:e,...s}=n;r(2,v=s)}},n=f(n),[u,$,v,s,a,m,d,g,l,i,o]}class Dt extends at{constructor(t){super(),st(this,t,jt,Ot,o,{path:8,component:0})}}function Pt(t){let n,r,s,a;const o=t[11].default,i=l(o,t,t[10],null);let c=[{href:t[0]},{"aria-current":t[2]},t[1]],u={};for(let t=0;t<c.length;t+=1)u=e(u,c[t]);return{c(){n=$("a"),i&&i.c(),this.h()},l(t){n=k(t,"A",{href:!0,"aria-current":!0});var e=I(n);i&&i.l(e),e.forEach(g),this.h()},h(){E(n,u)},m(e,o){var c,l,u,h;d(e,n,o),i&&i.m(n,null),r=!0,s||(c=n,l="click",u=t[5],c.addEventListener(l,u,h),a=()=>c.removeEventListener(l,u,h),s=!0)},p(t,[e]){i&&i.p&&1024&e&&h(i,o,t,t[10],e,null,null),E(n,u=Y(c,[(!r||1&e)&&{href:t[0]},(!r||4&e)&&{"aria-current":t[2]},2&e&&t[1]]))},i(t){r||(J(i,t),r=!0)},o(t){X(i,t),r=!1},d(t){t&&g(n),i&&i.d(t),s=!1,a()}}}function Ht(t,e,n){let r,s,{$$slots:a={},$$scope:o}=e,{to:i="#"}=e,{replace:l=!1}=e,{state:u={}}=e,{getProps:h=(()=>({}))}=e;const{base:f}=D(ut);c(t,f,t=>n(14,r=t));const p=D(lt);c(t,p,t=>n(15,s=t));const m=O();let d,g,$,v,y;return t.$$set=t=>{"to"in t&&n(6,i=t.to),"replace"in t&&n(7,l=t.replace),"state"in t&&n(8,u=t.state),"getProps"in t&&n(9,h=t.getProps),"$$scope"in t&&n(10,o=t.$$scope)},t.$$.update=()=>{16448&t.$$.dirty&&n(0,d="/"===i?r.uri:function(t,e){if(dt(t,"/"))return t;const[n,r]=t.split("?"),[s]=e.split("?"),a=$t(n),o=$t(s);if(""===a[0])return bt(s,r);if(!dt(a[0],"."))return bt(("/"===s?"":"/")+o.concat(a).join("/"),r);const i=o.concat(a),c=[];return i.forEach(t=>{".."===t?c.pop():"."!==t&&c.push(t)}),bt("/"+c.join("/"),r)}(i,r.uri)),32769&t.$$.dirty&&n(12,g=dt(s.pathname,d)),32769&t.$$.dirty&&n(13,$=d===s.pathname),8192&t.$$.dirty&&n(2,y=$?"page":void 0),45569&t.$$.dirty&&n(1,v=h({location:s,href:d,isPartiallyCurrent:g,isCurrent:$}))},[d,v,y,f,p,function(t){if(m("click",t),function(t){return!t.defaultPrevented&&0===t.button&&!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}(t)){t.preventDefault();const e=s.pathname===d||l;pt(d,{state:u,replace:e})}},i,l,u,h,o,a]}class Lt extends at{constructor(t){super(),st(this,t,Ht,Pt,o,{to:6,replace:7,state:8,getProps:9})}}function _t(e){let n,r,s;return{c(){n=v("svg"),r=v("path"),this.h()},l(t){n=k(t,"svg",{"aria-hidden":!0,class:!0,role:!0,xmlns:!0,viewBox:!0},1);var e=I(n);r=k(e,"path",{fill:!0,d:!0},1),I(r).forEach(g),e.forEach(g),this.h()},h(){x(r,"fill","currentColor"),x(r,"d",e[0]),x(n,"aria-hidden","true"),x(n,"class",s=p(e[1])+" svelte-1d15yci"),x(n,"role","img"),x(n,"xmlns","http://www.w3.org/2000/svg"),x(n,"viewBox",e[2])},m(t,e){d(t,n,e),m(n,r)},p(t,[e]){1&e&&x(r,"d",t[0]),2&e&&s!==(s=p(t[1])+" svelte-1d15yci")&&x(n,"class",s),4&e&&x(n,"viewBox",t[2])},i:t,o:t,d(t){t&&g(n)}}}function Ct(t,n,r){let{icon:s}=n,a=[],o="",i="";return t.$$set=t=>{r(4,n=e(e({},n),f(t))),"icon"in t&&r(3,s=t.icon)},t.$$.update=()=>{8&t.$$.dirty&&r(2,i="0 0 "+s.icon[0]+" "+s.icon[1]),r(1,o="fa-svelte "+(n.class?n.class:"")),8&t.$$.dirty&&r(0,a=s.icon[4])},n=f(n),[a,o,i,s]}class Mt extends at{constructor(t){super(),st(this,t,Ct,_t,o,{icon:3})}}function Bt(t,e,n){return t(n={path:e,exports:{},require:function(t,e){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==e&&n.path)}},n.exports),n.exports}var Gt=Bt((function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n="twitter",r=[],s="f099",a="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z";e.definition={prefix:"fab",iconName:n,icon:[512,512,r,s,a]},e.faTwitter=e.definition,e.prefix="fab",e.iconName=n,e.width=512,e.height=512,e.ligatures=r,e.unicode=s,e.svgPathData=a})),Ut=Bt((function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n="github",r=[],s="f09b",a="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z";e.definition={prefix:"fab",iconName:n,icon:[496,512,r,s,a]},e.faGithub=e.definition,e.prefix="fab",e.iconName=n,e.width=496,e.height=512,e.ligatures=r,e.unicode=s,e.svgPathData=a}));function Vt(t){let e;return{c(){e=y("Published")},l(t){e=A(t,"Published")},m(t,n){d(t,e,n)},d(t){t&&g(e)}}}function zt(t){let e;return{c(){e=y("About")},l(t){e=A(t,"About")},m(t,n){d(t,e,n)},d(t){t&&g(e)}}}function Kt(t){let e,n,r,s,a,o,i,c,l,u,h,f;return n=new Lt({props:{to:"/",$$slots:{default:[Vt]},$$scope:{ctx:t}}}),o=new Lt({props:{to:"about",$$slots:{default:[zt]},$$scope:{ctx:t}}}),{c(){e=$("div"),Q(n.$$.fragment),r=w(),s=$("span"),a=w(),Q(o.$$.fragment),i=w(),c=$("span"),l=w(),u=$("a"),h=y("c.v."),this.h()},l(t){e=k(t,"DIV",{class:!0});var f=I(e);tt(n.$$.fragment,f),r=S(f),s=k(f,"SPAN",{class:!0}),I(s).forEach(g),a=S(f),tt(o.$$.fragment,f),i=S(f),c=k(f,"SPAN",{class:!0}),I(c).forEach(g),l=S(f),u=k(f,"A",{class:!0,title:!0,href:!0});var p=I(u);h=A(p,"c.v."),p.forEach(g),f.forEach(g),this.h()},h(){x(s,"class","divide svelte-1pdawov"),x(c,"class","divide svelte-1pdawov"),x(u,"class",""),x(u,"title","Resume"),x(u,"href","assets/resume.pdf"),x(e,"class","flex-left svelte-1pdawov")},m(t,p){d(t,e,p),et(n,e,null),m(e,r),m(e,s),m(e,a),et(o,e,null),m(e,i),m(e,c),m(e,l),m(e,u),m(u,h),f=!0},p(t,e){const r={};2&e&&(r.$$scope={dirty:e,ctx:t}),n.$set(r);const s={};2&e&&(s.$$scope={dirty:e,ctx:t}),o.$set(s)},i(t){f||(J(n.$$.fragment,t),J(o.$$.fragment,t),f=!0)},o(t){X(n.$$.fragment,t),X(o.$$.fragment,t),f=!1},d(t){t&&g(e),nt(n),nt(o)}}}function Ft(t){let e,n,r,s,a,o,i,c,l,u;return n=new kt({props:{url:t[0],$$slots:{default:[Kt]},$$scope:{ctx:t}}}),o=new Mt({props:{icon:Ut.faGithub}}),l=new Mt({props:{icon:Gt.faTwitter}}),{c(){e=$("div"),Q(n.$$.fragment),r=w(),s=$("div"),a=$("a"),Q(o.$$.fragment),i=w(),c=$("a"),Q(l.$$.fragment),this.h()},l(t){e=k(t,"DIV",{id:!0,class:!0});var u=I(e);tt(n.$$.fragment,u),r=S(u),s=k(u,"DIV",{class:!0});var h=I(s);a=k(h,"A",{class:!0,title:!0,target:!0,href:!0});var f=I(a);tt(o.$$.fragment,f),f.forEach(g),i=S(h),c=k(h,"A",{class:!0,title:!0,target:!0,href:!0});var p=I(c);tt(l.$$.fragment,p),p.forEach(g),h.forEach(g),u.forEach(g),this.h()},h(){x(a,"class","icon icon-logo"),x(a,"title","Github"),x(a,"target","_blank"),x(a,"href","https://github.com/man-shar"),x(c,"class","icon icon-logo"),x(c,"title","Twitter"),x(c,"target","_blank"),x(c,"href","https://twitter.com/manshar_"),x(s,"class","flex-right svelte-1pdawov"),x(e,"id","divider"),x(e,"class","svelte-1pdawov")},m(t,h){d(t,e,h),et(n,e,null),m(e,r),m(e,s),m(s,a),et(o,a,null),m(s,i),m(s,c),et(l,c,null),u=!0},p(t,[e]){const r={};1&e&&(r.url=t[0]),2&e&&(r.$$scope={dirty:e,ctx:t}),n.$set(r)},i(t){u||(J(n.$$.fragment,t),J(o.$$.fragment,t),J(l.$$.fragment,t),u=!0)},o(t){X(n.$$.fragment,t),X(o.$$.fragment,t),X(l.$$.fragment,t),u=!1},d(t){t&&g(e),nt(n),nt(o),nt(l)}}}function Wt(t,e,n){let{url:r=""}=e;return t.$$set=t=>{"url"in t&&n(0,r=t.url)},[r]}class qt extends at{constructor(t){super(),st(this,t,Wt,Ft,o,{url:0})}}function Jt(t){let e,n;return{c(){e=$("img"),this.h()},l(t){e=k(t,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){x(e,"class","h-100"),e.src!==(n="assets/"+t[0])&&x(e,"src",n),x(e,"alt","kn")},m(t,n){d(t,e,n)},p(t,r){1&r&&e.src!==(n="assets/"+t[0])&&x(e,"src",n)},d(t){t&&g(e)}}}function Xt(t){let e,n,r;return{c(){e=$("video"),n=$("source"),this.h()},l(t){e=k(t,"VIDEO",{class:!0,autoplay:!0,loop:!0,muted:!0,playsinline:!0});var r=I(e);n=k(r,"SOURCE",{src:!0}),r.forEach(g),this.h()},h(){n.src!==(r="assets/"+t[0])&&x(n,"src",r),x(e,"class","h-100"),e.autoplay=!0,e.loop=!0,e.muted=!0,e.playsInline=!0},m(t,r){d(t,e,r),m(e,n)},p(t,e){1&e&&n.src!==(r="assets/"+t[0])&&x(n,"src",r)},d(t){t&&g(e)}}}function Yt(e){let n,r;function s(t,e){return(null==r||1&e)&&(r=!(!t[0]||-1===t[0].indexOf("mp4"))),r?Xt:Jt}let a=s(e,-1),o=a(e);return{c(){n=$("div"),o.c(),this.h()},l(t){n=k(t,"DIV",{class:!0});var e=I(n);o.l(e),e.forEach(g),this.h()},h(){x(n,"class","project-image svelte-1usd5um")},m(t,e){d(t,n,e),o.m(n,null)},p(t,[e]){a===(a=s(t,e))&&o?o.p(t,e):(o.d(1),o=a(t),o&&(o.c(),o.m(n,null)))},i:t,o:t,d(t){t&&g(n),o.d()}}}function Zt(t,e,n){let{path:r}=e;return t.$$set=t=>{"path"in t&&n(0,r=t.path)},[r]}class Qt extends at{constructor(t){super(),st(this,t,Zt,Yt,o,{path:0})}}function te(e){let n;return{c(){n=$("div")},l(t){n=k(t,"DIV",{}),I(n).forEach(g)},m(t,r){d(t,n,r),n.innerHTML=e[0]},p(t,[e]){1&e&&(n.innerHTML=t[0])},i:t,o:t,d(t){t&&g(n)}}}function ee(t,e,n){let{name:r}=e;return t.$$set=t=>{"name"in t&&n(0,r=t.name)},[r]}class ne extends at{constructor(t){super(),st(this,t,ee,te,o,{name:0})}}function re(t){let e,n,r,s,a,o,i,c;return r=new Qt({props:{path:t[0].img}}),a=new ne({props:{name:t[0].name}}),{c(){e=$("a"),n=$("div"),Q(r.$$.fragment),s=w(),Q(a.$$.fragment),this.h()},l(t){e=k(t,"A",{target:!0,href:!0,class:!0});var o=I(e);n=k(o,"DIV",{class:!0,id:!0});var i=I(n);tt(r.$$.fragment,i),s=S(i),tt(a.$$.fragment,i),i.forEach(g),o.forEach(g),this.h()},h(){x(n,"class","project svelte-n66dlj"),x(n,"id",o=t[0].img.split(".")[0]),x(e,"target","_blank"),x(e,"href",i=t[0].link),x(e,"class","svelte-n66dlj")},m(t,o){d(t,e,o),m(e,n),et(r,n,null),m(n,s),et(a,n,null),c=!0},p(t,[s]){const l={};1&s&&(l.path=t[0].img),r.$set(l);const u={};1&s&&(u.name=t[0].name),a.$set(u),(!c||1&s&&o!==(o=t[0].img.split(".")[0]))&&x(n,"id",o),(!c||1&s&&i!==(i=t[0].link))&&x(e,"href",i)},i(t){c||(J(r.$$.fragment,t),J(a.$$.fragment,t),c=!0)},o(t){X(r.$$.fragment,t),X(a.$$.fragment,t),c=!1},d(t){t&&g(e),nt(r),nt(a)}}}function se(t,e,n){let{project:r}=e;return t.$$set=t=>{"project"in t&&n(0,r=t.project)},[r]}class ae extends at{constructor(t){super(),st(this,t,se,re,o,{project:0})}}function oe(t,e,n){const r=t.slice();return r[1]=e[n],r}function ie(t){let e,n;return e=new ae({props:{project:t[1]}}),{c(){Q(e.$$.fragment)},l(t){tt(e.$$.fragment,t)},m(t,r){et(e,t,r),n=!0},p(t,n){const r={};1&n&&(r.project=t[1]),e.$set(r)},i(t){n||(J(e.$$.fragment,t),n=!0)},o(t){X(e.$$.fragment,t),n=!1},d(t){nt(e,t)}}}function ce(t){let e,n,r=t[0],s=[];for(let e=0;e<r.length;e+=1)s[e]=ie(oe(t,r,e));const a=t=>X(s[t],1,1,()=>{s[t]=null});return{c(){e=$("div");for(let t=0;t<s.length;t+=1)s[t].c();this.h()},l(t){e=k(t,"DIV",{id:!0,class:!0});var n=I(e);for(let t=0;t<s.length;t+=1)s[t].l(n);n.forEach(g),this.h()},h(){x(e,"id","projects-container"),x(e,"class","svelte-1qg77cl")},m(t,r){d(t,e,r);for(let t=0;t<s.length;t+=1)s[t].m(e,null);n=!0},p(t,[n]){if(1&n){let o;for(r=t[0],o=0;o<r.length;o+=1){const a=oe(t,r,o);s[o]?(s[o].p(a,n),J(s[o],1)):(s[o]=ie(a),s[o].c(),J(s[o],1),s[o].m(e,null))}for(W(),o=r.length;o<s.length;o+=1)a(o);q()}},i(t){if(!n){for(let t=0;t<r.length;t+=1)J(s[t]);n=!0}},o(t){s=s.filter(Boolean);for(let t=0;t<s.length;t+=1)X(s[t]);n=!1},d(t){t&&g(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(s,t)}}}function le(t,e,n){let{projects:r}=e;return t.$$set=t=>{"projects"in t&&n(0,r=t.projects)},[r]}class ue extends at{constructor(t){super(),st(this,t,le,ce,o,{projects:0})}}function he(e){let n,r,s,a,o,i,c,l,u,h,f,p,v,b,E,T,R,N,O,j,D,P,H,L,_,C,M,B,G,U,V,z,K,F,W,q,J,X,Y,Z,Q,tt,et,nt,rt,st,at;return{c(){n=$("div"),r=$("p"),s=y("I was born and raised in the city of Lucknow, Uttar Pradesh. The city's tenderness is hopefully still a part of me."),a=w(),o=$("p"),i=y("I studied design at IIT Guwahati and have previously interned at the Info Design Lab at IDC, Hindustan\n    Times, Scroll and The Washington Post."),c=w(),l=$("p"),u=y("I've had the great fortune of learning from the most talented and supportive\n    people in the industry."),h=w(),f=$("p"),p=y("An incomplete list of insanely kind mentors who have always – knowingly or unknowingly – given me more than I have deserved: "),v=$("br"),b=w(),E=$("a"),T=y("Simon Scarr"),R=y(" | "),N=$("a"),O=y("Monica Ulmanu"),j=y(" | "),D=$("a"),P=y("Jon McClure"),H=y(" | "),L=$("a"),_=y("Matthew Weber"),C=y(" | Jennifer T. | "),M=$("a"),B=y("Gurman Bhatia"),G=y(" | "),U=$("a"),V=y("Anand Katakam"),z=y(" | "),K=$("a"),F=y("Rishabh Srivastava"),W=y(" | "),q=$("a"),J=y("Harry Stevens"),X=y(" | "),Y=$("a"),Z=y("Prof. Venkatesh Rajamanickam"),Q=w(),tt=$("p"),et=$("span"),nt=y('"If I have seen further, it is by standing on the shoulders of giants"'),rt=w(),st=$("p"),at=y("I'm forever in their debt."),this.h()},l(t){n=k(t,"DIV",{id:!0,class:!0});var e=I(n);r=k(e,"P",{});var m=I(r);s=A(m,"I was born and raised in the city of Lucknow, Uttar Pradesh. The city's tenderness is hopefully still a part of me."),m.forEach(g),a=S(e),o=k(e,"P",{});var d=I(o);i=A(d,"I studied design at IIT Guwahati and have previously interned at the Info Design Lab at IDC, Hindustan\n    Times, Scroll and The Washington Post."),d.forEach(g),c=S(e),l=k(e,"P",{});var $=I(l);u=A($,"I've had the great fortune of learning from the most talented and supportive\n    people in the industry."),$.forEach(g),h=S(e),f=k(e,"P",{});var y=I(f);p=A(y,"An incomplete list of insanely kind mentors who have always – knowingly or unknowingly – given me more than I have deserved: "),v=k(y,"BR",{}),b=S(y),E=k(y,"A",{href:!0,class:!0});var w=I(E);T=A(w,"Simon Scarr"),w.forEach(g),R=A(y," | "),N=k(y,"A",{href:!0,class:!0});var x=I(N);O=A(x,"Monica Ulmanu"),x.forEach(g),j=A(y," | "),D=k(y,"A",{href:!0,class:!0});var ot=I(D);P=A(ot,"Jon McClure"),ot.forEach(g),H=A(y," | "),L=k(y,"A",{href:!0,class:!0});var it=I(L);_=A(it,"Matthew Weber"),it.forEach(g),C=A(y," | Jennifer T. | "),M=k(y,"A",{href:!0,class:!0});var ct=I(M);B=A(ct,"Gurman Bhatia"),ct.forEach(g),G=A(y," | "),U=k(y,"A",{href:!0,class:!0});var lt=I(U);V=A(lt,"Anand Katakam"),lt.forEach(g),z=A(y," | "),K=k(y,"A",{href:!0,class:!0});var ut=I(K);F=A(ut,"Rishabh Srivastava"),ut.forEach(g),W=A(y," | "),q=k(y,"A",{href:!0,class:!0});var ht=I(q);J=A(ht,"Harry Stevens"),ht.forEach(g),X=A(y," | "),Y=k(y,"A",{href:!0,class:!0});var ft=I(Y);Z=A(ft,"Prof. Venkatesh Rajamanickam"),ft.forEach(g),y.forEach(g),Q=S(e),tt=k(e,"P",{});var pt=I(tt);et=k(pt,"SPAN",{class:!0});var mt=I(et);nt=A(mt,'"If I have seen further, it is by standing on the shoulders of giants"'),mt.forEach(g),pt.forEach(g),rt=S(e),st=k(e,"P",{});var dt=I(st);at=A(dt,"I'm forever in their debt."),dt.forEach(g),e.forEach(g),this.h()},h(){x(E,"href","https://twitter.com/SimonScarr"),x(E,"class","svelte-1px0x7f"),x(N,"href","https://twitter.com/monicaulmanu"),x(N,"class","svelte-1px0x7f"),x(D,"href","https://twitter.com/JonRMcClure"),x(D,"class","svelte-1px0x7f"),x(L,"href","https://www.linkedin.com/in/matthew-weber-343ba4111/"),x(L,"class","svelte-1px0x7f"),x(M,"href","https://twitter.com/GurmanBhatia"),x(M,"class","svelte-1px0x7f"),x(U,"href","https://twitter.com/anandkatakam"),x(U,"class","svelte-1px0x7f"),x(K,"href","https://twitter.com/rishdotblog"),x(K,"class","svelte-1px0x7f"),x(q,"href","https://twitter.com/Harry_Stevens"),x(q,"class","svelte-1px0x7f"),x(Y,"href","http://www.idc.iitb.ac.in/venkat/index.html"),x(Y,"class","svelte-1px0x7f"),x(et,"class","italic gray svelte-1px0x7f"),x(n,"id","about-container"),x(n,"class","svelte-1px0x7f")},m(t,e){d(t,n,e),m(n,r),m(r,s),m(n,a),m(n,o),m(o,i),m(n,c),m(n,l),m(l,u),m(n,h),m(n,f),m(f,p),m(f,v),m(f,b),m(f,E),m(E,T),m(f,R),m(f,N),m(N,O),m(f,j),m(f,D),m(D,P),m(f,H),m(f,L),m(L,_),m(f,C),m(f,M),m(M,B),m(f,G),m(f,U),m(U,V),m(f,z),m(f,K),m(K,F),m(f,W),m(f,q),m(q,J),m(f,X),m(f,Y),m(Y,Z),m(n,Q),m(n,tt),m(tt,et),m(et,nt),m(n,rt),m(n,st),m(st,at)},p:t,i:t,o:t,d(t){t&&g(n)}}}class fe extends at{constructor(t){super(),st(this,t,null,he,o,{})}}function pe(e){let n;return{c(){n=$("div"),this.h()},l(t){n=k(t,"DIV",{id:!0}),I(n).forEach(g),this.h()},h(){x(n,"id","resume-container")},m(t,e){d(t,n,e)},p:t,i:t,o:t,d(t){t&&g(n)}}}class me extends at{constructor(t){super(),st(this,t,null,pe,o,{})}}function de(t){let e,n;return e=new ue({props:{projects:t[1]}}),{c(){Q(e.$$.fragment)},l(t){tt(e.$$.fragment,t)},m(t,r){et(e,t,r),n=!0},p(t,n){const r={};2&n&&(r.projects=t[1]),e.$set(r)},i(t){n||(J(e.$$.fragment,t),n=!0)},o(t){X(e.$$.fragment,t),n=!1},d(t){nt(e,t)}}}function ge(t){let e,n,r,s,a,o,i;return n=new Dt({props:{path:"about",component:fe}}),s=new Dt({props:{path:"resume",component:me}}),o=new Dt({props:{path:"/",$$slots:{default:[de]},$$scope:{ctx:t}}}),{c(){e=$("div"),Q(n.$$.fragment),r=w(),Q(s.$$.fragment),a=w(),Q(o.$$.fragment)},l(t){e=k(t,"DIV",{});var i=I(e);tt(n.$$.fragment,i),r=S(i),tt(s.$$.fragment,i),a=S(i),tt(o.$$.fragment,i),i.forEach(g)},m(t,c){d(t,e,c),et(n,e,null),m(e,r),et(s,e,null),m(e,a),et(o,e,null),i=!0},p(t,e){const n={};10&e&&(n.$$scope={dirty:e,ctx:t}),o.$set(n)},i(t){i||(J(n.$$.fragment,t),J(s.$$.fragment,t),J(o.$$.fragment,t),i=!0)},o(t){X(n.$$.fragment,t),X(s.$$.fragment,t),X(o.$$.fragment,t),i=!1},d(t){t&&g(e),nt(n),nt(s),nt(o)}}}function $e(t){let e,n,r,s,a,o,i,c,l,u,h,f;return l=new qt({}),h=new kt({props:{url:t[2],$$slots:{default:[ge]},$$scope:{ctx:t}}}),{c(){e=$("main"),n=$("div"),r=$("h1"),s=y(t[0]),a=w(),o=$("p"),i=y("Read | Understand | Explain"),c=w(),Q(l.$$.fragment),u=w(),Q(h.$$.fragment),this.h()},l(f){e=k(f,"MAIN",{class:!0});var p=I(e);n=k(p,"DIV",{id:!0,class:!0});var m=I(n);r=k(m,"H1",{class:!0});var d=I(r);s=A(d,t[0]),d.forEach(g),a=S(m),o=k(m,"P",{class:!0});var $=I(o);i=A($,"Read | Understand | Explain"),$.forEach(g),c=S(m),tt(l.$$.fragment,m),m.forEach(g),u=S(p),tt(h.$$.fragment,p),p.forEach(g),this.h()},h(){x(r,"class","svelte-vhxhna"),x(o,"class","one-liner svelte-vhxhna"),x(n,"id","top"),x(n,"class","svelte-vhxhna"),x(e,"class","svelte-vhxhna")},m(t,p){d(t,e,p),m(e,n),m(n,r),m(r,s),m(n,a),m(n,o),m(o,i),m(n,c),et(l,n,null),m(e,u),et(h,e,null),f=!0},p(t,[e]){(!f||1&e)&&function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}(s,t[0]);const n={};4&e&&(n.url=t[2]),10&e&&(n.$$scope={dirty:e,ctx:t}),h.$set(n)},i(t){f||(J(l.$$.fragment,t),J(h.$$.fragment,t),f=!0)},o(t){X(l.$$.fragment,t),X(h.$$.fragment,t),f=!1},d(t){t&&g(e),nt(l),nt(h)}}}function ve(t,e,n){let{name:r}=e,{projects:s}=e,{url:a=""}=e;return t.$$set=t=>{"name"in t&&n(0,r=t.name),"projects"in t&&n(1,s=t.projects),"url"in t&&n(2,a=t.url)},[r,s,a]}return new class extends at{constructor(t){super(),st(this,t,ve,$e,o,{name:0,projects:1,url:2})}}({target:document.body,props:{name:"Manas Sharma",projects:[{name:"The record lightning storm during the Tonga volcanic eruption",link:"https://graphics.reuters.com/TONGA-VOLCANO/LIGHTNING/zgpomjdbypd/index.html",year:2022,img:"tonga.mp4"},{name:"How herd immunity works",link:"https://graphics.reuters.com/HEALTH-CORONAVIRUS/HERD%20IMMUNITY%20(EXPLAINER)/gjnvwayydvw/index.html",year:2020,img:"herd.mp4"},{name:'The age of the "megafire" </br> Analysing a century\'s worth of fire data',link:"https://graphics.reuters.com/USA-WILDFIRES/EXTREMES/qzjvqmmravx/",year:2021,img:"megafires.mp4"},{name:"Singapore's COVID-19 explosion",link:"https://graphics.reuters.com/HEALTH-CORONAVIRUS/SINGAPORE-CLUSTERS/bdwpkdgngvm/index.html",year:2020,img:"singapore.mp4"},{name:"Devoured: How China’s largest freshwater lake was decimated by sand mining",link:"https://graphics.reuters.com/GLOBAL-ENVIRONMENT/SAND-POYANG/qzjpqxxabvx/index.html",year:2021,img:"devoured.mp4"},{name:"How CalFire's aircraft work in tandem to stop blazes",link:"https://graphics.reuters.com/CALIFORNIA-WILDFIRE/AIRCRAFT/bdwpkzmyyvm/index.html",year:2020,img:"air-attack.mp4"},{name:"Assessing Australia's bushfires impact on wildlife",link:"https://graphics.reuters.com/AUSTRALIA-BUSHFIRES-WILDLIFE/0100B5672VM/index.html",year:2020,img:"wildlife.mp4"},{name:"Shifting smoke: California's wildfires",link:"https://graphics.reuters.com/USA-WILDFIRE/POLLUTION/xlbpgjgervq/index.html",year:2020,img:"cali-smoke.mp4"},{name:"A day of COVID-19 deaths",link:"http://graphics.reuters.com/HEALTH-CORONAVIRUS/DEATHS/xlbpgobgapq/index.html",year:2020,img:"clocks.mp4"},{name:"How big were Australia's bushfires?",link:"https://graphics.reuters.com/AUSTRALIA-BUSHFIRES-SCALE/0100B4VK2PN/index.html",year:2020,img:"aus-scale.jpg"},{name:"The risks of swiftly spreading coronavirus research",link:"https://graphics.reuters.com/CHINA-HEALTH-RESEARCH/0100B5ES3MG/index.html",year:2020,img:"speed-science.jpg"},{name:"Forests in flames: Australia’s bushfires from space",link:"https://graphics.reuters.com/AUSTRALIA-BUSHFIRES-SATELLITEIMAGES/0100B4R62H1/index.html",year:2019,img:"aus-satellite.jpg"},{name:"Pollution in India: The world's worst air",link:"https://graphics.reuters.com/INDIA-POLLUTION-MAP/0100B30824L/index.html",year:2019,img:"india-pollution.mp4"},{name:"Dangerous heights: Deaths on the Himalayas",link:"https://tmsnrt.rs/2r5hOS3",year:2019,img:"himalayas.mp4"},{name:"Wikipedia wars: Hong Kong’s online frontline",link:"https://graphics.reuters.com/HONGKONG-PROTESTS-WIKIPEDIA/0100B33629V/index.html",year:2019,img:"hk-wiki.mp4"},{name:"How big were the Hong Kong protests?",link:"https://graphics.reuters.com/HONGKONG-EXTRADITION-CROWDSIZE/0100B05W0BE/index.html",year:2019,img:"head-count.mp4"},{name:"Sounds and slogans from the Hong Kong protests",link:"https://graphics.reuters.com/HONGKONG-EXTRADITION-SIGNS/0100B0630BZ/index.html",year:2019,img:"hk-signs.jpg"},{name:"How India mobilised a million polling stations ",link:"https://graphics.reuters.com/INDIA-ELECTION-STATIONS/010092FY33Z/index.html",year:2019,img:"india-polling.jpg"},{name:"What are baseball players' favourite cliches?",link:"https://www.washingtonpost.com/graphics/2018/sports/baseball-cliches/",year:2018,img:"baseball.png"},{name:"Rising communal hate crimes in India",link:"https://www.washingtonpost.com/graphics/2018/world/reports-of-hate-crime-cases-have-spiked-in-india/",year:2018,img:"india-hate.gif"},{name:'How big is Delhi\'s dowry "bazaar"?',link:"https://www.hindustantimes.com/interactives/delhi-dowry-bazaar/",year:2017,img:"dowry.png"},{name:"Looking at grade inflation by a national board of education in India",link:"https://www.hindustantimes.com/interactives/cbse-results-2017-marks-inflation-decade/",year:2017,img:"cbse.mp4"},{name:"A brief history of the US Open",link:"https://www.hindustantimes.com/interactives/a-brief-history-of-the-us-open/",year:2017,img:"us-open.png"},{name:"Graphic design movements throughout history",link:"https://man-shar.github.io/Graphic-Design-Movements-Streamgraph/GraphicDesignStream.html",year:2017,img:"graphic.png"},{name:"How society shaped Bollywood through the past century",link:"https://man-shar.github.io/BollyBlues/bolly.html",year:2017,img:"bolly.png"}]},hydrate:!0})}();
//# sourceMappingURL=bundle.js.map
