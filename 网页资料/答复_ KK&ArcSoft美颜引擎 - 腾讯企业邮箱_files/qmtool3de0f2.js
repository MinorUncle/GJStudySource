var _gnQmToolStart=new Date().getTime(),_goClass,_goStatic;
var qmAnimation=function(a){
this._mTimerId=null;
this._mOptList=[];
this._mDefOpts={};
this._setOptions(a,true);
};
_goStatic=qmAnimation;
_goClass=_goStatic.prototype;
_goClass.play=function(a){
if(typeof a=="function")
{
if(this._mTimerId)
{
this._mOptList.push(a);
}
else{
this._play(a(),true);
}
}
else{
this.stop();
this._play(a);
}
};
_goClass.stop=function(){
var b=this;
var a=this._mOptList;
this._mOptList=[];
this._stop();
E(a,function(c){
var d=c();
if(d)
{
b._setOptions(d);
if(typeof (b._mOnComplete)=="function")
{
b._mOnComplete.call(b,b._mTo,true);
}
}
});
};
_goClass.updateStyle=function(c,a,b){
var d=this._moBakStyle||(this._moBakStyle={}),e=a.style;
if(b)
{
d[c]=e.cssText;
for(var f in b)
{
e[f]=b[f];
}
}
else{
e.cssText=d[c];
}
};
_goClass._action=function(a){
var b=true,c=now();
if(a||(c>this._mEndTime))
{
this._mDomWindow.clearInterval(this._mTimerId);
this._mEndTime=0;
this._mTimerId=null;
if(typeof (this._mOnComplete)=="function")
{
this._mOnComplete.call(this,this._mCompleteTo,a);
}
if(this._mOptList.length>0)
{
this._play(this._mOptList.shift()(),true);
}
b=false;
}
else{
var d=c-this._mStartTime;
if(typeof (this._mOnAction)=="function")
{
this._mOnAction.call(this,this._mTween(d,this._mFrom,this._mOffset,this._mDuration),d/this._mDuration);
}
}
return b;
};
_goClass._play=function(b,a){
if(a&&!b)
{
if(this._mOptList.length>0)
{
this._play(this._mOptList.shift()(),true);
}
return;
}
this._setOptions(b);
this._mStartTime=now();
this._mEndTime=this._mStartTime+this._mDuration;
if(this._action())
{
var c=this;
this._mTimerId=this._mDomWindow.setInterval(function(){
c._action();
},13);
}
};
_goClass._setOptions=function(b,a){
if(b)
{
var d=this._mDefOpts;
var e=a?d:this;
var c=this.constructor;
e._mDomWindow=b.win||d._mDomWindow||window;
e._mFrom=typeof (b.from)=="number"?b.from:d._mFrom;
e._mTo=typeof (b.to)=="number"?b.to:d._mTo;
e._mCompleteTo=typeof (b.completeto)=="number"?b.completeto:e._mTo;
e._mOffset=e._mTo-e._mFrom;
e._mDuration={fast:200,slow:600}[b.speed]||b.speed||d._mDuration;
var f=c._TWEEN[b.tween]||d._mTween||c._TWEEN.Linear;
e._mTween=typeof (f)=="function"?f:(f[b.easing]||f.easeIn);
e._mOnAction=b.onaction||d._mOnAction;
e._mOnComplete=b.oncomplete||d._mOnComplete;
}
};
_goClass._stop=function(){
if(!this._mTimerId)
{
return false;
}
return this._action(true);
};
_goStatic.play=function(b,a){
var o=this,l=o._CONST,j=l._DEF_RUN_CFG,r=now()+Math.random(),k=extend({},j,a),m,p,h,g;
try{
m=b.ownerDocument;
p=m.defaultView||m.parentWindow;
h=p[l._CACHE_ID];
}
catch(n)
{
return b;
}
try{
var o=this,l=o._CONST,j=l._DEF_RUN_CFG,r=now()+Math.random(),k=extend({},j,a),m=b.ownerDocument,p=m.defaultView||m.parentWindow,h=p[l._CACHE_ID],g;
}
catch(v)
{
callBack.call(b,a.oncomplete,[a.to,false,false]);
return b;
}
if(!h)
{
h=p[l._CACHE_ID]={};
}
function t(w,e)
{
b.setAttribute(l._PLAY_ATT,w+"|"+e);
}
function c(e)
{
return (b.getAttribute(l._PLAY_ATT)||"").split("|")[0];
}
function u(e)
{
b.setAttribute(l._WAIT_ATT,e);
}
function d()
{
return b.getAttribute(l._WAIT_ATT)||"";
}
function q(w,e)
{
var y=h[w],z=y[l._STATIC_PLAY_ID],A;
t(w,z.actiontype);
if(typeof z.onready=="function")
{
A=z.onready.call(b,e);
}
if(e||A==false)
{
var x=A&&A.to;
z.oncomplete(typeof x=="number"?x:z.to,e,A==false);
}
else{
if(A)
{
A.onaction=A.oncomplete=null;
}
y.play(A||{});
}
}
k.onaction=function(w,e){
a.onaction.call(b,w,e);
};
k.oncomplete=function(x,e,w){
t("",a.actiontype);
delete h[r];
a.oncomplete.call(b,x,e,w);
var y=d().split("|"),z=y.shift();
if(z)
{
u(y.join("|"));
if(y.length==0)
{
q(z);
}
else{
q(z,e);
}
}
};
k.win=p;
g=h[r]=new o(k);
g[l._STATIC_PLAY_ID]=k;
if(c())
{
var s=d();
u(s+(s?"|":"")+r);
if(k.type!="wait")
{
var f=h[c()];
f&&f.stop();
}
}
else{
q(r);
}
return b;
};
_goStatic.stop=function(a){
var f=this,c=f._CONST,d,g,b,h;
try{
d=a&&a.ownerDocument;
g=d.defaultView||d.parentWindow;
b=g[c._CACHE_ID];
h=(a.getAttribute(c._PLAY_ATT)||"").split("|")[0];
if(h)
{
a.setAttribute(c._WAIT_ATT,"");
b[h].stop();
}
}
catch(e)
{
}
return a;
};
_goStatic.isPlaying=function(a){
return !!a.getAttribute(this._CONST._PLAY_ATT);
};
_goStatic.getActionType=function(a){
return (a.getAttribute(this._CONST._PLAY_ATT)||"").split("|").pop();
};
_goStatic._expandOrFold=function(b,c,a){
var l=gbIsIE?1:0,n=a||{},p=n.speed,k=n.from,m=n.to,j=n.durlimit||0,h=n.basespeed||1.8,o=n.unilimit,e=typeof p=="undefined"||p=="uniform",d=false;
function f()
{
var r=arguments,q=n["on"+r[0]];
if(typeof q=="function")
{
return q.call(r[1],r[2]);
}
}
function g(q)
{
return q.scrollHeight-(gbIsIE?0:parseInt(getStyle(q,"paddingTop"))+parseInt(getStyle(q,"paddingBottom")));
}
return qmAnimation.play(b,extend({},n,{actiontype:c,speed:e?"fast":p,to:l,onready:function(q){
if(!q)
{
var B=this.style,v,x,w,z;
d=false;
z=f("ready",this)||{};
w=z.speed;
v=typeof z.from=="number"?z.from:k;
x=typeof z.to=="number"?z.to:m;
if(c=="expand")
{
if(typeof v!="number"||isNaN(v))
{
var u=parseInt(B.height);
if(isNaN(u))
{
v=B.height=l;
}
else{
v=u;
}
}
else{
B.height=v;
}
}
else{
if(typeof x!="number"||isNaN(x)||x<l)
{
x=l;
}
}
B.overflow="hidden";
B.visibility="visible";
if(B.display=="none")
{
B.display="";
}
if(gbIsIE)
{
var y=this.scrollHeight;
}
if(c=="expand")
{
if(typeof x!="number"||isNaN(x))
{
x=g(this);
d=true;
}
}
else{
if(typeof v!="number"||isNaN(v))
{
var u=parseInt(B.height);
v=isNaN(u)?g(this):u;
}
}
var t=x-v,s=x;
if(j>0&&Math.abs(t)>j)
{
if(t>0)
{
x=v+j;
}
else{
v=x+j;
}
}
if(!w)
{
if(e)
{
var r=Math.abs(v-x),A=z.unilimit||o;
w=(z.basespeed||h)*(A?Math.min(Math.max(r,A[0]),A[1]):r);
}
else{
w=p;
}
}
return x==v?false:{from:Math.max(v,l),to:Math.max(x,l),completeto:s,speed:w};
}
},onaction:function(r,q){
this.style.height=r+"px";
f("action",this,q);
},oncomplete:function(s,q,r){
if(!q)
{
if(s==l)
{
show(this,false);
}
this.style.height=d?"auto":(s+"px");
f("complete",this,s,r);
}
}}));
};
_goStatic.expand=function(b,a){
return this._expandOrFold(b,"expand",a);
};
_goStatic.fold=function(b,a){
return this._expandOrFold(b,"fold",a);
};
_goStatic.moveVerti=function(b,c,a){
var k=gbIsIE?1:0,m=a||{},o=m.speed,h=m.from,l=m.to,g=m.durlimit||0,f=m.basespeed||1.8,j=m.interval||13,n=m.unilimit,d=typeof o=="undefined"||o=="uniform";
function e()
{
var q=arguments,p=m["on"+q[0]];
if(typeof p=="function")
{
return p.call(q[1],q[2]);
}
}
return qmAnimation.play(b,extend({},m,{actiontype:c,speed:d?"fast":o,to:k,interval:j,onready:function(p){
if(!p)
{
e("ready",this);
return l==h?false:{from:h,to:l,completeto:l,speed:o};
}
},onaction:function(q,p){
this.style.top=q+"px";
e("action",this,p);
},oncomplete:function(r,p,q){
if(!p)
{
this.style.top=r+"px";
e("complete",this,r,q);
}
}}));
};
_goStatic.moveHor=function(b,c,a){
var j=gbIsIE?1:0,l=a||{},n=l.speed,h=l.from,k=l.to,g=l.durlimit||0,f=l.basespeed||1.8,m=l.unilimit,d=typeof n=="undefined"||n=="uniform";
function e()
{
var p=arguments,o=l["on"+p[0]];
if(typeof o=="function")
{
return o.call(p[1],p[2]);
}
}
return qmAnimation.play(b,extend({},l,{actiontype:c,speed:d?"fast":n,to:j,onready:function(o){
if(!o)
{
e("ready",this);
return k==h?false:{from:h,to:k,completeto:k,speed:n};
}
},onaction:function(p,o){
this.style.left=p+"px";
e("action",this,o);
},oncomplete:function(q,o,p){
if(!o)
{
this.style.left=q+"px";
e("complete",this,q,p);
}
}}));
};
_goStatic._CONST={_CACHE_ID:"QMaNiMatiON_CachE",_STATIC_PLAY_ID:"sTatiC_Play_Conf",_PLAY_ATT:"QMaNiMatiON_PlaY",_WAIT_ATT:"QMaNiMatiON_WaiT",_DEF_RUN_CFG:{from:1,to:100,speed:"fast"}};
_goStatic._TWEEN={Linear:function(g,a,e,f){
return e*g/f+a;
},Sine:{easeIn:function(g,a,e,f){
return -e*Math.cos(g/f*(Math.PI/2))+e+a;
},easeOut:function(g,a,e,f){
return e*Math.sin(g/f*(Math.PI/2))+a;
},easeInOut:function(g,a,e,f){
return -e/2*(Math.cos(Math.PI*g/f)-1)+a;
}},Cubic:{easeIn:function(g,a,e,f){
return e*(g/=f)*g*g+a;
},easeOut:function(g,a,e,f){
return e*((g=g/f-1)*g*g+1)+a;
},easeInOut:function(g,a,e,f){
if((g/=f/2)<1)
{
return e/2*g*g*g+a;
}
return e/2*((g-=2)*g*g+2)+a;
}},none:false};
var qmTab=function(a){
this._initElements(a);
this._setElementsEvent();
};
_goStatic=qmTab;
_goClass=_goStatic.prototype;
_goClass.change=function(a){
var l=this._mTabInfo,h=this._mState,e=h._curTabId,k=l[a];
if(!k||!k._enabled)
{
return false;
}
if(e==a)
{
return true;
}
if(e)
{
var d=l[e]._container;
var b=k._container;
setClass(l[e]._obj,this._mStyle.normal);
if(this._mAnimation)
{
this._mAnimation.stop();
function f(m)
{
var n=m/100;
setOpacity(d,n);
setOpacity(b,1-n);
}
var j={display:"",position:"absolute",width:getStyle(d,"width"),height:getStyle(d,"height"),zIndex:1};
this._mAnimation.updateStyle("pre",d,j);
this._mAnimation.updateStyle("cur",b,(j.zIndex=2)&&j);
var g=[];
var c=this._mCallBack._onchangeend;
this._mAnimation.play({onaction:function(n,m){
f(n);
},oncomplete:function(n,m){
f(n);
this.updateStyle("pre",d);
this.updateStyle("cur",b);
show(d,false);
show(b,true);
if(typeof (c)=="function")
c(a,e);
}});
}
else{
show(d,false);
show(b,true);
}
}
else{
show(k._container,true);
}
setClass(k._obj,this._mStyle.select);
h._curTabId=a;
if(typeof (this._mCallBack._onchange)=="function")
this._mCallBack._onchange(a,e);
return true;
};
_goClass.enable=function(b,a){
var c=this._mTabInfo[b];
if(!c)
{
return false;
}
setClass(c._obj,this._mStyle[(c._enabled=a||typeof (a)=="undefined"?true:false)?"normal":"disable"]);
return true;
};
_goClass.getSelectedTabId=function(){
return this._mState._curTabId;
};
_goClass._initElements=function(a){
var b=this._mTabInfo={};
for(var c in a.tab)
b[c]={_id:c,_obj:a.tab[c].obj,_container:a.tab[c].container,_enabled:true};
this._mStyle=a.style;
this._mCallBack={_onchange:a.onchange,_onchangeend:a.onchangeend};
this._mState={_curTabId:null};
if(a.isEnableAnimation!=false)
{
this._mAnimation=new qmAnimation({win:a.win,from:100,to:0,speed:400,tween:"Sine",easing:"easeOut"});
}
};
_goClass._setElementsEvent=function(){
var a=this;
var b=this._mTabInfo;
for(var c in b)
{
(function(){
var d=b[c];
show(d._container,false);
addEvent(d._obj,"click",function(){
a.change(d._id);
});
addEvent(d._obj,"mouseover",function(e){
if(d._enabled&&a._mState._curTabId!=d._id)
setClass(d._obj,a._mStyle.over);
});
addEvent(d._obj,"mouseout",function(e){
if(d._enabled&&a._mState._curTabId!=d._id&&!isObjContainTarget(d._obj,e.relatedTarget||e.toElement))
setClass(d._obj,a._mStyle.normal);
});
})();
}
};
var qmSimpleThumb=function(a){
this._initElements(a);
this._setElementsEvent();
};
_goStatic=qmSimpleThumb;
_goClass=_goStatic.prototype;
_goClass.enable=function(){
var a=this._mState;
if(a._enabled==true)
{
return;
}
a._enabled=true;
if(a._curPage==-1)
{
return this.goPage(1);
}
this._romanceState();
};
_goClass.disable=function(){
var a=this._mState;
if(a._enabled==false)
{
return;
}
a._enabled=false;
this._romanceState();
};
_goClass.getDataLength=function(){
return this._mData.length;
};
_goClass.getId=function(){
return this._mId;
};
_goClass.getSelectedData=function(){
var a=this._mState._curSelIdx;
return a<0?null:this._mData[a];
};
_goClass.goPage=function(a){
var c=this._mState,b=c._curPage;
if(c._enabled&&a>=1&&a<=c._totalPage)
{
c._curPage=a;
this._romanceState();
if(this._romanceCurPage())
this._romanceSelectState();
this._scrollToPage();
callBack.call(this,this._mCallBack._onchangepage,[a,b]);
return true;
}
return false;
};
_goClass.select=function(a){
var b=this._mData,c=this._mState;
a=parseInt(a);
if(a<0)
{
}
else if(isNaN(a)||((a=a%b.length)==c._curSelIdx))
{
this._mCallBack._onselect.call(this,a,c._preSelIdx);
return false;
}
c._preSelIdx=c._curSelIdx;
c._curSelIdx=a;
this._romanceSelectState();
if(typeof (this._mCallBack._onselect)=="function")
{
this._mCallBack._onselect.call(this,a,c._preSelIdx);
}
return true;
};
_goClass.onmouseover=function(a){
if(typeof (this._mCallBack._onmouseover)=="function")
{
this._mCallBack._onmouseover.call(this,a);
}
return true;
},_goClass.onmouseout=function(a){
if(typeof (this._mCallBack._onmouseout)=="function")
{
this._mCallBack._onmouseout.call(this,a);
}
return true;
},_goClass.setExternInfo=function(a,b){
var d=parseInt(a),h=this._mData,e=this._mConfig._numperpage,g=h.length-1;
if(!isNaN(d)&&d>=0&&d<=g)
{
var f=Math.floor((g-d)/e),c=g-d-f*e,j=this._mDom._pageContainers[f].firstChild.childNodes;
if(c<0||c>=j.length)
{
return;
}
j[c].lastChild.innerHTML=b;
}
};
_goClass.update=function(a){
this._updateData(a);
this._romanceContainer();
this.goPage(this._mState._curPage=Math.min(this._mState._curPage,this._mState._totalPage));
};
_goClass._getContainerCode=function(){
var b=[];
var e=qmSimpleThumb._TEMPLATE._CONTAINER;
var d=this._mState;
var a=this._mStyle.thumb.container;
for(var f=0,c=Math.max(d._totalPage,1);f<c;f++)
b.push(e.replace({border:a}));
return qmSimpleThumb._TEMPLATE._FRAME.replace({container:b.join("")});
};
_goClass._getMsgCode=function(b,a){
return qmSimpleThumb._TEMPLATE._MSG.replace({images_path:getPath("image"),msg:b,dispload:a?"":"none"});
};
_goClass._getThumbCode=function(a){
var d=this._mData;
var n=d.length;
if(n==0)
{
return this._getMsgCode("\u6682\u65E0\u6570\u636E");
}
var h=this._mConfig._numperpage;
var b=a*h;
var k=b-h;
var e=b-1;
if(d[k].indexOf)
{
if(d[k].indexOf("loading")==0)
{
return this._getMsgCode(d[k].substr(7)||"\u6570\u636E\u52A0\u8F7D\u4E2D...",true);
}
else if(d[k].indexOf("custom")==0)
{
return this._getMsgCode(d[k].substr(6));
}
}
var c=[];
var m=qmSimpleThumb._TEMPLATE._THUMB;
var l=this._mStyle.thumb;
var j={img:l.img,normal:l.normal,over:l.over,images_path:this._mConfig._imgpath};
if(d[k].thumb.indexOf("http")==0)
{
j.images_path="";
}
for(var o=k,g=Math.min(n--,e+1);o<g;o++)
{
var f=n-o;
j.value=f;
j.url=d[f].thumb;
c.push(m.replace(j));
}
return c.join("");
};
_goClass._initElements=function(a){
this._mId=a.id||T("qmSimpleThumb_$date$").replace({date:now()});
this._mConfig={_imgpath:a.imgpath,_numperpage:a.numperpage||8};
this._mDom=a.dom;
this._mStyle=a.style;
this._mCallBack={_onchangepage:a.onchangepage,_onselect:a.onselect,_onmouseover:a.onmouseover,_onmouseout:a.onmouseout};
this._mState={_curPage:-1,_totalPage:0,_curSelIdx:-1,_preSelIdx:-1,_enabled:null};
var b=this._mDom.container;
this._mAnimation=new qmAnimation({win:a.win,speed:"slow",tween:"Cubic",easing:"easeOut",onaction:function(c){
b.scrollLeft=c;
},oncomplete:function(d,c){
if(!c)
b.scrollLeft=d;
}});
this.update(a.data);
this[a.enabled?"enable":"disable"]();
};
_goClass._romanceContainer=function(){
var a=this._mDom.container;
a.innerHTML=this._getContainerCode();
this._mDom._pageContainers=GelTags("td",a);
};
_goClass._romanceState=function(){
var b=this._mDom;
var d=this._mState;
var e=this._mStyle.btn;
var c=d._enabled;
var a=d._curPage;
var f=d._totalPage;
if(b.pagetxt&&c)
b.pagetxt.innerHTML=qmSimpleThumb._TEMPLATE._TEXT.replace({page:a,total:f});
if(b.prevbtn)
{
setClass(b.prevbtn,!c||a==1?e.disable:e.normal);
}
if(b.nextbtn)
{
setClass(b.nextbtn,!c||a==f?e.disable:e.normal);
}
};
_goClass._romanceCurPage=function(){
var a=this._mState._curPage;
if(a>0)
{
var b=this._mDom._pageContainers[a-1].firstChild;
if(!b.innerHTML)
{
b.innerHTML=this._getThumbCode(a);
return true;
}
}
return false;
};
_goClass._romanceSelectState=function(){
var e=this._mStyle.thumb;
var d=this._mState;
var f=this._mData.length-1;
var b=this._mConfig._numperpage;
var c=this._mDom._pageContainers;
function a(h,g)
{
if(h<0||h>f)
{
return;
}
var m=Math.floor((f-h)/b);
var j=f-h-m*b;
var k=c[m].firstChild.childNodes;
if(j<0||j>=k.length)
{
return;
}
var l=k[j];
l.setAttribute("select",g&&e.select&&e.select!=e.over&&e.select!=e.normal?"true":"false");
setClass(l,g?e.select:e.normal);
}
;a(d._curSelIdx,true);
a(d._preSelIdx,false);
};
_goClass._setElementsEvent=function(){
var b=this;
var a=this._mDom;
var c=this._mState;
addEvent(a.prevbtn,"click",function(d){
preventDefault(d);
b.goPage(c._curPage-1);
});
addEvent(a.nextbtn,"click",function(d){
preventDefault(d);
b.goPage(c._curPage+1);
});
addEvent(a.container,"drag",preventDefault);
addEvent(a.container,"click",function(d){
preventDefault(d);
var f=d.srcElement||d.target;
var e=f.getAttribute("param");
if(e)
b.select(e);
});
addEvent(a.container,"mouseover",function(d){
b.onmouseover(d);
});
addEvent(a.container,"mouseout",function(d){
b.onmouseout(d);
});
};
_goClass._scrollToPage=function(){
var b=this._mState._curPage;
if(b>0)
{
var a=this._mDom.container;
var c=this._mDom._pageContainers[b-1];
this._mAnimation.stop();
this._mAnimation.play({from:a.scrollLeft,to:c.offsetLeft});
}
};
_goClass._updateData=function(a){
this._mData=a;
this._mState._totalPage=1+parseInt((this._mData.length-1)/this._mConfig._numperpage);
};
_goStatic._TEMPLATE={};
_goStatic._TEMPLATE._FRAME=T(['<table cellpadding="0" cellspacing="0" border="0">','<tr>$container$</tr>','</table>']);
_goStatic._TEMPLATE._CONTAINER=T(['<td><div class="$border$"></div></td>']);
_goStatic._TEMPLATE._THUMBBORDER=T(['<div class="$border$">$content$</div>']);
_goStatic._TEMPLATE._THUMB=T(['<div class="$normal$" un="item" param="$value$"','onmouseover="','this.getAttribute(\x27select\x27)!=\x27true\x27&&getTop().setClass(this,\x27$over$\x27);','" onmouseout="','this.getAttribute(\x27select\x27)!=\x27true\x27&&getTop().setClass(this,\x27$normal$\x27);','">','<img class="$img$" src="$images_path$$url$" param="$value$"/>','</div>']);
_goStatic._TEMPLATE._MSG=T(['<div style="text-align:center;">','<img src="$images_path$ico_loading1.gif" style="display:$dispload$;"/>','$msg$','</div>']);
_goStatic._TEMPLATE._TEXT=T(['$page$ / $total$']);
var qmGroupThumb=function(a){
this._initElements(a);
};
_goStatic=qmGroupThumb;
_goClass=_goStatic.prototype;
_goClass.changeGroup=function(a){
this._mTab.change(a);
};
_goClass.enable=function(){
if(this._mState._enabled==true)
{
return false;
}
this._mState._enabled=true;
var a=this._mTab.getSelectedTabId();
if(a)
this._mThumbs[a].enable();
};
_goClass.disable=function(){
if(this._mState._enabled==false)
{
return false;
}
this._mState._enabled=false;
var a=this._mTab.getSelectedTabId();
if(a)
this._mThumbs[a].disable();
};
_goClass.getDataLength=function(a){
return this._mThumbs[a].getDataLength();
};
_goClass.getId=function(){
return this._mId;
};
_goClass.getSelectedData=function(){
var a=this._mState._selectedGroupId;
return !a?null:this._mThumbs[a].getSelectedData();
};
_goClass.goPage=function(a){
var b=this._mThumbs[this._mTab.getSelectedTabId()];
if(b)
b.goPage(a);
};
_goClass.select=function(b,a){
var c=this._mThumbs[a||this._mTab.getSelectedTabId()];
return c?c.select(b):false;
};
_goClass.update=function(b,a){
var c=this._mThumbs[a];
c&&c.update(b);
};
_goClass._initElements=function(a){
this._mId=a.id||T("qmSimpleThumb_$date$").replace({date:now()});
this._mCallBack={_onselect:a.onselect,_onchange:a.onchange};
this._mState={_selectedGroupId:null,_selectedThumbIdx:-1,_enabled:null};
var e=this;
var g=this._mThumbs={};
var f={};
var d=a.group;
for(var c in d)
{
var b=d[c];
f[c]=b.dom;
g[c]=new qmSimpleThumb({id:c,win:a.win,imgpath:a.imgpath,numperPage:a.numperpage||8,enabled:false,dom:{container:b.dom.container,prevbtn:a.dom.prevbtn,nextbtn:a.dom.nextbtn,pagetxt:a.dom.pagetxt},style:{thumb:a.style.thumb,btn:a.style.btn},data:b.data,onselect:function(h,j){
e._onThumbSelect(this,h,j);
}});
}
this._mTab=new qmTab({win:a.win,tab:f,style:a.style.group,onchange:function(h,j){
e._onGroupChange(h,j);
}});
this._mTab.change(a.defgroupid||c);
this[a.enabled==false?"disable":"enable"]();
};
_goClass._onGroupChange=function(a,b){
var c=this;
if(!c._mState._enabled)
{
return;
}
callBack.call(c,c._mCallBack._onchange,[a,b]);
if(b)
c._mThumbs[b].disable();
c._mThumbs[a].enable();
};
_goClass._onThumbSelect=function(c,a,b){
var g=this._mState;
var d=g._selectedGroupId;
var f=g._selectedThumbIdx;
if(a!=-1)
{
g._selectedGroupId=c.getId();
g._selectedThumbIdx=a;
var e=this._mThumbs[d];
if(a!=-1&&d!=c.getId()&&e)
e.select(-1);
}
else if(d==c.getId())
{
g._selectedThumbIdx=-1;
}
if((d!=g._selectedGroupId||f!=g._selectedThumbIdx)&&typeof (this._mCallBack._onselect)=="function")
this._mCallBack._onselect.call(this,{groupid:g._selectedGroupId,thumbidx:g._selectedThumbIdx},{groupid:d,thumbidx:f});
};
qmActivex=function(){
this._mId="qmActiveX_"+(new Date()).valueOf();
this._mActiveXObj={};
this._mCurUploadInfo=null;
};
_goStatic=qmActivex;
_goClass=_goStatic.prototype;
_goClass.screenSnap=function(a){
var c=this._getActiveXObj("screensnap");
if(!c)
{
return false;
}
try{
c._Type=(getDomain()=="foxmail.com")?1:0;
}
catch(d)
{
}
var b=function(e){
return function(){
if(typeof (a)=="function")
a(e);
};
};
c.OnCaptureFinished=b(true);
c.OnCaptureCanceled=b(false);
c.DoCapture();
return true;
};
_goClass.upload=function(a){
this.stopUpload();
this._mCurUploadInfo=a;
var b=a.config;
if(!b||!b.url)
throw {message:"qmActivex:no upload cgi url"};
b.mode=b.mode||"download";
b.from=b.from||"";
b.scale=b.scale||"";
b.widthlimit=b.widthlimit||"";
b.heightlimit=b.heightlimit||"";
return this._uploadWithActivex()?true:this._uploadWithForm();
};
_goClass.stopUpload=function(){
var a=this._mCurUploadInfo;
if(!a)
{
return;
}
this._mCurUploadInfo=null;
if(a._uploadMode=="form")
{
removeSelf(a._targetFrameObj);
}
else if(a._uploadMode=="activex")
{
if(a._percent!=90)
this._getActiveXObj("uploader").StopUpload();
}
};
_goClass.hasClipBoardImage=function(){
var a=this._getActiveXObj("screensnap");
return a?a.IsClipBoardImage:false;
};
_goClass.checkImageType=function(a,b){
var c=a.toLowerCase();
var d="gif|jpg|jpeg|bmp|png".split("|");
for(var f=d.length-1;f>=0;f--)
if(c.indexOf(d[f])!=-1)
break;
if(-1==f)
{
var e=T("\u53EA\u5141\u8BB8\u4E0A\u4F20 <b>#type#</b> \u683C\u5F0F\u7684\u56FE\u7247","#").replace({type:d});
if(b=="showerr")
showError(e);
return b=="returnerr"?e:false;
}
return true;
};
_goClass._getActiveXObj=function(a){
var b={"screensnap":0,"uploader":2}[a];
if(!detectActiveX(b,1))
{
return null;
}
if(!this._mActiveXObj[a])
this._mActiveXObj[a]=createActiveX(b);
return this._mActiveXObj[a];
};
_goClass._getScreenSnapImg=function(){
var a=this._getActiveXObj("screensnap");
return a&&a.IsClipBoardImage?a.SaveClipBoardBmpToFile(1):null;
};
_goClass._uploadWithActivex=function(){
var d=this._getActiveXObj("uploader");
if(!d)
{
return false;
}
var c=this._mCurUploadInfo;
if(c.fileCtrl&&(getTop().gnIEVer>6||!getTop().gbIsIE))
{
return false;
}
c.screenImg=this._getScreenSnapImg();
if(!c.fileCtrl&&!c.screenImg)
{
c.config.url='';
return false;
}
c._uploadMode="activex";
c._percent=0;
c.onupload.call(this,"start");
d.StopUpload();
d.ClearHeaders();
d.ClearFormItems();
var a=c.config;
if(a.url.indexOf("http")!=0)
{
d.URL=[location.protocol,"//",location.host,a.url].join("");
}
else{
d.URL=a.url;
}
var b=this;
d.OnEvent=function(f,e,g,h,j){
b._doActivexUploaderEvent(f,e,g,h,j);
};
d.AddHeader("Cookie",document.cookie);
d.AddFormItem("sid",0,0,getSid());
d.AddFormItem("mode",0,0,a.mode);
d.AddFormItem("from",0,0,c.fileCtrl?a.from:"snapscreen");
d.AddFormItem("scale",0,0,a.scale);
d.AddFormItem("widthlimit",0,0,a.widthlimit||0);
d.AddFormItem("heightlimit",0,0,a.heightlimit||0);
if(c.fileCtrl)
{
d.AddFormItemObject(c.fileCtrl);
}
else{
d.AddFormItem("UploadFile",1,4,c.screenImg);
}
d.StartUpload();
return true;
};
_goClass._uploadWithForm=function(){
var e=this._mCurUploadInfo;
if(!e.fileCtrl)
{
return false;
}
for(var b=e.fileCtrl.parentNode;b&&b.tagName!="FORM"&&b.tagName!="BODY";)
b=b.parentNode;
if(!b||b.tagName!="FORM")
{
return false;
}
e._uploadMode="form";
e.onupload.call(this,"start");
var f=e.window||window;
var c=this._mId;
f[c+"Instance"]=this;
f.qmActiveXDoUploadFinish=function(g){
var h=f[g.id+"Instance"];
if(h)
h._doFormUploaderEvent();
};
if(e._targetFrameObj)
{
_removeSelf(e._targetFrameObj);
}
createBlankIframe(f,{id:c,onload:d});
var a=false;
function d(g)
{
var j=this;
if(!a)
{
e._targetFrameObj=j;
var h=e.config||{};
b.action=h.url||["/cgi-bin/upload?sid=",getTop.getSid()].join("");
b.target=c;
b.sid.value=getSid();
b.mode.value=h.mode||"download";
b.scale.value=h.scale||"";
b.widthlimit.value=h.widthlimit||"";
b.heightlimit.value=h.heightlimit||"";
b.submit();
return a=true;
}
g.qmActiveXDoUploadFinish(j);
}
};
_goClass._doFormUploaderEvent=function(){
var f=this._mCurUploadInfo;
if(!f)
{
return debug("_doFormUploaderEvent: upload info not exist",null,61882714);
}
if(!f._targetFrameObj)
{
return;
}
try{
var b=f._targetFrameObj.contentWindow.document;
var a=b.body;
if(a.className==f._targetFrameObj.id)
{
return;
}
var c=[];
var d=GelTags("script",b);
for(var h=0;h<d.length;h++)
c.push(d[h].innerHTML);
this._processResponse(c.join(""));
}
catch(g)
{
debug(g.message,61882714);
this._uploadFinish(false);
}
};
_goClass._doActivexUploaderEvent=function(b,a,c,d,e){
var f=this._mCurUploadInfo;
if(!f)
{
return debug("_doActivexUploaderEvent: upload info not exist",null,61882714);
}
switch(a)
{case 1:
return this._uploadFinish(false,{errCode:c});
case 2:
f._percent=parseInt(c*90/d);
return f.onupload.call(this,"uploading",{percent:f._percent});
case 3:
var g=this._getActiveXObj("uploader");
if(g.ResponseCode!="200")
{
return this._uploadFinish(false,{errCode:c});
}
this._processResponse(g.Response);
}
};
_goClass._processResponse=function(a){
var f=a||"";
var e=f.indexOf('On_upload("');
var b=f.indexOf('");',e);
var d=(e!=-1&&b!=-1)?f.substring(e+11,b):"err";
if(d!="err")
{
return this._uploadFinish(true,{imgParam:d.replace(new RegExp("\"","ig"),"").split(",")});
}
e=f.indexOf('On_upload_Fail("');
b=f.indexOf('");',e);
var c=function(g){
g=parseInt(g);
return (isNaN(g)?"5":(parseInt(100*parseInt(g)/(1024*1024))/100));
};
if(e!=-1&&b!=-1)
{
d=f.substring(e+16,b).replace(new RegExp("\"","ig"),"").split(",");
return this._uploadFinish(false,{curSize:c(d[0]),allowSize:c(d[1])});
}
return this._uploadFinish(false);
};
_goClass._uploadFinish=function(a,b){
if(!this._mCurUploadInfo)
{
return;
}
try{
this._mCurUploadInfo.onupload.call(this,a?"ok":"fail",b);
}
catch(c)
{
doPageError(c.message,this._mCurUploadInfo.window.location.href,"_uploadFinish callback");
}
this.stopUpload();
};
function qmFlash(a)
{
if(!(this._mId=a.id))
{
throw Error(0,"config.id can't use null");
}
if(!(this._mWin=a.win))
{
throw Error(0,"config.win win is null");
}
this._moConstructor=this.constructor;
this._mEvent=a;
this._initlize();
}
_goStatic=qmFlash;
_goClass=_goStatic.prototype;
_goStatic.get=function(a,b){
var c=b[this._CONST._CACHES];
return c&&c[a];
};
_goStatic.getFlashVer=function(){
var c="";
var k=-1;
var a=-1;
var b=-1;
var h=navigator.plugins;
if(h&&h.length)
{
for(var m=0,f=h.length;m<f;m++)
{
var g=h[m];
if(g.name.indexOf('Shockwave Flash')!=-1)
{
c=g.description.split('Shockwave Flash ')[1];
k=parseFloat(c);
b=parseInt(c.split("r")[1]);
a=parseInt(c.split("b")[1]);
break;
}
}
}
else{
try{
var j=new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
if(j)
{
c=j.GetVariable("$version").split(" ")[1];
var d=c.split(",");
k=parseFloat(d.join("."));
b=parseInt(d[2]);
a=parseInt(d[3]);
}
}
catch(l)
{
}
}
return {version:(isNaN(k)?-1:k)||-1,build:(isNaN(b)?-1:b)||-1,beta:(isNaN(a)?-1:a)||-1,desc:c};
};
_goStatic.isSupported=function(){
var a=this.getFlashVer();
return a.version>=10||a.version==9&&a.build>50;
};
_goStatic._CONST={_TIMEOUT:5*1000,_CACHES:"qmFlashCaches_ASDr431gGas",_CALLBACK:"onFlashEvent_ASDr431gGas"};
_goClass.getFlash=function(){
return getFlash(this._mId,this._mWin);
};
_goClass.isDisabled=function(){
return this._mDisabled||false;
};
_goClass.disable=function(a){
this._mDisabled=a!=false;
return this;
};
_goClass.getLoadedPercent=function(a){
var e=this;
function b(f)
{
try{
a.call(e,f);
}
catch(g)
{
}
}
var c=this.getFlash();
if(!c)
{
return b("notfound");
}
var d=0;
(function(){
var h=arguments.callee;
if(!h._startTime)
h._startTime=getTop().now();
var g=0;
var f=false;
try{
g=c.PercentLoaded();
}
catch(j)
{
f=true;
}
if(g!=d)
b(d=g);
if(g!=100)
{
if(getTop().now()-h._startTime>qmFlash._CONST._TIMEOUT)
{
b(f?"noflash":"timeout");
}
else{
setTimeout(h,100);
}
}
})();
};
_goClass.setup=function(a){
var c=this;
function b(f,d)
{
try{
a.call(c,f,d);
}
catch(g)
{
}
}
this.getLoadedPercent(function(d){
if(d==100)
{
setTimeout(function(){
try{
if(!c.getFlash().setup(qmFlash._CONST._CALLBACK,c._mId))
{
return b(false,"setuperr");
}
}
catch(f)
{
return b(false,"nosetup");
}
b(true);
});
}
else if(typeof d!="number")
{
b(false,d);
}
});
};
_goClass._initlize=function(){
var d=this._mWin;
var c=this._moConstructor._CONST;
var a=c._CACHES;
var b=c._CALLBACK;
if(!d[a])
d[a]=new d.Object();
d[a][this._mId]=this;
if(!d[b])
{
d[b]=function(){
var h=arguments[0];
var f=arguments[1];
var g=d[a][h];
if(g&&typeof (g._mEvent[f])=="function")
{
var e=[];
for(var k=2,j=arguments.length;k<j;k++)
e.push(arguments[k]);
g._mEvent[f].apply(g,e);
}
};
}
};
function clsXfBatchDownload()
{
this.constructor=arguments.callee;
}
clsXfBatchDownload.prototype={init:function(){
if(!this._checkXfInstall())
{
return false;
}
var a=new Date();
setCookie("qm_ftn_key","",a,"/","qq.com");
return true;
},DoXfBatchDownload:function(a){
var b=this;
waitFor(function(){
return typeof (BatchTask)!="undefined";
},function(c){
if(c)
{
b._doXfBatchDownload(a);
}
else{
showError("\u8C03\u7528\u65CB\u98CE\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u9875\u9762\u91CD\u8BD5\u3002");
}
});
},makeGetUrlArray:function(){
return 0;
},_checkXfInstall:function(){
try{
var a=new ActiveXObject("QQIEHelper.QQRightClick.2");
delete a;
loadJsFile(getPath("js")+"lib/xunfeng/"+getFullResSuffix("xflib_xw.js"),true);
return true;
}
catch(b)
{
if(confirm("\u4F60\u8FD8\u6CA1\u6709\u5B89\u88C5\u6700\u65B0\u7248\u7684QQ\u65CB\u98CE\uFF0C\u5982\u679C\u5DF2\u7ECF\u5B89\u88C5\uFF0C\u8BF7\u68C0\u67E5\u662F\u5426\u88AB\u7981\u7528\u3002\n\u73B0\u5728\u53BB\u4E0B\u8F7D\u5B89\u88C5\u4E48\uFF1F\u5B89\u88C5\u5B8C\u540E\u8BF7\u5237\u65B0\u672C\u9875\u9762\u3002"))
{
window.open("http://xf.qq.com/xf2/index.html");
}
return false;
}
},_doXfBatchDownload:function(a){
var c=a||this.makeGetUrlArray();
if(c.length<=0)
{
return;
}
var d=Math.min(50,c.length),e=new QMAjax(),f={},g=this;
showProcess(1,true,"\u6B63\u5728\u83B7\u53D6\u4E0B\u8F7D\u94FE\u63A5...");
(function b(h){
if(h>=d)
{
return g._completeHandle(f,d);
}
QMAjax.send([c[h],"&nm=",h,"&rn=",Math.random()].join(""),{method:"GET",onload:function(j,k){
var l="name"+h;
if(j&&k.indexOf(l)>0)
{
f[l]=k.split('"')[1];
}
b(h+1);
}},e);
})(0);
},_errorHandle:function(){
showError("\u94FE\u63A5\u83B7\u53D6\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
},_completeHandle:function(b,a){
var j=0,d=[];
for(var e=0;e<a;e++)
{
if(typeof b["name"+e]!="undefined")
{
var f=b["name"+e].split("|");
if(f[0]!="error"&&f[0].indexOf("http://")==0)
{
d.push(f[0].replace(/#/g,"_"));
var g=f[1],c=new Date(now()+3600*1000),h=getCookie("qm_ftn_key");
setCookie("qm_ftn_key",[h,g].join(","),c,"/","qq.com");
j++;
}
}
}
if(j==a)
{
showProcess(0);
}
else{
showError((a-j)+"\u4E2A\u6587\u4EF6\u94FE\u63A5\u83B7\u53D6\u5931\u8D25");
}
if(j>0)
{
this._invokeXf(d);
}
},_invokeXf:function(a){
var d=[];
for(var b=0,c=a.length;b<c;b++)
{
{
d.push(a[b]);
d.push("http://mail.qq.com/");
d.push("\u6587\u4EF6\u4E2D\u8F6C\u7AD9");
}
}
BatchTask(d.length,d);
}};
var QMSender=function(a){
this._moWin=a.oWin;
this._moItems=[];
this._mbIsAutoWidth=false;
this._mfOnclickItemCallBack=null;
this._iniSender(a);
};
_goStatic=QMSender;
_goClass=_goStatic.prototype;
_goClass._iniSender=function(a){
var m=S("Senderdiv",this._moWin);
if(!m)
{
return;
}
try{
var n=getDefalutAllMail();
}
catch(F)
{
var c=arguments.callee;
return setTimeout(function(){
c.apply(this._moWin,arguments);
},500);
}
if(!n.length)
{
return;
}
var z=a.nCurFolderId;
var A=a.sCurSaveFrom;
var b=a.bShowNode;
var C=typeof (a.sTitle)=="undefined"?"\u53EF\u9009\u62E9\u90AE\u7BB1\u522B\u540D\u6216POP\u6587\u4EF6\u5939\u7684\u90AE\u4EF6\u5730\u5740&#10;\u4F5C\u4E3A\u53D1\u4FE1\u5E10\u53F7\u3002":a.sTitle;
var B=typeof (a.sDesContent)=="undefined"?"\u53D1\u4EF6\u4EBA\uFF1A":a.sDesContent;
this._mfOnclickItemCallBack=function(e){
var L=S("sendmailname_val",this._moWin);
if(!L)
{
return;
}
var O="",J=GelTags("span",S("sendmailname_val",this._moWin))[0],K=GelTags("b",S("sendmailname_val",this._moWin))[0],N=J.getAttribute("nickname"),I=N?N.split("|"):[];
if(I[0]==e.email)
{
O=I[1];
}
J.innerHTML=this._TEMPLATE._EMAIL_DISP.replace(e);
K.innerHTML=htmlEncode(O)||e.nick.replace(/(^\"|\"$)/g,"");
S("sendname",this._moWin).value=htmlDecode(K.innerHTML);
this._setSender(e);
if(e.sms)
{
loadJsFileToTop(getPath("js"),[getFullResSuffix("qmtip.js")]);
var M=this._moWin;
waitFor(function(){
return QMTip;
},function(P){
if(P&&S("sendmailname",M).value==e.email)
{
QMTip.show({tipid:10001,domid:'sendmailname_val',win:M,msg:['<span class="black">\u5C06\u4F7F\u7528\u624B\u673A\u53F7\u90AE\u7BB1\u53D1\u4FE1\uFF0C\u8FD9\u6837\u5BF9\u65B9\u56DE<br/>\u4FE1\u60A8\u5C31\u4F1A\u83B7\u5F97\u77ED\u4FE1\u63D0\u9192\u3002<a onclick="window.open(\'http://service.exmail.qq.com/cgi-bin/help?subtype=1&&id=8&&no=1000605\')">\u8BE6\u60C5</a></span>'].join(''),arrow_direction:'down',arrow_offset:25,height_offset:4,tip_offset:-110,width:305,auto_hide:1,notlog:true,bForceShow:true});
}
});
}
callBack.call(this,a.onclickItemCallBack,[e]);
};
var y=typeof (a.sAlignType)=="undefined"?"left":y,D=a.sVerAlign||"bottom";
var d=300;
var j=parseInt(a.sWidth)||d;
var h,f;
this._mbIsAutoWidth=(j<0);
if(this._mbIsAutoWidth)
{
h=getStrDispLen(a.sCurSaveFrom)+60;
j=h+(gbIsIE?50:50);
}
else{
h=j-(gbIsIE?40:40);
}
f=h-25;
var x=Math.floor(j*23/d);
var w=Math.floor(j*20/d);
var l=[];
var s=[];
var t=null;
var o=this._CONST;
var r=this._TEMPLATE._EMAIL;
var q=this._TEMPLATE._EMAIL_DISP;
var p=this._TEMPLATE._DOMAIN;
var k=this._TEMPLATE._BASE;
var u=this._moItems=[];
var v=this;
for(var G=0;G<n.length;G++)
{
(function(){
var I=n[G];
var L=I.email;
var K=L.split("@").pop();
var e=o.hasOwnProperty(K);
var J={nick:I.nickname&&"\""+I.nickname+"\"",email:L,phone:I.phone,emaildisp:this._mbIsAutoWidth?L:subAsiiStr(L,e?w:x,"..."),signid:I.signid,domain:p.replace({images_path:getPath("image"),margin_top:(I.phone==1?416:(e?o[K]:321))}),sms:I.phone==1&&I.smsleft>0};
u.push(J);
l.push(extend({smtp:I.smtp==2?'':''},J));
s.push(function(M){
v._mfOnclickItemCallBack(J);
});
if(!z&&!A&&getDefaultSender()==L)
{
t=J;
}
else if((A&&A.toLowerCase()==I.email)||(!A&&z&&z==I.folderid)||t==null)
{
t=J;
}
})();
}
var H="";
if(n&&n.length>0&&n[0]&&n[0].nickname)
{
H=n[0].nickname;
}
else if(S("useralias")&&S("useralias").innerHTML)
{
H=S("useralias").innerHTML;
}
m.innerHTML=k.replace({title:C,desContent:B,email_width:f,sel_width:h,width:j,images_path:getPath("image"),nick:H,email:q.replace(t)});
var g=0;
S("sendmailname_val",this._moWin).onclick=function(){
if(!g)
{
for(var Q=0;Q<n.length;Q++)
{
var e=getStrDispLen(n[Q].email+(n[Q].smtp==2?'':''));
if(g<e)
{
g=e;
}
}
g=Math.max(this.clientWidth,g+42);
}
var M=calcPos(this),L=[],J=GelTags("span",this)[0];
for(var Q=0;Q<l.length;Q++)
{
L.push({sId:Q,sItemValue:r.replace(extend({selected:J.innerHTML==l[Q].email},l[Q]))});
}
var K=this.getElementsByTagName("span")[0],P="",N=K&&K.innerHTML||"";
for(var Q=0;Q<n.length;Q++)
{
if(n[Q].email==N)
{
P=n[Q].nickname;
var O=K.getAttribute("nickname"),I=O?O.split("|"):[];
if(I[0]==N)
{
P=I[1];
}
break;
}
}
L.push({sId:"border",nHeight:5,sItemValue:['<div style="border-top:1px solid;margin-top:2px;padding-top:2px;font-size:0;line-height:0;height:0;"></div>'].join(""),bDisSelect:true});
L.push({sId:"send__nickname",nHeight:25,sItemValue:['<div style="padding-left:15px;overflow:hidden">','<span id="snn_getAlias" style="line-height:25px;">','<font style="color:#000">\u53D1\u4FE1\u6635\u79F0\uFF1A</font>','<span title="',P,'">',subAsiiStr(P,16,"...",true),'</span>','</span>','</div>'].join(""),bDisSelect:true});
new (getTop().QMMenu)({oEmbedWin:v._moWin,sId:"sendermenu",nX:y=="left"?M[3]:M[3]-(g-this.clientWidth),nY:D=="bottom"?M[2]:(M[2]-21*L.length-35),nMinWidth:230,bAnimation:false,nItemHeight:21,oItems:L,onitemclick:function(R){
s[R]();
}});
};
if(S("sendmailname",this._moWin))
{
S("sendmailname",this._moWin).value=t.email;
}
show(b?m[b]:m,true);
if(l.length>1)
{
getTop().requestShowTip("sendmailname_val",17,this._moWin);
}
};
_goStatic.setAlias=function(){
var e=getTop(),f=e.getMainWin(),g=S("sendermenu_QMMenu",f)?"sendermenu_QMMenu_":"sendermenu__",a=GelTags("input",S(g+"snn_setAlias",f))[0],c=GelTags("span",S(g+"snn_getAlias",f))[0],b=GelTags("span",S("sendmailname_val",f))[0],d=GelTags("b",S("sendmailname_val",f))[0],h=a.value;
S("sendname",f).value=h||" ";
b.setAttribute("nickname",[b.innerHTML,h].join("|"));
d.innerHTML=htmlEncode(h);
c.innerHTML=htmlEncode(h);
if(S("useraddr").innerHTML==b.innerHTML)
{
S("useralias").innerHTML=htmlEncode(h);
}
show(S(g+"snn_setAlias",f),false);
show(S(g+"snn_getAlias",f),true);
};
_goStatic.initAlias=function(a){
var d=getTop(),e=d.getMainWin(),f=S("sendermenu_QMMenu",e)?"sendermenu_QMMenu_":"sendermenu__",c=GelTags("span",S(f+"snn_getAlias",e))[0],b=GelTags("input",S(f+"snn_setAlias",e))[0];
b.value=htmlDecode(c.innerHTML);
show(S(f+"snn_setAlias",e),true);
show(S(f+"snn_getAlias",e),false);
setTimeout(function(){
b.select();
});
};
_goClass._setSender=function(a){
var b=this._moWin;
S("sendmailname",b).value=a.email;
if(b.setSignature)
{
b.setSignature("sign",a.signid==-2?getUserSignatureId():a.signid);
}
};
_goClass.setSenderSelected=function(a){
var b=this._moItems;
for(var c=b.length-1;c>=0;c--)
{
if(b[c].email==a)
{
this._mfOnclickItemCallBack(b[c]);
return;
}
}
};
_goClass._CONST={"hotmail.com":0,"live.com":0,"live.cn":0,"msn.com":0,"msn.cn":0,"yahoo.com.cn":30,"yahoo.cn":30,"yahoo.com":30,"ymail.com":30,"rocketmail.com":30,"gmail.com":61,"vipgmail.com":61,"sina.com":95,"sina.com.cn":95,"vip.sina.com":95,"my3ia.sina.com":95,"sina.cn":95,"163.com":383,"vip.163.com":383,"126.com":352,"vip.126.com":352,"yeah.net":223,"foxmail.com":159,"sohu.com":193,"vip.sohu.com":193,"vip.qq.com":288,"qq.com":288,"21cn.com":256,"21cn.net":256};
_goClass._TEMPLATE={_BASE:T(['<div title="$title$" style="float:left; margin-left:-3px;" class="textoftitle">&nbsp;$desContent$</div>','<div id="sendmailname_val" unselectable="on" onmousedown="return false" ','style="cursor:pointer; padding:0 0 0 3px;  float:left;">','<b>$nick$</b> &lt;<span>$email$</span>&gt;<span class="addrtitle" style="font-family: arial,sans-serif; padding-left:4px; font-size:9px; position:relative; top:-1px;" >\u25BC</span>','</div>']),_EMAIL:TE(['<div class="composeAccount" style="">','<input type="button" class="ft_upload_success" style="$@$if(!$selected$)$@$visibility:hidden;$@$endif$@$">$email$$smtp$','</div>']),_EMAIL_DISP:T(['$email$']),_DOMAIN:T(['<img src="$images_path$spacer.gif" style="background-position:0 -$margin_top$px;" valign="absmiddle" >'])};
var QMTimeLang={_moBaseDateValue:new Date(1970,0,5,0,0,0,0)};
_goStatic=QMTimeLang;
_goStatic.formatRefer=function(a,b){
return T('$date$$time$').replace({date:this.formatDate(a,b),time:this.formatTime(a)});
};
_goStatic.formatDate=function(a,b){
var j=a;
var k=b||new Date();
var c=j-this._moBaseDateValue;
var g=k-this._moBaseDateValue;
var d=24*3600000;
var e=Math.floor(c/d)-Math.floor(g/d);
if(Math.abs(e)<3)
{
return T('$day$').replace({day:["\u524D\u5929","\u6628\u5929","\u4ECA\u5929","\u660E\u5929","\u540E\u5929"][e+2]});
}
var h=7*d;
var f=Math.floor(c/h)-Math.floor(g/h);
if(Math.abs(f)<2)
{
return T('$weekpos$\u5468$weekday$').replace({weekpos:["\u4E0A","\u672C","\u4E0B"][f+1],weekday:this.formatWeek(j)});
}
return T([j.getYear()==k.getYear()?'':'$YY$\u5E74','$MM$\u6708$DD$\u65E5']).replace({YY:j.getFullYear(),MM:j.getMonth()+1,DD:j.getDate()});
};
_goStatic.formatTime=function(a){
var b=a.getHours();
var c=a.getMinutes();
var d;
if(b<6)
{
d="\u51CC\u6668";
}
else if(b<9)
{
d="\u65E9\u4E0A";
}
else if(b<12)
{
d="\u4E0A\u5348";
}
else if(b<13)
{
d="\u4E2D\u5348";
}
else if(b<18)
{
d="\u4E0B\u5348";
}
else if(b<22)
{
d="\u665A\u4E0A";
}
else{
d="\u6DF1\u591C";
}
return T('$desc$$hour$:$min$').replace({desc:d,hour:b==12?b:b%12,min:this._format(c)});
};
_goStatic.formatWeek=function(a){
return ["\u65E5","\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D"][a.getDay()];
};
_goStatic._format=function(a){
return a<10?"0"+a:a;
};
var QMDragDrop={groups:{},setGroup:function(b,a){
var c=this;
if(!c._getGroupById(b))
{
c.groups[b]=a;
for(var d=0;d<a.length;d++)
{
a[d].setGroupId(b);
}
}
return c;
},addGroup:function(b,a){
var d=this,c;
if(!(c=d._getGroupById(b)))
{
c=[];
d.setGroup(b,c);
}
c.push(a);
a.setGroupId(b);
return d;
},delGroup:function(a){
var c=this,b;
if(b=c._getGroupById(a))
{
if(delete c.groups[a])
{
}
else{
debug('error delete dragdrop group:'+a);
}
}
return c;
},getDragFromGroup:function(a){
var d=this,c,b=[];
if(c=d._getGroupById(a))
{
if(c[i] instanceof QMDragDrop.Draggable)
{
b.push(c[i]);
}
}
return b;
},getDropFromGroup:function(a){
var d=this,c,b=[];
if(c=d._getGroupById(a))
{
for(var e=0;c&&e<c.length;e++)
{
if(c[e] instanceof QMDragDrop.DropTarget)
{
b.push(c[e]);
}
}
}
return b;
},_getGroupById:function(a){
var b=this;
for(var c in b.groups)
{
if(c==a)
{
return b.groups[c];
}
}
}};
_goStatic=QMDragDrop;
_goStatic.Draggable=function(a,c,b){
this._moElement=null;
this._moTargets=[];
this._moOptions={};
this._moCallBacks={};
this._mnDiffX=0;
this._mnDiffY=0;
this._mnState=2;
this._init(a,c,b);
};
_goStatic.Draggable.STATE={_DRAGSTART:0,_DRAG:1,_DRAGEND:2};
_goStatic.Draggable.prototype={setGroupId:function(a){
this._msId=a;
return this;
},addDropTarget:function(a){
if(a)
{
this._moTargets.push(a);
}
return this;
},moveTo:function(b,c,a,d){
var h=this,g=h._moElement,e=g.offsetLeft,f=g.offsetTop;
qmAnimation.play(g,{from:0,to:1,speed:Math.max(Math.abs(b-e),Math.abs(c-f))*0.5||10,onaction:function(j){
j=j||0;
this.style.left=e+(b-e)*j;
this.style.top=f+(c-f)*j;
},oncomplete:function(){
this.style.left=b;
this.style.top=c;
if(a)
{
a.call(h,d);
}
}});
},exchangePos:function(a){
if(a&&this._moPlaceHolderDom)
{
a.parentNode.insertBefore(this._moElement,a);
this._moPlaceHolderDom.parentNode.insertBefore(a,this._moPlaceHolderDom);
this._moElement.parentNode.insertBefore(this._moPlaceHolderDom,this._moElement);
}
},getElement:function(){
return this._moElement;
},getPlaceHolder:function(){
return this._moPlaceHolderDom;
},lock:function(a){
this._moOptions.lockx=!!a;
this._moOptions.locky=!!a;
},_init:function(a,c,b){
if(a)
{
this._moElement=a;
this._moDocument=a.ownerDocument;
this._moWindow=this._moDocument.parentWindow||this._moDocument.defaultView;
this._msPosStyle=getStyle(a,'position');
this._setOptions(c)._setEvents(b);
}
},_setOptions:function(a){
var d=this,b=d._moOptions;
b.handle=a.handle||d._moElement;
b.maxContainer=a.maxcontainer;
b.lockx=!!a.lockx;
b.locky=!!a.locky;
b.transparent=!!a.transparent;
b.placeholder=!!a.placeholder;
b.threshold=a.threshold||5;
b.holderhtml=a.holderhtml;
b.oTitle=a.oTitle;
if(b.transparent)
{
var c=calcPos(d._moElement);
var e='<div style="display:none;background:#FFF;position:absolute;opacity:0.5;filter:alpha(opacity=50);width:100%;height:100%;z-index:999;cursor:move;"></div>';
insertHTML(d._moElement,'afterBegin',e);
d._moMaskDom=d._moElement.firstChild;
d._moMaskDom.style.height=c[5]+'px';
}
return d;
},_setEvents:function(a){
var b=this;
b._moCallBacks={ondragstart:function(){
},ondrag:function(){
},ondragend:function(){
}};
extend(b._moCallBacks,a);
function c(d)
{
var f=getEventTarget(d).tagName;
if(!gbIsIE&&f&&f.toLowerCase()=='input')
{
return;
}
if(b._moOptions.lockx&&b._moOptions.locky)
{
return;
}
b._mnDiffX=d.clientX-b._moElement.offsetLeft+(parseInt(getStyle(b._moElement,'marginLeft'))||0)+bodyScroll(b._moWindow,'scrollLeft');
b._mnDiffY=d.clientY-b._moElement.offsetTop+(parseInt(getStyle(b._moElement,'marginTop'))||0)+bodyScroll(b._moWindow,'scrollTop');
if(b._moOptions.oTitle)
{
var e=gbIsIE?calcPos(b._moWindow.frameElement):[0,0,0,0];
b._mnMouseX=e[3]+d.clientX;
b._mnMouseY=e[0]+d.clientY;
}
else{
b._mnMouseX=d.clientX;
b._mnMouseY=d.clientY;
}
b._mnState=QMDragDrop.Draggable.STATE._DRAGEND;
b._move(d);
}
addEvent(b._moOptions.handle,'mousedown',c);
return b;
},_move:function(a){
var e=this,d=e._moOptions,b=QMDragDrop.DataTransfer;
if(!e._onmousemove||!e._onmouseup)
{
e._onmousemove=function(f){
if(gbIsIE&&d.oTitle)
{
}
else{
e._moWindow.getSelection?e._moWindow.getSelection().removeAllRanges():e._moDocument.selection.empty();
}
if(e._mnState==QMDragDrop.Draggable.STATE._DRAGEND&&d.threshold)
{
var g=Math.abs(e._mnMouseX-f.clientX),h=Math.abs(e._mnMouseY-f.clientY);
if(g>d.threshold||h>d.threshold)
{
callBack.call(e,e._moCallBacks['ondragstart'],[f]);
e._mnState=QMDragDrop.Draggable.STATE._DRAGSTART;
e._changeStyle();
if(!d.oTitle)
{
e._moElement.style.left=e._mnMouseX-e._mnDiffX+bodyScroll(e._moWindow,'scrollLeft');
e._moElement.style.top=e._mnMouseY-e._mnDiffY+bodyScroll(e._moWindow,'scrollTop');
}
}
return;
}
var j=f.clientX-e._mnDiffX+bodyScroll(e._moWindow,'scrollLeft'),k=f.clientY-e._mnDiffY+bodyScroll(e._moWindow,'scrollTop');
if(d.oTitle)
{
}
else{
if(!d.lockx)
{
e._moElement.style.left=j+'px';
}
if(!d.locky)
{
e._moElement.style.top=k+'px';
}
}
if(d.maxContainer)
{
var l=calcPos(d.maxContainer),m=calcPos(e._moElement);
if(m[1]>l[1])
{
e._moElement.style.left=j+l[1]-m[1]+'px';
}
else if(m[3]<l[3])
{
e._moElement.style.left=j+l[3]-m[3]+'px';
}
if(m[2]>l[2])
{
e._moElement.style.top=k+l[2]-m[2]+'px';
}
else if(m[0]<l[0])
{
e._moElement.style.top=k+l[0]-m[0]+'px';
}
}
e._mnState=QMDragDrop.Draggable.STATE._DRAG;
callBack.call(e,e._moCallBacks['ondrag'],[f]);
var n=new b(b.TYPE.DOWN,e,f.clientX,f.clientY,f);
e._broadcast(n);
preventDefault(f);
};
e._onmouseup=function(f){
if(e._mnState==QMDragDrop.Draggable.STATE._DRAGEND)
{
e._stop();
return;
}
e._stop();
var g=new b(b.TYPE.UP,e,f.clientX,f.clientY,f);
e._broadcast(g);
e._mnState=QMDragDrop.Draggable.STATE._DRAGEND;
callBack.call(e,e._moCallBacks['ondragend'],[f]);
e._changeStyle();
};
}
if(gbIsIE&&e._moElement.setCapture)
{
var c=d.oTitle||e._moElement;
c.setCapture(true);
addEvents(c,{mousemove:e._onmousemove,mouseup:e._onmouseup,losecapture:e._onmouseup});
}
else{
addEvents(e._moDocument,{mousemove:e._onmousemove,mouseup:e._onmouseup});
e._moWindow.captureEvents&&e._moWindow.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
addEvent(e._moWindow,'blur',e._onmouseup);
}
return e;
},_stop:function(){
var c=this;
var b=c._moOptions,a=b.oTitle||c._moElement;
if(gbIsIE&&a.releaseCapture)
{
addEvents(a,{mousemove:c._onmousemove,mouseup:c._onmouseup,losecapture:c._onmouseup},true);
a.releaseCapture();
}
else{
addEvents(c._moDocument,{mousemove:c._onmousemove,mouseup:c._onmouseup},true);
c._moWindow.releaseEvents&&c._moWindow.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);
removeEvent(c._moWindow,'blur',c._onmouseup);
}
return c;
},_setPlaceHolder:function(a){
var d=this;
if(a)
{
var b=d._moElement.cloneNode(true),c=calcPos(d._moElement);
b.style.position='static';
b.style.width=c[4]+'px';
b.style.height=c[5]+'px';
if(d._moOptions.holderhtml)
{
b.innerHTML=d._moOptions.holderhtml;
}
b.removeAttribute('id');
b.removeAttribute('name');
d._moElement.parentNode.insertBefore(b,d._moElement);
d._moPlaceHolderDom=b;
}
else{
if(d._moPlaceHolderDom)
{
d._moElement.parentNode.removeChild(d._moPlaceHolderDom);
d._moPlaceHolderDom=null;
}
d._moElement.style.position=d._msPosStyle;
}
},_changeStyle:function(){
var f=this,d=f._moOptions,a=f._mnState==QMDragDrop.Draggable.STATE._DRAGEND;
if(d.oTitle)
{
return;
}
f._moElement.style.position=a?'absolute':'absolute';
if(d.transparent)
{
show(f._moMaskDom,!a);
}
if(d.placeholder)
{
var e=f._moPlaceHolderDom,b=e&&e.offsetLeft,c=e&&e.offsetTop;
!a&&f._setPlaceHolder(true);
a&&f.moveTo(b,c,f._setPlaceHolder,false);
}
return f;
},_broadcast:function(a){
var c=this,b=QMDragDrop.getDropFromGroup(c._msId);
for(var d=0;d<b.length;d++)
{
if(c!=b[d])
{
b[d].listen(a);
}
}
return c;
}};
_goStatic.DropTarget=function(c,b,a){
this._moElement=null;
this._moCallBacks={};
this._moDragTarget=null;
this._mnState=-1;
this._init(c,b,a);
};
_goStatic.DropTarget.STATE={_DRAGENTER:0,_DRAGOVER:1,_DRAGLEAVE:2,_DROP:3};
_goStatic.DropTarget.prototype={setGroupId:function(a){
this._msId=a;
return this;
},getDragTarget:function(){
return this._moDragTarget;
},listen:function(b){
var f=this,a=QMDragDrop.DropTarget.STATE;
f._moDragTarget=b.target;
var e=f._moDragTarget.getElement(),c=e.offsetLeft+e.offsetWidth/2,d=e.offsetTop+e.offsetHeight/2;
if(f.isOver(c,d,b))
{
if(b.type==QMDragDrop.DataTransfer.TYPE.DOWN)
{
f._mnState=(f._mnState==a._DRAGENTER||f._mnState==a._DRAGOVER)?a._DRAGOVER:a._DRAGENTER;
}
else{
f._mnState=a._DROP;
}
}
else{
f._mnState=a._DRAGLEAVE;
}
switch(f._mnState)
{case a._DRAGENTER:
callBack.call(f,f._moCallBacks['ondragenter'],[b]);
break;
case a._DRAGOVER:
callBack.call(f,f._moCallBacks['ondragover'],[b]);
break;
case a._DROP:
callBack.call(f,f._moCallBacks['ondrop'],[b]);
break;
case a._DRAGLEAVE:
callBack.call(f,f._moCallBacks['ondragleave'],[b]);
break;
default:
break;
}
},isOver:function(a,b){
var g=this._moElement;
var c=g.offsetLeft;
var d=c+g.offsetWidth;
var e=g.offsetTop;
var f=e+g.offsetHeight;
return (a>c&&a<d&&b>e&&b<f);
},_init:function(b,c,a){
if(b)
{
this._moElement=b;
this._moCallBacks={ondragenter:function(){
},ondragover:function(){
},ondragleave:function(){
},ondrop:function(){
}};
extend(this._moCallBacks,c);
if(a)
{
this.isOver=a;
}
}
}};
_goStatic.DataTransfer=function(a,e,b,c,d){
this.type=a;
this.target=e;
this.x=b;
this.y=c;
this.event=d;
};
_goStatic.DataTransfer.TYPE={DOWN:1,UP:2};
var QMPanel=inheritEx("QMPanel",Object,function(a){
return {$_constructor_:function(b){
if(b)
{
var c=this.constructor,d=c.get(b.sId);
d&&d.destroy();
this._genId(b);
c.$_add&&c.$_add(b.sId,this);
this._init(b);
}
},configHelp_:function(c,d,b){
for(var e in d)
{
if(b||typeof (c[e])=="undefined"||c[e]==null)
{
c[e]=d[e];
}
}
return c;
},autoAlignCenter_:function(){
var g=this,d=g._moConfig,f=g._moPanelDom,e=d.oEmbedWin||getTop(),h=e.document.body;
if(!d.nX)
{
var b=(h.clientWidth-f.offsetWidth)/2+bodyScroll(e,"scrollLeft");
d.nX=b;
f.style.left=b+"px";
}
if(!d.nY)
{
var c=Math.max(2,(h.clientHeight-f.offsetHeight)/2+bodyScroll(e,"scrollTop")-25);
d.nY=c;
f.style.top=c+"px";
}
},dfConfig_:function(b){
var c=b.oEmbedWin||getTop(),d=c.document.body;
this.configHelp_(b,{oEmbedWin:c,oEmbedToDom:d,sEmbedPos:"afterBegin",oCallerWin:window,nZIndex:1100,bDisplay:true,sBodyHtml:""});
},_genId:function(b){
return this._msPanelId=[b.sId||(b.sId=["__QmDefPanelId","__"].join(unikey())),this.constructor.name].join("_");
},processHtml_:function(b){
var c=this._msPanelId;
return b.toString().replace(/ (id|for)=[\"\']?(\w+)[\"\']?/gi,[' $1="',c,'_$2"'].join(""));
},insertHtml_:function(b){
b.sPanelId=this._msPanelId;
b.sBodyHtml=this.processHtml_(b.sBodyHtml);
insertHTML(b.oEmbedToDom,b.sEmbedPos,QMPanel._TEMPLATE._SKIN.replace(b));
},initMemVar_:function(b){
this._moConfig=b;
this._msStatus="";
this._moPanelDom=S(this._msPanelId,b.oEmbedWin);
},htmlReady_:function(b){
var c=this;
c._msStatus="hide";
callBack.call(this,b.onload);
c.setEvent_();
b.bDisplay&&this.show();
},setEvent_:function(){
},panelDomCtrl_:function(b,c){
var d=this;
show(d._moPanelDom,b);
if(b)
{
d.autoAlignCenter_();
}
callBack.call(d,c);
},panelDomDestroy_:function(){
var b=this;
removeSelf(b._moPanelDom);
b._moPanelDom=null;
},panelDestroy_:function(){
var c=this,d=c._moConfig.sId,b=c.constructor;
if(b.get(d))
{
b.$_del(d);
c.panelDomDestroy_();
}
},_init:function(b){
this.dfConfig_(b);
this.insertHtml_(b);
this.initMemVar_(b);
this.htmlReady_(b);
},destroy:function(){
var b=this;
b.panelDomCtrl_(false);
b.panelDestroy_();
},getConfig:function(){
return this._moConfig;
},option:function(b,c){
var h=this,g={nX:"left",nY:"top",nWidth:"width",nHeight:"height",nZIndex:"zIndex"},e={nWidth:"scrollWidth",nHeight:"scrollHeight"},k;
if(typeof c!="undefined")
{
h._moConfig[b]=c;
if(k=g[b])
{
h._moPanelDom.style[k]=typeof c=="number"&&k!="zIndex"?c+"px":c;
}
}
if(b=="status")
{
return h._msStatus;
}
if(!c&&h._moConfig[b]=="auto"&&e[b])
{
var f=h._moPanelDom,j,d;
if(!isShow(f))
{
j=getStyle(f,"left");
f.style.left="-9999px";
d=show(f,true)[e[b]];
show(f,false).style.left=j;
}
else{
d=f[e[b]];
}
return d;
}
return c?h:h._moConfig[b];
},S:function(b){
var c=this._moConfig.oEmbedWin||getTop();
return S([this._msPanelId,b].join("_"),c);
},isContain:function(b){
return isObjContainTarget(this._moPanelDom,b);
},getPanelDom:function(){
return this._moPanelDom;
},show:function(){
var b=this;
if(b._msStatus!="showing"&&b._msStatus!="show")
{
b._msStatus="showing";
b.panelDomCtrl_(true,function(){
b._msStatus="show";
setTimeout(function(){
try{
callBack.call(b,b._moConfig.onshow);
}
catch(c)
{
debug("onshow error : "+c.message);
}
});
});
}
return b;
},hide:function(b){
var c=this;
if(c._msStatus!="hiding"||c._msStatus!="hide")
{
c._msStatus="hiding";
c.panelDomCtrl_(false,function(){
c._msStatus="hide";
setTimeout(function(){
callBack.call(c,c._moConfig.onhide);
});
callBack.call(c,b);
});
}
else{
callBack.call(c,b);
}
return c;
},_isValid:function(){
try{
var c=this._moPanelDom;
if(c.parentNode==null)
{
return false;
}
if(gbIsIE)
{
return !!c.ownerDocument;
}
else{
var d=c.ownerDocument.defaultView,b=d.frameElement;
if(b)
{
return b.contentDocument==c.ownerDocument;
}
else{
return d==getTop();
}
}
}
catch(f)
{
return false;
}
},close:function(b){
if(this._msStatus!="close")
{
var c=this;
if(c._isValid())
{
b&&(this._moConfig.bAnimation=false);
this.hide(function(){
c._msStatus="close";
c.panelDestroy_();
callBack.call(c,c._moConfig.onclose);
});
}
else{
c._msStatus="close";
c.panelDestroy_();
}
}
return this;
},setBody:function(b){
this._moPanelDom.innerHTML=this.processHtml_(b);
callBack.call(this,this._moConfig.onload);
return this;
},setHtml:function(c,b){
((typeof c=="string"?this.S(c):c)||{}).innerHTML=this.processHtml_(b);
return this;
},isShow:function(){
return this._msStatus=="show"||this._msStatus=="showing";
},isClose:function(){
return this._msStatus=="close";
}};
},{_TEMPLATE:{_SKIN:TE(['<div id="$sPanelId$" class="$sClassName$" $sAttr$ ','style="$sStyle$;display:none;z-index:$nZIndex$;position:absolute;left:$nX$px;top:$nY$px;','$@$if($nHeight$&&!isNaN($nHeight$))$@$ height:$nHeight$px; $@$endif$@$','$@$if($nWidth$&&!isNaN($nWidth$))$@$ width:$nWidth$px; $@$endif$@$"','>','$sBodyHtml$','</div>'])}});
var QMDialog=inheritEx("QMDialog",QMPanel,function(a){
return {initMemVar_:function(b){
callBack.call(this,a.initMemVar_,[b]);
this._moMaskDom=null;
this._moMinAnimation=null;
this._moMinDlgDom=null;
var c=this.constructor;
this._moDlgArray=b.bModal?c._oMdlgArray:c._oNdlgArray;
},_ioDlgArray:function(b){
var g=this,e=g,d=g.constructor,c,f=g._moDlgArray,h=function(m,k,l){
for(var n=m.length-1;n>=0;n--)
{
e=m[n];
e.option("nZIndex",c?l:k);
e._lightHead(c);
c=true;
}
};
if(b>0)
{
for(var j in f)
{
if(f[j]==g)
{
e=f.splice(j,1)[0];
break;
}
}
if(b==2)
{
b=0;
}
}
if(b==0)
{
f.push(e);
}
h(d._oMdlgArray,1120,1106);
h(d._oNdlgArray,1110,1105);
},setEvent_:function(){
var b=this._moConfig,e=this;
if(b.bModal)
{
addEvent(this._moMaskDom,"mousedown",function(){
var f=e.constructor._oMdlgArray,g=f[f.length-1];
g&&g.spark();
});
}
else{
addEvent(this._moPanelDom,"mousedown",function(){
if(!b.bModal)
{
e._ioDlgArray(2);
}
});
}
var c=b.oEmbedWin,d=this._moPanelDom;
if(b.bMin)
{
this.S("_minbtn_").onclick=function(){
e.min();
return false;
};
}
if(b.bClose)
{
this.S("_closebtn_").onclick=function(){
e.close();
return false;
};
}
d.tabindex="-1";
addEvent(d,"keydown",function(f){
if(f&&f.keyCode==27)
{
e.close();
preventDefault(f);
}
});
new (QMDragDrop.Draggable)(e._moPanelDom,{handle:e.S("_head_"),maxcontainer:b.oEmbedWin.document.body},{ondragstart:function(){
callBack.call(e,b.ondragstart);
},ondrag:function(){
callBack.call(e,b.ondrag);
},ondragend:function(){
e._moConfig.nX=parseInt(e._moPanelDom.style.left);
e._moConfig.nY=parseInt(e._moPanelDom.style.top);
}}).lock(!b.bDraggable);
},dfConfig_:function(b){
this.configHelp_(b,{bModal:true});
this.configHelp_(b,{sClassName:(b.sClassName?'qm_dialog '+b.sClassName:'qm_dialog')},true);
var f={bDraggable:true,bClose:true,bAnimation:true,sEmbedPos:"beforeEnd",sTitle:""};
var d=this.constructor,c=b.bModal?d._oMdlgArray:d._oNdlgArray,h=c[c.length-1];
if(h&&!b.bAlignCenter)
{
extend(f,{nX:h.option("nX")+20,nY:h.option("nY")+20});
}
this.configHelp_(b,f);
var e=S("qmdialog_container",getTop());
if(!e)
{
var g=getTop().document;
insertHTML(g.body,g.readyState=="complete"?"beforeEnd":"afterBegin",'<span id="qmdialog_container"></span>');
e=S("qmdialog_container",getTop());
}
this.configHelp_(b,{oEmbedWin:getTop(),oEmbedToDom:e,nZIndex:b.bModal?1110:1105},true);
return callBack.call(this,a.dfConfig_,[b]);
},insertHtml_:function(b){
var c=this._msPanelId;
b.sBodyHtml=QMDialog._TEMPLATE._SKIN.replace(b);
b.sClassName=b.sClassName+(b.sFootHtml?"":" nofoot ");
callBack.call(this,a.insertHtml_,[b]);
},htmlReady_:function(b){
var c=this;
if(b.bModal)
{
c._moMaskDom=c._getMask(b.oEmbedWin);
}
if(b.bMin)
{
insertHTML(c._moPanelDom,"afterEnd",c.processHtml_(c.constructor._TEMPLATE._MIN_ANIMATION.replace(b)));
this._moMinAnimation=this.S("_min_animation_");
}
callBack.call(this,a.htmlReady_,[b]);
},_getMask:function(b){
b=b||getTop();
var d="qqmail_mask",c=S(d,b);
if(!c)
{
insertHTML(b.document.body,"beforeEnd",T(['<div id="$id$" class="$class$" style="z-index:98;display:none;"',' onkeypress="return false;" onkeydown="return false;"',' tabindex="0"></div>']).replace({'class':'editor_mask opa50Mask ',id:d}));
c=S(d,b);
}
return c;
},panelDomCtrl_:function(b,c,d){
this._ioDlgArray(b?0:1);
var t=this,m=t._moConfig,d=d||(m.bAnimation?"ani1":"ani0"),l=getTop().qmAnimation,o=this.constructor._oMdlgArray.length,r=t._moPanelDom,n=t.S("_content_");
function e()
{
if(m.sUrl&&b)
{
t.S("_dlgiframe_").height="0";
t.S("_dlgiframe_").height=t._moPanelDom.offsetHeight-t.S("_head_").offsetHeight;
}
}
if(this._moConfig.bModal&&o==(b?1:0))
{
callBack(getTop().iPadPrevent);
show(this._moMaskDom,b);
}
hideWindowsElement(!b);
if(d=="ani0")
{
callBack.call(this,a.panelDomCtrl_,[b,c]);
e();
}
else if(d=="ani2")
{
var p=t._moMinAnimation,q=t._moMinDlgDom,s=calcPos(show(q,true)),h=(t._mnPanelWidth||r.offsetWidth)-s[4],g=(t._mnPanelHeight||r.offsetHeight)-s[5],j=m.nX-s[3],k=m.nY-s[0],f=function(u){
E(["left","top","width","height"],function(v,w){
p.style[v]=u[w]+"px";
});
};
if(b)
{
l.play(r,{win:window,speed:300,onready:function(){
show(p,true);
show(q,false);
},onaction:function(v,u){
f([s[3]+(j*u),s[0]+(k*u),s[4]+(h*u),s[5]+(g*u)]);
},oncomplete:function(){
show(p,false);
r.style.top=r.getAttribute("originTop");
callBack.call(t,c);
}});
}
else{
t._mnPanelWidth=r.offsetWidth;
t._mnPanelHeight=r.offsetHeight;
l.play(r,{win:window,speed:300,onready:function(){
r.setAttribute("originTop",r.style.top);
r.style.top="-1000px";
show(p,true);
},onaction:function(v,u){
f([m.nX-(j*u),m.nY-(k*u),t._mnPanelWidth-(h*u),t._mnPanelHeight-(g*u)]);
},oncomplete:function(){
show(p,false);
callBack.call(t,c);
}});
}
return;
}
else if(d=="ani1")
{
if(b)
{
l.play(r,{win:window,speed:300,easing:"easeOut",tween:"Sina",from:-30,to:0,onready:function(){
show(setOpacity(r,0),true);
t.autoAlignCenter_();
e();
n.style.visibility="hidden";
},onaction:function(v,u){
setOpacity(r,u).style.marginTop=v+"px";
},oncomplete:function(){
setOpacity(r,1).style.marginTop=0;
n.style.visibility="visible";
callBack.call(t,c);
}});
}
else{
l.play(r,{win:window,speed:300,easing:"easeIn",tween:"Sina",from:0,to:-30,onaction:function(v,u){
setOpacity(r,1-u).style.marginTop=v+"px";
},oncomplete:function(u){
show(r,false);
callBack.call(t,c);
}});
}
}
},panelDomDestroy_:function(){
var c=this;
if(c._moConfig.sUrl)
{
try{
c.S("_dlgiframe_").contentWindow.location.replace("javascript:'';");
}
catch(b)
{
}
}
if(c._moConfig.bAnimation)
{
qmAnimation.stop(c._moPanelDom);
}
c._moMinDlgDom&&removeSelf(c._moMinDlgDom);
removeSelf(c._moPanelDom);
removeSelf(c._moMinAnimation);
c._moPanelDom=null;
},_lightHead:function(b){
var c=this;
_oPanelDom=c._moPanelDom;
setClass(_oPanelDom,(c._moConfig.sClassName||"qm_dialog ")+(b?" qm_dialog_flash":""));
},S:function(b){
var e=this,c=e._moConfig,d=callBack.call(e,a.S,[b]);
if(c.sUrl&&!d)
{
d=S(b,a.S("_dlgiframe_").contentWindow);
}
return d;
},close:function(b){
var c=this._moConfig.onbeforeclose;
if(c&&c.call(this)===false)
{
return;
}
if(b)
{
this._moConfig.bAnimation=false;
}
callBack.call(this,a.close);
callBack(getTop().iPadRemoveEvent);
return this;
},min:function(){
if(this._msStatus!="show")
{
return;
}
var f=this,d=S("minimize_container",getTopWin()),c=f._moConfig,g=f._msPanelId+"_min",e=f._moMinDlgDom,b=f._moConfig.onbeforemin;
if(b&&!b.call(f))
{
return;
}
if(!e)
{
insertHTML(d,"beforeEnd",f.constructor._TEMPLATE._MINTAB_.replace({dialogId:c.sId,id:g,title:c.sTitle}));
this._moMinDlgDom=e=S(g,getTopWin());
}
f.panelDomCtrl_(false,function(){
f._msStatus="min";
show(e,true);
callBack.call(f,f._moConfig.onmin);
},"ani2");
return f;
},max:function(){
if(this._msStatus!="min")
{
return;
}
var e=this,c=e._moMinDlgDom,d=calcPos(c),b=e._moConfig;
e.panelDomCtrl_(true,function(){
e._msStatus="show";
show(c,false);
callBack.call(e,e._moConfig.onmax);
},"ani2");
return this;
},spark:function(){
var d=this,c=4,b=function(){
if(--c>0)
{
setTimeout(arguments.callee,80);
}
var e=c%2;
d._lightHead(e);
};
b();
return d;
},getMinDom:function(){
return this._moMinDlgDom;
},getDialogWin:function(){
var b=this._moConfig;
return b.sUrl?this.S("_dlgiframe_").contentWindow:b.oEmbedWin;
},setHeader:function(b){
this.S("_title_").innerHTML=this.processHtml_(b);
return this;
},setBody:function(b){
this.S("_content_").innerHTML=this.processHtml_(b);
callBack.call(this,this._moConfig.onload);
return this;
}};
},{_TEMPLATE:{_SKIN:TE(['<div style="cursor:$@$if($bDraggable$)$@$move$@$endif$@$;" class="dialog_head" id="_head_">','<span id="_title_">$sTitle$</span>','$@$if($bMin$)$@$','<a title="\u6700\u5C0F\u5316" class="ico_minimize" href="javascript:;" initlized="true" id="_minbtn_"><em class="ico_minimize_inner"></em></a>','$@$endif$@$','$@$if($bClose$)$@$','<a title="\u5173\u95ED" dlg="close" class="ico_close_d" href="javascript:;" id="_closebtn_" initlized="true"></a>','$@$endif$@$','</div>','<div id="_content_">','$@$if($sUrl$)$@$','<iframe id="_dlgiframe_" frameborder="0" scrolling="no" src="$sUrl$" style="width:100%;"></iframe>','$@$else$@$','<div>','<div class="dialog_content" id="_body_">','$sBodyHtml$','</div>','$@$if($sFootHtml$)$@$','<div class="dialog_operate" id="_foot_">','$sFootHtml$','<div class="clr"></div>','</div>','$@$endif$@$','</div>','$@$endif$@$','</div>']),_MINTAB_:T('<span id="$id$" style="display:none;"><a href="javascript:;" onclick="getTop().QMDialog(\'$dialogId$\',\'max\');" nocheck="true">$title$</a>&nbsp;|&nbsp;</span>'),_MIN_ANIMATION:T('<div id="_min_animation_" style="display:none;position:absolute;z-index:$nZIndex$;border-width:2px;left:$nX$;top:$nY$;" class="bd_upload"></div>')},_oNdlgArray:[],_oMdlgArray:[]});
var QMTabDialog=inheritEx('QMTabDialog',QMDialog,function(a){
return {dfConfig_:function(b){
var c={sTitle:'',sBodyHtml:'',sFootHtml:'',sClassName:b.sClassName?'qm_tab_dialog '+b.sClassName:'qm_tab_dialog'};
this.configHelp_(b,c,true);
callBack.call(this,a.dfConfig_,[b]);
},insertHtml_:function(b){
var e='';
var d='';
var c=b.oTabs||[];
if(c.length>0)
{
e=QMTabDialog._TEMPLATE._TABTITLE.replace({oTabs:c});
d=QMTabDialog._TEMPLATE._TABCONTENT.replace({oTabs:c});
}
b.sTitle=e;
b.sBodyHtml=d;
callBack.call(this,a.insertHtml_,[b]);
},setEvent_:function(){
var c=this;
var d=getTopWin();
var b={rule:function(){
return {click:{"click_tab_title":{bPropagable:false}}};
},events:function(){
return {"click_tab_title":function(e,f){
var p=attr(f,'selected');
if("true"!=p)
{
if(1==attr(f,'isdisabled'))
{
return;
}
var n=c.S('tab_title');
var j=d.finds("span[selected='true']",n)[0];
attr(j,'selected','false');
rmClass(j,'actived');
addClass(j,'pointer');
attr(f,'selected',"true");
rmClass(f,'pointer');
addClass(f,'actived');
var m=c.S('tab_content');
var g=attr(j,'tab-num');
var k=d.finds("div[tab-num='"+g+"']",m)[0];
var h=attr(f,'tab-num');
var l=d.finds("div[tab-num='"+h+"']",m)[0];
k.style.position='absolute';
k.style.top='-999px';
k.style.left='-999px';
attr(k,'expanded','false');
l.style.position='static';
d.show(l,true);
attr(l,'expanded','true');
var o=(typeof c._moConfig.ontoggletab)=="function"?c._moConfig.ontoggletab:function(){
};
callBack.call(c,o,[j,f]);
}
}};
}};
d.liveEvent(this.getPanelDom(),b);
callBack.call(this,a.setEvent_,[]);
},_fInitAllTabContent:function(b){
var e=getTopWin();
var c=this;
var d=c.S('tab_content');
E(b.oTabs,function(f,g){
var h=e.finds("div[tab-num='"+g+"']",d)[0];
if(!f.fInitTabContent)
{
f.fInitTabContent=function(){
};
}
if(b.bUseSelfCallback)
{
f.fInitTabContent.apply(c,[h]);
}
else{
e.callBack(f.fInitTabContent,[h]);
}
});
},htmlReady_:function(b){
this._fInitAllTabContent(b);
callBack.call(this,a.htmlReady_,[b]);
},panelDomDestroy_:function(){
var b=this;
if(this._moConfig.sMinTabId)
{
b._moMinDlgDom=null;
}
callBack.call(b,a.panelDomDestroy_,[]);
},getSelectedTab:function(){
var c=getTopWin();
var b=this.S('tab_title');
return c.finds("span[selected='true']",b)[0];
},getSelectedContent:function(){
return (getTopWin()).finds("div[expanded='true']",this.S('tab_content'))[0];
},min:function(){
if(this._msStatus!="show")
{
return;
}
var d=this,c=d._moConfig;
if(!c.sMinTabId)
{
callBack.call(d,a.min,[]);
return d;
}
else{
var b=d._moConfig.onbeforemin;
if(b&&!b.call(d))
{
return;
}
d._moMinDlgDom=S(c.sMinTabId,getTopWin());
d.panelDomCtrl_(false,function(){
d._msStatus="min";
callBack.call(d,d._moConfig.onmin);
},"ani2");
return d;
}
},max:function(){
if(!this._moConfig.sMinTabId)
{
callBack.call(this,a.max,[]);
return this;
}
else{
if(this._msStatus!="min")
{
return;
}
var b=this;
b.panelDomCtrl_(true,function(){
b._msStatus="show";
callBack.call(b,b._moConfig.onmax);
},"ani2");
return b;
}
},show:function(){
var c=this;
if(c._msStatus!="showing"&&c._msStatus!="show")
{
c._msStatus='show';
var b=c.getPanelDom(),d=b.getAttribute('originTop');
b.style.display='block';
if(d)
{
b.style.top=d;
}
show(c._moMaskDom,true);
c.autoAlignCenter_();
setTimeout(function(){
try{
callBack.call(c,c._moConfig.onshow);
}
catch(e)
{
debug("onshow error : "+e.message);
}
});
}
return c;
},hide:function(b){
var d=this;
if(d._msStatus!="hiding"&&d._msStatus!="hide")
{
d._msStatus="hide";
var c=d.getPanelDom();
var e=c.setAttribute('originTop',c.style.top);
c.style.top="-999px";
show(d._moMaskDom,false);
setTimeout(function(){
callBack.call(d,d._moConfig.onhide);
});
callBack.call(d,b);
}
else{
callBack.call(d,b);
}
return d;
}};
},{_TEMPLATE:{_TABTITLE:TE(['<div id="tab_title" class="dialog_tab_title">','$@$for($oTabs$)$@$','<span tab-num="$_idx_$" ck="click_tab_title" $@$if($bDefaultHide$==true)$@$style="display:none"$@$endif$@$','$@$if($bDefault$==true)$@$',' selected="true" class="dialog_tab_list actived" ','$@$else$@$',' selected="false" class="dialog_tab_list pointer" ','$@$endif$@$','>$sTabTitle$</span>','$@$endfor$@$','</div>','<div class="clr"></div>']),_TABCONTENT:TE(['<div id="tab_content">','$@$for($oTabs$)$@$','<div tab-num="$_idx_$" class="tab_content_list" ','$@$if($bDefault$==true)$@$',' expanded="true" ','$@$else$@$',' expanded="false" style="display:none;" ','$@$endif$@$','>$sTabContent$</div>','$@$endfor$@$','</div>']),_MINTAB_:QMDialog._TEMPLATE._MINTAB_,_MIN_ANIMATION:QMDialog._TEMPLATE._MIN_ANIMATION},_oNdlgArray:QMDialog._oNdlgArray,_oMdlgArray:QMDialog._oMdlgArray});
var QMMenu=inheritEx("QMMenu",QMPanel,function(a){
return {initMemVar_:function(b){
var c=this;
callBack.call(c,a.initMemVar_,[b]);
c._moCurSelDom;
c._moItemNode;
c._moSubMenu=null;
c._moParentMenu=null;
c._mnSubMenuTimeoutOpen=null;
c._mnSubMenuTimeoutClose=null;
c._mnAllMenuTimeoutClose=null;
},setEvent_:function(){
var k=this,f=k._moConfig,e=null,h=k.S("_menuall_"),g=k.S("_foot_"),j=k.getPanelDom();
function c(m,l)
{
while(m)
{
var n=m.id||"";
if(n.indexOf("_menuitem_")>-1)
{
return !l&&m.className.indexOf("menu_item_nofun")>-1?0:m;
}
else if(/_QMMenu$/.test(n))
{
return 0;
}
m=m.parentNode;
}
return null;
}
function b(l)
{
if(f.bProxyScroll!==false)
{
var o=getEventTarget(l),m=typeof (l.wheelDelta)=="undefined"?l.detail/3:-l.wheelDelta/120,n=h.scrollTop+m*20;
h.scrollTop=Math.min(Math.max(n,0),h.scrollHeight-h.offsetHeight);
while(o)
{
if(o.getAttribute&&o.getAttribute('scroll')=='true')
{
return;
}
o=o.parentNode;
}
preventDefault(l);
stopPropagation(l);
}
}
function d(l)
{
var m=f.oItems;
for(var n in m)
{
if(m[n].sId==l)
{
return m[n];
}
}
}
addEvents(j,{contextmenu:preventDefault,mousewheel:b,DOMMouseScroll:b,mouseout:function(l){
var m=k._moCurSelDom,n=c(l.relatedTarget||l.toElement,1);
if(n==null&&f.bAutoClose)
{
k._closeAllMenu();
}
if(n===0||n==m)
{
return;
}
if(m)
{
var p=m.getAttribute("itemid"),q=['sub',p,'_QMMenu'].join(''),o=n;
while(o)
{
if(o.id==q)
{
return;
}
o=o.parentNode;
}
if(k._moSubMenu&&n==null&&m==k._moSubMenu._moParentItem)
{
return;
}
k._clearTimeoutOpenSubMenu()._clearTimeoutCloseSubMenu();
k._mnSubMenuTimeoutClose=setTimeout(function(){
k._closeSubMenu();
},100);
setClass(k._moCurSelDom,"menu_item");
return k._moCurSelDom=null;
}
},mouseover:function(l){
if(f.bAutoClose)
{
k._clearTimeoutCloseAllMenu();
}
var n=c(getEventTarget(l));
if(n)
{
k._selectItem(n);
var o=n.getAttribute("itemid"),m=d(o);
if(m.oSubMenu)
{
k._openSubMenu(m,n);
}
}
if(k._moParentMenu)
{
k._moParentMenu._clearTimeoutOpenSubMenu()._clearTimeoutCloseSubMenu();
k._moParentMenu.selectItem(k._moParentItem);
}
},click:function(l){
var n=getEventTarget(l),o;
if(n.getAttribute("qmmenuopt")=="close")
{
k.close();
}
else if(o=c(getEventTarget(l)))
{
var p=o.getAttribute("itemid"),m=d(p);
if(!m.oSubMenu)
{
k._clearTimeoutOpenSubMenu();
callBack.call(k,f.onitemclick,[p,m]);
setClass(o,"menu_item");
k.close();
k._closeParentMenu();
}
}
}});
addEvent(k._moPanelDom,"mousedown",stopPropagation);
},dfConfig_:function(b){
this.configHelp_(b,{bAutoClose:true,nZIndex:1121,nWidth:"auto",nMinWidth:100,nMaxWidth:9999,bAnimation:true,nMaxItemView:1000000,sClassName:"qmpanel_shadow rounded5"});
this.configHelp_(b,{nHeight:"auto",sStyle:"background:#fff"},true);
if(b.nArrowPos)
{
b.nX-=b.nArrowPos;
b.nY+=12;
}
return callBack.call(this,a.dfConfig_,[b]);
},insertHtml_:function(b){
var k=this,j=b.oItems,h=b.oFootItems,c=j.length>b.nMaxItemView,f=c?b.nMaxItemView:j.length,l=k._msPanelId,g=0;
for(var m=0;m<j.length;m++)
{
var e=j[m].nHeight=j[m].nHeight||b.nItemHeight||22;
if(m<f)
{
g+=e;
}
if(j[m].sId===0)
{
j[m].sId="0";
}
k.configHelp_(j[m],{bDisSelect:!(j[m].sId)});
}
if(h)
{
for(var m=0,d=h.length;m<d;m++)
{
if(h[m].sId===0)
{
h[m].sId="0";
}
k.configHelp_(h[m],{nHeight:b.nItemHeight||22,bDisSelect:!(h[m].sId)});
}
}
b.sBodyHtml=QMMenu._TEMPLATE._SKIN.replace({nArrowPos:b.nArrowPos||0,sWidthDetect:b.sWidthDetect||"mini",mwidth:b.nWidth-3,mheight:c?g:"auto",nMinWidth:b.nMinWidth,oItems:b.oItems,oFootItems:b.oFootItems});
callBack.call(this,a.insertHtml_,[b]);
},adjustSize_:function(){
var e=this;
if(e._moConfig.nWidth=="auto")
{
var d=e.S("_menuall_"),c=e.S("_foot_");
if(d&&d.offsetWidth>10)
{
var b=(Math.max(e._moConfig.nMinWidth,Math.min(d.scrollWidth,e._moConfig.nMaxWidth))+(gbIsIE?0:d.offsetWidth-d.scrollWidth));
if(typeof e._moConfig.nMaxWidth==="number"&&b>e._moConfig.nMaxWidth)
{
b=e._moConfig.nMaxWidth;
}
else if(typeof e._moConfig.nMinWidth==="number"&&b<e._moConfig.nMinWidth)
{
b=e._moConfig.nMinWidth;
}
c.style.width=d.style.width=b+"px";
setClass(d,"txtflow");
}
}
},panelDomCtrl_:function(b,c){
var f=this,e=f._moPanelDom;
if(!this._moConfig.bAnimation||gbIsIE)
{
callBack.call(this,a.panelDomCtrl_,[b,c]);
return f.adjustSize_();
}
if(b)
{
var d=true;
show(e,true);
qmAnimation.expand(e.lastChild,{win:window,from:0,speed:200,easing:"easeOut",tween:"Cubic",oncomplete:function(){
callBack.call(f,c);
},onaction:function(){
if(d)
{
f.adjustSize_();
d=0;
}
}});
}
else{
qmAnimation.fold(e.lastChild,{win:window,speed:200,easing:"easeIn",tween:"Cubic",oncomplete:function(){
show(e,false);
callBack.call(f,c);
}});
}
},panelDomDestroy_:function(){
var b=this;
if(b._moConfig.bAnimation)
{
qmAnimation.stop(b._moPanelDom);
}
removeSelf(b._moPanelDom);
b._moPanelDom=null;
},_getItemDom:function(b){
var c=this;
return typeof (b)=="number"?c.S("_menuall_").childNodes[b]:c.S("_menuitem_"+b);
},_selectItem:function(b){
var c=(typeof (b)=="string"||typeof (b)=="number")?this.S("_menuitem_"+b):b;
if(this._moCurSelDom==c)
{
return this;
}
if(c)
{
c.className="menu_item_high";
}
if(this._moCurSelDom)
{
this._moCurSelDom.className="menu_item";
}
this._moCurSelDom=c;
return this;
},_clearTimeoutOpenSubMenu:function(){
var b=this;
if(b._mnSubMenuTimeoutOpen)
{
clearTimeout(b._mnSubMenuTimeoutOpen);
b._mnSubMenuTimeoutOpen=null;
}
return b;
},_clearTimeoutCloseSubMenu:function(){
var b=this;
if(b._mnSubMenuTimeoutClose)
{
clearTimeout(b._mnSubMenuTimeoutClose);
b._mnSubMenuTimeoutClose=null;
}
return b;
},_clearTimeoutCloseAllMenu:function(){
var c=this,b=c;
while(b._moParentMenu)
{
b=b._moParentMenu;
}
while(b)
{
if(b._mnAllMenuTimeoutClose)
{
clearTimeout(b._mnAllMenuTimeoutClose);
b._mnAllMenuTimeoutClose=null;
}
b=b._moSubMenu;
}
return c;
},_closeAllMenu:function(){
var b=this;
if(b._mnAllMenuTimeoutClose)
{
clearTimeout(b._mnAllMenuTimeoutClose);
}
b._mnAllMenuTimeoutClose=setTimeout(function(){
b._closeParentMenu().close();
b._mnAllMenuTimeoutClose=null;
},500);
return b;
},_openSubMenu:function(c,b){
var f=this,d=f._moConfig,e=f.configHelp_(c.oSubMenu,d);
e.sId="sub"+c.sId;
e.nZIndex=d.nZIndex+1;
if(f._moSubMenu)
{
if(f._moSubMenu._moConfig.sId==e.sId)
{
return f;
}
}
f._clearTimeoutOpenSubMenu();
f._mnSubMenuTimeoutOpen=setTimeout(function(){
if(f._moSubMenu)
{
f._closeSubMenu();
}
if(f.isShow())
{
var g=calcPos(b);
g[0]-=5;
g[1]-=1;
g[2]+=7;
g[3]+=2;
var h=f._moSubMenu=new QMMenu(e),j=calcAdjPos(g,h.option('nWidth'),h.option('nHeight'),d.oEmbedWin,1);
h.option('nY',Math.max(0,j[0])).option('nX',Math.max(0,j[3]))._moParentMenu=f;
h._moParentItem=b;
}
},100);
},_closeSubMenu:function(){
var b=this;
if(b._moSubMenu)
{
b._moSubMenu.close();
b._moSubMenu=null;
}
return b;
},_closeParentMenu:function(){
var c=this,b=c._moParentMenu;
if(b)
{
b._moSubMenu=null;
b._closeParentMenu().close();
c._moParentMenu=null;
}
return c;
},toggle:function(){
var b=this;
b.isShow()?b.hide():b.show();
return b;
},selectItem:function(b){
var c=this;
c._selectItem(b);
if(c._moCurSelDom)
{
scrollIntoMidView(c._moCurSelDom,c.S("_menuall_"));
}
return c;
},addItem:function(c,b){
var f=this,d=f._getItemDom(c);
f.configHelp_(b,{nHeight:22});
if(d)
{
insertHTML(d,"beforeBegin",f.constructor._TEMPLATE._SKIN.replace(b,"item"));
}
else{
var e=f.S("_menuall_").childNodes;
insertHTML(f.S("_menuall_"),"beforeEnd",f.constructor._TEMPLATE._SKIN.replace(b,"item"));
}
},delItem:function(b){
var d=this,c=d._getItemDom(b);
if(c)
{
removeSelf(c);
}
},itemOption:function(d,b,c){
var e=this._getItemDom(d);
if(e)
{
switch(b)
{case "bDisSelect":
e.className=(c?"menu_item_nofun":"menu_item");
break;
case "bDisplay":
e.style.display=c?"":"none";
break;
}
}
},close:function(b){
var d=this,c=d._moConfig.onbeforeclose;
if(c&&c.call(d)===false)
{
return;
}
b&&(this._moConfig.bAnimation=false);
d._clearTimeoutOpenSubMenu();
d._closeSubMenu();
return callBack.call(d,a.close);
},autoClose:function(){
return this._closeAllMenu();
},option:function(b,c){
var e=this;
if(typeof c!="undefined")
{
switch(b)
{case "nHeight":
var d=e.S("_menuall_");
d.style.height=typeof c=="number"?(c-(e._moConfig.nGap?e._moConfig.nGap:12)+'px'):c;
break;
case "nX":
e._moConfig.nArrowPos&&(c-=e._moConfig.nArrowPos);
break;
case "nY":
e._moConfig.nArrowPos&&(c+=12);
break;
}return callBack.call(e,a.option,[b,c]);
}
else{
var f=callBack.call(e,a.option,[b]);
switch(b)
{case "nX":
e._moConfig.nArrowPos&&(f+=e._moConfig.nArrowPos);
break;
case "nY":
e._moConfig.nArrowPos&&(f-=12);
break;
}return f;
}
}};
},{makeMenuItem:function(b,a){
var e=[];
for(var c=0,d=a?Math.min(b.length,a.length):b.length;c<d;c++)
{
e.push({sId:a?a[c]:c,sItemValue:b[c]});
}
return e;
},_TEMPLATE:{_SKIN:TE(['$@$if($nArrowPos$>0&&$nArrowDirection$=="Up")$@$','<div class="t_arrow" style="left:$nArrowPos$px;">','<div class="t_arrow_d"></div>','<div class="t_arrow_u"></div>','</div>','$@$else if($nArrowPos$>0&&$nArrowDirection$=="Left")$@$','<div class="c_arrow" style="left:-10px;top:$nArrowPos$px;">','<div class="c_arrow_d"></div>','<div class="c_arrow_u"></div>','</div>','$@$else if($nArrowPos$>0)$@$','<span class="arrow" style="left:$nArrowPos$px;"></span>','$@$endif$@$','<div style="margin:0pt;">','<div class="menu_base">','<div class="menu_bd">','<div id="_menuall_"','style="overflow-y:auto;$@$if(isNaN($mwidth$))$@$width:$@$if(gbIsIE&&$sWidthDetect$!="float")$@$$nMinWidth$px;$@$else$@$auto$@$endif$@$;$@$else$@$overflow-x:hidden;width:$mwidth$px;$@$endif$@$','$@$if($mheight$)$@$height:$mheight$$@$endif$@$$@$if(!isNaN($mheight$))$@$px$@$endif$@$;">','$@$for($oItems$)$@$','$@$sec item$@$','<div $@$if(!$bDisSelect$ & (""+$sItemValue$).indexOf("<") < 0)$@$title="$@$eval htmlEncode($sItemValue$) $@$"$@$endif$@$ id="_menuitem_$sId$" itemid="$sId$" class="menu_item$@$if($bDisSelect$)$@$_nofun$@$endif$@$"','style="height:$nHeight$$@$if(!isNaN($nHeight$))$@$px$@$endif$@$;line-height:$nHeight$$@$if(!isNaN($nHeight$))$@$px$@$endif$@$;$sStyle$" onclick=";">$sItemValue$</div>','$@$endsec$@$','$@$endfor$@$','</div>','<div id="_foot_"','style="overflow-y:auto;$@$if(isNaN($mwidth$))$@$width:$@$if(gbIsIE)$@$$nMinWidth$px;$@$else$@$auto$@$endif$@$;$@$else$@$overflow-x:hidden;width:$mwidth$px;$@$endif$@$','padding-top:3px;border-top:1px solid #ccc;$@$if(!$oFootItems$)$@$display:none;$@$endif$@$height:auto;">','$@$for($oFootItems$)$@$','<div id="_menuitem_$sId$" itemid="$sId$" class="menu_item$@$if($bDisSelect$)$@$_nofun$@$endif$@$"','style="height:$nHeight$px;line-height:$nHeight$px;" onclick=";">$sItemValue$</div>','$@$endfor$@$','</div>','$@$if($nArrowPos$>0)$@$','<a class="btn_close" qmmenuopt="close"  onmousedown="return false;"></a>','$@$endif$@$','</div>','</div>','</div>'])}});
function QMSelect(a)
{
this.constructor=arguments.callee;
this._initialize(a)._setup();
}
QMSelect.prototype={get:function(a){
var b=this;
switch(a=a||1)
{case 1:
case 2:
return b._moSelectItem[a==1?"sItemValue":"sId"];
case 8:
return S(b._msSelectId,b._moWin);
case "menu":
return b._moMenu;
}
},set:function(b,a){
var d=this,c=d._getItem(b,a);
if(!c._customvalue)
{
S(d._moConfig.sId,d._moWin).innerHTML=(d._moSelectItem=c).sItemValue;
}
return d;
},update:function(a){
var b=this;
b.configHelp_(a,b._moConfig);
b.configHelp_(a.oMenu,b._moConfig.oMenu);
b._moConfig=a;
b._moSelectItem=b._getItem(a.sDefaultId,2,1);
b._setup().set(a.sDefaultId,2);
},_getItem:function(b,a,c){
var j=(a==2)?"sId":"sItemValue",f=this._moConfig,g,h=f.oMenu.oItems;
if(f.oMenu.oFootItems)
{
h=h.concat(f.oMenu.oFootItems);
}
for(var d=0,e=h.length;d<e;d++)
{
if(h[d].sId||h[d].sId===0)
{
if(h[d][j]==b)
{
return h[d];
}
else if(c&&!g)
{
g=h[d];
}
}
}
return g||{sItemValue:f.sDefaultItemValue,_customvalue:1};
},configHelp_:function(b,c,a){
for(var d in c)
{
if(a||typeof (b[d])=="undefined"||b[d]==null)
{
b[d]=c[d];
}
}
return b;
},_initialize:function(a){
var b=this;
b._moWin=a.oContainer.ownerDocument.parentWindow||a.oContainer.ownerDocument.defaultView;
b.configHelp_(a,{sDefaultItemValue:"",sId:QMSelect._TEMPLATE._ID_PREFIX+Math.random()});
b._moConfig=a;
b._moSelectItem=b._getItem(a.sDefaultId,2,!a.sDefaultItemValue);
return this;
},_setup:function(){
var d=getTop(),c=this,a=c._moConfig,b=S(a.sId,c._moWin);
if(!b)
{
if(a.sName)
{
insertHTML(a.oContainer,"beforeEnd",QMSelect._TEMPLATE._CUSTOM_HIDDEN.replace(a));
}
insertHTML(a.oContainer,"beforeEnd",QMSelect._TEMPLATE._CUSTOM_SELECT.replace(extend(a,{content:c._moSelectItem.sItemValue,images_path:getPath("image")})));
}
if(!(b=S(a.sId+"_div",c._moWin)))
{
return;
}
c.configHelp_(a.oMenu,{oEmbedWin:c._moWin,sId:"select",sWidthDetect:(a.content=="\u79FB\u52A8\u5230...")?"float":"",nWidth:b.clientWidth+3,nMinWidth:b.clientWidth+3,onitemclick:function(e){
if(a.sName)
{
S(a.sName,c._moWin).value=e;
}
if(!callBack.call(c,a.onselect,[c._getItem(e,2)]))
{
c._moSelectItem=c._getItem(e,2);
c.set(e,2);
}
callBack.call(c,a.onchange,[c._getItem(e,2)]);
},onshow:function(){
var e=c._moSelectItem.sId;
if(e||e===0)
{
this.selectItem(e);
}
},onload:function(){
var p=this,q=calcPos(b),n=bodyScroll(c._moWin,'clientHeight'),o=bodyScroll(c._moWin,'scrollTop'),g=n+o;
callBack.call(c,a.onafteropenmenu,[p,b]);
var h=parseInt(p.option("nHeight")),m=q[2],l=b.offsetHeight,k=m-h-l,e=true;
if(a.oMenu.bAutoItemView)
{
var f=n/2+o,j;
if(a.oMenu.nMaxHeight)
{
j=Math.min(h,a.oMenu.nMaxHeight);
if(m>f&&m-j-l>0)
{
m=m-j-l;
e=false;
}
}
else if(m<f)
{
j=Math.floor((g-m)*0.66);
}
else if(m+h<g)
{
j=h;
}
else{
j=Math.floor((n-(g-m+l))*0.66);
m=m-Math.min(h,j)-l;
e=false;
}
if(h>j)
{
p.option("nHeight",j);
}
}
else if(k>0&&m+h>g)
{
m=k;
}
if(a.oMenu.bOverLap)
{
m+=e?-1:1;
}
p.option("nX",q[3]).option("nY",m);
}});
addEvent(c._moWin.document.body,(gbIsIE?"mousewheel":"DOMMouseScroll"),function(){
d.QMMenu("select","close");
});
b.onclick=function(){
callBack.call(c,a.onbeforeopenmenu,[a.oMenu]);
c._moMenu=new d.QMMenu(a.oMenu);
};
return c;
}};
QMSelect._TEMPLATE={_CUSTOM_SELECT:T(['<div id="$sId$_div" class="bd" ',' style="border-width:1px 2px 2px 1px;cursor:pointer;width:$nWidth$px;padding:1px 1px 1px 2px;background:#fff;float:left;$sStyle$">','<div class="attbg" style="width:16px;height:18px;overflow:hidden;text-align:center;float:right;"><img src="$images_path$webqqshow_on.gif" align="absmiddle" style="margin:3px 0 0 0;" /></div>','<div id="$sId$" class="txtflow" style="padding-left:3px;padding-left:3px!important;line-height:16px;height:18px;">$content$</div>','</div>']),_CUSTOM_HIDDEN:T('<input type="hidden" id="$sName$" name="$sName$" value="$sDefaultId$"/>'),_ID_PREFIX:"QmCs_2_"};
var QMAutoComplete=inherit("QMAutoComplete",Object,function(a){
return {$_constructor_:function(b){
this._initialize(b);
},show:function(b){
var c=this;
c._moData=b;
return c._show();
},close:function(){
var b=this;
b._moMenu&&b._moMenu.hide();
return b;
},isShow:function(){
var b=this._moMenu;
return b&&b.isShow();
},getSelection:function(){
return this._moData[this._moMenu.getSelectItemId()];
},setHeader:function(b){
var c=this._moMenu;
return c&&c.setHeader(b);
},_initialize:function(b){
var d=this,c=d._moInput=b.oInput;
d._moPosObj=b.oPosObj||c;
d._moWin=d._moPosObj.ownerDocument.parentWindow||d._moPosObj.ownerDocument.defaultView;
d._moData=null;
d._moMenu=null;
d._msDefaultValue=b.defaultValue||"";
d._mbsupportKey=!(b.notSupportKey||0);
d._msType=b.type||"";
c.setAttribute("autocomplete","off");
d._msUrl=b.sUrl;
d._ondata=b.ondata;
d._nDelay=d._msUrl?500:20;
d._nDelay=(typeof b.nDelay=="number")?b.nDelay:d._nDelay;
d._ongetdata=b.ongetdata;
d._onselect=b.onselect;
d._onclick=b.onclick;
d._onkeydown=b.onkeydown;
d._ontouchstart=b.ontouchstart;
addEvents(c,{keydown:d._bind(d._keydown),keypress:d._bind(d._keypress),keyup:d._bind(d._keyup),focus:d._bind(d._focus),blur:d._bind(d._blur)});
d._moMenu=new QMAutoComplete._QMAutoCompleteMenu({sId:unikey(),oItems:[],supportKey:d._mbsupportKey,oEmbedWin:d._moWin,nWidth:b.nWidth||"auto",nMinWidth:b.nMinWidth||100,nItemHeight:b.nItemHeight||21,nMaxItemView:b.nMaxItemView||0,type:b.type,oClass:b.oClass,bDisplay:false,onselect:function(e){
callBack.call(d,d._onselect,[d._moData[e]]);
},onclick:function(e,f){
callBack.call(d,d._onclick,[e,d._moData[f]]);
},ontouchstart:function(e){
callBack.call(d,d._ontouchstart,[e]);
}});
return d._setTextDefaultValue();
},_bind:function(b){
var c=this;
return function(d){
return b.call(c,d);
};
},_keypress:function(b){
if(gbIsOpera&&b.keyCode==13)
{
preventDefault(b);
}
},_keyup:function(b){
if(!b.ctrlKey)
{
var c=b.keyCode,d=this;
if(!(c==38||c==40||(c==13&&d._mnKeydownCode!=229)||c==27))
{
d._keyupTimeout&&clearTimeout(d._keyupTimeout);
d._keyupTimeout=setTimeout(function(){
if(d._msUrl)
{
var e=trim(d._moInput.value);
if(e=="")
{
d.close();
}
else{
e=encodeURIComponent(e);
QMAjax.send([d._msUrl,"&resp_charset=UTF8&q=",e].join(""),{method:"get",onload:function(f,g){
if(f)
{
d._moData=d._ondata.call(d,g);
d._show()._keyupTimeout=0;
}
}});
}
}
else{
d._moData=d._ongetdata(d._moInput,c);
d._show()._keyupTimeout=0;
}
},d._nDelay);
}
}
},_keydown:function(b){
var d=this,c=b.keyCode;
callBack.call(d,d._onkeydown,[b,1]);
d._mnKeydownCode=c;
if(d.isShow()&&this._mbsupportKey)
{
switch(c)
{case 13:
callBack.call(d,d._onselect,[d.getSelection()]);
d.close();
preventDefault(b);
break;
case 38:
d._moMenu.selectItem(-1);
preventDefault(b);
break;
case 40:
d._moMenu.selectItem(1);
preventDefault(b);
break;
case 9:
callBack.call(d,d._onselect,[d.getSelection()]);
d.close();
break;
case 27:
d.close();
preventDefault(b);
break;
}
}
callBack.call(d,d._onkeydown,[b,0]);
},_focus:function(b,c){
var d=this;
d._mbFocus=true;
c&&d._moInput.focus();
d._setTextDefaultValue();
},_blur:function(b){
var c=this;
c._mbFocus=false;
setTimeout(function(){
!c._mbFocus&&c.close()._setTextDefaultValue();
},20);
},_setTextDefaultValue:function(){
var b=this;
if(b._msDefaultValue)
{
var c=b._moInput,e=c.value;
if(b._mbFocus)
{
if(e==b._msDefaultValue)
{
var d=c.className.replace(/graytext/ig,"");
if(this._msType=="rss")
{
d=d.replace(/textInput/ig," textInput2");
}
c.className=d;
c.value="";
}
}
else{
if(e=="")
{
var d=(this._msType=="rss"?c.className.replace(/textInput2/ig," textInput"):c.className)+" graytext";
c.className=d;
c.value=b._msDefaultValue;
}
}
}
return b;
},_show:function(){
var c=this;
if(!c._moData||c._moData.length==0)
{
c.close();
}
else{
var b=calcPos(c._moPosObj);
c._moMenu.setContent({oItems:c._moData}).option("nX",b[3]).option("nY",b[2]);
}
return c;
}};
});
QMAutoComplete._QMAutoCompleteMenu=inheritEx("QMAutoCompleteMenu",QMPanel,function(a){
return {processHtml_:function(b){
return b;
},initMemVar_:function(b){
callBack.call(this,a.initMemVar_,[b]);
if(b.supportKey)
{
this._selectItemWithId(this._mnSelectItem=0);
}
},setEvent_:function(){
var c=this._moConfig,e=this,d=this.S("_menuall_"),f=this.S("_title_"),b=function(g){
var g=g||c.oEmbedWin.event,h=getEventTarget(g);
while(h&&h!=d&&h.parentNode!=d)
{
h=h.parentNode;
}
return h;
};
if(c.supportKey)
{
d.onmouseover=function(g){
if(now()-(e._mnRenderTime||0)>500)
{
var j=b(g),h=parseInt(j.id.substr(e._msPanelId.length+1));
if(!isNaN(h))
{
e._selectItemWithId(h);
}
}
};
f.onclick=function(g){
var g=g||c.oEmbedWin.event;
callBack.call(e,c.onclick,[g,""]);
};
d.onclick=function(g){
var h=b(g),j=h.getAttribute("key");
callBack.call(e,c.onclick,[g,j]);
if(j)
{
callBack.call(e,c.onselect,[j]);
setClass(h,"menu_item");
if(c.type!="rss")
{
e.hide();
}
}
};
}
addEvents(this._moPanelDom,{mousedown:preventDefault,touchstart:function(g){
callBack.call(e,c.ontouchstart,[g]);
}});
},dfConfig_:function(b){
var d=b.oItems,c=(b.nItemHeight||21)*(b.nMaxItemView||d.length);
this.configHelp_(b,{mheight:c,nWidth:"auto",nHeight:c,nZIndex:1121});
this.configHelp_(b,{sStyle:"background:#fff"},true);
return callBack.call(this,a.dfConfig_,[b]);
},genItemCode_:function(b){
var f=b.oItems,e=[],d=this._moConfig,g=(d&&d.oClass&&d.oClass.classnormal)?d.oClass.classnormal:"menu_item";
this._mnItemLen=0;
for(var j=0,c=f.length;j<c;j++)
{
e.push('<div unselectable="on" style="height:',f[j].nItemHeight||b.nItemHeight,'px;" onclick=";" ');
var h=f[j].sId;
if(h||h===0)
{
e.push('key="',j,'" id="',this._msPanelId,'_',this._mnItemLen++,'" class="',g,'" >');
}
else{
e.push('class="menu_item_onfun">');
}
e.push(f[j].sItemValue,'</div>');
}
return e;
},insertHtml_:function(b){
var d=b.oItems,c=['<div style="margin:0px;">','<div class="menu_base">','<div class="menu_bd bd" style="padding:0;">','<div unselectable="on" id="',this._msPanelId,'__title_" style="white-space:nowrap;width:',b.nMinWidth,'px;line-height:',b.nItemHeight,'px;',(b.header?'':'display:none;'),'">',b.header,'</div>','<div unselectable="on" id="',this._msPanelId,'__menuall_" style="overflow-y:auto;height:auto;line-height:',b.nItemHeight,'px;width:'];
if(b.nWidth=="auto")
{
c.push(!getTop().gbIsIE?b.nMinWidth+"px":"auto");
}
else{
c.push(b.nWidth-(getTop().gbIsIE?0:2),"px;overflow-x:hidden;");
}
c.push('">');
c=c.concat(this.genItemCode_(b));
c.push('</div></div></div></div>');
b.sBodyHtml=c.join("");
callBack.call(this,a.insertHtml_,[b]);
},adjustSize_:function(b,c){
var d=this._moConfig.nMaxItemView||this._moConfig.oItems.length,e=this._mnItemLen<=d?"auto":this._moConfig.nItemHeight*d;
this.option("nHeight",e);
b.style.height=e=="auto"?"auto":e+"px";
if(this._moConfig.nWidth!="auto")
{
if(b.style.width!=this._moConfig.nWidth)
{
c.style.width=b.style.width=this._moConfig.nWidth-(getTop().gbIsIE?0:2)+"px";
}
}
else{
if(gnIEVer>6&&b.ownerDocument.documentElement.clientHeight)
{
c.style.width=b.style.width="auto";
}
if(b.offsetWidth>10)
{
c.style.width=b.style.width=(Math.max(b.offsetWidth,c.offsetWidth,this._moConfig.nMinWidth)+(gbIsIE?(gnIEVer>6?18:0):b.offsetWidth-b.scrollWidth))+"px";
}
}
},setHeader:function(b){
if(b)
{
this.S("_title_").innerHTML=this.processHtml_(b);
show(this.S("_title_"),1);
}
else if(b=="")
{
show(this.S("_title_"),0);
}
},setContent:function(b){
var d=this,c=d.S("_menuall_"),e=d.S("_title_");
this.configHelp_(d._moConfig,b,true);
if(d._moConfig.nWidth=="auto")
{
e.style.width=c.style.width=gbIsIE&&gnIEVer!=7?d._moConfig.nMinWidth+"px":"auto";
}
d.setHeader(b.oItems.header);
c.innerHTML=d.genItemCode_(b).join("");
if(d._moConfig.supportKey)
{
d.selectItem(d._mnSelectItem=0);
}
d.show();
d.adjustSize_(c,e);
callBack.call(d,d._moConfig.onload,[b]);
d._mnRenderTime=now();
return d;
},selectItem:function(b){
var d=this,c=d._selectItemWithId((d._mnSelectItem+b+d._mnItemLen)%d._mnItemLen);
scrollIntoMidView(c,d.S("_menuall_"));
},getSelectItemId:function(){
var b=this.S(this._mnSelectItem);
return b&&b.getAttribute("key");
},_selectItemWithId:function(b){
var d=this.S(this._mnSelectItem),c=this._moConfig,e=(c&&c.oClass&&c.oClass.classnormal)?c.oClass.classnormal:"menu_item",f=(c&&c.oClass&&c.oClass.classhigh)?c.oClass.classhigh:"menu_item_high";
if(d)
{
d.className=e;
}
if(d=this.S(b))
{
d.className=f;
this._mnSelectItem=b;
}
return d;
}};
});
function _AjaxSendMailMgr(a)
{
a._oQuery.push('&t=mail_mgr2&resp_charset=UTF8&ef=js&sid=',getSid(),getTop().bnewwin?'&newwin=true':'');
QMAjax.send(a._sUrl||'/cgi-bin/mail_mgr',{content:a._oQuery.join(""),onload:function(b,d,c){
var f=d.indexOf(a._sSuccessMask)>=0,e=d.indexOf("cgi exception")>=0;
if(b&&(f||e))
{
var g=evalValue(d);
if(e)
{
showError(filteScript(g.errmsg));
}
else{
a._fOnload(g,d,c);
}
}
else if(a._sDefErrMsg)
{
showError(a._sDefErrMsg);
}
}});
}
var QMMailList={};
QMMailList.getCBInfo=function(a,b){
var c={oMail:[],oWin:a,sFid:a.location.getParams()['folderid'],bML:true};
E(GelTags("input",S('list',a)),function(d){
if(d.title=="\u9009\u4E2D/\u53D6\u6D88\u9009\u4E2D")
{
c.oACB=d;
}
else if(d.type=="checkbox"&&d.name=="mailid"&&(b&&d.value==b||!b&&d.checked))
{
var q=d.value,k=d.parentNode;
while(k.tagName.toUpperCase()!="TABLE")
{
k=k.parentNode;
}
var p=k.rows[0].cells,n=p[p.length-1],j=GelTags("input",n)[0],h=CN("fg",n,"td")[0],m=GelTags("table",n),s,l=[],g={};
for(var e=0,f=m.length;e<f;e++)
{
if(s=m[e].getAttribute("tagid"))
{
l.push(s);
}
}
g.sMid=q;
g.bSys=j&&{"s1bg":1}[j.className];
g.bDft=j&&{"drifticon":1}[j.className];
g.bUnr=d.getAttribute("unread")=="true";
g.bStar=h.className=="fg fs1";
g.bBsm=d.getAttribute("bsm")=="true";
g.bTms=d.getAttribute("isendtime")==1;
g.oTagIds=l;
g.sSName=d.getAttribute("fn");
g.sSEmail=d.getAttribute("fa");
g.sColId=d.getAttribute("colid");
var r=d.getAttribute("rf");
g.oTable=k;
g.oStar=h;
g.oChk=d;
c.oMail.push(g);
var o=GelTags('div',n);
for(var e=0,f=o.length;e<f;e++)
{
if(o[e].className=='TagDiv')
{
g.oTCont=o[e];
break;
}
}
}
});
return c;
};
QMMailList.selectedUI=function(a){
var e=getMainWin(),d={},b=false;
if(e.location.href.indexOf('/cgi-bin/mail_list')<0)
{
return;
}
for(var c=a.oMail,f=c.length-1;f>=0;f--)
{
d[c[f].sMid]=1;
}
a=a||this.getCBInfo(e);
E(SN("mailid",e),function(g){
if(g.type=="checkbox")
{
var h=g.value in d,k=g.getAttribute('unread')=='true'&&a.sFid!=4,l=g;
while(l.tagName.toUpperCase()!="TABLE")
{
l=l.parentNode;
}
if(l.style.backgroundColor!="")
{
l.style.backgroundColor="";
}
setClass(l,[k?"i F":"i M",h?" B":""].join(""));
setClass(GelTags("table",l)[0],k?"i bold":"i");
var m=g.getAttribute("isendtime"),n=g.getAttribute("rf");
var j=finds(".cir",l)[0].className.indexOf("Mu")>0;
setClass(GelTags("div",l.rows[0].cells[1])[1],'cir '+((k?'Ru':'')||{0:'Rc',1:'Ti'}[m]||{r:'Rh',f:'Rz'}[n]||(k?'':'Rr'))+(j?" Mu":""));
g.checked=h;
b=b||h;
}
});
if(!b&&a.oACB)
{
a.oACB.checked=b;
}
};
QMMailList._singleAddrNick=function(a){
for(var f=null,g=null,b=a.oMail,h=b.length-1;h>=0;h--)
{
var c=b[h],e=c.sSName,d=c.sSEmail;
if(g!=e)
{
g=g===null?e:'';
}
if(f!=d)
{
f=f===null?d:'';
}
}
return [f,g];
};
function BaseMailOper(a)
{
var b=this;
b._init(b._moConfig=a);
}
BaseMailOper._craeteInstance=function(b){
var a=BaseMailOper,c=b.oWin;
if(!a.getInstance(c))
{
new a(b);
}
return a.getInstance(c);
};
BaseMailOper.getInstance=function(a){
return a["__gBmOi_"];
};
BaseMailOper.prototype={_init:function(a){
var c=this,d=a.oWin,b=d.location,e=b.href;
if(e.indexOf("/cgi-bin/mail_list")>0)
{
a._mnFolderType=0;
}
else if(e.indexOf("t=readmail_conversation")>0)
{
a._mnFolderType=2;
}
else if(e.indexOf("readmail_group.html")>0)
{
a._mnFolderType=3;
}
else{
a._mnFolderType=1;
}
a.bAutoTag=b.getParams()['folderid']==1||a.sFolderid==1||a.bAutoTag;
d["__gBmOi_"]=c;
return c;
},getConfig:function(){
return this._moConfig;
},setMailInfo:function(a){
this._moConfig._moSelectMailInfo=a;
},getMailInfo:function(){
return this._moConfig._moSelectMailInfo;
},apply:function(a,b){
var f=this,c=f._moConfig,e=c._moSelectMailInfo,g=c.oWin;
switch(a)
{case "mark":
case "move":
case "preview":
return false;
case "new":
configPreRmMail(e,'moveMailJs');
if(getLeftWin()["SwiTchFoLdErComM_gLoBaldATa"]&&getLeftWin()["SwiTchFoLdErComM_gLoBaldATa"].match(/folder_.*/))
{
e.sSelectFolderId="personal";
for(var k=0;k<getTop().originUserFolderNodes.length;k++)
{
if(getTop().originUserFolderNodes[k].id==getLeftWin()["SwiTchFoLdErComM_gLoBaldATa"].replace("folder_",""))
{
e.sSelectFolderId=getLeftWin()["SwiTchFoLdErComM_gLoBaldATa"].replace("folder_","");
break;
}
}
}
moveMailJs('new','',e.sFid,e);
break;
case "new_folderlock":
showError('\u8BF7\u5148\u4E3A\u201C\u6211\u7684\u6587\u4EF6\u5939\u201D\u89E3\u9501');
break;
case "delmail":
configPreRmMail(e,'rmMail');
rmMail(0,e);
break;
case 'predelmail':
configPreRmMail(e,'rmMail');
rmMail(1,e);
break;
case 'frwmail':
e.oWin.FwMailML();
break;
case 'spammail':
configPreRmMail(e,'spammail');
reportSpamJson({bBlackList:true},e);
break;
case "read":
case "unread":
setMailRead(a=="unread",e);
break;
case "star":
case "unstar":
starMail(a=="star",e,"toolbar");
break;
case "rmalltag":
QMTag.rmTag('',e);
break;
case "newtag":
QMTag.newMailTag(e);
break;
case 'autotag':
QMTag.setMailAutoTag(e);
break;
case 'createreceiverule':
getTop().ossLog("delay","all","stat=donothing&locval=maillist,clickcreatereceiverule,,1,1");
showSimpleRuleFilter(e&&e.oMail&&e.oMail[0]&&e.oMail[0].sSEmail,"mail_list");
break;
case 'newwintoread':
for(var k=0;k<e.oMail.length;k++)
{
var d=CN('cir',e.oMail[k].oTable,'div')[0];
d.click();
}
break;
default:
if(/fid_(.+)/.test(a))
{
configPreRmMail(e,'moveMailJs');
var j=RegExp.$1;
moveMailJs(j,b,e.sFid,e);
}
else if(/tid_(.+)/.test(a))
{
var h=RegExp.$1;
QMTag.setMailTag(h,e);
}
break;
}return true;
}};
var QMTag={_msTimeStamp:"",_moTagData:{},_moTagIndex:[]};
QMTag.set=function(a,b){
var e=this;
if(!b||b>e._msTimeStamp)
{
b&&(e._msTimeStamp=b);
e._moTagIndex=[];
e._moTagData={};
for(var c=0,d=a.length;c<d;c++)
{
var f=a[c],g=f.id,h;
if(g!=h)
{
e._moTagIndex.push(g);
e._moTagData[g]=f;
f._mnIndex=c;
}
}
}
};
QMTag.get=function(){
for(var d=[],e=this,c=e._moTagIndex,a=0,b=c.length;a<b;a++)
{
d.push(e._moTagData[c[a]]);
}
return d;
};
QMTag.setItem=function(b,a,c){
var d=this._moTagData;
if(d[b])
{
d[b][a]=c;
}
};
QMTag.getItem=function(b,a){
var c=this._moTagData[b];
return c&&a?c[a]:c;
};
QMTag._disposeResponse=function(_asParam){
try{
var _oResult=eval(_asParam);
_oResult.mailids.length--;
_oResult.taglist.length--;
QMTag.set(_oResult.taglist,_oResult.timestamp);
}
catch(e)
{
}
return _oResult;
};
QMTag.setMailTag=function(b,a){
var e=a.oMail,d=e.length,c=0,g=['mailaction=mail_tag&fun=add&tagid=',b];
if(!d)
{
return showError('\u672A\u9009\u4E2D\u4EFB\u4F55\u90AE\u4EF6');
}
for(var k=0;k<d;k++)
{
var f=e[k],j=f.sMid;
if(QMTag.addTagUI(f.oTCont,b,a.sFid,j,!a.bML))
{
c++;
g.push('&mailid=',j);
rdVer(j,1);
QMMailCache.addData(j,{addTagId:b});
if(f.bUnr)
{
var h='tag_'+b;
setTagUnread(h,getFolderUnread(h)+1);
if(!f.oTagIds.length)
{
setTagUnread('tag',getFolderUnread('tag')+1);
}
}
}
}
QMMailList.selectedUI({oMail:[],oACB:a.oACB});
if(c)
{
_AjaxSendMailMgr({_oQuery:g,_sSuccessMask:'mail_tag successful',_sDefErrMsg:'\u8BBE\u7F6E\u6807\u7B7E\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5',_fOnload:function(n,m,l){
var n=QMTag._disposeResponse(m),o=a.oWin;
if(o.QMReadMail)
{
o.QMReadMail.modifyTag(b,0);
}
return;
}});
}
};
QMTag.newMailTag=function(a){
promptFolder({type:'tag',onreturn:function(b){
var d=a&&a.oMail,c=d&&d.length,e=['&mailaction=mail_tag&fun=add&tagname=',encodeURI(b)];
for(var f=0;f<c;f++)
{
e.push('&mailid=',d[f].sMid);
}
_AjaxSendMailMgr({_oQuery:e,_sSuccessMask:'mail_tag successful',_sDefErrMsg:'\u521B\u5EFA\u6807\u7B7E\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5',_fOnload:function(k,h,g){
showInfo("\u6807\u7B7E\u521B\u5EFA\u6210\u529F");
var l=a&&a.oWin.QMReadMail;
if(l)
{
rdVer(l.getMailId(),1);
return reloadFrmLeftMain(true,true);
}
else if(!a)
{
return reloadFrmLeftMain(true,true);
}
var k=QMTag._disposeResponse(h);
QMMailList.selectedUI({oMail:[],oACB:a.oACB});
for(var m=0;m<c;m++)
{
var j=d[m];
QMTag.addTagUI(j.oTCont,k.newtag.id,a.sFid,j.sMid,!a.bML);
}
reloadFrmLeftMain(true,false);
}});
}});
};
QMTag._autoTagOldMail=function(_asFilterId,_abMailList){
confirmBox({title:"\u6536\u4FE1\u89C4\u5219",msg:"\u5BF9\u4E8E\u6536\u4EF6\u7BB1\u4E2D\u7B26\u5408\u6761\u4EF6\u7684\u5DF2\u6709\u90AE\u4EF6\uFF0C\u60A8\u662F\u5426\u4E5F\u8981\u6807\u4E0A\u6B64\u6807\u7B7E\uFF1F",confirmBtnTxt:'\u662F',cancelBtnTxt:'\u5426',onreturn:function(_abIsOk){
if(_abIsOk)
{
_AjaxSendMailMgr({_oQuery:['&fun=AutoTag&mailaction=mail_filter&filterid=',_asFilterId],_sSuccessMask:'mail_tag successful',_sDefErrMsg:'\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5',_fOnload:function(_oResult,_asParam,_aoXmlObj){
var _oResult=eval(_asParam);
if(_oResult.count)
{
reloadFrmLeftMain(1,1);
}
return showInfo(T(_oResult.count?"\u64CD\u4F5C\u6210\u529F\uFF0C\u6807\u8BB0\u4E86$count$\u5C01\u90AE\u4EF6\u3002<a href='/cgi-bin/mail_list?sid=$sid$&folderid=all&tagid=$tagid$'  style='color:white' onclick='getTop().hiddenMsg();' target='mainFrame'>[\u67E5\u770B]</a>":"\u64CD\u4F5C\u6210\u529F\uFF0C\u60A8\u6CA1\u6709\u9700\u8981\u79FB\u52A8\u6216\u6807\u8BB0\u7684\u90AE\u4EF6\u3002").replace(_oResult),30000);
}});
}
else{
reloadFrmLeftMain(1,!_abMailList);
}
}});
};
QMTag.setMailAutoTag=function(a){
var e=a.oMail,b=false,d=/[~!#\$%\^&\*\(\)=\+|\\\[\]\{\};\':\",\?\/<>]/ig,f=['&mailaction=mail_tag&Fun=AutoTag'];
for(var c=e.length-1;c>=0;c--)
{
if(e[c].bSys)
{
return showError('\u7CFB\u7EDF\u90AE\u4EF6\u4E0D\u80FD\u65B0\u5EFA\u81EA\u52A8\u6807\u7B7E');
}
f.push('&mailid=',e[c].sMid);
}
confirmBox({mode:"prompt",width:597,height:242,title:'\u65B0\u5EFA\u81EA\u52A8\u6807\u7B7E',msg:['<div style="_margin-top:8px;">','<div style="margin-bottom:10px;"><strong>\u5BF9\u4E8E\u53D1\u4EF6\u4EBA</strong><input type="text" id="addr" style="width:300px;margin-left:60px;"/></div>','<div style="margin-bottom:10px;"><b>\u6765\u4FE1\u81EA\u52A8\u6807\u4E3A\u6807\u7B7E</b><input type="text" id="name" style="width:300px;margin-left:15px;"/></div>','<div class="graytext" style="margin-bottom:10px;">\u8BE5\u53D1\u4EF6\u5730\u5740\u7684\u6765\u4FE1\uFF0C\u4F1A\u81EA\u52A8\u52A0\u4E0A\u6807\u7B7E\uFF0C\u4FBF\u4E8E\u60A8\u8BC6\u522B\u548C\u7BA1\u7406\u90AE\u4EF6\u3002</div>','</div>'].join(''),onload:function(){
var g=this;
addEvents([g.S("addr"),g.S("name")],{keydown:function(h){
if(h.keyCode==13)
{
b=true;
g.close();
}
}});
},onshow:function(){
var g=this,j=a._moSelectMailInfo,h=QMMailList._singleAddrNick(a),l=h[1],k=h[0];
if(!l||!k)
{
g.S('addr').focus();
}
else{
g.S('addr').value=k.split(',')[0];
g.S('name').value=trim(htmlDecode(l).split(/[,@]/)[0].replace(d,''))+"\u7684\u6765\u4FE1";
}
},onreturn:function(g){
var j=this,k=trim(j.S('addr').value),l=trim(j.S('name').value);
if(!g&&!b)
{
return;
}
if(!k)
{
return showError('\u8BF7\u8F93\u5165\u53D1\u4EF6\u4EBA\u540D\u79F0\u6216\u5730\u5740');
}
var h=getAsiiStrLen(l);
if(h==0||h>50)
{
return showError(h?"\u6807\u7B7E\u540D\u79F0\u592A\u957F\uFF0C\u8BF7\u4F7F\u7528\u5C11\u4E8E50\u4E2A\u5B57\u7B26(25\u4E2A\u6C49\u5B57)\u7684\u540D\u79F0":'\u8BF7\u8F93\u5165\u6807\u7B7E\u540D\u79F0');
}
if(d.test(l))
{
return showError('\u6807\u7B7E\u540D\u79F0\u4E0D\u80FD\u5305\u542B ~!#$%^&*()=+|\\[]{};\':",?/<> \u7B49\u5B57\u7B26');
}
f.push('&sender=',encodeURI(k),'&tagname=',encodeURI(l));
_AjaxSendMailMgr({_sUrl:'/cgi-bin/setting2',_oQuery:f,_sSuccessMask:'mail_tag successful',_sDefErrMsg:'\u8BBE\u7F6E\u81EA\u52A8\u6807\u7B7E\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5',_fOnload:function(p,n,m){
showInfo("\u8BBE\u7F6E\u81EA\u52A8\u6807\u7B7E\u6210\u529F\uFF0C\u901A\u8FC7\u6536\u4FE1\u89C4\u5219\uFF0C\u6765\u4FE1\u5C06\u81EA\u52A8\u6807\u4E0A\u6807\u7B7E\u3002");
var q=a.oWin,p=QMTag._disposeResponse(n);
if(!a.bML&&q.QMReadMail)
{
rdVer(q.QMReadMail.getMailId(),1);
}
else{
QMMailList.selectedUI({oMail:[],oACB:a.oACB});
for(var r=e.length-1;r>=0;r--)
{
var o=e[r];
QMTag.addTagUI(o.oTCont,p.newtag.id,a.sFid,o.sMid,!a.bML);
}
}
QMTag._autoTagOldMail(p.filterid,a.bML);
return;
}});
}});
};
QMTag.rmTag=function(b,a){
var e=a.oMail,d=e.length,c=0,g=['&mailaction=mail_tag&fun=del'];
if(!d)
{
return showError('\u672A\u9009\u4E2D\u4EFB\u4F55\u90AE\u4EF6');
}
if(b)
{
g.push('&tagid=',b);
}
for(var l=e.length-1;l>=0;l--)
{
if(QMTag.rmTagUI(e[l].oTCont,b))
{
c++;
var f=e[l],k=f.sMid;
g.push('&mailid=',k);
rdVer(k,1);
QMMailCache.addData(k,{removeTagId:b});
if(f.bUnr)
{
var h=b?f.oTagIds:[b];
if(b)
{
var j='tag_'+b;
setTagUnread(j,getFolderUnread(j)-1);
}
else{
E(f.oTagIds,function(m){
var n='tag_'+m;
setTagUnread(n,getFolderUnread(n)-1);
});
}
if(f.oTagIds.length==1||!b)
{
setTagUnread('tag',getFolderUnread('tag')-1);
}
}
}
}
QMMailList.selectedUI({oMail:[],oACB:a.oACB});
if(c)
{
_AjaxSendMailMgr({_oQuery:g,_sSuccessMask:"mail_tag successful",_sDefErrMsg:T(['\u79FB\u9664\u6807\u7B7E\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5']),_fOnload:function(o,n,m){
QMTag._disposeResponse(n);
}});
}
};
QMTag.rmTagUI=function(a,b){
if(b)
{
for(var d=GelTags("table",a),c=d.length-1;c>=0;c--)
{
if(d[c].getAttribute("tagid")==b)
{
removeSelf(d[c]);
return true;
}
}
}
else{
a.innerHTML='';
return true;
}
return false;
};
QMTag.addTagUI=function(b,e,c,d,a){
for(var g=GelTags("table",b),f=g.length-1;f>=0;f--)
{
if(g[f].getAttribute('tagid')==e)
{
return false;
}
}
var h=TE(['<table cellspacing="0" cellpadding="0" border="0" class="tagleftDiv flagbg$flagbg$" tagid="$id$">','<tr>','<td class="falg_rounded">\n','</td>','<td colspan="2">\n','</td>','<td class="falg_rounded">\n','</td>','</tr>','<tr>','<td>\n','</td>','<td class="tagbgSpan" tid2="$id$">','<span>\u4E2Da</span>$name$<span>\u4E2Da</span>','$@$if($t$=="mail_list")$@$<div class="closeTagSideDiv flagbg$flagbg$" style="display:none" title="\u53D6\u6D88\u6B64\u6807\u7B7E" tid2="$id$">&nbsp;&nbsp;&nbsp;</div>$@$endif$@$','</td>','$@$if($t$!="mail_list")$@$<td title="\u53D6\u6D88\u6B64\u6807\u7B7E" class="closeTagDiv $disclose$" tid2="$id$">&nbsp;</td>$@$endif$@$','<td>\n','</td>','</tr>','<tr>','<td class="falg_rounded">\n','</td>','<td colspan="2">\n','</td>','<td class="falg_rounded">\n','</td>','</tr>','</table>']).replace(extend({t:a?"readmail":"mail_list",folderid:c,mailid:d||""},QMTag.getItem(e)));
insertHTML(b,"beforeEnd",h);
return true;
};
QMTag.showTagClose=function(b,a){
function d(g,f)
{
try{
for(var j=GelTags("div",g),h=j.length-1;h>=0;h--)
{
if(j[h].className.indexOf("closeTagSideDiv")>-1)
{
show(j[h],f);
return;
}
}
}
catch(k)
{
}
}
var c=arguments.callee;
if(c._mnTimeout)
{
clearTimeout(c._mnTimeout);
}
if(c._moTable!=b)
{
d(c._moTable,0);
}
c._moTable=b;
c._mnTimeout=setTimeout(function(){
d(b,a);
},a?500:100);
};
function colorTag(a,d,c)
{
a=a||c.event;
stopPropagation(a);
preventDefault(a);
var r="tag"+d,e=QMMenu(r,"isClose");
if(e===false)
{
return;
}
var b=getEventTarget(a),f=function(s){
return /\bflagbg(\d+)\b/.test(s)&&RegExp.$1;
},l=f(b.className),n=T(['<div class="flag_menu_item"><div id="flagbg$flagbg$" class="flagbg$flagbg$"></div></div>']),p=[['0','1','2','3','4'],['5','6','7','8','9'],['11','12','13','14','15'],['16','17','18','19','20'],['21','22','23','24','25'],['26','27','28','29','30'],['31','32','33','34','35']],m={nHeight:5,sItemValue:'<div style="height:1px; overflow:hidden;"></div>'},q=[];
q.push(m);
for(var g=0,h=p.length;g<h;g++)
{
for(var o=[],j=0,k=p[g].length;j<k;j++)
{
o.push(n.replace({flagbg:p[g][j]}));
}
q.push({nHeight:24,sItemValue:o.join("")});
if(g==1)
{
q.push(m);
}
}
q.push(m);
new QMMenu({oEmbedWin:c,sId:r,nWidth:148,oItems:q,onshow:function(){
},onload:function(){
var z=this,A=calcPos(b),u=parseInt(z.option("nHeight")),w=A[2],t=bodyScroll(c,'clientHeight')+bodyScroll(c,'scrollTop'),v=w-u-b.clientHeight;
if(v>0&&w+u>t)
{
w=v;
}
z.option("nX",A[3]).option("nY",w);
var y=z.S("_menuall_"),x=null;
function s(B)
{
var C=getEventTarget(B);
while(C&&C!=y)
{
if(C.id.indexOf("flagbg")>-1)
{
return C;
}
C=C.parentNode;
}
return null;
}
addEvents(y,{mousemove:function(B){
var C=s(B);
if(x)
{
x.parentNode.style.borderColor="#fff";
}
if(x=C)
{
C.parentNode.style.borderColor="#aaa";
}
},click:function(B){
var C=s(B);
if(C)
{
colorTag._apply(d,f(C.className),l,b,c);
z.close();
}
}});
}});
}
colorTag._apply=function(e,a,b,c,d){
var f='\u9009\u62E9\u6807\u7B7E\u989C\u8272\u6210\u529F';
if(a==b)
{
return showInfo(f);
}
QMAjax.send('/cgi-bin/foldermgr',{content:['&fun=setcolor&sid=',getSid(),"&tagid=",e,"&flagbg=",a].join(""),onload:function(g,j,h){
var m=d.location.href,l=getMainWin().location.href;
if(g&&j.indexOf(f)>0)
{
setClass(c,c.className.replace(/\bflagbg\d+\b/i,"flagbg"+a));
if(m.indexOf('t=folderlist_setting')>-1)
{
reloadLeftWin();
}
else{
if(/cgi-bin\/(mail_list|readmail)|t=folderlist_setting/.test(l))
{
reloadFrmLeftMain(false,true);
}
}
return showInfo(f);
}
var k=getErrMsg(h,'msg_txt');
showError(k||"\u6807\u7B7E\u989C\u8272\u8BBE\u7F6E\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
}});
};
QMTag.readclose=function(b,a){
var c=getEventTarget(b),d;
while(c)
{
d=c.className;
if(/closeTag(Side)?Div/.test(d))
{
QMTag.rmTag(c.getAttribute('tid2'),a);
return true;
}
else if(d=='tagbgSpan')
{
readTag(c.getAttribute('tid2'),a.oWin,a.sFid);
return true;
}
c=c.parentNode;
}
return false;
};
function readTag(c,a,b)
{
b=b>100?b:"all";
goUrlMainFrm(T('/cgi-bin/mail_list?sid=$sid$&tagid=$tagid$&folderid=$folderid$&page=0').replace({tagid:c,folderid:b,sid:getSid()}));
}
function setMailRead(a,b)
{
var h=b.oMail,e=h.length,d=0,c=0,f=a?1:-1,l=['mailaction=mail_flag&flag=new&status=',a];
if(!e)
{
return showError('\u672A\u9009\u4E2D\u4EFB\u4F55\u90AE\u4EF6');
}
for(var s=0;s<e;s++)
{
var k=h[s];
if(k.bUnr!=a)
{
if(k.oChk)
{
k.oChk.setAttribute('unread',a?'true':'false');
var r=k.oChk.getAttribute('gid');
setGroupUnread(r,getGroupUnread(r)+f);
}
d++;
if(k.bBsm)
{
c++;
}
l.push('&mailid=',k.sMid);
if(k.oTable&&!a)
{
var m=GelTags("table",k.oTable)[0],o=m.rows[0].cells[1];
if(o.className=="new_g")
{
o.innerHTML="";
}
}
for(var n=k.oTagIds,g=n.length,t=0;t<g;t++)
{
var q='tag_'+n[t];
setTagUnread(q,getFolderUnread(q)+f);
}
if(g)
{
setTagUnread('tag',getFolderUnread('tag')+f);
}
}
}
QMMailList.selectedUI({oMail:[],oACB:b.oACB});
if(c)
{
c=f*c;
setFolderUnread("bsm",getFolderUnread("bsm")+c);
}
if(d)
{
d=f*d;
setFolderUnread(b.sFid,getFolderUnread(b.sFid)+d);
setMailListInfo(getMailListInfo().unread+d,null);
var p=b.oWin;
if(b.sFid==8)
{
setGroupUnread("gall",getGroupUnread("gall")+d);
}
_AjaxSendMailMgr({_oQuery:l,_sSuccessMask:"new successful",_sDefErrMsg:T(['\u8BBE\u7F6E',a?'\u672A\u8BFB':'\u5DF2\u8BFB','\u90AE\u4EF6\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5']),_fOnload:function(y,u,j){
var w=0,v=0;
for(var z=0;z<e;z++)
{
var x=h[z];
if(x.bUnr!=a&&x.bStar)
{
w++;
}
if(!a)
{
QMMailCache.addData(x.sMid);
}
else{
v=1;
}
}
if(v)
{
QMMailCache.setExpire();
}
setFolderUnread("starred",getFolderUnread("starred")+(a?1:-1)*w);
if(p.goback)
{
p.goback();
}
if(/folderid=(pop|personal|all)/i.test(p.location.href))
{
reloadLeftWin();
}
}});
}
}
function starMail(a,b,c)
{
var g=b.oMail,d=g.length,f={fg:0,'fg fs1':1,qm_ico_flagoff:2,qm_ico_flagon:3},l=['fg','fg fs1','qm_ico_flagoff','qm_ico_flagon'],j=['mailaction=mail_flag&flag=star&from_list_page='+c];
if(!d)
{
return showError('\u672A\u9009\u4E2D\u4EFB\u4F55\u90AE\u4EF6');
}
for(var m=0;m<d;m++)
{
var h=g[m];
j.push('&mailid=',h.sMid);
if(a==null)
{
a=!(f[h.oStar.className]&1);
}
}
for(var m=0,e=0;m<d;m++)
{
var h=g[m],k=h.oStar;
if(h.oChk)
{
h.oChk.setAttribute('star',a?'1':'0');
}
if(h.bStar!=a)
{
e+=h.bUnr?1:0;
QMMailCache.addData(h.sMid,{star:a});
rdVer(h.sMid,1);
}
setClass(k,l[(f[k.className]&2)+(a?1:0)]);
k.title=(a?'\u53D6\u6D88':'\u6807\u4E3A')+'\u661F\u6807';
}
if(e)
{
setFolderUnread("starred",getFolderUnread("starred")+(a?1:-1)*e);
}
j.push('&status='+a);
_AjaxSendMailMgr({_oQuery:j,_sSuccessMask:'star successful',_sDefErrMsg:(a?'\u6807\u8BB0':'\u53D6\u6D88')+'\u661F\u6807\u90AE\u4EF6\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5',_fOnload:function(p,o,n){
QMMailList.selectedUI({oMail:[],oACB:b.oACB});
if(!callBack(b.oncomplete,[b,a]))
{
var q=b.oWin;
if(q.showMailFlag)
{
q.showMailFlag(a);
}
}
}});
}
function moveMailJs(b,c,d,a)
{
if(d==b)
{
return showError(gsMsgMoveMailSameFldErr);
}
var g=a.bML,n=a.oMail,k=n.length,s=unikey('mv'),p=[a.bML?'&location=mail_list':''],h=b=="new",f=true,e=false,m=QMMailList._singleAddrNick(a),r=m[1],q=m[0];
for(var t=k-1;t>=0;t--)
{
var o=n[t],l=o.oChk;
if(o.bTms)
{
return showError("\u8BF7\u4E0D\u8981\u9009\u62E9\u5B9A\u65F6\u90AE\u4EF6\uFF0C\u60A8\u4E0D\u80FD\u79FB\u52A8\u5B9A\u65F6\u90AE\u4EF6\u3002");
}
if(l&&/^[@C]/.test(l.value))
{
f=false;
}
e=e||o.bUnr;
p.push('&mailid=',o.sMid);
}
f=f&&d==1&&k>1&&q&&(h||parseInt(b)>128)&&!/(10000|newsletter-noreply|postmaster)@qq.com/g.test(q)&&c&&c!="QQ\u90AE\u4EF6\u8BA2\u9605";
if(f)
{
p.push('&nick=',r,'&addr=',q,'&confirm=1&srcfolderid=',d);
}
a.oWin[s]=1;
var j=function(u){
!a.bIsJump&&showInfo('\u90AE\u4EF6\u79FB\u52A8\u4E2D...',-1);
var v=h?"\u5DF2\u5C06\u90AE\u4EF6\u6210\u529F\u79FB\u52A8":T("\u5DF2\u5C06\u90AE\u4EF6\u6210\u529F\u79FB\u52A8 <a href='/cgi-bin/mail_list?sid=$sid$&folderid=$folderid$&page=0&fromindex=1' style='color:white' onclick='getTop().hiddenMsg();' target='mainFrame' >[\u67E5\u770B]</a>").replace({sid:getSid(),folderid:b});
_AjaxSendMailMgr({_oQuery:p,_sSuccessMask:'mail_move successful',_sDefErrMsg:'\u79FB\u52A8\u90AE\u4EF6\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5',_fOnload:function(B,x,w){
var y;
if(a.oWin[s])
{
y=callBack(a.onbeforesend,[{sucMsg:v}]);
}
var z=callBack(a.oncomplete,[a,B]);
!(y&&z)&&B.msg&&showInfo(B.msg);
if(h)
{
getTop().folderTree.addFolderNode(B.selfFolderId,B.selfFolderName,u||a.sSelectFolderId);
}
if(a.oWin[s])
{
var A=0;
E(SN("mailid",a.oWin),function(F){
if(F.type=="checkbox")
{
A++;
}
});
if(A==k)
{
getTop().setFolderUnread(d,getTop().getFolderUnread(d)-k);
getTop().getMainWin().location.reload();
}
if(B.selfFolderId=="1")
{
getTop().setFolderUnread(B.selfFolderId,k+getTop().getFolderUnread(B.selfFolderId));
}
else if(B.selfFolderId=="3")
{
getTop().setFolderUnread(B.selfFolderId,k+getTop().getFolderUnread(B.selfFolderId));
}
else{
if(e&&!h)
{
getTop().setFolderUnread(b,k+getTop().getFolderUnread(b));
if(S("folder_"+b+"_td",getTop()).getAttribute("level")=="1")
{
var C=S("personalfolders",getTop());
var D;
if(S(b+"folders",getTop()))
{
D=C.removeChild(S(b+"folders",getTop()));
C.insertBefore(D,C.firstChild);
}
D=C.removeChild(S("folder_"+b+"_td",getTop()));
C.insertBefore(D,C.firstChild);
}
}
else if(e&&h)
{
if(S("folder_"+B.selfFolderId+"_td",getTop()).getAttribute("level")=="1")
{
var C=S("personalfolders",getTop());
var D;
D=C.removeChild(S("folder_"+B.selfFolderId+"_td",getTop()));
C.insertBefore(D,C.firstChild);
}
}
}
if(getTop().getMainWin().location.href.indexOf("/cgi-bin/readmail?")>=0&&!(a.bML&&a.oWin.location&&a.oWin.location.href.indexOf('s=search')>0)&&B&&B.url&&!a.bIsJump)
{
getTop().getMainWin().location.href=B.url;
}
if(!z)
{
}
else{
QMMailList.selectedUI({oMail:[],oACB:a.oACB});
}
}
else{
e&&!h&&reloadLeftWin();
}
}});
};
p.push('&mailaction=',g&&!k&&h?"onlyaddfolder":"mail_move");
p.push('&destfolderid=',h?-1:b);
if(h)
{
promptFolder({type:getTop().userFolderTree.length>0?'folderselect':'folder',selectedId:getTop().userFolderTree.length>0?a.sSelectFolderId:-1,onreturn:function(u,v){
if(f)
{
p.push('&destfolder=',u);
}
p.push('&foldername=',u);
p.push('&folderfatherid=',v);
j(v);
}});
}
else if(k)
{
if(f)
{
p.push('&destfolder=',c);
}
j();
}
else{
showError('\u672A\u9009\u4E2D\u4EFB\u4F55\u90AE\u4EF6');
}
}
;function configPreRmMail(a,b)
{
var g=a.oWin.location.getParams();
if(g['s']=='search'||!a.bML||((a.sFid=='pop'||a.sFid=='personal')&&b=='moveMailJs'))
{
return false;
}
var h={},f=a,d=f.onbeforesend,e=f.oncomplete,c=false;
if((g['s']=='star'||g['showtag']=='1')&&b=='moveMailJs')
{
c=true;
}
else{
f.onbeforesend=function(j){
callBack(d,[j]);
return (c=configPreRmMail._preRmMailUI(f,j));
};
}
f.oncomplete=function(j,k){
callBack(e,[j,k]);
return c;
};
return true;
}
configPreRmMail._preRmMailUI=function(a,b){
var p="toarea",n=a.oWin,l=a.oMail,e=l.length,m=S('nextpage',n),q=null,g=null,h=null,j=null,k=null,o="_pReRmMaIl_",f=0;
E(SN("mailid",n),function(r){
if(r.type=="checkbox")
{
f++;
}
});
if(f==e||e==0)
{
return false;
}
n[o]=n[o]||{_oWin:n,_nCnt:0};
if(m)
{
q=[m.href.replace(/(&|\?)(loc|r|t)=.*?(&|$)/gi,"$1"),'&ef=js&resp_charset=UTF8&record=n&t=mail_list_fragment&listcount=',e,'&r=',Math.random()].join('');
}
function c()
{
var u=getMailListInfo(),r=0;
for(var x=0;x<e;x++)
{
u.totle--;
l[x].bStar&&(u.star--);
l[x].bUnr&&r++;
var t=l[x].oTable.parentNode,s=t.previousSibling;
if(!s.tagName||s.tagName.toLowerCase()!='a')
{
s=s.previousSibling;
}
if(!k)
{
k=t;
while((k=k.nextSibling)&&k.className!='list_btline')
;
j=k;
while((j=j.previousSibling)&&j.className!=p)
;
}
removeSelf(l[x].oTable);
g=s;
h=t;
var v=GelTags('span',s)[0];
v.innerHTML=(parseInt(v.innerHTML)-1)+" \u5C01";
if(GelTags('table',t).length==0)
{
removeSelf(s);
removeSelf(t);
}
if(l[x].oChk&&l[x].bUnr)
{
var w=l[x].oChk.getAttribute('gid');
setGroupUnread(w,getGroupUnread(w)-1);
}
}
a.oACB.checked=false;
setMailListInfo(a.sFid==4?null:u.unread-r,u.star,u.totle);
if(a.sFid==8)
{
setGroupUnread("gall",getGroupUnread("gall")-r);
}
e&&(b||{}).sucMsg&&showInfo(b.sucMsg);
if(r)
{
setFolderUnread(a.sFid,getFolderUnread(a.sFid)-r);
}
QMMailCache.setExpire();
}
function d(r,s)
{
if(r)
{
var w=getMainWin();
s=trim(s);
var z=s.substr(0,19),x;
if(/<!--mlf\d{8}-->/.test(z))
{
x=s.split(z);
x.shift();
}
if(w[o]._oWin!=w||!x||!x.length)
{
return;
}
if(k)
{
if(j==h)
{
k.parentNode.insertBefore(h,k);
k.parentNode.insertBefore(g,h);
}
for(var A=0,t=Math.min(w[o]._nCnt,x.length);A<t;A++)
{
insertHTML(j,'beforeEnd',x[A]);
}
w[o]._nCnt=0;
var u=j.previousSibling;
if(!u.tagName||u.tagName.toLowerCase()!='a')
{
u=u.previousSibling;
}
var y=GelTags('span',u)[0];
y.innerHTML=(parseInt(y.innerHTML)+t)+" \u5C01";
var v=SN("mailid",w);
for(var A=v.length-1;A>=0;A--)
{
if(v[A].getAttribute('init')!="true"&&v[A].type=='checkbox')
{
MLIUIEvent(v[A],n,a.sFid);
}
}
}
}
else{
}
}
c();
if(q)
{
if(n[o]._nCnt)
{
n[o]._nCnt+=e;
}
else{
n[o]._nCnt=e;
QMAjax.send(q,{method:'GET',onload:d});
}
}
return true;
};
function isInArray(b,a)
{
for(var c=0;c<a.length;c++)
{
if(b==a[c])
{
return true;
}
}
return false;
}
function checkGrpSendSkipSelf(a,b)
{
var c=getDefalutAllMail();
var h=new Array();
for(var f=0,g=0;f<c.length;f++)
{
if(c[f].type=="1")
h[g++]=c[f].email;
}
var d=isInArray(a,h);
for(var f=0;d&&f<b.length;f++)
{
if(isInArray(b[f],h))
d=false;
}
if(d)
{
var e=new (getTop().QMDialog)({sTitle:"\u786E\u8BA4",sBodyHtml:T(['<div style="padding:10px;" class="txt_left">','<div>\u60A8\u521A\u521A\u5220\u9664\u4E86\u4E00\u5C01\u7531\u81EA\u5DF1\u53D1\u51FA\u7684\u90AE\u4EF6\u3002</div><br/>','<div>\u5F53\u53D1\u4FE1\u7ED9\u5305\u542B\u81EA\u5DF1\u7684\u90AE\u4EF6\u7FA4\u7EC4\u65F6\uFF0C\u5982\u679C\u60A8\u4E0D\u60F3\u6536\u53D6\uFF0C\u53EF\u4EE5\u5728\u201C\u8BBE\u7F6E - \u5E38\u89C4\u201D\u4E2D\u5173\u95ED\u3002</div>','<div class="txt_right" style="padding:26px 10px 5px;">','<button id="confirm" class="wd3 btn">\u73B0\u5728\u5C31\u53BB\u8BBE\u7F6E</button>','<button id="cancel" class="wd3 btn">\u597D\uFF0C\u6211\u77E5\u9053\u4E86</button','</div>','</div>']),onload:function(){
var j=this;
addEvent(j.S("confirm"),"click",function(){
goUrlMainFrm(T("/cgi-bin/setting1?sid=$sid$&fun=list#sendmailopt").replace({sid:getSid()}),false);
j.close();
});
addEvent(j.S("cancel"),"click",function(){
j.close();
});
},onshow:function(){
this.S("confirm").focus();
},nHeight:146});
}
}
function rmMail(a,b,c)
{
var h=b.oMail,f=h.length,d=0,l=['mailaction=mail_del',b.bML?'&location=mail_list':''],k={},g=[];
if(!f)
{
showError(gsMsgNoMail);
return false;
}
for(var q=0;q<f;q++)
{
var j=h[q],n=j.sSName,o=j.sSEmail;
l.push('&mailid=',j.sMid);
d=j.bUnr||d;
if(j.bUnr&&o.match(/tuan@mail-admin.qq.com|newsletter-noreply@qq.com/))
{
var m=j.sColId;
k[m]?(k[m]++):(k[m]=1);
k[m]==5&&g.push(m);
}
}
if(a==1)
{
var e=g.length,p=getTop().getSid();
confirmBox({title:"\u5220\u9664\u786E\u8BA4",mode:"prompt",msg:TE(['<div>\u5F7B\u5E95\u5220\u9664\u540E\u90AE\u4EF6\u5C06\u65E0\u6CD5\u6062\u590D\uFF0C\u60A8\u786E\u5B9A\u8981\u5220\u9664\u5417\uFF1F</div>','$@$if($bUnsubscribe$)$@$','<div style="margin:12px 0 0 0;">','<input style="vertical-align:middle; height:13px; width:13px; padding:0; margin:0 5px 0 0" id="unsubscribe" type="checkbox" name="Unsubscribe" >','<label for="unsubscribe"><span id="unsubscribe_text" style="color:#333; font-size:12px;">\u540C\u65F6\u9000\u8BA2\u9009\u4E2D\u7684\u8BA2\u9605\u90AE\u4EF6</span></label>','</div>','$@$endif$@$']).replace({bUnsubscribe:(e>0)}),onreturn:function(r){
if(r)
{
var s=this.S("unsubscribe");
l.push('&Fun=PerDel');
if(s&&s.checked)
{
var t="";
for(var u=0;u<e;u++)
{
t+=("&colid="+g[u]);
}
getTop().QMAjax.send(getTop().T("/cgi-bin/setting10?action=desubscribe&sid=$sid$$colidlist$").replace({sid:p,colidlist:t}),{method:"GET",onload:function(v,w){
}});
b.sDelRetMsg="\u5220\u9664\u90AE\u4EF6\u5E76\u9000\u8BA2\u6210\u529F";
}
_doRmMail(b,l,d);
}
}});
}
else{
_doRmMail(b,l,d);
}
return true;
}
function readmailCheckGrpSendSkipSelf(a)
{
var d=a.from.addr,g=a.to,c=a.cc;
var b=new Array();
var f=0;
{
for(var e=0;e<g.length;e++)
{
if(g[e])
b[f++]=g[e].addr;
}
for(var e=0;e<c.length;e++)
{
if(c[e])
b[f++]=c[e].addr;
}
}checkGrpSendSkipSelf(d,b);
}
function _doRmMail(b,c,a)
{
var f=b.sDelRetMsg||"\u5DF2\u5C06\u90AE\u4EF6\u6210\u529F\u5220\u9664",e=b.sFid,g=unikey('rm');
if(b.bPop&&getGlobalVarValue("POP_PROPOSE"))
{
confirmBox({title:"\u90AE\u7BB1\u529F\u80FD\u63A8\u8350",mode:"prompt",msg:T(['<div style="margin-top:8px" class="bold">\u5728$dn$\u90AE\u7BB1\u4E2D\u5220\u9664\u90AE\u4EF6\uFF0C\u540C\u65F6\u4E5F\u5220\u9664\u539F\u90AE\u7BB1\u4E2D\u7684\u5BF9\u5E94\u90AE\u4EF6?</div>','<div class="addrtitle" style="margin:4px 0 0 0;">','\u60A8\u4E5F\u53EF\u4EE5\u8FDB\u5165\u201C\u4FEE\u6539\u8BBE\u7F6E\u201D\u4E2D\u8BBE\u7F6E\u3002','<a href="http://service.exmail.qq.com/cgi-bin/help?subtype=1&&id=26&&no=326" target="_blank" >\u4E86\u89E3\u8BE6\u8BF7</a>','</div>']).replace({dn:getDomain(true)}),onreturn:function(h){
if(h)
{
runUrlWithSid(T("/cgi-bin/foldermgr?fun=updpop&updflag=22&folderid=$folderid$").replace({folderid:e}));
showInfo('\u8BBE\u7F6E\u6210\u529F\uFF01\u5E76\u5C06\u5F53\u524D\u9009\u4E2D\u90AE\u4EF6\u5220\u9664\u3002');
}
}});
}
showInfo('\u90AE\u4EF6\u5220\u9664\u4E2D...',-1);
b.oWin[g]=1;
var d=callBack(b.onbeforesend,[{sucMsg:f}]);
_AjaxSendMailMgr({_oQuery:c,_sSuccessMask:'mail_del successful',_sDefErrMsg:'\u5220\u9664\u90AE\u4EF6\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5',_fOnload:function(l,j,h){
var m=l.url,k=callBack(b.oncomplete,[b,l]);
!(d&&k)&&showInfo(f);
if(!k&&b.oWin[g])
{
if(b.bML&&b.oWin.location.href.indexOf('s=search')>0)
{
reloadFrmLeftMain(false,true);
}
else{
b.oWin.location.href=m;
}
}
if(a)
{
reloadLeftWin();
}
}});
}
function reportSpamJson(c,b)
{
var k=b.oMail,h=k.length,f=0,e=b.sFid==6,m=[b.bML?'&location=mail_list':'','&mailaction=mail_spam&isspam=true&Fun=',3<b.sFid&&b.sFid<7?"PerDel":"Del",'&srcfolderid=',b.sFid];
if(!h)
{
showError(gsMsgNoMail);
return false;
}
var d=c.bBlackList===false?false:true,j,l={};
for(var r=0;r<h;r++)
{
j=k[r];
m.push('&mailid=',j.sMid);
if(/(@groupmail.qq.com|10000@qq.com)/.test(j.sSEmail))
{
d=false;
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
QMMailList.selectedUI(b);
var q=["\u53D1\u4EF6\u4EBA"];
if(l&&l.sender&&l.sender.indexOf(',')<0)
{
q[0]=l.sender;
}
var a=c.oAddrList,g=0;
if(a)
{
if(a[0].length>0)
q[g++]=a[0];
if(a[1])
q[g++]=a[1];
}
var n=T(['<div>','<input type="radio" name="reporttype" id="r$value$" value="$value$" $checked$>','<label for="r$value$">$content$</label>','</div>']),p=(["<div class='cnfx_content'>","<form id='frm_spamtype'>","<div style='margin:3px 0 3px 3px'><b>\u8BF7\u9009\u62E9\u8981\u4E3E\u62A5\u7684\u5783\u573E\u7C7B\u578B\uFF1A</b></div>",n.replace({value:(e?11:8),checked:"checked",content:"\u5176\u4ED6\u90AE\u4EF6"}),n.replace({value:(e?10:4),checked:"",content:"\u5E7F\u544A\u90AE\u4EF6"}),n.replace({value:(e?9:1),checked:"",content:"\u6B3A\u8BC8\u90AE\u4EF6"}),(d?"<div style=\"padding:5px 0 2px 0;\">"+reportSpamJson._getRefuseText(q)+"</div>":""),"<div style='margin:6px 3px 0px 3px' class='addrtitle' >\u6E29\u99A8\u63D0\u793A\uFF1A\u6211\u4EEC\u5C06\u4F18\u5148\u91C7\u7EB3\u51C6\u786E\u5206\u7C7B\u7684\u4E3E\u62A5\u90AE\u4EF6\u3002</div>","</form>","</div>"]).join(""),o=(['<a class="btn_blue" id="btn_ok" href="javascript:;">\u786E\u5B9A</a>','<a class="btn_gray" id="btn_cancel" href="javascript:;">\u53D6\u6D88</a>']).join("");
new QMDialog({sId:"reportSpam",sTitle:"\u4E3E\u62A5\u5E76\u62D2\u6536\u9009\u4E2D\u90AE\u4EF6",sBodyHtml:p,sFootHtml:o,nWidth:450,onload:function(){
var s=this;
addEvent(s.S("btn_ok"),"click",function(){
var w=s.S("frm_spamtype").reporttype,u=s.S("frm_spamtype").refuse0,v=s.S("frm_spamtype").refuse1,y,z="readmail_spam";
for(var A=0,t=w.length;A<t;A++)
{
if(w[A].checked)
{
y=w[A].value;
break;
}
}
var x=u&&u.checked?["1","1"]:["0","0"];
if(v)
{
x[0]=u&&u.checked?"1":"0";
x[1]=v.checked?"1":"0";
}
if((u&&u.checked)||(v&&v.checked))
{
z="readmail_reject";
}
m.push("&s=",z,"&reporttype=",y,"&s_reject_what=",x[0]+x[1]);
reportSpamJson._doReportSpam(m,z,b);
s.close();
});
addEvent(s.S("btn_cancel"),"click",function(){
s.close();
});
},onshow:function(){
this.S("btn_ok").focus();
}});
return false;
}
reportSpamJson._getAddrSub=function(a){
var b=a.indexOf("@"),e='...';
if(b>-1)
{
var d=a.substr(0,b),c=a.substr(b);
return subAsiiStr(d,18,e)+subAsiiStr(c,18,e);
}
else{
return subAsiiStr(a,36,e);
}
};
reportSpamJson._getRefuseText=function(a){
var b=T(['<div><input type="checkbox" name="refuse$id$" id="refuese$id$" $TCHECK$>\u5C06<label for="refuese$id$">$TVALUE$</label>\u52A0\u5165\u9ED1\u540D\u5355</div>']),c=[],d;
for(d=0;d<a.length;d++)
{
c.push(b.replace({id:d,TVALUE:a[d]!="\u53D1\u4EF6\u4EBA"?"&lt;"+reportSpamJson._getAddrSub(a[d])+"&gt;":a[d],TCHECK:""}));
}
return c.join('');
};
reportSpamJson._doReportSpam=function(b,c,a){
var k="\u8BBE\u4E3A\u5783\u573E\u90AE\u4EF6\u6210\u529F",g=0,l=unikey('spam'),h=a.oMail,f=0,e=false,j=['mailaction=mail_spam&isspam=true'],d;
switch(c)
{case "readmail_spam":
case "readmail_spam_newwin":
k="\u4E3E\u62A5\u6210\u529F\uFF0C\u611F\u8C22\u60A8\u5BF9\u817E\u8BAF\u4F01\u4E1A\u90AE\u7BB1\u53CD\u5783\u573E\u90AE\u4EF6\u5DE5\u4F5C\u7684\u652F\u6301";
break;
case "readmail_reject":
case "readmail_reject_newwin":
k="\u5DF2\u5C06\u6B64\u53D1\u4EF6\u4EBA\u6DFB\u52A0\u5230\u9ED1\u540D\u5355\uFF0C\u5E76\u5C06\u8BE5\u90AE\u4EF6\u79FB\u5165\u5783\u573E\u90AE\u4EF6\u7BB1";
break;
case "readmail_group":
case "readmail_group_newwin":
k="\u62D2\u6536\u6210\u529F\uFF0C\u5C06\u4E0D\u518D\u6536\u53D6\u6B64\u8BDD\u9898\u90AE\u4EF6";
break;
}for(var m=h.length-1;m>=0;m--)
{
e=e||h[m].bSys;
f+=h[m].bUnr?1:0;
}
showInfo('\u90AE\u4EF6\u4E3E\u62A5\u4E2D...',-1);
a.oWin[l]=1;
if(a.bML&&!getTop().QMTip)
{
loadJsFileToTop(getPath("js"),[getFullResSuffix("qmtip.js")]);
}
!e&&(d=callBack(a.onbeforesend,[{sucMsg:k}]));
_AjaxSendMailMgr({_oQuery:b,_sSuccessMask:'spam successful',_sDefErrMsg:'\u4E3E\u62A5\u90AE\u4EF6\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5',_fOnload:function(r,o,n){
var t=r.url,p=callBack(a.oncomplete,[a,r]);
!(d&&p)&&showInfo(k);
if(t&&!p&&a.oWin[l])
{
if(a.bML&&a.oWin.location.href.indexOf('s=search')>0)
{
reloadFrmLeftMain(false,true);
}
else{
goUrl(a.oWin,t+"&r="+Math.random(),false);
}
if(!r.nodlg&&r.showReportInfo)
{
r.showReportInfo(r.reportCnt,r.acceptCnt,r.allCnt,r.trushCnt);
}
}
else if(a.bML&&!r.nodlg&&getTop().QMTip&&a.oWin[l])
{
var q=10002;
r.sid=getSid();
r.tipid=q;
var s=TE(["<p>\u60A8\u603B\u5171\u4E3E\u62A5\u4E86 $reportCnt$ \u6B21</p>","<p style='font-weight:normal;'>$@$if($acceptCnt$)$@$\u88AB\u7CFB\u7EDF\u91C7\u7EB3\u4E86 $acceptCnt$ \u6B21<br/>$@$endif$@$\u4ECA\u5929\u6211\u4EEC\u7CFB\u7EDF\u6536\u5230 $allCnt$ \u6B21\u4E3E\u62A5<br/>\u603B\u5171\u62E6\u622A\u4E86 $trushCnt$ \u5C01\u5783\u573E\u90AE\u4EF6<br/>\u611F\u8C22\u60A8\u5BF9\u817E\u8BAF\u4F01\u4E1A\u90AE\u7BB1\u53CD\u5783\u573E\u5DE5\u4F5C\u7684\u652F\u6301\uFF01","<div style=''></div>","<div style='text-align:right;font-weight:normal;'><a onclick=\"javascript: getTop().goUrlMainFrm('/cgi-bin/help_report_spam?sid=$sid$', false);getTop().QMTip.close('', $tipid$, false, true);\" style='text-decoration:underline;'>\u4E3E\u62A5\u6570\u636E\u4E2D\u5FC3</a>&nbsp;<a href='javascript;' onclick='getTop().runUrlWithSid(\"/cgi-bin/help_report_spam?type=0&ixspaminfo=1\");getTop().QMTip.close(\"\", $tipid$, false, true);return false;' style='text-decoration:underline;'>\u4EE5\u540E\u4E0D\u518D\u63D0\u793A</a></div>"]).replace(r);
QMTip.show2({bForceShow:true,type:4,win:a.oWin,tipid:q,domid:"gotnomail",msg:s,arrow_direction:"none",arrow_offset:0,width:400,height_offset:150,tip_offset:-300,close_fork:1});
}
if(g)
{
reloadLeftWin();
}
}});
};
function reportNoSpamJson(b,a)
{
var j="\u6210\u529F\u6807\u8BB0\u4E3A\u201C\u975E\u5783\u573E\u90AE\u4EF6\u201D",g=a.oMail,e=g.length,d=0,k=unikey('spam'),h=[a.bML?'&location=mail_list':'','&mailaction=mail_spam&isspam=false'],f;
if(!e)
{
showError(gsMsgNoMail);
return false;
}
for(var l=0;l<e;l++)
{
f=g[l];
h.push('&mailid=',f.sMid);
d+=f.bUnr?1:0;
}
a.oWin[k]=1;
var c=callBack(a.onbeforesend,[{sucMsg:j}]);
_AjaxSendMailMgr({_oQuery:h,_sSuccessMask:'spam successful',_sDefErrMsg:'\u8BBE\u7F6E\u4E0D\u662F\u5783\u573E\u90AE\u4EF6\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5',_fOnload:function(p,n,m){
var q=p.url,o=callBack(a.oncomplete,[a,p]);
!(c&&o)&&showInfo(j);
if(q&&!o&&a.oWin[k])
{
a.oWin.location.href=q;
}
if(d)
{
reloadLeftWin();
}
}});
}
function initMailSelect(f,b,e,g,h,c,d)
{
var a=BaseMailOper,l={sFolderid:h,bReadMode:b&&h!=4,bStarMode:b,bAutoTag:c||false,bTagMode:e&&h!=5&&h!=6,_moMoveItem:f,bSpam:d||false,oWin:g},k=a._craeteInstance(l);
l=k.getConfig();
if(f)
{
E(SN("selmContainer",g),function(m){
if(!m.innerHTML)
{
new QMSelect({oContainer:m,nWidth:80,sDefaultItemValue:"\u79FB\u52A8\u5230...",oMenu:{nWidth:"auto",nMaxWidth:180,bAutoItemView:true,bAutoClose:true,oItems:f},onafteropenmenu:function(p,n){
var o;
if(l._mnFolderType==0)
{
o=QMMailList.getCBInfo(l.oWin);
}
else{
o=l.oWin.QMReadMail.getCBInfo(l.oWin);
}
k.setMailInfo(o);
},onselect:function(n){
k.apply(n.sId,n.sItemValue);
return true;
}});
}
});
}
function j()
{
var o=[],n={nHeight:10,sItemValue:'<div style="background:#CCC; height:1px; margin-top:5px; overflow:hidden;"></div>'},r=T(['<div style="white-space:nowrap;zoom:1;">','<input type="button" class="item_square flagbg$flagbg$"/>','<span class="item_square_txt" title="$name$">$name$ &nbsp</span>','</div>']);
if(l.bReadMode)
{
o.push({sId:"read",sItemValue:"\u5DF2\u8BFB\u90AE\u4EF6"},{sId:"unread",sItemValue:"\u672A\u8BFB\u90AE\u4EF6"},n);
}
if(l.bStarMode)
{
o.push({sId:"star",sItemValue:"\u661F\u6807\u90AE\u4EF6"},{sId:"unstar",sItemValue:"\u53D6\u6D88\u661F\u6807"});
if(l.bTagMode)
{
o.push(n);
}
}
if(l.bTagMode)
{
o.push({sId:'rmalltag',sItemValue:'\u53D6\u6D88\u6807\u7B7E'},extend({bDisSelect:true,sId:'deltaghr'},n));
for(var q=QMTag.get(),s=0,m=q.length;s<m;s++)
{
var p=q[s];
o.push({sId:'tid_'+p.id,sItemValue:r.replace(p)});
}
if(m)
{
o.push(n);
}
o.push({sId:'newtag',sItemValue:'\u65B0\u5EFA\u6807\u7B7E'});
if(l.bAutoTag)
{
o.push(n,{sId:'autotag',sItemValue:'\u65B0\u5EFA\u81EA\u52A8\u6807\u7B7E'});
}
}
return o;
}
E(SN("markContainer",g),function(m){
if(m.innerHTML)
{
return;
}
if(!(l.bReadMode||l.bStarMode||l.bTagMode))
{
show(m,false);
return;
}
new QMSelect({oContainer:m,nWidth:80,sDefaultItemValue:"\u6807\u8BB0\u4E3A...",oMenu:{nWidth:"auto",nMaxWidth:180,bAutoItemView:true,bAutoClose:true,oItems:[]},onselect:function(n){
var o=this.get("menu");
k.apply(n.sId,n.sItemValue);
o.hide();
return true;
},onbeforeopenmenu:function(n){
l._moTagItems=l.bTagMode?QMTag.get():[];
n.sDefaultId="";
n.oItems=j();
},onafteropenmenu:function(p){
var o;
if(l._mnFolderType==0)
{
o=QMMailList.getCBInfo(l.oWin);
var n=o.oMail.length;
p.itemOption("rmalltag","bDisplay",n);
p.itemOption("deltaghr","bDisplay",n);
}
else{
o=l.oWin.QMReadMail.getCBInfo(l.oWin);
}
k.setMailInfo(o);
}});
});
}
function navRightMenu(c,d)
{
var h=c.ownerDocument,s=h.defaultView||h.parentWindow,a=Scale.fixCursorPos(d.clientX,'x')+bodyScroll(s,'scrollLeft'),b=Scale.fixCursorPos(d.clientY,'y')+bodyScroll(s,'scrollTop'),r=getEventTarget(d),w,u,f=false,e=false,l={_OPEN:{sId:"open",sItemValue:'\u6253\u5F00',oUrl:T("/cgi-bin/mail_list?sid=$sid$&s=unread&folderid=personal&flag=new&page=0&stype=myfolders&topmails=0")},_HR:{nHeight:10,sItemValue:'<div style="background:#CCC; height:1px; margin-top:5px; overflow:hidden;"></div>'},_WRITE_GROUP_MAIL:{sId:"writegroupmail",sItemValue:'\u5199\u7FA4\u90AE\u4EF6'},_READ_RECORD:{sId:"readrecord",sItemValue:'\u7FFB\u9605\u6240\u6709\u8BB0\u4E8B'},_READ_NEW:{sId:"readnew",sItemValue:'\u67E5\u770B\u672A\u8BFB'},_WRITE_MESSAGE:{sId:"writemessage",sItemValue:'\u5199\u77ED\u6D88\u606F'},_CHECK_MAILING:{sId:"checkmailing",sItemValue:'\u67E5\u8BE2\u6295\u9012\u72B6\u6001'},_EMPTY_DEL:{sId:"emptydel",sItemValue:'\u6E05\u7A7A\u5DF2\u5220\u9664'},_MARK:{sId:"mark",sItemValue:'\u5168\u90E8\u6807\u4E3A\u5DF2\u8BFB'},_CREATE_TAG:{sId:"createtag",sItemValue:'\u65B0\u5EFA\u6807\u7B7E'},_SETTING:{sId:"setting",sItemValue:'\u8BBE\u7F6E'},_CREATE_REMIND:{sId:"createremind",sItemValue:'\u65B0\u5EFA\u63D0\u9192'},_UPLOAD:{sId:"upload",sItemValue:'\u4E0A\u4F20\u6587\u4EF6'},_ADD_SUBSCRIPTION:{sId:"addsubscription",sItemValue:'\u6DFB\u52A0\u8BA2\u9605'},_MANAGE_GROUP_MAIL:{sId:"managegroupmail",sItemValue:'\u7FA4\u90AE\u4EF6\u7BA1\u7406'},_CHECK_UNANSWERED:{sId:"checkunanswered",sItemValue:'\u67E5\u8BE2\u672A\u88AB\u56DE\u590D\u72B6\u6001'},_DEL_INQUIRY:{sId:"delinquiry",sItemValue:'\u5220\u4FE1\u67E5\u8BE2'},_EMPTY_TRASH:{sId:"emptytrash",sItemValue:'\u6E05\u7A7A\u5783\u573E\u7BB1'},_MANAGE_SUBSCRIPTION:{sId:"managesubscription",sItemValue:'\u8BA2\u9605\u7BA1\u7406'},_WRITE_LOG:{sId:"writelog",sItemValue:'\u5199\u8BB0\u4E8B'},_WRITE_DAILY:{sId:"writedaily",sItemValue:'\u5199\u65E5\u5FD7'},_RECIEVED_INQUIRY:{sId:"revievedinquiry",sItemValue:'\u6536\u4FE1\u67E5\u8BE2'},_REPORT:{sId:"report",sItemValue:'\u4E3E\u62A5\u67E5\u8BE2'},_CREATE_FOLDER:{sId:"createfolder",sItemValue:'\u65B0\u5EFA\u6587\u4EF6\u5939'},_CREATE_MAILBOX:{sId:"createmailbox",sItemValue:'\u6DFB\u52A0\u5176\u4ED6\u90AE\u7BB1'},_MANAGE_FOLDER:{sId:"managefolder",sItemValue:'\u6587\u4EF6\u5939\u7BA1\u7406'},_MANAGE_MAILBOX:{sId:"managemailbox",sItemValue:'\u5176\u4ED6\u90AE\u7BB1\u7BA1\u7406'},_MANAGE_TAG:{sId:"managetag",sItemValue:'\u6807\u7B7E\u7BA1\u7406'},_RECIEVE_RECORD:{sId:"recieverecord",sItemValue:'\u6536\u53D6\u8BB0\u5F55'},_RECIEVE_POPMAIL:{sId:"recievepopmail",sItemValue:'\u6536\u53D6\u90AE\u4EF6'},_RECIEVE_ALL_POPMAIL:{sId:"recieveallpopmail",sItemValue:'\u5168\u90E8\u6536\u53D6'},_DEL_MAILBOX:{sId:"delmailbox",sItemValue:'\u5220\u9664\u6B64\u90AE\u7BB1'},_MAILBOX_SETING:{sId:"mailboxsetting",sItemValue:'\u4FEE\u6539\u8BBE\u7F6E'}},g={_NORMAL_OPEN:[l._OPEN,l._HR],_GROUPMAIL:[l._WRITE_GROUP_MAIL,l._MARK,l._HR],_NOTEPAD_OPEN:[l._OPEN,l._READ_RECORD,l._HR],_MAIL_LIST:[l._READ_NEW,l._MARK,l._HR],_SENDED:[l._CHECK_MAILING,l._CHECK_UNANSWERED],_DELETED:[l._EMPTY_DEL,l._DEL_INQUIRY],_TRASH:[l._MARK,l._EMPTY_TRASH,l._HR,l._REPORT],_MAIL_SUBSCRIPTION:[l._MARK,l._MANAGE_SUBSCRIPTION],_TAG:[l._CREATE_TAG,l._MANAGE_TAG],_MYTAG:[l._CREATE_TAG,l._HR],_SETTING:[l._SETTING,l._HR],_MAILBOX_SETING:[l._MAILBOX_SETING,l._HR],_REMIND:[l._CREATE_REMIND],_ATTACH:[l._OPEN],_NOTEPAD:[l._WRITE_LOG],_UPLOAD:[l._UPLOAD],_READER:[l._ADD_SUBSCRIPTION,l._WRITE_DAILY,l._MARK,l._HR],_FOLDER_MANAGER:[l._CREATE_FOLDER,l._MANAGE_FOLDER],_MAILBOX_MANAGER:[l._CREATE_MAILBOX,l._MANAGE_MAILBOX]},p={"1":{oMenu:g._NORMAL_OPEN.concat(g._MAIL_LIST).concat([l._RECIEVED_INQUIRY]),sName:"recievebox"},"starred":{oMenu:[l._OPEN],sName:"starred"},"9":{oMenu:g._NORMAL_OPEN.concat([l._WRITE_MESSAGE]),sName:"message"},"8":{oMenu:g._NORMAL_OPEN.concat(g._GROUPMAIL).concat([l._MANAGE_GROUP_MAIL]),sName:"groupmail"},"4":{oMenu:[l._OPEN],sName:"draftbox"},"3":{oMenu:g._NORMAL_OPEN.concat(g._SENDED),sName:"sended"},"5":{oMenu:g._NORMAL_OPEN.concat(g._DELETED),sName:"deleted"},"6":{oMenu:m=g._NORMAL_OPEN.concat(g._TRASH),sName:"trashbox"},"personal":{oMenu:g._NORMAL_OPEN.concat(g._MAIL_LIST).concat(g._FOLDER_MANAGER),sName:"personal"},"pop":{oMenu:g._NORMAL_OPEN.concat([l._READ_NEW,l._MARK]).concat([l._RECIEVE_ALL_POPMAIL,l._HR]).concat(g._MAILBOX_MANAGER),sName:"pop"},"tag":{oMenu:g._NORMAL_OPEN.concat(g._TAG),sName:"tag"},"11":{oMenu:g._NORMAL_OPEN.concat(g._SETTING),sName:"plp"},"note":{oMenu:g._NOTEPAD_OPEN.concat(g._NOTEPAD),sName:"note"},"mydisk":{oMenu:g._NORMAL_OPEN.concat(g._UPLOAD),sName:"mydisk"},"reader":{oMenu:g._NORMAL_OPEN.concat(g._READER).concat(g._SETTING),sName:"reader"},"bookfolders":{oMenu:g._NORMAL_OPEN.concat(g._MAIL_SUBSCRIPTION),sName:"bookfolders"},"personalfolders":{oMenu:g._NORMAL_OPEN.concat(g._MAIL_LIST).concat(g._FOLDER_MANAGER),sName:"personalfolders"},"popfolders":{oMenu:g._NORMAL_OPEN.concat([l._RECIEVE_POPMAIL]).concat(g._MAIL_LIST).concat(g._MAILBOX_MANAGER),sName:"popfolders"},"tagfolders":{oMenu:g._NORMAL_OPEN.concat([l._CREATE_TAG,l._HR,l._MANAGE_TAG]),sName:"tagfolders"}},k={"readnew":TE('/cgi-bin/mail_list?sid=$sid$&s=unread&folderid=$menuid$&flag=new&page=0&topmails=0&stype=$@$if($menuid$=="personal")$@$myfolders$@$else if($menuid$=="pop")$@$myotherinbox$@$endif$@$'),"writegroupmail":T("/cgi-bin/grouplist?t=compose_group&sid=$sid$&newwin="),"managegroupmail":T("/cgi-bin/grouplist?sid=$sid$&t=setting_group&oper=list"),"checkmailing":T("/cgi-bin/help_static_send?sid=$sid$"),"checkunanswered":T("/cgi-bin/mail_list?sid=$sid$&folderid=3&daterange=5&collolimit=0&combinetype=and&t=help_static_unreply"),"revievedinquiry":T("/cgi-bin/help_static_receive?sid=$sid$"),"delinquiry":T("/cgi-bin/help_static_delete?sid=$sid$"),"report":T("/cgi-bin/help_report_spam?sid=$sid$"),"managesubscription":T("/cgi-bin/setting10?action=list&t=setting10&sid=$sid$"),"writelog":T("/cgi-bin/cataloglist?sid=$sid$&t=note_edit_show&catid="),"writedaily":T("/cgi-bin/readtemplate?sid=$sid$&t=compose&s=SendToQZone&entrance=rss"),"writemessage":T("/cgi-bin/readtemplate?sid=$sid$&t=sms_list_v2&go=compose"),"createremind":T("/cgi-bin/reminder_list?t=remind&sid=$sid$&sorttype=create&filter=1&fn=1&loc=folderlist,,,39&pageaction=createremind"),"readrecord":T("/cgi-bin/note_list?sid=$sid$&catid=0"),"createmailbox":T("/cgi-bin/foldermgr?sid=$sid$&fun=detailpop&t=pop_detail&acctid=0"),"folder":TE('/cgi-bin/folderlist?t=folderlist_setting&s=null&sid=$sid$&jump=myfolders&info=true$@$if($itemid$=="managetag")$@$#mytagdiv$@$endif$@$'),"mailbox":T("/cgi-bin/folderlist?t=poplist_setting&s=null&sid=$sid$"),"addsubscription":T("http://r.mail.qq.com/cgi-bin/reader_main?sid=$sid$&t=r_index&source=folderlist&hash=search%3Fkeyworkd%3D"),"recieverecord":T("/cgi-bin/help_static_pop?sid=$sid$&domain=$etitle$"),"mailboxsetting":T("/cgi-bin/foldermgr?sid=$sid$&fun=detailpop&t=pop_detail&folderid=$menuid$&acctid=$acctid$&s=maillist"),"upload":{"mydisk":T("/cgi-bin/ftnList?sid=$sid$&t=exs_ftn_mydisk&listtype=mydisk&bus=6&list=0&display=list&autostart=1")},"setting":{"reader":T("http://r.mail.qq.com/cgi-bin/reader_main?sid=$sid$&t=r_index&source=folderlist&hash=setting/general"),"11":T("/cgi-bin/bottle_panel?sid=$sid$&t=bottle&loc=folderlist,,,33&func=setting")}},m=[];
while(r.tagName!="LI"&&r.tagName!="BODY")
{
var v=r.id,q=r.parentNode;
if(v.match(/folder_.*/))
{
var n;
u=r.getAttribute("etitle");
w=v.replace("folder_","").replace("_td","");
n=p[w]?p[w]:p[r.getAttribute("name")+"folders"];
m=n?n["oMenu"]:[];
_sMenuName=n?n["sName"]:"";
r=q.tagName=="LI"?q:r;
switchFolder("folder_"+w,getLeftWin());
break;
}
else{
r=q;
}
}
if(m&&m.length>0)
{
var q=r.parentNode,x=q.id;
ossLog("delay","all","stat=right&menuid="+_sMenuName);
var o=new QMMenu({sId:w,oEmbedWin:s,nWidth:"auto",nMaxWidth:180,nMaxItemView:14,sClassName:"qmpanel_shadow",bAnimation:false,bAutoClose:true,oItems:m,onitemclick:function(z,y){
var G,I="",H="",F=getTop().getMainWin().location;
ossLog("delay","all","stat=right&menuid="+_sMenuName+"&opr="+z);
switch(z)
{case "open":
var D=S("folder_"+w);
fireMouseEvent(D,"mousedown");
fireMouseEvent(D,"click");
break;
case "writemessage":
var D=S("folder_"+9);
switchFolder("folder_"+w);
F.href=D.href+"&go=compose";
break;
case "mark":
if(w=="reader")
{
var C=h.createElement("form");
C.action=gsRssDomain+"/cgi-bin/reader_mgr?fun=setfeedread&type=all&sid="+getSid();
C.method="post";
C.target="actionFrame";
h.body.appendChild(C);
C.submit();
setRssUnread(0,0);
getTop().showInfo("\u9605\u8BFB\u7A7A\u95F4\u6807\u4E3A\u5DF2\u8BFB\u64CD\u4F5C\u6210\u529F");
if(S("folder_reader_td").className=="fn")
{
reloadFrm(getTop().getMainWin());
}
}
else{
QMAjax.send("/cgi-bin/mail_mgr?mailaction=read_all&t=unreadmail_reg_data",{method:"POST",content:T('sid=$sid$&folderid=$folderid$').replace({sid:getSid(),folderid:w}),onload:function(J,K){
if(J)
{
var M=S("folder_"+w+"_td"),N=M.parentNode;
reloadLeftWin();
if(M.className=="fn"||(N.id=="personalfolders"&&S("folder_personal_td").className=="fn")||(N.id=="popfolders"&&S("folder_pop_td").className=="fn"))
{
reloadFrm(getTop().getMainWin());
getTop().showInfo("\u6587\u4EF6\u5939\u6807\u4E3A\u5DF2\u8BFB\u64CD\u4F5C\u6210\u529F");
}
if(w=="personal"||w=="pop")
{
var L=S(w+"folders").getElementsByTagName("LI");
for(var O=0;O<L.length;O++)
{
if(L[O].className=="fn")
{
reloadFrm(getTop().getMainWin());
getTop().showInfo("\u6587\u4EF6\u5939\u6807\u4E3A\u5DF2\u8BFB\u64CD\u4F5C\u6210\u529F");
break;
}
}
}
}
}});
}
break;
case "emptydel":
case "emptytrash":
var B=S("folder_"+w).nextSibling;
B=B.tagName=="A"?B:B.nextSibling;
if(B)
{
fireMouseEvent(B,"click");
}
break;
case "createtag":
QMTag.newMailTag();
break;
case "createfolder":
var A=r.getAttribute("dr")||"-1";
moveMailJs('new','',"",{bML:true,oMail:[],oWin:[],bIsJump:true,sSelectFolderId:A});
break;
case "managefolder":
case "managetag":
G=k["folder"];
break;
case "managemailbox":
case "delmailbox":
G=k["mailbox"];
break;
case "show":
case "hide":
case "morefunction":
break;
case "upload":
getTop().setUserCookie('ftAutoStart',1);
getTop().ftSendStatic('1106',getUin());
G=k["upload"][w];
break;
case "setting":
G=k["setting"][w];
break;
case "mailboxsetting":
H=S("folder_"+w).getAttribute("acctid");
G=k[z];
break;
case "createremind":
getTop().setUserCookie('ftAutoStart',1);
getTop().ftSendStatic('1106',getUin());
case "recieveallpopmail":
getTop().recvPopAll();
break;
case "recievepopmail":
H=S("folder_"+w).getAttribute("acctid");
getTop().recvPop(H,w,getTop().getMainWin());
break;
case "createmailbox":
toAddAccountPage();
break;
default:
G=k[z];
}if(G)
{
I=G.replace({sid:getSid(),menuid:w,itemid:z,etitle:u,acctid:H});
switchFolder("folder_"+w);
F.href=I;
}
},onload:function(){
var A=this;
if(A.option("sId")==w)
{
var y=parseInt(A.option("nHeight")),z=parseInt(A.option("nWidth")),B=calcAdjPos([b,a,b,a],z,y,s,1);
A.option("nX",B[3]).option("nY",B[0]);
}
}});
if(w!="reader"&&!r.getElementsByTagName("B").length)
{
o.itemOption("readnew","bDisSelect",true);
o.itemOption("mark","bDisSelect",true);
}
else if(w=="reader")
{
var t=S("folder_reader").className;
if(!t.match(/bold/)||t.match(/normal/))
{
o.itemOption("mark","bDisSelect",true);
}
}
if(S("popfolders").getElementsByTagName("A").length>29)
{
o.itemOption("createmailbox","bDisSelect",true);
}
if(r.getElementsByTagName("A").length<2)
{
o.itemOption("emptydel","bDisSelect",true);
o.itemOption("emptytrash","bDisSelect",true);
}
var j=r.getElementsByTagName("IMG");
if(j.length>0&&j[0].src.match(/ico_pwd/))
{
o.itemOption("readnew","bDisSelect",true);
o.itemOption("mark","bDisSelect",true);
o.itemOption("createfolder","bDisSelect",true);
o.itemOption("createmailbox","bDisSelect",true);
o.itemOption("recieverecord","bDisSelect",true);
}
}
preventDefault(d);
}
function mailRightMenu(d,e)
{
var n=d.ownerDocument,q=n.defaultView||n.parentWindow,b=e.clientX+bodyScroll(q,'scrollLeft'),c=e.clientY+bodyScroll(q,'scrollTop'),a=BaseMailOper,k=a.getInstance(q),l=GelTags('input',d)[0],h=l.checked==true;
if(!k)
{
return;
}
if(!h)
{
QMMailList.selectedUI({oMail:[]});
}
ossLog("delay","all","stat=right");
l.checked=true;
var m=k._moConfig;
function j(s)
{
var y=[],A=[],B=[],w=0,z=s.oMail,v=z.length,x={nHeight:10,sItemValue:'<div style="background:#CCC; height:1px; margin-top:5px; overflow:hidden;"></div>'},F=T(['<div style="white-space:nowrap;zoom:1;">','<input type="button" class="item_square flagbg$flagbg$"/>','<span class="item_square_txt">$name$ &nbsp</span>','</div>']);
if(v==1)
{
y.push({sId:"preview",sItemValue:'<div class="right"><img src="/zh_CN/htmledition/images/spacer.gif" class="arrow_meunico" /></div>\u9884\u89C8',oSubMenu:{sClassName:'rightpre qmpanel_shadow',nWidth:450,oItems:[{nHeight:350,sItemValue:T('<div scroll="true" id="pre" style="height:350px;width:430px;overflow-x:hidden;overflow-y:auto;"><div style="*margin:100px 0 0 0;height:64px;text-align:center;width:100%;"><center><img src="$images$ico_loading2.gif"/></center></div></div>').replace({images:getPath("image")})}],onload:function(){
var H=this,I=s.oMail[0].sMid;
QMAjax.send(T('/cgi-bin/readmail?sid=$sid$&folderid=$f$&t=quickreadmail&mailid=$m$&mode=preview&maxage=3600&ver=$v$').replace({v:rdVer(I,0),sid:getSid(),f:s.sFid,m:I}),{method:'GET',onload:function(J,L,K){
if(J)
{
ossLog("delay","all","stat=right&opr=preview");
var M=H.S('pre');
if(M)
{
M.style.lineHeight=1;
M.innerHTML=filteScript(L).replace(/<style ?.*>[\s\S]*?<\/style>/ig,"");
swapLink(M,"preview",M.ownerDocument);
}
}
}});
}}},x);
}
y.push({sId:'newwintoread',sItemValue:'\u65B0\u7A97\u53E3\u6253\u5F00'});
for(var G=0;G<v;G++)
{
w+=z[G].bUnr?1:0;
}
if(s.sFid!=5&&s.sFid!=6)
{
y.push({sId:"delmail",sItemValue:'\u5220\u9664'});
}
else{
y.push({sId:"predelmail",sItemValue:'\u5F7B\u5E95\u5220\u9664'});
}
if(m.bSpam&&s.sFid!=6)
{
y.push({sId:"spammail",sItemValue:"\u8FD9\u662F\u5783\u573E\u90AE\u4EF6"});
}
y.push(x);
if(m.bReadMode)
{
if(w)
{
y.push({sId:"read",sItemValue:"\u6807\u8BB0\u4E3A\u5DF2\u8BFB"});
}
if(w!=v)
{
y.push({sId:"unread",sItemValue:"\u6807\u8BB0\u4E3A\u672A\u8BFB"});
}
}
if(v==1&&s.sFid==1)
{
y.push({sId:"createreceiverule",sItemValue:"\u521B\u5EFA\u6536\u4FE1\u89C4\u5219"});
}
if(m.bTagMode)
{
var t=0;
for(var G=0;G<v;G++)
{
if(z[G].oTagIds.length)
{
t=true;
break;
}
}
if(t)
{
A.push({sId:'rmalltag',sItemValue:'\u53D6\u6D88\u6807\u7B7E'},extend({bDisSelect:true,sId:'deltaghr'},x));
}
for(var D=QMTag.get(),G=0,u=D.length;G<u;G++)
{
var C=D[G];
A.push({sId:'tid_'+C.id,sItemValue:F.replace(C)});
}
if(u)
{
A.push(x);
}
A.push({sId:'newtag',sItemValue:'\u65B0\u5EFA\u6807\u7B7E'});
if(m.bAutoTag)
{
A.push(x,{sId:'autotag',sItemValue:'\u65B0\u5EFA\u81EA\u52A8\u6807\u7B7E'});
}
y.push({sId:"mark",sItemValue:'<div class="right"><img src="/zh_CN/htmledition/images/spacer.gif" class="arrow_meunico" /></div>\u6807\u7B7E',oSubMenu:{oItems:A}});
}
y.push({sId:"move",sItemValue:'<div class="right"><img src="/zh_CN/htmledition/images/spacer.gif" class="arrow_meunico" /></div>\u79FB\u52A8\u5230',oSubMenu:{oItems:m._moMoveItem}});
return y;
}
var o;
if(m._mnFolderType==0)
{
o=QMMailList.getCBInfo(m.oWin);
QMMailList.selectedUI(o);
}
else{
o=m.oWin.QMReadMail.getTag();
}
k.setMailInfo(o);
var f=null,r=unikey(),p=new QMMenu({sId:r,oEmbedWin:q,nWidth:"auto",nMaxWidth:180,nMaxItemView:14,sClassName:"qmpanel_shadow",bAnimation:false,bAutoClose:true,oItems:j(o),onitemclick:function(t,s){
ossLog("delay","all","stat=right&opr="+t);
k.apply(f=t,s.sItemValue);
},onbeforeclose:function(){
if(this._moConfig.sId==r)
{
if(!h&&(f==null||'|spammail|new|newtag|autotag|'.indexOf(f)<0))
{
try{
l.checked=false;
var s=QMMailList.getCBInfo(q);
QMMailList.selectedUI(s);
}
catch(t)
{
}
}
f=null;
}
return true;
},onload:function(){
var u=this;
if(u.option("sId")==r)
{
var s=parseInt(u.option("nHeight")),t=parseInt(u.option("nWidth")),v=calcAdjPos([c,b,c,b],t,s,q,1);
u.option("nX",v[3]).option("nY",v[0]);
}
}});
if(m._mnFolderType==0)
{
var g=o.oMail.length;
p.itemOption("rmalltag","bDisplay",g);
p.itemOption("deltaghr","bDisplay",g);
}
}
QMIme={_JS:"//ime.qq.com/fcgi-bin/getjs ",_CONF:{"ime-cfg":"lt=102"},_detect:function(a){
return !!window.QQWebIME&&(a?QQWebIME[a]:false);
},_change:function(a){
var b=S("imeIcon");
b&&(setClass(b,b.getAttribute("css")+a).title=b.getAttribute(a));
setUserCookieFlag("CCSHOW",4,{on:4,off:3}[a]);
},_opt:function(a){
if(this._detect("set"))
{
QQWebIME.set(a);
this._setEvt()._change(a);
return true;
}
return false;
},_setEvt:function(){
var a=this;
if(a._detect("event")&&!QQWebIME["_setevt_"])
{
QQWebIME["_setevt_"]=true;
QQWebIME.event("on",function(){
a._change("on");
});
QQWebIME.event("off",function(){
a._change("off");
});
}
return a;
},ison:function(){
return this._detect('get')&&QQWebIME.get('on');
},load:function(a){
var b=this;
loadJsFile(b._JS,true,document,function(){
callBack.call(b,a,[b._opt("on")]);
},b._CONF);
},panel:function(c,b,a){
var f=S("imePanel"),d=c!==false,e=d?3:1;
a&&this._change("off");
!d&&this.off();
show(f,d);
if(!a&&getCookieFlag("CCSHOW")[4]!=e)
{
setCookieFlag("CCSHOW",4,e);
ossLog("realtime","all","loc=py,"+(d?"on":"off")+",0");
}
d&&b!==false&&this[a?"load":"on"]();
return !!f;
},off:function(){
return this._opt("off");
},on:function(){
var a=this;
!a._opt("on")&&(showProcess(1,0,'\u6B63\u5728\u52A0\u8F7D\u4E91\u8F93\u5165\u6CD5\u6A21\u5757...','',false)||a.load(function(b){
(b?showInfo:showError)(["\u4E91\u8F93\u5165\u6CD5",b?"\u6210\u529F\u542F\u52A8":"\u542F\u52A8\u5931\u8D25 - <a href='http://service.exmail.qq.com/cgi-bin/help?subtype=1&&id=10000&&no=1000561' target='_blank'>\u5E2E\u52A9</a>"].join(""));
}));
},toggle:function(){
this.ison()?this.off():this.on();
}};
var gnQmToolLoad=new Date().getTime()-_gnQmToolStart;
var QMFileAdaptor=(function(h){
var aw=navigator.userAgent.toLowerCase(),ay=navigator.appVersion.toLowerCase(),ax=navigator.appName.toLowerCase(),Q=aw.indexOf("opera")>-1,Z=aw.indexOf("applewebkit")>-1,M=aw.indexOf("khtml")>-1||aw.indexOf("konqueror")>-1||Z,L=(aw.indexOf("compatible")>-1&&!Q)||aw.indexOf("msie")>-1,X=L?(ay.indexOf("tencenttraveler")!=-1?1:0):0,U=Z?(ay.indexOf("qqbrowser")!=-1?1:0):0,V=aw.indexOf("qplus")>-1,J=aw.indexOf('edge')!=-1,I=Z&&!U&&!J&&aw.indexOf("chrome")>-1&&aw.indexOf("se 2.x metasr 1.0")<0&&!V,W=Z&&!I&&!U,R=L&&ay.indexOf("qqbrowser")!=-1,K=aw.indexOf("gecko")>-1&&!M,P=!L&&!Q&&!M&&(aw.indexOf("mozilla")==0)&&(ax=="netscape"),G=!(Q||M||W||L||X||K||P),aa=aw.indexOf("windows")>-1||aw.indexOf("win32")>-1,Y=aa&&(aw.indexOf("nt 6.0")>-1||aw.indexOf("windows vista")>-1),ab=aa&&aw.indexOf("nt 6.1")>-1,O=aw.indexOf("macintosh")>-1||aw.indexOf("mac os x")>-1,aB=/mac os x (\d+)(\.|_)(\d+)/.test(aw)&&parseFloat(RegExp.$1+"."+RegExp.$3),N=aw.indexOf("linux")>-1,H=aw.indexOf("adobeair")>-1,av=/MSIE (\d+.\d+);/i.test(aw)&&parseFloat(RegExp["$1"]),aA=/firefox\/((\d|\.)+)/i.test(aw)&&RegExp["$1"],aD=""+(/version\/((\d|\.)+)/i.test(aw)&&RegExp["$1"]),az=""+(/chrome\/((\d|\.)+)/i.test(aw)&&RegExp["$1"]),aC=""+(/qqbrowser\/((\d|\.)+)/i.test(aw)&&RegExp["$1"]),m="_For_E_Built";
function at()
{
var a5=arguments.callee;
if(!a5._moTop)
{
try{
if(window!=parent)
{
a5._moTop=parent.getTop?parent.getTop():parent.parent.getTop();
}
else{
a5._moTop=window;
}
}
catch(a4)
{
a5._moTop=window;
}
}
return a5._moTop;
}
;var o=(at&&at())||window;
var f=o.T||o.Q.T;
var g=o.TE||o.Q.TE;
function aK()
{
if(o.location&&o.location.pathname&&o.location.pathname.indexOf('bizmail')>-1)
{
return true;
}
else{
return false;
}
}
function e(a5,a4)
{
try{
return (a4&&(a4.document||a4)||document).getElementById(a5);
}
catch(a6)
{
return null;
}
}
function aN()
{
return +new Date();
}
function aU(a4)
{
try{
a4.parentNode.removeChild(a4);
}
catch(a5)
{
}
return a4;
}
function s(a4,a5,a6)
{
if(!a4||!a4.nodeType||a4.nodeType===3||a4.nodeType===8)
{
return undefined;
}
if(a6===undefined)
{
return a4.getAttribute(a5);
}
else{
a4.setAttribute(a5,a6);
return a4;
}
}
function aJ(a6,a8,a7)
{
if(!a6)
{
return false;
}
try{
if(a6.insertAdjacentHTML)
{
a6.insertAdjacentHTML(a8,a7);
}
else{
var bb=a6.ownerDocument.createRange(),a4=a8.indexOf("before")==0,a5=a8.indexOf("Begin")!=-1;
if(a4==a5)
{
bb[a4?"setStartBefore":"setStartAfter"](a6);
a6.parentNode.insertBefore(bb.createContextualFragment(a7),a5?a6:a6.nextSibling);
}
else{
var a9=a6[a4?"lastChild":"firstChild"];
if(a9)
{
bb[a4?"setStartAfter":"setStartBefore"](a9);
a6[a4?"appendChild":"insertBefore"](bb.createContextualFragment(a7),a9);
}
else{
a6.innerHTML=a7;
}
}
}
return true;
}
catch(ba)
{
return false;
}
}
function t(a5,a6,a4)
{
var a8=(a5||window).document||a5,a7=a8.body,a9=a8.documentElement;
if(typeof (a4)=="number")
{
a7[a6]=a9[a6]=a4;
}
else{
if(a6=="scrollTop"&&typeof a5.pageYOffset!="undefined")
{
return a5.pageYOffset;
}
else{
return a9[a6]||a7[a6];
}
}
}
function aL(a4,a5)
{
try{
if(!a4||!a5)
{
return false;
}
else if(a4.contains)
{
return a4.contains(a5);
}
else if(a4.compareDocumentPosition)
{
var a7=a4.compareDocumentPosition(a5);
return (a7==20||a7==0);
}
}
catch(a6)
{
}
return false;
}
function aW(a4,a5)
{
if(a4&&typeof (a5)!="undefined"&&a4.className!=a5)
{
a4.className=a5;
}
return a4;
}
function p(a4,a5)
{
var a6=" "+a4.className+" ";
if(a6.indexOf(" "+a5+" ")<0)
{
a4.className+=a4.className?" "+a5:a5;
}
return a4;
}
;function aV(a4,a5)
{
if(a4)
{
if(a5)
{
var a6=" "+a4.className+" ";
a6=a6.replace(" "+a5+" "," ");
a4.className=a0(a6);
}
else{
a4.className="";
}
}
return a4;
}
;function aF(a4,a5)
{
return a4&&(" "+a4.className+" ").indexOf(" "+a5+" ")>-1;
}
;function ar(a4,a5)
{
var a6=a4&&(a4.currentStyle?a4.currentStyle:a4.ownerDocument.defaultView.getComputedStyle(a4,null));
return a6&&a6[a5]||"";
}
function aM(a5,a4)
{
return (ar((typeof (a5)=="string"?e(a5,a4):a5),"display")||"none")!="none";
}
function aX(a6,a4,a5)
{
var a7=(typeof (a6)=="string"?e(a6,a5):a6);
if(a7)
{
a7.style.display=(a4?"":"none");
}
else if(!a5&&typeof (a6)=="string")
{
}
return a7;
}
var q=(function(){
function a4(a7,a8,a6,a5)
{
if(a7&&a6)
{
if(a7.addEventListener)
{
a7[a5?"removeEventListener":"addEventListener"](a8,a6,false);
}
else if(a7.attachEvent)
{
a7[a5?"detachEvent":"attachEvent"]("on"+a8,a6);
}
else{
a7["on"+a8]=a5?null:a6;
}
}
return a7;
}
return function(a7,a8,a6,a5){
if(a7&&(a7.join||a7[m]))
{
a(a7,function(a9){
a4(a9,a8,a6,a5);
});
}
else{
a4(a7,a8,a6,a5);
}
return a7;
};
})();
function r(a5,a6,a4)
{
a(a6,function(a7,a8){
q(a5,a8,a7,a4);
});
return a5;
}
function aS(a5,a6,a4)
{
return q(a5,a6,a4,true);
}
function aT(a4,a5)
{
return r(a4,a5,true);
}
function aP(a4)
{
if(a4)
{
if(a4.preventDefault)
{
a4.preventDefault();
}
else{
a4.returnValue=false;
}
}
return a4;
}
function aZ(a4)
{
if(a4)
{
if(a4.stopPropagation)
{
a4.stopPropagation();
}
else{
a4.cancelBubble=true;
}
}
return a4;
}
function ah(a4)
{
return a4&&(a4.srcElement||a4.target);
}
function d(a7,a6,a4,a5)
{
var bc=this,bd=a5,ba;
function bf()
{
bc.onComplete(bd);
}
function be(bg)
{
bc.onError(bd,bg);
}
function a9(bg)
{
if(!ba)
{
ba=setTimeout(function(){
bc.abort();
},bg);
}
}
function a8(bg)
{
if(ba)
{
clearTimeout(ba);
ba=null;
if(bg!="ok")
{
be(bg);
}
return true;
}
return false;
}
this.method=a6||"POST";
this.url=a7;
this.async=true;
this.content="";
this.timeout=a4;
this.onComplete=function(){
};
this.onError=function(){
};
if(!bd)
{
try{
bd=new XMLHttpRequest();
}
catch(bb)
{
try{
bd=new ActiveXObject("MSXML2.XMLHTTP");
}
catch(bb)
{
try{
bd=new ActiveXObject("Microsoft.XMLHTTP");
}
catch(bb)
{
}
}
}
}
if(!bd)
{
return false;
}
this.abort=function(){
a8("abort");
bd.abort();
};
this.send=function(bg){
if(!this.method||!this.url||!this.async)
{
return false;
}
typeof this.url=="object"&&(this.url=this.url.replace({}));
var bj=this.method.toUpperCase(),bk=aq();
this.abort();
if(typeof QMDistributeDomain=="fucntion")
{
var bi=QMDistributeDomain(this.url,bd);
bd=bi.oXhr;
var bl=bi.sUrl;
}
bd.open(bj,this.url+(bk&&bj=="POST"&&((this.url.split("?")[1]||"")+"&").indexOf("&sid=")==-1?(this.url.indexOf("?")==-1?"?sid=":"&sid=")+bk:""),this.async);
if(bj=="POST")
{
bd.setRequestHeader("Content-Type",document.charset);
bd.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
a(this.headers,function(bn,bm){
bd.setRequestHeader(bm,bn);
});
bd.onreadystatechange=function(){
try{
if(bd.readyState==4)
{
if(bd.status==200)
{
if(a8("ok"))
{
bf();
}
}
else{
a8(bd.status);
}
}
}
catch(bm)
{
a8(bm.message);
}
};
a9(this.timeout||15000);
try{
if(bj=="POST")
{
bd.send(bg||this.content);
}
else{
bd.send(null);
}
}
catch(bh)
{
a8(bh.message);
}
return true;
};
}
;d.newXhr=function(a4){
var a6=a4||window;
if(a6.ActiveXObject)
{
try{
return new a6.ActiveXObject("MSXML2.XMLHTTP");
}
catch(a5)
{
try{
return new a6.ActiveXObject("Microsoft.XMLHTTP");
}
catch(a5)
{
}
}
}
if(a6.XMLHttpRequest)
{
return new a6.XMLHttpRequest();
}
Log("gen xhr fail");
};
d.send=function(a6,a4,a5){
var a7,a8;
if(typeof QMDistributeDomain=="function")
{
var a9,a8=a4||{};
if(a5)
{
a9=QMDistributeDomain(a6,a5.getXhr());
if(a9.bNewXhr)
{
a5.setXhr(a9.oXhr);
}
a7=a5;
a6=a9.sUrl;
}
else{
a9=QMDistributeDomain(a6,a8.xhr);
a7=new d("","",0,a9.oXhr);
}
a6=a9.sUrl;
}
else{
a7=a5||new d();
a8=a4||{};
}
a7.url=a6;
a("method,timeout,content,headers".split(","),function(ba){
if(a8[ba])
{
a7[ba]=a8[ba];
}
});
a7.onComplete=function(ba){
v.call(ba,a4.onload,[true,a1(ba.responseText||""),ba]);
};
a7.onError=function(ba,bb){
v.call(ba,a4.onload,[false,bb,ba]);
};
a7.send();
};
function aI(a4)
{
return a4&&a4.replace?(a4.replace(/&/g,"&amp;").replace(/\"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\'/g,"&#39;")):a4;
}
function aH(a4)
{
return a4&&a4.replace?(a4.replace(/&nbsp;/gi," ").replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&amp;/gi,"&").replace(/&quot;/gi,"\"").replace(/&#39;/gi,"'")):a4;
}
function F()
{
for(var a5=arguments,a6=a5[0],a8=1,a4=a5.length;a8<a4;a8++)
{
var a7=a5[a8];
for(var a9 in a7)
{
a6[a9]=a7[a9];
}
}
return a6;
}
function j(a4,a5)
{
return typeof a4=="function"?a4.apply(this,a5||[]):null;
}
function v(a4,a5)
{
if(!window.Console)
{
try{
return j.call(this,a4,a5);
}
catch(a6)
{
debug(a6.message);
}
}
else{
return j.call(this,a4,a5);
}
}
function a2(a4)
{
return [a4,aN(),Math.random()].join("").split(".").join("");
}
function aR(a4)
{
return a4.replace(/([\^\.\[\$\(\)\|\*\+\?\{\\])/ig,"\\$1");
}
function af(a4)
{
var a5=(new RegExp(["(^|;|\\s+)",aR(a4),"=([^;]*);?"].join("")));
if(a5.test(document.cookie))
{
try{
return decodeURIComponent(RegExp["$2"]);
}
catch(a6)
{
return RegExp["$2"];
}
}
}
function a(a7,a4,a6,a5)
{
if(!a7)
{
return;
}
if(a7.length!=null)
{
var a9=a7.length,a8;
if(a5<0)
{
a8=a9+a5;
}
else{
a8=a5<a9?a5:a9;
}
for(var bb=(a6||0);bb<a8;bb++)
{
try{
if(a4(a7[bb],bb,a9)===false)
{
break;
}
}
catch(ba)
{
debug([ba.message,"<br>line:",ba.lineNumber,'<br>file:',ba.fileName,"<br>",a4]);
}
}
}
else{
for(var bb in a7)
{
try{
if(a4(a7[bb],bb)===false)
{
break;
}
}
catch(ba)
{
debug([ba.message,"<br>",a4]);
}
}
}
}
getParams=function(a4){
var a5=window.location;
a5._bIsAnalyse=false;
a5.params={};
var a6={},a7=a4?a4.substr(a4.indexOf("?")+1).split("#")[0]:a5.search.substr(1);
if(a7)
{
a(a7.split("&"),function(a8){
var a9=a8.split("=");
a6[a9.shift()]=unescape(a9.join("="));
});
}
if(!a4)
{
a5.params=a6;
a5._bIsAnalyse=true;
}
return a6;
};
function ag(a4)
{
return [["foxmail.com","qq.com","biz"],["Foxmail.com","QQ","\u817E\u8BAF"]][a4?1:0][/,7$/.test(aq())?2:(location.href.indexOf("foxmail.com")>-1?0:1)];
}
function aq()
{
return at().g_sid||(e("sid")?e("sid").value:getParams(at().location.href)["sid"])||QMWin.sid();
}
function au()
{
return at().g_uin||QMWin.uin();
}
function al()
{
var a4={images_path:"/zh_CN/htmledition/images/",js_path:"/zh_CN/htmledition/js/",js_path:"/zh_CN/htmledition/js/",css_path:"/zh_CN/htmledition/css/",style_path:"/cgi-bin/getcss?sid="+aq()+"ft=",swf_path:"/zh_CN/htmledition/swf/",stationery_path:"http://res.mail.qq.com/zh_CN/",card_path:"http://res.mail.qq.com/zh_CN/",mo_path:"http://res.mail.qq.com/zh_CN/",editor_path:"/zh_CN/htmledition/qqmaileditor/",base_path:"/",skin_path:"0",swf_cdn_path:"//res.mail.qq.com/bizmail/zh_CN/htmledition/swf/"};
for(var a5 in a4)
{
a4[a5]=a0(at()[a5])||a4[a5];
}
return a4;
}
function ak(a5,a4)
{
a5=="image"&&(a5+="s");
var a6=al()[a5+"_path"]||"";
if(a6)
{
if(a4&&a5!="skin"&&a6.indexOf("http")!=0)
{
a6=[location.protocol,"//",location.host,a6].join("");
}
}
return a6;
}
function a0(a4)
{
return (a4&&a4.replace?a4:"").replace(/(^\s*)|(\s*$)/g,"");
}
function a1(a4)
{
if(a4&&a4.substring)
{
var a7=/\s/,a5=-1,a6=a4.length;
while(a7.test(a4.charAt(--a6)))
;
while(a7.test(a4.charAt(++a5)))
;
return a4.substring(a5,a6+1);
}
}
function ao(a4)
{
return f(a4).replace(al(),true);
}
function u(a4,a5)
{
var ba=a5||{},bc=ba.win||at(),bd=ba.id||a2("_"),a8=[ba.attrs],a9=[];
for(var be=0,a6=a4&&a4.length||0;be<a6;be++)
{
for(var bb=a4[be],bf=2,a7=bb.length;bf<a7;bf++)
{
a9.push(bb[0],":",bb[1],bb[bf],"|");
}
}
a8.push(' _file="',encodeURIComponent(a9.join("")),'"');
a8.push(' _header="',encodeURIComponent(ba.header||""),'"');
a8.push(' _body="',encodeURIComponent(ba.body||""),'"');
A(bc,ae(bc),F({},ba,{id:bd,attrs:a8.join(""),onload:function(bg){
var bh=this;
v.call(bh,ba.onload,[bg]);
(ba.destroy!=false||bh.getAttribute("destroy")=="true")&&bc.setTimeout(function(){
aU(bh);
},100);
}}));
}
function A(a5,a6,a4)
{
var a9="_creAteifRAmeoNlQAd_",a8=a4||{},ba=a4.id||a2(),a7=e(ba,a5);
if(typeof a5[a9]!="function")
{
a5[a9]=function(bc,bb){
v.call(bb,arguments.callee[bc],[a5]);
};
}
a5[a9][ba]=a4.onload;
if(!a7)
{
aJ(a8.obj||a5.document.body,a8.where||"afterBegin",g(['<iframe frameborder="0" scrolling="$scrolling$" id="$id$" name="$id$" ','$@$if($transparent$)$@$allowTransparent$@$endif$@$ class="$className$" ','onload="this.setAttribute(\x27loaded\x27,\x27true\x27);$cb$(\x27$id$\x27,this);" ','src="$src$" style="$style$" $attrs$>','</iframe>']).replace(F({"id":ba,"cb":a9,style:"display:none;",scrolling:"no",src:a6},a4)));
a7=e(ba,a5);
a7._onload=a4.onload;
}
else if(a7.getAttribute("loaded")=="true")
{
a5[a9](ba,a7);
}
return a7;
}
function ae(a4)
{
var a5=(a4||at()).location,a6="/zh_CN/htmledition/domain.html";
return [a6,"?",document.domain!=a5.host?encodeURIComponent(document.domain):"",a5.href.indexOf(a6)!=-1?"&r="+Math.random():""].join("");
}
function y(a5,a4)
{
u(a4&&a4.defcss==false?[]:[["css","",ao("$css_path$comm.css")],["css",ak("style"),"skin"]],F({className:"menu_base_if",transparent:false,destroy:false},a4,{win:a5,header:["<script>",at.toString().replace(/[\r\n]/g,""),"<\/script>",a4&&a4.header||""].join(""),onload:function(a6){
if(this.getAttribute("cbi_inited")!="true")
{
a4&&a4.transparent&&(this.contentWindow.document.body.style.background="transparent");
this.setAttribute("cbi_inited","true");
}
v.call(this,a4&&a4.onload,[a6]);
}}));
}
function aQ(a4)
{
if(!(this._mId=a4.id))
{
throw Error(0,"config.id can't use null");
}
if(!(this._mWin=a4.win))
{
throw Error(0,"config.win win is null");
}
this._moConstructor=this.constructor;
this._mEvent=a4;
this._initlize();
}
var l=aQ;
var k=l.prototype;
l.get=function(a4,a5){
var a6=a5[this._CONST._CACHES];
return a6&&a6[a4];
};
l.getFlashVer=function(){
var a6="";
var bc=-1;
var a4=-1;
var a5=-1;
var ba=navigator.plugins;
if(ba&&ba.length)
{
for(var be=0,a8=ba.length;be<a8;be++)
{
var a9=ba[be];
if(a9.name.indexOf('Shockwave Flash')!=-1)
{
a6=a9.description.split('Shockwave Flash ')[1];
bc=parseFloat(a6);
a5=parseInt(a6.split("r")[1]);
a4=parseInt(a6.split("b")[1]);
break;
}
}
}
else{
try{
var bb=new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
if(bb)
{
a6=bb.GetVariable("$version").split(" ")[1];
var a7=a6.split(",");
bc=parseFloat(a7.join("."));
a5=parseInt(a7[2]);
a4=parseInt(a7[3]);
}
}
catch(bd)
{
}
}
return {version:(isNaN(bc)?-1:bc)||-1,build:(isNaN(a5)?-1:a5)||-1,beta:(isNaN(a4)?-1:a4)||-1,desc:a6};
};
l.isSupported=function(){
var a4=this.getFlashVer();
return a4.version>=10||a4.version==9&&a4.build>50;
};
l._CONST={_TIMEOUT:5*1000,_CACHES:"qmFlashCaches_ASDr431gGas",_CALLBACK:"onFlashEvent_ASDr431gGas"};
k.getFlash=function(){
return ai(this._mId,this._mWin);
};
k.isDisabled=function(){
return this._mDisabled||false;
};
k.disable=function(a4){
this._mDisabled=a4!=false;
return this;
};
k.getLoadedPercent=function(a4){
var a8=this;
function a5(a9)
{
try{
a4.call(a8,a9);
}
catch(ba)
{
}
}
var a6=this.getFlash();
if(!a6)
{
return a5("notfound");
}
var a7=0;
(function(){
var bb=arguments.callee;
if(!bb._startTime)
bb._startTime=aN();
var ba=0;
var a9=false;
try{
ba=a6.PercentLoaded();
}
catch(bc)
{
a9=true;
}
if(ba!=a7)
a5(a7=ba);
if(ba!=100)
{
if(aN()-bb._startTime>aQ._CONST._TIMEOUT)
{
a5(a9?"noflash":"timeout");
}
else{
setTimeout(bb,100);
}
}
})();
};
k.setup=function(a4){
var a6=this;
function a5(a8,a7)
{
try{
a4.call(a6,a8,a7);
}
catch(a9)
{
}
}
this.getLoadedPercent(function(a7){
if(a7==100)
{
setTimeout(function(){
try{
if(!a6.getFlash().setup(aQ._CONST._CALLBACK,a6._mId))
{
return a5(false,"setuperr");
}
}
catch(a8)
{
return a5(false,"nosetup");
}
a5(true);
});
}
else if(typeof a7!="number")
{
a5(false,a7);
}
});
};
k._initlize=function(){
var a7=this._mWin;
var a6=this._moConstructor._CONST;
var a4=a6._CACHES;
var a5=a6._CALLBACK;
if(!a7[a4])
a7[a4]=new a7.Object();
a7[a4][this._mId]=this;
if(!a7[a5])
{
a7[a5]=function(){
var bb=arguments[0];
var a9=arguments[1];
var ba=a7[a4][bb];
if(ba&&typeof (ba._mEvent[a9])=="function")
{
var a8=[];
for(var bd=2,bc=arguments.length;bd<bc;bd++)
a8.push(arguments[bd]);
ba._mEvent[a9].apply(ba,a8);
}
};
}
};
function ac(a7,a6,a4,a5)
{
var ba=[],bf=[],bc=[],bh=a5||{},bb=f(' $name$=$value$ '),bg=f('<param name="$name$" value="$value$" />'),bd=L?f(['<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ','$codebase$ ','$attr$ $id$ >','$param$','<embed $embed$ type="application/x-shockwave-flash" ','$pluginspage$ ',' $name$ ></embed>','</object>']):f(['<embed $embed$ type="application/x-shockwave-flash" ','$pluginspage$ ',' $name$ $id$ ></embed>']);
function a8(bi,bj)
{
return {name:bi,value:bj};
}
bh.allowScriptAccess="always";
bh.quality="high";
for(var a9 in bh)
{
var be=a8(a9,bh[a9]);
bf.push(bg.replace(be));
bc.push(bb.replace(be));
}
for(var a9 in a4)
{
var be=a8(a9,a4[a9]);
ba.push(bb.replace(be));
bc.push(bb.replace(be));
}
if(a6)
{
bf.push(bg.replace(a8("movie",a6)));
bc.push(bb.replace(a8("src",a6)));
}
return bd.replace({id:a7&&[' id="',a7,'"'].join(""),name:a7&&[' name="',a7,'"'].join(""),attr:ba.join(""),param:bf.join(""),embed:bc.join(""),codebase:location.protocol=="https:"?'':'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" ',pluginspage:location.protocol=="https:"?'':'pluginspage="http://www.adobe.com/cn/products/flashplayer" '});
}
function ai(a5,a4)
{
var a7=a4||window,a6=a7[a5]||a7.document[a5];
return a6&&(a6.length?a6[0]:a6);
}
function an(a4)
{
var a5=(aa&&((K&&aA.split(".")[0]>=3&&(aA.split(".")[1]>0||aA.split(".")[2]>=8||parseInt(navigator.buildID.substr(0,8))>=20090701))||(I&&(""+az).split('.')[0]>=6)||(W&&aw.indexOf("se 2.x metasr 1.0")<0)||(Q)||(U&&an._compareVersion(aC,"6.5")>0)))||(O&&aB>=a4&&(K&&parseFloat(aA)>=3.6||I&&parseFloat(az)>=8||W&&parseFloat(aD)>=5||U));
return a5;
}
an._compareVersion=function(a4,a5){
var ba=a4.split("."),a8=ba.length,bb=a5.split("."),a9=bb.length;
for(var bc=0;bc<a8&&bc<a9;bc++)
{
var a6=parseInt(ba[bc]),a7=parseInt(bb[bc]);
if(a6==a7)
{
continue;
}
return a6>a7?1:-1;
}
if(bc<a8)
{
return 1;
}
if(bc<a9)
{
return -1;
}
return 0;
};
var c={_moInfos:{path:"/activex/",cab:["TencentMailActiveX.cab","TencentMailActiveX_2.cab"],exe:"TencentMailActiveXInstall.exe",obj:[["TXGYMailActiveX.ScreenCapture","TXGYMailActiveX.UploadFilePartition","TXGYMailActiveX.Uploader","TXFTNActiveX.FTNUpload","TXGYMailActiveX.DropFile"]],available:["ScreenCapture","Uploader","FTNUpload","DropFile","UploadFilePartition"],lastVer:["1.0.1.35","1.0.1.29","1.0.1.35","1.0.0.18","1.0.0.8"],miniVer:[(ag()=="foxmail.com")?"1.0.0.5":"1.0.1.28","1.0.1.28","1.0.1.28","1.0.0.11","1.0.0.7"]},_moInfos_FF:{path:"/xpi/",xpi:"TencentMailPlugin.xpi",obj:["ScreenCapture","","Uploader","FTNUpload",""],available:["ScreenCapture","Uploader","FTNUpload"],name:["QQMail Plugin","","QQMail Plugin","Tencent FTN plug-in","QQMail Plugin"],type:(function(){
var a4="application/txftn",a5="application/txftn-webkit";
return ["application/x-tencent-qmail","","application/x-tencent-qmail",(typeof navigator.mimeTypes!="undefined")&&navigator.mimeTypes[a5]?a5:a4,"application/x-tencent-qmail"];
})(),lastVer:["1.0.1.35","","1.0.1.35","1.0.0.3","1.0.0.0"],miniVer:["1.0.1.28","","1.0.1.28","1.0.0.1","1.0.0.0"]},_moInfos_WebKit:{path:"/crx/",crx:"TencentMailPlugin.crx",exe:"QQMailWebKitPlugin.exe",obj:["ScreenCapture","","Uploader","FTNUpload",""],available:["ScreenCapture","FTNUpload"],name:["QQMail Plugin","","QQMail Plugin","Tencent FTN plug-in",""],type:["application/x-tencent-qmail-webkit","","application/x-tencent-qmail-webkit","application/txftn-webkit",""],lastVer:["1.0.1.35","","1.0.1.35","1.0.0.3",""],miniVer:["1.0.1.28","","1.0.1.28","1.0.0.1",""]},_moInfos_WebKitForMac:{path:"/crx/",pkg:"TencentMailPluginForMac.pkg",obj:["ScreenCapture","","Uploader","FTNUpload",""],available:["ScreenCapture","Uploader"],name:["QQMailPlugin","","QQMailPlugin","Tencent FTN Plug-in",""],type:["application/x-tencent-qmail-webkit","","application/x-tencent-qmail-webkit","application/txftn",""],lastVer:["1.0.1.34","","1.0.1.34","1.0.0.3",""],miniVer:["1.0.1.34","","1.0.1.34","1.0.0.3",""]},mbAblePlugin:an(10.6),mbAbleUsePlugin:an(10.6),_mbIsChecked:true,getTitle:function(){
return L?"\u63A7\u4EF6":"\u63D2\u4EF6";
},getinfo:function(){
if(c.mbAblePlugin)
{
if(aa)
{
if(L)
{
return c._moInfos.available;
}
if(K)
{
return c._moInfos_FF.available;
}
if(I||W||Q||U)
{
return c._moInfos_WebKit.available;
}
}
if(O)
{
return c._moInfos_WebKitForMac.available;
}
}
return [];
},installer:function(a5,a4){
var a6=this.get("whole"),a7="";
if(/^online/.test(a5))
{
a7=a6.cab||a6.xpi||(I&&a6.crx);
}
else if(/^download/.test(a5))
{
if(a4)
{
if(a4=='chrome')
{
a6=this.get("whole",'WebKit');
}
else{
a6=this.get("whole",a4);
}
}
if(a4)
{
a7=a6.exe||a6.pkg;
}
else{
a7=(!I&&a6.exe)||a6.pkg;
}
if(a4=='chrome')
{
a7=a6.crx;
}
}
if(a7&&/Abs$/.test(a5))
{
a7=a6.path+a7;
}
return a7;
},get:function(a5,a4){
if(!a4)
{
L&&(a4="IE");
K&&(a4='FF');
(I||W||Q||U)&&(a4="WebKit");
!L&&O&&(a4="mac");
}
var a7={IE:this._moInfos,FF:this._moInfos_FF,WebKit:this._moInfos_WebKit,mac:this._moInfos_WebKitForMac}[a4];
if(!this._mbIsChecked)
{
this._grayUpdate();
}
if(a5=="whole")
{
return a7;
}
else if(a5=="cab")
{
var a6=x(0),a8=a6?"":"_2.dll";
try{
a8=a6.GetDLLFileName();
}
catch(a9)
{
}
return a7["cab"][a8&&a8.indexOf("_2.dll")!=-1?0:1];
}
return a7[a5];
}};
function x(a4,a5)
{
if(!L)
{
return B(a4,false,a5);
}
if(a4>=0&&a4<=4)
{
var a6=c.get("obj");
for(var a8=0,a9=a6.length;a8<a9;a8++)
{
try{
return new ActiveXObject(a6[a8][a4]);
}
catch(a7)
{
}
}
}
return null;
}
function C(a4,a5,a6,a7)
{
if(!L)
{
return D(a4,a5,a6,a7);
}
var a9=typeof (a6)=="undefined",a8=false,ba=a9?x(a4):a6,bb=ad(ba);
if(ba&&bb)
{
if(a5!=1&&a5!=2)
{
a8=true;
}
else if(an._compareVersion(bb,c.get(a5==1?"miniVer":"lastVer")[a4])>=0)
{
a8=true;
}
if(a9)
{
delete ba;
ba=null;
}
}
return a8;
}
function ad(a4)
{
if(!L)
{
return am(a4);
}
var a7="",a5;
try{
a5=typeof (a4)=="number"?x(a4):a4;
a7=a5&&(a5.version?a5.version:"1.0.0.8")||"";
}
catch(a6)
{
}
return a7;
}
function ap()
{
return aD;
}
function w(a4)
{
if(!c.mbAbleUsePlugin)
{
return false;
}
try{
navigator.plugins.refresh(false);
}
catch(a9)
{
}
var a6=c.get("name")[a4],a8=c.get("type")[a4],a5=navigator.plugins;
if(a5&&a6)
{
for(var ba=a5.length-1;ba>=0;ba--)
{
for(var bb=a5[ba].length-1;bb>=0;bb--)
{
if(a5[ba].name.indexOf(a6)!=-1&&a5[ba][bb].type==a8)
{
if(a4!=3&&(aw.indexOf("vista")>-1||/nt 6/gi.test(aw))&&a8=="application/x-tencent-qmail")
{
var a7=a5[ba].description.split('#')[1];
if(!a7)
{
continue;
}
}
var a7=/(\d+(?:\.\d+)+)/.test(a5[ba].description||"")?RegExp.$1:"1.0.0.0";
if(O&&a4!=3&&a7=="1.0.0.0")
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
function B(a5,a4,a6,a7)
{
var a8=null;
a6=a6||window;
switch(a5)
{case 0:
case 2:
case 4:
if(W)
{
B._createQQMailPlugin(a5,a6,a7);
}
a8=B._createQQMailPlugin(a5,at(),a7);
break;
case 3:
a8=z(a6,a7);
break;
}if(!a4&&w(a5))
{
aO("delay","all",f(['stat=ff_addon','&type=%type%&info=%info%'],'%').replace({type:!a8?"failcreatePlugin":"successcreatePlugin",info:["ver:",aA,",pluginId:",a5,",brtpe:",(K?1:(I?2:(W?3:(Q?4:5))))].join("")}));
}
return a8;
}
B._createQQMailPlugin=function(a4,a5,a6){
var a7,a8=null,bb=K?"application/x-tencent-qmail":"application/x-tencent-qmail-webkit";
a5=a5||at();
if(w(a4))
{
var ba=a6||"QQMailFFPluginIns";
if(!(a7=e(ba,a5)))
{
aJ(a5.document.body,"beforeEnd",f('<embed id="$id$" type="$type$" hidden="true"></embed>').replace({type:bb,id:ba}));
a7=e(ba,a5);
}
var a9={0:"CreateScreenCapture",2:"CreateUploader",4:"CreateDragDropManager"}[a4];
if(typeof a7[a9]!="undefined")
{
a8=a7[a9]();
if(a4==0)
{
a8.OnCaptureFinished=function(){
};
}
else if(a4==2)
{
a8.OnEvent=function(){
};
}
}
}
return a8;
};
B._createFTNPlugin=function(a4,a5){
var a6=null,a8=c.get("whole")["type"][3],a7=a5||"npftnPlugin";
a4=a4||at();
if(!(a6=e(a7,a4)))
{
aJ(a4.document.body,"beforeEnd",f('<embed id="$id$" type="$type$" style="z-index:99999;position:absolute;top:0;left:0;width:1px;height:1px;"></embed>').replace({type:a8,id:a7}));
a6=e(a7,a4);
if(a6)
{
a6.onEvent=function(){
};
}
}
return a6;
};
function z(a4,a5)
{
if(!w(3))
{
return null;
}
B._createFTNPlugin(a4,a5);
var a6=B._createFTNPlugin(at(),a5);
if(a5)
{
aO("delay","all",f(['stat=ff_addon','&type=%type%&info=%info%'],'%').replace({type:a6&&a6.Version?"successcreatePlugin":"failcreatePlugin",info:["ver:",aA,",pluginId:3,insId:",a5].join("")}));
}
return a6.Version?a6:null;
}
function D(a5,a4,a6,a7)
{
var a8=false;
var a9=a6||B(a5,true,null,a7),ba=am(a9);
if(a9&&ba)
{
if(a4!=1&&a4!=2)
{
a8=true;
}
else if(parseInt(am(a9).split(".").join(""))>=parseInt(c.get(a4==1?"miniVer":"lastVer")[a5].split(".").join("")))
{
a8=true;
}
}
return a8;
}
function am(a4)
{
var a5,a7="";
try{
a5=typeof (a4)=="number"?B(a4,true):a4;
a7=(a5&&a5.Version)||"";
}
catch(a6)
{
}
return a7;
}
function aY()
{
return +new Date();
}
var n={};
function aO()
{
return n._ossLog.apply(n,arguments);
}
n._ossLog=function(a5,a7,a6,a4){
var ba=this,bc=a5||"realtime",bb=ba._pasteLog(a6),a9=ba._oLogList||(ba._oLogList=[]),a8=typeof a7=="number"?a7:{all:1}[a7||"all"]||0.1;
if(bc=="realtime")
{
ba._isSample(a8)&&ba._doReport(bb);
}
else{
ba._isSample(a8)&&a9.push(["delayurl","=",encodeURIComponent(bb)].join(""));
a9.length>=1000?ba._doReport():(!ba._nTimer&&a9.length>0&&(ba._nTimer=setTimeout(ba._doReport,5*1000)));
}
};
n._doReport=function(a4){
var a6=aO,a5=a6._oLogList||(a6._oLogList=[]);
if(a4||a5.length>0)
{
d.send("/cgi-bin/getinvestigate",{method:"POST",timeout:500,content:f('sid=$sid$&$rl$&$ls$').replace({sid:aq(),rl:a4,ls:a5.join("&")})});
a5.length=0;
a6._nTimer&&clearTimeout(a6._nTimer);
a6._nTimer=null;
}
};
n._isSample=function(a4){
return (this._nTimeStamp||(this._nTimeStamp=aN()))%100<100*a4;
};
n._pasteLog=function(a4){
var a5=[];
typeof a4=="string"?a5.push("&",a4):a(a4,function(a7,a6){
a5.push("&",a6,"=",encodeURIComponent(a7));
});
return a5.shift()&&a5.join("");
};
function b(a5)
{
var a4=at().extend({type:"session_statistics"},a5);
if(!a4.businame||!a4.item)
{
return false;
}
else if((a4.type=="session_statistics"||a4.type=="session_str_statistics")&&!a4.sid)
{
return false;
}
new Image().src="/cgi-bin/sellonlinestatic?type="+a4.type+"&businame="+a4.businame+"&item="+a4.item+"&r="+Math.random()+(a4.sid?"&sid="+a4.sid:"");
}
function aj()
{
var a5=this,a4=at()||window;
if(a4&&a4.goExpers&&a4.goExpers.localUpload)
{
return "RawLocal";
}
else if(a5.h5cDetectForNormal())
{
return "H5CPopupMail";
}
else if(a5.qmFlash&&a5.qmFlash.isSupported()&&!(a4.goExpers&&a4.goExpers.dropFlash))
{
return "FlashPopupFMail";
}
else{
return "NoFlash";
}
}
function a3()
{
var a4=this.getNormalUploadCom();
return a4=="H5CPopupMail"||a4=="FlashPopupFMail";
}
function aG()
{
var a4=window.document.createElement('input');
a4.type='file';
return 'multiple' in a4&&window.File!=h&&window.XMLHttpRequest!=h&&(new XMLHttpRequest()).upload!=h;
}
function aE()
{
var a5=this,a4=at()||window;
return typeof Array.prototype.every=='function'&&(!a5.isBrowser('firefox')||(a5.isBrowser('firefox')&&parseFloat(a5.gsFFVer)>50))&&((a4.goExpers&&a4.goExpers.h5cJsUpload)||aK())&&a5.html5DetectForNormal()&&(!a5.isBrowser('ie')&&!/Trident\/[67]\./.test(aw))&&'Promise|FileReader|DataView|ArrayBuffer|Uint8Array|URL|Blob'.split('|').every(function(a6){
return a6 in window;
});
}
return {isBrowser:function(a4){
return ({ie:L,safari:W,chrome:I,edge:J,firefox:K})[a4];
},browserVer:function(){
return av;
},getDomWin:function(a4){
var a5=a4.ownerDocument;
return a5.parentWindow||a5.defaultView;
},isSystem:function(a4){
return ({win:aa,mac:O})[a4];
},S:e,C:function(a4){
return document.createElement(a4);
},$:function(a5,a4){
return (a4||document).getElementsByTagName(a5);
},removeSelf:aU,attr:s,insertHTML:aJ,bodyScroll:t,contain:aL,show:aX,isShow:aM,getStyle:ar,hasClass:aF,addClass:p,setClass:aW,rmClass:aV,addEvent:q,addEvents:r,delEvent:aS,target:ah,stopPropagation:aZ,preventDefault:aP,QMAjax:d,get:function(a4,a5){
if(typeof a5=="function")
{
d.send(a4,{method:"GET",onload:a5});
}
else{
d.send(a4,{method:"GET",timeout:a5.nTimeout,onload:a5.oncomplete},a5.bGlobal&&(_oGlobalQMAjax||(_oGlobalQMAjax=new d())));
}
},getSid:aq,createActiveX:x,getUin:au,createBlankIframe:y,getCookie:af,unikey:a2,generateFlashCode:ac,detectActiveX:C,qmFlash:aQ,getParams:getParams,getPath:ak,E:a,trim:a0,T:f,TE:g,callBack:v,extend:F,htmlEncode:aI,htmlDecode:aH,ossLog:aO,LogKvEx:b,evalValue:function(a4){
var a5=at();
return a5.evalValue?a5.evalValue(a4):QMWin.evalVal(a4);
},funcProxy:function(a5,a4){
return function(){
a4.apply(a5,arguments);
};
},speedNow:aY,getSafariVer:ap,getNormalUploadCom:aj,useNewNormalUploadCom:a3,html5DetectForNormal:aG,h5cDetectForNormal:aE,gsFFVer:aA,getMigrateFlag:function(a4){
a4=a4||'';
return at()[a4];
}};
})();
(function(a,c){
var l={},h,m=window;
h=l.components={};
var b=[location.protocol,"//",location.hostname,"/cgi-bin/upload"].join("");
var g=function(){
};
function e()
{
var r=m.document.createElement('input');
r.type='file';
return 'multiple' in r&&m.File!=c&&m.XMLHttpRequest!=c&&(new XMLHttpRequest()).upload!=c;
}
function d()
{
var r;
if(typeof getTop=='function')
{
r=getTop();
}
else{
r={goExpers:{h5cJsUpload:true}};
}
return (r.goExpers&&r.goExpers.entDiskNewLogic||r.ftnApp!=='entdisk'&&r.ftnApp!=='favor')&&!(r.goExpers&&r.goExpers.localUpload)&&typeof Array.prototype.every=='function'&&r.goExpers&&r.goExpers.h5cJsUpload&&(!r.gbIsFF||(r.gbIsFF&&parseFloat(r.gsFFVer)>50))&&(!r.gbIsIE&&!/Trident\/[67]\./.test(navigator.userAgent))&&e()&&'Promise|FileReader|DataView|ArrayBuffer|Uint8Array|URL|Blob'.split('|').every(function(s){
return s in window;
});
}
function q()
{
var r;
if(typeof getTop=='function')
{
r=getTop();
}
else{
r={goExpers:{wasmJsUpload:true}};
}
return (r.goExpers&&r.goExpers.wasmJsUpload)&&r.ftnApp!=='entdisk'&&a.isBrowser("chrome")&&d()&&typeof WebAssembly=='object'&&[WebAssembly.compile,WebAssembly.instantiate,WebAssembly.Memory].every(function(s){
return typeof s=='function';
});
}
var j=function(){
};
j.prototype={create:function(s,r){
var u=this._getService(s),t=h[u];
debug("original logic, uploader implement:"+u);
r.sType=s;
if(t)
{
if(/Flash/.test(u)&&!/FlashH5/.test(u))
{
new h["RawinputPopup"](r);
}
return new t(r);
}
},orders:{"base":["base"],"popup":["WasmH5CPopupMail","H5CPopupMail","RawinputPopupMail","RawinputPopup"],"drag":["H5CDragFMail","Html5Drag","ActivexDrag"],"paste":["ActivexPaste"]},detects:{"base":function(){
return true;
},"RawinputPopupMail":function(){
return true;
},"RawinputPopup":function(){
if(getTop().ftnApp=='entdisk')
{
return !(getTop().goExpers&&getTop().goExpers.entDiskNewLogic);
}
else if(getTop().ftnApp)
{
return !(getTop().goExpers&&getTop().goExpers.ftnNewLogic);
}
else{
return true;
}
},"ActivexPopup":function(){
return a.isBrowser("ie")&&a.detectActiveX(2);
},"FlashPopup":function(){
return a.qmFlash&&a.qmFlash.isSupported()&&!(getTop().goExpers&&getTop().goExpers.dropFlash);
},"FlashH5PopupMail":function(){
return !a.isBrowser("ie")&&e;
},"FlashPopupFMail":function(){
return a.qmFlash&&a.qmFlash.isSupported();
},"Html5Popup":e,"WasmH5CPopupMail":q,"H5CPopupMail":function(){
return a.h5cDetectForNormal();
},"Ftn":function(){
return a.detectActiveX(3,1);
},"ActivexDrag":function(){
return a.detectActiveX(4,1);
},"H5CDragFMail":function(){
return d();
},"Html5Drag":e,"FlashH5DragMailCROS":function(){
return e()&&window.location.host.match(/exmail\.qq\.com$/)&&!(location.protocol=="https:")&&(a.browserVer!=10)&&!(getTop().goExpers&&getTop().goExpers.dropFlash);
},"Html5DragCROS":function(){
return e()&&window.location.host.match(/exmail\.qq\.com$/)&&!(location.protocol=="https:")&&(a.browserVer!=10);
},"H5CDragFMailCROS":function(){
return d()&&(a.browserVer!=10);
},"ActivexPaste":function(){
return a.detectActiveX(2);
}},_getService:function(r){
var t=this.orders[r];
if(t)
{
for(var u in t)
{
var s=this.detects[t[u]];
if(s&&s(r))
{
return t[u];
}
}
}
return null;
}};
var k=new j();
l.qmCreater=j;
l.oCreater=k;
var n=function(){
};
n.prototype={create:function(s,r){
var u=this._getService(s),t=h[u];
debug("FTN logic, uploader implement:"+u);
r.sType=s;
if(t)
{
if(/Flash/.test(u))
{
new h["RawinputPopup"](r);
}
return new t(r);
}
},orders:{"base":["base"],"popup":["H5CPopupMail","Html5Popup","ActivexPopup","RawinputPopupMail","RawinputPopup"],"popupflash":["FlashPopup","RawinputPopup"],"drag":["H5CDragFMail","Html5Drag","ActivexDrag"],"paste":["ActivexPaste"]},detects:{"base":function(){
return true;
},"RawinputPopupMail":function(){
return true;
},"RawinputPopup":function(){
if(getTop().ftnApp=='entdisk')
{
return !(getTop().goExpers&&getTop().goExpers.entDiskNewLogic);
}
else if(getTop().ftnApp)
{
return !(getTop().goExpers&&getTop().goExpers.ftnNewLogic);
}
else{
return true;
}
},"ActivexPopup":function(){
return a.isBrowser("ie")&&a.detectActiveX(2);
},"WasmH5CPopupMail":q,"H5CPopupMail":function(){
return a.h5cDetectForNormal();
},"FlashPopupFMail":function(){
return a.qmFlash&&a.qmFlash.isSupported()&&!(getTop().goExpers&&getTop().goExpers.dropFlash);
},"FlashPopup":function(){
return a.qmFlash&&a.qmFlash.isSupported()&&!(getTop().goExpers&&getTop().goExpers.dropFlash);
},"H5CDragFMail":function(){
return d();
},"Html5Popup":e,"Ftn":function(){
return a.detectActiveX(3,1);
},"ActivexDrag":function(){
return a.detectActiveX(4,1);
},"Html5Drag":e,"ActivexPaste":function(){
return a.detectActiveX(2);
}},_getService:function(r){
var t=this.orders[r];
if(t)
{
for(var u in t)
{
var s=this.detects[t[u]];
if(s&&s(r))
{
return t[u];
}
}
}
return null;
}};
var f=new n();
l.multiCreater=n;
l.create=function(s,r){
return k.create(s,r);
};
l.createForFTN=function(s,r){
if(a.useNewNormalUploadCom&&(typeof a.useNewNormalUploadCom=="function")&&a.useNewNormalUploadCom())
{
debug("default domain, flash support");
return f.create(s,r);
}
else{
debug("custom domain or flash unsupport");
return k.create(s,r);
}
};
l.createCom=function(s,r,t){
var u=h[t],w=(u&&new u())||{},v=function(){
if(arguments.length>0)
{
this.name=s;
var x=this.init_||this.init;
x.apply(this,arguments);
}
};
v.prototype=w;
a.extend(v.prototype,typeof (r)=="function"?r(u.prototype):r);
h[s]=v;
};
var o=function(r){
var s=this;
s._moInfo={};
s.set(r);
};
o.prototype={set:function(r,s){
var t=this;
if(!r)
{
return;
}
if(typeof r=="object")
{
a.extend(t._moInfo,r);
}
else{
t._moInfo[r]=s;
}
return t;
},get:function(r){
var s=this;
if(r)
{
return s._moInfo[r];
}
else{
return s._moInfo;
}
},errInfo:function(){
var r=this;
r.oUploader.errInfo(r._moInfo.sError);
},upload:function(){
var r=this;
r.oUploader.upload(r);
},destroy:function(){
var r=this;
r.oUploader.rmFile(r);
},cancel:function(){
var r=this;
r.oUploader.cancel(r);
},uploader:function(){
return this.oUploader;
}};
var p=function(r){
o.call(this,r);
};
p.prototype=new o({});
p.prototype.uploadToFtn=function(){
var r=this;
return r.oUploader.uploadToFtn(r);
};
l.qmFile=o;
l.oUtil={isFileDragOver:function(r){
var t=r.dataTransfer.types,s=false;
if(t===null)
{
return true;
}
else{
a.E(t,function(u){
if(u=="Files")
{
s=true;
return true;
}
});
return s;
}
},cfg2Url:function(r){
var u=r.sUrl,t=[],s=r.oQueryData;
a.E(s,function(v,w){
t.push([w,encodeURIComponent(v||"")].join("="));
});
return [u,t.join("&")].join(u.indexOf("?")>0?"&":"?");
}};
l.createCom("base",{init:function(r){
var t=this,s={};
if(typeof r=="function")
{
r=r.call(t,t.name);
}
t._moFiles={};
r.sUrl=r.sUrl||b;
r.sFile=r.sFile||"UploadFile";
r.oQueryData=r.oQueryData||{};
r.oBodyData=r.oBodyData||{};
t.oCfg=r;
t.initCallBack(r);
},initCallBack:function(r){
var s=this;
s._moCallBacks=a.extend(s._moCallBacks||{},(r.oMgr&&r.oMgr.oCfg)||r||{});
},qmFile:o,qmFtnFile:p,nConcurrent:1,callBack:function(s,r){
var v=this,u=v.oCfg,t=v._moCallBacks[s]||g;
t.apply(u.oMgr||v,r);
},setKeepAlive:function(r){
var s=this;
if(r)
{
if(s._mnKeepAlive)
{
return;
}
s._mnKeepAlive=setInterval(function(){
a.QMAjax.send("/cgi-bin/readtemplate?t=keep_alive&ef=js&sid="+a.getSid(),{method:"GET",headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},onload:function(t,v,u){
if(v.indexOf("<!--cgi exception-->")!=-1&&v.indexOf('errcode : "-2"')!=-1)
{
var x=s.getFile();
for(var y in x)
{
var w=x[y];
if(w.get("sStatus")=="uploading")
{
w.fCancel&&w.fCancel();
s.onerror(w);
}
}
}
}});
},15*60*1000);
}
else{
clearInterval(s._mnKeepAlive);
s._mnKeepAlive=null;
}
},getUploadingCnt:function(){
var t=this,r=0,s=t.getFile();
for(var u in s)
{
if(s[u].get("sStatus")=="uploading")
{
r+=1;
}
}
return r;
},checkClearAlive:function(){
var r=this;
setTimeout(function(){
if(r.getUploadingCnt())
{
r.setKeepAlive(false);
}
},2000);
},isBusy:function(){
var r=this;
return r.getUploadingCnt()>=r.nConcurrent;
},cancel:function(r){
var s=this;
if(r.get("sStatus")=="uploading")
{
r.set("sStatus","cancel");
s.calcUsedTime(r);
s.ossLog(r);
r.fCancel&&r.fCancel();
}
else if(r.get("sStatus")=="ready")
{
r.set("sStatus","cancel");
}
clearInterval(r._nWaitProcess);
clearTimeout(r._nTimer);
s.rmFile(r);
},onselect:function(r){
var s=this;
s.callBack("onselect",[r]);
},calcSpeed:function(r){
var v=this,s=new Date().valueOf();
if(!r.get("nSize"))
{
return;
}
if(!r._nLastProcssTime)
{
r._nLastProcessPercent=r.get("nUploadPercent");
r._nLastProcssTime=s;
return;
}
else if(s-r._nLastProcssTime>1000)
{
var u=r.get("nSize")*(r.get("nUploadPercent")-r._nLastProcessPercent)/100/(s-r._nLastProcssTime),t=r.get("nSize")*(100-r.get("nUploadPercent"))/100/u;
if(u>0)
{
r.set({nSpeed:(u/1024*1000).toFixed(2),nRemainTime:(t/1000).toFixed(2)});
}
r._nLastProcessPercent=r.get("nUploadPercent");
r._nLastProcssTime=s;
}
},onprocess:function(r){
var s=this;
if(r.get("nUploadPercent")>=100&&r.get("nPercent")>=80)
{
return;
}
s.calcSpeed(r);
r.set({sStatus:"uploading",sUploadStep:"posting",nPercent:r.get("nUploadPercent")*0.8});
s.callBack("onprocess",[r]);
if(r.get("nUploadPercent")==100)
{
r._nWaitProcess=setInterval(function(){
if(r.get("nPercent")>=99)
{
clearInterval(r._nWaitProcess);
return;
}
s.callBack("onprocess",[r.set({"nPercent":r.get("nPercent")+1,"sUploadStep":"waiting"})]);
},100);
}
},oncomplete:function(r){
var s=this;
if(r.get("sStatus")=="uploading")
{
var t=r.get("sStatus");
r.set("sStatus","complete");
s.calcUsedTime(r);
s.ossLog(r);
r.set("sStatus",t);
s.rmFile(r);
clearTimeout(r._nTimer);
r._nTimer=setTimeout(function(){
clearInterval(r._nWaitProcess);
r.set("sStatus","complete");
r&&r.get()&&s.callBack("oncomplete",[r]);
s.checkClearAlive();
},Math.max(1600-(new Date()).valueOf()+r.get("nUpTime"),0));
}
},onerror:function(r){
var s=this;
if(/(uploading)|(ready)|(stopped)/.test(r.get("sStatus")))
{
var t=r.get("sStatus");
r.set("sStatus","error");
s.calcUsedTime(r);
s.ossLog(r);
r.set("sStatus",t);
clearTimeout(r._nTimer);
r._nTimer=setTimeout(function(){
clearInterval(r._nWaitProcess);
r.set("sStatus","error");
r&&r.get()&&s.callBack("onerror",[r]);
s.checkClearAlive();
},Math.max(1600-(new Date()).valueOf()+r.get("nUpTime"),0));
}
},calcUsedTime:function(r){
var s=r.get("nUpTime");
if(s)
{
r.set("nUsedTime",new Date().valueOf()-r.get("nUpTime"));
}
},cfg:function(r){
return a.extend({},this.oCfg,r&&r.oCfg);
},upload:function(r){
},prepareUpload_:function(r){
var s=this;
if(!s.getFile(r.get("sId")))
{
s.addFile(r);
}
if(s.isBusy())
{
return false;
}
return true;
},getFile:function(r){
return arguments.length?this._moFiles[r]:this._moFiles;
},rmFile:function(r){
var s=this;
delete s._moFiles[r.get("sId")];
},addFile:function(r){
var t=this,s;
if(r instanceof t.qmFile)
{
s=r;
}
else{
r.sId=r.sId||a.unikey();
r.nTry=0;
r.sType=t.name;
if(t.name=="Html5Popup"||t.name=="H5CPopupMail")
{
s=new t.qmFtnFile(r);
}
else{
s=new t.qmFile(r);
}
s.oUploader=t;
}
s.set("sStatus","ready");
t._moFiles[s.get("sId")]=s;
return s;
}});
l.createCom("baseToFtn",function(r){
return ({qmFile:p,oncomplete:function(s){
var t=this;
if(s.get("bFtnFile"))
{
a.QMAjax.send(a.T("/cgi-bin/ftnGetURL?sid=$sid$&t=ftn.json&s=part&fid=$fid$&ef=js").replace({sid:a.getSid(),fid:s.get("sFileId")}),{onload:function(u,w,v){
if(u)
{
var x=a.evalValue(w),y;
if(x.errcode=="0")
{
if(x.oFile&&x.oFile.sKey&&x.oFile.sFetchCode)
{
s.set(x.oFile).set({sDownloadPage:["http://mail.qq.com/cgi-bin/ftnExs_download?t=exs_ftn_download&k=",x.oFile.sKey,"&code=",x.oFile.sFetchCode].join("")});
a.LogKvEx({businame:"fileupload",item:"flash|"+(t.name||"null")+"|uploadSucc",sid:a.getSid()});
r.oncomplete.call(t,s.set("sStatus","uploading"));
return;
}
else{
y=t.err("cgi",x.errcode);
}
}
else{
y=t.err("http",x.errcode);
}
a.LogKvEx({businame:"fileupload",item:"flash|"+(t.name||"null")+"|uploadError",sid:a.getSid()});
r.onerror.call(t,s.set({sError:y}));
}
else{
a.LogKvEx({businame:"fileupload",item:"flash|"+(t.name||"null")+"|uploadError",sid:a.getSid()});
r.onerror.call(t,s.set({sError:t.err("http",w)}));
}
}});
}
else{
r.oncomplete.call(t,s);
}
},uploadToFtn:function(s){
var u=this;
if(!u.prepareUpload_(s))
{
return false;
}
var t=s.get("nAppId")||2;
s.oCfg={sFlashMode:"RawPost"};
a.QMAjax.send(a.T("/cgi-bin/ftnCreatefile?sid=$sid$&path=$path$&type=direct&s=comCreate&appid=$appid$&dirid=$dirid$&ef=js&resp_charset=UTF8&loc=$loc$").replace({sid:a.getSid(),loc:["ftnCreatefile","ftnCreatefile","comCreate",(s.get("sFrom")||"")+t].join(","),appid:t,dirid:s.get("sPathId")||"",path:encodeURIComponent(s.get("sName"))}),{timeout:1*60*1000,headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},onload:function(v,x,w){
var y;
if(v)
{
y=a.evalValue(x);
if(y.errcode=="0"&&y.url)
{
s.set(y.data);
s.oCfg={sUrl:y.url,sFlashMode:"RawPost",sFile:"file",oQueryData:{},oBodyData:{mode:/Flash/.test(s.oUploader.name)?"flashupload":"formupload"}};
a.LogKvEx({businame:"fileupload",item:"ftnCreatefile|"+(u.name||"null")+"|createFileSucc",sid:a.getSid()});
u.upload(s.set("sStatus","ready"));
u.setKeepAlive(true);
return true;
}
}
a.LogKvEx({businame:"fileupload",item:"ftnCreatefile|"+(u.name||"null")+"|createFileFail",sid:a.getSid()});
u.onerror(s.set({nPercent:0,sError:(y&&y.errcode)?u.err("cgi",y.errcode,y.appname,y.errmsg):u.err("http",w.readyState==4?w.status:"abort")}));
}});
u.onprocess(s.set({nUploadPercent:0,bFtnFile:true,nUpTime:new Date().valueOf()}));
return true;
}});
},"base");
window.QMFileUpload=l;
})(QMFileAdaptor);
;(function(a){
function b(c)
{
return {safeStartUpdate_:function(d){
d.bCancelH5_=false;
d.set('nSize',parseInt(d.oH5File.size,10));
d._lastModified=d.oH5File.lastModified||+d.oH5File.lastModifiedDate;
d.fCancel=function(){
d.bCancelH5_=true;
};
},isFileModif_:function(d){
if(d._lastModified&&(d._lastModified!=(d.oH5File.lastModified||+d.oH5File.lastModifiedDate)))
{
d.fCancel&&d.fCancel();
this.onerror(d.set('sError',this.err('internal','77701')));
d._lastModified=null;
return false;
}
return true;
}};
}
QMFileUpload.getH5SafeLib=b;
})(QMFileAdaptor);
(function(a,d){
var f=QMFileUpload,e=f.components["base"].prototype;
var b={"unknow":100000000,"http":200000000,"cgi":300000000,"internal":400000000};
var c={"RawPost":3,"CheckPost":7,"MultiPost":9};
f.errInfo=e.errInfo=function(g){
};
e.ossLog=function(g){
var n=this,m=n.cfg(g),h,q=n.name,l=0,j=0;
if(g.get("sStatus")=="error")
{
var o=(g.get("sError")||"").split(",");
h=b[o[0]];
if(h)
{
if(g.get("nUploadPercent")<100&&o[0]=="internal")
{
h=500000000;
}
h+=Math.abs(o[1]);
}
}
else if(g.get("sStatus")=="cancel")
{
h=900000001;
}
else if(g.get("sStatus")=="stopped"&&g.get("sUploadStep")=="paused")
{
h=900000;
}
else if(g.get("sStatus")=="complete")
{
var k=g.get("nSize")/1024/1024,h=0;
if(k>=1&&k<6)
{
h=Math.floor(k);
}
else if(6<=k&&k<=50)
{
h=6;
}
else if(50<k&&k<=1024)
{
h=7;
}
else if(k>1024)
{
h=8;
}
h=h*100000;
if(g.get("nTry")>1)
{
h+=1000000;
}
if(/Flash/.test(q)&&(j=g.get("nPostMode")))
{
h+=(j*10000000);
}
}
if(typeof h=="undefined")
{
return;
}
if(/Flash/.test(q))
{
l=g.get("nUpType")||c[m.sFlashMode]||3;
if(g.get("bFtnFile"))
{
l=3;
}
}
else if(/Activex/.test(q))
{
l=2;
}
else if(/Rawinput/.test(q))
{
l=5;
}
else if(/Html5/.test(q))
{
l=1;
}
else if(/Ftn/.test(q))
{
l=6;
}
var p=/http:\/\/(.*?)\//.exec(n.cfg(g).sUrl);
a.ossLog("delay","all",a.T("stat=$stat$&ftype=$ftype$&utype=$utype$&errno=$errno$&retry=$retry$&fsize=$fsize$&utime=$utime$&percent=$percent$&errdetail=$errdetail$&uphost=$uphost$").replace({stat:m.bOssLog===false?"custom":"attach",retry:0,ftype:g.get("bFtnFile")?"1":"0",errno:h,utype:l,fsize:g.get("nRealPostSize")||g.get("nSize"),utime:g.get("nRealPostTime")||g.get("nUsedTime")||-1,percent:g.get("nUploadPercent"),uphost:p&&p[1],errdetail:g.get("sError")}));
},e.err=function(h,g){
return [].slice.call(arguments).join(",");
};
e.parser=function(h,g){
var m=this,k=m.cfg(g),l={},o="error";
if(/.*\/cgi-bin\/uploadfile/.test(k.sUrl))
{
var n;
if(h.indexOf("/data/")!=-1)
{
n=h.split("|");
l.sFileId=n[0].split("/").pop();
n[1]&&(l.sFileUrl=n[1]);
o="complete";
}
else if(n=/"errorcode" : "(.*)"/gi.exec(h))
{
o="error";
l.sError=m.err("cgi",n[1]);
}
}
else if(/.*\/cgi-bin\/upload/.test(k.sUrl))
{
if(/var\s*result\s*=\s*"qmfileuploadsuccess";/.test(h))
{
var n=/viewfileurl="(.*?)";/.exec(h);
l.sFileUrl=n&&(n[1]+"&sid="+a.getSid());
n=/filepath="(.*?)";/.exec(h);
l.sFilePath=n&&n[1];
l.sFileId=n&&n[1].split("/").pop();
o="complete";
n=/filesize="(.*?)";/.exec(h);
var j=parseInt(n&&n[1],10);
if(j)
{
l.nSize=j;
}
}
else if(/title\s*:\s*"cgi exception",/.test(h))
{
var n=/errcode\s*:\s*"(.*?)",/gi.exec(h);
l.sError=m.err("cgi",n?n[1]:"0");
}
}
else if(/\/ftn_handler/.test(k.sUrl))
{
var n=/parent\.ftn_post_end\((.*?)\)/.exec(h);
if(n[1]==0)
{
o="complete";
}
else{
l.sError=m.err("cgi",n?n[1]:"0");
}
}
if(o!="complete"&&!l.sError)
{
l.sError=m.err("unknow","0");
}
return [o,l];
};
})(QMFileAdaptor);
(function(a,b){
var e=QMFileUpload.components,g=window;
var f=QMFileUpload.oUtil;
var d=function(){
};
QMFileUpload.createCom("ActivexPopup",function(k){
return ({init:function(l){
var m=this;
k.init.call(m,l);
m._initCfg();
m._initContainer();
},_initCfg:function(){
var m=this,l=m.oCfg;
l.oQueryData=a.extend({resp_charset:a.isSystem("mac")?"UTF8":"",t:"qmfileupload",ef:"qdata",ssl_edition:a.getCookie("ssl_edition"),uin:a.getCookie("biz_username"),sid:a.getSid(),mode:"file"},l.oQueryData);
},upload:function(l){
var o=this,n=o.cfg(l);
if(!o.prepareUpload_(l))
{
return false;
}
var m=a.createActiveX(2,a.getDomWin(n.oContainer));
o._setRequest(l,n,m);
m.AddFormItem(n.sFile,4,0,l.get("sFid"));
l.set({sStatus:"uploading",nTry:l.get("nTry")+1,nUpTime:new Date().valueOf()});
l.fCancel=function(){
m.StopUpload();
};
m.StartUpload();
return true;
},_setEvent:function(l,m){
var n=this,o=m.get("sFid");
l.OnEvent=function(p,q,r,s,t){
switch(q)
{case 1:
n.onerror(m.set({sError:n.err("internal",r,s)}));
break;
case 2:
n.onprocess(m.set({nUploadPercent:r/s*100}));
break;
case 3:
debug(["OnEvent",l.ResponseCode,l.Response]);
if(l.ResponseCode!="200")
{
var w="";
if(l.ResponseCode==0)
{
for(var u in l)
{
w+=u+"="+l[u]+",";
}
}
n.onerror(m.set({sError:n.err("http",l.ResponseCode,"detail=",w)}));
}
else{
var v=n.parser(l.Response,m);
(n["on"+v[0]]||d).call(n,m.set(v[1]));
}
break;
}
};
},_setRequest:function(n,m,l){
var o=this;
o._setEvent(l,n);
l.URL=f.cfg2Url(m);
l.AddHeader("Cookie",document.cookie);
a.E(m.oBodyData,function(p,q){
l.AddFormItem(q,0,0,p);
});
},_parseFileList:function(m,l){
var p=this,n=l||a.createActiveX(2);
if(m&&typeof m=="string")
{
var o=[];
a.E(m.split("\r\n"),function(q){
var t=a.trim(q).split(" ");
if(t.length>=2)
{
var s,u=t.shift(),v=t.join(" "),r=parseInt(n.GetFileSize(v));
s=p.addFile({sFid:u,sStatus:"ready",sName:v.split(/[\\\/]/).pop(),nSize:r});
o.push(s);
}
});
p.onselect(o);
}
},_initContainer:function(){
var n=this,l=n.oCfg,m=l.oContainer;
a.addEvent(m,"click",function(o){
var p=a.createActiveX(2);
if(p)
{
var q=p.SelectFiles(g);
n._parseFileList(q,p);
a.stopPropagation(o);
}
});
}});
},"baseToFtn");
QMFileUpload.createCom("ActivexPaste",function(k){
return ({_initContainer:function(){
var n=this,l=n.oCfg,m=l.oContainer;
if(m&&l.bBindKeyDown)
{
a.addEvent(m,"keydown",function(o){
if((o.ctrlKey||o.metaKey)&&(o.keyCode==86||o.keyCode==118)&&!o.cancelBubble)
{
n.getClipBoardFiles(o);
}
});
}
},getClipBoardFiles:function(l){
var n=this,m=a.createActiveX(2);
if(m)
{
var o=m.GetClipboardFiles();
n._parseFileList(o);
if(o)
{
a.preventDefault(l);
}
}
}});
},"ActivexPopup");
function c()
{
var k=a.createActiveX(0),l="";
try{
l=k.GetDLLFileName();
}
catch(m)
{
}
if(l.indexOf("_2.dll")!=-1)
{
return ['<object classid="CLSID:B0F77C07-8507-4AB9-B130-CC882FDDC046"',' width=100% height=100%></object>'].join("");
}
else{
return ['<object classid="CLSID:F4BA5508-8AB7-45C1-8D0A-A1237AD82399"',' width=100% height=100%></object>'].join("");
}
}
var h='\u5C06\u6587\u4EF6\u62D6\u62FD\u81F3\u6B64\u533A\u57DF\uFF0C\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u5FEB\u6377\u952Ectrl+c\u3001ctrl+v\u6765\u6DFB\u52A0\u9644\u4EF6\u3002',j='\u91CA\u653E\u9F20\u6807';
a.extend(f,{getDragCode4Ax:c,sDragEnter:h,sDragOver:j});
QMFileUpload.createCom("ActivexDrag",function(k){
return ({_initContainer:function(){
var o=this,m=o.oCfg,l,n=m.oContainer;
n.innerHTML=c();
setTimeout(function(){
l=o._moActivexDom=n.firstChild;
a.extend(l,{text:h,backColor:0xffffff,textColor:0x000000,textFacName:"\u5B8B\u4F53",textFontSize:10,textFontWeight:500,OnFilesDroped:function(p){
o._onFilesDroped(p);
}});
},200);
},_onFilesDroped:function(l){
var n=this,m=n._moActivexDom;
switch(l)
{case "ENTER":
m.text=j;
break;
case "LEAVE":
m.text=h;
break;
case "OVER":
break;
default:
m.text=h;
n._parseFileList(l);
break;
};
}});
},"ActivexPopup");
})(QMFileAdaptor);
;(function(a){
var g=QMFileUpload,e=g.components,h=g.oUtil,b=[location.protocol,"//",location.hostname,"/cgi-bin/upload"].join("");
var c={"unknow":100000000,"http":200000000,"cgi":300000000,"internal":400000000};
var d={"RawPost":3,"CheckPost":7,"MultiPost":9};
var f=new g.multiCreater();
h.nMinDownloadFTNwidgetFileSize=200*1024*1024;
h.isNeedDownloadFTNwidget=function(l){
return l&&/Popup/i.test(l)&&!(/(Ftn|FlashH5|H5C)/i.test(l))&&!a.detectActiveX(3,1);
};
g.create=function(m,l){
return f.create(m,l);
};
g.create.oCreaterInstance=f;
g.getMailLib=function(l){
return ({defaultQueryData:function(){
return {};
},initConfg:function(m){
var p=this;
l.initConfg.apply(p,arguments);
var n=p.oCfg;
n.sUrl=n.sUrl||p.getMailUploadUrl();
n.oQueryData=a.extend(p.defaultQueryData(m),n.oQueryData);
if(n.business=="notebook")
{
n.oQueryData=a.extend(n.oQueryData,{type:n.type,filetype:n.filetype,business:n.business,t:n.t});
}
p.addToUrl(n.oQueryData);
var o=n.sUrl.match(/^(https?:)?\/\//i);
if(!o)
{
n.sUrl=[location.protocol,"//",location.hostname,n.sUrl.indexOf('/')===0?'':'/',n.sUrl].join('');
}
else if(!o[1])
{
n.sUrl=location.protocol+n.sUrl;
}
},addToUrl:function(m){
var o=this.oCfg.sUrl,n=[];
a.E(m,function(q,p){
if(q!==null)
{
n.push([p,encodeURIComponent(""+q)].join("="));
}
});
this.oCfg.sUrl=[(o.split("?")||"")[0],n.join("&")].join("?");
},ossLog:function(m){
var u=this;
if(typeof (m)=='string')
{
if(m=='flashInitError')
{
a.LogKV({sValue:'getinvestigate|fileupload|flashinit|error|'+u.name});
}
else if(m=='flashDLoadError')
{
a.LogKV({sValue:'getinvestigate|fileupload|flashdload|error'});
}
else if(m=='flashInit')
{
a.LogKV({sValue:'getinvestigate|fileupload|flashinit|'+u.name});
}
else if(m=='1sNoPercent')
{
a.LogKV({sValue:'getinvestigate|fileupload|1snopercent|'+u.name});
}
else if(m=='crash')
{
a.LogKV({sValue:'getinvestigate|fileupload|crash|'+u.name});
}
else if(m=='ppftnerror')
{
a.LogKV({sValue:'getinvestigate|fileupload|ppftnerror|'+u.name});
}
return;
}
var t=u.cfg(m),o,x=u.name,s=0,p=0;
var q=m.get("nSize")/1024/1024,r=0;
if(q>=1&&q<6)
{
r=Math.floor(q);
}
else if(6<=q&&q<=50)
{
r=6;
}
else if(50<q&&q<=1024)
{
r=7;
}
else if(q>1024)
{
r=9;
}
if(m.get("sStatus")=="error")
{
var v=(m.get("sError")||"").split(",");
o=c[v[0]];
if(/^size,-1,\d+$/i.test(m.get("sError")))
{
o=900000003;
}
else if(o)
{
if(m.get("nUploadPercent")<100&&v[0]=="internal")
{
o=500000000;
}
o+=Math.abs(v[1]);
o+=parseInt(r)*100000;
if(/Flash/.test(x)&&(p=m.get("nPostMode")))
{
o+=parseInt(m.get("nPostMode"))*10000000;
}
}
}
else if(m.get("sStatus")=="cancel")
{
o=typeof m.nLastPercentOssLog!="undefined"?900000002:900000001;
}
else if(m.get("sStatus")=="stopped"&&m.get("sUploadStep")=="paused")
{
o=900000;
}
else if(m.get("sStatus")=="uploading")
{
o=-1;
}
else if(m.get("sStatus")=="complete")
{
var o=0;
o=r*100000;
if(m.get("nTry")>1)
{
o+=1000000;
}
if(/Flash/.test(x)&&(p=m.get("nPostMode")))
{
o+=(p*10000000);
}
}
if(typeof o=="undefined")
{
return;
}
if(/Flash/.test(x))
{
s=t.utype||m.get("nUpType")||d[t.sFlashMode]||3;
if(m.get("bIsUptoFtnForNormal")===false)
{
if(s!=15&&s!=16&&s!=17&&m.get("bFtnFile"))
{
s=3;
}
}
}
else if(/Activex/.test(x))
{
s=2;
}
else if(/Rawinput/.test(x))
{
s=5;
}
else if(/Html5/.test(x))
{
s=1;
}
else if(/^Ftn/.test(x))
{
s=6;
}
else if(/ppFtn/i.test(x))
{
s=19;
}
var n=m.get("nRetryTimes")||0;
var w;
if((!m.get("bFtnFile")&&!m.get("bIsUptoFtnForNormal"))||m.get('nUploadPercent'))
{
w=/http:\/\/(.*?)\//.exec(t.sUrl);
}
a.ossLog("delay","all",a.T("stat=$stat$&ftype=$ftype$&utype=$utype$&errno=$errno$&retry=$retry$&fsize=$fsize$&utime=$utime$&percent=$percent$&fid=$fid$&errdetail=$errdetail$&uphost=$uphost$&filename=$filename$&bt=$bt$&block=$block$").replace({stat:t.bOssLog===false?"custom":"attach",retry:n,ftype:m.get("bFtnFile")?"1":"0",errno:o,utype:s,fsize:m.get("nRealPostSize")||m.get("nSize"),fid:m.get("bFtnFile")?(m.get("sFileId")||""):"",utime:o==900000003?0:(m.get("nRealPostTime")||m.get("nUsedTime")||-1),percent:m.get("nUploadPercent"),uphost:((w&&w[1])||m.get("sIP")),errdetail:m.get("sError"),filename:m.get("sName"),bt:a.gbIsIE&&1||a.gbIsFF&&2||a.gbIsWebKit&&3,block:u.nBlockSize&&(s==15||s==16||s==17||s==18)?u.nBlockSize:''}));
},parser:function(n,m){
var t=this,p=t.cfg(m),s={},x="error";
if(p.business=="notebook")
{
var w=/pickey\s*=\s*"(.*)"/gi.exec(n)[1];
if(w)
{
s.sFileId=w;
var y=/viewfileurl\s*=\s*"(.*)"/gi.exec(n)[1];
if(location.protocol.indexOf("https")>-1)
{
y=y.replace(/http/i,"https");
}
s.sFileUrl=y;
x="complete";
s.sFilePath=a.trim(n);
}
else if(u=/errorcode\s*=\s*"(.*)"/gi.exec(n))
{
x="error";
s.sError=t.err("cgi",u[1]);
}
else{
x="error";
s.sError=t.err("unknow",709390);
}
}
else if(p.sBusiness=="resume.import")
{
try{
var q=n.match(/##LOGIC_DATA_START##\s*([\s\S]+?)\s*##LOGIC_DATA_END##/);
var r=a.evalValue(a.htmlDecode(q[1]).replace(/\n/g,'\\n').replace(/\r/g,'\\r'));
if(r.result&&r.result.errCode)
{
x='error';
s.sError=t.err("cgi",r.result.errCode);
}
else{
x='complete';
}
s.resume=r.data;
}
catch(z)
{
x='error';
s.sError=t.err("unknow",709390);
}
}
else if(/.*\/cgi-bin\/uploadfile/.test(p.sUrl))
{
var u;
if(n.indexOf("/data/")!=-1)
{
u=n.split("|");
s.sFileId=u[0].split("/").pop();
if(s.sFileId)
{
u[1]&&(s.sFileUrl=u[1]);
x="complete";
}
else{
x="error";
s.sError=t.err("unknow",709394);
}
s.sFilePath=a.trim(n);
}
else if(u=/"errorcode" : "(.*)"/gi.exec(n))
{
x="error";
s.sError=t.err("cgi",u[1]);
}
else{
x="error";
s.sError=t.err("unknow",709390);
}
}
else if(/.*\/cgi-bin\/upload/.test(p.sUrl))
{
if(/var\s*result\s*=\s*"qmfileuploadsuccess";/.test(n))
{
var u=/viewfileurl="(.*?)";/.exec(n);
s.sFileUrl=u&&(u[1]+"&sid="+a.getSid());
u=/filepath="(.*?)";/.exec(n);
s.sFileId=u&&u[1].split("/").pop();
s.sFilePath=a.trim(u[1]);
u=/filesize="(.*?)";/.exec(n);
var o=parseInt(u&&u[1],10);
o&&(s.nSize=o);
u=/nf="(.*?)";/.exec(n);
var v=u&&u[1];
v&&(s.sNf=v);
if(s.sFileId)
{
x="complete";
}
else{
x="error";
s.sError=t.err("unknow",709395);
}
}
else if(/title\s*:\s*"cgi exception",/.test(n))
{
var u=/errcode\s*:\s*"(.*?)",/gi.exec(n);
s.sError=t.err("cgi",u?u[1]:"0");
}
else{
x="error";
s.sError=t.err("unknow",709397);
}
}
else if(/\/ftn_handler/.test(p.sUrl))
{
var u=/parent\.ftn_post_end\((.*?)\)/.exec(n);
if(u&&u[1]==0)
{
x="complete";
}
else{
s.sError=t.err("cgi",u?u[1]:"709398");
}
}
else{
s.sError=t.err("unknow","709399");
}
return [x,s];
},getMailUploadUrl:function(){
return b;
},callBack:function(n,m){
var o=this;
if(n=="onprocess")
{
o.setKeepAlive(true);
o._checkProcessStop(m);
}
else if(n=="oncomplete"||n=="onerror")
{
o.checkClearAlive();
}
l.callBack.apply(o,arguments);
},_checkProcessStop:function(m){
var o=this;
m=m[0];
if(m&&m.get("nPercent")>=0&&!m._nCheckProcessId)
{
var n=setInterval(function(){
if(m.get("sStatus")!="uploading")
{
clearInterval(m._nCheckProcessId);
return;
}
if(m.get("nPercent")==m._nLastPercent&&m.nLastPercentOssLog!=m._nLastPercent)
{
o.calcUsedTime(m);
o.ossLog(m);
m.nLastPercentOssLog=m._nLastPercent;
}
m._nLastPercent=m.get("nPercent");
},60000);
m._nCheckProcessId=n;
}
},setKeepAlive:function(m){
var n=this;
if(m)
{
if(n._mnKeepAlive)
{
return;
}
n._mnKeepAlive=setInterval(function(){
a.QMAjax.send("/cgi-bin/readtemplate?t=keep_alive&ef=js&sid="+a.getSid()+"&r="+Math.random(),{method:"GET",headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},onload:function(o,q,p){
if(q.indexOf("<!--cgi exception-->")!=-1&&q.indexOf('errcode : "-2"')!=-1)
{
var s=n.getFile();
for(var t in s)
{
var r=s[t];
if(r.get("sStatus")=="uploading")
{
r.fCancel&&r.fCancel();
n.onerror(r);
}
}
}
}});
},15*60*1000);
}
else{
clearInterval(n._mnKeepAlive);
n._mnKeepAlive=null;
}
},checkClearAlive:function(){
var m=this;
setTimeout(function(){
if(m.getUploadingCnt())
{
m.setKeepAlive(false);
}
},2000);
},uploadToFtnForNormalAttachment_:function(m){
var o=this,n=m.get("nAppId")||72;
if(!o.prepareUpload_(m))
{
return false;
}
;a.QMAjax.send(['/cgi-bin/uploadunite?func=CreateFile&&inputf=json&outputf=json&&sid=',a.getSid()].join(""),{method:'post',headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},content:a.T('{"path":"$path$","appid":"$appid$","size":$size$}').replace({appid:n,path:encodeURIComponent(m.get("sName")),size:m.get("nSize")}),onload:function(p,r,q){
var s,t=window.gnTestSvr?window.gnTestSvr:"";
if(p)
{
s=a.evalValue(r);
if(s.result.errCode=="0"&&s.url)
{
m.set(s.data);
m.oCfg=a.extend(m.oCfg||{},{sUrl:t?s.url.replace(/(:?\d+\.){3}(:?\d+)\:\d{4}/gi,t):s.url,sFile:"file",bToFtn:true,oQueryData:{},oBodyData:{mode:/Flash/.test(m.oUploader.name)?"flashupload":"formupload"}});
o.upload(m.set("sStatus","ready"));
return true;
}
}
o.onerror(m.set({nPercent:0,sError:(s&&s.result&&s.result.errCode)?o.err("cgi",s.result.errCode,s.appname):o.err("http",r=='abort'?-1:q.status)}));
}});
o.onprocess(m.set({nUploadPercent:0,bFtnFile:true,nUpTime:new Date().valueOf()}));
return true;
},oncomplete:function(m){
var n=this;
if(m.get("bIsUptoFtnForNormal"))
{
n._fChenkIsPoison(m);
}
else{
n.oncompleteToFtn(m);
}
},_fChenkIsPoison:function(m){
var n=this;
var p=m.oUploader.name;
if(/Flash/.test(p))
{
var o=n.getFlash().getFileHeadContent();
n._fCheckFileCallback(m,o||"");
}
else if(/Html5/.test(p))
{
n._fCheckFileByH5(m,_fCheckFileCallback);
}
else{
n._fCheckFileCallback(m,"");
}
},_fCheckFileCallback:function(m,n){
var o=this;
var p=/\.(\w+)$/.test(m.get("sName"))&&RegExp.$1;
a.QMAjax.send(['/cgi-bin/upload?saction=checkattach&inputf=json&outputf=json&sid=',a.getSid()].join(""),{method:'post',headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},content:a.T('fileid=$fileid$&data=$data$&suffix=$suffix$&md5=$md5$&mailid=$mailid$').replace({fileid:m.get("sFileId"),data:n||"empty",suffix:p,md5:m.get("sMD5"),mailid:m.get("sMailId")}),onload:function(q,s,r){
if(q)
{
function t(z,A,x,y)
{
var C,B;
C=z.indexOf(A);
B=z.indexOf(x);
if(C!=-1&&B!=-1&&C<B)
{
return z.substring(C+y,B);
}
}
var u=t(s,'<ret>','</ret>',5);
if(u==0)
{
if(m.get('sFileId'))
{
getTop().getMainWin().QMAttach._moUploadFtnFileId.push(m.get('sFileId'));
var v=t(s,'<sFileType>','</sFileType>',11),w=t(s,'<sUrl>','</sUrl>',6);
if(v==1)
{
m.set('sFileUrl',w);
getTop().getMainWin().QMAttach._moCurUploadAttachInfo['sFileUrl']=w;
}
l.oncomplete.call(o,m.set("sStatus","uploading"));
}
}
}
else{
l.onerror.call(o,m.set({sError:o.err("http",s)}));
}
}});
},_fCheckFileByH5:function(n,m){
var p=this;
var o=new FileReader();
o.onload=function(q){
m.call(p,n,q.currentTarget.result||"");
};
o.onError=function(q){
var r=q.target.error;
p.onerror(n.set({nUpType:p.getFlash().getCurUptype(),sError:p.err("html5fd",r.code,r.name)}));
};
o.readAsDataURL(p.getFileSliceFunc_().call(n.oH5File,0,128));
}});
};
var j=g.qmFile;
var k=function(l){
j.call(this,l);
};
k.prototype=new j({});
k.prototype.uploadToFtn=function(){
var l=this;
return l.oUploader.uploadToFtn(l);
};
g.getFtnLib=function(l){
return ({qmFile:k,oncompleteToFtn:function(m){
var n=this;
if(m.get("bFtnFile"))
{
a.QMAjax.send(a.T("/cgi-bin/ftnGetURL?sid=$sid$&t=ftn.json&s=part&fid=$fid$&ef=js").replace({sid:a.getSid(),fid:m.get("sFileId")}),{onload:function(o,q,p){
if(o)
{
var r=a.evalValue(q)||{},s;
if(r.errcode=="0")
{
if(r.oFile&&r.oFile.sKey&&r.oFile.sFetchCode)
{
m.set(r.oFile).set({sDownloadPage:["http://mail.qq.com/cgi-bin/ftnExs_download?t=exs_ftn_download&k=",r.oFile.sKey,"&code=",r.oFile.sFetchCode].join(""),nExpireTime:r.oFile.expiretime!=-1?r.oFile.expiretime:2592000});
l.oncomplete.call(n,m.set("sStatus","uploading"));
return;
}
else{
s=n.err("cgi",r.errcode);
}
}
else{
s=n.err("http",r.errcode);
}
l.onerror.call(n,m.set({sError:s}));
}
else{
l.onerror.call(n,m.set({sError:n.err("http",q)}));
}
}});
}
else{
l.oncomplete.call(n,m);
}
},uploadToFtn:function(m){
var o=this,n=m.get("nAppId")||72;
if(!o.prepareUpload_(m))
{
return false;
}
o.onprocess(m.set({nUploadPercent:0,nTry:m.get('nTry')+1,bFtnFile:true,nUpTime:new Date().valueOf()}));
a.QMAjax.send(a.T("/cgi-bin/ftnCreatefile?sid=$sid$&path=$path$&type=direct&s=comCreate&appid=$appid$&dirid=$dirid$&ef=js&resp_charset=UTF8&loc=$loc$").replace({sid:a.getSid(),loc:["ftnCreatefile","ftnCreatefile","comCreate",(m.get("sFrom")||"")+n].join(","),appid:n,dirid:m.get("sPathId")||"",path:encodeURIComponent(m.get("sName"))}),{headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},onload:function(p,r,q){
var s,t=window.gnTestSvr?window.gnTestSvr:"";
if(p)
{
s=a.evalValue(r);
if(s.errcode=="0"&&s.url)
{
m.set(s.data);
m.oCfg=a.extend(m.oCfg||{},{sUrl:t?s.url.replace(/(:?\d+\.){3}(:?\d+)\:\d{4}/gi,t):s.url,sFile:"file",bToFtn:true,oQueryData:{},oBodyData:{mode:/Flash/.test(m.oUploader.name)?"flashupload":"formupload"}});
o.upload(m.set("sStatus","ready"));
return true;
}
}
o.onerror(m.set({nPercent:0,sError:(s&&s.errcode)?o.err("cgi",s.errcode,s.appname):o.err("http",r=='abort'?-1:q.status)}));
}});
return true;
}});
};
})(QMFileAdaptor);
(function(a,d){
var j=QMFileUpload,h=j.components;
var k=QMFileUpload.oUtil;
var g=function(){
};
var c=a.T(["top:0;left:0;","position:absolute;","cursor:pointer;","width:100%;","height:100%;","overflow:hidden;","background-color:#fff;","filter: alpha(opacity=0);","zoom:1;","opacity:0.0;","z-index:999999999;"]);
var b=a.T(['cursor: pointer;','font-family: Times;','position: absolute;','cursor: pointer;','width:2000px;','height:',(a.isBrowser('edge')||a.isBrowser('ie'))?30:600,'px;',a.isBrowser("ie")?'font-size:500px;':'',a.isBrowser("ff")&&parseInt(a.gsFFVer)<22?'right:426px;':'right:0px;']);
var e=function(l){
return {createInput_:function(m){
var p=this,n=p.oCfg,o=m.createElement("input");
o.type="file";
if(n.sInputTitle)
{
o.title=n.sInputTitle;
}
else if(!a.isBrowser("ie"))
{
o.title=a.isBrowser('safari')?'\u4E0A\u4F20\u6587\u4EF6':' ';
}
o.name=n.sFile||"fileData";
o.style.cssText=b;
return o;
},createWarpHtml_:function(o,n,m){
var r=this,p=m||r.oCfg.oContainer,q=n.createElement(o);
q.style.cssText=c.replace({width:p.offsetWidth,height:p.offsetHeight+1});
p.style.position="relative";
p.insertBefore(q,p.firstChild);
return q;
}};
};
QMFileUpload.getInputLib=e;
QMFileUpload.createCom("RawinputPopup",function(l){
return a.extend(e(l),{init:function(m){
var n=this;
l.init.call(n,m);
n._initCfg();
n._initContainer();
},_initCfg:function(){
var n=this,m=n.oCfg;
m.oQueryData=a.extend({t:"qmfileupload",ef:"qdata",sid:a.getSid(),mode:"file"},m.oQueryData);
},upload:function(m){
var o=this,n=o.cfg(m);
if(!o.prepareUpload_(m))
{
return false;
}
o._setRequest(m,n,function(){
o._submit(m);
});
return true;
},_submit:function(m){
var p=this,o=new Date().valueOf(),n=function(){
p.onprocess(m.set({nTry:m.get("nTry")+1,nUpTime:o,nUploadPercent:-1}));
};
m.oForm.submit();
n();
setTimeout(function(){
if(m.get("sStatus")=="uploading")
{
n();
setTimeout(arguments.callee,1000);
}
},1000);
},_setRequest:function(o,n,m){
var r=this,t="if"+n.sId,s=a.getDomWin(n.oContainer),p=s.document,q={id:t,obj:p.body,where:"beforeEnd",style:"display:none;",onload:function(u){
var w=this,v=o.oForm;
a.extend(v,{method:"post",target:t,action:k.cfg2Url(n)});
v.encoding="multipart/form-data";
v.style.display="none";
v.firstChild.name=n.sFile;
a.E(n.oBodyData,function(x,y){
var z=p.createElement("input");
z.type="hidden";
z.name=y;
z.value=x;
v.appendChild(z);
});
p.body.appendChild(v);
q.onload=function(){
var y,x;
try{
y=a.htmlDecode(w.contentWindow.document.documentElement.innerHTML);
y=y.replace(/BODY/g,'body');
var z=y.match(/<body>(.*?)<\/body>/);
if(z[1])
{
y=z[1];
}
x=r.parser(y,o);
}
catch(A)
{
x=["complete",{}];
}
a.removeSelf(w);
a.removeSelf(v);
(r["on"+x[0]]||g).call(r,o.set(x[1]));
o.oForm=o.oFile=null;
};
o.fCancel=function(){
a.removeSelf(w);
a.removeSelf(v);
};
m();
}};
a.createBlankIframe(s,q);
},_initInput:function(){
var p=this,m=p.oCfg,n=p._moDom,o=p.createInput_(a.getDomWin(n).document);
o.onchange=function(){
p._onchange(this);
};
a.addEvent(o,"click",function(q){
a.stopPropagation(q);
});
n.appendChild(o);
},_onchange:function(m){
var q=this,n=a.getDomWin(m).document,p=n.createElement("form");
p.appendChild(m);
q._initInput();
var o=q.addFile({sName:m.value.split("\\").pop()});
o.oForm=p;
if(o.oUploader.name=='RawinputPopupMail')
{
o.set('sUploadMode','rawinput');
}
q.onselect([o]);
},_initContainer:function(){
var n=this,m=n.oCfg.oContainer;
n._moDom=n.createWarpHtml_('span',a.getDomWin(m).document);
n._initInput();
}});
},"baseToFtn");
QMFileUpload.createCom("RawinputPopupMail",function(l){
return a.extend(QMFileUpload.getMailLib(l),QMFileUpload.getFtnLib(l),{defaultQueryData:function(){
return {t:"qmfileupload",ef:"qdata",sid:a.getSid(),uin:a.getUin(),mode:"file"};
}});
},"RawinputPopup");
j.createCom("Html5Popup",function(l){
return ({init_:function(m){
var n=this;
l.init.call(n,m);
n._initCfg();
n._initContainer();
},_initCfg:function(){
var n=this,m=n.oCfg;
m.oQueryData=a.extend({t:"qmfileupload",ef:"qdata",sid:a.getSid(),resp_charset:"UTF8",mode:"file"},m.oQueryData);
},doHtml5Upload_:function(m,n){
var o=this;
n.send(m.oH5File);
},detect:function(m){
var o=window,n=o.document.createElement('input');
n.type='file';
return 'multiple' in n&&o.File!==undefined&&o.XMLHttpRequest!==undefined&&(new XMLHttpRequest()).upload!==undefined;
},upload:function(m){
var o=this,n=o.cfg(m);
if(!o.prepareUpload_(m))
{
return false;
}
var p=new XMLHttpRequest();
o._setRequest(m,n,p);
m.set({sStatus:"uploading",nTry:m.get("nTry")+1,nUpTime:new Date().valueOf()});
m.fCancel=function(){
p.abort();
};
o.doHtml5Upload_(m,p);
return true;
},_initContainer:function(){
var q=this,m=q.oCfg,n=q.oCfg.oContainer,o=a.getDomWin(n).document,p=o.createElement("span");
q._moDom=p;
p.style.cssText=c.replace({width:n.offsetWidth,height:n.offsetHeight+1});
q._initInput();
n.style.position="relative";
n.insertBefore(p,n.firstChild);
},_initInput:function(){
var q=this,m=q.oCfg,o=q._moDom,n=a.getDomWin(o).document,p=n.createElement("input");
p.type="file";
p.name=m.sFile;
p.style.cssText=b;
p.multiple="true";
p.onchange=function(){
q._onchange(this);
};
a.addEvent(p,"click",function(r){
a.stopPropagation(r);
});
o.appendChild(p);
},_onchange:function(m){
var n=this;
a.removeSelf(m);
n._initInput();
n.addH5Files_(m.files);
},addH5Files_:function(n,m){
var r=this,q=[];
var p=n.length;
var o=function(s){
q.push(s);
if(--p<1)
{
if(m)
{
m(q);
}
else{
r.onselect(q);
}
}
};
a.E(n,function(s){
var t=new FileReader();
t.onload=function(u){
o(r.parseH5File_(s));
};
t.onerror=function(u){
var v=u.target.error;
var w=r.parseH5File_(s);
w.set({sStatus:'error',sError:r.err("fromSelect_html5fd",v.code,v.name)});
o(w);
};
t.readAsDataURL(s.slice(0,1));
});
},parseH5File_:function(m){
var n=this.addFile({sName:m.name,nSize:parseInt(m.size,10)});
n.oH5File=m;
return n;
},_setRequest:function(n,m,o){
var q=this,p=m||{};
var s=n.get("sName");
if(a.isBrowser("safari"))
{
s=encodeURIComponent(s).replace(/%(\w{2})/ig,function(t,u){
return String.fromCharCode(parseInt(u,16));
});
}
o.upload.onprogress=function(t){
if(t.lengthComputable)
{
q.onprocess(n.set({nUploadPercent:t.loaded/t.total*100}));
}
};
o.onreadystatechange=function(){
if(o.readyState==4)
{
o.onreadystatechange=o.upload.onprogress=null;
if(o.status==200)
{
var t=q.parser(o.responseText,n);
q["on"+t[0]].call(q,n.set(t[1]));
}
else{
q.onerror(n.set({sError:q.err("http",o.status)}));
}
}
};
var r=QMFileUpload.oUtil;
o.open("POST",r.cfg2Url(m),true);
if(!p.bToFtn)
{
o.setRequestHeader("X-QQMAIL-FILENAME",s);
o.setRequestHeader("content-type","application/octet-stream");
}
}});
},"baseToFtn");
QMFileUpload.createCom("Html5Drag",function(l){
var m,n='\u91CA\u653E\u9F20\u6807';
return ({_initContainer:function(){
var s=this,o=s.oCfg,p=s.oCfg.oContainer,q=a.getDomWin(p).document,r=a.$("div",p)[0]||a.getDomWin(p).document.createElement("div");
r.setAttribute("ui-type","html5drag_msg");
if(!o.bNoStyle)
{
r.style.cssText="width:100%; font-size:14px; text-align:center;";
if(p.clientHeight)
{
r.style.lineHeight=p.clientHeight+"px";
}
else{
r.style.position="absolute";
r.style.paddingTop="20%";
r.style.marginTop="-20px";
}
}
if(!o.oMsgDom)
{
o.oMsgDom=r;
}
o.sDragEnterMsg=o.sDragEnterMsg||"\u91CA\u653E\u9F20\u6807";
o.sDragLeaveMsg=o.sDragLeaveMsg||"\u5C06\u6587\u4EF6\u62D6\u62FD\u81F3\u6B64\u533A\u57DF";
o.oMsgDom.innerHTML=o.sDragLeaveMsg;
a.addEvents(r,s._getEventFunc());
p.insertBefore(r,p.firstChild);
},_getEventFunc:function(){
var p=this;
var o=p.oCfg;
return {dragover:function(q){
if(k.isFileDragOver(q))
{
o.oMsgDom.innerHTML=o.sDragEnterMsg;
o.ondragover&&o.ondragover.call(p,q);
}
a.preventDefault(q);
},dragleave:function(q){
if(k.isFileDragOver(q))
{
o.oMsgDom.innerHTML=o.sDragLeaveMsg;
o.ondragleave&&o.ondragleave.call(p,q);
}
a.preventDefault(q);
},drop:function(q){
o.oMsgDom.innerHTML=o.sDragLeaveMsg;
if(q.dataTransfer.files.length)
{
p._onDrop(q);
}
a.stopPropagation(q);
a.preventDefault(q);
},click:function(q){
o.onproxyclose&&o.onproxyclose.apply(p);
}};
},_onDrop:function(o){
this.addH5Files_(o.dataTransfer.files);
}});
},"Html5Popup");
function f(l)
{
return a.extend(QMFileUpload.getMailLib(l),QMFileUpload.getFtnLib(l),{doHtml5Upload_:function(m,n){
var q=this,o=q.cfg(m),r=encodeURIComponent(m.get("sName"));
if(a.isBrowser("safari"))
{
r=r.replace(/%(\w{2})/ig,function(s,t){
return String.fromCharCode(parseInt(t,16));
});
}
n.setRequestHeader("X-QQMAIL-FILENAME",r);
if(o.bToFtn)
{
var p=new FormData();
p.append('timeout',60000);
p.append('mode',"html5upload");
p.append('Upload',"Submit Query");
p.append('Filename',m.oH5File.name);
p.append('file',m.oH5File);
n.send(p);
}
else{
n.send(m.oH5File);
}
},defaultQueryData:function(){
return {t:"qmfileupload",ef:"qdata",sid:a.getSid(),resp_charset:"UTF8",mode:"file"};
}});
}
QMFileUpload.createCom("Html5PopupMail",f,"Html5Popup");
QMFileUpload.createCom("Html5DragMail",f,"Html5Drag");
QMFileUpload.createCom("Html5DragCROS",function(l){
return a.extend(f(l),{defaultQueryData:function(){
return {};
}});
},"Html5Drag");
})(QMFileAdaptor);
(function(a,c){
var e=QMFileUpload.components,g=window,b=a.T(['<span style="top:0;left:0;position:absolute;width:$width$;height:$height$;margin:$margin$;z-index:0;overflow:hidden;">','$code$','</span>']);
var f=QMFileUpload.oUtil;
var d=function(){
};
QMFileUpload.createCom("FlashPopup",function(h){
return ({init:function(j){
var k=this;
h.init.call(k,j);
k._initContainer();
},detect:function(){
return QMFileUpload.oUtil.detectFlash();
},upload:function(j){
var m=this,l=m._moFlash,k=m.cfg(j);
if(!m.prepareUpload_(j))
{
return false;
}
try{
if(k.oContainer.id=="editor_word_compose_tip")
{
k.sUrl=getTop().QMDistributeDomain.getHost()+"/cgi-bin/upload";
}
}
catch(n)
{
}
m._setRequest(k);
j.set({sStatus:"uploading",nTry:j.get("nTry")+1,nUpTime:new Date().valueOf()});
j.fCancel=function(){
l.cancel();
};
l.upload(j.get("sFid"),k.sFile,k.sFlashMode=="RawPost"?0:1);
return true;
},cancel:function(j){
var k=this;
j.set("nUpType",k._moFlash.getCurUptype());
h.cancel.call(k,j);
},getFile:function(j){
var l=this,k=h.getFile.call(l);
for(var m in k)
{
if(k[m].get("sFid")==j)
{
return k[m];
}
}
return k;
},_setRequest:function(j){
var l=this,k=l._moFlash;
a.E(j.oBodyData,function(m,n){
k.addUploadVar(n,m);
});
k.setUploadUrl(f.cfg2Url(j));
},_getWrapHtml:function(j){
var l=this,k=l.oCfg;
try{
return b.replace({height:k.nHeight||j.offsetHeight,width:k.nWidth||j.offsetWidth,margin:k.nMargin||0,code:a.generateFlashCode("flashUploader_"+k.sId,a.getPath("swf_cdn")+"uploaderftn.swf?r="+Math.random(),{width:"100%",height:"100%"},{wmode:"transparent"})});
}
catch(m)
{
return b.replace({height:k.nHeight||j.offsetHeight,width:k.nWidth||j.offsetWidth,margin:k.nMargin||0,code:a.generateFlashCode("flashUploader_"+k.sId,getTopHost()+a.getPath("swf")+"uploaderftn.swf?r="+Math.random(),{width:"100%",height:"100%"},{wmode:"transparent"})});
}
},_initContainer:function(){
var l=this,j=l.oCfg,k=j.oContainer,m=a.getDomWin(k);
if(k)
{
j.sId=Math.random();
var n=l._getWrapHtml(k);
k.style.position="relative";
if(a.browserVer()==6)
{
k.style.zoom=1;
k.style.overflow="hidden";
}
a.insertHTML(k,"afterBegin",n);
if(a.qmFlash&&a.qmFlash.isSupported())
{
setTimeout(function(){
var o=l.getFlashObjCallBack_();
o.id="flashUploader_"+j.sId;
o.win=m;
(new a.qmFlash(o)).setup(function(p,q){
if(p)
{
if(k.id==="AttachFrame")
{
getTop().getMainWin().QMAttach._bFlashUploaderStatus=true;
k.firstChild.style.width="65px";
}
k.firstChild.style.zIndex=2;
k.firstChild.style.height="110%";
k.children[1].style.zIndex=1;
l._initFlash(this.getFlash());
}
else{
k.removeChild(k.firstChild);
if(k.id==="AttachFrame")
{
getTop().getMainWin().QMAttach._bFlashUploaderStatus=false;
}
debug("the flash uploader is not ok...");
}
});
},300);
}
else{
setTimeout(function(){
(new a.qmFlash({id:"flashUploader_"+j.sId,win:m,onSelect:function(p,o){
l._doSelect(p,o);
},onProcess:function(o,p){
l.onprocess(l.getFile(o).set({nUploadPercent:p}));
},onError:function(o,r,q,p){
var s=l.getFile(o);
l.onerror(s.set({nUpType:l._moFlash.getCurUptype(),nUploadPercent:p,sError:l.err("internal",parseInt(q.replace(/Error #/g,''),10))}));
},onComplete:function(o,q,p){
var r=l.getFile(o),s=l.parser(q,r);
r.set({nPostMode:p,nUpType:l._moFlash.getCurUptype()});
(l["on"+s[0]]||d).call(l,r.set(s[1]));
}})).setup(function(o,p){
if(o)
{
k.firstChild.style.zIndex=2;
k.firstChild.style.height="110%";
k.children[1].style.zIndex=1;
l._initFlash(this.getFlash());
}
else{
k.removeChild(k.firstChild);
debug("the flash uploader is not ok...");
}
});
},300);
}
}
},insertFlashElem_:function(j){
var l=this;
var m="flashUploader_"+Math.random();
var k=j.oFlashDOMCfg;
var n=j.sFlashUrl||(a.getPath("swf_cdn")+"uploaderftn.swf?r="+Math.random());
j.insertHTML(b.replace({height:k.nHeight||"100%",width:k.nWidth||"100%",top:k.nTop||0,left:k.nLeft||0,margin:k.nMargin||0,code:a.generateFlashCode(m,n,{width:k.nWidth||"100%",height:k.nHeight||"100%"},{wmode:"transparent"})}));
setTimeout(function(){
var o=l.getFlashObjCallBack_();
o.id=m;
o.win=j.oWin||g;
(new a.qmFlash(o)).setup(function(p,q){
if(p)
{
if(j.onsuccess)
{
j.onsuccess();
}
l.initFlash_(this.getFlash());
}
else{
if(q)
{
}
if(j.removeHTML)
{
j.removeHTML();
}
if(n.indexOf('?')!==-1)
{
if(j.onerror)
{
j.onerror(q);
}
l.ossLog('flashInitError');
debug("the flash uploader is not ok...");
}
else{
l.ossLog('flashDLoadError');
j.sFlashUrl=n+'?'+Math.random();
l.insertFlashElem_(j);
}
}
});
},300);
},getFlashObjCallBack_:function(){
var l=this,m=getTop(),j=l.oCfg,k=j.oContainer;
l.moFlashFileMap_={};
return {onSelect:function(o,n){
l.onFlashSelect_.apply(l,arguments);
},onProcess:function(n,o){
l.onFlashProcess_.apply(l,arguments);
},onError:function(n,q,p,o){
m.debug.apply(m,arguments);
l.onFlashError_.apply(l,arguments);
},onComplete:function(n,p,o){
l.onFlashComplete_.apply(l,arguments);
},debug:function(){
m.debug.apply(m,arguments);
}};
},getFlashFileId:function(j){
return this.moFlashFileMap_[j];
},getFlash:function(){
return this._moFlash;
},doFlashUpload_:function(j,k){
var m=this,l=m.cfg(j);
k.upload(j.get("sFid"),l.sFile);
},_initFlash:function(j){
var m=this,k=m.oCfg,l;
k.sFlashMode=k.sFlashMode||"RawPost";
m._moFlash=j;
if(k.bMulti!==false)
{
j.initlize("multi");
}
else{
j.initlize("single");
}
if(j.setMultiAndResumeMode&&a.isBrowser("chrome")&&k.sFlashMode=="CheckPost")
{
j.setMultiAndResumeMode(0);
}
l={sid:a.getSid(),lang:"utf8",ssl_edition:a.getCookie("ssl_edition"),skey:a.getCookie("skey"),uin:a.getCookie("biz_username"),qm_sk:a.getCookie("qm_sk"),mode:"file"};
if(k.sFlashMode=="RawPost")
{
l.ef="qdata";
l.t="qmfileupload";
}
k.oQueryData=a.extend(l,k.oQueryData);
j.clearUploadVars();
j.addUploadVar("timeout",60000);
},_doSelect:function(k,j){
var p=this,l=p.oCfg,o=p._moFlash,n=[];
for(var q=k;q<=j;q++)
{
var m=p.addFile({sFid:q,bVirtual:l.sFlashMode!="RawPost",sName:o.getFileInfo(q,"name"),nSize:parseInt(o.getFileInfo(q,"size"),10)});
n.push(m);
}
p.onselect(n);
},onFlashSelect_:function(k,j){
var p=this,l=p.oCfg,o=p._moFlash,n=[];
for(var q=k;q<=j;q++)
{
var m=p.addFile({sFid:q,sName:o.getFileInfo(q,"name"),nSize:parseInt(o.getFileInfo(q,"size"),10)});
p.moFlashFileMap_[q]=m.get('sFid');
n.push(m);
}
p.onselect(n);
},onFlashProcess_:function(j,k){
var m=this;
var l=m.getFile(m.getFlashFileId(j));
l.set({nUploadedSize:Math.floor(l.get('nSize')*k/100),nUploadPercent:k});
m.onprocess(l);
},onFlashComplete_:function(j,l,k){
var o=this,m=o.getFile(o.getFlashFileId(j)),n=o.parser(l,m);
m.set({nPostMode:k,nUpType:o._moFlash.getCurUptype()});
(o["on"+n[0]]||d).call(o,m.set(n[1]));
},onFlashError_:function(j,m,l,k){
var o=this,n=o.getFile(o.getFlashFileId(j));
o.onerror(n.set({nUpType:o.getFlash().getCurUptype(),nUploadPercent:k,sError:o.err("internal",parseInt(l.replace(/Error #/g,''),10),"flashver="+a.qmFlash.getFlashVer().desc)}));
}});
},"baseToFtn");
})(QMFileAdaptor);
;(function(a,b){
var l=QMFileUpload,k=l.components;
debug(window.location.host,'init_FlashPopupMail');
l.createCom("FlashPopupMail",function(m){
var n=l.getFtnLib(m);
return a.extend(l.getMailLib(m),n,{init_:function(){
return m.init.apply(this,arguments);
},initFlash_:function(o){
var p=this;
m.initFlash_.call(p,o);
o.addUploadVar("timeout",60000);
},uploadToFtn:function(o){
o.oCfg={sFlashMode:"RawPost"};
return n.uploadToFtn.apply(this,arguments);
},doFlashUpload_:function(o,p){
var r=this,q=r.cfg(o);
o.set({bVirtual:q.sFlashMode!="RawPost"});
p.upload(o.get("sFid"),q.sFile,q.sFlashMode=="RawPost"?0:1);
},onFlashComplete_:function(o,q,p){
var t=this,r=t.getFile(t.getFlashFileId(o)),s=t.getFlash();
if(r)
{
r.set({nUpType:s.getCurUptype(),nPostMode:p,nRetryTimes:s.getRetryTimes()});
}
m.onFlashComplete_.apply(t,arguments);
},onFlashError_:function(o,r,q,p){
var u=this,s=u.getFile(u.getFlashFileId(o)),t=u.getFlash();
if(s)
{
s.set({nUpType:t.getCurUptype(),nPostMode:t.getCompleteMode(),nRetryTimes:t.getRetryTimes()});
}
m.onFlashError_.apply(u,arguments);
},defaultQueryData:function(){
var o=this.oCfg;
o.sFlashMode=o.sFlashMode||"RawPost";
var p={sid:a.getSid(),lang:"utf8",uin:a.getUin(),mode:"file"};
if(o.sFlashMode=="RawPost")
{
p.ef="qdata";
p.t="qmfileupload";
}
if(o.sFlashMode=="CheckPost")
{
p.sid=p.sid.split(',')[0];
}
return p;
},cancel:function(o){
var p=this;
o.set("nUpType",p.getFlash().getCurUptype());
m.cancel.call(p,o);
}});
},"FlashPopup");
var j=function(){
};
var c=function(m){
return {uploadInChip:function(n){
var o=this;
if(!o.prepareUpload_(n))
{
return false;
}
o.callBack("onprocess",[n.set({nTry:n.get("nTry")+1,nUpTime:new Date().valueOf(),bChipFile:true,sStatus:"uploading",sUploadStep:"signing",nUploadPercent:0,nUploadedSize:0,nSignPercent:0})]);
o.doChipFileSign_(n);
return true;
},_updateFlashFileSize:function(n){
try{
if(n.get('sType').indexOf('Flash')!=-1&&n.get('sFid'))
{
var o=parseInt(n.uploader().getFlash().getLoadTotal(),10);
if(o&&o!=n.get('nSize'))
{
a.LogKV('uploadfile|flash|size_err');
n.set('nSize',o);
}
}
}
catch(p)
{
}
},onChipFileForNormalAttachSignEnd_:function(n,o){
var p=this;
o.sUploadStep='creating';
p.callBack("onprocess",[n.set(o)]);
p._updateFlashFileSize(n);
a.QMAjax.send(['/cgi-bin/upload?saction=ftnattach&&inputf=json&outputf=json&&sid=',a.getSid()].join(""),{method:'post',headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},content:a.T('path=$path$&size=$size$&md5=$md5$&sha=$sha$').replace({path:encodeURIComponent(n.get("sName")),size:n.get("nSize"),md5:n.get("sMD5"),sha:n.get("sSHA")}),onload:function(q,s,r){
function t(B,C,z,A)
{
var F,D;
F=B.indexOf(C);
D=B.indexOf(z);
if(F!=-1&&D!=-1&&F<D)
{
return B.substring(F+A,D);
}
}
var u=t(s,'<ret>','</ret>',5);
if(u==0)
{
var w=t(s,'<sIP>','</sIP>',5),x=t(s,'<sKey>','</sKey>',6),y=t(s,'<sMailId>','</sMailId>',9),v=t(s,'<sFileld>','</sFileld>',9);
n.set({'sIP':w,'sKey':x,'sMailId':y,'sFileId':v});
a.LogKvEx({businame:"fileupload",item:"upload|"+(p.name||"null")+"|createFileSucc",sid:a.getSid()});
p.onChipUpload_(n);
}
else{
a.LogKvEx({businame:"fileupload",item:"upload|"+(p.name||"null")+"|createFileFail",sid:a.getSid()});
}
}});
},doChipFileSign_:j,onChipUpload_:function(n){
var p=this,o=new Date().valueOf();
n.set({sStatus:"uploading",sUploadStep:'posting',bChipFile:true,nStartTime:o,nRealPostTime:0,nRealPostSize:0,nUpTime:o});
p.doChipUpload_(n);
p.onprocess(n);
},doChipUpload_:j,onChipUploadEnd_:function(n){
var o=this;
o.onprocess(n.set("nUploadPercent",100));
o.fCancel=null;
},isUptoFtnForNormal:function(){
var n;
try{
var o=getTop();
n=o.getMainWin().getPageId;
}
catch(p)
{
n=function(){
};
}
return n&&(n()=="compose"||n()=="qq");
},onChipFileSignEnd_:function(n,o){
var p=this;
if(n.get("bIsUptoFtnForNormal"))
{
p.onChipFileForNormalAttachSignEnd_.apply(p,arguments);
}
else{
p.onChipFileSignEndFtn_.apply(p,arguments);
}
},onChipFileSignEndFtn_:function(n,o){
var q=this;
o.sUploadStep='creating';
q.callBack("onprocess",[n.set(o)]);
q._updateFlashFileSize(n);
var r=a.T("/cgi-bin/ftnCreatefile?uin=$uin$&ef=js&resp_charset=UTF8&s=ftnCreate&sid=$sid$&dirid=$dirid$&path=$path$&size=$size$&md5=$md5$&sha=$sha$&sha3=$sha3$&appid=$appid$&loc=$loc$").replace({sid:a.getSid(),loc:["ftnCreatefile","ftnCreatefile","ftnCreate",(n.get("sFrom")||"")+n.get("nAppId")].join(","),path:encodeURIComponent(n.get("sLocalPath")||n.get('sName')),dirid:n.get("sPathId"),size:n.get("nSize"),md5:n.get("sMD5"),sha:n.get("sSHA"),sha3:n.get("sSHA3"),appid:n.get("nAppId")});
function p()
{
n.set({bCreateFile:false,sCreateFileUrl:r});
a.QMAjax.send(r,{method:"GET",headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},onload:function(s,u,t){
var v=a.evalValue(u||"{}");
if(s&&v&&v.errcode=="0")
{
n.set(v.data);
n.set('bCreateFile',true);
a.LogKvEx({businame:"fileupload",item:"ftnCreatefile|"+(q.name||"null")+"|createFileSucc",sid:a.getSid()});
q.onChipUpload_(n);
}
else{
a.LogKvEx({businame:"fileupload",item:"ftnCreatefile|"+(q.name||"null")+"|createFileFail",sid:a.getSid()});
q.onerror(n.set({nPercent:0,sError:(v&&v.errcode)?q.err("cgi",v.errcode,v.appname,v.errmsg):q.err("http",t.readyState==4?t.status:"abort")}));
}
}});
}
if(n.get('bCreateFile'))
{
if(n.get('sCreateFileUrl')==r)
{
q.onChipUpload_(n);
}
else{
a.QMAjax.send('/cgi-bin/ftnDelFile?t=ftn.json&s=oper&ef=js&sid='+a.getSid(),{headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},content:'fid='+n.get('sFileId')});
p();
}
}
else{
p();
}
},onChipFileSigning_:function(o,n){
var p=this;
o.set("nSignPercent",Math.max(Math.min(100,Math.floor(n)),0));
p.callBack("onprocess",[o]);
},chipUpdateFileSize_:function(o,n){
var q=this,p=new Date().valueOf();
if(!o._nUpFileSizeTime)
{
o._nUpFileSizeTime=p;
}
else if(p-o._nUpFileSizeTime>=(n||5000))
{
a.QMAjax.send(a.T("/cgi-bin/ftnUpFileSize?sid=$sid$&filekey=$fileid$&uploadsize=$uploadsize$&ef=js").replace({sid:a.getSid(),fileid:o.get("sFileId"),uploadsize:o.get("nUploadedSize")}),{method:"GET",headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},onload:function(r,t,s){
if(t.indexOf("<!--cgi exception-->")!=-1)
{
var w=a.evalValue(t||"{}");
var v=q.getFile();
for(var x in v)
{
var u=v[x];
if(u.get("sStatus")=="uploading")
{
if(u.pause)
{
u.pause();
}
q.onerror(u.set("sError",["cgi",w.errcode,"ftnUpFileSize"].join(",")));
}
}
}
}});
o._nUpFileSizeTime=p;
}
},setRealPostSize_:function(p,o,n){
if(n>0&&p.get("sUploadStep")!="paused")
{
p.set({nRealPostTime:(p.get("nRealPostTime")||0)+(new Date()-o),nRealPostSize:(p.get("nRealPostSize")||0)+n});
}
},onprocess:function(n){
var o=this;
if(n.get('bChipFile')&&n.get("nUploadedSize")&&!n.get("bIsUptoFtnForNormal"))
{
o.chipUpdateFileSize_(n);
}
m.onprocess.call(o,n);
}};
};
function d(m)
{
return a.extend(l.getChipLib(m),{initFlashBeforeUpload_:function(n){
var q=this;
var p=q.getFlash();
var o=n.get('sDns')||n.get('sIP');
var r='http://'+o+':'+n.get('nPort');
p.setFTNUkey(n.get('sKey'));
p.setFTNFilekey(n.get('sSHA'));
p.setFTNFileIndexID(n.get('sFid'));
p.setFTNUploadFileSize(n.get('nSize'));
p.setFTNUploadDomain(r);
p.setSendEmptyPackage&&p.setSendEmptyPackage(a.isBrowser('chrome')&&n.get('nSize')>100*1024*1024);
n.oCfg=a.extend(n.oCfg||{},{sUrl:r+'/ftn_handler/'});
}});
}
var h;
function f(m)
{
var n=k.FlashPopup.prototype,o=k.FlashPopupMail.prototype;
return a.extend(d(m),l.getH5SafeLib(m),{init_:function(p){
var q=this;
m.init_.call(q,p);
},onprocess:function(p){
if(this.isFileModif_(p)!==false)
{
this.chipUpdateFileSize_(p);
m.onprocess.apply(this,arguments);
}
},doChipFileSign_:function(p){
var r=this,q=r.getFlash();
r.safeStartUpdate_(p);
p.set({nSignChunkSum:Math.ceil(p.get('nSize')/r.nSignFileBlockSize),nCurrentSignChunk:0});
p.fCancel=function(){
q.cancelFTNUpload();
p.bCancelH5_=true;
};
debug("begin cal md5:"+(new Date()).getTime());
q.ftnUploadInit();
q.setFTNFileIndexID(p.get('sFid'));
r._doLoadFileData(p,0);
},doChipUpload_:function(p){
var r=this,q=r.getFlash();
r.initFlashBeforeUpload_(p);
p.fCancel=function(){
q.cancelFTNUpload();
p.bCancelH5_=true;
};
r._doLoadFileData(p,0);
},getFileSliceFunc_:function(){
if(!this._mfFileSlice)
{
try{
this._mfFileSlice=File.prototype.slice||File.prototype.mozSlice||File.prototype.webkitSlice;
}
catch(p)
{
return false;
}
}
return this._mfFileSlice;
},detect:function(){
return m.detect.apply(this,arguments)&&n.detect.apply(this,arguments)&&("FileReader" in window)&&("File" in window)&&this.getFileSliceFunc_();
},initFlash_:function(p){
var q=this;
n._initFlash.apply(q,arguments);
p.clearUploadVars();
p.addUploadVar("timeout",60000);
q.nSignFileBlockSize=2*1024*1024;
p.ftnUploadInit();
q.nFlashFileIndex=0;
q.nFTNUploadBlockSize=p.getFTNUploadBlockSize()||128*1024;
},getFlash:n.getFlash,insertFlashElem_:n.insertFlashElem_,initFlashDOM_:function(q){
var u=this,r=u.oCfg,s=r.oContainer,v=a.getDomWin(s),t=v.document,p=t.createElement('div');
u.insertFlashElem_(a.extend({oWin:v,oFlashDOMCfg:{nHeight:'1px',nWidth:'1px',nTop:"-9999px",nLeft:"-9999px"},insertHTML:function(w){
p.innerHTML=w;
},onerror:function(){
t.body.removeChild(p);
}},q||{}));
t.body.appendChild(p);
},onFlashProcess_:o.onFlashProcess_,onFlashComplete_:function(p){
var r=this,q=r.getFile(r.getFlashFileId(p));
if(q)
{
r.onChipUploadEnd_(q);
}
o.onFlashComplete_.apply(r,arguments);
},onFlashError_:o.onFlashError_,uploadFileOnComplete_:o.uploadFileOnComplete_,onFlashLoadH5FileData_:function(p,q){
var r=this;
r._onFlashGetFileData.apply(r,arguments);
},onFlashFileSigning_:function(p,q){
var s=this,r=s.getFile(s.getFlashFileId(p));
if(r)
{
s.getFlash().onChipFileSigning_(r,q);
}
},getFlashObjCallBack_:function(){
var q=this,p=o.getFlashObjCallBack_.apply(q,arguments);
delete p.onSelect;
p.onLoadFileData=function(){
q.onFlashLoadH5FileData_.apply(q,arguments);
};
p.onFileSigning=function(){
q.onFlashFileSigning_.apply(q,arguments);
};
return p;
},getFlashFileId:n.getFlashFileId,parseH5File_:function(){
var p=this;
_oFile=m.parseH5File_.apply(p,arguments);
_oFile.set('sFid',++p.nFlashFileIndex+"");
p.moFlashFileMap_=p.moFlashFileMap_||{};
p.moFlashFileMap_[p.nFlashFileIndex]=_oFile.get('sId');
return _oFile;
},_onFlashGetFileData:function(p,q){
var s=this,r=s.getFile(s.getFlashFileId(p));
if(r&&r.get('nSize'))
{
s._doLoadFileData(r,q);
}
},_doLoadFileData:function(q,p){
if(q.bCancelH5_)
{
return;
}
var t=this,u=q.get('sUploadStep'),s,r;
if(u=='signing')
{
s=q.get('nCurrentSignChunk')*t.nSignFileBlockSize;
r=Math.min(s+t.nSignFileBlockSize,q.get('nSize'));
t.getH5FileReader_(q,s,r,t._onLoadSignFileData);
}
else{
s=parseInt(p,10);
r=Math.min(s+t.nFTNUploadBlockSize,q.get('nSize'));
t.getH5FileReader_(q,s,r,t._onLoadUploadFileData);
}
},_onLoadSignFileData:function(r,s,q,p){
if(s.bCancelH5_)
{
return;
}
var w=this,v=w.getFlash(),t=s.get('nCurrentSignChunk'),u=s.get('nSignChunkSum');
if(r.target.result&&r.target.result.length)
{
v.ftnSignUpdateDataURL(r.target.result);
}
s.set('nCurrentSignChunk',++t);
if(t<=s.get('nSignChunkSum'))
{
w._doLoadFileData(s);
w.onChipFileSigning_(s,t/u*100);
}
else{
debug("end cal md5:"+(new Date()).getTime());
w.onChipFileSignEnd_(s,{sMD5:v.ftnSignMD5Result(),sSHA:v.ftnSignSHA1Result()});
}
},_onLoadUploadFileData:function(r,s,q,p){
if(s.bCancelH5_)
{
return;
}
var u=this,t=u.getFlash();
if(r.target.result&&r.target.result.length)
{
t.uploadDataToFTNWithOffset(r.target.result,q);
}
},getH5FileReader_:function(r,q,p,s){
var w=this;
var u;
var v=r.oH5File;
if(h)
{
u=h;
h=null;
}
else{
u=new FileReader();
}
function t()
{
u.onload=u.onerror=null;
if(h)
{
u.readAsDataURL(w.getFileSliceFunc_().call(v,0,1));
u=null;
}
else{
h=u;
}
v=null;
}
u.onload=function(x){
t();
s.call(w,x,r,q,p);
};
u.onerror=function(x){
t();
var y=x.target.error;
w.onerror(r.set({nUpType:w.getFlash().getCurUptype(),sError:w.err("internal",'77702',y.code,y.name)}));
};
u.readAsDataURL(w.getFileSliceFunc_().call(v,q,p));
},cancel:o.cancel});
}
l.getChipLib=c;
var g=function(){
return 200*1024*1024;
};
l.oUtil.getFlashMaxFileSizeForBurst=g;
l.createCom('FlashPopupFMail',function(m){
return a.extend(c(m),{detect:function(){
return m.detect.apply(this,arguments);
},nMaxFileSizeForBurst:g(),onselect:function(n){
var q=this,o=function(){
this.oCfg=a.extend(this.oCfg||{},{utype:16});
return q.uploadInChip(this.set('bFtnFile',true));
};
for(var r=n.length,p;r--;)
{
p=n[r];
if(p.get('nSize')<q.nMaxFileSizeForBurst)
{
p.uploadToFtn=o;
if(q.isUptoFtnForNormal())
{
p.upload=function(){
this.oCfg=a.extend(this.oCfg||{},{utype:18});
return q.uploadInChip(this.set('bIsUptoFtnForNormal',true));
};
}
}
}
m.onselect.apply(q,arguments);
},getFlashObjCallBack_:function(){
var q=this,p=m.getFlashObjCallBack_.apply(q,arguments);
p.onFTNSignFileFinish=function(r,s,t){
var u=q.getFile(q.getFlashFileId(r));
if(u)
{
q.onChipFileSignEnd_(u,{sMD5:s,sSHA:t});
}
};
var o=p.onError;
p.onError=function(r,u,s,t){
o.apply(q,arguments);
};
var n=p.onComplete;
p.onComplete=function(r){
var s=q.getFile(q.getFlashFileId(r));
if(s)
{
q.onChipUploadEnd_(s);
}
n.apply(q,arguments);
};
p.onFileSigning=function(r,s){
var t=q.getFile(q.getFlashFileId(r));
if(t)
{
q.onChipFileSigning_(t,s);
}
};
return p;
},doChipFileSign_:function(n){
var p=this,o=p.getFlash();
n.fCancel=function(){
p.getFlash().cancelFTNUpload();
};
o.ftnUploadInit();
o.ftnSignFile(n.get('sFid'));
},doChipUpload_:function(n){
var p=this,o=p.getFlash(),q='http://'+n.get('sIP');
o.setFTNUkey(n.get('sKey'));
o.setFTNFilekey(n.get('sSHA'));
o.setFTNFileIndexID(n.get('sFid'));
o.setFTNUploadFileSize(n.get('nSize'));
o.setFTNUploadDomain(q);
n.fCancel=function(){
o.cancelFTNUpload();
};
n.oCfg=a.extend(n.oCfg||{},{sUrl:q+'/ftn_handler/'});
o.uploadFileToFTN();
}});
},'FlashPopupMail');
l.createCom('FlashH5PopupMail',function(m){
var n=f(m);
return a.extend(l.getMailLib(m),l.getFtnLib(m),n,{init_:function(){
var o=this;
n.init_.apply(this,arguments);
if(o.isUptoFtnForNormal())
{
o.upload=function(p){
p.oCfg=a.extend(p.oCfg||{},{utype:18});
return o.uploadInChip(p.set('bIsUptoFtnForNormal',true));
};
}
},uploadToFtn:function(o){
var p=this;
o.oCfg=a.extend(o.oCfg||{},{utype:15});
return p.uploadInChip(o.set('bFtnFile',true));
},_initContainer:function(){
var o=this;
m._initContainer.apply(o,arguments);
o.initFlashDOM_({onsuccess:function(){
o.oCfg.oContainer.firstChild.style.zIndex=2;
}});
},initFlash_:function(){
return n.initFlash_.apply(this,arguments);
}});
},'Html5Popup');
var e=function(m){
var n=f(m);
return a.extend({},n,{initFlash_:function(){
var o=this;
o._onDrop=function(p){
if(p.dataTransfer.files.length)
{
o.addH5Files_(p.dataTransfer.files,function(q){
a.E(q,function(r){
r.uploadToFtn=function(){
this.oCfg=a.extend(this.oCfg||{},{utype:17});
return o.uploadInChip(this.set('bFtnFile',true));
};
if(o.isUptoFtnForNormal())
{
r.upload=function(){
this.oCfg=a.extend(this.oCfg||{},{utype:18});
return o.uploadInChip(this.set('bIsUptoFtnForNormal',true));
};
}
});
o.onselect(q);
});
}
};
return n.initFlash_.apply(o,arguments);
},_initContainer:function(){
var o=this;
m._initContainer.apply(o,arguments);
}});
};
l.createCom('FlashH5DragMailCROS',e,'Html5DragCROS');
})(QMFileAdaptor);
(function(c){
var b={};
function a(e)
{
if(b[e])
{
return b[e].exports;
}
var d=b[e]={exports:{},id:e,loaded:false};
c[e].call(d.exports,d,d.exports,a);
d.loaded=true;
return d.exports;
}
a.m=c;
a.c=b;
a.p="";
return a(0);
})([function(c,b,a){
;(function(d){
var m=QMFileUpload,l=m.components;
var n,o;
var h=a(2);
var j=a(6);
var e=a(8);
var f=a(9);
var g=a(10);
function q()
{
(function(t){
var s={};
function r(v)
{
if(s[v])
{
return s[v].exports;
}
var u=s[v]={exports:{},id:v,loaded:false};
t[v].call(u.exports,u,u.exports,r);
u.loaded=true;
return u.exports;
}
r.m=t;
r.c=s;
r.p="";
return r(0);
})({0:function(x,w,t){
var s=t(12);
var r=t(13);
var A=new r();
var B=new s.YaMD5();
var u={reset:function(){
A.reset();
B.start();
},chunkMD5:function(C){
return B.start().appendByteArray(new Uint8Array(C)).end();
},appendMD5:function(C){
if(C.state)
{
B.setState(C.state);
}
else{
B.start();
}
return B.appendByteArray(new Uint8Array(C.chunk)).getState();
},getMD5:function(C){
return B.setState(C).end();
},chunkSHA1:function(C){
return A.digest(C);
},appendSHA1:function(C){
if(!C.state)
{
A.reset();
}
else{
A.setState(C.state);
}
A.append(C.chunk);
return A.getState();
},getSHA1:function(C){
A.setState(C);
return A.end();
}};
var z=new FileReader();
function y(C,D,G)
{
z.addEventListener('load',J);
z.addEventListener('abort',H);
z.addEventListener('error',I);
z.readAsArrayBuffer(C);
function J(K)
{
F();
D(K.target.result);
}
function H(K)
{
F();
G(K.target.error);
}
function I(K)
{
F();
G(K.target.error);
}
function F()
{
delete C;
z.removeEventListener('load',J);
z.removeEventListener('abort',H);
z.removeEventListener('error',I);
}
}
self.addEventListener('message',function(C){
var D=C.data;
function F()
{
var H=u[D.type](D.data);
delete C;
var G=H&&(H.state||H.heap);
self.postMessage({type:'done',data:H},G&&[G]);
}
if(D.type=="appendSHA1"||D.type=="appendMD5")
{
y(D.data.chunk||D.data,function(G){
if(D.data.chunk)
{
D.data.chunk=G;
}
else{
D.data=G;
}
F();
},function(G){
self.postMessage({type:'retry',data:G.message});
});
}
else{
F();
}
});
function v(F)
{
var C=F.split(','),G=C[0].match(/:(.*?);/)[1],D=atob(C[1]),H=D.length,I=new Uint8Array(H);
while(H--)
{
I[H]=D.charCodeAt(H);
}
return new Blob([I],{type:G});
}
self.postMessage({type:'ready'});
},12:function(s,r){
(function(A){
'use strict';
var y=function(I,H){
var C=I[0],D=I[1],F=I[2],G=I[3];
C+=(D&F|~D&G)+H[0]-680876936|0;
C=(C<<7|C>>>25)+D|0;
G+=(C&D|~C&F)+H[1]-389564586|0;
G=(G<<12|G>>>20)+C|0;
F+=(G&C|~G&D)+H[2]+606105819|0;
F=(F<<17|F>>>15)+G|0;
D+=(F&G|~F&C)+H[3]-1044525330|0;
D=(D<<22|D>>>10)+F|0;
C+=(D&F|~D&G)+H[4]-176418897|0;
C=(C<<7|C>>>25)+D|0;
G+=(C&D|~C&F)+H[5]+1200080426|0;
G=(G<<12|G>>>20)+C|0;
F+=(G&C|~G&D)+H[6]-1473231341|0;
F=(F<<17|F>>>15)+G|0;
D+=(F&G|~F&C)+H[7]-45705983|0;
D=(D<<22|D>>>10)+F|0;
C+=(D&F|~D&G)+H[8]+1770035416|0;
C=(C<<7|C>>>25)+D|0;
G+=(C&D|~C&F)+H[9]-1958414417|0;
G=(G<<12|G>>>20)+C|0;
F+=(G&C|~G&D)+H[10]-42063|0;
F=(F<<17|F>>>15)+G|0;
D+=(F&G|~F&C)+H[11]-1990404162|0;
D=(D<<22|D>>>10)+F|0;
C+=(D&F|~D&G)+H[12]+1804603682|0;
C=(C<<7|C>>>25)+D|0;
G+=(C&D|~C&F)+H[13]-40341101|0;
G=(G<<12|G>>>20)+C|0;
F+=(G&C|~G&D)+H[14]-1502002290|0;
F=(F<<17|F>>>15)+G|0;
D+=(F&G|~F&C)+H[15]+1236535329|0;
D=(D<<22|D>>>10)+F|0;
C+=(D&G|F&~G)+H[1]-165796510|0;
C=(C<<5|C>>>27)+D|0;
G+=(C&F|D&~F)+H[6]-1069501632|0;
G=(G<<9|G>>>23)+C|0;
F+=(G&D|C&~D)+H[11]+643717713|0;
F=(F<<14|F>>>18)+G|0;
D+=(F&C|G&~C)+H[0]-373897302|0;
D=(D<<20|D>>>12)+F|0;
C+=(D&G|F&~G)+H[5]-701558691|0;
C=(C<<5|C>>>27)+D|0;
G+=(C&F|D&~F)+H[10]+38016083|0;
G=(G<<9|G>>>23)+C|0;
F+=(G&D|C&~D)+H[15]-660478335|0;
F=(F<<14|F>>>18)+G|0;
D+=(F&C|G&~C)+H[4]-405537848|0;
D=(D<<20|D>>>12)+F|0;
C+=(D&G|F&~G)+H[9]+568446438|0;
C=(C<<5|C>>>27)+D|0;
G+=(C&F|D&~F)+H[14]-1019803690|0;
G=(G<<9|G>>>23)+C|0;
F+=(G&D|C&~D)+H[3]-187363961|0;
F=(F<<14|F>>>18)+G|0;
D+=(F&C|G&~C)+H[8]+1163531501|0;
D=(D<<20|D>>>12)+F|0;
C+=(D&G|F&~G)+H[13]-1444681467|0;
C=(C<<5|C>>>27)+D|0;
G+=(C&F|D&~F)+H[2]-51403784|0;
G=(G<<9|G>>>23)+C|0;
F+=(G&D|C&~D)+H[7]+1735328473|0;
F=(F<<14|F>>>18)+G|0;
D+=(F&C|G&~C)+H[12]-1926607734|0;
D=(D<<20|D>>>12)+F|0;
C+=(D^F^G)+H[5]-378558|0;
C=(C<<4|C>>>28)+D|0;
G+=(C^D^F)+H[8]-2022574463|0;
G=(G<<11|G>>>21)+C|0;
F+=(G^C^D)+H[11]+1839030562|0;
F=(F<<16|F>>>16)+G|0;
D+=(F^G^C)+H[14]-35309556|0;
D=(D<<23|D>>>9)+F|0;
C+=(D^F^G)+H[1]-1530992060|0;
C=(C<<4|C>>>28)+D|0;
G+=(C^D^F)+H[4]+1272893353|0;
G=(G<<11|G>>>21)+C|0;
F+=(G^C^D)+H[7]-155497632|0;
F=(F<<16|F>>>16)+G|0;
D+=(F^G^C)+H[10]-1094730640|0;
D=(D<<23|D>>>9)+F|0;
C+=(D^F^G)+H[13]+681279174|0;
C=(C<<4|C>>>28)+D|0;
G+=(C^D^F)+H[0]-358537222|0;
G=(G<<11|G>>>21)+C|0;
F+=(G^C^D)+H[3]-722521979|0;
F=(F<<16|F>>>16)+G|0;
D+=(F^G^C)+H[6]+76029189|0;
D=(D<<23|D>>>9)+F|0;
C+=(D^F^G)+H[9]-640364487|0;
C=(C<<4|C>>>28)+D|0;
G+=(C^D^F)+H[12]-421815835|0;
G=(G<<11|G>>>21)+C|0;
F+=(G^C^D)+H[15]+530742520|0;
F=(F<<16|F>>>16)+G|0;
D+=(F^G^C)+H[2]-995338651|0;
D=(D<<23|D>>>9)+F|0;
C+=(F^(D|~G))+H[0]-198630844|0;
C=(C<<6|C>>>26)+D|0;
G+=(D^(C|~F))+H[7]+1126891415|0;
G=(G<<10|G>>>22)+C|0;
F+=(C^(G|~D))+H[14]-1416354905|0;
F=(F<<15|F>>>17)+G|0;
D+=(G^(F|~C))+H[5]-57434055|0;
D=(D<<21|D>>>11)+F|0;
C+=(F^(D|~G))+H[12]+1700485571|0;
C=(C<<6|C>>>26)+D|0;
G+=(D^(C|~F))+H[3]-1894986606|0;
G=(G<<10|G>>>22)+C|0;
F+=(C^(G|~D))+H[10]-1051523|0;
F=(F<<15|F>>>17)+G|0;
D+=(G^(F|~C))+H[1]-2054922799|0;
D=(D<<21|D>>>11)+F|0;
C+=(F^(D|~G))+H[8]+1873313359|0;
C=(C<<6|C>>>26)+D|0;
G+=(D^(C|~F))+H[15]-30611744|0;
G=(G<<10|G>>>22)+C|0;
F+=(C^(G|~D))+H[6]-1560198380|0;
F=(F<<15|F>>>17)+G|0;
D+=(G^(F|~C))+H[13]+1309151649|0;
D=(D<<21|D>>>11)+F|0;
C+=(F^(D|~G))+H[4]-145523070|0;
C=(C<<6|C>>>26)+D|0;
G+=(D^(C|~F))+H[11]-1120210379|0;
G=(G<<10|G>>>22)+C|0;
F+=(C^(G|~D))+H[2]+718787259|0;
F=(F<<15|F>>>17)+G|0;
D+=(G^(F|~C))+H[9]-343485551|0;
D=(D<<21|D>>>11)+F|0;
I[0]=C+I[0]|0;
I[1]=D+I[1]|0;
I[2]=F+I[2]|0;
I[3]=G+I[3]|0;
};
var w='0123456789abcdef';
var x=[];
var v=function(J){
var C=w;
var D=x;
var H,I,G;
for(var F=0;F<4;F++)
{
I=F*8;
H=J[F];
for(G=0;G<8;G+=2)
{
D[I+1+G]=C.charAt(H&0x0F);
H>>>=4;
D[I+0+G]=C.charAt(H&0x0F);
H>>>=4;
}
}
return D.join('');
};
var t=function(){
this._dataLength=0;
this._state=new Int32Array(4);
this._buffer=new ArrayBuffer(68);
this._bufferLength=0;
this._buffer8=new Uint8Array(this._buffer,0,68);
this._buffer32=new Uint32Array(this._buffer,0,17);
this.start();
};
var B=new Int32Array([1732584193,-271733879,-1732584194,271733878]);
var u=new Int32Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
t.prototype.appendStr=function(I){
var D=this._buffer8;
var C=this._buffer32;
var F=this._bufferLength;
var G;
for(var H=0;H<I.length;H++)
{
G=I.charCodeAt(H);
if(G<128)
{
D[F++]=G;
}
else if(G<0x800)
{
D[F++]=(G>>>6)+0xC0;
D[F++]=G&0x3F|0x80;
}
else if(G<0xD800||G>0xDBFF)
{
D[F++]=(G>>>12)+0xE0;
D[F++]=(G>>>6&0x3F)|0x80;
D[F++]=(G&0x3F)|0x80;
}
else{
G=((G-0xD800)*0x400)+(I.charCodeAt(++H)-0xDC00)+0x10000;
if(G>0x10FFFF)
{
throw 'Unicode standard supports code points up to U+10FFFF';
}
D[F++]=(G>>>18)+0xF0;
D[F++]=(G>>>12&0x3F)|0x80;
D[F++]=(G>>>6&0x3F)|0x80;
D[F++]=(G&0x3F)|0x80;
}
if(F>=64)
{
this._dataLength+=64;
y(this._state,C);
F-=64;
C[0]=C[16];
}
}
this._bufferLength=F;
return this;
};
t.prototype.appendAsciiStr=function(I){
var D=this._buffer8;
var C=this._buffer32;
var F=this._bufferLength;
var G,H=0;
for(;;)
{
G=Math.min(I.length-H,64-F);
while(G--)
{
D[F++]=I.charCodeAt(H++);
}
if(F<64)
{
break;
}
this._dataLength+=64;
y(this._state,C);
F=0;
}
this._bufferLength=F;
return this;
};
t.prototype.appendByteArray=function(H){
var D=this._buffer8;
var C=this._buffer32;
var F=this._bufferLength;
var G,I=0;
for(;;)
{
G=Math.min(H.length-I,64-F);
while(G--)
{
D[F++]=H[I++];
}
if(F<64)
{
break;
}
this._dataLength+=64;
y(this._state,C);
F=0;
}
this._bufferLength=F;
return this;
};
t.prototype.getState=function(){
return {state:this._state.buffer.slice(0),dataLength:this._dataLength,buffer:this._buffer.slice(0),bufferLength:this._bufferLength};
};
t.prototype.setState=function(C){
this._state.set(new Int32Array(C.state));
this._dataLength=C.dataLength;
this._buffer32.set(new Uint32Array(C.buffer));
this._bufferLength=C.bufferLength;
return this;
};
t.prototype.start=function(){
this._dataLength=0;
this._bufferLength=0;
this._state.set(B);
return this;
};
t.prototype.end=function(L){
var F=this._bufferLength;
this._dataLength+=F;
var D=this._buffer8;
D[F]=0x80;
D[F+1]=D[F+2]=D[F+3]=0;
var C=this._buffer32;
var I=(F>>2)+1;
C.set(u.subarray(I),I);
if(F>55)
{
y(this._state,C);
C.set(u);
}
var G=this._dataLength*8;
if(G<=0xFFFFFFFF)
{
C[14]=G;
}
else{
var K=G.toString(16).match(/(.*?)(.{0,8})$/);
var J=parseInt(K[2],16);
var H=parseInt(K[1],16)||0;
C[14]=J;
C[15]=H;
}
y(this._state,C);
return !!L?this._state:v(this._state);
};
var z=new t();
t.hashStr=function(D,C){
return z.start().appendStr(D).end(C);
};
t.hashAsciiStr=function(D,C){
return z.start().appendAsciiStr(D).end(C);
};
if(t.hashStr('hello')!=='5d41402abc4b2a76b9719d911017c592')
{
console.error('YaMD5> this javascript engine does not support YaMD5. Sorry.');
}
if(typeof A==='object')
{
A.YaMD5=t;
}
return t;
})(this);
},13:function(t,s,r){
(function(){
if(true)
{
t.exports=u;
}
else if(typeof window!=='undefined')
{
window.Rusha=u;
}
else if(typeof self!=='undefined')
{
self.Rusha=u;
}
var B=function(C){
for(C+=9;C%64>0;C+=1)
;
return C;
};
var A=function(D,H){
var F=new Uint8Array(D.buffer);
var I=H%4;
var C=H-I;
switch(I)
{case 0:
F[C+3]=0;
case 1:
F[C+2]=0;
case 2:
F[C+1]=0;
case 3:
F[C+0]=0;
}for(var G=(H>>2)+1;G<D.length;G++)
D[G]=0;
};
var z=function(C,D,F){
C[D>>2]|=0x80<<(24-(D%4<<3));
C[(((D>>2)+2)&~0x0f)+14]=(F/(1<<29))|0;
C[(((D>>2)+2)&~0x0f)+15]=F<<3;
};
var y=function(C){
var G,I,F='0123456789abcdef',H='',D=new Uint8Array(C);
for(G=0;G<D.length;G++)
{
I=D[G];
H+=F.charAt(I>>4&15)+F.charAt(I>>0&15);
}
return H;
};
var w=function(D){
var C;
if(D<=65536)
{
return 65536;
}
if(D<16777216)
{
for(C=65536;C<D;C=C<<1)
;
}
else{
for(C=16777216;C<D;C+=16777216)
;
}
return C;
};
var x=function(D,H){
var F=new Int32Array(D,H+320,5);
var G=new Int32Array(5);
var C=new DataView(G.buffer);
C.setInt32(0,F[0],false);
C.setInt32(4,F[1],false);
C.setInt32(8,F[2],false);
C.setInt32(12,F[3],false);
C.setInt32(16,F[4],false);
return G;
};
function u(C)
{
'use strict';
var J={};
C=C||64*1024;
if(C%64>0)
{
throw new Error('Chunk size must be a multiple of 128 bit');
}
J.offset=0;
J.maxChunkLen=C;
J.padMaxChunkLen=B(C);
J.heap=new ArrayBuffer(w(J.padMaxChunkLen+320+20));
J.h32=new Int32Array(J.heap);
J.h8=new Int8Array(J.heap);
J.core=new u._core({Int32Array:Int32Array},{},J.heap);
F();
function F()
{
J.offset=0;
var K=new Int32Array(J.heap,J.padMaxChunkLen+320,5);
K[0]=1732584193;
K[1]=-271733879;
K[2]=-1732584194;
K[3]=271733878;
K[4]=-1009589776;
}
function D(K,R,N,P)
{
var Q=P%4;
var O=(N+Q)%4;
var M=N-O;
switch(Q)
{case 0:
J.h8[P]=K[R+3];
case 1:
J.h8[P+1-(Q<<1)|0]=K[R+2];
case 2:
J.h8[P+2-(Q<<1)|0]=K[R+1];
case 3:
J.h8[P+3-(Q<<1)|0]=K[R];
}if(N<O+Q)
{
return;
}
for(var L=4-Q;L<M;L=L+4|0)
{
J.h32[P+L>>2|0]=K[R+L]<<24|K[R+L+1]<<16|K[R+L+2]<<8|K[R+L+3];
}
switch(O)
{case 3:
J.h8[P+M+1|0]=K[R+M+2];
case 2:
J.h8[P+M+2|0]=K[R+M+1];
case 1:
J.h8[P+M+3|0]=K[R+M];
}
}
;var G=this.rawDigest=function(M){
var N=M.byteLength;
F();
M=new Uint8Array(M);
var K=J.maxChunkLen;
var L=0;
for(;L+K<N;L+=K)
{
D(M,L,K,0);
J.core.hash(K,J.padMaxChunkLen);
}
K=N-L;
var O=B(K);
var P=new Int32Array(J.heap,0,O>>2);
D(M,L,K,0);
A(P,K);
z(P,K,N);
J.core.hash(O,J.padMaxChunkLen);
return x(J.heap,J.padMaxChunkLen);
};
this.digest=function(K){
return y(G(K).buffer);
};
var I=this.reset=function(){
F();
};
this.append=function(K){
var M=0;
var L=K.byteLength;
var O=J.offset%J.maxChunkLen;
K=new Uint8Array(K);
J.offset+=L;
while(M<L)
{
var N=Math.min(L-M,J.maxChunkLen-O);
D(K,M,N,O);
O+=N;
M+=N;
if(O===J.maxChunkLen)
{
J.core.hash(J.maxChunkLen,J.padMaxChunkLen);
O=0;
}
}
};
var H=this.rawEnd=function(){
var L=J.offset;
var K=L%J.maxChunkLen;
var M=B(K);
var O=new Int32Array(J.heap,0,M>>2);
A(O,K);
z(O,K,L);
J.core.hash(M,J.padMaxChunkLen);
var N=x(J.heap,J.padMaxChunkLen);
F();
return N;
};
this.end=function(){
return y(H().buffer);
};
this.getState=function(){
return {offset:J.offset,maxChunkLen:J.maxChunkLen,padMaxChunkLen:J.padMaxChunkLen,heap:J.heap.slice(0)};
};
this.setState=function(K){
J.offset=K.offset;
J.maxChunkLen=K.maxChunkLen;
J.padMaxChunkLen=K.padMaxChunkLen;
J.h32.set(new Int32Array(K.heap));
};
}
;u._core=function v(I,D,G){
var C=new I.Int32Array(G);
function F(K,N)
{
K=K|0;
N=N|0;
var H=0,J=0,O=0,V=0,P=0,W=0,Q=0,X=0,R=0,Y=0,U=0,Z=0,L=0,M=0;
O=C[N+320>>2]|0;
P=C[N+324>>2]|0;
Q=C[N+328>>2]|0;
R=C[N+332>>2]|0;
U=C[N+336>>2]|0;
for(H=0;(H|0)<(K|0);H=H+64|0)
{
V=O;
W=P;
X=Q;
Y=R;
Z=U;
for(J=0;(J|0)<64;J=J+4|0)
{
M=C[H+J>>2]|0;
L=((O<<5|O>>>27)+(P&Q|~P&R)|0)+((M+U|0)+1518500249|0)|0;
U=R;
R=Q;
Q=P<<30|P>>>2;
P=O;
O=L;
C[K+J>>2]=M;
}
for(J=K+64|0;(J|0)<(K+80|0);J=J+4|0)
{
M=(C[J-12>>2]^C[J-32>>2]^C[J-56>>2]^C[J-64>>2])<<1|(C[J-12>>2]^C[J-32>>2]^C[J-56>>2]^C[J-64>>2])>>>31;
L=((O<<5|O>>>27)+(P&Q|~P&R)|0)+((M+U|0)+1518500249|0)|0;
U=R;
R=Q;
Q=P<<30|P>>>2;
P=O;
O=L;
C[J>>2]=M;
}
for(J=K+80|0;(J|0)<(K+160|0);J=J+4|0)
{
M=(C[J-12>>2]^C[J-32>>2]^C[J-56>>2]^C[J-64>>2])<<1|(C[J-12>>2]^C[J-32>>2]^C[J-56>>2]^C[J-64>>2])>>>31;
L=((O<<5|O>>>27)+(P^Q^R)|0)+((M+U|0)+1859775393|0)|0;
U=R;
R=Q;
Q=P<<30|P>>>2;
P=O;
O=L;
C[J>>2]=M;
}
for(J=K+160|0;(J|0)<(K+240|0);J=J+4|0)
{
M=(C[J-12>>2]^C[J-32>>2]^C[J-56>>2]^C[J-64>>2])<<1|(C[J-12>>2]^C[J-32>>2]^C[J-56>>2]^C[J-64>>2])>>>31;
L=((O<<5|O>>>27)+(P&Q|P&R|Q&R)|0)+((M+U|0)-1894007588|0)|0;
U=R;
R=Q;
Q=P<<30|P>>>2;
P=O;
O=L;
C[J>>2]=M;
}
for(J=K+240|0;(J|0)<(K+320|0);J=J+4|0)
{
M=(C[J-12>>2]^C[J-32>>2]^C[J-56>>2]^C[J-64>>2])<<1|(C[J-12>>2]^C[J-32>>2]^C[J-56>>2]^C[J-64>>2])>>>31;
L=((O<<5|O>>>27)+(P^Q^R)|0)+((M+U|0)-899497514|0)|0;
U=R;
R=Q;
Q=P<<30|P>>>2;
P=O;
O=L;
C[J>>2]=M;
}
O=O+V|0;
P=P+W|0;
Q=Q+X|0;
R=R+Y|0;
U=U+Z|0;
}
C[N+320>>2]=O;
C[N+324>>2]=P;
C[N+328>>2]=Q;
C[N+332>>2]=R;
C[N+336>>2]=U;
}
return {hash:F};
};
}());
}});
}
var p=location.protocol+"//"+location.hostname+"/zh_CN/htmledition/js_biz/com/kits/qmfileupload/js/h5_chip/dist/hash_worker.js";
function k(r)
{
var s=l.Html5PopupMail.prototype;
return d.extend(m.getChipLib(r),m.getH5SafeLib(r),{nConcurrent:1,nReaderNum:2,nHashWorkNum:2,nMaxRetryNum:100,nMaxSingleRetryNum:3,nSignFileBlockSize:512*1024,nUploadFileBlockSize:512*1024,nCacheThreshold:3,init_:function(){
r.init_.apply(this,arguments);
if(!n)
{
n=new h();
o=new j();
n.PRIORITY=o.PRIORITY={send:0,send_read:0,block_hash:0,file_sha1:1,file_md5:2,pre_read_file_hash:3,pre_block_hash:3};
for(var u=this.nReaderNum;u--;)
{
n.fork();
}
var t="";
if(window.goJsConlog)
{
t=["var noof=function(){},","$_home_qspace_dev_tools_codeSyncFiles_webmail_QQMail_tmp_js_ascii__qmtool_Log= noof,","goJsConlog;goJsConlog={addJslevel:noof,subJslevel:noof};\n"].join("");
}
if(d.isBrowser('edge')||d.isBrowser('ie'))
{
_sWorkerUrl=p;
}
else{
_sWorkerUrl=window.URL.createObjectURL(new Blob([q.toString()+'\n'+t+q.name+'();']));
}
for(var u=this.nHashWorkNum;u--;)
{
o.fork(_sWorkerUrl);
}
if(!d.isBrowser('edge')&&!d.isBrowser('ie'))
{
window.URL.revokeObjectURL(_sWorkerUrl);
}
}
},detect:function(){
var v;
if(typeof getTop=='function')
{
v=getTop();
}
else{
v={goExpers:{h5cJsUpload:true}};
}
var t=typeof Array.prototype.every=='function'&&v.goExpers&&v.goExpers.h5cJsUpload&&s.detect.apply(this,arguments)&&'Promise|FileReader|DataView|ArrayBuffer|Uint8Array|URL|Blob'.split('|').every(function(y){
return y in window;
});
if(t)
{
try{
var x;
if(d.isBrowser('edge')||d.isBrowser('ie'))
{
x=new Worker(p);
}
else{
var w=window.URL.createObjectURL(new Blob(['']));
x=new Worker(w);
window.URL.revokeObjectURL(w);
}
x&&x.terminate();
return true;
}
catch(u)
{
console.log(u);
}
}
return false;
},uploadToFtn:function(t){
return this.uploadInChip(t.set('bFtnFile',true));
},upload:function(t){
if(this.isUptoFtnForNormal())
{
return this.uploadInChip(t.set('bIsUptoFtnForNormal',true));
}
else{
return r.upload.apply(this,arguments);
}
},doChipFileSign_:function(t){
var v=this;
v.safeStartUpdate_(t);
var u=t.fCancel;
t.fCancel=function(){
t._oCurFileBlock&&t._oCurFileBlock.cancel();
u&&u.call(t);
};
v._realChipFileSign2(t);
},_genFileBlock:function(u,t){
var v=new f(n,o,u.oH5File.slice(t,t+this.nSignFileBlockSize));
v.__nOffset=t;
return v;
},_realChipFileSign2:function(t){
var H=this;
var A=t.get('nSize');
var D=[];
var y=0;
var z=0;
var v=Math.ceil(A/H.nSignFileBlockSize),u=v>2?2:v;
var J=1,B=0,G,C,F;
var x=d.speedNow(),w;
function K(L)
{
G=Promise.resolve(L);
for(i=0;i<u;i++)
{
C=F||H._genFileBlock(t,B);
B+=H.nSignFileBlockSize;
F=B>A?{}:(H._genFileBlock(t,B));
(function(M,N,O){
G=G.then(function(P){
if(t.bCancelH5_)
{
return;
}
if(!P)
{
P=[];
}
function V(W)
{
return {data:{state:P[0],chunk:N.block},type:'appendSHA1'};
}
function U(W)
{
return {data:{state:P[1],chunk:N.block},type:'appendMD5'};
}
t._oCurFileBlock=N;
var R=Promise.all([N._hashHandle("","file_sha1",V,"file_sha1",true),N._hashHandle("","file_md5",U,"file_md5",true)]);
var Q=d.speedNow();
R.then(function(){
var W=d.speedNow()-Q;
z++;
if(W>100)
{
y++;
try{
}
catch(X)
{
debugger;
}
}
N.free();
H.onChipFileSigning_(t,N.__nOffset/A*100-2);
});
if(u==M+1&&J*u<v)
{
return R.then(function(W){
J++;
K(W);
});
}
return R;
})['catch'](function(P){
H._customInternalError(t,'fileHashError');
});
})(i,C,F);
if((J-1)*u+i+1==v)
{
I();
break;
}
}
}
K();
D=null;
function I()
{
G.then(function(L){
t._oCurFileBlock=null;
if(y)
{
debug(['hash timeout:',(y/z*100).toFixed(6),'% ',y,'/',z].join(''));
}
if(!t.bCancelH5_)
{
return Promise.all([o.run(o.task({data:L[0],type:'getSHA1'})),o.run(o.task({data:L[1],type:'getMD5'}))]);
}
}).then(function(L){
w=d.speedNow();
var M=A/1024/1024/(w-x)*1000;
debug(["[",t.get("sName"),"]\u626B\u63CF:",M,"M/S"].join(""));
if(A>512*1024*1024)
{
new Image().src='/qy_mng_logic/reportKV?type=BizUpload&itemName=h5_scan_speed_b&value='+parseInt(M,10);
}
else{
new Image().src='/qy_mng_logic/reportKV?type=BizUpload&itemName=h5_scan_speed_s&value='+parseInt(M,10);
}
window.console&&console.log("sSHA:",L[0]);
window.console&&console.log("sMD5:",L[1]);
if(!t.bCancelH5_)
{
H.onChipFileSignEnd_(t,{sSHA:L[0],sMD5:L[1]});
}
},function(L){
H._customInternalError(t,'fileHashError');
});
}
},_realChipFileSign:function(t){
var C=this;
var B=Promise.resolve();
var y=t.get('nSize');
var A=[];
var w=0;
var x=0;
for(var z=0;z<y;z+=C.nSignFileBlockSize)
{
A.push(C._genFileBlock(t,z));
}
var v=d.speedNow(),u;
A.forEach(function(F,D,G){
var H=G[D+1]||{};
B=B.then(function(I){
if(t.bCancelH5_)
{
return;
}
if(!I)
{
I=[];
}
function M(N)
{
return {data:{state:I[0],chunk:N},type:'appendSHA1'};
}
function L(N)
{
return {data:{state:I[1],chunk:N},type:'appendMD5'};
}
t._oCurFileBlock=F;
H.read&&H.read('pre_read_file_hash');
var K=Promise.all([F.fileSha1(M),F.fileMd5(L)]);
var J=d.speedNow();
K.then(function(){
var N=d.speedNow()-J;
x++;
if(N>100)
{
w++;
try{
window.console&&console.log('[md5 timeout, offset:%s readcache:%s time:%d(%dms)]\n\tread:%s\n\tsha1:%s\n\tmd5%s',F.__nOffset,F.tasks.read.timing.start>J,J,N,F.tasks.read.speedReport(),F.tasks.file_sha1.speedReport(),F.tasks.file_md5.speedReport());
}
catch(O)
{
debugger;
}
}
F.free();
C.onChipFileSigning_(t,F.__nOffset/y*100-2);
});
return K;
});
});
A=null;
B.then(function(D){
t._oCurFileBlock=null;
if(w)
{
debug(['hash timeout:',(w/x*100).toFixed(6),'% ',w,'/',x].join(''));
}
if(!t.bCancelH5_)
{
return Promise.all([o.run(o.task({data:D[0],type:'getSHA1'})),o.run(o.task({data:D[1],type:'getMD5'}))]);
}
}).then(function(D){
u=d.speedNow();
debug(["[",t.get("sName"),"]\u626B\u63CF:",y/1024/1024/(u-v)*1000,"M/S"].join(""));
window.console&&console.log("sSHA:",D[0]);
window.console&&console.log("sMD5:",D[1]);
if(!t.bCancelH5_)
{
C.onChipFileSignEnd_(t,{sSHA:D[0],sMD5:D[1]});
}
},function(D){
C._customInternalError(t,'fileHashError');
});
},doChipUpload_:function(t){
var v=this;
var u=new e(n,o,t.oH5File,v.nUploadFileBlockSize,v.nCacheThreshold);
u.addCache(0,64*1024);
t._mnStartUploadTime=+new Date();
v._uploadFromOffset(t,u,0);
},_uploadFromOffset:function(w,v,t,u){
var A=this;
var z=+new Date();
var y,B,x;
return v.fetch(t).then(function(C){
y=d.speedNow();
B=C[0];
if(w.bCancelH5_)
{
return;
}
var F=C[0];
var D=C[1];
w._oCurFileBlock=C[2];
x=C[2]._nResumeReadTime;
return A._requestFTN(w,t,F,D);
}).then(function(C){
A.setRealPostSize_(w,z,w._oCurFileBlock.block.size);
return C;
},function(C){
A.setRealPostSize_(w,z,w._oCurFileBlock.block.size);
throw C;
}).then(function(C){
var G=d.speedNow();
var F=x-z>0?(x-z):0;
window.console&&console.log('[%s] offset:%f, start:%f, request:%f, total:%f, read:%fms(%d%), md5:%fms(%d%), ajax:%fms(%d%)',B,t,z,y,G-z,F,(F)/(G-z)*100,y-z-F,(y-z-F)/(G-z)*100,G-y,(G-y)/(G-z)*100);
if(w.bCancelH5_)
{
return;
}
var D=t+w._oCurFileBlock.block.size;
A.onprocess(w.set({nUploadPercent:D/w.get('nSize')*100,nUploadedSize:D}));
if(!C.end)
{
if(C.nextOffset>=w.get('nSize'))
{
throw new Error('next offset overflow');
}
if(C.nextOffset<=t)
{
window.console&&console.log("[ftn\u56DE\u4F20] next:",C.nextOffset,", ","cur:",t,", ","\u76F8\u5DEE\uFF1A",(t-C.nextOffset)/A.nUploadFileBlockSize,"\u7247");
var I=(t-C.nextOffset)/A.nUploadFileBlockSize;
if(I>A.nCacheThreshold||I!=parseInt(I))
{
v.resetCache();
}
if(w._mnCallBackTotalTime==undefined)
{
w._mnCallBackTotalChip=0;
w._mnCallBackTotalNum=0;
}
w._mnCallBackTotalChip+=Number((t-C.nextOffset)/A.nUploadFileBlockSize);
w._mnCallBackTotalNum++;
}
return A._uploadFromOffset(w,v,C.nextOffset);
}
else{
A.reportSuccDomain(w);
var H=+new Date();
debug(["\u603B\u8017\u65F6\uFF1A",(H-w._mnStartUploadTime)/1000,"s"].join(""));
debug(["\u771F\u5B9E\u8BF7\u6C42\u8017\u65F6\uFF1A",(w._mnRealRequestTotalTime)/1000,"s"].join(""));
debug(["\u771F\u5B9E\u8BF7\u6C42\u8017\u65F6\u5360\u6BD4\uFF1A",(w._mnRealRequestTotalTime)/(H-w._mnStartUploadTime)*100,"%"].join(""));
debug(["\u771F\u5B9E\u8BF7\u6C42\u6B21\u6570\uFF1A",(w._mnRealRequestTotalNum),"\u6B21"].join(""));
debug(["\u771F\u5B9E\u4E0A\u4F20\u5927\u5C0F\uFF1A",w.get("nRealPostSize")/1024/1024,"M"].join(""));
debug(["[",w.get("sName"),"]\u4E0A\u4F20:",w.get("nRealPostSize")/1024/1024/(H-w._mnStartUploadTime)*1000,"M/S"].join(""));
debug(["\u5E73\u5747\u56DE\u4F20\u7247\u6570\uFF1A",w._mnCallBackTotalChip?((w._mnCallBackTotalChip)/w._mnCallBackTotalNum):0,"\u7247"].join(""));
d.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|uploadSucc",sid:d.getSid()});
A.oncomplete(w);
}
})['catch'](function(C){
var D=w.get('nAutoUploadRetry')||0;
if(!u)
{
u=0;
}
if(D<A.nMaxRetryNum&&u<A.nMaxSingleRetryNum)
{
w.set('nAutoUploadRetry',++D);
debug('auto upload retry');
A._uploadFromOffset(w,v,t,u?u+1:1);
}
else{
if(/http,600/i.test(C.message))
{
A.reportCustomError(w,{fileUploadProgress:t/w.get('nSize')*10});
}
if(D>=A.nMaxRetryNum)
{
}
A._parseError(w,C);
}
});
},_parseError:function(u,t){
var v=this;
if(t.message=='next offset overflow')
{
v._customInternalError(u,'nextOffsetOverFlow');
}
else if(t.message.substr(0,5)=='http,')
{
v.onerror(u.set('sError',v.err('http',t.message.substr(5))));
}
else if(/^[a-z]+,/i.test(t.message))
{
v.onerror(u.set('sError',t.message));
}
else{
debug(t);
v.onerror(u.set('sError',v.err('unknow',709390)));
}
},_requestFTN:function(v,t,w,u){
var x;
if(typeof getTop=='function')
{
x=getTop();
}
else{
x={goExpers:{h5cJsUploadProxy:true}};
}
if((!/\.qq\.com$/.test(location.hostname)&&x.goExpers&&x.goExpers.h5cJsUploadProxy))
{
return this._requestFTNByAjaxProxy.apply(this,arguments);
}
else{
return this._requestFTNByAjax.apply(this,arguments);
}
},_requestFTNByAjaxProxy:function(v,t,w,u){
var x=this;
return new Promise(function(z,y){
var C,A;
var F=new XMLHttpRequest();
var B=v.get('nPort'),G="http";
if(window.location.protocol=="https:")
{
B="443";
G="https";
}
var H=G+'://'+(v.get('sDns')||v.get('sIP'))+':'+B+'/ftn_handler/';
F.open('POST',H,true);
F.timeout=20000;
F.setRequestHeader('DATA-MD5',w);
F.setRequestHeader('content-type','application/octet-stream');
F.setRequestHeader('Cache-Control','no-cache');
F.responseType='arraybuffer';
window.addEventListener('message',function(J){
I(J.data);
},{once:true});
function I(K)
{
try{
z(g.parseFTNRespone(K));
}
catch(J)
{
d.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|parseFTNResponeError",sid:d.getSid()});
y(J);
}
}
F.onerror=function(){
y(new Error('http,600'));
d.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|onerror",sid:d.getSid()});
};
F.onabort=function(){
y(new Error('http,700'));
d.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|onabort",sid:d.getSid()});
};
F.ontimeout=function(){
y(new Error('http,800'));
d.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|timeout",sid:d.getSid()});
};
F.upload.onprogress=function(J){
if(J.lengthComputable)
{
x.onprocess(v.set('nUploadPercent',(J.loaded+t)/v.get('nSize')*100));
}
};
var D=g.genFTNRequestBody(v.get('sKey'),v.get('sSHA'),v.oH5File,u,t);
document.getElementById("ajaxProxyIframe").contentWindow.postMessage({_sUrl:H,_asHash:w,_oSendAB:D},'*');
C=+new Date();
});
},_requestFTNByAjax:function(v,t,w,u){
var x=this;
return new Promise(function(z,y){
var C,A;
var F=new XMLHttpRequest();
var B=v.get('nPort'),G="http";
if(window.location.protocol=="https:")
{
B="443";
G="https";
}
var H=G+'://'+(v.get('sDns')||v.get('sIP'))+':'+B+'/ftn_handler/';
F.open('POST',H,true);
F.timeout=20000;
F.setRequestHeader('DATA-MD5',w);
F.setRequestHeader('content-type','application/octet-stream');
F.setRequestHeader('Cache-Control','no-cache');
F.responseType='arraybuffer';
F.onload=function(){
if(F.readyState==4)
{
F.upload.onprogress=null;
if(F.status==200)
{
A=+new Date();
if(v._mnRealRequestTotalTime==undefined)
{
v._mnRealRequestTotalTime=0;
v._mnRealRequestTotalNum=0;
}
v._mnRealRequestTotalTime+=Number(A-C);
v._mnRealRequestTotalNum++;
try{
z(g.parseFTNRespone(F.response));
}
catch(J)
{
d.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|parseFTNResponeError",sid:d.getSid()});
y(J);
}
}
else{
var I=F.getResponseHeader('User-ReturnCode');
y(new Error(I?'internal,'+I:'http,'+F.status));
}
}
};
F.onerror=function(){
y(new Error('http,600'));
d.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|onerror",sid:d.getSid()});
};
F.onabort=function(){
y(new Error('http,700'));
d.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|onabort",sid:d.getSid()});
};
F.ontimeout=function(){
y(new Error('http,800'));
d.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|timeout",sid:d.getSid()});
};
F.upload.onprogress=function(I){
if(I.lengthComputable)
{
x.onprocess(v.set('nUploadPercent',(I.loaded+t)/v.get('nSize')*100));
}
};
var D=g.genFTNRequestBody(v.get('sKey'),v.get('sSHA'),v.oH5File,u,t);
F.send(D);
C=+new Date();
});
},_customInternalError:function(t,u){
this.onerror(t.set('sError',this.err('internal',{nextOffsetOverFlow:200001,fileHashError:200002}[u]||709390)));
},reportCustomError:function(t,w){
var u=t.get('nPort'),v="http";
if(window.location.protocol=="https:"||window.location.hostname.indexOf("webdev")>-1)
{
u="443";
v="https";
}
},reportSuccDomain:function(t){
var u=["succdomain=",t.get('sIP')].join("");
}});
}
m.createCom('H5CPopupMail',k,'Html5PopupMail');
m.createCom('H5CDragFMailCROS',k,'Html5DragCROS');
m.createCom('H5CDragFMail',k,'Html5DragMail');
})(QMFileAdaptor);
},,function(f,e,d){
var a=d(3);
var c=d(4);
function b()
{
this.queue=new a();
}
b.prototype.PRIORITY={};
b.prototype.fork=function(){
this.queue.addWorker(new FileReader());
};
b.prototype.task=function(g,k){
var h=this;
var j=new c(g,k);
j.result().then(function(){
h.queue.removeTask(j);
});
return j;
};
b.prototype.run=function(h,g){
return this.queue.runTask(h,this.PRIORITY[g]);
};
f.exports=b;
},function(c,b){
function a()
{
this._tasksList=[];
this._workers=[];
}
a.prototype.addWorker=function(h){
if(h.__status__&&h.__status__!='ready')
{
return console.warn('worker add twice');
}
for(var d=0,e=this._tasksList.length,f,g;d<e;d++)
{
g=this._tasksList[d];
if(g&&g.length)
{
while((f=g.shift()))
{
if(this._runTask(h,f))
{
return;
}
}
}
}
h.__status__='ready';
this._workers.push(h);
};
a.prototype._runTask=function(f,e){
var d=this;
if(e.start(f))
{
e.result().then(function(){
f.__status__='ready';
d.addWorker(f);
},function(g){
f.__status__='ready';
d.addWorker(f);
return Promise.reject(g);
});
f.__status__='running';
d.removeWorker(f);
return true;
}
return false;
};
a.prototype.findWorker=function(d){
return this._workers.findIndex(function(e){
return e===d;
});
};
a.prototype.removeWorker=function(d){
this._workers=this._workers.filter(function(e){
return e!==d;
});
};
a.prototype.runTask=function(e,d){
if(this._workers.length>0)
{
this._runTask(this._workers[0],e);
}
else{
this.insertTask(e,d);
}
return e.result();
};
a.prototype.insertTask=function(e,d){
if(d)
d=Number(d);
d||(d=0);
(this._tasksList[d]||(this._tasksList[d]=[])).push(e);
(e.__priority||(e.__priority=[])).push(d);
};
a.prototype.removeTask=function(e){
var f=this._tasksList;
for(var d=f.length;d--;)
{
if(f[d])
{
f[d]=f[d].filter(function(g){
return e!==g;
});
}
}
};
c.exports=a;
},function(e,d,c){
var b=c(5);
function a(f,g)
{
this._type=g;
this._rdBlock=f;
b.call(this);
}
a.prototype=b.proto();
a.prototype.handle_=function(f){
var g=this;
return new Promise(function(n,m){
f.addEventListener('load',l);
f.addEventListener('abort',j);
f.addEventListener('error',k);
f.readAsArrayBuffer(g._rdBlock);
function l(o)
{
h();
n(o.target.result);
}
function j()
{
h();
m(new Error('aborted'));
}
function k(o)
{
h();
m(o);
}
function h()
{
delete g._rdBlock;
f.removeEventListener('load',l);
f.removeEventListener('abort',j);
f.removeEventListener('error',k);
}
});
};
e.exports=a;
},function(c,b){
function a()
{
var d=this;
d.timing={};
d._resolve=d._reject=null;
d._step('init');
d._promise=new Promise(function(f,e){
d._resolve=f;
d._reject=e;
}).then(function(e){
d._step('start');
return d.handle_(e);
});
d._promise.then(function(){
d._step('success');
},function(e){
d._step('error');
return Promise.reject(e);
});
}
a.prototype.SPEED_TEST=true;
a.prototype.timeEnd=function(d){
if(this.SPEED_TEST)
{
this.timing[d]=+new Date();
}
};
a.prototype.speedReport=function(){
var f=this.timing;
var d=f.success||f.error||f.aborted;
var g=d-f.init||1;
var h=f.start-f.init;
var e=d-f.start;
return ['[',this.__status__,']',' init:',f.init,' total:',g,'ms',' wait:',h,'ms(',(h/g*100).toFixed(2),'%)',' run:',e,'ms(',(e/g*100).toFixed(2),'%)'].join('');
};
a.prototype._step=function(d){
this.__status__=d;
this.timeEnd(d);
};
a.prototype.start=function(e){
if(this._resolve)
{
var d=this._resolve;
this._reject=this._resolve=null;
d(e);
return true;
}
return false;
};
a.prototype.abort=function(d){
if(this._reject)
{
var e=this._reject;
this._reject=this._resolve=null;
d!==true&&e(new Error('abort'));
}
this._step('aborted');
};
a.prototype.handle_=function(){
};
a.prototype.result=function(){
return this._promise;
};
a.proto=function(){
function d()
{
}
d.prototype=this.prototype;
return new d();
};
c.exports=a;
},function(f,e,d){
var a=d(3);
var c=d(7);
function b()
{
this.queue=new a();
}
b.prototype.PRIORITY={};
b.prototype.fork=function(k){
var j=this;
try{
var l=new Worker(k);
}
catch(g)
{
console.log('init worker',g);
return g;
}
function h(m)
{
l.removeEventListener('message',h);
if(m.data.type=='ready')
{
j.queue.addWorker(l);
}
}
l.addEventListener('message',h);
l.addEventListener('error',function(m){
console.log('worker err, %s err:%o',k,m);
l.postMessage({type:'reset'});
});
};
b.prototype.task=function(g){
return new c(g);
};
b.prototype.run=function(h,g){
return this.queue.runTask(h,this.PRIORITY[g]);
};
f.exports=b;
},function(e,d,c){
var a=c(5);
function b(f)
{
this._wkmsg=f;
a.call(this);
}
b.prototype=a.proto();
b.prototype.handle_=function(g){
var f=this;
return new Promise(function(m,l){
g.addEventListener('message',k);
g.addEventListener('error',j);
g.postMessage(f._wkmsg);
function k(n)
{
if(n.data.type==='done')
{
h();
m(n.data.data);
}
else if(n.data.type==='retry')
{
f.nRetryCount=f.nRetryCount||0;
if(f.nRetryCount>4)
{
debug(n.data.data);
return j(n.data.data);
}
f.nRetryCount++;
g.postMessage(f._wkmsg);
}
}
function j(n)
{
h();
l(n);
}
function h()
{
delete f._wkmsg;
g.removeEventListener('message',k);
g.removeEventListener('error',j);
}
});
};
e.exports=b;
},function(e,d,c){
var b=c(9);
function a(j,k,h,g,f)
{
this._workers=k;
this._readers=j;
this._chunkSize=g;
this._file=h;
this._cacheThreshold=f;
this._caches={length:0};
}
a.prototype.fetch=function(g){
var j=this;
var f=j._caches[g];
if(f)
{
}
else{
console&&console.warn('no cache:%d',g);
f=j.addCache(g,j._chunkSize);
}
j._cleanup(g);
delete this._caches[g];
j._runPrefetch(f._fetch_end);
var h=Promise.all([f.hash('block_hash'),f.read('send_read'),f]);
return h;
};
a.prototype.addCache=function(j,g){
var h=j+g;
var f=this._caches[j]=new b(this._readers,this._workers,this._file.slice(j,h));
this._caches.length++;
f._fetch_start=j;
f._fetch_end=h;
return f;
};
a.prototype.rmCache=function(g){
var f=this._caches[g];
if(f&&f.cancel)
{
f.cancel();
delete this._caches[g];
}
};
a.prototype._runPrefetch=function(f){
var g=this;
if(g._caches.length>g._cacheThreshold)
{
return;
}
while(f<g._file.size&&g._caches[f])
{
f+=g._chunkSize;
}
if(f>=g._file.size)
{
return;
}
g._prefetch(f).then(function(){
g._runPrefetch(f+g._chunkSize);
});
};
a.prototype._prefetch=function(f){
return this.addCache(f,this._chunkSize).hash('pre_block_hash');
};
a.prototype._cleanup=function(f){
var g=this._caches;
var h=0;
for(var j in g)
{
if(j=='length')
continue;
if(j<f)
this.rmCache(j);
else h++;
}
g.length=h;
};
a.prototype.resetCache=function(){
this._caches={length:0};
};
e.exports=a;
},function(c,b){
function a(f,g,e)
{
this.__status__='init';
this._readers=f;
this._workers=g;
this.block=e;
this.tasks={};
}
a.prototype.readAsBuffer=function(f,e){
var g=this;
var h=g._readers.task(g.block,"toBuffer");
g.__status__='readAsBuffer';
g._readers.run(h,f);
return h.result();
};
a.prototype.read=function(f,e){
var g=this;
var h=g.tasks.read;
if(!h||e)
{
if(h&&e)
h.abort(true);
h=g.tasks.read=g._readers.task(g.block);
}
g.__status__='read';
g._readers.run(h,f);
return h.result();
};
a.prototype.free=function(){
delete this.tasks.read;
for(var e in this.tasks)
{
this._workers.queue.removeTask(this.tasks[e]);
delete this.tasks[e];
}
};
a.prototype.hash=function(f,e){
var g=this;
return this._readAndHash('hash',d,f,e);
};
a.prototype.fileMd5=function(f,e){
return this._hashRoute('file_md5',f,e);
};
a.prototype.fileSha1=function(f,e){
return this._hashRoute('file_sha1',f,e);
};
a.prototype._hashHandle=function(e,l,g,h,f){
var j=this;
var k=j.tasks[l];
if(!k||f)
{
if(k&&f)
{
k.abort(true);
delete j.tasks[l];
}
k=j.tasks[l]=j._workers.task(g(e));
}
j.__status__=l;
j._workers.run(k,h);
return k.result();
};
a.prototype._readAndHash=function(k,f,g,e){
var h=this;
var j=h.tasks[k];
if(!j||e)
{
if(j&&e)
{
j.abort(true);
delete h.tasks[k];
}
return h.read(g,false).then(function(l){
h._nResumeReadTime=+new Date();
return h._hashHandle(l,k,f,g,e);
});
}
else{
h._workers.run(j,g);
return j.result();
}
};
a.prototype._hashRoute=function(h,f,e){
var g=this;
if(e instanceof Promise)
{
return e.then(function(j){
return g._hashRoute(h,f,j);
});
}
else if(e)
{
return g._hashHandle(e,h,f,h,true);
}
else{
return g._readAndHash(h,f,h,true);
}
};
a.prototype.cancel=function(){
var f=this.tasks;
for(var e in f)
{
if(f[e]&&f[e].abort)
f[e].abort(true);
delete f[e];
}
};
function d(e)
{
return {data:e,type:'chunkMD5'};
}
c.exports=a;
},function(n,l){
var a=0xABCD9876;
function m(B,w,v,u,A)
{
var C=k(B);
var D=d(C.byteLength);
var x=k(w);
var y=d(x.byteLength);
var s=e(v,A,u);
var t=s.byteLength+C.byteLength+x.byteLength+D.byteLength+y.byteLength+u.byteLength;
var z=f(t);
var p=new ArrayBuffer(t+z.byteLength);
var q=new Uint8Array(p);
var r=0;
[z,D,C,y,x,s,u].forEach(function(F){
q.set(new Uint8Array(F),r);
r+=F.byteLength;
});
return q;
}
function o(s)
{
var r=new DataView(s);
if(r.getUint32(0,false)!=a)
throw new Error('Unknow response');
var p=r.getUint32(4,false);
if(p)
throw new Error('cgi,'+p);
if(r.getUint8(16)==0)
{
var q=g(r.getUint32(17,false),r.getUint32(21,false));
return {nextOffset:q};
}
else if(r.getUint8(16)==1)
{
return {end:true};
}
else{
throw new Error('Unknow status');
}
}
function k(s)
{
var p=new ArrayBuffer(s.length/2);
var t=new Uint8Array(p);
for(var q=p.byteLength;q--;)
{
var r=parseInt(s.substr(q*2,2),16);
if(isNaN(r))
throw new Error('parse hex err');
t[q]=r;
}
return p;
}
function d(r)
{
var p=new ArrayBuffer(2);
var q=new DataView(p);
q.setUint16(0,r,false);
return p;
}
function f(p)
{
var q=f.headABView;
if(!q)
{
q=new DataView(new ArrayBuffer(16));
f.headABView=q;
h(q,[a,1007,0]);
}
q.setUint32(12,p,false);
return q.buffer;
}
function e(r,t,q)
{
var p=e.bodyABLenView;
if(!p)
{
p=new DataView(new ArrayBuffer(20));
e.bodyABLenView=p;
}
var s=j(r.size);
var u=j(t);
h(p,[s.low,u.low,q.byteLength,s.high,u.high]);
return p.buffer;
}
var b=0xffffffff;
var c=b+1;
function j(p)
{
return {low:p&b,high:p/c|0};
}
function g(q,p)
{
return q+(p||0)*c;
}
function h(r,p,q)
{
q||(q=0);
p.forEach(function(t,s){
r.setUint32(q+s*4,t,false);
});
}
l.genFTNRequestBody=m;
l.parseFTNRespone=o;
}]);
(function(c){
var b={};
function a(e)
{
if(b[e])
{
return b[e].exports;
}
var d=b[e]={exports:{},id:e,loaded:false};
c[e].call(d.exports,d,d.exports,a);
d.loaded=true;
return d.exports;
}
a.m=c;
a.c=b;
a.p="";
return a(0);
})([function(module,exports,__webpack_require__){
;(function(A){
var _oQmFileUpload=QMFileUpload,_oComs=_oQmFileUpload.components;
var _oCfg={};
var _oReaderQueue,_oWorkerQueue;
var ReaderQueue=__webpack_require__(2);
var WorkerQueue=__webpack_require__(6);
var Fetcher=__webpack_require__(8);
var FileBlock=__webpack_require__(9);
var FtnConverter=__webpack_require__(10);
function workerFunc()
{
var Module;
if(!Module)
Module=(typeof Module!=='undefined'?Module:null)||{};
var moduleOverrides={};
var key;
for(key in Module)
{
if(Module.hasOwnProperty(key))
{
moduleOverrides[key]=Module[key];
}
}
var ENVIRONMENT_IS_WEB=false;
var ENVIRONMENT_IS_WORKER=false;
var ENVIRONMENT_IS_NODE=false;
var ENVIRONMENT_IS_SHELL=false;
if(Module['ENVIRONMENT'])
{
if(Module['ENVIRONMENT']==='WEB')
{
ENVIRONMENT_IS_WEB=true;
}
else if(Module['ENVIRONMENT']==='WORKER')
{
ENVIRONMENT_IS_WORKER=true;
}
else if(Module['ENVIRONMENT']==='NODE')
{
ENVIRONMENT_IS_NODE=true;
}
else if(Module['ENVIRONMENT']==='SHELL')
{
ENVIRONMENT_IS_SHELL=true;
}
else{
}
}
else{
ENVIRONMENT_IS_WEB=(typeof window==='object');
ENVIRONMENT_IS_WORKER=typeof importScripts==='function';
ENVIRONMENT_IS_NODE=typeof process==='object'&&typeof require==='function'&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;
ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;
}
if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)
{
Module['read']=function shell_read(url){
var xhr=new XMLHttpRequest();
xhr.open('GET',url,false);
xhr.send(null);
return xhr.responseText;
};
if(ENVIRONMENT_IS_WORKER)
{
Module['readBinary']=function readBinary(url){
var xhr=new XMLHttpRequest();
xhr.open('GET',url,false);
xhr.responseType='arraybuffer';
xhr.send(null);
return new Uint8Array(xhr.response);
};
}
Module['readAsync']=function readAsync(url,onload,onerror){
var xhr=new XMLHttpRequest();
xhr.open('GET',url,true);
xhr.responseType='arraybuffer';
xhr.onload=function xhr_onload(){
if(xhr.status==200||(xhr.status==0&&xhr.response))
{
onload(xhr.response);
return;
}
onerror();
};
xhr.onerror=onerror;
xhr.send(null);
};
if(typeof arguments!='undefined')
{
Module['arguments']=arguments;
}
if(typeof console!=='undefined')
{
if(!Module['print'])
Module['print']=function shell_print(x){
console.log(x);
};
if(!Module['printErr'])
Module['printErr']=function shell_printErr(x){
console.warn(x);
};
}
else{
var TRY_USE_DUMP=false;
if(!Module['print'])
Module['print']=(TRY_USE_DUMP&&(typeof (dump)!=="undefined")?(function(x){
dump(x);
}):(function(x){
}));
}
if(ENVIRONMENT_IS_WORKER)
{
Module['load']=importScripts;
}
if(typeof Module['setWindowTitle']==='undefined')
{
Module['setWindowTitle']=function(title){
document.title=title;
};
}
}
else{
throw new Error('Unknown runtime environment. Where are we?');
}
function globalEval(x)
{
eval.call(null,x);
}
if(!Module['load']&&Module['read'])
{
Module['load']=function load(f){
globalEval(Module['read'](f));
};
}
if(!Module['print'])
{
Module['print']=function(){
};
}
if(!Module['printErr'])
{
Module['printErr']=Module['print'];
}
if(!Module['arguments'])
{
Module['arguments']=[];
}
if(!Module['thisProgram'])
{
Module['thisProgram']='./this.program';
}
if(!Module['quit'])
{
Module['quit']=function(status,toThrow){
throw toThrow;
};
}
Module.print=Module['print'];
Module.printErr=Module['printErr'];
Module['preRun']=[];
Module['postRun']=[];
for(key in moduleOverrides)
{
if(moduleOverrides.hasOwnProperty(key))
{
Module[key]=moduleOverrides[key];
}
}
moduleOverrides=undefined;
var Runtime={setTempRet0:function(value){
tempRet0=value;
return value;
},getTempRet0:function(){
return tempRet0;
},stackSave:function(){
return STACKTOP;
},stackRestore:function(stackTop){
STACKTOP=stackTop;
},getNativeTypeSize:function(type){
switch(type)
{case 'i1':
case 'i8':
return 1;
case 'i16':
return 2;
case 'i32':
return 4;
case 'i64':
return 8;
case 'float':
return 4;
case 'double':
return 8;
default:
{
if(type[type.length-1]==='*')
{
return Runtime.QUANTUM_SIZE;
}
else if(type[0]==='i')
{
var bits=parseInt(type.substr(1));
assert(bits%8===0);
return bits/8;
}
else{
return 0;
}
}
}
},getNativeFieldSize:function(type){
return Math.max(Runtime.getNativeTypeSize(type),Runtime.QUANTUM_SIZE);
},STACK_ALIGN:16,prepVararg:function(ptr,type){
if(type==='double'||type==='i64')
{
if(ptr&7)
{
assert((ptr&7)===4);
ptr+=4;
}
}
else{
assert((ptr&3)===0);
}
return ptr;
},getAlignSize:function(type,size,vararg){
if(!vararg&&(type=='i64'||type=='double'))
{
return 8;
}
if(!type)
{
return Math.min(size,8);
}
return Math.min(size||(type?Runtime.getNativeFieldSize(type):0),Runtime.QUANTUM_SIZE);
},dynCall:function(sig,ptr,args){
if(args&&args.length)
{
assert(args.length==sig.length-1);
return Module['dynCall_'+sig].apply(null,[ptr].concat(args));
}
else{
assert(sig.length==1);
return Module['dynCall_'+sig].call(null,ptr);
}
},functionPointers:[],addFunction:function(func){
for(var i=0;i<Runtime.functionPointers.length;i++)
{
if(!Runtime.functionPointers[i])
{
Runtime.functionPointers[i]=func;
return 2*(1+i);
}
}
throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
},removeFunction:function(index){
Runtime.functionPointers[(index-2)/2]=null;
},warnOnce:function(text){
if(!Runtime.warnOnce.shown)
Runtime.warnOnce.shown={};
if(!Runtime.warnOnce.shown[text])
{
Runtime.warnOnce.shown[text]=1;
Module.printErr(text);
}
},funcWrappers:{},getFuncWrapper:function(func,sig){
if(!func)
{
return;
}
assert(sig);
if(!Runtime.funcWrappers[sig])
{
Runtime.funcWrappers[sig]={};
}
var sigCache=Runtime.funcWrappers[sig];
if(!sigCache[func])
{
if(sig.length===1)
{
sigCache[func]=function dynCall_wrapper(){
return Runtime.dynCall(sig,func);
};
}
else if(sig.length===2)
{
sigCache[func]=function dynCall_wrapper(arg){
return Runtime.dynCall(sig,func,[arg]);
};
}
else{
sigCache[func]=function dynCall_wrapper(){
return Runtime.dynCall(sig,func,Array.prototype.slice.call(arguments));
};
}
}
return sigCache[func];
},getCompilerSetting:function(name){
throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work';
},stackAlloc:function(size){
var ret=STACKTOP;
STACKTOP=(STACKTOP+size)|0;
STACKTOP=(((STACKTOP)+15)&-16);
(assert((((STACKTOP|0)<(STACK_MAX|0))|0))|0);
return ret;
},staticAlloc:function(size){
var ret=STATICTOP;
STATICTOP=(STATICTOP+(assert(!staticSealed),size))|0;
STATICTOP=(((STATICTOP)+15)&-16);
return ret;
},dynamicAlloc:function(size){
assert(DYNAMICTOP_PTR);
var ret=HEAP32[DYNAMICTOP_PTR>>2];
var end=(((ret+size+15)|0)&-16);
HEAP32[DYNAMICTOP_PTR>>2]=end;
if(end>=TOTAL_MEMORY)
{
var success=enlargeMemory();
if(!success)
{
HEAP32[DYNAMICTOP_PTR>>2]=ret;
return 0;
}
}
return ret;
},alignMemory:function(size,quantum){
var ret=size=Math.ceil((size)/(quantum?quantum:16))*(quantum?quantum:16);
return ret;
},makeBigInt:function(low,high,unsigned){
var ret=(unsigned?((+(low>>>0))+((+(high>>>0))*4294967296.0)):((+(low>>>0))+((+(high|0))*4294967296.0)));
return ret;
},GLOBAL_BASE:1024,QUANTUM_SIZE:4,__dummy__:0};
Module["Runtime"]=Runtime;
var ABORT=0;
var EXITSTATUS=0;
function assert(condition,text)
{
if(!condition)
{
abort('Assertion failed: '+text);
}
}
var globalScope=this;
function getCFunc(ident)
{
var func=Module['_'+ident];
if(!func)
{
try{
func=eval('_'+ident);
}
catch(e)
{
}
}
assert(func,'Cannot call unknown function '+ident+' (perhaps LLVM optimizations or closure removed it?)');
return func;
}
var cwrap,ccall;
(function(){
var JSfuncs={'stackSave':function(){
Runtime.stackSave();
},'stackRestore':function(){
Runtime.stackRestore();
},'arrayToC':function(arr){
var ret=Runtime.stackAlloc(arr.length);
writeArrayToMemory(arr,ret,ident);
return ret;
},'stringToC':function(str){
var ret=0;
if(str!==null&&str!==undefined&&str!==0)
{
var len=(str.length<<2)+1;
ret=Runtime.stackAlloc(len);
stringToUTF8(str,ret,len);
}
return ret;
}};
var toC={'string':JSfuncs['stringToC'],'array':JSfuncs['arrayToC']};
ccall=function ccallFunc(ident,returnType,argTypes,args,opts){
var func=getCFunc(ident);
var cArgs=[];
var stack=0;
assert(returnType!=='array','Return type should not be "array".');
if(args)
{
for(var i=0;i<args.length;i++)
{
var converter=toC[argTypes[i]];
if(converter)
{
if(stack===0)
stack=Runtime.stackSave();
cArgs[i]=converter(args[i]);
}
else{
cArgs[i]=args[i];
}
}
}
var ret=func.apply(null,cArgs);
if(returnType==='string')
ret=Pointer_stringify(ret);
if(stack!==0)
{
Runtime.stackRestore(stack);
}
return ret;
};
var sourceRegex=/^function\s*[a-zA-Z$_0-9]*\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;
function parseJSFunc(jsfunc)
{
var parsed=jsfunc.toString().match(sourceRegex).slice(1);
return {arguments:parsed[0],body:parsed[1],returnValue:parsed[2]};
}
var JSsource=null;
function ensureJSsource()
{
if(!JSsource)
{
JSsource={};
for(var fun in JSfuncs)
{
if(JSfuncs.hasOwnProperty(fun))
{
JSsource[fun]=parseJSFunc(JSfuncs[fun]);
}
}
}
}
cwrap=function cwrap(ident,returnType,argTypes){
argTypes=argTypes||[];
var cfunc=getCFunc(ident);
var numericArgs=argTypes.every(function(type){
return type==='number';
});
var numericRet=(returnType!=='string');
if(numericRet&&numericArgs)
{
return cfunc;
}
var argNames=argTypes.map(function(x,i){
return '$'+i;
});
var funcstr="(function("+argNames.join(',')+") {";
var nargs=argTypes.length;
if(!numericArgs)
{
ensureJSsource();
funcstr+='var stack = '+JSsource['stackSave'].body+';';
for(var i=0;i<nargs;i++)
{
var arg=argNames[i],type=argTypes[i];
if(type==='number')
continue;
var convertCode=JSsource[type+'ToC'];
funcstr+='var '+convertCode.arguments+' = '+arg+';';
funcstr+=convertCode.body+';';
funcstr+=arg+'=('+convertCode.returnValue+');';
}
}
var cfuncname=parseJSFunc(function(){
return cfunc;
}).returnValue;
funcstr+='var ret = '+cfuncname+'('+argNames.join(',')+');';
if(!numericRet)
{
var strgfy=parseJSFunc(function(){
return Pointer_stringify;
}).returnValue;
funcstr+='ret = '+strgfy+'(ret);';
}
funcstr+="if (typeof EmterpreterAsync === 'object') { assert(!EmterpreterAsync.state, 'cannot start async op with normal JS calling cwrap') }";
if(!numericArgs)
{
ensureJSsource();
funcstr+=JSsource['stackRestore'].body.replace('()','(stack)')+';';
}
funcstr+='return ret})';
return eval(funcstr);
};
})();
Module["ccall"]=ccall;
Module["cwrap"]=cwrap;
function setValue(ptr,value,type,noSafe)
{
type=type||'i8';
if(type.charAt(type.length-1)==='*')
type='i32';
switch(type)
{case 'i1':
HEAP8[((ptr)>>0)]=value;
break;
case 'i8':
HEAP8[((ptr)>>0)]=value;
break;
case 'i16':
HEAP16[((ptr)>>1)]=value;
break;
case 'i32':
HEAP32[((ptr)>>2)]=value;
break;
case 'i64':
(tempI64=[value>>>0,(tempDouble=value,(+(Math_abs(tempDouble)))>=1.0?(tempDouble>0.0?((Math_min((+(Math_floor((tempDouble)/4294967296.0))),4294967295.0))|0)>>>0:(~~(+(Math_ceil((tempDouble-+((~~(tempDouble))>>>0))/4294967296.0))))>>>0):0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]);
break;
case 'float':
HEAPF32[((ptr)>>2)]=value;
break;
case 'double':
HEAPF64[((ptr)>>3)]=value;
break;
default:
abort('invalid type for setValue: '+type);
}
}
Module["setValue"]=setValue;
function getValue(ptr,type,noSafe)
{
type=type||'i8';
if(type.charAt(type.length-1)==='*')
type='i32';
switch(type)
{case 'i1':
return HEAP8[((ptr)>>0)];
case 'i8':
return HEAP8[((ptr)>>0)];
case 'i16':
return HEAP16[((ptr)>>1)];
case 'i32':
return HEAP32[((ptr)>>2)];
case 'i64':
return HEAP32[((ptr)>>2)];
case 'float':
return HEAPF32[((ptr)>>2)];
case 'double':
return HEAPF64[((ptr)>>3)];
default:
abort('invalid type for getValue: '+type);
}return null;
}
Module["getValue"]=getValue;
var ALLOC_NORMAL=0;
var ALLOC_STACK=1;
var ALLOC_STATIC=2;
var ALLOC_DYNAMIC=3;
var ALLOC_NONE=4;
Module["ALLOC_NORMAL"]=ALLOC_NORMAL;
Module["ALLOC_STACK"]=ALLOC_STACK;
Module["ALLOC_STATIC"]=ALLOC_STATIC;
Module["ALLOC_DYNAMIC"]=ALLOC_DYNAMIC;
Module["ALLOC_NONE"]=ALLOC_NONE;
function allocate(slab,types,allocator,ptr)
{
var zeroinit,size;
if(typeof slab==='number')
{
zeroinit=true;
size=slab;
}
else{
zeroinit=false;
size=slab.length;
}
var singleType=typeof types==='string'?types:null;
var ret;
if(allocator==ALLOC_NONE)
{
ret=ptr;
}
else{
ret=[typeof _malloc==='function'?_malloc:Runtime.staticAlloc,Runtime.stackAlloc,Runtime.staticAlloc,Runtime.dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length));
}
if(zeroinit)
{
var stop;
ptr=ret;
assert((ret&3)==0);
stop=ret+(size&~3);
for(;ptr<stop;ptr+=4)
{
HEAP32[((ptr)>>2)]=0;
}
stop=ret+size;
while(ptr<stop)
{
HEAP8[((ptr++)>>0)]=0;
}
return ret;
}
if(singleType==='i8')
{
if(slab.subarray||slab.slice)
{
HEAPU8.set((slab),ret);
}
else{
HEAPU8.set(new Uint8Array(slab),ret);
}
return ret;
}
var i=0,type,typeSize,previousType;
while(i<size)
{
var curr=slab[i];
if(typeof curr==='function')
{
curr=Runtime.getFunctionIndex(curr);
}
type=singleType||types[i];
if(type===0)
{
i++;
continue;
}
assert(type,'Must know what type to store in allocate!');
if(type=='i64')
type='i32';
setValue(ret+i,curr,type);
if(previousType!==type)
{
typeSize=Runtime.getNativeTypeSize(type);
previousType=type;
}
i+=typeSize;
}
return ret;
}
Module["allocate"]=allocate;
function getMemory(size)
{
if(!staticSealed)
{
return Runtime.staticAlloc(size);
}
if(!runtimeInitialized)
{
return Runtime.dynamicAlloc(size);
}
return _malloc(size);
}
Module["getMemory"]=getMemory;
function Pointer_stringify(ptr,length)
{
if(length===0||!ptr)
{
return '';
}
var hasUtf=0;
var t;
var i=0;
while(1)
{
assert(ptr+i<TOTAL_MEMORY);
t=HEAPU8[(((ptr)+(i))>>0)];
hasUtf|=t;
if(t==0&&!length)
break;
i++;
if(length&&i==length)
break;
}
if(!length)
length=i;
var ret='';
if(hasUtf<128)
{
var MAX_CHUNK=1024;
var curr;
while(length>0)
{
curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));
ret=ret?ret+curr:curr;
ptr+=MAX_CHUNK;
length-=MAX_CHUNK;
}
return ret;
}
return Module['UTF8ToString'](ptr);
}
Module["Pointer_stringify"]=Pointer_stringify;
function AsciiToString(ptr)
{
var str='';
while(1)
{
var ch=HEAP8[((ptr++)>>0)];
if(!ch)
{
return str;
}
str+=String.fromCharCode(ch);
}
}
Module["AsciiToString"]=AsciiToString;
function stringToAscii(str,outPtr)
{
return writeAsciiToMemory(str,outPtr,false);
}
Module["stringToAscii"]=stringToAscii;
var UTF8Decoder=typeof TextDecoder!=='undefined'?new TextDecoder('utf8'):undefined;
function UTF8ArrayToString(u8Array,idx)
{
var endPtr=idx;
while(u8Array[endPtr])
++endPtr;
if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder)
{
return UTF8Decoder.decode(u8Array.subarray(idx,endPtr));
}
else{
var u0,u1,u2,u3,u4,u5;
var str='';
while(1)
{
u0=u8Array[idx++];
if(!u0)
{
return str;
}
if(!(u0&0x80))
{
str+=String.fromCharCode(u0);
continue;
}
u1=u8Array[idx++]&63;
if((u0&0xE0)==0xC0)
{
str+=String.fromCharCode(((u0&31)<<6)|u1);
continue;
}
u2=u8Array[idx++]&63;
if((u0&0xF0)==0xE0)
{
u0=((u0&15)<<12)|(u1<<6)|u2;
}
else{
u3=u8Array[idx++]&63;
if((u0&0xF8)==0xF0)
{
u0=((u0&7)<<18)|(u1<<12)|(u2<<6)|u3;
}
else{
u4=u8Array[idx++]&63;
if((u0&0xFC)==0xF8)
{
u0=((u0&3)<<24)|(u1<<18)|(u2<<12)|(u3<<6)|u4;
}
else{
u5=u8Array[idx++]&63;
u0=((u0&1)<<30)|(u1<<24)|(u2<<18)|(u3<<12)|(u4<<6)|u5;
}
}
}
if(u0<0x10000)
{
str+=String.fromCharCode(u0);
}
else{
var ch=u0-0x10000;
str+=String.fromCharCode(0xD800|(ch>>10),0xDC00|(ch&0x3FF));
}
}
}
}
Module["UTF8ArrayToString"]=UTF8ArrayToString;
function UTF8ToString(ptr)
{
return UTF8ArrayToString(HEAPU8,ptr);
}
Module["UTF8ToString"]=UTF8ToString;
function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite)
{
if(!(maxBytesToWrite>0))
{
return 0;
}
var startIdx=outIdx;
var endIdx=outIdx+maxBytesToWrite-1;
for(var i=0;i<str.length;++i)
{
var u=str.charCodeAt(i);
if(u>=0xD800&&u<=0xDFFF)
u=0x10000+((u&0x3FF)<<10)|(str.charCodeAt(++i)&0x3FF);
if(u<=0x7F)
{
if(outIdx>=endIdx)
break;
outU8Array[outIdx++]=u;
}
else if(u<=0x7FF)
{
if(outIdx+1>=endIdx)
break;
outU8Array[outIdx++]=0xC0|(u>>6);
outU8Array[outIdx++]=0x80|(u&63);
}
else if(u<=0xFFFF)
{
if(outIdx+2>=endIdx)
break;
outU8Array[outIdx++]=0xE0|(u>>12);
outU8Array[outIdx++]=0x80|((u>>6)&63);
outU8Array[outIdx++]=0x80|(u&63);
}
else if(u<=0x1FFFFF)
{
if(outIdx+3>=endIdx)
break;
outU8Array[outIdx++]=0xF0|(u>>18);
outU8Array[outIdx++]=0x80|((u>>12)&63);
outU8Array[outIdx++]=0x80|((u>>6)&63);
outU8Array[outIdx++]=0x80|(u&63);
}
else if(u<=0x3FFFFFF)
{
if(outIdx+4>=endIdx)
break;
outU8Array[outIdx++]=0xF8|(u>>24);
outU8Array[outIdx++]=0x80|((u>>18)&63);
outU8Array[outIdx++]=0x80|((u>>12)&63);
outU8Array[outIdx++]=0x80|((u>>6)&63);
outU8Array[outIdx++]=0x80|(u&63);
}
else{
if(outIdx+5>=endIdx)
break;
outU8Array[outIdx++]=0xFC|(u>>30);
outU8Array[outIdx++]=0x80|((u>>24)&63);
outU8Array[outIdx++]=0x80|((u>>18)&63);
outU8Array[outIdx++]=0x80|((u>>12)&63);
outU8Array[outIdx++]=0x80|((u>>6)&63);
outU8Array[outIdx++]=0x80|(u&63);
}
}
outU8Array[outIdx]=0;
return outIdx-startIdx;
}
Module["stringToUTF8Array"]=stringToUTF8Array;
function stringToUTF8(str,outPtr,maxBytesToWrite)
{
assert(typeof maxBytesToWrite=='number','stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite);
}
Module["stringToUTF8"]=stringToUTF8;
function lengthBytesUTF8(str)
{
var len=0;
for(var i=0;i<str.length;++i)
{
var u=str.charCodeAt(i);
if(u>=0xD800&&u<=0xDFFF)
u=0x10000+((u&0x3FF)<<10)|(str.charCodeAt(++i)&0x3FF);
if(u<=0x7F)
{
++len;
}
else if(u<=0x7FF)
{
len+=2;
}
else if(u<=0xFFFF)
{
len+=3;
}
else if(u<=0x1FFFFF)
{
len+=4;
}
else if(u<=0x3FFFFFF)
{
len+=5;
}
else{
len+=6;
}
}
return len;
}
Module["lengthBytesUTF8"]=lengthBytesUTF8;
var UTF16Decoder=typeof TextDecoder!=='undefined'?new TextDecoder('utf-16le'):undefined;
function UTF16ToString(ptr)
{
assert(ptr%2==0,'Pointer passed to UTF16ToString must be aligned to two bytes!');
var endPtr=ptr;
var idx=endPtr>>1;
while(HEAP16[idx])
++idx;
endPtr=idx<<1;
if(endPtr-ptr>32&&UTF16Decoder)
{
return UTF16Decoder.decode(HEAPU8.subarray(ptr,endPtr));
}
else{
var i=0;
var str='';
while(1)
{
var codeUnit=HEAP16[(((ptr)+(i*2))>>1)];
if(codeUnit==0)
{
return str;
}
++i;
str+=String.fromCharCode(codeUnit);
}
}
}
function stringToUTF16(str,outPtr,maxBytesToWrite)
{
assert(outPtr%2==0,'Pointer passed to stringToUTF16 must be aligned to two bytes!');
assert(typeof maxBytesToWrite=='number','stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
if(maxBytesToWrite===undefined)
{
maxBytesToWrite=0x7FFFFFFF;
}
if(maxBytesToWrite<2)
{
return 0;
}
maxBytesToWrite-=2;
var startPtr=outPtr;
var numCharsToWrite=(maxBytesToWrite<str.length*2)?(maxBytesToWrite/2):str.length;
for(var i=0;i<numCharsToWrite;++i)
{
var codeUnit=str.charCodeAt(i);
HEAP16[((outPtr)>>1)]=codeUnit;
outPtr+=2;
}
HEAP16[((outPtr)>>1)]=0;
return outPtr-startPtr;
}
function lengthBytesUTF16(str)
{
return str.length*2;
}
function UTF32ToString(ptr)
{
assert(ptr%4==0,'Pointer passed to UTF32ToString must be aligned to four bytes!');
var i=0;
var str='';
while(1)
{
var utf32=HEAP32[(((ptr)+(i*4))>>2)];
if(utf32==0)
{
return str;
}
++i;
if(utf32>=0x10000)
{
var ch=utf32-0x10000;
str+=String.fromCharCode(0xD800|(ch>>10),0xDC00|(ch&0x3FF));
}
else{
str+=String.fromCharCode(utf32);
}
}
}
function stringToUTF32(str,outPtr,maxBytesToWrite)
{
assert(outPtr%4==0,'Pointer passed to stringToUTF32 must be aligned to four bytes!');
assert(typeof maxBytesToWrite=='number','stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
if(maxBytesToWrite===undefined)
{
maxBytesToWrite=0x7FFFFFFF;
}
if(maxBytesToWrite<4)
{
return 0;
}
var startPtr=outPtr;
var endPtr=startPtr+maxBytesToWrite-4;
for(var i=0;i<str.length;++i)
{
var codeUnit=str.charCodeAt(i);
if(codeUnit>=0xD800&&codeUnit<=0xDFFF)
{
var trailSurrogate=str.charCodeAt(++i);
codeUnit=0x10000+((codeUnit&0x3FF)<<10)|(trailSurrogate&0x3FF);
}
HEAP32[((outPtr)>>2)]=codeUnit;
outPtr+=4;
if(outPtr+4>endPtr)
break;
}
HEAP32[((outPtr)>>2)]=0;
return outPtr-startPtr;
}
function lengthBytesUTF32(str)
{
var len=0;
for(var i=0;i<str.length;++i)
{
var codeUnit=str.charCodeAt(i);
if(codeUnit>=0xD800&&codeUnit<=0xDFFF)
++i;
len+=4;
}
return len;
}
function demangle(func)
{
var __cxa_demangle_func=Module['___cxa_demangle']||Module['__cxa_demangle'];
if(__cxa_demangle_func)
{
try{
var s=func.substr(1);
var len=lengthBytesUTF8(s)+1;
var buf=_malloc(len);
stringToUTF8(s,buf,len);
var status=_malloc(4);
var ret=__cxa_demangle_func(buf,0,0,status);
if(getValue(status,'i32')===0&&ret)
{
return Pointer_stringify(ret);
}
}
catch(e)
{
}
finally 
{
if(buf)
_free(buf);
if(status)
_free(status);
if(ret)
_free(ret);
}
return func;
}
Runtime.warnOnce('warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling');
return func;
}
function demangleAll(text)
{
var regex=/__Z[\w\d_]+/g;
return text.replace(regex,function(x){
var y=demangle(x);
return x===y?x:(x+' ['+y+']');
});
}
function jsStackTrace()
{
var err=new Error();
if(!err.stack)
{
try{
throw new Error(0);
}
catch(e)
{
err=e;
}
if(!err.stack)
{
return '(no stack trace available)';
}
}
return err.stack.toString();
}
function stackTrace()
{
var js=jsStackTrace();
if(Module['extraStackTrace'])
js+='\n'+Module['extraStackTrace']();
return demangleAll(js);
}
Module["stackTrace"]=stackTrace;
var PAGE_SIZE=16384;
var WASM_PAGE_SIZE=65536;
var ASMJS_PAGE_SIZE=16777216;
var MIN_TOTAL_MEMORY=16777216;
function alignUp(x,multiple)
{
if(x%multiple>0)
{
x+=multiple-(x%multiple);
}
return x;
}
var HEAP,buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;
function updateGlobalBuffer(buf)
{
Module['buffer']=buffer=buf;
}
function updateGlobalBufferViews()
{
Module['HEAP8']=HEAP8=new Int8Array(buffer);
Module['HEAP16']=HEAP16=new Int16Array(buffer);
Module['HEAP32']=HEAP32=new Int32Array(buffer);
Module['HEAPU8']=HEAPU8=new Uint8Array(buffer);
Module['HEAPU16']=HEAPU16=new Uint16Array(buffer);
Module['HEAPU32']=HEAPU32=new Uint32Array(buffer);
Module['HEAPF32']=HEAPF32=new Float32Array(buffer);
Module['HEAPF64']=HEAPF64=new Float64Array(buffer);
}
var STATIC_BASE,STATICTOP,staticSealed;
var STACK_BASE,STACKTOP,STACK_MAX;
var DYNAMIC_BASE,DYNAMICTOP_PTR;
STATIC_BASE=STATICTOP=STACK_BASE=STACKTOP=STACK_MAX=DYNAMIC_BASE=DYNAMICTOP_PTR=0;
staticSealed=false;
function writeStackCookie()
{
assert((STACK_MAX&3)==0);
HEAPU32[(STACK_MAX>>2)-1]=0x02135467;
HEAPU32[(STACK_MAX>>2)-2]=0x89BACDFE;
}
function checkStackCookie()
{
if(HEAPU32[(STACK_MAX>>2)-1]!=0x02135467||HEAPU32[(STACK_MAX>>2)-2]!=0x89BACDFE)
{
abort('Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x'+HEAPU32[(STACK_MAX>>2)-2].toString(16)+' '+HEAPU32[(STACK_MAX>>2)-1].toString(16));
}
if(HEAP32[0]!==0x63736d65)
throw 'Runtime error: The application has corrupted its heap memory area (address zero)!';
}
function abortStackOverflow(allocSize)
{
abort('Stack overflow! Attempted to allocate '+allocSize+' bytes on the stack, but stack has only '+(STACK_MAX-Module['asm'].stackSave()+allocSize)+' bytes available!');
}
function abortOnCannotGrowMemory()
{
abort('Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value '+TOTAL_MEMORY+', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ');
}
function enlargeMemory()
{
abortOnCannotGrowMemory();
}
var TOTAL_STACK=Module['TOTAL_STACK']||5242880;
var TOTAL_MEMORY=Module['TOTAL_MEMORY']||16777216;
if(TOTAL_MEMORY<TOTAL_STACK)
Module.printErr('TOTAL_MEMORY should be larger than TOTAL_STACK, was '+TOTAL_MEMORY+'! (TOTAL_STACK='+TOTAL_STACK+')');
assert(typeof Int32Array!=='undefined'&&typeof Float64Array!=='undefined'&&Int32Array.prototype.subarray!==undefined&&Int32Array.prototype.set!==undefined,'JS engine does not provide full typed array support');
if(Module['buffer'])
{
buffer=Module['buffer'];
assert(buffer.byteLength===TOTAL_MEMORY,'provided buffer should be '+TOTAL_MEMORY+' bytes, but it is '+buffer.byteLength);
}
else{
if(typeof WebAssembly==='object'&&typeof WebAssembly.Memory==='function')
{
assert(TOTAL_MEMORY%WASM_PAGE_SIZE===0);
Module['wasmMemory']=new WebAssembly.Memory({'initial':TOTAL_MEMORY/WASM_PAGE_SIZE,'maximum':TOTAL_MEMORY/WASM_PAGE_SIZE});
buffer=Module['wasmMemory'].buffer;
}
else{
buffer=new ArrayBuffer(TOTAL_MEMORY);
}
assert(buffer.byteLength===TOTAL_MEMORY);
}
updateGlobalBufferViews();
function getTotalMemory()
{
return TOTAL_MEMORY;
}
HEAP32[0]=0x63736d65;
HEAP16[1]=0x6373;
if(HEAPU8[2]!==0x73||HEAPU8[3]!==0x63)
throw 'Runtime error: expected the system to be little-endian!';
Module['HEAP']=HEAP;
Module['buffer']=buffer;
Module['HEAP8']=HEAP8;
Module['HEAP16']=HEAP16;
Module['HEAP32']=HEAP32;
Module['HEAPU8']=HEAPU8;
Module['HEAPU16']=HEAPU16;
Module['HEAPU32']=HEAPU32;
Module['HEAPF32']=HEAPF32;
Module['HEAPF64']=HEAPF64;
function callRuntimeCallbacks(callbacks)
{
while(callbacks.length>0)
{
var callback=callbacks.shift();
if(typeof callback=='function')
{
callback();
continue;
}
var func=callback.func;
if(typeof func==='number')
{
if(callback.arg===undefined)
{
Module['dynCall_v'](func);
}
else{
Module['dynCall_vi'](func,callback.arg);
}
}
else{
func(callback.arg===undefined?null:callback.arg);
}
}
}
var __ATPRERUN__=[];
var __ATINIT__=[];
var __ATMAIN__=[];
var __ATEXIT__=[];
var __ATPOSTRUN__=[];
var runtimeInitialized=false;
var runtimeExited=false;
function preRun()
{
if(Module['preRun'])
{
if(typeof Module['preRun']=='function')
Module['preRun']=[Module['preRun']];
while(Module['preRun'].length)
{
addOnPreRun(Module['preRun'].shift());
}
}
callRuntimeCallbacks(__ATPRERUN__);
}
function ensureInitRuntime()
{
checkStackCookie();
if(runtimeInitialized)
{
return;
}
runtimeInitialized=true;
callRuntimeCallbacks(__ATINIT__);
}
function preMain()
{
checkStackCookie();
callRuntimeCallbacks(__ATMAIN__);
}
function exitRuntime()
{
checkStackCookie();
callRuntimeCallbacks(__ATEXIT__);
runtimeExited=true;
}
function postRun()
{
checkStackCookie();
if(Module['postRun'])
{
if(typeof Module['postRun']=='function')
Module['postRun']=[Module['postRun']];
while(Module['postRun'].length)
{
addOnPostRun(Module['postRun'].shift());
}
}
callRuntimeCallbacks(__ATPOSTRUN__);
}
function addOnPreRun(cb)
{
__ATPRERUN__.unshift(cb);
}
Module["addOnPreRun"]=addOnPreRun;
function addOnInit(cb)
{
__ATINIT__.unshift(cb);
}
Module["addOnInit"]=addOnInit;
function addOnPreMain(cb)
{
__ATMAIN__.unshift(cb);
}
Module["addOnPreMain"]=addOnPreMain;
function addOnExit(cb)
{
__ATEXIT__.unshift(cb);
}
Module["addOnExit"]=addOnExit;
function addOnPostRun(cb)
{
__ATPOSTRUN__.unshift(cb);
}
Module["addOnPostRun"]=addOnPostRun;
function writeStringToMemory(string,buffer,dontAddNull)
{
Runtime.warnOnce('writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!');
var lastChar,end;
if(dontAddNull)
{
end=buffer+lengthBytesUTF8(string);
lastChar=HEAP8[end];
}
stringToUTF8(string,buffer,Infinity);
if(dontAddNull)
HEAP8[end]=lastChar;
}
Module["writeStringToMemory"]=writeStringToMemory;
function writeArrayToMemory(array,buffer,ident)
{
assert(array.length>=0,'writeArrayToMemory array must have a length (should be an array or typed array)');
HEAP8.set(array,buffer);
}
Module["writeArrayToMemory"]=writeArrayToMemory;
function writeAsciiToMemory(str,buffer,dontAddNull)
{
for(var i=0;i<str.length;++i)
{
assert(str.charCodeAt(i)===str.charCodeAt(i)&0xff);
HEAP8[((buffer++)>>0)]=str.charCodeAt(i);
}
if(!dontAddNull)
HEAP8[((buffer)>>0)]=0;
}
Module["writeAsciiToMemory"]=writeAsciiToMemory;
function unSign(value,bits,ignore)
{
if(value>=0)
{
return value;
}
return bits<=32?2*Math.abs(1<<(bits-1))+value:Math.pow(2,bits)+value;
}
function reSign(value,bits,ignore)
{
if(value<=0)
{
return value;
}
var half=bits<=32?Math.abs(1<<(bits-1)):Math.pow(2,bits-1);
if(value>=half&&(bits<=32||value>half))
{
value=-2*half+value;
}
return value;
}
if(!Math['imul']||Math['imul'](0xffffffff,5)!==-5)
Math['imul']=function imul(a,b){
var ah=a>>>16;
var al=a&0xffff;
var bh=b>>>16;
var bl=b&0xffff;
return (al*bl+((ah*bl+al*bh)<<16))|0;
};
Math.imul=Math['imul'];
if(!Math['fround'])
{
var froundBuffer=new Float32Array(1);
Math['fround']=function(x){
froundBuffer[0]=x;
return froundBuffer[0];
};
}
Math.fround=Math['fround'];
if(!Math['clz32'])
Math['clz32']=function(x){
x=x>>>0;
for(var i=0;i<32;i++)
{
if(x&(1<<(31-i)))
{
return i;
}
}
return 32;
};
Math.clz32=Math['clz32'];
if(!Math['trunc'])
Math['trunc']=function(x){
return x<0?Math.ceil(x):Math.floor(x);
};
Math.trunc=Math['trunc'];
var Math_abs=Math.abs;
var Math_cos=Math.cos;
var Math_sin=Math.sin;
var Math_tan=Math.tan;
var Math_acos=Math.acos;
var Math_asin=Math.asin;
var Math_atan=Math.atan;
var Math_atan2=Math.atan2;
var Math_exp=Math.exp;
var Math_log=Math.log;
var Math_sqrt=Math.sqrt;
var Math_ceil=Math.ceil;
var Math_floor=Math.floor;
var Math_pow=Math.pow;
var Math_imul=Math.imul;
var Math_fround=Math.fround;
var Math_round=Math.round;
var Math_min=Math.min;
var Math_clz32=Math.clz32;
var Math_trunc=Math.trunc;
var runDependencies=0;
var runDependencyWatcher=null;
var dependenciesFulfilled=null;
var runDependencyTracking={};
function getUniqueRunDependency(id)
{
var orig=id;
while(1)
{
if(!runDependencyTracking[id])
{
return id;
}
id=orig+Math.random();
}
return id;
}
function addRunDependency(id)
{
runDependencies++;
if(Module['monitorRunDependencies'])
{
Module['monitorRunDependencies'](runDependencies);
}
if(id)
{
assert(!runDependencyTracking[id]);
runDependencyTracking[id]=1;
if(runDependencyWatcher===null&&typeof setInterval!=='undefined')
{
runDependencyWatcher=setInterval(function(){
if(ABORT)
{
clearInterval(runDependencyWatcher);
runDependencyWatcher=null;
return;
}
var shown=false;
for(var dep in runDependencyTracking)
{
if(!shown)
{
shown=true;
Module.printErr('still waiting on run dependencies:');
}
Module.printErr('dependency: '+dep);
}
if(shown)
{
Module.printErr('(end of list)');
}
},10000);
}
}
else{
Module.printErr('warning: run dependency added without ID');
}
}
Module["addRunDependency"]=addRunDependency;
function removeRunDependency(id)
{
runDependencies--;
if(Module['monitorRunDependencies'])
{
Module['monitorRunDependencies'](runDependencies);
}
if(id)
{
assert(runDependencyTracking[id]);
delete runDependencyTracking[id];
}
else{
Module.printErr('warning: run dependency removed without ID');
}
if(runDependencies==0)
{
if(runDependencyWatcher!==null)
{
clearInterval(runDependencyWatcher);
runDependencyWatcher=null;
}
if(dependenciesFulfilled)
{
var callback=dependenciesFulfilled;
dependenciesFulfilled=null;
callback();
}
}
}
Module["removeRunDependency"]=removeRunDependency;
Module["preloadedImages"]={};
Module["preloadedAudios"]={};
var memoryInitializer=null;
var FS={error:function(){
abort('Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1');
},init:function(){
FS.error();
},createDataFile:function(){
FS.error();
},createPreloadedFile:function(){
FS.error();
},createLazyFile:function(){
FS.error();
},open:function(){
FS.error();
},mkdev:function(){
FS.error();
},registerDevice:function(){
FS.error();
},analyzePath:function(){
FS.error();
},loadFilesFromDB:function(){
FS.error();
},ErrnoError:function ErrnoError(){
FS.error();
}};
Module['FS_createDataFile']=FS.createDataFile;
Module['FS_createPreloadedFile']=FS.createPreloadedFile;
function integrateWasmJS()
{
var method=Module['wasmJSMethod']||'native-wasm';
Module['wasmJSMethod']=method;
var wasmTextFile=Module['wasmTextFile']||'md5-sha1.wast';
var wasmBinaryFile=Module['wasmBinaryFile']||'https://exmail.qq.com/qy_mng_logic/wasmHelper?type=hash';
var asmjsCodeFile=Module['asmjsCodeFile']||'md5-sha1.temp.asm.js';
if(typeof Module['locateFile']==='function')
{
wasmTextFile=Module['locateFile'](wasmTextFile);
wasmBinaryFile=Module['locateFile'](wasmBinaryFile);
asmjsCodeFile=Module['locateFile'](asmjsCodeFile);
}
var wasmPageSize=64*1024;
var asm2wasmImports={"f64-rem":function(x,y){
return x%y;
},"f64-to-int":function(x){
return x|0;
},"i32s-div":function(x,y){
return ((x|0)/(y|0))|0;
},"i32u-div":function(x,y){
return ((x>>>0)/(y>>>0))>>>0;
},"i32s-rem":function(x,y){
return ((x|0)%(y|0))|0;
},"i32u-rem":function(x,y){
return ((x>>>0)%(y>>>0))>>>0;
},"debugger":function(){
debugger;
}};
var info={'global':null,'env':null,'asm2wasm':asm2wasmImports,'parent':Module};
var exports=null;
function lookupImport(mod,base)
{
var lookup=info;
if(mod.indexOf('.')<0)
{
lookup=(lookup||{})[mod];
}
else{
var parts=mod.split('.');
lookup=(lookup||{})[parts[0]];
lookup=(lookup||{})[parts[1]];
}
if(base)
{
lookup=(lookup||{})[base];
}
if(lookup===undefined)
{
abort('bad lookupImport to ('+mod+').'+base);
}
return lookup;
}
function mergeMemory(newBuffer)
{
var oldBuffer=Module['buffer'];
if(newBuffer.byteLength<oldBuffer.byteLength)
{
Module['printErr']('the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here');
}
var oldView=new Int8Array(oldBuffer);
var newView=new Int8Array(newBuffer);
if(!memoryInitializer)
{
oldView.set(newView.subarray(Module['STATIC_BASE'],Module['STATIC_BASE']+Module['STATIC_BUMP']),Module['STATIC_BASE']);
}
newView.set(oldView);
updateGlobalBuffer(newBuffer);
updateGlobalBufferViews();
}
var WasmTypes={none:0,i32:1,i64:2,f32:3,f64:4};
function fixImports(imports)
{
if(!0)
{
return imports;
}
var ret={};
for(var i in imports)
{
var fixed=i;
if(fixed[0]=='_')
fixed=fixed.substr(1);
ret[fixed]=imports[i];
}
return ret;
}
function getBinary()
{
try{
if(Module['wasmBinary'])
{
return new Uint8Array(Module['wasmBinary']);
}
if(Module['readBinary'])
{
return Module['readBinary'](wasmBinaryFile);
}
else{
throw "on the web, we need the wasm binary to be preloaded and set on Module['wasmBinary']. emcc.py will do that for you when generating HTML (but not JS)";
}
}
catch(err)
{
abort(err);
}
}
function getBinaryPromise()
{
if(!Module['wasmBinary']&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&typeof fetch==='function')
{
return fetch(wasmBinaryFile,{credentials:'omit'}).then(function(response){
if(!response['ok'])
{
throw "failed to load wasm binary file at '"+wasmBinaryFile+"'";
}
return response['arrayBuffer']();
});
}
return new Promise(function(resolve,reject){
resolve(getBinary());
});
}
function doJustAsm(global,env,providedBuffer)
{
if(typeof Module['asm']!=='function'||Module['asm']===methodHandler)
{
if(!Module['asmPreload'])
{
eval(Module['read'](asmjsCodeFile));
}
else{
Module['asm']=Module['asmPreload'];
}
}
if(typeof Module['asm']!=='function')
{
Module['printErr']('asm evalling did not set the module properly');
return false;
}
return Module['asm'](global,env,providedBuffer);
}
function doNativeWasm(global,env,providedBuffer)
{
if(typeof WebAssembly!=='object')
{
Module['printErr']('no native wasm support detected');
return false;
}
if(!(Module['wasmMemory'] instanceof WebAssembly.Memory))
{
Module['printErr']('no native wasm Memory in use');
return false;
}
env['memory']=Module['wasmMemory'];
info['global']={'NaN':NaN,'Infinity':Infinity};
info['global.Math']=global.Math;
info['env']=env;
function receiveInstance(instance)
{
exports=instance.exports;
if(exports.memory)
mergeMemory(exports.memory);
Module['asm']=exports;
Module["usingWasm"]=true;
removeRunDependency('wasm-instantiate');
}
addRunDependency('wasm-instantiate');
if(Module['instantiateWasm'])
{
try{
return Module['instantiateWasm'](info,receiveInstance);
}
catch(e)
{
Module['printErr']('Module.instantiateWasm callback failed with error: '+e);
return false;
}
}
var trueModule=Module;
function receiveInstantiatedSource(output)
{
assert(Module===trueModule,'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
trueModule=null;
receiveInstance(output['instance']);
}
function instantiateArrayBuffer(receiver)
{
getBinaryPromise().then(function(binary){
return WebAssembly.instantiate(binary,info);
}).then(receiver);
}
if(!Module['wasmBinary']&&typeof WebAssembly.instantiateStreaming==='function'&&wasmBinaryFile.indexOf('data:')!==0)
{
WebAssembly.instantiateStreaming(fetch(wasmBinaryFile,{credentials:'omit'}),info).then(receiveInstantiatedSource);
}
else{
instantiateArrayBuffer(receiveInstantiatedSource);
}
return {};
}
function doWasmPolyfill(global,env,providedBuffer,method)
{
if(typeof WasmJS!=='function')
{
Module['printErr']('WasmJS not detected - polyfill not bundled?');
return false;
}
var wasmJS=WasmJS({});
wasmJS['outside']=Module;
wasmJS['info']=info;
wasmJS['lookupImport']=lookupImport;
assert(providedBuffer===Module['buffer']);
info.global=global;
info.env=env;
assert(providedBuffer===Module['buffer']);
env['memory']=providedBuffer;
assert(env['memory'] instanceof ArrayBuffer);
wasmJS['providedTotalMemory']=Module['buffer'].byteLength;
var code;
if(method==='interpret-binary')
{
code=getBinary();
}
else{
code=Module['read'](method=='interpret-asm2wasm'?asmjsCodeFile:wasmTextFile);
}
var temp;
if(method=='interpret-asm2wasm')
{
temp=wasmJS['_malloc'](code.length+1);
wasmJS['writeAsciiToMemory'](code,temp);
wasmJS['_load_asm2wasm'](temp);
}
else if(method==='interpret-s-expr')
{
temp=wasmJS['_malloc'](code.length+1);
wasmJS['writeAsciiToMemory'](code,temp);
wasmJS['_load_s_expr2wasm'](temp);
}
else if(method==='interpret-binary')
{
temp=wasmJS['_malloc'](code.length);
wasmJS['HEAPU8'].set(code,temp);
wasmJS['_load_binary2wasm'](temp,code.length);
}
else{
throw 'what? '+method;
}
wasmJS['_free'](temp);
wasmJS['_instantiate'](temp);
if(Module['newBuffer'])
{
mergeMemory(Module['newBuffer']);
Module['newBuffer']=null;
}
exports=wasmJS['asmExports'];
return exports;
}
Module['asmPreload']=Module['asm'];
var asmjsReallocBuffer=Module['reallocBuffer'];
var wasmReallocBuffer=function(size){
var PAGE_MULTIPLE=Module["usingWasm"]?WASM_PAGE_SIZE:ASMJS_PAGE_SIZE;
size=alignUp(size,PAGE_MULTIPLE);
var old=Module['buffer'];
var oldSize=old.byteLength;
if(Module["usingWasm"])
{
try{
var result=Module['wasmMemory'].grow((size-oldSize)/wasmPageSize);
if(result!==(-1|0))
{
return Module['buffer']=Module['wasmMemory'].buffer;
}
else{
return null;
}
}
catch(e)
{
console.error('Module.reallocBuffer: Attempted to grow from '+oldSize+' bytes to '+size+' bytes, but got error: '+e);
return null;
}
}
else{
exports['__growWasmMemory']((size-oldSize)/wasmPageSize);
return Module['buffer']!==old?Module['buffer']:null;
}
};
Module['reallocBuffer']=function(size){
if(finalMethod==='asmjs')
{
return asmjsReallocBuffer(size);
}
else{
return wasmReallocBuffer(size);
}
};
var finalMethod='';
Module['asm']=function(global,env,providedBuffer){
global=fixImports(global);
env=fixImports(env);
if(!env['table'])
{
var TABLE_SIZE=Module['wasmTableSize'];
if(TABLE_SIZE===undefined)
TABLE_SIZE=1024;
var MAX_TABLE_SIZE=Module['wasmMaxTableSize'];
if(typeof WebAssembly==='object'&&typeof WebAssembly.Table==='function')
{
if(MAX_TABLE_SIZE!==undefined)
{
env['table']=new WebAssembly.Table({'initial':TABLE_SIZE,'maximum':MAX_TABLE_SIZE,'element':'anyfunc'});
}
else{
env['table']=new WebAssembly.Table({'initial':TABLE_SIZE,element:'anyfunc'});
}
}
else{
env['table']=new Array(TABLE_SIZE);
}
Module['wasmTable']=env['table'];
}
if(!env['memoryBase'])
{
env['memoryBase']=Module['STATIC_BASE'];
}
if(!env['tableBase'])
{
env['tableBase']=0;
}
var exports;
exports=doNativeWasm(global,env,providedBuffer);
if(!exports)
abort('no binaryen method succeeded. consider enabling more options, like interpreting, if you want that: https://github.com/kripken/emscripten/wiki/WebAssembly#binaryen-methods');
return exports;
};
var methodHandler=Module['asm'];
}
integrateWasmJS();
var ASM_CONSTS=[];
STATIC_BASE=Runtime.GLOBAL_BASE;
STATICTOP=STATIC_BASE+3344;
__ATINIT__.push();
memoryInitializer=null;
var STATIC_BUMP=3344;
Module["STATIC_BASE"]=STATIC_BASE;
Module["STATIC_BUMP"]=STATIC_BUMP;
var tempDoublePtr=STATICTOP;
STATICTOP+=16;
assert(tempDoublePtr%8==0);
function copyTempFloat(ptr)
{
HEAP8[tempDoublePtr]=HEAP8[ptr];
HEAP8[tempDoublePtr+1]=HEAP8[ptr+1];
HEAP8[tempDoublePtr+2]=HEAP8[ptr+2];
HEAP8[tempDoublePtr+3]=HEAP8[ptr+3];
}
function copyTempDouble(ptr)
{
HEAP8[tempDoublePtr]=HEAP8[ptr];
HEAP8[tempDoublePtr+1]=HEAP8[ptr+1];
HEAP8[tempDoublePtr+2]=HEAP8[ptr+2];
HEAP8[tempDoublePtr+3]=HEAP8[ptr+3];
HEAP8[tempDoublePtr+4]=HEAP8[ptr+4];
HEAP8[tempDoublePtr+5]=HEAP8[ptr+5];
HEAP8[tempDoublePtr+6]=HEAP8[ptr+6];
HEAP8[tempDoublePtr+7]=HEAP8[ptr+7];
}
function ___setErrNo(value)
{
if(Module['___errno_location'])
HEAP32[((Module['___errno_location']())>>2)]=value;
else Module.printErr('failed to set errno from JS');
return value;
}
function ___lock()
{
}
function _emscripten_memcpy_big(dest,src,num)
{
HEAPU8.set(HEAPU8.subarray(src,src+num),dest);
return dest;
}
var SYSCALLS={varargs:0,get:function(varargs){
SYSCALLS.varargs+=4;
var ret=HEAP32[(((SYSCALLS.varargs)-(4))>>2)];
return ret;
},getStr:function(){
var ret=Pointer_stringify(SYSCALLS.get());
return ret;
},get64:function(){
var low=SYSCALLS.get(),high=SYSCALLS.get();
if(low>=0)
assert(high===0);
else assert(high===-1);
return low;
},getZero:function(){
assert(SYSCALLS.get()===0);
}};
function ___syscall140(which,varargs)
{
SYSCALLS.varargs=varargs;
try{
var stream=SYSCALLS.getStreamFromFD(),offset_high=SYSCALLS.get(),offset_low=SYSCALLS.get(),result=SYSCALLS.get(),whence=SYSCALLS.get();
var offset=offset_low;
FS.llseek(stream,offset,whence);
HEAP32[((result)>>2)]=stream.position;
if(stream.getdents&&offset===0&&whence===0)
stream.getdents=null;
return 0;
}
catch(e)
{
if(typeof FS==='undefined'||!(e instanceof FS.ErrnoError))
abort(e);
return -e.errno;
}
}
function ___syscall146(which,varargs)
{
SYSCALLS.varargs=varargs;
try{
var stream=SYSCALLS.get(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();
var ret=0;
if(!___syscall146.buffer)
{
___syscall146.buffers=[null,[],[]];
___syscall146.printChar=function(stream,curr){
var buffer=___syscall146.buffers[stream];
assert(buffer);
if(curr===0||curr===10)
{
(stream===1?Module['print']:Module['printErr'])(UTF8ArrayToString(buffer,0));
buffer.length=0;
}
else{
buffer.push(curr);
}
};
}
for(var i=0;i<iovcnt;i++)
{
var ptr=HEAP32[(((iov)+(i*8))>>2)];
var len=HEAP32[(((iov)+(i*8+4))>>2)];
for(var j=0;j<len;j++)
{
___syscall146.printChar(stream,HEAPU8[ptr+j]);
}
ret+=len;
}
return ret;
}
catch(e)
{
if(typeof FS==='undefined'||!(e instanceof FS.ErrnoError))
abort(e);
return -e.errno;
}
}
function ___syscall54(which,varargs)
{
SYSCALLS.varargs=varargs;
try{
return 0;
}
catch(e)
{
if(typeof FS==='undefined'||!(e instanceof FS.ErrnoError))
abort(e);
return -e.errno;
}
}
function ___unlock()
{
}
function ___syscall6(which,varargs)
{
SYSCALLS.varargs=varargs;
try{
var stream=SYSCALLS.getStreamFromFD();
FS.close(stream);
return 0;
}
catch(e)
{
if(typeof FS==='undefined'||!(e instanceof FS.ErrnoError))
abort(e);
return -e.errno;
}
}
__ATEXIT__.push(function(){
var fflush=Module["_fflush"];
if(fflush)
fflush(0);
var printChar=___syscall146.printChar;
if(!printChar)
{
return;
}
var buffers=___syscall146.buffers;
if(buffers[1].length)
printChar(1,10);
if(buffers[2].length)
printChar(2,10);
});
;DYNAMICTOP_PTR=allocate(1,"i32",ALLOC_STATIC);
STACK_BASE=STACKTOP=Runtime.alignMemory(STATICTOP);
STACK_MAX=STACK_BASE+TOTAL_STACK;
DYNAMIC_BASE=Runtime.alignMemory(STACK_MAX);
HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;
staticSealed=true;
assert(DYNAMIC_BASE<TOTAL_MEMORY,"TOTAL_MEMORY not big enough for stack");
var ASSERTIONS=true;
function intArrayFromString(stringy,dontAddNull,length)
{
var len=length>0?length:lengthBytesUTF8(stringy)+1;
var u8array=new Array(len);
var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);
if(dontAddNull)
u8array.length=numBytesWritten;
return u8array;
}
var intArrayToString=ASSERTIONS?function(array){
var ret=[];
for(var i=0;i<array.length;i++)
{
var chr=array[i];
if(chr>0xFF)
{
assert(false,'Character code '+chr+' ('+String.fromCharCode(chr)+')  at offset '+i+' not in 0x00-0xFF.');
chr&=0xFF;
}
ret.push(String.fromCharCode(chr));
}
return ret.join('');
}:function(array){
var ret=[];
for(var i=0;i<array.length;i++)
{
var chr=array[i];
if(chr>0xFF)
{
chr&=0xFF;
}
ret.push(String.fromCharCode(chr));
}
return ret.join('');
};
Module["intArrayFromString"]=intArrayFromString;
Module["intArrayToString"]=intArrayToString;
function nullFunc_ii(x)
{
Module["printErr"]("Invalid function pointer called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
Module["printErr"]("Build with ASSERTIONS=2 for more info.");
abort(x);
}
function nullFunc_iiii(x)
{
Module["printErr"]("Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");
Module["printErr"]("Build with ASSERTIONS=2 for more info.");
abort(x);
}
Module['wasmTableSize']=10;
Module['wasmMaxTableSize']=10;
function invoke_ii(index,a1)
{
try{
return Module["dynCall_ii"](index,a1);
}
catch(e)
{
if(typeof e!=='number'&&e!=='longjmp')
throw e;
Module["setThrew"](1,0);
}
}
function invoke_iiii(index,a1,a2,a3)
{
try{
return Module["dynCall_iiii"](index,a1,a2,a3);
}
catch(e)
{
if(typeof e!=='number'&&e!=='longjmp')
throw e;
Module["setThrew"](1,0);
}
}
Module.asmGlobalArg={"Math":Math,"Int8Array":Int8Array,"Int16Array":Int16Array,"Int32Array":Int32Array,"Uint8Array":Uint8Array,"Uint16Array":Uint16Array,"Uint32Array":Uint32Array,"Float32Array":Float32Array,"Float64Array":Float64Array,"NaN":NaN,"Infinity":Infinity};
Module.asmLibraryArg={"abort":abort,"assert":assert,"enlargeMemory":enlargeMemory,"getTotalMemory":getTotalMemory,"abortOnCannotGrowMemory":abortOnCannotGrowMemory,"abortStackOverflow":abortStackOverflow,"nullFunc_ii":nullFunc_ii,"nullFunc_iiii":nullFunc_iiii,"invoke_ii":invoke_ii,"invoke_iiii":invoke_iiii,"___lock":___lock,"___syscall6":___syscall6,"___setErrNo":___setErrNo,"___syscall140":___syscall140,"_emscripten_memcpy_big":_emscripten_memcpy_big,"___syscall54":___syscall54,"___unlock":___unlock,"___syscall146":___syscall146,"DYNAMICTOP_PTR":DYNAMICTOP_PTR,"tempDoublePtr":tempDoublePtr,"ABORT":ABORT,"STACKTOP":STACKTOP,"STACK_MAX":STACK_MAX};
var asm=Module["asm"](Module.asmGlobalArg,Module.asmLibraryArg,buffer);
var real__llvm_bswap_i32=asm["_llvm_bswap_i32"];
asm["_llvm_bswap_i32"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__llvm_bswap_i32.apply(null,arguments);
};
var real__sha1_init=asm["_sha1_init"];
asm["_sha1_init"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__sha1_init.apply(null,arguments);
};
var real__md5_hex=asm["_md5_hex"];
asm["_md5_hex"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__md5_hex.apply(null,arguments);
};
var real_setThrew=asm["setThrew"];
asm["setThrew"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real_setThrew.apply(null,arguments);
};
var real__md5_init=asm["_md5_init"];
asm["_md5_init"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__md5_init.apply(null,arguments);
};
var real__md5_update=asm["_md5_update"];
asm["_md5_update"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__md5_update.apply(null,arguments);
};
var real__md5_final=asm["_md5_final"];
asm["_md5_final"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__md5_final.apply(null,arguments);
};
var real__sbrk=asm["_sbrk"];
asm["_sbrk"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__sbrk.apply(null,arguments);
};
var real____errno_location=asm["___errno_location"];
asm["___errno_location"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real____errno_location.apply(null,arguments);
};
var real_stackAlloc=asm["stackAlloc"];
asm["stackAlloc"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real_stackAlloc.apply(null,arguments);
};
var real_getTempRet0=asm["getTempRet0"];
asm["getTempRet0"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real_getTempRet0.apply(null,arguments);
};
var real_setTempRet0=asm["setTempRet0"];
asm["setTempRet0"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real_setTempRet0.apply(null,arguments);
};
var real__emscripten_get_global_libc=asm["_emscripten_get_global_libc"];
asm["_emscripten_get_global_libc"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__emscripten_get_global_libc.apply(null,arguments);
};
var real__free=asm["_free"];
asm["_free"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__free.apply(null,arguments);
};
var real__fflush=asm["_fflush"];
asm["_fflush"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__fflush.apply(null,arguments);
};
var real_stackSave=asm["stackSave"];
asm["stackSave"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real_stackSave.apply(null,arguments);
};
var real__sha1_final=asm["_sha1_final"];
asm["_sha1_final"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__sha1_final.apply(null,arguments);
};
var real__sha1_update=asm["_sha1_update"];
asm["_sha1_update"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__sha1_update.apply(null,arguments);
};
var real_establishStackSpace=asm["establishStackSpace"];
asm["establishStackSpace"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real_establishStackSpace.apply(null,arguments);
};
var real_stackRestore=asm["stackRestore"];
asm["stackRestore"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real_stackRestore.apply(null,arguments);
};
var real__malloc=asm["_malloc"];
asm["_malloc"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__malloc.apply(null,arguments);
};
Module["asm"]=asm;
var _llvm_bswap_i32=Module["_llvm_bswap_i32"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["_llvm_bswap_i32"].apply(null,arguments);
};
var _sha1_init=Module["_sha1_init"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["_sha1_init"].apply(null,arguments);
};
var _md5_hex=Module["_md5_hex"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["_md5_hex"].apply(null,arguments);
};
var setThrew=Module["setThrew"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["setThrew"].apply(null,arguments);
};
var _md5_init=Module["_md5_init"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["_md5_init"].apply(null,arguments);
};
var _md5_update=Module["_md5_update"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["_md5_update"].apply(null,arguments);
};
var _md5_final=Module["_md5_final"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["_md5_final"].apply(null,arguments);
};
var _memset=Module["_memset"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["_memset"].apply(null,arguments);
};
var _sbrk=Module["_sbrk"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["_sbrk"].apply(null,arguments);
};
var _memcpy=Module["_memcpy"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["_memcpy"].apply(null,arguments);
};
var ___errno_location=Module["___errno_location"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["___errno_location"].apply(null,arguments);
};
var stackAlloc=Module["stackAlloc"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["stackAlloc"].apply(null,arguments);
};
var getTempRet0=Module["getTempRet0"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["getTempRet0"].apply(null,arguments);
};
var setTempRet0=Module["setTempRet0"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["setTempRet0"].apply(null,arguments);
};
var _emscripten_get_global_libc=Module["_emscripten_get_global_libc"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["_emscripten_get_global_libc"].apply(null,arguments);
};
var _free=Module["_free"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["_free"].apply(null,arguments);
};
var _fflush=Module["_fflush"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["_fflush"].apply(null,arguments);
};
var stackSave=Module["stackSave"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["stackSave"].apply(null,arguments);
};
var _sha1_final=Module["_sha1_final"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["_sha1_final"].apply(null,arguments);
};
var _sha1_update=Module["_sha1_update"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["_sha1_update"].apply(null,arguments);
};
var runPostSets=Module["runPostSets"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["runPostSets"].apply(null,arguments);
};
var establishStackSpace=Module["establishStackSpace"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["establishStackSpace"].apply(null,arguments);
};
var stackRestore=Module["stackRestore"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["stackRestore"].apply(null,arguments);
};
var _malloc=Module["_malloc"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["_malloc"].apply(null,arguments);
};
var dynCall_ii=Module["dynCall_ii"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["dynCall_ii"].apply(null,arguments);
};
var dynCall_iiii=Module["dynCall_iiii"]=function(){
assert(runtimeInitialized,'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited,'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return Module["asm"]["dynCall_iiii"].apply(null,arguments);
};
;Runtime.stackAlloc=Module['stackAlloc'];
Runtime.stackSave=Module['stackSave'];
Runtime.stackRestore=Module['stackRestore'];
Runtime.establishStackSpace=Module['establishStackSpace'];
Runtime.setTempRet0=Module['setTempRet0'];
Runtime.getTempRet0=Module['getTempRet0'];
Module['asm']=asm;
if(memoryInitializer)
{
if(typeof Module['locateFile']==='function')
{
memoryInitializer=Module['locateFile'](memoryInitializer);
}
else if(Module['memoryInitializerPrefixURL'])
{
memoryInitializer=Module['memoryInitializerPrefixURL']+memoryInitializer;
}
if(ENVIRONMENT_IS_NODE||ENVIRONMENT_IS_SHELL)
{
var data=Module['readBinary'](memoryInitializer);
HEAPU8.set(data,Runtime.GLOBAL_BASE);
}
else{
addRunDependency('memory initializer');
var applyMemoryInitializer=function(data){
if(data.byteLength)
data=new Uint8Array(data);
for(var i=0;i<data.length;i++)
{
assert(HEAPU8[Runtime.GLOBAL_BASE+i]===0,"area for memory initializer should not have been touched before it's loaded");
}
HEAPU8.set(data,Runtime.GLOBAL_BASE);
if(Module['memoryInitializerRequest'])
delete Module['memoryInitializerRequest'].response;
removeRunDependency('memory initializer');
};
function doBrowserLoad()
{
Module['readAsync'](memoryInitializer,applyMemoryInitializer,function(){
throw 'could not load memory initializer '+memoryInitializer;
});
}
if(Module['memoryInitializerRequest'])
{
function useRequest()
{
var request=Module['memoryInitializerRequest'];
var response=request.response;
if(request.status!==200&&request.status!==0)
{
console.warn('a problem seems to have happened with Module.memoryInitializerRequest, status: '+request.status+', retrying '+memoryInitializer);
doBrowserLoad();
return;
}
applyMemoryInitializer(response);
}
if(Module['memoryInitializerRequest'].response)
{
setTimeout(useRequest,0);
}
else{
Module['memoryInitializerRequest'].addEventListener('load',useRequest);
}
}
else{
doBrowserLoad();
}
}
}
function ExitStatus(status)
{
this.name="ExitStatus";
this.message="Program terminated with exit("+status+")";
this.status=status;
}
;ExitStatus.prototype=new Error();
ExitStatus.prototype.constructor=ExitStatus;
var initialStackTop;
var preloadStartTime=null;
var calledMain=false;
dependenciesFulfilled=function runCaller(){
if(!Module['calledRun'])
run();
if(!Module['calledRun'])
dependenciesFulfilled=runCaller;
};
Module['callMain']=Module.callMain=function callMain(args){
assert(runDependencies==0,'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
assert(__ATPRERUN__.length==0,'cannot call main when preRun functions remain to be called');
args=args||[];
ensureInitRuntime();
var argc=args.length+1;
function pad()
{
for(var i=0;i<4-1;i++)
{
argv.push(0);
}
}
var argv=[allocate(intArrayFromString(Module['thisProgram']),'i8',ALLOC_NORMAL)];
pad();
for(var i=0;i<argc-1;i=i+1)
{
argv.push(allocate(intArrayFromString(args[i]),'i8',ALLOC_NORMAL));
pad();
}
argv.push(0);
argv=allocate(argv,'i32',ALLOC_NORMAL);
try{
var ret=Module['_main'](argc,argv,0);
exit(ret,true);
}
catch(e)
{
if(e instanceof ExitStatus)
{
return;
}
else if(e=='SimulateInfiniteLoop')
{
Module['noExitRuntime']=true;
return;
}
else{
var toLog=e;
if(e&&typeof e==='object'&&e.stack)
{
toLog=[e,e.stack];
}
Module.printErr('exception thrown: '+toLog);
Module['quit'](1,e);
}
}
finally 
{
calledMain=true;
}
};
function run(args)
{
args=args||Module['arguments'];
if(preloadStartTime===null)
preloadStartTime=Date.now();
if(runDependencies>0)
{
return;
}
writeStackCookie();
preRun();
if(runDependencies>0)
{
return;
}
if(Module['calledRun'])
{
return;
}
function doRun()
{
if(Module['calledRun'])
{
return;
}
Module['calledRun']=true;
if(ABORT)
{
return;
}
ensureInitRuntime();
preMain();
if(ENVIRONMENT_IS_WEB&&preloadStartTime!==null)
{
Module.printErr('pre-main prep time: '+(Date.now()-preloadStartTime)+' ms');
}
if(Module['onRuntimeInitialized'])
Module['onRuntimeInitialized']();
if(Module['_main']&&shouldRunNow)
Module['callMain'](args);
postRun();
}
if(Module['setStatus'])
{
Module['setStatus']('Running...');
setTimeout(function(){
setTimeout(function(){
Module['setStatus']('');
},1);
doRun();
},1);
}
else{
doRun();
}
checkStackCookie();
}
Module['run']=Module.run=run;
function exit(status,implicit)
{
if(implicit&&Module['noExitRuntime'])
{
Module.printErr('exit('+status+') implicitly called by end of main(), but noExitRuntime, so not exiting the runtime (you can use emscripten_force_exit, if you want to force a true shutdown)');
return;
}
if(Module['noExitRuntime'])
{
Module.printErr('exit('+status+') called, but noExitRuntime, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)');
}
else{
ABORT=true;
EXITSTATUS=status;
STACKTOP=initialStackTop;
exitRuntime();
if(Module['onExit'])
Module['onExit'](status);
}
if(ENVIRONMENT_IS_NODE)
{
process['exit'](status);
}
Module['quit'](status,new ExitStatus(status));
}
Module['exit']=Module.exit=exit;
var abortDecorators=[];
function abort(what)
{
if(Module['onAbort'])
{
Module['onAbort'](what);
}
if(what!==undefined)
{
Module.print(what);
Module.printErr(what);
what=JSON.stringify(what);
}
else{
what='';
}
ABORT=true;
EXITSTATUS=1;
var extra='';
var output='abort('+what+') at '+stackTrace()+extra;
if(abortDecorators)
{
abortDecorators.forEach(function(decorator){
output=decorator(output,what);
});
}
throw output;
}
Module['abort']=Module.abort=abort;
if(Module['preInit'])
{
if(typeof Module['preInit']=='function')
Module['preInit']=[Module['preInit']];
while(Module['preInit'].length>0)
{
Module['preInit'].pop()();
}
}
var shouldRunNow=true;
if(Module['noInitialRun'])
{
shouldRunNow=false;
}
run();
setTimeout(function(){
self.Module=Module;
self.md5_init=self.Module.cwrap('md5_init');
self.md5_update=self.Module.cwrap('md5_update',null,['array','number']);
self.md5_final=self.Module.cwrap('md5_final','string');
self.sha1_init=self.Module.cwrap('sha1_init');
self.sha1_update=self.Module.cwrap('sha1_update',null,['array','number']);
self.sha1_final=self.Module.cwrap('sha1_final','string');
var TOTAL_MEMORY=16777216;
function MD5()
{
this.init();
}
MD5.prototype.init=function(){
self.md5_init();
this.md5Cache&&delete this.md5Cache;
this.state=new Int8Array(TOTAL_MEMORY);
};
MD5.prototype.update=function(chunk){
var ia8=new Int8Array(chunk);
self.md5_update(ia8,ia8.length);
return this;
};
MD5.prototype.get=function(){
var _final=self.md5_final();
return _final;
};
MD5.prototype.setState=function(state){
this.state=state;
};
MD5.prototype.getState=function(){
return 1;
};
MD5.prototype.setCache=function(md5){
this.md5Cache=md5;
};
MD5.prototype.getCache=function(){
return this.md5Cache;
};
function SHA1()
{
this.init();
}
SHA1.prototype.init=function(){
self.sha1_init();
this.sha1Cache&&delete this.sha1Cache;
this.state=new Int8Array(TOTAL_MEMORY);
};
SHA1.prototype.update=function(chunk){
var ia8=new Int8Array(chunk);
self.sha1_update(ia8,ia8.length);
return this;
};
SHA1.prototype.get=function(){
var _final=self.sha1_final();
return _final;
};
SHA1.prototype.setState=function(state){
this.state=state;
};
SHA1.prototype.getState=function(){
return 1;
};
SHA1.prototype.setCache=function(sha1){
this.sha1Cache=sha1;
};
SHA1.prototype.getCache=function(){
return this.sha1Cache;
};
self.MD5=self.MD5||new MD5();
self.SHA1=self.SHA1||new SHA1();
var actions={reset:function(){
self.MD5.init();
self.SHA1.init();
},chunkMD5:function(chunk){
self.MD5.init();
self.MD5.update(chunk);
return self.MD5.get();
},appendMD5:function(data){
return self.MD5.update(data.chunk).getState();
},getMD5:function(state){
var md5=self.MD5.get();
self.MD5.setCache(md5);
return md5;
},chunkSHA1:function(chunk){
self.SHA1.init();
self.SHA1.update(chunk);
return self.SHA1.get();
},appendSHA1:function(data){
return self.SHA1.update(data.chunk).getState();
},getSHA1:function(state){
var sha1=self.SHA1.get();
self.SHA1.setCache(sha1);
return sha1;
}};
var reader=new FileReader();
function read(block,callback,errCallback)
{
reader.addEventListener('load',handleResponse);
reader.addEventListener('abort',handleAbort);
reader.addEventListener('error',handleError);
reader.readAsArrayBuffer(block);
function handleResponse(event)
{
done();
callback(event.target.result);
}
function handleAbort(event)
{
done();
errCallback(event.target.error);
}
function handleError(event)
{
done();
errCallback(event.target.error);
}
function done()
{
delete block;
reader.removeEventListener('load',handleResponse);
reader.removeEventListener('abort',handleAbort);
reader.removeEventListener('error',handleError);
}
}
self.addEventListener('message',function(event){
var message=event.data;
function postResonse()
{
var data=actions[message.type](message.data);
delete event;
var ab=data&&(data.state||data.heap);
self.postMessage({type:'done',data:data},ab&&[ab]);
}
if(message.type=="appendSHA1"||message.type=="appendMD5")
{
read(message.data.chunk||message.data,function(bufferData){
if(message.data.chunk)
{
message.data.chunk=bufferData;
}
else{
}
postResonse();
},function(error){
self.postMessage({type:'retry',data:error.message});
});
}
else{
postResonse();
}
});
function dataURLtoBlob(dataurl)
{
var arr=dataurl.split(','),mime=arr[0].match(/:(.*?);/)[1],bstr=atob(arr[1]),n=bstr.length,u8arr=new Uint8Array(n);
while(n--)
{
u8arr[n]=bstr.charCodeAt(n);
}
return new Blob([u8arr],{type:mime});
}
self.postMessage({type:'ready'});
},500);
}
var sHashWorkerUrl=location.protocol+"//"+location.hostname+"/zh_CN/htmledition/js_biz/com/kits/qmfileupload/js/h5_chip/dist/hash_worker.js";
function _fGetLib(_aoSuper)
{
var _oHtml5PopupCom=_oComs.Html5PopupMail.prototype;
return A.extend(_oQmFileUpload.getChipLib(_aoSuper),_oQmFileUpload.getH5SafeLib(_aoSuper),{nConcurrent:1,nReaderNum:2,nHashWorkNum:2,nMaxRetryNum:100,nMaxSingleRetryNum:3,nSignFileBlockSize:512*1024*8,nUploadFileBlockSize:512*1024,nCacheThreshold:3,nMd5HashWorkNum:1,nSha1HashWorkNum:1,init_:function(){
var self=this;
_aoSuper.init_.apply(this,arguments);
if(typeof arguments[0]=='function')
{
_oCfg=arguments[0]();
}
if(!_oReaderQueue)
{
_oReaderQueue=new ReaderQueue();
_oWorkerQueue=new WorkerQueue();
_oReaderQueue.PRIORITY=_oWorkerQueue.PRIORITY={send:0,send_read:0,block_hash:0,file_sha1:1,file_md5:2,pre_read_file_hash:3,pre_block_hash:3};
for(var i=this.nReaderNum;i--;)
{
_oReaderQueue.fork();
}
var debugConlogStr="";
if(window.goJsConlog)
{
debugConlogStr=["var noof=function(){},","$_home_qspace_dev_tools_codeSyncFiles_webmail_QQMail_tmp_js_ascii__qmtool_Log= noof,","goJsConlog;goJsConlog={addJslevel:noof,subJslevel:noof};\n"].join("");
}
if(A.isBrowser('edge')||A.isBrowser('ie'))
{
_sWorkerUrl=sHashWorkerUrl;
}
else{
_sWorkerUrl=window.URL.createObjectURL(new Blob([workerFunc.toString()+'\n'+debugConlogStr+workerFunc.name+'();']));
}
for(var i=this.nMd5HashWorkNum;i--;)
{
_oWorkerQueue.fork(_sWorkerUrl,{ident:'md5'},function(){
self.onResourceError();
});
}
for(var i=this.nSha1HashWorkNum;i--;)
{
_oWorkerQueue.fork(_sWorkerUrl,{ident:'sha1'},function(){
self.onResourceError();
});
}
if(!A.isBrowser('edge')&&!A.isBrowser('ie'))
{
window.URL.revokeObjectURL(_sWorkerUrl);
}
}
},detect:function(){
var _oTop;
if(typeof getTop=='function')
{
_oTop=getTop();
}
else{
_oTop={goExpers:{h5cJsUpload:true}};
}
var _abRs=(_oTop.goExpers&&_oTop.goExpers.wasmJsUpload)&&_oTop.ftnApp!=='entdisk'&&A.isBrowser("chrome")&&_h5cdetect()&&typeof WebAssembly=='object'&&[WebAssembly.compile,WebAssembly.instantiate,WebAssembly.Memory].every(function(_asKey){
return typeof _asKey=='function';
})&&typeof Array.prototype.every=='function'&&_oTop.goExpers&&_oTop.goExpers.h5cJsUpload&&_oHtml5PopupCom.detect.apply(this,arguments)&&'Promise|FileReader|DataView|ArrayBuffer|Uint8Array|URL|Blob'.split('|').every(function(_asKey){
return _asKey in window;
});
if(_abRs)
{
try{
var oDetectWorker;
if(A.isBrowser('edge')||A.isBrowser('ie'))
{
oDetectWorker=new Worker(sHashWorkerUrl);
}
else{
var _sUrl=window.URL.createObjectURL(new Blob(['']));
oDetectWorker=new Worker(_sUrl);
window.URL.revokeObjectURL(_sUrl);
}
oDetectWorker&&oDetectWorker.terminate();
return true;
}
catch(_oErr)
{
console.log(_oErr);
}
}
return false;
},uploadToFtn:function(_aoFile){
return this.uploadInChip(_aoFile.set('bFtnFile',true));
},upload:function(_aoFile){
if(this.isUptoFtnForNormal())
{
return this.uploadInChip(_aoFile.set('bIsUptoFtnForNormal',true));
}
else{
return _aoSuper.upload.apply(this,arguments);
}
},doChipFileSign_:function(_aoFile){
var _oSelf=this;
_oSelf.safeStartUpdate_(_aoFile);
var _fCancel=_aoFile.fCancel;
_aoFile.fCancel=function(){
_aoFile._oCurFileBlock&&_aoFile._oCurFileBlock.cancel();
_fCancel&&_fCancel.call(_aoFile);
_oSelf.fileCanceled=true;
};
_oSelf._realChipFileSign2(_aoFile);
},_genFileBlock:function(_aoFile,_anStart){
var _oBlock=new FileBlock(_oReaderQueue,_oWorkerQueue,_aoFile.oH5File.slice(_anStart,_anStart+this.nSignFileBlockSize));
_oBlock.__nOffset=_anStart;
return _oBlock;
},_realChipFileSign2:function(_aoFile){
var _oSelf=this;
var _nSize=_aoFile.get('nSize');
var _nTry=_aoFile.get('nTry');
var _sMD5=_aoFile.get('sMD5');
var _sSHA=_aoFile.get('sSHA');
var _oFileBlockList=[];
var _nHashTimeoutNum=0;
var _nHashTotalNum=0;
var _nFileBlockLength=Math.ceil(_nSize/_oSelf.nSignFileBlockSize),_nChipBlankLength=_nFileBlockLength>2?2:_nFileBlockLength;
var segment=1,_nStart=0,_oPromise,_oCurrentBlock,_oNextBlock;
var _nHashStartTime=A.speedNow(),_nHashEndTime;
function signing(data)
{
if(!data&&_oSelf.fileCanceled)
{
_oSelf.fileCanceled=false;
setTimeout(function(){
signing();
},150);
return false;
}
_oPromise=Promise.resolve(data);
for(i=0;i<_nChipBlankLength;i++)
{
_oCurrentBlock=_oNextBlock||_oSelf._genFileBlock(_aoFile,_nStart);
_nStart+=_oSelf.nSignFileBlockSize;
_oNextBlock=_nStart>_nSize?{}:(_oSelf._genFileBlock(_aoFile,_nStart));
(function(_anIndex,_aoBlock,_aoNextBlock){
_oPromise=_oPromise.then(function(_aoPrevData){
if(_aoFile.bCancelH5_)
{
return;
}
if(!_aoPrevData)
{
_aoPrevData=[];
}
function parseSha1Msg(chunk)
{
return {data:{state:_aoPrevData[0],chunk:_aoBlock.block},type:'appendSHA1'};
}
function parseHashMsg(chunk)
{
return {data:{state:_aoPrevData[1],chunk:_aoBlock.block},type:'appendMD5'};
}
_aoFile._oCurFileBlock=_aoBlock;
window.t0=A.speedNow();
var _oMyPromise=Promise.all([_aoBlock._hashHandle("","file_sha1",parseSha1Msg,"file_sha1",true),_aoBlock._hashHandle("","file_md5",parseHashMsg,"file_md5",true)]);
var _nStartTime=A.speedNow();
_oMyPromise.then(function(){
var _nFileHashTimes=A.speedNow()-_nStartTime;
_nHashTotalNum++;
if(_nFileHashTimes>100)
{
_nHashTimeoutNum++;
}
_aoBlock.free();
_oSelf.onChipFileSigning_(_aoFile,_aoBlock.__nOffset/_nSize*100-2);
});
if(_nChipBlankLength==_anIndex+1&&segment*_nChipBlankLength<_nFileBlockLength)
{
return _oMyPromise.then(function(shaAndMd5Data){
segment++;
signing(shaAndMd5Data);
});
}
return _oMyPromise;
})['catch'](function(_aoError){
_oSelf._customInternalError(_aoFile,'fileHashError');
});
})(i,_oCurrentBlock,_oNextBlock);
if((segment-1)*_nChipBlankLength+i+1==_nFileBlockLength)
{
if(!window.t1)
{
window.t1=A.speedNow();
console.log(window.t1-window.t0);
}
complete(segment);
break;
}
}
}
signing();
_oFileBlockList=null;
function complete(segment)
{
_oPromise.then(function(_aoState){
_aoFile._oCurFileBlock=null;
if(_nHashTimeoutNum)
{
debug(['hash timeout:',(_nHashTimeoutNum/_nHashTotalNum*100).toFixed(6),'% ',_nHashTimeoutNum,'/',_nHashTotalNum].join(''));
}
if(!_aoFile.bCancelH5_)
{
return Promise.all([_oWorkerQueue.run(_oWorkerQueue.task({data:_aoState[0],type:'getSHA1'})),_oWorkerQueue.run(_oWorkerQueue.task({data:_aoState[1],type:'getMD5'}))]);
}
}).then(function(_aoData){
_nHashEndTime=A.speedNow();
debug(_nHashEndTime-_nHashStartTime);
var scanSpeed=_nSize/1024/1024/(_nHashEndTime-_nHashStartTime)*1000;
debug(["[",_aoFile.get("sName"),"]\u626B\u63CF:",scanSpeed,"M/S"].join(""));
if(_nSize>512*1024*1024)
{
new Image().src='/qy_mng_logic/reportKV?type=BizUpload&itemName=scan_speed&value='+parseInt(scanSpeed,10);
new Image().src='/qy_mng_logic/reportKV?type=BizUpload&itemName=wasm_scan_speed_b&value='+parseInt(scanSpeed,10);
}
else{
new Image().src='/qy_mng_logic/reportKV?type=BizUpload&itemName=wasm_scan_speed_s&value='+parseInt(scanSpeed,10);
}
window.console&&console.log("sSHA:",_aoData[0]);
window.console&&console.log("sMD5:",_aoData[1]);
if(!_aoFile.bCancelH5_)
{
_oSelf.onChipFileSignEnd_(_aoFile,{sSHA:_aoData[0],sMD5:_aoData[1]});
}
},function(_aoError){
_oSelf._customInternalError(_aoFile,'fileHashError');
});
}
},doChipUpload_:function(_aoFile){
var _oSelf=this;
var _oFetcher=new Fetcher(_oReaderQueue,_oWorkerQueue,_aoFile.oH5File,_oSelf.nUploadFileBlockSize,_oSelf.nCacheThreshold);
_oFetcher.addCache(0,64*1024);
_aoFile._mnStartUploadTime=+new Date();
_oSelf._uploadFromOffset(_aoFile,_oFetcher,0);
},_uploadFromOffset:function(_aoFile,_aoFetcher,_anOffset,_anRetry){
var _oSelf=this;
var _nStartTime=+new Date();
var _nRequestTime,_sMyHash,_nReadEndTime;
return _aoFetcher.fetch(_anOffset).then(function(_aoData){
_nRequestTime=A.speedNow();
_sMyHash=_aoData[0];
if(_aoFile.bCancelH5_)
{
return;
}
var _sHash=_aoData[0];
var _oChunk=_aoData[1];
_aoFile._oCurFileBlock=_aoData[2];
_nReadEndTime=_aoData[2]._nResumeReadTime;
return _oSelf._requestFTN(_aoFile,_anOffset,_sHash,_oChunk);
}).then(function(_aoRes){
_oSelf.setRealPostSize_(_aoFile,_nStartTime,_aoFile._oCurFileBlock.block.size);
return _aoRes;
},function(_aoErr){
_oSelf.setRealPostSize_(_aoFile,_nStartTime,_aoFile._oCurFileBlock.block.size);
throw _aoErr;
}).then(function(_aoRes){
var _nRequestEndTime=A.speedNow();
var _nReadResumeTime=_nReadEndTime-_nStartTime>0?(_nReadEndTime-_nStartTime):0;
window.console&&console.log('[%s] offset:%f, start:%f, request:%f, total:%f, read:%fms(%d%), md5:%fms(%d%), ajax:%fms(%d%)',_sMyHash,_anOffset,_nStartTime,_nRequestTime,_nRequestEndTime-_nStartTime,_nReadResumeTime,(_nReadResumeTime)/(_nRequestEndTime-_nStartTime)*100,_nRequestTime-_nStartTime-_nReadResumeTime,(_nRequestTime-_nStartTime-_nReadResumeTime)/(_nRequestEndTime-_nStartTime)*100,_nRequestEndTime-_nRequestTime,(_nRequestEndTime-_nRequestTime)/(_nRequestEndTime-_nStartTime)*100);
if(_aoFile.bCancelH5_)
{
return;
}
var _nProcessed=_anOffset+_aoFile._oCurFileBlock.block.size;
_oSelf.onprocess(_aoFile.set({nUploadPercent:_nProcessed/_aoFile.get('nSize')*100,nUploadedSize:_nProcessed}));
if(!_aoRes.end)
{
if(_aoRes.nextOffset>=_aoFile.get('nSize'))
{
throw new Error('next offset overflow');
}
if(_aoRes.nextOffset<=_anOffset)
{
window.console&&console.log("[ftn\u56DE\u4F20] next:",_aoRes.nextOffset,", ","cur:",_anOffset,", ","\u76F8\u5DEE\uFF1A",(_anOffset-_aoRes.nextOffset)/_oSelf.nUploadFileBlockSize,"\u7247");
var offsetDiff=(_anOffset-_aoRes.nextOffset)/_oSelf.nUploadFileBlockSize;
if(offsetDiff>_oSelf.nCacheThreshold||offsetDiff!=parseInt(offsetDiff))
{
_aoFetcher.resetCache();
}
if(_aoFile._mnCallBackTotalTime==undefined)
{
_aoFile._mnCallBackTotalChip=0;
_aoFile._mnCallBackTotalNum=0;
}
_aoFile._mnCallBackTotalChip+=Number((_anOffset-_aoRes.nextOffset)/_oSelf.nUploadFileBlockSize);
_aoFile._mnCallBackTotalNum++;
}
return _oSelf._uploadFromOffset(_aoFile,_aoFetcher,_aoRes.nextOffset);
}
else{
_oSelf.reportSuccDomain(_aoFile);
var _nUploadEndTime=+new Date();
debug(["\u603B\u8017\u65F6\uFF1A",(_nUploadEndTime-_aoFile._mnStartUploadTime)/1000,"s"].join(""));
debug(["\u771F\u5B9E\u8BF7\u6C42\u8017\u65F6\uFF1A",(_aoFile._mnRealRequestTotalTime)/1000,"s"].join(""));
debug(["\u771F\u5B9E\u8BF7\u6C42\u8017\u65F6\u5360\u6BD4\uFF1A",(_aoFile._mnRealRequestTotalTime)/(_nUploadEndTime-_aoFile._mnStartUploadTime)*100,"%"].join(""));
debug(["\u771F\u5B9E\u8BF7\u6C42\u6B21\u6570\uFF1A",(_aoFile._mnRealRequestTotalNum),"\u6B21"].join(""));
debug(["\u771F\u5B9E\u4E0A\u4F20\u5927\u5C0F\uFF1A",_aoFile.get("nRealPostSize")/1024/1024,"M"].join(""));
debug(["[",_aoFile.get("sName"),"]\u4E0A\u4F20:",_aoFile.get("nRealPostSize")/1024/1024/(_nUploadEndTime-_aoFile._mnStartUploadTime)*1000,"M/S"].join(""));
debug(["\u5E73\u5747\u56DE\u4F20\u7247\u6570\uFF1A",_aoFile._mnCallBackTotalChip?((_aoFile._mnCallBackTotalChip)/_aoFile._mnCallBackTotalNum):0,"\u7247"].join(""));
A.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|uploadSucc",sid:A.getSid()});
_aoFetcher._workers.queue.resetWorker();
_oSelf.oncomplete(_aoFile);
}
})['catch'](function(_aoError){
var _nRetryTotal=_aoFile.get('nAutoUploadRetry')||0;
if(!_anRetry)
{
_anRetry=0;
}
if(_nRetryTotal<_oSelf.nMaxRetryNum&&_anRetry<_oSelf.nMaxSingleRetryNum)
{
_aoFile.set('nAutoUploadRetry',++_nRetryTotal);
debug('auto upload retry');
_oSelf._uploadFromOffset(_aoFile,_aoFetcher,_anOffset,_anRetry?_anRetry+1:1);
}
else{
_aoFetcher._workers.queue.resetWorker();
if(/http,600/i.test(_aoError.message))
{
_oSelf.reportCustomError(_aoFile,{fileUploadProgress:_anOffset/_aoFile.get('nSize')*10});
}
_oSelf._parseError(_aoFile,_aoError);
}
});
},_parseError:function(_aoFile,_aoError){
var _oSelf=this;
if(_aoError.message=='next offset overflow')
{
_oSelf._customInternalError(_aoFile,'nextOffsetOverFlow');
}
else if(_aoError.message.substr(0,5)=='http,')
{
_oSelf.onerror(_aoFile.set('sError',_oSelf.err('http',_aoError.message.substr(5))));
}
else if(/^[a-z]+,/i.test(_aoError.message))
{
_oSelf.onerror(_aoFile.set('sError',_aoError.message));
}
else{
debug(_aoError);
_oSelf.onerror(_aoFile.set('sError',_oSelf.err('unknow',709390)));
}
},_requestFTN:function(_aoFile,_anOffset,_asHash,_aoChunk){
var _oTop;
if(typeof getTop=='function')
{
_oTop=getTop();
}
else{
_oTop={goExpers:{h5cJsUploadProxy:true}};
}
if((!/\.qq\.com$/.test(location.hostname)&&_oTop.goExpers&&_oTop.goExpers.h5cJsUploadProxy))
{
return this._requestFTNByAjaxProxy.apply(this,arguments);
}
else{
return this._requestFTNByAjax.apply(this,arguments);
}
},_requestFTNByAjaxProxy:function(_aoFile,_anOffset,_asHash,_aoChunk){
var _oSelf=this;
return new Promise(function(_fResolve,_fReject){
var _nStartT,_nEndT;
var _oXhr=new XMLHttpRequest();
var _nPort=_aoFile.get('nPort'),_sProtocol="http";
if(window.location.protocol=="https:")
{
_nPort="443";
_sProtocol="https";
}
var _sUrl=_sProtocol+'://'+(_aoFile.get('sDns')||_aoFile.get('sIP'))+':'+_nPort+'/ftn_handler/';
_oXhr.open('POST',_sUrl,true);
_oXhr.timeout=20000;
_oXhr.setRequestHeader('DATA-MD5',_asHash);
_oXhr.setRequestHeader('content-type','application/octet-stream');
_oXhr.setRequestHeader('Cache-Control','no-cache');
_oXhr.responseType='arraybuffer';
window.addEventListener('message',function(e){
resolveResponse(e.data);
},{once:true});
function resolveResponse(response)
{
try{
_fResolve(FtnConverter.parseFTNRespone(response));
}
catch(_oError)
{
A.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|parseFTNResponeError",sid:A.getSid()});
_fReject(_oError);
}
}
_oXhr.onerror=function(){
_fReject(new Error('http,600'));
A.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|onerror",sid:A.getSid()});
};
_oXhr.onabort=function(){
_fReject(new Error('http,700'));
A.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|onabort",sid:A.getSid()});
};
_oXhr.ontimeout=function(){
_fReject(new Error('http,800'));
A.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|timeout",sid:A.getSid()});
};
_oXhr.upload.onprogress=function(_aoEvent){
if(_aoEvent.lengthComputable)
{
_oSelf.onprocess(_aoFile.set('nUploadPercent',(_aoEvent.loaded+_anOffset)/_aoFile.get('nSize')*100));
}
};
var _oSendAB=FtnConverter.genFTNRequestBody(_aoFile.get('sKey'),_aoFile.get('sSHA'),_aoFile.oH5File,_aoChunk,_anOffset);
document.getElementById("ajaxProxyIframe").contentWindow.postMessage({_sUrl:_sUrl,_asHash:_asHash,_oSendAB:_oSendAB},'*');
_nStartT=+new Date();
});
},_requestFTNByAjax:function(_aoFile,_anOffset,_asHash,_aoChunk){
var _oSelf=this;
return new Promise(function(_fResolve,_fReject){
var _nStartT,_nEndT;
var _oXhr=new XMLHttpRequest();
var _nPort=_aoFile.get('nPort'),_sProtocol="http";
if(window.location.protocol=="https:")
{
_nPort="443";
_sProtocol="https";
}
var _sUrl=_sProtocol+'://'+(_aoFile.get('sDns')||_aoFile.get('sIP'))+':'+_nPort+'/ftn_handler/';
_oXhr.open('POST',_sUrl,true);
_oXhr.timeout=20000;
_oXhr.setRequestHeader('DATA-MD5',_asHash);
_oXhr.setRequestHeader('content-type','application/octet-stream');
_oXhr.setRequestHeader('Cache-Control','no-cache');
_oXhr.responseType='arraybuffer';
_oXhr.onload=function(){
if(_oXhr.readyState==4)
{
_oXhr.upload.onprogress=null;
if(_oXhr.status==200)
{
_nEndT=+new Date();
if(_aoFile._mnRealRequestTotalTime==undefined)
{
_aoFile._mnRealRequestTotalTime=0;
_aoFile._mnRealRequestTotalNum=0;
}
_aoFile._mnRealRequestTotalTime+=Number(_nEndT-_nStartT);
_aoFile._mnRealRequestTotalNum++;
try{
_fResolve(FtnConverter.parseFTNRespone(_oXhr.response));
}
catch(_oError)
{
A.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|parseFTNResponeError",sid:A.getSid()});
_fReject(_oError);
}
}
else{
var _nErrCode=_oXhr.getResponseHeader('User-ReturnCode');
_fReject(new Error(_nErrCode?'internal,'+_nErrCode:'http,'+_oXhr.status));
}
}
};
_oXhr.onerror=function(){
_fReject(new Error('http,600'));
A.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|onerror",sid:A.getSid()});
};
_oXhr.onabort=function(){
_fReject(new Error('http,700'));
A.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|onabort",sid:A.getSid()});
};
_oXhr.ontimeout=function(){
_fReject(new Error('http,800'));
A.LogKvEx({businame:"fileupload",item:"web|H5CPopupMail|timeout",sid:A.getSid()});
};
_oXhr.upload.onprogress=function(_aoEvent){
if(_aoEvent.lengthComputable)
{
_oSelf.onprocess(_aoFile.set('nUploadPercent',(_aoEvent.loaded+_anOffset)/_aoFile.get('nSize')*100));
}
};
var _oSendAB=FtnConverter.genFTNRequestBody(_aoFile.get('sKey'),_aoFile.get('sSHA'),_aoFile.oH5File,_aoChunk,_anOffset);
_oXhr.send(_oSendAB);
_nStartT=+new Date();
});
},_customInternalError:function(_aoFile,_asErrType){
this.onerror(_aoFile.set('sError',this.err('internal',{nextOffsetOverFlow:200001,fileHashError:200002}[_asErrType]||709390)));
},reportCustomError:function(_aoFile,info){
var _nPort=_aoFile.get('nPort'),_sProtocol="http";
if(window.location.protocol=="https:"||window.location.hostname.indexOf("webdev")>-1)
{
_nPort="443";
_sProtocol="https";
}
},reportSuccDomain:function(_aoFile){
var infoStr=["succdomain=",_aoFile.get('sIP')].join("");
},onResourceError:function(){
if(!this.resourceErrorTriggered)
{
var self=this;
var cfg=_oCfg||{};
self.resourceErrorTriggered=true;
var degenerationUploadType;
if(this.name=='WasmH5CPopupMail')
{
degenerationUploadType='H5CPopupMail';
}
else if(this.name=='WasmH5CDragFMailCROS')
{
degenerationUploadType='H5CDragFMailCROS';
}
else if(this.name=='WasmH5CDragFMail')
{
degenerationUploadType='H5CDragFMail';
}
if(degenerationUploadType)
{
var oldInput=cfg.oContainer.querySelector('input[type="file"]');
if(oldInput)
{
cfg.oContainer.removeChild(oldInput.parentNode);
}
new _oComs[degenerationUploadType](cfg);
debug('wasm error, swith uploader implement: '+degenerationUploadType);
}
}
}});
}
_oQmFileUpload.createCom('WasmH5CPopupMail',_fGetLib,'Html5PopupMail');
_oQmFileUpload.createCom('WasmH5CDragFMailCROS',_fGetLib,'Html5DragCROS');
_oQmFileUpload.createCom('WasmH5CDragFMail',_fGetLib,'Html5DragMail');
})(QMFileAdaptor);
},function(c,b,a){
c.exports={};
},function(f,e,d){
var a=d(3);
var c=d(4);
function b()
{
this.queue=new a();
}
b.prototype.PRIORITY={};
b.prototype.fork=function(){
this.queue.addWorker(new FileReader());
};
b.prototype.task=function(g,k){
var h=this;
var j=new c(g,k);
j.result().then(function(){
h.queue.removeTask(j);
});
return j;
};
b.prototype.run=function(h,g){
return this.queue.runTask(h,this.PRIORITY[g]);
};
f.exports=b;
},function(c,b){
function a()
{
this._tasksList=[];
this._workers=[];
}
a.prototype.addWorker=function(h){
for(var d=0,e=this._tasksList.length,f,g;d<e;d++)
{
g=this._tasksList[d];
if(g&&g.length)
{
while((f=g.shift()))
{
if(this._runTask(h,f))
{
return;
}
}
}
}
h.__status__='ready';
this._workers.push(h);
};
a.prototype._runTask=function(f,e){
var d=this;
if(e.start(f))
{
e.result().then(function(){
f.__status__='ready';
d.addWorker(f);
},function(g){
f.__status__='ready';
d.addWorker(f);
return Promise.reject(g);
});
f.__status__='running';
d.removeWorker(f);
return true;
}
return false;
};
a.prototype.findWorker=function(d){
return this._workers.findIndex(function(e){
return e===d;
});
};
a.prototype.findIdentWorker=function(d){
return this._workers.find(function(e){
return e.ident==d.ident;
});
};
a.prototype.resetWorker=function(){
return this._workers.forEach(function(d){
d.postMessage({type:'reset'});
});
};
a.prototype.removeWorker=function(d){
this._workers=this._workers.filter(function(e){
return e!==d;
});
};
a.prototype.runTask=function(f,e){
var g=(f._wkmsg||{}).type;
var d;
if(g=='appendSHA1'||g=='getSHA1')
{
d='sha1';
}
else if(g=='appendMD5'||g=='getMD5')
{
d='md5';
}
if(d)
{
var h=this.findIdentWorker({ident:d});
if(h)
{
this._runTask(h,f);
}
else{
this.insertTask(f,e);
}
}
else if(this._workers.length>0)
{
this._runTask(this._workers[0],f);
}
else{
this.insertTask(f,e);
}
return f.result();
};
a.prototype.insertTask=function(e,d){
if(d)
d=Number(d);
d||(d=0);
(this._tasksList[d]||(this._tasksList[d]=[])).push(e);
(e.__priority||(e.__priority=[])).push(d);
};
a.prototype.removeTask=function(e){
var f=this._tasksList;
for(var d=f.length;d--;)
{
if(f[d])
{
f[d]=f[d].filter(function(g){
return e!==g;
});
}
}
};
c.exports=a;
},function(e,d,c){
var b=c(5);
function a(f,g)
{
this._type=g;
this._rdBlock=f;
b.call(this);
}
a.prototype=b.proto();
a.prototype.handle_=function(f){
var g=this;
return new Promise(function(n,m){
f.addEventListener('load',l);
f.addEventListener('abort',j);
f.addEventListener('error',k);
f.readAsArrayBuffer(g._rdBlock);
function l(o)
{
h();
n(o.target.result);
}
function j()
{
h();
m(new Error('aborted'));
}
function k(o)
{
h();
m(o);
}
function h()
{
delete g._rdBlock;
f.removeEventListener('load',l);
f.removeEventListener('abort',j);
f.removeEventListener('error',k);
}
});
};
e.exports=a;
},function(c,b){
function a()
{
var d=this;
d.timing={};
d._resolve=d._reject=null;
d._step('init');
d._promise=new Promise(function(f,e){
d._resolve=f;
d._reject=e;
}).then(function(e){
d._step('start');
return d.handle_(e);
});
d._promise.then(function(){
d._step('success');
},function(e){
d._step('error');
return Promise.reject(e);
});
}
a.prototype.SPEED_TEST=true;
a.prototype.timeEnd=function(d){
if(this.SPEED_TEST)
{
this.timing[d]=+new Date();
}
};
a.prototype.speedReport=function(){
var f=this.timing;
var d=f.success||f.error||f.aborted;
var g=d-f.init||1;
var h=f.start-f.init;
var e=d-f.start;
return ['[',this.__status__,']',' init:',f.init,' total:',g,'ms',' wait:',h,'ms(',(h/g*100).toFixed(2),'%)',' run:',e,'ms(',(e/g*100).toFixed(2),'%)'].join('');
};
a.prototype._step=function(d){
this.__status__=d;
this.timeEnd(d);
};
a.prototype.start=function(e){
if(this._resolve)
{
var d=this._resolve;
this._reject=this._resolve=null;
d(e);
return true;
}
return false;
};
a.prototype.abort=function(d){
if(this._reject)
{
var e=this._reject;
this._reject=this._resolve=null;
d!==true&&e(new Error('abort'));
}
this._step('aborted');
};
a.prototype.handle_=function(){
};
a.prototype.result=function(){
return this._promise;
};
a.proto=function(){
function d()
{
}
d.prototype=this.prototype;
return new d();
};
c.exports=a;
},function(f,e,d){
var a=d(3);
var c=d(7);
function b()
{
this.queue=new a();
}
b.prototype.PRIORITY={};
b.prototype.fork=function(m,j,g){
var l=this;
j=j||{};
try{
var n=new Worker(m);
if(j.ident)
{
n.ident=j.ident;
}
}
catch(h)
{
console.log('init worker',h);
return h;
}
function k(o)
{
n.removeEventListener('message',k);
if(o.data.type=='ready')
{
l.queue.addWorker(n);
}
}
n.addEventListener('message',k);
n.addEventListener('error',function(o){
console.log('worker err, %s err:%o',m,o);
typeof g=='function'&&g();
});
};
b.prototype.task=function(g){
return new c(g);
};
b.prototype.run=function(h,g){
return this.queue.runTask(h,this.PRIORITY[g]);
};
f.exports=b;
},function(e,d,c){
var a=c(5);
function b(f)
{
this._wkmsg=f;
a.call(this);
}
b.prototype=a.proto();
b.prototype.handle_=function(g){
var f=this;
return new Promise(function(m,l){
g.addEventListener('message',k);
g.addEventListener('error',j);
g.postMessage(f._wkmsg);
function k(n)
{
if(n.data.type==='done')
{
h();
m(n.data.data);
}
else if(n.data.type==='retry')
{
f.nRetryCount=f.nRetryCount||0;
if(f.nRetryCount>4)
{
debug(n.data.data);
return j(n.data.data);
}
f.nRetryCount++;
g.postMessage(f._wkmsg);
}
}
function j(n)
{
h();
l(n);
}
function h()
{
delete f._wkmsg;
g.removeEventListener('message',k);
g.removeEventListener('error',j);
}
});
};
e.exports=b;
},function(e,d,c){
var b=c(9);
function a(j,k,h,g,f)
{
this._workers=k;
this._readers=j;
this._chunkSize=g;
this._file=h;
this._cacheThreshold=f;
this._caches={length:0};
}
a.prototype.fetch=function(g){
var j=this;
var f=j._caches[g];
if(f)
{
}
else{
f=j.addCache(g,j._chunkSize);
}
j._cleanup(g);
delete this._caches[g];
j._runPrefetch(f._fetch_end);
var h=Promise.all([f.hash('block_hash'),f.read('send_read'),f]);
return h;
};
a.prototype.addCache=function(j,g){
var h=j+g;
var f=this._caches[j]=new b(this._readers,this._workers,this._file.slice(j,h));
this._caches.length++;
f._fetch_start=j;
f._fetch_end=h;
return f;
};
a.prototype.rmCache=function(g){
var f=this._caches[g];
if(f&&f.cancel)
{
f.cancel();
delete this._caches[g];
}
};
a.prototype._runPrefetch=function(f){
var g=this;
if(g._caches.length>g._cacheThreshold)
{
return;
}
while(f<g._file.size&&g._caches[f])
{
f+=g._chunkSize;
}
if(f>=g._file.size)
{
return;
}
g._prefetch(f).then(function(){
g._runPrefetch(f+g._chunkSize);
});
};
a.prototype._prefetch=function(f){
return this.addCache(f,this._chunkSize).hash('pre_block_hash');
};
a.prototype._cleanup=function(f){
var g=this._caches;
var h=0;
for(var j in g)
{
if(j=='length')
continue;
if(j<f)
this.rmCache(j);
else h++;
}
g.length=h;
};
a.prototype.resetCache=function(){
this._caches={length:0};
};
e.exports=a;
},function(c,b){
function a(f,g,e)
{
this.__status__='init';
this._readers=f;
this._workers=g;
this.block=e;
this.tasks={};
}
a.prototype.readAsBuffer=function(f,e){
var g=this;
var h=g._readers.task(g.block,"toBuffer");
g.__status__='readAsBuffer';
g._readers.run(h,f);
return h.result();
};
a.prototype.read=function(f,e){
var g=this;
var h=g.tasks.read;
if(!h||e)
{
if(h&&e)
h.abort(true);
h=g.tasks.read=g._readers.task(g.block);
}
g.__status__='read';
g._readers.run(h,f);
return h.result();
};
a.prototype.free=function(){
delete this.tasks.read;
for(var e in this.tasks)
{
this._workers.queue.removeTask(this.tasks[e]);
delete this.tasks[e];
}
};
a.prototype.hash=function(f,e){
var g=this;
return this._readAndHash('hash',d,f,e);
};
a.prototype.fileMd5=function(f,e){
return this._hashRoute('file_md5',f,e);
};
a.prototype.fileSha1=function(f,e){
return this._hashRoute('file_sha1',f,e);
};
a.prototype._hashHandle=function(e,l,g,h,f){
var j=this;
var k=j.tasks[l];
if(!k||f)
{
if(k&&f)
{
k.abort(true);
delete j.tasks[l];
}
k=j.tasks[l]=j._workers.task(g(e));
}
j.__status__=l;
j._workers.run(k,h);
return k.result();
};
a.prototype._readAndHash=function(k,f,g,e){
var h=this;
var j=h.tasks[k];
if(!j||e)
{
if(j&&e)
{
j.abort(true);
delete h.tasks[k];
}
return h.read(g,false).then(function(l){
h._nResumeReadTime=+new Date();
return h._hashHandle(l,k,f,g,e);
});
}
else{
h._workers.run(j,g);
return j.result();
}
};
a.prototype._hashRoute=function(h,f,e){
var g=this;
if(e instanceof Promise)
{
return e.then(function(j){
return g._hashRoute(h,f,j);
});
}
else if(e)
{
return g._hashHandle(e,h,f,h,true);
}
else{
return g._readAndHash(h,f,h,true);
}
};
a.prototype.cancel=function(){
var e=this;
var g=this.tasks;
for(var f in g)
{
if(g[f]&&g[f].abort)
g[f].abort(true);
delete g[f];
}
setTimeout(function(){
e._workers.queue.resetWorker();
},100);
};
function d(e)
{
return {data:e,type:'chunkMD5'};
}
c.exports=a;
},function(n,l){
var a=0xABCD9876;
function m(B,w,v,u,A)
{
var C=k(B);
var D=d(C.byteLength);
var x=k(w);
var y=d(x.byteLength);
var s=e(v,A,u);
var t=s.byteLength+C.byteLength+x.byteLength+D.byteLength+y.byteLength+u.byteLength;
var z=f(t);
var p=new ArrayBuffer(t+z.byteLength);
var q=new Uint8Array(p);
var r=0;
[z,D,C,y,x,s,u].forEach(function(F){
q.set(new Uint8Array(F),r);
r+=F.byteLength;
});
return q;
}
function o(s)
{
var r=new DataView(s);
if(r.getUint32(0,false)!=a)
throw new Error('Unknow response');
var p=r.getUint32(4,false);
if(p)
throw new Error('cgi,'+p);
if(r.getUint8(16)==0)
{
var q=g(r.getUint32(17,false),r.getUint32(21,false));
return {nextOffset:q};
}
else if(r.getUint8(16)==1)
{
return {end:true};
}
else{
throw new Error('Unknow status');
}
}
function k(s)
{
var p=new ArrayBuffer(s.length/2);
var t=new Uint8Array(p);
for(var q=p.byteLength;q--;)
{
var r=parseInt(s.substr(q*2,2),16);
if(isNaN(r))
throw new Error('parse hex err');
t[q]=r;
}
return p;
}
function d(r)
{
var p=new ArrayBuffer(2);
var q=new DataView(p);
q.setUint16(0,r,false);
return p;
}
function f(p)
{
var q=f.headABView;
if(!q)
{
q=new DataView(new ArrayBuffer(16));
f.headABView=q;
h(q,[a,1007,0]);
}
q.setUint32(12,p,false);
return q.buffer;
}
function e(r,t,q)
{
var p=e.bodyABLenView;
if(!p)
{
p=new DataView(new ArrayBuffer(20));
e.bodyABLenView=p;
}
var s=j(r.size);
var u=j(t);
h(p,[s.low,u.low,q.byteLength,s.high,u.high]);
return p.buffer;
}
var b=0xffffffff;
var c=b+1;
function j(p)
{
return {low:p&b,high:p/c|0};
}
function g(q,p)
{
return q+(p||0)*c;
}
function h(r,p,q)
{
q||(q=0);
p.forEach(function(t,s){
r.setUint32(q+s*4,t,false);
});
}
l.genFTNRequestBody=m;
l.parseFTNRespone=o;
}]);
(function(b,c){
function a()
{
this._init();
}
a.prototype={_init:function(d){
this._cfg=d||{};
},monitorKeyDown:function(d){
this.lastKeyDown=d.keyCode;
if(this.isDirectionKey(d)&&this.isHintPanelShow(d))
{
this.readyItemIndex=this.readyItemIndex||0;
if(this.isKeyUp(d))
{
this.makeItemReady(Math.max(0,this.readyItemIndex-1));
}
else if(this.isKeyDown(d))
{
var e=c.CN('menu_item_addrlist',this.selectPanel).length;
this.makeItemReady(Math.min(e-1,this.readyItemIndex+1));
}
}
},monitorKeyUp:function(d,g){
this.win=g;
var f=this;
this.lastLastKeyUp=this.lastKeyUp;
this.lastKeyUp=d.keyCode;
if(this.isCloseHintKey(d))
{
this.closeHint();
}
else if(this.isOmitKey(d))
{
this.closeHint();
}
else if(this.isDirectionKey(d)&&this.isHintPanelShow(d))
{
}
else if(this.isConfirmKey(d))
{
this.selectItem({type:'press'});
}
else{
var e=g.getSelection();
this.lastEditRange=e.getRangeAt(0);
setTimeout(function(){
var m=g.getSelection();
var k=m.focusNode.parentNode;
var h=c.hasClass(k,'js_hint_node');
if(h&&f.isDelKey(d))
{
f.delItem(k);
}
else if(!h)
{
var j=f.getHintData(m);
if(j)
{
var l=f.searchAddrData(j);
if(l.length>0)
{
f.renderData(l,j,m,g);
f.searchData=l;
f.hintData=j;
}
else{
f.closeHint();
}
}
else{
f.closeHint();
}
}
},5);
}
},getHintData:function(k){
var d=k.focusNode.data||'';
var l=k.getRangeAt(0).endOffset;
var e=d.substr(0,l);
var h=d.substr(l);
var f=e.lastIndexOf('@');
if(f>-1)
{
var g=e.substr(f+1);
var j=h.match(/\s+/);
if(j)
{
g=g+h.substr(0,j.index);
}
else{
g=g+h;
}
return g;
}
else{
return false;
}
},searchAddrData:function(d){
return QMAddress.search(d,10);
},renderData:function(m,f,o,r){
var p=this;
var k=o.getRangeAt(0);
var q=k.startContainer;
var l=k.startOffset;
var n=this.selectPanel;
if(!n)
{
var h=p.win.document.createElement('div');
this.lastEditRange.insertNode(h);
var j=h.parentNode;
h.style.position="relative";
h.style.display="inline-block";
h.style['user-select']="none";
h.setAttribute('contenteditable',false);
h.setAttribute('id','addHintPanel');
var e=p.win.document.createElement('div');
e.innerHTML=this.renderContent(m,f);
e.setAttribute('id','addrHintContent');
h.appendChild(e);
e.style.position="absolute";
this.selectPanel=h;
}
else{
if(n.parentNode)
{
n.parentNode.removeChild(n);
}
this.lastEditRange.insertNode(n);
var e=n.childNodes[0];
e.innerHTML=this.renderContent(m,f);
}
var e=this.selectPanel.childNodes[0];
if(this.selectPanel.offsetTop+e.offsetHeight>this.win.document.body.offsetHeight&&((e.offsetHeight+30)<this.selectPanel.offsetTop))
{
e.style.top=-1*(e.offsetHeight+10)+"px";
}
else{
e.style.top="10px";
}
if(this.selectPanel.offsetLeft+e.offsetWidth>this.win.document.body.offsetWidth&&((e.offsetWidth+30)<this.selectPanel.offsetLeft))
{
e.style.left=-1*(e.offsetWidth+10)+"px";
}
else{
e.style.left="10px";
}
var g=c.CN('menu_item_addrlist',this.selectPanel);
var d=c.CN('ico_close_d',this.selectPanel);
c.E(g,function(s){
c.addEvent(s,'click',function(t){
p.onItemClick(t);
});
});
c.E(d,function(s){
c.addEvent(s,'click',function(t){
p.closeHint(t);
});
});
if(m.length>0)
{
this.makeItemReady(0);
}
k.setStart(q,l);
k.collapse(true);
o.removeAllRanges();
o.addRange(k);
},renderContent:function(f,e){
var d=c.S('RealAllSignature',this.win);
if(d)
{
d.childNodes[0].style.overflow='visible';
}
c.E(f,function(j,g){
f[g].index=g;
var h=new RegExp(e,"g");
f[g].nameHtml=f[g].name.replace(h,'<span style="color:red;">'+e+'</span>');
f[g].emailHtml=f[g].email.replace(h,'<span style="color:red;">'+e+'</span>');
});
return this.TEMPLE.ADDR_LIST.replace({members:f||[]});
},makeItemReady:function(f){
var h=this.selectPanel;
var d=c.CN('menu_item_addrlist_current',h);
for(var e=0;e<d.length;++e)
{
c.rmClass(d[e],'menu_item_addrlist_current');
}
var g=c.CN('menu_item_addrlist',h);
if(g.length>0)
{
c.addClass(g[f],'menu_item_addrlist_current');
this.readyItemIndex=f;
}
},selectItem:function(g){
g=g||{};
var f=getMainWin();
var e=g.index||this.readyItemIndex;
this.searchData=this.searchData||[];
var h=this.searchData[e];
if(h)
{
var d=f.QMAddrInput.get('to',f);
if(d)
{
d.add('"'+h.name+'"<'+h.email+'>;',false,h.nid);
this.insertResultNode(h,g.type);
this.closeHint();
}
}
},delItem:function(f){
var g=getMainWin();
var e=f.getAttribute('data-email');
if(e)
{
var d=g.QMAddrInput.get('to',g);
if(d)
{
d.del(e);
}
}
f.parentNode.removeChild(f);
},onItemClick:function(d){
var f=d.currentTarget;
var e=f.getAttribute('data-index');
if(!isNaN(e))
{
this.selectItem({index:e,type:'click'});
}
},insertResultNode:function(k,n){
var m=this;
var e=k.name;
var d=this.hintData;
if(e&&d)
{
var l=this.win.getSelection();
if(this.lastEditRange)
{
if(this.lastEditRange.startContainer)
{
var f=this.lastEditRange.startContainer.data;
this.lastEditRange.startContainer.data=f.substr(0,f.length-d.length-1);
}
else if(this.lastEditRange.endContainer.data)
{
var f=this.lastEditRange.endContainer.data;
this.lastEditRange.endContainer.data=f.substr(0,f.length-d.length-1);
}
l.removeAllRanges();
l.addRange(this.lastEditRange);
}
else{
var f=l.focusNode.data;
l.focusNode.data=f.substr(0,f.length-d.length-1);
}
var g=this.lastEditRange;
var h=m.win.document.createElement('span');
h.style.display='inline-block';
h.innerText='@'+e;
h.style.color='#4096E5';
h.style.fontSize='14px';
h.style.fontFamily='Verdana';
h.style.cursor='pointer';
h.className='js_hint_node';
h.setAttribute('data-email',k.email);
h.setAttribute('t',2);
h.setAttribute('e',k.email);
h.setAttribute('n',k.name);
h.setAttribute('u',c.g_encryptuin);
h.setAttribute('w',50);
h.onclick=function(){
c.QMProfileTips.doMouseEvent('over',m.win,h);
m.lastShowTipTime=+new Date();
setTimeout(function(){
if(+new Date()-m.lastShowTipTime>1000)
{
c.QMProfileTips.doMouseEvent('out',m.win,h);
}
},2500);
};
var j=this.win.document.createTextNode('\u00A0');
this.selectPanel.parentNode.insertBefore(h,this.selectPanel);
this.selectPanel.parentNode.insertBefore(j,this.selectPanel);
g.selectNodeContents(j);
g.setStart(j,j.length);
g.collapse(true);
l.removeAllRanges();
l.addRange(g);
this.lastEditRange=g;
}
},isCloseHintKey:function(d){
return d.keyCode==27;
},isOmitKey:function(d){
return ((d.altKey||d.ctrlKey||d.shiftKey)&&(d.keyCode==65)||d.keyCode==16||d.keyCode==17||d.keyCode==18||d.keyCode==91||d.keyCode==92||d.keyCode==65&&this.lastLastKeyUp==17||d.keyCode==86&&this.lastLastKeyUp==17);
},isDirectionKey:function(d){
return this.isKeyUp(d)||this.isKeyDown(d);
},isConfirmKey:function(d){
return d.keyCode==13;
},isHintPanelShow:function(){
return this.selectPanel&&this.selectPanel.style.display!=='none';
},isKeyUp:function(d){
return d.keyCode==38;
},isKeyDown:function(d){
return d.keyCode==40;
},isDelKey:function(d){
return d.keyCode==8;
},closeHint:function(){
var e=this.selectPanel;
if(e)
{
if(e.parentNode)
{
e.parentNode.removeChild(e);
}
delete this.selectPanel;
delete this.readyItemIndex;
delete this.searchData;
}
else{
var d=c.S('addHintPanel',this.win);
if(d&&d.length>0)
{
c.E(d,function(f){
if(f.parentNode)
{
f.parentNode.removeChild(f);
}
});
}
else if(d&&d.parentNode)
{
d.parentNode.removeChild(d);
}
}
},TEMPLE:{ADDR_LIST:TE(['<div class="menu_item_tip tipInner">',' <div class="menu_item_title" style="background-color:#FFF;">',' <span>\u6309ESC\u952E\u5173\u95ED\u83DC\u5355</span>',' <span title="\u5173\u95ED" dlg="close" class="ico_close_d"></span>',' </div>',' $@$for($members$)$@$',' <div class="menu_item_addrlist" style="height:28px;line-height:28px;" data-index="$index$">','   <span style="color:#333;margin-left:17px;">$nameHtml$</span>&nbsp;<span class="tcolor">&lt;$emailHtml$&gt;</span>',' </div>',' $@$endfor$@$','</div>'])}};
c.AddrHint=a;
})(getMainWin(),getTop());
function qmtool_js()
{
}
