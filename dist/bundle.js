window.Crunchyroll=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=38)}([function(e,t,r){"use strict";var n=r(3),o=r(13),i=Object.prototype.toString;function s(e){return"[object Array]"===i.call(e)}function a(e){return null!==e&&"object"==typeof e}function c(e){return"[object Function]"===i.call(e)}function u(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),s(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:s,isArrayBuffer:function(e){return"[object ArrayBuffer]"===i.call(e)},isBuffer:o,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===i.call(e)},isFile:function(e){return"[object File]"===i.call(e)},isBlob:function(e){return"[object Blob]"===i.call(e)},isFunction:c,isStream:function(e){return a(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:u,merge:function e(){var t={};function r(r,n){"object"==typeof t[n]&&"object"==typeof r?t[n]=e(t[n],r):t[n]=r}for(var n=0,o=arguments.length;n<o;n++)u(arguments[n],r);return t},deepMerge:function e(){var t={};function r(r,n){"object"==typeof t[n]&&"object"==typeof r?t[n]=e(t[n],r):t[n]="object"==typeof r?e({},r):r}for(var n=0,o=arguments.length;n<o;n++)u(arguments[n],r);return t},extend:function(e,t,r){return u(t,(function(t,o){e[o]=r&&"function"==typeof t?n(t,r):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,r){"use strict";var n={format:{}};function o(e){return JSON.parse(JSON.stringify(e))}!function(){for(var e=["vtt","lrc","smi","ssa","ass","sub","srt","sbv","json"],t=0;t<e.length;t++){var o=e[t],i=r(29)("./"+o+".js");n.format[i.name]=i}}(),n.list=function(){return Object.keys(n.format)},n.detect=function(e){for(var t=n.list(),r=0;r<t.length;r++){var o=t[r],i=n.format[o];if(void 0!==i&&"function"==typeof i.detect){var s=i.detect(e);if(!0===s)return o;if(o==s)return s}}},n.parse=function(e,t){var r=(t=t||{}).format||n.detect(e);if(!r||0==r.trim().length)throw new Error("Cannot determine subtitle format!");var o=n.format[r];if(void 0===o)throw new Error("Unsupported subtitle format: "+r);var i=o.parse;if("function"!=typeof i)throw new Error("Subtitle format does not support 'parse' op: "+r);return i(e,t)},n.build=function(e,t){var r=(t=t||{}).format||"srt";if(!r||0==r.trim().length)throw new Error("Cannot determine subtitle format!");var o=n.format[r];if(void 0===o)throw new Error("Unsupported subtitle format: "+r);var i=o.build;if("function"!=typeof i)throw new Error("Subtitle format does not support 'build' op: "+r);return i(e,t)},n.convert=function(e,t){"string"==typeof t&&(t={to:t});var r=o(t=t||{});delete r.format,r.from&&(r.format=r.from);var i=n.parse(e,r);return r.resync&&(i=n.resync(i,r.resync)),r.format=r.to||t.format,n.build(i,r)},n.resync=function(e,t){var r,n,i,s;if("function"==typeof(t=t||{}))r=t;else if("number"==typeof t)s=t,r=function(e){return[e[0]+s,e[1]+s]};else{if("object"!=typeof t)throw new Error("Argument 'options' not defined!");s=(t.offset||0)*(t.frame?t.fps||25:1),n=t.ratio||1,i=t.frame,r=function(e){return[Math.round(e[0]*n+s),Math.round(e[1]*n+s)]}}for(var a=[],c=0;c<e.length;c++){var u,f=o(e[c]);if(void 0===f.type||"caption"==f.type)if(i)(u=r([f.frame.start,f.frame.end]))&&2==u.length&&(f.frame.start=u[0],f.frame.end=u[1],f.frame.count=f.frame.end-f.frame.start);else(u=r([f.start,f.end]))&&2==u.length&&(f.start=u[0],f.end=u[1],f.duration=f.end-f.start);a.push(f)}return a},e.exports=n},function(e,t,r){e.exports=r(12)},function(e,t,r){"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},function(e,t,r){"use strict";var n=r(0);function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var i;if(r)i=r(t);else if(n.isURLSearchParams(t))i=t.toString();else{var s=[];n.forEach(t,(function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),s.push(o(t)+"="+o(e))})))})),i=s.join("&")}if(i){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},function(e,t,r){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,r){"use strict";(function(t){var n=r(0),o=r(19),i={"Content-Type":"application/x-www-form-urlencoded"};function s(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a,c={adapter:(void 0!==t&&"[object process]"===Object.prototype.toString.call(t)?a=r(7):"undefined"!=typeof XMLHttpRequest&&(a=r(7)),a),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(s(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)?(s(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},n.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){c.headers[e]=n.merge(i)})),e.exports=c}).call(this,r(18))},function(e,t,r){"use strict";var n=r(0),o=r(20),i=r(4),s=r(22),a=r(23),c=r(8);e.exports=function(e){return new Promise((function(t,u){var f=e.data,l=e.headers;n.isFormData(f)&&delete l["Content-Type"];var p=new XMLHttpRequest;if(e.auth){var d=e.auth.username||"",h=e.auth.password||"";l.Authorization="Basic "+btoa(d+":"+h)}if(p.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p.onreadystatechange=function(){if(p&&4===p.readyState&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in p?s(p.getAllResponseHeaders()):null,n={data:e.responseType&&"text"!==e.responseType?p.response:p.responseText,status:p.status,statusText:p.statusText,headers:r,config:e,request:p};o(t,u,n),p=null}},p.onabort=function(){p&&(u(c("Request aborted",e,"ECONNABORTED",p)),p=null)},p.onerror=function(){u(c("Network Error",e,null,p)),p=null},p.ontimeout=function(){u(c("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",p)),p=null},n.isStandardBrowserEnv()){var g=r(24),m=(e.withCredentials||a(e.url))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;m&&(l[e.xsrfHeaderName]=m)}if("setRequestHeader"in p&&n.forEach(l,(function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete l[t]:p.setRequestHeader(t,e)})),e.withCredentials&&(p.withCredentials=!0),e.responseType)try{p.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){p&&(p.abort(),u(e),p=null)})),void 0===f&&(f=null),p.send(f)}))}},function(e,t,r){"use strict";var n=r(21);e.exports=function(e,t,r,o,i){var s=new Error(e);return n(s,t,r,o,i)}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t){t=t||{};var r={};return n.forEach(["url","method","params","data"],(function(e){void 0!==t[e]&&(r[e]=t[e])})),n.forEach(["headers","auth","proxy"],(function(o){n.isObject(t[o])?r[o]=n.deepMerge(e[o],t[o]):void 0!==t[o]?r[o]=t[o]:n.isObject(e[o])?r[o]=n.deepMerge(e[o]):void 0!==e[o]&&(r[o]=e[o])})),n.forEach(["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"],(function(n){void 0!==t[n]?r[n]=t[n]:void 0!==e[n]&&(r[n]=e[n])})),r}},function(e,t,r){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,r){"use strict";var n={toMilliseconds:function(e){var t=/^\s*(\d+:)?(\d{1,2}):(\d{1,2})([.,](\d{1,3}))?\s*$/.exec(e);return 3600*(t[1]?parseInt(t[1].replace(":","")):0)*1e3+60*parseInt(t[2])*1e3+1e3*parseInt(t[3])+10*(t[5]?parseInt(t[5]):0)},toTimeString:function(e){var t=Math.floor(e/1e3/3600),r=Math.floor(e/1e3/60%60),n=Math.floor(e/1e3%60),o=Math.floor(e%1e3/10);return t+":"+(r<10?"0":"")+r+":"+(n<10?"0":"")+n+"."+(o<10?"0":"")+o}};e.exports={name:"ssa",helper:n,detect:function(e){if("string"!=typeof e)throw new Error("Expected string content!");if(/^[\s\r\n]*\[Script Info\]\r?\n/g.test(e)&&/[\s\r\n]*\[Events\]\r?\n/g.test(e))return e.indexOf("[V4+ Styles]")>0?"ass":"ssa"},parse:function(e,t){for(var r,o,i,s,a=null,c=[],u=t.eol||"\r\n",f=e.split(/\r?\n\s*\r?\n/),l=0;l<f.length;l++){var p=/^\s*\[([^\]]+)\]\r?\n([\s\S]*)(\r?\n)*$/gi.exec(f[l]);if(p)for(var d=p[1],h=p[2].split(/\r?\n/),g=0;g<h.length;g++){var m=h[g];if(!/^\s*;/.test(m)){var v=/^\s*([^:]+):\s*(.*)(\r?\n)?$/.exec(m);if(v){if("Script Info"==d){r||((r={}).type="meta",r.data={},c.push(r));var y=v[1].trim(),b=v[2].trim();r.data[y]=b;continue}if("V4 Styles"==d||"V4+ Styles"==d){y=v[1].trim(),b=v[2].trim();if("Format"==y){a=b.split(/\s*,\s*/g);continue}if("Style"==y){for(var S=b.split(/\s*,\s*/g),x={type:"style",data:{}},w=0;w<a.length&&w<S.length;w++)x.data[a[w]]=S[w];c.push(x);continue}}if("Events"==d){y=v[1].trim(),b=v[2].trim();if("Format"==y){a=b.split(/\s*,\s*/g);continue}if("Dialogue"==y){for(S=b.split(/\s*,\s*/g),x={type:"caption",data:{}},w=0;w<a.length&&w<S.length;w++)x.data[a[w]]=S[w];x.start=n.toMilliseconds(x.data.Start),x.end=n.toMilliseconds(x.data.End),x.duration=x.end-x.start,x.content=x.data.Text;var T=(o=b,i=",",s=a.length-1,o.split(i,s).join(i).length+1);x.content=b.substr(T),x.data.Text=x.content,x.text=x.content.replace(/\\N/g,u).replace(/\{[^\}]+\}/g,""),c.push(x);continue}}}}}t.verbose&&console.log("WARN: Unknown part",f[l])}return c},build:function(e,t){var r=t.eol||"\r\n",o="ass"==t.format,i="";i+="[Script Info]"+r,i+="; Script generated by subsrt "+r,i+="ScriptType: v4.00"+(o?"+":"")+r,i+="Collisions: Normal"+r,i+=r,o?(i+="[V4+ Styles]"+r,i+="Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding"+r,i+="Style: DefaultVCD, Arial,28,&H00B4FCFC,&H00B4FCFC,&H00000008,&H80000008,-1,0,0,0,100,100,0.00,0.00,1,1.00,2.00,2,30,30,30,0"+r):(i+="[V4 Styles]"+r,i+="Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, TertiaryColour, BackColour, Bold, Italic, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, AlphaLevel, Encoding"+r,i+="Style: DefaultVCD, Arial,28,11861244,11861244,11861244,-2147483640,-1,0,1,1,2,2,30,30,30,0,0"+r),i+=r,i+="[Events]"+r,i+="Format: "+(o?"Layer":"Marked")+", Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text"+r;for(var s=0;s<e.length;s++){var a=e[s];"meta"!=a.type&&(void 0!==a.type&&"caption"!=a.type?t.verbose&&console.log("SKIP:",a):i+="Dialogue: "+(o?"0":"Marked=0")+","+n.toTimeString(a.start)+","+n.toTimeString(a.end)+",DefaultVCD, NTP,0000,0000,0000,,"+a.text.replace(/\r?\n/g,"\\N")+r)}return i}}},function(e,t,r){"use strict";var n=r(0),o=r(3),i=r(14),s=r(9);function a(e){var t=new i(e),r=o(i.prototype.request,t);return n.extend(r,i.prototype,t),n.extend(r,t),r}var c=a(r(6));c.Axios=i,c.create=function(e){return a(s(c.defaults,e))},c.Cancel=r(10),c.CancelToken=r(27),c.isCancel=r(5),c.all=function(e){return Promise.all(e)},c.spread=r(28),e.exports=c,e.exports.default=c},function(e,t){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&null!=e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}},function(e,t,r){"use strict";var n=r(0),o=r(4),i=r(15),s=r(16),a=r(9);function c(e){this.defaults=e,this.interceptors={request:new i,response:new i}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=a(this.defaults,e)).method=e.method?e.method.toLowerCase():"get";var t=[s,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)r=r.then(t.shift(),t.shift());return r},c.prototype.getUri=function(e){return e=a(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,r){return this.request(n.merge(r||{},{method:e,url:t}))}})),n.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,r,o){return this.request(n.merge(o||{},{method:e,url:t,data:r}))}})),e.exports=c},function(e,t,r){"use strict";var n=r(0);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},function(e,t,r){"use strict";var n=r(0),o=r(17),i=r(5),s=r(6),a=r(25),c=r(26);function u(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return u(e),e.baseURL&&!a(e.url)&&(e.url=c(e.baseURL,e.url)),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||s.adapter)(e).then((function(t){return u(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(u(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t,r){return n.forEach(r,(function(r){e=r(e,t)})),e}},function(e,t){var r,n,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(r===setTimeout)return setTimeout(e,0);if((r===i||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:i}catch(e){r=i}try{n="function"==typeof clearTimeout?clearTimeout:s}catch(e){n=s}}();var c,u=[],f=!1,l=-1;function p(){f&&c&&(f=!1,c.length?u=c.concat(u):l=-1,u.length&&d())}function d(){if(!f){var e=a(p);f=!0;for(var t=u.length;t;){for(c=u,u=[];++l<t;)c&&c[l].run();l=-1,t=u.length}c=null,f=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function g(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];u.push(new h(e,t)),1!==u.length||f||a(d)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=g,o.addListener=g,o.once=g,o.off=g,o.removeListener=g,o.removeAllListeners=g,o.emit=g,o.prependListener=g,o.prependOnceListener=g,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},function(e,t,r){"use strict";var n=r(8);e.exports=function(e,t,r){var o=r.config.validateStatus;!o||o(r.status)?e(r):t(n("Request failed with status code "+r.status,r.config,null,r.request,r))}},function(e,t,r){"use strict";e.exports=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,r){"use strict";var n=r(0),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,i,s={};return e?(n.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=n.trim(e.substr(0,i)).toLowerCase(),r=n.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([r]):s[t]?s[t]+", "+r:r}})),s):s}},function(e,t,r){"use strict";var n=r(0);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=o(window.location.href),function(t){var r=n.isString(t)?o(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},function(e,t,r){"use strict";var n=r(0);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,o,i,s){var a=[];a.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),n.isString(o)&&a.push("path="+o),n.isString(i)&&a.push("domain="+i),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,r){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,r){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,r){"use strict";var n=r(10);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},function(e,t,r){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,r){var n={"./ass.js":30,"./json.js":31,"./lrc.js":32,"./sbv.js":33,"./smi.js":34,"./srt.js":35,"./ssa.js":11,"./sub.js":36,"./vtt.js":37};function o(e){var t=i(e);return r(t)}function i(e){if(!r.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}o.keys=function(){return Object.keys(n)},o.resolve=i,e.exports=o,o.id=29},function(e,t,r){"use strict";var n=r(11);e.exports={name:"ass",helper:n.helper,detect:n.detect,parse:n.parse,build:n.build}},function(e,t,r){"use strict";e.exports={name:"json",detect:function(e){if("string"==typeof e&&/^\[[\s\r\n]*\{[\s\S]*\}[\s\r\n]*\]$/g.test(e))return"json"},parse:function(e,t){return JSON.parse(e)},build:function(e,t){return JSON.stringify(e," ",2)}}},function(e,t,r){"use strict";var n={toMilliseconds:function(e){var t=/^\s*(\d+):(\d{1,2})([.,](\d{1,3}))?\s*$/.exec(e);return 60*parseInt(t[1])*1e3+1e3*parseInt(t[2])+10*(t[4]?parseInt(t[4]):0)},toTimeString:function(e){var t=Math.floor(e/1e3/60),r=Math.floor(e/1e3%60),n=Math.floor(e%1e3);return(t<10?"0":"")+t+":"+(r<10?"0":"")+r+"."+(n<100?"0":"")+(n<10?"0":Math.floor(n/10))}};e.exports={name:"lrc",helper:n,detect:function(e){if("string"==typeof e&&/\r?\n\[(\d+:\d{1,2}([.,]\d{1,3})?)\](.*)\r?\n/.test(e))return!0},parse:function(e,t){for(var r=null,o=[],i=(t.eol,e.split(/\r?\n/)),s=0;s<i.length;s++)if(i[s]&&0!=i[s].trim().length){var a=/^\[(\d{1,2}:\d{1,2}([.,]\d{1,3})?)\](.*)(\r?\n)*$/gi.exec(i[s]);if(a){(c={type:"caption"}).start=n.toMilliseconds(a[1]),c.end=c.start+2e3,c.duration=c.end-c.start,c.content=a[3],c.text=c.content,o.push(c),r&&(r.end=c.start,r.duration=r.end-r.start),r=c}else{var c,u=/^\[([\w\d]+):([^\]]*)\](\r?\n)*$/gi.exec(i[s]);if(u)(c={type:"meta"}).tag=u[1],u[2]&&(c.data=u[2]),o.push(c);else t.verbose&&console.log("WARN: Unknown part",i[s])}}return o},build:function(e,t){for(var r="",o=!1,i=t.eol||"\r\n",s=0;s<e.length;s++){var a=e[s];"meta"!=a.type?void 0!==a.type&&"caption"!=a.type?t.verbose&&console.log("SKIP:",a):(o||(r+=i,o=!0),r+="["+n.toTimeString(a.start)+"]"+a.text+i):a.tag&&a.data&&(r+="["+a.tag+":"+a.data.replace(/[\r\n]+/g," ")+"]"+i)}return r}}},function(e,t,r){"use strict";var n={toMilliseconds:function(e){var t=/^\s*(\d{1,2}):(\d{1,2}):(\d{1,2})([.,](\d{1,3}))?\s*$/.exec(e);return 3600*parseInt(t[1])*1e3+60*parseInt(t[2])*1e3+1e3*parseInt(t[3])+(t[5]?parseInt(t[5]):0)},toTimeString:function(e){var t=Math.floor(e/1e3/3600),r=Math.floor(e/1e3/60%60),n=Math.floor(e/1e3%60),o=Math.floor(e%1e3);return(t<10?"0":"")+t+":"+(r<10?"0":"")+r+":"+(n<10?"0":"")+n+"."+(o<100?"0":"")+(o<10?"0":"")+o}};e.exports={name:"sbv",helper:n,detect:function(e){if("string"!=typeof e)throw new Error("Expected string content!");if(/\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?\s*[,;]\s*\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?/g.test(e))return"sbv"},parse:function(e,t){for(var r=[],o=t.eol||"\r\n",i=e.split(/\r?\n\s+\r?\n/),s=0;s<i.length;s++){var a=/^(\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?)\s*[,;]\s*(\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?)\r?\n([\s\S]*)(\r?\n)*$/gi.exec(i[s]);if(a){var c={type:"caption"};c.start=n.toMilliseconds(a[1]),c.end=n.toMilliseconds(a[3]),c.duration=c.end-c.start;var u=a[5].split(/\[br\]|\r?\n/gi);c.content=u.join(o),c.text=c.content.replace(/\>\>\s*[^:]+:\s*/g,""),r.push(c)}else t.verbose&&console.log("WARN: Unknown part",i[s])}return r},build:function(e,t){for(var r="",o=t.eol||"\r\n",i=0;i<e.length;i++){var s=e[i];void 0!==s.type&&"caption"!=s.type?t.verbose&&console.log("SKIP:",s):(r+=n.toTimeString(s.start)+","+n.toTimeString(s.end)+o,r+=s.text+o,r+=o)}return r}}},function(e,t,r){"use strict";var n={htmlEncode:function(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/\r?\n/g,"<BR>")},htmlDecode:function(e,t){return e.replace(/\<BR\s*\/?\>/gi,t||"\r\n").replace(/&nbsp;/g," ").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")}};e.exports={name:"smi",helper:n,detect:function(e){if("string"==typeof e&&/\<SAMI[^\>]*\>[\s\S]*\<BODY[^\>]*\>/g.test(e))return"smi"},parse:function(e,t){var r=[],o=t.eol||"\r\n",i=/\<TITLE[^\>]*\>([\s\S]*)\<\/TITLE\>/gi.exec(e);i&&((p={type:"meta",name:"title"}).data=i[1].replace(/^[\s\r\n]*/g,"").replace(/[\s\r\n]*$/g,""),r.push(p));var s=/\<STYLE[^\>]*\>([\s\S]*)\<\/STYLE\>/gi.exec(e);s&&((p={type:"meta",name:"style"}).data=s[1],r.push(p));for(var a=null,c=e.replace(/^[\s\S]*\<BODY[^\>]*\>/gi,"").replace(/\<\/BODY[^\>]*\>[\s\S]*$/gi,"").split(/\<SYNC/gi),u=0;u<c.length;u++)if(c[u]&&0!=c[u].trim().length){var f="<SYNC"+c[u],l=/^\<SYNC[^\>]+Start\s*=\s*["']?(\d+)["']?[^\>]*\>([\s\S]*)/gi.exec(f);if(l){var p;(p={type:"caption"}).start=parseInt(l[1]),p.end=p.start+2e3,p.duration=p.end-p.start,p.content=l[2].replace(/^\<\/SYNC[^\>]*>/gi,"");var d=!0,h=/^\<P[^\>]+Class\s*=\s*["']?([\w\d\-_]+)["']?[^\>]*\>([\s\S]*)/gi.exec(p.content);if(h||(h=/^\<P([^\>]*)\>([\s\S]*)/gi.exec(p.content)),h){var g=h[2].replace(/\<P[\s\S]+$/gi,"");d=0==(g=(g=g.replace(/\<BR\s*\/?\>/gi,o).replace(/\<[^\>]+\>/g,"")).replace(/^[\s\r\n]+/g,"").replace(/[\s\r\n]+$/g,"")).replace(/&nbsp;/gi," ").replace(/[\s\r\n]+/g,"").length,p.text=n.htmlDecode(g,o)}!t.preserveSpaces&&d?t.verbose&&console.log("INFO: Skipping white space caption at "+p.start):r.push(p),a&&(a.end=p.start,a.duration=a.end-a.start),a=p}else t.verbose&&console.log("WARN: Unknown part",c[u])}return r},build:function(e,t){var r=t.eol||"\r\n",o="";o+="<SAMI>"+r,o+="<HEAD>"+r,o+="<TITLE>"+(t.title||"")+"</TITLE>"+r,o+='<STYLE TYPE="text/css">'+r,o+="\x3c!--"+r,o+="P { font-family: Arial; font-weight: normal; color: white; background-color: black; text-align: center; }"+r,o+=".LANG { Name: "+(t.langName||"English")+"; lang: "+(t.langCode||"en-US")+"; SAMIType: CC; }"+r,o+="--\x3e"+r,o+="</STYLE>"+r,o+="</HEAD>"+r,o+="<BODY>"+r;for(var i=0;i<e.length;i++){var s=e[i];"meta"!=s.type&&(void 0!==s.type&&"caption"!=s.type?t.verbose&&console.log("SKIP:",s):(o+="<SYNC Start="+s.start+">"+r,o+="  <P Class=LANG>"+n.htmlEncode(s.text||"")+(t.closeTags?"</P>":"")+r,t.closeTags&&(o+="</SYNC>"+r),o+="<SYNC Start="+s.end+">"+r,o+="  <P Class=LANG>&nbsp;"+(t.closeTags?"</P>":"")+r,t.closeTags&&(o+="</SYNC>"+r)))}return o+="</BODY>"+r,o+="</SAMI>"+r}}},function(e,t,r){"use strict";var n="srt",o={toMilliseconds:function(e){var t=/^\s*(\d{1,2}):(\d{1,2}):(\d{1,2})([.,](\d{1,3}))?\s*$/.exec(e);return 3600*parseInt(t[1])*1e3+60*parseInt(t[2])*1e3+1e3*parseInt(t[3])+(t[5]?parseInt(t[5]):0)},toTimeString:function(e){var t=Math.floor(e/1e3/3600),r=Math.floor(e/1e3/60%60),n=Math.floor(e/1e3%60),o=Math.floor(e%1e3);return(t<10?"0":"")+t+":"+(r<10?"0":"")+r+":"+(n<10?"0":"")+n+","+(o<100?"0":"")+(o<10?"0":"")+o}};e.exports={name:n,helper:o,detect:function(e){if("string"==typeof e&&/\d+\r?\n\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?\s*\-\-\>\s*\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?/g.test(e))return n},parse:function(e,t){for(var r=[],n=t.eol||"\r\n",i=e.split(/\r?\n\s+\r?\n/g),s=0;s<i.length;s++){var a=/^(\d+)\r?\n(\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?)\s*\-\-\>\s*(\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?)\r?\n([\s\S]*)(\r?\n)*$/gi.exec(i[s]);if(a){var c={type:"caption"};c.index=parseInt(a[1]),c.start=o.toMilliseconds(a[2]),c.end=o.toMilliseconds(a[4]),c.duration=c.end-c.start;var u=a[6].split(/\r?\n/);c.content=u.join(n),c.text=c.content.replace(/\<[^\>]+\>/g,"").replace(/\{[^\}]+\}/g,"").replace(/\>\>\s*[^:]*:\s*/g,""),r.push(c)}else t.verbose&&console.log("WARN: Unknown part",i[s])}return r},build:function(e,t){for(var r="",n=t.eol||"\r\n",i=0;i<e.length;i++){var s=e[i];void 0!==s.type&&"caption"!=s.type?t.verbose&&console.log("SKIP:",s):(r+=(i+1).toString()+n,r+=o.toTimeString(s.start)+" --\x3e "+o.toTimeString(s.end)+n,r+=s.text+n,r+=n)}return r}}},function(e,t,r){"use strict";var n="sub",o=25;e.exports={name:n,detect:function(e){if("string"==typeof e&&/^\{\d+\}\{\d+\}(.*)/.test(e))return n},parse:function(e,t){for(var r=t.fps>0?t.fps:o,n=[],i=t.eol||"\r\n",s=e.split(/\r?\n/g),a=0;a<s.length;a++){var c=/^\{(\d+)\}\{(\d+)\}(.*)$/gi.exec(s[a]);if(c){var u={type:"caption"};u.index=a+1,u.frame={start:parseInt(c[1]),end:parseInt(c[2])},u.frame.count=u.frame.end-u.frame.start,u.start=Math.round(u.frame.start/r),u.end=Math.round(u.frame.end/r),u.duration=u.end-u.start;var f=c[3].split(/\|/g);u.content=f.join(i),u.text=u.content.replace(/\{[^\}]+\}/g,""),n.push(u)}else t.verbose&&console.log("WARN: Unknown part",s[a])}return n},build:function(e,t){for(var r=t.fps>0?t.fps:o,n="",i=t.eol||"\r\n",s=0;s<e.length;s++){var a=e[s];if(void 0!==a.type&&"caption"!=a.type)t.verbose&&console.log("SKIP:",a);else n+="{"+("object"==typeof a.frame&&a.frame.start>=0?a.frame.start:a.start*r)+"}{"+("object"==typeof a.frame&&a.frame.end>=0?a.frame.end:a.end*r)+"}"+a.text.replace(/\r?\n/,"|")+i}return n}}},function(e,t,r){"use strict";var n={toMilliseconds:function(e){var t=/^\s*(\d{1,2}:)?(\d{1,2}):(\d{1,2})([.,](\d{1,3}))?\s*$/.exec(e);return 3600*(t[1]?parseInt(t[1].replace(":","")):0)*1e3+60*parseInt(t[2])*1e3+1e3*parseInt(t[3])+(t[5]?parseInt(t[5]):0)},toTimeString:function(e){var t=Math.floor(e/1e3/3600),r=Math.floor(e/1e3/60%60),n=Math.floor(e/1e3%60),o=Math.floor(e%1e3);return(t<10?"0":"")+t+":"+(r<10?"0":"")+r+":"+(n<10?"0":"")+n+","+(o<100?"0":"")+(o<10?"0":"")+o}};e.exports={name:"vtt",helper:n,detect:function(e){if("string"!=typeof e)throw new Error("Expected string content!");if(/^[\s\r\n]*WEBVTT\r?\n/g.test(e))return"vtt"},parse:function(e,t){for(var r=1,o=[],i=t.eol||"\r\n",s=e.split(/\r?\n\s+\r?\n/),a=0;a<s.length;a++){var c=/^([^\r\n]+\r?\n)?((\d{1,2}:)?\d{1,2}:\d{1,2}([.,]\d{1,3})?)\s*\-\-\>\s*((\d{1,2}:)?\d{1,2}:\d{1,2}([.,]\d{1,3})?)\r?\n([\s\S]*)(\r?\n)*$/gi.exec(s[a]);if(c){(f={type:"caption"}).index=r++,c[1]&&(f.cue=c[1].replace(/[\r\n]*/gi,"")),f.start=n.toMilliseconds(c[2]),f.end=n.toMilliseconds(c[5]),f.duration=f.end-f.start;var u=c[8].split(/\r?\n/);f.content=u.join(i),f.text=f.content.replace(/\<[^\>]+\>/g,"").replace(/\{[^\}]+\}/g,""),o.push(f)}else{var f,l=/^([A-Z]+)(\r?\n([\s\S]*))?$/.exec(s[a]);if(l||(l=/^([A-Z]+)\s+([^\r\n]*)?$/.exec(s[a])),l)(f={type:"meta"}).name=l[1],l[3]&&(f.data=l[3]),o.push(f);else t.verbose&&console.log("WARN: Unknown part",s[a])}}return o},build:function(e,t){for(var r=t.eol||"\r\n",o="WEBVTT"+r+r,i=0;i<e.length;i++){var s=e[i];if("meta"!=s.type)void 0!==s.type&&"caption"!=s.type?t.verbose&&console.log("SKIP:",s):(o+=(i+1).toString()+r,o+=n.toTimeString(s.start)+" --\x3e "+n.toTimeString(s.end)+r,o+=s.text+r,o+=r);else{if("WEBVTT"==s.name)continue;o+=s.name+r,o+=s.data?s.data+r:"",o+=r}}return o}}},function(e,t,r){"use strict";r.r(t);var n=r(2),o=r.n(n),i=r(1),s=r.n(i);const a=s.a.format.vtt;s.a.format.vtt={name:"vtt",parse:a.parse,build(e,t){const r=[...e].filter(e=>"meta"!==e.type);r.forEach(e=>{"caption"===e.type&&function(e,t){e.data.Text=t(e.data.Text),e.text=t(e.text)}(e,e=>e.trim().replace("\\N","").replace("\\R","").replace("&","&amp;").replace("<","&lt;"))});let n=a.build(r,t);return n=n.replace(/(.*) --> (.*)/g,(e,t,r)=>`${t.replace(/,/,".")} --\x3e ${r.replace(/,/,".")}`)},detect:a.detect};var c=class{constructor(e,t,r){this.label=e,this.language=t,this.captions="string"==typeof r?s.a.parse(r):r}static detect(e){return s.a.detect(e)}build(e){return s.a.build(this.captions,{format:e})}};var u=class{constructor(e){this.url=e}async parse(){const e=(await o.a.get(this.url)).data;await this.parseConfigUrl(e),await this.getSubtitles()}async isPremiumVideo(){const e=await o.a.get(this.url),{data:t}=e,r=/<script type="application\/ld\+json">\s*(\{.*?\})\s*<\/script>/gm.exec(t);if(r){const e=r[1],t=JSON.parse(e),{potentialAction:n={}}=t,{actionAccessibilityRequirement:o={}}=n,{category:i="nologinrequired",requiresSubscription:s=[]}=o;return"nologinrequired"!==i&&s.length>0}return!1}async parseConfigUrl(e){let t=/vilos\.config\.media\s*=\s*(\{.*\})/m,r=t.exec(e);if(!r)throw new Error("Failed to find config");const n=JSON.parse(r[1]);if(r=(t=/vilos\.config\.analytics\s*=\s*(\{.*\})/m).exec(e))try{const e=JSON.parse(r[1]);this.seriesTitle=e.media_reporting_parent.title}catch(e){}this.config=n;const{metadata:o}=n;this.episodeTitle=o.title,this.episodeNumber=Number(o.episode_number),this.poster=n.thumbnail.url}async getSubtitles(){const{config:{subtitles:e}}=this;this.subtitles=[],await Promise.all(e.map(async({language:e,url:t,title:r,format:n})=>{const i=await o.a.get(t);if(200!==i.status)throw new Error(i.statusText);const{data:s}=i;this.subtitles.push(new c(r,e.substr(0,2),s))}))}};r.d(t,"Episode",(function(){return u})),r.d(t,"Subtitle",(function(){return c}))}]);