!function(e,n,t){function o(e,n){return typeof e===n}function r(){var e,n,t,r,s,i,a;for(var l in m)if(m.hasOwnProperty(l)){if(e=[],n=m[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(r=o(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],a=i.split("."),1===a.length?y[a[0]]=r:(!y[a[0]]||y[a[0]]instanceof Boolean||(y[a[0]]=new Boolean(y[a[0]])),y[a[0]][a[1]]=r),w.push((r?"":"no-")+a.join("-"))}}function s(e){var n=C.className,t=y._config.classPrefix||"";if(S&&(n=n.baseVal),y._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}y._config.enableClasses&&(n+=" "+t+e.join(" "+t),S?C.className.baseVal=n:C.className=n)}function i(e,n){if("object"==typeof e)for(var t in e)g(e,t)&&i(t,e[t]);else{e=e.toLowerCase();var o=e.split("."),r=y[o[0]];if(2==o.length&&(r=r[o[1]]),"undefined"!=typeof r)return y;n="function"==typeof n?n():n,1==o.length?y[o[0]]=n:(!y[o[0]]||y[o[0]]instanceof Boolean||(y[o[0]]=new Boolean(y[o[0]])),y[o[0]][o[1]]=n),s([(n&&0!=n?"":"no-")+o.join("-")]),y._trigger(e,n)}return y}function a(e,n){return!!~(""+e).indexOf(n)}function l(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):S?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function f(){var e=n.body;return e||(e=l(S?"svg":"body"),e.fake=!0),e}function u(e,t,o,r){var s,i,a,u,d="modernizr",c=l("div"),p=f();if(parseInt(o,10))for(;o--;)a=l("div"),a.id=r?r[o]:d+(o+1),c.appendChild(a);return s=l("style"),s.type="text/css",s.id="s"+d,(p.fake?p:c).appendChild(s),p.appendChild(c),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),c.id=d,p.fake&&(p.style.background="",p.style.overflow="hidden",u=C.style.overflow,C.style.overflow="hidden",C.appendChild(p)),i=t(c,e),p.fake?(p.parentNode.removeChild(p),C.style.overflow=u,C.offsetHeight):c.parentNode.removeChild(c),!!i}function d(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function c(n,o){var r=n.length;if("CSS"in e&&"supports"in e.CSS){for(;r--;)if(e.CSS.supports(d(n[r]),o))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];r--;)s.push("("+d(n[r])+":"+o+")");return s=s.join(" or "),u("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function p(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function h(e,n,r,s){function i(){u&&(delete b.style,delete b.modElem)}if(s=!o(s,"undefined")&&s,!o(r,"undefined")){var f=c(e,r);if(!o(f,"undefined"))return f}for(var u,d,h,m,v,y=["modernizr","tspan"];!b.style;)u=!0,b.modElem=l(y.shift()),b.style=b.modElem.style;for(h=e.length,d=0;d<h;d++)if(m=e[d],v=b.style[m],a(m,"-")&&(m=p(m)),b.style[m]!==t){if(s||o(r,"undefined"))return i(),"pfx"!=n||m;try{b.style[m]=r}catch(g){}if(b.style[m]!=v)return i(),"pfx"!=n||m}return i(),!1}var m=[],v={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){m.push({name:e,fn:n,options:t})},addAsyncTest:function(e){m.push({name:null,fn:e})}},y=function(){};y.prototype=v,y=new y;var g,w=[],C=n.documentElement,S="svg"===C.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;g=o(e,"undefined")||o(e.call,"undefined")?function(e,n){return n in e&&o(e.constructor.prototype[n],"undefined")}:function(n,t){return e.call(n,t)}}(),v._l={},v.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),y.hasOwnProperty(e)&&setTimeout(function(){y._trigger(e,y[e])},0)},v._trigger=function(e,n){if(this._l[e]){var t=this._l[e];setTimeout(function(){var e,o;for(e=0;e<t.length;e++)(o=t[e])(n)},0),delete this._l[e]}},y._q.push(function(){v.addTest=i});var _={elem:l("modernizr")};y._q.push(function(){delete _.elem});var b={style:_.elem.style};y._q.unshift(function(){delete b.style}),v.testProp=function(e,n,o){return h([e],t,n,o)},y.addTest("svg",!!n.createElementNS&&!!n.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var T="CSS"in e&&"supports"in e.CSS,E="supportsCSS"in e;y.addTest("supports",T||E),r(),s(w),delete v.addTest,delete v.addAsyncTest;for(var x=0;x<y._q.length;x++)y._q[x]();e.Modernizr=y}(window,document);