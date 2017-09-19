!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.InformationFlowLayoutRender=e()}(this,function(){"use strict";function t(t,e){return e={exports:{}},t(e,e.exports),e.exports}function e(t,e){for(var n,o=[],a=0,c=0,s="",u=e&&e.delimiter||"/",p=e&&e.delimiters||"./",l=!1;null!==(n=ut.exec(t));){var f=n[0],d=n[1],h=n.index;if(s+=t.slice(c,h),c=h+f.length,d)s+=d[1],l=!0;else{var g="",m=t[c],y=n[2],v=n[3],b=n[4],w=n[5];if(!l&&s.length){var x=s.length-1;p.indexOf(s[x])>-1&&(g=s[x],s=s.slice(0,x))}s&&(o.push(s),s="",l=!1);var O=""!==g&&void 0!==m&&m!==g,j="+"===w||"*"===w,C="?"===w||"*"===w,_=g||u,k=v||b;o.push({name:y||a++,prefix:g,delimiter:_,optional:C,repeat:j,partial:O,pattern:k?i(k):"[^"+r(_)+"]+?"})}}return(s||c<t.length)&&o.push(s+t.substr(c)),o}function n(t){for(var e=new Array(t.length),n=0;n<t.length;n++)"object"==typeof t[n]&&(e[n]=new RegExp("^(?:"+t[n].pattern+")$"));return function(n,r){for(var i="",o=r&&r.encode||encodeURIComponent,a=0;a<t.length;a++){var c=t[a];if("string"!=typeof c){var s,u=n?n[c.name]:void 0;if(Array.isArray(u)){if(!c.repeat)throw new TypeError('Expected "'+c.name+'" to not repeat, but got array');if(0===u.length){if(c.optional)continue;throw new TypeError('Expected "'+c.name+'" to not be empty')}for(var p=0;p<u.length;p++){if(s=o(u[p]),!e[a].test(s))throw new TypeError('Expected all "'+c.name+'" to match "'+c.pattern+'"');i+=(0===p?c.prefix:c.delimiter)+s}}else if("string"!=typeof u&&"number"!=typeof u&&"boolean"!=typeof u){if(!c.optional)throw new TypeError('Expected "'+c.name+'" to be '+(c.repeat?"an array":"a string"));c.partial&&(i+=c.prefix)}else{if(s=o(String(u)),!e[a].test(s))throw new TypeError('Expected "'+c.name+'" to match "'+c.pattern+'", but got "'+s+'"');i+=c.prefix+s}}else i+=c}return i}}function r(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function i(t){return t.replace(/([=!:$/()])/g,"\\$1")}function o(t,e){return Object.assign({},ht,{width:t-20},e)}var a="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},c=t(function(t){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)}),s=t(function(t){var e=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=e)}),u=function(t){return"object"==typeof t?null!==t:"function"==typeof t},p=function(t){if(!u(t))throw TypeError(t+" is not an object!");return t},l=function(t){try{return!!t()}catch(t){return!0}},f=!l(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}),d=c.document,h=u(d)&&u(d.createElement),g=function(t){return h?d.createElement(t):{}},m=!f&&!l(function(){return 7!=Object.defineProperty(g("div"),"a",{get:function(){return 7}}).a}),y=function(t,e){if(!u(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!u(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!u(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!u(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")},v=Object.defineProperty,b={f:f?Object.defineProperty:function(t,e,n){if(p(t),e=y(e,!0),p(n),m)try{return v(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},w=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}},x=f?function(t,e,n){return b.f(t,e,w(1,n))}:function(t,e,n){return t[e]=n,t},O={}.hasOwnProperty,j=function(t,e){return O.call(t,e)},C=0,_=Math.random(),k=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++C+_).toString(36))},T=t(function(t){var e=k("src"),n=Function.toString,r=(""+n).split("toString");s.inspectSource=function(t){return n.call(t)},(t.exports=function(t,n,i,o){var a="function"==typeof i;a&&(j(i,"name")||x(i,"name",n)),t[n]!==i&&(a&&(j(i,e)||x(i,e,t[n]?""+t[n]:r.join(String(n)))),t===c?t[n]=i:o?t[n]?t[n]=i:x(t,n,i):(delete t[n],x(t,n,i)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[e]||n.call(this)})}),D=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t},E=function(t,e,n){if(D(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}},S=function(t,e,n){var r,i,o,a,u=t&S.F,p=t&S.G,l=t&S.S,f=t&S.P,d=t&S.B,h=p?c:l?c[e]||(c[e]={}):(c[e]||{}).prototype,g=p?s:s[e]||(s[e]={}),m=g.prototype||(g.prototype={});p&&(n=e);for(r in n)o=((i=!u&&h&&void 0!==h[r])?h:n)[r],a=d&&i?E(o,c):f&&"function"==typeof o?E(Function.call,o):o,h&&T(h,r,o,t&S.U),g[r]!=o&&x(g,r,a),f&&m[r]!=o&&(m[r]=o)};c.core=s,S.F=1,S.G=2,S.S=4,S.P=8,S.B=16,S.W=32,S.U=64,S.R=128;var I=S,W={}.toString,R=function(t){return W.call(t).slice(8,-1)},A=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==R(t)?t.split(""):Object(t)},M=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t},P=function(t){return A(M(t))},z=Math.ceil,F=Math.floor,L=function(t){return isNaN(t=+t)?0:(t>0?F:z)(t)},U=Math.min,H=function(t){return t>0?U(L(t),9007199254740991):0},$=Math.max,N=Math.min,B=function(t,e){return(t=L(t))<0?$(t+e,0):N(t,e)},G=c["__core-js_shared__"]||(c["__core-js_shared__"]={}),Z=function(t){return G[t]||(G[t]={})}("keys"),V=function(t){return function(e,n,r){var i,o=P(e),a=H(o.length),c=B(r,a);if(t&&n!=n){for(;a>c;)if((i=o[c++])!=i)return!0}else for(;a>c;c++)if((t||c in o)&&o[c]===n)return t||c||0;return!t&&-1}}(!1),X=function(t){return Z[t]||(Z[t]=k(t))}("IE_PROTO"),q=function(t,e){var n,r=P(t),i=0,o=[];for(n in r)n!=X&&j(r,n)&&o.push(n);for(;e.length>i;)j(r,n=e[i++])&&(~V(o,n)||o.push(n));return o},Y="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),J=Object.keys||function(t){return q(t,Y)},K={f:Object.getOwnPropertySymbols},Q={f:{}.propertyIsEnumerable},tt=function(t){return Object(M(t))},et=Object.assign,nt=!et||l(function(){var t={},e={},n=Symbol(),r="abcdefghijklmnopqrst";return t[n]=7,r.split("").forEach(function(t){e[t]=t}),7!=et({},t)[n]||Object.keys(et({},e)).join("")!=r})?function(t,e){for(var n=tt(t),r=arguments.length,i=1,o=K.f,a=Q.f;r>i;)for(var c,s=A(arguments[i++]),u=o?J(s).concat(o(s)):J(s),p=u.length,l=0;p>l;)a.call(s,c=u[l++])&&(n[c]=s[c]);return n}:et;I(I.S+I.F,"Object",{assign:nt});var rt=t(function(t,e){function n(t,e){return null==t?void 0:t[e]}function r(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function i(t){return!(!g(t)||c(t))&&(d(t)||r(t)?F:C).test(u(t))}function o(t,e){var r=n(t,e);return i(r)?r:void 0}function c(t){return!!A&&A in t}function s(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||W)}function u(t){if(null!=t){try{return M.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function p(t){return f(t)&&P.call(t,"callee")&&(!U.call(t,"callee")||z.call(t)==v)}function l(t){return null!=t&&h(t.length)&&!d(t)}function f(t){return m(t)&&l(t)}function d(t){var e=g(t)?z.call(t):"";return e==b||e==w}function h(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=y}function g(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function m(t){return!!t&&"object"==typeof t}var y=9007199254740991,v="[object Arguments]",b="[object Function]",w="[object GeneratorFunction]",x="[object Map]",O="[object Set]",j=/[\\^$.*+?()[\]{}|]/g,C=/^\[object .+?Constructor\]$/,_="object"==typeof a&&a&&a.Object===Object&&a,k="object"==typeof self&&self&&self.Object===Object&&self,T=_||k||Function("return this")(),D=e&&!e.nodeType&&e,E=D&&!0&&t&&!t.nodeType&&t,S=E&&E.exports===D,I=Function.prototype,W=Object.prototype,R=T["__core-js_shared__"],A=function(){var t=/[^.]+$/.exec(R&&R.keys&&R.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),M=I.toString,P=W.hasOwnProperty,z=W.toString,F=RegExp("^"+M.call(P).replace(j,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),L=S?T.Buffer:void 0,U=W.propertyIsEnumerable,H=L?L.isBuffer:void 0,$=function(t,e){return function(n){return t(e(n))}}(Object.keys,Object),N=o(T,"DataView"),B=o(T,"Map"),G=o(T,"Promise"),Z=o(T,"Set"),V=o(T,"WeakMap"),X=!U.call({valueOf:1},"valueOf"),q=u(N),Y=u(B),J=u(G),K=u(Z),Q=u(V),tt=function(t){return z.call(t)};(N&&"[object DataView]"!=tt(new N(new ArrayBuffer(1)))||B&&tt(new B)!=x||G&&"[object Promise]"!=tt(G.resolve())||Z&&tt(new Z)!=O||V&&"[object WeakMap]"!=tt(new V))&&(tt=function(t){var e=z.call(t),n="[object Object]"==e?t.constructor:void 0,r=n?u(n):void 0;if(r)switch(r){case q:return"[object DataView]";case Y:return x;case J:return"[object Promise]";case K:return O;case Q:return"[object WeakMap]"}return e});var et=Array.isArray,nt=H||function(){return!1};t.exports=function(t){if(l(t)&&(et(t)||"string"==typeof t||"function"==typeof t.splice||nt(t)||p(t)))return!t.length;var e=tt(t);if(e==x||e==O)return!t.size;if(X||s(t))return!$(t).length;for(var n in t)if(P.call(t,n))return!1;return!0}}),it=function(t){void 0===t&&(t="");var e=/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;return!!t&&e.test(t)},ot=function(t,e){void 0===t&&(t=""),void 0===e&&(e="http");var n=/^\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;return t&&n.test(t)?e+":"+t:t},at={BIG_IMG:0,IMG_TEXT:1,IMGS:2,VIDEO:3,IMG_TEXT_AD:4},ct={SHOW_DESC:0,SHOW_SRC_TIME:1},st=function(t,r){return n(e(t,r))},ut=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g"),pt=function(){function t(t){this.sxinid=t&&t.sxinid,this.delay=t&&t.delay||100,this.url=t&&t.url||"http://fight55.com/s?sxinid=:sxinid&sxinitemid=:sxinitemid(.*?)",this.firstRenderUrl=t&&t.firstRenderUrl||"http://fight55.com/s?sxinid=:sxinid&show=1",this.createRedirectUrl=t&&t.createRedirectUrl}return t.prototype.scriptWay=function(t){var e=document.createElement("script");e.type="text/javascript",e.src=t,document.body.appendChild(e)},t.prototype.materielClick=function(t){if(this.url){var e=st(this.url)({sxinid:this.sxinid,sxinitemid:t});this.scriptWay(e)}},t.prototype.firstRender=function(){if(this.firstRenderUrl){var t=st(this.firstRenderUrl)({sxinid:this.sxinid});this.scriptWay(t)}},t}(),lt=1,ft=5,dt=function(){function t(t){var e=t.initData,n=void 0===e?[]:e,r=t.nextPage,i=void 0===r?lt:r,o=t.pageShowNum,a=void 0===o?ft:o,c=t.mockRemoteLoad,s=void 0!==c&&c,u=t.ajaxFetch;this.events={},this.loading=!1,this.isEnd=!1,this.page=i,this.mockRemoteLoad=s,this.showNum=a,this.data=n,u&&(this.ajaxFetch=u)}return t.prototype.fetchData=function(t,e){var n=this;if(!this.loading&&!this.isEnd){this.loading=!0;var r=this.ajaxFetch;this.publish("fetch-begin");r({page:t,success:function(t){n.loading=!1,n.showNum>t.length&&(n.isEnd=!0),n.publish("fetch-success"),e(t)},fail:function(t){throw n.loading=!1,n.isEnd=!0,n.publish("fetch-fail"),t}})}},t.prototype.fetchNext=function(t){if(!this.loading&&!this.isEnd){var e=this.page;this.page=e+1,this.fetchData(e,t)}},t.prototype.mockFetch=function(t,e){var n=this.data,r=this.showNum,i=Math.min((t-1)*r,n.length),o=Math.min(t*r,n.length);o>=n.length&&(this.isEnd=!0);var a=n.slice(i,o);a.length&&(this.publish("fetch-success"),e(a))},t.prototype.mockFetchNext=function(t){if(!this.isEnd){var e=this.page;this.page=e+1,this.mockFetch(e,t)}},t.prototype.getInit=function(t){this.mockRemoteLoad?this.mockFetch(1,t):t(this.data)},t.prototype.getNext=function(t){this.mockRemoteLoad?this.mockFetchNext(t):this.fetchNext(t)},t.prototype.subscribe=function(t,e){this.events[t]||(this.events[t]=[]),this.events[t].push(e)},t.prototype.publish=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=this.events.hasOwnProperty(t)?this.events[t]:[];if(!r||0===r.length)return!1;for(var i=0;i<r.length;i++)r[i].apply(this,e)},t}(),ht={"line-height":0,"background-color":"#eee",padding:"",margin:"8px 0px 0px 10px",border:"",left:10,height:1,top:0,position:"",display:"block"},gt={width:"",height:20,display:"inline-block",position:"","background-color":"#fff",overflow:"hidden","text-decoration":"none","font-size":12,color:"#999","font-family":"Arial, Helvetica, sans-serif","text-align":"left","line-height":20,"text-overflow":"ellipsis","o-text-overflow":"ellipsis",padding:"",border:""},mt={display:"block",position:"relative",left:0,top:0,height:"auto","line-height":"100%","text-align":"left"},yt={configDescCreate:function(t,e){return Object.assign({},gt,{"max-width":t-80+"px"},e)},configDescWrapCreate:function(t,e){return Object.assign({},mt,e)}},vt={height:20,display:"block","line-height":20,"text-align":"left",position:"relative",left:0,top:0},bt={top:0,left:0,width:"",height:"",display:"inline-block",position:"","font-size":12,color:"#999","font-family":"Arial, Helvetica, sans-serif","text-align":"left","white-space":"nowrap","text-overflow":"ellipsis","o-text-overflow":"ellipsis","margin-right":"8px"},wt={configWrapCreate:function(t,e){return Object.assign({},vt,e)},configItemCreate:function(t,e){return Object.assign({},bt,e)}},xt=new(function(){function t(){var e=this;this.genStyle=function(e){var n="";if(e){var r=t.pxStyles;for(var i in e)if(e.hasOwnProperty(i)){var o=e[i],a=!!r[i]&&!isNaN(parseFloat(o))&&isFinite(o);n+=i+":"+e[i]+(a?"px;":";")}}return n},this.appendStyle=function(t,n){var r=e.genStyle(n),i=t.style.cssText;t.style.cssText=i+r}}return t.pxStyles={width:1,height:1,"line-height":1,"padding-left":1,"padding-right":1,"padding-top":1,"padding-bottom":1,"border-width":1,"font-size":1,"margin-left":1,"margin-right":1,"margin-top":1,"margin-bottom":1,"border-left-width":1,"border-right-width":1,"border-top-width":1,"border-bottom-width":1,top:1,left:1,bottom:1,right:1},t.getCurrentStyle=function(t,e){return t.currentStyle?t.currentStyle[e]:window.getComputedStyle?window.getComputedStyle(t)[e]:void 0},t}()),Ot=function(){function t(){}return t.prototype.buildDom=function(t,e,n){void 0===e&&(e={});var r=document.createElement(t);if(e)for(var i in e)e.hasOwnProperty(i)&&(r[i]=e[i]);if(n){var o=n();xt.appendStyle(r,o)}return r},t.prototype.createDescDom=function(t,e,n,r){void 0===e&&(e=0),void 0===n&&(n=0);var i={innerText:r||""},o=yt.configDescCreate(t,{top:e,left:n,"margin-top":e,"margin-left":n}),a=this.buildDom("div",i,function(){return o}),c=this.buildDom("div",{},function(){return yt.configDescWrapCreate(t)});return c.appendChild(a),c},t.prototype.createSrcAndTimeDom=function(t,e,n,r,i,o){var a=document.createElement("div");if(!i||!o)return a;var c={top:e,height:r,"margin-left":n,"margin-top":e},s=wt.configWrapCreate(t,c);xt.appendStyle(a,s);var u=document.createElement("div"),p=wt.configItemCreate(t,{"line-height":r});u.innerText=i,xt.appendStyle(u,p);var l=document.createElement("div");return l.innerText=o,xt.appendStyle(l,p),a.appendChild(u),a.appendChild(l),a},t.prototype.createLineDom=function(t,e,n){return void 0===n&&(n=""),this.buildDom("div",{},function(){return o(t,{top:e,position:n})})},t}(),jt={top:0,left:0,height:"auto",display:"block",position:"","background-color":"#fff",overflow:"hidden","text-decoration":"none"},Ct={top:0,left:10,height:"auto",display:"block",position:"","font-size":18,color:"#000","font-family":"Arial, Helvetica, sans-serif","text-align":"left","line-height":"auto",overflow:"hidden","text-overflow":"ellipsis","o-text-overflow":"ellipsis","text-decoration":"none",padding:"",margin:"10px 0px 0px 10px",border:""},_t={top:0,left:10,display:"block",position:"","background-size":"cover",overflow:"hidden",border:"",margin:"5px 0px 0px 10px",padding:""},kt={configWrapCreate:function(t,e){return Object.assign({},jt,{width:t},e)},configTitleContainerCreate:function(t,e){return Object.assign({},Ct,{width:t-20},e)},configImgContainerCreate:function(t,e){var n=t-20;return Object.assign({},_t,{width:n,height:1*n/2.3},e)}},Tt=function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),Dt=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Tt(e,t),e.prototype.createWrapper=function(t,e,n,r,i){void 0===e&&(e="javascript:;"),void 0===n&&(n="_target"),void 0===r&&(r="");return this.buildDom("a",{href:e,target:n,title:r,onclick:i},function(){return kt.configWrapCreate(t)})},e.prototype.createTitle=function(t,e){return this.buildDom("span",{innerText:e},function(){return kt.configTitleContainerCreate(t)})},e.prototype.createContent=function(t,e){var n=this.buildDom("div",{},function(){return kt.configImgContainerCreate(t)});return n.style.background="url("+e+") center center no-repeat",n.style.backgroundSize="cover",n},e.prototype.createRemark=function(t,e,n,r,i){return e===ct.SHOW_SRC_TIME?this.createSrcAndTimeDom(t,10,10,20,r,i):this.createDescDom(t,10,10,n)},e.prototype.render=function(t,e,n,r,i){var o=n.title,a=n.imageUrl,c=n.type,s=n.src,u=n.desc,p=n.time,l=n.curl,f=n.target;if(a){var d=this.createWrapper(e,r||l,f,o,i),h=this.createTitle(e,o),g=this.createContent(e,a),m=this.createRemark(e,c,u,s,p),y=this.createLineDom(e,0);d.appendChild(h),d.appendChild(g),d.appendChild(m),d.appendChild(y),t.appendChild(d)}},e}(Ot),Et={top:0,left:0,height:"auto",display:"block",position:"","background-color":"#fff",overflow:"hidden","text-decoration":"none"},St={top:0,left:10,height:"auto",display:"block",position:"","font-size":18,color:"#000","font-family":"Arial, Helvetica, sans-serif","text-align":"left","line-height":20,overflow:"hidden","-webkit-line-clamp":"2","text-overflow":"ellipsis","o-text-overflow":"ellipsis","text-decoration":"none",padding:"",margin:"15px 10px 0px",border:""},It={position:"relative",top:0,left:0,width:"100%",height:"auto",display:"block",padding:"none",margin:"none",border:"none",overflow:"hidden"},Wt={top:5,left:10,display:"inline-block",position:"",padding:"",margin:"5px 0px 10px 10px",border:""},Rt={configWrapCreate:function(t,e){return Object.assign({},Et,{width:t},e)},configTitleCreate:function(t,e){return Object.assign({},St,{width:t-20},e)},configImgItemCreate:function(t,e,n){void 0===n&&(n=3);var r=(t-20-2*n)/n;return Object.assign({},Wt,{width:r,height:66*r/98},e)},configImgsWrapCreate:function(t,e){return Object.assign({},It,{},e)}},At=function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),Mt=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return At(e,t),e.prototype.createWrapper=function(t,e,n,r,i){void 0===e&&(e="javascript:;"),void 0===n&&(n="_target"),void 0===r&&(r="");return this.buildDom("a",{href:e,target:n,title:r,onclick:i},function(){return Rt.configWrapCreate(t)})},e.prototype.createTitle=function(t,e){return this.buildDom("span",{innerText:e},function(){return Rt.configTitleCreate(t)})},e.prototype.createContent=function(t,e){for(var n=this.buildDom("div",{},function(){return Rt.configImgsWrapCreate(t)}),r=[],i=e.length,o=this,a=0;a<i;a++)!function(n){var a=e[n],c={};0!==n&&(c["margin-left"]="3px");var s=o.buildDom("div",{},function(){return Rt.configImgItemCreate(t,c,i)});s.style.background="url("+a+") center center no-repeat",s.style.backgroundSize="cover",r.push(s)}(a);for(var c in r)n.appendChild(r[c]);return n},e.prototype.createRemark=function(t,e,n,r,i){return e===ct.SHOW_SRC_TIME?this.createSrcAndTimeDom(t,0,10,20,r,i):this.createDescDom(t,0,10,n)},e.prototype.render=function(t,e,n,r,i){var o=n.title,a=n.images,c=n.type,s=n.src,u=n.desc,p=n.time,l=n.curl,f=n.target;if(a&&0!==a.length){var d=this.createWrapper(e,r||l,f,o,i),h=this.createTitle(e,o),g=this.createContent(e,a),m=this.createRemark(e,c,u,s,p),y=this.createLineDom(e,0);d.appendChild(h),d.appendChild(g),d.appendChild(m),d.appendChild(y),t.appendChild(d)}},e}(Ot),Pt={top:0,left:0,display:"block",position:"","background-color":"#fff",overflow:"hidden","text-decoration":"none"},zt={top:15,left:10,display:"inline-block",position:"",border:"",margin:"15px 0px 0px 10px",padding:"","vertical-align":"top"},Ft={top:15,display:"inline-block",position:"",border:"",margin:"15px 0px 0px 10px",padding:"","line-height":"100%","vertical-align":"top"},Lt={top:18,display:"inline-block",position:"","font-size":18,color:"#000","font-family":"Arial, Helvetica, sans-serif","text-align":"left","line-height":20},Ut={configWrapCreate:function(t,e){return Object.assign({},Pt,{width:t},e)},configImgCreate:function(t,e){var n=100*t/320;return Object.assign({},zt,{width:n,height:33*n/50},e)},configRightCreate:function(t,e){var n=100*t/320;return Object.assign({},Ft,{left:n+20,width:t-30-n},e)},configTitleWrapCreate:function(t,e){var n=100*t/320;return Object.assign({},Lt,{left:n+20,width:t-30-n},e)},configTitleCreate:function(t,e){var n=100*t/320;return Object.assign({},Lt,{width:t-30-n},e)}},Ht=function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),$t=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Ht(e,t),e.prototype.createWrapper=function(t,e,n,r,i){void 0===e&&(e="javascript:;"),void 0===n&&(n="_target"),void 0===r&&(r="");return this.buildDom("a",{href:e,target:n,title:r,onclick:i},function(){return Ut.configWrapCreate(t)})},e.prototype.createTitle=function(t,e){var n=this.buildDom("div",{},function(){return Ut.configTitleWrapCreate(t)}),r=this.buildDom("span",{innerText:e},function(){return Ut.configTitleCreate(t)});return n.appendChild(r),n},e.prototype.createImgContent=function(t,e){var n=this.buildDom("div",{},function(){return Ut.configImgCreate(t)});return n.style.background="url("+e+") center center no-repeat",n.style.backgroundSize="cover",n},e.prototype.createTextContent=function(t){return this.buildDom("div",{},function(){return Ut.configRightCreate(t)})},e.prototype.createRemark=function(t,e,n,r,i){return e===ct.SHOW_SRC_TIME?this.createSrcAndTimeDom(t,5,0,20,r,i):this.createDescDom(t,10,0,n)},e.prototype.render=function(t,e,n,r,i){var o=n.title,a=n.imageUrl,c=n.type,s=n.src,u=n.desc,p=n.time,l=n.curl,f=n.target;if(a){var d=this.createWrapper(e,r||l,f,o,i),h=this.createTitle(e,o),g=this.createImgContent(e,a),m=this.createTextContent(e),y=this.createRemark(e,c,u,s,p),v=this.createLineDom(e,13);m.appendChild(h),m.appendChild(y),d.appendChild(g),d.appendChild(m),d.appendChild(v),t.appendChild(d)}},e}(Ot),Nt=function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),Bt=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Nt(e,t),e.prototype.createWrapper=function(t,e,n,r,i){void 0===e&&(e="javascript:;"),void 0===n&&(n="_target"),void 0===r&&(r="");return this.buildDom("a",{href:e,target:n,title:r,onclick:i},function(){return Rt.configWrapCreate(t)})},e.prototype.createTitle=function(t,e){return this.buildDom("span",{innerText:e},function(){return Rt.configTitleCreate(t)})},e.prototype.createContent=function(t,e){for(var n=this.buildDom("div",{},function(){return Rt.configImgsWrapCreate(t)}),r=[],i=e.length,o=this,a=0;a<i;a++)!function(n){var a=e[n],c={};0!==n&&(c["margin-left"]="3px");var s=o.buildDom("div",{},function(){return Rt.configImgItemCreate(t,c,i)});s.style.background="url("+a+") center center no-repeat",s.style.backgroundSize="cover",r.push(s)}(a);for(var c in r)n.appendChild(r[c]);return n},e.prototype.createRemark=function(t,e,n,r,i){return e===ct.SHOW_SRC_TIME?this.createSrcAndTimeDom(t,0,10,20,r,i):this.createDescDom(t,0,10,n)},e.prototype.render=function(t,e,n,r,i){var o=n.title,a=n.images,c=n.type,s=n.src,u=n.desc,p=n.time,l=n.curl,f=n.target;if(a&&0!==a.length){var d=this.createWrapper(e,r||l,f,o,i),h=this.createTitle(e,o),g=this.createContent(e,a),m=this.createRemark(e,c,u,s,p),y=this.createLineDom(e,0);d.appendChild(h),d.appendChild(g),d.appendChild(m),d.appendChild(y),t.appendChild(d)}},e}(Ot),Gt={right:15,top:0,display:"block",position:"absolute",color:"#999",overflow:"hidden","text-decoration":"none","font-size":12,"line-height":20,height:20},Zt={configAdMaskCreate:function(t,e){return Object.assign({},Gt,{},e)}},Vt=function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),Xt=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Vt(e,t),e.prototype.createRemark=function(e,n,r,i,o){var a=t.prototype.createRemark.call(this,e,n,r,i,o),c=this.buildDom("div",{innerText:"广告"},function(){return Zt.configAdMaskCreate(e)});return a.appendChild(c),a},e.prototype.createExposureImgs=function(t,e){for(var n=this.buildDom("span",{},function(){return{display:"none"}}),r=e.length,i=0;i<r;i++){var o=e[i],a=this.buildDom("img",{src:o});n.appendChild(a)}return n},e.prototype.render=function(e,n,r,i,o){t.prototype.render.call(this,e,n,r,i,o);var a=r.monitorUrl,c=r.reqUrls,s=[];a&&a.length&&(s=s.concat(a)),c&&c.length&&(s=s.concat(c));var u=this.createExposureImgs(n,s);e.appendChild(u)},e}(Bt),qt={top:0,left:0,height:30,"line-height":30,"font-size":18,display:"block",position:"","background-color":"#eee",color:"#888",overflow:"hidden","text-align":"center"},Yt={configWrapCreate:function(t,e){return Object.assign({},qt,e)}},Jt={top:0,left:0,height:30,"line-height":30,display:"block",position:"relative","background-color":"#fff",margin:"15px 0px 0px 10px",overflow:"visible","z-index":"-1","border-bottom":"2px solid #dddddd"},Kt={top:0,left:0,height:30,width:70,"line-height":30,"font-size":16,position:"relative",color:"#888",overflow:"hidden","text-align":"left","border-bottom":"2px solid #4280db"},Qt={configWrapCreate:function(t,e){return Object.assign({},Jt,{width:t-15},e)},configTitleCreate:function(t,e){return Object.assign({},Kt,e)}},te=function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),ee=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return te(e,t),e.prototype.createHeader=function(t,e){void 0===e&&(e="猜你喜欢");var n=this.buildDom("div",{},function(){return Qt.configWrapCreate(t)}),r=this.buildDom("div",{},function(){return Qt.configTitleCreate(t)});return r.innerText=e,n.appendChild(r),n},e.prototype.createFooter=function(t){return this.buildDom("div",{},function(){return Yt.configWrapCreate(t)})},e.prototype.createrContainer=function(){return this.buildDom("div",{})},e}(Ot),ne={top:0,left:0,height:"auto",display:"block",position:"","background-color":"#fff",overflow:"hidden","text-decoration":"none"},re={top:0,left:10,height:"auto",display:"block",position:"","font-size":18,color:"#000","font-family":"Arial, Helvetica, sans-serif","text-align":"left","line-height":"auto",overflow:"hidden","text-overflow":"ellipsis","o-text-overflow":"ellipsis","text-decoration":"none",padding:"",margin:"10px 0px 0px 10px",border:""},ie={top:0,display:"block",position:"relative","background-size":"cover",overflow:"hidden",border:"",margin:"5px 0px 0px 10px",padding:""},oe={top:0,left:0,width:"100%",display:"block",position:"",overflow:"hidden",border:"",margin:"",padding:""},ae={top:"50%",left:"50%",width:"15%","z-index":99,"Webkit-transform":"translate(-50%, -50%)",transform:"translate(-50%, -50%)",display:"block",position:"absolute",background:"",overflow:"hidden",border:"",margin:"",padding:""},ce={configWrapCreate:function(t,e){return Object.assign({},ne,{width:t},e)},configTitleContainerCreate:function(t,e){return Object.assign({},re,{width:t-20},e)},configContainerCreate:function(t,e){var n=t-20;return Object.assign({},ie,{width:n},e)},configVideoScreenCreate:function(t,e){return Object.assign({},oe,{},e)},configPlayBtnCreate:function(t,e){return Object.assign({},ae,e)}},se=function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),ue=new(function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return se(e,t),e.prototype.createWrapper=function(t){var e={};return this.buildDom("div",e,function(){return ce.configWrapCreate(t)})},e.prototype.createTitle=function(t,e){return this.buildDom("span",{innerHTML:e},function(){return ce.configTitleContainerCreate(t)})},e.prototype.createContent=function(t,e,n){var r={poster:n,src:e,controls:"controls",preload:"none"},i=this.buildDom("video",r,function(){return ce.configVideoScreenCreate(t)});i.addEventListener("play",function(){var t=document.querySelectorAll("video");for(var e in t){var n=t[e];n!==i&&!1===n.paused&&n.pause()}});var o=this.buildDom("div",{onclick:function(t){i.paused||i.ended?i.play():i.pause()}},function(){return ce.configContainerCreate(t)});return o.appendChild(i),o},e.prototype.createRemark=function(t,e,n,r,i){return e===ct.SHOW_SRC_TIME?this.createSrcAndTimeDom(t,10,10,20,r,i):this.createDescDom(t,10,10,n)},e.prototype.render=function(t,e,n){var r=n.title,i=n.source,o=n.imageUrl,a=n.type,c=n.src,s=n.desc,u=n.time;if(o&&i){var p=this.createWrapper(e),l=this.createTitle(e,r),f=this.createContent(e,i,o),d=this.createRemark(e,a,s,c,u),h=this.createLineDom(e,0);p.appendChild(l),p.appendChild(f),p.appendChild(d),p.appendChild(h),t.appendChild(p)}},e}(Ot)),pe=new $t,le=new Dt,fe=new Mt,de=new Xt,he=new ee;return function(){function t(t){var e=this;document.body&&document.body.clientWidth?this.winWidth=document.body&&document.body.clientWidth:this.winWidth=window.innerWidth,this.loadObj=new dt(t),this.loadObj.subscribe("fetch-begin",function(){e.footer(e.loadObj.isEnd,e.loadObj.loading)}),this.loadObj.subscribe("fetch-success",function(){e.footer(e.loadObj.isEnd,e.loadObj.loading)}),this.loadObj.subscribe("fetch-fail",function(){e.footer(e.loadObj.isEnd,e.loadObj.loading)})}return t.prototype.init=function(t,e,n,r){void 0===e&&(e={}),void 0===r&&(r=!0);var i,o=document.body;if(t&&"string"==typeof t?i=document.getElementById(t)||o:"object"==typeof t&&t instanceof HTMLElement&&(i=t),i){var a=this.loadObj;if(rt(n)||(this.statisticObj=new pt(n)),this.headerDom=he.createHeader(this.winWidth),this.footerDom=he.createFooter(this.winWidth),this.footer(a.isEnd,a.loading),this.containerDom=he.createrContainer(),!r||e.dom&&e.dom!==o)this.initRender(i,e);else{var c=document.documentElement;if(c.offsetHeight>c.clientHeight+50){var s=this,u=function(){document.body.scrollHeight-(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0)-window.screen.height<=0&&(s.initRender(i,e),window.removeEventListener("scroll",u))};window.addEventListener("scroll",u)}else this.initRender(i,e)}}},t.prototype.initRender=function(t,e){var n=this;void 0===e&&(e={});var r=this.headerDom,i=this.containerDom;i.appendChild(r),t.appendChild(i),this.loadObj.getInit(function(t){return n.render(t)}),this.statisticObj&&this.statisticObj.firstRender(),e.scroll&&this.watchScroll(e.dom,e.onEndReachedThreshold,function(t){return n.render(t)}),e&&e.click&&this.watchLoadMoreBtn(function(t){return n.render(t)})},t.prototype.render=function(t){var e=this,n=(document.body,document.createDocumentFragment()),r=this.containerDom,i=at.BIG_IMG,o=at.IMG_TEXT,a=at.IMGS,c=at.VIDEO,s=at.IMG_TEXT_AD;t.forEach(function(t){switch(t.stype){case i:e.renderBigImgItem(n,t);break;case o:e.renderImgTextItem(n,t);break;case a:e.renderImgsItem(n,t);break;case c:ue.render(n,e.winWidth,t);break;case s:e.renderImgsAdItem(n,t);break;default:return}});var u=this.footer();n.appendChild(u),r.appendChild(n)},t.prototype.watchScroll=function(t,e,n){void 0===e&&(e=50);var r=this.loadObj,i=document.body;t&&"string"==typeof t?i=document.getElementById(t)||document.body:"object"==typeof t&&t instanceof HTMLElement&&(i=t);var o=function(){i.scrollHeight-(i===document.body?window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0:i.scrollTop)-window.screen.height<=e&&r.getNext(n)},a=i===document.body?window:i;a.addEventListener?a.addEventListener("scroll",o):a.onscroll=o},t.prototype.watchLoadMoreBtn=function(t){var e=this.loadObj,n=this.footer(),r=function(){e.getNext(t)};n.addEventListener?n.addEventListener("click",function(){return r()}):n.onclick=function(){return r()}},t.prototype.renderBigImgItem=function(t,e){var n=this,r=e.imageUrl,i=e.curl,o=e.target,a=e.sxinitemid;if(r){var c=i;if(this.statisticObj&&"function"==typeof this.statisticObj.createRedirectUrl){var s=i;it(i)||(s=ot(i));var u=Object.assign({},e,{curl:s});c=this.statisticObj.createRedirectUrl(u)||i}le.render(t,this.winWidth,e,c,function(){if(n.statisticObj)return n.statisticObj.materielClick(a),setTimeout(function(){window.open(c,o||"_target")},n.statisticObj.delay),!1})}},t.prototype.renderImgTextItem=function(t,e){var n=this,r=(e.title,e.curl),i=e.imageUrl,o=e.target,a=(e.type,e.src,e.time,e.desc,e.sxinitemid);if(i){var c=r;if(this.statisticObj&&"function"==typeof this.statisticObj.createRedirectUrl){var s=r;it(r)||(s=ot(r));var u=Object.assign({},e,{curl:s});c=this.statisticObj.createRedirectUrl(u)||r}var p=this.winWidth;pe.render(t,p,e,c,function(){if(n.statisticObj)return n.statisticObj.materielClick(a),setTimeout(function(){window.open(c,o||"_target")},n.statisticObj.delay),!1})}},t.prototype.renderImgsItem=function(t,e){var n=this,r=(e.title,e.curl),i=e.images,o=e.target,a=(e.desc,e.src,e.time,e.type,e.sxinitemid);if(i&&0!==i.length){var c=r;if(this.statisticObj&&"function"==typeof this.statisticObj.createRedirectUrl){var s=r;it(r)||(s=ot(r));var u=Object.assign({},e,{curl:s});c=this.statisticObj.createRedirectUrl(u)||r}var p=this.winWidth;fe.render(t,p,e,c,function(){if(n.statisticObj)return n.statisticObj.materielClick(a),setTimeout(function(){window.open(c,o||"_target")},n.statisticObj.delay),!1})}},t.prototype.renderImgsAdItem=function(t,e){var n=this,r=(e.title,e.curl),i=e.images,o=e.target,a=(e.desc,e.src,e.time,e.type,e.sxinitemid);if(i&&0!==i.length){var c=r;if(this.statisticObj&&"function"==typeof this.statisticObj.createRedirectUrl){var s=r;it(r)||(s=ot(r));var u=Object.assign({},e,{curl:s});c=this.statisticObj.createRedirectUrl(u)||r}var p=this.winWidth;de.render(t,p,e,c,function(){if(n.statisticObj)return n.statisticObj.materielClick(a),setTimeout(function(){window.open(c,o||"_target")},n.statisticObj.delay),!1})}},t.prototype.footer=function(t,e){var n=this.footerDom;if(void 0===t&&void 0===e)return n;var r=t?"-- 加载完成 --":e?"加载中...":"加载更多";return n.innerText!==r&&(n.innerText=r),n},t}()});
//# sourceMappingURL=information-flow-layout-render.umd.js.map
