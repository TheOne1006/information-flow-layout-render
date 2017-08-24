!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.InformationFlowLayoutRender=e()}(this,function(){"use strict";function t(t,e){return e={exports:{}},t(e,e.exports),e.exports}function e(t,e){return Object.assign({},it,{width:t-20},e)}function n(t,e){return Object.assign({},rt,e)}var i=function(){function t(){var e=this;this.genStyle=function(e){var n="";if(e){var i=t.pxStyles;for(var r in e)if(e.hasOwnProperty(r)){var o=e[r],a=!!i[r]&&!isNaN(parseFloat(o))&&isFinite(o);n+=r+":"+e[r]+(a?"px;":";")}}return n},this.appendStyle=function(t,n){var i=e.genStyle(n),r=t.style.cssText;t.style.cssText=r+i}}return t.pxStyles={width:1,height:1,"line-height":1,"padding-left":1,"padding-right":1,"padding-top":1,"padding-bottom":1,"border-width":1,"font-size":1,"margin-left":1,"margin-right":1,"margin-top":1,"margin-bottom":1,"border-left-width":1,"border-right-width":1,"border-top-width":1,"border-bottom-width":1,top:1,left:1,bottom:1,right:1},t.getCurrentStyle=function(t,e){return t.currentStyle?t.currentStyle[e]:window.getComputedStyle?window.getComputedStyle(t)[e]:void 0},t}(),r=1,o=5,a=function(){function t(t){var e=t.initData,n=void 0===e?[]:e,i=t.nextPage,a=void 0===i?r:i,c=t.pageShowNum,l=void 0===c?o:c,d=t.mockRemoteLoad,f=void 0!==d&&d,p=t.ajaxFetch;this.loading=!1,this.isEnd=!1,this.page=a,this.mockRemoteLoad=f,this.showNum=l,this.data=n,p&&(this.ajaxFetch=p)}return t.prototype.fetchData=function(t,e){var n=this;if(!this.loading&&!this.isEnd){this.loading=!0;(0,this.ajaxFetch)({page:t,success:function(t){n.loading=!1,n.showNum>t.length&&(n.isEnd=!0),e(t)},fail:function(t){n.loading=!1,n.isEnd=!0,console.warn(t)}})}},t.prototype.fetchNext=function(t){if(!this.loading&&!this.isEnd){var e=this.page;this.page=e+1,this.fetchData(e,t)}},t.prototype.mockFetch=function(t,e){var n=this.data,i=this.showNum,r=Math.min((t-1)*i,n.length),o=Math.min(t*i,n.length);o===n.length&&(this.isEnd=!0);var a=n.slice(r,o);a.length&&e(a)},t.prototype.mockFetchNext=function(t){var e=this.page;this.page=e+1,this.mockFetch(e,t)},t.prototype.getInit=function(t){this.mockRemoteLoad?this.mockFetch(1,t):t(this.data)},t.prototype.getNext=function(t){this.mockRemoteLoad?this.mockFetchNext(t):this.fetchNext(t)},t}(),c=t(function(t){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)}),l=t(function(t){var e=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=e)}),d=function(t){return"object"==typeof t?null!==t:"function"==typeof t},f=function(t){if(!d(t))throw TypeError(t+" is not an object!");return t},p=function(t){try{return!!t()}catch(t){return!0}},u=!p(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}),s=c.document,h=d(s)&&d(s.createElement),g=function(t){return h?s.createElement(t):{}},m=!u&&!p(function(){return 7!=Object.defineProperty(g("div"),"a",{get:function(){return 7}}).a}),y=function(t,e){if(!d(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!d(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!d(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!d(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")},v=Object.defineProperty,b={f:u?Object.defineProperty:function(t,e,n){if(f(t),e=y(e,!0),f(n),m)try{return v(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},x=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}},w=u?function(t,e,n){return b.f(t,e,x(1,n))}:function(t,e,n){return t[e]=n,t},C={}.hasOwnProperty,S=function(t,e){return C.call(t,e)},T=0,k=Math.random(),O=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++T+k).toString(36))},j=t(function(t){var e=O("src"),n=Function.toString,i=(""+n).split("toString");l.inspectSource=function(t){return n.call(t)},(t.exports=function(t,n,r,o){var a="function"==typeof r;a&&(S(r,"name")||w(r,"name",n)),t[n]!==r&&(a&&(S(r,e)||w(r,e,t[n]?""+t[n]:i.join(String(n)))),t===c?t[n]=r:o?t[n]?t[n]=r:w(t,n,r):(delete t[n],w(t,n,r)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[e]||n.call(this)})}),D=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t},I=function(t,e,n){if(D(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,r){return t.call(e,n,i,r)}}return function(){return t.apply(e,arguments)}},E=function(t,e,n){var i,r,o,a,d=t&E.F,f=t&E.G,p=t&E.S,u=t&E.P,s=t&E.B,h=f?c:p?c[e]||(c[e]={}):(c[e]||{}).prototype,g=f?l:l[e]||(l[e]={}),m=g.prototype||(g.prototype={});f&&(n=e);for(i in n)o=((r=!d&&h&&void 0!==h[i])?h:n)[i],a=s&&r?I(o,c):u&&"function"==typeof o?I(Function.call,o):o,h&&j(h,i,o,t&E.U),g[i]!=o&&w(g,i,a),u&&m[i]!=o&&(m[i]=o)};c.core=l,E.F=1,E.G=2,E.S=4,E.P=8,E.B=16,E.W=32,E.U=64,E.R=128;var _=E,W={}.toString,M=function(t){return W.call(t).slice(8,-1)},F=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==M(t)?t.split(""):Object(t)},H=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t},z=function(t){return F(H(t))},L=Math.ceil,N=Math.floor,P=function(t){return isNaN(t=+t)?0:(t>0?N:L)(t)},R=Math.min,A=function(t){return t>0?R(P(t),9007199254740991):0},G=Math.max,B=Math.min,U=function(t,e){return(t=P(t))<0?G(t+e,0):B(t,e)},X=c["__core-js_shared__"]||(c["__core-js_shared__"]={}),q=function(t){return X[t]||(X[t]={})}("keys"),J=function(t){return function(e,n,i){var r,o=z(e),a=A(o.length),c=U(i,a);if(t&&n!=n){for(;a>c;)if((r=o[c++])!=r)return!0}else for(;a>c;c++)if((t||c in o)&&o[c]===n)return t||c||0;return!t&&-1}}(!1),K=function(t){return q[t]||(q[t]=O(t))}("IE_PROTO"),Q=function(t,e){var n,i=z(t),r=0,o=[];for(n in i)n!=K&&S(i,n)&&o.push(n);for(;e.length>r;)S(i,n=e[r++])&&(~J(o,n)||o.push(n));return o},V="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),Y=Object.keys||function(t){return Q(t,V)},Z={f:Object.getOwnPropertySymbols},$={f:{}.propertyIsEnumerable},tt=function(t){return Object(H(t))},et=Object.assign,nt=!et||p(function(){var t={},e={},n=Symbol(),i="abcdefghijklmnopqrst";return t[n]=7,i.split("").forEach(function(t){e[t]=t}),7!=et({},t)[n]||Object.keys(et({},e)).join("")!=i})?function(t,e){for(var n=tt(t),i=arguments.length,r=1,o=Z.f,a=$.f;i>r;)for(var c,l=F(arguments[r++]),d=o?Y(l).concat(o(l)):Y(l),f=d.length,p=0;f>p;)a.call(l,c=d[p++])&&(n[c]=l[c]);return n}:et;_(_.S+_.F,"Object",{assign:nt});var it={"line-height":0,"background-color":"#eee",padding:"",margin:"8px 0px 0px 10px",border:"",left:10,height:1,top:0,position:"",display:"block"},rt={width:"",height:12,display:"inline-block",position:"","background-color":"#fff",overflow:"hidden","text-decoration":"none","font-size":12,color:"#999","font-family":"Arial, Helvetica, sans-serif","text-align":"left","line-height":12,"text-overflow":"ellipsis","o-text-overflow":"ellipsis",padding:"",border:""},ot={display:"block",position:"","line-height":"100%","text-align":"left"},at={top:0,left:0,width:"",height:"",display:"inline-block",position:"","font-size":12,color:"#999","font-family":"Arial, Helvetica, sans-serif","text-align":"left","white-space":"nowrap","text-overflow":"ellipsis","o-text-overflow":"ellipsis","margin-right":"8px"},ct={configWrapCreate:function(t,e){return Object.assign({},ot,e)},configItemCreate:function(t,e){return Object.assign({},at,e)}},lt={top:0,left:0,height:"auto",display:"block",position:"","background-color":"#fff",overflow:"hidden","text-decoration":"none"},dt={top:0,left:10,height:"auto",display:"block",position:"","font-size":18,color:"#000","font-family":"Arial, Helvetica, sans-serif","text-align":"left","line-height":"auto",overflow:"hidden","text-overflow":"ellipsis","o-text-overflow":"ellipsis","text-decoration":"none",padding:"",margin:"10px 0px 0px 10px",border:""},ft={top:0,left:10,display:"block",position:"","background-size":"cover",overflow:"hidden",border:"",margin:"5px 0px 0px 10px",padding:""},pt={configWrapCreate:function(t,e){return Object.assign({},lt,{width:t},e)},configTitleContainerCreate:function(t,e){return Object.assign({},dt,{width:t-20},e)},configImgContainerCreate:function(t,e){var n=t-20;return Object.assign({},ft,{width:n,height:1*n/2.3},e)}},ut={top:0,left:0,display:"block",position:"","background-color":"#fff",overflow:"hidden","text-decoration":"none"},st={top:15,left:10,display:"inline-block",position:"",border:"",margin:"15px 0px 0px 10px",padding:"","vertical-align":"top"},ht={top:15,display:"inline-block",position:"",border:"",margin:"15px 0px 0px 10px",padding:"","line-height":"100%","vertical-align":"top"},gt={top:18,display:"inline-block",position:"","font-size":18,color:"#000","font-family":"Arial, Helvetica, sans-serif","text-align":"left","line-height":20},mt={configWrapCreate:function(t,e){return Object.assign({},ut,{width:t},e)},configImgCreate:function(t,e){var n=100*t/320;return Object.assign({},st,{width:n,height:33*n/50},e)},configRightCreate:function(t,e){var n=100*t/320;return Object.assign({},ht,{left:n+20,width:t-30-n},e)},configTitleWrapCreate:function(t,e){var n=100*t/320;return Object.assign({},gt,{left:n+20,width:t-30-n},e)},configTitleCreate:function(t,e){var n=100*t/320;return Object.assign({},gt,{width:t-30-n},e)}},yt={top:0,left:0,height:"auto",display:"block",position:"","background-color":"#fff",overflow:"hidden","text-decoration":"none"},vt={top:0,left:10,height:"auto",display:"block",position:"","font-size":18,color:"#000","font-family":"Arial, Helvetica, sans-serif","text-align":"left","line-height":20,overflow:"hidden","-webkit-line-clamp":"2","text-overflow":"ellipsis","o-text-overflow":"ellipsis","text-decoration":"none",padding:"",margin:"15px 10px 0px",border:""},bt={top:5,left:10,display:"inline-block",position:"",padding:"",margin:"5px 0px 10px 10px",border:""},xt={configWrapCreate:function(t,e){return Object.assign({},yt,{width:t},e)},configTitleCreate:function(t,e){return Object.assign({},vt,{width:t-20},e)},configImgItemCreate:function(t,e,n){void 0===n&&(n=3);var i=(t-20-2*n)/n;return Object.assign({},bt,{width:i,height:66*i/98},e)}},wt={top:0,left:0,height:15,"line-height":15,"font-size":12,display:"block",position:"","background-color":"#eee",color:"#888",overflow:"hidden","text-align":"center"},Ct={configWrapCreate:function(t,e){return Object.assign({},wt,e)}},St={top:0,left:0,height:30,"line-height":30,display:"block",position:"relative","background-color":"#fff",margin:"15px 0px 0px 10px",overflow:"visible","z-index":"-1","border-bottom":"2px solid #dddddd"},Tt={top:0,left:0,height:30,width:70,"line-height":30,"font-size":16,position:"relative",color:"#888",overflow:"hidden","text-align":"left","border-bottom":"2px solid #4280db"},kt={configWrapCreate:function(t,e){return Object.assign({},St,{width:t-15},e)},configTitleCreate:function(t,e){return Object.assign({},Tt,e)}},Ot=new i;return function(){function t(t){document.body&&document.body.clientWidth?this.winWidth=document.body&&document.body.clientWidth:this.winWidth=window.innerWidth,this.loadObj=new a(t)}return t.prototype.init=function(t,e){var n=this;void 0===e&&(e={});var i,r=document.body;if(t&&"string"==typeof t?i=document.getElementById(t)||r:"object"==typeof t&&t instanceof HTMLElement&&(i=t),i){var o=this.createHeader();i.appendChild(o);var a=this.loadObj;a.getInit(function(e){return n.render(t,e,a.isEnd)}),e.scroll&&this.watchScroll(e.dom,e.onEndReachedThreshold,function(e){return n.render(t,e,a.isEnd)})}},t.prototype.render=function(e,n,i){var r,o=this,a=document.body,c=document.createDocumentFragment();if(e&&"string"==typeof e?r=document.getElementById(e)||a:"object"==typeof e&&e instanceof HTMLElement&&(r=e),r){var l=t.layoutType.BIG_IMG,d=t.layoutType.IMG_TEXT,f=t.layoutType.IMGS;n.forEach(function(t){switch(t.stype){case l:o.renderBigImgItem(c,t);break;case d:o.renderImgTextItem(c,t);break;case f:o.renderImgsItem(c,t);break;default:return}});var p=this.createFooter(i);c.appendChild(p),r.appendChild(c)}},t.prototype.watchScroll=function(t,e,n){void 0===e&&(e=50);var i=this.loadObj,r=document.body;t&&"string"==typeof t?r=document.getElementById(t)||document.body:"object"==typeof t&&t instanceof HTMLElement&&(r=t);var o=r.clientHeight;r.onscroll=function(t){r.scrollHeight-r.scrollTop-o<=e&&i.getNext(n)}},t.prototype.buildDom=function(t,e,n){void 0===e&&(e={});var i=document.createElement(t);for(var r in e)e.hasOwnProperty(r)&&(i[r]=e[r]);if(n){var o=n();Ot.appendStyle(i,o)}return i},t.prototype.renderBigImgItem=function(e,n){var i=n.title,r=n.curl,o=n.imageUrl,a=n.target,c=n.type,l=n.src,d=n.desc,f=n.time;if(o){var p=this.winWidth,u=this.buildDom("a",{href:r,target:a||"_self",title:i},function(){return pt.configWrapCreate(p)}),s=this.buildDom("span",{innerHTML:i},function(){return pt.configTitleContainerCreate(p)});u.appendChild(s);var h=this.buildDom("div",{},function(){return pt.configImgContainerCreate(p)});if(h.style.background="url("+o+") center center no-repeat",h.style.backgroundSize="cover",u.appendChild(h),c===t.remarkType.SHOW_DESC&&d){var g=this.createDescDom(d,10,10);u.appendChild(g)}else if(c===t.remarkType.SHOW_SRC_TIME&&l&&f){var m=this.createSrcAndTimeDom(l,f,10,10,20);u.appendChild(m)}var y=this.createLineDom(0,"");return u.appendChild(y),e.appendChild(u),e}},t.prototype.renderImgTextItem=function(e,n){var i=n.title,r=n.curl,o=n.imageUrl,a=n.target,c=n.type,l=n.src,d=n.time,f=n.desc;if(o){var p=this.winWidth,u=this.buildDom("a",{href:r,target:a||"_self",title:i},function(){return mt.configWrapCreate(p)}),s=this.buildDom("div",{},function(){return mt.configImgCreate(p)});s.style.background="url("+o+") center center no-repeat",s.style.backgroundSize="cover",u.appendChild(s);var h=this.buildDom("div",{},function(){return mt.configRightCreate(p)}),g=this.buildDom("div",{},function(){return mt.configTitleWrapCreate(p)}),m=this.buildDom("span",{innerText:i},function(){return mt.configTitleCreate(p)});if(g.appendChild(m),h.appendChild(g),c===t.remarkType.SHOW_DESC&&f){var y=this.createDescDom(f,10,0);h.appendChild(y)}else if(c===t.remarkType.SHOW_SRC_TIME&&l&&d){var v=this.createSrcAndTimeDom(l,d,5,0,20);h.appendChild(v)}u.appendChild(h);var b=this.createLineDom(13,"");return u.appendChild(b),e.appendChild(u),e}},t.prototype.renderImgsItem=function(e,n){var i=n.title,r=n.curl,o=n.images,a=n.target,c=n.desc,l=n.src,d=n.time,f=n.type;if(o&&0!==o.length){var p=this.winWidth,u=this.buildDom("a",{href:r,target:a||"_self",title:i},function(){return xt.configWrapCreate(p)}),s=this.buildDom("span",{innerText:i},function(){return xt.configTitleCreate(p)});u.appendChild(s);for(var h=o.length,g=this,m=0;m<h;m++)!function(t){var e=o[t],n={};0!==t&&(n["margin-left"]="3px");var i=g.buildDom("div",{},function(){return xt.configImgItemCreate(p,n,h)});i.style.background="url("+e+") center center no-repeat",i.style.backgroundSize="cover",u.appendChild(i)}(m);if(f===t.remarkType.SHOW_DESC&&c){var y=this.createDescDom(c,0,10);u.appendChild(y)}else if(f===t.remarkType.SHOW_SRC_TIME&&l&&d){var v=this.createSrcAndTimeDom(l,d,0,10,20);u.appendChild(v)}var b=this.createLineDom(0,"");return u.appendChild(b),e.appendChild(u),e}},t.prototype.createLineDom=function(t,n){var i=this;return this.buildDom("div",{},function(){return e(i.winWidth,{top:t,position:n})})},t.prototype.createDescDom=function(t,e,i){void 0===e&&(e=0),void 0===i&&(i=0);var r=document.createElement("div");if(!t)return r;r.innerText=t;var o=n(this.winWidth,{top:e,left:i,"margin-top":e,"margin-left":i});return Ot.appendStyle(r,o),r},t.prototype.createSrcAndTimeDom=function(t,e,n,i,r){var o=document.createElement("div");if(!t||!e)return o;var a={top:n,left:i,height:r,"margin-left":i,"margin-top":n},c=ct.configWrapCreate(this.winWidth,a);Ot.appendStyle(o,c);var l=document.createElement("div"),d=ct.configItemCreate(this.winWidth,{"line-height":r});l.innerText=t,Ot.appendStyle(l,d);var f=document.createElement("div");return f.innerText=e,Ot.appendStyle(f,d),o.appendChild(l),o.appendChild(f),o},t.prototype.createHeader=function(){var t=this;this.headerDom=this.buildDom("div",{},function(){return kt.configWrapCreate(t.winWidth)});var e=this.buildDom("div",{},function(){return kt.configTitleCreate(t.winWidth)});return e.innerText="猜你喜欢",this.headerDom.appendChild(e),this.headerDom},t.prototype.createFooter=function(t){var e=this;this.footerDom||(this.footerDom=this.buildDom("div",{},function(){return Ct.configWrapCreate(e.winWidth)}));var n=this.footerDom,i=t?"-- 加载完成 --":"加载更多...";return n.innerText!==i&&(n.innerText=i),n},t.layoutType={BIG_IMG:0,IMG_TEXT:1,IMGS:2},t.remarkType={SHOW_DESC:0,SHOW_SRC_TIME:1},t}()});
//# sourceMappingURL=information-flow-layout-render.umd.js.map
