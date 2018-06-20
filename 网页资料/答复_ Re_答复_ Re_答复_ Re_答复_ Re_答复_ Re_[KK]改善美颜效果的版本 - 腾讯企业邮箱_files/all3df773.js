var gsAgent=navigator.userAgent.toLowerCase(),gsAppVer=navigator.appVersion.toLowerCase(),gsAppName=navigator.appName.toLowerCase(),gbIsOpera=gsAgent.indexOf("opera")>-1,gbIsWebKit=gsAgent.indexOf("applewebkit")>-1,gbIsKHTML=gsAgent.indexOf("khtml")>-1||gsAgent.indexOf("konqueror")>-1||gbIsWebKit,gbIsIE=(gsAgent.indexOf("compatible")>-1&&!gbIsOpera)||gsAgent.indexOf("msie")>-1,gbIsTT=gbIsIE?(gsAppVer.indexOf("tencenttraveler")!=-1?1:0):0,gbIsQBWebKit=gbIsWebKit?(gsAppVer.indexOf("qqbrowser")!=-1?1:0):0,gbIsQPlus=gsAgent.indexOf("qplus")>-1,gbIsChrome=gbIsWebKit&&!gbIsQBWebKit&&gsAgent.indexOf("chrome")>-1&&gsAgent.indexOf("se 2.x metasr 1.0")<0&&!gbIsQPlus,gbIsSafari=gbIsWebKit&&!gbIsChrome&&!gbIsQBWebKit,gbIsQBIE=gbIsIE&&gsAppVer.indexOf("qqbrowser")!=-1,gbIsFF=gsAgent.indexOf("gecko")>-1&&!gbIsKHTML,gbIsTrident=gsAppVer.indexOf("trident")!=-1,gbIsEdge=gsAgent.indexOf('edge')!=-1,gbIsNS=!gbIsIE&&!gbIsOpera&&!gbIsKHTML&&(gsAgent.indexOf("mozilla")==0)&&(gsAppName=="netscape"),gbIsAgentErr=!(gbIsOpera||gbIsKHTML||gbIsSafari||gbIsIE||gbIsTT||gbIsFF||gbIsNS),gbIsWin=gsAgent.indexOf("windows")>-1||gsAgent.indexOf("win32")>-1,gbIsVista=gbIsWin&&(gsAgent.indexOf("nt 6.0")>-1||gsAgent.indexOf("windows vista")>-1),gbIsWin7=gbIsWin&&gsAgent.indexOf("nt 6.1")>-1,gbIsMac=gsAgent.indexOf("macintosh")>-1||gsAgent.indexOf("mac os x")>-1,gsMacVer=(/mac os x (\d+)(\.|_)(\d+)/.test(gsAgent)&&parseFloat(RegExp.$1+"."+RegExp.$3)).toString(),gbIsLinux=gsAgent.indexOf("linux")>-1,gbIsAir=gsAgent.indexOf("adobeair")>-1,gnIEVer=/MSIE (\d+.\d+);/i.test(gsAgent)&&parseFloat(RegExp["$1"]),gnIEDocTypeVer=0,gsFFVer=/firefox\/((\d|\.)+)/i.test(gsAgent)&&RegExp["$1"],gsSafariVer=""+(/version\/((\d|\.)+)/i.test(gsAgent)&&RegExp["$1"]),gsChromeVer=""+(/chrome\/((\d|\.)+)/i.test(gsAgent)&&RegExp["$1"]),gsQBVer=""+(/qqbrowser\/((\d|\.)+)/i.test(gsAgent)&&RegExp["$1"]),_gsForEBuiltTag="_For_E_Built";
if(window.location.hostname.indexOf("exmail.qq.com")!=-1)
{
document.domain="exmail.qq.com";
}
if(!window.getTop)
{
window.getTop=function(){
var b=arguments.callee;
if(!b._moTop)
{
try{
if(window!=parent)
{
b._moTop=parent.getTop?parent.getTop():parent.parent.getTop();
}
else{
b._moTop=window;
}
}
catch(a)
{
b._moTop=window;
}
}
return b._moTop;
};
try{
}
catch(_oError)
{
eval("var top = getTop();");
}
}
function _callBack(a,b)
{
if(typeof a=="function")
{
try{
return a.apply(this,b||[]);
}
catch(c)
{
return null;
}
}
else{
return null;
}
}
function callBack(a,b)
{
if(!window.Console)
{
try{
return _callBack.call(this,a,b);
}
catch(c)
{
debug(c.message);
}
}
else{
return _callBack.call(this,a,b);
}
}
function waitFor(b,a,c,d)
{
var g=0,f=c||500,h=(d||10*500)/f;
function e(i)
{
try{
a(i);
}
catch(j)
{
debug(j,2);
}
}
;(function(){
try{
if(b())
{
return e(true);
}
}
catch(i)
{
debug(i,2);
}
if(g++>h)
{
return e(false);
}
setTimeout(arguments.callee,f);
})();
}
function unikey(a)
{
return [a,now(),Math.random()].join("").split(".").join("");
}
function genGlobalMapIdx()
{
return Math.round(Math.random()*10000).toString()+new Date().getMilliseconds();
}
function isLeapYear(a)
{
return (a%400==0||(a%4==0&&a%100!=0));
}
function calDays(b,a)
{
return [null,31,null,31,30,31,30,31,31,30,31,30,31][a]||(isLeapYear(b)?29:28);
}
function now()
{
return +new Date();
}
function trim(a)
{
return (a&&a.replace?a:"").replace(/(^\s*)|(\s*$)/g,"");
}
function trim2(a)
{
if(a&&a.substring)
{
var d=/\s/,b=-1,c=a.length;
while(d.test(a.charAt(--c)))
;
while(d.test(a.charAt(++b)))
;
return a.substring(b,c+1);
}
}
function strReplace(d,b,c,a)
{
return (d||"").replace(new RegExp(regFilter(b),a),c);
}
function encodeURI(a)
{
return a&&a.replace?a.replace(/%/ig,"%25").replace(/\+/ig,"%2B").replace(/&/ig,"%26").replace(/#/ig,"%23").replace(/\'/ig,"%27").replace(/\"/ig,"%22"):a;
}
function decodeURI(a)
{
return decodeURIComponent(a||"");
}
function regFilter(a)
{
return a.replace(/([\^\.\[\$\(\)\|\*\+\?\{\\])/ig,"\\$1");
}
function isUrl(a)
{
return (a||"").replace(/http?:\/\/[\w.]+[^ \f\n\r\t\v\"\\\<\>\[\]\u2100-\uFFFF]*/,"url")=="url";
}
function cookQueryString(b,a)
{
for(var e in a)
{
var d=a[e],c=new RegExp(["([?&]",e,"=)[^&#]*"].join(""),"gi");
b=c.test(b)?b.replace(c,"$1"+d):[b,"&",e,"=",d].join("");
}
return b;
}
function formatNum(b,a)
{
var d=(isNaN(b)?0:b).toString(),c=a-d.length;
return c>0?[new Array(c+1).join("0"),d].join(""):d;
}
function numToStr(b,a)
{
var c=String(b.toFixed(a));
var d=/(-?\d+)(\d{3})/;
while(d.test(c))
{
c=c.replace(d,"$1,$2");
}
return c;
}
function numToTimeStr(a,b)
{
var c=b||"$HH$:$MM$:$SS$";
return T(c).replace({SS:formatNum(parseInt(a)%60,2),MM:formatNum(parseInt(a/60)%60,2),HH:formatNum(parseInt(a/3600)%60,2)});
}
function formatDate(a,b,c)
{
var e=a||new Date(),d=formatNum;
return T(b,c).replace({YY:d(e.getFullYear(),4),MM:d(e.getMonth()+1,2),DD:d(e.getDate(),2),hh:d(e.getHours(),2),mm:d(e.getMinutes(),2),ss:d(e.getSeconds(),2)});
}
function formatDayByLocale(a,b,c)
{
var e=a||new Date(),d=formatNum,g=getLocale();
var f={"zh_CN":{"%YY%-%MM%":"%YY%\u5E74%MM%\u6708","%YY%-%MM%-%DD%":"%YY%\u5E74%MM%\u6708%DD%\u65E5","%YY%-%MM%-%DD%-%WW%":"%YY%\u5E74%MM%\u6708%DD%\u65E5 %WW%","%MM%-%DD%":"%MM%\u6708%DD%\u65E5","%YY%-%MM%-%DD%-%HH%-%MMMM%":"%YY%\u5E74%MM%\u6708%DD%\u65E5%HH%\u65F6%MMMM%\u5206"},"en_US":{"%YY%-%MM%":"%MM% %YY%","%YY%-%MM%-%DD%":"%MM% %DD%,%YY%","%YY%-%MM%-%DD%-%WW%":"%WW%, %MM% %DD%,%YY%","%MM%-%DD%":"%MM% %DD%","%YY%-%MM%-%DD%-%HH%-%MMMM%":"%MM% %DD%,%YY% %HH%:%MMMM%"}};
return T(f[g][b],c).replace({YY:d(e.getFullYear(),4),MM:outputMonth(e.getMonth()),DD:d(e.getDate(),2),WW:outputDayOfWeek(e.getDay(),true),HH:d(e.getHours(),2),MMMM:d(e.getMinutes(),2)});
}
function formatDateByLocale(a)
{
return formatDayByLocale(new Date(a.year,parseInt(a.month)-1,a.day||"1"),a.pattern,"%");
}
function outputMonth(a)
{
var d=getLocale();
var b=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
var c=["January","February","March","April","May","June","July","Aguest","September","October","November","December"];
if(d=="en_US")
{
return b[a];
}
else{
return a+1;
}
}
function outputDayOfWeek(b,a)
{
var d=getLocale(),c;
if(d=="en_US")
{
if(!a)
{
c=["S","M","T","W","T","F","S"];
}
else{
c=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
}
}
else{
if(a)
{
c=["\u661F\u671F\u65E5","\u661F\u671F\u4E00","\u661F\u671F\u4E8C","\u661F\u671F\u4E09","\u661F\u671F\u56DB","\u661F\u671F\u4E94","\u661F\u671F\u516D"];
}
else{
c=["\u65E5","\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D"];
}
}
return c[b];
}
function getAsiiStrLen(a)
{
return (a||"").replace(/[^\x00-\xFF]/g,"aa").length;
}
function clearHtmlStr(a)
{
return a?a.replace(/<[^>]*>/g,""):a;
}
function subAsiiStr(d,b,c,a)
{
var e=function(i){
return i;
},f=a?htmlEncode:e,n=(a?htmlDecode:e)(trim((d||"").toString())),m=c||"",j=Math.max(b-m.length,1),l=n.length,h=0,k=-1,g;
for(var o=0;o<l;o++)
{
g=n.charCodeAt(o);
h+=g==35||g==87?1.2:(g>255?1.5:1);
if(k==-1&&h>j)
{
k=o;
}
if(h>b)
{
return f(n.substr(0,k))+m;
}
}
return f(n);
}
function setCookie(d,f,b,e,c,a)
{
if(d)
{
document.cookie=T(['$name$=$value$; ',!b?'':'expires=$expires$; ','path=$path$; ','domain=$domain$; ',!a?'':'$secure$']).replace({name:d,value:encodeURIComponent(f||""),expires:b&&b.toGMTString(),path:e||'/',domain:c||["mail.",getDomain()].join(""),secure:a?"secure":""});
return true;
}
else{
return false;
}
}
function getCookie(a)
{
var b=(new RegExp(["(^|;|\\s+)",regFilter(a),"=([^;]*);?"].join("")));
if(b.test(document.cookie))
{
try{
return decodeURIComponent(RegExp["$2"]);
}
catch(c)
{
return RegExp["$2"];
}
}
}
function deleteCookie(b,c,a)
{
setCookie(b,"",new Date(0),c,a);
}
function setCookieFlag(d,b,a,c)
{
var f=c||getCookieFlag(d),e=new Date();
e.setTime(e.getTime()+(30*24*3600*1000));
f[b]=a;
setCookie(d,f.join(""),e);
return f;
}
function getCookieFlag(a)
{
var b=(getCookie(a)||"").split("");
for(var c=b.length;c<6;c++)
{
b[c]='0';
}
return b;
}
function isArr(a)
{
return Object.prototype.toString.call(a)=="[object Array]";
}
function E(d,a,c,b)
{
if(!d)
{
return;
}
if(d.length!=null)
{
var f=d.length,e;
if(b<0)
{
e=f+b;
}
else{
e=b<f?b:f;
}
for(var h=(c||0);h<e;h++)
{
try{
if(a(d[h],h,f)===false)
{
break;
}
}
catch(g)
{
debug([g.message,"<br>line:",g.lineNumber,'<br>file:',g.fileName,"<br>",a]);
}
}
}
else{
for(var h in d)
{
try{
if(a(d[h],h)===false)
{
break;
}
}
catch(g)
{
debug([g.message,"<br>",a]);
}
}
}
}
function extend()
{
for(var b=arguments,c=b[0],e=1,a=b.length;e<a;e++)
{
var d=b[e];
for(var f in d)
{
c[f]=d[f];
}
}
return c;
}
function delAtt(a,b)
{
try{
delete a[b];
}
catch(c)
{
}
return a;
}
function saveAtt(a,b)
{
if(a)
{
var c=a.hasOwnProperty(b),d=a[b];
return function(){
if(c)
{
a[b]=d;
}
else{
delAtt(a,b);
}
return a;
};
}
else{
return function(){
};
}
}
function globalEval(b,a)
{
var c=getTop().globalEval||arguments.callee;
if(!c._bTest&&typeof (c._bScriptEval)!="boolean")
{
var i="testScriptEval"+now();
c._bTest=true;
c(T('window.$id$=1;').replace({id:i}));
c._bTest=false;
c._bScriptEval=getTop()[i]?true:false;
}
var h=trim(b);
if(!h)
{
return false;
}
var d=(a||window).document,f=GelTags("head",d)[0]||d.documentElement,g=d.createElement("script");
g.type="text/javascript";
if(c._bScriptEval||arguments.callee._bTest)
{
try{
g.appendChild(d.createTextNode(h));
}
catch(e)
{
}
}
else{
g.text=h;
}
f.insertBefore(g,f.firstChild);
f.removeChild(g);
return true;
}
function evalValue(b,a)
{
var d=unikey("_u"),c=a||window;
globalEval(["(function(){try{window.",d,"=",b,";}catch(_oError){}})();"].join(""),c);
return c[d];
}
function evalCss(b,a,c)
{
if(b)
{
var d=a?a.document||a:document,g="cssfrom",i="style",e=d.getElementsByTagName(i)[0];
if(c&&e)
{
var h=e.getAttribute(g)||"";
if(h.indexOf(c)!=-1)
{
return;
}
}
if(d.createStyleSheet)
{
e=e||d.createStyleSheet().owningElement;
e.styleSheet.cssText+=getRes(b);
}
else{
if(!e)
{
var f=d.getElementsByTagName("head")[0];
e=d.createElement(i);
e.type="text/css";
f.insertBefore(e,f.firstChild);
}
e.textContent+=getRes(b);
}
c&&e.setAttribute(g,[e.getAttribute(g)||"",c].join(","));
}
}
function evalCssNew(b,a,c)
{
if(b)
{
var d=a?a.document||a:document,i="cssfrom",k="style",e=d.getElementsByTagName(k)[0],h=d.getElementsByTagName("head")[0].getElementsByTagName(k),g=h[h.length-1];
if(c&&g)
{
var j=g.getAttribute(i)||"";
if(j.indexOf(c)!=-1)
{
return;
}
}
if(d.createStyleSheet)
{
g=g||d.createStyleSheet().owningElement;
g.styleSheet.cssText+=getRes(b);
}
else{
if(!g)
{
var f=d.getElementsByTagName("head")[0];
g=d.createElement(k);
g.type="text/css";
f.insertAdjacentElement?f.insertAdjacentElement("beforeEnd",g):f.insertBefore(g,f.lastChild||f.firstChild);
}
g.textContent+=getRes(b);
}
c&&g.setAttribute(i,[g.getAttribute(i)||"",c].join(","));
}
}
function S(b,a)
{
try{
return (a&&(a.document||a)||document).getElementById(b);
}
catch(c)
{
return null;
}
}
function SN(b,a)
{
try{
var c=(a&&(a.document||a)||document).getElementsByName(b);
if(c)
{
c[_gsForEBuiltTag]=true;
}
return c;
}
catch(d)
{
return null;
}
}
function attr(a,b,c)
{
if(!a||!a.nodeType||a.nodeType===3||a.nodeType===8)
{
return undefined;
}
if(c===undefined)
{
return a.getAttribute(b);
}
else{
a.setAttribute(b,c);
return a;
}
}
function GelTags(b,a)
{
var c=(a||document).getElementsByTagName(b);
if(c)
{
c[_gsForEBuiltTag]=true;
}
return c;
}
function CN(b,a,c)
{
a=a||document;
if(a.getElementsByClassName)
{
return a.getElementsByClassName(b);
}
else{
c=c||"*";
var f=[],d=(c=='*'&&a.all)?a.all:a.getElementsByTagName(c),g=d.length;
b=b.replace(/\-/g,'\\-');
var e=new RegExp('(^|\\s)'+b+'(\\s|$)');
while(--g>=0)
{
if(e.test(d[g].className))
{
f.push(d[g]);
}
}
return f;
}
}
;function F(b,a)
{
var c=S(b,a);
return c&&(c.contentWindow||(a||window).frames[b]);
}
function appendToUrl(b,a)
{
var c=b.split("#");
return [c[0],a,(c.length>1?"#"+c[1]:"")].join("");
}
function insertHTML(c,e,d)
{
if(!c)
{
return false;
}
try{
if(c.insertAdjacentHTML)
{
c.insertAdjacentHTML(e,d);
}
else{
var h=c.ownerDocument.createRange(),a=e.indexOf("before")==0,b=e.indexOf("Begin")!=-1;
if(a==b)
{
h[a?"setStartBefore":"setStartAfter"](c);
c.parentNode.insertBefore(h.createContextualFragment(d),b?c:c.nextSibling);
}
else{
var f=c[a?"lastChild":"firstChild"];
if(f)
{
h[a?"setStartAfter":"setStartBefore"](f);
c[a?"appendChild":"insertBefore"](h.createContextualFragment(d),f);
}
else{
c.innerHTML=d;
}
}
}
return true;
}
catch(g)
{
return false;
}
}
function setHTML(b,a)
{
var d=typeof b==="string"?S(b):b,c=d.cloneNode(false);
c.innerHTML=a;
d.parentNode.replaceChild(c,d);
return c;
}
function replaceHTML(a,b)
{
var c=false;
if(a.previousSibling)
{
c=insertHTML(a.previousSibling,"afterEnd",b);
}
else{
c=insertHTML(a.parentNode,"afterBegin",b);
}
if(c)
{
removeSelf(a);
}
return c;
}
function createIframe(b,c,a)
{
var f="_creAteifRAmeoNlQAd_",e=a||{},g=a.id||unikey(),d=S(g,b);
if(typeof b[f]!="function")
{
b[f]=function(i,h){
callBack.call(h,arguments.callee[i],[b]);
};
}
b[f][g]=a.onload;
if(!d)
{
insertHTML(e.obj||b.document.body,e.where||"afterBegin",TE(['<iframe frameborder="0" scrolling="$scrolling$" id="$id$" name="$id$" ','$@$if($transparent$)$@$allowTransparent$@$endif$@$ class="$className$" ','onload="this.setAttribute(\x27loaded\x27,\x27true\x27);$cb$(\x27$id$\x27,this);" ','src="$src$" style="$style$" $attrs$>','</iframe>']).replace(extend({"id":g,"cb":f,style:"display:none;",scrolling:"no",src:c},a)));
d=S(g,b);
d._onload=a.onload;
}
else if(d.getAttribute("loaded")=="true")
{
b[f](g,d);
}
return d;
}
function removeSelf(a)
{
try{
a.parentNode.removeChild(a);
}
catch(b)
{
}
return a;
}
function isObjContainTarget(a,b)
{
try{
if(!a||!b)
{
return false;
}
else if(a.contains)
{
return a.contains(b);
}
else if(a.compareDocumentPosition)
{
var d=a.compareDocumentPosition(b);
return (d==20||d==0);
}
}
catch(c)
{
}
return false;
}
function isDisableCtl(b,a)
{
var c=SN(b,a);
for(var d=c.length-1;d>=0;d--)
{
if(c[d].disabled)
{
return true;
}
}
return false;
}
function disableCtl(c,a,b)
{
E(SN(c,b),function(d){
d.disabled=a;
});
}
(function(a){
var f=/\[([\w\-_]+)(=[\'\"]?([\w\-_~@]+)[\'\"]?)?\]/,g=/\[[\w\-_]+(=[\'\"]?[\w\-_~@]+[\'\"]?)?\]/g,h=/^([#\$<:])([\w\-_]+)>?$/,i=/.*?\.([\w\-_]+)/,l=/(?:[\w\-~@\\.#\[\]=\'\"]+)+|\*|>/ig,j=/#([\w\-_]+)/,k=/^([\w\*\-_]+)/,m=[a,a];
function b(q)
{
for(var t=0,s=[],r=q.length;t<r;t++)
{
s[t]=q[t];
}
return s;
}
function e(t,s,r,q)
{
var u=!s||s.test(t.className),x=0,w,v;
while(u&&x<q)
{
w=t.getAttribute((v=r[x++])[1]);
u=v[2]?w===v[3]:!!w;
}
return u;
}
function o(q)
{
var r=q.match(g);
if(r)
{
for(var s=r.length-1;s>=0;s--)
{
r[s]=r[s].match(f);
}
}
return r;
}
function p(q)
{
var r=(q.match(i)||m)[1];
return r&&RegExp('(^|\\s)'+r+'(\\s|$)');
}
function c(s,r,q)
{
var G=s.pop();
if(G==='>')
{
return c(s,r,true);
}
var C=(G.match(j)||m)[1],y=p(G),D=(G.match(k)||m)[1],x=o(G),u=x?x.length:0,B=[],w=-1,v=-1,z,A,t;
D&&(D=D=="*"?"":D.toUpperCase());
while((z=r[++v]))
{
A=z.parentNode;
do{
t=(!C||A.id===C)&&(!D||A.nodeName==D)&&e(A,y,x,u);
if(q||t)
{
break;
}
}
while((A=A.parentNode)&&A.getAttribute);
t&&(B[++w]=z);
}
return s[0]&&B[0]?c(s,B):B;
}
function n(r,q)
{
if(!q)
{
return [];
}
var z=r.match(l),C=z.pop(),A=(C.match(j)||m)[1],v=p(C),u=o(C),s=u?u.length:0,B=(C.match(k)||m)[1],y=[],w=[],D=-1,t=-1,x;
while((q=q.parentNode)&&q.nodeType!==9)
{
y.push(q);
}
B&&(B=B=="*"?"":B.toUpperCase());
while(x=y[++D])
{
(!A||x.id===A)&&(!B||x.nodeName==B)&&e(x,v,u,s)&&(w[++t]=x);
}
return z[0]&&w[0]?c(z,w):w;
}
function d(r,q)
{
if(!q)
{
return [];
}
if(q.querySelectorAll)
{
return b(q.querySelectorAll(r));
}
var C=r.match(l),H=C.pop(),D=(H.match(j)||m)[1],v=p(H),u=o(H),s=u?u.length:0,G=(H.match(k)||m)[1],w;
if(D)
{
var y=(q||window).document||q,z=y.getElementById(D);
if(!z||(G&&z.nodeName!=G.toUpperCase())||!e(z,v,u,s))
{
return [];
}
w=[z];
}
else{
var x=q.getElementsByTagName?q:q.document,A=x.getElementsByTagName(G||'*');
if(v||s)
{
var I=-1,t=-1,B;
w=[];
if(!s)
{
while(B=A[++I])
{
v.test(B.className)&&(w[++t]=B);
}
}
else{
while(B=A[++I])
{
e(B,v,u,s)&&(w[++t]=B);
}
}
}
else{
w=b(A);
}
}
return C[0]&&w[0]?c(C,w):w;
}
window.finds=d;
window.parents=n;
})();
function isShow(b,a)
{
return (getStyle((typeof (b)=="string"?S(b,a):b),"display")||"none")!="none";
}
function show(c,a,b)
{
var d=(typeof (c)=="string"?S(c,b):c);
if(d)
{
d.style.display=(a?"":"none");
}
else if(!b&&typeof (c)=="string")
{
}
return d;
}
var Show=show;
function toggle(b,a)
{
return show(b,!isShow(b,a),a);
}
function setClass(a,b)
{
if(a&&typeof (b)!="undefined"&&a.className!=b)
{
a.className=b;
}
return a;
}
function addClass(a,b)
{
var c=" "+a.className+" ";
if(c.indexOf(" "+b+" ")<0)
{
a.className+=a.className?" "+b:b;
}
return a;
}
;function rmClass(a,b)
{
if(a)
{
if(b)
{
var c=" "+a.className+" ";
c=c.replace(" "+b+" "," ");
a.className=trim(c);
}
else{
a.className="";
}
}
return a;
}
;function hasClass(a,b)
{
return a&&(" "+a.className+" ").indexOf(" "+b+" ")>-1;
}
;function getStyle(a,b)
{
var c;
try{
c=a&&(a.currentStyle?a.currentStyle:a.ownerDocument.defaultView.getComputedStyle(a,null));
}
catch(d)
{
}
return c&&c[b]||"";
}
function setOpacity(b,a)
{
if(b&&b.tagName)
{
var d=b.style,c=a||0;
if(typeof d.opacity=="undefined")
{
d.filter=c==1?"":["alpha(opacity=",c*100,")"].join("");
}
else{
d.opacity=c;
}
}
return b;
}
function getOpacity(b,a)
{
if(b&&b.tagName)
{
var d=b.style,c=1;
if(typeof d.opacity=="undefined")
{
c=parseFloat(d.filter.split("=").pop())/100;
}
else{
c=parseFloat(d.opacity);
}
if(isNaN(c))
{
c=1;
}
}
return c;
}
function getStrDispLen(a)
{
var d="__QMStrCalcer__";
var c=S(d,getTop());
if(!c)
{
var b=getTop().document.body;
insertHTML(b,"afterBegin",T(['<div id="$id$" ','style="filter:alpha(opacity=0);opacity:0;width:1px;height:1px;overflow:auto;*overflow:hidden;white-space:nowrap;','position:absolute;left:0;top:0;">','</div>']).replace({id:d}));
c=b.firstChild;
}
c.innerHTML=htmlEncode(a);
return c.scrollWidth;
}
function calcPos(d,f,c,b)
{
var i=0,h=0,j=0,g=0,q=arguments.callee,a=function(e){
return e;
};
!c&&(c=a);
!b&&(b=a);
if(d&&d.tagName)
{
var p=d,o=d.parentNode,l,m=d.ownerDocument,n=m.documentElement,k=m.body;
try{
l=d.offsetParent;
}
catch(r)
{
return;
}
h+=b(d.offsetLeft);
i+=c(d.offsetTop);
j=d.offsetWidth;
g=d.offsetHeight;
while(l&&o&&o!=n&&o!=k)
{
if(q._isSupportsFixedPosition()&&p.style&&getStyle(p,"position")==="fixed")
{
break;
}
if(l==o)
{
h+=b(o.offsetLeft);
i+=c(o.offsetTop);
l=o.offsetParent;
}
h-=o.scrollLeft;
i-=o.scrollTop;
p=o;
o=o.parentNode;
}
if(q._isSupportsFixedPosition()&&p.style&&getStyle(p,"position")==="fixed")
{
h+=bodyScroll(m,'scrollLeft');
i+=bodyScroll(m,'scrollTop');
}
}
return f=="json"?{top:i,bottom:i+g,left:h,right:h+j,width:j,height:g}:[i,h+j,i+g,h,j,g];
}
calcPos._isSupportsFixedPosition=function(){
var a,c=this;
if(c._bIsSupportsFixedPosition==a)
{
var b=document.createElement("div");
b.style.cssText="'position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;";
b.innerHTML="<div style='position:fixed;top:20px;'></div>";
document.body.appendChild(b);
c._bIsSupportsFixedPosition=!!{20:1,15:1}[b.firstChild.offsetTop];
}
return c._bIsSupportsFixedPosition;
};
function calcPosFrame(a,b)
{
var c=calcPos(a),f=b||window,e=getTop();
while(f.frameElement&&f!=e)
{
var d=calcPos(f.frameElement);
c[0]+=d[0]-bodyScroll(f,"scrollTop");
c[2]+=d[0]-bodyScroll(f,"scrollTop");
c[1]+=d[3]-bodyScroll(f,"scrollLeft");
c[3]+=d[3]-bodyScroll(f,"scrollLeft");
f=f.parent;
}
return c;
}
function calcAdjPos(d,c,a,e,b)
{
var i=bodyScroll(e,'clientHeight'),j=bodyScroll(e,'clientWidth'),l=bodyScroll(e,'scrollTop'),k=bodyScroll(e,'scrollLeft'),f=l+i,g=k+j,m=[0,0,0,0];
if(b<2)
{
var h=k-d[1];
if(b==0&&d[3]<c||b==1&&g-d[1]>c)
{
m[1]=(m[3]=d[1])+c;
}
else{
m[3]=(m[1]=d[3])-c;
}
if(d[0]+a>f)
{
m[0]=(m[2]=(d[2]-a<l?f:d[2]))-a;
}
else{
m[2]=(m[0]=d[0])+a;
}
}
else{
if(b==2&&d[0]-l<a||b==3&&f>d[2]+a)
{
m[2]=(m[0]=d[2])+a;
}
else{
m[0]=(m[2]=d[0])-a;
}
m[1]=d[1];
m[3]=d[3];
}
return m;
}
function bodyScroll(b,c,a)
{
var e=(b||window).document||b,d=e.body,f=e.documentElement;
if(typeof (a)=="number")
{
d[c]=f[c]=a;
}
else{
if(c=="scrollTop"&&typeof b.pageYOffset!="undefined")
{
return b.pageYOffset;
}
else{
return f[c]||d[c];
}
}
}
function htmlDecode(a)
{
return a&&a.replace?(a.replace(/&nbsp;/gi," ").replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&amp;/gi,"&").replace(/&quot;/gi,"\"").replace(/&#39;/gi,"'")):a;
}
function htmlEncode(a)
{
return a&&a.replace?(a.replace(/&/g,"&amp;").replace(/\"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\'/g,"&#39;")):a;
}
function filteScript(b,a)
{
return b&&b.replace(/<script ?.*>(.*?)<\/script>/ig,"<script>$1\n</script>").replace(/<script ?.*>([\s\S]*?)<\/script>/ig,a||"");
}
function textToHtml(a)
{
return ['<DIV>',a.replace((a.indexOf("<BR>")>=0)?/<BR>/ig:/\n/g,"</DIV><DIV>"),"</DIV>"].join("").replace(new RegExp("\x0D","g"),"").replace(new RegExp("\x20","g"),"&nbsp;").replace(new RegExp("(<DIV><\/DIV>)*$","g"),"").replace(/<DIV><\/DIV>/g,"<DIV>&nbsp;</DIV>");
}
function textToHtmlForNoIE(a)
{
return a.replace(/\n/g,"<br>");
}
function htmlToText(a)
{
return a.replace(/\n/ig,"").replace(/(<\/div>)|(<\/p>)|(<br\/?>)|(<\/li>)/ig,"\n");
}
function fixNonBreakSpace(a)
{
return (a||"").replace(/\xA0/ig," ");
}
function pasteHTML(c,d,a,b)
{
b=b||getMainWin();
c=filteScript(c);
var e=(typeof (d)=="string"?S(d,b):d);
if(!e||!c)
{
return false;
}
if(a)
{
e.innerHTML=c;
}
else{
insertHTML(e,"afterBegin",c);
}
return true;
}
function limitString(b,a)
{
var f=b||"",d=a||20,c=f.length;
if(c>d)
{
var e=Math.floor((d-3)/2);
f=f.substring(0,e)+"..."+f.slice(-e,c);
}
return f;
}
;function T(b,a)
{
return new T._QMTemplate(b,a);
}
function TE(b,a)
{
var d=getTop();
if(d.QMTmplChecker)
{
var c=(new d.QMTmplChecker(b.join?b:[b],a)).getErrors();
if(c.length)
{
debug(c.join("\n"),"code");
}
}
return new T._QMTemplate(b,a,"exp");
}
T._QMTemplate=function(c,a,b){
this._msTmplStr=c.join?c.join(""):c.toString();
this._msTmplReplaceVar=a||"$";
this._replace=b=="exp"?this._replaceWithExp:this._replaceWithParse;
};
T._QMTemplate.prototype={toString:function(){
return this._msTmplStr;
},replace:function(a,b){
return this._replace(a,b);
},_replaceWithParse:function(a,b){
var f=this,h=f._msTmplReplaceVar,g=f._moTmplData,e=f._moLinkData,c=!g;
if(c)
{
g=f._moTmplData=f._msTmplStr.split(f._msTmplReplaceVar);
e=f._moLinkData=f._moTmplData.concat();
}
for(var j=1,d=g.length;j<d;j+=2)
{
e[j]=f._get(c?(g[j]=g[j].split(".")):g[j],a,b,h);
}
return e.join("");
},_replaceWithExp:function(b,c,a){
var f=this,d;
if(!f._mfReplace)
{
f._compile();
}
if(typeof c=="string")
{
var g=f._moSecDatas[c];
if(g)
{
d=typeof g!="function"?f._moSecDatas[c]=f._genHandleFunc(g):g;
}
}
else{
d=f._mfReplace;
}
try{
return d&&d(b,f._moTmplDatas,f._get,f._msTmplReplaceVar,htmlEncode,a||c)||"";
}
catch(e)
{
return e.message;
}
},_compile:function(){
var j=this,a=0,c=[],e=[],h=[],g=j._moSecDatas=[],m=j._msTmplReplaceVar,f=new RegExp(["","(.*?)",""].join(regFilter(m)),"g"),l="_afG('$1'.split('.'),_oD,_aoD,_aoR)",k=j._moTmplDatas=j._msTmplStr.split(["","@",""].join(m)),n;
for(var o=0,b=k.length;o<b;o++)
{
n=k[o];
if(o%2==0)
{
c.push("_oR.push(_aoT[",o,"].replace(_oD,_aoD));");
k[o]=T(n,m);
}
else if(n=="else")
{
c.push("}else{");
}
else if(n=="endsec")
{
if(h.length)
{
var d=h.pop();
g[d[0]]=c.slice(d[1]);
}
}
else if(n=="endfor")
{
e.length&&c.push("try{delete _oD._parent_;delete _oD._idx_;}catch(e){}}_oD=_oS",e.pop(),";");
}
else if(n=="endif")
{
c.push("}");
}
else if(n.indexOf("else if(")==0)
{
c.push("}",n.replace(f,l),"{");
}
else if(n.indexOf("if(")==0)
{
c.push(n.replace(f,l),"{");
}
else if(n.indexOf("for(")==0)
{
e.push(++a);
c.push("var _sI",a,",_oD",a,",_oS",a,"=_oD;",n.replace(f,["_sI",a," in (_oD",a,"=",l,")"].join("")),"{","_oD=_oD",a,"[_sI",a,"];","if(!_oD){continue;}","try{_oD._parent_=_oS",a,";","_oD._idx_=_sI",a,";}catch(e){}");
}
else if(n.indexOf("sec ")==0)
{
h.push([n.split(" ").pop(),c.length]);
}
else if(n.indexOf("eval ")==0)
{
c.push("_oR.push(",n.substr(5).replace(f,l),");");
}
else if(n.indexOf("html(")==0)
{
c.push("_oR.push(_afE(",n.substr(5).replace(f,l),");");
}
}
j._mfReplace=j._genHandleFunc(c);
return c;
},_genHandleFunc:function(_aoCompileDatas){
try{
return eval(['([function(_aoD,_aoT,_afG,_aoR, _afE, A){var _oR=[],_oD=_aoD;',_aoCompileDatas.join(""),'return _oR.join("");}])'].join(""))[0];
}
catch(_oErr)
{
return function(){
return "compile err!";
};
}
},_get:function(c,a,b,d){
var e=c.length,g,h;
if(e>1)
{
try{
h=a;
for(var j=0;j<e;j++)
{
g=c[j];
if(g=="_root_")
{
h=b;
}
else{
h=h[g];
}
}
}
catch(f)
{
h="";
}
}
else{
h={"_var_":d,"_this_":a}[g=c[0]]||a[g];
}
return h;
}};
var addEvent=(function(){
function a(d,e,c,b)
{
if(d&&c)
{
if(d.addEventListener)
{
d[b?"removeEventListener":"addEventListener"](e,c,false);
}
else if(d.attachEvent)
{
d[b?"detachEvent":"attachEvent"]("on"+e,c);
}
else{
d["on"+e]=b?null:c;
}
}
return d;
}
return function(d,e,c,b){
if(d&&(d.join||d[_gsForEBuiltTag]))
{
E(d,function(f){
a(f,e,c,b);
});
}
else{
a(d,e,c,b);
}
return d;
};
})();
function addEvents(b,c,a)
{
E(c,function(d,e){
addEvent(b,e,d,a);
});
return b;
}
function removeEvent(b,c,a)
{
return addEvent(b,c,a,true);
}
function removeEvents(a,b)
{
return addEvents(a,b,true);
}
function preventDefault(a)
{
if(a)
{
if(a.preventDefault)
{
a.preventDefault();
}
else{
a.returnValue=false;
}
}
return a;
}
function stopPropagation(a)
{
if(a)
{
if(a.stopPropagation)
{
a.stopPropagation();
}
else{
a.cancelBubble=true;
}
}
return a;
}
function getEventTarget(a)
{
return a&&(a.srcElement||a.target);
}
function getDomWin(a)
{
if(a)
{
var b=a.ownerDocument;
return b.defaultView||b.parentWindow;
}
}
function getUserTarget(a,b,c)
{
var d=getEventTarget(b);
while(d&&isObjContainTarget(a,d))
{
if(attr(d,c))
{
return d;
}
d=d.parentNode;
}
}
function fireMouseEvent(a,b)
{
if(a)
{
if(a.dispatchEvent)
{
var c=a.ownerDocument,e=c.defaultView,d=c.createEvent("MouseEvents");
d.initMouseEvent(b,true,true,e,0,0,0,0,0,false,false,false,false,0,null);
a.dispatchEvent(d);
}
else{
if(a.tagName=="INPUT"&&a.getAttribute("type")=="submit"&&b=="click")
{
a.click();
}
else{
a.fireEvent("on"+b);
}
}
}
return a;
}
var liveEvent=(function(){
var b={click:"ck",dblclick:"dbl",mousedown:'md',mouseup:'mu',mouseover:'mor',mousemove:'mm',mouseout:'mot',keydown:'kd',keypress:'kp',keyup:'ku'};
function a(c,d)
{
var j=c.type,i=b[j],g=d.rule()[j],e=d.events(),h=getEventTarget(c);
if(!i)
{
return;
}
do{
var k=h.getAttribute(i),f=g[k];
if(k&&f&&e[k])
{
_vRe=e[k].call(d,c,h);
if(!f.bPropagable)
{
break;
}
}
}
while((h=h.parentNode)&&h.getAttribute);
}
return function(c,d){
var e=d.rule();
for(var f in e)
{
addEvent(c,f,function(g){
a(g,d);
});
}
};
})();
function loadJsFile(f,b,e,c,d,a)
{
var k=e||document,h=typeof c=="function",m,n,l=getTop().loadJsFile,p=getRes(f),j=l._oDatas||(l._oDatas={});
if(b)
{
for(var o=GelTags("script",k),r=o.length-1;r>=0;r--)
{
if(o[r].src.indexOf(p)!=-1)
{
if(h)
{
var q=o[r].getAttribute("_key_");
if(j[q]===true)
{
callBack.call(o[r],c);
}
else{
j[q].push(c);
}
}
return o[r];
}
}
}
n=k.createElement("script");
E(d,function(s,i){
n.setAttribute(i,s);
});
var q=unikey();
n.setAttribute("_key_",q);
j[q]=[];
function g()
{
var i=this,s=i.getAttribute("_key_");
callBack.call(i,c);
E(j[s],function(t){
t();
});
j[s]=true;
if(a)
{
removeSelf(n);
}
i.onreadystatechange=i.onload=null;
}
(GelTags("head",k)[0]||k.documentElement).appendChild(extend(n,{onload:g,onreadystatechange:function(){
var i=this;
({loaded:true,complete:true}[i.readyState])&&g.call(this);
}},{type:"text/javascript",charset:d&&d.charset||"gb2312",src:p}));
return n;
}
function loadJsFileToTop()
{
if(arguments.length==2)
{
var d=arguments[0],a=arguments[1];
}
else{
var d="",a=arguments[0];
}
var c=window.loadJsFile;
function b(e)
{
if(e)
{
c(d+e,true,getTop().document);
}
}
E(a,b);
}
function loadCssFile(c,a,b)
{
var e=b||document,j=getRes(c);
if(a)
{
for(var g=GelTags("link",e),k=g.length-1;k>=0;k--)
{
if(g[k].href.indexOf(j)!=-1)
{
return;
}
}
}
var f=e.createElement("link"),h=GelTags("link",e);
f.type="text/css";
f.rel="stylesheet";
f.href=j;
if(h.length>0)
{
var d=h[h.length-1];
d.parentNode.insertBefore(f,d.nextSibling);
}
else{
(GelTags("head",e)[0]||e.documentElement).appendChild(f);
}
return f;
}
function replaceCssFile(c,b,a)
{
if(c)
{
E(GelTags("link",a||document),function(d){
if(d&&d.href.indexOf(c)!=-1)
{
removeSelf(d);
}
});
}
return loadCssFile(b,false,a);
}
function QMAjax(d,c,a,b)
{
var i=this,j=getTop(),k=b,g;
function m()
{
i.onComplete(k);
}
function l(n)
{
i.onError(k,n);
}
function f(n)
{
if(!g)
{
g=setTimeout(function(){
i.abort();
},n);
}
}
function e(n)
{
if(g)
{
clearTimeout(g);
g=null;
if(n!="ok")
{
l(n);
}
return true;
}
return false;
}
this.method=c||"POST";
this.url=d;
this.async=true;
this.content="";
this.timeout=a;
this.onComplete=function(){
};
this.onError=function(){
};
this.getXhr=function(){
return k;
};
this.setXhr=function(n){
k=n;
};
if(!k)
{
try{
k=new XMLHttpRequest();
}
catch(h)
{
try{
k=new ActiveXObject("MSXML2.XMLHTTP");
}
catch(h)
{
try{
k=new ActiveXObject("Microsoft.XMLHTTP");
}
catch(h)
{
}
}
}
}
if(!k)
{
return false;
}
this.abort=function(){
e("abort");
k&&k.abort();
};
this.abortCustom=function(){
e("abortCustom");
k&&k.abort();
};
this.send=function(n){
if(!this.method||!this.url||!this.async)
{
return false;
}
typeof this.url=="object"&&(this.url=this.url.replace({}));
var q=this.method.toUpperCase(),r=getTop().getSid&&getTop().getSid();
this.abort();
var p=QMDistributeDomain(this.url,k);
k=p.oXhr;
var s=p.sUrl;
k.open(q,s+(r&&q=="POST"&&((this.url.split("?")[1]||"")+"&").indexOf("&sid=")==-1?(this.url.indexOf("?")==-1?"?sid=":"&sid=")+r:""),this.async);
if(q=="POST")
{
k.setRequestHeader("Content-Type",document.charset);
k.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
j.E(this.headers,function(u,t){
k.setRequestHeader(t,u);
});
k.onreadystatechange=function(){
try{
if(k.readyState==4)
{
if(k.status==200)
{
if(e("ok"))
{
m();
}
}
else{
e(k.status);
}
}
}
catch(t)
{
e(t.message);
}
};
f(this.timeout||15000);
try{
if(q=="POST")
{
k.send(n||this.content);
}
else{
k.send(null);
}
}
catch(o)
{
e(o.message);
}
return true;
};
}
;QMAjax.newXhr=function(a){
var c=a||window;
if(c.ActiveXObject)
{
try{
return new c.ActiveXObject("MSXML2.XMLHTTP");
}
catch(b)
{
try{
return new c.ActiveXObject("Microsoft.XMLHTTP");
}
catch(b)
{
}
}
}
if(c.XMLHttpRequest)
{
return new c.XMLHttpRequest();
}
Log("gen xhr fail");
};
QMAjax.send=function(c,a,b){
var g=getTop(),e=a||{};
if(typeof QMDistributeDomain=="function")
{
var f,d;
if(b)
{
f=QMDistributeDomain(c,b.getXhr());
if(f.bNewXhr)
{
b.setXhr(f.oXhr);
}
d=b;
}
else{
f=QMDistributeDomain(c,e.xhr);
d=new QMAjax("","",0,f.oXhr);
}
c=f.sUrl;
d.url=c;
}
else{
d=b||new QMAjax();
d.url=c;
}
g.E("method,timeout,content,headers".split(","),function(h){
if(e[h])
{
d[h]=e[h];
}
});
d.onComplete=function(h){
g.callBack.call(h,a.onload,[true,g.trim2(h.responseText||""),h]);
};
d.onError=function(h,i){
g.callBack.call(h,a.onload,[false,i,h]);
};
d.send();
};
function includeAjax(a)
{
var b=[];
b.push(QMAjax.toString());
b.push(["var QMAjaxSend =",QMAjax.send.toString()].join(""));
globalEval(b.join(""),a);
}
var QMAjaxRequest=QMAjax;
function getErrMsg(a,b)
{
var e="_AjaxErrorHTML_";
var c=S(e);
if(!c)
{
c=document.createElement("div");
c.id=e;
c.style.display="none";
document.body.appendChild(c);
}
c.innerHTML=filteScript(a.status==200?a.responseText:"");
var d=S(b);
return d&&(d.innerText||d.textContent)||"";
}
function getHttpProcesser()
{
var d=getTop(),a=d.gCurHttpProcesserId||0;
d.gCurHttpProcesserId=(a+1)%30;
try{
if(d.gHttpProcesserContainer[a]!=null)
{
delete d.gHttpProcesserContainer[a];
}
}
catch(b)
{
d.gHttpProcesserContainer={};
}
var c=d.gHttpProcesserContainer[a]=new d.Image();
c.onload=function(){
return false;
};
return c;
}
function goUrl(b,c,a)
{
c=trim(addDistributeDomainPrefix(c,b));
try{
var g=(b.contentWindow||b).location,f=g.href.split("#"),h=c.split("#"),d=h[0]==f[0],i=d?h[0]:c;
if(a)
{
g.href=i;
}
else{
g.replace(i);
}
}
catch(e)
{
b.src=c;
}
}
function generateFlashCode(d,c,a,b)
{
var g=[],l=[],i=[],n=b||{},h=T(' $name$=$value$ '),m=T('<param name="$name$" value="$value$" />'),j=gbIsIE?T(['<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ','$codebase$ ','$attr$ $id$ >','$param$','<embed $embed$ type="application/x-shockwave-flash" ','$pluginspage$ ',' $name$ ></embed>','</object>']):T(['<embed $embed$ type="application/x-shockwave-flash" ','$pluginspage$ ',' $name$ $id$ ></embed>']);
function e(o,p)
{
return {name:o,value:p};
}
n.allowScriptAccess="always";
n.quality="high";
for(var f in n)
{
var k=e(f,n[f]);
l.push(m.replace(k));
i.push(h.replace(k));
}
for(var f in a)
{
var k=e(f,a[f]);
g.push(h.replace(k));
i.push(h.replace(k));
}
if(c)
{
l.push(m.replace(e("movie",c)));
i.push(h.replace(e("src",c)));
}
return j.replace({id:d&&[' id="',d,'"'].join(""),name:d&&[' name="',d,'"'].join(""),attr:g.join(""),param:l.join(""),embed:i.join(""),codebase:location.protocol=="https:"?'':'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" ',pluginspage:location.protocol=="https:"?'':'pluginspage="http://www.adobe.com/cn/products/flashplayer" '});
}
function getFlash(b,a)
{
var d=a||window,c=d[b]||d.document[b];
return c&&(c.length?c[c.length-1]:c);
}
function zoomFuncCreater(a)
{
return function(e,b,d,c){
var h=d||a.limitWidth||1,g=c||a.limitHeight||1,k=(e/h)||1,f=(b/g)||1,n=[k<1?"w":"W",f<1?"h":"H"].join(""),m=a[n]||a.all,l={};
switch(m)
{case "stretch":
l.width=h;
l.height=g;
break;
case "zoomMaxMin":
case "zoomMinMax":
var j=e>b?0:1;
m=["zoomMax","zoomMin"][m=="zoomMinMax"?1-j:j];
case "zoomMax":
case "zoomMin":
var i=Math[m=="zoomMax"?"min":"max"](f,k);
l.width=Math.round(e/i);
l.height=Math.round(b/i);
break;
case "none":
default:
l.width=e;
l.height=b;
break;
}l.left=Math.round((h-l.width)/2);
l.top=Math.round((g-l.height)/2);
return l;
};
}
function scrollIntoMidView(e,d,b,c,a)
{
if(!e||!d)
{
return false;
}
var f=d.tagName.toUpperCase()=="BODY",n=d.ownerDocument,o=n.documentElement;
if(f&&o.clientHeight)
{
d=o;
}
var l=calcPos(e)[0]-calcPos(d)[0]-(f?d.scrollTop:0),i=l,k=e.offsetHeight,h=d.clientHeight,g=c||0;
if(b||i<0||i+k>h)
{
var j=0,m;
if(h>k+g)
{
if(a)
{
j=i<0?0:(h-k-g);
}
else{
j=(h-k-g)/2;
}
}
m=d.scrollTop=d.scrollTop+l-j;
d==o&&(n.body.scrollTop=m);
}
return true;
}
function Gel(b,a)
{
return (a||document).getElementById(b);
}
function objectActive(a)
{
}
function inherit(e,d,b,c,a)
{
var h=callBack(b,[d.prototype]),f=h.$_constructor_,g=function(){
if(arguments[0]!="__inherit__")
{
var i=callBack.call(this,a,arguments)||{};
if(i.bReturn)
{
return i.vData;
}
else{
if(!this._mbIsBuildConstructor)
{
this.constructor=arguments.callee;
this._mbIsBuildConstructor=true;
}
d.apply(this,arguments);
callBack.call(this,f,arguments);
}
}
};
extend(g.prototype=new d("__inherit__"),h,{toString:function(){
return "";
}});
return extend(g,c,{name:e,superclass:d});
}
function inheritEx(d,c,a,b)
{
var e={},f=inherit(d,c,a,b,function(){
var h=typeof (arguments[0]),g=h=="string"||h=="undefined";
return {bReturn:g,vData:f.$_call.apply(f,arguments)};
});
return extend(f,{$_call:function(h,i,g){
if(arguments.length==0)
{
return e;
}
else{
var j=e[h];
return arguments.length>1&&j?callBack.call(j,j[i],g):j;
}
},$_add:function(h,g){
return e[h]=g;
},get:function(g){
return e[g];
},$_del:function(g){
delete e[g];
}});
}
function cacheByIframe(a,b)
{
var g=b||{},k=g.win||getTop(),l=g.id||unikey("_"),e=[g.attrs],f=[];
for(var m=0,c=a&&a.length||0;m<c;m++)
{
for(var h=a[m],n=2,d=h.length;n<d;n++)
{
f.push(h[0],":",h[1],h[n],"|");
}
}
e.push(' _file="',encodeURIComponent(f.join("")),'"');
e.push(' _header="',encodeURIComponent(g.header||""),'"');
e.push(' _body="',encodeURIComponent(g.body||""),'"');
createIframe(k,getBlankUrl(k,g),extend({},g,{id:l,attrs:e.join(""),onload:function(i){
var j=this;
callBack.call(j,g.onload,[i]);
(g.destroy!=false||j.getAttribute("destroy")=="true")&&k.setTimeout(function(){
removeSelf(j);
},100);
}}));
}
function getBlankUrl(a,c)
{
c=c||{};
var b=(a||getTop()).location,d="/zh_CN/htmledition/"+getFullResSuffix("domain2.html");
return [d,"?",document.domain!=b.host?encodeURIComponent(document.domain):"",(b.href.indexOf(d)!=-1||c.useCache===false)?"&r="+Math.random():""].join("");
}
function clearCache()
{
arguments.length>0&&getTop().cacheByIframe(arguments,{destroy:false,onload:function(){
if(!this.getAttribute("destroy"))
{
this.setAttribute("destroy","true");
this.contentWindow.location.reload(true);
}
}});
}
function preLoad(d,c,b,a)
{
if(window!=getTop())
{
getTop().preLoad.apply(this,arguments);
}
else{
var g=arguments.callee,h=g._moWaitqueue=(g._moWaitqueue||[]);
if(d&&b)
{
for(var j=0,f=b.length;j<f;j++)
{
h.push([[d,c,b[j]]]);
}
}
if(!g._mbIsRun&&h.length>0)
{
g._mbIsRun=true;
function e()
{
g._mbIsRun=false;
callBack(a,[h.shift()[0][2]]);
setTimeout(function(){
g("","","",a);
},100);
}
cacheByIframe(h[0],{onload:e});
}
}
}
function setDblClickNoSel(a)
{
if(a)
{
var b="__MoUSeDoWnnoSEL__";
function c()
{
return (a.getAttribute(b)||"").toString().split(",");
}
function d(e,f)
{
a.setAttribute(b,[e,f]);
}
if(c().length==1)
{
d(0,"up");
addEvents(a,{mousedown:function(e){
var f=now(),g=parseInt(c()[0]);
d(f,"down");
if(f-g<500)
{
preventDefault(e);
}
},mouseup:function(){
d(c()[0],"up");
},selectstart:function(e){
if(c().pop()=="up")
{
preventDefault(e);
}
}});
}
}
return a;
}
var dddIndex=0;
function waitForShowTip(b,c,a)
{
var d=getTop();
var e=dddIndex++;
d.loadJsFile("$js_path$"+getFullResSuffix("qmtip.js"),true);
d.waitFor(function(){
return d.QMTip;
},function(f){
if(f)
{
if(b.domid)
{
window.fuck_domid=1;
}
else if(fuck_domid)
{
window.fuck_domid=0;
}
d.callBack(a,[d.QMTip[c||"markunshow"](b)]);
}
});
}
function addDistributeDomainPrefix(b,a)
{
var c=QMDistributeDomain.removeHost(b);
if(c.indexOf('/cgi-bin/')===0&&(c==b||b.indexOf(getTop().location.host)<5))
{
try{
if(!a||(a&&a.parent!=a))
{
return QMDistributeDomain.getHost()+c;
}
}
catch(d)
{
}
if(c==b)
{
return getTopHost()+c;
}
}
return b;
}
function getTopHost()
{
var a=getTop().location;
return [a.protocol,"//",a.host].join("");
}
function OprATagForDistributeDomain(a)
{
var b=getEventTarget(a),d=b.tagName,c=QMDistributeDomain.removeHost(b.href||''),c=QMDistributeDomain.removeDefaultHost(c);
if(d==="A"&&(c.indexOf('/cgi-bin/')===0||c.indexOf('/')===0))
{
if(b.target==="_blank"||b.target==="_top"||a.ctrlKey||(b.target==="_parent"&&window.parent==window)||attr(b,"unset")==="true"||b.target==="actionFrame")
{
b.href=[OprATagForDistributeDomain._sBlank,getTopHost(),c].join("");
}
else if(a.button!==2)
{
b.href=[OprATagForDistributeDomain._sBlank,QMDistributeDomain.getHost(),c].join("");
}
}
}
OprATagForDistributeDomain._sBlank=gbIsIE?" ":"";
function preventDefault2(a)
{
var b=getEventTarget(a),d=b.tagName,c=b.href;
if(d==="A"&&c&&("javascript:;"===c||"javascript:void(0);"===c))
{
preventDefault(a);
}
}
function isHttp()
{
return window.location.protocol=="http:";
}
var QMDistributeDomain=(function(){
var d=getTop();
function h()
{
return d.getTopHost();
}
function f()
{
return d.gsDistributeDomain||h();
}
function j(n)
{
if(n.indexOf('/cgi-bin/')===0)
{
return true;
}
var o=n.indexOf('//');
if(o==-1)
{
return true;
}
if(o===0)
{
return false;
}
if(o==5||o==6)
{
return !(/^http(s)?:\/\//i.test(n));
}
return true;
}
function i(n)
{
if(j(n))
{
return false;
}
n=n.toLowerCase();
if(n.indexOf('//')===0)
{
n=document.location.protocol+n;
}
return (n.indexOf(f())===0);
}
function e(n)
{
if(i(n))
{
return n;
}
if(j(n))
{
return f()+n;
}
return m(n);
}
function b(n)
{
return '/'+n.split('/').slice(3).join('/');
}
function g(n)
{
return j(n)?n:b(n);
}
function l(n)
{
return i(n)?b(n):n;
}
function k(n)
{
if(n.indexOf(h())===0)
{
return b(n);
}
return n;
}
function m(n)
{
return f()+g(n);
}
var c;
if(window.location.hostname.indexOf('exmail.qq.com')!=-1)
{
waitFor(function(){
return d.document.body;
},function(n){
if(n)
{
d.createIframe(d,getBlankUrl(d),{id:"iframe_distributeDomain_proxy_",onload:function(){
c=this;
}});
}
});
}
function a(o,n)
{
var p=false;
var q=j(o);
if(!n||q)
{
p=true;
try{
n=c.contentWindow.xmlHttp();
if(location.host=="dev.exmail.qq.com")
{
}
else{
o=e(o);
}
}
catch(r)
{
d.debug({title:'set proxy error',url:o},2);
o=h()+(q?o:g(o));
n=QMAjax.newXhr(d);
}
}
return {bNewXhr:p,sUrl:o,oXhr:n};
}
a.getTopHost=h;
a.getHost=f;
a.isRelativeUrl=j;
a.isHasDistributeHost=i;
a.addHost=e;
a.replaceHost=m;
a.getRelativeUrl=g;
a.removeHost=l;
a.removeDefaultHost=k;
return a;
})();
function getDomain(a)
{
return [["foxmail.com","qq.com","biz"],["Foxmail.com","QQ","\u817E\u8BAF"]][a?1:0][/,7$/.test(getSid())?2:(location.href.indexOf("foxmail.com")>-1?0:1)];
}
var GetDomain=getDomain;
function getSid()
{
return getTop().g_sid||(S("sid")?S("sid").value:location.getParams(getTop().location.href)["sid"]);
}
var GetSid=getSid;
function trimLeftLetter(b,a)
{
if(b&&b.length)
{
if(a)
{
return b.length>a?b.slice(0,a)+"...":b.slice(0,a);
}
else{
return b;
}
}
else{
return "";
}
}
function getUin()
{
return getTop().g_uin;
}
function getPaths()
{
var a={images_path:getTop().images_path||"/zh_CN/htmledition/images/",js_path:getTop().js_path||"/zh_CN/htmledition/js/",css_path:getTop().css_path||"/zh_CN/htmledition/css/",style_path:getTop().style_path||"/cgi-bin/getcss?sid="+getSid()+"ft=",swf_path:getTop().swf_path||"/zh_CN/htmledition/swf/",stationery_path:"http://rescdn.qqmail.com/zh_CN/",card_path:"http://rescdn.qqmail.com/zh_CN/",mo_path:"http://rescdn.qqmail.com/zh_CN/",editor_path:getTop().editor_path||"/zh_CN/htmledition/qqmaileditor/",neweditor_path:getTop().neweditor_path||"/zh_CN/htmledition/js/qqmaileditor/",base_path:"/",skin_path:"0",swf_cdn_path:"//res.mail.qq.com/bizmail/zh_CN/htmledition/swf/"};
for(var b in a)
{
a[b]=trim(getTop()[b])||a[b];
}
return a;
}
function getPath(b,a)
{
b=="image"&&(b+="s");
var c=getPaths()[b+"_path"]||"";
if(c)
{
if(a&&b!="skin"&&c.indexOf("http")!=0)
{
c=[location.protocol,"//",location.host,c].join("");
}
}
return c;
}
function getRes(a)
{
return T(a).replace(getPaths(),true);
}
function getFullResSuffix(a)
{
if(!getTop().gLn)
{
return a;
}
var b,d,c=".j"+"s";
if(a.indexOf(c)>0)
{
b=a.substr(0,a.indexOf(c));
d=c;
}
else if(a.indexOf(".css")>0)
{
b=a.substr(0,a.indexOf(".css"));
d=".css";
}
else if(a.indexOf(".html")>0)
{
b=a.substr(0,a.indexOf(".html"));
d=".html";
}
if(b.length>0&&getTop().gLn[b])
{
return b+getTop().gLn[b]+d;
}
else{
return a;
}
}
function outputJsReferece(c,a,b)
{
var i=c||outputJsReferece._msPath,f=a||outputJsReferece._moFileList,h=b||window,g=T(['<script language="JavaScript" src="$file$',(i.indexOf("?")==-1?'':'&r='+Math.random()),'"></','script>']),e=[];
outputJsReferece._msPath=i;
outputJsReferece._moFileList=f;
function d(j)
{
var k=trim(j||""),l=/[0-9a-fA-F]{6}\.js$/.test(k)?j.substr(0,j.length-9):j.split(".")[0];
if(l&&(c||!h[l+"_js"]))
{
e.push(g.replace({file:i+j}));
}
}
E(f,d);
return e.join("");
}
function runUrlWithSid(a)
{
try{
getTop().getHttpProcesser().src=T('$url$&sid=$sid$&r=$rand$').replace({url:a,sid:getSid(),rand:Math.random()});
}
catch(b)
{
}
}
function createBlankIframe(b,a)
{
cacheByIframe(a&&a.defcss==false?[]:[["css","",getRes("$css_path$comm.css")],["css",getPath("style"),"skin"]],extend({className:"menu_base_if",transparent:false,destroy:false},a,{win:b,header:["<script>",getTop.toString().replace(/[\r\n]/g,""),"<\/script>",a&&a.header||""].join(""),onload:function(c){
if(this.getAttribute("cbi_inited")!="true")
{
a&&a.transparent&&(this.contentWindow.document.body.style.background="transparent");
this.setAttribute("cbi_inited","true");
}
callBack.call(this,a&&a.onload,[c]);
}}));
}
function createActionFrame(a)
{
return createBlankIframe(a,{id:"actionFrame",defcss:false,onload:actionFinishCheck});
}
function getFileTypeByExt(a)
{
var b={"eml":"eml","pdf":"pdf","txt":"txt,h,m,js,as,java,c,cpp,plist,ini,stp,csv,xml","html":"html,htm,xhtml,mht","rar":"zip,7z,rar,bz2,gz,tar,tbz,tgz,cab,gzip,bzip2,deb","mov":"mp3,m4a,wma,wav,aac,ac3,mp2,ape,flac,f4a,mkv,rmvb,wmv,mp4,f4v,flv,avi,mov,qt,m4v,asf,rm,mpeg,mpg,vob,ts,3gp,3gpp,3gp2,ogg,ogv,mp4,webm,f4m,avi","jpg":"jpg,png,bmp,gif,jpeg,tiff","fl":"fla,swf","psd":"psd","exl":"xls,xlsx,et,ett","ppt":"ppt,pptx,dps,dpt","doc":"doc,docx,rtf,dot,docm,wps,wpt","blank":""};
b=(function(c){
var d={};
for(var e in c)
{
for(var h=c[e].split(","),f=0,g=h.length;f<g;f++)
{
d[h[f]]=e;
}
}
return d;
})(b);
return (b[a.toLowerCase()]||"blank");
}
;function getFileExt(a)
{
var b=a.split('.');
return b.length>1?b.pop().toLowerCase():'';
}
function isSupportImportWord(a)
{
return getTop().getViewTypeByFileName(a)=='doc';
}
function getViewTypeByFileName(a)
{
return getViewTypeByExt(getFileExt(a));
}
function getViewTypeByExt(a)
{
var b={"doc":"c,doc,xls,ppt,docx,xlsx,pptx,rtf,pdf,txt,js,as,htm,html,mht,xhtml,eml,h,m,java,cpp,plist,ini,xml,pps,stp,csv,dot,docm,et,ett,dps,dpt,wps,wpt","music":"mp3,f4a,oga,wma,wav,m4a,aiff,aifc","video":"mp4,wmv,swf,mov,flv,f4v,m4v,ogg,ogv,webm,avi,m4v,rm,rmvb,mpeg,mpg,3gp","compress":"zip,7z,rar,bz2,gz,tar,tbz,tgz,cab,gzip,bzip2,deb","img":"jpg,jpeg,bmp,gif,png"};
for(var c in b)
{
if([",",b[c],","].join("").indexOf([",",a.toLowerCase(),","].join(""))>-1)
{
return c;
}
}
return "other";
}
var getPreviewView=(function(){
var b=getTop();
function a(c)
{
return "txt,html".indexOf(b.getFileTypeByExt(c||""))>-1;
}
return function(c,d){
var h=c.get('sName'),e=b.getFileExt(h),f=b.getFileTypeByExt(e||""),j=b.getViewTypeByExt(e),g=c.get("mailid")?[c.get("mailid"),c.get("attachid"),c.get("attachname")].join("|"):'';
var i=b.T(['/cgi-bin/$appname$?sid=$sid$&upfilelistitem=$upfileid$&mailattach=$mailattach$','&filename=$filename$&filetype=$filetype$&t=$t$&readprev=$compose$&filepath=$filepath$','&action=$action$$viewdocparam$&viewtype=$viewtype$&r=$rand$&sc=false']).replace({sid:b.getSid(),rand:Math.random(),appname:{"txt":"readtemplate","html":"readtemplate","eml":"viewdocument"}[f]||{"compress":"viewcompress","video":"viewfile","music":"viewfile","img":"viewfile"}[j]||"viewdocument",action:j=="compress"?"list":(a(e)?"view":""),compose:"normal",t:d||'attachments_simple',upfileid:c.get("sFileId"),filename:b.encodeURI(h),filetype:f,filepath:(c.get("sFilePath"))||"",mailattach:g,viewdocparam:j=="doc"?"&s=yozo&fromattach=1&from=attachfolder":"",viewtype:e=="eml"?"eml":""});
return i;
};
})();
function getIconByExt(a,b)
{
var c=/^(min|mid|max)$/g.test(b)?b:"min";
return ["/zh_CN/htmledition/images/xdisk/ico_",c,"/fu_",getFileTypeByExt(a.toLowerCase()),".gif"].join("");
}
;function calcMainFrameDomInGlobalPos(a,b)
{
var k=calcPos(a),j=calcPos(S("mainFrame",getTop())),h=getMainWin().document,i=h.documentElement,g=h.body,d=k[3]+j[3]-(i.scrollLeft||g.scrollLeft||0),e=k[0]+j[0]-(i.scrollTop||g.scrollTop||0),f=k[4],c=k[5];
return b=="json"?{top:e,bottom:e+c,left:d,right:d+f,width:f,height:c}:[e,d+f,e+c,d,f,c];
}
var gsMsgNoSubject="\u8BF7\u586B\u5199\u90AE\u4EF6\u4E3B\u9898",gsMsgNoMail="\u672A\u9009\u4E2D\u4EFB\u4F55\u90AE\u4EF6",gsMsgSend="\u90AE\u4EF6\u6B63\u5728\u53D1\u9001\u4E2D... ",gsMsgSave="&nbsp;&nbsp;&nbsp;\u90AE\u4EF6\u6B63\u5728\u4FDD\u5B58\u5230\u8349\u7A3F\u7BB1...",gsMsgSaveOk="\u90AE\u4EF6\u6210\u529F\u4FDD\u5B58\u5230\u8349\u7A3F\u7BB1",gsMsgAutoSave="&nbsp;&nbsp;&nbsp;\u90AE\u4EF6\u6B63\u5728\u4FDD\u5B58\u5230\u8349\u7A3F\u7BB1...",gsMsgAutoSaveOk="\u90AE\u4EF6\u81EA\u52A8\u4FDD\u5B58\u5230\u8349\u7A3F\u7BB1",gsMsgSendErrorSaveOK="\u4FE1\u4EF6\u5DF2\u88AB\u4FDD\u5B58\u5230\u8349\u7A3F\u7BB1",gsMsgSaveErr="\u90AE\u4EF6\u672A\u80FD\u4FDD\u5B58\u5230\u8349\u7A3F\u7BB1",gsMsgNoSender="\u8BF7\u586B\u5199\u6536\u4EF6\u4EBA\u540E\u518D\u53D1\u9001",gsMsgNoCardSender="\u8BF7\u586B\u5199\u6536\u4EF6\u4EBA\u540E\u518D\u53D1\u9001",gsMsgNoCard="\u8BF7\u9009\u4E2D\u8D3A\u5361\u540E\u518D\u53D1\u9001",gsMsgSettingOk="\u8BBE\u7F6E\u4FDD\u5B58\u6210\u529F",gsMsgLinkErr="\u7F51\u7EDC\u5E94\u7B54\u5931\u8D25",gsMsgCheatAlert="\u7CFB\u7EDF\u4F1A\u5C06\u6B64\u90AE\u4EF6\u79FB\u5165\u5230\u201C\u5783\u573E\u90AE\u4EF6\u201D\u4E2D\uFF0C\u5E76\u628A\u90AE\u4EF6\u5185\u5BB9\u63D0\u4EA4\u7ED9\u90AE\u7BB1\u7BA1\u7406\u5458\u3002\n\n\u60A8\u786E\u5B9A\u8981\u4E3E\u62A5\u6B64\u90AE\u4EF6\u5417\uFF1F",gsMsgSendTimeErr="\u60A8\u8BBE\u7F6E\u7684\u53D1\u9001\u65F6\u95F4\u4E0D\u5B58\u5728",gsMsgMoveMailSameFldErr="\u4E0D\u80FD\u79FB\u52A8\u5230\u76F8\u540C\u7684\u76EE\u5F55";
function doPageError(b,c,a)
{
var d=arguments.callee.caller,f=d&&d.caller,e=f&&f.caller,m=(d||"null").toString(),l=(f||"").toString(),k=(e||"").toString(),n;
try{
if(b.indexOf(" Script ")!=-1)
{
return;
}
if(b.indexOf("flashUploader")!=-1)
{
var j=qmFlash.getFlashVer();
for(var o in j)
{
b+="|"+j[o];
}
}
if(!(c&&c.indexOf("/cgi-bin/mail_list?")!=-1&&a==2)&&location.getParams)
{
var h=location.getParams(c);
_oCgiPart=c.split("?")[0].split("/"),_sErrFunc=encodeURIComponent(m.replace(/[\r\n\t ]/ig,"").substr(0,50));
if(_oCgiPart.length>0)
{
h.cgi=_oCgiPart.pop();
getTop().ossLog("delay","sample",["stat=js_run_err&msg=",b,"&line=",a,"&url=",T('$cgi$?t=$t$&s=$s$').replace(h),"&func=",_sErrFunc,(gbIsIE?"":"_NIE")].join(""));
}
else{
n=_sErrFunc;
}
}
getTop().debug(["error:",b,"<br><b>line</b>:",a,"<br><b>url</b>:",c,"<br><b>function</b>:",m.substr(0,100),l?"<br><b>parent function</b>:"+l.substr(0,100):"",k?"<br><b>parent parent function</b>:"+k.substr(0,100):""].join(""),"error");
}
catch(g)
{
n=g.message;
}
return location.host.indexOf("dev.")!=0;
}
var QMFileType={};
QMFileType.data={doc:"doc",docx:"doc",xls:"exl",xlsx:"exl",ppt:"ppt",pptx:"ppt",pdf:"pdf",txt:"txt",log:"txt",xml:"txt",js:"txt",css:"txt",php:"txt",asp:"txt",aspx:"txt",jsp:"txt",vbs:"txt",h:"txt",cpp:"txt",eml:"eml",rar:"rar",zip:"rar","7z":"rar",arj:"rar",wav:"mov",mp3:"mov",wma:"mov",mid:"mov",rmi:"mov",ra:"mov",ram:"mov",mp1:"mov",mp2:"mov",mp4:"mov",rm:"mov",rmvb:"mov",avi:"mov",mov:"mov",qt:"mov",mpg:"mov",mpeg:"mov",mpeg4:"mov",dat:"mov",asf:"mov",wmv:"mov","3gp":"mov",ac3:"mov",asf:"mov",divx:"mov",mkv:"mov",ogg:"mov",pmp:"mov",ts:"mov",vob:"mov",xvid:"mov",htm:"html",html:"html",mht:"html",swf:"swf",flv:"swf",bmp:"bmp",gif:"gif",jpg:"jpg",jpeg:"jpg",jpe:"jpg",psd:"psd",pdd:"psd",eps:"psd",tif:"tu",tiff:"tu",ico:"tu",png:"tu",pic:"tu",ai:"tu"};
QMFileType.getFileType=function(a){
return this.data[(trim(a||"")).toLowerCase()]||"qita";
};
QMFileType.getFileTypeForFile=function(a){
return this.getFileType((a||"").split(".").pop());
};
var QMHistory={_moParam:{},_moCaches:{}};
QMHistory.getId=function(a){
return a;
};
QMHistory.getUrl=function(a){
var b=getTop().QMHistory._moCaches[QMHistory.getId(a)];
return b&&b._sUrl;
};
QMHistory.getLastRecordId=function(){
return getTop().QMHistory._moParam._sLastUrlRecordId;
};
QMHistory.tryBackTo=function(a){
try{
var h=getTop().QMHistory._moParam,j=QMHistory.getId(a),g=getTop().QMHistory._moCaches[j],i=g&&g._sUrl,b=g&&g._nHistoryLen>=getTop().history.length,c=g&&h._sPreMainWinUrl==i,d=g&&!h._bIsActionFrameUrlChange;
function e()
{
var k=i.split("#")[0];
if(getTop().location.getParams&&getTop().location.getParams(k)["folderid"]==4)
{
return goUrlMainFrm(k);
}
if(gbIsIE&&gnIEVer==6)
{
return getTop().history.go(k);
}
getTop().history.back();
}
;if((gbIsIE&&(b||c)&&d)||(!gbIsWebKit&&b&&c&&d))
{
e();
return true;
}
}
catch(f)
{
}
return false;
};
QMHistory.recordCurrentUrl=function(a){
var h=a.location.href,b=getTop().QMHistory._moCaches,c=getTop().QMHistory._moParam;
var g=c._sPreMainWinUrl=c._sCurMainWinUrl,e=c._sCurMainWinUrl=h;
var f,d;
for(var j in b)
{
if(b[j]._sUrl==g)
{
f=j;
}
if(b[j]._sUrl==e)
{
d=j;
}
}
if(f&&d)
{
delete b[f];
}
if(h.indexOf("/mail_list")!=-1)
{
this._recordInfo("mail_list",h);
}
if(h.indexOf("t=readmail")!=-1)
{
this._recordInfo("readmail",h);
}
if(h.indexOf("/today")!=-1)
{
this._recordInfo("today",h);
}
};
QMHistory.recordActionFrameChange=function(a){
getTop().QMHistory._moParam._bIsActionFrameUrlChange=a!="clear";
};
QMHistory._recordInfo=function(a,b){
var e=getTop(),f=QMHistory.getId(a),d=e.QMHistory._moCaches,c=d[f];
if(!c)
{
c=d[f]=new e.Object();
}
c._nHistoryLen=history.length+1;
c._sUrl=b;
e.QMHistory._moParam._sLastUrlRecordId=a;
};
function QMCache(a)
{
var c=this._mnTimeStamp=a.timeStamp||1;
var e=this._msAppName=a.appName;
if(!c||!e)
{
throw {message:"QMCache construct : config error!"};
}
var d=getTop().QMCache._moCacheSet;
if(!d)
{
d=getTop().QMCache._moCacheSet={};
}
var b=d[e];
if(!b)
{
b=d[e]={_curTimeStamp:"0",_data:{}};
}
if(this._compareTimeStamp(b._curTimeStamp,c)==1)
{
b._curTimeStamp=c;
}
}
;QMCache.prototype.isHistoryTimeStamp=function(){
return this._compareTimeStamp(getTop().QMCache._moCacheSet[this._msAppName]._curTimeStamp,this._mnTimeStamp)!=0;
};
QMCache.prototype.setData=function(a,b){
getTop().QMCache._moCacheSet[this._msAppName][a]=b;
};
QMCache.prototype.getAll=function(a){
return getTop().QMCache._moCacheSet[this._msAppName];
};
QMCache.prototype.getData=function(a){
return getTop().QMCache._moCacheSet[this._msAppName][a];
};
QMCache.prototype.delData=function(a){
delete getTop().QMCache._moCacheSet[this._msAppName][a];
};
QMCache.prototype._compareTimeStamp=function(a,b){
if(a==b)
{
return 0;
}
return a>b?-1:1;
};
var QMMailCache={_mId:now()};
QMMailCache.newCache=function(b,a){
var c=false,d=getTop();
if(!d.gMailListStamp||d.gMailListStamp<a)
{
d.gMailListStamp=a;
if(!d.goMailListMap)
{
d.goMailListMap=new d.Object();
}
c=true;
}
else if(d.gnExpireTimeStamp>=a)
{
reloadFrm(b);
}
return b["isNewQMMailCache"+this._mId]=c;
};
QMMailCache.setExpire=function(){
getTop().gnExpireTimeStamp=getTop().gMailListStamp;
};
QMMailCache.addData=function(b,a){
if(!b||!getTop().goMailListMap)
{
return;
}
if(!this.hasData(b))
{
getTop().goMailListMap[b]={oTagIds:{},star:null,reply:null};
}
if(!a)
{
return;
}
var c=getTop().goMailListMap[b];
for(var d in a)
{
switch(d)
{case "removeTagId":
c.oTagIds[a[d]]=0;
break;
case "addTagId":
c.oTagIds[a[d]]=1;
break;
default:
if(typeof a[d]!="undefined")
{
c[d]=a[d];
}
break;
}
}
};
QMMailCache.delData=function(a){
if(getTop().goMailListMap)
{
delete getTop().goMailListMap[a];
}
};
QMMailCache.hasData=function(a){
return getTop().goMailListMap&&getTop().goMailListMap[a]!=null;
};
QMMailCache.getData=function(a){
return getTop().goMailListMap&&getTop().goMailListMap[a];
};
QMMailCache.addVar=function(b,a){
return getMainWin()[b]=this.getVar(b,0)+a;
};
QMMailCache.getVar=function(b,a){
return getMainWin()[b]||a;
};
QMMailCache.isRefresh=function(a){
return a["isNewQMMailCache"+this._mId];
};
function rdVer(c,a,b)
{
var f,h,g,d,i=new QMCache({appName:"readmail"});
if(a==-1)
{
return i.delData(c);
}
f=i.getData("on");
if(c=="on")
{
return a==0?(f||0):(i.setData("on",a));
}
if(!f||!c)
{
return 0;
}
d=c=="BaseVer";
g=i.getData("BaseVer");
if(!g||(d&&a==1))
{
g=g||(rdVer("on",0)+Math.random().toFixed(2));
g+=10;
i.setData("BaseVer",g);
}
if(d)
{
return g;
}
h=(i.getData(c)||0);
var e=(!h||a==1);
if(e||b)
{
if(e)
{
h+=10000;
}
if(b)
{
h=Math.floor(h/10000)*10000+parseInt(b,10)%10000;
}
i.setData(c,h);
}
return h;
}
rdVer.batch=function(a){
var b=new QMCache({appName:"readmail"}),d=new RegExp("^"+a),c=b.getAll();
E(c,function(f,e){
if(d.test(e))
{
rdVer(e,1);
}
});
};
rdVer.check=function(b,c,a){
if(b)
{
var e=b.location,c=c||e.getParams()["mailid"],a=a||e.getParams()["ver"]||0,d=rdVer(c,0);
if(d>a)
{
goUrl(b,cookQueryString(e.href,{ver:d}),true);
return true;
}
else{
return false;
}
}
};
rdVer.log=function(a,b){
var f=new QMCache({appName:"preload"}),d=new Date().getTime(),e=f.getData(a),c=e&&(d-e)<rdVer.maxage(a)*1000;
switch(b)
{case "pre":
if(!c)
{
f.setData(a,d);
ossLog("delay","all","stat=rdcache&type=281&locval=,rdcache,preload,1");
}
break;
case "hit":
if(c)
{
ossLog("delay","all","stat=rdcache&type=291&locval=,rdcache,hit,1");
}
if(e)
{
f.delData(a);
}
break;
}return c;
};
rdVer.isPre=function(a){
return !(a>2&&a<7||a==9);
};
rdVer.preRD=function(b,a){
var c=function(){
preLoad("html","/cgi-bin/readmail?",b,function(d){
rdVer.log(location.getParams(d)["mailid"],"pre");
});
};
if(b&&b.length>0)
{
a=a||40;
b=b.slice(0,rdVer("on",0)>1?2:1);
if(b.length>0)
{
if(a)
{
setTimeout(c,a);
}
else{
c();
}
}
}
};
rdVer.maxage=function(a){
if(!a)
{
return 0;
}
return (a[0]=="@"||a[0]=="C"?10:60)*60;
};
rdVer.url=function(h,g,i,e,b,d,a,f,c){
var m=T('/cgi-bin/$cgi$?folderid=$folderid$$s$&t=$t$&mailid=$mailid$$cache$&sid=$sid$'),j,p,o,q,n="readmail";
var k=parseInt(g);
if(a)
{
p="readmail&s=draft";
}
else if(e===0)
{
p=f==100?"compose_card&s=draft":"compose&s=draft";
}
else if(g=="9")
{
p="sms_list_v2";
n="readtemplate";
}
else if(g=="11")
{
n="bottle_panel";
p="bottle";
}
else if(k>200900&&k<205012)
{
n='archive_readmail';
p="archive_readmail";
}
else{
switch(h.charAt(0))
{case 'C':
p="readmail_conversation";
break;
case '@':
p="readmail_group";
break;
default:
p="readmail";
break;
}j=true;
}
if(b)
{
o=["&newwin=true","&compose_new=compose"][e?0:1];
}
else{
o=["","&s=from_unread_list","&s=from_star_list"][d!=1&&d!=2?0:d];
}
var l=j?rdVer(h,0,i):0;
if(!l&&c)
{
return "";
}
q=m.replace({cgi:n,mailid:h,folderid:g,t:p,s:o,sid:getSid(),cache:l?T("&mode=pre&maxage=$maxage$&base=$base$&ver=$ver$").replace({maxage:rdVer.maxage(h),base:rdVer("BaseVer",0),ver:l}):""});
return c?q.split("?")[1]:q;
};
function setGlobalVarValue(b,c,a)
{
var d=getTop();
if(!d.goDataBase)
{
d.goDataBase=new d.Object();
}
if(b&&!a)
{
d.goDataBase[b]=c;
getTop().getSignatureData()[b]=c;
}
return c;
}
function getGlobalVarValue(a)
{
return getTop().goDataBase&&getTop().goDataBase[a]||getTop().getSignatureData()[a];
}
function hideWindowsElement(b,a)
{
a=a||getMainWin();
if(!gbIsIE||gnIEVer>6||(a.gbIsHasHideElements||false)!=(b||false))
{
return;
}
getTop().setGlobalVarValue("WINDOWS_ELEMENT_NOT_DISPLAY",b?"":"true");
a.gbIsHasHideElements=!b;
var c=a.document.body;
E(a.QMReadMail?["select","object","embed"]:["select"],function(d){
E(GelTags(d,c),function(e){
if(b)
{
e.style.visibility=e.getAttribute("savevisibility");
}
else{
e.setAttribute("savevisibility",getStyle(e,"visibility"));
e.style.visibility="hidden";
}
});
});
}
function controlWindowsElement()
{
var a=getTop().getGlobalVarValue("WINDOWS_ELEMENT_NOT_DISPLAY");
if(a=="true")
{
hideWindowsElement(false);
}
}
function setKeepAlive(a)
{
if(getTop().gKeepAliveNum==null)
{
getTop().gKeepAliveNum=0;
}
if(a==null||a.gbIsSetKeepAlive==true)
{
return;
}
a.gbIsSetKeepAlive=true;
getTop().gKeepAliveNum++;
if(getTop().gKeepAliveTimer==null)
{
getTop().gKeepAliveTimer=getTop().setInterval(function(){
getTop().runUrlWithSid("/cgi-bin/readtemplate?t=keep_alive");
},15*60*1000);
}
addEvent(a,"unload",function(){
a.gbIsSetKeepAlive=false;
getTop().gKeepAliveNum--;
if(getTop().gKeepAliveNum==0)
{
getTop().clearInterval(getTop().gKeepAliveTimer);
getTop().gKeepAliveTimer=null;
}
});
}
function encodeNick(a)
{
return a&&a.replace(/\\/g,"\\\\").replace(/\"/ig,"\\\"").replace(/\'/ig,"\\\'")||"";
}
function decodeNick(a)
{
return a&&a.replace(/\\\"/ig,"\"").replace(/\\\\/ig,"\\")||"";
}
var QMPageInit={_debugCreater:function(a){
return function(){
var e=getTop();
var b=arguments.length;
if(e.Console)
{
if(b==0)
{
if(location.host=="dev.exmail.qq.com")
{
}
}
else{
try{
if(e.console)
{
e.console.log&&e.console.log(arguments[0]);
}
var c=e.Console[a];
c.add.apply(c,arguments);
}
catch(d)
{
}
}
}
};
},_traceCreater:function(a){
return function(e,c,d,f,b){
if(getTop().QMTimeTracer&&(!b||b==getTop().g_uin))
{
getTop().QMTimeTracer.getTracer().trace(e,c,a,d,f);
}
};
},_initLocation:function(a){
var b=a.location;
b._bIsAnalyse=false;
b.params={};
b.getParams=function(e){
if(!e&&this._bIsAnalyse)
{
return this.params;
}
var f={},g=e?e.substr(e.indexOf("?")+1).split("#")[0]:this.search.substr(1);
if(g)
{
E(g.split("&"),function(h){
var i=h.split("=");
f[i.shift()]=unescape(i.join("="));
});
}
if(!e)
{
this.params=f;
this._bIsAnalyse=true;
}
return f;
};
var d=b.href,c=getTop();
if(a==c&&getSid()&&d.indexOf("/cgi-bin/")>-1&&d.indexOf("/frame_html?")==-1&&d.indexOf("/log")==-1&&(d.indexOf("/ftnExs_")==-1||d.indexOf("/ftnExs_files")>-1)&&!a.gbIsNoCheck&&b.getParams()["nocheckframe"]!="true")
{
if(top.location.href.indexOf("/cgi-bin/bizmail?")==-1)
{
goNewWin(b,true,!a.gbSupportNW);
}
}
else if(a!=c&&c.bnewwin&&a==getMainWin())
{
if(!a.gbSupportNW)
{
goNewWin(b,true,true);
}
else if(b.getParams()["newwin"]!="true")
{
a.location.replace(d+"&newwin=true");
}
}
},_initPageKeyDown:function(b,a){
var n=b.srcElement||b.target,d=b.ctrlKey,h=b.altKey,f=b.shiftKey,j=b.keyCode,i=n.type=="text"||n.tagName=="TEXTAREA",e=a&&(n.tagName=="INPUT"&&n.type!="button"),c=n.tagName=="BUTTON"||n.type=="button";
switch(j)
{case 8:
if(!i&&goBackHistory())
{
preventDefault(b);
}
break;
case 13:
if(!c&&((!i&&QMReadedItem.read(n))||e))
{
preventDefault(b);
}
break;
case 37:
case 39:
if(d)
{
goPrevOrNextMail(j==39);
preventDefault(b);
}
break;
case 38:
case 40:
case 188:
case 190:
if(!i)
{
var g=j==38||j==188;
if(QMReadedItem.move(!g))
{
preventDefault(b);
}
}
break;
case 46:
if(!i)
{
var k=S(f?"quick_completelydel":"quick_del",getMainWin()),l=f?S("quick_del",getMainWin()):null,m=S("del",getMainWin());
if(isShow(k)||isShow(l)||isShow(m))
{
preventDefault(b);
fireMouseEvent((k||l||m),"click");
}
}
break;
case 88:
if(!i&&QMReadedItem.check(f))
{
preventDefault(b);
}
break;
}
},_initDebug:function(a){
a.Debug=a.debug=this._debugCreater("debug");
a.Log=a.log=this._debugCreater("log");
a.Watch=a.watch=this._debugCreater("watch");
a.Trace=a.trace=this._traceCreater(a);
a.onerror=doPageError;
},_initMainWinEvent:function(a){
if(a!=getTop()&&a==getMainWin())
{
getTop().QMHistory.recordCurrentUrl(a);
getTop().QMHistory.recordActionFrameChange("clear");
var d=a.location.href,c=d.indexOf("t=sms_list_v2")>0,b=d.indexOf("t=bottle")>0;
addEvent(a,"unload",function(){
showProcess(0);
if(isshowMsg()&&getTop().gMsgDispTime&&now()-getTop().gMsgDispTime>2000)
{
hiddenMsg();
}
c&&startWebpush(2);
});
c&&closeWebpush(2);
b&&closeWebpush(4);
getTop().QMWebpushTip&&getTop().QMWebpushTip.hideAll(3000);
a.setTimeout(function(){
},200);
}
},_initTopWinEvent:function(a){
if(a==getTop()&&a.location.href.indexOf("/frame_html")!=-1)
{
var b=function(){
var d;
if(getMainWin()!=a&&getUserCookie("reloadurl")!="noreload"&&!getMainWin().gbIsNoCheck)
{
try{
var c=getMainWin().location;
d=c.getParams()["sid"]&&(c.pathname+_trimUrlSearchParam(c.search));
}
catch(f)
{
}
}
setUserCookie("reloadurl",d||"",new Date(now()+5*1000));
};
addEvents(a,{load:function(i){
var g=getTop().document.body;
function d(e)
{
var k=e.srcElement||e.target;
for(var j=0;k&&j<3;k=k.parentNode,j++)
{
if(k.tagName=="A")
{
break;
}
}
return k||{};
}
;function h(e)
{
if((e.target||e.srcElement)==g)
{
preventDefault(e);
}
}
function f(e)
{
var k=d(e);
if(k.tagName=="A")
{
if(k.getAttribute("initlized")=="nocheck")
{
return true;
}
if(k.getAttribute("initlized")!="true")
{
k.setAttribute("initlized","true");
var j=k.onclick;
k.onclick=function(l){
var t=l||getTop().event,s=parseInt(k.getAttribute("md"));
if(!isNaN(s)&&s>0)
{
getTop().clearTimeout(s);
k.setAttribute("md","0");
var r=t.shiftKey,m=t.ctrlKey,p=t.metaKey,q=r||m||p||k.target=='_blank',w=k.getAttribute("nocheck"),v=trim(k.href),o=!(v==""||v.indexOf("javascript:")==0),n=trim(k.href).indexOf("http")==0;
function u()
{
if(j)
{
j.call(k);
preventDefault(t);
}
if(n)
{
if(r&&k.href.indexOf("java")!=0)
{
open(k.href);
preventDefault(t);
}
else{
switch(k.target)
{case "mainFrame":
var y=k.href;
goUrlMainFrm(y+(y.indexOf("?")!=-1?"#stattime="+now():""),false);
preventDefault(t);
break;
case "_parent":
case "_self":
try{
a.location.href=k.href;
}
catch(x)
{
}
preventDefault(t);
break;
default:
break;
}
}
}
}
;if(w=="false"||(!q&&w!="true"&&(o&&k.target!="_blank")))
{
preventDefault(t);
QMPageInit._runFuncAfterCheckMainFrame(u);
}
else{
u();
}
}
};
}
k.setAttribute("md",getTop().setTimeout(function(){
k.setAttribute("md","0");
},1000));
}
}
function c(e)
{
var j=d(e);
if(j.tagName=="A"&&j.getAttribute("initlized")!="true")
{
preventDefault(e);
}
}
addEvents(g,{mousewheel:h,mousedown:f,keydown:f,click:c});
},beforeunload:b,unload:b});
}
},_detectMouseT:function(c,b){
var g,a=["u","1","2","3"],f=getEventTarget(b),d=function(e){
if(e&&e.getAttribute)
{
var j=e.getAttribute("t");
for(var k in a)
{
if(a[k]==j)
{
return j;
}
}
}
};
g=d(f);
try{
while(f&&f!=c.document.body&&g)
{
if(g=="u")
{
f=f.parentNode;
g=d(f)||g;
}
else{
return f;
}
}
}
catch(h)
{
}
return null;
},_initPageMouse:function(c,b,a){
var d=this._detectMouseT(b,a);
if(d)
{
var e=d.getAttribute("t");
switch(e)
{case "1":
case "2":
case "3":
waitFor(function(){
return getTop().QMProfileTips;
},function(f){
if(f)
{
getTop().QMProfileTips.doMouseEvent(c,b,d);
}
});
break;
}
}
},_initPageEventDelay:function(a){
var b=this;
a.setTimeout(function(){
var c=(a.location.getParams&&a.location.getParams()["t"]||"").indexOf("compose")==0;
addEvents(a.document,{mousedown:OprMouseDown,touchend:getTop().iPadCloseMenu||function(){
},keydown:function(d){
b._initPageKeyDown(d,c);
},click:function(d){
getTop().QMWebpushTip&&getTop().QMWebpushTip.hideAll(3000);
preventDefault2(d);
},mouseover:function(d){
b._initPageMouse("over",a,d);
},mouseout:function(d){
b._initPageMouse("out",a,d);
}});
},100);
},_initlize:function(a){
a=a||window;
if(a.gIsInitPageEventProcess)
{
return;
}
a.gIsInitPageEventProcess=true;
var b=0;
try{
b=1;
this._initDebug(a);
b=2;
this._initLocation(a);
b=3;
this._initMainWinEvent(a);
b=4;
this._initTopWinEvent(a);
b=5;
this._initPageEventDelay(a);
getTop().gbIsMac&&a.document.documentElement&&(a.document.documentElement.className+=" MacOS");
}
catch(c)
{
doPageError(c.message,a.location.href,"initPageEvent_processid:"+b);
}
try{
a.document.execCommand("BackgroundImageCache",false,true);
}
catch(c)
{
}
},_runFuncAfterCheckMainFrame:function(a){
try{
if(getMainWin().exitConfirm)
{
return getMainWin().exitConfirm(a);
}
}
catch(b)
{
debug(b.message);
}
a();
}};
function initPageEvent(a)
{
QMPageInit._initlize(a);
}
(function(){
initPageEvent(window);
})();
function getTopWin()
{
return getTop();
}
function getMainWin()
{
return F("mainFrame",getTop())||getTop();
}
function getActionWin()
{
return F("actionFrame",getTopWin());
}
function getLeftWin()
{
return getTop();
}
var GetLeftWin=getLeftWin;
function getLeftDateWin()
{
return F("leftFrame",getTop());
}
function getSignatureWin()
{
return F("signatureFrame",getTop());
}
function getSignatureData()
{
return getTop().goUserInfo._oData;
}
function reloadFrm(a)
{
if(a)
{
try{
if(a.location.search)
{
var c=a.location.href.split("#")[0].split("?"),d="r="+now();
c[1]=!c[1]?d:(("&"+c[1]+"&").replace(/&r=.*?&/,"&")+d).slice(1);
a.location.replace(c.join("?"));
return true;
}
}
catch(b)
{
}
}
return false;
}
function reloadLeftWin()
{
var a;
if(!reloadFrm(getLeftDateWin())&&(a=S("leftFrame",getTop())))
{
a.src=T('/cgi-bin/folderlist?sid=$sid$&r=$rand$').replace({sid:getSid(),rand:Math.random()});
}
}
function reloadAllFrm(d,c,a,b)
{
function e(f)
{
var g=arguments.callee;
getTop().setTimeout(f,g._time);
g._time+=200;
}
e._time=0;
if(b==null||b)
{
e(function(){
reloadFrm(getMainWin());
});
}
if(a==null||a)
{
e(function(){
reloadFrm(reloadLeftWin());
});
}
}
function reloadFrmLeftMain(a,b)
{
reloadAllFrm(false,false,a,b);
}
function _unReloadUrl()
{
setUserCookie("reloadurl","noreload",new Date(now()+5*1000));
}
function goUrlTopWin(b,a)
{
_unReloadUrl();
goUrl(getTop(),b,!a);
}
function goUrlMainFrm(c,b,a)
{
if(b!=false)
{
reloadLeftWin();
setTimeout(function(){
goUrl(S("mainFrame",getTop())||getTop(),c,!a);
},300);
}
else{
goUrl(S("mainFrame",getTop())||getTop(),c,!a);
}
}
function _trimUrlSearchParam(a)
{
return a&&a.substr&&("?"+(["&",a.substr(1),"&"].join("").replace(/&sid=.*?&/ig,"&").replace(/&loc=.*?&/ig,"&").replace(/&newwin=true/ig,"&").slice(1,-1)));
}
function goNewWin(d,b,a,c)
{
var f="",h="",i="";
if(typeof (d)=="object")
{
f=d.pathname;
h=d.search;
}
else{
var e=d.indexOf("?");
f=d.substring(0,e);
h=d.substr(e);
}
if(c)
{
i=c.frametmpl;
}
else{
i=a?"frame_html":"newwin_frame";
}
var g='';
if(f.indexOf('reader_')>-1)
{
g=getTop().location.protocol+"//mail.qq.com";
}
if(getTop().gsDistributeDomain)
{
g=getTop().location.protocol+"//exmail.qq.com";
}
var j=T(g+'/cgi-bin/frame_html?t=$t$&sid=$sid$&url=$url$').replace({t:i,sid:getSid(),url:encodeURIComponent(f+_trimUrlSearchParam(h))});
if(c)
{
j+=c.frametmplparam;
}
if(b)
{
goUrlTopWin(j,true);
}
else{
_unReloadUrl();
window.open(j);
}
}
function isMaximizeMainFrame()
{
return getTop().maximizeMainFrame._bIsMaximizeMainFrame;
}
function maximizeMainFrame(a)
{
var f=S("mainFrame",getTop()),e=S("leftPanel",getTop()),d=S("imgLine",getTop());
if(!f||!d||!e||a!=2&&(a==0)==!isMaximizeMainFrame())
{
return false;
}
var c=getTop().maximizeMainFrame,b=c._bIsMaximizeMainFrame=a==2?!isMaximizeMainFrame():(a?true:false);
if(b)
{
c._sBackupMarginLeft=e.style.width;
c._sImgParentCssText=d.parentNode.style.cssText;
}
f.parentNode.style.marginLeft=b?"5px":c._sBackupMarginLeft;
e.parentNode.style.cssText=b?"border-left:none;":"";
d.parentNode.style.cssText=(b?"border-left:none;margin-left:0;padding:0;":"")+c._sImgParentCssText;
show(e,!b);
show(d,!b);
show(S("folder",getTop()),!b);
}
function filteSignatureTag(b,a)
{
var c=typeof b=="string"?b:"";
if(a=="2LOWCASE")
{
return c.replace(/<sign(.*?)\/>/ig,"<sign$1>").replace(/<qzone(.*?)\/>/ig,"<qzone$1>").replace(/<taotao(.*?)\/>/ig,"<taotao$1>").replace(/<\/sign>/ig,"</sign>").replace(/<\/qzone>/ig,"</qzone>").replace(/<\/taotao>/ig,"</taotao>").replace(/<(\/?)includetail>/ig,"<$1tincludetail>");
}
if(a=="FILTE<:")
{
return c.replace(/<:sign.*?>/ig,"").replace(/<:qzone.*?>/ig,"").replace(/<:taotao.*?>/ig,"").replace(/<:includetail.*?>/ig,"");
}
else{
return c.replace(/<\/?sign.*?>/ig,"").replace(/<\/?qzone.*?>/ig,"").replace(/<\/?taotao.*?>/ig,"").replace(/<\/?includetail.*?>/ig,"");
}
}
function getSignatureHeader()
{
var a=((arguments[0]&&arguments[0]==1)?true:false);
return T(['<div style="color:#909090;font-family:Arial Narrow;font-size:12px">','<br />','<br />','<br />','<br />',(a?'':'------------------'),'</div>']);
}
window.g_sBaseImageUrl=getTop().getPath("stationery");
if(!getTop().goUserInfo)
{
getTop().goUserInfo={_sStatus:'init',_fCallbacks:{},_oData:{},_doCallback:function(){
for(var d in getTop().goUserInfo._fCallbacks)
{
for(var b=0,c=getTop().goUserInfo._fCallbacks[d].length;b<c;b++)
{
try{
getTop().goUserInfo._fCallbacks[d][b](getTop().goUserInfo.get(d));
}
catch(a)
{
}
}
}
getTop().goUserInfo._fCallbacks={};
},get:function(a){
if(getTop().goUserInfo._sStatus=='init')
{
getTop().goUserInfo.reset();
return '';
}
else{
if(typeof getTop().goUserInfo._oData[a]==='undefined')
{
return '';
}
return getTop().goUserInfo._oData[a];
}
},deferget:function(b,a){
if(getTop().goUserInfo._sStatus=='init')
{
if(typeof getTop().goUserInfo._fCallbacks[b]==='undefined')
{
getTop().goUserInfo._fCallbacks[b]=[];
}
getTop().goUserInfo._fCallbacks[b].push(a);
getTop().goUserInfo.reset();
}
else{
a(getTop().goUserInfo._oData[b]);
}
},set:function(a){
extend(getTop().goUserInfo._oData,a);
},reset:function(){
if(getTop().goUserInfo._sStatus=='loading')
{
return;
}
getTop().goUserInfo._sStatus='loading';
var a=T(["/cgi-bin/getcomposedata?t=signature&fun=compose&sid=$sid$&qzonesign=$qzonesign$&r=$rand$"]).replace({sid:getSid(),qzonesign:"",rand:now()});
QMAjax.send(a,{method:"GET",timeout:10000,headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},onload:function(b,c){
var d=trim2(c);
if(b&&d.indexOf("(")==0)
{
getTop().goUserInfo._sStatus='ready';
getTop().goUserInfo.set((function(){
return (new Function("return "+d))();
})());
directChangeSkin();
}
else{
getTop().goUserInfo._sStatus='init';
}
getTop().goUserInfo._doCallback();
}});
}};
}
function checkSignatureFrame()
{
if(getTop().gLoadSignTimeout)
{
getTop().clearTimeout(getTop().gLoadSignTimeout);
getTop().gLoadSignTimeout=null;
}
if(getSignatureData())
{
getTop().gSignStatus="finish";
var a=true;
try{
if(!getSignatureData().RealUserSignature)
{
a=false;
}
}
catch(b)
{
a=false;
}
if(!a&&getTop().reloadSignTimeout==null)
{
getTop().gReloadSignTimeout=getTop().setTimeout("getTop().reloadSignature( true );",5000);
}
else if(a)
{
directChangeSkin();
}
}
}
function loadSignature()
{
try{
if(getTop().goUserInfo._sStatus!='ready')
{
getTop().goUserInfo.reset();
}
}
catch(a)
{
return;
}
}
function reloadSignature(a)
{
getTop().goUserInfo.reset();
}
function getSignature(a,b)
{
try{
return getSignatureData().getRealUserSignature(a,b);
}
catch(c)
{
loadSignature();
return "";
}
}
function getDetaultStationery(a)
{
if(getTop().goUserInfo._sStatus=='ready')
{
return a=="Header"?getSignatureData().RealUserDefaultStationeryHeader:getSignatureData().RealUserDefaultStationeryBottom;
}
else{
loadSignature();
return "";
}
}
function getDefaultEditor()
{
if(getTop().goUserInfo._sStatus=='ready')
{
return getSignatureData().RealDefaultEditor;
}
else{
loadSignature();
return undefined;
}
}
function getUserNick()
{
if(getTop().goUserInfo._sStatus=='ready')
{
return getSignatureData().RealUserNick;
}
else{
loadSignature();
return 0;
}
}
function getDefaultSaveSendbox()
{
if(getTop().goUserInfo._sStatus=='ready')
{
return getSignatureData().RealDefaultSaveSendbox;
}
else{
loadSignature();
return 0;
}
}
function getUserAlias()
{
if(getTop().goUserInfo._sStatus=='ready')
{
return getSignatureData().RealUserAlias;
}
else{
loadSignature();
return "";
}
}
function getDefalutAllMail()
{
if(getTop().goUserInfo._sStatus=='ready')
{
return getSignatureData().RealDefaultAllMail;
}
else{
loadSignature();
return [];
}
}
function getOpenSpellCheck()
{
return true;
}
function getDefaultSender()
{
if(getTop().goUserInfo._sStatus=='ready')
{
return getSignatureData().RealDefaulSender;
}
else{
loadSignature();
return "";
}
}
function setDefaultSender(a)
{
var b=getTop().getGlobalVarValue("DEF_MAIL_FROM");
var c=getTop().getGlobalVarValue("DOMAIN_MAIL_LOGO_URL");
c&&c[b]&&(c[a]=c[b]);
getTop().setGlobalVarValue("DEF_MAIL_FROM",a);
}
function getAllSignature()
{
if(getTop().goUserInfo._sStatus=='ready')
{
return getSignatureData().RealAllSignature;
}
else{
loadSignature();
return {};
}
}
function getUserSignatureId()
{
if(getTop().goUserInfo._sStatus=='ready')
{
return getSignatureData().RealUserSignatureId;
}
else{
loadSignature();
return "";
}
}
function getIsQQClub()
{
if(getTop().goUserInfo._sStatus=='ready')
{
return getSignatureData().RealIsQQClub;
}
else{
loadSignature();
return false;
}
}
function getBindAccount()
{
if(getTop().goUserInfo._sStatus=='ready')
{
return getSignatureData().RealBindAccount;
}
else{
loadSignature();
return false;
}
}
function getRecognizeNickName()
{
if(getTop().goUserInfo._sStatus=='ready')
{
return getSignatureData().RealRecognizeNickName;
}
else{
loadSignature();
return false;
}
}
function closeRecognizeNickName()
{
ossLog("realtime","all","stat=tips&type=know&tipid=66");
setGlobalVarValue("DEF_RECOGNIZENICKNAME",false);
}
function getUserInfoText(a)
{
var b=S("user"+a,getTopWin())||{};
return fixNonBreakSpace(b.innerText||b.textContent);
}
function getUserInfo(a)
{
return (S("user"+a,getTopWin())||{}).innerHTML||"";
}
function setUserInfo(a,b)
{
try{
S("user"+a,getTopWin()).innerHTML=htmlEncode(b);
return true;
}
catch(c)
{
return false;
}
}
function msgBox(e,f,a,b,d,c)
{
if(window!=getTop())
{
return getTop().msgBox(e,f,a,b,d,c);
}
var h=e;
if(!h)
{
var g=S("msg_txt",c||window)||S("msg_txt",getActionWin());
if(g&&(g.innerText||g.textContent)&&g.getAttribute("ok")!="true")
{
h=filteScript(g.innerHTML);
g.setAttribute("ok","true");
}
}
if(!h||!(h=trim(h.replace(/[\r\n]/ig,""))))
{
return;
}
hiddenMsg();
if(f=="dialog")
{
alertBox({msg:h,title:d||"\u786E\u8BA4"});
}
else if(f=="antiSpamRelease")
{
new Image().src='/cgi-bin/sellonlinestatic?type=session_statistics&businame=antiSpamWx&item=dialogShow&sid='+getSid()+'&r='+Math.random();
confirmBox({msg:h,title:d||"\u7CFB\u7EDF\u63D0\u793A",confirmBtnTxt:"\u9A8C\u8BC1",onload:function(){
var k=this,j=k.S("confirm"),i=k.S("cancel");
addEvent(j,"click",function(l){
getTop().showAntiSpamWxCheck();
new Image().src='/cgi-bin/sellonlinestatic?type=session_statistics&businame=antiSpamWx&item=verifyCK&sid='+getSid()+'&r='+Math.random();
});
addEvent(i,"click",function(l){
new Image().src='/cgi-bin/sellonlinestatic?type=session_statistics&businame=antiSpamWx&item=cancelCK&sid='+getSid()+'&r='+Math.random();
});
}});
}
else{
setClass(arguments.callee.createMessageBox().firstChild,f=="success"?"msg":"errmsg").innerHTML=h;
showMsg();
if(a)
{
getTop().gMsgBoxTimer=getTop().setInterval(getTop().hiddenMsg,b||5000);
}
getTop().gMsgDispTime=now();
}
}
;msgBox.createMessageBox=function(a){
var c=S("msgBoxDIV",getTop());
if(!c)
{
var b=typeof a=="undefined"?(getTop().bnewwin?0:43):a;
insertHTML(getTop().document.body,"afterBegin",T(['<div id="msgBoxDIV" style="position:absolute;width:100%;display:none;','padding-top:2px;height:24px;*height:24px;_height:20px;top:$top$px;text-align:center;">','<span></span>','</div>']).replace({top:b}));
c=S("msgBoxDIV",getTop());
}
return c;
};
function showAntiSpamWxCheck()
{
var a=arguments.callee;
QMAjax.send("/cgi-bin/setting_wxbind?action=send_check&t=data_mgr&ef=js&sid="+getSid(),{method:"GET",onload:function(b,c){
var d=evalValue(c);
if(b&&d&&d.retcode=="0")
{
if(d.data)
{
a.qrcodeHandle(a,d.data.wx_ticket,d.data.binded,d.data.scan_code);
}
}
else{
showError("\u7CFB\u7EDF\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5");
}
}});
}
showAntiSpamWxCheck.getWxticket=function(a,b){
QMAjax.send("/cgi-bin/setting_wxbind?action=send_check&t=data_mgr&ef=js&sid="+getSid(),{method:"GET",onload:function(c,d){
var e=evalValue(d);
if(c&&e&&e.retcode=="0")
{
if(e.data)
{
a.S('wx_qrcode').src='https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+e.data.wx_ticket;
a.S('scan_code').value=e.data.scan_code;
if(typeof b=="function")
{
b();
}
}
}
}});
};
showAntiSpamWxCheck.qrcodeHandle=function(e,h,f,g){
var a=true;
var c=0;
var b=false;
var d=new QMDialog({sid:"antiSpamWxCheckDlg",sTitle:"\u5FAE\u4FE1\u9A8C\u8BC1",sBodyHtml:T(['<div style="padding: 30px 20px;font-size: 14px;">','<div style="font-size:15px;margin-bottom: 20px;">','\u8BF7\u4F7F\u7528\u5FAE\u4FE1\u626B\u7801\u9A8C\u8BC1\u4EE5\u5B8C\u6210\u672C\u6B21\u53D1\u4FE1','</div>','<input type="hidden" value id="scan_code">','<div id="qr_con" width="260" height="260" style="padding-bottom: 20px;">','<img id="wx_qrcode" style="box-shadow: 0 1px 6px #333;" width="200" height="200" src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=$wxticket$">','</div>','<div>\u8BF7\u4F7F\u7528\u5FAE\u4FE1\u201C\u626B\u4E00\u626B\u201D\u626B\u63CF\u4E8C\u7EF4\u7801','</div>','</div>'].join("")).replace({wxticket:h}),nHeight:'auto',nWidth:500,onload:function(){
var i=this;
function j()
{
if(!a)
{
return;
}
b=++c>=150?true:false;
var k=getTop();
QMAjax.send("/cgi-bin/setting_wxbind?action=poll_send&is_bind="+f+"&ef=js&t=data_mgr&sid="+getSid()+(f=="1"?"&scan_code="+g:"")+"&r="+Math.random(),{method:"GET",onload:function(l,m){
var n=evalValue(m);
if(l&&n.data.send_check=="1")
{
a=false;
d.close();
new Image().src='/cgi-bin/sellonlinestatic?type=session_statistics&businame=antiSpamWx&item=wxScan&sid='+getSid()+'&r='+Math.random();
e.showWxCheckResult();
}
else if(l&&n.data.send_check=="0")
{
showError("\u8BF7\u4F7F\u7528\u8BE5\u90AE\u7BB1\u5E10\u53F7\u7ED1\u5B9A\u7684\u5FAE\u4FE1\u626B\u7801");
e.getWxticket(i,function(){
c=0;
g=i.S('scan_code').value;
setTimeout(j,2000);
});
}
else if(b)
{
e.getWxticket(i,function(){
c=0;
g=i.S('scan_code').value;
setTimeout(j,2000);
});
}
else{
setTimeout(j,2000);
}
}});
}
setTimeout(j,2000);
},onclose:function(){
a=false;
d=null;
}});
};
showAntiSpamWxCheck.showWxCheckResult=function(){
alertBox({msg:"\u5FAE\u4FE1\u9A8C\u8BC1\u6210\u529F\uFF0C\u8BF7\u70B9\u51FB\u201C\u786E\u5B9A\u201D\u7EE7\u7EED\u5B8C\u6210\u672C\u6B21\u53D1\u4FE1",title:"\u786E\u5B9A",icon:"icon_finish_b",onload:function(){
var a=this;
addEvent(a.S("confirm"),'click',function(b){
getMainWin().doVerifySubmit();
});
}});
};
function isshowMsg()
{
return getTop().isShow("msgBoxDIV");
}
function hiddenMsg()
{
if(getTop().gMsgBoxTimer)
{
getTop().clearInterval(getTop().gMsgBoxTimer);
getTop().gMsgBoxTimer=null;
}
getTop().show("msgBoxDIV",false);
getTop().showProcess(0);
}
function showMsg()
{
getTop().show("msgBoxDIV",true);
}
function showError(b,a)
{
msgBox(b,"",a!=-1,a||5000);
}
function showInfo(b,a)
{
msgBox(b,"success",a!=-1,a||5000);
}
function showProcess(c,b,d,e,a)
{
var i="load_process",h=arguments.callee._create(i);
if(c==0)
{
return show(h,false);
}
hiddenMsg();
show(h,true);
var f=c==2;
if(f)
{
if(e)
{
S(i+"_plan_info",getTop()).innerHTML=e+":";
}
var g=parseInt(d);
if(isNaN(g))
{
g=0;
}
else{
g=Math.max(0,Math.min(100,g));
}
S(i+"_plan_rate",getTop()).innerHTML=S(i+"_plan_bar",getTop()).style.width=[g,"%"].join("");
}
else{
if(d)
{
S(i+"_info",getTop()).innerHTML=d;
}
}
show(S(i+"_plan",getTop()),f);
show(S(i+"_img",getTop()),f?false:b);
show(S(i+"_plan_info",getTop()),f);
show(S(i+"_plan_rate",getTop()),f);
show(S(i+"_info",getTop()),!f);
show(S(i+"_cancel",getTop()),a!=false);
}
showProcess.createProcessBox=function(a){
var c="load_process";
var b=S(c,getTop());
if(!b)
{
insertHTML(Scale.getContainer(),"afterBegin",T(['<table id="$id$" cellspacing=0 cellpadding=0 border=0 ','style="position:absolute;top:$top$px;left:0;width:100%;display:none;z-index:9999;">','<tr><td align="center">','<table id="$id$_pos" cellspacing=0 cellpadding=0 border=0 class="autosave autosave_txt" style="height:20px;"><tr>','<td style="width:2px;"></td>','<td id="$id$_img" style="padding:0 0 0 5px;">','<img src="$image_path$ico_loading.gif" style="width:16px;height:16px;vertical-align:middle;">','</td>','<td id="$id$_plan" valign=center style="padding:0 0 0 5px;">','<div style="font:1px;border:1px solid white;width:104px;text-align:left;">','<div id="$id$_plan_bar" style="font:1px;background:#fff;height:8px;margin:1px 0;width:50%;"></div>','</div>','</td>','<td id="$id$_plan_info" style="padding:0 0 0 5px;"></td>','<td id="$id$_plan_rate" style="width:40px;text-align:right;padding:0;"></td>','<td id="$id$_info" style="padding:0 0 0 5px;"></td>','<td id="$id$_cancel" style="padding:0 0 0 5px;">','[<a onclick="getTop().cancelDoSend();" nocheck="true" style="color:white;">\u53D6\u6D88</a>]','</td>','<td style="padding:0 0 0 5px;"></td>','<td style="width:2px;"></td>','</tr></table>','</td></tr>','</table>']).replace({id:c,top:isNaN(a)?(getTop().bnewwin?0:45):a,image_path:getPath("image",true)}));
b=S(c,getTop());
}
else if(!isNaN(a))
{
b.style.top=a+'px';
}
return b;
};
showProcess._create=function(a){
var b=S(a,getTop());
if(!b)
{
insertHTML(getTop().document.body,"afterBegin",T(['<table id="$id$" cellspacing=0 cellpadding=0 border=0 ','style="position:absolute;top:$top$px;left:0;width:100%;display:none;z-index:9999;">','<tr><td align="center">','<table cellspacing=0 cellpadding=0 border=0 class="autosave autosave_txt" style="height:20px;"><tr>','<td style="width:2px;"></td>','<td id="$id$_img" style="padding:0 0 0 5px;">','<img src="$image_path$ico_loading.gif" style="width:16px;height:16px;vertical-align:middle;">','</td>','<td id="$id$_plan" valign=center style="padding:0 0 0 5px;">','<div style="font:1px;border:1px solid white;width:104px;text-align:left;">','<div id="$id$_plan_bar" style="font:1px;background:#fff;height:8px;margin:1px 0;width:50%;"></div>','</div>','</td>','<td id="$id$_plan_info" style="padding:0 0 0 5px;"></td>','<td id="$id$_plan_rate" style="width:40px;text-align:right;padding:0;"></td>','<td id="$id$_info" style="padding:0 0 0 5px;"></td>','<td id="$id$_cancel" style="padding:0 0 0 5px;">','[<a onclick="getTop().cancelDoSend();" nocheck="true" style="color:white;">\u53D6\u6D88</a>]','</td>','<td style="padding:0 0 0 5px;"></td>','<td style="width:2px;"></td>','</tr></table>','</td></tr>','</table>']).replace({id:a,top:getTop().bnewwin?0:45,image_path:getPath("image",true)}));
b=S(a,getTop());
}
return b;
};
function getProcessInfo()
{
var d="load_process",c=getTop();
if(isShow(S(d,c)))
{
var a=S(d+"_plan_rate",c),b=S(d+"_info",c);
if(b&&isShow(b))
{
return b.innerHTML;
}
if(a&&isShow(S(d+"_plan",c)))
{
return parseInt(a.innerHTML);
}
}
return "";
}
function replaceCss(b,a)
{
replaceCssFile("skin",[getPath("style"),getFullResSuffix(["skin",typeof a=="undefined"?getPath("skin"):a,".css"].join(""))].join(""),(b||window).document);
}
function _getLogoSrc(b,a)
{
var c=getTop();
return !a&&c.gLogoUrl?c.gLogoUrl.replace(/(.*)_[^_]+_([^_]+)/,"$1_"+b+"_$2"):TE(['$images_path$logo','$@$if($bFoxmail$)$@$','_foxmail/logo_biz_$nSkinId$_','$@$else$@$','$sSubfolder$logo_biz/logo_biz_$nSkinId$_','$@$endif$@$','$@$if($bFoxmail$)$@$','0','$@$else$@$','$sLogoid$','$@$endif$@$.png']).replace({images_path:getPath("image"),bFoxmail:a,sSubfolder:c.gsLogoFolder,nSkinId:b,sLogoid:(c.gsLogoFolder||b==0)?(c.gLogoId||0):0});
}
function doRealChangeStyle(d,c,b,e,a)
{
var j=getTop(),g=j.gTempSkinId=c,i=getMainWin(),k=[j,i],f=a||false,h=S("imglogo",j);
if(h)
{
if(typeof e=="undefined"||e=="")
{
if(c<10000000)
{
h.src=_getLogoSrc(g,b);
}
}
else{
h.src=e;
}
h.className=f?"domainmaillogo":"";
}
E(j.goDialogList,function(l,m){
k.push(F(m,getTop()));
});
E(GelTags("iframe",i.document),function(l){
k.push(l.contentWindow);
});
E(k,function(l){
replaceCss(l,g);
});
removeSelf(d);
setTimeout(resizeFolderList);
rdVer("BaseVer",1);
}
function changeStyle(a,b)
{
var d=false,c=false;
var g=getTop().getGlobalVarValue("DOMAIN_MAIL_LOGO_URL")||{},h=getGlobalVarValue("DEF_MAIL_FROM")||'';
if(b)
{
c=b.indexOf("/cgi-bin/viewfile")>=0;
if(c)
{
g[h]=b;
h&&setGlobalVarValue("DOMAIN_MAIL_LOGO_URL",g);
}
}
else if(h&&g[h])
{
b=g[h];
c=b&&b.indexOf("/cgi-bin/viewfile")>=0;
}
var f=typeof a=="undefined"||a==""?getTop().skin_path:a,j=getTop().gsLogoFolder,m=d?0:(j||f==0?(getTop().gLogoId||0):0),i=d?"_foxmail":"",e=getTop().changeStyle,k=e._sProcessId,l=e._sProcessId=["skinCssCache",f,i,b||m].join("_");
if(l!=k)
{
cacheByIframe([["css",getPath("style"),"skin"+f+".css"],!!b?["img","",b]:["img",_getLogoSrc(f,d)]],{onload:function(){
doRealChangeStyle(this,f,d,b,c);
}});
}
}
function osslogCompose(a,c,e,d,b)
{
getTop().ossLog("delay","all",T(['stat=compose_send','&t=$time$&actionId=$actionId$&mailid=$mailid$','&isActivex=$isActivex$&failCode=$failCode$','&$other$']).replace({time:a,actionId:c,mailId:e,failCode:d,other:["&cgitm=",getTop().g_cgiTimeStamp||-1,"&clitm=",getTop().g_clientTimeStamp||-1,"&comtm=",b&&b.valueOf?b.valueOf():-1].join('')}));
}
function recodeComposeStatus(a,c,b,d)
{
var e=0,f=getTop().gSendTimeStart;
if(!f||!f.valueOf)
{
if(!d)
{
return;
}
}
else{
e=now()-f.valueOf();
getTop().gSendTimeStart=null;
}
osslogCompose(e,a,c,b,f);
getTop().isUseActiveXCompose=false;
}
function errorProcess(a)
{
if(typeof getMainWin().ErrorCallBack=="function")
{
getMainWin().ErrorCallBack(a);
}
else if(typeof getTop().ErrorCallBack=="function")
{
getTop().ErrorCallBack(a);
}
}
function doPostFinishCheck(c,b,a)
{
if(c)
{
var j="",d=false,h=S(c,b),i=F(c,b);
try{
if(!h||h.getAttribute("deleted")=="true")
{
return;
}
var e=i.document.body,d=!e.className&&!e.style.cssText;
if(d)
{
var f=i.document.documentElement;
j=(f.textContent||f.innerText||"").substr(0,30);
}
}
catch(g)
{
debug("doPostFinishCheck exception");
debug(g,2);
d=g.message||"exception";
}
QMHistory.recordActionFrameChange();
if(d)
{
callBack.call(h,a,[j]);
if(d!=true)
{
removeSelf(h);
createBlankIframe(b,{id:c,onload:h._onload});
}
errorProcess();
}
}
}
function actionFinishCheck()
{
doPostFinishCheck("actionFrame",getTop(),function(a){
showError(gsMsgLinkErr);
});
}
function doSendFinishCheck()
{
doPostFinishCheck("sendmailFrame",getTop(),function(a){
recodeComposeStatus(2,null,a||0);
msgBox(T(['\u7531\u4E8E\u7F51\u7EDC\u539F\u56E0\uFF0C\u90AE\u4EF6\u53D1\u9001\u5931\u8D25\uFF01','[<a href="/cgi-bin/switch2service?sid=$sid$&errcode=-1&time=$time$&cginame=sendmail&t=error_report">\u53D1\u9001\u9519\u8BEF\u62A5\u544A</a>]']).replace({time:formatDate(new Date(),"$YY$$MM$$DD$$hh$$mm$$ss$")}),"dialog",true,0,"\u5931\u8D25\u4FE1\u606F");
});
}
function submitToActionFrm(a)
{
try{
a.submit();
return true;
}
catch(b)
{
showError(a.message);
return false;
}
}
function afterAutoSave(b,c,d,a)
{
var l=0,u,w;
try{
var s=getTop().getMainWin();
function f()
{
if(disableAll)
{
disableAll(false);
}
}
l=1;
if(c==""||!c)
{
return f();
}
l=2;
if(!s||!S("fmailid",s))
{
return f();
}
l=3;
w=S("fmailid",s).value;
if(w!=c)
{
S("fmailid",s).value=c;
getTop().setTimeout(function(){
reloadLeftWin();
},0);
}
l=4;
var r=b.split(" |"),q=[],m=s.QMAttach.getExistList();
for(var x=0,h=m.length;x<h;x++)
{
var t=S("Uploader"+m[x],s);
if(t&&!t.disabled&&t.value!="")
{
q.push(t);
}
}
l=5;
var g=q.length;
for(var x=0,h=r.length-1;x<h;x++)
{
var e=false;
for(var y=0;y<=x&&y<g;y++)
{
if(!q[y].disabled&&q[y].value.indexOf(r[x])!=-1)
{
q[y].disabled=true;
e=true;
try{
if(gbIsIE||gbIsWebKit)
{
q[y].parentNode.childNodes[1].innerText=r[x];
}
}
catch(p)
{
}
}
}
if(!e)
{
var v=r[x]+" |",k=b.indexOf(v);
if(k!=-1)
{
b=b.substr(0,k)+b.substr(k+v.length,b.length-k-v.length);
}
}
}
l=6;
s.loadValue();
l=7;
if(b&&S("fattachlist",s))
{
S("fattachlist",s).value+=b;
}
l=8;
l=9;
showInfo(d||(formatDate(new Date(),"$hh$:$mm$")+" "+getTop().gsMsgSendErrorSaveOK));
l=10;
var o=getTop().QMDialog("composeExitAlert");
l=10.1;
var n=o&&o.S("btn_exit_notsave");
l=10.2;
if(n)
{
l=10.3;
if((n.isShow&&n.isShow())||n.disabled)
{
l=10.4;
return fireMouseEvent(n,"click");
}
}
l=11;
if(!a)
{
f();
}
l=12;
s.enableAutoSave();
}
catch(p)
{
u=p.message;
debug(["afterAutoSave:",p.message,"eid:",l]);
}
ossLog("realtime","all",T(["stat=custom&type=AFTER_AUTO_SAVE&info=","$processid$,$errmsg$,$oldmailid$,$mailid$,$attachlist$"]).replace({processid:l,errmsg:encodeURIComponent(u||"ok"),oldmailid:encodeURIComponent(w),mailid:encodeURIComponent(c),attachlist:encodeURIComponent(b)}));
}
function cancelDoSend()
{
var a=getMainWin(),b=a.QMAttach;
if(b&&b.onfinish)
{
b.onprogress=null;
b.onfinish=null;
}
else{
var c=S("sendmailFrame",getTop());
if(c)
{
c.setAttribute("deleted","true");
removeSelf(c);
}
}
recodeComposeStatus(3,null,0);
showProcess(0);
errorProcess();
}
function quickDoSend(a,c,b)
{
var d=false;
if(b!="nomsg")
{
showProcess(1,0,["<img src='",getPath("image"),"newicon/a_send.gif' width='14px' height='14px' align='absmiddle'>&nbsp;",(b||gsMsgSend)].join(""),null,true);
}
disableSendBtn(true);
disableSource(true);
createBlankIframe(getTop(),{id:"sendmailFrame",onload:function(e){
if(d)
{
doSendFinishCheck(this);
}
else{
d=true;
try{
a.content.value=c;
a.target="sendmailFrame";
a.submit();
}
catch(f)
{
showError("\u53D1\u9001\u5931\u8D25\uFF1A"+f.message);
disableSendBtn(false);
disableSource(false);
}
}
}});
}
function disableSendBtn(a,b)
{
disableCtl("sendbtn",a,b||getMainWin());
}
function disableSaveBtn(a,b)
{
disableCtl("savebtn",a,b||getMainWin());
}
function disableTimeSendBtn(a,b)
{
disableCtl("timeSendbtn",a,b||getMainWin());
}
function disableSource(a)
{
disableCtl("source",a,getMainWin());
}
function disableAll(a,b)
{
var e=b||getMainWin();
if(e.disableAll&&e.disableAll!=arguments.callee)
{
return e.disableAll(a);
}
disableSendBtn(a,b);
disableSaveBtn(a,b);
disableTimeSendBtn(a,b);
var c=getTop().QMDialog("composeExitAlert"),d=c&&c.S("btn_exit_save");
if(d)
{
d.disabled=a;
}
}
function verifyCode(a,b,c)
{
if(window!=getTop())
{
return getTop().verifyCode(_asSubTmpl);
}
var e=arguments.callee,d=e._onok||c;
setVerifyCallBack();
loadingBox({model:"\u9A8C\u8BC1\u7801",js:[getTop().getPath("js")+getTop().getFullResSuffix("qmverify.js")],oncheck:function(){
return window.QMVerifyBox;
},onload:function(){
QMVerifyBox.open({sType:a,sVerifyKey:b,onok:d});
}});
}
function feedbackVfSubmit()
{
getTop().S("verifycode_cn",getMainWin()).value=arguments[0].verifycode||arguments[0].verifycode_cn;
getTop().S("verifykey",getMainWin()).value=arguments[0].verifykey;
getTop().SN("sendbtn",getMainWin())[0].disabled=false;
getTop().fireMouseEvent(getTop().SN("sendbtn",getMainWin())[0],"click");
getTop().SN("sendbtn",getMainWin())[0].disabled=true;
}
;function openComposeDlg(c,b,a)
{
if(!(getTop().QMAddress&&QMAddress.isInit()))
{
loadJsFile(getPath("js")+getFullResSuffix("qmaddress.js"),true,document,function(){
QMAddress.initAddress();
});
}
loadJsFileToTop(getPath("js"),[getFullResSuffix("qqmaileditor/editor.js")]);
loadingBox({model:"\u53D1\u4FE1",js:[getTop().getPath("js")+getTop().getFullResSuffix("libcompose.js"),getTop().getPath("js")+getTop().getFullResSuffix("qmaddrinput.js")],oncheck:function(){
return window.ComposeLib&&window.QMAddrInput&&window.QMEditor&&(!a||a());
},onload:function(){
ComposeLib.openDlg(c,b);
}});
}
function setVerifyCallBack(a)
{
getTop().verifyCode._onok=a;
}
function emptyFolder(a)
{
return confirm(a?"\u4F60\u786E\u8BA4\u8981\u6E05\u7A7A\u6B64\u6587\u4EF6\u5939\u5417\uFF1F\n\uFF08\u6E05\u7A7A\u540E\u90AE\u4EF6\u65E0\u6CD5\u6062\u590D\uFF09":"\u4F60\u786E\u8BA4\u8981\u5220\u9664\u6B64\u6587\u4EF6\u5939\u4E2D\u7684\u6240\u6709\u90AE\u4EF6\u5417\uFF1F\n\uFF08\u6E05\u7A7A\u540E\u90AE\u4EF6\u65E0\u6CD5\u6062\u590D\uFF09");
}
function renameFolder(c,d,a,b)
{
promptFolder({defaultValue:b||'',type:"rename"+(d||'folder'),onreturn:function(f){
var e=S("frm",a);
if(d=='tag')
{
e.fun.value="renametag";
e.tagname.value=f;
e.tagid.value=c;
}
else{
e.fun.value="rename";
e.name.value=f;
e.folderid.value=c;
}
submitToActionFrm(e);
}});
return false;
}
function promptFolder(a)
{
var b={shortcutgroup:{title:'\u65B0\u5EFA\u8054\u7CFB\u4EBA\u5206\u7EC4',msg:'\u8BF7\u586B\u5199\u8054\u7CFB\u4EBA\u5206\u7EC4\u540D\u79F0',name:'\u8054\u7CFB\u4EBA\u5206\u7EC4',maxascii:32,description:"\u5199\u4FE1\u65F6\uFF0C\u53EA\u9700\u8981\u8F93\u5165\u8FD9\u4E2A\u7FA4\u7EC4\u540D(\u6C49\u5B57\u9700\u8F93\u5165\u62FC\u97F3)\uFF0C\u5C31\u53EF\u4EE5\u5FEB\u6377\u7FA4\u53D1\u4E86\u3002"},folder:{title:'\u65B0\u5EFA\u6587\u4EF6\u5939',msg:'\u8BF7\u8F93\u5165\u6587\u4EF6\u5939\u540D\u79F0',name:'\u6587\u4EF6\u5939',height:200,maxascii:30},folderselect:{title:'\u65B0\u5EFA\u6587\u4EF6\u5939',msg:'\u8BF7\u8F93\u5165\u6587\u4EF6\u5939\u540D\u79F0',msgselect:'\u9009\u62E9\u65B0\u5EFA\u6587\u4EF6\u5939\u7684\u4F4D\u7F6E',name:'\u6587\u4EF6\u5939',height:420,maxascii:30,isSelect:1,selectedId:a.selectedId},tag:{title:'\u65B0\u5EFA\u6807\u7B7E',msg:'\u8BF7\u60A8\u8F93\u5165\u6807\u7B7E\u540D\u79F0',name:'\u6807\u7B7E',maxascii:50},renamefolder:{title:'\u91CD\u547D\u540D\u6587\u4EF6\u5939',msg:'\u8BF7\u4E3A\u6587\u4EF6\u5939\u8F93\u5165\u65B0\u540D\u79F0',name:'\u6587\u4EF6\u5939',maxascii:80,isRenameFolder:1},renametag:{title:'\u91CD\u547D\u540D\u6807\u7B7E',msg:'\u8BF7\u60A8\u8F93\u5165\u65B0\u7684\u6807\u7B7E\u540D\u79F0',name:'\u6807\u7B7E',maxascii:50}}[a.type];
b.defaultValue=a.defaultValue;
b.onreturn=function(c,d,f,j){
if(!c)
{
return;
}
var g=getAsiiStrLen(trim(d));
if(g==0||g>b.maxascii)
{
if(j)
{
j.S("folder_needValid").innerHTML=TE(g?"$name$\u540D\u79F0\u592A\u957F\uFF0C\u8BF7\u4F7F\u7528\u5C11\u4E8E$maxascii$\u4E2A\u5B57\u7B26($@$eval $maxascii$/2$@$\u4E2A\u6C49\u5B57)\u7684\u540D\u79F0":'$name$\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A').replace(b);
return false;
}
else{
return showError(TE(g?"$name$\u540D\u79F0\u592A\u957F\uFF0C\u8BF7\u4F7F\u7528\u5C11\u4E8E$maxascii$\u4E2A\u5B57\u7B26($@$eval $maxascii$/2$@$\u4E2A\u6C49\u5B57)\u7684\u540D\u79F0":'$name$\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A').replace(b));
}
}
if(/[~!#\$%\^&\*\(\)=\+|\\\[\]\{\};\':\",\?\/<>]/.test(d))
{
if(j)
{
j.S("folder_needValid").innerHTML=b.name+'\u540D\u79F0\u4E0D\u80FD\u5305\u542B ~!#$%^&*()=+|\\[]{};\':",?/<> \u7B49\u5B57\u7B26';
return false;
}
else{
return showError(b.name+'\u540D\u79F0\u4E0D\u80FD\u5305\u542B ~!#$%^&*()=+|\\[]{};\':",?/<> \u7B49\u5B57\u7B26');
}
}
if(j)
{
var h=new RegExp('folder_(\\d+)');
try{
var n=getTop().getMainWin().document.getElementsByTagName("tr");
for(var l=0;l<n.length;l++)
{
if(h.test(n[l].id)&&n[l].getAttribute("alias")==d)
{
j.S("folder_needValid").innerHTML="\u5DF2\u5B58\u5728\u540C\u540D\u7684\u6587\u4EF6\u5939";
return false;
}
}
}
catch(k)
{
}
try{
var m=j.getPanelDom().getElementsByTagName("li");
for(var l=0;l<m.length;l++)
{
if(h.test(m[l].id)&&m[l].getAttribute("alias")==d)
{
j.S("folder_needValid").innerHTML="\u5DF2\u5B58\u5728\u540C\u540D\u7684\u6587\u4EF6\u5939";
return false;
}
}
}
catch(k)
{
}
}
a.onreturn(d,f);
return true;
};
promptBox(b);
}
function _setFolderCss(c,a,b,d)
{
if(c)
{
var h=S(c+"_td",a);
if(h)
{
setClass(h,b);
return h;
}
else{
var g=S(c,a);
if(g)
{
var e=d=="over";
if(e)
{
showFolders(g.name,true);
}
var f=S(c,a).parentNode;
setClass(f,e?"fn_list":"");
return g;
}
}
}
}
function switchFolderComm(d,b,c,g,f,e,a)
{
var h=S(c,b),k=d;
if(k)
{
a._sCurFolderId=k;
}
else{
k=a._sCurFolderId;
}
if(h)
{
var m="SwiTchFoLdErComM_gLoBaldATa",l=b[m],j;
if(l!=k)
{
_setFolderCss(l,b,e,"none");
}
if(j=_setFolderCss(b[m]=k,b,f,"over"))
{
E("new|personal|pop|tag".split("|"),function(n){
var o=S(n+"folders",b);
o&&isObjContainTarget(o,j)&&showFolders(n,true);
});
if(getStyle(h,"overflow")!="hidden")
{
scrollIntoMidView(j,h);
}
else{
var i=S("ScrollFolder",b);
i&&isObjContainTarget(i,j)&&scrollIntoMidView(j,i);
}
}
}
}
function switchFolder(b,a)
{
if(b=='folder_entdisk'&&location.protocol=='https:'&&getTop().goExpers&&getTop().goExpers.dropFlash)
{
try{
getTop().setCookie("folder_target","folder_entdisk",new Date((+new Date())+10*1000),"/",getTop().document.domain);
getTop().location.href=getTop().location.href.replace(/^https:\/\//,'http://');
}
catch(c)
{
getTop().switchFolderComm(b,a||getLeftWin(),"folder","li","fn","fs",getTop().switchFolder);
}
}
else{
getTop().switchFolderComm(b,a||getLeftWin(),"folder","li","fn","fs",getTop().switchFolder);
}
}
function switchRightFolder(b,c,a)
{
getTop().switchFolderComm(b,c||F("rightFolderList",getMainWin()),a||"folder_new","div","toolbg","",getTop().switchRightFolder);
}
function isShowFolders(b,a)
{
var c=S("icon_"+b,a||getTop());
return !!(c&&c.className=="fd_off");
}
function showFolderTrace(a)
{
var b="";
getTop().switchFolder("folder_"+a);
for(var c=0;c<getTop().originUserFolderNodes.length;c++)
{
if(getTop().originUserFolderNodes[c].id==a)
{
b=getTop().originUserFolderNodes[c].level;
if(b=="1")
{
return;
}
if(b=="2")
{
getTop().showFolders(getTop().originUserFolderNodes[c].fatherid,true);
break;
}
if(b=="3")
{
for(var d=0;d<getTop().originUserFolderNodes.length;d++)
{
if(getTop().originUserFolderNodes[d].id==getTop().originUserFolderNodes[c].fatherid)
{
getTop().showFolders(getTop().originUserFolderNodes[d].fatherid,true);
break;
}
}
getTop().showFolders(getTop().originUserFolderNodes[c].fatherid,true);
break;
}
}
}
;
}
function showFolders(c,a,b)
{
var j=b||getTop(),g=S(c+"folders",j),h=S("icon_"+c,j);
if(!g)
{
var d=!isShowFolders(c,j);
if(typeof a!="boolean"||d==a)
{
setClass(h,d?"fd_off":"fd_on");
}
}
if(g&&h)
{
var d=!isShowFolders(c,j);
if(typeof a!="boolean"||d==a)
{
setClass(h,d?"fd_off":"fd_on");
if(!b)
{
var i=getTop(),k="fOlDErsaNimaTion"+c,f=i[k];
if(!f)
{
f=i[k]=new i.qmAnimation({from:1,to:100});
}
f.stop();
if(d)
{
g.style.height="1px";
show(g,true);
}
else{
g.style.height="auto";
}
var e=g.scrollHeight;
f.play({speed:e,onaction:function(m,l){
S(c+"folders",i).style.height=(Math.floor((d?l:1-l)*e)||1)+"px";
},oncomplete:function(m,l){
var n=S(c+"folders",i);
if(d)
{
n.style.height="auto";
}
else{
show(n,false);
}
}});
}
else{
show(g,d);
}
callBack(getTop().iPadResizeFolder);
}
}
}
function decreaseFolderUnread(c,a,b)
{
var d,e=c.split(';');
for(var f=e.length-1;f>=0;f--)
{
if(d=_optFolderUnread(0,e[f]))
{
_optFolderUnread(1,e[f],d-1,a,b);
}
}
}
function getFolderUnread(a)
{
return _optFolderUnread(0,a);
}
function setFolderUnread(d,b,a,c)
{
return _optFolderUnread(1,d,b||0,a,c);
}
function getGroupUnread(a)
{
return _optFolderUnread(0,a,null,null,getMainWin());
}
function setGroupUnread(c,b,a)
{
return _optFolderUnread(1,c,b||0,a,getMainWin());
}
function setTagUnread(d,b,a,c)
{
return _optFolderUnread(1,d,b||0,a,c,true);
}
function _optFolderUnread(c,f,d,a,e,b)
{
var m=S(["folder_",(new String(f)).toString().split("folder_").pop()].join(""),e||getLeftWin());
if(!m)
{
return 0;
}
else if(-1!=f.indexOf("tag")||-1!=f.indexOf("starred")||-1!=f.indexOf("bsm"))
{
return 0;
}
var p=m.getAttribute("etitle"),k=GelTags("div",m),r=m.name;
if(k.length)
{
m=k[0];
}
var j=typeof (d)=="number"&&d>0?d:0,q=m.innerText||m.textContent||"",h=q.lastIndexOf("("),i=h==-1?0:parseInt(q.substring(h+1,q.lastIndexOf(")")));
if(c==0)
{
return i;
}
if(i==j)
{
return 1;
}
var g=j==0,n={info:htmlEncode(h!=-1?q.substring(0,h):q),title:p,unread:j};
m.title=T('$title$'+(a||g?'':'  \u672A\u8BFB\u90AE\u4EF6 $unread$ \u5C01')).replace(n);
m=setHTML(m,T(g&&'$info$'||(a?'$info$($unread$)':'<b>$info$</b><b>($unread$)</b>')).replace(n)+(n.info=='\u661F\u6807\u90AE\u4EF6'?'<input type="button" class="ico_input icon_folderlist_star"/>':'')+(n.info=='\u6F02\u6D41\u74F6'?'<input class="ico_input drifticon" type="button" hidefocus />':''));
m.setAttribute("initlized","");
if(r&&!b)
{
var o=S("folder_"+r,getTop());
if(o)
{
try{
_optFolderUnread(c,f,j,a,getMainWin());
}
catch(l)
{
doPageError(l.message,"all.js","_optFolderUnread");
}
return setFolderUnread(o.id,getFolderUnread(o.id)-i+j);
}
}
return 1;
}
function doFolderEmpty(b,a,c)
{
a.folderid.value=b;
a.rk.value=Math.random();
if(a.loc)
{
a.loc.value=c;
}
submitToActionFrm(a);
}
function selectAll(a,b)
{
var c=b||getTop().getMainWin().document;
E(GelTags("input",S('list',c)),function(d){
d.checked=a;
});
}
function selectReadMail(a,b)
{
E(GelTags("input",S('list',b)),function(c){
if(c.title!="\u9009\u4E2D/\u53D6\u6D88\u9009\u4E2D")
{
c.checked=c.getAttribute('unread')!=a;
}
});
}
function checkAddrSelected(a)
{
var e=a||getTop().getMainWin();
var d=GelTags("input",S('list',e)),b=d.length,c;
for(var f=0;f<b;f++)
{
c=d[f];
if(c.type=="checkbox"&&c.checked)
{
return true;
}
}
return false;
}
function checkBoxCount(a)
{
var b=0;
E(GelTags("INPUT"),function(c){
if(c.type=="checkbox"&&c.name==a&&c.checked)
{
b++;
}
});
return b;
}
function PGV()
{
}
function checkCheckBoxs(b,a)
{
var d=a||S("frm",getMainWin()),f=GelTags("input",d),e;
for(var g=0,c=f.length;g<c;g++)
{
e=f[g];
if(e.type=="checkbox"&&e.name==b&&e.checked)
{
return true;
}
}
return false;
}
function setListCheck(b,a)
{
if(b.type!="checkbox")
{
return;
}
if(a==null)
{
a=b.checked;
}
else{
b.checked=a;
}
var c=b.parentNode.parentNode;
if(c.tagName=="TR")
{
c=c.parentNode.parentNode;
}
if(c==S("frm",getMainWin()))
{
return;
}
var d=c.className;
if(d=="B")
{
d=a?"B":"";
}
else{
d=strReplace(d," B","")+(a?" B":"");
}
setClass(c,d);
if(a)
{
listMouseOut.call(c);
}
}
function doCheck(b,c,a,d)
{
var g=b||window.event,l=c||g.srcElement||g.target,k=d||getMainWin();
if(!l||!k)
{
return;
}
if(l.className=="one"||l.className=="all")
{
CA(l);
}
setListCheck(l);
if((g&&g.shiftKey||a)&&k.gCurSelObj&&k.gCurSelObj!=l&&l.checked==k.gCurSelObj.checked)
{
var j=getTop().GelTags("input",k.document),e=0,f=j.length,h;
for(var m=0;m<f;m++)
{
h=j[m];
if(h.type!="checkbox")
{
continue;
}
if((h==k.gCurSelObj||h==l)&&e++==1)
{
break;
}
if(e==1)
{
setListCheck(h,l.checked);
}
}
}
k.gCurSelObj=l;
}
function checkAll(b,a)
{
var c=a||getTop().getMainWin().document;
E(GelTags("input",c),function(d){
if(d.name==b)
{
setListCheck(d);
}
});
}
function fakeReadmail(a)
{
QMAjax.send(T('/cgi-bin/readmail?sid=$sid$&mailid=$mailid$&t=readsubmail&mode=fake&base=$base$&pf=$pf$&xx=kk').replace({sid:getSid(),mailid:a.sMailId,pf:rdVer.isPre(a.sFolderId)?1:0,base:rdVer("BaseVer",0)}),{method:"GET",headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},onload:function(b,c){
var f=trim2(c);
if(b&&f.indexOf("(")==0)
{
var e=evalValue(f);
if(e)
{
folderOpt(extend(a,e));
callBack(getMainWin().updatePreAndNext,[a]);
}
}
else{
var d=getActionWin().document;
d.open();
d.write(_aoXml.responseText);
}
}});
}
function folderOpt(a)
{
if(!a)
{
return;
}
var d=getTop();
d.recordCompareReadedMailId(a.sMailId);
if(a.bNewMail)
{
var g=a.sFolderId,b;
if(g>0)
{
try{
d.setFolderUnread(g,d.getFolderUnread(g)-1);
if(a.bStar)
{
d.setFolderUnread("starred",d.getFolderUnread("starred")-1);
}
if(a.bBsm)
{
d.setFolderUnread("bsm",d.getFolderUnread("bsm")-1);
}
var c=a.oMatchTag||[],j=c.length-1;
j>=0&&setTagUnread('tag',getFolderUnread('tag')-1);
for(;j>=0;j--)
{
var f='tag_'+c[j];
debug(['getFolderUnread',f,getFolderUnread(f)]);
setTagUnread(f,getFolderUnread(f)-1);
}
}
catch(h)
{
}
}
}
}
function recordReadedMailId(a)
{
getTop().gsReadedMailId=a;
}
function recordCompareReadedMailId(a)
{
if(a&&getTop().gsReadedMailId!=a)
{
getTop().gsReadedMailId=a;
}
QMMailCache.addData(a);
}
function SG(b,a)
{
var g=b.className,c=!/\bsts\b/i.test(g);
var e=GelTags("input",b.parentNode)[0],f=e&&e.className,d=(a?b.parentNode.parentNode.parentNode:b.parentNode).nextSibling;
if(f=="one"||f=="all")
{
setClass(e,c?"one":"all");
}
setClass(b,c?g.replace(/\bhts\b/i,"sts"):g.replace(/\bsts\b/i,"hts"));
if(d.className!="toarea")
{
d=d.nextSibling;
}
if(d.className!="toarea")
{
return;
}
return show(d,c);
}
function CA(a)
{
if(a)
{
var c=(a.className=="all"?a.parentNode.parentNode.parentNode.parentNode:a.parentNode).nextSibling;
if(c.className!="toarea")
{
c=c.nextSibling;
}
if(c.className=="toarea")
{
var b=a.checked;
E(GelTags("input",c),function(d){
setListCheck(d,b);
});
}
}
}
function RD(g,i,c,e,h,d,a,f,j,b)
{
var o=getTop();
if(o.S("qmdialog_container")&&o.S("qmdialog_container").innerHTML!=''&&o.S("qqmail_mask")&&o.S("qqmail_mask").style.display!='none')
{
o.S("qmdialog_container").innerHTML='';
o.S("qqmail_mask").style.display='none';
}
recordReadedMailId(i);
if(g)
{
preventDefault(g);
var k=g.srcElement||g.target,m=k&&k.getAttribute("fid");
if(m)
{
goUrlMainFrm(T("/cgi-bin/$cgi$?sid=$sid$&folderid=$fid$&page=0&t=$t$").replace({cgi:m=="9"?"readtemplate":"mail_list",fid:m,sid:getSid(),t:m=="9"?"sms_list_v2":""}),false);
return stopPropagation(g);
}
}
var n=rdVer.url(i,h,j,e,getTop().bnewwin||(g&&g.shiftKey),d,a,f);
if(b=="0")
{
n=n+"&show_ww_icon=false";
}
else if(b=="1")
{
n=n+"&show_ww_icon=true";
}
rdVer.log(i,"hit");
if(g&&(g.shiftKey||g.ctrlKey))
{
var l=g.target||g.srcElement;
while(l&&l.className!="i M"&&l.className!="i F")
{
l=l.parentNode;
}
l&&QMReadedItem.disp(l);
g.shiftKey&&goNewWin(n);
g.ctrlKey&&window.open(n);
}
else{
goUrlMainFrm([n,"#stattime=",now()].join(""),false);
}
}
function checkPerDelML(c,a,b)
{
return delMailML(c,a,"PerDel",b);
}
function delMailML(c,a,d,b)
{
var f=b.nodeType==9?(b.defaultView||b.parentWindow):b,e=QMMailList.getCBInfo(f);
configPreRmMail(e,'rmMail');
rmMail(d=="PerDel"?1:0,e);
if(d!="PerDel")
{
maillistCheckGrpSendSkipSelf(e);
}
return;
}
function maillistCheckGrpSendSkipSelf(a)
{
if("1"==a.sFid&&1==a.oMail.length)
{
var c=a.oMail[0];
var b=c.oChk.getAttribute("fa"),d=c.oChk.getAttribute("sh");
var e=d.split(',');
checkGrpSendSkipSelf(b,e);
}
}
function reportSpamML(b,a)
{
var d=a.nodeType==9?(a.defaultView||a.parentWindow):a,c=QMMailList.getCBInfo(d);
configPreRmMail(c,'spammail');
(b?reportSpamJson:reportNoSpamJson)({bBlackList:true},c);
return false;
}
var QMReadedItem={};
QMReadedItem.addItem=function(a){
if(!getMainWin().gMailItems)
{
getMainWin().gMailItems=[];
}
getMainWin().gMailItems.push(a);
};
QMReadedItem.getItems=function(){
return getMainWin().gMailItems||[];
};
QMReadedItem.save=function(a){
getMainWin().goReadedItemImg=a;
};
QMReadedItem.load=function(){
return getMainWin().goReadedItemImg;
};
QMReadedItem.disp=function(a){
if(!a)
{
return;
}
var c=a.type=="checkbox"?a.parentNode:GelTags("input",a)[0].parentNode,b=c.firstChild;
if(b.tagName!="IMG")
{
insertHTML(c,"afterBegin",T(['<img src="$path$ico_grouplight.gif" class="showarrow"',' title="\u8FD9\u662F\u60A8\u6700\u8FD1\u9605\u8BFB\u7684\u4E00\u5C01\u90AE\u4EF6" />']).replace({path:getPath("image")}));
b=c.firstChild;
}
show(this.load(),false);
show(b,true);
this.save(b);
};
QMReadedItem.read=function(a){
if(a&&a.tagName==="U")
{
fireMouseEvent(a,"click");
}
else{
if(!this.load())
{
return false;
}
fireMouseEvent(GelTags("table",this.load().parentNode.parentNode)[0].parentNode,"click");
}
return true;
};
QMReadedItem.check=function(a){
if(!this.load())
{
return false;
}
var b=this.load().nextSibling;
b.checked=!b.checked;
doCheck(null,b,a);
return true;
};
QMReadedItem.move=function(a){
var d=this.getItems(),b=d.length,c=-1;
if(b==0)
{
return false;
}
if(this.load()!=null)
{
var e=QMReadedItem.load().nextSibling;
for(var f=b-1;f>=0;f--)
{
if(e==d[f])
{
c=f;
break;
}
}
}
c+=a?1:-1;
if(c>-1&&c<b)
{
this.disp(d[c]);
scrollIntoMidView(d[c],getMainWin().document.body,false);
return true;
}
return false;
};
function listMouseOver(a)
{
var b=this;
if(b.className.indexOf(" B")==-1&&getStyle(b,"backgroundColor")!="#f3f3f3"&&b.getAttribute("colorchange")!="none")
{
b.style.backgroundColor="#f3f3f3";
}
if(a)
{
var c=getEventTarget(a);
while(c&&c!=b&&c.className!='tagbgSpan')
{
c=c.parentNode;
}
if(c&&c!=b)
{
QMTag.showTagClose(c,1);
}
}
}
function listMouseOut(a)
{
var b=this;
if((!a||!isObjContainTarget(b,a.relatedTarget||a.toElement))&&b.style.backgroundColor&&b.getAttribute("colorchange")!="none")
{
b.style.backgroundColor="";
}
if(a)
{
var c=getEventTarget(a);
while(c&&c!=b&&c.className!='tagbgSpan')
{
c=c.parentNode;
}
if(c&&c!=b)
{
QMTag.showTagClose(c,0);
}
}
}
function listMouseEvent(a)
{
addEvents(a,{contextmenu:function(b){
listContextMenu.call(a,b);
},mouseover:function(b){
listMouseOver.call(a,b);
},mouseout:function(b){
listMouseOut.call(a,b);
}});
}
function listContextMenu(a)
{
var b=this;
mailRightMenu(b,a);
preventDefault(a);
}
function GetListMouseClick(a,b)
{
return function(c){
ListMouseClick(c,a||window,b);
};
}
function ListMouseClick(_aoEvent,_aoWin,_asFolderId)
{
var _oTargetObj,_oEvent=_aoEvent||_aoWin.event;
if(!(_oTargetObj=getEventTarget(_oEvent)))
{
return;
}
var _nFoldId=parseInt(_asFolderId);
if(_oTargetObj.name=="mailid"||(_nFoldId>201012&&_nFoldId<205012))
{
if(!getGlobalVarValue('TIP_46'))
{
requestShowTip('gotnomail',46,_aoWin,function(_asParam,_aoXmlObj){
setGlobalVarValue('TIP_46',1);
return true;
});
}
return doCheck(_oEvent);
}
if(_oTargetObj.className.indexOf("cir")==0)
{
var _sFuncCode=GelTags("table",_oTargetObj.parentNode.parentNode)[0].parentNode.onclick.toString().split("{")[1].split("}")[0].replace(/event/ig,"{shiftKey:true}");
if(/\WRD/.test(_sFuncCode))
{
return eval(_sFuncCode);
}
else{
_sFuncCode=GelTags("table",_oTargetObj.parentNode.parentNode)[0].parentNode.onclick.toString().replace(/.*{/g,"").replace(/}.*/g,"").replace(/event/ig,"{shiftKey:true}");
return eval(_sFuncCode);
}
}
}
function listInitForComm(b,a)
{
var g,e=GelTags("div"),c=doCheck,f,d;
g=b?b:"M";
for(var h=e.length-1;h>=0;h--)
{
f=e[h];
if(f.className!=g)
{
continue;
}
if(b=="ft")
{
f=GelTags("table",f)[0];
}
d=GelTags("input",f)[0];
if(!d||d.type!="checkbox")
{
continue;
}
d.title="\u6309\u4F4Fshift\u70B9\u51FB\u4E0D\u540C\u7684\u52FE\u9009\u6846 \u53EF\u65B9\u4FBF\u5FEB\u6377\u591A\u9009";
addEvent(d,"click",c);
if(!a)
{
listMouseEvent(f);
}
}
}
function modifyFolder(a,b)
{
getMainWin().location.href=T(['/cgi-bin/foldermgr?sid=$sid$&fun=detailpop&t=pop_detail','&folderid=$folderid$&acctid=$acctid$']).replace({sid:getSid(),folderid:a,acctid:b});
return false;
}
function recvPopHidden(a)
{
getMainWin().setTimeout(function(){
if(!a)
{
getTop().reloadFrmLeftMain(false,true);
}
else{
var c="iframeRecvPopHidden";
createBlankIframe(getMainWin(),{id:c});
var d=["/cgi-bin/mail_list?sid=",getSid(),"&folderid=",a,"&t=recv_pop_hidden"].join("");
try{
F(c,getMainWin()).location.replace(d);
}
catch(b)
{
S(c,getMainWin()).src=d;
}
}
},10000);
}
function recvPop(c,b,a)
{
recvPopCreat(c,b);
if(S("tips",a))
{
S("tips",a).innerHTML=T(['<img src="$images_path$ico_loading3.gif" align=absmiddle>',' \u6B63\u5728\u6536\u53D6...&nbsp;\u7CFB\u7EDF\u5C06\u5728\u540E\u53F0\u81EA\u52A8\u6536\u53D6\uFF0C\u60A8\u53EF\u4EE5\u79BB\u5F00\u6B64\u9875\u9762\uFF0C\u7A0D\u540E\u56DE\u6765\u67E5\u770B\u6536\u53D6\u7ED3\u679C\u3002']).replace({images_path:getPath("image",true)});
}
recvPopHidden(b);
}
function recvPopCreat(a)
{
getActionWin().location=["/cgi-bin/foldermgr?sid=",getSid(),"&fun=recvpop&acctid=",a].join("");
}
function recvPopAll()
{
getActionWin().location=["/cgi-bin/foldermgr?sid=",getSid(),"&fun=recvpopall"].join("");
try{
setTimeout(function(){
reloadFrmLeftMain(false,true);
},3000);
}
catch(a)
{
}
return false;
}
function setPopFlag(b,a,c)
{
if(a=="recent")
{
setPopRecentFlag(b,c);
}
}
function setPopRecentFlag(a,b)
{
runUrlWithSid(["/cgi-bin/foldermgr?sid=",getSid(),"&fun=pop_setting&acctid=",a,"&recentflag=",b].join(""));
}
function checkPopMailShow(a)
{
var b=["@yahoo.com.cn","@sina.com","@tom.com","@gmail.com"],c=a.toLowerCase();
for(var d=0;d<b.length;d++)
{
if(c.indexOf(b[d])>=0)
{
return true;
}
}
return false;
}
function setBeforeUnloadCheck(d,e,c,b,a)
{
var f=["input","select","textarea"];
d=d||window;
a=a?(typeof (a)=="string"?S(a,d):a):d.document;
d.gbIsBeforeUnloadCheck=true;
E(f,function(g){
var h=d[g+"_save"]=[];
E(GelTags(g,a),function(j,i){
h.push(j.value+j.checked);
j.setAttribute("saveid",i);
});
});
if(!d.onsetbeforeunloadcheck)
{
d.onsetbeforeunloadcheck=function(){
if(d.gbIsBeforeUnloadCheck)
{
for(var n=0,g=f.length;n<g;n++)
{
var m=f[n],k=m+"_save",h=GelTags(m,a);
for(var o=0,p=h.length;o<p;o++)
{
var l=h[o].getAttribute("saveid");
if(l!=null&&h[o].getAttribute("nocheck")!="true"&&d[k][l]!=(h[o].value+h[o].checked))
{
return e?e:"\u60A8\u4FEE\u6539\u7684\u8BBE\u7F6E\u5C1A\u672A\u4FDD\u5B58\uFF0C\u786E\u5B9A\u8981\u79BB\u5F00\u5417\uFF1F";
}
}
}
}
};
gbIsIE?(d.document.body.onbeforeunload=d.onsetbeforeunloadcheck):d.document.body.setAttribute("onbeforeunload","return onsetbeforeunloadcheck();");
}
E(b||["cancel"],function(g){
addEvent(typeof (g)=="string"?S(g,d):g,"mousedown",function(){
d.gbIsBeforeUnloadCheck=false;
});
});
E(GelTags("form",d.document),function(g){
addEvent(g,"submit",function(){
d.gbIsBeforeUnloadCheck=false;
});
if(!g._submit)
{
g._submit=g.submit;
g.submit=function(){
d.gbIsBeforeUnloadCheck=false;
this._submit();
};
}
});
}
function popErrProcess(d,e,a,b,c,f)
{
if(d!=null)
{
msgBox(d,e,a,b);
}
if(f!=null)
{
getMainWin().ShowPopErr(f,c);
}
showSubmitBtn();
}
function showSubmitBtn()
{
var a=S("submitbtn",getMainWin());
if(a)
{
a.disabled=false;
}
}
function showPopSvr()
{
show(S("popsvrTR",getMainWin()),true);
}
function setTaskId(a)
{
try{
getMainWin().document.checkFrom.taskid.value=a;
}
catch(b)
{
}
}
function showQuickReply(a)
{
show(S('quickreply',getMainWin()),a);
show(S('upreply',getMainWin()),!a);
runUrlWithSid("/cgi-bin/getcomposedata?Fun=setshowquickreply&isShowQuickReply="+(a?0:1));
}
function hiddenReceipt(a)
{
show(S("receiptDiv",a),false);
}
function switchOption(a)
{
var b=[["<input type='button' class='qm_ico_quickup' title='\u9690\u85CF' />",true],["<input type='button' class='qm_ico_quickdown' title='\u663E\u793A\u66F4\u591A\u64CD\u4F5C' />",false]][S("trOption",a).style.display=="none"?0:1];
S("aSwitchOption",a).innerHTML=b[0];
show(S("trOption",a),b[1]);
}
function checkPerDel(a)
{
delMail("PerDel",a);
}
function delMail(b,a)
{
rmMail(b=="PerDel"?1:0,a.QMReadMail.getCBInfo(a));
}
function setMailType(d,b,a,c)
{
var e=S("mail_frm",c);
e.s.value=["readmail_",b?(a?"group":d):("not"+d),getMainWin().newwinflag?"_newwin":""].join("");
e.action="/cgi-bin/mail_mgr?sid="+getSid();
e.mailaction.value="mail_spam";
e.isspam.value=b;
e.reporttype.value=d=="cheat"?"1":"";
submitToActionFrm(e);
}
function getAddrSub(b)
{
var a=b.indexOf("@");
if(a>-1)
{
var d=b.substr(0,a);
var c=b.substr(a);
return subAsiiStr(d,18,'...')+subAsiiStr(c,18,'...');
}
else{
debug("name+dom"+b);
return subAsiiStr(b,36,'...');
}
}
function getRefuseText(a)
{
var b=T(['<input type="checkbox" name="$TNAME$" id="$TID$" $TCHECK$>\u5C06<label for="$TID$">$TVALUE$</label>\u52A0\u5165\u9ED1\u540D\u5355']);
var e;
var g="";
var d="";
for(e in a)
{
var h="refuse";
if(e>0)
{
h="refuse"+e;
d="<br>";
}
var c;
if(a[e]!="\u53D1\u4EF6\u4EBA")
c="&lt;"+getAddrSub(a[e])+"&gt;";
else c=a[e];
var f="";
debug("ITEM: "+a[e]);
g+=d+b.replace({TNAME:h,TID:h,TVALUE:c,TCHECK:f});
}
debug("RET Text"+g);
return g;
}
function reportSpam(c,b,e,d,a)
{
var n=e||(window==getTopWin()?getMainWin():window);
if(!S("mail_frm",n))
{
var k=QMMailList.getCBInfo(n),j,i=0,h=k.oMail.length,l={};
if(h==0)
{
showError(gsMsgNoMail);
return false;
}
for(var f=0;f<h;f++)
{
j=k.oMail[f];
if(j.bSys)
{
}
i+=j.bDft?1:0;
if(j.sSEmail.indexOf("@groupmail.qq.com")!=-1)
{
c=true;
}
else if(j.sSEmail.indexOf("10000@qq.com")!=-1)
{
c=true;
}
if(typeof l.sender=="undefined")
{
l.sender=j.sSEmail;
l.nickname=j.sSName;
}
else if(l.sender!=j.sSEmail)
{
l.sender="";
}
}
if(i==h)
{
d=1;
}
else{
for(f=0;f<h;f++)
{
j=k.oMail[f];
}
k=QMMailList.getCBInfo(n);
QMMailList.selectedUI(k);
}
}
if(l)
debug("Has nick and sender "+l.sender);
else debug("No nick and sender");
var q=new Array();
q[0]="\u53D1\u4EF6\u4EBA";
if(l&&l.sender&&l.sender.indexOf(',')<0)
{
q[0]=l.sender;
}
var g=0;
if(a)
{
if(a[0].length>0)
q[g++]=a[0];
if(a[1])
q[g++]=a[1];
}
var m=T(['<div>','<input type="radio" name="reporttype" id="r$value$" value="$value$" $checked$>','<label for="r$value$">$content$</label>','</div>']);
var p=(d!==1?["<div style='padding:10px 10px 0 25px;text-align:left;'>","<form id='frm_spamtype'>","<div style='margin:3px 0 3px 3px'><b>\u8BF7\u9009\u62E9\u8981\u4E3E\u62A5\u7684\u5783\u573E\u7C7B\u578B\uFF1A</b></div>",m.replace({value:(b?11:8),checked:"checked",content:"\u5176\u4ED6\u90AE\u4EF6"}),m.replace({value:(b?10:4),checked:"",content:"\u5E7F\u544A\u90AE\u4EF6"}),m.replace({value:(b?9:1),checked:"",content:"\u6B3A\u8BC8\u90AE\u4EF6"}),"<div style=\"padding:5px 0 2px 0;\">",(c?"&nbsp;":getRefuseText(q)),"</div><div style='margin:10px 3px 0px 3px' class='addrtitle' >\u6E29\u99A8\u63D0\u793A\uFF1A\u6211\u4EEC\u5C06\u4F18\u5148\u91C7\u7EB3\u51C6\u786E\u5206\u7C7B\u7684\u4E3E\u62A5\u90AE\u4EF6\u3002</div>","</form>","</div><div style='padding:3px 15px 12px 10px;text-align:right;'>","</div>"]:["<div class='cnfx_content'>","<img style='float:left; margin:5px 10px 0;' src='",getPath("image"),"ico_question.gif' />","<div class='b_size' style='padding:10px 10px 0 0;margin-left:65px;line-height:1.5;height:80px;text-align:left;'>","<form id='frm_spamtype'>","<strong>\u60A8\u8981\u4E3E\u62A5\u8FD9\u4E2A\u6F02\u6D41\u74F6\u5417\uFF1F</strong><br>","<div style=\"display:none\">",m.replace({value:8,checked:"checked",content:""}),"</div>","\u4E3E\u62A5\u4EE5\u540E\uFF0C\u60A8\u5C06\u4E0D\u518D\u6536\u5230\u8FD9\u4E2A\u6F02\u6D41\u74F6\u7684\u56DE\u5E94\u3002","</form>","</div></div><div class='cnfx_btn'>","</div>"]).join(""),o=(['<a class="btn_blue" id="btn_ok" href="javascript:;">\u786E\u5B9A</a>','<a class="btn_gray" id="btn_cancel" href="javascript:;">\u53D6\u6D88</a>']).join("");
new (getTop().QMDialog)({sId:"reportSpam",sTitle:d===1?"\u7838\u6389\u8FD9\u4E2A\u74F6\u5B50":"\u4E3E\u62A5\u5E76\u62D2\u6536\u9009\u4E2D\u90AE\u4EF6",sBodyHtml:p,sFootHtml:o,nWidth:450,nHeight:d===1?150:220,onload:function(){
var r=this;
addEvent(r.S("btn_ok"),"click",function(){
var t=S("mail_frm",getMainWin())||S("frm",getMainWin());
if(!t)
{
return;
}
t.s.value="readmail_spam";
t.isspam.value='true';
t.mailaction.value="mail_spam";
t.action='/cgi-bin/mail_mgr?sid='+getTop().getSid();
var w=r.S("frm_spamtype").reporttype,u=r.S("frm_spamtype").refuse,v=r.S("frm_spamtype").refuse1;
for(var y=0,s=w.length;y<s;y++)
{
if(w[y].checked)
{
t.reporttype.value=w[y].value;
break;
}
}
var x=new Array();
x[0]="0";
x[1]="0";
if((u&&u.checked)||(v&&v.checked))
{
t.s.value="readmail_reject";
}
if(v)
{
debug("Pro refuse OK* "+u.checked+" - "+v.checked);
if(u&&u.checked)
{
debug("what1? ---- ");
x[0]="1";
debug("SRe"+x[0]);
}
else{
debug("what2? ");
x[0]="0";
}
debug("sreject1 "+x[0]+x[1]);
if(v.checked)
x[1]="1";
else x[1]="0";
debug("sreject2 "+x[0]+x[1]);
}
else{
x[0]="1";
x[1]="1";
}
if(t.s_reject_what)
{
t.s_reject_what.value=x[0]+x[1];
debug("Reject method "+t.s_reject_what.value);
}
submitToActionFrm(t);
r.close();
});
addEvent(r.S("btn_cancel"),"click",function(){
r.close();
});
},onshow:function(){
this.S("btn_cancel").focus();
}});
return false;
}
function setSpamMail(b,a,c)
{
var d=c||(window==getTopWin()?getMainWin():window);
if(b&&!a)
{
return reportSpam(null,null,d);
}
setMailType("spam",b,a,d);
}
function setCheatMail(b,a)
{
setMailType("cheat",b,a);
}
function doReject(b,a,d,c)
{
var f="\u6B64\u90AE\u4EF6\u5730\u5740";
if(c)
{
f="<"+c+">";
}
var e=S("mail_frm",d);
if(e.s_reject_what)
{
e.s_reject_what.value="10";
}
if(confirm("\u7CFB\u7EDF\u4F1A\u628A"+f+"\u653E\u5165\u201C\u9ED1\u540D\u5355\u201D\u4E2D\uFF0C\u60A8\u5C06\u4E0D\u518D\u6536\u5230\u6765\u81EA\u6B64\u5730\u5740\u7684\u90AE\u4EF6\u3002\n\n\u786E\u5B9A\u8981\u62D2\u6536\u6B64\u53D1\u4EF6\u4EBA\u7684\u90AE\u4EF6\u5417\uFF1F"))
{
setMailType("reject",b,a,d);
}
}
function setFolderReaded(a,b,c)
{
var e=b?getGroupUnread(b):getFolderUnread(a);
if(e<1)
{
return showError("\u6587\u4EF6\u5939\u5185\u6CA1\u6709\u672A\u8BFB\u90AE\u4EF6");
}
var g=getSid(),f=unikey("allread"),d=function(){
QMAjax.send("/cgi-bin/mail_mgr?mailaction=read_all&t=unreadmail_reg_data&loc=setFolderUnread,,,32",{method:"POST",content:T('sid=$sid$&folderid=$folderid$&groupid=$groupid$').replace({sid:g,folderid:a,groupid:b}),onload:function(h,i){
if(h&&i.indexOf("mark_allmail_ok")>-1)
{
reloadFrmLeftMain(true,!!getMainWin()[f]);
showInfo("\u6587\u4EF6\u5939\u6807\u4E3A\u5DF2\u8BFB\u64CD\u4F5C\u6210\u529F");
}
else{
showError("\u6587\u4EF6\u5939\u6807\u4E3A\u5DF2\u8BFB\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
}
}});
};
getMainWin()[f]=1;
if(a!=1)
{
d();
}
else{
confirmBox({title:"\u90AE\u4EF6\u6807\u8BB0\u63D0\u793A",msg:"\u60A8\u786E\u5B9A\u8981\u5C06\u8BE5\u6587\u4EF6\u5939\u4E2D\u7684\u672A\u8BFB\u90AE\u4EF6\u6807\u4E3A\u5DF2\u8BFB\uFF1F",onreturn:function(h,i){
if(!h)
{
return;
}
QMAjax.send("/cgi-bin/mail_mgr?mailaction=read_all&t=unreadmail_reg_data&loc=setFolderUnread,,,32",{method:"POST",content:T('sid=$sid$&folderid=$folderid$&groupid=$groupid$').replace({sid:g,folderid:a,groupid:b}),onload:function(j,k){
if(j)
{
reloadLeftWin();
reloadFrm(getTop().getMainWin());
getTop().showInfo("\u6587\u4EF6\u5939\u6807\u4E3A\u5DF2\u8BFB\u64CD\u4F5C\u6210\u529F");
}
}});
}});
}
}
function addContentMouseEvent(a,b)
{
if(!a)
{
return;
}
else{
var c=getTop().getDomWin(a);
addEvents(a,{mouseover:function(d){
var k=getEventTarget(d),f;
if(attr(k,"t")=="5")
{
c.QMReadMail.addCalEvent(k,d,b);
f=true;
}
else if(attr(k,"t")=="7")
{
}
if(!f)
{
return;
}
try{
var m=getTop(),l=m.calcPos(k),i=m.S("showcalpanel",m.getMainWin()),j=m.calcPos(i),g=m.S("contentDiv",m.getMainWin())||m.parents("div.qm_converstaion_body",k)[0],h=m.calcPos(g);
if(g&&j[2]>h[2])
{
i.style.top=l[2]-j[2]+"px";
}
}
catch(n)
{
}
},mouseout:function(d){
var e=getEventTarget(d);
if(attr(e,"t")=="5")
{
c.QMReadMail.hideCalEvent(e,d);
}
else if(attr(e,"t")=="7")
{
}
},mousedown:function(d){
var e=getEventTarget(d);
if(attr(e,"t")=="7")
{
}
}});
}
}
function linkMaker(c,b)
{
var f="([a-z0-9.!#$%&'+/=?^_`{|}~-]{3,}@(?:[A-Z0-9-]+\\.)+[A-Z]{2,4})",g=['(','(?:https?:\\/\\/|www\d{0,3}[.]|[a-z0-9.\\-]+[.][a-z]{2,4}\\/)','(?:','(?:&amp;amp;)','|','(?:&amp;)','|','[^\\s`!()\uFF08\uFF09\\[\\]{};\'"<>\u201C\u201D\u2018\u2019\u3002\uFF0C\uFF1B]','|','(?:[(\uFF08][^\\s()\uFF08\uFF09<>]+[)\uFF09])','|','(?:[(\uFF08][^\\s()\uFF08\uFF09<>]*?[(\uFF08][^\\s()\uFF08\uFF09<>]*?[)\uFF09][)\uFF09])',')+','(?:','(?:[(\uFF08][^\\s()\uFF08\uFF09<>]+[)\uFF09])','|','(?:[(\uFF08][^\\s()\uFF08\uFF09<>]*?[(\uFF08][^\\s()\uFF08\uFF09<>]*?[)\uFF09][)\uFF09])','|','[^\\s`!()\uFF08\uFF09\\[\\]{};:\'".,<>?\u201C\u201D\u2018\u2019\u3002\uFF0C\uFF1B]',')',')'].join(""),h=['(','[=\\u2248]?','(?:','(?:\uFF08\\+?\\d{1,5}\\-?\uFF09|\uFF08\\+?\\d{1,5}\\-?|\\(\\+?\\d{1,5}\\-?\\)|\\(\\+?\\d{1,5}\\-?|\\+?\\d{1,5}\\-?)?','(?:','1\\d{3}(?:\\-?\\d{3,4}){2}','|','(?:[(\uFF08]?\\d{2,4}[)\uFF09]?)?\\d{3,5}\\-?\\d{3,5}(?:\\-?(?:\\d{1,8}|\uFF08\\d{1,8}\uFF09|\\(\\d{1,8}\\)))?',')',')','(?:(?![\\d\\-\\+\\*\\/=\\u2248]))',')'].join(""),e=(/((?!0000)[0-9]{4}(?:[-/.]{1})?(?:(?:0?[1-9]|1[0-2])(?:[-/.]{1})?(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])(?:[-/.]{1})?(?:29|30)|(?:0?[13578]|1[02])(?:[-/.]{1})?31)|(?!0000)[0-9]{4}(?:[-/\u5E74]{1})(?:(?:0?[1-9]|1[0-2])\u6708(?:0?[1-9]|1[0-9]|2[0-8])\u65E5|(?:0?[13-9]|1[0-2])\u6708(?:29|30)\u65E5|(?:0?[13578]|1[02])\u670831\u65E5)|(?!\u5E74)(?:(?:0?[1-9]|1[0-2])\u6708(?:0?[1-9]|1[0-9]|2[0-8])\u65E5|(?:0?[13-9]|1[0-2])\u6708(?:29|30)\u65E5|(?:0?[13578]|1[02])\u670831\u65E5)|(?![/-])(?:(?:0?[1-9]|1[0-2])(?:[-/.]{1})?(?:0?[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])(?:[-/.]{1})?(?:29|30)|(?:0[13578]|1[02])(?:[-/.]{1})?31))\b/g).source;
function a(j)
{
var l=12,n=j||"",m=[],k=n.length/l;
for(var o=0;o<k;o++)
{
m[o]=n.substr(o*l,l);
}
return m.join("<wbr>");
}
function d(j)
{
var k=0,n=j;
for(var o=0,p=n.length;o<p;o++)
{
if(/\d/.test(n.charAt(o)))
k++;
}
if(k>=5&&k<=20)
{
var m=n.split(/(\s|-)/);
m=m.slice(m.length-3);
if(m.length>0)
{
for(var o=0,p=m.length;o<p;o++)
{
if(m[o].length>2)
{
return true;
}
}
}
else{
return true;
}
}
return false;
}
return c.replace(new RegExp([g,f,e,h].join("|"),"ig"),function(l,k,j,i,m){
var p;
if(k)
{
var o=l.indexOf("http")!=0?"http://"+l:l;
return ['<a href="',o,'">',a(htmlDecode(l)).replace("&","&amp;"),'</a>'].join("");
}
else if(j)
{
return ['<a href="mailto:',l,'">',a(l),'</a>'].join("");
}
else if(i)
{
if(b)
{
var n=b.parentNode.firstChild,q=n.innerText||n.textContent||n.nodeValue||"";
if(q.charAt(q.length-1)!=":"&&/((?!0000)[0-9]{4}([-/]{1})(?:(?:0?[1-9]|1[0-2])(?:[-/]{1})(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])(?:[-/]{1})(?:29|30)|(?:0?[13578]|1[02])(?:[-/]{1})31)|(?!0000)[0-9]{4}(?:[-/\u5E74]{1})(?:(?:0?[1-9]|1[0-2])\u6708(?:0?[1-9]|1[0-9]|2[0-8])\u65E5|(?:0?[13-9]|1[0-2])\u6708(?:29|30)\u65E5|(?:0?[13578]|1[02])\u670831\u65E5)|(?!\u5E74)(?:(?:0?[1-9]|1[0-2])\u6708(?:0?[1-9]|1[0-9]|2[0-8])\u65E5|(?:0?[13-9]|1[0-2])\u6708(?:29|30)\u65E5|(?:0?[13578]|1[02])\u670831\u65E5)|(?![/-])(?:(?:0?[1-9]|1[0-2])(?:[-/]{1})(?:0?[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])(?:[-/]{1})(?:29|30)|(?:0[13578]|1[02])(?:[-/]{1})31))/g.test(l))
{
var r=c.substring(arguments[arguments.length-2]+l.length,arguments[arguments.length-2]+l.length+6);
!r.match(/\s?\d\d:\d\d/g)&&(r="");
p="<span style='border-bottom:1px dashed #ccc;' t='5' times='"+r+"' >"+l+"</span>";
}
else{
p=l;
}
}
else{
p=l;
}
}
else if(m)
{
p=l;
}
return p;
});
}
function linkIdentify(a)
{
if(!a||a.tagName=="A"||a.tagName=="SCRIPT"||a.tagName=="STYLE"||a.className=="qqmailbgattach"||a.tagName=="PRE"||a.tagName=="CODE")
{
return;
}
for(var c=a.firstChild,f;c;c=f)
{
f=c.nextSibling;
linkIdentify(c);
}
if(a.nodeType==3)
{
var e=a.nodeValue.replace(/&/g,'&amp;').replace(/</g,"&lt;").replace(/>/g,"&gt;"),d=linkMaker(e,a);
if(e!=d)
{
var b=false;
if(a.previousSibling)
{
b=insertHTML(a.previousSibling,"afterEnd",d);
}
else{
b=insertHTML(a.parentNode,"afterBegin",d);
}
if(b)
{
removeSelf(a);
}
}
}
}
function _isLinkNeedSwap(b)
{
var d=b.href||"",a=b.ownerDocument,c=(a.parentWindow||a.defaultView).location;
return (!b.onclick&&d&&d.indexOf("javascript:")!=0&&d.indexOf("#")!=0);
}
function swapLink(c,b,a,d)
{
var f=c.ownerDocument?c:S(c,a);
if(f)
{
function e(g)
{
if(_isLinkNeedSwap(g))
{
g.target="_blank";
g.onclick=function(){
return openExtLink.call(this,b);
};
}
}
linkIdentify(f);
addContentMouseEvent(f,d);
E(GelTags("a",f),e);
E(GelTags("area",f),e);
E(GelTags("form",f),function(g){
g.onsubmit=function(){
var h=a.location;
if(h.getParams()["filterflag"]=="true"||this.action)
{
this.target="_blank";
return true;
}
showError(T(['\u51FA\u4E8E\u5B89\u5168\u8003\u8651\u8BE5\u64CD\u4F5C\u5DF2\u88AB\u5C4F\u853D [<a onclick="','setTimeout( function() {','goUrlMainFrm(\x27$url$&filterflag=true\x27);','showInfo(\x27\u53D6\u6D88\u5C4F\u853D\u6210\u529F\x27);','});','" style="color:white;" >\u53D6\u6D88\u5C4F\u853D</a>]']).replace({url:h.pathname+h.search}));
return false;
};
});
}
}
function preSwapLink(a,b)
{
var c=getEventTarget(a);
if(c&&{"A":1,"AREA":1}[c.tagName]&&_isLinkNeedSwap(c))
{
openExtLink.call(c,b)&&window.open(c.href);
preventDefault(a);
}
}
function swapImg(d,a,c,b)
{
}
function openSpam(a)
{
a=a||window;
if(true||confirm("\u6B64\u90AE\u4EF6\u7684\u56FE\u7247\u53EF\u80FD\u5305\u542B\u4E0D\u5B89\u5168\u4FE1\u606F\uFF0C\u662F\u5426\u67E5\u770B\uFF1F"))
{
a.location.replace(appendToUrl(a.location.href,"&disptype=html&dispimg=1&clickshowimage=1"));
}
}
function openHttpsMail(a)
{
a.location.replace(appendToUrl(a.location.href,"&dispimg=1"));
}
function copyToClipboard(a)
{
try{
if(gbIsFF)
{
netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(a);
}
else{
var b=S("copyinputcontainer");
if(!b)
{
insertHTML(document.body,"beforeEnd",'<input id="copyinputcontainer" style="position:absolute;top:-1000px;left:-1000px;"/>');
b=S("copyinputcontainer");
}
b.value=a;
b.select();
document.execCommand('Copy');
}
}
catch(c)
{
alert(T('\u60A8\u7684\u6D4F\u89C8\u5668\u5B89\u5168\u8BBE\u7F6E\u4E0D\u5141\u8BB8\u7F16\u8F91\u5668\u81EA\u52A8\u6267\u884C\u590D\u5236\u64CD\u4F5C\uFF0C\u8BF7\u4F7F\u7528\u952E\u76D8\u5FEB\u6377\u952E($cmd$+C)\u6765\u5B8C\u6210\u3002').replace({cmd:gbIsMac?"Command":"Ctrl"}));
return false;
}
return true;
}
function newCopyToClipboard(a)
{
if(window.clipboardData)
{
window.clipboardData.clearData();
clipboardData.setData("Text",a);
return true;
}
else if(navigator.userAgent.indexOf("Opera")!=-1)
{
window.location=a;
return true;
}
else if(window.netscape)
{
try{
netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
}
catch(f)
{
return false;
}
var b=Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
if(!b)
{
return false;
}
var j=Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
if(!j)
{
return false;
}
j.addDataFlavor("text/unicode");
var h=new Object();
var g=new Object();
var h=Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
h.data=a;
j.setTransferData("text/unicode",h,a.length*2);
var c=Components.interfaces.nsIClipboard;
if(!b)
{
return false;
}
b.setData(j,null,c.kGlobalClipboard);
return true;
}
else{
var i=S("qmdialog_container").children[0].id+"_authorCode";
if(!S(i))
{
if(S("authorCode"))
{
i="authorCode";
}
}
if(S(i))
{
S(i).select();
var d=document.execCommand('Copy');
S(i).blur();
return d;
}
}
return false;
}
function openExtLink(a)
{
var h=this;
if(h.href.indexOf("mailto:")==0&&h.href.indexOf("@")!=-1)
{
var r=["/cgi-bin/readtemplate?sid=",getSid(),"&t=compose&s=cliwrite&newwin=true&email=",h.href.split("mailto:")[1].split("?")[0]].join("");
try{
var q="",l="",j=[],d=h.href.split("mailto:")[1].split("?").length;
if(d>1)
{
j=h.href.split("mailto:")[1].split("?")[1].split("&");
for(var u=j.length-1;u>=0;u--)
{
if(j[u].split("=")[0].toLowerCase()=="subject")
{
r+="&pre_subject="+j[u].split("=")[1];
}
else if(j[u].split("=")[0].toLowerCase()=="body")
{
r+="&pre_body="+j[u].split("=")[1];
}
}
}
}
catch(t)
{
}
window.open(r);
return false;
}
else if(h.className=="qqmail_card_reply"||h.className=="qqmail_card_reply_btn")
{
var n=h.name,m=h.className,c=!!n,b=m.indexOf("birthcard")!=-1;
getMainWin().location=T('/cgi-bin/cardlist?sid=$sid$&t=$t$&s=$s$&today_tips=$tips$&loc=readmail,readmail,sendnewcard,1&ListType=$listtype$&email=$email$$newwin$').replace({sid:getSid(),t:c?"compose_card":"card",s:b?"replybirthcard":"",tips:m.indexOf("btn")!=-1?"112":"111",listtype:c?"No":"Cards&Cate1Idx=listall",email:n,newwin:getTop().bnewwin?"&newwin=true":""});
return false;
}
else if(h.className=="qqmail_postcard_reply_mobile")
{
var k=getMainWin().QMReadMail;
if(k)
{
getMainWin().location=T("/cgi-bin/readmail?sid=$sid$&mailid=$mailid$&t=compose&s=reply&disptype=html").replace({sid:getSid(),mailid:k.getMailId()});
}
return false;
}
else if(h.className=="qqmail_postcard_sendhelp_mobile")
{
window.open("http://service.exmail.qq.com/cgi-bin/help?subtype=1&&id=36&&no=1000696");
return false;
}
else if(/qqmail_shareCalendar_joinBtn/i.test(h.className)&&/\/cgi-bin\/calendar\?/i.test(h.href))
{
var s=h.href;
s=trim2(s);
QMAjax.send(s,{method:"POST",content:"sid="+getSid(),onload:function(e,i){
if(e)
{
if(/<!--cgi exception-->/ig.test(i))
{
var x=(/<!--cgierrorcode:-([\d]+)-->/ig.test(i)&&RegExp.$1);
if("821"==x)
{
showError("\u5BF9\u65B9\u5DF2\u505C\u6B62\u5171\u4EAB\u65E5\u5386");
}
else if("810"==x)
{
var w=(/<!--email:([\W\w]+?)-->/ig.test(i)&&RegExp.$1);
showError("\u8BF7\u767B\u5F55\u8D26\u53F7"+w+"\u91CD\u65B0\u52A0\u5165\u65E5\u5386");
}
else if("823"==x)
{
showError("\u9080\u8BF7\u90AE\u4EF6\u5DF2\u8FC7\u671F");
}
else if("2"==x)
{
var v=getTop();
v.goUrl(v,[v.location.protocol,"//",v.location.hostname,"/cgi-bin/loginpage"].join(""));
}
else{
showError("\u52A0\u5165\u5931\u8D25");
}
return;
}
showInfo("\u52A0\u5165\u6210\u529F");
}
else{
showError("\u52A0\u5165\u5931\u8D25");
}
}});
return false;
}
else if(h.className=="qqmail_card_reply_thanksbtn"||h.className=="qqmail_card_reply_thanks"||h.className=="qqmail_birthcard_reply_thanksbtn")
{
var n=h.name;
openComposeDlg("card",{sTitle:"\u7B54\u8C22\u597D\u53CB",sDefAddrs:n,bAddrEdit:true,sDefContent:"\u8C22\u8C22\u4F60\u7684\u8D3A\u5361\uFF01 \u4EE5\u540E\u8981\u5E38\u8054\u7CFB\u54E6\u3002",bContentEdit:true,sDefSubject:"\u8C22\u8C22\u4F60\u7684\u8D3A\u5361!",bRichEditor:false,nWidth:488,oncomplete:function(){
},bShowResult:true});
return false;
}
else if(h.className=="qqmail_postcard_reply")
{
goUrlMainFrm(T('/cgi-bin/readtemplate?sid=$sid$&t=compose_postcard&email=$email$').replace({sid:getSid(),email:h.name}),false);
return false;
}
else if(h.className=="qqmail_postcard_reply2")
{
var p='',o='',k=getMainWin().QMReadMail;
if(k)
{
try{
var g=(k.getSubMailWithDom?k.getSubMailWithDom(h):k.getMailInfo()).from;
p=g&&g.name||'';
o=g&&g.addr||'';
}
catch(t)
{
}
}
goUrlMainFrm(T('/cgi-bin/readtemplate?sid=$sid$&t=compose_postcard&email=$email$&reply=1&frname=$name$&fraddr=$addr$').replace({name:escape(p),addr:escape(o),sid:getSid(),email:h.name}),false);
return false;
}
else if(h.className=="qqmail_postcard_print")
{
var k=getMainWin().QMReadMail;
if(k)
{
window.open(T('/cgi-bin/readmail?sid=$sid$&t=print_haagendazs&s=print&filterflag=true&mailid=$mailid$').replace({sid:getSid(),mailid:k.getMailId()}));
}
return false;
}
else if(h.className=="qqmail_postcard_getmoreinfo")
{
var k=getMainWin().QMReadMail;
if(k)
{
window.open(T('/cgi-bin/today?t=haagendazs2010&sid=$sid$').replace({sid:getSid(),mailid:k.getMailId()}));
}
return false;
}
else if(h.hostname==getTop().location.hostname&&(h.pathname=="/cgi-bin/readtemplate"||h.pathname=="cgi-bin/readtemplate")&&h.search.indexOf("t=calendar")!=-1)
{
var k=getMainWin().QMReadMail;
if(k)
{
goUrlMainFrm(h.href,true);
}
return false;
}
if(h.hostname!=getTop().location.hostname)
{
if(h.href.indexOf("javascript:void(0)")>=0)
{
return false;
}
if(a!="preview"&&getMainWin().location.href.indexOf('/cgi-bin/readmail?')<0)
{
return true;
}
var f=h.parentNode;
while(f)
{
if(f.nodeType==1&&(f.id=="QQmailNormalAtt"||f.id=="attachment"))
{
return true;
}
f=f.parentNode;
}
window.open(T('$host$/cgi-bin/mail_spam?action=check_link&url=$url$&mailid=$mid$&spam=$spam$&r=$rand$').replace({mid:getMainWin().location.getParams()['mailid'],spam:a=="spam"?1:0,rand:Math.random(),url:escape(h.href),host:window.location.host.indexOf("exmail.qq.com")==-1?"":"//exmail.qq.com"}),"_blank");
return false;
}
return true;
}
function goPrevOrNextMail(a)
{
var b,c=getMainWin();
if(!!(b=S(["prevmail","nextmail"][a?1:0],c))&&!b.getAttribute("disabled"))
{
}
else if(!!(b=S(["prevpage","nextpage"][a?1:0],c))&&!b.getAttribute("disabled"))
{
c.location=b.href;
}
}
function goBackHistory()
{
var a=SN("readmailBack",getMainWin());
if(a.length>0&&isShow(a[0]))
{
fireMouseEvent(a[0],"click");
return true;
}
return false;
}
function MLIUIEvent(a,b,c)
{
var s=a.value,f=QMMailCache,d=f.isRefresh(b),j=a.parentNode;
while(j.tagName.toUpperCase()!="TABLE")
{
j=j.parentNode;
}
var l=GelTags("table",j)[0],r=GelTags("td",GelTags("tr",l)[0]),k=r[1],h=r[r.length-1];
a.setAttribute('init','true');
QMReadedItem.addItem(a);
if(h.className=="new_g")
{
h=r[6];
}
var n=GelTags("div",l),m;
for(var e=n.length-1;e>=0;e--)
{
if(n[e].className=="TagDiv")
{
m=n[e];
break;
}
}
if(f.hasData(s))
{
if(!d)
{
var g=f.getData(s);
if(a.getAttribute("unread")=="true")
{
f.addVar("unread",-1);
}
_setMailListFlag(a,j,false,g.reply);
_hideGroupNewReply(a,j);
if(g.star!=null)
{
setClass(h,g.star?"fg fs1":"fg");
f.addVar("star",g.star?1:-1);
}
if(g.oTagIds)
{
var p=GelTags("table",l),o=g.oTagIds,t,i={};
if(m)
{
for(var e=p.length-1;e>=0;e--)
{
if(t=p[e].getAttribute("tagid"))
{
i[t]=1;
}
}
for(var u in o)
{
if(o[u]===0)
{
QMTag.rmTagUI(m,u);
}
else if(!i[u])
{
QMTag.addTagUI(m,u,c,s,false);
}
}
}
}
}
else{
f.delData(s);
}
}
listMouseEvent(j);
h.title=h.className=="fg"?"\u6807\u8BB0\u661F\u6807":"\u53D6\u6D88\u661F\u6807";
addEvent(h,'click',function(v){
starMail(null,QMMailList.getCBInfo(b,s),"maillist");
return stopPropagation(v);
});
addEvent(j,"click",GetListMouseClick(b,c));
addEvent(j,"selectstart",preventDefault);
var q=l.rows[0].cells[1];
if(q.className.indexOf("fr")>-1)
{
loadJsFile(getPath("js")+getFullResSuffix("qmtip.js"),true);
addEvent(q,"mouseover",MLI._remarkTip);
addEvent(q,"mouseout",MLI._remarkTip);
}
addEvent(m,'click',function(v){
if(QMTag.readclose(v,QMMailList.getCBInfo(b,s)))
{
return stopPropagation(v);
}
});
dragML(j,a);
}
function MLI(b,a,c,d)
{
var l=SN("mailid",a),m=l[l.length-1],q=m.value,n=m.parentNode,k=QMMailCache,g=k.isRefresh(a);
while(n.tagName.toUpperCase()!="TABLE")
{
n=n.parentNode;
}
MLIUIEvent(m,a,c);
var h=m.getAttribute("uw")=="1",o=h?a.oPreUWMails:a.oPreMails,i=o.length,j=g?2:1,e=new Date()-new Date(parseInt(m.getAttribute("totime")))<2592000000,f=e&&m.getAttribute("unread")=="true"&&m.getAttribute("preload")!="false"&&i<j&&!rdVer.log(q);
if(f&&rdVer.isPre(c))
{
var r,p=m.getAttribute("gid");
r=rdVer.url(q,c,d,"",false,"",false,"",true);
if(r)
{
o.push(r);
}
}
if(getTop().gsReadedMailId==q)
{
QMReadedItem.disp(n);
recordReadedMailId(null);
}
}
function MLJump(b,c,d,a)
{
var h=SN("maillistjump",a.document),i="_MlJuMp_",f=parseInt(b)||0,g=parseInt(c)||0;
function e(j)
{
var l=getTop().QMMenu(j).S("txt"),k=parseInt(l.value);
if(isNaN(k))
{
l.select();
return showError("\u8BF7\u8F93\u5165\u8DF3\u8F6C\u7684\u9875\u6570");
}
k=Math.max(0,Math.min(k-1,g));
if(f==k)
{
l.select();
return showError("\u4F60\u8F93\u5165\u4E86\u5F53\u524D\u9875\u6570");
}
getTop().QMMenu(j).close();
goUrlMainFrm([d,'&page=',k,'&loc=mail_list,,jump,0'].join(''));
}
E(h,function(j){
if(!j.getAttribute(i))
{
j.setAttribute(i,"1");
addEvents(j,{click:function(k){
var o=unikey("mljump"),n=calcPos(j),m=185,l=40;
new (getTop().QMMenu)({sId:o,oEmbedWin:a,nWidth:m,nX:n[1]-m,nY:bodyScroll(a,"scrollHeight")-n[2]<l?(n[0]-l-13):n[2],bAutoClose:false,oItems:[{nHeight:l,sItemValue:MLJump._oTemplate.replace({id:o})}],onshow:function(){
this.S("txt").focus();
}});
addEvent(getTop().QMMenu(o).S("txt"),"keypress",function(p){
var q=p.keyCode||p.which;
if(q===13)
{
e(o);
}
else if((q<48||q>57)&&q!=8&&q!=9)
{
preventDefault(p);
}
});
addEvent(getTop().QMMenu(o).S("btn"),"click",function(p){
e(o);
});
preventDefault(k);
}});
}
});
}
MLJump._oTemplate=T(['<div style="position:absolute;">','<div class="addrtitle jumpmenusdjust" style="float:left;">\u8DF3\u8F6C\u5230\u7B2C <input id="txt" type="text" class="txt" style="width:30px;" /> \u9875</div>','<a id="btn" href="javascript:;" class="left button_gray_s" style="width:40px; margin:7px 0 0 5px; _display:inline;">&nbsp;\u786E\u5B9A&nbsp;</a>','</div>']);
function initDropML()
{
function d(r)
{
var t=calcPos(r),s=S('dragtitle'),p=s.offsetLeft,q=s.offsetTop;
return (t[1]>p&&t[3]<p&&t[2]>q&&t[0]<q)?r:null;
}
function b(q,p)
{
if(q&&q.id.indexOf('folder_')>=0)
{
var s=q.className,r=s.indexOf('toolbg')>-1;
if(p&&r)
{
setClass(q,s.replace(/\btoolbg\b/g,''));
}
else if(!r&&!p)
{
setClass(q,s+' toolbg');
}
}
}
var h=S('dragtitle'),k=S('OutFolder'),o='inidrop',f=BaseMailOper.getInstance(getMainWin()),a=QMDragDrop,n='mail_list';
if(k.getAttribute(o)=='true')
{
return false;
}
k.getAttribute(o,'true');
a.delGroup(n);
var j=null,c=false,l=null,g=null,e=null,m=/^([489]|personal|pop|tag)$/,i=new a.DropTarget(S('OutFolder'),{ondragover:function(p){
if(l==g)
{
return;
}
var t=l&&l.id||'',r=g&&g.id||'',u=l&&l.getAttribute('dp'),s=g&&g.getAttribute('dp'),q=g&&g.getAttribute('dr');
if(s)
{
showFolders(s,true,getTop());
}
if(u&&u!=s)
{
showFolders(u,false,getTop());
}
b(l,1);
b(g);
if(e)
{
clearTimeout(e);
}
c=q&&!m.test(q);
e=setTimeout(function(){
setClass(h,c?'drag_over':'drag_out');
e=null;
},50);
l=g;
},ondrop:function(p){
if(!g||!c)
{
return;
}
var r=f.getMailInfo().sFid,s=g.getAttribute('dr')||'';
ossLog("delay","all","stat=drag&opr="+s);
if(s=='6')
{
b(l,1);
l=null;
f.apply('spammail');
dragML._mbHasChecked=true;
return;
}
else if(m.test(s))
{
b(l,1);
l=null;
return;
}
else if(s.indexOf('tag_')>=0)
{
s=s.replace('tag','tid');
}
else if(s=='starred')
{
s='star';
}
else if((r==5||r==6)&&s==5)
{
s='predelmail';
dragML._mbHasChecked=true;
}
else if(parseInt(s))
{
s={5:'delmail'}[s]||'fid_'+s;
}
else{
return;
}
f.apply(s);
h.setAttribute('na','true');
var q=new qmAnimation({from:100,to:1});
q.play({speed:"slow",onaction:function(u,t){
setOpacity(h,u/100.0);
},oncomplete:function(u,t){
show(h,0);
setClass(h,'drag_out');
setOpacity(h,100);
b(l,1);
l=null;
}});
}},function(p,q,r){
if(gbIsIE)
{
var x=getEventTarget(r.event),s=/(folder_\w+_td|(personal|pop|tag)foldersDiv)/;
while(x&&!s.test(x.id))
{
x=x.parentNode;
}
g=x;
}
else if(g=d(S('OutFolder')))
{
var t=['personal','pop','tag'],u=null,v=null,w,y;
for(y=t.length-1;y>=0;y--)
{
if(u=d(S(t[y]+'foldersDiv')))
{
break;
}
}
if(u=u||d(S('SysFolderList')))
{
w=GelTags('li',u);
for(y=w.length-1;y>=0;y--)
{
if(v=d(w[y]))
{
break;
}
}
}
g=v||u;
}
return !!(l||g);
});
a.addGroup(n,i);
}
function dragML(b,a)
{
if(!S('OutFolder')||!QMDragDrop)
{
return;
}
var g=dragML,i='dragtitle',d=S(i);
if(!d)
{
insertHTML(getTop().document.body,'afterBegin','<div id="dragtitle" class="drag_out" style="display:none;"></div>');
d=S(i);
}
var f,e=new QMDragDrop.Draggable(b,{threshold:5,oTitle:d},{ondragstart:function(k){
g._mbHasChecked=a.checked==true;
a.checked=true;
var n=getMainWin(),l=BaseMailOper.getInstance(n),m=QMMailList.getCBInfo(n);
QMMailList.selectedUI(m);
l.setMailInfo(m);
d.innerHTML=['\u9009\u4E2D ',m.oMail.length,' \u5C01\u90AE\u4EF6'].join('');
ossLog("delay","all","stat=drag&c="+m.oMail.length);
f=gbIsIE?[0,0,0,0]:calcPos(n.frameElement);
d.style.left=f[3]+k.clientX+'px';
d.style.top=f[0]+k.clientY+'px';
d.setAttribute('na','');
show(d,1);
initDropML();
},ondrag:function(k){
d.style.left=f[3]+k.clientX+'px';
d.style.top=f[0]+k.clientY+'px';
},ondragend:function(k){
if(!d.getAttribute('na'))
{
show(d,0);
setClass(d,'drag_out');
}
if(!g._mbHasChecked)
{
a.checked=false;
var l=QMMailList.getCBInfo(getMainWin());
QMMailList.selectedUI(l);
}
}});
QMDragDrop.addGroup('mail_list',e);
var c=b.ownerDocument,h=c.parentWindow||c.defaultView,j=dragML._sMarkMainWin=dragML._sMarkMainWin||unikey('drag');
if(!h[j])
{
addEvent(h,'unload',function(){
if(d.releaseCapture)
{
d.releaseCapture();
}
show(d,0);
});
h[j]=1;
}
}
MLI._remarkTip=function(d){
var f=getTop(),e=arguments.callee,a=d.clientX,b=d.clientY,c=getEventTarget(d);
while(c&&c.tagName.toUpperCase()!="TD")
{
c=c.parentNode;
}
if(e._mnTimeout)
{
clearTimeout(e._mnTimeout);
e._mnTimeout=0;
}
if(d.type=="mouseout")
{
f.QMTip&&f.QMTip.showMailList(0,c.ownerDocument);
return;
}
e._mnTimeout=setTimeout(function(){
var i=f.GelTags("b",c.parentNode.cells[2]),h=i[i.length-1];
if(!f.QMTip||!h||(e._nClientX==a&&e._nClientY==b))
{
return;
}
e._nClientX=a;
e._nClientY=b;
var g=h.innerHTML.replace(/^\&nbsp;-\&nbsp;/,"").replace(/\&nbsp;/gi,"&nbsp; ").replace(/&lt;br\/?&gt;/g,'<br/>');
f.QMTip.showMailList(1,c.ownerDocument,g,a,b);
},250);
};
function MLI_A(a)
{
var d=GelTags("table",a),b=d.length,c=d[b-1],e=c.getAttribute("mailid");
if(QMMailCache.hasData(e))
{
if(!QMMailCache.isRefresh(window))
{
setClass(c,"i M");
}
else{
QMMailCache.delData(e);
}
}
listMouseEvent(c);
addEvent(c,"selectstart",preventDefault);
}
function _optMailListFlag(c,d,b,a)
{
if(!(c&&c.type=="checkbox"))
{
return false;
}
if(b==null)
{
return c.getAttribute("unread")=="true";
}
if(!d)
{
d=c.parentNode.parentNode.parentNode.parentNode;
}
if((c.getAttribute("unread")=="true")==!!b&&!a)
{
return b;
}
var g=c.getAttribute("gid");
if(g)
{
setGroupUnread(g,getGroupUnread(g)-1);
setGroupUnread("gall",getGroupUnread("gall")-1);
}
c.setAttribute("unread",b?"true":"false");
setClass(d,[b?"i F":"i M",c.checked?" B":""].join(""));
setClass(GelTags("table",d)[0],b?"i bold":"i");
var e=GelTags("div",d)[1];
if(!/(s[016789]bg)|(Rw)/.test(e.className))
{
var i=a?"r":c.getAttribute("rf"),h=c.getAttribute("isendtime"),f="Rr";
if(h)
{
f=h=="0"?"Rc":"Ti";
}
else if(b)
{
f="Ru";
}
else if(i)
{
f=i=="r"?"Rh":"Rz";
}
setClass(e,"cir "+f);
}
return b;
}
function _getMailListFlag(a)
{
return _optMailListFlag(a);
}
function _setMailListFlag(c,d,b,a)
{
return _optMailListFlag(c,d,b,a);
}
function _hideGroupNewReply(a,b)
{
if(!a||!a.getAttribute("gid"))
{
return false;
}
var c=GelTags("b",b)[0],d=c&&c.parentNode;
if(d&&d.className=="new_g")
{
d.style.visibility="hidden";
return true;
}
return false;
}
function getMailListInfo()
{
var a=getMainWin(),c=S("_ut_c",a),d=S("_ur_c",a),b=S("_ui_c",a);
return {totle:(c&&parseInt(c.innerHTML))||0,unread:(d&&parseInt(d.innerHTML))||0,star:(b&&parseInt(b.innerHTML))||0};
}
function setMailListInfo(c,a,b)
{
var f=getMainWin(),d=true,j=S("_ur",f),g=S("_ui",f),i=S("_ut",f),e;
if(!isNaN(c=parseInt(c)))
{
if(!!(e=S("_ur_c",f)))
{
e.innerHTML=Math.max(0,c);
show(j,c>0);
}
else{
d=false;
}
var h=S("tip_unread",f);
if(h)
{
h.innerHTML=c<0?parseInt(h.innerHTML)+c:c;
show(h,c);
}
}
if(!isNaN(a=parseInt(a)))
{
a=Math.max(0,a);
if(!!(e=S("_ui_c",f)))
{
e.innerHTML=a;
show(g,a!=0);
}
else{
d=false;
}
}
if(!isNaN(b=parseInt(b)))
{
a=Math.max(0,b);
if(!!(e=S("_ut_c",f)))
{
e.innerHTML=a;
show(i,a!=0);
}
else{
d=false;
}
}
show(S("_uc",f),isShow(j));
show(S("_ua",f),isShow(j));
return d;
}
function readMailFinish(c,d,a,b)
{
var m=getMainWin(),l=S("load_"+c,m),k,h;
QMMailCache.addData(c);
if(l)
{
show(l,false);
k=l.parentNode.previousSibling;
h=GelTags("input",k)[0];
}
else{
var j=GelTags("input",m.document);
for(var o=0,g=j.length;o<g;o++)
{
if(j[o].type=="checkbox"&&j[o].value==c)
{
h=j[o];
break;
}
}
k=h;
while(k.tagName.toUpperCase()!="TABLE")
{
k=k.parentNode;
}
}
var n=GelTags("table",k),e=false;
for(var f=n.length-1;f>=0;f--)
{
if(n[f].getAttribute("tagid"))
{
e=true;
break;
}
}
_hideGroupNewReply(h,k);
if(h&&_getMailListFlag(h))
{
_setMailListFlag(h,k,false);
setMailListInfo(getMailListInfo().unread-1);
if(h.getAttribute('star')=='1')
{
setFolderUnread('starred',getFolderUnread('starred')-1);
}
if(a&&parseInt(a)>0&&!e)
{
setFolderUnread(a,b?getGroupUnread("gall"):getMailListInfo().unread);
}
else{
reloadLeftWin();
}
}
}
function checkMail(a)
{
if(a=="")
{
showError("\u6DFB\u52A0\u7684\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A");
return false;
}
if(!a.match(/^[\.a-zA-Z0-9_=-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/))
{
showError("\u60A8\u8F93\u5165\u7684\u90AE\u7BB1\u5730\u5740\u4E0D\u6B63\u786E\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165");
return false;
}
return true;
}
function checkAndSubmit(a)
{
var b=S(a);
if(!checkMail(trim(b.value)))
{
b.focus();
return false;
}
submitToActionFrm(b.form);
}
function pushToDialogList(a)
{
var b=getTop();
if(!b.goDialogList)
{
b.goDialogList=new b.Object();
}
if(a)
{
b.goDialogList[a]=true;
}
}
function reportClickWeworkOfLeftBar()
{
var b=0;
try{
if(getTop().S('ww_new')&&getTop().S('ww_new').style.display!="none")
{
b=1;
}
getTop().S('ww_new').style.display="none";
}
catch(a)
{
}
QMAjax.send("/cgi-bin/readtemplate",{method:"POST",content:["sid=",getSid(),"&action=click_qywx_tab&first_click=",b].join(''),onload:function(c,d){
}});
}
function showDialogNewReadMail(b,c,a,d)
{
new (getTop().QMDialog)({sId:"addnewremind_qqmail",sTitle:"\u65B0\u5EFA\u63D0\u9192",sUrl:T("/cgi-bin/read_reminder?linkid=%linkid%&linktitle=%linktitle%&sid=%sid%&t=remind_edit&from=%from%","%").replace({sid:getSid(),linkid:b,linktitle:c,from:a}),nWidth:450,nHeight:477});
d&&rdVer(d,1);
}
function setRemindSpan(b,a)
{
getTop().S('remind_edit_'+b,a).innerHTML=(getTop().reminddetail["mailid:"+b]||"").replace(/linktitle=.*&sid=/g,function(c){
return c.replace(/\'/g,"&#039;");
});
}
function showSimpleRuleFilter(_asAddr,_asClickFrom)
{
if(!_asAddr)
{
showError("\u65E0\u6CD5\u83B7\u53D6\u53D1\u4EF6\u4EBA\u5730\u5740\uFF0C\u4E0D\u80FD\u521B\u5EFA\u89C4\u5219");
return;
}
var _oDialog=new (getTop().QMDialog)({sId:"addnewfilter_qqmail",sTitle:"\u5FEB\u6377\u521B\u5EFA\u6536\u4FE1\u89C4\u5219",sUrl:T("/cgi-bin/setting2?sid=$sid$&Fun=GetFolderList&CurFilterID=0&t=readmail_filter&fromaddr=$fromaddr$").replace({sid:getSid(),fromaddr:_asAddr}),nWidth:420,nHeight:240,onshow:function(){
var _oDialogWin=this.getDialogWin();
waitFor(function(){
try{
return S("jump",_oDialogWin);
}
catch(e)
{
}
},function(_abIsOk){
if(_abIsOk)
{
function _fInitFolderItem(_aoFolderList)
{
if(_aoFolderList.length)
{
_aoFolderList.push({bDisSelect:true,nHeight:10,sItemValue:'<hr/>'});
}
_aoFolderList.push({bDisSelect:false,nHeight:22,sId:"new",sItemValue:'\u65B0\u5EFA\u6587\u4EF6\u5939...'});
return _aoFolderList;
}
;function _fGetItemValue()
{
var _sIdx=_oQMSelect.get(2);
return _sIdx=="new"?"-1":_sIdx;
}
;function _fRestet()
{
_oQMSelect.set(_oUserFolder[0].sId,2);
}
;function _fAddOption(_asName,_asValue)
{
var _oNewItem={bDisSelect:false,nHeight:22,sId:_asValue,sItemValue:_asName};
if(_oUserFolder.length==1)
{
_oUserFolder=_fAddItem(_oUserFolder,{bDisSelect:true,nHeight:10,sItemValue:'<hr/>'},0);
_oUserFolder=_fAddItem(_oUserFolder,_oNewItem,0);
}
else{
_oUserFolder=_fAddItem(_oUserFolder,_oNewItem,_oUserFolder.length-2);
}
_oQMSelect.update({oMenu:{oItems:_oUserFolder}});
_oQMSelect.set(_asValue,2);
}
;function _fAddItem(_aoContainer,_aoItem,_anIndex)
{
({}).toString.call([])!="[object Array]"&&(_aoItem=[_aoItem]);
return _aoContainer.slice(0,_anIndex).concat(_aoItem).concat(_aoContainer.slice(_anIndex,_aoContainer.length));
}
;function _fCreateFolder()
{
promptFolder({type:'folder',bAlignCenter:true,width:410,height:237,style:"createNewFolder",onreturn:function(_asName){
QMAjax.send("/cgi-bin/foldermgr",{method:"POST",content:["sid=",getSid(),"&fun=new&from=simple&ef=js&resp_charset=UTF8&name=",_asName].join(''),onload:function(_abIsOk,_asResp){
try{
if(_abIsOk)
{
var _oData=eval("("+_asResp+")");
if(_oData.errcode=="0")
{
_fAddOption(_asName,_oData.folderid);
reloadLeftWin();
showInfo("\u5DF2\u6210\u529F\u65B0\u5EFA\u6587\u4EF6\u5939");
}
else{
showError(_oData.errmsg);
}
return;
}
}
catch(e)
{
}
showError("\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002");
}});
}});
}
;var _oUserFolder=_fInitFolderItem(_oDialogWin.oUserFolder);
_oQMSelect=new QMSelect({oContainer:S("selectfolder",_oDialogWin),oMenu:{nWidth:"auto",nMaxWidth:180,nMaxItemView:4,oItems:_oUserFolder},onselect:function(_aoItem){
if(_aoItem.sId=="new")
{
_fCreateFolder();
return true;
}
}});
addEvent(S("jump",_oDialogWin),"click",function(){
_oDialog.close();
var _sFolderId=_fGetItemValue();
_sFolderId=="-1"&&(_sFolderId="");
getMainWin().location.replace(_oDialogWin.location.href.replace("&Fun=GetFolderList","&Fun=Create").replace("&t=readmail_filter","&loc=filter,simple,0,0&folderid="+_sFolderId));
});
addEvent(S("confirm",_oDialogWin),"click",function(){
var _sFolderId=_fGetItemValue(),_nOldMail=S("oldmail",_oDialogWin).checked?1:0;
if(_sFolderId=="-1")
{
showError("\u60A8\u9700\u8981\u521B\u5EFA\u4E00\u4E2A\u65B0\u6587\u4EF6\u5939");
_fRestet();
}
else if(!_sFolderId)
{
showError("\u8BF7\u9009\u62E9\u6587\u4EF6\u5939");
_fRestet();
}
else{
QMAjax.send("/cgi-bin/foldermgr",{method:"POST",content:["sid=",getSid(),"&fun=addfilter&from=simple&ef=js&action=move&oldmail=",_nOldMail,"&sender=",_asAddr,"&folderid=",_sFolderId].join(''),onload:function(_abIsOk,_asResp){
try{
if(_abIsOk)
{
var _oData=eval("("+_asResp+")");
if(_oData.errcode=="0")
{
if(_nOldMail&&_oData.affected>0)
{
showInfo(TE(['\u64CD\u4F5C\u6210\u529F\uFF0C','$@$if($num$>0)$@$','\u79FB\u52A8\u4E86$num$\u5C01\u90AE\u4EF6\u3002','$@$else$@$','\uFF0C\u60A8\u6CA1\u6709\u9700\u8981\u79FB\u52A8\u6216\u6807\u8BB0\u7684\u90AE\u4EF6\u3002','$@$endif$@$','<a href="/cgi-bin/mail_list?sid=$sid$&folderid=$fid$&page=0"','style="color:white" onclick="getTop().hiddenMsg();" target="mainFrame">','[\u67E5\u770B]','</a>']).replace({sid:getSid(),fid:_oData.folderid,num:_oData.affected}),30000);
if(_asClickFrom=="mail_list")
{
reloadFrm(getMainWin());
}
}
else{
showInfo("\u5DF2\u6210\u529F\u65B0\u5EFA\u89C4\u5219");
}
ossLog("realtime","all","loc=filter,simple,0,1");
_oDialog.close();
}
else{
showError(_oData.errmsg);
}
return;
}
}
catch(e)
{
}
showError("\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002");
}});
}
});
addEvent(S("cancel",_oDialogWin),"click",function(){
_oDialog.close();
});
}
else{
showError("\u7F51\u7EDC\u5F02\u5E38\uFF0C\u8BF7\u5237\u65B0\u540E\u91CD\u8BD5\u3002");
}
});
}});
}
function submitSwitchForm()
{
var a=getTop().S("frmSwitch");
a&&a.submit();
}
function beforeFrameHtmlUnload()
{
var b=["ftnupload_self","ftnupload_attach"];
var a=QMDialog();
for(var c in a)
{
if(a[c].option("status")=="min")
{
setTimeout(function(){
a[c].max();
},10);
return "\u4F60\u8FD8\u6709\u7A0B\u5E8F\u6B63\u5728\u8FD0\u884C\uFF0C\u786E\u5B9A\u5173\u95ED\uFF1F";
}
}
}
var base64EncodeChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1];
function mybase64encode(g)
{
var f,d,e;
var a,b,c;
e=g.length;
d=0;
f="";
while(d<e)
{
a=g.charCodeAt(d++)&0xff;
if(d==e)
{
f+=base64EncodeChars.charAt(a>>2);
f+=base64EncodeChars.charAt((a&0x3)<<4);
f+="==";
break;
}
b=g.charCodeAt(d++);
if(d==e)
{
f+=base64EncodeChars.charAt(a>>2);
f+=base64EncodeChars.charAt(((a&0x3)<<4)|((b&0xF0)>>4));
f+=base64EncodeChars.charAt((b&0xF)<<2);
f+="=";
break;
}
c=g.charCodeAt(d++);
f+=base64EncodeChars.charAt(a>>2);
f+=base64EncodeChars.charAt(((a&0x3)<<4)|((b&0xF0)>>4));
f+=base64EncodeChars.charAt(((b&0xF)<<2)|((c&0xC0)>>6));
f+=base64EncodeChars.charAt(c&0x3F);
}
return f;
}
function showArchiveActive()
{
new QMDialog({sId:"archiveactive",sTitle:"\u8BF7\u5148\u6FC0\u6D3B",sBodyHtml:getTop().TE(['<div class="cnfx_content" style="line-height:1.6;">','<div style="border-bottom:1px solid #E4E4E4; margin:0 0 15px; padding:0 0 15px;">\u8BF7\u67E5\u6536\u6FC0\u6D3B\u90AE\u4EF6\uFF0C\u5E76\u6309\u6307\u5F15\u6FC0\u6D3B\u5F52\u6863\u529F\u80FD\u3002</div>','</div>']).replace({}),sFootHtml:['<a href="/cgi-bin/mail_list?sid='+getSid()+'&folderid=1&page=0&s=inbox&loc=folderlist,,,1" id="open_folder" class="btn_blue" target="mainFrame" initlized="true" md="0" href="javascript:;" nocheck="true">\u67E5\u6536\u6FC0\u6D3B\u90AE\u4EF6</a><a id="ok" class="btn_blue" initlized="true" md="0" href="javascript:;" nocheck="true">\u786E\u8BA4</a>'],nHeight:'auto',nWidth:400,onload:function(){
var b=this,a=this.$;
b.S("ok").onclick=function(){
b.close();
};
b.S("open_folder").onclick=function(){
b.close();
};
}});
}
function showArchiveClose()
{
new QMDialog({sId:"archiveactive",sTitle:"\u5F52\u6863\u529F\u80FD\u5DF2\u505C\u6B62",sBodyHtml:getTop().TE(['<div class="cnfx_content" style="line-height:1.6;">','<div style="border-bottom:1px solid #E4E4E4; margin:0 0 15px; padding:0 0 15px;">\u5F52\u6863\u529F\u80FD\u5DF2\u505C\u6B62\uFF0C\u5982\u9700\u518D\u6B21\u5F00\u542F\u8BF7\u8054\u7CFB\u90AE\u7BB1\u7BA1\u7406\u5458\u3002</div>','</div>']).replace({}),sFootHtml:['<a id="ok" class="btn_blue" initlized="true" md="0" href="javascript:;" nocheck="true">\u786E\u8BA4</a>'],nHeight:'auto',nWidth:400,onload:function(){
var b=this,a=this.$;
b.S("ok").onclick=function(){
b.close();
};
}});
}
function DoArchiveLogin(a)
{
QMAjax.send("/cgi-bin/archive_frame?auth=1&sid="+getSid()+"&lkey="+mybase64encode(a.S("pw1").value),{method:"POST",content:["r=",Math.random(),""].join(""),onload:function(b,c){
if(c.indexOf("archive_loginsucc")>=0)
{
a.close();
location.replace("/cgi-bin/archive_frame?nocheckframe=true&sid="+getSid());
}
else{
alert("\u5BC6\u7801\u9519\uFF01\u8BF7\u91CD\u65B0\u8F93\u5165\uFF01");
a.S("pw1").focus();
}
}});
}
function showArchiveLogin()
{
new QMDialog({sId:"archivelogin",sTitle:"\u767B\u5F55\u5F52\u6863\u7CFB\u7EDF",sBodyHtml:getTop().TE(['<div class="cnfx_content" style="line-height:1.6;">','<div style="border-bottom:1px solid #E4E4E4; margin:0 0 15px; padding:0 0 15px;">\u8BF7\u8F93\u5165\u5BC6\u7801\u767B\u5F55\u90AE\u4EF6\u5F52\u6863\u7CFB\u7EDF</div>','<div style="margin-top:12px;"><label>\u8F93\u5165\u5BC6\u7801: <input class="dialog_input" type="password" id="pw1" value="" style="width:220px;margin:0;"/></label></div>','</div>']).replace({}),sFootHtml:['<a id="ok" class="btn_blue" initlized="true" md="0" href="javascript:;" nocheck="true">\u786E\u8BA4</a>','<a id="cancel" md="0" nocheck="true" initlized="true" class="btn_gray" href="javascript:;">\u53D6\u6D88</a>'].join(""),nHeight:'auto',nWidth:400,onclose:function(){
},onshow:function(){
this.S("pw1").focus();
},onload:function(){
var a=this;
a.S("cancel").onclick=function(){
a.close();
};
a.S("ok").onclick=function(){
DoArchiveLogin(a);
};
a.S("pw1").onkeydown=function(b){
if(b.keyCode==13)
{
DoArchiveLogin(a);
}
};
}});
}
function showDelArchive()
{
var a=this;
new QMDialog({sId:"delarchive",sTitle:"\u505C\u7528\u5E76\u5220\u9664\u5F52\u6863",sBodyHtml:getTop().TE(['<div id="dialog_body" class="cnfx_content" style="line-height:1.6;">','	<div>\u505C\u7528\u5E76\u5220\u9664\u5F53\u524D\u5DF2\u6709\u5F52\u6863\u90AE\u4EF6\uFF0C\u6B64\u64CD\u4F5C\u4E0D\u4F1A\u5F71\u54CD\u6210\u5458\u90AE\u7BB1\u4E2D\u90AE\u4EF6\u3002</div>','	<div>\u786E\u5B9A\u8981\u505C\u7528\u5E76\u5220\u9664\u5F52\u6863\uFF1F</div>','	<div style="margin-top:12px;">','		<label>\u9A8C\u8BC1\u7801\uFF1A</label>','		<input class="dialog_input" id="captchInput" value="" style="width: 170px;margin:0;" />','		<a id="captchaSendBtn" class="button_gray button_spaceRight captchaSendBtn" onclick="" style="float: right;">\u53D1\u9001\u9A8C\u8BC1\u7801</a>','	</div>','	<div style="margin-top: 12px;"><label id="del_notice" class="txt_red del_notice"></label></div>','</div>']).replace({}),sFootHtml:['<a id="ok" class="btn_blue" initlized="true" md="0" href="javascript:;" nocheck="true">\u786E\u8BA4</a>','<a id="cancel" md="0" nocheck="true" initlized="true" class="btn_gray" href="javascript:;">\u53D6\u6D88</a>'].join(""),nHeight:'auto',nWidth:400,onclose:function(){
},onshow:function(){
this.S("captchInput").focus();
},onload:function(){
var b=this;
b.S("captchaSendBtn").onclick=SendVerifyCode;
b.S("cancel").onclick=function(){
b.close();
clearInterval(window.SendVerifyCodeTimerId);
};
b.S("ok").onclick=function(){
var c=b.S("captchInput").value;
if(c=="")
{
b.S("del_notice").innerText="\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801\uFF01";
this.S("captchInput").focus();
return;
}
QMAjax.send("/cgi-bin/archive_delete?step=deleteachive&sid="+getSid()+"&verifycode="+c,{method:"GET",onload:function(d,e){
if(e.indexOf("deletearchive_success")>=0)
{
b.S("dialog_body").innerHTML='<div>\u5DF2\u505C\u7528\u5E76\u5220\u9664\u5F52\u6863\u90AE\u4EF6\uFF0C\u91CD\u65B0\u542F\u7528\u8BF7\u8054\u7CFB\u90AE\u7BB1\u7BA1\u7406\u5458\u3002</div>';
b.S("ok").outerHTML='<a id="delarchive__fresh>" class="btn_blue" initlized="true" href="/cgi-bin/today?sid='+getSid()+'" nocheck="true">\u786E\u8BA4</a>';
b.S("cancel").outerHTML='';
}
else if(e.indexOf("checkverifycode_fail")>=0)
{
b.S("del_notice").innerText="\u9A8C\u8BC1\u7801\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165\uFF01";
this.S("captchInput").focus();
}
else{
b.S("del_notice").innerText="\u7CFB\u7EDF\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002";
}
}});
};
}});
}
function postProcessSendVerifyCode(c)
{
var a=getTop();
showSendVerifyCodeTips(a,c);
var b=10;
window.SendVerifyCodeTimerId=setInterval(function(){
b--;
console.log(b);
if(b>0)
{
a.CN("signBtnEdit")[0].innerText="\u9A8C\u8BC1\u7801"+b+"\u5206\u949F\u5185\u6709\u6548";
}
else{
clearInterval(window.SendVerifyCodeTimerId);
closeSendVerifyCodeTips(a,c);
}
},60*1000);
window.onhashchange=function(){
clearInterval(window.SendVerifyCodeTimerId);
};
}
function showSendVerifyCodeTips(a,b)
{
a.CN("captchaSendBtn")[0].outerHTML='<a style="float: right;cursor: default;" class="button_gray button_gray_disabled signBtnEdit" id="delarchive__signBtnEdit">\u9A8C\u8BC1\u780110\u5206\u949F\u5185\u6709\u6548</a>';
a.CN("del_notice")[0].innerText='\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001\u81F3'+b+'\u3002';
}
function closeSendVerifyCodeTips(a,b)
{
a.CN("signBtnEdit")[0].outerHTML='<a id="delarchive__oNewClass_captchaSendBtn" class="button_gray button_spaceRight captchaSendBtn" onclick="" style="float: right;">\u91CD\u65B0\u53D1\u9001\u9A8C\u8BC1\u7801</a>';
a.CN("del_notice")[0].innerText='';
setEventForSendVerifyCode();
}
function setEventForSendVerifyCode()
{
var a=getTop();
a.CN("captchaSendBtn").onclick=SendVerifyCode;
}
function SendVerifyCode()
{
QMAjax.send("/cgi-bin/archive_delete?step=sendverifycode&t=archive_delete&sid="+getSid(),{method:"GET",onload:function(a,b){
var c=getTop();
if(b.indexOf("sendverifywx_success")>=0)
{
postProcessSendVerifyCode("\u4F60\u6346\u7ED1\u7684\u5FAE\u4FE1");
}
else if(b.indexOf("sendverifymobile_success")>=0)
{
postProcessSendVerifyCode("\u4F60\u6346\u7ED1\u7684\u624B\u673A");
}
else if(b.indexOf("sendverifymail_success")>=0)
{
postProcessSendVerifyCode("\u7BA1\u7406\u5458\u5BC6\u4FDD\u90AE\u7BB1");
}
else if(b.indexOf("sendverifycode_fast")>=0)
{
c.CN("del_notice")[0].innerText="\u9A8C\u8BC1\u7801\u53D1\u9001\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5\u3002";
}
else if(b.indexOf("sendverifymail_success")>=0)
{
c.CN("del_notice")[0].innerText="\u9A8C\u8BC1\u7801\u53D1\u9001\u5931\u8D25";
}
else{
c.CN("del_notice")[0].innerText="\u7CFB\u7EDF\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002";
}
}});
}
function showAdvanceSearchMenu()
{
var c=[{sId:"0",sItemValue:"<div class=\"ss_drop_item\"><a href=\"javascript:;\"><span class=\"ss_icon ss_icon_mail\"></span>\u67E5\u770B\u6240\u6709\u90AE\u4EF6</a></div>"},{sId:"4",sItemValue:"<div class=\"ss_drop_item\"><a href=\"javascript:;\"><span class=\"ss_icon ss_icon_note\"></span>\u67E5\u770B\u6240\u6709\u8BB0\u4E8B</a></div>"},{sId:"2",sItemValue:"<div class=\"ss_drop_item ss_drop_split\"><a href=\"javascript:;\">\u9AD8\u7EA7\u641C\u7D22...</a></div>"}],a=Scale.fixBodyWidth(document.body.clientWidth)-284,b=62;
new (getTop().QMMenu)({oEmbedWin:window,nX:a,nY:b,nWidth:281,oItems:c,sClassName:"ss_drop_wrap",onitemclick:function(d){
var e={sid:getTop().getSid()};
if(d=="1")
{
changeStatus(1);
var f=T("/cgi-bin/mail_list?topmails=0&sid=$sid$&s=search&folderid=all&page=0&subject=&sender=&receiver=&searchmode=attach&advancesearch=0").replace(e);
getTop().getMainWin().location.href=f;
}
else if(d=="0")
{
changeStatus(1);
var f=T("/cgi-bin/mail_list?topmails=0&sid=$sid$&s=search&folderid=all&page=0&subject=&sender=&receiver=&searchmode=&advancesearch=0").replace(e);
getTop().getMainWin().location.href=f;
}
else if(d=="3")
{
changeStatus(1);
var f=T("/cgi-bin/mail_list?sid=$sid$&folderid=8&page=0&t=mail_list_group").replace(e);
getTop().getMainWin().location.href=f;
}
else if(d=="4")
{
changeStatus(1);
var f=T("/cgi-bin/note_list?catid=0&sid=$sid$").replace(e);
getTop().getMainWin().location.href=f;
}
else{
showAdvanceSearchDialog("all");
}
}});
}
function manageMailBox(_url)
{
if(!_url||_url=="")
{
return;
}
var _bindState,_phoneNum;
QMAjax.send("/cgi-bin/setting_wxbind?action=check_bind_info&sid="+getTop().getSid()+"&ef=js&t=data_mgr",{method:"POST",content:["r=",Math.random()].join(""),onload:function(_abIsOk,_avParam){
if(_abIsOk)
{
try{
var _oData=eval(_avParam);
if(_oData.data.iswxbind=="0"&&_oData.data.isphonebind=="0")
{
_bindState="0";
}
else if(_oData.data.iswxbind=="1"&&_oData.data.token=="0"&&_oData.data.force_wx_scan_login=="0")
{
_bindState="1";
}
else if(_oData.data.iswxbind=="0"&&_oData.data.isphonebind=="1"&&_oData.data.isphonevf=="0")
{
_bindState="2";
_phoneNum=_oData.data.phone;
}
function showWxBindResult(sWXName,bToken)
{
var _oDlg=new QMDialog({sId:"LoAdINgBOx",sTitle:"\u7CFB\u7EDF\u63D0\u9192",nWidth:540,nHeight:'auto',sBodyHtml:T('<div style="width: 350px;margin:0 auto;padding:30px 0;text-align: left;font-size: 14px;">'+'    <div class="blocktip" style="margin-bottom: 20px;"><span class="blocktip_icon icon_finish_b" style="float: left;margin-right: 10px;"></span>'+'        <div class="blocktip_content">'+'            <div class="blocktip_title green" style="font-size: 16px;font-weight: bolder;color: #6b9f40;">$sWXName$</span></div>'+'            <div class="graytext" style="color: #9E9B9B;padding-top:4px; font-size:12px;">\u4F60\u5DF2\u542F\u7528\u5B89\u5168\u767B\u5F55\uFF0C\u767B\u5F55\u9700\u5FAE\u4FE1\u626B\u7801\u767B\u5F55\u3002</div>'+'        </div>'+'    </div>'+'    <div style="font-size:12px;"><span style="color: #B13131; float: left; overflow: hidden; font-weight: bolder;">\u6CE8\uFF1A</span>'+'        <div>\u5BA2\u6237\u7AEF\u7528\u6237\uFF08foxmail/outlook\u6216\u624B\u673A\u5BA2\u6237\u7AEF\u7B49\uFF09\u9700\u8981\u589E\u52A0\u5BA2\u6237\u7AEF\u4E13\u7528\u5BC6\u7801\uFF0C\u8FD8\u53EF\u4EE5\u5728\u201C\u5FAE\u4FE1\u7ED1\u5B9A\u201D\u4E2D\u65B0\u589E</div>'+'    </div>'+'    <div style="font-size:12px;">'+'        <p style="padding: 10px 0;"><a id="add_auth_pwd" href="javascript:;" class="btn_blue" style="height: 27px;line-height: 25px;">\u65B0\u589E\u5BA2\u6237\u7AEF\u4E13\u7528\u5BC6\u7801</a>'+'									<a id="goAdmin" href="javascript:;" class="button_gray" style="height: 27px;line-height: 25px;margin-left: 20px;">\u76F4\u63A5\u8FDB\u5165\u7BA1\u7406\u540E\u53F0</a></p>'+'        <div id="auth_pwd_container" style="display: none; border-top: 1px solid #E6E3E3;padding-top: 15px;">'+'        </div>'+'    </div>'+'</div>').replace({sWXName:bToken=="1"?"\u5DF2\u6210\u529F\u5F00\u542F\u5B89\u5168\u767B\u5F55":"\u5DF2\u6210\u529F\u7ED1\u5B9A\u5FAE\u4FE1\u5E10\u53F7\uFF1A"+sWXName}),onclose:function(){
_oDlg=null;
if(location.hostname=='mail.exmail.qq.com')
{
location.href=_url+(_url.indexOf('?')==-1?'?':'&')+'domain_bak=1';
}
else{
location.href=_url;
}
},onload:function(){
var _oSelfObj=this;
QMAjax.send("/cgi-bin/setting4?sid="+getSid(),{method:"POST",content:"action=open_force_wx_scan_login&t=biz_rf_portal_mgr&ef=jsnew&resp_charset=UTF8",onload:function(_abIsOk,_asParam){
var _oData=evalValue(_asParam);
if(_abIsOk&&_oData.data.errcode=="0")
{
}
else{
getTop().showError("\u542F\u7528\u5B89\u5168\u767B\u5F55\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u5728\u201C\u5FAE\u4FE1\u7ED1\u5B9A\u201D\u4E2D\u91CD\u65B0\u8BBE\u7F6E\u3002");
}
}});
getTop().addEvent(_oSelfObj.S("add_auth_pwd"),"click",function(){
addAuthPwd(_oSelfObj);
});
getTop().addEvent(_oSelfObj.S("goAdmin"),"click",function(){
if(location.hostname=='mail.exmail.qq.com')
{
location.href=_url+(_url.indexOf('?')==-1?'?':'&')+'domain_bak=1';
}
else{
location.href=_url;
}
});
function addAuthPwd(_oSelfObj)
{
QMAjax.send("/cgi-bin/wx_token?act=add_spwd&ef=js&resp_charset=UTF8&sid="+getSid(),{method:"POST",onload:function(_abIsOk,_asParam){
var _oData=evalValue(_asParam);
if(_abIsOk&&_oData.errcode=="0")
{
var _sHtml=T('<span style="color: #9E9B9B;">\u5BA2\u6237\u7AEF\u4E13\u7528\u5BC6\u7801\uFF1A</span><input id="authorCode" readonly style="width:215px;background-color:#fff;border:0px;color:#6b9f40;font-weight:bold;font-size:16px;letter-spacing:1px;" value=%pwd%>&nbsp;<a href="javascript:;" onclick="ret=getTop().newCopyToClipboard(\'%pwd%\');if(ret){getTop().showInfo(\'\u590D\u5236\u6210\u529F\u3002\u73B0\u5728\u4F60\u53EF\u4EE5\u7C98\u8D34\uFF08Ctrl +V\uFF09\u5230\u5BA2\u6237\u7AEF\u91CC\u3002\');}else{getTop().showError(\'\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u4F7F\u7528\u952E\u76D8\u5FEB\u6377\u952E(Ctrl+C)\u6765\u5B8C\u6210\u3002\');}" title="\u590D\u5236\u5230\u526A\u8D34\u677F" initlized="true" md="0">\u590D\u5236</a><p style="color: #9E9B9B;">\u8BF7\u5728\u5BA2\u6237\u7AEF\u8F93\u5165\u6B64\u5BC6\u7801\u3002</p>','%').replace({pwd:_oData.data.passwd});
_oSelfObj.S("auth_pwd_container").innerHTML=_sHtml;
_oSelfObj.S("auth_pwd_container").style.display="block";
}
else{
getTop().showError("\u83B7\u53D6\u5BC6\u7801\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u5728\u201C\u5FAE\u4FE1\u7ED1\u5B9A\u201D\u4E2D\u91CD\u65B0\u83B7\u53D6\u3002");
}
}});
}
}});
}
if(_bindState=="0"||_bindState=="2")
{
var _bDlgState=true,_nCount=0,_bRefreshQrcode=false,_sCheckUrl="/cgi-bin/setting_wxbind?action=get&refresh_ticket="+_bRefreshQrcode+"&ef=js&t=data_mgr&sid="+getTop().getSid();
var _oDlg=new QMDialog({sId:"LoAdINgBOx",sTitle:"\u7CFB\u7EDF\u63D0\u9192",nWidth:540,nHeight:'auto',sBodyHtml:T('<div id="bindWxBlock" style="padding: 30px 20px;font-size: 14px;display:$wxState$;">'+'<div style="font-weight: bolder; margin-bottom: 20px;">\u4F60\u5DF2\u88AB\u8BBE\u7F6E\u4E3A\u5206\u7EA7\u7BA1\u7406\u5458\uFF0C\u7BA1\u7406\u5458\u9700\u8981\u5FAE\u4FE1\u767B\u5F55\uFF0C\u8BF7\u7ED1\u5B9A</div>'+'<div id="qr_con" width="260" height="260" style="padding-bottom: 20px;">'+'<img id="wx_qrcode" style="box-shadow: 0 1px 6px #333;" width="200" height="200" src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=$wxticket$">'+'</div>'+'<div style="color: #707070;">\u8BF7\u7528\u5FAE\u4FE1\u626B\u63CF\u4E8C\u7EF4\u7801\uFF0C\u7ED1\u5B9A\u540E\u4F7F\u7528\u5FAE\u4FE1\u626B\u7801\u767B\u5F55</div>'+'<div style="margin-top: 10px;display:$showBindPhone$;">\u6CA1\u6709\u5FAE\u4FE1\uFF0C\u53EF<a id="bindPhone" style="cursor: pointer;">\u7ED1\u5B9A\u624B\u673A</a></div>'+'<div style="margin-top: 25px;display:$backPhone$;"><a id="goBackPhone" style="cursor: pointer;text-align: left;"><\u8FD4\u56DE\u624B\u673A\u9A8C\u8BC1</a></div>'+'</div>'+'<div id="bindPhoneBlock" style="padding: 30px 20px;font-size: 14px;display:none;">'+'<div class="blocktip_content" style="width: 300px;margin: auto;margin-bottom: 20px;">'+'<div id="blocktip_title" style="font-weight: bolder; margin-bottom: 20px;text-align: left;font-size: 14px;">\u8BF7\u7ED1\u5B9A\u624B\u673A\uFF0C\u767B\u5F55\u53EF\u7528\u624B\u673A\u52A8\u6001\u5BC6\u7801\u767B\u5F55</div>'+'<div class="items" style="text-align: left;">'+'<div class="item">'+'<label class="input_tip" id="f_phone_tips" style="display:none;height: 36px;width: 274px;line-height: 36px;">\u624B\u673A\u53F7</label>'+'<input name="phone"  id="phone" un="bind" placeholder="\u624B\u673A\u53F7">'+'<label id="phoneErr" class="err" style="display:none;"></label>'+'</div>'+'<div class="item">'+'<label class="input_tip" id="f_pwd_tips" style="display:none;height: 36px;line-height: 36px;width: 145px;">\u9A8C\u8BC1\u7801</label>'+'<input class="input_l" name="phone_vc" id="pwd"  un="bind" placeholder="\u9A8C\u8BC1\u7801"><a class="btn_gray" un="bind" id="requestSmsCode">\u83B7\u53D6\u9A8C\u8BC1\u7801</a> '+'<label  id="smsErr" class="err"></label>'+'</div>'+'<div class="item">'+'<a class="btn_blue" un="bind" id="btn_phone_bind">\u786E\u8BA4\u7ED1\u5B9A</a>'+'</div>'+'</div>'+'<div style="text-align: left;margin-top: 40px;"><a id="bindWx" style="cursor: pointer;text-align: left;"><\u8FD4\u56DE\u7ED1\u5B9A\u5FAE\u4FE1</a></div>'+'</div>'+'</div>'+'<div id="vfPhone" style="display:$phoneState$;padding:14px 0 35px 0;width: 415px;margin: auto;">'+'<div class="block_line">\u4F60\u5DF2\u88AB\u8BBE\u7F6E\u4E3A\u5206\u7EA7\u7BA1\u7406\u5458\uFF0C\u7BA1\u7406\u5458\u9700\u8981\u5FAE\u4FE1\u6216\u624B\u673A\u767B\u5F55</div>'+'<div class="block_line">\u8BF7\u786E\u8BA4\u5DF2\u7ED1\u5B9A\u6709\u6548\u624B\u673A\uFF0C\u4E5F\u53EF\u66F4\u6362\u7ED1\u5B9A\u624B\u673A\u3002</div>'+'<div class="blocktip_content" style="width: 340px;margin: auto;text-align:left;">'+'<div class="items">'+'<div style="margin-top: 25px;margin-bottom: 15px;position: relative;">'+'<input type="radio" value="0" name="toSelect" id="toCheck" checked="checked" style="margin-right: 5px;">'+'<label for="toCheck" style="font-size: 13px;">\u9A8C\u8BC1\u5DF2\u7ED1\u5B9A\u624B\u673A\uFF1A$phoneNum$</label>'+'<a class="btn_gray" id="btn_vf_phone_vc" un="check" style="margin-top:-5px;height:30px;line-height:30px;margin-left:5px;font-size:12px;width: 90px;">\u83B7\u53D6\u9A8C\u8BC1\u7801</a>'+'</div>'+'<div id="vfPhoneBlock" style="display:none;width: 187px;margin-left: 22px;">'+'<div class="item" style="margin-bottom: 12px;">'+'<label class="input_tip" id="vfcode_tips" style="display:none;height: 36px;line-height: 36px;width: 145px;">\u9A8C\u8BC1\u7801</label>'+'<input style="width: 170px;" id="phone_vc" name="phone_vc" un="check" placeholder="\u9A8C\u8BC1\u7801"> '+'<label  id="smsErr_vf" class="err" style="font-size: 12px;position: relative;top: -27px;left: 200px;float: left;margin-bottom: -17px;"></label>'+'</div>'+'<div class="item">'+'<a class="btn_blue" un="check" id="btn_phone_check" style="width: 91%;">\u786E\u8BA4</a>'+'</div>'+'</div>'+'<div>'+'<input type="radio" value="0" name="toSelect" id="toChange" style="margin-right: 5px;">'+'<label for="toChange" style="font-size: 13px;">\u66F4\u6362\u7ED1\u5B9A\u624B\u673A</label>'+'</div>'+'<div id="changePhoneBlock" class="changePhoneBlock" style="display:none;width: 223px;margin-left: 22px;">'+'<div class="item" style="margin: 14px auto;">'+'<label class="input_tip" name="phone_tips" id="f_phone_change_tips" style="display:none;height: 36px;width: 274px;line-height: 36px;">\u624B\u673A\u53F7</label>'+'<input name="phone"  id="phone_change" un="change" style="width: 202px;" placeholder="\u624B\u673A\u53F7">'+'<label id="phoneErr_change" class="err" style="display:none;margin-bottom: -4px;font-size:12px;position: relative;top: -27px;left: 228px;  float: left;"></label>'+'</div>'+'<div class="item" style="display:inline-block;margin-top: -2px;">'+'<label class="input_tip" id="vfcode_tips_change" style="display:none;height: 36px;line-height: 36px;width: 145px;">\u9A8C\u8BC1\u7801</label>'+'<input name="phone_vc" id="phone_vc_change" un="change" placeholder="\u9A8C\u8BC1\u7801" style="width:81px;"><a class="btn_gray" style="margin-left: 8px;width: 88px;position: absolute;" id="btn_change_phone_vc" un="change" >\u83B7\u53D6\u9A8C\u8BC1\u7801</a> '+'<label id="smsErr_change" class="err" style="font-size: 12px;position: relative;top: 14px;left: 232px;float: left;margin-bottom: -17px;"></label>'+'</div>'+'<div class="item" style="margin-top: -18px;margin-bottom:12px;">'+'<a class="btn_blue" un="change" id="btn_phone_bind_change" style="width: 90%;">\u786E\u8BA4\u7ED1\u5B9A</a>'+'</div>'+'</div>'+'</div>'+'<div style="text-align: left;margin-top: 40px;"><span class="wxicon" style="background-size:contain;vertical-align:middle;"></span>\u4F60\u4E5F\u53EF<a id="goBindWx" style="cursor: pointer;">\u7ED1\u5B9A\u5FAE\u4FE1</a>\uFF0C\u626B\u7801\u767B\u5F55\u66F4\u65B9\u4FBF</div>'+'</div>'+'</div>').replace({wxticket:_oData.data.wxticket,showBindPhone:_oData.data.isphonebind=="0"?"":"none",showCheckPhone:_oData.data.isphonebind=="1"?"":"none",phoneNum:_phoneNum,phoneState:_bindState=="2"?"":"none",wxState:_bindState=="0"?"":"none",backPhone:_bindState=="2"?"":"none"}),onload:function(){
var _oSelfObj=this;
getTop().addEvent(_oSelfObj.S("bindPhone"),"click",function(){
_oSelfObj.S("bindWxBlock").style.display="none";
_oSelfObj.S("vfPhone").style.display="none";
_oSelfObj.S("bindPhoneBlock").style.display="";
});
getTop().addEvent(_oSelfObj.S("bindWx"),"click",function(){
_oSelfObj.S("bindWxBlock").style.display="";
_oSelfObj.S("bindPhoneBlock").style.display="none";
_oSelfObj.S("vfPhone").style.display="none";
});
getTop().addEvent(_oSelfObj.S("goBackPhone"),"click",function(){
_oSelfObj.S("bindWxBlock").style.display="none";
_oSelfObj.S("bindPhoneBlock").style.display="none";
_oSelfObj.S("vfPhone").style.display="";
});
getTop().addEvent(_oSelfObj.S("goBindWx"),"click",function(){
_oSelfObj.S("bindWxBlock").style.display="";
_oSelfObj.S("bindPhoneBlock").style.display="none";
_oSelfObj.S("vfPhone").style.display="none";
});
getTop().addEvent(_oSelfObj.S("toCheck"),"click",function(){
_oSelfObj.S("changePhoneBlock").style.display="none";
if(_oSelfObj.S("btn_vf_phone_vc").innerText.indexOf("\u79D2")==-1)
{
_oSelfObj.S("btn_vf_phone_vc").className="btn_gray";
}
else{
_oSelfObj.S("vfPhoneBlock").style.display="";
}
});
getTop().addEvent(_oSelfObj.S("toChange"),"click",function(){
_oSelfObj.S("btn_vf_phone_vc").className="btn_gray disable";
_oSelfObj.S("changePhoneBlock").style.display="";
_oSelfObj.S("vfPhoneBlock").style.display="none";
});
function countdown(time_sec,_diff)
{
if(_diff=="bind")
{
if(time_sec>0)
{
next_sec=time_sec-1;
var s=next_sec+"\u79D2\u540E\u91CD\u65B0\u83B7\u53D6";
_oSelfObj.S("requestSmsCode").className="btn_gray disable";
_oSelfObj.S("requestSmsCode").innerText=s;
_oSelfObj.S("requestSmsCode").value=next_sec+"\u79D2\u540E\u53EF\u91CD\u65B0\u83B7\u53D6";
setTimeout(function(){
countdown(next_sec,"bind");
},1000);
}
else{
_oSelfObj.S("requestSmsCode").className="btn_gray";
_oSelfObj.S("requestSmsCode").innerText="\u83B7\u53D6\u9A8C\u8BC1\u7801";
_oSelfObj.S("requestSmsCode").value="\u83B7\u53D6\u9A8C\u8BC1\u7801";
}
}
else if(_diff=="check")
{
if(time_sec>0)
{
next_sec=time_sec-1;
var s=next_sec+"\u79D2\u540E\u91CD\u65B0\u83B7\u53D6";
_oSelfObj.S("btn_vf_phone_vc").className="btn_gray disable";
_oSelfObj.S("btn_vf_phone_vc").innerText=s;
_oSelfObj.S("btn_vf_phone_vc").value=next_sec+"\u79D2\u540E\u53EF\u91CD\u65B0\u83B7\u53D6";
setTimeout(function(){
countdown(next_sec,"check");
},1000);
}
else{
_oSelfObj.S("btn_vf_phone_vc").className="btn_gray";
_oSelfObj.S("btn_vf_phone_vc").innerText="\u83B7\u53D6\u9A8C\u8BC1\u7801";
_oSelfObj.S("btn_vf_phone_vc").value="\u83B7\u53D6\u9A8C\u8BC1\u7801";
}
}
else if(_diff=="change")
{
if(time_sec>0)
{
next_sec=time_sec-1;
var s=next_sec+"\u79D2\u540E\u91CD\u65B0\u83B7\u53D6";
_oSelfObj.S("btn_change_phone_vc").className="btn_gray disable";
_oSelfObj.S("btn_change_phone_vc").innerText=s;
_oSelfObj.S("btn_change_phone_vc").value=next_sec+"\u79D2\u540E\u53EF\u91CD\u65B0\u83B7\u53D6";
setTimeout(function(){
countdown(next_sec,"change");
},1000);
}
else{
_oSelfObj.S("btn_change_phone_vc").className="btn_gray";
_oSelfObj.S("btn_change_phone_vc").innerText="\u83B7\u53D6\u9A8C\u8BC1\u7801";
_oSelfObj.S("btn_change_phone_vc").value="\u83B7\u53D6\u9A8C\u8BC1\u7801";
}
}
}
;getTop().addEvent(_oSelfObj.S("btn_phone_bind"),"click",function(e){
var mobile,smscode,img_vc="",change="";
mobile=_oSelfObj.S("phone").value;
smscode=_oSelfObj.S("pwd").value;
if(_oSelfObj.S("blocktip_title").innerText=="\u8BF7\u7ED1\u5B9A\u65B0\u624B\u673A")
{
change="&change=1";
}
else{
change="&change=2";
}
if(!/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/.test(mobile))
{
_oSelfObj.S("phoneErr").innerText="\u8BF7\u8F93\u516511\u4F4D\u624B\u673A\u53F7\u7801";
_oSelfObj.S("phoneErr").style.display="";
return false;
}
if(smscode=="")
{
_oSelfObj.S("smsErr").innerText="\u8BF7\u586B\u5199\u9A8C\u8BC1\u7801";
_oSelfObj.S("smsErr").style.display="";
return false;
}
QMAjax.send("/cgi-bin/setting_remind?action=authsms&t=biz_rf_mgr&sid="+getSid()+"&mobile="+mobile+"&smscode="+smscode+"&img_vc="+img_vc+change+"&ef=js&r="+Math.random(),{method:"POST",onload:function(_abIsOk,_asParam){
var _oData=evalValue(_asParam);
if(_abIsOk&&_oData.retcode=="0")
{
showPhoneBindResult(mobile);
}
else if(_oData.retcode=="100")
{
getTop().showError("\u65E0\u6548\u8BF7\u6C42\uFF0C\u8BF7\u68C0\u67E5\u53C2\u6570");
}
else if(_oData.retcode=="-104")
{
_oSelfObj.S("phoneErr").innerText="\u624B\u673A\u7ED1\u5B9A\u7684\u5E10\u53F7\u6570\u5DF2\u8D85\u8FC7\u9650\u989D";
_oSelfObj.S("phoneErr").style.display="";
}
else if(_oData.retcode=="2")
{
_oSelfObj.S("phoneErr").innerText="\u7BA1\u7406\u5458\u5DF2\u7ED1\u5B9A\u8BE5\u624B\u673A\uFF0C\u8BF7\u52FF\u91CD\u590D\u7ED1\u5B9A";
_oSelfObj.S("phoneErr").style.display="";
}
else if(_oData.retcode=="102")
{
getTop().showError("\u8BF7\u6C42\u8FC7\u4E8E\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u5019\u91CD\u8BD5");
}
else if(_oData.retcode=="104")
{
getTop().showError("\u5E10\u53F7\u5DF2\u7ED1\u5B9A\u5176\u4ED6\u624B\u673A\u53F7\u7801");
}
else if(_oData.retcode=="202")
{
_oSelfObj.S("smsErr").innerText="\u9A8C\u8BC1\u7801\u9519\u8BEF";
_oSelfObj.S("smsErr").style.display="";
}
else if(_oData.retcode)
{
getTop().showError("\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u9519\u8BEF\u7801\uFF1A"+_oData.retcode);
}
else{
getTop().showError("\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5");
}
}});
});
getTop().addEvent(_oSelfObj.S("btn_phone_bind_change"),"click",function(e){
var mobile,smscode,img_vc="",change="";
mobile=_oSelfObj.S("phone_change").value;
smscode=_oSelfObj.S("phone_vc_change").value;
change="&change=1";
if(!/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/.test(mobile))
{
_oSelfObj.S("phoneErr_change").innerText="\u8BF7\u8F93\u516511\u4F4D\u624B\u673A\u53F7\u7801";
_oSelfObj.S("phoneErr_change").style.display="";
return false;
}
if(smscode=="")
{
_oSelfObj.S("smsErr_change").innerText="\u8BF7\u586B\u5199\u9A8C\u8BC1\u7801";
_oSelfObj.S("smsErr_change").style.display="";
return false;
}
QMAjax.send("/cgi-bin/setting_remind?action=authsms&t=biz_rf_mgr&sid="+getSid()+"&mobile="+mobile+"&smscode="+smscode+"&img_vc="+img_vc+change+"&ef=js&r="+Math.random(),{method:"POST",onload:function(_abIsOk,_asParam){
var _oData=evalValue(_asParam);
if(_abIsOk&&_oData.retcode=="0")
{
showPhoneBindResult(mobile);
}
else if(_oData.retcode=="100")
{
getTop().showError("\u65E0\u6548\u8BF7\u6C42\uFF0C\u8BF7\u68C0\u67E5\u53C2\u6570");
}
else if(_oData.retcode=="-104")
{
_oSelfObj.S("phoneErr_change").innerText="\u624B\u673A\u7ED1\u5B9A\u7684\u5E10\u53F7\u6570\u5DF2\u8D85\u8FC7\u9650\u989D";
_oSelfObj.S("phoneErr_change").style.display="";
}
else if(_oData.retcode=="2")
{
_oSelfObj.S("phoneErr_change").innerText="\u7BA1\u7406\u5458\u5DF2\u7ED1\u5B9A\u8BE5\u624B\u673A\uFF0C\u8BF7\u52FF\u91CD\u590D\u7ED1\u5B9A";
_oSelfObj.S("phoneErr_change").style.display="";
}
else if(_oData.retcode=="102")
{
getTop().showError("\u8BF7\u6C42\u8FC7\u4E8E\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u5019\u91CD\u8BD5");
}
else if(_oData.retcode=="104")
{
getTop().showError("\u5E10\u53F7\u5DF2\u7ED1\u5B9A\u5176\u4ED6\u624B\u673A\u53F7\u7801");
}
else if(_oData.retcode=="202")
{
_oSelfObj.S("smsErr_change").innerText="\u9A8C\u8BC1\u7801\u9519\u8BEF";
_oSelfObj.S("smsErr_change").style.display="";
}
else if(_oData.retcode)
{
getTop().showError("\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u9519\u8BEF\u7801\uFF1A"+_oData.retcode);
}
else{
getTop().showError("\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5");
}
}});
});
getTop().addEvent(_oSelfObj.S("requestSmsCode"),"click",function(e){
if(e.target.className.indexOf("disable")!=-1)
{
return;
}
var mobile=_oSelfObj.S("phone").value;
if(!/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/.test(mobile))
{
_oSelfObj.S("phoneErr").innerText="\u8BF7\u8F93\u516511\u4F4D\u624B\u673A\u53F7\u7801";
_oSelfObj.S("phoneErr").style.display="";
return false;
}
QMAjax.send("/cgi-bin/setting_remind?action=sendsms&t=biz_rf_mgr&sid="+getSid()+"&mobile="+mobile+"&ef=js&r="+Math.random(),{method:"POST",onload:function(_abIsOk,_asParam){
var _oData=evalValue(_asParam);
if(_abIsOk&&_oData.retcode=="0")
{
getTop().showInfo("\u53D1\u9001\u6210\u529F");
countdown(60,"bind");
}
else if(_oData.retcode="102")
{
getTop().showError("\u8BF7\u6C42\u8FC7\u4E8E\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u5019\u91CD\u8BD5");
}
else if(_oData.retcode="-104")
{
getTop().showError("\u624B\u673A\u7ED1\u5B9A\u7684\u5E10\u53F7\u6570\u5DF2\u8D85\u8FC7\u9650\u989D");
}
else if(_oData.retcode)
{
getTop().showError("\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u9519\u8BEF\u7801\uFF1A"+_oData.retcode);
}
else{
getTop().showError("\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5");
}
}});
});
getTop().addEvent(_oSelfObj.S("btn_change_phone_vc"),"click",function(e){
if(e.target.className.indexOf("disable")!=-1)
{
return;
}
var mobile=_oSelfObj.S("phone_change").value;
if(!/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/.test(mobile))
{
_oSelfObj.S("phoneErr_change").innerText="\u8BF7\u8F93\u516511\u4F4D\u624B\u673A\u53F7\u7801";
_oSelfObj.S("phoneErr_change").style.display="";
return false;
}
QMAjax.send("/cgi-bin/setting_remind?action=sendsms&t=biz_rf_mgr&sid="+getSid()+"&mobile="+mobile+"&ef=js&r="+Math.random(),{method:"POST",onload:function(_abIsOk,_asParam){
var _oData=evalValue(_asParam);
if(_abIsOk&&_oData.retcode=="0")
{
getTop().showInfo("\u53D1\u9001\u6210\u529F");
countdown(60,"change");
}
else if(_oData.retcode="102")
{
getTop().showError("\u8BF7\u6C42\u8FC7\u4E8E\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u5019\u91CD\u8BD5");
}
else if(_oData.retcode)
{
getTop().showError("\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u9519\u8BEF\u7801\uFF1A"+_oData.retcode);
}
else{
getTop().showError("\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5");
}
}});
});
getTop().addEvent(_oSelfObj.S("btn_vf_phone_vc"),"click",function(e){
if(e.target.className.indexOf("disable")!=-1)
{
return;
}
_oSelfObj.S("vfPhoneBlock").style.display="";
var type="&type=8";
QMAjax.send("/cgi-bin/setting_remind?action=sendsms&t=biz_rf_mgr&sid="+getSid()+type+"&ef=js&r="+Math.random(),{method:"POST",onload:function(_abIsOk,_asParam){
var _oData=evalValue(_asParam);
if(_abIsOk&&_oData.retcode=="0")
{
getTop().showInfo("\u53D1\u9001\u6210\u529F");
countdown(60,"check");
}
else if(_oData.retcode=="102")
{
getTop().showError("\u8BF7\u6C42\u8FC7\u4E8E\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u5019\u91CD\u8BD5");
}
else if(_oData.retcode)
{
getTop().showError("\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u9519\u8BEF\u7801\uFF1A"+_oData.retcode);
}
else{
getTop().showError("\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5");
}
}});
});
getTop().addEvent(_oSelfObj.S("btn_phone_check"),"click",function(e){
var mobile="",smscode=_oSelfObj.S("phone_vc").value;
if(smscode=="")
{
_oSelfObj.S("smsErr_vf").innerText="\u8BF7\u8F93\u5165\u77ED\u4FE1\u9A8C\u8BC1\u7801";
_oSelfObj.S("smsErr_vf").style.display="";
return false;
}
QMAjax.send("/cgi-bin/setting_remind?action=checksms&t=biz_rf_mgr&sid="+getSid()+"&phone_vc="+smscode+"&ef=js&r="+Math.random(),{method:"POST",onload:function(_abIsOk,_asParam){
var _oData=evalValue(_asParam);
if(_abIsOk&&_oData.retcode=="0")
{
getTop().showInfo("\u9A8C\u8BC1\u6210\u529F");
_oDlg=null;
if(location.hostname=='mail.exmail.qq.com')
{
location.href=_url+(_url.indexOf('?')==-1?'?':'&')+'domain_bak=1';
}
else{
location.href=_url;
}
}
else if(_oData.retcode=="-99")
{
getTop().showError("\u77ED\u4FE1\u9A8C\u8BC1\u7801\u9519\u8BEF");
}
else if(_oData.retcode)
{
getTop().showError("\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u9519\u8BEF\u7801\uFF1A"+_oData.retcode);
}
else{
getTop().showError("\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5");
}
}});
});
function checkPhoneBlock(e)
{
var $tar=e?e.currentTarget:false,$phone,$sms,$vc;
if($tar.getAttribute("un")=="bind")
{
$phone=_oSelfObj.S("phone").value;
$sms=_oSelfObj.S("pwd").value;
if($phone=="")
{
if($tar.getAttribute("id")!=_oSelfObj.S("phone").getAttribute("id")&&$tar.getAttribute("id")!=_oSelfObj.S("pwd").getAttribute("id"))
{
_oSelfObj.S("phoneErr").innerText="\u8BF7\u586B\u5199\u624B\u673A\u53F7\u7801";
_oSelfObj.S("phoneErr").style.display="";
return false;
}
else if($tar.getAttribute("id")==_oSelfObj.S("pwd").getAttribute("id"))
{
return;
}
else if($tar.getAttribute("id")==_oSelfObj.S("phone").getAttribute("id"))
{
_oSelfObj.S("phoneErr").style.display="none";
return;
}
}
else if(!(/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/.test($phone)))
{
_oSelfObj.S("phoneErr").innerText="\u8BF7\u586B\u5199\u6B63\u786E\u7684\u624B\u673A\u53F7\u7801";
_oSelfObj.S("phoneErr").style.display="";
return false;
}
else if($tar.getAttribute("id")==_oSelfObj.S("phone").getAttribute("id"))
{
_oSelfObj.S("phoneErr").style.display="none";
return false;
}
if($sms=="")
{
if($tar.getAttribute("id")!=_oSelfObj.S("pwd").getAttribute("id"))
{
_oSelfObj.S("smsErr").innerText="\u8BF7\u586B\u5199\u9A8C\u8BC1\u7801";
_oSelfObj.S("smsErr").style.display="";
return false;
}
else{
return;
}
}
else if($tar.getAttribute("id")==_oSelfObj.S("pwd").getAttribute("id"))
{
_oSelfObj.S("smsErr").style.display="none";
return false;
}
return true;
}
else if($tar.getAttribute("un")=="check")
{
$sms=_oSelfObj.S("phone_vc").value;
if($sms=="")
{
if($tar.getAttribute("id")!=_oSelfObj.S("phone_vc").getAttribute("id"))
{
_oSelfObj.S("smsErr_vf").innerText="\u8BF7\u586B\u5199\u9A8C\u8BC1\u7801";
_oSelfObj.S("smsErr_vf").style.display="";
return false;
}
else{
return;
}
}
else if($tar.getAttribute("id")==_oSelfObj.S("phone_vc").getAttribute("id"))
{
_oSelfObj.S("smsErr1").style.display="none";
return false;
}
return true;
}
else if($tar.getAttribute("un")=="change")
{
$phone=_oSelfObj.S("phone_change").value;
$sms=_oSelfObj.S("phone_vc_change").value;
if($phone=="")
{
if($tar.getAttribute("id")!=_oSelfObj.S("phone_change").getAttribute("id"))
{
_oSelfObj.S("phoneErr_change").innerText="\u8BF7\u586B\u5199\u624B\u673A\u53F7\u7801";
_oSelfObj.S("phoneErr_change").style.display="";
return false;
}
else{
return;
}
}
else if(!(/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/.test($phone)))
{
_oSelfObj.S("phoneErr_change").innerText="\u8BF7\u586B\u5199\u6B63\u786E\u7684\u624B\u673A\u53F7\u7801";
_oSelfObj.S("phoneErr_change").style.display="";
return false;
}
else if($tar.getAttribute("id")==_oSelfObj.S("phone_change").getAttribute("id"))
{
_oSelfObj.S("phoneErr_change").style.display="none";
return false;
}
if($sms=="")
{
if($tar.getAttribute("id")!=_oSelfObj.S("phone_vc_change").getAttribute("id"))
{
_oSelfObj.S("smsErr_change").innerText="\u8BF7\u586B\u5199\u9A8C\u8BC1\u7801";
_oSelfObj.S("smsErr_change").style.display="";
return false;
}
else{
return;
}
}
else if($tar.getAttribute("id")==_oSelfObj.S("phone_vc_change").getAttribute("id"))
{
_oSelfObj.S("smsErr_change").style.display="none";
return false;
}
return true;
}
}
if(!('placeholder' in document.createElement('input')))
{
if(_oSelfObj.S("phone").value=="")
{
_oSelfObj.S("f_phone_tips").style.display="inline";
}
if(_oSelfObj.S("pwd").value=="")
{
_oSelfObj.S("f_pwd_tips").style.display="inline";
}
if(_oSelfObj.S("phone_vc").value=="")
{
_oSelfObj.S("vfcode_tips").style.display="inline";
}
if(_oSelfObj.S("phone_change").value=="")
{
_oSelfObj.S("f_phone_change_tips").style.display="inline";
}
if(_oSelfObj.S("phone_vc_change").value=="")
{
_oSelfObj.S("vfcode_tips_change").style.display="inline";
}
addEvent(_oSelfObj.S("f_phone_tips"),"click",function(e){
_oSelfObj.S("phone").focus();
_oSelfObj.S("f_phone_tips").style.display="none";
});
addEvent(_oSelfObj.S("f_pwd_tips"),"click",function(e){
_oSelfObj.S("pwd").focus();
_oSelfObj.S("f_pwd_tips").style.display="none";
});
addEvent(_oSelfObj.S("vfcode_tips"),"click",function(e){
_oSelfObj.S("phone_vc").focus();
_oSelfObj.S("vfcode_tips").style.display="none";
});
addEvent(_oSelfObj.S("f_phone_change_tips"),"click",function(e){
_oSelfObj.S("phone_change").focus();
_oSelfObj.S("f_phone_change_tips").style.display="none";
});
addEvent(_oSelfObj.S("vfcode_tips_change"),"click",function(e){
_oSelfObj.S("phone_vc_change").focus();
_oSelfObj.S("vfcode_tips_change").style.display="none";
});
addEvent(_oSelfObj.S("phone"),"focus",function(e){
_oSelfObj.S("f_phone_tips").style.display="none";
});
addEvent(_oSelfObj.S("pwd"),"focus",function(e){
_oSelfObj.S("f_pwd_tips").style.display="none";
});
addEvent(_oSelfObj.S("phone_vc"),"focus",function(e){
_oSelfObj.S("vfcode_tips").style.display="none";
});
addEvent(_oSelfObj.S("phone_change"),"focus",function(e){
_oSelfObj.S("f_phone_change_tips").style.display="none";
});
addEvent(_oSelfObj.S("phone_vc_change"),"focus",function(e){
_oSelfObj.S("vfcode_tips_change").style.display="none";
});
addEvent(_oSelfObj.S("phone"),"blur",function(e){
if(_oSelfObj.S("phone").value=="")
{
_oSelfObj.S("f_phone_tips").style.display="inline";
}
else{
checkPhoneBlock();
}
});
addEvent(_oSelfObj.S("pwd"),"blur",function(e){
if(_oSelfObj.S("pwd").value=="")
{
_oSelfObj.S("f_pwd_tips").style.display="inline";
}
else{
checkPhoneBlock();
}
});
addEvent(_oSelfObj.S("phone_vc"),"blur",function(e){
if(_oSelfObj.S("phone_vc").value=="")
{
_oSelfObj.S("vfcode_tips").style.display="inline";
}
else{
checkPhoneBlock();
}
});
addEvent(_oSelfObj.S("phone_change"),"blur",function(e){
if(_oSelfObj.S("phone_change").value=="")
{
_oSelfObj.S("f_phone_change_tips").style.display="inline";
}
else{
checkPhoneBlock();
}
});
addEvent(_oSelfObj.S("phone_vc_change"),"blur",function(e){
if(_oSelfObj.S("phone_vc_change").value=="")
{
_oSelfObj.S("vfcode_tips_change").style.display="inline";
}
else{
checkPhoneBlock();
}
});
}
else{
addEvent(_oSelfObj.S("phone"),"blur",checkPhoneBlock);
addEvent(_oSelfObj.S("pwd"),"blur",checkPhoneBlock);
addEvent(_oSelfObj.S("phone_change"),"blur",checkPhoneBlock);
addEvent(_oSelfObj.S("phone_vc_change"),"blur",checkPhoneBlock);
addEvent(_oSelfObj.S("phone_vc"),"blur",checkPhoneBlock);
}
function checkWxBind()
{
if(!_bDlgState)
{
return;
}
_bRefreshQrcode=++_nCount>=60?true:false;
var _top=getTop();
QMAjax.send("/cgi-bin/setting_wxbind?action=get&refresh_ticket="+_bRefreshQrcode+"&ef=js&t=data_mgr&sid="+getSid(),{method:"POST",onload:function(_abIsOk,_asParam){
var _oData=evalValue(_asParam);
if(_abIsOk&&_oData.data.isbinded=="1")
{
_bDlgState=false;
showWxBindResult(_oData.data.account);
}
else if(_bRefreshQrcode)
{
_oSelfObj.S('wx_qrcode').src='https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+_oData.data.wxticket;
_nCount=0;
setTimeout(checkWxBind,2000);
}
else{
setTimeout(checkWxBind,2000);
}
}});
}
setTimeout(checkWxBind,2000);
},onclose:function(){
_bDlgState=false;
_oDlg=null;
}});
function showPhoneBindResult(sPhone)
{
var _oDlg=new QMDialog({sId:"LoAdINgBOx",sTitle:"\u7CFB\u7EDF\u63D0\u9192",nWidth:540,nHeight:'auto',sBodyHtml:['<div style="width: 410px;margin: auto;text-align: left;"><div style="background:url(/zh_CN/htmledition/images/newicon/prompt.png) no-repeat 0 3px; width:32px; height:34.5px;float: left;margin-top: 20px;"></div>','<div style="padding: 20px 0; font-size: 16px;width:400px;">	','<div style="padding-left: 40px;color: #37AF20;">','\u5DF2\u6210\u529F\u7ED1\u5B9A\u624B\u673A\u53F7\u7801\uFF1A','<span id="wxbind">'+sPhone+'</span></div>','<div style="font-size: 13px;margin-left: 40px;margin-top: 8px;color: #837B7B;">','\u4F60\u5DF2\u7ED1\u5B9A\u624B\u673A\uFF0C\u767B\u5F55\u53EF\u7528\u624B\u673A\u9A8C\u8BC1\u767B\u5F55<br></div>','<a class="btn_blue" id="submit" style="margin: 40px 0 0 40px;width: 80px;height: 30px;line-height: 30px;font-size: 15px;">\u786E\u5B9A</a>','</div></div>'].join(""),onclose:function(){
_oDlg=null;
if(location.hostname=='mail.exmail.qq.com')
{
location.href=_url+(_url.indexOf('?')==-1?'?':'&')+'domain_bak=1';
}
else{
location.href=_url;
}
},onload:function(){
var _oSelfObj=this;
getTop().addEvent(_oSelfObj.S("submit"),"click",function(){
_oSelfObj.S("_closebtn_").click();
if(location.hostname=='mail.exmail.qq.com')
{
location.href=_url+(_url.indexOf('?')==-1?'?':'&')+'domain_bak=1';
}
else{
location.href=_url;
}
});
}});
}
}
else if(_bindState=="1")
{
var _oDlg=new QMDialog({sId:"LoAdINgBOx",sTitle:"\u7CFB\u7EDF\u63D0\u9192",nWidth:540,nHeight:'auto',sBodyHtml:T('<div style="padding: 30px 0;margin: 0 35px;overflow: hidden;zoom: 1;font-size: 14px;text-align: left;line-height: 25px;">\u4F60\u5DF2\u88AB\u8BBE\u7F6E\u4E3A\u5206\u7EA7\u7BA1\u7406\u5458\uFF0C\u7BA1\u7406\u5458\u9700\u8981\u5FAE\u4FE1\u626B\u7801\u767B\u5F55\uFF0C\u4F60\u9700\u8981\u542F\u52A8\u5B89\u5168\u767B\u5F55\uFF0C\u70B9\u51FB\u201C\u786E\u5B9A\u201D\u6309\u94AE\u786E\u8BA4\u542F\u7528\u3002'+'</div>'+'<div class="bd attbg" style="padding: 0px 40px;border-width: 1px 0 0;text-align: right;">'+'<a class="btn_blue" id="openWxToken" style="line-height: 20px;font-size: 14px;margin: 8px;">\u786E\u5B9A</a>'+'<a id="cancel" style="font-size: 14px;margin-left: 10px;">\u53D6\u6D88</a>'+'</div>').replace({}),onload:function(){
var _oSelfObj=this;
getTop().addEvent(_oSelfObj.S("cancel"),"click",function(){
_oDlg=null;
_oSelfObj.S("_closebtn_").click();
});
getTop().addEvent(_oSelfObj.S("openWxToken"),"click",function(){
showWxBindResult("","1");
});
},onclose:function(){
_oDlg=null;
}});
}
else{
if(location.hostname=='mail.exmail.qq.com')
{
location.href=_url+(_url.indexOf('?')==-1?'?':'&')+'domain_bak=1';
}
else{
location.href=_url;
}
}
}
catch(e)
{
}
}
else{
}
}});
}
function enterManageMail(a)
{
if(location.hostname=='mail.exmail.qq.com')
{
location.href=a+(a.indexOf('?')==-1?'?':'&')+'domain_bak=1';
}
else{
location.href=a;
}
}
function safeJumpQQ(ck,ls,msk)
{
var ckst="";
var newWin=window.open("");
QMAjax.send("/cgi-bin/getuserdata?sid="+getSid()+"&infotype=ckst&t=biz_rf_mgr&ef=js",{method:"POST",content:["r=",Math.random()].join(""),onload:function(_abIsOk,_avParam){
if(newWin==null||typeof newWin=='undefined')
{
getTop().showError("\u6253\u5F00\u8DF3\u8F6C\u7A97\u53E3\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");
}
else if(_abIsOk)
{
try{
var _oData=eval(_avParam);
ckst=_oData.data.ckst;
newWin.location.href="https://mail.qq.com/cgi-bin/login?fun=bizmail&dmtype=bizmail&ck="+ck+"&ls="+ls+"&msk="+msk+"&ckst="+ckst+"&noptlogin=1";
}
catch(e)
{
newWin.close();
getTop().showError("\u8DF3\u8F6C\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");
}
}
else{
newWin.close();
getTop().showError("\u8DF3\u8F6C\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5");
}
}});
}
function checkWxBindStatus(url,callback)
{
if(!url)
{
return false;
}
QMAjax.send(url,{method:"POST",content:["r=",Math.random()].join(""),onload:function(_abIsOk,_avParam){
if(_abIsOk)
{
try{
var _oData=eval(_avParam);
if(typeof callback=="function")
{
callback(_oData);
}
}
catch(e)
{
}
}
}});
}
function doWxBind(c,d)
{
d=d||{};
var b=getTop();
var a=new b.QMDialog({sId:"LoAdINgBOx_doBindWx",sTitle:"\u7ED1\u5B9A\u5FAE\u4FE1",nWidth:540,nHeight:'auto',sBodyHtml:getBindQrTemplate(d).replace({wxticket:c.wxticket}),onload:function(){
var e=this;
setTimeout(function(){
pollDoWxBind(0,e,d);
},2000);
},onclose:function(){
if(b.wx_just_scaned!==true)
{
closeAutoForward();
}
b.fwd_checking_wx=-1;
a=null;
}});
}
function pollDoWxBind(e,c,f)
{
var b=(e||0)+1,a=b>=60?true:false;
var d=getTop();
QMAjax.send("/cgi-bin/setting_wxbind?action=get&refresh_ticket="+a+"&ef=js&t=data_mgr&sid="+getSid(),{method:"POST",onload:function(g,h){
var i=evalValue(h);
if(g&&i.data.isbinded=="1")
{
d.wx_just_scaned=true;
c.S("_closebtn_").click();
if(f&&(typeof f.success=='function'))
{
f.success(true);
}
else{
d.showInfo('\u7ED1\u5B9A\u5FAE\u4FE1\u6210\u529F');
}
}
else if(a)
{
c.S('wx_qrcode').src='https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+i.data.wxticket;
setTimeout(function(){
pollDoWxBind(0,c,f);
},2000);
}
else if(c.S("_closebtn_"))
{
setTimeout(function(){
pollDoWxBind(b,c,f);
},2000);
}
}});
}
function authWxBind(b)
{
var a=getTop();
QMAjax.send("/cgi-bin/setting_wxbind?action=pollcheckauthorize&refresh_ticket=true&ef=js&t=data_mgr&sid="+getSid(),{method:"POST",onload:function(c,d){
var e=evalValue(d);
if(c&&e.data.wx_ticket&&e.data.scan_code&&e.data.valid_time)
{
var h=e.data.wx_ticket,g=e.data.scan_code;
var f=new a.QMDialog({sId:"LoAdINgBOx_authBindWx",sTitle:"\u9A8C\u8BC1\u5FAE\u4FE1",nWidth:540,nHeight:'auto',sBodyHtml:getAuthQrTemplate().replace({wxticket:e.data.wx_ticket}),onload:function(){
var i=this;
setTimeout(function(){
pollAuthWxBind(0,i,h,g);
},2000);
},onclose:function(){
if(a.wx_just_scaned!==true)
{
closeAutoForward();
}
a.fwd_checking_wx=-1;
f=null;
}});
}
}});
}
function pollAuthWxBind(e,c,g,f)
{
var b=(e||0)+1;
var d=getTop();
var i=1800;
var h=2;
var a=(b>1800/h);
QMAjax.send("/cgi-bin/setting_wxbind?action=pollcheckauthorize&refresh_ticket="+a+"&ef=js&t=data_mgr&sid="+getSid()+"&scan_code="+f,{method:"POST",onload:function(j,k){
var l=evalValue(k);
if(j&&l.data.check_res=="1")
{
d.wx_just_scaned=true;
c.S("_closebtn_").click();
d.showInfo('\u9A8C\u8BC1\u5FAE\u4FE1\u6210\u529F');
}
else if(j&&l.data.check_res=="0")
{
d.showError('\u9A8C\u8BC1\u5FAE\u4FE1\u5931\u8D25\uFF0C\u8BF7\u4F7F\u7528\u7ED1\u5B9A\u7684\u5FAE\u4FE1\u626B\u7801');
QMAjax.send("/cgi-bin/setting_wxbind?action=pollcheckauthorize&refresh_ticket=true&ef=js&t=data_mgr&sid="+getSid(),{method:"POST",onload:function(m,n){
var o=evalValue(n);
if(m&&o.data.wx_ticket&&o.data.scan_code&&o.data.valid_time)
{
var q=o.data.wx_ticket,p=o.data.scan_code;
c.S("wx_qrcode").src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+q;
setTimeout(function(){
pollAuthWxBind(b,c,q,p);
},2000);
}
}});
}
else if(c.S("_closebtn_"))
{
setTimeout(function(){
pollAuthWxBind(b,c,g,f);
},2000);
}
}});
}
function createVirtualWeworkCorp(a)
{
QMAjax.send("/cgi-bin/today?sid="+getSid()+"&action=get_code_for_wework&ef=js&t=biz_rf_mgr&newCreateProcess=1",{method:"POST",onload:function(b,c){
var d;
try{
d=evalValue(c);
if(b&&d.data&&d.data.wework_code)
{
a(true,d.data.wework_code);
}
else if(d.retcode=='-101')
{
a(false,'-101');
}
else{
a(false);
}
}
catch(f)
{
a(false);
}
}});
}
function closeAutoForward()
{
var a=S('autofwd0'),b=S("OptionCode2");
if(a)
{
a.click();
}
if(b)
{
b.checked=false;
S("fwdTip").style.display="none";
}
}
function getBindQrTemplate(a)
{
return T('<div id="bindWxBlock" style="padding: 30px 20px;font-size: 14px;">'+'<div style="font-weight: bolder; margin-bottom: 20px;">'+(a.header||'\u4E3A\u907F\u514D\u81EA\u52A8\u8F6C\u53D1\u53EF\u80FD\u9020\u6210\u7684\u91CD\u8981\u4FE1\u606F\u6CC4\u9732\uFF0C\u4F60\u9700\u8981\u7ED1\u5B9A\u5FAE\u4FE1\u540E\u542F\u7528')+'</div>'+'<div id="qr_con" width="260" height="260" style="padding-bottom: 20px;">'+'<img id="wx_qrcode" style="box-shadow: 0 1px 6px #333;" width="200" height="200" src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=$wxticket$">'+'</div>'+'<div style="color: #707070;">'+(a.footer||'\u8BF7\u7528\u5FAE\u4FE1"\u626B\u4E00\u626B"\u4EE5\u7ED1\u5B9A')+'</div>'+'</div>');
}
function getAuthQrTemplate()
{
return T('<div id="bindWxBlock" style="padding: 30px 20px;font-size: 14px;">'+'<div style="font-weight: bolder; margin-bottom: 20px;">\u4E3A\u907F\u514D\u81EA\u52A8\u8F6C\u53D1\u53EF\u80FD\u9020\u6210\u7684\u91CD\u8981\u4FE1\u606F\u6CC4\u9732\uFF0C\u4F60\u9700\u8981\u9A8C\u8BC1\u5FAE\u4FE1\u540E\u542F\u7528</div>'+'<div id="qr_con" width="260" height="260" style="padding-bottom: 20px;">'+'<img id="wx_qrcode" style="box-shadow: 0 1px 6px #333;" width="200" height="200" src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=$wxticket$">'+'</div>'+'<div style="color: #707070;">\u8BF7\u7528\u5FAE\u4FE1"\u626B\u4E00\u626B"\u4EE5\u9A8C\u8BC1</div>'+'</div>');
}
function doReadMailStatistics(b,d)
{
try{
var c=document.getElementById("mainFrame").contentWindow.document.getElementById("tbOtherOptions");
QMAjax.send("/cgi-bin/getinvestigate",{method:"POST",content:'statistics=1&st_mailid='+b+"&"+d+"="+(+new Date()-getTop().currentReadMailStartTime)+"&st_originaltime="+c.getAttribute("data-origintime")});
}
catch(a)
{
}
}
function attachSetFlag(_avParam,_abIsSetStarred,_afCallback)
{
_avParam="&mailattach="+(typeof _avParam=="string"?_avParam.split(","):_avParam).join("&mailattach=");
var _sUrl=[_avParam,"&action=",_abIsSetStarred?"setflag":"cancelflag"].join(""),_sValidTxt=_abIsSetStarred?"\u6536\u85CF":"\u53D6\u6D88\u6536\u85CF";
QMAjax.send("/cgi-bin/attachfolder?t=attachfolder.json",{method:"POST",content:["r=",Math.random(),_sUrl].join(""),onload:function(_abIsOk,_avParam){
if(_abIsOk)
{
try{
var _oData=eval(_avParam);
getTop().showInfo("\u9644\u4EF6\u5DF2"+_sValidTxt);
_afCallback&&_afCallback.call(null,_oData);
}
catch(e)
{
}
}
else{
getTop().showError(_sValidTxt+"\u5931\u8D25");
}
}});
}
;function showAdvanceSearchDialog(a)
{
var c={sid:getTop().getSid(),keyword:(a!="all")?encodeURI(trim(S("subject").value)):""},d=T('/cgi-bin/folderlist?sid=$sid$&t=searchoption'+(getTop().formatDayByLocale?'_v2':'')+'&advancesearch=2&loc=frame_html,,9&advkeyword=$keyword$').replace(c),b=new QMDialog({sId:"advsearch",sTitle:"\u90AE\u4EF6\u9AD8\u7EA7\u641C\u7D22",sUrl:d,nWidth:461,nHeight:426,nFootHeight:48});
}
function getAttachList(_avParam,_afCallback,_aoOption)
{
_aoOption=_aoOption||{};
var _fSelf=arguments.callee,_oArgs=arguments,_oList=(typeof _avParam=="object"&&_avParam.length)?_avParam:[],_ATT_LIST_URL=T("/cgi-bin/readmail?sid=$sid$&t=$t$&s=forward&from=attachfolder&disptype=html&ef=js$param$"),_sParam=TE(['$@$for($oAttach$)$@$','&mailattach=$mailid$|$attachid$|$attachname$|$fileextenal$|$filebyte$','$@$if($editname$)$@$','|$editname$','$@$endif$@$','$@$endfor$@$']).replace({oAttach:_oList});
QMAjax.send(_ATT_LIST_URL.replace({sid:getSid(),t:"compose.json",param:_sParam}),{method:"GET",onload:function(_abIsOk,_avData){
var _bFlag=true;
if(_abIsOk)
{
try{
var _oData=eval(_avData),_oAttachs=_oData.attach;
if(_oAttachs&&_oAttachs.length)
{
for(var i=0;i<_oAttachs.length;i++)
{
if(+_oAttachs[i]["byte"]==0)
{
_bFlag=false;
break;
}
}
}
else{
_bFlag=false;
}
}
catch(e)
{
_bFlag=false;
}
}
if(_bFlag&&_abIsOk)
{
_afCallback(true,_oData);
}
else{
_afCallback(false,_oData);
}
}},_aoOption.ajax);
}
;function isEn()
{
return getLocale()=="en_US";
}
function isCh()
{
return getLocale()=="zh_CN";
}
function getLocale()
{
if(typeof gsLocale=="undefined")
{
return "zh_CN";
}
else{
return gsLocale||"zh_CN";
}
}
function mailRecall(_anType,_aoParam,_aoCallbacks)
{
var _oCallbacks=_aoCallbacks||{},_oPostData=extend({r:Math.random(),sid:getSid()},_aoParam);
if(_oCallbacks.onbeforesend&&_oCallbacks.onbeforesend()===false)
{
return;
}
QMAjax.send("/cgi-bin/send_status",{method:"POST",content:!_anType?T('t=send_status.json&s=mailrecallv2&messageid=$msgid$&time=$time$&sid=$sid$&r=$r$&ef=js').replace(_oPostData):T('t=send_status.json&s=mailrecall_queryv2&taskid=$taskid$&messageid=$msgid$&sid=$sid$&r=$r$&ef=js').replace(_oPostData),onload:function(_abIsOk,_avParam){
if(_abIsOk)
{
try{
var _oData=eval(["(",_avParam,")"].join(""));
if(+_oData.errcode>-1)
{
_oCallbacks.onsuccess&&_oCallbacks.onsuccess(_oData);
return;
}
else{
showError(_oData.errmsg||(_anType==1?"\u67E5\u8BE2\u90AE\u4EF6\u64A4\u56DE\u72B6\u6001\u5931\u8D25\uFF0C\u64A4\u56DE\u7ED3\u679C\u5C06\u7A0D\u540E\u901A\u77E5\u4F60":"\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"));
}
}
catch(e)
{
showError(_oData.errmsg||(_anType==1?"\u67E5\u8BE2\u90AE\u4EF6\u64A4\u56DE\u72B6\u6001\u5931\u8D25\uFF0C\u64A4\u56DE\u7ED3\u679C\u5C06\u7A0D\u540E\u901A\u77E5\u4F60":"\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"));
}
_oCallbacks.onerror&&_oCallbacks.onerror(_avParam);
}
else{
_avParam!="abort"&&showError(_oData.errmsg||(_anType==1?"\u67E5\u8BE2\u90AE\u4EF6\u64A4\u56DE\u72B6\u6001\u5931\u8D25\uFF0C\u64A4\u56DE\u7ED3\u679C\u5C06\u7A0D\u540E\u901A\u77E5\u4F60":"\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"));
_oCallbacks.onerror&&_oCallbacks.onerror(_avParam);
}
_oCallbacks.oncomplete&&_oCallbacks.oncomplete(_abIsOk,_avParam);
}});
}
;function backHome(a)
{
getMainWin().location.href=T('/cgi-bin/today?sid=$sid$&loc=backhome,,,$locid$').replace({sid:getSid(),locid:a||140});
}
function resizeFolderList()
{
var h=S("SysFolderList"),g=S("ScrollFolder"),e=S("folder");
if(h&&g&&e)
{
var f=["auto","hidden"],b=e.clientHeight,d=h.offsetHeight,a=b-d,c=a<50?0:1;
e.style.overflow=f[c];
e.style.overflowX=f[1];
g.style.overflow=f[1-c];
g.style.height=c?(b-d)+"px":"auto";
}
}
function setTopSender(a)
{
var b=getGlobalVarValue("DEF_MAIL_FROM")||'';
switch(a&&a.action)
{case "setting4":
if(b!=a.email)
{
setUserInfo("addr",a.email);
setDefaultSender(a.email);
changeStyle(a.skin,a.logo);
getTop().skin_path=a.skin;
clearCache(["css",getPath("style"),"skin"]);
}
reloadSignature();
break;
}
}
function directChangeSkin()
{
if(window!=getTop())
{
return getTop().directChangeSkin();
}
function _errorHandle(_oXmlObj,_sMode)
{
if(_sMode!="abort")
{
showError("\u5207\u6362\u5E10\u53F7\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002");
}
}
;var _oUserAddrObj=S("useraddr"),_oUserAddrArrowObj=S("useraddrArrow");
if(!_oUserAddrObj)
{
return null;
}
setUserInfo("addr",getDefaultSender());
var _nWidth=195,_oAllMail=getDefalutAllMail(),_nAllMailLen=0,_oTypeMails=[[],[],[]];
for(var _i=0,_nLen=_oAllMail.length;_i<_nLen;_i++)
{
var _nType=_oAllMail[_i].type;
if((_nType>=0||_nType<3)&&_oAllMail[_i].email)
{
_oTypeMails[_nType].push(_i);
_nAllMailLen++;
}
}
var _oItemTmpl=T(['<div style="width:18px;height:16px;float:left;padding-top:3px;">','<img id="img_$id$" src="$images_path$ico_ft_upload_success.gif" width="16px" height="16px" style="display:$display$"/>','</div>','<div title="$email$">$email$</div>']),_oItems=[{sItemValue:['<div style="padding:0 5px;">','<span style="float:right;">','<a id="userIdMgr" href="javascript:;">\u7BA1\u7406\u5E10\u6237</a>','</span>','<span>\u9009\u62E9\u9ED8\u8BA4\u53D1\u4FE1\u5E10\u53F7</span>','</div>'].join("")}],_nCurrentId=0;
for(var j=0;j<3;j++)
{
var _oTypeMail=_oTypeMails[j],_nLen=_oTypeMail.length;
if(j&&_nLen)
{
_oItems.push({nHeight:10,sItemValue:'<hr/>'});
}
for(var i=0,_nLen=_oTypeMail.length;i<_nLen;i++)
{
var _oMail=_oAllMail[_oTypeMail[i]];
if(_oMail.email==getDefaultSender())
{
_nCurrentId=_oTypeMail[i];
}
_oItems.push({sId:_oTypeMail[i],sItemValue:_oItemTmpl.replace({images_path:getPath("image"),display:"none",email:limitString(_oMail.email,38),id:_oTypeMail[i]})});
var _nEmailDispLen=getStrDispLen(_oMail.email)+72;
if(_nWidth<_nEmailDispLen)
{
_nWidth=_nEmailDispLen;
}
}
}
var _oAjaxObj=new QMAjax(),_fDoItemClick=function(_asId){
if(getUserInfoText("addr")==_oAllMail[_asId].email)
{
showInfo('\u9ED8\u8BA4\u53D1\u4FE1\u5E10\u53F7\u5DF2\u5207\u6362');
return;
}
_oAjaxObj.abort();
_oAjaxObj.method="GET";
_oAjaxObj.url=T('/cgi-bin/setting4?sid=$sid$&nosetnick=1&Fun=submit&showdefaultemailfrom=$email$&t=setting4_userinfo&r=$r$').replace({sid:getSid(),email:encodeURI(_oAllMail[_asId].email),r:Math.random()});
_oAjaxObj.onComplete=function(_aoXmlObj){
try{
eval(_aoXmlObj.responseText);
}
catch(_oError)
{
_errorHandle();
return;
}
if(!setting4_userinfo||!setting4_userinfo.email||setting4_userinfo.skin<0)
{
_errorHandle();
return;
}
showInfo('\u9ED8\u8BA4\u53D1\u4FE1\u5E10\u53F7\u5DF2\u5207\u6362');
var _nSkinId=setting4_userinfo.skin,_sEmail=setting4_userinfo.email,_sLogoUrl=setting4_userinfo.logo,_sHref=getMainWin().location.href;
setUserInfo("addr",_sEmail);
setDefaultSender(_sEmail);
changeStyle(_nSkinId,_sLogoUrl);
clearCache(["css",getPath("style"),"skin"]);
getTop().goUserInfo.reset();
if(_sHref.indexOf("/cgi-bin/setting4")>=0||_sHref.indexOf("/cgi-bin/setting5")>=0)
{
setTimeout(function(){
reloadFrm(getMainWin());
},500);
}
else if(_sHref.indexOf("/cgi-bin/today")>=0&&!getUserInfoText("alias"))
{
var _oAlias=S("today_alias",getMainWin());
_oAlias&&(_oAlias.innerHTML=_sEmail);
}
else if(_sHref.indexOf("cgi-bin/readmail")<0&&_sHref.indexOf("cgi-bin/mail_list")<0)
{
var _oTmpComposeGlobal=getMainWin().goCompose;
_oTmpComposeGlobal&&_oTmpComposeGlobal.oQmSender&&_oTmpComposeGlobal.oQmSender.setSenderSelected(_sEmail);
}
_nCurrentId=_asId;
var _oSendMailNameInput=S("sendmailname",getMainWin());
_oSendMailNameInput&&(_oSendMailNameInput.value=_sEmail);
};
_oAjaxObj.onError=_errorHandle;
_oAjaxObj.send();
};
if(_nAllMailLen>1)
{
_oUserAddrArrowObj.style.visibility="visible";
_oUserAddrArrowObj.parentNode.onclick=function(){
var _oPosInfo=calcPos(_oUserAddrObj.parentNode),_oMenu=new (getTop().QMMenu)({sId:"changeskinmenu",oEmbedWin:getTop(),nX:_oPosInfo[3],nY:_oPosInfo[2],nWidth:_nWidth,nItemHeight:21,oItems:_oItems,onitemclick:_fDoItemClick,onload:function(){
var _oSelf=this;
this.S("userIdMgr").onclick=function(){
goUrlMainFrm(T("/cgi-bin/setting4?fun=list&acc=1&sid=$sid$").replace({sid:getSid()}));
_oSelf.close();
};
}});
show(_oMenu.S("img_"+_nCurrentId),1);
};
}
}
;function getPhotoCGI()
{
if(window.location.hostname.indexOf("exmail.qq.com")!=-1)
{
return [getTop().QMDistributeDomain.getHost(),"/cgi-bin/upload?uin=",getTop().getCookie("biz_username"),"&sid=",getTop().getSid()].join("");
}
else{
return [location.protocol,"//",location.host,"/cgi-bin/upload?uin=",getTop().getCookie("biz_username"),"&sid=",getTop().getSid()].join("");
}
}
function getCookieMutiName()
{
var a=arguments.callee;
return (a._oCookieMutiName||(a._oCookieMutiName={"sid":1,"username":1,"foxacc":1,"reloadurl":1,"reloadurl":1,"m3gmsid":1,"mcookie":1,"msid":1,"defaultf":1,"qm_flag":1,"QFRIENDUNREADCNT":1,"RSSUNREADCNT":1,"rss_domain":1,"qqmail_activated":1,"qqmail_alias_default":1,"qqmail_from":1,"wimrefreshrun":1,"new":1,"qm_sk":1,"qm_ssum":1,"qq2self_sid":1,"exstype":1,"lockurl":1,"new_mail_num":1}));
}
function setUserCookie(d,f,b,e,c,a)
{
if(getCookieMutiName()[d]==1)
{
var j=getCookie(d),h=j?j.split("|"):[],k=getUin(),l=k+"&"+f,g=true;
for(var m=0;m<h.length;m++)
{
if(h[m].match(k))
{
h[m]=l;
g=false;
}
}
j=h.join("|");
g&&(j+=(j==""?"":"|")+l);
return setCookie(d,j,b,e,c,a);
}
else {
return setCookie(d,f,b,e,c,a);
}
}
function getUserCookie(a)
{
var c=getCookie(a);
if(getCookieMutiName()[a]!=1)
{
return c;
}
else{
var b=c?c.split("|"):[],d=getUin();
for(var e=0;e<b.length;e++)
{
if(b[e].match(d))
{
return ((b[e].split("&"))[1]||b[e]);
}
}
return c;
}
}
function deleteUserCookie(b,c,a)
{
deleteCookie(b,c,a);
}
function setUserCookieFlag(d,b,a,c)
{
return setCookieFlag(d,b,a,c);
}
function getUserCookieFlag(a)
{
return getCookieFlag(a);
}
Scale=(function(){
var c=1,b=1.10,a=1.25,l=c,m=l,k=650,r="normal",q="",e=true,p=null,o=null,n=null,i=function(t,s){
if(s>1.0)
{
if(s==1.10)
{
addClass(t,"scale1_10");
rmClass(t,"scale1_25");
}
else{
addClass(t,"scale1_25");
rmClass(t,"scale1_10");
}
}
else{
rmClass(t,"scale1_25");
rmClass(t,"scale1_10");
}
},j=function(t,s){
if(gbIsIE)
{
t.style.zoom=s;
}
else if(!gbIsFF)
{
t.style.WebkitTransformOrigin=t.style.MozTransformOrigin=t.style.OTransformOrigin=t.style.TransformOrigin="0 0";
t.style.WebkitTransform=t.style.MozTransform=t.style.OTransform=t.style.Transform="scale("+s+")";
}
i(o,s);
i(getMainWin().document.body,s);
},h=function(){
var s=p.clientHeight,t=p.clientWidth,u=S("qqbrowser_pop",getTop())?S("qqbrowser_pop",getTop()).offsetHeight:0;
m=l;
if(t<1060&&m>c)
{
m=c;
}
else if(t<1250&&m>b)
{
m=b;
}
if(s<595&&m>c)
{
m=c;
}
else if(s<640&&m>b)
{
m=b;
}
j(o,m);
S("resize").style.width=p.clientWidth/m+"px";
S("resize").style.height=p.clientHeight/m-u+"px";
if(gnIEDocTypeVer&&gnIEDocTypeVer<8&&gnIEVer<9)
{
debug('ie6 resize');
var z=S("mainFrame"),x=S("folder"),y=S("leftPanel"),w=finds(".bodybgbt",window)[0],v=getTop().document.body.offsetHeight;
if(z)
{
if(document.location.href.indexOf('t=newwin_frame')>-1)
{
z.style.height=v+'px';
}
else{
z.style.height=v-77-u+'px';
}
y&&(y.style.height=v-77-u+'px');
w&&(w.style.height=v-77-u+'px');
x&&(x.style.height=v-197-u+'px');
resizeFolderList();
}
}
},f=function(){
var t=getMainWin(),s=p.clientWidth;
if(e&&s<=k)
{
m=s/k;
if(r=="normal")
{
r="scale";
q=o.style.cssText;
S("resize").style.width="100%";
S("resize").style.height="100%";
}
if(gnIEDocTypeVer==8)
{
o.style.width=s/m/m+"px";
o.style.height=(p.clientHeight/m/m)+"px";
}
else{
o.style.width=s/m+"px";
o.style.height=p.clientHeight/m+"px";
}
j(o,m);
}
else if(r=="scale")
{
r="normal";
o.style.cssText=q;
h();
}
else{
h();
}
if(t.bSettingDisplay==1)
{
if(m==l||m<1.0)
{
t.NormalViewText&&t.NormalViewText();
}
else{
t.StressViewText&&t.StressViewText(m==c?0:(m==b?1:2));
}
}
},d=function(s){
if(gnIEDocTypeVer!=8)
{
return s;
}
return s/m;
},g=calcPos;
window.calcPos=function(s,t){
return g(s,t,d,d);
};
return {useMini:function(s){
e=!!s;
},getScale:function(){
return m;
},getSizeMode:function(){
switch(m)
{case c:
return 0;
case b:
return 1;
case a:
return 2;
}
},fixFrameCursorPos:function(s){
if(!gbIsIE)
{
return s;
}
return s/m;
},fixCursorPos:function(s,t){
return s/m;
},fixOffsetLeft:function(s){
if(!gbIsIE)
{
return s;
}
return s/m;
},fixOffsetTop:function(s){
if(!gbIsIE)
{
return s;
}
return s/m;
},fixBodyWidth:function(s){
if(gnIEDocTypeVer==8)
{
return s/m;
}
return gnIEDocTypeVer==7?s:s/m;
},fixBodyHeight:function(s){
return s/m;
},resize:function(s){
l=!s?c:(s==1?b:a);
f();
},initResizeScale:function(){
o=document.body;
p=document.documentElement;
if(gbIsIE)
{
o.style.position="relative";
if(gnIEVer==6)
{
this.getContainer().style.overflow='hidden';
}
}
else{
o.style.height="auto";
}
p.style.overflow="hidden";
addEvent(window,"resize",function(){
f();
});
},getContainer:function(){
return getTop().S("resize")||getTop().document.body;
},setBodyClass:function(s){
i(s.document.body,m);
}};
})();
function getReaderData(a)
{
if(window!=getTop())
{
getTop().getReaderData(a);
}
else{
var b=arguments.callee;
removeSelf(b.jsObj);
b.jsObj=loadJsFile(a+"&r="+Math.random(),false,document);
}
}
function getReaderDataInterval(b,a)
{
if(window!=getTop())
{
return getTop().getReaderDataInterval(b,a);
}
else{
var d=arguments.callee,e=(window.gsRssDomain||'')+"/cgi-bin/reader_data2?sid="+getSid()+"&t=rss_data.js";
if(d.nTimer)
{
clearInterval(d.nTimer);
}
function c()
{
getReaderData(e);
}
d.nTimer=setInterval(c,a||(window.gnRssInterval*1000)||(10*60*1000));
c();
}
}
var QMFullTextSearch={};
(function(){
if(window==getTop())
{
QMFullTextSearch._TIP_FULL_TEXT="\u90AE\u4EF6\u5168\u6587\u641C\u7D22...",QMFullTextSearch._TIP_NORMAL_TEXT="\u90AE\u4EF6\u641C\u7D22...",QMFullTextSearch.search=function(c){
var i=function(k,j,l){
if(j.document.getElementsByClassName)
{
return j.document.getElementsByClassName(k);
}
else{
j=j.document;
l=l||"*";
var o=[],m=(l=='*'&&j.all)?j.all:j.getElementsByTagName(l),p=m.length;
k=k.replace(/\-/g,'\\-');
var n=new RegExp('(^|\\s)'+k+'(\\s|$)');
while(--p>=0)
{
if(n.test(m[p].className))
{
o.push(m[p]);
}
}
return o;
}
};
var e=S("subject"),g=i('fn',getTop(),'li')[0];
var h="all";
if(g)
{
h=g.getAttribute('dr');
}
var d={sid:getSid(),searchmode:c||"",folderid:c=="gmnormal"?"8":"all",stat:c=="attach"?"8":"6"},f={};
changeStatus(1);
d.subject=d.sender=d.receiver=e.getAttribute("focus")=="true"&&htmlEncode(encodeURI(trim(e.value)));
if(c=="note")
{
f=T(['/cgi-bin/note_list?sid=$sid$&s=search&keyword=$subject$']);
}
else{
if(attr(e,"fullsearch")=="1")
{
f=T(['/cgi-bin/mail_list?sid=$sid$&s=search&folderid=$folderid$&page=0&subject=$subject$&sender=$sender$','&receiver=$receiver$&searchmode=$searchmode$&topmails=0&advancesearch=0&loc=frame_html,,,$stat$']);
}
else{
if(attr(e,"fullsearch")=="999")
{
f=T(['/cgi-bin/archive_maillist?sid=$sid$&s=search&folderid='+h+'&page=0&keyword=$subject$&sender=$sender$','&receiver=$receiver$&topmails=0&advancesearch=3&combinetype=or&loc=frame_html,,,7']);
}
else{
f=T(['/cgi-bin/mail_list?sid=$sid$&s=search&folderid=$folderid$&page=0&keyword=$subject$&sender=$sender$','&receiver=$receiver$&topmails=0&advancesearch=3&combinetype=or&loc=frame_html,,,7']);
}
}
}
QMPageInit._runFuncAfterCheckMainFrame(function(){
goUrlMainFrm(f.replace(d),false);
});
};
QMFullTextSearch._onevent=function(c){
return function(){
var f=S("subject");
var e=(attr(f,"fullsearch")=="1")?QMFullTextSearch._TIP_FULL_TEXT:QMFullTextSearch._TIP_NORMAL_TEXT;
if(attr(f,"fullsearch")=="999")
e="\u90AE\u4EF6\u4E3B\u9898\u6216\u6536\u53D1\u4EF6\u4EBA\u641C\u7D22...";
var d=S("subjectsearchLogo");
_oValue={focus:[f.getAttribute("focus")!="true","","","true"],blur:[f.value=="",e,"#a0a0a0","false"]}[c];
if(_oValue[0])
{
f.value=_oValue[1];
f.style.color=_oValue[2];
f.setAttribute("focus",_oValue[3]);
}
if(c=="focus"&&f.value!="")
{
QMFullTextSearch.QMAuto.show(a());
}
d&&(setClass(d,c=="focus"?"ss_icon ss_endicon ss_icon_return":"ss_icon ss_endicon ss_icon_arrowdown"));
};
};
QMFullTextSearch.onkeydown=function(c){
if(c.keyCode==13)
{
}
};
function a()
{
var d=S("subject"),g=T("<div unselectable=\"on\" class=\"ss_drop_item\"><a href=\"javascript:;\" unselectable=\"on\"><span unselectable=\"on\" class=\"ss_icon ss_icon_mail\"></span>\u5305\u542B<b unselectable=\"on\">$keyword$</b>\u7684\u90AE\u4EF6</a></div>"),h=T("<div unselectable=\"on\" class=\"ss_drop_item\"><a href=\"javascript:;\"				unselectable=\"on\"><span class=\"ss_icon ss_icon_note\" unselectable=\"on\"></span>\u5305\u542B<b unselectable=\"on\">$keyword$</b>\u7684\u8BB0\u4E8B</a></div>"),e="<div class=\"ss_drop_item ss_drop_split\" unselectable=\"on\"><a unselectable=\"on\" href=\"javascript:;\">\u9AD8\u7EA7\u641C\u7D22...</a></div>",f=trim(d.value);
if(f=="")
{
return "";
}
else{
var c=13;
f=(f.length>c)?f.substring(0,c)+"...":f;
if(attr(d,"fullsearch")!="1")
{
if(attr(d,"fullsearch")=="999")
{
return [{sId:"searchInMail",sItemValue:g.replace({keyword:htmlEncode(f)})}];
}
else{
return [{sId:"searchInMail",sItemValue:g.replace({keyword:htmlEncode(f)})},{sId:"advanceSearch",sItemValue:e}];
}
}
else{
return [{sId:"searchInMail",sItemValue:g.replace({keyword:htmlEncode(f)})},{sId:"searchInNotes",sItemValue:h.replace({keyword:htmlEncode(f)})},{sId:"advanceSearch",sItemValue:e}];
}
}
}
function b()
{
var c=S("subject");
if(!c)
{
return;
}
QMFullTextSearch.QMAuto=new QMAutoComplete({oInput:c,oPosObj:S("smartSearch"),nWidth:280,oClass:{classnormal:"ss_drop_item_wrap",classhigh:"ss_drop_item_wrap_hover"},ongetdata:function(){
return a();
},onselect:function(d){
if(d.sId=="searchInMail")
{
QMFullTextSearch.search();
}
else if(d.sId=="searchInAttach")
{
QMFullTextSearch.search("attach");
}
else if(d.sId=="searchInGroupMail")
{
QMFullTextSearch.search("gmnormal");
}
else if(d.sId=="searchInNotes")
{
QMFullTextSearch.search("note");
}
else{
showAdvanceSearchDialog();
}
}});
}
waitFor(function(){
return getTop().QMAutoComplete;
},function(c){
if(c)
{
b();
}
},1000,30000);
QMFullTextSearch.onfocus=QMFullTextSearch._onevent("focus");
QMFullTextSearch.onblur=QMFullTextSearch._onevent("blur");
}
})();
function changeStatus(a)
{
var b=S("searchIcon");
b&&setClass(b,a?"ss_icon ss_fronticon ss_icon_loading":"ss_icon ss_fronticon ss_icon_search");
}
function doSearch()
{
QMPageInit._runFuncAfterCheckMainFrame(function(){
var a=S("frmSearch");
a.sender.value=a.subject.value;
a.receiver.value=a.subject.value;
a.keyword.value=a.subject.value;
a.combinetype.value="or";
submitToActionFrm(a);
});
return false;
}
function audioPlay(a)
{
var b=getTop();
if(!a.container)
{
a.container=S('mp3player_container',b.getMainWin());
}
if(a.global&&!a.globalcontainer)
{
a.globalcontainer=S('gplayer_container',b);
}
if(!b.QMPlayer)
{
loadJsFileToTop(getPath('js'),[getFullResSuffix('qmplayer.js')]);
}
waitFor(function(){
return !!b.QMPlayer;
},function(c){
if(c)
{
b.QMPlayer.createInstance(a);
}
else if(a.container)
{
a.container.innerHTML="\u64AD\u653E\u5668\u52A0\u8F7D\u5931\u8D25";
}
});
}
function audioStop()
{
var a=getTop().QMPlayer;
a&&a.stop();
}
function setPlayer(a)
{
var c=getTop();
function b(d)
{
if(!c.QMPlayer)
{
setTimeout(function(){
b(d);
},200);
return false;
}
var f="qqmailMediaPlayer"+(d.id||""),e=d.win||window;
if(!e||e[f])
{
return false;
}
if(!d.container&&!(d.container=S("mp3player_container",e)))
{
return false;
}
return (e[f]=new c.QMPlayer()).setup(d);
}
if(!c.QMPlayer)
{
loadJsFile(getPath("js")+getFullResSuffix("qmplayer.js"),true,c.document);
}
return b(a);
}
function playUrl(a)
{
var b=(a.win||window)["qqmailMediaPlayer"+(a.id||"")];
if(!b)
{
setPlayer(a);
}
else{
b.openUrl(a.url,a.dispInfo);
}
}
function stopUrl(a)
{
if(!a)
{
a={};
}
try{
(a.win||window)["qqmailMediaPlayer"+(a.id||"")].stop();
}
catch(b)
{
}
}
function searchMusic(c,b,a)
{
if(window!=getTop())
{
return getTop().searchMusic(c,b,a);
}
c=c||"";
b=b||"";
var d=arguments.callee,e=[c,b].join("@");
d.fCallBack=function(f){
var l,o="",m=[];
if(!f.contentWindow.gMusicInfo||!(l=f.contentWindow.gMusicInfo.list))
{
return a(m);
}
for(var p=0,g=l.length;p<g;p++)
{
var k={song:l[p].songname.replace(/<\/?strong>/gi,""),singer:l[p].singername.replace(/<\/?strong>/gi,"")},n=htmlDecode(l[p].songurl).replace(/\|/g,"").split(";");
for(var q=0,h=n.length;q<h;q+=2)
{
if(n[q]&&n[q].indexOf("qqmusic.qq.com")==-1)
{
k.url=n[q].replace(/^(FI|SI|AN|QQ)/,"");
m.push(k);
break;
}
}
}
d._oDataMap[e]=m;
a(m);
};
if(!c&&!b)
{
return a([]);
}
if(!d._oDataMap)
{
d._oDataMap={};
}
if(d._oDataMap[e])
{
return a(d._oDataMap[e]);
}
d._oDataDomObj=createBlankIframe(getTop(),{id:"getMusicUrlFromSoSo",style:"display:none;",header:T(['<script>','function searchJsonCallback(a)','{','window.gMusicInfo = a;','}','<\/script>','<script src="$domain$/fcgi-bin/fcg_search_xmldata.q?w=$song$%20$singer$&source=3&r=$rand$"><\/script>']).replace({domain:(location.protocol=="https:"?'https://ptlogin2.mail.qq.com':'http://cgi.music.soso.com'),song:encodeURI(c),singer:encodeURI(b),rand:Math.random()}),destroy:true,onload:function(f){
searchMusic.fCallBack(this);
}});
}
function getMusicUrl(c,b,a)
{
searchMusic(c,b,function(d){
if(d.length>0)
{
var g=0,e=/\.mp3$/i;
for(var f=0;(gbIsMac||gbIsLinux)&&f<d.length;f++)
{
if(e.test(d[f].url))
{
g=f;
break;
}
}
debug(d[g].url);
a(d[g].song,d[g].singer,d[g].url,d);
}
else{
a(c,b,"",d);
}
},1);
}
function startWebpush(a)
{
var b=getTop();
if(!(b.QMWebpushTip&&b.QMWebpush))
{
b.loadCssFile(getPath("css")+b.getFullResSuffix("webpushtip.css"),true);
b.loadJsFileToTop(getPath("js"),[b.getFullResSuffix("qmwebpush.js"),b.getFullResSuffix("qmwebpushtip.js")]);
}
waitFor(function(){
return b.QMWebpushTip;
},function(c){
if(c)
{
b.QMWebpushTip.open(a);
}
},1000,30000);
}
function closeWebpush(a)
{
getTop().QMWebpushTip&&getTop().QMWebpushTip.close(a,true);
}
function ftSendStatic(b,a)
{
if(b)
{
ossLog("realtime","all",T('stat=exskick&sid=$sid$&uin=$uin$&log=$code$').replace({uin:a||getTop().g_uin,sid:getSid(),code:b}));
}
}
var QMXfDownload=function(){
this._mnXfStatus=0;
this._mnVer="";
};
QMXfDownload.prototype.init=function(){
var b=null,a=null;
try{
b=new ActiveXObject("QQIEHelper.QQRightClick.2");
}
catch(c)
{
debug("x:"+c.message);
this._mnXfStatus=1;
return;
}
this._mnVer=a=parseInt(b.GetVersion().split(".").pop());
this._mnXfStatus=a>65?3:2;
delete b;
};
QMXfDownload.prototype.getStatus=function(){
return this._mnXfStatus;
};
QMXfDownload.prototype.dl=function(b,a){
a=a||"";
if(this._mnXfStatus>2)
{
var d=new ActiveXObject("QQIEHelper.QQRightClick.2"),c=this._mnVer;
if(c>=127)
{
d.SendUrl2(b,location.href,a,document.cookie,0,10500);
}
else if(c>65)
{
d.SendUrl(b,location.href,a,document.cookie);
}
delete d;
}
};
var QMdlRespXml=function(a){
var c=a&&a.responseText,b=c?c.split("|"):["error","DEF_ERR"];
this._msErrorCode=null;
this._msKey=null;
this._msDownLoadUrl=null;
if(b[0]!="error"&&b[0].indexOf("http://")==0)
{
this._msDownLoadUrl=b[0].replace(/#/g,"_");
this._msKey=b[1];
}
else{
this._msErrorCode=QMdlRespXml._TEMPLATE[b[1]]?b[1]:"DEF_ERR";
}
};
QMdlRespXml._TEMPLATE={"-102":"\u8BE5\u6587\u4EF6\u5DF2\u88AB\u6587\u4EF6\u6240\u6709\u8005\u5220\u9664\u3002","-1":"\u672A\u77E5\u9519\u8BEF","-201":"\u6587\u4EF6\u4E0B\u8F7D\u5DF2\u8FBE\u4E0A\u9650\uFF0C\u65E0\u6CD5\u4E0B\u8F7D","DEF_ERR":"\u83B7\u53D6\u4E0B\u8F7D\u5730\u5740\u5931\u8D25"};
QMdlRespXml.prototype.getError=function(){
return this._msErrorCode;
};
QMdlRespXml.prototype.getErrorMsg=function(){
return QMdlRespXml._TEMPLATE[this._msErrorCode];
};
QMdlRespXml.prototype.getKey=function(){
return this._msKey;
};
QMdlRespXml.prototype.getUrl=function(){
setCookie("qm_ftn_key",this._msKey,new Date(new Date().valueOf()+3600*1000),"/","qq.com");
return this._msDownLoadUrl;
};
var QMFtnRen=function(){
this._moConfig=null;
};
QMFtnRen._TEMPLATE={DLG:T(['<div class="dialog_input_wrap">','\u8BF7\u8F93\u5165\u65B0\u7684\u6587\u4EF6\u540D\uFF1A','<div>','<input id="dlgtxt" type="text" class="dialog_input" value="$name$" />','</div>','</div>']),DLG_FOOT:T(['<a id="dlgok" class="btn_blue" href="javascript:;">\u786E\u5B9A</a>']),MINDLG:T(['<div class="dialog_input_wrap">','\u8BF7\u8F93\u5165\u65B0\u7684\u6587\u4EF6\u540D\uFF1A','<div>','<input id="dlgtxt" type="text" class="dialog_input" value="$name$" style="width:110px;" />&nbsp;','<a id="dlgok" class="btn_blue" href="javascript:;">\u786E\u5B9A</a>','</div>','</div>'])};
QMFtnRen.prototype.init=function(a){
this._moConfig=a||{};
};
QMFtnRen.prototype.checkFileName=function(a){
if(trim(a)=="")
{
showError("\u6587\u4EF6\u540D\u4E0D\u80FD\u4E3A\u7A7A");
return false;
}
else{
var c="\\ / : * ? \" < > |",b=c.split(" ");
for(var d in b)
{
if(a.indexOf(b[d])!=-1)
{
showError("\u6587\u4EF6\u540D\u4E0D\u80FD\u5305\u542B "+c);
return false;
}
}
}
return true;
};
QMFtnRen.prototype.ren=function(a){
var c=this;
function d(e,g)
{
var h="",f=new QMAjax();
if(e==a.filename)
{
g.close();
return;
}
if(!c.checkFileName(e))
{
return;
}
h=T("sid=$sid$&oper=filealter&bus=$bus$&filename=$filename$&fid=$fid$&t=re_ftnfilefunc&resp_charset=UTF8").replace({sid:getSid(),filename:encodeURIComponent(e),fid:a.fid,bus:a.appid});
f.url="/cgi-bin/ftnTagMgr";
f.method="POST";
f.onComplete=f.onError=function(i){
var k=null;
if(i)
{
if(i.responseText.indexOf("({")==0)
{
k=evalValue(i.responseText);
if(k.error=="0")
{
showInfo("\u6587\u4EF6\u6539\u540D\u6210\u529F");
a.okCallBack();
}
else if(k.error=="-2")
{
showError("\u65E7\u7F51\u76D8\u7684\u6587\u4EF6\u4E0D\u652F\u6301\u6539\u540D");
}
}
else{
var j=getActionWin().document;
j.open();
j.write(i.responseText);
j.close();
}
}
};
f.send(h);
g.close();
if(c._moConfig.skin=="MINDLG")
{
showInfo("\u6587\u4EF6\u6539\u540D\u4E2D...");
}
else{
showProcess(1,true,"\u6587\u4EF6\u6539\u540D\u4E2D, \u8BF7\u7A0D\u7B49...","",true);
}
}
var b=this._moConfig;
new (getTop().QMDialog)({sTitle:"\u6587\u4EF6\u91CD\u547D\u540D",sBodyHtml:QMFtnRen._TEMPLATE[b.skin||"DLG"].replace({name:a.filename||""}),sFootHtml:QMFtnRen._TEMPLATE["DLG_FOOT"],nWidth:b.width||null,nHeight:b.height||180,onshow:function(){
var g=this.S("dlgtxt"),e=g.value.lastIndexOf('.');
if(!window.getSelection)
{
var f=g.createTextRange();
f.moveStart("character",0);
f.moveEnd("character",e-g.value.length);
f.select();
}
else{
g.selectionStart=0;
g.selectionEnd=e;
}
g.focus();
},onload:function(){
var e=this;
addEvent(e.S("dlgok"),"click",function(){
var f=e.S("dlgtxt").value;
d(f,e);
});
e.S("dlgtxt").onkeydown=function(f){
var g=(e.option("oEmbedWin").event||f).keyCode,h=e.S("dlgtxt").value;
if(g==13||g==9)
{
d(h,e);
}
};
}});
};
function twoDCodeImgUrl(a)
{
var b=location.getParams(a);
return TE(['/cgi-bin/generate_twodimcode?out=250&sid=$@$eval getSid()$@$','$@$if($mailid$)$@$','&filename=$@$eval escape($filename$)$@$&mailid=$mailid$','$@$else if($att$)$@$','&att=$att$&action=groupattach','$@$else if($k$)$@$','&k=$k$&code=$code$&action=bigattach','$@$endif$@$']).replace(b);
}
function showTwoDCodeImgMenu(b,a,d,c)
{
var k=this,i=b.document,j=calcPos(a),h=j[2]-40,f=0,g=bodyScroll(i,"scrollTop"),e=bodyScroll(i,"clientHeight");
if((f=h+320-g-e)>0)
{
h-=(f+10);
}
new QMMenu({oEmbedWin:b,sId:"scanImg",nArrowPos:j[0]-h-5,bAutoClose:false,sWidthDetect:"float",nArrowDirection:"Left",nWidth:"auto",nX:j[3]+25,nY:h,onshow:function(){
if(gnIEVer==6)
{
this.S("twodcode").src=this.S("twodcode").src;
}
},oItems:[{bDisSelect:true,sStyle:"padding:0;",nHeight:"auto",sItemValue:T(['<div style="width:300px;height:310px;padding-top:10px;">','<div style="text-align:center;">','<img id="twodcode" style="width:250px;height:250px;" src="$src$"/>','</div>','<div style="margin-top:-5px;">','<p style="margin:0;text-align:center;padding:5px 0;">\u626B\u63CF\u4E8C\u7EF4\u7801\uFF0C\u5C06\u9644\u4EF6\u4E0B\u8F7D\u5230\u624B\u673A\u3002</p>','<p style="margin:0;text-align:center;padding:5px 0;">\uFF08\u4E8C\u7EF4\u7801\u6709\u6548\u671F\u4E3A5\u5206\u949F\uFF09</p>','</div>','</div>']).replace({filename:d,src:twoDCodeImgUrl(c)})}]});
}
function ckDns(a)
{
E(a,function(b,d){
var c=(new Image());
c.src=["http://",b,"/zh_CN/htmledition/images/spacer.gif"].join("");
});
}
function beginStatTime(a)
{
var b=parseInt(a.location.hash.split("stattime=").pop());
if(!isNaN(b)&&b.toString().length==13&&b>(getTop().gnStatTimeStamp||0))
{
a.gnBeginTime=getTop().gnStatTimeStamp=b;
a.gnStatTimeStart=now();
}
}
function endStatTime(b,a)
{
var c=b.gnBeginTime,e=b.gnStatTimeStart,d=now();
if(!isNaN(e)&&!isNaN(c))
{
addEvent(b,"load",function(){
var f=now();
ossLog("delay","sample",T(['stat=cgipagespeed&type=$type$&t1=$t1$&t2=$t2$&t3=$t3$','&rcgi=$appname$&rt=$t$&rs=$s$&allt=$allt$&flowid=$wm_flowid$']).replace(extend(a,{t1:e-c,t2:d-e,t3:f-d,allt:[c,e,d,f].join("|")})));
});
}
}
function ossLog()
{
var a=getTop().ossLog;
return a._ossLog.apply(a,arguments);
}
ossLog._ossLog=function(b,d,c,a){
var g=this,i=b||"realtime",h=g._pasteLog(c),f=g._oLogList||(g._oLogList=[]),e=typeof d=="number"?d:{all:1}[d||"all"]||0.1;
if(i=="realtime")
{
g._isSample(e)&&g._doReport(h);
}
else{
g._isSample(e)&&f.push(["delayurl","=",encodeURIComponent(h)].join(""));
f.length>=1000?g._doReport():(!g._nTimer&&f.length>0&&(g._nTimer=setTimeout(g._doReport,5*1000)));
}
};
ossLog._doReport=function(a){
var c=ossLog,b=c._oLogList;
if(a||b.length>0)
{
QMAjax.send("/cgi-bin/getinvestigate",{method:"POST",timeout:500,content:T('sid=$sid$&$rl$&$ls$').replace({sid:getSid(),rl:a,ls:b.join("&")})});
b.length=0;
c._nTimer&&clearTimeout(c._nTimer);
c._nTimer=null;
}
};
ossLog._isSample=function(a){
return (this._nTimeStamp||(this._nTimeStamp=now()))%100<100*a;
};
ossLog._pasteLog=function(a){
var b=[];
typeof a=="string"?b.push("&",a):E(a,function(d,c){
b.push("&",c,"=",encodeURIComponent(d));
});
return b.shift()&&b.join("");
};
function LogKvEx(b)
{
var a=getTop().extend({type:"session_statistics"},b);
if(!a.businame||!a.item)
{
return false;
}
else if((a.type=="session_statistics"||a.type=="session_str_statistics")&&!a.sid)
{
return false;
}
new Image().src="/cgi-bin/sellonlinestatic?type="+a.type+"&businame="+a.businame+"&item="+a.item+"&r="+Math.random()+(a.sid?"&sid="+a.sid:"");
}
function isdLog(c,a,b)
{
var e=T([window.location.protocol,"//isdspeed.qq.com/cgi-bin/r.cgi?flag1=6000&flag2=101&flag3=$flag$&$key$=$value$&r=$r$"]),d=new Image();
setTimeout(function(){
d.src=e.replace({flag:c,key:a,value:b||"1",r:Math.random()});
});
}
function all_js()
{
}
function hideEditorMenu()
{
if(getTop().QMEditor)
{
getTop().QMEditor.hideEditorMenu();
}
}
function OprMouseDown(a)
{
hideMenuEvent(a);
getTop().OprATagForDistributeDomain(a);
hideCalendar(a);
}
function hideCalendar(a)
{
if(getTop()._oCalendar)
{
getTop().removeSelf(getTop()._oCalendar.calendar);
getTop()._oCalendar=null;
}
}
function hideMenuEvent(b)
{
var d=getEventTarget(b),c=getTop().QMMenu&&getTop().QMMenu();
for(var e in c)
{
!c[e].isContain(d)&&c[e].close();
}
try{
}
catch(a)
{
}
}
function confirmBox(a)
{
var c=2,b=a.defaultChecked||false,e=a.confirmBtnTxt||"\u786E\u5B9A",d=a.cancelBtnTxt||"\u53D6\u6D88",f=a.neverBtnTxt;
new (getTop().QMDialog)({bAlignCenter:a.bAlignCenter,sId:a.id||"QMconfirm",sTitle:a.title||"\u786E\u8BA4",sBodyHtml:TE(['<div class="$sStyle$">','$@$if($sType$=="custom")$@$','$msg$','$@$else$@$','<div class="cnfx_content">','<span class="dialog_icon $icon$"></span>','<div class="dialog_f_c">$msg$</div>','</div>','<div class="cnfx_status" style="display:$statusdisp$;">','<input id="recordstatus" class="cnfx_status_checkbox" type="checkbox" $checked$/><label for="recordstatus">$recordinfo$</label>','</div>','$@$endif$@$','</div>']).replace({sStyle:a.style||'',sType:a.sType||"",msg:a.msg,caceldisp:a.mode=="alert"?"none":"",imgdisp:a.mode=="prompt"?"none":"block",recordinfo:a.recordInfo,statusdisp:a.enableRecord?"":"none",checked:a.defaultChecked?"checked":"",confrim:e,confirmcss:getAsiiStrLen(e)>5?"":"wd2",cancel:d,cancelcss:getAsiiStrLen(d)>5?"":"wd2",never:f,neverdisp:f?'':'none',nevercss:getAsiiStrLen(f)>5?"":"wd2",icon:a.icon||"icon_info_b"}),sFootHtml:T(['<div class=" txt_right cnfx_btn">','<input class="btn_blue btn_input" type="button" id="confirm" value="$confirm$" />','<input class="btn_gray btn_input" type="button" id="cancel" style="display:$caceldisp$;" value="$cancel$" />','<input class="btn_gray btn_input" type="button" id="never" style="display:$neverdisp$;" value="$never$" />','</div>']).replace({caceldisp:a.mode=="alert"?"none":"",confirm:e,confirmcss:getAsiiStrLen(e)>5?"":"wd2",cancel:d,cancelcss:getAsiiStrLen(d)>5?"":"wd2",never:f,neverdisp:f?'':'none',nevercss:getAsiiStrLen(f)>5?"":"wd2"}),nWidth:a.width,nHeight:a.height,onload:function(){
var j=this,h=j.S("confirm"),g=j.S("cancel"),i=j.S("never");
addEvents([h,g,i],{click:function(k){
var l=getEventTarget(k);
if(l==h)
{
if(j.S("recordstatus"))
{
b=j.S("recordstatus").checked;
}
c=1;
}
else if(l==i)
{
c=3;
}
if(l==h&&j.S("folder_needValid"))
{
try{
var n=callBack.call(j,a.onreturn,[c==1,b,c]);
if(n)
{
j.close();
}
}
catch(m)
{
}
}
else{
j.close();
}
}});
callBack.call(j,a.onload);
},onshow:function(){
gbIsMac||this.S("confirm").focus();
callBack.call(this,a.onshow);
},onclose:function(){
callBack.call(this,a.onclose);
},onbeforeclose:function(){
try{
if(this.S("folder_needValid"))
{
}
else{
callBack.call(this,a.onreturn,[c==1,b,c]);
}
}
catch(g)
{
}
return true;
}});
}
function alertBox(a)
{
confirmBox(extend({mode:"alert"},a));
}
function promptBox(a)
{
var b=false,c=a.onreturn;
if(getTop().userFolderTree.length>0&&a.isSelect&&a.isSelect==1)
{
a.onreturn=function(d){
var e=this;
return callBack.call(e,c,[b||d,e.S("txt").value,e.S("folderid").value=="undefined"?0:e.S("folderid").value,e]);
};
a.msg=T(['<div class="dialog_select_input_wrap txt_left">','<div style="font-weight:bold;float:left;margin-right:10px;margin-bottom:8px;">$msg$</div>','<div id="folder_needValid" class="f_size red"></div>','<div style="clear:both;"><input type="text" id="txt" class="dialog_input" value="$defaultValue$"/></div>','<input type="hidden" id="folderid" value="0"/>','</div>','<div class="dialog_select_wrap txt_left">','<p style="margin-left:20px;font-weight:bold;">$msgselect$</p>','<div class="selectContainer">','<ul class="fdul" id="selectContainer" style="overflow:hidden;">','</ul>','</div>','</div>']).replace(a);
}
else if(getTop().userFolderTree.length>0&&a.isRenameFolder&&a.isRenameFolder==1)
{
a.onreturn=function(d){
var e=this;
return callBack.call(e,c,[b||d,e.S("txt").value,0,e]);
};
a.msg=T(['<div class="dialog_input_wrap txt_left">','<div style="float:left;margin-right:10px;margin-bottom:8px;">$msg$</div>','<div id="folder_needValid" class="f_size red"></div>','<div style=""><input type="text" id="txt" class="dialog_input" value="$defaultValue$"/></div>','</div>']).replace(a);
}
else{
a.onreturn=function(d){
var e=this;
callBack.call(e,c,[b||d,e.S("txt").value]);
};
a.msg=T(['<div class="dialog_input_wrap txt_left">','<p>$msg$</p>','<div style=""><input type="text" id="txt" class="dialog_input" value="$defaultValue$"/></div>','<div style="" class="f_size addrtitle">$description$</div>','</div>']).replace(a);
}
confirmBox(extend({sType:"custom",height:a.height||null,onload:function(){
var d=this;
addEvent(d.S("txt"),"focus",function(e){
if(d.S("folder_needValid"))
{
d.S("folder_needValid").innerHTML="";
}
});
addEvent(d.S("txt"),"keydown",function(e){
if(d.S("folder_needValid"))
{
}
else if(e.keyCode==13)
{
b=true;
d.close();
}
});
},onshow:function(){
var d=this;
d.S('txt').select();
d.S("txt").focus();
if(getTop().userFolderTree.length>0&&d.S("selectContainer"))
{
var j,g;
d.S("selectContainer").innerHTML=getTop().folderTree.getPopFolder(getTop().userFolderTree);
var h;
addEvent(this._moPanelDom,"click",function(i){
var q=getEventTarget(i);
while(q.tagName!="BODY")
{
if(q.tagName=="LI"&&q.id.match(/folder_.*/)&&q.getAttribute("level")!=3)
{
h=q.id.replace("folder_","").replace("_td","");
g=q;
if(j&&(g.id!=j.id))
{
try{
j.classList.remove("fn");
j.classList.add("fs");
}
catch(r)
{
j.className.indexOf("fn")>=0&&(j.className=j.className.replace("fn",""));
j.className=j.className+" fs";
}
}
try{
q.classList.remove("fs");
q.classList.add("fn");
}
catch(r)
{
q.className.indexOf("fs")>=0&&(q.className=q.className.replace("fs",""));
q.className=q.className+" fn";
}
j=g;
break;
}
else if(q.tagName=="IMG")
{
var o=q.parentNode.nextElementSibling,p=q;
if(q.parentNode.getAttribute("level")&&q.parentNode.getAttribute("level")==0)
{
o=q.parentNode.parentNode.nextElementSibling;
}
if(!o||o.tagName=="LI")
{
var n=!(p.className=="fd_off");
setClass(p,n?"fd_off":"fd_on");
}
else if(o&&p)
{
var n=!(p.className=="fd_off");
setClass(p,n?"fd_off":"fd_on");
show(o,n);
}
break;
}
else{
q=q.parentNode;
}
}
if(h!="")
{
d.S("folderid").value=h;
}
});
var f;
if(!a.selectedId)
{
a.selectedId="personal";
}
for(var m=0;m<d.S("selectContainer").getElementsByTagName("li").length;m++)
{
if(d.S("selectContainer").getElementsByTagName("li")[m].id=="folder_"+a.selectedId+"_td")
{
if(d.S("selectContainer").getElementsByTagName("li")[m].getAttribute("level")=="3")
{
f=d.S("selectContainer").getElementsByTagName("li")[m].parentNode.previousSibling;
}
else if(d.S("selectContainer").getElementsByTagName("li")[m].getAttribute("level")=="1"||d.S("selectContainer").getElementsByTagName("li")[m].getAttribute("level")=="2"||d.S("selectContainer").getElementsByTagName("li")[m].getAttribute("level")=="0")
{
f=d.S("selectContainer").getElementsByTagName("li")[m];
}
try{
f.click();
}
catch(k)
{
}
try{
f.fireEvent("onclick");
}
catch(k)
{
}
try{
var l=document.createEvent('Event');
l.initEvent("click",true,true);
f.dispatchEvent(l);
}
catch(k)
{
}
f.scrollIntoView(true);
break;
}
}
}
}},a));
}
function loadingBox(a)
{
if(!callBack(a.oncheck))
{
var b=new QMDialog({sId:"LoAdINgBOx",sTitle:a.model+"\u6A21\u5757\u52A0\u8F7D\u4E2D...",nWidth:400,nHeight:'auto',sBodyHtml:T(['<div style="text-align:center;padding:58px;">','<img id="load" src="$images_path$ico_loading2.gif">','<span id="err" style="display:none;">$model$\u6A21\u5757\u52A0\u8F7D\u5931\u8D25</span>','</div>']).replace(extend(a,{images_path:getPath("image")})),onclose:function(){
b=null;
}});
if(a.js)
{
var c=[];
E(typeof a.js=="string"?[a.js]:a.js,function(d){
c.push(d);
});
loadJsFileToTop(c);
}
waitFor(function(){
return callBack(a.oncheck);
},function(d){
if(!b)
{
return;
}
if(!d)
{
show(b.S("load"),false);
show(b.S("err"),true);
}
else{
b.close(true);
callBack(a.onload);
}
});
}
else{
callBack(a.onload);
}
}
(function(){
var c=getTop();
function b(f,e)
{
var f="weixinCss";
if(!c.S(f))
{
var g=c.document.createElement("style");
g.type="text/css";
g.id=f;
if(c.gbIsIE)
{
g.styleSheet.cssText=e;
}
else{
g.innerHTML=e;
}
c.document.getElementsByTagName("head")[0].appendChild(g);
}
}
var a=TE(['<div id="mask" class="editor_mask opa50Mask editor_maskAtt" ></div>','<div id="out" style="z-index:1000;position: absolute;width:$width$%;height:$height$%;margin-top:$offsetTop$%;margin-left:$offsetLeft$%;outline:0;" tabindex="-1" hidefocus="hidefocus">','<a id="close" href="javascript:;" title="\u5173\u95ED" style="$@$if($noclose$)$@$display:none$@$endif$@$;position:absolute;right:0;top:16px;width:23px;height:23px;margin:-24px -9px 0 0;background:url($images_path$newicon/login.png) no-repeat 0 0;"></a>','<div id="body" style="width:100%;height:100%">$html$</div>','</div>']);
function d(e)
{
b(e.sId,e.sCssRule);
new QMPanel({oEmbedWin:c,sStyle:"position:absolute;width:100%; height:100%; left:0; top:0; margin-top:-2px",nWidth:"auto",nHeight:"auto",sId:"weixinnote",sBodyHtml:a.replace({noclose:e.bNoCloseBtn,html:e.sBodyHtml,images_path:getPath("image"),offsetTop:(100-e.nHeightPercent)/2,offsetLeft:(100-e.nWidthPercent)/2,width:e.nWidthPercent,height:e.nHeightPercent}),onclose:e.onclose,onload:function(){
var f=this;
f.S("mask").onclick=f.S("close").onclick=function(){
f.close();
};
e.onload&&callBack.call(f,e.onload,[f]);
}});
}
window.maskPanel=d;
})();
function getQMPluginInfo(a)
{
var c=(gbIsWin&&((gbIsFF&&gsFFVer.split(".")[0]>=3&&(gsFFVer.split(".")[1]>0||gsFFVer.split(".")[2]>=8||parseInt(navigator.buildID.substr(0,8))>=20090701))||(gbIsChrome&&(""+gsChromeVer).split('.')[0]>=6)||(gbIsSafari&&gsAgent.indexOf("se 2.x metasr 1.0")<0)||(gbIsOpera)||(gbIsQPlus)||(gbIsQBWebKit&&getQMPluginInfo._compareVersion(gsQBVer,"6.5")>0)))||(gbIsMac&&getQMPluginInfo._compareVersion(gsMacVer,a)>=0&&(gbIsFF&&parseFloat(gsFFVer)>=3.6||gbIsChrome&&parseFloat(gsChromeVer)>=8||gbIsSafari&&parseFloat(gsSafariVer)>=5||gbIsQBWebKit));
return c;
}
getQMPluginInfo._compareVersion=function(a,b){
var g=a.split("."),e=g.length,h=b.split("."),f=h.length;
for(var j=0;j<e&&j<f;j++)
{
var c=parseInt(g[j]),d=parseInt(h[j]);
if(c==d)
{
continue;
}
return c>d?1:-1;
}
if(j<e)
{
return 1;
}
if(j<f)
{
return -1;
}
return 0;
};
var QMAXInfo={_moInfos:{path:"/activex/",cab:["TencentMailActiveX.cab","TencentMailActiveX_2.cab"],exe:"TencentMailActiveXInstall.exe",obj:[["TXGYMailActiveX.ScreenCapture","TXGYMailActiveX.UploadFilePartition","TXGYMailActiveX.Uploader","TXFTNActiveX.FTNUpload","TXGYMailActiveX.DropFile"]],available:["ScreenCapture","Uploader","FTNUpload","DropFile","UploadFilePartition"],lastVer:["1.0.1.53","1.0.1.29","1.0.1.53","1.0.0.29","1.0.0.53"],miniVer:[(getDomain()=="foxmail.com")?"1.0.0.5":"1.0.1.28","1.0.1.28","1.0.1.28","1.0.0.13","1.0.0.7"]},_moInfos_FF:{path:"/xpi/",xpi:"TencentMailPlugin.xpi",obj:["ScreenCapture","","Uploader","FTNUpload",""],available:["ScreenCapture","Uploader","FTNUpload"],name:["QQMail Plugin","","QQMail Plugin","Tencent FTN plug-in","QQMail Plugin"],type:(function(){
var a="application/txftn",b="application/txftn-webkit";
return ["application/x-tencent-qmail","","application/x-tencent-qmail",(typeof navigator.mimeTypes!="undefined")&&navigator.mimeTypes[b]?b:a,"application/x-tencent-qmail"];
})(),lastVer:["1.0.1.53","","1.0.1.53","1.0.0.4","1.0.0.0"],miniVer:["1.0.1.28","","1.0.1.28","1.0.0.4","1.0.0.0"]},_moInfos_WebKit:{path:"/crx/",crx:"TencentMailPlugin.crx",exe:"QQMailWebKitPlugin.exe",obj:["ScreenCapture","","Uploader","FTNUpload",""],available:["ScreenCapture","FTNUpload"],name:["QQMail Plugin","","QQMail Plugin","Tencent FTN plug-in",""],type:["application/x-tencent-qmail-webkit","","application/x-tencent-qmail-webkit","application/txftn-webkit",""],lastVer:["1.0.1.53","","1.0.1.53","1.0.0.4",""],miniVer:["1.0.1.28","","1.0.1.28","1.0.0.4",""]},_moInfos_WebKitForMac:{path:"/crx/",pkg:"TencentMailPluginForMac.pkg",obj:["ScreenCapture","","Uploader","FTNUpload",""],available:["ScreenCapture","Uploader"],name:["QQMailPlugin","","QQMailPlugin","Tencent FTN Plug-in",""],type:["application/x-tencent-qmail-webkit","","application/x-tencent-qmail-webkit","application/txftn",""],lastVer:["1.0.1.34","","1.0.1.34","1.0.0.3",""],miniVer:["1.0.1.34","","1.0.1.34","1.0.0.3",""]},mbAblePlugin:getQMPluginInfo("10.6.8"),mbAbleUsePlugin:getQMPluginInfo("10.6.8"),_mbIsChecked:true,getTitle:function(){
return gbIsIE?"\u63A7\u4EF6":"\u63D2\u4EF6";
},getinfo:function(){
if(QMAXInfo.mbAblePlugin)
{
if(gbIsWin)
{
if(gbIsIE)
{
return QMAXInfo._moInfos.available;
}
if(gbIsFF)
{
return QMAXInfo._moInfos_FF.available;
}
if(gbIsChrome||gbIsSafari||gbIsOpera||gbIsQBWebKit)
{
return QMAXInfo._moInfos_WebKit.available;
}
}
if(gbIsMac)
{
return QMAXInfo._moInfos_WebKitForMac.available;
}
}
return [];
},_grayUpdate:function(){
},installer:function(b,a){
var d=this.get("whole",a),e="";
if(/^online/.test(b))
{
if(d.cab)
{
e=this.get("cab");
}
else{
e=d.xpi||(gbIsChrome&&parseInt(gsChromeVer)<21&&d.crx);
}
}
else if(/^download/.test(b)&&d)
{
if(a=="FF"||(!a&&gbIsFF))
{
d=this.get("whole","WebKit");
}
e=d.exe||d.pkg;
}
if(e)
{
var c=e.split('.');
e=[[c[0]].concat(d.lastVer[0].split('.')).join("_"),c[1]].join('.');
}
if(e&&/Abs$/.test(b))
{
e=d.path+e;
}
return e;
},get:function(b,a){
if(!a)
{
gbIsIE&&(a="IE");
gbIsFF&&(a='FF');
(gbIsChrome||gbIsSafari||gbIsOpera||gbIsQBWebKit)&&(a="WebKit");
!gbIsIE&&gbIsMac&&(a="mac");
}
var d={IE:this._moInfos,FF:this._moInfos_FF,chrome:this._moInfos_WebKit,WebKit:this._moInfos_WebKit,mac:this._moInfos_WebKitForMac}[a];
if(!this._mbIsChecked)
{
this._grayUpdate();
}
if(b=="whole")
{
return d;
}
else if(b=="cab")
{
var c=createActiveX(0),f=c?"":"_2.dll";
try{
f=c.GetDLLFileName();
}
catch(g)
{
}
return d["cab"][f&&f.indexOf("_2.dll")!=-1?0:1];
}
return d[b];
}};
function createActiveX(a,b)
{
if(!gbIsIE)
{
return createPlugin(a,false,b);
}
if(a>=0&&a<=4)
{
var c=QMAXInfo.get("obj");
for(var e=0,f=c.length;e<f;e++)
{
if(a==3)
{
try{
new ActiveXObject(c[e][0]);
}
catch(d)
{
}
}
try{
return new ActiveXObject(c[e][a]);
}
catch(d)
{
}
}
}
return null;
}
function detectActiveX(a,b,c,d)
{
if(!gbIsIE)
{
return detectPlugin(a,b,c,d);
}
var f=typeof (c)=="undefined",e=false,g=f?createActiveX(a):c,h=getActiveXVer(g);
if(g&&h)
{
if(b!=1&&b!=2)
{
e=true;
}
else if(getQMPluginInfo._compareVersion(h,QMAXInfo.get(b==1?"miniVer":"lastVer")[a])>=0)
{
e=true;
}
if(f)
{
delete g;
g=null;
}
}
return e;
}
function getActiveXVer(a)
{
if(!gbIsIE)
{
return getPluginVer(a);
}
var d="",b;
try{
b=typeof (a)=="number"?createActiveX(a):a;
d=b&&(b.version?b.version:"1.0.0.8")||"";
}
catch(c)
{
}
return d;
}
function checkInstallPlugin(a)
{
if(!QMAXInfo.mbAbleUsePlugin)
{
return false;
}
try{
navigator.plugins.refresh(false);
}
catch(g)
{
}
var c=QMAXInfo.get("name")[a],f=QMAXInfo.get("type")[a],b=navigator.plugins;
if(b&&c)
{
for(var h=b.length-1;h>=0;h--)
{
for(var k=b[h].length-1;k>=0;k--)
{
if(b[h].name.indexOf(c)!=-1&&b[h][k].type==f)
{
if(a!=3&&(gsAgent.indexOf("vista")>-1||/nt 6/gi.test(gsAgent))&&f=="application/x-tencent-qmail")
{
var d=b[h].description.split('#')[1];
if(!d)
{
continue;
}
}
var d=/(\d+(?:\.\d+)+)/.test(b[h].description||"")?RegExp.$1:"1.0.0.0";
if(gbIsMac&&a!=3&&d=="1.0.0.0")
{
continue;
}
if(gbIsMac&&gbIsChrome&&parseFloat(gsChromeVer)>21&&getQMPluginInfo._compareVersion(d,"1.0.2.0")<0)
{
continue;
}
return true;
}
}
}
}
return false;
}
function createPlugin(b,a,c,d)
{
var e=null;
c=c||getMainWin();
switch(b)
{case 0:
case 2:
case 4:
if(gbIsSafari)
{
createPlugin._createQQMailPlugin(b,c,d);
}
e=createPlugin._createQQMailPlugin(b,getTop(),d);
break;
case 3:
e=createFTNPlugin(c,d);
break;
}if(!a&&checkInstallPlugin(b))
{
getTop().ossLog("delay","all",T(['stat=ff_addon','&type=%type%&info=%info%'],'%').replace({type:!e?"failcreatePlugin":"successcreatePlugin",info:["ver:",gsFFVer,",pluginId:",b,",brtpe:",(gbIsFF?1:(gbIsChrome?2:(gbIsSafari?3:(gbIsOpera?4:5))))].join("")}));
}
return e;
}
createPlugin._createQQMailPlugin=function(a,b,c){
var d,e=null,h=gbIsFF?"application/x-tencent-qmail":"application/x-tencent-qmail-webkit";
b=b||getTop();
if(checkInstallPlugin(a))
{
var g=c||"QQMailFFPluginIns";
if(!(d=S(g,b)))
{
insertHTML(b.document.body,"beforeEnd",T('<embed id="$id$" type="$type$" hidden="true"></embed>').replace({type:h,id:g}));
d=S(g,b);
}
var f={0:"CreateScreenCapture",2:"CreateUploader",4:"CreateDragDropManager"}[a];
if(typeof d[f]!="undefined")
{
e=d[f]();
if(a==0)
{
e.OnCaptureFinished=function(){
};
}
else if(a==2)
{
e.OnEvent=function(){
};
}
}
}
return e;
};
createPlugin._createFTNPlugin=function(a,b){
var c=null,e=QMAXInfo.get("whole")["type"][3],d=b||"npftnPlugin";
a=a||getTop();
if(!(c=S(d,a)))
{
insertHTML(a.document.body,"beforeEnd",T('<embed id="$id$" type="$type$" style="z-index:99999;position:absolute;top:0;left:0;width:1px;height:1px;"></embed>').replace({type:e,id:d}));
c=S(d,a);
if(c)
{
c.onEvent=function(){
};
}
}
return c;
};
function createFTNPlugin(a,b)
{
if(!checkInstallPlugin(3))
{
return null;
}
createPlugin._createFTNPlugin(a,b);
var c=createPlugin._createFTNPlugin(getTop(),b);
if(b)
{
getTop().ossLog("delay","all",T(['stat=ff_addon','&type=%type%&info=%info%'],'%').replace({type:c&&c.Version?"successcreatePlugin":"failcreatePlugin",info:["ver:",gsFFVer,",pluginId:3,insId:",b].join("")}));
}
return c.Version?c:null;
}
function detectPlugin(b,a,c,d)
{
var e=false;
var f=c||createPlugin(b,true,null,d),g=getPluginVer(f);
if(f&&g)
{
if(a!=1&&a!=2)
{
e=true;
}
else if(b==3&&!gbIsMac&&gbIsSafari)
{
e=false;
}
else if(getQMPluginInfo._compareVersion(g,QMAXInfo.get(a==1?"miniVer":"lastVer")[b])>=0)
{
e=true;
}
}
return e;
}
function getPluginVer(a)
{
var b,d="";
try{
b=typeof (a)=="number"?createPlugin(a,true):a;
d=(b&&b.Version)||"";
}
catch(c)
{
}
return d;
}
function initDialog(c,d,e,b,a)
{
new (getTop().QMDialog)({sid:c,sTitle:d,sUrl:e,nWidth:b,nHeight:a});
}
function requestShowTip(c,d,b,a)
{
var e=T('/cgi-bin/tip?sid=$sid$&args=$dom$,$tip$&r=$r$').replace({sid:getSid(),dom:c,tip:d,r:Math.random()});
QMAjax.send(e,{method:'GET',onload:function(f,h,g){
if(f&&h.indexOf('oTop.QMTip')>0)
{
if(!a||a(h,g))
{
globalEval(h,b);
}
}
}});
}
function detectCapsLock(b,c,a)
{
if(!b)
{
return;
}
function f(g)
{
var i=g.target||g.srcElement,h=calcPos(i),j=c||S("capTip");
function k()
{
return ["z-index:20;position:absolute;background:#fdf6aa;padding:1px;","border:1px solid #dbc492;border-right:1px solid #b49366;border-bottom:1px solid #b49366;","left:",h[3],"px;","top:",(h[2]+1),"px;"].join("");
}
if(!j)
{
insertHTML((a||document).body,"afterBegin",'<div id="capTip" style="'+k()+'">\u5927\u5199\u9501\u5B9A\u5DF2\u6253\u5F00</div>');
}
else{
j.style.cssText=k();
}
}
function e()
{
show(S("capTip",(a||document)),false);
}
var d=-1;
addEvents(b,{keydown:function(g){
var h=g.keyCode||g.charCode;
if(h==20)
{
if(d==0)
{
f(g);
d=1;
}
else if(d==1)
{
e();
d=0;
}
}
},keypress:function(g){
var i=g.keyCode||g.charCode,h=g.shiftKey;
if((i>=65&&i<=90&&!h)||(i>=97&&i<=122&&h))
{
d=1;
f(g);
}
else if((i>=97&&i<=122&&!h)||(i>=65&&i<=90&&h))
{
d=0;
e();
}
else{
e();
}
},blur:function(){
e();
}});
}
var folderTree=(function(){
var b=getTop();
function h(p)
{
originUserFolderNodes=p;
var n=p;
var m=n.length;
var k=[];
var o=[];
var l=[];
for(var q=0;q<m;q++)
{
if(n[q].fatherid=="0")
{
n[q].level="1";
k.push(n[q]);
}
else{
o.push(n[q]);
}
}
for(var q=0;q<o.length;q++)
{
for(var r=q+1;r<o.length;r++)
{
if(o[q].level!=3&&o[r].level!=3&&o[q].id==o[r].fatherid)
{
o[q].level="2";
o[r].level="3";
o[q].children.push(o[r]);
}
else if(o[q].level!=3&&o[r].level!=3&&o[q].fatherid==o[r].id)
{
o[q].level="3";
o[r].level="2";
o[r].children.push(o[q]);
}
}
}
for(var q=0;q<o.length;q++)
{
if(o[q].level=="2")
{
l.push(o[q]);
}
else if(o[q].level=="-1")
{
o[q].level="2";
l.push(o[q]);
}
}
for(var q=0;q<l.length;q++)
{
for(var r=0;r<k.length;r++)
{
if(l[q].fatherid==k[r].id)
{
k[r].children.push(l[q]);
continue;
}
}
}
userFolderTree=k;
return k;
}
function e(k)
{
var j=h(k);
var o=[];
var n=[];
for(var m=0;m<j.length;++m)
{
if(j[m].unread>0)
{
o.push(j[m]);
}
else{
n.push(j[m]);
}
}
j=[].concat(o,n);
var l=b.TE(['$@$for($oFolder$)$@$','<li class="fs" id="folder_$id$_td" dr="$id$" dp="personal" level="1">','<a href="/cgi-bin/mail_list?sid=$@$eval getSid()$@$&folderid=$id$&page=0" target="mainFrame" id="folder_$id$" data-unread="$@$if($unread$>0)$@$$unread$$@$else$@$0$@$endif$@$" data-name="$name$" name="personal" onClick="switchFolder($id$);" title="$name$ $@$if($unread$>0)$@$\u672A\u8BFB\u90AE\u4EF6 $unread$ \u5C01$@$endif$@$" hidefocus class="fdlist_width" >','$@$if($unread$>0)$@$','<div class="max_width"><b>$@$eval trimLeftLetter($name$,5)$@$($unread$)</b></div>','$@$else$@$','<div class="txtflow fdwidthmax">$name$</div>','$@$endif$@$','</a>','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/spacer.gif" id="icon_$id$" class="fd_on" onClick="showFolders($id$);" hidefocus />','$@$if($children$.length>0)$@$','</li>','<ul class="fdul level_two" id="$id$folders" style="overflow:hidden;display:none;">','$@$for($children$)$@$','<li class="fs" id="folder_$id$_td" dr="$id$" dp="personal" level="2">','<a href="/cgi-bin/mail_list?sid=$@$eval getSid()$@$&folderid=$id$&page=0" target="mainFrame" id="folder_$id$" data-unread="$@$if($unread$>0)$@$$unread$$@$else$@$0$@$endif$@$" data-name="$name$" name="personal" onClick="switchFolder($id$);" title="$name$ $@$if($unread$>0)$@$\u672A\u8BFB\u90AE\u4EF6 $unread$ \u5C01$@$endif$@$" hidefocus class="fdlist_width">','$@$if($unread$>0)$@$','<div class="max_width"><b>$@$eval trimLeftLetter($name$,5)$@$($unread$)</b></div>','$@$else$@$','<div class="txtflow fdwidthmax">$name$</div>','$@$endif$@$','</a>','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/spacer.gif" id="icon_$id$" class="fd_on" onClick="showFolders($id$);" hidefocus />','$@$if($children$.length>0)$@$','</li>','<ul class="fdul level_three" id="$id$folders" style="overflow:hidden;display:none;">','$@$for($children$)$@$','<li class="fs" id="folder_$id$_td" dr="$id$" dp="personal" level="3">','<a href="/cgi-bin/mail_list?sid=$@$eval getSid()$@$&folderid=$id$&page=0" target="mainFrame" id="folder_$id$" data-unread="$@$if($unread$>0)$@$$unread$$@$else$@$0$@$endif$@$" data-name="$name$" name="personal" onClick="switchFolder($id$);" title="$name$ $@$if($unread$>0)$@$\u672A\u8BFB\u90AE\u4EF6 $unread$ \u5C01$@$endif$@$" hidefocus class="fdlist_width">','$@$if($unread$>0)$@$','<div class="max_width" ><b>$@$eval trimLeftLetter($name$,5)$@$($unread$)</b></div>','$@$else$@$','<div class="txtflow fdwidthmax">$name$</div>','$@$endif$@$','</a>','</li>','$@$endfor$@$','</ul>','$@$endif$@$','$@$endfor$@$','</ul>','$@$endif$@$','$@$endfor$@$']).replace({oFolder:j});
return l;
}
function f(j)
{
var i=j;
var k=b.TE(['<ul class="fdul">','<li class="fs level_root" id="folder_personal_td" dr="personal" dp="personal" level="0">','<a nowrap="" id="folder_personal" hidefocus="" style="padding-left: 33px;">\u6211\u7684\u6587\u4EF6\u5939</a>','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/spacer.gif" id="icon_personal" class="fd_off" hidefocus="">','</li>','</ul>','<ul class="fdul">','$@$for($oFolder$)$@$','<li class="fs  level_one" id="folder_$id$_td" dr="$id$" dp="personal" level="1" alias="$name$">','<a target="mainFrame" id="folder_$id$" name="personal" hidefocus class="fdlist_width" >','<div class="txtflow popfdwidthmax">$name$</div>','</a>','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/spacer.gif" id="icon_$id$" class="fd_off" data-id="$id$" hidefocus />','$@$if($children$.length>0)$@$','</li>','<ul class="fdul" id="$id$folders" style="overflow:hidden;">','$@$for($children$)$@$','<li class="fs level_two" id="folder_$id$_td" dr="$id$" dp="personal" level="2" alias="$name$">','<a target="mainFrame" id="folder_$id$" name="personal" hidefocus class="fdlist_width">','<div class="txtflow popfdwidthmax">$name$</div>','</a>','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/spacer.gif" id="icon_$id$" class="fd_off" hidefocus />','$@$if($children$.length>0)$@$','</li>','<ul class="fdul" id="$id$folders" style="overflow:hidden;">','$@$for($children$)$@$','<li class="fs L3 level_three" id="folder_$id$_td" dr="$id$" dp="personal" level="3" alias="$name$">','<a target="mainFrame" id="folder_$id$" name="personal" hidefocus class="fdlist_width">','<div class="txtflow popfdwidthmax">$name$</div>','</a>','</li>','$@$endfor$@$','</ul>','$@$endif$@$','$@$endfor$@$','</ul>','$@$endif$@$','$@$endfor$@$','</ul>']).replace({oFolder:i});
return k;
}
function g(j)
{
var i=h(j);
var k=b.TE(['<tr id="folder_root"  data-child="$@$eval $oFolder$.length$@$"></tr>','$@$for($oFolder$)$@$','<tr id="folder_$id$" alias="$name$" data-child="$@$eval $children$.length$@$" name="father-root" index="$@$eval ($_idx_$)$@$" class="level_one border2 $@$if($_idx_$==0)$@$border2no$@$endif$@$" level="1" onmouseover="getTop().addClass(this,',"'attbg'",');" onmouseout="getTop().rmClass(this, ',"'attbg'",');getTop().rmClass(this, ',"'bold'",');" >','<td class="lh1 settingtd" style="padding-right: 0px;">','<div class="td1_txt">','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/spacer.gif" id="icon_$id$" class="fd_off" onClick="showSetFolders(this,$id$);" hidefocus />','<a title="$name$" href="/cgi-bin/mail_list?sid=$@$eval getSid()$@$&folderid=$id$&page=0" class="txt_width">','$@$if($type$==2)$@$','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/ico_a_b.gif" align="absmiddle" class="pop"/>','$@$endif$@$','$@$if($acctid$==0)$@$','$@$else$@$','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/ico_a.gif" align="absmiddle" class="pop"/>','$@$endif$@$','$name$</a>','</div>','</td>','<td class="settingtd" align="center">$@$if($unread$>0)$@$','<a href="/cgi-bin/mail_list?sid=$@$eval getSid()$@$&s=unread&folderid=$id$&flag=new&page=0"><b>$unread$</b></a>','$@$else$@$$unread$$@$endif$@$','</td>','<td class="settingtd" align="center">$total$</td>','<td class="settingtd" align="center">$usedsize$</td>','<td class="settingtd">&nbsp;</td>','<td align="right" class="f_family normal settingtd">','<a href="javascript:void(0)" onClick="return getTop().renameFolder($id$,',"'folder'",',window,',"'$name$'",')">[\u91CD\u547D\u540D]</a>&nbsp;','<a target="actionFrame" href="javascript:void(0)" $@$if($type$==2)$@$onclick="return doDelete($id$,0);"$@$else$@$ onclick="return doDelete($id$,1)"$@$endif$@$>[\u5220\u9664]</a>&nbsp;','<a target="actionFrame" href="javascript:void(0)" onClick="return doEmpty($id$);" >[\u6E05\u7A7A]</a>&nbsp;&nbsp;','<a href="javascript:void(0)" onClick="return mv($id$,0,0)" title="\u4E0A\u79FB\u6587\u4EF6\u5939">\u2191</a>&nbsp;','<a href="javascript:void(0)" onClick="return mv($id$,0,1)" title="\u4E0B\u79FB\u6587\u4EF6\u5939">\u2193</a>','</td>','</tr>','$@$if($children$.length>0)$@$','$@$for($children$)$@$','<tr id="folder_$id$" alias="$name$" data-child="$@$eval $children$.length$@$" name="father-$fatherid$"  index="$@$eval ($_idx_$)$@$" class="level_two" level="2" onmouseover="getTop().addClass(this, ',"'attbg'",')" onmouseout="getTop().rmClass(this, ',"'attbg'",');getTop().rmClass(this, ',"'bold'",');">','<td class="lh1 settingtd" >','<div class="td1_txt">','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/spacer.gif" id="icon_$id$" class="fd_off" onClick="showSetFolders(this,$id$);" hidefocus />','<a title="$name$" href="/cgi-bin/mail_list?sid=$@$eval getSid()$@$&folderid=$id$&page=0&fromindex=1" class="txt_width" style="width:85px;">','$@$if($type$==2)$@$','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/ico_a_b.gif" align="absmiddle" class="pop"/>','$@$endif$@$','$@$if($acctid$==0)$@$','$@$else$@$','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/ico_a.gif" align="absmiddle" class="pop"/>','$@$endif$@$','$name$</a>','</div>','</td>','<td class="settingtd" align="center">$@$if($unread$>0)$@$','<a href="/cgi-bin/mail_list?sid=$@$eval getSid()$@$&s=unread&folderid=$id$&flag=new&page=0"><b>$unread$</b></a>','$@$else$@$$unread$$@$endif$@$','</td>','<td class="settingtd" align="center">$total$</td>','<td class="settingtd" align="center">$usedsize$</td>','<td class="settingtd">&nbsp;</td>','<td align="right" class="f_family normal settingtd">','<a href="javascript:void(0)" onClick="return getTop().renameFolder($id$,',"'folder'",',window,',"'$name$'",')">[\u91CD\u547D\u540D]</a>&nbsp;','<a target="actionFrame" href="javascript:void(0)" $@$if($type$==2)$@$onclick="return doDelete($id$,0);"$@$else$@$ onclick="return doDelete($id$,1)"$@$endif$@$>[\u5220\u9664]</a>&nbsp;','<a target="actionFrame" href="javascript:void(0)" onClick="return doEmpty($id$);" >[\u6E05\u7A7A]</a>&nbsp;&nbsp;','<a href="javascript:void(0)" onClick="return mv($id$,0,0)" title="\u4E0A\u79FB\u6587\u4EF6\u5939">\u2191</a>&nbsp;','<a href="javascript:void(0)" onClick="return mv($id$,0,1)" title="\u4E0B\u79FB\u6587\u4EF6\u5939">\u2193</a>','</td>','</tr>','$@$if($children$.length>0)$@$','$@$for($children$)$@$','<tr id="folder_$id$" alias="$name$" class="level_three" name="father-$fatherid$" index="$@$eval ($_idx_$)$@$" level="3" onmouseover="getTop().addClass(this, ',"'attbg'",')" onmouseout="getTop().rmClass(this, ',"'attbg'",');getTop().rmClass(this, ',"'bold'",');">','<td class="lh1 settingtd" >','<div class="td1_txt">','$@$if($children$.length>0)$@$','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/spacer.gif" id="icon_$id$" class="fd_off" onClick="showSetFolders(this,$id$);" hidefocus />','$@$else$@$','<img class="fd_off" style="visibility: hidden;"/>','$@$endif$@$','<a title="$name$" href="/cgi-bin/mail_list?sid=$@$eval getSid()$@$&folderid=$id$&page=0&fromindex=1" class="txt_width" style="width:80px;" >','$@$if($type$==2)$@$','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/ico_a_b.gif" align="absmiddle" class="pop"/>','$@$endif$@$','$@$if($acctid$==0)$@$','$@$else$@$','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/ico_a.gif" align="absmiddle" class="pop"/>','$@$endif$@$','$name$</a>','</div>','</td>','<td class="settingtd" align="center">$@$if($unread$>0)$@$','<a href="/cgi-bin/mail_list?sid=$@$eval getSid()$@$&s=unread&folderid=$id$&flag=new&page=0"><b>$unread$</b></a>','$@$else$@$$unread$$@$endif$@$','</td>','<td class="settingtd" align="center">$total$</td>','<td class="settingtd" align="center">$usedsize$</td>','<td class="settingtd">&nbsp;</td>','<td align="right" class="f_family normal settingtd">','<a href="javascript:void(0)" onClick="return getTop().renameFolder($id$,',"'folder'",',window,',"'$name$'",')">[\u91CD\u547D\u540D]</a>&nbsp;','<a target="actionFrame" href="javascript:void(0)" $@$if($type$==2)$@$onclick="return doDelete($id$,0);"$@$else$@$ onclick="return doDelete($id$,1)"$@$endif$@$>[\u5220\u9664]</a>&nbsp;','<a target="actionFrame" href="javascript:void(0)" onClick="return doEmpty($id$);" >[\u6E05\u7A7A]</a>&nbsp;&nbsp;','<a href="javascript:void(0)" onClick="return mv($id$,0,0)" title="\u4E0A\u79FB\u6587\u4EF6\u5939">\u2191</a>&nbsp;','<a href="javascript:void(0)" onClick="return mv($id$,0,1)" title="\u4E0B\u79FB\u6587\u4EF6\u5939">\u2193</a>','</td>','</tr>','$@$endfor$@$','$@$endif$@$','$@$endfor$@$','$@$endif$@$','$@$endfor$@$']).replace({oFolder:i});
return k;
}
function d(m)
{
var n=[];
var l=h(m);
for(var o=0;o<l.length;o++)
{
n.push({sId:"fid_"+l[o].id,sItemValue:l[o].name});
if(l[o].children.length>0)
{
for(var p=0;p<l[o].children.length;p++)
{
l[o].children[p].path=l[o].path+"/"+l[o].children[p].path;
n.push({sId:"fid_"+l[o].children[p].id,sItemValue:l[o].children[p].path});
if(l[o].children[p].children.length>0)
{
for(var q=0;q<l[o].children[p].children.length;q++)
{
l[o].children[p].children[q].path=l[o].children[p].path+"/"+l[o].children[p].children[q].path;
n.push({sId:"fid_"+l[o].children[p].children[q].id,sItemValue:l[o].children[p].children[q].path});
}
}
}
}
}
return n;
}
function c(q,r,s)
{
var m=s;
if(s=="personal"&&!b.S("folder_"+s+"_td"))
{
var k=document.createElement("ul");
S("personalfoldersDiv",getLeftWin()).insertBefore(k,S("personalfoldersDiv",getLeftWin()).firstChild);
k.className="fdul";
k.innerHTML=b.TE(['<li class="fs" id="folder_personal_td" dataunread="0" style="*margin-bottom:-2px;" dr="personal" dp="personal" nowrap>','<a nowrap id="folder_personal" onClick="switchFolder($id$);showFolders("$name$", true)" href="/cgi-bin/mail_list?sid=$@$eval getSid()$@$&folderid=personal&page=0&stype=myfolders&loc=folderlist,,,21" target="mainFrame"  hidefocus>\u6211\u7684\u6587\u4EF6\u5939</a>','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/spacer.gif" id="icon_personal" class="fd_off" onClick="showFolders("$name$");" hidefocus />','</li>']).replace({id:q,name:s});
}
if(b.S("folder_"+s+"_td")&&b.S("folder_"+s+"_td").getAttribute("level")=="3")
{
m=b.S("folder_"+s+"_td").parentNode.id.replace("folders","");
}
var p={id:q,name:r,fatherid:m,unread:0,children:[],level:"-1",newLevel:false};
if(m=="personal")
{
p.level="1";
userFolderTree.push(p);
}
else{
for(var n=0;n<userFolderTree.length;n++)
{
if(userFolderTree[n].id==m)
{
p.level="2";
if(userFolderTree[n].children.length==0)
{
p.newLevel=true;
}
userFolderTree[n].children.push(p);
break;
}
for(var o=0;o<userFolderTree[n].children.length;o++)
{
if(userFolderTree[n].children[o].id==m)
{
p.level="3";
if(userFolderTree[n].children[o].children.length==0)
{
p.newLevel=true;
}
userFolderTree[n].children[o].children.push(p);
break;
}
}
}
}
originUserFolderNodes.push(p);
if(p.level=="1")
{
var k=document.createElement("li");
S("personalfolders",getLeftWin()).appendChild(k);
k.id="folder_"+p.id+"_td";
k.setAttribute("dr",p.id);
k.setAttribute("dp","personal");
k.setAttribute("level",p.level);
k.className="fs";
k.innerHTML=b.TE(['<a href="/cgi-bin/mail_list?sid=$@$eval getSid()$@$&folderid=$id$&page=0" target="mainFrame" id="folder_$id$" data-unread="0" data-name="$name$" name="personal" onClick="switchFolder($id$);" title="$name$" hidefocus class="fdlist_width" >','<div class="txtflow fdwidthmax">$name$</div>','</a>','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/spacer.gif" id="icon_$id$" class="fd_on" onClick="showFolders($id$);" hidefocus />']).replace({id:p.id,name:p.name});
}
if(p.level=="2"||p.level=="3")
{
if(p.newLevel==true)
{
var k=document.createElement("ul");
S("folder_"+p.fatherid+"_td",getLeftWin()).parentNode.insertBefore(k,S("folder_"+p.fatherid+"_td",getLeftWin()).nextSibling);
k.id=p.fatherid+"folders";
k.className="fdul level_two";
try{
k.style="overflow:hidden;display:none;";
}
catch(l)
{
k.style.display="none";
k.style.overflow="hidden";
}
k.innerHTML=b.TE(['<li class="fs" id="folder_$id$_td" dr="$id$" dp="personal" level="$level$">','<a href="/cgi-bin/mail_list?sid=$@$eval getSid()$@$&folderid=$id$&page=0" target="mainFrame" id="folder_$id$" data-unread="0" data-name="$name$" name="personal" onClick="switchFolder($id$);" title="$name$" hidefocus class="fdlist_width" >','<div class="txtflow fdwidthmax">$name$</div>','</a>','$@$if($level$==2)$@$','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/spacer.gif" id="icon_$id$" class="fd_on" onClick="showFolders($id$);" hidefocus />','$@$endif$@$','</li>']).replace({id:p.id,level:p.level,name:p.name});
}
else{
var k=document.createElement("li");
S(p.fatherid+"folders",getLeftWin()).appendChild(k);
k.id="folder_"+p.id+"_td";
k.setAttribute("dr",p.id);
k.setAttribute("dp","personal");
k.setAttribute("level",p.level);
k.className="fs";
k.innerHTML=b.TE(['<a href="/cgi-bin/mail_list?sid=$@$eval getSid()$@$&folderid=$id$&page=0" target="mainFrame" id="folder_$id$" data-unread="0" data-name="$name$" name="personal" onClick="switchFolder($id$);" title="$name$" hidefocus class="fdlist_width" >','<div class="txtflow fdwidthmax">$name$</div>','</a>','$@$if($level$==2)$@$','<img src="https://res.mail.qq.com/bizmail/zh_CN/htmledition/images/spacer.gif" id="icon_$id$" class="fd_on" onClick="showFolders($id$);" hidefocus />','$@$endif$@$']).replace({id:p.id,level:p.level,name:p.name});
}
}
b.showFolderTrace(p.id);
}
function a(i)
{
}
a.getLeftFolder=e;
a.getPopFolder=f;
a.getSetFolder=g;
a.getFolderPath=d;
a.addFolderNode=c;
return a;
})();
function appendEditorFileContent(c,b,a)
{
var i=getTop();
if(!i.trim(c))
{
return;
}
if(a)
{
if(c.length>1024*1024)
{
return;
}
c='<pre style="word-wrap: break-word; white-space: pre-wrap;">'+i.htmlEncode(c)+'</pre>';
}
if((i.gbIsChrome||i.gbIsFF)&&b.getContentType()=='html')
{
if(!a&&i.gbIsChrome)
{
var f=b.getEditWin();
var e=f.document;
var d='__style__'+i.now();
var g=[];
var h=document.createElement('div');
h.innerHTML=c;
i.E(h.getElementsByTagName('style'),function(j){
g.push(j.innerHTML);
});
if(g.length)
{
c+='<div id="'+d+'" style="display:none;">\u200D</div>';
}
else{
i.debug('\u5BFC\u5165\u6587\u4EF6\u65E0sytle\u6807\u7B7E');
}
b.execCmd('insertHTML',c,function(){
if(g.length)
{
var k=i.S(d,f)||e.body;
if(k)
{
var j=e.createElement('style');
j.innerHTML=g.join('');
k.appendChild(j);
}
}
});
}
else{
b.execCmd('insertHTML',c);
}
}
else{
b.appendContent(c);
}
return true;
}
var getOfficeRealContent=(function(){
var b=getTop();
var a=0;
function k(t,s)
{
t=d(t);
if(t.indexOf('xmlns:w="urn:schemas-microsoft-com:office:word"')!=-1)
{
j(t,s);
return;
}
else if(t.indexOf('xmlns:x="urn:schemas-microsoft-com:office:excel"')!=-1)
{
var z=t.replace(/frameset/ig,'ul').replace(/frame/ig,'li');
var y=document.createElement('div');
y.innerHTML=z;
var v=true;
var u=false;
var w={};
b.E(y.getElementsByTagName('li'),function(A){
var C=m(b.attr(A,'src'));
var B={frSheet:'sheet',frTabs:'tab'}[b.attr(A,'Name')];
if(C&&B)
{
u=true;
w[B]=C;
}
else{
v=false;
}
});
if(v&&u)
{
g(w,s);
return;
}
else{
b.debug('excel has no frame');
}
}
else if(t.indexOf('xmlns:p="urn:schemas-microsoft-com:office:powerpoint"')!=-1)
{
i(t,s);
return;
}
else if(t.indexOf('qmbox')==-1)
{
var x=b.evalValue(t);
if(x.page&&s&&s.charset)
{
b.E(x.page,function(B,A){
if(B)
{
x.page[A]=x.page[A]+'&resp_charset='+s.charset;
}
});
}
h(x,s);
return;
}
s.onload(true,t);
}
function l()
{
return 'qmbox'+(a++);
}
function j(t,s)
{
var w=document.createElement('div');
w.innerHTML=t;
var u=0;
while(++u)
{
var v=b.CN('Section'+u,w);
if(!v.length)
{
break;
}
b.E(v,function(x){
var z=b.getStyle(x,'position');
x.style.cssText='position:'+z;
x.className='';
x.id='';
z=b.getStyle(x,'position');
var y=x.parentNode;
y.style.cssText='position:'+z;
y.className='';
y.id='';
});
}
s.onload(true,w.innerHTML);
}
function g(t,s)
{
b.QMAjax.send(t.tab,{onload:function(u,v){
if(u&&v&&(''+v).indexOf('<!--cgi exception-->')!==0)
{
var y=f(v);
var w=[];
var x=[];
b.E(y.getElementsByTagName('a'),function(z){
w.push(b.trim(z.getElementsByTagName('*')[0].innerHTML));
x.push(m(z.href));
});
if(x.length)
{
p(x,w,{getBody:function(z,A){
if(z.getElementsByTagName('td').length)
{
return z.getElementsByTagName('table')[0];
}
}},s.onload);
}
else{
s.onload(false,'NoContent');
}
}
else{
s.onload(false,'PartFileError');
}
}});
}
function i(t,s)
{
var x=f(t);
var u=x.getElementsByTagName('iframe');
if(!u.length)
{
s.onload(false,'PartFileError');
return;
}
var v=[];
var w=[];
b.E(u,function(y,z){
w.push(m(y.src));
});
if(w.length)
{
p(w,v,{getBody:function(y,z){
var A=b.finds('#SlideObj',y)[0];
if(A)
{
A.style.position='relative';
A.style.top=0;
A.style.left=0;
A.style.visibility='visible';
A.style.overflow='hidden';
return A;
}
}},s.onload);
}
else{
s.onload(false,'NoContent');
}
}
function h(t,s)
{
var u=[];
b.E(t.page,function(v){
v&&u.push(v);
});
p(u,[],{getBody:function(v,w){
v.style.display='block';
return v;
}},s.onload);
}
function d(s)
{
return s.replace(/<!--\[if gte vml( \d+)?\]>[\s\S]*?<!\[endif\]-->/g,'').replace(/<!(?:--)? *\[if !vml\] *(?:--)?>([\s\S]*?)<!(?:--)? *\[endif\] *(?:--)?>/g,'$1');
}
function e(s)
{
return s.replace(/;(\s*;)+/g,';').replace(/\{(\s*;)+/g,'{');
}
function q(s)
{
var v=s.getElementsByTagName('nobr');
var t=s.ownerDocument;
for(var w=v.length;w--;)
{
var u=t.createElement('div');
u.style.cssText='display:inline;white-space: nowrap;';
u.innerHTML=v[w].innerHTML;
v[w].parentNode.replaceChild(u,v[w]);
}
}
function r(s)
{
return s.replace(/(\\[\dA-F]{4,4})+/ig,r._replace);
}
r._replace=function(s){
var u=[];
var t=false;
b.E(s.match(/[\d\w]{4,4}/g),function(v){
var w=String.fromCharCode(parseInt(v,16));
if(w.length==1)
{
u.push(w);
}
else{
t=true;
}
});
return t?s:'"'+u.join('')+'"';
};
function f(s)
{
var t=document.createElement('div');
t.style.display='none';
if(s)
{
t.innerHTML=''+s;
}
return t;
}
var c=' style="word-wrap:normal; font-size:1em; font-weight:normal; line-height:normal;"';
function o(t,s)
{
b.QMAjax.send(t,{onload:function(u,v){
if(u&&!s.isEnd()&&v&&(''+v).indexOf('<!--cgi exception-->')!==0)
{
v=d(v);
var C=f(v);
var J=[];
b.E(C.getElementsByTagName('style'),function(K){
var L=''+K.innerHTML;
if(L)
{
J.push(L);
}
else{
b.debug('import word: no style content');
}
});
var x=s.getBody(C,v);
if(x)
{
x=x.cloneNode(true);
b.E(x.getElementsByTagName('script'),b.removeSelf);
b.E(x.getElementsByTagName('link'),b.removeSelf);
b.E(x.getElementsByTagName('style'),b.removeSelf);
q(x);
b.E(x.getElementsByTagName('*'),function(K){
if(K.nodeType!=3)
{
var N=b.attr(K,'style');
if(N)
{
var M=r((''+N)).replace(/(^|;)[^;]*?[\?\\][^;]*/g,'$1').replace(/(^|;)\s*mso-[^;]*/g,'$1').replace(/"/g,"'");
if(M!=N)
{
b.attr(K,'style',e(M));
}
}
var L=K.className;
if(L)
{
K.className=L+' '+L.toLowerCase();
}
}
});
C.innerHTML="";
C.appendChild(x);
var G=C.innerHTML;
var z=/(<link [^>]*href=(["'])([^\2>]+)\2[^>]*>)/ig;
var A=/rel=(["'])stylesheet\1/i;
var B=[];
while(z.test(v))
{
var H=RegExp.$3;
var I=RegExp.$1;
if(A.test(I))
{
B.push(H);
}
}
var w=B.length+1;
var y=[];
var D=function(K){
if(--w<1)
{
if(J.length&&!K)
{
K=l();
}
if(K||y.length)
{
if(K)
{
y.push(K);
}
G='<div'+c+' class="'+y.join(' ')+'">'+G+'</div>';
}
else{
G='<div'+c+'>'+G+'</div>';
}
if(J.length)
{
J=J.join('').replace(/\/\*[\s\S]*?\*\//g,'').replace(/[\n\r]/g,'').replace(/(^|\})([^\{\}]+?)\{/g,function(L,N,M){
return N+'.'+K+' '+M.split(',').join(', .'+K+' ')+'{';
});
J=r(J).replace(/([;\{])[^;\{]*?[\?\\][^;\}]*/g,'$1').replace(/([;\{])\s*mso-[^;\}]*/g,'$1');
G='<style>'+e(J)+'</style>'+G;
}
s.onload(true,G);
}
else if(K)
{
y.push(K);
}
};
b.E(B,function(K){
if(!s.getLoadedStyleId(K))
{
var L=l();
s.saveLoadedStyle(K,L);
b.QMAjax.send(K,{onload:function(M,N){
if(M&&!s.isEnd()&&N&&(''+N).indexOf('<!--cgi exception-->')!==0)
{
J.push(N);
D(L);
}
else{
s.onload(false);
}
}});
}
else{
D(s.getLoadedStyleId(K));
}
});
D();
}
else{
b.debug('iframe \u5185\u5BB9\u4E3A\u7A7A');
s.onload(true,'');
}
}
else{
s.onload(false);
}
}});
}
function p(v,u,t,s)
{
var z=[];
var w=false;
var B={};
var x=setTimeout(function(){
s(false,'Timeout');
w=true;
},18000);
var A={isEnd:function(){
return w;
},getLoadedStyleId:function(C){
return B[n(C)];
},saveLoadedStyle:function(D,C){
B[n(D)]=C;
}};
var y=v.length;
b.E(v,function(D,C){
o(D,b.extend({},A,t||{},{onload:function(G,H){
clearTimeout(x);
if(G)
{
z[C]=H;
if(--y==0)
{
var I=[];
var J=b.TE('$@$if($name$)$@$<h1>$name$</h1>$@$endif$@$<div>$content$</div>');
b.E(z,function(L,K){
if(L)
{
I.push(J.replace({name:b.htmlEncode(u[K]||''),content:L}));
}
});
if(!I.length)
{
s(false,'NoContent');
}
else{
s(true,I.join(''));
}
}
}
else if(!w)
{
w=true;
s(false,'PartFileError');
}
}}));
});
}
function n(s)
{
var t=s.match(/f=([^&$]+)/);
return t&&t[1];
}
function m(s)
{
return s;
}
return k;
})();
(function(d,e){
var b=2;
var a=10*60*1000;
var g={frame_html:['all','qmtool','profile_tips','qqmaileditor/editor','qmaddress','readmail2']};
var f={compose:{target:'frame_html'}};
function c(h)
{
h=h||{};
this._init(h);
}
c.getRawTargetJsList=function(j){
var k=(f[j]||{}).target;
if(k&&g[k])
{
var l=g[k];
var m={};
for(var h=0;h<l.length;h++)
{
m[l[h]]=1;
}
return m;
}
else{
return {};
}
};
c.prototype={_init:function(h){
this._cfg=h||{};
this._cfg.page_id=this._cfg.page_id||'default';
e.versionToolMap=e.versionToolMap||{};
if(e.versionToolMap[this._cfg.page_id])
{
return false;
}
this._compareVersion();
},_initConfig:function(){
},_compareVersion:function(){
var k=this._cfg.target_gLn||e.gLn;
var i=this._cfg.current_gLn||{};
var m=true;
for(var h in i)
{
if(h!=='placeholder')
{
var l=k[h];
var j=i[h];
if(this._versionValid(l)&&this._versionValid(j)&&(l!==j))
{
m=false;
}
}
}
if(!m&&this._allowReload())
{
this._doLog();
this._doOsslog();
this._doReload();
}
},_versionValid:function(h){
return /^[a-zA-Z0-9]{6}$/.test(h);
},_allowReload:function(){
return e.goExpers&&e.goExpers.jsReload&&(this._getReloadCnt()<b);
},_doLog:function(){
e.setCookie("qy_vt_reload",parseInt(this._getReloadCnt())+1,new Date((+new Date())+a),"/",e.document.domain);
},_doOsslog:function(){
new Image().src='https://exmail.qq.com/qy_mng_logic/logKVAuto?key=bizmail_js_reload&itemName='+this._cfg.page_id;
},_doReload:function(){
try{
d.location.reload();
}
catch(h)
{
}
},_getReloadCnt:function(){
var h=e.getCookie('qy_vt_reload');
if(isNaN(h))
{
h=0;
}
return h;
}};
d.Versiontool=c;
})(window,getTop());
var _oTop=getTop();
var _oOidbAccountBase={enterPress:function(a,b){
var c=a||window.event,d=this;
if(c.keyCode===13)
{
if(b&&b==="1")
{
d.goStep({"step":"2"});
}
else{
d.doAction();
}
getTop().preventDefault(c);
}
return false;
},checkPopInput:function(){
var c=getTop(),b=this,d=b._oDialog.S("div_username"),a=b._oDialog.S("ipt_pwd"),f=(d.innerHTML||""),e=(a.value||"");
if(c.trim(e)=="")
{
b.showWarn("\u60A8\u8FD8\u6CA1\u6709\u8F93\u5165\u5BC6\u7801\uFF01");
b._oDialog.S("ipt_pwd").focus();
return false;
}
if(!b.checkMail(f))
{
return false;
}
return true;
},checkMail:function(a){
var e=this,c=getTop().QMAddrParser,b=a.indexOf("@")>0,d=c.parseAddr(a);
if(d.length==0)
{
e.showWarn("\u8BF7\u586B\u5199\u90AE\u7BB1\u5730\u5740");
return false;
}
else if(!b||(d.length==1&&!d[0].valid))
{
e.showWarn("\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u90AE\u7BB1\u5E10\u53F7\uFF01");
return false;
}
else if(d.length>1)
{
e.showWarn("\u60A8\u53EA\u80FD\u8F93\u5165\u4E00\u4E2A\u90AE\u7BB1\u5730\u5740\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165");
return false;
}
return true;
},BindPwdEvents:function(b,c,a){
var e=getTop();
if(!b)
{
return;
}
function g(h)
{
e.show(c,true);
}
function f()
{
e.show(c,false);
}
var d=-1;
e.addEvents(b,{keydown:function(h){
var i=h.keyCode||h.charCode;
if(i==20)
{
if(d==0)
{
g(h);
d=1;
}
else if(d==1)
{
f();
d=0;
}
}
a(h);
},keypress:function(h){
var j=h.keyCode||h.charCode,i=h.shiftKey;
if((j>=65&&j<=90&&!i)||(j>=97&&j<=122&&i))
{
d=1;
g(h);
}
else if((j>=97&&j<=122&&!i)||(j>=65&&j<=90&&i))
{
d=0;
f();
}
else{
f();
}
a();
},blur:function(){
f();
}});
},_PTLOGIN_TEMP:getTop().T(["https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=522005705&daid=4&s_url=$topHost$/cgi-bin/pt_check?","sid=$sid$%26t=pt_next%26ptfun=$ptfun$%26id=&style=25&low_login=1&proxy_url=$topProtocol$","//mail.qq.com/proxy.html&need_qr=0&hide_border=1&border_radius=0&self_regurl=http://zc.qq.com/chs/index.html?","type=1&app_id=11005?t=regist&pt_feedback_link=http://support.qq.com/discuss/350_1.shtml&css=https://","res.mail.qq.com/zh_CN/htmledition/style/$cssFilename$$ver$.css&target=self&hide_title_bar","=1&default_uin=$uin$&regmaster=4&login_text=$loginDesc$&enable_qlogin=0"]),getPtloginUrl:function(a){
var b=this;
return b._PTLOGIN_TEMP.replace(_oTop.extend(b.getDefaultCfg(),a));
},isQQMail:function(a){
var b=a.toLowerCase();
if(b.indexOf("@foxmail")>-1||b.indexOf("@vip.qq")>-1||b.indexOf("@qq.")>-1)
{
return true;
}
return false;
},showWarn:function(a){
var b=getTop(),c=this._oDialog.S("div_warning");
if(c)
{
c.innerHTML=a;
c.style.visibility="";
}
},hideWarn:function(){
var a=getTop(),b=this._oDialog.S("div_warning");
if(b)
{
b.innerHTML="";
b.style.visibility="hidden";
}
},encrypt:function(a){
var d="CF87D7B4C864F4842F1D337491A48FFF54B73A17300E8E42FA365420393AC0346AE55D8AFAD975DFA175FAF0106CBA81AF1DDE4ACEC284DAC6ED9A0D8FEB1CC070733C58213EFFED46529C54CEA06D774E3CC7E073346AEBD6C66FC973F299EB74738E400B22B1E7CDC54E71AED059D228DFEB5B29C530FF341502AE56DDCFE9",b=new RSAKey();
b.setPublic(d,"10001");
var c=b.encrypt(a+"\n"+(Math.floor(+new Date()/1000))+"\n");
if(c)
{
return hex2b64(c);
}
return a;
}};
function toAddAccountPage()
{
var b=getTop(),a=arguments.callee;
b.loadCssFile("$css_path$login/addAccount.css",true,b.document);
a._oDialog=new b.QMDialog({sId:"id_AddAccount",sTitle:"\u6DFB\u52A0\u90AE\u7BB1\u5E10\u53F7",nWidth:440,sBodyHtml:a._oTmpl.replace({"step":"1"}),bAnimation:false,onshow:function(){
var c=this;
c.S("ipt_username").focus();
c.S("geConfirmBtn").onclick=function(){
a.goStep({"step":"2"});
};
c.S("geCancelBtn").onclick=function(){
c.close();
};
},onclose:function(){
if(this.reloadLeftWin)
{
reloadLeftWin();
}
},onbeforeclose:function(){
var c=this;
c.S("importFrame")&&removeSelf(c.S("importFrame"));
}});
a._oStepEventMap={"1":a.showAccountItem,"2":a.showPwdItem,"3":a.doAction};
}
getTop().extend(toAddAccountPage,_oOidbAccountBase,{_oTmpl:getTop().TE(['$@$if($step$=="1")$@$','<div class="addAccount_step addAccount_step_Username">','<div id="div_warning" class="addAccount_errorTip"></div>','<div id="div_frame_container" class="addAccount_text">','<div class="addAccount_label">\u6DFB\u52A0\u5E10\u53F7</div><input type="text" id="ipt_username" class="addAccount_ipt" value="$username$" onkeydown="getTop().toAddAccountPage.enterPress(event,\'1\');" onkeypress="getTop().toAddAccountPage.enterPress(event,\'1\');"/>','</div>','</div>','$@$else if($step$=="2")$@$','<div id="div_stepPassword" class="addAccount_step addAccount_step_Password" style="text-align: left;">','<div id="div_warning" class="addAccount_errorTip"></div>','<div id="div_username" class="addAccount_step_usernameShow">$username$</div>','<div class="addAccount_login" id="div_addAccount_login">','<div class="addAccount_text">','<div class="addAccount_label">\u5BC6\u7801</div>','<input type="password" class="addAccount_ipt" tabindex="2" id="ipt_pwd" onkeydown="getTop().toAddAccountPage.enterPress(event);" onkeypress="getTop().toAddAccountPage.enterPress(event);"/>','<div id="capTip" class="qui_cntIndent_captip" style="display:none;"><span class="qui_cntIndent_captip_row"></span>\u5927\u5199\u9501\u5B9A\u5DF2\u6253\u5F00</div>','</div>','<div id="div_verifycode" style="display:none; padding-bottom:16px;">','<div class="addAccount_label">\u9A8C\u8BC1\u7801</div>','<input type="text" id="loginVerify" name="loginVerify" value="" class="addAccount_ipt" style="margin-bottom:5px;" onkeydown="getTop().toAddAccountPage.enterPress(event);" onkeypress="getTop().toAddAccountPage.enterPress(event);">','<img id="verifyImage" src="" style="display:block;clear:both;margin-left:57px;border:1px solid #eee;"/>','<input type="hidden" id="loginData" name="loginData" value="" />','<input type="hidden" id="loginCookies" name="loginCookies" value="" />','</div>','<div id="div_challenge" style="display:none;padding-bottom:16px;">','<div class="addAccount_label">\u8EAB\u4EFD\u9A8C\u8BC1</div>','<input type="text" id="secondPin" name="secondPin" value="" class="addAccount_ipt" onkeydown="getTop().toAddAccountPage.enterPress(event);" onkeypress="getTop().toAddAccountPage.enterPress(event);">','<input type="text" id="phoneNumber" name="phoneNumber" value="" style="display:none;" class="addAccount_ipt" onkeydown="getTop().toAddAccountPage.enterPress(event);" onkeypress="getTop().toAddAccountPage.enterPress(event);">','<input type="text" id="verifySmsChallengeAnswer" name="VerifySmsChallengeAnswer" value="" class="addAccount_ipt" style="display:none;" onkeydown="getTop().toAddAccountPage.enterPress(event);" onkeypress="getTop().toAddAccountPage.enterPress(event);">','<input type="text" id="androidTablet" name="androidTablet" value="" style="display:none;" class="addAccount_ipt" onkeydown="getTop().toAddAccountPage.enterPress(event);" onkeypress="getTop().toAddAccountPage.enterPress(event);">','<input type="text" id="emailAnswer" name="emailAnswer" value="" style="display:none;" class="addAccount_ipt" onkeydown="getTop().toAddAccountPage.enterPress(event);" onkeypress="getTop().toAddAccountPage.enterPress(event);">','<input type="text" id="deviceAddress" name="deviceAddress" value="" style="display:none;" class="addAccount_ipt" onkeydown="getTop().toAddAccountPage.enterPress(event);" onkeypress="getTop().toAddAccountPage.enterPress(event);">','<input type="text" id="secretAnswer" name="secretAnswer" value="" style="display:none;" class="addAccount_ipt" onkeydown="getTop().toAddAccountPage.enterPress(event);" onkeypress="getTop().toAddAccountPage.enterPress(event);">','<div id="challengeTip" style="font-size:12px;clear:both;color:#999;padding-top:5px;margin-left:57px;"></div>','<input type="hidden" id="challengeData" name="challengeData" value="" />','<input type="hidden" id="challengeCookies" name="challengeCookies" value="" />','<input type="hidden" id="challengeAction" name="challengeAction" value="" />','</div>','<div id="div_popsvr" style="display:none">','<div class="addAccount_text">','<div class="addAccount_label">POP\u670D\u52A1\u5668\u5730\u5740</div>','<input type="text" class="addAccount_ipt" tabindex="3" id="ipt_popserver" onkeydown="getTop().toAddAccountPage.enterPress(event)" onkeypress="getTop().toAddAccountPage.enterPress(event)"/>','</div>','<div class="addAccount_text" id="div_port">','<div class="addAccount_label">POP\u670D\u52A1\u5668\u7AEF\u53E3</div>','<input type="text" class="addAccount_ipt" tabindex="4" id="ipt_port" value="110" onkeydown="getTop().toAddAccountPage.enterPress(event)" onkeypress="getTop().toAddAccountPage.enterPress(event)"/>','</div>','<div class="addAccount_text" id="div_ssl" style="padding-left: 105px;margin-top: -15px;padding-bottom: 0px;">','<input type="checkbox" name="ckb_ssl" id="ckb_ssl" class="ckb_ssl"><label for="ckb_ssl">\u5F00\u542FSSL\u5B89\u5168\u8FDE\u63A5</label>','</div>','</div>','<div style="color:gray;">\u6CE8\uFF1A\u6DFB\u52A0QQ\u90AE\u7BB1\u6216126\u90AE\u7BB1\u9700\u4F7F\u7528\u6388\u6743\u7801</div>','</div>','</div>','<div class="addAccount_loadingWrap" style="display: none;" id="div_loading">','<span class="addAccount_loading"></span>','</div>','$@$else$@$','<div class="addAccount_step_Finish">','<div class="qui_clear addAccount_step_succeedTip"><span class="addAccount_step_succeedImg"></span><span class="addAccount_step_succeedDesc">\u606D\u559C\u4F60\u6210\u529F\u6DFB\u52A0\u4E86<span class="qui_txtBold">$username$</span></span></div>','<ul class="addAccount_finishSetting">','<li class="addAccount_finishSetting_item"><input class="addAccount_finishSetting_radio" type="radio" name="mailReceive" id="radio_7" value="7" checked/><label for="radio_7">\u6536\u53D6\u6700\u8FD17\u5929\u7684\u90AE\u4EF6</label></li>','<li class="addAccount_finishSetting_item"><input class="addAccount_finishSetting_radio" type="radio" name="mailReceive" id="radio_all" value="all"/><label for="radio_all">\u6536\u53D6\u5168\u90E8\u90AE\u4EF6</label></li>','<li class="addAccount_finishSetting_item"><input class="addAccount_finishSetting_radio" type="radio" name="mailReceive" id="radio_0" value="0"/><label for="radio_0">\u6682\u4E0D\u6536\u53D6\u6B64\u90AE\u7BB1\u90AE\u4EF6</label></li>','</ul>','</div>','$@$endif$@$','<div class="dialog_operate addAccount_foot" id="div_foot">','<a href="javascript:;"  id="geConfirmBtn" class="qui_btn qui_btn_Blue">$@$if($step$=="1")$@$ \u4E0B\u4E00\u6B65 $@$else if($step$=="2")$@$ \u9A8C\u8BC1 $@$else$@$ \u67E5\u770B $@$endif$@$</a>','<a href="javascript:;"  id="geCancelBtn" class="qui_btn addAccount_foot_cancel">$@$if($step$=="1")$@$ \u53D6\u6D88 $@$else if($step$=="2")$@$ \u4E0A\u4E00\u6B65 $@$else$@$ \u5B8C\u6210\u66F4\u591A\u8BBE\u7F6E $@$endif$@$</a>','</div>']),getCssVer:function(){
if(!this._msVer)
{
var a=getTop().getRes("$css_path$addAccountPtlogin.css"),b=(/addAccountPtlogin(.*)\.css/.test(a)&&RegExp.$1)||"";
this._msVer=b;
}
return this._msVer;
},getDefaultCfg:function(){
var a=this;
if(!a._oDefaultCfg)
{
a._oDefaultCfg={"topHost":_oTop.getTopHost(),"sid":_oTop.getSid(),"topProtocol":_oTop.location.protocol,"ver":a.getCssVer(),"loginDesc":encodeURIComponent('\u9A8C\u8BC1'),"ptfun":"addother","cssFilename":"addAccountPtlogin"};
}
return a._oDefaultCfg;
},ptlogin2OnResize:function(a){
return function(j,h){
var d=a.S("importFrame"),c=a._moPanelDom,f=a.S("div_stepPassword"),g=a.S("div_username"),b=a.S("geCancelBtn"),e=a.S("btlogin");
if(d)
{
d.style.height=h+'px';
if(h>=288&&h<=295&&d.contentWindow.frames.length>0)
{
getTop().addClass(c,'qm_dialog_HideChild');
b.style.display='none';
f.style.height=h+'px';
function i()
{
setTimeout(function(){
if(d.contentWindow.frames.length==0)
{
getTop().rmClass(c,'qm_dialog_HideChild');
b.style.display='inline-block';
f.style.height='95px';
d.style.height='166px';
}
else if(getTop().hasClass(c,"qm_dialog_HideChild"))
{
i();
}
},100);
}
i();
}
else{
getTop().rmClass(c,'qm_dialog_HideChild');
b.style.display='inline-block';
f.style.height=(h-66)+'px';
}
if(h>=171&&h<=290)
{
g.style.marginTop='15px';
}
else{
g.style.marginTop='0';
}
}
if(b)
{
b.style.zoom='normal';
b.style.zoom='1';
}
if(e)
{
e.style.zoom='normal';
e.style.zoom='1';
}
};
},showAccountItem:function(a){
var c=this,b=c._oDialog;
b.setHtml("_body_",c._oTmpl.replace({"step":a.step,"username":a.username}));
a.failtype&&c.showError(a.failtype);
b.S("geConfirmBtn").style.display="";
b.S("geConfirmBtn").onclick=function(){
c.goStep({"step":"2"});
};
b.S("geCancelBtn").onclick=function(){
b.close();
};
},showPwdItem:function(a){
var c=this,b=c._oDialog;
_sEmail=(b.S("ipt_username")&&b.S("ipt_username").value)||a.username||"0";
if(!checkMail(_sEmail))
{
return false;
}
_oTop.extend(a,{"username":_sEmail});
c.showNotQQPwdItem(a);
},showQQPwdItem:function(a){
var c=this,b=c._oDialog;
getTop().ptlogin2_onResize=c.ptlogin2OnResize(b);
b.setHtml("_body_",c._oTmpl.replace({"step":a.step,"username":a.username,"uInfo":"qq","ptloginurl":c.getPtloginUrl({"uin":a.username})}));
b.S("geConfirmBtn").style.display="none";
b.S("geCancelBtn").onclick=function(){
c.goStep({"step":"1","username":a.username});
};
getTop().ptloginResize();
},showNotQQPwdItem:function(a){
var e=this,b,d,c=e._oDialog;
_oTop.loadJsFile("$js_path$safeauth.js",true);
c.setHtml("_body_",e._oTmpl.replace({"step":a.step,"username":a.username,"uInfo":'other'}));
if(b=c.S("ckb_ssl"))
{
b.onchange=function(){
d=c.S("ipt_port");
if(this.checked)
{
d.value=="110"&&(d.value="995");
}
else{
d.value=="995"&&(d.value="110");
}
};
}
new (e.BindPwdEvents)(c.S("ipt_pwd"),c.S("capTip"),e.enterPress);
c.S("geConfirmBtn").onclick=function(){
e.goStep({"step":"3","username":a.username});
};
c.S("geCancelBtn").onclick=function(){
e.goStep({"step":"1","username":a.username});
};
setTimeout(function(){
c.S("ipt_pwd").focus();
});
},goStep:function(a){
if(!a||!(a.step))
{
return;
}
var c=getTop(),b=this;
b._oStepEventMap[a.step].call(b,a);
},doAddQQAction:function(a){
var c=getTop(),b=this;
b._oDialog.S("div_foot").style.display="none";
b._oDialog.S("div_username").style.display="none";
c.showInfo("\u6B63\u5728\u6DFB\u52A0\u90AE\u7BB1\u5E10\u6237...",500);
c.QMAjax.send("/cgi-bin/foldermgr",{content:c.T(["sid=#sid#&enter=new&fun=createpop&folderid=&acctid=0&taskid=&step=","&fromtips=&popfolder=#popmail#&popnickname=#popnickname#&popmail=#popmail#&addstep=2&ptfun=addother&poppwd=","&popsvr=&popport=&timeflag=1&delflag=0&isenddef=1&needspam=1&smtpneedpwd=0&showsmtppanel=0","&agentsend=0&smtpsvr=&smtpport=25&nosmtppwd=#nosmtppwd#&smtppwd=&t=mailpotl.json&secpwd=#secpwd#"],"#").replace({sid:c.getSid(),popmail:a.sLoginaccount,popnickname:encodeURIComponent((c.S("useralias")&&c.S("useralias").innerHTML)||""),nosmtppwd:encodeURIComponent("\u6CBF\u7528\u90AE\u7BB1\u5BC6\u7801"),secpwd:a.secpwd}),method:"POST",onload:function(d,f){
if(d)
{
var g=c.evalValue(f);
try{
if(g.succ=="0")
{
b.goStep({"step":"1","username":a.sLoginaccount,"failtype":g.failtype});
}
else if(g.succ=="1")
{
b.succ({"step":"1","username":a.sLoginaccount,"folderid":g.folderid,"acctid":g.acctid});
}
}
catch(h)
{
c.showError("\u6DFB\u52A0\u90AE\u7BB1\u5E10\u6237\u5931\u8D25...");
}
}
else{
c.showError("\u6DFB\u52A0\u90AE\u7BB1\u5E10\u6237\u5931\u8D25...");
}
}});
},doAction:function(b,a){
var f=getTop(),e=this;
if(this.checkPopInput())
{
var d={_sTaskid:b||"",_sPopmail:e._oDialog.S("div_username").innerHTML||"",_sPoppwd:e._oDialog.S("ipt_pwd").value||"",_sPopsvr:e._oDialog.S("ipt_popserver").value||"",_sPopport:e._oDialog.S("ipt_port").value||110,_nIspopssl:e._oDialog.S("ckb_ssl").checked&&1||0};
var c=typeof b=="string"?true:false;
if(!c&&d._sPopmail.indexOf("@gmail")>-1&&0)
{
e.doGoogleOauth(d,function(g){
f.showInfo("\u6B63\u5728\u9A8C\u8BC1\u5176\u4ED6\u90AE\u7BB1\u5E10\u53F7...",6000);
e.doRealAction(d,g);
});
}
else{
f.showInfo("\u6B63\u5728\u9A8C\u8BC1\u5176\u4ED6\u90AE\u7BB1\u5E10\u53F7...",6000);
e.doRealAction(d,a);
}
}
},doRealAction:function(b,c){
var f=getTop(),e=this,d=e._oDialog.S("geConfirmBtn");
var g=T('poppwd=$poppwd$&ispopssl=$ispopssl$').replace({poppwd:encodeURIComponent(e.encrypt(b._sPoppwd)),ispopssl:encodeURIComponent(b._nIspopssl)});
if(c)
{
var a=[];
for(var h in c)
{
a.push("google_"+h+"="+encodeURIComponent(c[h]));
}
g=a.push(g)&&a.join("&");
}
f.QMAjax.send(f.T("/cgi-bin/foldermgr?sid=#sid#&enter=new&fun=createpop&folderid=&acctid=0&step=&fromtips=&popmail=#popmail#&popfolder=#popmail#&popnickname=&popsvr=#popsvr#&popport=#popport#&timeflag=1&delflag=&isenddef=1&needspam=1&smtpneedpwd=0&showsmtppanel=0&agentsend=&smtpsvr=&smtpport=25&nosmtppwd=&smtppwd=&taskid=#taskid#&t=mailpotl.json","#").replace({sid:f.getSid(),popmail:encodeURIComponent(b._sPopmail),popsvr:encodeURIComponent(b._sPopsvr),popport:encodeURIComponent(b._sPopport),taskid:b._sTaskid||""}),{content:g,method:"POST",onload:function(i,j){
if(i)
{
var k=f.evalValue(j);
try{
if(k.waiting=="true")
{
setTimeout(function(){
if(c)
{
e.doAction(k.taskid,c);
}
else{
e.doAction(k.taskid);
}
},5000);
}
else if(k.succ=="0")
{
e.showError(k.failtype,b._sPopmail.indexOf("@gmail")>-1);
if(b._sPopmail.indexOf("@gmail")>-1)
{
f.attr(d,"oauth","false");
f.rmClass(d,"qui_btn_BlueDisabled");
}
}
else if(k.succ=="1"||k.waiting=="false")
{
if(b._sPopmail.indexOf("@gmail")>-1)
{
f.attr(d,"oauth","false");
f.rmClass(d,"qui_btn_BlueDisabled");
}
e.succ({"step":"1","username":b._sPopmail,"folderid":k.folderid,"acctid":k.acctid});
}
}
catch(l)
{
f.showError("\u6DFB\u52A0\u90AE\u7BB1\u5E10\u53F7\u5931\u8D25...");
}
}
else{
f.showError("\u6DFB\u52A0\u90AE\u7BB1\u5E10\u53F7\u5931\u8D25...");
}
}});
},doGoogleOauth:function(a,B){
var u=getTop(),t=this,z=a._sPopmail,A=a._sPoppwd,q=t._oDialog.S("ipt_pwd"),h=t._oDialog.S("geConfirmBtn");
if(u.attr(h,"oauth")=="true")
{
return;
}
var D=function(){
u.attr(h,"oauth","true");
u.addClass(h,"qui_btn_BlueDisabled");
};
var H=function(){
u.attr(h,"oauth","false");
u.rmClass(h,"qui_btn_BlueDisabled");
};
var k=t._oDialog.S("div_verifycode"),v=t._oDialog.S("verifyImage"),n=t._oDialog.S("loginData"),m=t._oDialog.S("loginCookies"),o=t._oDialog.S("loginVerify");
var j=t._oDialog.S("div_challenge"),g=t._oDialog.S("challengeData"),f=t._oDialog.S("challengeCookies"),e=t._oDialog.S("challengeAction"),r=t._oDialog.S("secondPin"),p=t._oDialog.S("phoneNumber"),c=t._oDialog.S("androidTablet"),w=t._oDialog.S("verifySmsChallengeAnswer"),l=t._oDialog.S("emailAnswer"),i=t._oDialog.S("deviceAddress"),s=t._oDialog.S("secretAnswer"),d=t._oDialog.S("challengeTip");
var G=function(I,J){
r.style.display="none";
w.style.display="none";
p.style.display="none";
c.style.display="none";
i.style.display="none";
s.style.display="none";
l.style.display="none";
if(I=="VerifySmsChallenge")
{
w.style.display="";
w.value="";
d.innerHTML="(\u8BF7\u8F93\u5165\u4F60\u7684Gmail\u5E10\u53F7\u7ED1\u5B9A\u7684\u624B\u673A\u53F7\u7801\u6536\u5230\u7684\u77ED\u4FE1\u9A8C\u8BC1\u7801)";
w.focus();
}
else if(I=="SecondChallenge")
{
r.style.display="";
r.value="";
d.innerHTML="(\u7531\u4E8E\u4F60\u5F00\u542F\u4E86\u4E24\u6B65\u9A8C\u8BC1\uFF0C\u8BF7\u8F93\u5165\u4F60\u6536\u5230\u7684Google\u9A8C\u8BC1\u7801)";
r.focus();
}
else if(I=="PhoneVerificationChallenge")
{
p.style.display="";
p.value="";
d.innerHTML="(\u8BF7\u8F93\u5165\u4F60\u7684Gmail\u5E10\u53F7\u7ED1\u5B9A\u7684\u624B\u673A\u53F7\u7801\u6765\u5B8C\u6210\u8EAB\u4EFD\u9A8C\u8BC1)";
p.focus();
}
else if(I=="AndroidTabletChallenge")
{
c.style.display="";
c.value="";
d.innerHTML="(\u8BF7\u6253\u5F00\u4F60\u5B89\u5353\u6216\u5E73\u677F\u8BBE\u5907\u4E2D\u7684\u201CGoogle\u8BBE\u7F6E\u201D\u5E94\u7528\uFF0C\u8F93\u5165\u201C\u5B89\u5168\u201D\u9879\u4E2D\u83B7\u53D6\u7684\u201C\u5B89\u5168\u7801\u201D)";
c.focus();
}
else if(I=="UnverifiedPhoneChallenge")
{
i.style.display="";
i.value="";
d.innerHTML="(\u8BF7\u8F93\u5165\u4F60\u7684Gmail\u5E10\u53F7\u7ECF\u5E38\u767B\u5F55\u7684\u4F4D\u7F6E\u6765\u5B8C\u6210\u8EAB\u4EFD\u9A8C\u8BC1)";
i.focus();
}
else if(I=="SecretQuestionChallenge")
{
s.style.display="";
s.value="";
d.innerHTML='(\u8BF7\u56DE\u7B54\u5BC6\u4FDD\u95EE\u9898 \u201C<span style="color:red;">'+J+'</span>\u201D \u6765\u5B8C\u6210\u8EAB\u4EFD\u9A8C\u8BC1)';
s.focus();
}
else if(I=="RecoveryEmailChallenge")
{
l.style.display="";
l.value="";
d.innerHTML="(\u8BF7\u8F93\u5165\u4F60\u7684Gmail\u5E10\u53F7\u7ED1\u5B9A\u7684\u8F85\u52A9\u90AE\u7BB1\u5730\u5740\u6765\u5B8C\u6210\u8EAB\u4EFD\u9A8C\u8BC1)";
l.focus();
}
else{
j.style.display="none";
t.doRealAction(a);
}
};
t.hideWarn();
D();
if(k.style.display!="none")
{
var C=["Email="+z,"&Passwd="+A,"&logincaptcha="+o.value,"&loginData="+n.value,"&loginCookies="+m.value].join("");
if(!o.value)
{
o.focus();
t.showWarn("\u4F60\u8FD8\u6CA1\u6709\u8F93\u5165\u9A8C\u8BC1\u7801");
H();
return;
}
u.showInfo("\u6B63\u5728\u9A8C\u8BC1\u5176\u4ED6\u90AE\u7BB1\u5E10\u53F7...");
u.QMAjax.send("/cgi-bin/googleoauth/verifyLogin",{content:C,method:"POST",onload:function(I,J){
var K=u.evalValue(J);
if(I)
{
if(!K.errCode&&K["access_token"])
{
u.LogKV("getinvestigate|googleoauth|oauth|success");
u.ossLog('delay','all','kw=google_oauth_suc&value=1');
B&&B(K);
}
else if(K.errCode=="101")
{
H();
k.style.display="none";
q.value="";
q.focus();
t.showWarn("\u5E10\u53F7\u6216\u8005\u5BC6\u7801\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5");
}
else if(K.errCode=="102")
{
H();
v.setAttribute("src",decodeURIComponent(K.verifyImageUri)+"&sid="+u.getSid());
n.value=K.data;
m.value=K.cookies;
q.value="";
o.value="";
k.style.display="";
q.focus();
t.showWarn("\u5E10\u53F7\u6216\u8005\u5BC6\u7801\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5");
}
else if(K.errCode=="105")
{
H();
k.style.display="none";
g.value=K.challengeData;
f.value=K.challengeCookies;
e.value=K.challengeAction;
j.style.display="";
G(K.challengeType,K.secretQuestion);
}
else{
K.errType&&u.LogKV("getinvestigate|googleoauth|fail|"+K.errType);
u.LogKV("getinvestigate|googleoauth|oauth|fail");
k.style.display="none";
t.doRealAction(a);
}
}
else{
u.LogKV("getinvestigate|googleoauth|oauth|fail");
k.style.display="none";
t.doRealAction(a);
}
}});
}
else if(j.style.display!="none")
{
var x,y;
var b=false;
if(w.style.display!="none")
{
x=[g.value,"Pin%3D"+w.value.replace(/^G-?/i,"")].join("%26");
y="VerifySmsChallenge";
if(!w.value)
{
b=true;
w.focus();
}
}
else if(r.style.display!="none")
{
x=[g.value,"Pin%3D"+r.value.replace(/^G-?/i,"")].join("%26");
y="SecondChallenge";
if(!r.value)
{
b=true;
r.focus();
}
}
else if(p.style.display!="none")
{
x=[g.value,"phoneNumber%3D"+p.value].join("%26");
y="PhoneVerificationChallenge";
if(!p.value)
{
b=true;
p.focus();
}
}
else if(c.style.display!="none")
{
x=[g.value,"Pin%3D"+c.value].join("%26");
y="AndroidTabletChallenge";
if(!c.value)
{
b=true;
c.focus();
}
}
else if(i.style.display!="none")
{
x=[g.value,"deviceAddress%3D"+i.value].join("%26");
y="UnverifiedPhoneChallenge";
if(!i.value)
{
b=true;
i.focus();
}
}
else if(s.style.display!="none")
{
x=[g.value,"answer%3D"+s.value].join("%26");
y="SecretQuestionChallenge";
if(!s.value)
{
b=true;
s.focus();
}
}
else{
x=[g.value,"email%3D"+l.value].join("%26");
y="RecoveryEmailChallenge";
if(!l.value)
{
b=true;
l.focus();
}
}
if(b)
{
t.showWarn("\u4F60\u8FD8\u6CA1\u6709\u8F93\u5165\u9A8C\u8BC1\u7801");
H();
return;
}
u.showInfo("\u6B63\u5728\u9A8C\u8BC1\u5176\u4ED6\u90AE\u7BB1\u5E10\u53F7...");
var C=["challengeAction="+e.value,"challengeData="+x,"challengeCookies="+f.value].join("&");
u.QMAjax.send("/cgi-bin/googleoauth/challenge",{content:C,method:"POST",onload:function(I,J){
var K=u.evalValue(J);
if(I)
{
if(!K.errCode&&K["access_token"])
{
u.LogKV("getinvestigate|googleoauth|oauth|success");
u.ossLog('delay','all','kw=google_oauth_suc&value=1');
B&&B(K);
}
else if(K.errCode=="106")
{
H();
u.LogKV("getinvestigate|googleoauth|oauth|challengefail");
g.value=K.challengeData;
f.value=K.challengeCookies;
e.value=K.challengeAction;
t.showWarn("\u8EAB\u4EFD\u9A8C\u8BC1\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u9A8C\u8BC1");
if(y=="VerifySmsChallenge")
{
w.value="";
w.focus();
}
else if(y=="PhoneVerificationChallenge")
{
p.value="";
p.focus();
}
else if(y=="SecondChallenge")
{
r.value="";
r.focus();
}
else if(y=="AndroidTabletChallenge")
{
c.value="";
c.focus();
}
else if(y=="UnverifiedPhoneChallenge")
{
i.value="";
i.focus();
}
else if(y=="SecretQuestionChallenge")
{
s.value="";
s.focus();
}
else{
l.value="";
l.focus();
}
}
else{
K.errType&&u.LogKV("getinvestigate|googleoauth|fail|"+K.errType);
u.LogKV("getinvestigate|googleoauth|oauth|fail");
j.style.display="none";
t.doRealAction(a);
}
}
else{
u.LogKV("getinvestigate|googleoauth|oauth|fail");
j.style.display="none";
t.doRealAction(a);
}
}});
}
else{
var C="Email="+z+"&Passwd="+A;
u.showInfo("\u6B63\u5728\u9A8C\u8BC1\u5176\u4ED6\u90AE\u7BB1\u5E10\u53F7...");
u.QMAjax.send("/cgi-bin/googleoauth",{content:C,method:"POST",onload:function(I,J){
var K=u.evalValue(J);
if(I)
{
if(!K.errCode&&K["access_token"])
{
u.LogKV("getinvestigate|googleoauth|oauth|success");
u.ossLog('delay','all','kw=google_oauth_suc&value=1');
B&&B(K);
}
else if(K.errCode=="101")
{
H();
k.style.display="none";
q.value="";
q.focus();
t.showWarn("\u5E10\u53F7\u6216\u8005\u5BC6\u7801\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5");
}
else if(K.errCode=="102")
{
H();
v.setAttribute("src",decodeURIComponent(K.verifyImageUri)+"&sid="+u.getSid());
n.value=K.data;
m.value=K.cookies;
o.value="";
k.style.display="";
q.value="";
q.focus();
t.showWarn("\u5E10\u53F7\u6216\u8005\u5BC6\u7801\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5");
}
else if(K.errCode=="105")
{
H();
k.style.display="none";
g.value=K.challengeData;
f.value=K.challengeCookies;
e.value=K.challengeAction;
j.style.display="";
G(K.challengeType,K.secretQuestion);
}
else{
K.errType&&u.LogKV("getinvestigate|googleoauth|fail|"+K.errType);
u.LogKV("getinvestigate|googleoauth|oauth|fail");
t.doRealAction(a);
}
}
else{
u.LogKV("getinvestigate|googleoauth|oauth|fail");
t.doRealAction(a);
}
}});
}
},succ:function(a){
var b=this,c=getTop();
b._oDialog.setHtml("_body_",b._oTmpl.replace({"step":"3","username":a.username}));
b._oDialog.reloadLeftWin=true;
b._oDialog.S("geCancelBtn").onclick=function(){
b.receiveMail(a);
c.goUrlMainFrm(["/cgi-bin/foldermgr?sid=",c.getSid(),"&fun=detailpop&t=pop_detail&folderid=",a.folderid,"&acctid=",a.acctid,"&s=maillist"].join(""));
};
b._oDialog.S("geConfirmBtn").onclick=function(){
b.receiveMail(a);
c.goUrlMainFrm(["/cgi-bin/mail_list?sid=",c.getSid(),"&folderid=",a.folderid,"&page=0&ftype=pop"].join(""));
};
},receiveMail:function(a){
var c=this,b=[c._oDialog.S("radio_7").checked,c._oDialog.S("radio_all").checked];
c._oDialog.close();
if(b[0])
{
recvPop(a.acctid);
setPopFlag(a.acctid,"recent","1");
}
else if(b[1])
{
recvPop(a.acctid);
recvPopAll();
}
},showError:function(b,a){
var c="";
if(b=="-137")
{
c="\u90AE\u4EF6\u670D\u52A1\u5668\u72B6\u6001\u5F02\u5E38\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5";
}
else if(b=="-121")
{
c="\u5DF2\u6DFB\u52A0\u8FC7\u8BE5\u90AE\u7BB1";
}
else if(b=="-201")
{
c="\u90AE\u7BB1\u5BC6\u7801\u586B\u5199\u9519\u8BEF\u6216\u6F0F\u586B\uFF0C\u8BF7\u68C0\u67E5";
}
else if(b=="-202")
{
c="\u4F60\u7684\u64CD\u4F5C\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5";
}
else if(b=="-203")
{
c="\u5BF9\u65B9POP3\u670D\u52A1\u5668\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5";
}
else if(b=="-204")
{
c="\u63A5\u6536\u90AE\u4EF6\u670D\u52A1\u5668\u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5\u662F\u5426\u586B\u5199\u6B63\u786E";
}
else if(b=="-205")
{
c="\u7F51\u7EDC\u94FE\u63A5\u8D85\u65F6\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5";
}
else if(b=="-206")
{
c="\u90AE\u7BB1\u5730\u5740\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5";
}
else if(b=="-207")
{
if(a)
{
c="Gmail\u63A5\u53E3\u9A8C\u8BC1\u5931\u8D25\uFF0C\u6682\u65F6\u65E0\u6CD5\u6DFB\u52A0Gmail\u5E10\u53F7";
}
else{
c="\u5E10\u53F7\u9A8C\u8BC1\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5";
}
}
else if(b=="-208"||b=="-209")
{
c="\u7CFB\u7EDF\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5";
}
else if(b=="-210")
{
c="\u8BF7\u8F93\u5165\u63A5\u6536\u90AE\u4EF6\u670D\u52A1\u5668(POP)";
this._oDialog.S("div_addAccount_login").className="addAccount_login_More";
this._oDialog.S("div_popsvr").style.display="";
this._oDialog.S("ipt_popserver").focus();
}
else if(b=="-211")
{
c="\u6682\u4E0D\u652F\u6301hotmail\u548Cmsn\u5E10\u53F7";
}
else if(b=="-212")
{
c="\u5BF9\u65B9\u670D\u52A1\u5668\u7E41\u5FD9\uFF0C\u8FDE\u63A5\u5931\u8D25";
}
else if(b=="-500")
{
c="\u60A8\u7684Gmail\u90AE\u7BB1\u672A\u5F00\u901APOP\u670D\u52A1\uFF0C\u8BF7\u767B\u5F55\u8BE5\u90AE\u7BB1\u5F00\u542FPOP\u670D\u52A1";
}
else if(b=="-501")
{
c="\u90AE\u7BB1\u5730\u5740\u6216\u5BC6\u7801\u9519\u8BEF";
}
else if(b=="-510")
{
c="\u8BE5\u90AE\u7BB1\u5730\u5740\u672A\u5F00\u901APOP\u670D\u52A1\uFF0C\u8BF7\u767B\u5F55\u8BE5\u90AE\u7BB1\u5F00\u542FPOP\u670D\u52A1";
}
else if(b=="-511")
{
c="\u90AE\u7BB1\u5730\u5740\u6216\u5BC6\u7801\u9519\u8BEF";
}
else if(b=="-512")
{
c="\u8BE5\u90AE\u7BB1\u5730\u5740\u4E0D\u5B58\u5728";
}
else if(b=="-520")
{
c="\u60A8\u7684\u7F51\u6613\u90AE\u7BB1\u672A\u5F00\u901APOP\u670D\u52A1";
}
else if(b=="-521")
{
c="\u90AE\u7BB1\u5730\u5740\u6216\u5BC6\u7801\u9519\u8BEF";
}
else if(b=="-522")
{
c="\u8BE5\u90AE\u7BB1\u5730\u5740\u5DF2\u7ECF\u88AB\u7F51\u6613\u516C\u53F8\u51BB\u7ED3";
}
else if(b=="-523")
{
c="\u60A8\u7684\u7F51\u6613\u90AE\u7BB1\u672A\u5F00\u901APOP\u670D\u52A1";
}
else if(b=="-530")
{
c="\u90AE\u7BB1\u5730\u5740\u6216\u5BC6\u7801\u9519\u8BEF";
}
else if(b=="-531")
{
c="\u8BF7\u8BE5\u90AE\u7BB1\u5730\u5740\u4E0D\u5B58\u5728";
}
else if(b=="-540")
{
c="\u60A8\u7684\u96C5\u864E\u90AE\u7BB1\u53EF\u80FD\u672A\u5F00\u901APOP\u670D\u52A1\uFF0C\u6216\u8005\u90AE\u7BB1\u5730\u5740\u548C\u5BC6\u7801\u9519\u8BEF";
}
else if(b=="-550")
{
c="\u8BE5\u90AE\u7BB1\u5730\u5740\u4E0D\u5B58\u5728";
}
else if(b=="-551")
{
c="\u90AE\u7BB1\u5730\u5740\u6216\u5BC6\u7801\u9519\u8BEF";
}
else if(b=="-560")
{
c="\u90AE\u7BB1\u5730\u5740\u6216\u5BC6\u7801\u9519\u8BEF";
}
else if(b=="-570")
{
c="\u8BE5\u90AE\u7BB1\u5730\u5740\u4E0D\u5B58\u5728";
}
else if(b=="-571")
{
c="\u90AE\u7BB1\u5730\u5740\u6216\u5BC6\u7801\u9519\u8BEF";
}
else if(b=="-572")
{
c="\u6587\u4EF6\u5939\u6570\u91CF\u592A\u591A";
}
else if(b=="-121")
{
c="\u6587\u4EF6\u5939\u5DF2\u7ECF\u5B58\u5728";
}
else if(b=="-131")
{
c="\u4E0D\u80FD\u6DFB\u52A0\u81EA\u5DF1\u7684\u90AE\u7BB1";
}
else if(b=="-510")
{
c="\u6DFB\u52A0\u7684\u90AE\u7BB1\u672A\u5F00\u542FPOP\u529F\u80FD";
}
else if(b=="-156")
{
c="\u8D85\u8FC7\u6700\u5927\u7684POP\u90AE\u7BB1\u6570\u91CF";
}
else if(b=="-141"||b=="-135")
{
c="\u5DF2\u7ECF\u6DFB\u52A0\u8FC7\u8BE5\u90AE\u7BB1";
}
else{
c="\u5E10\u53F7\u6DFB\u52A0\u5931\u8D25";
}
this.showWarn(c);
}});
function toBindAccountPage()
{
var b=getTop(),a=arguments.callee,c=a.getPtloginUrl({"uin":"0"});
b.loadCssFile("$css_path$login/bindAccount.css",true,b.document);
a._oDialog=new b.QMDialog({sId:"id_bindAccount",sTitle:"\u5173\u8054\u5DF2\u6709\u90AE\u7BB1",nWidth:440,sBodyHtml:a._oTmpl.replace({"step":"1","ptloginurl":c}),bAnimation:false,onload:function(){
var d=this;
b.ptlogin2_onResize=a.ptlogin2OnResize(d);
b.ptloginResize();
},onshow:function(){
var d=this;
d.S("geCancelBtn").onclick=function(){
d.close();
};
},onbeforeclose:function(){
var d=this;
d.S("importFrame")&&removeSelf(d.S("importFrame"));
}});
}
getTop().extend(toBindAccountPage,_oOidbAccountBase,{_oTmpl:getTop().TE(['$@$if($step$=="1")$@$','<div id="div_frame_container" class="qui_dialogPtlogin">','<div id="dialogPtloginTitle" class="qui_dialogPtlogin_title">','<div class="qui_dialogPtlogin_label qui_dialogPtlogin_label_Uin">\u5173\u8054\u5E10\u53F7</div>','<div class="qui_dialogPtlogin_label">\u5BC6\u7801</div>','</div>','<div id="importFrameWrap" class="qui_dialogPtlogin_cnt">','<iframe frameborder="0" width="100%" src="$ptloginurl$" id="importFrame" allowtransparency="true"></iframe>','</div>','</div>','<a href="javascript:;" id="geCancelBtn" class="qui_btn qui_dialogPtlogin_cancel">\u53D6\u6D88</a>','$@$else if($step$=="2")$@$','<div class="bindAccount_succeed">','<div class="qui_clear bindAccount_succeed_tip">','<span class="bindAccount_succeed_img"></span>','<span class="bindAccount_succeed_desc">\u6210\u529F\u5173\u8054\u4E86<span class="qui_txtBold">$username$</span></span>','</div>','</div>','<div class="dialog_operate" id="geFinishBtn_wrap">','<a href="javascript:;" id="geFinishBtn" class="qui_btn">\u5B8C\u6210</a>','</div>','$@$else if($step$=="3")$@$','$@$if($isExitBind$=="1")$@$','<dd>','<div>','<span class="num">$username$</span>','<a href="/cgi-bin/bind?fun=unbind&uin=$uin$&sid=$sid$" target="actionFrame">\u53D6\u6D88\u5173\u8054</a>','</div>','</dd>','$@$else$@$','<dl style="margin-bottom:8px;" id="dl_hasbinds">','<dt style="margin:0;" class="f_size addrtitle">\u4F60\u5DF2\u5173\u8054\u7684\u5907\u7528\u90AE\u7BB1\uFF1A</dt>','<dd>','<div>','<span class="num">$username$</span>','<a href="/cgi-bin/bind?fun=unbind&uin=$uin$&sid=$sid$" target="actionFrame">\u53D6\u6D88\u5173\u8054</a>','</div>','</dd>','<dl>','$@$endif$@$','$@$endif$@$']),getCssVer:function(){
if(!this._msVer)
{
var a=getTop().getRes("$css_path$qui_dialogPtlogin.css"),b=(/qui_dialogPtlogin(.*)\.css/.test(a)&&RegExp.$1)||"";
this._msVer=b;
}
return this._msVer;
},getDefaultCfg:function(){
var a=this;
if(!a._oDefaultCfg)
{
a._oDefaultCfg={"topHost":_oTop.getTopHost(),"sid":_oTop.getSid(),"topProtocol":_oTop.location.protocol,"ver":a.getCssVer(),"loginDesc":encodeURIComponent('\u786E\u8BA4\u5173\u8054'),"cssFilename":"qui_dialogPtlogin"};
}
return a._oDefaultCfg;
},ptlogin2OnResize:function(a){
return function(h,f){
var d=a.S("importFrame"),c=a._moPanelDom,e=a.S("dialogPtloginTitle"),b=a.S("geCancelBtn");
if(d)
{
d.style.height=f+'px';
if(f>=288&&f<=295&&d.contentWindow.frames.length>0)
{
getTop().addClass(c,'qm_dialog_HideChild');
e.style.display='none';
function g()
{
setTimeout(function(){
if(d.contentWindow.frames.length==0)
{
getTop().rmClass(c,'qm_dialog_HideChild');
}
else if(getTop().hasClass(c,"qm_dialog_HideChild"))
{
g();
}
},100);
}
g();
}
else{
getTop().rmClass(c,'qm_dialog_HideChild');
e.style.display='block';
}
if(f>=199&&f<=298)
{
e.style.top='49px';
}
else{
e.style.top='34px';
}
}
if(b)
{
b.style.zoom='normal';
b.style.zoom='1';
}
};
},doBindQQAction:function(a){
var b=this;
b._oDialog.S("dialogPtloginTitle").style.display="none";
b._oDialog.S("importFrame").style.height="138px";
b._oDialog.S("geCancelBtn").style.display="none";
_oTop.showInfo("\u6B63\u5728\u5173\u8054\u90AE\u7BB1\u5E10\u6237...",500);
_oTop.QMAjax.send(_oTop.T(["/cgi-bin/bind?sid=$sid$&fromzc=&fun=bind&mailaddr=$mailaddr$&fromzc=&t=mailpotl.json","&uin=$uin$&aliastype=$aliastype$&verifycode="]).replace({"sid":a.sid,"mailaddr":a.sLoginaccount,"uin":a.uin,"aliastype":a.sAliasType}),{content:"",method:"POST",onload:function(c,d){
if(c)
{
var f=_oTop.evalValue(d);
try{
b.complete(_oTop.extend(f,{"account":a.sLoginaccount,"uin":a.uin}));
}
catch(g)
{
_oTop.showError("\u5173\u8054\u5E10\u6237\u5931\u8D25...");
}
}
else{
_oTop.showError("\u5173\u8054\u5E10\u6237\u5931\u8D25...");
}
}});
},complete:function(a){
var c=this,d=getTop();
if(a.succ==="0")
{
var e=c.getPtloginUrl({"uin":(a.account||"0")});
c._oDialog.setHtml("_body_",c._oTmpl.replace({"step":"1","ptloginurl":e}));
c._oDialog.S("geCancelBtn").onclick=function(){
c._oDialog.close();
};
a.failtype&&c.showError(a.failtype);
}
else if(a.succ==="1")
{
c._oDialog.setHtml("_body_",c._oTmpl.replace({"step":"2","username":a.account}));
var b=d.S("dl_hasbinds",d.getMainWin()),f=b?"1":"0",b=b||d.S("div_binds",d.getMainWin());
d.insertHTML(b,"beforeEnd",c._oTmpl.replace({"step":"3","username":a.account,"uin":a.uin,"sid":d.getSid(),"isExitBind":f}));
c._oDialog.S("geFinishBtn").onclick=function(){
c._oDialog.close();
};
}
},showError:function(a){
var b=getTop(),c="";
if(a=="-101")
{
c="\u90AE\u7BB1\u5730\u5740\u4E3A\u7A7A";
}
else if(a=="-116")
{
c="\u9A8C\u8BC1\u9891\u7387\u9650\u5236";
}
else if(a=="-100")
{
c="\u90AE\u7BB1\u5730\u5740\u9519\u8BEF";
}
else if(a=="-103")
{
c="\u4E0D\u80FD\u7ED1\u5B9A\u81EA\u5DF1\u7684\u90AE\u7BB1";
}
else if(a=="-104")
{
c="\u5DF2\u7ECF\u7ED1\u5B9A";
}
else if(a=="-117")
{
c="\u90AE\u7BB1\u9A8C\u8BC1\u5931\u8D25";
}
else if(a=="-106"||a=="-114")
{
c="\u7CFB\u7EDF\u5931\u8D25";
}
else{
c="\u5173\u8054\u90AE\u7BB1\u5931\u8D25";
}
b.showError(c);
}});
function str2JSON(str)
{
eval('var __pt_json='+str);
return __pt_json;
}
function ptloginResize()
{
var a=this;
if(typeof window.postMessage!=='undefined')
{
window.onmessage=function(c){
var d=c||window.event;
var b;
if(typeof JSON!=='undefined')
b=JSON.parse(d.data);
else b=window.str2JSON(d.data);
switch(b.action)
{case 'close':
break;
case 'resize':
window.ptlogin2_onResize(b.width,b.height);
break;
default:
break;
}
};
}
}
function closeAccount()
{
var b=this,c=getTop(),a=c.S("closeMailPtlogin_wrapper",c.getMainWin());
c.getMainWin()._bUnfresh=true;
a&&(a.style.display="none");
c.getMainWin().document.body.className="qui_funcOpa0";
c.goUrlMainFrm(c.T(["/cgi-bin/doaccount?sid=$sid$&step=1&ts=&pwd=$pwd$&rawpwd=&pwdtype=1&t=closeaccount"]).replace({"sid":c.getSid()}));
c.waitFor(function(){
return !(c.getMainWin()._bUnfresh);
},function(d){
oTop.getMainWin().document.body.className="";
},100);
}
function toAuthorizeWeiyun()
{
var b=getTop(),a=arguments.callee;
b.loadCssFile("$css_path$login/addAccount.css",true,b.document);
a._oDialog=new b.QMDialog({sId:"id_AuthorizeWeiyun",sTitle:"\u6388\u6743\u5FAE\u4E91",nWidth:440,sBodyHtml:a._oTmpl.replace({"username":b.getUin(),"ptloginurl":a.getPtloginUrl({"uin":b.getUin()})}),bAnimation:false,onshow:function(){
var c=this;
getTop().ptlogin2_onResize=a.ptlogin2OnResize(c);
getTop().ptloginResize();
c.S("geCancelBtn").onclick=function(){
c.close();
};
},onclose:function(){
if(this.reloadLeftWin)
{
reloadLeftWin();
}
},onbeforeclose:function(){
var c=this;
c.S("importFrame")&&removeSelf(c.S("importFrame"));
}});
}
getTop().extend(toAuthorizeWeiyun,_oOidbAccountBase,{_oTmpl:getTop().TE(['<div id="div_stepPassword" class="addAccount_step addAccount_step_Password">','<div id="div_warning" class="addAccount_errorTip"></div>','<div id="div_username" class="addAccount_step_usernameShow">$username$</div>','<div class="addAccount_ptlogin">','<iframe frameborder="0" width="100%" src="$ptloginurl$" id="importFrame" allowtransparency="true"></iframe>','</div>','</div>','<div class="addAccount_loadingWrap" style="display: none;" id="div_loading">','<span class="addAccount_loading"></span>','</div>','<div class="dialog_operate addAccount_foot" id="div_foot">','<a href="javascript:;"  id="geCancelBtn" class="qui_btn addAccount_foot_cancel">\u53D6\u6D88</a>','</div>']),_PTLOGIN_TEMP:getTop().T(["https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=522005705&daid=4&s_url=$topHost$/cgi-bin/readtemplate?","sid=$sid$%26t=netdrive_pt&style=25&low_login=0&proxy_url=$topProtocol$","//mail.qq.com/proxy.html&need_qr=0&hide_border=1&border_radius=0&self_regurl=http://zc.qq.com/chs/index.html?","type=1&app_id=11005?t=regist&pt_feedback_link=http://support.qq.com/discuss/350_1.shtml&css=https://","res.mail.qq.com/zh_CN/htmledition/style/$cssFilename$$ver$.css&target=self&hide_title_bar","=1&default_uin=$uin$&pt_no_auth=1&login_text=$loginDesc$&enable_qlogin=0"]),getCssVer:function(){
if(!this._msVer)
{
var a=getTop().getRes("$css_path$addAccountPtlogin.css"),b=(/addAccountPtlogin(.*)\.css/.test(a)&&RegExp.$1)||"";
this._msVer=b;
}
return this._msVer;
},getDefaultCfg:function(){
var a=this;
if(!a._oDefaultCfg)
{
a._oDefaultCfg={"topHost":_oTop.getTopHost(),"sid":_oTop.getSid(),"topProtocol":_oTop.location.protocol,"ver":a.getCssVer(),"loginDesc":encodeURIComponent('\u6388\u6743'),"ptfun":"addother","cssFilename":"addAccountPtlogin"};
}
return a._oDefaultCfg;
},ptlogin2OnResize:function(a){
return function(j,h){
var d=a.S("importFrame"),c=a._moPanelDom,f=a.S("div_stepPassword"),g=a.S("div_username"),b=a.S("geCancelBtn"),e=a.S("btlogin");
if(d)
{
d.style.height=h+'px';
if(h>=288&&h<=295&&d.contentWindow.frames.length>0)
{
getTop().addClass(c,'qm_dialog_HideChild');
b.style.display='none';
f.style.height=h+'px';
function i()
{
setTimeout(function(){
if(d.contentWindow.frames.length==0)
{
getTop().rmClass(c,'qm_dialog_HideChild');
b.style.display='inline-block';
f.style.height='95px';
d.style.height='166px';
}
else if(getTop().hasClass(c,"qm_dialog_HideChild"))
{
i();
}
},100);
}
i();
}
else{
getTop().rmClass(c,'qm_dialog_HideChild');
b.style.display='inline-block';
f.style.height=(h-66)+'px';
}
if(h>=171&&h<=290)
{
g.style.marginTop='15px';
}
else{
g.style.marginTop='0';
}
}
if(b)
{
b.style.zoom='normal';
b.style.zoom='1';
}
if(e)
{
e.style.zoom='normal';
e.style.zoom='1';
}
};
},doAction:function(){
var b=getTop(),a=this;
b.QMNetDisk.bind("weiyun");
a._oDialog.close();
}});
