(function(b){
var c=getTop(),a={createBlankIframe:c.createBlankIframe,callBack:c.callBack,S:c.S,T:c.T,TE:c.TE,addEvent:c.addEvent,trim:c.trim,now:c.now,isObjContainTarget:c.isObjContainTarget,getEventTarget:c.getEventTarget,show:c.show,calcPos:c.calcPos,calcAdjPos:c.calcAdjPos,debug:c.debug,ossLog:c.ossLog,evalCSS:c.evalCss,alert:function(){
alert.apply(null,arguments);
},getDomWin:function(d){
var e=d.ownerDocument;
return e.parentWindow||e.defaultView;
},funcProxy:function(e,d,f){
return function(){
var h;
if(f)
{
h=f.slice(0);
for(var j=0,g=arguments.length;j<g;j++)
{
h.push(arguments[j]);
}
}
else{
h=arguments;
}
d.apply(e,h);
};
}};
window.QMTranslateAdapter=a;
})();
(function(a,d){
var j=['body{font-family:"lucida Grande",Verdana;font-size:12px;}.transcont{position:absolute;padding:10px 20px;line-height:1.7;box-shadow:0 0 5px #ddd;-webkit-border-radius:5px;-moz-border-radius:5px;-o-border-radius:5px;border-radius:5px;}.tc_title{font-weight:bold;font-size:1.2em;}.tc_title span{font-weight:normal;color:#a0a0a0;}.tc_title span b{font-weight:normal;color:#5FA207;}.tc_type{color:#7a7a7a;font-type:italic;}.tc_example_title{margin-top:15px;color:#7F7F7F;}.tc_example_en{color:#000;}.tc_example_zh{margin-bottom:5px;color:#666;}.tc_pro{font-family:"Lucida Sans Unicode",Tahoma,Simsun;}'].join('\n');
var g={},i=a.T(location.protocol=="https:"?"/cgi-bin/readtemplate?check=false&resp_charset=UTF8&ef=js&t=qqdictadapter&q=$q$&c=$c$":"http://dict.qq.com/dict?q=$q$&f=cloud&c=$c$&t=bd+wl&n=1+1&p=0+0"),f=['<div class="tc_title">$word_name$ $@$if($pho.0$)$@$<span>[<b class="tc_pro">$pho.0$</b>]</span>$@$endif$@$</div>','$@$for($means$)$@$','<div>','$@$for($parts$)$@$','<span>$@$eval parseInt($_idx_$)+1$@$. </span>','<span class="tc_type">$part$</span> <span class="tc_translate">$@$eval $means$.join("\uFF1B")$@$</span>','<br>','$@$endfor$@$','</div>','$@$endfor$@$',""],h=a.TE([f.join('')]),k="qmtranslatetipid";
function e(m,l)
{
if(!m)
{
return a.callBack(l);
}
if(g[m])
{
return a.callBack(l,[m,g[m]]);
}
var n=a.T("/cgi-bin/magurl?sid=$sid$&url=$url$").replace({sid:getTop().getSid(),url:encodeURIComponent(["http://dict-co.iciba.com/api/dictionary.php?w=",m.toLowerCase(),"&key=71C35ABEBD38D433050C0D472F46F216&type=json"].join(""))});
QMAjax.send(n,{method:"GET",onload:function(o,p){
if(o)
{
var q=evalValue(["(",p,")"].join(""));
q.means=[{parts:[]}];
getTop().E(q.symbols,function(r){
if(r.parts&&r.parts.length)
{
q.means[0].parts=q.means[0].parts.concat(r.parts);
}
});
q.means[0].parts&&q.means[0].parts.length&&a.callBack(l,[m,g[m]=q]);
}
}});
}
var c={_setLog:function(n,l,m){
var p=this,o=p._moLogWord[n]=p._moLogWord[n]||[0,0];
l&&o[0]++;
m&&o[1]++;
a.ossLog("realtime","all","stat=qqtranslate&req="+(l?1:0)+"&show="+(m?1:0));
return p;
},_sendLogResult:function(){
var p=this,n=p._moLogWord,m=/^[\u0000-\u00FF]+$/,o=[0,0,0,0];
for(var q in n)
{
var l=m.test(q)?0:2;
o[l]+=n[q][0];
o[l+1]+=n[q][1];
}
return p;
},_initLog:function(){
var l=this;
l._moLogWord={};
return l;
},_hide:function(l){
var n=this,m=n._moCfg.oDom.ownerDocument,p=a.S(k,m);
if(l)
{
var o=a.getEventTarget(l);
if(a.isObjContainTarget(p,o))
{
return n;
}
}
a.show(k,0,m);
return n;
},_show:function(l,m,o,n){
var q=this._hide();
if(o&&n&&q._getSelectText()==o)
{
q._setLog(o,0,1);
var p=q._moCfg.oDom.ownerDocument,r=a.S(k,p);
if(!r)
{
r=p.createElement("div");
r.id=k;
r.className="transcont settingtable qqshowbd";
p.body.appendChild(r);
}
r.innerHTML=h.replace(n);
r.style.visibility="hidden";
r.style.zIndex=1000;
r.style.maxWidth="480px";
r.style.marginRight="10px";
a.show(r,1);
q._modifyTipDomPos([m-20,l,m+20,l],r,p);
}
return q;
},_modifyTipDomPos:function(l,n,m){
var o=n.style;
o.left=getTop().bodyScroll(m,"scrollLeft")+l[1]+"px";
o.top=getTop().bodyScroll(m,"scrollTop")+l[2]+"px";
setTimeout(function(){
o.visibility="visible";
o.left=getTop().bodyScroll(m,"scrollLeft")+l[1]+"px";
o.top=getTop().bodyScroll(m,"scrollTop")+l[2]+"px";
o=m=n=null;
});
},_getSelectText:function(l){
var o=this,n=o._moCfg.oDom,m=n.ownerDocument,q=m.parentWindow||m.defaultView,r=q.getSelection?q.getSelection():m.getSelection?m.getSelection():m.selection?m.selection.createRange().text:"";
r=""+r;
if(""==r&&l)
{
var p=a.getEventTarget(l);
if(d!=p.selectionStart&&d!=p.selectionEnd)
{
r=p.value.substring(p.selectionStart,p.selectionEnd);
}
}
return a.trim(r);
},_translate:function(l){
var p=this,q=p._getSelectText(l),n=l.clientX,o=l.clientY,m=window.document.body.offsetWidth;
if(n+200+200>m)
{
n=m-200-200;
}
if(q&&/^[a-z\.]+$/i.test(q))
{
p._setLog(q,1,0);
e(q,a.funcProxy(p,p._show,[n,o]));
}
return p;
},_initEvent:function(){
var m=this,l=m._moCfg.oDom;
a.addEvent(l,"dblclick",m._mfEventTranslate=a.funcProxy(m,m._translate));
a.addEvent(l.ownerDocument.body,"click",m._mfEventHide=a.funcProxy(m,m._hide));
return m;
},destroy:function(){
var m=this;
if(m._moCfg)
{
var l=m._moCfg.oDom;
a.addEvent(l,"dblclick",m._mfEventTranslate,true);
a.addEvent(l.ownerDocument.body,"click",m._mfEventHide,true);
m._mfEventTranslate=m._mfEventHide=null;
m._moCfg=null;
}
return m;
},init_:function(l){
var m=this;
m._moCfg=l;
m._initEvent()._initLog();
a.evalCSS(j,l.oDom.ownerDocument,"qmtranslate");
a.addEvent(a.getDomWin(l.oDom),"unload",a.funcProxy(m,m.destroy));
return m;
}};
var b=function(l){
this.init_(l);
};
b.prototype=c;
window.QMTranslate=b;
})(QMTranslateAdapter);
