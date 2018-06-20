var QMAddrParser={parseAddr:function(a){
var f,e,g,d,c=[],h=getTop().trim(a||"");
for(var j=0,b=h.length;j<b;j=g[0])
{
f=[];
e=[];
g=this._getSegment(h,j,f,e);
d=this._parseSegment(g[1],f,e);
if(d.addr)
{
c.push(d);
}
}
return c;
},isEmailAddress:function(a){
var d=/^(.+)@(.+)$/,n="\\(\\)><@,;:\\\\\\\"\\.\\[\\]",o="\[^\\s"+n+"\]",j=o+'+',p="("+j+")",b=new RegExp("^"+p+"\\.?("+p+"\\.?)*$"),g=a.match(d);
if(a.substring(0,2)=="g_"&&a.indexOf('@')==-1)
{
_oAddr=getTop().QMAddress._moAddrBook.personal;
for(var q=0;q<_oAddr.length;q++)
{
var m=_oAddr[q].email;
if(m==a)
{
return true;
}
}
return false;
}
if(g==null)
{
return false;
}
var h=g[1],l=g[2];
for(var q=0;q<h.length;q++)
{
if(h.charCodeAt(q)>126||l.charCodeAt(q)<32)
{
return false;
}
}
if(h.match(b)==null)
{
return false;
}
var f=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
for(var q=0;q<l.length;q++)
{
if(l.charCodeAt(q)>126||l.charCodeAt(q)<32)
{
return false;
}
}
var e=l.match(f);
if(e!=null)
{
for(var q=1;q<=4;q++)
{
if(e[q]>255)
{
return false;
}
}
}
var c=new RegExp("^"+j+"$"),k=l.split(".");
for(var q=0;q<k.length;q++)
{
if(k[q].search(c)==-1)
{
return false;
}
}
return true;
},_getSegment:function(d,a,c,b){
var l,e,n,j,p='N',m='<(",; \uFF0C\uFF1B\u3001',q='<("DDDDD',o='>)"',g=0,k=a,r="",f=0,h=0;
for(var s=a;p!='D';)
{
l=d.charAt(s);
e=p;
f=0;
if(l=='\\'&&p!='<')
{
l=d.charAt(++s);
f=1;
}
if(l=='')
{
p='D';
g=s;
}
else if(p=='N')
{
if(!f&&(j=m.indexOf(l))>-1)
{
p=q.charAt(j);
n=o.charAt(j);
g=(j>2)?s:s-1;
}
else{
r+=l;
}
++s;
}
else{
if(!f&&l==n)
{
p='N';
g=s;
}
else{
r+=l;
}
++s;
}
if(p!=e||h)
{
if(e=='"'||getTop().trim(r)!="")
{
c.push([r,e,k,d.substr(k,g-k+1)]);
b.push(e);
}
h=0;
r="";
k=g+1;
}
}
return [s,d.substr(a,s-a)];
},_parseSegment:function(c,b,a){
var e="",d="";
switch(a.join(""))
{case 'N':
case '<':
d=b[0][0];
break;
case '"<':
case 'N<':
case '"N':
e=b[0][0];
d=b[1][0];
break;
}d=getTop().trim(d);
e=getTop().trim(e);
if(!/[^0-9]/.test(d))
{
d+="@qq.com";
}
return this.isEmailAddress(d)?{nick:e,addr:d,valid:true}:{nick:"",addr:/[;, \uFF1B\uFF0C\u3001]$/.test(c)?c.slice(0,-1):c,valid:false};
}};
var QMAddrDomainCheck={_NOCHECK:";qzone.qq.com;qq.com;vip.qq.com;sina.com;163.com;126.com;yeah.net;163.net;21cn.com;yahoo.com;yahoo.com.cn;gmail.com;hotmail.com;",_moDomainData:{},_moProhibitData:{},_mnDelayTimeout:null,_setData:function(a){
var f=this,d=f._moDomainData;
if(a.checkdomain)
{
for(var c=a.checkdomain,b=c.length-1;b>=0;b--)
{
if(c[b])
{
var g=c[b][0];
d[g]=d[g]||{};
d[g].tips=c[b][1].split(';');
}
}
}
if(a.domainlimit)
{
for(var e=a.domainlimit,b=e.length-1;b>=0;b--)
{
if(e[b])
{
var g=e[b][0];
d[g]=d[g]||{};
d[g].attlmt=parseInt(e[b][1]);
d[g].dmn=e[b][2]=='1';
}
}
}
if(a.prohibit)
{
f._moProhibitData[a.prohibit[0]]=a.prohibit[1];
}
},createChecker:function(b,a,c){
return new this._ui(b,a,c||{});
},permit:function(a){
return !this._moProhibitData[a.sort().join(';')];
},_getTip:function(a){
var d=this,e=[];
for(var b=a.length-1;b>=0;b--)
{
var c=d._moDomainData[a[b]];
c&&c.tips&&e.push({sDom:a[b],oTips:c.tips});
}
return e;
},getAttachLimit:function(a){
var f=this,h,c=50*1024*1024,g=[],e=[];
for(var b=a.length-1;b>=0;b--)
{
var d=f._moDomainData[a[b]];
if(d)
{
if(!d.attlmt)
{
g.push(a[b]);
}
else if(d.attlmt<c)
{
h=a[b];
c=d.attlmt;
}
}
else if(f._NOCHECK.indexOf(';'+a[b]+';')<0)
{
e.push(a[b]);
}
}
return {sDom:h,nLim:(e.length==a.length?-1:c),oUnknown:g,oNoCheck:e};
},getExDomain:function(a){
var e=this,d=[];
for(var b=a.length-1;b>=0;b--)
{
var c=e._moDomainData[a[b]];
if(c&&!c.dmn)
{
d.push(a[b]);
}
}
return d;
},_parseAddr:function(a){
var f=this,c={},e={},d=[],b=[],i=f._NOCHECK;
try{
i+=getTop().S("useraddr").innerHTML.split("@")[1]+";";
}
catch(j)
{
}
getTop().E(QMAddrParser.parseAddr(a),function(k){
k.valid&&(c[k.addr.split("@").pop()]=1)&&(e[k.addr]=1);
});
for(var g in c)
{
if(i.indexOf(";"+g+";")==-1)
{
b.push(g);
}
}
for(var h in e)
{
d.push(h);
}
return [b,d];
},check:function(_asAddrs,_anType,_afCallBack){
var _oSelf=this,_oTop=getTop(),_oAddrData=_oSelf._parseAddr(_asAddrs),_oCheckDomains=[],_sCheckAddress="";
for(var _oDomain=_oAddrData[0],_len=_oDomain.length,_i=0;_i<_len;_i++)
{
if(!_oSelf._moDomainData[_oDomain[_i]])
{
_oCheckDomains.push(_oDomain[_i]);
}
}
if(_anType&4&&_oAddrData[1].length>5)
{
_sCheckAddress=_oAddrData[1].sort().join(";");
}
else{
_anType&=59;
}
if(_oCheckDomains.length==0)
{
_anType&=60;
}
if(_anType)
{
if(_oSelf._mnDelayTimeout)
{
clearTimeout(_oSelf._mnDelayTimeout);
}
_oSelf._mnDelayTimeout=setTimeout(function(){
if(_oCheckDomains.length==0)
{
return;
}
_oTop.QMAjax.send("/cgi-bin/addr_domain_check",{method:"POST",content:_oTop.T('sid=$sid$&addrs=$addrs$&addrlist=$list$&acttype=$type$&t=addr_domain_check').replace({sid:_oTop.getSid(),type:_anType&3,list:encodeURI(_sCheckAddress),addrs:encodeURI("a@"+_oCheckDomains.join(";a@"))}),onload:function(_abIsOk,_asParam){
if(_abIsOk&&_asParam.indexOf('success:true')>0)
{
_oSelf._setData(eval(_asParam));
_oTop.callBack.call(_oSelf,_afCallBack,[{bCksp:_oSelf.permit(_oAddrData[1]),oCklm:_oSelf.getAttachLimit(_oAddrData[0]),oCkdm:_oSelf._getTip(_oAddrData[0])}]);
}
}});
},200);
}
else{
_oTop.callBack.call(_oSelf,_afCallBack,[{bCksp:_oSelf.permit(_oAddrData[1]),oCklm:_oSelf.getAttachLimit(_oAddrData[0]),oCkdm:_oSelf._getTip(_oAddrData[0])}]);
}
return _oSelf;
}};
QMAddrDomainCheck._ui=function(b,a,c){
var g=getTop(),f=this,d=[];
f._moTmpl=QMAddrDomainCheck._ui._TEMPLATE;
f._mnType=a;
var e=b.join?b:[b];
g.E(e,function(i,h){
var k,j=i.getContainer?i.getContainer():i;
j.parentNode.insertBefore(k=j.ownerDocument.createElement("div"),j.nextSibling);
g.show(k,false);
g.addEvent(k,"click",function(l){
return f._doEvent(l,h);
});
d.push(k);
});
f._moDispErrDomains=new Array(e.length);
f._moInputObjs=e;
f._moContainers=d;
if(c.oPermit)
{
_oBindContainer=c.oPermit;
_oBindContainer.appendChild(_oContainer=_oBindContainer.ownerDocument.createElement("div"));
g.show(f._moPermit=_oContainer,false);
}
};
QMAddrDomainCheck._ui.prototype={check:function(){
var f=this,b=f._mnType,d,e=f._moInputObjs,c=[];
for(var a=e.length-1;a>=0;a--)
{
d=e[a];
if(!(d.isDisabled&&d.isDisabled()))
{
c.push(d.get?d.get(';'):d.value);
}
}
QMAddrDomainCheck.check(c.join(';'),b,function(g){
if(b&4)
{
f._show(f._moPermit,g.bCksp?[]:[1],4);
}
if(b&1)
{
f._checkInput();
}
});
},_getDomain:function(){
var d,e=this._moInputObjs,c=[];
for(var a=e.length-1;a>=0;a--)
{
d=e[a];
if(!(d.isDisabled&&d.isDisabled()))
{
var f=d.get('json');
for(var b=f.length-1;b>=0;b--)
{
c.push(f[b].addr.replace(/.+@/,''));
}
}
}
return c;
},getAttachLimit:function(){
return QMAddrDomainCheck.getAttachLimit(this._getDomain());
},getExDomain:function(){
return QMAddrDomainCheck.getExDomain(this._getDomain());
},_checkInput:function(){
var c=this,b=c._moInputObjs,a=c._moContainers;
getTop().E(c._moInputObjs,function(e,d){
if(e.isDisabled&&e.isDisabled())
{
return;
}
var f=e.get?e.get(';'):e.value;
QMAddrDomainCheck.check(f,1,function(g){
var h=g.oCkdm;
c._moDispErrDomains[d]=h;
e.setDomainError&&e.setDomainError(h);
c._show(a[d],h,1);
});
});
},_show:function(b,c,a){
if(!b)
{
return;
}
var l=this,m=getTop(),e=c.length,k=m.qmAnimation,d=k.getActionType(b)=="expand"&&b.style.display=='';
if(e>0)
{
var j={errors:[],type:a},h=j.errors;
if(a&1)
{
for(var n=0;n<e;n++)
{
var f=c[n],g={domain:f.sDom,items:[]};
m.E(f.oTips,function(i){
g.items.push({data:i});
});
h.push(g);
}
}
b.innerHTML=l._moTmpl.replace(j);
if(!d)
{
k.expand(b,{type:"break"});
}
}
else if(d)
{
k.fold(b,{type:"break"});
}
},_doEvent:function(b,a){
var l=getTop(),h=this,e=h._moContainers[a],c=h._moInputObjs[a],f=h._moDispErrDomains[a],j=l.getEventTarget(b);
if(j.name)
{
var m=j.parentNode.getAttribute("domain"),n=j.name;
if(c.updateDomain)
{
c.updateDomain(m,n);
}
else{
var g=[],k=l.TE('$@$if($nick$)$@$"$nick$"<$@$endif$@$$addr$$@$if($nick$)$@$>$@$endif$@$');
l.E(QMAddrParser.parseAddr(c.value),function(i){
var p=i.addr.split("@");
if(p.pop()==m)
{
i.addr=[p[0],n].join("@");
}
i.nick=getTop().encodeNick(i.nick);
g.push(k.replace(i));
});
c.value=g.join(";");
}
for(var o=0,d=f.length;o<d;o++)
{
if(f[o].sDom==m)
{
f.splice(o,1);
break;
}
}
h._show(e,f,1);
}
}};
QMAddrDomainCheck._ui._TEMPLATE=getTop().TE(['<div style="padding:3px 0;line-height: 18px; margin: 4px 0 0 0;" class="domainCheckDisp">','$@$if($type$&4)$@$','<div class="txt_red">\u60A8\u6DFB\u52A0\u7684\u6536\u4EF6\u4EBA\u90AE\u4EF6\u5730\u5740\u8FC7\u591A\uFF0C\u8BF7\u53BB\u9664\u90E8\u5206\u5730\u5740\u3002</div>','$@$else$@$','<div class="graytext">\u6211\u4EEC\u53D1\u73B0\u60A8\u8F93\u5165\u7684\u5730\u5740\u53EF\u80FD\u6709\u8BEF\uFF0C\u8BF7\u9009\u62E9\u4FEE\u6539\uFF1A</div>','$@$for($errors$)$@$','<div style="margin-top: 4px;" domain="$domain$">','$domain$','$@$for($items$)$@$','$@$if($_idx_$!=0)$@$',',&nbsp;','$@$else if($data$)$@$',' \u2192 ','$@$endif$@$','<a name="$data$">$data$</a>','$@$endfor$@$','</div>','$@$endfor$@$','$@$endif$@$','</div>']);
function QMAddrInput(a)
{
this.constructor=arguments.callee;
this._initlize(a)._setup(a)._setEvent()._setAutoComplete();
}
;QMAddrInput.get=function(b,a){
var c=a[this._CONST._nCacheId];
return c&&c[b];
};
QMAddrInput.prototype={add:function(d,b,e,a,c){
var i=this,h=QMAddrParser.parseAddr(d),f=h.length;
var g=c?0:1;
getTop().E(h,function(j){
if(i._mbInContact)
{
e||(j.valid=false);
}
!a&&i._addItem(j.addr,j.nick,j.valid,e,g);
a&&i._addItem(j.addr,j.nick,true,e,g);
});
f&&getTop().show(i._moDefaultText,false);
if(f&&!b)
{
getTop().callBack.call(this,this._mEvent._onchange,["add"]);
}
return h;
},clear:function(){
var c=this,b=c._moAddrList,a=b.length;
while(b.length!=0)
{
c._deleteItem(b[0]);
}
if(a)
{
getTop().callBack.call(this,this._mEvent._onchange,["del"]);
}
return c;
},del:function(b,a){
if(this.hasAddr(b))
{
this._deleteItem(b);
a||getTop().callBack.call(this,this._mEvent._onchange,["del"]);
}
},disabled:function(a){
this._mbIsDisabled=typeof a!="boolean"?true:a;
return this;
},edit:function(a){
var c=this,b=c._moAddrMap[a];
if(b)
{
var d=b._sNick&&getTop().encodeNick(b._sNick);
c._moSelectCtrl.blur();
c._cancelSelectItem();
c._addTextCtrlValue();
c._insertTextBefore(a);
c._deleteItem(a);
c._changeTextValue(c._moTemplate._ADDREDIT.replace({nick:d,addr:a,splitchar:c._msSplitChar}));
c.focus(d?3+d.length:0);
}
return c;
},flush:function(){
this._addTextCtrlValue();
return this;
},focus:function(a){
var b=this;
switch(a)
{case "all":
return b._setTextCursorRange(0,-1);
case "start":
return b._setTextCursorRange(0,0);
case "end":
return b._setTextCursorRange(-1,-1);
}if(typeof (a)=="number")
{
return b._setTextCursorRange(a,a);
}
if(typeof (a)=="string")
{
return b._focusWithLock()._selectItem(a);
}
return b._focusWithLock();
},get:function(a){
var d=[],b=this._moAddrList,c=this._moAddrMap;
if(a=="autocomplete")
{
return this._moAutoComplete;
}
else if(!a||{error:1,errhtml:1,json:1,validemail:1}[a])
{
getTop().E(b,function(e){
var f=c[e];
switch(a)
{case "error":
if(!f._bIsValid)
{
d.push(e);
}
break;
case "errhtml":
if(!f._bIsValid)
{
d.push(getTop().htmlEncode(e));
}
break;
case "json":
d.push({nick:f._sNick,addr:e,valid:f._bIsValid,nid:f._sNid,format:f._sNick?['"',getTop().encodeNick(f._sNick),'"<',e,'>'].join(""):e});
break;
case "validemail":
if(f._bIsValid)
{
d.push(e);
}
;break;
default:
d.push(f._sNick?['"',getTop().encodeNick(f._sNick),'"<',e,'>'].join(""):e);
}
});
return d;
}
else{
return b.join(a);
}
},getContainer:function(){
return this._moContainer;
},getId:function(){
return this._msId;
},getOwnerWindow:function(){
return this._moWindow;
},hasAddr:function(a){
return this._moAddrMap.hasOwnProperty(a);
},isDisabled:function(){
return this._mbIsDisabled;
},length:function(){
return this._moAddrList.length;
},updateDomain:function(b,a){
var f=this,e=[],c=this._moAddrList,d=this._moAddrMap;
getTop().E(c,function(g){
if(d[g]._sDomain==b)
{
e.push(g);
}
});
getTop().E(e,function(g){
var h=d[g];
f._insertTextBefore(g);
f.add(f._moTemplate._ADDREDIT.replace({nick:h._sNick,addr:[h._sAlias,a].join("@")}),true);
f._deleteItem(g,true);
});
getTop().callBack.call(this,this._mEvent._onchange,["change"]);
},setDomainError:function(a){
var d=this,b=false,c=d._moErrorDomainMap;
getTop().E(a,function(e){
if(!c[e.sDom])
{
b=c[e.sDom]=true;
}
});
return d._updateErrorDomainDisplay();
},_addItem:function(c,d,a,e,b){
var n=this,k=n._moAddrMap,j=n._moAddrList,p=n._moTextContainer,m=p.previousSibling,i=(m?n._getAddrPos(m.getAttribute("addr")):-1)+1;
var g=getTop().QMAddress.getAddress(c).isgroup?1:0;
if(c.substring(0,2)=="g_"&&c.indexOf('@')==-1)
{
g=1;
}
var h=b&&g;
if(k[c])
{
j.splice(n._getAddrPos(c),1);
n._moContainer.insertBefore(k[c]._oDom,p);
}
else{
var o=n._moTemplate,q=getTop().htmlEncode(c),t=d,r=c.split("@"),s=a?r[1]:"";
_sAlias=a?r[0]:c;
function f(v,u)
{
return getTop().htmlEncode(getTop().getAsiiStrLen(v)>u?getTop().subAsiiStr(v,u,"..."):v);
}
getTop().insertHTML(p,"beforeBegin",o._ADDRITEM.replace({nick:t&&f(t,n._moConst._nMaxNickAsiiLen),alias:_sAlias&&f(_sAlias,n._moConst._nMaxAddrAsiiLen),domain:s&&getTop().htmlEncode(s),addr:q,css:n._moStyle,dispmode:n._msDispMode,splitchar:n._msSplitChar,isvalid:a,isdomainerr:!!n._moErrorDomainMap[s],images_path:getTop().getPath("image"),isshowprofile:h,isgroup:g}));
var l=p.previousSibling;
k[c]={_sNick:d,_sAlias:_sAlias,_sDomain:s,_oDom:l,_bIsValid:a,_sNid:e};
n._setAddrItemEvent(l,c);
}
n._adjustContainerHeight();
j.splice(i,0,c);
},_addTextCtrlValue:function(){
if(this.add(getTop().trim(this._moTextCtrl.value))!=0)
{
this._changeTextValue("");
return true;
}
return false;
},_adjustContainerHeight:function(){
var c=this,b=c._moContainer;
if(c._mnMaxHeight&&getTop().gnIEVer<7)
{
b.style.height='auto';
var a=b.offsetHeight;
if(a>c._mnMaxHeight)
{
b.style.height=c._mnMaxHeight+'px';
}
}
},_adjustTextWidth:function(a){
var h=this,g=h._getTextContainerLen(a);
if(a==229)
{
setTimeout(function(){
h._adjustTextWidth(48);
});
}
if(this._mnTextWidthCache!=g)
{
this._mnTextWidthCache=g;
var i=h._moTextContainer,b=h._moConst._nBasicWidth,f=h._moConst._nStepWidth,e=g<b?0:1+Math.floor((g-b)/f),c=Math.min(b+f*e,h._moContainer.offsetWidth-5),d=i.clientWidth;
if(c!=d)
{
i.style.width=c+"px";
if(a=="paste")
{
i.scrollLeft=0;
}
}
}
},_cancelSelectItem:function(b,a){
var d=this._moAddrSelInfo;
if(this._hasAddrSelected())
{
var e=d._oData;
if(b)
{
var g=d._oList,f=e[b];
if(f)
{
this._setAddrItemClass(f,"normal");
for(var j=0,c=g.length;j<c;j++)
{
if(g[j]==b)
{
g.splice(j,1);
break;
}
}
delete e[b];
}
}
else{
for(var h in e)
{
this._setAddrItemClass(e[h],"normal");
}
d._oData={};
d._oList=[];
if(!a)
{
d._nCursorPos=null;
}
}
return true;
}
return false;
},_changeTextValue:function(a){
this._moTextCtrl.value=a;
this._adjustTextWidth();
},_deleteItem:function(a){
var d=typeof a=="string"?a:a.getAttribute("addr"),b=this._moAddrMap[d],c=this._mEvent;
if(b)
{
getTop().removeSelf(b._oDom);
delete this._moAddrMap[d];
this._moAddrList.splice(this._getAddrPos(d),1);
}
c._onNotify&&c._onNotify();
return d;
},_deleteSelectItems:function(b,a){
var f=this._moAddrSelInfo;
if(f._nLength!=0)
{
var h=f._oList,d=this._getAddrPos(h[h.length-1]),g=f._oData;
this._cancelSelectItem();
for(var i in g)
{
this._deleteItem(i);
}
var e=this._moAddrList,c=e.length;
if(!b)
{
if(c!=0)
{
this._insertTextBefore(d<c?e[d]:null);
}
this.focus("start");
}
if(!a)
{
getTop().callBack.call(this,this._mEvent._onchange,["del"]);
}
}
},_focusWithLock:function(){
this._lockFocus()._moTextCtrl.focus();
return this._unlockFocus();
},_getAddrPos:function(a){
var c=this._moAddrList;
for(var d=0,b=c.length;d<b;d++)
{
if(c[d]==a)
{
return d;
}
}
return -1;
},_getAutoCompleteData:function(){
var f=this,g=getTop(),k=f._moTextCtrl.value,b=[];
if(g.QMAddress)
{
var c;
if(f._mbInContact)
{
c=g.QMAddress.search(k,15,["personal","client","biz","emailgroup"]);
}
else{
c=g.QMAddress.search(k,15);
}
for(var m=0;m<c.length;m++)
{
var a=c[m],h=g.T('"$name$" <$email$>').replace(a);
var e=new RegExp(k.replace(/([\(\)\.\*\$\[\]\{\}\\])/g,"\\$1"),"g"),j=";;;"+k+";;;",d=new RegExp(j.replace(/([\(\)\.\*\$\[\]\{\}\\])/g,"\\$1"),"g"),l="<b>"+k+"</b>";
h=g.htmlEncode(h.replace(e,j)).replace(d,l);
b.push({sId:a.nid,oAddress:a,sItemValue:h});
}
;
}
return b;
},_getCtrlKeyName:function(){
return {cmd:getTop().gbIsMac?"Command":"Ctrl"};
},_getTextContainerLen:function(a){
var h=this._moTextCtrl.value,b=a==8,e=a==32||(a>=48&&a<229),c=a==229,d=!!h||e||c;
if(!d)
{
return 0;
}
if(b)
{
h=h.slice(0,-1);
}
var g=h+(e?"WW":"WW");
if(g==this._msStrLenCacheValue&&!c)
{
return this._mnStrLenCacheResult;
}
var f=this._moStrLenCalcer;
this._msStrLenCacheValue=g;
f.innerHTML=getTop().htmlEncode(g).replace(/ /ig,"&nbsp;");
return this._mnStrLenCacheResult=f.scrollWidth;
},_getTextPos:function(){
var a=this._moTextContainer.previousSibling;
return a?this._getAddrPos(a.getAttribute("addr")):-1;
},_getTextSelectionState:function(){
var j=this._moTextCtrl,l=j.value,k=this._moWindow,e=k.document,h={_nLength:l.length};
if(e.selection)
{
var i=j.createTextRange(),g=e.selection.createRange();
function d(m)
{
try{
i.moveStart("character",0);
i.setEndPoint(["EndTo",m].join(""),g);
return (i.text||"").length;
}
catch(n)
{
return -1;
}
}
h._nStart=d("Start");
h._nEnd=d("End");
}
else{
var i=e.createRange();
i.selectNode(j);
try{
var g=k.getSelection().getRangeAt(0);
var b=i.compareBoundaryPoints(Range.START_TO_nStart,g)==1,a=i.compareBoundaryPoints(Range.END_TO_nEnd,g)==-1,c=!b&&!a;
}
catch(f)
{
var c=true;
}
h._nStart=c?j.selectionStart:-1;
h._nEnd=c?j.selectionEnd:-1;
}
if(h._nStart==-1)
{
h._sType="none";
}
else if(h._nStart!=h._nEnd)
{
h._sType="range";
}
else{
h._sType="point";
}
return h;
},_hasAddrSelected:function(){
return this._moAddrSelInfo._oList.length>0;
},_hideContextMenu:function(){
this._moContextMenu.style.left="-200px";
},_initlize:function(a){
var d=this,b=d.constructor;
try{
d._moConst=b._CONST;
d._moTemplate=b._TEMPLATE;
d._msId=a.id;
d._moWindow=a.win;
d._moContainer=a.dom.container;
d._mnMaxHeight=a.maxHeight;
d._mnMaxItemView=a.maxItemView||15,d._mnMinWidth=a.minWidth||220,d._mnWidth=a.width||"auto",d._moStyle=getTop().extend({text:"addr_text",normal:"addr_base addr_normal",over:"addr_base addr_over attbg",select:"addr_base addr_select fn_list",error:"addr_base addr_error",errover:"addr_base addr_errover attbg",errsel:"addr_base addr_errsel fn_list",dmerror:"addr_base addr_domain_err",dmerrover:"addr_base addr_domain_errover attbg",dmerrsel:"addr_base addr_domain_errsel fn_list",move:"addr_move",mover:"addr_mover"},a.style);
d._msDispMode=a.dispMode;
d._msSplitChar=a.splitChar||";";
d._msDefaultText=a.defaultText||d._moContainer.getAttribute("defaultText");
d._mbIsEnableTip=a.isEnableTip!==false;
d._mbIsFocusAC=a.isFocusAC===true;
d._mfFilterFunc=a.filterFunc;
d._mbIsDisabled=false;
d._moAddrList=[];
d._moAddrMap={};
d._moErrorDomainMap={};
d._mbSimple=a.bSimple;
d._mbShowMemberCtrlIcon=a.bShowMemberCtrlIcon;
d._mbInContact=a.inContact;
d._moAddrSelInfo={_oList:[],_oData:{},_nCursorPos:null};
d._mEvent={_onfocus:a.onfocus,_onblur:a.onblur,_onchange:a.onchange,_onkeydown:a.onkeydown,_onNotify:a.onNotify};
b._set(d);
}
catch(c)
{
throw new Error("QMAddrInput constructor:"+c.message);
}
return d;
},_insertTextBefore:function(a){
var c=this,b=(c._moAddrMap[a]||{})._oDom||c._moContainer.lastChild;
if(c._moTextContainer.nextSibling!=b)
{
c._moContainer.insertBefore(c._moTextContainer,b);
}
return c;
},_bIsCollapsed:function(){
var b=this,a=b._mbIsTextFocus?b._moTextCtrl:b._moSelectCtrl;
return !b._isFocus()?true:(b._moWindow.getSelection?a.selectionStart==a.selectionEnd:b._moWindow.document.selection.type=="None");
},_isFocus:function(){
return this._mbIsTextFocus||this._hasAddrSelected();
},_isFocusLock:function(){
return this._mbIsFocusLock;
},_isItemSelected:function(a){
return this._moAddrSelInfo._oData[typeof a=="string"?a:a.getAttribute("addr")];
},_loadInputRange:function(){
if(this._moInputRange)
{
if(window.getSelection)
{
}
else{
this._moInputRange.select();
}
this._moInputRange=null;
}
},_lockFocus:function(){
this._mbIsFocusLock=true;
return this;
},_moveItem:function(b,a){
var d=this._moAddrMap,f=d[b];
if(f)
{
var c=this._moAddrList,e=d[a];
c.splice(this._getAddrPos(b),1);
if(e)
{
this._moContainer.insertBefore(f._oDom,e._oDom);
c.splice(this._getAddrPos(a),0,b);
}
else{
this._moContainer.insertBefore(f._oDom,this._moTextContainer);
c.push(b);
}
}
},_saveInputRange:function(){
(this._hasAddrSelected()?this._moSelectCtrl:this._moTextCtrl).focus();
if(window.getSelection)
{
var a=this._moWindow.getSelection();
this._moInputRange=a&&a.rangeCount?a.getRangeAt(0):null;
}
else{
this._moInputRange=this._moWindow.document.selection.createRange();
}
},_selectItem:function(a,b){
var h=this._moAddrMap[a],l=this._moAddrSelInfo;
if(h)
{
if(b=="shift")
{
var j=this._moAddrList,k=this._moAddrMap,c=l._nCursorPos,d=this._getAddrPos(a),f;
if(typeof c!="number")
{
f=this._getAddrPos(l._oList[0]);
if(f==-1)
{
c=l._nCursorPos=this._getTextPos();
}
}
if(typeof c=="number")
{
f=c+(c<d?1:0);
}
this._cancelSelectItem(false,true);
var g=f>d?-1:1,m=l._oList,r=l._oData;
for(var s=f,d=d+g;s!=d;s+=g)
{
var q=j[s];
m.push(q);
this._setAddrItemClass(l._oData[q]=k[q]._oDom,"select");
}
}
else{
if(b!="add")
{
this._cancelSelectItem();
}
if(this._isItemSelected(a))
{
this._cancelSelectItem(a);
}
else{
var m=l._oList;
this._addTextCtrlValue();
m.push(a);
this._setAddrItemClass(l._oData[a]=h._oDom,"select");
}
}
}
if(this._hasAddrSelected())
{
var o=[],j=this._moAddrList,k=this._moAddrMap,r=l._oData;
for(var s=0,e=this.length();s<e;s++)
{
var q=j[s];
if(r[q])
{
var n=k[q];
o.push(n._sNick?['"',getTop().encodeNick(n._sNick),'"<',q,'>'].join(""):q);
}
}
o.push("");
var p=this._moSelectCtrl;
p.value=o.join(";");
p.focus();
p.select();
}
return this;
},_selectAllItem:function(){
var b=this,a=b._moAddrList;
b._addTextCtrlValue();
b._selectItem(a[0]);
b._selectItem(a[a.length-1],"shift");
},_setAutoComplete:function(){
var a=this,b=getTop();
a._mbIsEnableTip&&a.constructor._isShowTip();
a._moAutoComplete=new b.QMAutoComplete({oInput:a._moTextCtrl,oPosObj:a._moContainer,nMaxItemView:a._mnMaxItemView,nMinWidth:a._mnMinWidth,nWidth:a._mnWidth,ongetdata:function(c){
return a._getAutoCompleteData();
},onclick:function(d,c){
if(!c)
{
var e=b.getEventTarget(d);
if(e&&e.getAttribute("opt")=="hidetip")
{
this.setHeader("");
a.constructor._hideTip();
}
}
},onselect:function(c){
var k=getTop(),g=c.oAddress,j=k.T('"$nick$"<$addr$>;'),l=[];
function d(m)
{
return j.replace({nick:k.encodeNick(k.htmlDecode(m.name)),addr:k.htmlDecode(m.email)});
}
if(g.nShortcutGroupId)
{
var h=k.QMAddress.getGroup(g.nShortcutGroupId);
for(var i=h.addressesId,e=0,f=i.length;e<f;e++)
{
_oAddr=k.QMAddress.getAddress(i[e]);
if(!_oAddr.nShortcutGroupId)
{
l.push(d(_oAddr));
}
}
}
else{
l.push(d(g));
}
if(c.isAptitude)
{
k.ossLog("realtime","all","stat=custom&type=addressaptitude&info=select");
}
a._doAutoCompleteSelect(l.join(""),g.nid);
},ontouchstart:function(){
a._lockFocus();
}});
return a;
},_setAddrItemEvent:function(a,b){
this._addEventForDom(a,{"click":this._doAddrItemClick,"dblclick":this._doAddrItemDblclick,"mouseover":this._doAddrItemMouseOver,"mouseout":this._doAddrItemMouseOut},b);
var d=a.childNodes,e=this._mEvent,f;
for(var g=0,c=d.length;g<c;g++)
{
f=d[g];
f.nodeName.toLowerCase()=="a"&&f.getAttribute("name")=="del"&&this._addEventForDom(f,{"click":this._delSpanClick})&&(g=c);
}
e._onNotify&&e._onNotify();
},_setAddrItemClass:function(a,b){
var d=this,e="",f={move:"select",mover:"select"}[b],c=d._moAddrMap[a.getAttribute("addr")];
if(!f)
{
f=b||"normal";
}
else{
e=d._moStyle[b];
}
if(c&&!c._bIsValid)
{
f={normal:"error",over:"errover",select:"errsel"}[f];
}
else if(c&&d._moErrorDomainMap[c._sDomain])
{
f={normal:"dmerror",over:"dmerrover",select:"dmerrsel"}[f];
}
getTop().setClass(a,[d._moStyle[f],e].join(" "));
return d;
},_emptyFuntion:function(){
return;
},_setEvent:function(a){
var c=this;
var b=c._mbInContact;
c._addEventForDom(c._moContainer,{"mousedown":c._doContainerMouseDown,"selectstart":c._doContainerSelectStart,"contextmenu":b?c._emptyFuntion:c._doContainerContextMenu});
var d={"focus":c._doTextFocus,"blur":c._doTextBlur,"keydown":c._doTextKeyDown,"keyup":c._doTextKeyUp,"paste":b?c._emptyFuntion:c._doTextPaste};
if(getTop().gbIsTT)
{
d["keypress"]=c._doTextKeyPressForTT;
}
c._addEventForDom(c._moTextCtrl,d);
c._addEventForDom(c._moSelectCtrl,{"focus":c._doSelectFocus,"blur":c._doSelectCancel,"keydown":c._doSelectKeyDown,"keyup":c._doSelectKeyUp,"paste":b?c._emptyFuntion:c._doSelectPaste,"cut":c._doSelectCut});
c._addEventForDom(c._moContextMenu,{"click":c._doContextMenuClick,"contextmenu":c._stopEvent});
c._addEventForDom(c._moDefaultText,{"click":c.focus});
c._addEventForDom(c._moMemberCtrl,{"click":c.showMemDlg});
return c;
},showMemDlg:function(){
var c=this;
var b=getTop().TE(['<ul class="treeview treeview_v2">','$@$if($addrs.length$==0)$@$','<li style="padding:50px 0;text-align:center;background-color:#fff;">','<span class="node_txt">\u6682\u65F6\u6CA1\u6709\u8054\u7CFB\u4EBA</span>','</li>','$@$endif$@$','$@$for($addrs$)$@$','$@$if($email$)$@$','<li ck="choose" class="tree_node open unselect" title="$email$" nid="$nid$">','<div class="node_content">','<span class="node_icon">','$@$if($kind$=="emailgroup")$@$','<i class="u_avatar i_group"></i>','$@$else$@$','<i class="u_avatar i_man"></i>','$@$endif$@$','</span>','<span class="node_txt">$@$eval getTop().htmlEncode($name$)$@$</span>','<span class="node_select_toggle"></span>','</div>','</li>','$@$endif$@$','$@$endfor$@$','</ul>','']),a=getTop().TE(['<div class="addr_popup">','<div class="tk_people">','<div class="edit_member member_input s_blur">','<div id="addr" style="_width:100%;_height:30px;"></div>','</div>','</div>','<div  class="opp_addr">','<div class="member_con" style="height:275px">','<div class="floder_nav">','<ul id="tab_nav" class="f_navobj">','<li id="nav_personal" class="folder_nav_first fn" ck="changeTab" tabfor="tab_personal" title="\u4E2A\u4EBA\u5730\u5740\u672C"><span>\u4E2A\u4EBA</span></li>','<li id="nav_biz" class="folder_nav_item " ck="changeTab" tabfor="tab_biz" title="\u4F01\u4E1A\u5730\u5740\u672C"><span>\u4F01\u4E1A</span></li>','<li id="nav_client" class="folder_nav_item " ck="changeTab" tabfor="tab_client" title="\u516C\u5171\u5730\u5740\u672C"><span>\u516C\u5171</span></li>','<li id="nav_group" class="folder_nav_last " ck="changeTab" tabfor="tab_group" title="\u90AE\u4EF6\u7FA4\u7EC4"><span>\u90AE\u4EF6\u7FA4\u7EC4</span></li>','</ul>','</div>','<div id="tab_personal" class="form_tree tab_personal">','</div>','<div id="tab_biz" class="form_tree" style="display:none">','</div>','<div id="tab_client" class="form_tree" style="display:none">','</div>','<div id="tab_group" class="form_tree" style="display:none">','</div>','<div id="" class="form_tree" style="display:none">','</div>','</div>','</div>','</div>']);
var d={"to":"\u6536\u4EF6\u4EBA","bcc":"\u5BC6\u9001","cc":"\u6284\u9001","sc":"\u5206\u522B\u53D1\u9001"};
getTop().confirmBox({id:"addNewContactToInput",title:"\u6DFB\u52A0"+d[c._msId],width:484,sType:"custom",msg:a,onreturn:function(e){
var f=this;
if(e)
{
getTop().E(f._oAddrInput.get("json"),function(g){
c.add(g.format,false);
});
}
},onload:function(){
var e=this;
getTop().loadJsFile(getTop().getPath("js")+getTop().getFullResSuffix("qmmemtree.js"),true,getTop().document,function(){
var j=getTop().QMAddress,g;
var f=function(n,m){
if(n=='del')
{
l.delSelectItem(m);
}
};
g=new QMAddrInput({bSimple:true,id:"new"+c._msId,win:getTop(),dom:{container:e.S("addr")},onchange:f});
e._oAddrInput=g;
var l=(new (getTop().QMMemTree)()).init({oRoot:j.getPersonalTree(),oDom:e.S("tab_personal"),fGetParty:function(n,m){
m(j.getAddress(n));
},onselect:function(m){
var n=j.getAddress(m);
if(n.bParty)
{
getTop().E(n.children,function(o){
if(!o.bParty&&o.email)
{
g.add('"'+o.name+'"<'+o.email+'>',false,undefined,undefined,true);
}
});
}
else{
g.add('"'+n.name+'"<'+n.email+'>',false,undefined,undefined,true);
}
},onunselect:function(m){
if(m=='')
{
return;
}
var n=j.getAddress(m);
if(n.bParty)
{
getTop().E(n.children,function(o){
if(!o.bParty&&o.email)
{
g.del(o.email);
}
});
}
else{
g.del(n.email);
}
}});
if(j.isShared("client"))
{
var h=j.getClientTree();
if(h.children.length==0)
{
e.S("tab_client").innerHTML=b.replace({addrs:j.getGroup("client")});
}
else{
(new (getTop().QMMemTree)()).init({oRoot:j.getClientTree(),oDom:e.S("tab_client"),fGetParty:function(n,m){
m(j.getAddress(n));
},onselect:function(m){
var n=j.getAddress(m);
if(n.bParty)
{
getTop().E(n.children,function(o){
if(!o.bParty&&o.email)
{
g.add('"'+o.name+'"<'+o.email+'>',false,undefined,undefined,true);
}
});
}
else{
g.add('"'+n.name+'"<'+n.email+'>',false,undefined,undefined,true);
}
},onunselect:function(m){
if(m=='')
{
return;
}
var n=j.getAddress(m);
if(n.bParty)
{
getTop().E(n.children,function(o){
if(!o.bParty&&o.email)
{
g.del(o.email);
}
});
}
else{
g.del(n.email);
}
}});
}
}
else{
getTop().show(e.S("nav_client"),false);
}
if(j.isShared("emailgroup"))
{
e.S("tab_group").innerHTML=b.replace({addrs:j.getGroup("emailgroup")});
}
else{
getTop().show(e.S("nav_group"),false);
}
if(j.isShared("biz"))
{
j.getPartyTree(function(m){
(new (getTop().QMMemTree)()).init({oRoot:m,oDom:e.S("tab_biz"),fGetParty:function(o,n){
j.getFullParty(o,n);
if(j.isBizRoot(o))
{
j.getAddressFromRemote(o,function(q){
q=q||[];
var p=getTop().CN(o)[0];
if(p)
{
if(q.length>0&&q.length<=200)
{
getTop().show(p,true);
}
else{
getTop().removeSelf(p);
}
}
});
}
},onselect:function(n){
if(n=='')
{
return;
}
var o=j.getAddress(n);
if(o.bParty)
{
if(o.bParty)
{
j.getAddressFromRemote(n,function(p){
p=p||[];
getTop().E(p,function(q){
g.add('"'+q.name+'"<'+q.email+'>',false,undefined,undefined,true);
});
});
}
else{
g.add('"'+o.name+'"<'+o.email+'>',false,undefined,undefined,true);
}
}
else{
g.add('"'+o.name+'"<'+o.email+'>',false,undefined,undefined,true);
}
},onunselect:function(n){
if(n=='')
{
return;
}
var o=j.getAddress(n);
if(o.bParty)
{
j.getAddressFromRemote(n,function(p){
p=p||[];
getTop().E(p,function(q){
g.del(q.email);
});
});
}
else{
g.del(o.email);
}
}});
});
}
else{
getTop().show(e.S("nav_biz"),false);
}
var k=({click:{choose:{bPropagable:false},changeTab:{bPropagable:false}}});
var i=({choose:function(m,n){
var p=n.getAttribute("nid"),o=j.getAddress(p);
if(getTop().hasClass(n,'unselect'))
{
getTop().addClass(n,'selected');
getTop().rmClass(n,'unselect');
g.add('"'+o.name+'"<'+o.email+'>',false,undefined,undefined,true);
}
else{
getTop().addClass(n,'unselect');
getTop().rmClass(n,'selected');
g.del(o.email);
}
},changeTab:function(m,n){
var o=n.getAttribute("tabfor");
getTop().show(e.S("tab_personal"),false);
getTop().show(e.S("tab_client"),false);
getTop().show(e.S("tab_biz"),false);
getTop().show(e.S("tab_group"),false);
getTop().show(e.S(o),true);
getTop().rmClass(e.S("nav_personal"),"fn");
getTop().rmClass(e.S("nav_client"),"fn");
getTop().rmClass(e.S("nav_biz"),"fn");
getTop().rmClass(e.S("nav_group"),"fn");
getTop().addClass(n,"fn");
}});
getTop().liveEvent(e.getPanelDom(),{rule:function(){
return k;
},events:function(){
return i;
}});
});
}});
},_setTextCursorRange:function(b,a){
var h=this._moTextCtrl,f=h.value.length;
function c(i)
{
if(!i)
{
i=0;
}
if(i<0)
{
i=f+i+1;
}
if(i<0)
{
return 0;
}
if(i>f)
{
return f;
}
return i;
}
var e=c(b),d=c(a);
if(h.createTextRange)
{
var g=h.createTextRange();
g.moveStart("character",e);
g.collapse();
g.moveEnd("character",d-e);
g.select();
this._focusWithLock();
}
else{
this._focusWithLock();
h.selectionStart=e;
h.selectionEnd=d;
}
return this;
},_setup:function(a){
var h=this,d=h._moContainer,b=a.tabIndex,g,e,j,k,i;
d.unselectable="on";
d.style.cursor="text";
d.innerHTML=h._moTemplate._INPUT.replace({css:h._moStyle.text,width:h._moConst._nBasicWidth,defaulttext:h._msDefaultText});
g=h._moMemberCtrl=d.firstChild;
e=h._moDefaultText=g.nextSibling;
j=h._moTextContainer=e.nextSibling,k=h._moTextCtrl=j.firstChild,i=h._moStrLenCalcer=j.lastChild;
h._moSelectCtrl=d.lastChild.firstChild;
if(!h._mbSimple)
{
getTop().waitFor(function(){
return getTop().QMAddress&&getTop().QMAddress.isInit();
},function(l){
if(l)
{
if(h._mbShowMemberCtrlIcon==false)
{
}
else{
g.style.display="";
}
}
else if(getTop().QMAddress)
{
getTop().QMAddress.initAddress();
}
},100,30*1000);
}
h._mnTabIndex=typeof b=="number"?b:0;
k.tabIndex=b;
h._syncFontStyle(i,k);
var f=[],c=h._moWindow.document.body;
getTop().E(h._moConst._oMenuItems,function(l){
var m=l.split("|");
f.push((m[0]=="seperater"?h._moTemplate._CONTEXTMENU_SEP:h._moTemplate._CONTEXTMENU_ITEM.replace({operate:m[0],name:m[1],shortcut:getTop().T(m[2]||"").replace(h._getCtrlKeyName())})));
});
getTop().insertHTML(c,"afterBegin",h._moTemplate._CONTEXTMENU.replace({items:f.join(""),width:getTop().gbIsMac?160:130}));
h._moContextMenu=c.firstChild;
return h;
},_showAutoComplete:function(){
var a=this;
a._moAutoComplete.show(a._getAutoCompleteData());
return a;
},_showContextMenu:function(a,b){
var h=this._moWindow.document.body,d=h.clientWidth,c=h.clientHeight,i=this._moContextMenu,g=i.clientWidth,f=i.clientHeight;
i.style.left=h.scrollLeft+(a+g>d?a-g:a)+"px";
i.style.top=h.scrollTop+(b+f>c?b-f:b)+"px";
var e=this._bIsCollapsed();
getTop().E(getTop().GelTags("div",i)[0].childNodes,function(j){
switch(j.getAttribute("opt"))
{case "cut":
case "copy":
case "delete":
getTop().setClass(j,e?"menu_item_nofun":"menu_item");
break;
}
});
},_syncFontStyle:function(a,b){
getTop().E("fontFamily,fontSize,fontWeight,lineHeight,wordSpacing".split(","),function(c){
a.style[c]=getTop().getStyle(b,c);
});
},_unlockFocus:function(){
this._mbIsFocusLock=false;
return this;
},_updateErrorDomainDisplay:function(){
var c=this,a=c._moAddrMap,b=c._moErrorDomainMap;
getTop().E(c._moAddrList,function(d){
var e=a[d],g=b[e._sDomain]?c._moTemplate._ADDRITEM.replace({},"errdomainmsg"):(e._bIsValid?d:c._moTemplate._ADDRITEM.replace({},"errmsg")),f=e._oDom;
if(f.title!=g)
{
f.title=g;
c._setAddrItemClass(f,"normal");
}
});
return c;
},_readyToCalcAddrItemDispInfo:function(){
var e=this._moAddrList,f=this._moAddrMap,l,n,a,o,c,d,b,m,i,k,h,g,j;
if(this._moAddrItemCalcInfo)
{
delete this._moAddrItemCalcInfo;
}
if(e.length!=0)
{
l=f[e[0]]._oDom;
n=f[e[e.length-1]]._oDom;
a=n.nextSibling;
o=l.offsetParent;
c=getTop().calcPos(o);
d=c[0];
b=c[3];
m=l.offsetHeight;
}
i=getTop().calcPos(this._moContainer);
k=i[0];
h=i[3];
g=i[2];
j=i[1];
this._moAddrItemCalcInfo={_oFirstItem:l,_oLastItem:n,_nEndItem:a,_nOffsetTop:d,_nOffsetLeft:b,_oItemHeight:m,_oContainerTop:k,_oContainerLeft:h,_oContainerBottom:g,_oContainerRight:j};
},_isInContainer:function(a){
var d=this._moAddrItemCalcInfo,b=a.clientX,c=a.clientY;
return b>=d._oContainerLeft&&b<=d._oContainerRight&&c>=d._oContainerTop&&c<=d._oContainerBottom;
},_getNearestAddrItemInfo:function(a,b){
var c=b=="limit",t={};
if(!c||this._isInContainer(a))
{
var v=this._getAddrItemRowsList(),p=v.length;
if(p>0)
{
var q=this._moAddrItemCalcInfo,l=a.clientX-q._nOffsetLeft,m=a.clientY-q._nOffsetTop,n=this._getPointRow(a.clientY),u,o,d,e,s,k,j,g,h,r,f;
if(n<0)
{
n=0;
}
else if(n>=p)
{
n=p-1;
}
u=v[n]._oRowList;
o=u.length;
for(var w=0,j=9999999;w<o;w++)
{
r=u[w];
d=l-r.offsetLeft;
e=r.offsetWidth-d;
f=Math.min(Math.abs(d),Math.abs(e));
if(f<j)
{
s=r;
j=f;
g=d;
h=e;
}
else{
break;
}
}
k=s.offsetTop;
t._oItem=s;
t._nRow=n;
t._nXin=g>0&&h>0;
t._nYin=m>=k&&m<=k+q._oItemHeight;
t._sAlign=g<h?"left":"right";
}
}
return t;
},_getAddrItemRowsList:function(){
var d=this._moAddrItemCalcInfo,g=d._oRowsList;
if(g)
{
return g;
}
var e=d._oFirstItem,b=d._nEndItem,f,c,a;
d._oRowsList=g=[];
for(;e&&e!=b;e=e.nextSibling)
{
if(e.getAttribute("addr"))
{
a=e.offsetTop;
if(c!=a)
{
c=a;
f=[e];
g.push({_nOffsetTop:c,_oRowList:f});
}
else{
f.push(e);
}
}
}
return g;
},_getPointRow:function(a){
var d=this._moAddrItemCalcInfo,b=d._oContainerTop,c=this._getAddrItemRowsList().length;
return !c?0:Math.floor((a-b)*c/(d._oContainerBottom-b));
},_addEventForDom:function(b,a,c){
var d=this;
for(var e in a)
{
(function(){
var f=a[e];
getTop().addEvent(b,e,function(){
f.call(d,arguments[0],b,c);
});
})();
}
return d;
},_doContainerMouseDown:function(b,a){
var d=this,e=b.srcElement||b.target;
if(window.getSelection&&b.button==0||!window.getSelection&&b.button==1)
{
var g=e.tagName=="SPAN"||e.tagName=="B"?e.parentNode:e,f=g.getAttribute("addr"),c=e!=d._moTextCtrl;
if(e==a)
{
getTop().now()-(d._mnContainerClickTime||0)<300?d._selectAllItem():d._doContainerMoveSelection(b,a);
d._mnContainerClickTime=getTop().now();
}
if(f)
{
if(b.ctrlKey||b.metaKey)
{
d._selectItem(f,"add");
}
else if(b.shiftKey)
{
d._selectItem(f,"shift");
}
else{
if(!d._isItemSelected(f))
{
var h=a.parentNode.scrollTop;
d._selectItem(f);
a.parentNode.scrollTop=h;
}
}
}
else if(c||d._moTextCtrl.value.length==0)
{
d._doContainerTrySelect(b);
}
if(c)
{
getTop().preventDefault(b);
}
if(c||d._moTextCtrl.value.length==0)
{
d._moAutoComplete.close();
}
d._hideContextMenu();
}
else if(b.button==2||(getTop().gbIsIE&&b.button==0))
{
if(e!=d._moTextCtrl)
{
var g=e.tagName=="SPAN"||e.tagName=="B"?e.parentNode:e,f=g.getAttribute("addr");
if(f&&!d._isItemSelected(f))
{
if(getTop().gbIsIE)
{
this._mbIsTextFocus=false;
}
d._selectItem(f);
}
d._stopEvent(b);
d._saveInputRange();
}
}
else if(e!=d._moTextCtrl)
{
d._stopEvent(b);
}
},_doContainerSelectStart:function(a){
var b=a.srcElement||a.target;
if(b!=this._moTextCtrl&&b!=this._moSelectCtrl)
{
getTop().preventDefault(a);
}
},_doContainerDragStart:function(b,a,c){
var k=this,l=this._moWindow,f=l.document,g=l.captureEvents?l:f.body,d=b.clientX,e=b.clientY,h=f.createElement("div"),j=f.createElement("div");
h.className="addr_cursor";
h.innerHTML='&nbsp;';
j.style.cssText='position:absolute;z-index:99999;top:-999px;left:-999px;';
j.innerHTML=this._moTemplate._MOVER;
var i=this._moContainerMouseDownInfo={_bIsInitlize:false,_oInsertCursor:h,_oMover:j,_oContainer:a,_fDoMouseUp:function(m){
if(k._moContainerMouseDownInfo)
{
k._moContainerMouseDownInfo=null;
k._releaseCapture();
getTop().removeEvent(g,"mouseup",i._fDoMouseUp);
getTop().removeEvent(g,"mousemove",i._fDoMouseMove);
try{
if(i._bIsInitlize)
{
var t=k._moSelectCtrl.value,p=i._oObjectList[i._nInObjIdx]._oInstance,o=p._moContainer,s=[],r=k._moAddrList,q;
if(h.parentNode==o)
{
o.style.backgroundColor="#fff";
getTop().E(r,function(u){
if(k._isItemSelected(u))
{
s.push(u);
}
});
k._deleteSelectItems(true,true);
o.insertBefore(p._moTextContainer,h);
p.add(t,true);
getTop().E(s,function(u){
p._selectItem(u,"add");
});
if(k==p)
{
getTop().callBack.call(k,k._mEvent._onchange,["move"]);
}
else{
getTop().callBack.call(k,k._mEvent._onchange,["del"]);
getTop().callBack.call(p,p._mEvent._onchange,["add"]);
}
}
}
else{
k._selectItem(c);
}
}
catch(n)
{
doPageError(n.message,"/js/qmaddrinput.js","_fDoMouseUp");
}
getTop().removeSelf(h);
getTop().removeSelf(j);
delete j;
delete h;
delete i;
}
k._stopEvent(m);
},_fDoMouseMove:function(m){
if(!i._bIsInitlize&&Math.max(Math.abs(d-m.clientX),Math.abs(e-m.clientY))>8)
{
var p=[],n=f.body;
getTop().E(QMAddrInput._get(l),function(r,q){
var s=getTop().calcPos(r._moContainer);
if(s[2])
{
if(r==k)
{
i._nInObjIdx=q;
}
p[q]={_oInstance:r,_nPos:s};
r._readyToCalcAddrItemDispInfo();
}
});
n.insertBefore(j,n.firstChild);
if(getTop().gsAgent&&getTop().gsAgent.indexOf("mac")!=-1)
{
var o=j.firstChild.style;
o.left=parseInt(o.left)-2;
o.top=parseInt(o.top)-4;
}
i._bIsInitlize=true;
i._oObjectList=p;
}
k._doContainerDragMove(m);
k._stopEvent(m);
}};
this._setCapture();
getTop().addEvent(g,"mouseup",i._fDoMouseUp);
getTop().addEvent(g,"mousemove",i._fDoMouseMove);
},_doContainerDragMove:function(a){
var g=this._moContainerMouseDownInfo;
if(g&&g._bIsInitlize)
{
var f=g._oInsertCursor,h=g._oMover,n=g._oObjectList,b=g._nInObjIdx,e=n[b]._oInstance._moContainer,l;
h.style.left=a.clientX-5+"px";
h.style.top=a.clientY-5+"px";
for(var o=n.length-1;o>=0;o--)
{
var m=n[o];
if(m&&m._oInstance&&m._oInstance._isInContainer(a))
{
l=m._oInstance;
break;
}
}
if(l)
{
if(b!=o)
{
g._nInObjIdx=o;
}
var c=l._moAddrItemCalcInfo,d=l._moContainer,j=l._getNearestAddrItemInfo(a),k=j._oItem;
if(k&&j._sAlign=="right")
{
k=k.nextSibling;
}
if(d!=e)
{
e.style.backgroundColor="#fff";
}
if(g._oContainer!=d)
{
d.style.backgroundColor="#f9f2b3";
}
d.insertBefore(f,k||d.firstChild);
}
else if(f.parentNode==e)
{
getTop().removeSelf(f);
e.style.backgroundColor="#fff";
}
}
},_doContainerContextMenu:function(a){
var b=a.srcElement||a.target;
if(b!=this._moTextCtrl)
{
this._stopEvent(a);
this._loadInputRange();
this._showContextMenu(a.clientX,a.clientY);
this._moAutoComplete.close();
}
},_doContainerMoveSelection:function(b,a){
var n=a.childNodes,q=n[1].offsetParent,l=getTop().calcPos(q),k=l[3],m=l[0],g=b.clientX,h=b.clientY,c=false;
for(var s=0,j=n.length-1;s<j;s++)
{
var o=n[s],p=m+o.offsetTop,e=g<=k+o.offsetLeft+2,f=h<=p,d=h<=p+o.offsetHeight;
if((e&&d)||(!e&&f))
{
var r=o.getAttribute("addr");
if(!r)
{
this.focus("start");
}
else if(o.previousSibling==this._moTextContainer)
{
this.focus("end");
}
else{
this._addTextCtrlValue();
this._insertTextBefore(r);
this.focus("start");
}
c=true;
break;
}
}
if(!c)
{
if(o==this._moTextContainer)
{
this.focus("end");
}
else{
this._addTextCtrlValue();
this._insertTextBefore();
this.focus("start");
}
}
},_doContainerTrySelect:function(a){
var c=this._moAddrList,b=c.length;
if(b==0||this._moTextCtrl.value.length!=0)
{
return;
}
var g=this._moWindow,d=g.captureEvents?g:g.document.body,f=this,h=a.clientX,i=a.clientY;
var e=this._moContainerMouseDownInfo={_bIsInitlize:true,_fDoMouseUp:function(j){
if(f._moContainerMouseDownInfo)
{
f._moContainerMouseDownInfo=null;
f._releaseCapture();
getTop().removeEvent(d,"mouseup",e._fDoMouseUp);
getTop().removeEvent(d,"mousemove",e._fDoMouseMove);
delete e;
}
f._stopEvent(j);
},_fDoMouseMove:function(j){
if(f._moContainerMouseDownInfo)
{
var k=j.clientX,l=j.clientY,r,t;
if(Math.abs(k-h)>2||Math.abs(l-i)>5)
{
var o=f._moAddrItemCalcInfo,p=f._getNearestAddrItemInfo(j),q=p._oItem,m=p._nRow;
if(p._nXin)
{
r=q;
}
else{
var n=f._getPointRow(i),s;
if(m==n)
{
s=k<h?"left":"right";
}
else{
s=l<i?"left":"right";
}
if(p._sAlign==s)
{
if(q&&q[s=="left"?"previousSibling":"nextSibling"]!=f._moTextContainer)
{
r=q;
}
}
else{
r=q&&q[s=="right"?"previousSibling":"nextSibling"];
}
}
}
t=r&&r.getAttribute("addr");
if(t)
{
f._selectItem(t,"shift");
}
else if(f._cancelSelectItem())
{
f.focus("start");
}
}
f._stopEvent(j);
}};
this._readyToCalcAddrItemDispInfo();
this._setCapture();
getTop().addEvent(d,"mouseup",e._fDoMouseUp);
getTop().addEvent(d,"mousemove",e._fDoMouseMove);
},_doTextFocus:function(a){
var b=this;
b._mbIsTextFocus=true;
getTop().show(b._moDefaultText,false);
setTimeout(function(){
b._mbIsFocusAC&&!b.length()&&b._showAutoComplete();
});
getTop().callBack.call(b,b._mEvent._onfocus,[a]);
},_doTextBlur:function(a){
var b=this;
if(!b._isFocusLock())
{
b._mbIsTextFocus&&b._hideContextMenu();
b._mbIsTextFocus=false;
b._addTextCtrlValue();
!b.length()&&getTop().show(b._moDefaultText,true);
getTop().callBack.call(b,b._mEvent._onblur,[a]);
}
},_doTextKeyDown:function(_aoEvent){
_aoEvent=_aoEvent||window.event;
var target=_aoEvent.srcElement||_aoEvent.target;
var father=target.parentNode.parentNode.parentNode.firstChild;
if(typeof (eval(father.getAttribute))=="function"||typeof (eval(father.getAttribute))=="object")
{
var _sCheckInput=father.getAttribute("id");
if(_sCheckInput.substring(0,26)=="addNewContactToInputFilter"||_sCheckInput.substring(0,12)=="GrpDetailAdd")
{
var _oAddr=getTop().QMAddress._moAddrBook.personal;
var _oTemp=[];
for(var i=0;i<_oAddr.length;i++)
{
var _sName=_oAddr[i].email;
if(_sName)
{
if(_sName.substring(0,2)=="g_"&&_sName.indexOf('@')==-1)
{
}
else{
_oTemp.push(_oAddr[i]);
}
}
else if(_oAddr[i].kind!="personal")
{
_oTemp.push(_oAddr[i]);
}
}
getTop().QMAddress._moAddrBook.personal=_oTemp;
}
}
this._adjustTextWidth(_aoEvent.ctrlKey?0:_aoEvent.keyCode);
switch(_aoEvent.keyCode)
{case 59:
case 186:
case 188:
if(_aoEvent.shiftKey)
{
break;
}
case 32:
if(this._addTextCtrlValue())
{
this._stopEvent(_aoEvent);
}
break;
case 8:
var _oTextSelState=this._getTextSelectionState();
if(_oTextSelState._sType=="point"&&_oTextSelState._nStart==0&&this._moTextContainer.previousSibling)
{
var addrInfo=this._deleteItem(this._moTextContainer.previousSibling);
this._stopEvent(_aoEvent);
getTop().callBack.call(this,this._mEvent._onchange,["del",addrInfo]);
}
break;
case 46:
var _oTextSelState=this._getTextSelectionState();
if(_oTextSelState._sType=="point"&&_oTextSelState._nEnd==_oTextSelState._nLength&&this._moTextContainer.nextSibling)
{
this._deleteItem(this._moTextContainer.nextSibling);
this._stopEvent(_aoEvent);
getTop().callBack.call(this,this._mEvent._onchange,["del",addrInfo]);
}
break;
case 37:
var _oTextSelState=this._getTextSelectionState(),_oPreviousItem=this._moTextContainer.previousSibling,_sPreviousAddr=_oPreviousItem&&_oPreviousItem.getAttribute("addr");
if(_oTextSelState._sType=="point"&&_oTextSelState._nStart==0&&_sPreviousAddr)
{
if(_aoEvent.shiftKey)
{
this._selectItem(_sPreviousAddr,"shift");
}
else{
this._addTextCtrlValue();
this._insertTextBefore(_sPreviousAddr);
this.focus("start");
}
this._stopEvent(_aoEvent);
}
break;
case 39:
var _oTextSelState=this._getTextSelectionState(),_oNextItem=this._moTextContainer.nextSibling,_sNextAddr=_oNextItem&&_oNextItem.getAttribute("addr");
if(_oTextSelState._sType=="point"&&_oTextSelState._nEnd==_oTextSelState._nLength&&_sNextAddr)
{
if(_aoEvent.shiftKey)
{
this._selectItem(_sNextAddr,"shift");
}
else{
this._addTextCtrlValue();
this._insertTextBefore(_oNextItem.nextSibling.getAttribute("addr"));
this.focus("start");
}
this._stopEvent(_aoEvent);
}
break;
case 36:
var _oTextSelState=this._getTextSelectionState();
if(_oTextSelState._sType=="point"&&_oTextSelState._nStart==0)
{
this._addTextCtrlValue();
if(_aoEvent.shiftKey&&this._getTextPos()!=-1)
{
this._selectItem(this._moAddrList[0],"shift");
}
else{
this._insertTextBefore(this._moAddrList[0]);
this.focus("start");
}
this._stopEvent(_aoEvent);
}
break;
case 35:
var _oTextSelState=this._getTextSelectionState();
if(_oTextSelState._sType=="point"&&_oTextSelState._nEnd==_oTextSelState._nLength)
{
this._addTextCtrlValue();
var _nAddrListLastPos=this._moAddrList.length-1;
if(_aoEvent.shiftKey&&this._getTextPos()!=_nAddrListLastPos)
{
this._selectItem(this._moAddrList[_nAddrListLastPos],"shift");
}
else{
this._insertTextBefore();
this.focus("start");
}
this._stopEvent(_aoEvent);
}
break;
case 65:
if(_aoEvent.ctrlKey||_aoEvent.metaKey)
{
var _oTextSelState=this._getTextSelectionState(),_oAddrList=this._moAddrList;
if(_oTextSelState._nStart==0&&_oTextSelState._nEnd==_oTextSelState._nLength&&_oAddrList.length!=0)
{
this._addTextCtrlValue();
this._selectItem(_oAddrList[0]);
this._selectItem(_oAddrList[_oAddrList.length-1],"shift");
this._stopEvent(_aoEvent);
}
}
break;
case 38:
case 40:
if(!this._moAutoComplete.isShow())
{
var _bIsUp=_aoEvent.keyCode==38,_oNode=this._moTextContainer[_bIsUp?"previousSibling":"nextSibling"];
_sAddr=_oNode.getAttribute("addr"),_nAddrPos=this._getAddrPos(_sAddr);
if(_nAddrPos!=-1)
{
var _oOffsetParent=_oNode.offsetParent,_nOffsetPos=getTop().calcPos(_oOffsetParent),_nParentTop=_nOffsetPos[0],_nParentLeft=_nOffsetPos[3],_oTextPos=getTop().calcPos(this._moTextContainer);
_nTextTop=_oTextPos[0],_nTextLeft=_oTextPos[3],_oClientPos=getTop().calcPos(this._moContainer),_nClientLeft=_oClientPos[3],_nClientTop=_oClientPos[0],_oAddrList=this._moAddrList,_oAddrMap=this._moAddrMap,_nDulta=9999999,_sDultaAddr=null,_oDultaItem=null;
for(var i=_nAddrPos,_oListLen=_oAddrList.length,_nLen=_bIsUp?-1:_oListLen+1,_nStep=_bIsUp?-1:1;i!=_nLen;i+=_nStep)
{
if(i==_oListLen)
{
var _sCurAddr="",_sAddrItem=_oAddrMap[_oAddrList[_oListLen-1]]._oDom,_oItemLeft=_nParentLeft+_sAddrItem.offsetLeft+_sAddrItem.offsetWidth,_oItemTop=_nParentTop+_sAddrItem.offsetTop,_nDisHeight=Math.abs(_oItemTop-_nTextTop);
}
else{
var _sCurAddr=_oAddrList[i],_sAddrItem=_oAddrMap[_sCurAddr]._oDom,_oItemLeft=_nParentLeft+_sAddrItem.offsetLeft,_oItemTop=_nParentTop+_sAddrItem.offsetTop,_nDisHeight=Math.abs(_oItemTop-_nTextTop);
}
if(Math.abs(_oItemLeft-_nClientLeft)<5&&Math.abs(_oItemTop-_nClientTop)>5)
{
var _oParentNode=_sAddrItem.previousSibling;
_nDisHeight-=_sAddrItem.offsetHeight*_nStep;
_oItemLeft=_nParentLeft+_oParentNode.offsetLeft+_oParentNode.offsetWidth;
}
if(_nDisHeight<5)
{
continue;
}
if(_nDisHeight>5+_sAddrItem.offsetHeight)
{
break;
}
var _nCurDulta=Math.abs(_oItemLeft-_nTextLeft);
if(_nCurDulta>=_nDulta)
{
break;
}
_nDulta=_nCurDulta;
_sDultaAddr=_sCurAddr;
_oDultaItem=_oDultaItem;
}
if(_sDultaAddr!=null)
{
this._addTextCtrlValue();
if(_aoEvent.shiftKey)
{
this._selectItem(_sDultaAddr,"shift");
}
else{
this._insertTextBefore(_sDultaAddr);
this.focus("start");
}
}
}
this._stopEvent(_aoEvent);
}
break;
case 13:
if(!this._moAutoComplete.isShow())
{
var _oSelf=this;
if(!_oSelf._isFocusLock())
{
_oSelf._mbIsTextFocus&&_oSelf._hideContextMenu();
_oSelf._mbIsTextFocus=false;
_oSelf._addTextCtrlValue();
!_oSelf.length()&&getTop().show(_oSelf._moDefaultText,true);
getTop().callBack.call(_oSelf,_oSelf._mEvent._onblur,[_aoEvent]);
}
}
break;
default:
getTop().callBack.call(this,this._mEvent._onkeydown,[_aoEvent]);
break;
}this._hideContextMenu();
},_doTextKeyPressForTT:function(){
this._adjustTextWidth();
},_doTextKeyUp:function(a){
{
this._adjustTextWidth();
}if(a.keyCode==186||a.keyCode==188||a.keyCode==59)
{
if(this._addTextCtrlValue())
{
this._stopEvent(a);
}
}
},_doTextPaste:function(){
var a=this;
this._moWindow.setTimeout(function(){
a._adjustTextWidth("paste");
if(getTop().gbIsFF)
{
getTop().show(a._moTextCtrl,false);
setTimeout(function(){
getTop().show(a._moTextCtrl,true);
a.focus("end");
});
}
},0);
this._moWindow.setTimeout(function(){
a._moTextCtrl.value.indexOf("@")!=-1&&a._addTextCtrlValue();
},100);
},_doSelectFocus:function(a){
this._moSelectCtrl.tabIndex=this._mnTabIndex;
getTop().callBack.call(this,this._mEvent._onfocus,[a]);
},_doSelectCancel:function(a){
this._moSelectCtrl.tabIndex=-1;
if(this._hasAddrSelected())
{
this._cancelSelectItem();
this._hideContextMenu();
getTop().callBack.call(this,this._mEvent._onblur,[a]);
}
},_doSelectKeyDown:function(a){
switch(a.keyCode)
{case 8:
case 46:
this._deleteSelectItems();
break;
case 37:
var e=this._moAddrSelInfo,f=e._oList,g=f[f.length-1];
if(a.shiftKey)
{
var d=this._getAddrPos(g)-1;
if(d>=0)
{
this._selectItem(this._moAddrList[d],"shift");
}
else if(this._getTextPos()==-1)
{
this._insertTextBefore(this._moAddrList[0]);
this.focus("start");
}
}
else{
this._cancelSelectItem();
this._insertTextBefore(g);
this.focus("start");
}
break;
case 39:
var e=this._moAddrSelInfo,f=e._oList,g=f[f.length-1];
if(a.shiftKey)
{
var c=this._getAddrPos(g)+1,b=this._moAddrList.length-1;
if(c<=b)
{
this._selectItem(this._moAddrList[c],"shift");
}
else if(this._getTextPos()==b)
{
this._insertTextBefore();
this.focus("start");
}
}
else{
var h=e._oData[g].nextSibling.getAttribute("addr");
this._cancelSelectItem();
this._insertTextBefore(h);
this.focus("start");
}
break;
case 36:
if(a.shiftKey&&this._getTextPos()!=-1)
{
this._selectItem(this._moAddrList[0],"shift");
}
else{
this._insertTextBefore(this._moAddrList[0]);
this.focus("start");
}
this._stopEvent(a);
break;
case 35:
var b=this._moAddrList.length-1;
if(a.shiftKey&&this._getTextPos()!=b)
{
this._selectItem(this._moAddrList[b],"shift");
}
else{
this._insertTextBefore();
this.focus("start");
}
this._stopEvent(a);
break;
default:
getTop().callBack.call(this,this._mEvent._onkeydown,[a]);
break;
}if(!((a.ctrlKey||a.metaKey)&&(a.keyCode==67||a.keyCode==86||a.keyCode==88))&&a.keyCode!=9)
{
this._stopEvent(a);
}
this._hideContextMenu();
},_doSelectKeyUp:function(a){
if((a.keyCode==13||a.keyCode==113))
{
var b=this._moAddrSelInfo._oList,c=b[b.length-1];
this.edit(c);
this._stopEvent(a);
}
},_doSelectPaste:function(a){
var b=this;
this._moWindow.setTimeout(function(){
b._deleteSelectItems();
b._moTextCtrl.value=b._moSelectCtrl.value;
b._adjustTextWidth("paste");
b.focus("end");
});
},_doSelectCut:function(){
var a=this;
this._moWindow.setTimeout(function(){
a._deleteSelectItems();
});
},_delSpanClick:function(b,a,c){
getTop().stopPropagation(b);
var e=this,f=b.srcElement||b.target,d=f.parentNode,g=d.getAttribute("addr");
g&&e._deleteItem(g);
},_doAddrItemClick:function(b,a,c){
var d=b.srcElement||b.target;
if(d.tagName=="IMG"&&getTop().isObjContainTarget(a,b.srcElement||b.target))
{
this._deleteItem(c);
}
},_doAddrItemDblclick:function(b,a,c){
if(this._mbInContact)
{
return;
}
if(getTop().isObjContainTarget(a,b.srcElement||b.target))
{
this.edit(c);
getTop().stopPropagation(b);
}
},_doAddrItemMouseOver:function(b,a){
if(!this._moContainerMouseDownInfo&&!this._isItemSelected(a)&&getTop().isObjContainTarget(a,b.srcElement||b.target))
{
this._setAddrItemClass(a,"over");
}
},_doAddrItemMouseOut:function(b,a){
if(!this._moContainerMouseDownInfo&&!this._isItemSelected(a)&&!getTop().isObjContainTarget(a,b.relatedTarget||b.toElement)&&getTop().isObjContainTarget(a,b.srcElement||b.target))
{
this._setAddrItemClass(a,"normal");
}
},_doContextMenuClick:function(a){
var c=a.srcElement||a.target;
if(c.className=="menu_item_nofun")
{
return;
}
var b=this;
switch(c.getAttribute("opt"))
{case "cut":
b._hideContextMenu();
if(!getTop().gbIsIE)
{
alert(getTop().T('\u60A8\u7684\u6D4F\u89C8\u5668\u5B89\u5168\u8BBE\u7F6E\u4E0D\u5141\u8BB8\u7F16\u8F91\u5668\u81EA\u52A8\u6267\u884C\u526A\u5207\u64CD\u4F5C\uFF0C\u8BF7\u4F7F\u7528\u952E\u76D8\u5FEB\u6377\u952E($cmd$+X)\u6765\u5B8C\u6210\u3002').replace(b._getCtrlKeyName()));
}
else{
b._moWindow.document.execCommand("Cut");
}
break;
case "copy":
b._hideContextMenu();
if(!getTop().gbIsIE)
{
alert(getTop().T('\u60A8\u7684\u6D4F\u89C8\u5668\u5B89\u5168\u8BBE\u7F6E\u4E0D\u5141\u8BB8\u7F16\u8F91\u5668\u81EA\u52A8\u6267\u884C\u590D\u5236\u64CD\u4F5C\uFF0C\u8BF7\u4F7F\u7528\u952E\u76D8\u5FEB\u6377\u952E($cmd$+C)\u6765\u5B8C\u6210\u3002').replace(b._getCtrlKeyName()));
}
else{
b._moWindow.document.execCommand("Copy");
}
break;
case "paste":
b._hideContextMenu();
if(!getTop().gbIsIE)
{
var d=prompt(getTop().T(['\u56E0\u4E3A\u4F60\u7684\u6D4F\u89C8\u5668\u7684\u5B89\u5168\u8BBE\u7F6E\u539F\u56E0\uFF0C\u672C\u7F16\u8F91\u5668\u4E0D\u80FD\u76F4\u63A5\u8BBF\u95EE\u4F60\u7684\u526A\u8D34\u677F\u5185\u5BB9\uFF0C\u4F60\u9700\u8981\u5728\u672C\u5BF9\u8BDD\u6846\u91CD\u65B0\u7C98\u8D34\u4E00\u6B21\u3002\n\n','\u8BF7\u4F7F\u7528\u952E\u76D8\u5FEB\u6377\u952E($cmd$+V)\u628A\u5185\u5BB9\u7C98\u8D34\u5230\u4E0B\u9762\u7684\u65B9\u6846\u91CC\uFF0C\u518D\u6309 \u786E\u5B9A\u3002']).replace(b._getCtrlKeyName()));
if(d)
{
b._moTextCtrl.value=d;
b._adjustTextWidth();
b.focus("end");
}
}
else{
b._moWindow.document.execCommand("Paste");
}
break;
case "delete":
b._hideContextMenu();
if(b._hasAddrSelected())
{
b._deleteSelectItems();
}
else{
b._moWindow.document.execCommand("delete");
}
break;
case "selectall":
b._hideContextMenu();
b._selectAllItem();
break;
}
},_doAutoCompleteSelect:function(a,b){
var c=this;
c._changeTextValue("");
c.add(a,false,b);
c.focus();
},_setCapture:function(){
var a=this._moContainer;
if(a.setCapture)
{
a.setCapture();
}
else{
this._moWindow.captureEvents&&this._moWindow.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
}
},_stopEvent:function(a){
getTop().preventDefault(a);
},_releaseCapture:function(){
var a=this._moContainer;
if(a.releaseCapture)
{
a.releaseCapture();
}
else{
this._moWindow.releaseEvents&&this._moWindow.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);
}
}};
QMAddrInput._CONST={_nCacheId:"QMAddrInput_aTGdf$#HAsGf",_nMaxNickAsiiLen:25,_nMaxAddrAsiiLen:40,_nBasicWidth:13,_nStepWidth:1,_oMenuItems:["cut|\u526A\u5207|$cmd$+X","copy|\u590D\u5236|$cmd$+C","paste|\u7C98\u8D34|$cmd$+V","delete|\u5220\u9664","seperater","selectall|\u5168\u9009|$cmd$+A"]};
QMAddrInput._get=function(a){
var c=[],b=a&&a[this._CONST._nCacheId];
for(var d in b)
{
c.push(b[d]);
}
return c;
};
QMAddrInput._set=function(a){
var c=a._moWindow,b=this._CONST._nCacheId;
if(!c[b])
{
c[b]=new c.Object();
}
c[b][a._msId]=a;
};
QMAddrInput._TEMPLATE={_INPUT:getTop().TE(['<a hidefocus class="icon_addr" title="\u70B9\u51FB\u9009\u62E9\u66F4\u591A\u8054\u7CFB\u4EBA" style="display:none"></a>','<div style="position:absolute;color:#A0A0A0;padding-top:1px;','$@$if(!$defaulttext$)$@$','display:none;','$@$endif$@$','">$defaulttext$</div>','<div class="$css$" style="float:left;border:none;overflow:hidden;width:$width$px;">','<input type="input" style="border:none;outline:none;-webkit-appearance:none;width:100%;"/>','<div id="calCC" style="width:1px;height:1px;overflow:auto;*overflow:hidden;white-space:nowrap;border:none;margin:0;padding:0;"></div>','</div>','<div style="clear:both;border:none;margin:0;padding:0;" unselectable="on">','<input type="text" style="position:absolute;border:none;padding:0;width:10px;left:-9999px;top:-9999px;" tabindex=-1 >','</div>']),_MOVER:getTop().T(['<div style="width:8px;height:8px;*width:12px;*height:12px;','font-size:1px;border:2px solid #7B7D84;position:absolute;top:18px;left:9px;"></div>','<div style="background:#fff;width:11px;height:11px;font:1px;opacity:0;filter:alpha(opacity:0);"></div>']),_CONTEXTMENU:getTop().T(['<table style="position:absolute;z-index:2999;left:-200px;top:0;"',' cellspacing="0" cellpadding="0" onmousedown="return false;" unselectable="on">','<tr><td>','<div style="border:1px solid #ACA899;width:$width$px;padding:2px;background:#fff;">','$items$','</div>','</td><td style="height:100%;filter:alpha(opacity=50);opacity:0.5;">','<div style="margin-top:4px;border-left:2px solid black;height:100%;"></div>','</td></tr>','<tr><td style="filter:alpha(opacity=50);opacity:0.5;">','<div style="margin-left:4px;border-top:2px solid black;height:2px;"></div>','</td><td style="filter:alpha(opacity=50);opacity:0.5;">','<div style="margin-left:0px;border-top:2px solid black;height:2px;"></div>','</td></tr>','</table>']),_CONTEXTMENU_ITEM:getTop().T(['<div class="menu_item" onmouseover="','if (this.className == \x27menu_item\x27)','{','this.className = \x27menu_item_high\x27;','}','" onmouseout="','if (this.className == \x27menu_item_high\x27)','{','this.className = \x27menu_item\x27;','}','" style="padding:0 20px;line-height:19px;" unselectable="on" opt="$operate$">','<div style="float:right;" unselectable="on" opt="$operate$">$shortcut$</div>','$name$','</div>']),_CONTEXTMENU_SEP:getTop().T(['<div style="font-size:1px;height:7px;overflow:hidden;" unselectable="on">','<div style="border-top:1px solid #ACA899;margin-top:3px;"></div>','</div>']),_ADDREDIT:getTop().TE(['$@$if($nick$)$@$"$nick$"<$@$endif$@$','$addr$','$@$if($nick$)$@$>$@$endif$@$','$splitchar$']),_ADDRDISP:getTop().T(['$alias$','$@$if($domain$)$@$','<span t="u" class="domain" unselectable="on" addr="$addr$">@$domain$</span>','$@$endif$@$'])};
QMAddrInput._TEMPLATE._ADDRITEM=getTop().TE(['<div t="$isshowprofile$" e="$addr$" b g="$isgroup$" n="$nick$" class="','$@$if(!$isvalid$)$@$','$css.error$','$@$else if($isdomainerr$)$@$','$css.dmerror$','$@$else$@$','$css.normal$','$@$endif$@$','" style="float:left;white-space:nowrap;" ','addr="$addr$" unselectable="on" nick="$nick$">','$@$if($nick$)$@$','<b t="u" unselectable="on" addr="$addr$">$nick$</b>','<span t="u" unselectable="on" addr="$addr$"','$@$if($dispmode$=="onlynick")$@$',' style="display:none";','$@$endif$@$','>&lt;',QMAddrInput._TEMPLATE._ADDRDISP,'&gt;</span>','$@$else$@$','<b t="u" unselectable="on" addr="$addr$">',QMAddrInput._TEMPLATE._ADDRDISP,'</b>','$@$endif$@$','<span class="semicolon">','$splitchar$','</span>','<a href="javascript:;" class="addr_del" name="del"></a>','</div>']);
QMAddrInput._isShowTip=function(){
var a=getTop(),b="IS_SHOW_TOADDR_TIP",c=a.getGlobalVarValue(b);
if(typeof c=="undefined")
{
a.setGlobalVarValue(b,"loading");
a.QMAjax.send("/cgi-bin/readtemplate",{content:a.T("sid=$sid$&t=tip&s=isshowtip&tipid=29").replace({sid:a.getSid()}),onload:function(d,e){
a.setGlobalVarValue(b,e);
}});
}
return a.gnIEVer!=7&&c=="true";
};
QMAddrInput._hideTip=function(){
getTop().ossLog("realtime","all","stat=tips&type=close&tipid=29");
getTop().setGlobalVarValue("IS_SHOW_TOADDR_TIP","false");
};
function qmaddrinput_js()
{
}
