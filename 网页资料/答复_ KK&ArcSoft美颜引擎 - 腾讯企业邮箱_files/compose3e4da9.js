var goCompose={oQmSender:null,_bIsUserSave:false,_oAutoSaveTimer:null,_bIsSkinSubject:false,_bIsAlarmedBigAttach:false,_bIsSkinNoAttach:false,_bIsAlarmNickName:false,_bIsAlarmedDomainAddr:false,_oErrCheckTimer:null,_oDomainChecker:null};
var _oTop=getTop();
function loadAddress()
{
getTop().waitFor(function(){
return getTop().QMAddress&&getTop().QMLinkman;
},function(a){
if(a)
{
getTop().QMAddress.initAddress(showQuickAddr);
}
},100,30*1000);
}
function initComposeForPage(b,a)
{
var f=getTop();
if(getPageId())
{
return;
}
if(!goCompose._oErrCheckTimer)
{
var g="";
goCompose._oErrCheckTimer=setTimeout(function(){
if(f.QMEditor)
{
g=(f.QMEditor.isInitialized)?"inited":"noInited";
}
else{
g="noEditor";
}
f.ossLog("delay","all","stat=nothing&locval=editorErr,"+g+","+b);
},20*1000);
}
if(!f.QMEditor&&!a.nowait)
{
f.loadJsFileToTop(f.getPath("js"),[f.getFullResSuffix("qqmaileditor/editor.js")]);
var d=arguments,e=this;
return setTimeout(function(){
d.callee.apply(e,d);
},50);
}
arguments.callee.pageId=b;
arguments.callee.pageConfig=a;
var c={"compose":_initEditorForComposePage,"group":_initEditorForGroupPage,"groupsms":_initEditorForGroupSmsPage,"card":_initEditorForCardPage,"voice":_initEditorForVoicePage,"postcard":_initForPostcardPage,"qq":_initEditorForQQPage,"readmailGroup":_initEditorForReadMailGroupPage,"note":_initEditorForNotePage,"noteFirstPage":_initEditorForNoteFirstPage,"remind":_initForRemindPage,"readmailConv":_initForReadmailConv,"qfcompose":_initEditorForQfCompose}[b];
if(c)
{
c(b,a||{});
}
f.addEvent(window,"unload",function(){
f.cancelDoSend();
f.QMDialog("composeExitAlert","close");
});
loadAddress();
f.setKeepAlive(window);
if("1"==f.gbBackGroundSend)
{
f.loadJsFileToTop(f.getPath("js"),[f.getFullResSuffix("backsend.js")]);
}
if(QMAttach._isSupportActiveXDrag()||QMAttach._isSupportHTML5Drag())
{
QMAttach._initDragAndDropTrap();
}
else if(getTop().gbIsIE||(getTop().QMAXInfo.mbAblePlugin&&!getTop().gbIsOpera))
{
QMAttach._initDragAndDropTrap(true);
}
}
function _getCombineFiles(b,a)
{
var c=["self","attach"];
for(var f=0;f<c.length;f++)
{
var d=c[f];
if(b[d]&&getTop().QMDialog("ftnupload_"+d))
{
for(var e in b[d].moFile)
{
a.moFile[e]=b[d].moFile[e];
a.moFile[e].listType=d;
}
a.mnUploaderCount+=b[d].mnUploaderCount||0;
}
}
}
function _closeDlg()
{
var a=["self","attach"];
for(var c=0;c<a.length;c++)
{
try{
getTop().QMDialog("ftnupload_"+a[c]).close();
}
catch(b)
{
}
}
}
function _getUncomplete(a)
{
var b=0;
for(var c in a)
{
b++;
}
return b;
}
function _removeAttach(a)
{
var c=a||{},b=getTop();
for(var d in c)
{
b.removeSelf(b.S("BigAttach_"+d,window));
}
}
;function initBigAttachFile(c,b,a)
{
var m=arguments,n=getTop(),e=arguments.callee;
clearTimeout(e['nAttachTimer']);
if(c=="remove")
{
_removeAttach(e['oUncomplete']);
return;
}
var p=c||"self",j=n.QMDialog("ftnupload_"+p),l=b||j&&j.getDialogWin().oMainObj,h=l&&l.getFtnBase&&l.getFtnBase()||j&&j.getDialogWin().oFtnBase,g={mnUploaderCount:0,moFile:{}};
if(j&&j.getDialogWin().gbIsAutoSend)
{
a=true;
m.length&&(m[2]=true);
}
e[p]=l;
_getCombineFiles(e,g);
if(!e['oUncomplete'])
{
e['oUncomplete']={};
}
{
var k=g.moFile,f=60*60*24*(h&&h.mnExpiredDay||10),d=true;
for(var q in k)
{
addExistBigAttach(k[q].uploadCompleteTime+f,k[q].downloadUrl,k[q].fileName,k[q].fileId,h&&h.constructor.getFileSize(k[q].fileSize)||k[q].uploadedSize||"0",k[q].state=="complete"?100:k[q].currentPercent);
e['oUncomplete'][k[q].fileId]=k[q].fileId;
if(k[q].state=="complete")
{
delete e['oUncomplete'][k[q].fileId];
delete k[q];
}
}
for(var o in e['oUncomplete'])
{
if(!k[o])
{
n.removeSelf(n.S("BigAttach_"+o,window));
delete e['oUncomplete'][o];
}
}
if(_getUncomplete(e['oUncomplete'])>0)
{
e['nAttachTimer']=setTimeout(function(){
e.apply(null,m);
},800);
}
else{
_closeDlg();
a&&doFtnUploaded();
}
}
}
;function _clearEditorCheckTimer()
{
if(goCompose._oErrCheckTimer)
{
clearTimeout(goCompose._oErrCheckTimer);
goCompose._oErrCheckTimer=null;
}
}
function _initButtonEvent(a)
{
var l={"card":"card","voice":"voice"}[getPageId()];
var b={"note":true}[getPageId()];
function e(r,q)
{
var s=_getSubmitForm();
var t=s.sendtime;
var v=s.verifycode;
var u=s.verifycode_cn;
if(t&&r!="keeptimer"&&(!v||!v.value)&&(!u||!u.value))
{
t.value=0;
}
if(typeof (a.onsend)=="function")
{
a.onsend.call(this,a);
}
else{
if(a.safemode&&_getSubmitForm().action.indexOf("groupmail_send")==-1)
{
alert('\u60A8\u5F53\u524D\u6B63\u5728\u4F7F\u7528QQ\u90AE\u7BB1\u53EA\u8BFB\u6A21\u5F0F\uFF0C\u90AE\u4EF6\u80FD\u6B63\u5E38\u53D1\u9001\uFF0C\u4F46\u6240\u53D1\u9001\u7684\u90AE\u4EF6\u5C06\u4E0D\u80FD\u4FDD\u5B58\u5230\u201C\u5DF2\u53D1\u9001\u201D\u6587\u4EF6\u5939\u3002');
}
doProcess(a.t||"",l||"send",b,q);
}
return false;
}
;function d()
{
goCompose._bIsUserSave=true;
if(typeof (a.onsave)=="function")
{
a.onsave.call(this,a);
}
else{
doProcess("savedraft",l||"save",b);
}
return false;
}
;function c(q)
{
var t=q.get("solarDate");
var r=getTop().QMDialog("timeSend");
var s=r&&r.S("sendtimemsg");
if(q.get("isLunar"))
{
if(s)
{
s.innerHTML=getTop().TE('\u65E5\u671F\u7B49\u540C\u4E8E&nbsp;<span class="black bold">\u516C\u5386\u7684$year$\u5E74$month$\u6708$day$\u65E5</span>&nbsp;\uFF0C\u5C4A\u65F6\u4E8E&nbsp;<span class="black bold">$hour$:$@$if($minute$<10)$@$0$@$endif$@$$minute$</span>&nbsp;\u6295\u9012\u3002').replace({year:t.getFullYear(),month:t.getMonth()+1,day:t.getDate(),hour:t.getHours(),minute:t.getMinutes()});
}
}
else{
if(s)
{
s.innerHTML=getTop().T('\u672C\u90AE\u4EF6\u5C06\u5728&nbsp;<span class="black bold">$time$</span>&nbsp;\u6295\u9012\u5230\u5BF9\u65B9\u90AE\u7BB1\u3002').replace({time:getTop().QMTimeLang.formatRefer(t)});
}
}
p(t);
}
;function p(q)
{
getInputObj("sendtimeyear").value=q.getFullYear();
getInputObj("sendtimemonth").value=q.getMonth()+1;
getInputObj("sendtimeday").value=q.getDate();
getInputObj("sendtimehour").value=q.getHours();
getInputObj("sendtimemin").value=q.getMinutes();
}
function f(s,q,r)
{
var v=getTop();
r=(typeof (r)=="undefined"?0:r);
if(!q&&!doProcessCheck("",l||"send",r,function(w){
f(s,false,w);
}))
{
return;
}
v.loadJsFile(v.getPath("js")+v.getFullResSuffix("qmlunar.js"),true);
v.loadJsFile(v.getPath("js")+v.getFullResSuffix("qmdatectrl.js"),true);
var u=_getSubmitForm().sendtimetip,t=null;
new v.QMDialog({sId:"timeSend",sBodyHtml:v.T(['<div class="cnfx_content">','<div style="_zoom:1; padding-left:4px;margin-bottom:10px;">$tip$<span id="sendTimeType"></span></div>','<div id="sendTimeContainer" style="margin:6px 0 8px;font-family:Tahoma"><span style="padding-left:4px;">\u52A0\u8F7D\u4E2D...</span></div>','<div class="clr"></div>','<div class="addrtitle" id="sendtimemsg" style="margin-top:20px;padding-left:4px;"></div>','</div>']).replace({tip:u&&u.value||"\u9009\u62E9\u5B9A\u65F6\u53D1\u9001\u7684\u65F6\u95F4\uFF1A"}),sFootHtml:(['<input class="btn_blue btn_input" id="confirm" type="button" md="0" nocheck="true" initlized="true" value="\u786E\u5B9A" />','<input class="btn_gray btn_input" id="cancel" type="button" md="0" nocheck="true" initlized="true" value="\u53D6\u6D88"/>']).join(""),sTitle:"\u5B9A\u65F6\u53D1\u9001",nWidth:487,nHeight:'auto',onshow:function(){
this.S("cancel").focus();
},onload:function(){
var w=this;
v.addEvent(w.S("confirm"),"click",function(){
var x=Math.floor((t.get("solarDate")-v.now())/(60*1000));
if(x<0)
{
return v.showError("\u60A8\u8BBE\u7F6E\u7684\u5B9A\u65F6\u65F6\u95F4\u5DF2\u7ECF\u8FC7\u671F");
}
if(x<5)
{
return v.showError("\u60A8\u8BBE\u7F6E\u7684\u5B9A\u65F6\u65F6\u95F4\u8DDD\u79BB\u60A8\u8981\u53D1\u9001\u7684\u65F6\u95F4\u592A\u8FD1\u4E86");
}
w.S("confirm").setAttribute("selected","true");
w.close();
});
v.addEvent(this.S("cancel"),"click",function(){
w.close();
});
},onbeforeclose:function(){
var x=this;
if(x.S("confirm").getAttribute("selected")=="true")
{
getInputObj("sendtime").value=1;
setTimeout(function(){
e("keeptimer",true);
});
}
else{
var w=getPageEditor();
w&&w.focus();
}
return true;
}});
v.waitFor(function(){
return v.Lunar&&v.QMDateCtrl;
},function(x){
if(!x)
{
v.loadJsFile(v.getPath("js")+v.getFullResSuffix("qmlunar.js"),true);
v.loadJsFile(v.getPath("js")+v.getFullResSuffix("qmdatectrl.js"),true);
return;
}
if(!getInputObj("sendtimeyear").value)
{
p(new Date(v.now()+3600*1000));
}
var y=v.QMDialog("timeSend");
var w=y&&y.S("sendTimeType");
if(w)
{
w.innerHTML=v.T('(<input type="radio" name="dateType" id="solar_radio" checked/><label for="solar_radio">\u516C\u5386</label><input type="radio" name="dateType" id="lunar_radio"/><label for="lunar_radio">\u519C\u5386</label>)');
}
v.E(w.getElementsByTagName("input"),function(A){
var B=A.id=="lunar_radio";
A.onclick=function(){
t.changeDateType(B,"sameday");
};
});
var z=y&&y.S("sendTimeContainer");
if(z)
{
z.innerHTML="";
}
t=new v.QMDateCtrl({container:z,type:v.QMDateCtrl.LUNAR_LEAP_SUPPORT,year:{current:getInputObj("sendtimeyear").value,end:parseInt(getInputObj("sendtimeyear").value)+2},month:{current:getInputObj("sendtimemonth").value},day:{current:getInputObj("sendtimeday").value},hour:{current:getInputObj("sendtimehour").value},minute:{current:getInputObj("sendtimemin").value},onchange:function(A){
c(A);
}});
c(t);
});
return false;
}
;function o(q)
{
return function(r){
r.onclick=q;
};
}
;getTop().E(getTop().SN("sendbtn",window),o(e));
getTop().E(getTop().SN("savebtn",window),o(d));
getTop().E(getTop().SN("timeSendbtn",window),o(f));
var k=getTop(),j=k.S("noletter",window);
if(j)
{
j.onclick=function(){
var r=getPageEditor(),s=r.getContentObj("QQMAILSTATIONERY");
if(r.getContentType()=="html"&&s)
{
var q=getTop().GelTags("includetail",r.getEditWin().document)[0];
r.setContent(s.innerHTML+(q?q.innerHTML:""));
r.focus();
}
else{
useStationery();
this.checked=false;
r.focus();
}
};
}
var i=k.S("mobile_email",window);
if(i)
{
var m=k.getDefaultSender(),n=_getOneSender("phone","1"),g;
if(n)
{
g=function(){
if(i.checked)
{
k.confirmBox({msg:k.T("<b>\u662F\u5426\u4E34\u65F6\u6539\u7528$email$\u6765\u53D1\u4FE1?</b><div class='addrtitle'>\u5BF9\u65B9\u56DE\u4FE1\u5230\u6B64\u5730\u5740\uFF0C\u76F8\u5E94\u624B\u673A\u4E0A\u4F1A\u7ACB\u5373\u6536\u5230\u77ED\u4FE1\u63D0\u9192\u3002</div>").replace({email:n}),width:450,onreturn:function(r){
if(r)
{
goCompose.oQmSender.setSenderSelected(n);
k.showInfo(k.T("\u5C06\u4F7F\u7528$email$\u53D1\u4FE1\uFF0C\u6B64\u5730\u5740\u6536\u5230\u90AE\u4EF6\u4F1A\u63D0\u9192\u5230\u624B\u673A\u3002").replace({email:n}));
k.ossLog("delay","all","stat=nothing&locval=,,mobileemailclick,1");
}
else{
i.checked=false;
}
}});
}
else{
var q=(m==n)?_getOneSender("phone","0"):m;
if(q)
{
goCompose.oQmSender.setSenderSelected(q);
k.showInfo(k.T("\u5C06\u4F7F\u7528$email$\u53D1\u4FE1\uFF0C\u907F\u514D\u6536\u5230\u624B\u673A\u53F7\u90AE\u7BB1\u7684\u77ED\u4FE1\u63D0\u9192\u3002").replace({email:q}));
k.ossLog("delay","all","stat=nothing&locval=,,mobileemailclick,2");
}
else{
k.showInfo("\u60A8\u53EA\u62E5\u6709\u624B\u673A\u53F7\u90AE\u7BB1\u5E10\u53F7\uFF0C\u65E0\u6CD5\u6539\u7528\u5176\u4ED6\u5E10\u53F7\u5730\u5740\u6765\u53D6\u6D88\u63D0\u9192");
i.checked=true;
}
}
};
}
else{
g=function(){
k.ossLog("delay","all","stat=nothing&locval=,,mobileemailclick,0");
k.confirmBox({msg:"<b>\u60A8\u9700\u8981\u5148\u6CE8\u518C\u624B\u673A\u53F7\u90AE\u7BB1\uFF0C\u624D\u80FD\u5F00\u542F\u6B64\u529F\u80FD\u3002</b><div class='addrtitle'>\u624B\u673A\u53F7\u90AE\u7BB1\u53CA\u9644\u5C5E\u77ED\u4FE1\u63D0\u9192\u90FD\u662F\u514D\u8D39\u7684\u3002<br>\u5F00\u901A\u540E\u5728\u4E0B\u6B21\u5199\u4FE1\u65F6\u624D\u53EF\u4F7F\u7528\u63D0\u9192\u529F\u80FD\u3002</div>",width:430,confirmBtnTxt:"\u5F00\u901A\u624B\u673A\u53F7\u90AE\u7BB1",cancelBtnTxt:"\u4E86\u89E3\u8BE6\u60C5",neverBtnTxt:"\u5173\u95ED",onload:function(){
this.S("cancel").onclick=function(){
window.open("http://service.exmail.qq.com/cgi-bin/help?subtype=1&&id=8&&no=1000605");
};
},onreturn:function(r,q,s){
if(r)
{
k.goNewWin(k.T("/cgi-bin/register?sid=$sid$&action=phonelist&t=phone_alias_reg1&vipfun=phone&loc=register,mail,phone,2").replace({sid:k.getSid()}),false,true);
}
i.checked=false;
}});
};
}
i.onclick=g;
i.checked=(m==n);
}
var h=getTop().S("secmailcode",window);
if(h)
{
h.onclick=function(){
if(h.value)
{
h.value="";
h.checked=false;
getTop().show(getTop().S("encrypt_mail_tips",window),false);
}
else{
new k.QMDialog({sid:"encryptdlg",sTitle:"\u90AE\u4EF6\u52A0\u5BC6",sBodyHtml:k.TE(['<div class="cnfx_content" style="line-height:1.6;">','<div style="border-bottom:1px solid #E4E4E4; margin:0 0 15px; padding:0 0 15px;">\u8BBE\u7F6E\u90AE\u4EF6\u52A0\u5BC6\u4E4B\u540E\uFF0C\u6536\u4EF6\u4EBA\u9700\u8981\u89E3\u5BC6\u540E\u624D\u80FD\u67E5\u770B\u90AE\u4EF6\u5185\u5BB9\u3002<br/>\u66F4\u591A\u4FE1\u606F\uFF0C\u8BF7\u67E5\u770B<a href="http://service.exmail.qq.com/cgi-bin/help?subtype=1&&no=1000888&&id=23" target="_blank">\u4F01\u4E1A\u90AE\u7BB1\u52A0\u5BC6\u90AE\u4EF6</a>\u3002</div>','<div style="margin-top:12px;"><label>\u8F93\u5165\u5BC6\u7801: <input class="dialog_input" type="password" id="pw1" value="" style="width:220px;margin:0;"/></label></div>','<div style="margin-top:12px;"><label>\u786E\u8BA4\u5BC6\u7801: <input class="dialog_input" type="password" id="pw2" value="" style="width:220px;margin:0;"/></label></div>','</div>']).replace({}),sFootHtml:['<a id="ok" class="btn_blue" initlized="true" md="0" href="javascript:;" nocheck="true">\u786E\u5B9A</a>','<a id="cancel" md="0" nocheck="true" initlized="true" class="btn_gray" href="javascript:;">\u53D6\u6D88</a>'].join(""),nHeight:'auto',nWidth:400,onclose:function(){
if(!h.value)
{
h.checked=false;
}
},onshow:function(){
this.S("pw1").focus();
},onload:function(){
var q=this;
q.S("ok").onclick=function(){
var r=q.S("pw1"),s=q.S("pw2");
if(!r.value)
{
r.focus();
getTop().showError("\u8BF7\u8F93\u5165\u5BC6\u7801");
}
else if(!s.value)
{
s.focus();
getTop().showError("\u8BF7\u8F93\u5165\u5BC6\u7801");
}
else if(r.value!=s.value)
{
r.focus();
getTop().showError("\u5BC6\u7801\u4E0D\u4E00\u81F4\uFF0C\u8BF7\u91CD\u65B0\u786E\u8BA4");
}
else{
h.value=r.value;
getTop().show(getTop().S("encrypt_mail_tips",window),true);
q.close();
}
};
q.S("cancel").onclick=function(){
q.close();
};
}});
}
};
}
}
function _getOneSender(a,b)
{
var c=getTop().getDefalutAllMail();
for(var e in c)
{
var d=c[e];
if(d[a]==b)
{
return d.email;
}
}
}
function _initEditorForQfCompose(b,a)
{
var c=function(){
var e=getTop(),d=getPageEditor();
a.oMailInfo&&setComposeData(a.oMailInfo);
_initButtonEvent(a);
_showEditorToolBar(true);
setNeedCloseConform(true);
autoSave(false);
_setEditorPageEvent();
S("subject").focus();
};
getTop().QMEditor.createEditor({editorId:b,editorAreaWin:window,funclist:getTop().QMEditor.CONST.FUNCLIST.QF_COMPOSE,photoCGI:getTop().getPhotoCGI(),customtags:_getCustomTagList(),onload:c,onfocus:_fixStationeryFocus,onmousedown:_doEditorMouseDown,onclick:_fixStationeryClick,onbeforesaverange:_fixStationeryClick,onkeydown:_composeKeyDown,onpaste:_pasteUrlAnalyse,onputcontent:_fixBodyPadding,onchangecontenttype:_onChangeContentTypeEvent,onchangebgmusic:_changeEditorBgMusic,onshowinstallactive:showInstallActiveXDialog,onpreview:_showPreview,onuploademl:uploadComposeEml}).initialize(a.source,false,3);
_autoResizeEditor();
}
function _initEditorForComposePage(b,a)
{
var f=this;
var h=getTop().GelTags("player",getTop().S("source",window));
var e={};
if(h&&h.length>0&&h[0].id.toLowerCase()=="cmd:bgmusic")
{
var g=h[0];
e.url=g.getAttribute("url");
e.song=decodeURIComponent(g.getAttribute("song"));
e.singer=decodeURIComponent(g.getAttribute("singer"));
}
var d=function(){
var l=getTop(),j=getPageEditor(),k=_reloadSaveContent()||_setEditorSource(a,true);
_setSaveSendCheckBox();
if(e.song||e.url)
{
j.setBgMusicInfo(e.song,e.singer,e.url);
}
_initButtonEvent(a);
QMAttach.initAttBigSize(a);
var m={onproxyclose:function(){
QMAttach.hideDragAndDropContainer();
},onselect:function(p){
QMAttach.hideDragAndDropContainer();
QMAttach._moCurUploader=p[0];
QMAttach.onmgrselect(p,function(q){
if(!QMAttach.isUploading())
{
QMAttach._moCurUploadAttachArray=q;
QMAttach._upload(true);
}
else{
QMAttach._moCurUploadAttachArray=QMAttach._moCurUploadAttachArray.concat(q);
}
});
l.LogKvEx({businame:'common_stat',item:'webmail|menu|upload|click',sid:l.getSid()});
},onprocess:function(p){
var q=QMAttach._moCurUploadAttachInfo;
if(q&&p.get('sId')==q._sId)
{
var r;
if(p.get('sUploadStep')=='signing')
{
r=p.get('nSignPercent')*0.8;
}
else if(p.get('sUploadStep')=='creating')
{
r=80;
}
else if(p.get('sUploadStep')=='posting'||p.get('sUploadStep')=='waiting')
{
r=(p.get('nPercent')==0)?80:80+parseInt(p.get('nPercent'),10)/5;
}
QMAttach._uploadProgress(r||0,1);
}
},oncomplete:function(p){
var q=QMAttach._moCurUploadAttachInfo;
if(q&&(p.get("sId")==q._sId))
{
getTop().extend(q,p._moInfo);
if(!q._nSize&&p.get("nSize"))
{
q._nSize=p.get("nSize");
}
if(!q.sFileUrl&&p.get("sFileUrl"))
{
q.sFileUrl=p.get("sFileUrl");
}
QMAttach._updateExistAttachInfo(q);
var r=p.get("sFileId");
if(r)
{
q._sUploadId=r;
QMAttach._uploadProgress(100,1)._updateAttachStatus(q,"finish")._clearUploadInfo()._upload(true);
if(QMAttach._getTotalControlAttachLength()>1&&location.protocol=="http:")
{
getTop().requestShowTip("AttachFrame",31,window);
}
}
else{
QMAttach._uploadError("__response__",r);
}
}
},onerror:function(){
QMAttach._bUseNewLogic=true;
QMAttach._uploadError('__response__');
}};
var i=l.extend(a,{uploadCallBacks:m});
var o=QMAttach.useNewDragMethod();
QMAttach.initFileUpload(i);
o&&QMAttach.initFileDragUpload(i);
goCompose.oQmSender=new l.QMSender({oWin:window,nCurFolderId:a.folderid,sCurSaveFrom:a.saveFrom||l.getDefaultSender(),sWidth:180,bShowNode:"parentNode",sVerAlign:"top",onclickItemCallBack:function(p){
var q=getTop().S("mobile_email",window);
q&&(q.checked=(p.phone=="1"));
}});
if(a.encryptmail=="false"&&a.xqqstyle=="800"&&a.subtmpl=="forward")
{
setTimeout(function(){
getTop().fireMouseEvent(getTop().S("otherComposeOptionBtn",window),"click");
getTop().requestShowTip("savesendbox",78,window);
},1000);
}
_showEditorToolBar(getTop().getDefaultEditor());
getTop().show(getTop().S("editor_toolbar_btn_container",window),j.isSupportToolBar());
if(!a.pluscontent&&!(k||{}).isconfirm)
{
loadValue(true);
}
setNeedCloseConform(true);
autoSave(false);
_setEditorPageEvent();
setMultiSignatureSelect();
setOtherComposeOptionEvent();
if(typeof (a.onload)=="function")
{
a.onload(_fixStationeryFocus);
}
!o&&QMDragFile();
if(l.S("tmpl_style",j.getEditWin()))
{
useComposeTmpl();
l.show(l.S("signSelContainer",l.getMainWin()),false);
l.show(l.S("contenttype_check",l.getMainWin()),false);
var n;
if(l.location.href.indexOf("dev.exmail.qq.com")==-1)
{
n='\'//exmail.qq.com/zh_CN/htmledition/images/compose_tmpl_bg.png\'';
}
else{
n='\'//dev.exmail.qq.com/zh_CN/htmledition/images/compose_tmpl_bg.png\'';
}
j.getEditWin().document.body.style.background="url("+n+") repeat 0 0";
}
else{
(j.getEditWin().document.body.innerHTML.indexOf("tmpl_default")!=-1)&&debug("template initialize error");
}
if(l.AddrHint&&(!l.gbIsIE||(l.gbIsIE&&l.gnIEVer>8)))
{
l.addrHint=new l.AddrHint();
}
};
function c()
{
getTop().waitFor(function(){
return !a.asyncGetContent||getTop().goAsyncContent;
},function(i){
d();
},500,10000);
}
getTop().QMEditor.createEditor({editorId:b,editorAreaWin:window,funclist:getTop().QMEditor.CONST.FUNCLIST.COMPOSE,photoCGI:getTop().getPhotoCGI(),customtags:_getCustomTagList(),isOpenEditBar:true,onload:function(){
this._mbIsGuideMap=(a.bIsGuideMap=="1")||false;
f._editorOnLoader(c).apply(this,arguments);
},onfocus:_fixStationeryFocus,onmousedown:_doEditorMouseDown,onclick:_fixStationeryClick,onbeforesaverange:_fixStationeryClick,onkeydown:_composeKeyDown,onkeyup:_composeKeyUp,onblur:_composeBlur,onpaste:_pasteUrlAnalyse,onputcontent:_fixBodyPadding,onchangecontenttype:_onChangeContentTypeEvent,onchangebgmusic:_changeEditorBgMusic,onshowinstallactive:showInstallActiveXDialog,onpreview:_showPreview}).initialize(a.source||outputDataLoading(),false,3);
_autoResizeEditor();
getTop().addEvent(window,"unload",function(){
QMDragFile._addEvent(3,true);
});
}
function _initEditorForGroupPage(b,a)
{
var d=function(){
var e=_reloadSaveContent(a)||_setEditorSource(a,true);
QMAttach.initHideAttach(a);
_initButtonEvent(a);
_showEditorToolBar(getTop().getDefaultEditor());
getTop().show(getTop().S("editor_toolbar_btn_container",window),getPageEditor().isSupportToolBar());
if(!(e||{}).isconfirm)
{
loadValue(true);
}
setNeedCloseConform(true);
_setEditorPageEvent();
if(typeof (a.onload)=="function")
{
a.onload(_fixStationeryFocus);
}
QMDragFile();
};
function c()
{
getTop().waitFor(function(){
return !a.asyncGetContent||getTop().goAsyncContent;
},function(e){
d();
},500,10000);
}
getTop().QMEditor.createEditor({editorId:b,editorAreaWin:window,funclist:getTop().QMEditor.CONST.FUNCLIST.GROUP,photoCGI:getTop().getPhotoCGI(),photoConfig:{widthlimit:1024,heightlimit:1024,sizelimit:1},customtags:_getCustomTagList(),isOpenEditBar:true,onload:_editorOnLoader(c),onfocus:_fixStationeryFocus,onmousedown:_doEditorMouseDown,onclick:_fixStationeryClick,onbeforesaverange:_fixStationeryClick,onkeydown:_composeKeyDown,onpaste:_pasteUrlAnalyse,onputcontent:_fixBodyPadding,onshowinstallactive:showInstallActiveXDialog}).initialize(a.source||outputDataLoading(),false,5);
_autoResizeEditor();
getTop().addEvent(window,"unload",function(){
QMDragFile._addEvent(3,true);
});
}
function _initEditorForGroupSmsPage(b,a)
{
var x=getTop(),o=x.S("QMEditorArea",window);
if(!o)
{
return;
}
x.QMEditor.createEditor({editorId:b,editorAreaWin:window,height:x.getStyle(o,"height"),funclist:x.QMEditor.CONST.FUNCLIST.GROUP,photoCGI:x.getPhotoCGI(),photoConfig:{widthlimit:1024,heightlimit:1024,sizelimit:1},customtags:_getCustomTagList(),onload:_editorOnLoader(g),onfocus:e,onblur:d,onmousedown:_doEditorMouseDown,onkeydown:f,onpaste:f,onshowinstallactive:showInstallActiveXDialog}).initialize(a.source||outputDataLoading(),false,5);
var n=null,w=x.S('editorToolContainer',window),q,r,p,k=62,h=62,j,i,l=+o.clientHeight,m;
function g()
{
_initButtonEvent(a);
QMAttach.initHideAttach(a);
_showEditorToolBar(false);
x.show(x.S("editor_toolbar_btn_container",window),getPageEditor().isSupportToolBar());
(n=getPageEditor()).setContent('');
q=o.getElementsByTagName('iframe')[0];
r=q.contentWindow;
p=r.document;
j=+p[x.gbIsIE?'body':'documentElement'].scrollHeight;
i=+o.getAttribute('maxHeight');
o.style.height='';
x.show(x.S('smsInputHead',window),true);
x.addEvent(p.body,'click',function(y){
f(y);
});
QMDragFile();
}
;function e(y)
{
j=k;
f(y);
}
function d(y)
{
return;
}
function f(y)
{
if(y&&y.ctrlKey&&(y.keyCode==10||y.keyCode==13))
{
_composeKeyDown(y);
return;
}
setTimeout(function(){
if(!x.gbIsIE&&y.keyCode==8)
{
q.style.height=j+'px';
}
var z=r.document[x.gbIsIE?'body':'documentElement'].scrollHeight;
r.document.body.style.overflowY=(z>i?'auto':'hidden');
q.style.height=(z>i?i:(z<j?j:z))+'px';
},0);
}
window.ajustEditor=f;
var v=x.S('quickEditorContainer',window),u=x.S('fullModeLink',window),t=x.S('foldLink',window),s=x.S('expandLink',window);
if(u&&t&&s)
{
s.onclick=function(){
c(v,true,function(){
x.show(s,false);
var y=new Date();
y.setTime(y.getTime()+(300*24*3600*1000));
x.setUserCookie('QUICK_EDITOR_FOLD',1,y);
});
};
t.onclick=function(){
c(v,false,function(){
x.show(s,true);
var y=new Date();
y.setTime(y.getTime()+(300*24*3600*1000));
x.setUserCookie('QUICK_EDITOR_FOLD',0,y);
});
};
u.onclick=function(){
if(!n)
{
return;
}
var B=n.getContent().toLowerCase(),C=n.getContent(true),D=x.trim(C.replace(/&nbsp;/ig,'')),A=_getSubmitForm(),z=x.S('filecell',window),y=x.S('BigAttach',window);
if(z.innerHTML.length>10||y.innerHTML.length>10||A.mailtype.value=='vote')
{
x.confirmBox({msg:['<div style="padding:5px 10px 0 5px;"><b>',"\u5207\u6362\u5230\u5B8C\u6574\u683C\u5F0F\u4F1A\u4E22\u5931\u9644\u4EF6\u548C\u6295\u7968\u6570\u636E\u3002",'</b></div>','<div style="padding:5px;">',"\u60A8\u786E\u5B9A\u7EE7\u7EED\u5207\u6362\uFF1F",'</div>'].join(""),width:430,onreturn:function(F){
if(F)
{
E();
}
}});
}
else{
E();
}
function E()
{
if(D)
{
_createReloadInfo();
}
A.action='/cgi-bin/grouplist1?sid='+getTop().getSid();
A.target='mainFrame';
A.t.value='compose_group';
A.s.value='';
A.submit();
}
};
}
function c(A,y,z)
{
var B=getTop().qmAnimation;
B[y?'expand':'fold'](A,{durlimit:300,type:'wait',speed:'fast',oncomplete:function(){
z();
x.show(A,y);
}});
}
getTop().addEvent(window,"unload",function(){
QMDragFile._addEvent(3,true);
});
}
function _initEditorForCardPage(b,a)
{
var c=function(){
_setEditorSource(a,true,1);
_initButtonEvent(a);
_setSaveSendCheckBox();
_showEditorToolBar(getTop().getDefaultEditor());
getTop().show(getTop().S("editor_toolbar_btn_container",window),getPageEditor().isSupportToolBar());
getTop().S("sendmailname",window).value=getTop().getDefaultSender();
_setEditorPageEvent();
if(typeof (a.onload)=="function")
{
a.onload(_fixStationeryFocus);
}
};
getTop().QMEditor.createEditor({editorId:b,editorAreaWin:window,funclist:getTop().QMEditor.CONST.FUNCLIST.MO,customtags:_getCustomTagList(),onmousedown:_doEditorMouseDown,onload:_editorOnLoader(c),onkeydown:_composeKeyDown}).initialize(a.source||outputDataLoading(),false,3);
}
function initCardListPage(a,b)
{
var c=getTop();
c.extend(window,b);
loadAddress();
initComposeForPage.pageId="card";
initComposeForPage.pageConfig=a;
_initButtonEvent(a);
_setSaveSendCheckBox();
try{
c.S("sendmailname",window).value=c.getDefaultSender();
}
catch(d)
{
debug(["getDefaultSender error:",d.message]);
}
}
function _initEditorForVoicePage(b,a)
{
if(!getTop().S("QMEditorArea",window))
{
_initButtonEvent(a);
_setEditorPageEvent();
_setSaveSendCheckBox();
setNeedCloseConform(true);
if(typeof (a.onload)=="function")
{
a.onload(_fixStationeryFocus);
}
try{
getTop().S("sendmailname",window).value=getTop().getDefaultSender();
}
catch(d)
{
debug(d.message);
}
return;
}
var c=function(){
var e=getTop();
_setEditorSource(a,true);
_initButtonEvent(a);
goCompose.oQmSender=new e.QMSender({nCurFolderId:"",sCurSaveFrom:"",sWidth:210,bShowNode:"parentNode"});
_setEditorPageEvent();
_setSaveSendCheckBox();
setNeedCloseConform(true);
if(typeof (a.onload)=="function")
{
a.onload(_fixStationeryFocus);
}
};
getTop().QMEditor.createEditor({editorId:b,editorAreaWin:window,funclist:getTop().QMEditor.CONST.FUNCLIST.MO,customtags:_getCustomTagList(),onload:_editorOnLoader(c),onkeydown:_composeKeyDown}).initialize(a.source,false,3);
}
function _initForPostcardPage(b,a)
{
_editorOnLoader(function(){
_initButtonEvent(a);
_setEditorPageEvent();
_setSaveSendCheckBox();
getTop().S("sendmailname",window).value=getTop().getDefaultSender();
setNeedCloseConform(true);
})();
}
function _initEditorForQQPage(b,a)
{
var c=function(){
_initButtonEvent(a);
_setEditorSource(a,true,1);
_setSaveSendCheckBox();
_setEditorPageEvent();
if(typeof (a.onload)=="function")
{
a.onload();
}
};
getTop().QMEditor.createEditor({editorId:b,editorAreaWin:window,style:"border:none;icon:big;",funclist:{tbExtern:"Mo PhotoOld"},photoCGI:getTop().getPhotoCGI(),customtags:_getCustomTagList(),onload:_editorOnLoader(c),onfocus:_fixStationeryFocus,onmousedown:_doEditorMouseDown,onclick:_fixStationeryClick,onbeforesaverange:_fixStationeryClick,onkeydown:_composeKeyDown,onputcontent:_fixBodyPadding}).initialize(a.source||outputDataLoading(),false,5);
}
function _initEditorForReadMailGroupPage(b,a)
{
var c=function(){
this.setContent(getTop().QMEditor.getBreakLine(1));
_setEditorPageEvent();
if(typeof (a.onload)=="function")
{
a.onload();
}
_clearEditorCheckTimer();
setTimeout(function(){
focusPageEditor(0);
});
};
getTop().QMEditor.createEditor({editorId:b,editorAreaWin:window,funclist:{tbExtern:"Mo"},customtags:_getCustomTagList(),onmousedown:_doEditorMouseDown,onload:c,onkeydown:_composeKeyDown}).initialize(a.source,false);
}
function _initEditorForNoteFirstPage(b,a)
{
getTop().QMEditor.createEditor({editorId:b,editorAreaWin:window,height:a.height||getTop().getStyle(getTop().S("QMEditorArea",window),"height"),onmousedown:_doEditorMouseDown,onkeydown:_composeKeyDown,onpaste:function(){
callBack.call(this,a.onpaste);
},onfocus:function(){
if(this.getContent(true)==getNoteFirstPageSource(true,a.sDefaultText))
{
this.setContent(getTop().QMEditor.getBreakLine());
this.focus(0);
}
},onblur:function(){
var c=this.getContent().toLowerCase();
if(!c||c==getTop().QMEditor.getBreakLine().toLowerCase())
{
this.setContent(getNoteFirstPageSource(false,a.sDefaultText));
}
},onload:function(){
if(typeof (a.onload)=="function")
{
a.onload(_fixStationeryFocus);
}
_clearEditorCheckTimer();
}}).initialize(getNoteFirstPageSource(false,a.sDefaultText),false);
}
function _initEditorForNotePage(b,a)
{
var e=getTop();
var d=function(){
_initButtonEvent(a);
if(a.isPaste)
{
getPageEditor().setContent("");
getPageEditor().paste();
}
else if(a.isReadCache)
{
var g=getTop().getGlobalVarValue("NOTE_CONTENT_CACHE");
if(g)
{
getPageEditor().setContent(g);
}
}
else if(a.asyncGetContent||e.goAsyncContent)
{
var f=e.S("subject",window);
if(f)
{
f.value=e.goAsyncContent.subject;
f.focus();
}
getPageEditor().setContent(e.goAsyncContent.content);
}
else{
getPageEditor().setContent(filterSourceContent(getTop().S("source",window).innerHTML)||getTop().QMEditor.getBreakLine());
}
_showEditorToolBar(getTop().getUserCookieFlag("CCSHOW")[3]==1?true:false);
getTop().show(getTop().S("editor_toolbar_btn_container",window),getPageEditor().isSupportToolBar());
loadValue(true);
setNeedCloseConform(true);
autoSave(false);
_setEditorPageEvent();
_clearEditorCheckTimer();
if(typeof (a.onload)=="function")
{
a.onload(_fixStationeryFocus);
}
};
function c()
{
getTop().waitFor(function(){
return !a.asyncGetContent||getTop().goAsyncContent;
},function(f){
d();
},500,10000);
}
getTop().QMEditor.createEditor({editorId:b,editorAreaWin:window,funclist:getTop().QMEditor.CONST.FUNCLIST.NOTE,photoCGI:getTop().getPhotoCGI(),onload:c,onmousedown:_doEditorMouseDown,onkeydown:_composeKeyDown,onpaste:_pasteUrlAnalyse,onchangecontenttype:_onChangeContentTypeEvent,onshowinstallactive:showInstallActiveXDialog}).initialize(a.source||outputDataLoading(),false,5);
_autoResizeEditor();
}
function _initForReadmailConv(b,a)
{
var c=function(){
_showEditorToolBar(getTop().getUserCookieFlag("CCSHOW")[3]==1?true:false);
getTop().show(getTop().S("editor_toolbar_btn_container",window),getPageEditor().isSupportToolBar());
loadValue(true);
setNeedCloseConform(true);
_setEditorPageEvent();
_clearEditorCheckTimer();
if(typeof (a.onload)=="function")
{
a.onload(_fixStationeryFocus);
}
setTimeout(focusPageEditor);
};
getTop().QMEditor.createEditor({editorId:b,editorAreaWin:window,funclist:getTop().QMEditor.CONST.FUNCLIST.NOTE,photoCGI:getTop().getPhotoCGI(),onload:c,onmousedown:_doEditorMouseDown,onkeydown:_composeKeyDown,onpaste:_pasteUrlAnalyse,onchangecontenttype:_onChangeContentTypeEvent,onshowinstallactive:showInstallActiveXDialog}).initialize("",false,5);
_autoResizeEditor();
}
function _initForRemindPage(b,a)
{
_editorOnLoader(function(){
_initButtonEvent(a);
_setEditorPageEvent();
})();
}
function _getCustomTagList()
{
return ["sign","qzone","includetail"];
}
function _editorOnLoader(a)
{
return function(){
_clearEditorCheckTimer();
getTop().waitFor(function(){
try{
return ((getTop().getDefaultEditor()==undefined)?false:true);
}
catch(b)
{
return false;
}
},a,50);
};
}
function getPageId()
{
return initComposeForPage.pageId;
}
function getPageConfig()
{
return initComposeForPage.pageConfig;
}
function getPageEditor()
{
return getTop().QMEditor&&getTop().QMEditor.getEditor(getPageId());
}
function _insertEditorImage(c,a,b)
{
try{
var f=getTop().S('QMEditorArea',getTop().getMainWin()),g=f.getElementsByTagName('iframe')[0].contentDocument;
if(g)
{
g.body.focus();
g.execCommand('insertImage',false,c);
g.execCommand('insertHTML','<br><br>');
}
}
catch(d)
{
}
}
function attachInsertImage(c,b)
{
var a=getTop();
_oWin=a.getMainWin();
_oEditor=getPageEditor();
if(_oEditor.getContentType()=="text")
{
getTop().confirmBox({msg:"\u65E0\u6CD5\u6DFB\u52A0\u56FE\u7247\u5230\u7EAF\u6587\u672C\uFF0C\u60A8\u662F\u5426\u6539\u7528\u5BCC\u6587\u672C\u7F16\u8F91\uFF1F",title:"\u63D0\u793A",onreturn:function(d){
if(d)
{
var e=getPageEditor();
e.changeContentType("html");
getTop().S("contenttype",_oWin).checked=false;
_oWin.setTimeout(function(){
_insertEditorImage(c,b,e);
},100);
}
}});
}
else{
_insertEditorImage(c,b,_oEditor);
}
return false;
}
function attachInsertFile(b,a)
{
var e=getTop();
var d=QMAttach.getExistInfos()[a]||QMAttach.getExistInfos()[b];
var c=new QMAttach._qmTmpFile(d);
var f=c.sFileUrl||_getPreviewView(c);
if(c.get('nSize')>1024*1024&&f.indexOf('&filetype=txt&')!=-1)
{
return e.showError('\u8BFB\u53D6\u6587\u6863\u5185\u5BB9\u5931\u8D25\uFF0C\u6682\u65E0\u6CD5\u5BFC\u5165');
}
doAttachInsertFile(f);
return false;
}
function existAttachInsertFile(g,f,d,e)
{
var b=getTop();
var a=new QMAttach._qmTmpFile({sName:g,mailid:f,composepath:d,attachname:g,attachid:e});
var c=_getPreviewView(a);
doAttachInsertFile(c);
return false;
}
function doAttachInsertFile(a)
{
var c=this;
var e=getTop();
var d=c.getPageEditor();
function b()
{
if(d.getContentType()!='html')
{
e.showError('\u6587\u672C\u7F16\u8F91\u5668\u4E0D\u652F\u6301\u5BFC\u5165');
return false;
;
}
return true;
}
if(!b())
{
return;
}
if(a.indexOf("t=attachments_simple")==-1)
{
if(a.indexOf("&t=")>-1||a.indexOf("?t=")>-1)
{
a=a.replace(/t=([^&]*)/,"t=attachments_simple");
}
else{
a+="&t=attachments_simple";
}
}
a=a.replace('/cgi-bin/viewfile','/cgi-bin/readtemplate');
a+='&not302=yes&filter=false';
if(a.indexOf('&filetype=pdf&')!=-1)
{
a+='&firstpage=1&lastpage=999';
}
e.showProcess(1,true,"\u6B63\u5728\u8BFB\u53D6\u6587\u6863\u5185\u5BB9...",null,false);
e.QMAjax.send(a,{onload:function(f,h){
if(f&&h&&(''+h).indexOf('<!--cgi exception-->')!==0)
{
function g(k,j)
{
if(!b())
{
return;
}
if(_appendEditorFileContent(k,d,j)!==true)
{
e.showError('\u8BFB\u53D6\u6587\u6863\u5185\u5BB9\u5931\u8D25\uFF0C\u6682\u65E0\u6CD5\u5BFC\u5165');
}
e.showProcess(0);
}
if(!e.trim(h))
{
e.showError('\u8BFB\u53D6\u5185\u5BB9\u5931\u8D25\uFF0C\u6216\u6587\u6863\u5185\u5BB9\u4E3A\u7A7A');
return;
}
if(h.indexOf("qmbox")==-1)
{
if(a.indexOf('/cgi-bin/readtemplate')!=-1)
{
g(h,a.indexOf('&filetype=html')==-1);
return;
}
var i=e.evalValue(h);
if(i.ret)
{
if(i.ret=="-9006")
{
e.showError("\u6587\u6863\u88AB\u52A0\u5BC6\uFF0C\u5BFC\u5165\u5931\u8D25");
}
else{
e.showError('\u672A\u77E5\u9519\u8BEF\uFF0C\u83B7\u53D6\u6587\u6863\u4FE1\u606F\u5931\u8D25');
}
return;
}
}
if(!b())
{
return;
}
e.getOfficeRealContent(h,{onload:function(j,k){
if(j)
{
g(k);
}
else{
e.ossLog('delay','all','stat=import_word&type=attach|input_error|office_read');
e.showError('\u8BFB\u53D6\u6587\u6863\u5185\u5BB9\u5931\u8D25');
}
},charset:'UTF8'});
}
else{
e.showError('\u8BFB\u53D6\u6587\u6863\u5931\u8D25');
e.ossLog('delay','all','stat=import_word&type=attach|input_error|cgi'+(f?'_http':'_err'));
}
}});
}
function getInputObj(c,b,a)
{
var d=b||_getSubmitForm();
if(!d)
{
return null;
}
var e=d[c];
if(!e)
{
getTop().insertHTML(d,"afterBegin",getTop().T('<input name="$name$" type="hidden" $disabled$/>').replace({name:c,disabled:a?"disabled":""}));
e=d[c];
}
return e;
}
function focusPageEditor(b,a)
{
var c=getPageEditor();
if(c)
{
c.focus(b||0,c.getContentObj(a||"QQMAILSTATIONERY"));
}
}
function changeContentType(a)
{
if(!getPageEditor().changeContentType(a.checked?"text":"html"))
{
a.checked=!a.checked;
}
}
function _onChangeContentTypeEvent()
{
var a=this.getContentType()!="html",b=getTop();
if(a)
{
(b.S("noletter",window)||{}).checked=false;
getPageEditor().setBgMusicInfo();
}
b.S("contenttype",window).checked=a;
b.show(b.S("QMEditorToolBarPlusArea",window),!a);
b.show(b.S("editor_toolbar_btn_container",window),!a);
}
function outputDataLoading(a)
{
return getTop().T(['<div class="$className$" style="$height$font-size:12px;color:gray;$padding$">\u6570\u636E\u52A0\u8F7D\u4E2D...</div>']).replace({className:a?"QMEditorBase":"",padding:a?"padding:5px;":"",height:a?"height:100%;":""});
}
function outputToolBarControlBtn(a)
{
return getTop().T(['<span id="$id$" style="display:none;" unselectable="on" onmousedown="return false;">','<input type="button" style="cursor:pointer;background:url($imgpath$newicon/compose.png) -112px 0;','width:16px;height:16px;border:none;padding:0;margin:0 2px 0 -3px;*margin:0 2px 0 0;vertical-align:middle!important;vertical-align:auto;text-decoration:none;" ','unselectable="on" onmousedown="return false;" />','<a  href="javascript:;">','\u6587\u5B57\u683C\u5F0F<span>\u2191</span><span style="display:none;" >\u2193</span>','</a>','</span>']).replace({imgpath:getTop().getPath("image"),id:a||"editor_toolbar_btn_container",path:getTop().getPath("editor")});
}
function filterSourceContent(a)
{
return getTop().filteScript(a.replace(/<div id=\'?\"?QQMailBgMusicInfo\'?\"?.*?>.*?<\/div>/ig,"").replace(/<player .*?><\/player>/ig,"").replace(/(^\s+)|(\s+$)/ig,""));
}
function _setEditorSource(c,a,b)
{
if(a&&c.subtmpl!="draft"&&c.subtmpl!="background")
{
_filteStationeryAndCard();
}
var i=getTop().S("source",window)&&getTop().S("source",window).innerHTML,h=getTop().getSignature(c.folderid,c.saveFrom),d=c.subtmpl=="draft"||c.subtmpl=="content"||c.subtmpl=="background",f=[],g=getPageEditor();
if(!d&&c.subtmpl!="cliwrite")
{
if(c.pluscontent)
{
f.push(c.pluscontent,getTop().QMEditor.getBreakLine(1));
}
else{
f.push(getTop().QMEditor.getBreakLine(b||(getTop().filteSignatureTag(h)?2:1)));
}
f.push(h);
}
if(!c.isNoInclude&&i&&(c.subtmpl=="draft"||c.subtmpl=="background"))
{
f.push(getTop().filteSignatureTag(i,"2LOWCASE"));
}
if(!d&&(getPageId()=="compose"||getPageId()=="qq"))
{
f=[getTop().getDetaultStationery("Header"),f.join(""),getTop().getDetaultStationery("bottom")];
if(!!getTop().getDetaultStationery("Header"))
{
getTop().requestShowTip("editor_toolbar_btn_container","45",window);
}
}
if(!c.isNoInclude&&i&&c.subtmpl!="draft"&&c.subtmpl!="background")
{
i=filterSourceContent(getTop().filteSignatureTag(i));
if(i)
{
f.push(["<div><includetail>",i,"</includetail></div>"].join(""));
}
}
if(!d)
{
g.setDefaultFontInfo(getTop().getGlobalVarValue("DEF_FONT_FAMILY"),getTop().getGlobalVarValue("DEF_FONT_SIZE"),getTop().getGlobalVarValue("DEF_FONT_COLOR"));
}
var f=filterSourceContent(f.join(""));
try{
f=filterComposeContent(f);
}
catch(j)
{
}
g.setContent(f);
if(getTop().gbIsEdge)
{
var k=document.createRange();
k.selectNode(g.getEditWin().document.body.firstChild);
g._setRange(k);
}
}
function filterComposeContent(a)
{
var b=getTop(),d=document.createElement('div');
d.innerHTML=a;
var c=b.CN('department',d,'p');
if(c&&c[0])
{
c[0].innerHTML=c[0].innerHTML.replace(/^(&nbsp;)+\//,'');
}
return d.innerHTML;
}
function _setEditorPageEvent()
{
getTop().addEvent(document,"keydown",_composeKeyDown);
}
function _setSaveSendCheckBox()
{
var b=getTop().S("savesendbox",window);
if(b)
{
try{
b.checked=!getTop().getDefaultSaveSendbox();
}
catch(a)
{
b.checked=true;
}
}
}
function _showEditorToolBar(a)
{
var e=getTop();
a=a==null?true:a;
getPageEditor().showToolBar(a);
var d=getTop().S("editor_toolbar_btn_container",window);
if(!d)
{
return false;
}
var c=getTop().GelTags("span",d);
getTop().show(c[0],a);
getTop().show(c[1],!a);
var b=arguments.callee;
d.onclick=function(){
b(!a);
return false;
};
if(a)
{
e.LogKvEx({businame:'common_stat',item:'webmail|menu|editor|click',sid:e.getSid()});
}
}
function _changeEditorBgMusic()
{
var d=getTop();
var b=d.S("editor_bgmusic_container",window);
if(!b)
{
return;
}
if(b.getAttribute("inited")!="true")
{
b.innerHTML=d.T(['<div></div>','<div id="bg_music_listen" style="display:none;margin:4px 0 4px 0;">','<div id="mp3player_msg" ></div>','<div id="mp3player_container" style="display:none;" >\u64AD\u653E\u5668\u52A0\u8F7D\u4E2D...</div>','</div>']);
b.setAttribute("inited","true");
}
var c=this.getBgMusicInfo();
d.show(b,c);
if(!c)
{
return;
}
b.firstChild.innerHTML=d.T(['<span style="word-break:break-all;"><span class="graytext">\u80CC\u666F\u97F3\u4E50\uFF1A</span>$bgmusic$</span>','<a style="margin:0 5px 0 10px;" onclick="','if ( confirm( \x27\u60A8\u786E\u8BA4\u5220\u9664\u8BE5\u80CC\u666F\u97F3\u4E50\uFF1F\x27 ) ) {','getTop().audioStop();','getPageEditor().setBgMusicInfo();','}','">\u5220\u9664</a>','<a onclick="','tryListenBgMusic( this );','" >\u8BD5\u542C</a>']).replace({bgmusic:c.song?d.T("$song$($singer$)").replace({song:d.htmlEncode(c.song),singer:d.htmlEncode(c.singer)}):d.htmlEncode(c.url)});
d.audioStop();
d.show(d.S("mp3player_container",window),false);
d.show(d.S("mp3player_msg",window),true);
function a(e)
{
tryListenBgMusic(b.firstChild.lastChild,c.song,c.singer,e);
}
if(c.song)
{
getTop().S("mp3player_msg",window).innerHTML="\u6B4C\u66F2\u52A0\u8F7D\u4E2D...\u8BF7\u7A0D\u5019";
getTop().getMusicUrl(c.song,c.singer,function(f,e,g){
if(!getPageEditor())
{
return;
}
if(g)
{
getPageEditor().setBgMusicInfo(f,e,g);
a("open");
}
else{
getTop().S("mp3player_msg",window).innerHTML="\u6B4C\u66F2\u52A0\u8F7D\u5931\u8D25";
}
});
}
a("open");
}
function tryListenBgMusic(a,d,c,b)
{
var f=["\u8BD5\u542C","\u5173\u95ED"];
if(b!="close"&&(a.innerHTML==f[0]||b=="open"))
{
a.innerHTML=f[1];
var e=getPageEditor().getBgMusicInfo();
if(e&&e.url)
{
getTop().show(getTop().S("mp3player_container",window),true);
getTop().show(getTop().S("mp3player_msg",window),false);
setTimeout(function(){
getTop().audioPlay({url:e.url,author:e.singer,title:e.song,autoplay:true,global:true});
},200);
}
getTop().show(getTop().S("bg_music_listen",window),true);
}
else{
a.innerHTML=f[0];
getTop().audioStop();
getTop().show(getTop().S("mp3player_container",window),false);
getTop().show(getTop().S("mp3player_msg",window),true);
getTop().show(getTop().S("bg_music_listen",window),false);
}
}
function _filteStationeryAndCard(a)
{
var c,b;
if(a=="editor")
{
c=getPageEditor().getContentObj("QQMAILSTATIONERY");
b=getPageEditor().getContentObj("QqMAiLcARdWoRD");
}
else{
c=getTop().S("QQMAILSTATIONERY",window);
b=getPageEditor().getContentObj("QqMAiLcARdWoRD");
}
if(c)
{
c.id="";
}
if(b)
{
b.id="";
}
if(c||b)
{
_filteStationeryAndCard(a);
}
}
function _doEditorMouseDown(a)
{
_fixStationeryMouseDown(a);
getTop().hideMenuEvent(a);
QMAttach.hideDragAndDropContainer();
}
function _fixStationeryMouseDown(a)
{
var b=getPageEditor();
var c=b&&b.getContentObj("QQMAILSTATIONERY");
var d=a.srcElement||a.target;
if(!c||!d)
{
return;
}
if(!getTop().isObjContainTarget(c,d))
{
getTop().preventDefault(a);
if(getTop().gbIsIE)
{
setTimeout(function(){
_fixStationeryClick(a);
});
}
}
}
function _fixStationeryClick(b,a)
{
var c=getPageEditor();
var d=c&&c.getContentObj("QQMAILSTATIONERY");
if(d&&(a||!c.isSelectionInObject(d)))
{
c.focus(0,d);
}
var e=getTop().addrHint;
if(e&&typeof e.closeHint=='function')
{
e.closeHint();
}
}
function _fixStationeryFocus(a)
{
arguments.callee.editorEverFocus=true;
_fixStationeryClick(a,getTop().gbIsWebKit);
}
function _fixBodyPadding()
{
var b=this.getContentObj("QQMAILSTATIONERY"),a=getTop().S("noletter",window);
this.adjustBodyStyle("padding",b?"0":"2px 4px 0");
_fixQQMailStationery(getTop().gbIsIE?"auto":"100%");
if(a)
{
a.checked=!!b;
}
}
function _fixQQMailStationery(a)
{
try{
var e=getPageEditor().getContentTags("table");
for(var f=0,b=Math.min(e.length,50);f<b;f++)
{
var d=e[f];
if(d.className=="i")
{
d.style.width=a;
}
}
}
catch(c)
{
}
}
function _pasteUrlAnalyse(a)
{
var b=arguments.callee;
var c=getTop().S("subjectsample",window);
if((!getTop().S("subject",window).value||getTop().S("subject",window).value==(c&&c.value))&&!b._process)
{
var e=this;
var d=this.getContent(true);
setTimeout(function(){
var o=e.getContent(true);
var j=d.length;
var h=o.length;
var g=3001;
if(j>g||h>g)
{
return;
}
for(var p=0;p<j&&p<h;p++)
{
if(d.charAt(j-p-1)!=o.charAt(h-p-1))
{
break;
}
}
var k=h-p;
var f=j-p;
for(var p=0;p<j&&p<h;p++)
{
if(d.charAt(p)!=o.charAt(p))
{
break;
}
}
if(p<f)
{
f=p;
}
var n=(f==k?o:o.substring(f,k)).replace(/[\r\n]/ig,"");
if(getTop().isUrl(n))
{
var m=getTop();
var l=b._process=new m.QMAjaxRequest("/cgi-bin/geturlinfo","POST",20*1000);
l.onComplete=function(i){
var q=i.responseText;
if(q.indexOf("ok|")==0)
{
if(!getTop().S("subject",window).value||getTop().S("subject",window).value==(c&&c.value))
{
if(getTop().getMainWin().SubjectCtrl)
{
getTop().getMainWin().SubjectCtrl(1);
}
getTop().S("subject",window).value=getTop().trim(getTop().htmlDecode(q).substr(3).replace(/&#(x)?([^&]{1,5});?/g,function(r,s,t){
return String.fromCharCode(parseInt(t,s?16:10));
}).replace(/[\r\n]/g,""));
}
delete l;
}
else{
l.onError();
}
};
l.onError=function(){
delete l;
};
l.send(getTop().T('sid=$sid$&url=$url$&pageid=$id$').replace({sid:getTop().getSid(),id:getPageId(),url:encodeURIComponent(n)}));
}
},13);
}
}
function trimEditorContent(a)
{
var c=a.getContent(true);
var b=a.getContent();
return (!c||(c.replace(/ /ig,'')==''))&&b.toLowerCase().indexOf('img')==-1?"":b;
}
function noteFirstPageQuickSave()
{
if(getPageEditor().getContent(true)=="\u8BF7\u8F93\u5165\u8BB0\u4E8B\u5185\u5BB9...")
{
return getTop().showError('\u8BF7\u5148\u8F93\u5165\u5185\u5BB9',800);
}
getTop().S("content",window).value=getPageEditor().getContent();
window.unloadwarning=false;
return _getSubmitForm().submit();
}
function getNoteFirstPageSource(a,b)
{
var c=b||"\u8BF7\u8F93\u5165\u8BB0\u4E8B\u5185\u5BB9...";
return a?c:["<div style='color:#a0a0a0;font-size:14px;'>",c,"</div>"].join("");
}
function _insertWbr(b,a)
{
var d=a||12,f=b||"",e=[],c=f.length/d;
for(var g=0;g<c;g++)
{
e[g]=getTop().htmlEncode(f.substr(g*d,d));
}
return e.join("<wbr>");
}
var QMAttach={mbHideBigAttach:false,mbHideAttach:false,mnAttBigSizeIn:0,mnAttBigSizeEx:0,_mnAttToFtnSize:20,_msMode:"normal",_msWarnningTypes:"exe|msi|scr|cmd|bat|com",_mnSizeLimit:50,_mnAttachId:0,_moTmplSet:{},_moExistList:[],_moExistInfos:{},_moCurUploader:null,_moCurUploadAttachInfo:null,_moCurUploadTimeStamp:null,_moCurUploadAttachArray:null,_moDragAndDropContainer:null,_moAppletCtrl:null,_moFlashCtrl:null,_mbIsInitlized:false,_mbIsDisableControl:false,onprogress:null,onfinish:null,_msDragEnter:"\u5C06\u6587\u4EF6\u62D6\u62FD\u81F3\u6B64\u533A\u57DF",_msDragOver:"\u91CA\u653E\u9F20\u6807",_sUploadImplement:null,_bFlashUploaderStatus:false,_oCurrentFile:null,_moUploadFtnFileId:[],_bUseNewLogic:false,initHideAttach:function(a){
if(a)
{
this.mbHideBigAttach=a.hideBigAttach;
this.mbHideAttach=a.hideAttach;
}
},getFileInfo:function(b){
var j=getTop();
var i=this;
var d=function(y){
var z=j.finds("div.attsep [uploadid]",j.S("attachContainer",window));
for(var A=0,B=z.length;A<B;A++)
{
if(j.attr(z[A],"uploadid")==y)
{
return z[A];
}
}
return;
},c=function(y){
return j.parents("div.attsep",y)[0];
},e=function(y){
return "txt,html".indexOf(j.getFileTypeByExt(y||""))>-1;
},h,f=d(b);
if(f&&j.attr(f,"attachtype")=="big")
{
var m=j.attr(f,"fid"),n=j.attr(f,"key"),l=j.attr(f,"code"),o=j.attr(f,"downloadlink");
var k=j.attr(f.parentNode,"appid");
if(!k&&b)
{
var x=b.indexOf('/');
if(x>-1)
{
k=b.substr(0,x);
}
}
h={};
h.yozo=j.gbUseYozo?1:0;
h.sAttachId_=b;
h.sName=j.attr(f,'filename');
h.sFrom="bigattach";
h.sSuffix=j.getFileExt(h.sName);
h.sType=j.getViewTypeByExt(h.sSuffix);
h.sFileType=j.getFileTypeByExt(h.sSuffix||"");
h.sUrl=o||({"doc":j.TE(["/cgi-bin/ftnfilefunc?sid=$sid$&code=$code$&k=$k$&oper=$oper$","&appid=$appid$&t=$t$&nocheckframe=true&s=yozo&fromattach=1","&ftnpreviewtype=$type$&filename=$filename$&nofixedname=$@$eval getTop().htmlEncode($filename$)$@$&ef=qfunc","&filetype=$filetype$&viewtype=$viewtype$"]),"compress":j.TE(["/cgi-bin/ftnviewcompress?sid=$sid$&cpsfile=$@$eval getTop().encodeURI($filename$)$@$","&fid=$fid$&filetype=$filetype$&action=list&t=cps.json&fromattach=1&k=$k$&code=$code$"])}[h.sType]||j.T("/cgi-bin/ftnDownload302?sid=$sid$&fid=$fid$&code=$code$&k=$k$")).replace({oper:"doc,xls,ppt,docx,xlsx,pptx,pdf,eml,pps,rtf,docm,dot,dotx,dotm,".indexOf(h.sSuffix+",")!=-1?"htmlopen":"view",sid:j.getSid(),code:l,fid:m,k:n,t:h.sSuffix=="eml"?"preview_eml":"attachments_content",type:h.sType,filetype:h.sFileType,filename:encodeURIComponent(h.sName),appid:k||72,viewtype:h.sSuffix=="eml"?"eml":""});
}
else if(i._getExistAttachInfo(b))
{
var w=i._getExistAttachInfo(b);
var a=new i._qmTmpFile(w);
if(a.get("sId")==b)
{
var v=a.get("sUploadMode")=="collection"?"collection":"attach",u,p;
if(v=="collection")
{
p=[a.get("mailid"),a.get("attachid"),a.get("attachname")].join("|");
}
else{
u=a.get("sFileId");
}
var q=a.get("sName"),r=j.getFileExt(q),t=j.getViewTypeByExt(r),s;
switch(t)
{case "compress":
s="cps.json";
break;
case "doc":
if(r=="eml")
{
s="preview_eml";
}
else{
s="attachments_content";
}
break;
default:
s="";
break;
}h={};
h.yozo=j.gbUseYozo?1:0;
h.sAttachId_=b;
h.sName=q;
h.sFrom="attach";
h.sSuffix=r;
h.sType=t;
h.sFileType=j.getFileTypeByExt(h.sSuffix||"");
h.sUrl=a.get("sFileUrl")||j.T(['/cgi-bin/$appname$?sid=$sid$&upfilelistitem=$upfileid$&mailattach=$mailattach$','&filename=$filename$&t=$t$&readprev=$compose$&filepath=$filepath$','&action=$action$$viewdocparam$&filetype=$filetype$&viewtype=$viewtype$&nf=$nf$']).replace({sid:j.getSid(),appname:{"txt":"viewfile","html":"viewfile","eml":"viewdocument"}[h.sFileType]||{"compress":"viewcompress","video":"viewfile","music":"viewfile","img":"viewfile"}[h.sType]||"viewdocument",action:h.sType=="compress"?"list":(e(h.sSuffix)?"view":""),compose:a.get("sComposePage")=="group"?a.get("sComposePage"):"normal",t:s,filetype:h.sFileType,filename:j.encodeURI(h.sName),upfileid:u,filepath:(a.get("sFilePath"))||"",mailattach:p,viewdocparam:h.sType=="doc"?"&s=yozo&fromattach=1&from=attachfolder":"",viewtype:h.sSuffix=="eml"?"eml":"",nf:a.get('sNf')||''});
}
}
else{
var g=j.finds("div.attsep [uploadid]",j.S("attachContainer",window));
j.E(g,function(y){
if(j.attr(y,"uploadid")==b)
{
var z=j.trim(j.htmlDecode(j.finds("span[ui-type='filename']",c(f))[0].innerHTML.replace(/\<.*?\>/gi,""))),A=j.getFileExt(z),C=j.getViewTypeByExt(A),B;
switch(C)
{case "compress":
B="cps.json";
break;
case "doc":
if(A=="eml")
{
B="preview_eml";
}
else{
B="attachments_content";
}
break;
default:
B="";
break;
}h={};
h.yozo=j.gbUseYozo?1:0;
h.sAttachId_=b;
h.sName=z;
h.sFrom="attach";
h.sSuffix=A;
h.sType=C;
h.sFileType=j.getFileTypeByExt(h.sSuffix||"");
h.sUrl=j.T(['/cgi-bin/$appname$?sid=$sid$&upfilelistitem=$upfileid$&mailattach=$mailattach$','&filename=$filename$&t=$t$&readprev=$compose$&filepath=$filepath$','&action=$action$$viewdocparam$&filetype=$filetype$&viewtype=$viewtype$']).replace({sid:j.getSid(),appname:{"txt":"viewfile","html":"viewfile","eml":"viewdocument"}[h.sFileType]||{"compress":"viewcompress","video":"viewfile","music":"viewfile","img":"viewfile"}[h.sType]||"viewdocument",action:h.sType=="compress"?"list":(e(h.sSuffix)?"view":""),compose:getPageId()=="group"?getPageId():"normal",t:B,filetype:h.sFileType,filename:j.encodeURI(h.sName),filepath:"",mailattach:j.encodeURI(j.finds("input[name='replymailattach']",c(y)).length&&j.finds("input[name='replymailattach']",c(y))[0].value||j.finds("input[name='mailattach']",c(y)).length&&j.finds("input[name='mailattach']",c(y))[0].value||''),viewdocparam:h.sType=="doc"?"&s=yozo&fromattach=1&from=attachfolder":"",viewtype:A=="eml"?"eml":""});
return false;
}
});
}
return h;
},preview:function(a,f){
var c=getTop();
var b=this;
var d=typeof (a)=="string"?a:c.attr(a,"uploadid");
var e=b.getFileInfo(d);
if(!e||!e.sUrl)
{
return false;
}
c.loadJsFileToTop(["$js_path$qmplayer/player.js","$js_path$com/kits/qmpreviewer/js/qmpreviewer.js"]);
c.waitFor(function(){
return c.QMPlayer&&c.QMPreviewer;
},function(g){
if(g)
{
var h=function(i){
return function(j){
var l=c.finds("div.attsep [uploadid]",c.S("attachContainer",window)),k=-1,n=j._sId||j.sAttachId_,m;
for(var o=0;o<l.length;o++)
{
if(c.attr(l[o],"uploadid")==n)
{
k=o;
break;
}
}
if(i=="prev"&&k>0)
{
m=b.getFileInfo(c.attr(l[k-1],"uploadid"));
}
else if(i=="next"&&k<l.length-1)
{
m=b.getFileInfo(c.attr(l[k+1],"uploadid"));
}
return m;
};
};
c.QMPreviewer.show(e,{fPrev:h("prev"),fNext:h("next")},{bIsShowBreakLine:false,bShowDownBtn:false});
}
});
},initAttBigSize:function(a){
if(a)
{
this.mnAttBigSizeIn=a.nAttBigSizeIn||0;
this.mnAttBigSizeEx=a.nAttBigSizeEx||0;
}
},addExistAttach:function(c,a,b){
var h=getTop(),f=h.T('<input id="$id$" name="$attachname$" value="$mailattach$" type="hidden" />'),g=c.forward,e=c.attach;
var k=h.S("fattachlist",window).value&&h.S("fattachlist",window).value.split('|')||[];
for(var m=0,d=e.length;m<d;m++)
{
var j=e[m].mailid.indexOf("@")==0?e[m].attid:(e[m].symname||e[m].attid);
if(!a)
{
h.insertHTML(a?h.S("exist_file",window):document.frm,'beforeEnd',f.replace({id:j,mailattach:[e[m].mailid,j,e[m].name].join("|"),attachname:b?"replymailattach":"mailattach"}));
}
else if(a&&!h.S(j,window))
{
if(QMAttach.getAttachSize()+QMAttach._unFormatSize(e[m].size)>QMAttach.getAttachLimit())
{
QMAttach.showAttachLimit(QMAttach.getAttachLimit());
return;
}
var l=false;
getTop().E(k,function(i){
if(i==e[m].name)
{
l=true;
}
;
});
if(!l)
{
k.push(e[m].name);
}
;h.insertHTML(a?h.S("exist_file",window):document.frm,'beforeEnd',QMAttach._getFileCellTmpl("exist").replace({id:j,value:[e[m].mailid,j,e[m].name].join("|"),viewname:e[m].name,newname:h.htmlEncode(e[m].newname),size:e[m].size,viewfileurl:e[m].viewfileurl,attachname:b?"replymailattach":"mailattach"}));
}
}
h.S("fattachlist",window).value=k.join("|");
},addExistAttach_Big:function(b,a){
var f=getTop(),e=b.bigattach,d=a?f.S("exist_BigAttach",window):f.S("BigAttach",window);
if(b.bigattach)
{
for(var g=0,c=e.length;g<c;g++)
{
!f.S("eabig_"+e[g].id,window)&&f.insertHTML(d,'beforeEnd',QMAttach._getFileCellTmpl("exist_big").replace(f.extend(e[g],{mode:a?"replaybigattach":"",ispic:(f.getViewTypeByExt(e[g].filename.split(".").pop())=="img"),sid:f.getSid()})));
}
}
},initFileUpload:function(a){
var e=getTop(),d=this,f=d._moWin,b=d._moCompose;
_oUploadMgr=QMAttach.oFileUploadMgr;
var h;
if(e&&e.QMFileAdaptor&&e.QMFileAdaptor.getNormalUploadCom&&(typeof e.QMFileAdaptor.getNormalUploadCom=="function"))
{
h=e.QMFileAdaptor.getNormalUploadCom();
}
if(!(e.QMFileAdaptor.isBrowser("ie")&&(e.gnIEVer<11)&&!window.location.host.match(/exmail\.qq\.com$/)&&!(getTop().goExpers&&getTop().goExpers.dropFlash==true))||h=='RawLocal'||h=='NoFlash')
{
e.waitFor(function(){
return !!e.QMFileUpload&&!!document.getElementById('AttachFrame');
},function(i){
if(i)
{
QMAttach._mbIsInitlized=true;
var j=e.QMFileUpload.createForFTN("popup",e.extend({oContainer:document.getElementById('AttachFrame')},a.uploadCallBacks));
if(j.name==="FlashPopupFMail")
{
QMAttach._sUploadImplement="flashFTN";
}
else if(j.name==="H5CPopupMail")
{
QMAttach._sUploadImplement="h5c";
}
else{
QMAttach._sUploadImplement="tradition";
}
}
});
}
var g="dragAndDropTrap",c=e.S(g,window);
c.onclick=function(){
var l=e.calcPos(e.S("AttachFrame",window)),k=[{sId:'drag',sItemValue:'\u62D6\u62FD\u4E0A\u4F20'}];
if((a.attachs&&a.attachs.length||a.bigattachs&&a.bigattachs.length)&&window["attachflag"]!="replyattach")
{
k.push({sId:'addExist',sItemValue:'\u6DFB\u52A0\u539F\u90AE\u4EF6\u9644\u4EF6'});
}
var i;
if(e.S("bigAttachLink",window))
{
i=e.calcPos(e.S("bigAttachLink",window))[2]+4;
}
else{
i=l[2]+(e.gbIsIE?-7:2);
}
var j=e.QMMenu(g);
if(!j||!j.isShow())
{
e.hideMenuEvent();
j=new e.QMMenu({oEmbedWin:window,sId:g,nX:l[3],nY:i,nItemHeight:21,nWidth:150,oItems:k,onitemclick:function(m){
switch(m)
{case 'drag':
if(!(getTop().QMFileUpload.oCreater.detects['Html5Drag']())&&!(getTop().QMFileUpload.oCreater.detects['ActivexDrag']()))
{
showInstallActiveXDialog();
}
else{
d._showDragAndDropContainer(true);
}
break;
case 'addExist':
d.addExistAttach({attach:a.attachs},true);
d.addExistAttach_Big({bigattach:a.bigattachs});
e.ossLog("delay","all","stat=nothing&loc=compose,rlyatt,0,0");
e.show("attachContainer",true,e.getMainWin());
window["attachflag"]="replyAllAttach";
var n=e.S("domnewRcpt",window);
e.show(n,0);
getInputObj("newrcpt",null,false).value="";
}
}});
}
return false;
};
},initFileDragUpload:function(a){
var c=getTop();
var b=this;
b._initDragAndDropContainer();
b._moFileDragUpload=c.QMFileUpload.createForFTN("drag",c.extend({oContainer:b._moDragAndDropContainer.lastChild,sDragLeaveMsg:c.detectActiveX(2,1)&&'\u5C06\u6587\u4EF6\u62D6\u62FD\u81F3\u6B64\u533A\u57DF\uFF0C\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u5FEB\u6377\u952Ectrl+c\u3001ctrl+v\u6765\u6DFB\u52A0\u9644\u4EF6\u3002'},a.uploadCallBacks));
b.initFileDragUploadEvent();
},useNewDragMethod:function(){
return !getTop().gbIsIE||(getTop().gbIsIE&&(/Trident\/[67]\./).test(navigator.userAgent));
},initFileDragUploadEvent:function(a){
var c=getTop();
var b=this;
var d=c.getMainWin();
if((!c.gbIsIE||(c.gbIsIE&&(/Trident\/[67]\./).test(navigator.userAgent)))&&(b._moFileDragUpload||b._moImgDragUpload))
{
c.addEvents([d,getPageEditor().getEditWin()],{dragleave:b._onDragLeave(),dragenter:b._onDragEnter(),drop:b._onDrop()},a);
QMDragFile.bInit=true;
}
},_onDrop:function(){
var a=this;
if(!a._mfOnDropFunc)
{
a._mfOnDropFunc=function(b){
a.hideDragAndDropContainer();
};
}
return a._mfOnDropFunc;
},_onDragEnter:function(a){
var c=getTop();
var b=this;
var d=b._moWin;
if(!b._mfOnDragEnterFunc)
{
b._mfOnDragEnterFunc=function(e){
b._mbIsDragOver=1;
if(c.QMFileUpload.oUtil.isFileDragOver(e))
{
b._showDragAndDropContainer();
d.setTimeout(function(){
d.clearTimeout(+b._mnDragTimer);
});
var f=e.dataTransfer;
if(f)
{
f.effectAllowed=f.dropEffect="none";
}
c.preventDefault(e);
}
};
}
return b._mfOnDragEnterFunc;
},_onDragLeave:function(){
var a=this;
var b=a._moWin;
if(!a._mfOnDragLeaveFunc)
{
a._mfOnDragLeaveFunc=function(c){
a._mbIsDragOver=0;
b.clearTimeout(+a._mnDragTimer);
a._mnDragTimer=b.setTimeout(function(){
if(!a._mbIsDragOver)
{
a.hideDragAndDropContainer();
}
},200);
};
}
return a._mfOnDragLeaveFunc;
},onmgrselect:function(b,a){
var e=this;
var d=e._moCompose;
var g=window;
var f=getTop();
function c()
{
f.E(b,function(h){
h.destroy();
});
}
if(!e._isAllowSelectFile())
{
c();
return;
}
e._checkExeAndZeroSize(b,function(h){
function l()
{
f.E(h,function(n){
if(QMAttach._bFlashUploaderStatus===false)
{
QMAttach._sUploadImplement="tradition";
}
if(n.get('sType').indexOf("H5C")==0)
{
QMAttach._sUploadImplement="h5c";
}
if(n.oUploader.name=='RawinputPopupMail')
{
QMAttach._sUploadImplement="rawinput";
}
if(n.oUploader.name=='Html5Drag'||n.oUploader.name=='Html5DragMail')
{
QMAttach._sUploadImplement="flashFTN";
}
debug("checking FTN logic : "+QMAttach._sUploadImplement);
e._addFileCell(QMAttach._sUploadImplement,n.get('sId'),n.get('sName'),n.get('sName'),n.get('nSize'));
});
a(h);
}
var m=0,j,k,i;
f.E(h,function(n){
var o=n.get("nSize");
if(typeof o!="undefined")
{
if(n.get("nSize")>e._mnAttToFtnSize*1024*1024)
{
j=true;
}
if(n.get("nSize")>f.QMFileUpload.oUtil.nMinDownloadFTNwidgetFileSize)
{
i=true;
}
m+=n.get("nSize");
}
});
if(e.getAttachSize('normal')+m>e.getAttachLimit())
{
k=true;
}
if(getPageId()=='qq')
{
if(k)
{
e.showAttachLimit(e.getAttachLimit());
}
else{
l();
}
}
else if((k||j)&&h[0].uploadToFtn)
{
e._confirmToFtn(h,k,j,i,function(n){
if(n)
{
if(h.length>=40)
{
getTop().showError("\u4E00\u6B21\u4E0D\u80FD\u9009\u62E9\u8D85\u8FC740\u4E2A\u6587\u4EF6");
return false;
}
var p=getTop().detectActiveX(3)||(getTop().gbIsChrome&&parseInt(getTop().gsChromeVer)>41);
if(h[0].oUploader)
{
var r=h[0].oUploader.name;
if(/H5C/.test(r))
{
p=false;
}
else if(/FlashPopup/.test(r))
{
var q=getTop().QMFileUpload.oUtil.getFlashMaxFileSizeForBurst();
var o=true;
f.E(h,function(s){
if(s.get('nSize')>q)
{
o=false;
}
});
if(o)
{
p=false;
}
}
else if(/FlashH5Drag/.test(r))
{
p=false;
}
}
if(p)
{
initFileTransporter(true);
debug('switch upload to: ftn');
}
else{
f.E(h,function(s){
s.set("bUpToFtn",true);
e._addFileCell(QMAttach._sUploadImplement,s.get('sId'),s.get('sName'),s.get('sName'),s.get('nSize'),s);
});
a(h);
debug('switch upload to: '+(h[0].oUploader?h[0].oUploader.name:'undefined'));
}
}
else if(!k)
{
l();
}
});
}
else{
l();
}
e._checkBtn();
});
},_checkExeAndZeroSize:function(b,a){
var k=getTop(),h=this,d=[],m=[],f=[],l=[],g=[],i=[];
var c=k.goUserInfo.get('DEF_FTN_MAXFILESIZE')||3*1024*1024*1024;
k.E(b,function(n){
var o=n.get("nSize");
var p=n.get("sName");
if(n.get('sStatus')=='error')
{
g.push(p);
n.destroy();
}
else if(o===0)
{
m.push(p);
n.destroy();
}
else if(o<0)
{
f.push(p);
n.destroy();
}
else if(o>c)
{
d.push(p);
n.destroy();
}
else if(h._isWarnningType(p))
{
l.push(p);
n.destroy();
}
else{
i.push(n);
}
});
b=i;
if(m.length||f.length||l.length||g.length||d.length)
{
var j=k.T(['<div class="dialog_f_t">$title$</div>','<div class="dialog_f_d addrtitle" style="width:400px;max-height:160px;_white-space:nowrap;word-wrap:break-word; word-break:break-all; overflow:hidden; text-overflow:ellipsis;">$filelist$</div>']);
var e=[];
if(m.length)
{
e.push(j.replace({title:'\u4EE5\u4E0B\u6587\u4EF6\u5927\u5C0F\u4E3A 0 \u5B57\u8282\uFF0C\u8BF7\u68C0\u67E5\u540E\u91CD\u8BD5\u3002',filelist:k.htmlEncode(m.join(", "))}));
}
if(f.length)
{
e.push(j.replace({title:'\u4EE5\u4E0B\u6587\u4EF6\u8DEF\u5F84\u8BC6\u522B\u9519\u8BEF\u6216\u8D85\u51FA\u5927\u5C0F\u9650\u5236\u3002',filelist:k.htmlEncode(f.join(", "))}));
}
if(l.length)
{
e.push(j.replace({title:'\u51FA\u4E8E\u5B89\u5168\u6027\u8003\u8651\uFF0C\u4E0D\u5141\u8BB8\u6DFB\u52A0\u4EE5\u4E0B\u53EF\u6267\u884C\u6587\u4EF6\u6587\u4EF6\u3002',filelist:k.htmlEncode(l.join(", "))}));
}
if(g.length)
{
e.push(j.replace({title:'\u4EE5\u4E0B\u6587\u4EF6\u5185\u5BB9\u8BFB\u53D6\u5931\u8D25\uFF0C\u8BF7\u5C1D\u8BD5\u538B\u7F29\u540E\u518D\u53D1\u9001',filelist:k.htmlEncode(g.join(", "))}));
}
if(d.length)
{
e.push(j.replace({title:'\u5355\u4E2A\u6587\u4EF6\u4E0D\u80FD\u8D85\u8FC7'+Math.round(c/1024/1024/1024)+'G',filelist:k.htmlEncode(d.join(", "))}));
}
k.alertBox({msg:e.join('<div style="height: 8px; width:100%;"></div>'),title:"\u786E\u8BA4",onreturn:function(){
a(b);
}});
}
else{
a(b);
}
},_confirmToFtn:function(e,c,b,a,d){
var h=getTop(),g=this;
var f=a&&h.QMFileUpload.oUtil.isNeedDownloadFTNwidget(e[0].get('sType'))&&(parseInt(h.gbIsChrome&&h.gsChromeVer||0)<42);
g.hasSend=false;
new h.QMDialog({sId:'attachAlert',sTitle:"\u9644\u4EF6\u63D0\u793A",sBodyHtml:h.TE(['<div class="dialog_function">','<span class="dialog_icon icon_info_b"></span>','<div class="dialog_f_c" style="text-align:left;">','$@$if($needDownloadFTNwidget$)$@$','<div class="bold">\u4F60\u6DFB\u52A0\u7684\u6587\u4EF6\u8F83\u5927\uFF0C\u5EFA\u8BAE\u5B89\u88C5\u63A7\u4EF6\u540E\u4F7F\u7528\u8D85\u5927\u9644\u4EF6\u4E0A\u4F20\u3002</div>','<div class="addrtitle">\u4F7F\u7528\u63A7\u4EF6\u80FD\u591F\u66F4\u52A0\u5FEB\u901F\u7A33\u5B9A\u5730\u4E0A\u4F20\u6587\u4EF6\u3002</div>','$@$else$@$','$@$if($overtotal$==1)$@$','<div class="bold" style="margin-bottom:10px;">\u4F60\u6DFB\u52A0\u7684\u9644\u4EF6\u6587\u4EF6\u603B\u5927\u5C0F\u8D85\u8FC7$totalsize$M</div>','$@$else$@$','<div class="bold" style="margin-bottom:10px;">\u4F60\u6DFB\u52A0\u7684\u9644\u4EF6\u6587\u4EF6\u4E2D\uFF0C\u6709\u4E9B\u8D85\u8FC7\u4E86$singlesize$M</div>','$@$endif$@$','\u5EFA\u8BAE\u4F60\u8F6C\u4E3A\u8D85\u5927\u9644\u4EF6\u53D1\u9001\u3002<br>','<div class="addrtitle">\u8D85\u5927\u9644\u4EF6\u4E0D\u6C38\u4E45\u4FDD\u5B58\uFF0C\u66F4\u73AF\u4FDD\uFF0C\u5BF9\u65B9\u4E5F\u53EF\u4EE5\u9AD8\u901F\u4E0B\u8F7D\u3002</div>','$@$endif$@$','</div>','</div>','<div class="dialog_operate">','<div id="dlgtype" dlgtype="$overtotal$">','$@$if($needDownloadFTNwidget$)$@$','<a href="/cgi-bin/readtemplate?t=browser_addon&kvclick=readtemplate|browser_addon|bigattach_recommend|qmattach_select&returnsid=$sid$&sid=$sid$&nocheckframe=true" class="btn_blue" id="download" nocheck="true" target="_blank" initlized="nocheck">\u7ACB\u5373\u5B89\u88C5</a>','<a href="javascript:;" class="btn_gray" id="bigAttSend" nocheck="true" initlized="nocheck">\u7EE7\u7EED\u4E0A\u4F20</a>','$@$else$@$','<a class="btn_blue btn_space" id="bigAttSend" initlized="nocheck">\u662F\uFF0C\u4F7F\u7528\u8D85\u5927\u9644\u4EF6</a>','$@$if($overtotal$==1)$@$','<a class="btn_gray" id="cancel" value="" nocheck="true" initlized="nocheck">\u4E0D\uFF0C\u53D6\u6D88\u4E0A\u4F20</a>','$@$else$@$','<a class="btn_gray" id="send" value="" nocheck="true" initlized="nocheck">\u4E0D\uFF0C\u4F7F\u7528\u666E\u901A\u9644\u4EF6</a>','$@$endif$@$','$@$endif$@$','</div>','</div>']).replace({singlesize:g._mnAttToFtnSize,totalsize:g._mnSizeLimit,oversingle:b?1:0,overtotal:c?1:0,needDownloadFTNwidget:f?1:0,sid:h.getSid()}),onshow:function(){
if(this.S("download"))
{
this.S("download").focus();
}
else if(this.S("bigAttSend"))
{
this.S("bigAttSend").focus();
}
},onload:function(){
var j=this,i=j.S("dlgtype").getAttribute("dlgtype");
h.addEvent(j.S("bigAttSend"),"click",function(k){
if(g.hasSend==false)
{
h.preventDefault(k);
h.stopPropagation(k);
d(true);
h.ossLog("delay","all","stat=nothing&locval=qmattach,toftn,1,"+i);
j.close();
g.hasSend=true;
}
});
h.addEvent(j.S("send"),"click",function(k){
if(g.hasSend==false)
{
h.preventDefault(k);
h.stopPropagation(k);
d(false);
h.ossLog("delay","all","stat=nothing&locval=qmattach,toftn,0,"+i);
j.close();
g.hasSend=true;
}
});
h.addEvent(j.S("download"),"click",function(k){
h.stopPropagation(k);
j.close();
});
h.addEvent(j.S("cancel"),"click",function(k){
h.preventDefault(k);
h.stopPropagation(k);
h.ossLog("delay","all","stat=nothing&locval=qmattach,toftn,-1,"+i);
j.close();
});
}});
},afterAddFileWithIE:function(a){
var c=getTop().createActiveX(2),e=a.name,d=a.value;
if(c)
{
var b=parseInt(c.GetFileSize(d));
if(b!=null)
{
getTop().S("SIZE"+e,window).name=b;
getTop().S("SIZE"+e,window).innerHTML="("+this._formatSize(parseInt(b))+")";
}
delete c;
}
getTop().S("S"+e,window).innerHTML=_insertWbr(d.split("\\").pop());
getTop().show(getTop().S("D"+e,window),true);
setFileNameToSubject(d);
return this._addFileCell("ie")._checkBtn();
},checkAttachWarnningType:function(){
var c=this,d=[],b=getTop().S("exist_file",window),a=b?b.childNodes:[];
getTop().E(a,function(e){
if(e.tagName=="DIV")
{
var f=getTop().S("eas_"+e.id.split("_").pop(),window),g=f&&(f.innerText||f.textContent)||"";
if(c._isWarnningType(g))
{
d.push(c._subFileName(g));
}
}
});
getTop().E(c._moExistList,function(e){
var f=getTop().S("Uploader"+e,window),g=f&&f.value||"";
if(c._isWarnningType(g))
{
d.push(c._subFileName(g));
}
});
return d;
},delAttach:function(a){
var b=this;
_oFileObj=getTop().S(a),_oCurInfo=b._moCurUploadAttachInfo,_nListIdx=b._getExistListIdxByAttachName(a);
if(_oFileObj&&_oFileObj.disabled)
{
b._removeForwardAttachList(_oFileObj.value);
}
if(_oCurInfo&&("Uploader"+_oCurInfo._sId)==a)
{
b._stopCurUpload(_oCurInfo._sId);
}
if(_nListIdx!=-1)
{
b._spliceExistList(_nListIdx);
}
getTop().removeSelf(getTop().S("D"+a,window));
return b._checkBtn();
},delExistAttach:function(a){
var c=getTop();
var b=getTop().S("eas_"+a,window);
if(b)
{
this._removeForwardAttachList(getTop().fixNonBreakSpace(b.textContent||b.innerText));
}
getTop().removeSelf(getTop().S("ea_"+a,window));
return this._checkBtn();
},delBigAttach:function(a){
var d=this;
var c=getTop().parents("div.attsep",a)[0];
getTop().removeSelf(c);
var e=a.getAttribute("data-sid");
if(e)
{
var b=d._getExistListIdxByAttachId(e);
if(c&&b!=-1)
{
d._spliceExistList(b);
}
}
},disableControl:function(a){
this._mbIsDisableControl=true;
return (a?this.delAttach(a):this._removeNotFinishAttach())._disableFlash();
},getAttachLimit:function(){
return this._mnSizeLimit*1024*1024;
},getAttachSize:function(f){
var e=this,a=0,d=getTop().S("exist_file",window),b=d?d.childNodes:[],c=this._moExistInfos;
getTop().E(b,function(g){
if(g.tagName=="DIV")
{
var h=getTop().S("s"+g.id,window);
if(h)
{
a+=e._unFormatSize(h.innerHTML);
}
}
});
getTop().E(this._moExistList,function(g){
if(f=="normal")
{
var h=c[g]._oFile;
if(!h||!h.get||(!h.get('bUpToFtn')&&h.get('nAppId')!==72))
{
a+=c[g]._nSize;
}
}
else{
a+=c[g]._nSize;
}
});
return a;
},getExistList:function(){
return this._moExistList;
},setExistList:function(a){
this._moExistList=a;
},getExistInfos:function(){
return this._moExistInfos;
},setExistInfos:function(a){
this._moExistInfos=a;
},hasAttach:function(a){
var e=this._moExistList,d=this._moExistInfos,c;
for(var g=0,b=e.length;g<b;g++)
{
var f=e[g];
if(d[f]._sCode)
{
return true;
}
else if(getTop().S("Uploader"+f,window).value)
{
return true;
}
}
if(getTop().S("exist_file",window))
{
c=getTop().S('exist_file',window).childNodes;
for(var g=0,b=c.length;g<b;g++)
{
if(c[g].nodeType!=3)
{
return true;
}
}
}
if(a&&getTop().S("BigAttach",window))
{
c=getTop().S('BigAttach',window).childNodes;
for(var g=0,b=c.length;g<b;g++)
{
if(c[g].nodeType!=3&&getTop().isShow(c[g]))
{
return true;
}
}
}
return false;
},hasUploadError:function(){
return this._getTotalStatusAttachLength("error")!=0;
},updateBigAttachCnt:function(){
var a=getTop();
var c=a.CN('js_exist_big_attach',document.getElementById('BigAttach'));
if(c&&c.length>0)
{
var b=_getSubmitForm();
b.bigattachcnt.value=c.length;
}
},hideDragAndDropContainer:function(){
var c=getTop(),b=this,a=b._moDragAndDropContainer,d=c.S("dragAndDropTrap",window),e=c.GelTags("a",d)[0];
if(a)
{
a.style.left=a.style.top=-400+'px';
e.innerHTML="";
e.title="\u70B9\u51FB\u6253\u5F00\u62D6\u62FD\u6258\u76D8";
getPageEditor()._bOpenDragDropContainer=false;
}
},outputBtn:function(b,c,d,a){
var f=typeof (d)!="number"?this._mnSizeLimit:(this._mnSizeLimit=d),h;
if(f>0&&this._isAllowFlash()&&!(getTop().gbIsTT&&this._isAllowUseActiveX())&&!(getTop().goExpers&&getTop().goExpers.dropFlash==true))
{
h=getTop().T(['<div id="flashUploadContainer" ','style="position:absolute;width:$width$px;height:$height$px;margin:$margin$;z-index:1;" ','onMouseOver="this.parentNode.getElementsByTagName(\'a\')[0].style.textDecoration=\'underline\'" ','onMouseOut="this.parentNode.getElementsByTagName(\'a\')[0].style.textDecoration=\'none\'">','$code$','</div>']).replace(a?{width:95,height:25,margin:"-3px 0 0",code:this._getFlashUploaderCode()}:{width:70,height:19,margin:"0",code:this._getFlashUploaderCode()});
this._initFlashUploader();
}
else{
this._mbIsInitlized=true;
}
getTop().gbIsIE&&getTop().createBlankIframe(window,{body:['<input id="btn" type="button" onclick="','parent.document.getElementById(\x27AttachFrame\x27).onclick = function() ','{','var _oUploaderBtn = parent.QMAttach.selectFileWithIE();','if(_oUploaderBtn)','{','_oUploaderBtn.click();','}','return false;','};','" />'].join(""),onload:function(){
getTop().fireMouseEvent(getTop().S("btn",this.contentWindow),"click");
}});
if(a)
{
this._msMode="easy";
return getTop().T(['$flash$','<a id="AttachFrame" onclick="$onclick$();" onmousedown="return false;" style="display:$display$;" ',' title="\u6DFB\u52A0\u5C0F\u4E8E $sizelimit$M \u7684\u6587\u4EF6\u4F5C\u4E3A\u9644\u4EF6" sizelimit="$sizelimit$" >','<img src="$image_path$compose_easy_attch.gif" align="absmiddle"/>\u53D1\u6587\u4EF6','</a>']).replace({flash:h,onclick:"QMAttach.selectFile",display:f>0?"":"none",sizelimit:f,image_path:getTop().getPath("image")});
}
else{
var e=getTop().detectActiveX(3,1),g=getTop().T('\u53EF\u4EE5\u5411\u4EFB\u4F55\u90AE\u7BB1\u53D1\u9001\u6700\u5927 $size$ \u7684\u9644\u4EF6').replace({size:"2G"});
if(b&&f>0)
{
if(this._isSupportActiveXDrag()||this._isSupportHTML5Drag())
{
this._initDragAndDropTrap();
}
else if(getTop().gbIsIE||(getTop().QMAXInfo.mbAblePlugin&&!getTop().gbIsOpera))
{
this._initDragAndDropTrap(true);
}
}
return getTop().TE(['$flash$','$@$if($display$!="none")$@$','<span style="position:relative;margin:0 10px 0 0;" class="dragAndDropTrap_box">','<span id="AttachFrame" onclick="$onclick$();return false;" onmousedown="return false;" ','title="\u6DFB\u52A0\u5C0F\u4E8E $sizelimit$M \u7684\u6587\u4EF6\u4F5C\u4E3A\u9644\u4EF6" sizelimit="$sizelimit$" >','<input type="button" class="ico_att" align="absmiddle"','unselectable="on" onmousedown="return false"/>','<a href="javascript:;" hidefocus>','<span id="sAddAtt1">\u6DFB\u52A0\u9644\u4EF6</span>','<span id="sAddAtt2" style="display:none;">\u7EE7\u7EED\u6DFB\u52A0</span>','</a>','</span>','<span id="dragAndDropTrap" style="display:none;"> <a onmousedown="return false;"','title="\u70B9\u51FB\u6253\u5F00\u62D6\u62FD\u6258\u76D8" class="ico_moreupload"> </a></span>','</span>','$@$endif$@$','$@$if($baDisplay$!="none")$@$','<span id="bigAttachLink" style="margin-right:12px;" title="$baTitle$" onclick="initFileTransporter();return false" onmousedown="return false;" >','<input name="activexControlBtn" type="button" class="ico_attbig" align="absmiddle" hidefocus/>','<a href="javascript:;"  hidefocus>\u8D85\u5927\u9644\u4EF6</a>','</span>','$@$endif$@$']).replace({flash:h,onclick:"QMAttach.selectFile",display:f>0&&b?"":"none",sizelimit:f,baDisplay:c?"":"none",baTitle:g});
}
},retryUpload:function(a){
var b=this._getExistListIdxByAttachName(a);
if(b!=-1)
{
var c=this._moExistInfos[this._moExistList[b]];
if(c._sStatus=="error")
{
this._updateAttachStatus(c,"ready");
this._upload();
}
}
return this;
},selectFile:function(b,a){
if(this._isAllowUseActiveX())
{
if(this._isAllowSelectFile())
{
var c=getTop().createActiveX(2);
if(c)
{
this._addActiveXFile(b=="clipboard"?c.GetClipboardFiles():c.SelectFiles(getTop()),c);
if(b=="clipboard"&&c.GetClipboardFiles())
{
getTop().preventDefault(a);
}
delete c;
}
}
}
else if(b!="clipboard")
{
if(this._isAllowSelectFile())
{
this._addFileCell("tradition")._checkBtn();
}
}
return this;
},selectFileWithIE:function(){
if(this._isAllowUseActiveX())
{
this.selectFile();
}
else if(this._isAllowSelectFile())
{
var a=getTop().S("Uploader"+this._getCurAttachId(),window);
if(!a)
{
this._addFileCell("ie");
a=getTop().S("Uploader"+this._getCurAttachId(),window);
}
return a;
}
},setInput:function(c,d){
var e=this,b=this._moExistList,a=this._moExistInfos,f=this._moUploadFtnFileId;
if(c&&d)
{
var g=[];
var h=[];
getTop().E(b,function(i){
var l=a[i],n=l._sUploadId,m=l._sMode,k=l._oFile,j=false;
if(n&&!l._bIsSeted)
{
if(!(k&&k.get&&(k.get('bUpToFtn')||k.get('nAppId')==72)))
{
if(f.length>0)
{
getTop().E(f,function(o){
if(n==o)
{
h.push(n);
j=true;
}
});
}
if(j==false)
{
g.push(n);
}
}
}
});
c.value=g.join("|");
d.value=h.join("|");
return g;
}
return 0;
},showAttachLimit:function(a){
var b=getTop();
new b.QMDialog({sid:"attachAlert",sTitle:"\u9644\u4EF6\u63D0\u793A",sBodyHtml:b.TE(['<div style="padding:12px 10px 0 12px;text-align:left;">','<div style="float:left;height:60px;">','<img src="$image_path$ico_question.gif" align="absmiddle"',' style="margin:5px 0 0 10px;">','</div>','<div style="padding-top:10px;height:60px;overflow:hidden;">','\u60A8\u6240\u9009\u62E9\u7684\u6587\u4EF6\u8D85\u8FC7\u4E86 $size$ \u7684\u9644\u4EF6\u5927\u5C0F\u4E0A\u9650\u3002<br>','$@$if($hideBigAttach$==0)$@$','<span>\u5EFA\u8BAE\u4F7F\u7528 <a id="link_bigattach" nocheck="true">','<input type="button" class="ico_attbig" align="absmiddle"',' style="margin:0 3px 0 0!important;margin:0 3px 2px 0" />','\u8D85\u5927\u9644\u4EF6</a> \u4E0A\u4F20\u53D1\u9001\u3002</span>','$@$endif$@$','</div>','</div>']).replace({hideBigAttach:this.mbHideBigAttach?1:0,image_path:b.getPath('image'),size:this._formatSize(a)}),nHeight:135,onload:function(){
var c=this;
b.addEvent(c.S("link_bigattach"),"click",function(){
c.close();
if(_bGoFtn)
{
initFileTransporter(true);
debug('switch upload to: ftn');
}
else{
b.E(_aoFiles,function(d){
d.set("bUpToFtn",true);
_oSelf._addFileCell(d);
});
_afCallback(_aoFiles);
debug('switch upload to: '+(_aoFiles[0].oUploader?_aoFiles[0].oUploader.name:'undefined'));
}
});
}});
},isUploading:function(){
var b=this;
var a=this._moExistList;
for(var d=0,e=a.length;d<e;d++)
{
var c=b._moExistList[d],f=b._moExistInfos[c]._sStatus;
if(f=="uploading"||f=="progress")
{
return true;
}
}
},upload:function(){
return this._upload(true);
},_addActiveXFile:function(b,a){
if(b&&typeof b=="string")
{
var d=[],c=0;
getTop().E(b.split("\r\n"),function(e){
var g=getTop().trim(e).split(" ");
if(g.length>=2)
{
var h=g.shift(),i=g.join(" "),f=parseInt(a.GetFileSize(i));
d.push({_sCode:h,_sName:i.split("\\").pop(),_nSize:f});
c+=f;
}
});
this._addControlFile("activex",d,c);
}
},_addControlFile:function(c,b,a,d){
if(this.getAttachSize()+a>this.getAttachLimit())
{
this.showAttachLimit(this.getAttachLimit());
}
else{
var e=this,f=[],g=[];
getTop().E(b,function(h){
if(h._nSize<=0)
{
f.push(h._sName);
}
else if(e._isWarnningType(h._sName))
{
g.push(e._subFileName(h._sName));
}
else{
e._addFileCell(c,[c,getTop().now(),h._sCode].join("_"),h._sCode,h._sName,h._nSize,h._oFile);
}
});
if(d=='nftn')
{
this._checkBtn();
}
else{
this._checkBtn()._upload();
}
if(f.length>0||g.length>0)
{
getTop().msgBox(getTop().T(['<div style="display:$sizedisp$;">$sizefiles$ \u7684\u5927\u5C0F\u4E3A 0 \u5B57\u8282\uFF0C\u56E0\u6B64\u65E0\u6CD5\u6DFB\u52A0\u6B64\u6587\u4EF6\u3002</div>','<div style="display:$typedisp$;">$typefiles$ \u662F\u53EF\u6267\u884C\u6587\u4EF6\u3002\u51FA\u4E8E\u5B89\u5168\u6027\u8003\u8651\uFF0C\u4E0D\u5141\u8BB8\u6DFB\u52A0\u6B64\u6587\u4EF6\u3002</div>']).replace({sizedisp:f.length?"":"none",sizefiles:getTop().htmlEncode(f.join(", ")),typedisp:g.length?"":"none",typefiles:getTop().htmlEncode(g.join(", "))}),"dialog");
}
}
},_addFlashOrAppletFile:function(c,b,a,d){
if(this._isAllowSelectFile())
{
var j=[],h=[],g=0;
for(var m=parseInt(c),e=parseInt(b);m<=e;m++)
{
var k=m,l=new String(a.getFileInfo(m,"name")),f=parseInt(a.getFileInfo(m,"size")||0);
j.push({_sCode:k,_sName:l.split("\\").pop(),_nSize:f});
g+=f;
}
this._addControlFile(d,j,g);
}
},_addFileCell:function(e,d,f,c,a,b){
var i=d||this._getNewAttachId(),k="Uploader"+i;
var g=(b&&b.get)?b.get("bUpToFtn"):false;
if(!getTop().S(k))
{
var j={tradition:"tradition",ie:"ie"}[e||"tradition"]||"control";
this._pushExistList(i,e,f,c,a,j,b);
var h=document.createElement("div");
h.className="attsep";
h.id="D"+k;
h.innerHTML=this._getFileCellTmpl(j).replace({id:d,value:f,name:k,ext:e,filename:getTop().htmlEncode(c),dispfname:_insertWbr(c),size:a||0,formatsize:this._formatSize(parseInt(a||0),true),ftn:g});
if(j=="ie")
{
getTop().show(h,false);
}
getTop().S(g?"BigAttach":"filecell",window).appendChild(h);
getTop().show(getTop().S("attachContainer",getTop().getMainWin()),true);
if(c)
{
setFileNameToSubject(c);
}
}
return this;
},_checkBtn:function(){
var a=this.hasAttach();
getTop().show(getTop().S('sAddAtt1',window),!a);
getTop().show(getTop().S('sAddAtt2',window),a);
return this;
},_clearUploadInfo:function(){
var a=this;
a._moCurUploader=a._moCurUploadAttachInfo=a._moCurUploadTimeStamp=null;
return a;
},_disableFlash:function(){
var b=this;
if(b._moFlashCtrl)
{
b._moFlashCtrl.disable();
}
getTop().show(getTop().S("flashUploadContainer",window),false);
if(b._bUseNewLogic)
{
var a=getTop().S("AttachFrame",window);
getTop().show(a.firstChild,false);
}
return b;
},_doFlashUploaderSetup:function(b,a,c){
var d=this;
d._moFlashCtrl=b;
setTimeout(function(){
d._mbIsInitlized=true;
if(a)
{
b.getFlash().initlize("multi");
}
else{
d._disableFlash();
}
},100);
},_formatSize:function(a,b){
if(isNaN(a))
{
return "";
}
else if(a>1024*1024)
{
var c=parseInt(a*100/(1024*1024))/100.0+"M";
if(b)
{
return '('+c+')';
}
else{
return c;
}
}
else if(a>1024)
{
var c=parseInt(a*100/1024)/100.0+"K";
if(b)
{
return '('+c+')';
}
else{
return c;
}
}
if(a>0&&a<1024)
{
var c=a+"B";
if(b)
{
return '('+c+')';
}
else{
return c;
}
}
if(a==0)
{
return " ";
}
},_getHTML5DropCode:function(){
var d=getTop(),c=this,b=QMDragFile;
function a()
{
setTimeout(function(){
b._addEvent(2);
d.S("html5_dragdrop_area",window).innerHTML=c._msDragEnter;
},100);
return '<div id="html5_dragdrop_area" style="width:100%;height:100%;font-size:14px;text-align:center;line-height:150px;"></div>';
}
function e()
{
setTimeout(function(){
b._addEvent(4);
var f=d.S("html5_dragdrop_area",window);
f.innerHTML=c._msDragEnter;
d.addEvent(f.parentNode,'dragover',function(g){
if(b._nCloseTimeout)
{
d.clearTimeout(b._nCloseTimeout);
b._nCloseTimeout=null;
}
d.stopPropagation(g);
});
},100);
return '<div style="width:100%;height:100%;font-size:14px;text-align:center;line-height:150px;position:relative;"><input type="file" style="position:absolute;width: 100%;height: 100%;top: 0;left: 0;opacity:0;" multiple="true"/><div id="html5_dragdrop_area"></div></div>';
}
return (getTop().gbIsFF?a:e)();
},_getFirefoxDropCode:function(){
var a=this;
setTimeout(function(){
var c=getTop().S("dndMsg",window),e={dragenter:function(){
c.innerHTML=a._msDragOver;
},dragexit:function(){
c.innerHTML=a._msDragEnter;
},dragover:function(){
},dragdrop:function(f){
var g=getTop().createActiveX(2);
a._addActiveXFile(f,g);
delete g;
a.hideDragAndDropContainer();
e["dragexit"]();
}},d=getTop().createActiveX(4),b=getTop().S("ff_dragdrop_area",window);
d.AddTarget(b,function(g,f){
e[g](f);
});
c.innerHTML=a._msDragEnter;
},100);
return '<div id="ff_dragdrop_area" style="width:100%;height:100%;" ondragover="event.preventDefault()"></div>';
},_getActiveXDropCode:function(){
if(!getTop().gbIsIE)
{
return this._getFirefoxDropCode();
}
var a=this;
setTimeout(function(){
var c={ENTER:function(){
b.text=a._msDragOver;
},LEAVE:function(){
b.text=a._msDragEnter;
},OVER:function(){
},FINISH:function(d){
var e=getTop().createActiveX(2);
a._addActiveXFile(d,e);
delete e;
a.hideDragAndDropContainer();
c["LEAVE"]();
}},b=getTop().S("dropAndDragFile",window);
b.text=a._msDragEnter;
b.backColor=0xffffff;
b.textColor=0x000000;
b.textFacName="\u5B8B\u4F53";
b.textFontSize=10;
b.textFontWeight=500;
b.OnFilesDroped=function(d){
(c[d]||c["FINISH"])(d);
};
},100);
return ['<object id="dropAndDragFile" classid="CLSID:F4BA5508-8AB7-45C1-8D0A-A1237AD82399"',' width=100% height=100%></object>'].join("");
},_getCurAttachId:function(){
return (this._mnAttachId||1)-1;
},_getExistAttachInfo:function(a){
var c=this,b=c._moExistInfos||{};
a=a||'';
return b[a];
},_getExistListIdxByAttachId:function(a){
var f=this,e=f._moExistInfos[a],b=-1;
if(e)
{
var d=f._moExistList;
for(var g=0,c=d.length;g<c;g++)
{
if(d[g]==a)
{
b=g;
break;
}
}
}
return b;
},_getExistListIdxByAttachName:function(a){
return this._getExistListIdxByAttachId(a.replace(/^Uploader/,""));
},_getFlashUploaderCode:function(){
return getTop().generateFlashCode("flashUploader",getTop().getPath("swf_cdn")+"uploader.swf?r="+Math.random()+"&uin="+getTop().getCookie("biz_username"),{width:"100%",height:"100%"},{wmode:"transparent"});
},_getFileCellTmpl:function(a){
var d=this._moTmplSet,b=d[a];
if(a=="exist")
{
return getTop().TE(['<div class="attsep" id="ea_$id$" >','<span style="margin-right:5px;" onclick="QMAttach.preview(\'$id$\')" uploadid="$id$">','<input type="button" class="ico_att" style="margin:1px 3px 0 0!important;margin:0 -1px 2px 0" />','<input type="hidden" id="$id$" name="$attachname$" value="$value$">','<span ui-type="filename" compose_path="$id$" id="eas_$id$">$viewname$</span>&nbsp;','<span class="addrtitle">(','<span id="sea_$id$">$size$</span>)</span>','</span>','<a onClick="delExistAttach(\x27$id$\x27);return false" class="att_del" href="javascript:;">\u5220\u9664</a>','</div>']);
}
else if(a=="exist_big")
{
return getTop().TE(['<div class="addrtitle attsep" id="eabig_$id$" mode="$mode$">','<span id="A$name$" style="margin-right:5px;" onclick="QMAttach.preview(\'$id$\')">','<a href="$downloadlink$"></a>','<input type="button" class="ico_attbig" style="margin:0 1px 0 0!important;margin:0 3px 2px 0" />','<input type="hidden" name="fid" value="$fid$" />','<span  class="black" expiretime="$exptime$" style="vertical-align: middle;">','<span ui-type="filename">$filename$</span>','<span class="addrtitle">&nbsp;($filesize$)</span>','</span>','</span>','$@$if($ispic$)$@$','<a onClick="attachInsertImage(this.getAttribute(\x27viewfileurl\x27));" style="margin-right: 5px;" class="att_addpic" viewfileurl="/cgi-bin/ftnDownload302?sid=$sid$&fid=$fid$&code=$code$&k=$key$">\u6DFB\u52A0\u5230\u6B63\u6587</a>','$@$else if($bIsDoc$)$@$','<a title="\u6DFB\u52A0\u5230\u6B63\u6587" style="margin-right:5px;" class="att_addpic" onclick="existAttachInsertFile(\'$@$if($fid$)$@$$fid$$@$else$@$$uid$$@$endif$@$\')" >\u6DFB\u52A0\u5230\u6B63\u6587</a>','$@$endif$@$','<a onClick="delBigAttach(this)" class="att_del" href="javascript:;" style="vertical-align: middle;">\u5220\u9664</a>','</div>']);
}
if(!b)
{
var c=['<div id="A$name$" class="left" style="margin-right:3px;*margin-right:2px;line-height: 16px;height: 16px;margin-top:-2px">','<input type="button" class="','$@$if($ftn$)$@$','ico_attbig','$@$else$@$','ico_att','$@$endif$@$','" style="margin-top: 3px;" />'];
switch(a)
{case "rawinput":
c=c.concat(['<input name="$name$" ext="$ext$" id="$name$" type="hidden" value="$value$" filename="$filename$" filesize="$size$" />','<span ui-type="filename" id="S$name$">$dispfname$</span>&nbsp;<input type="button" class="ss_icon_loading" id="L$name$" style="width:16px;height:15px;padding:0;border:none;margin:0 3px 0 0!important;margin:0 3px 2px 0;" /><span id="SIZE$name$" name="$size$" class="addrtitle" style="display:none;"></span>','</span>','<span id="E$name$" class="upload_ctrl" ','style="display:none;color:red;margin-right:5px;cursor:default">','\u4E0A\u4F20\u5931\u8D25','</span>']);
break;
case "tradition":
c=c.concat(['<input name="$name$" class="file" id="$name$" contentEditable="false" type="file" onchange="','setFileNameToSubject(this.value);','" size=45>','</div>']);
break;
case "ie":
c=c.concat(['<input name="$name$" class="file upload" id="$name$" type="file" onchange="','QMAttach.afterAddFileWithIE(this);','">','<span id="S$name$"></span>&nbsp;<span id=SIZE$name$ name="$size$"></span></div>','</div>']);
break;
case "control":
c=c.concat(['<input name="$name$" ext="$ext$" id="$name$" type="hidden" value="$value$" filename="$filename$" filesize="$size$" disabled>','<span id="S$name$">$dispfname$</span>&nbsp;<span id="SIZE$name$" name="$size$" style="color:#7a8f99;display: inline-block;margin-top: 4px;height:16px;">&nbsp;$formatsize$&nbsp;</span>','</div>','<div id="P$name$" class="left bd_upload" style="font-size:1px;width:100px;height:10px;overflow:hidden;border-width:1px;margin-top:5px;">','<div id="PB$name$" class="fdbody" style="width:0%;font-size:1px;height:10px;overflow:hidden;padding:0;border:0;margin:0;"></div>','</div>','<div id="E$name$" class="left upload_ctrl" ','style="display:none;color:red;margin-right:5px;cursor:default">\u4E0A\u4F20\u5931\u8D25</div>']);
break;
}d[a]=b=getTop().TE(c.concat(['<div class="left upload_ctrl" >','<a id="R$name$" style="margin-right:5px;display:none;" onclick="','QMAttach.retryUpload(\x27$name$\x27);','">\u91CD\u8BD5</a>','<span style="display: inline-block;margin-top: 1px;" id="V$name$Container" onclick="attachInsertImage(this.getAttribute(\x27viewfileurl\x27));">','<a id="V$name$" style="display:none;margin-right:5px;cursor: pointer;" class="att_addpic">\u6DFB\u52A0\u5230\u6B63\u6587</a>','</span>','<span style="display: inline-block;margin-top: 1px;" id="C$name$Container" onclick="attachInsertFile(this.getAttribute(\x27fileid\x27), this.getAttribute(\x27codeid\x27));">','<a id="C$name$" style="display:none;margin-right:5px;cursor: pointer;" class="att_addpic">\u6DFB\u52A0\u5230\u6B63\u6587</a>','</span>','<a style="display: inline-block;margin-top: 1px;" onclick="delAttach(\x27$name$\x27);return false" href="javascript:;">\u5220\u9664</a>','<a id="O$name$" style="margin-left:5px;display:none;" onclick="','QMAttach.disableControl(\x27$name$\x27);','">\u53BB\u6389\u5E76\u6539\u7528\u4F20\u7EDF\u4E0A\u4F20\u5668</a>','</div>','<div style="clear:both;"></div>']));
}
return b;
},_getNewAttachId:function(){
return (this._mnAttachId++);
},_updateExistAttachInfo:function(c){
var a=this;
var b=getTop();
var d=c.sId;
if(this._moExistInfos[d])
{
b.extend(this._moExistInfos[d],c);
}
return null;
},_getNextReadyAttachInfo:function(){
var d=this._moExistList,c=this._moExistInfos;
for(var e=0,a=d.length;e<a;e++)
{
var b=c[d[e]];
if(b._sStatus=="ready")
{
return b;
}
}
return null;
},_getNextAttachInfoByStatus:function(e){
var d=this._moExistList,c=this._moExistInfos;
e=e||"ready";
for(var f=0,a=d.length;f<a;f++)
{
var b=c[d[f]];
if(b._sStatus==e)
{
return b;
}
}
return null;
},_getTotalControlAttachLength:function(){
return this._moExistList.length-this._getTotalStatusAttachLength("");
},_getTotalStatusAttachLength:function(a){
var e=this._moExistList,d=this._moExistInfos,c=0;
for(var f=0,b=e.length;f<b;f++)
{
if(d[e[f]]._sStatus==a)
{
c++;
}
}
return c;
},_getUploadUrl:function(){
var a=getTop();
return a.T("$host$/cgi-bin/upload?sid=$sid$&ssl_edition=$ssl$&uin=$bizusername$&r=$r$").replace({host:[location.protocol,location.host].join("//"),sid:a.getSid(),ssl:a.getCookie("ssl_edition"),bizusername:a.getCookie("biz_username"),r:Math.random()});
},_initFlashUploader:function(){
var a=this,b=getTop();
setTimeout(function(){
(new b.qmFlash({id:"flashUploader",win:window,onSelect:function(d,c){
a._addFlashOrAppletFile(d,c,this.getFlash(),"flash");
},onProcess:function(d,c){
if(a._isCurUploadAttach(d))
{
a._uploadProgress(c);
}
},onError:function(e,d,c){
if(a._isCurUploadAttach(e))
{
a._uploadError(d,c);
}
},onComplete:function(d,c){
if(a._isCurUploadAttach(d))
{
a._uploadComplete(c);
}
}})).setup(function(c,d){
a._doFlashUploaderSetup(this,c,d);
});
},10);
},_initDragAndDropContainer:function(){
var d=getTop();
var c=this;
var b=d.getMainWin().document;
var a=c._moDragAndDropContainer;
if(!a)
{
var e="dndContainer"+d.unikey();
;a=c._moDragAndDropContainer=b.createElement("div");
a.id="dndContainer";
a.className="QMEditorMenuBorder dndContainer";
a.innerHTML=d.T(['<div style="padding:5px 5px 0;font-size:12px;">','<a class="right" id="$sCloseBtnId$">','\u5173\u95ED','</a>','</div>','<div style="height:150px;"></div>']).replace({sCloseBtnId:e});
b.body.insertBefore(a,b.body.firstChild);
d.S(e,b).onclick=function(){
c.hideDragAndDropContainer();
};
}
c.hideDragAndDropContainer();
},_showDragAndDropContainer:function(a,c,b){
var l=this,m=getTop(),f=l._isSupportHTML5Drag(true),n=m.S("dragAndDropTrap",window);
if(!(n&&l._isAllowSelectFile())||(!f&&l._isSupportHTML5Drag(false)))
{
return;
}
var g=l._moDragAndDropContainer,o=m.GelTags("a",n)[0];
var j=m.calcPos(m.S("AttachFrame",window)),d=false,k;
if(!g)
{
d=true;
g=l._moDragAndDropContainer=document.createElement("div");
document.body.insertBefore(g,document.body.firstChild);
g.id="dndContainer";
g.className="QMEditorMenuBorder";
g.innerHTML=m.T(['<div style="padding:5px 5px 0;font-size:12px;">','<a class="right" onclick="QMAttach.hideDragAndDropContainer();">','\u5173\u95ED','</a>','<div id="dndMsg" class="graytext">loading...</div>','</div>','<div style="height:150px;"></div>']);
}
if(m.gbIsWebKit)
{
try{
var h=m.GelTags('input',g)[0],i=h.files;
if(i&&i.length>0)
{
d=true;
}
}
catch(r)
{
}
}
if(d||parseInt(g.style.left)<0)
{
function q()
{
g.style.left=j[3]+'px';
g.style.top=(j[2]+2)+'px';
o.innerHTML="";
o.title="\u70B9\u51FB\u5173\u95ED\u62D6\u62FD\u6258\u76D8";
getPageEditor()._bOpenDragDropContainer=true;
}
if(d)
{
function p()
{
g.lastChild.innerHTML=f?l._getHTML5DropCode():l._getActiveXDropCode();
m.S("dndMsg",window).innerHTML="&nbsp;";
}
if(getTop().gbIsFF)
{
setTimeout(p,100);
}
else{
p();
}
if(getTop().gbIsWebKit)
{
setTimeout(q,100);
}
else{
q();
}
}
else{
q();
}
}
else if(a)
{
l.hideDragAndDropContainer();
}
},_initDragAndDropTrap:function(a){
var b=this;
setTimeout(function(){
var c=getTop().S("dragAndDropTrap",window);
if(c)
{
var d=getTop().GelTags("a",c)[0];
if(a)
{
d.disabled=true;
d.className+=" graytext";
}
getTop().addEvent(document,"click",function(e){
var g=e.srcElement||e.target,f=b._moDragAndDropContainer;
if(getTop().isObjContainTarget(c,g)&&g.innerText=="\u62D6\u62FD\u4E0A\u4F20")
{
if(d.disabled)
{
return showInstallActiveXDialog("drag");
}
}
else if(g.innerText=="\u62D6\u62FD\u4E0A\u4F20")
{
}
else if(f&&!getTop().isObjContainTarget(f,g))
{
b.hideDragAndDropContainer();
}
});
getTop().show(c,true);
c.title="\u70B9\u51FB\u6253\u5F00\u9644\u4EF6\u6258\u76D8\uFF0C\u5141\u8BB8\u76F4\u63A5\u62D6\u52A8\u6587\u4EF6\u5230\u8BE5\u533A\u57DF\u6DFB\u52A0\u9644\u4EF6\u3002";
}
},10);
},_isAllowFlash:function(){
var a=getTop();
var b;
if(a&&a.QMFileAdaptor&&a.QMFileAdaptor.getNormalUploadCom&&(typeof a.QMFileAdaptor.getNormalUploadCom=="function"))
{
b=a.QMFileAdaptor.getNormalUploadCom();
}
return !this._mbIsDisableControl&&getTop().qmFlash.isSupported()&&(getTop().gbIsIE||location.protocol!="https:"||b=="FlashLocal");
},_isAllowUseActiveX:function(){
return !this._mbIsDisableControl&&getTop().detectActiveX(2,1)&&getTop().getUserCookieFlag("CCSHOW")[5]!=1&&!getTop().gbIsMac;
},_isAllowSelectFile:function(){
if(!this._mbIsInitlized)
{
return false;
}
if(!getTop().getGlobalVarValue("UPLOADEXPIRE"))
{
return true;
}
var a=getTop();
new a.QMDialog({sId:"mailAlarm",sTitle:"\u90AE\u7BB1\u63D0\u793A",sBodyHtml:a.T(['<div style="padding:10px 0 5px 10px;text-align:left;">','<img src="$imgPath$ico_question.gif" align="absmiddle" style="float:left;margin:14px 0 0 10px;">','<div style="width:300px;height:80px;overflow:hidden;"><table width=300px height=80px><tr><td style="line-height:20px;">','\u60A8\u6700\u8FD124\u5C0F\u65F6\u5185\u53D1\u9001\u8D85\u8FC7<b style="color:red;">$size$M</b>\u7684\u666E\u901A\u9644\u4EF6\uFF0C\u572824\u5C0F\u65F6\u671F\u6EE1\u524D','\u5C06\u4E0D\u80FD\u53D1\u9001\u5927\u9644\u4EF6\uFF0C\u4E3A\u4FDD\u8BC1\u670D\u52A1\u8D44\u6E90\u5408\u7406\u5229\u7528\uFF0C\u8BF7\u6539\u7528\u201C\u8D85\u5927\u9644\u4EF6\u201D\u529F\u80FD\u53D1\u9001\u3002','</td></tr></table></div>','</div>','<div style="text-align:right;padding:0 10px 10px 0;">','<input class="wd2 btn" type=button id="confirm" value=\u786E\u8BA4 style="margin-right:5px;" >','<input class="wd2 btn" type=button id="cancel" value=\u53D6\u6D88>','</div>']).replace({imgPath:a.getPath("image"),size:200}),nHeight:120,onload:function(){
var b=this;
a.addEvent(b.S("confirm"),"click",function(){
b.close();
initFileTransporter();
});
a.addEvent(b.S("cancel"),"click",function(){
b.close();
});
},onshow:function(){
this.S("confirm").focus();
}});
return false;
},_isCurUploadAttach:function(a){
var b=this._moCurUploadAttachInfo;
return b&&b._sCode==a;
},_isSupportActiveXDrag:function(){
return getTop().detectActiveX(4,1);
},_isSupportHTML5Drag:function(a){
var b=getTop();
return ((b.gbIsFF&&b.FileReader)||(b.gbIsChrome&&(""+b.gsChromeVer).split('.')[0]>=4)||(b.gbIsSafari&&(""+b.gsSafariVer).split('.')[0]>=4))&&(!a||QMDragFile.bInit);
},_isWarnningType:function(a){
var c=this._msWarnningTypes.split("|"),b=false,d=(a||"").split(".").pop().toLowerCase();
for(var e=0;e<c.length;e++)
{
if(d==c[e])
{
b=true;
}
}
return b;
},_pushExistList:function(d,e,g,c,a,f,b){
this._moExistList.push(d);
this._moExistInfos[d]={_sId:d,_sMode:e,_sCode:g,_sName:c,_nSize:a,_oFile:b,_sStatus:f=="control"?"ready":"",_sUploadId:null,_bIsSeted:false};
},_removeForwardAttachList:function(a){
var b=getTop().S("fattachlist",window);
var f=(-1!=b.value.indexOf(' |'))&&' |'||'|';
var c=b.value.split(f)||[];
var d=-1;
for(var e=0;e<c.length;e++)
{
if(getTop().fixNonBreakSpace(c[e])==a)
{
d=e;
break;
}
}
if(d!=-1)
{
c.splice(d,1);
b.value=c.join(f);
}
},_removeNotFinishAttach:function(){
var a=this;
_oExistList=a._moExistList,_oExistInfos=a._moExistInfos;
for(var d=_oExistList.length-1;d>=0;d--)
{
var b=_oExistList[d],c=_oExistInfos[b]._sStatus;
if(c&&c!="finish")
{
a.delAttach("Uploader"+b);
}
}
return a;
},_spliceExistList:function(a){
delete this._moExistInfos[a];
return this._moExistList.splice(a,1);
},_stopCurUpload:function(c){
var b=this,a=b._moCurUploadAttachInfo;
if(a)
{
b._mkCtrlTime(a,true);
b._moCurUploadAttachInfo=null;
switch(a._sMode)
{case "activex":
b._moCurUploader.StopUpload();
break;
case "flash":
b._moCurUploader.cancel();
break;
case "applet":
b._moCurUploader.cancel(a._sCode);
break;
case "xhr5":
b._moCurUploader.abort();
break;
case "flashFTN":
b._moCurUploader.set("sStatus","cancel");
b._moCurUploader.fCancel();
case "h5c":
b._moCurUploader.set("sStatus","cancel");
case "rawinput":
b._moCurUploader.set("sStatus","cancel");
break;
}b._upload(true);
}
return b;
},_subFileName:function(a){
var c=a.length,b=c-6,d=a.substr(0,b),e=a.substr(b);
return getTop().subAsiiStr(d,8,"...")+e;
},_unFormatSize:function(a){
a=a.toLowerCase();
if(a.indexOf("k")!=-1)
{
return parseFloat(a)*1024;
}
if(a.indexOf("m")!=-1)
{
return parseFloat(a)*1024*1024;
}
return parseFloat(a);
},_updateAttachUI:function(b,c,a){
var e="Uploader"+b,d=getTop();
d.E(c.split("|"),function(f){
d.show(d.S(f+e,window),true);
});
d.E(a.split("|"),function(f){
d.show(d.S(f+e,window),false);
});
return this;
},_updateAttachStatus:function(a,e,c,b){
if(!a)
{
return this;
}
var h=this,i=getTop(),n=a._sId,l=a._sCode,o="",m="";
switch(e)
{case "ready":
case "progress":
o="P";
m="E|O|R";
this._uploadProgress(0,1,a);
break;
case "finish":
var g=a._oFile;
if(g&&g.get&&g.get('bUpToFtn'))
{
var j=i.S("DUploader"+n,window);
var d=(g.get("nServerSecond")||g.get("nCreateTime"))+3600*24*30;
addExistBigAttach(d,g.get("sDownloadPage"),g.get("sName"),g.get("sFileId"),this._formatSize(parseInt(g.get("nSize")||0)),100,{nExpireTime:g.get("expireTimeStr"),sId:g.get("sId"),oUploaderDom:j});
i.removeSelf(j);
}
else{
m="E|O|R|P";
var f=i.S("AUploader"+n,window);
if(f)
{
f.style.cursor="pointer";
f.onclick=function(){
h.preview(n);
};
f.setAttribute("uploadid",n);
}
if(_isSupportImportWord(a._sName))
{
o+="|C";
i.S("CUploader"+n,window).setAttribute("codeid",l);
i.S("CUploader"+n+"Container",window).setAttribute("codeid",l);
i.S("CUploader"+n,window).setAttribute("fileid",n);
i.S("CUploader"+n+"Container",window).setAttribute("fileid",n);
}
else if(a["sFileUrl"])
{
o+="|V";
i.S("VUploader"+n,window).setAttribute("viewfileurl",a["sFileUrl"]);
i.S("VUploader"+n+"Container",window).setAttribute("viewfileurl",a["sFileUrl"]);
}
}
if(a._sMode=='rawinput')
{
var k=i.S("SIZEUploader"+n,window);
if(k&&!isNaN(a._nSize))
{
k.innerText='('+QMAttach._formatSize(a._nSize)+')';
}
}
break;
case "error":
o="E|O|R";
m="P";
getTop().S("EUploader"+n,window).title=getTop().T("\u9519\u8BEF\u7C7B\u578B\uFF1A$type$\n\u9519\u8BEF\u6D88\u606F\uFF1A$msg$").replace({type:c,msg:b});
break;
}a._sStatus=e;
return this._updateAttachUI(n,o,m);
},_upload:function(a){
var e=this;
if(!e._moCurUploadAttachInfo)
{
var d=e._getNextReadyAttachInfo();
if(d)
{
var f,b={xhr5:e._uploadWidthXHR,activex:e._uploadWithActiveX,flash:e._uploadWithFlash,applet:e._uploadWithApplet,flashFTN:e._uploadNextFile,h5c:e._uploadNextFile,rawinput:e._uploadNextFile}[d._sMode];
e._moCurUploadAttachInfo=d;
if(b)
{
try{
e._updateAttachStatus(d,"progress");
b.call(e);
}
catch(c)
{
f=c.msg;
}
}
else{
f="no unpload func:"+d._sMode;
}
if(f)
{
e._uploadError("__start__",f);
}
}
else if(a&&typeof e.onfinish=="function")
{
try{
e.onfinish.call(e);
}
catch(c)
{
getTop().doPageError(c.message,"compose.js","QMAttach.onfinish");
}
e.onprogress=null;
e.onfinish=null;
}
}
return e;
},_uploadComplete:function(_asData){
var _oSelf=this,_oCurInfo=this._moCurUploadAttachInfo;
if(_oCurInfo)
{
var resp={};
var filetype;
var viewfileurl;
if(_asData.indexOf('viewfileurl')>-1)
{
try{
resp=eval(_asData);
filetype=resp.filetype;
viewfileurl=resp.viewfileurl;
}
catch(e)
{
}
}
if(resp.filename)
{
if(filetype==1)
{
_oSelf._moCurUploadAttachInfo.sFileUrl=viewfileurl+"&sid="+_oTop.getSid();
}
var sFileCattachName=resp.filename;
if(sFileCattachName)
{
_oSelf._moCurUploadAttachInfo.sFileCattachName=sFileCattachName;
_oCurInfo._sUploadId=sFileCattachName.split('/').pop();
}
_oSelf._uploadProgress(100,1)._updateAttachStatus(_oCurInfo,"finish")._clearUploadInfo()._upload(true);
if(this._getTotalControlAttachLength()>1&&location.protocol=="http:")
{
getTop().requestShowTip("AttachFrame",31,window);
}
}
else if(_asData.indexOf('/data/')==0)
{
var _sData=getTop().trim(_asData);
_oCurInfo._sUploadId=_sData.split('/').pop();
this._uploadProgress(100,1)._updateAttachStatus(_oCurInfo,"finish")._clearUploadInfo()._upload(true);
if(this._getTotalControlAttachLength()>1&&location.protocol=="http:")
{
getTop().requestShowTip("AttachFrame",31,window);
}
}
else{
this._uploadError("__response__",_sData);
}
}
},_uploadError:function(b,a){
this._updateAttachStatus(this._moCurUploadAttachInfo,"error",b,a)._clearUploadInfo()._upload(true);
},_uploadProgress:function(a,b,c){
var j=this,h=c||j._moCurUploadAttachInfo;
if(h)
{
var e=Math.floor(a*(b||0.95)),d=getTop().now();
if(h._nPercent!=e)
{
h._nPercent=e;
j._mkCtrlTime(h);
if(d-j._mnRomanceTime>=100||b==1||c)
{
j._mnRomanceTime=d;
getTop().S("PBUploader"+h._sId,window).style.width=e+"%";
if(!c&&typeof j.onprogress=="function")
{
try{
var f=j._getTotalControlAttachLength(),g=f-1-j._getTotalStatusAttachLength("ready");
j.onprogress.call(j,Math.floor((e+(g*100))/f));
}
catch(i)
{
}
}
}
}
}
return j;
},_uploadWithActiveX:function(){
var _oSelf=this,_oCtrl=_oSelf._moCurUploader=getTop().createActiveX(2,getPageEditor().getEditWin()),_nTimeStamp=_oSelf._moCurUploadTimeStamp=getTop().now();
_oCtrl.OnEvent=function(_aObj,_asEventID,_anP1,_anP2,_anP3){
if(_oSelf._moCurUploadTimeStamp==_nTimeStamp)
{
var _oProcessFunc={"1":function(){
_oSelf._uploadError("activex progress error",[_anP1,_anP2].join("|"));
},"2":function(){
_oSelf._uploadProgress(100*_anP1/_anP2);
},"3":function(){
if(_oCtrl.ResponseCode!="200")
{
_oSelf._uploadError("activex response error "+_oCtrl.ResponseCode,[_anP1,_anP2].join("|"));
}
else{
var resp=eval(_oCtrl.Response),filetype=resp.filetype,viewfileurl=resp.viewfileurl;
if(filetype==1)
{
_oSelf._moCurUploadAttachInfo.sFileUrl=viewfileurl+"&sid="+_oTop.getSid();
}
var sFileCattachName=resp.filename;
if(sFileCattachName)
{
_oSelf._moCurUploadAttachInfo.sFileCattachName=sFileCattachName;
}
_oSelf._uploadComplete(resp.filename);
}
}}[_asEventID]();
}
};
_oCtrl.URL=_oSelf._getUploadUrl()+"&insertParam=true";
_oCtrl.AddHeader("Cookie",document.cookie);
_oCtrl.AddFormItem("sid",0,0,getTop().getSid());
_oCtrl.AddFormItem("mode",0,0,"file");
_oCtrl.AddFormItem("UploadFile",4,0,this._moCurUploadAttachInfo._sCode);
_oCtrl.StartUpload();
},_uploadWithApplet:function(){
var b=this,a=b._moAppletCtrl.getApplet();
b._moCurUploader=a;
b._moCurUploadTimeStamp=getTop().now();
a.addUploadVar("sid",getTop().getSid());
a.addUploadVar("mode","file");
a.addUploadVar("lang","utf8");
a.setUploadUrl(this._getUploadUrl());
var c=a.upload(this._moCurUploadAttachInfo._sCode);
if(c!="ok")
{
getTop().doPageError(["uploadWithApplet(",this._moCurUploadAttachInfo._sCode,") Err:",c].join(""),"compose.js",3094);
}
},_uploadWithFlash:function(){
var b=this,a=b._moFlashCtrl.getFlash();
b._moCurUploader=a;
b._moCurUploadTimeStamp=getTop().now();
a.addUploadVar("sid",getTop().getSid());
a.addUploadVar("mode","file");
a.addUploadVar("lang","utf8");
a.setUploadUrl(this._getUploadUrl()+"&insertParam=true");
a.upload(this._moCurUploadAttachInfo._sCode,"UploadFile");
},_uploadWidthXHR:function(){
try{
var _oTop=getTop(),_oSelf=this,_nTimeStamp=_oSelf._moCurUploadTimeStamp=_oTop.now(),_oRequest=new XMLHttpRequest();
_oSelf._moCurUploader=_oRequest;
_oRequest.upload.onprogress=function(_aoEvent){
if(_aoEvent.lengthComputable)
{
_oSelf._uploadProgress(Math.floor((_aoEvent.loaded/_aoEvent.total)*100));
}
};
_oRequest.onreadystatechange=function(){
if(_oRequest.readyState==4)
{
_oRequest.onreadystatechange=_oRequest.upload.onprogress=null;
var resp=eval(_oRequest.responseText),filetype=resp.filetype,viewfileurl=resp.viewfileurl;
if(filetype==1)
{
_oSelf._moCurUploadAttachInfo.sFileUrl=viewfileurl+"&sid="+_oTop.getSid();
}
var sFileCattachName=resp.filename;
if(sFileCattachName)
{
_oSelf._moCurUploadAttachInfo.sFileCattachName=sFileCattachName;
}
_oSelf._uploadComplete(resp.filename);
}
};
var _oFile=_oSelf._moCurUploadAttachInfo._oFile,_sName=_oSelf._moCurUploadAttachInfo._sName;
_sName=encodeURIComponent(_sName);
_oRequest.open("POST",_oSelf._getUploadUrl()+"&mode=file&resp_charset=UTF8&insertParam=true",true);
_oRequest.setRequestHeader("X-QQMAIL-FILENAME",_sName);
_oRequest.setRequestHeader("content-type","application/octet-stream");
_oRequest.send(_oFile);
}
catch(_aoError)
{
debug([_aoError.message,_aoError.lineNumber]);
}
},_showAppletPermission:function(){
var a=this._moDragAndDropContainer;
if(a)
{
a.lastChild.innerHTML=['<table style="width:100%;height:100%;">','<tr><td align="center">','<div><b>\u60A8\u7981\u6B62\u4E86\u8BE5\u529F\u80FD\u4F7F\u7528</b></div>','<div>\u60A8\u5FC5\u987B\u9000\u51FA\u6D4F\u89C8\u5668\u624D\u80FD\u91CD\u65B0\u5F00\u542F\u3002</div>','</td></tr>','</table>'].join("");
}
},_mkCtrlTime:function(b,a){
var c=10000,e=this,f=getTop(),d=b||e._moCurUploadAttachInfo,g=['stat=custom&type=timecontrol&info=',d._sMode.substr(0,2),'_',f.gbIsIE?1:(f.gbIsFF?2:(f.gbIsChrome?3:(f.gbIsSafari?4:5)))].join("");
if(a)
{
if(e._mnMarkCtrlTimeStatus)
{
clearTimeout(e._mnMarkCtrlTimeStatus);
}
e.mnMarkCtrlTimeBegin=0;
return;
}
if(d._nPercent>=100)
{
if(e._mnMarkCtrlTimeStatus)
{
clearTimeout(e._mnMarkCtrlTimeStatus);
e._mnMarkCtrlTimeStatus=null;
}
else{
f.ossLog("delay","all",g+"_t_"+(f.now()-e.mnMarkCtrlTimeBegin));
}
}
else if(d._nPercent>93)
{
if(!e._mnMarkCtrlTimeStatus)
{
e.mnMarkCtrlTimeBegin=f.now();
e._mnMarkCtrlTimeStatus=setTimeout(function(){
f.ossLog("delay","all",g+"_d");
e._mnMarkCtrlTimeStatus=null;
},c);
}
}
},_uploadNextFile:function(){
var b=this,c=getTop(),a=b._moCurUploadAttachInfo;
if(a)
{
c.E(b._moCurUploadAttachArray,function(d){
if(d.get("sId")==a._sId)
{
_oCurrentFile=b._moCurUploader=d;
if(d.uploadToFtn&&d.get("bUpToFtn"))
{
d.set('nAppId',72);
return d.uploadToFtn();
}
if(d.get('sType').indexOf("H5C")==0)
{
d.set({'bIsUptoFtnForNormal':true,'nPort':80});
}
d.upload();
}
});
return true;
}
return false;
},getInfoUid:function(a){
var b=this._moExistInfos,c=[];
getTop().E(this._moExistList,function(d){
if(a[b[d]._sUploadId])
{
c.push({name:getTop().htmlEncode(b[d]._sName),id:"Uploader"+b[d]._sId});
}
});
return c;
}};
QMAttach._qmTmpFile=function(a){
var b=this;
b._moInfo={};
b.set(a);
var c=b.init(a);
b.set(c);
};
QMAttach._qmTmpFile.prototype={set:function(a,b){
var c=this;
if(!a)
{
return;
}
if(typeof a=="object")
{
getTop().extend(c._moInfo,a);
}
else{
c._moInfo[a]=b;
}
return c;
},get:function(a){
var b=this;
if(a)
{
return b._moInfo[a];
}
else{
return b._moInfo;
}
},init:function(a){
var b=this,e={},c=['_sName','_mailid','_attachid','_attachname','_sUploadId','_sName','_nSize','_sId','sNf'],d=['sName','mailid','attachid','attachname','sFileId','sFilePath','nSize','sId','sNf'];
for(var f=0;f<c.length;f++)
{
if(a[c[f]])
{
var g=d[f];
if(!a[g])
{
e[g]=a[c[f]];
}
else{
e[g]=a[g];
}
}
}
return e;
}};
function delAttach(a)
{
QMAttach.delAttach(a);
}
function delAllAttach()
{
var a=QMAttach.getExistList();
for(var b=0;b<a.length;b++)
{
delAttach(a[b]);
}
}
function delExistAttach(a)
{
QMAttach.delExistAttach(a);
}
function delBigAttach(a)
{
QMAttach.delBigAttach(a);
return false;
}
function setFileNameToSubject(a)
{
var c=getTop().S("subject",window),b=arguments.callee;
if(a&&c&&!c.value&&!b._bIsEverSeted&&getPageId()!="groupsms")
{
var d=a.split("\\").pop();
c.value=d.split(".").slice(0,-1).join(".")||d;
b._bIsEverSeted=true;
}
}
function cknt()
{
getTop()._bIsCanConnectGoogle=true;
}
function outputAttachBtn(b,c,d,a)
{
return QMAttach.outputBtn(b,c,d,a);
}
function outputFrameAttachBtn(b,c,d,a)
{
var e=getTop();
var f;
if(e&&e.QMFileAdaptor&&e.QMFileAdaptor.getNormalUploadCom&&(typeof e.QMFileAdaptor.getNormalUploadCom=="function"))
{
f=e.QMFileAdaptor.getNormalUploadCom();
}
if(f=="NoFlash")
{
return outputFlashFMailAttachBtn();
}
else if(f=="RawLocal")
{
return outputFlashFMailAttachBtn();
}
else if(e.QMFileAdaptor.isBrowser("ie")&&(e.gnIEVer<11)&&!window.location.host.match(/exmail\.qq\.com$/))
{
return QMAttach.outputBtn(b,c,d,a);
}
else if(f=="H5CPopupMail")
{
return outputH5cAttachBtn();
}
else if(f=="FlashPopupFMail")
{
return outputFlashFMailAttachBtn();
}
else{
return QMAttach.outputBtn(b,c,d,a);
}
}
function outputH5cAttachBtn()
{
var a=getTop().TE(["<span id='composecontainer'>","<span class='compose_toolbtn qmEditorAttach dragAndDropTrap_box' onmouseover='attachOn()' onmouseout='attachOut()'>","<span sizelimit='50' title='\u6DFB\u52A0\u5C0F\u4E8E 50M \u7684\u6587\u4EF6\u4F5C\u4E3A\u9644\u4EF6' id='AttachFrame' style='position: relative;'>","<input type='button' class='ico_att' align='absmiddle' unselectable='on' onmousedown='return false'>","<a href='javascript:;' id='addAttach'>","<span id='sAddAtt1'>\u6DFB\u52A0\u9644\u4EF6</span>","<span onclick='return false;' onmousedown='return false;' style='display:none;' id='sAddAtt2'>\u7EE7\u7EED\u6DFB\u52A0</span>","</a>","</span>","<span id='dragAndDropTrap' title='\u70B9\u51FB\u6253\u5F00\u9644\u4EF6\u6258\u76D8\uFF0C\u5141\u8BB8\u76F4\u63A5\u62D6\u52A8\u6587\u4EF6\u5230\u8BE5\u533A\u57DF\u6DFB\u52A0\u9644\u4EF6\u3002'>","<a onmousedown='return false;' title='\u70B9\u51FB\u6253\u5F00\u62D6\u62FD\u6258\u76D8' class='ico_moreupload'></a>","</span>","</span>","<span id='bigAttachLink' style='margin-right:12px;' title='\u53EF\u4EE5\u5411\u4EFB\u4F55\u90AE\u7BB1\u53D1\u9001\u6700\u5927 2G \u7684\u9644\u4EF6'' onclick='initFileTransporter();return false' onmousedown='return false;'>","<input name='activexControlBtn' type='button' class='ico_attbig' align='absmiddle' hidefocus=''>","<a href='javascript:;' hidefocus=''>\u8D85\u5927\u9644\u4EF6</a>","</span>","</span>"]);
return a;
}
function outputFlashFMailAttachBtn()
{
var a=getTop().TE(["<span id='composecontainer'>","<span class='compose_toolbtn qmEditorAttach dragAndDropTrap_box' onmouseover='attachOn()' onmouseout='attachOut()'>","<span sizelimit='50' title='\u6DFB\u52A0\u5C0F\u4E8E 50M \u7684\u6587\u4EF6\u4F5C\u4E3A\u9644\u4EF6' id='AttachFrame' style='position: relative;'>","<input type='button' class='ico_att' align='absmiddle' unselectable='on' onmousedown='return false'>","<a href='javascript:;' id='addAttach'>","<span id='sAddAtt1'>\u6DFB\u52A0\u9644\u4EF6</span>","<span onclick='return false;' onmousedown='return false;' style='display:none;' id='sAddAtt2'>\u7EE7\u7EED\u6DFB\u52A0</span>","</a>","</span>","<span id='dragAndDropTrap' title='\u70B9\u51FB\u6253\u5F00\u9644\u4EF6\u6258\u76D8\uFF0C\u5141\u8BB8\u76F4\u63A5\u62D6\u52A8\u6587\u4EF6\u5230\u8BE5\u533A\u57DF\u6DFB\u52A0\u9644\u4EF6\u3002'>","<a onmousedown='return false;' title='\u70B9\u51FB\u6253\u5F00\u62D6\u62FD\u6258\u76D8' class='ico_moreupload'></a>","</span>","</span>","<span id='bigAttachLink' style='margin-right:12px;' title='\u53EF\u4EE5\u5411\u4EFB\u4F55\u90AE\u7BB1\u53D1\u9001\u6700\u5927 2G \u7684\u9644\u4EF6'' onclick='initFileTransporter();return false' onmousedown='return false;'>","<input name='activexControlBtn' type='button' class='ico_attbig' align='absmiddle' hidefocus=''>","<a href='javascript:;' hidefocus=''>\u8D85\u5927\u9644\u4EF6</a>","</span>","</span>"]);
return a;
}
function attachOn()
{
var a=getTop();
a.addClass(a.S('addAttach',window),'composeAddAttach');
}
function attachOut()
{
var a=getTop();
a.rmClass(a.S('addAttach',window),'composeAddAttach');
}
function addExistBigAttach(c,g,e,d,f,a,b)
{
var j=getTop().S("BigAttach",window),h=typeof a!="undefined";
if(!j)
{
return;
}
var l="BigAttach_"+d,k;
if(getTop().S(l,window))
{
k=getTop().S(l,window);
}
else{
k=document.createElement("div");
k.id=l;
if(b&&b.oUploaderDom)
{
j.insertBefore(k,b.oUploaderDom);
}
else{
j.appendChild(k);
}
}
k.className="addrtitle attsep js_exist_big_attach";
if(!g&&a!=100)
{
k.setAttribute("uncomplete",true);
}
else{
k.removeAttribute("uncomplete");
}
var i="";
if(b&&b.nExpireTime&&c!=-1)
{
if(b.nExpireTime=="\u5373\u5C06\u8FC7\u671F")
{
i="<span class='red'>"+b.nExpireTime+"</span>";
}
else{
if(b.nExpireTime.indexOf("\u5929")!=-1)
{
if(parseInt(b.nExpireTime.substring(0,b.nExpireTime.indexOf("\u5929")),10)<4)
{
i="<span class='red'>"+b.nExpireTime+"\u540E\u8FC7\u671F"+"</span>";
}
else{
i=b.nExpireTime+"\u540E\u8FC7\u671F";
}
}
else if(b.nExpireTime.indexOf("\u5C0F\u65F6")!=-1)
{
i="<span class='red'>"+b.nExpireTime+"\u540E\u8FC7\u671F"+"</span>";
}
else if(b.nExpireTime.indexOf("\u5206\u949F")!=-1)
{
i="<span class='red'>"+b.nExpireTime+"\u540E\u8FC7\u671F"+"</span>";
}
}
i=", "+i;
}
if(c>0&&(typeof b.nExpireTime=="undefined")&&c!=-1)
{
var n=Date.parse(new Date())/1000;
var m=c-n;
if(m>0)
{
if(Math.ceil(m/86400)>=4)
{
i=Math.ceil(m/86400)+"\u5929\u540E\u8FC7\u671F";
}
else if(Math.ceil(m/86400)>=1&&Math.ceil(m/86400)<=3)
{
i="<span class='red'>"+Math.ceil(m/86400)+"\u5929\u540E\u8FC7\u671F"+"</span>";
}
else if(Math.floor(m/86400)==0&&Math.floor(m/3600)>0&&Math.floor(m/3600)<24)
{
i="<span class='red'>"+Math.floor(m/3600)+"\u5C0F\u65F6\u540E\u8FC7\u671F"+"</span>";
}
else if(Math.floor(m/3600)==0&&Math.floor(m/60)>0)
{
i="<span class='red'>"+Math.floor(m/60)+"\u5206\u949F\u540E\u8FC7\u671F"+"</span>";
}
else if(Math.floor(m/60)==0)
{
i="<span class='red'>"+"\u5373\u5C06\u8FC7\u671F"+"</span>";
}
}
i=", "+i;
}
if(c==-1)
{
i="\u65E0\u9650\u671F";
i=", "+i;
}
k.innerHTML=getTop().TE(["<ul class='left' style='clear:left;dispaly:block;margin:2px 0 0;padding:0;cursor:pointer;' onclick=\"QMAttach.preview(\'$fid$\')\" uploadid=\"$fid$\" key='$key$' code='$code$' fid='$fid$' attachtype='big' filename='$@$html($filename$)$@$'>","<input type='button' class='ico_attbig' align='absmiddle' style='margin:0 1px 0 0!important;margin:0 3px 2px 0'>","<input type='hidden' name='fid' value='$fid$' />","<span class='black' expiretime='$expire$'>","$filename$","<span style='font-weight:normal; color:#7a8f99'> $@$if($size$)$@$($size$$expiredays$)$@$endif$@$</span><wbr><wbr>","</span>","</ul>","$@$if($percent$<100)$@$","<ul class='left bd_upload' style='font-size:1px;width:100px;height:10px;overflow:hidden;border-width:1px;margin-left:5px;dispaly:block;'>","<ul class='fdbody' style='width:$percent$%;font-size:1px;height:10px;overflow:hidden;padding:0;border:0;'></ul>","</ul>","$@$endif$@$","<ul class='left' style='dispaly:block;margin: 1px 0 0;;padding:0;'>","<a href='$url$'></a>","&nbsp;<nobr>","$@$if($percent$==100)$@$","<a style='display:inline-block;margin-top: 1px;' onclick='delBigAttach(this)' data-sid='$sid$'>\u5220\u9664</a></nobr>","$@$endif$@$","</ul>"]).replace({expire:c,filename:getTop().htmlEncode(e),size:f,percent:h?a:100,url:g+'&fid='+d,expiredays:i||"",fid:d||"",sid:b?(b.sId):"",key:b?b.key:"",code:b?b.code:""});
getTop().show(getTop().S("attachContainer",getTop().getMainWin()),true);
setFileNameToSubject(e);
}
function addBigAttach(c,e,f,g,b,d,a)
{
if(QMAttach.mbHideBigAttach)
{
getTop().showError("\u7FA4\u4FE1\u606F\u6682\u65F6\u4E0D\u652F\u6301\u53D1\u9001\u8D85\u5927\u9644\u4EF6");
}
else{
g=g.replace(/&code=/ig,"&temp=");
addExistBigAttach(c,["http://exmail.qq.com",g,"&code=",b,"&s=email"].join(""),e,d,f,undefined,a);
}
}
function getCurrentReceivers(a)
{
if(getPageId()!="compose")
{
return "";
}
var c=getTop(),b=[];
c.E(a||["to","cc","bcc","sc"],function(d){
var e=QMAddrInput.get(d,window),f=e&&e.get();
f&&(b=b.concat(f));
});
return b.join(";");
}
function iniBigAttach(a)
{
var b=getTop().GelTags("hr",getTop().S("source",window));
for(var g=b.length-1;g>=0;g--)
{
var k=b[g];
if(!(k=k.parentNode)||k.id!="QQMailBigAttach")
{
continue;
}
if(a)
{
var d=getTop().GelTags("span",k);
for(var h=d.length-1;h>=0;h--)
{
var c=d[h];
if(c.className!="qqmailbgattach")
{
continue;
}
var e=c.firstChild.innerHTML;
if(typeof (e)=="undefined")
{
e=c.firstChild.nodeValue;
}
var f=getTop().trim(c.firstChild.nextSibling.innerHTML.split(",")[0]).replace(/\(|\)/ig,"");
addExistBigAttach(c.getAttribute("expiretime"),c.getAttribute("downloadlink"),e,"",f);
}
}
k.parentNode.removeChild(k);
}
}
function initColorSubject()
{
var e=getTop(),b=e.S("cpanelBtn",window);
if(!b)
{
return;
}
var c=["11","\u6A59\u7EA2\u8272","13","\u6DF1\u7EFF\u8272","14","\u9C9C\u7D2B\u8272","10","\u7EAF\u9ED1\u8272"],d=[{sItemValue:'<span style="margin-left:5px;">\u5F69\u8272\u4E3B\u9898...</span>'}];
for(var f=0,a=c.length;f<a;f+=2)
{
d.push({sId:c[f],sItemValue:["<div id='",c[f],"' class='s",c[f],"_bg' style='margin-top:3px;width:15px;height:15px;float:left;'></div>&nbsp;",c[f+1]].join("")});
}
d.push({sItemValue:"<div style='float:right;margin-right:10px;'><a href='http://service.exmail.qq.com/cgi-bin/help?subtype=1&&id=11&&no=138' target='_blank'>\u5E2E\u52A9</a></div>"});
b.onclick=function(){
var g=e.calcPos(this);
new e.QMMenu({oEmbedWin:window,sId:"colorsubject",nX:g[1]-96,nY:g[2]+1,nWidth:100,oItems:d,nItemHeight:21,onitemclick:setSubjectColor});
};
}
function showSubjectMsg(a)
{
var c=getTop().S("subject",window);
if(a)
{
if(c.value=="")
{
c.value=getTop().gsMsgNoSubject;
setTimeout(function(){
showSubjectMsg(false);
},5000);
}
}
else{
if(c.value==getTop().gsMsgNoSubject)
{
c.value="";
try{
document.selection.createRange().select();
}
catch(b)
{
}
}
}
}
function setSubjectColor(a)
{
getTop().S("xqqstyle",window).value=a;
getTop().S("subject",window).className="s"+a;
showSubjectMsg(true);
getTop().show(getTop().S('cpanel',window),false);
}
function initAddrCtrl(c,b,a)
{
var h=getTop(),i=c||window,e=window.addrDomain={},g=window.InputObjs=[];
a=h.extend({bAddrTip:false,bDomCheck:true,bNick:false},a);
try{
i.focus();
}
catch(f)
{
}
function j(k)
{
if(k=="sc")
{
_addrAssociate(g.slice(3));
}
else{
_addrAssociate(g.slice(0,3));
}
}
h.E(b||["to","cc","bcc","sc"],function(k){
var n=h.S(k+"AreaCtrl",i),p=h.S(k,i),m=0;
if(n&&p)
{
var l=_getSupportGroup(),o=new QMAddrInput({id:k,win:i,tabIndex:p.tabIndex,dom:{container:n},dispMode:a.bNick?'onlynick':'full',maxHeight:a.nMaxHeight,onfocus:function(){
setFocus(k);
j(k);
},onblur:function(){
},onchange:function(q){
var r=this.get(";");
goCompose._oDomainChecker&&goCompose._oDomainChecker.check();
if(k=="to"&&!m&&getTop().S("aSC",window)&&r.split(";").length>=5)
{
m=1;
getTop().requestShowTip("aSc",16,window);
}
j(k);
}});
o.disabled(p.disabled).add(p.value);
p.value="";
g.push(o);
}
});
if(!!a.bDomCheck)
{
var d=location.getParams()["s"]=="reply_all"?3:7;
(goCompose._oDomainChecker=QMAddrDomainCheck.createChecker(g,d,{oPermit:h.S('receiverMsgContainer',window)})).check();
}
initAddrLinkEvent(i);
}
function initAddrLinkEvent(a)
{
getTop().E(["to","cc","bcc","sc"],function(b){
var f=b.toUpperCase(),c=QMAddrInput.get(b,a),e=getTop().S(["a"+f],a),d=getTop().S([b+"_btn"],a);
if(c&&e)
{
e.onclick=b=="sc"?function(g){
if(showSeparatedCopy())
{
getTop().ossLog("delay","all",getTop().T('stat=compose_send&t=$t$&sub=sc').replace(location.getParams()));
}
getTop().preventDefault(g||window.event);
if(goCompose._oDomainChecker)
{
goCompose._oDomainChecker.check();
}
}:function(g){
setFocus(!this.disabled&&showInputCtrl(f)?b:(getFocus()==b?"to":getFocus()));
QMAddrInput.get(getFocus(),a).focus("end");
getTop().preventDefault(g||window.event);
if(goCompose._oDomainChecker)
{
goCompose._oDomainChecker.check();
}
};
}
if(c&&d)
{
d.onclick=function(g){
var h=getTop();
if(!(h.QMLinkman&&h.QMAddress&&h.QMAddress.isInit()))
{
return;
}
QMAddrInput.get(b,window).showMemDlg();
getTop().preventDefault(g||window.event);
};
}
});
}
function _addrAssociate(_aoQMAddrInputs)
{
var _oTop=getTop(),_fSelf=arguments.callee,_oAjax=_fSelf.ajax,_oCache=_fSelf.cache||(_fSelf.cache={});
if(!_oAjax)
{
_oAjax=_fSelf.ajax=new _oTop.QMAjax();
_oAjax.url="/cgi-bin/addr_domain_check";
_oAjax.onComplete=function(_asResp){
_showHint(_oCache[_oAjax._sEmail]=eval(_asResp.responseText));
_oTop.ossLog("realtime","all","stat=custom&type=addressaptitude&info=open");
};
}
var _oEmails=[];
for(var i=0,len=_aoQMAddrInputs.length;i<len;i++)
{
var _oAddrInput=_aoQMAddrInputs[i],_oAddrs=_oAddrInput&&!_oAddrInput.isDisabled()&&_oAddrInput.get("json")||[];
for(var j=0,len2=_oAddrs.length;j<len2;j++)
{
if(_oAddrs[j].valid)
{
_oEmails.push(_oAddrs[j].addr);
}
}
}
if(_oEmails.length)
{
var _sEmail;
if(_oCache[_sEmail=_oEmails.sort().join(';')])
{
_showHint(_oCache[_sEmail]);
}
else{
_oAjax._sEmail=_sEmail;
_oAjax.abort();
_oAjax.send(_oTop.T("his=1&sid=$sid$&uin=$uin$&addrfilt=$addr$").replace({sid:_oTop.getSid(),uin:_oTop.getUin(),addr:_sEmail}));
}
}
else{
_showHint([]);
}
function _showHint(_aoItems)
{
var _oShowSpan=_fSelf.showSpan||(_fSelf.showSpan=_oTop.S("addrAssociation",window)),_oAddr,_oAddrItems=[],_oEvtTmpl=_oTop.T('addAddr("\\\"$name$\\\"&lt;$email$&gt;;")'),_oAddrTmpl=_oTop.TE(['$@$for($_this_$)$@$$@$if($_idx_$<3)$@$','<a style="pointer:cursor;" title="$email$" onclick=\''+_oEvtTmpl+'\'>$name$</a>','$@$if($_idx_$<$_root_.length$-1&&$_idx_$<2)$@$, $@$endif$@$','$@$endif$@$$@$endfor$@$']);
if(!_oShowSpan)
{
return;
}
if(_aoItems.length)
{
for(var i=0,len=_aoItems.length;i<len;i++)
{
_oAddr=_oTop.QMAddress.getAddress(_aoItems[i]);
if(_oAddr)
{
_oAddrItems.push({name:_oTop.encodeNick(_oAddr.name),email:_oAddr.email});
}
}
_oShowSpan.innerHTML=_oAddrTmpl.replace(_oAddrItems);
}
_oTop.show(_oShowSpan.parentNode,!!_oAddrItems.length);
}
}
function setFocus(a)
{
if(a)
{
arguments.callee._moFocusObj=a;
}
}
function getFocus()
{
return setFocus._moFocusObj||"to";
}
function addAddr(a,b)
{
var c=QMAddrInput.get(getFocus(),window);
if(c)
{
c.add(a);
if(!b)
{
c.focus("end");
}
}
}
function showQuickAddr(a)
{
var d=getTop(),c=getTop().S("quickaddr_div",window),b=d.QMAddress;
if(!c)
{
return;
}
if(a=='succeed'&&b.isInit())
{
if(c.innerHTML.indexOf('lm_panel')<0)
{
new d.QMLinkman({oData:[{title:"\u6700\u8FD1\u8054\u7CFB\u4EBA",addrs:b.getGroup("hot")}],oDom:c,onproselect:(initComposeForPage.pageId=="postcard"?null:function(){
QMAddrInput.get(getFocus(),window).showMemDlg();
}),onselect:function(e){
var f=b.getAddress(e);
QMAddrInput.get(getFocus(),window).add('"'+f.name+'"<'+f.email+'>',false);
}});
}
}
else{
c.innerHTML=d.TE(['<div style="padding:155px 0 0;text-align:center;">','$@$if($status$=="loading")$@$','<div class="cpright_loading"><span class="loading_icon"></span>\u52A0\u8F7D\u4E2D...</div>','$@$else$@$','<a href="javascript:;" onclick="window.loadAddress();">\u91CD\u65B0\u52A0\u8F7D</a>','$@$endif$@$','</div>']).replace({status:a});
}
return false;
}
;function _getSupportGroup()
{
var a=location.getParams();
return ';compose;compose_postcard;compose_postcard_dlg;compose_card;compose_video;'.indexOf(';'+a['t']+';')>-1&&a['s']!='reply_all';
}
function showSeparatedCopy(a)
{
var m=getTop(),g=m.S("trSC",window),c=!m.isShow(g),k=QMAddrInput.get("sc",window)[c&&!a?"clear":"flush"](),l=!c?k.get("json"):null,j={};
if(l)
{
for(var n=0,d=l.length;n<d;n++)
{
var h=l[n];
j[h.addr]=h.format;
}
}
m.E(["to","cc","bcc"],function(o){
var u=o.toUpperCase();
var t=m.S("a"+u,window);
var q=QMAddrInput.get(o,window).flush();
if(t)
{
m.setClass(t,c?t.className+" nounderline cur_default":m.trim(t.className.replace(/nounderline cur_default/,"")));
t.disabled=c;
}
m.show(m.S("tr"+u,window),!c&&(!t||t.getAttribute("show")=="true"));
if(q)
{
q.disabled(c);
if(!a&&c)
{
k.add(q.get().join("; "));
}
if(l)
{
for(var r=[],s=null,v=0,p=l.length;v<p;v++)
{
if(q.hasAddr((s=l[v]).addr))
{
r.push(s.format);
delete j[s.addr];
}
}
q.clear().add(r.join("; "));
}
}
});
var e=m.S("aSC",window);
if(e)
{
e.innerHTML=(c?"\u53D6\u6D88":"")+"\u5206\u522B\u53D1\u9001";
m.show(e.previousSibling,c);
m.show(e.previousSibling.previousSibling,!c);
}
m.S("separatedcopy",window).value=c.toString();
k.disabled(!c);
m.show(g,c);
if(c)
{
k.focus("end");
}
else{
var f=[];
for(var b in j)
{
f.push(b);
}
QMAddrInput.get("to",window).add(f.join("; "));
QMAddrInput.get("to",window).focus("end");
}
return c;
}
function showInputCtrl(c,a)
{
var e=getTop().S("tr"+c,window);
var f=getTop().S("a"+c,window);
var d=getTop().isShow(e);
var b=QMAddrInput.get(c.toLowerCase(),window);
getTop().show(e,!d);
f.innerHTML=(d?"\u6DFB\u52A0":"\u5220\u9664")+f.innerHTML.substr(2,2);
f.setAttribute("show",d?"false":"true");
b.disabled(d)[a==false||d?"length":"focus"]("end");
getTop().setUserCookieFlag('CCSHOW',c=="CC"?0:1,d?0:1);
return !d;
}
function hideRightArea(b,a)
{
var c=getTop().S("rightArea",window);
if(!c)
{
return;
}
b=!!b;
var d=getTop().S("rightAreaBtn",window);
d.onclick=function(){
hideRightArea(!b);
};
d.innerHTML='<input type="button" hidefocus class='+(!b?'nextfd />':'prefd />');
getTop().show(c,b);
if(!a)
{
getTop().setUserCookieFlag('CCSHOW',2,(!b?'1':'0'));
}
}
function initCookieSetting()
{
var c=getTop().getUserCookie("CCSHOW")||"";
var b=window.QMAddrInput&&QMAddrInput.get("cc",window);
var a=window.QMAddrInput&&QMAddrInput.get("bcc",window);
if(b&&(b.length()||c.charAt(0)==1))
{
showInputCtrl("CC",false);
}
if(a&&(a.length()||c.charAt(1)==1))
{
showInputCtrl("BCC",false);
}
if(getTop().S("rightArea",window)&&c.charAt(2)==1)
{
hideRightArea(false,true);
}
}
function loadValue(a)
{
if(a&&getPageEditor())
{
_fixQQMailStationery("100%");
getInputObj("content_compare",null,true).value=getPageEditor().getContent();
_fixQQMailStationery(getTop().gbIsIE?"auto":"100%");
}
var c=arguments.callee;
var b=c._cache;
getTop().E(c._ctrls,function(e,d){
var f=getInputObj(e,null,true);
if(f&&f.value!=b[d])
b[d]=f.value;
});
}
function getLoadValueCache()
{
return loadValue._cache;
}
loadValue._ctrls=["to","cc","bcc","subject","content_compare"];
loadValue._cache=[];
function _isContentEdited()
{
var c=loadValue._ctrls;
var a=loadValue._cache;
if(getPageEditor())
{
_fixQQMailStationery("100%");
getInputObj("content_compare",null,true).value=getPageEditor()&&getPageEditor().getContent();
_fixQQMailStationery(getTop().gbIsIE?"auto":"100%");
}
for(var f=c.length-1;f>=0;f--)
{
var b=getInputObj(c[f],null,true);
var e=(b&&b.value||"").replace(/<Param .*?\">/ig,"");
var d=(a[f]||"").replace(/<Param .*?\">/ig,"");
if(e!=d)
{
return true;
}
}
return false;
}
function _isFtnUploading()
{
return getTop().QMDialog("ftnupload_attach");
}
function _isFtnComplete()
{
var a=getTop().QMDialog("ftnupload_attach"),b=a&&a.getDialogWin().oMainObj;
return (b&&b.mnUploaderCount==b.mnSuccessCount);
}
function _isFtnCenterUploading()
{
return getTop().QMDialog("ftnupload_self");
}
function _isFtnCenterComplete()
{
var a=getTop().QMDialog("ftnupload_self"),b=a&&a.getDialogWin().oMainObj;
return (b&&b.mnUploaderCount==b.mnSuccessCount);
}
function setNeedCloseConform(a)
{
setNeedCloseConform._mbIsNeedCloseConform=a;
}
function isNeedCloseConform()
{
return setNeedCloseConform._mbIsNeedCloseConform;
}
function _createReloadInfo()
{
var a=getTop();
getTop().goReloadInfo={isconfirm:_isContentEdited(),content:a.filteSignatureTag(getPageEditor().getContent(),"FILTE<:"),subject:a.S("subject",window).value,bacode:a.S("BigAttach",window).innerHTML,deffontinfo:a.extend({},getPageEditor().getDefaultFontInfo())};
}
function _reloadSaveContent(a)
{
var f=getTop().goReloadInfo||getTop().goAsyncContent;
getTop().goReloadInfo=null;
if(f&&f.content)
{
var h=getTop(),d=f.deffontinfo,i=f.bacode,b=a&&a.hideBigAttach,g=getTop().S("subject",window),c=getTop().S("BigAttach",window),e=getPageEditor();
if(b&&i)
{
getTop().showError("\u7FA4\u4FE1\u606F\u6682\u65F6\u4E0D\u652F\u6301\u53D1\u9001\u8D85\u5927\u9644\u4EF6");
i="";
}
if(g)
{
g.value=f.subject;
}
if(c&&i&&i.replace(/\s/ig,""))
{
c.innerHTML=i;
h.show("attachContainer",true,h.getMainWin());
}
if(e&&d)
{
e.setDefaultFontInfo(d.fontName,d.fontSize,d.fontColor);
}
if(e)
{
e.setContent(f.content);
}
}
return f;
}
function confirmCheckBeforeClose()
{
if(window.getFlashCurrentState&&getFlashCurrentState()==401)
{
return "recording";
}
if(getTop().S("voiceid",window)&&getTop().S("voiceid",window).value)
{
return "recorded";
}
if(_isContentEdited())
{
return "content";
}
if(_isFtnUploading())
{
return "ftnuploading";
}
return "exit";
}
function closePage()
{
var a;
if(isNeedCloseConform())
{
var b=(new Array(42)).join("-")+(new Array(5)).join(" ");
if(getTop().isDisableCtl("sendbtn",window))
{
getTop().QMDialog("composeExitAlert","close");
getTop().switchFolder("folder_newmail");
return getTop().T([b,'\n\u63D0\u793A\uFF1A\u60A8\u786E\u5B9A\u8981\u7EC8\u6B62\u5F53\u524D\u884C\u4E3A\uFF1F\n',b]);
}
else if((a=confirmCheckBeforeClose())!="exit")
{
getTop().QMDialog("composeExitAlert","close");
getTop().switchFolder("folder_newmail");
return getTop().T([b,"\n",{"driftcontent":'\u63D0\u793A\uFF1A\u672A\u53D1\u9001\u7684\u5185\u5BB9\u5C06\u4F1A\u4E22\u5931\u3002',"content":'\u63D0\u793A\uFF1A\u672A\u4FDD\u5B58\u7684\u5185\u5BB9\u5C06\u4F1A\u4E22\u5931\u3002',"recording":'\u63D0\u793A\uFF1A\u60A8\u6B63\u5728\u5F55\u5236\u97F3\u89C6\u9891\uFF0C\u672A\u53D1\u9001\u5C06\u4F1A\u4E22\u5931\u3002',"recorded":'\u63D0\u793A\uFF1A\u60A8\u5DF2\u7ECF\u5F55\u5236\u97F3\u89C6\u9891\uFF0C\u672A\u53D1\u9001\u5C06\u4F1A\u4E22\u5931\u3002',"ftnuploading":'\u63D0\u793A\uFF1A\u60A8\u6B63\u5728\u4E0A\u4F20\u6587\u4EF6\uFF0C\u5173\u95ED\u9875\u9762\u5C06\u505C\u6B62\u4E0A\u4F20\u3002'}[a],"\n",b]).replace({content:getPageId()=="note"?"\u8BB0\u4E8B":"\u90AE\u4EF6"});
}
}
setNeedCloseConform(true);
}
function redirectExitURLId(a)
{
if(a==1&&(getTop().QMHistory.tryBackTo("readmail")||getTop().QMHistory.tryBackTo("mail_list")))
{
return;
}
var b=["/cgi-bin/addressbook/addr_listall?","/cgi-bin/today?","/cgi-bin/cardlist?ListType=Cards&Cate1Idx=listall&t=card&loc=cardlist,cardlist,fromtab,1&","/cgi-bin/readtemplate?t=compose&s=cnew&","/cgi-bin/grouplist?t=compose_group&","/cgi-bin/note_list?t=note_first_page&info=1&","/cgi-bin/mail_list?folderid=8&t=mail_list_group&","/cgi-bin/readtemplate?t=compose_audiomail&","/cgi-bin/addr_listall?func=birthcard&t=birth_friendlist&","/cgi-bin/readtemplate?t=compose_video&","/cgi-bin/readtemplate?t=compose_postcard&","/cgi-bin/readtemplate?t=compose_drift&maxage=0&","/cgi-bin/today?t=compose_meeting&"];
if(a<0||a>=b.length)
{
a=1;
}
var c=b[a]+"sid="+getTop().getSid();
if(getTop().bnewwin==1)
{
c+="&newwin=true";
}
getTop().goUrlMainFrm((a==1?getTop().QMHistory.getUrl(getTop().QMHistory.getLastRecordId()):null)||c,false,a>=2&&a<=4);
}
function exitConfirm(a)
{
var h;
var g=getTop();
var d=function(){
if(typeof a=="function")
{
a();
}
else{
g.globalEval(a,window);
}
};
var b=getPageConfig().subtmpl=="draft"&&!location.getParams()["backurl"];
var i=getTop().S("fmailid",window)&&g.S("fmailid",window).value;
if(i==getPageConfig().mailid)
{
i="";
}
if(isNeedCloseConform()&&getPageId()!="remind"&&((h=confirmCheckBeforeClose())!="exit"||(!b&&i&&!goCompose._bIsUserSave)))
{
disableAutoSave();
if(getPageEditor())
{
getPageEditor().saveRange();
}
var c=getTop().S("qqgroupid",window)&&!g.S("qqgroupid",window).disabled;
var f={exitstyle:"",delstyle:"display:none",exitbtn:"\u5426",disattach:g.getMainWin().sendAfterUpload()?"block":"none"};
if(getPageId()=="note")
{
f.title="\u5185\u5BB9\u5DF2\u88AB\u4FEE\u6539\uFF0C\u786E\u5B9A\u4FDD\u5B58\u8BE5\u8BB0\u4E8B\u5417\uFF1F";
}
else if(getPageId()=="postcard")
{
f.title="\u5185\u5BB9\u5DF2\u88AB\u4FEE\u6539\uFF0C\u786E\u5B9A\u4E0D\u53D1\u9001\u6B64\u660E\u4FE1\u7247\u5417\uFF1F";
f.savestyle="display:none;";
f.exitbtn="\u786E\u5B9A";
}
else{
f.title=i&&!b?"\u6B64\u90AE\u4EF6\u5DF2\u4FDD\u5B58\u4E3A\u8349\u7A3F\uFF0C\u662F\u5426\u9700\u8981\u4FDD\u7559\uFF1F":b?"\u8349\u7A3F\u5DF2\u88AB\u4FEE\u6539\uFF0C\u662F\u5426\u8981\u4FDD\u5B58\u6B64\u6B21\u6539\u52A8\uFF1F":"\u5185\u5BB9\u5DF2\u88AB\u4FEE\u6539\uFF0C\u662F\u5426\u8981\u5C06\u6B64\u90AE\u4EF6\u5B58\u4E3A\u8349\u7A3F\uFF1F";
if(!b)
{
f.exitstyle="display:none;";
f.delstyle="";
}
}
var e=new g.QMDialog({sId:"composeExitAlert",sTitle:"\u79BB\u5F00\u63D0\u793A",sBodyHtml:g.TE(['<div class="dialog_feedback">','<span class="dialog_icon icon_info_b"></span>','<div class="dialog_f_c">','<div $@$if($disattach$=="block")$@$class="dialog_f_t"$@$endif$@$>$title$</div>','<div class="dialog_f_d" style="width:370px;display:$disattach$"">\u8BF7\u6CE8\u610F\uFF1A\u5DF2\u8BBE\u5B9A\u4F20\u5B8C\u8D85\u5927\u9644\u4EF6\u540E\u90AE\u4EF6\u81EA\u52A8\u53D1\u9001\uFF0C\u73B0\u5728\u79BB\u5F00\uFF0C\u5C06\u4F7F<br/>\u81EA\u52A8\u53D1\u9001\u5931\u8D25\u3002\u70B9\u201C\u53D6\u6D88\u201D\u53EF\u505C\u7559\u5728\u5199\u4FE1\u9875\u9762\u3001\u7B49\u5F85\u81EA\u52A8\u53D1\u9001\u3002</div>','</div>','</div>','<div class="dialog_operate">','<input type="button" id="btn_exit_save" name="btn_exit_save" class="btn_gray btn_input" value="\u662F" style="$savestyle$" />','<input type="button" class="btn_gray btn_input" value="$exitbtn$" id="btn_exit_notsave" name="btn_exit_notsave" style="$exitstyle$" />','<input type="button" class="btn_gray btn_input" value="\u5426" id="btn_delete_save" name="btn_delete_save" style="$delstyle$" />','<input type="button" class="btn_gray btn_input" id="btn_not_exit" value="\u53D6\u6D88"/>','<div class="clr"></div>','</div>']).replace(f),nWidth:null,nHeight:null,onshow:function(){
var k=this;
if(c||getPageId()=="voice"||getPageId()=="note"||getPageId()=="postcard")
{
try{
k.S("btn_exit_notsave").focus();
}
catch(j)
{
debug("error when focus on element 'btn_exit_notsave'");
}
}
else{
try{
k.S("btn_delete_save").focus();
}
catch(j)
{
debug("error when focus on element 'btn_delete_save'");
}
}
},onload:function(){
var j=this;
g.addEvent(j.S("btn_exit_save"),"click",function(){
if(h!="exit")
{
j.close();
doProcess(getPageId()=="note"?"":"savedraft",{card:"card",note:"send"}[getPageId()]||"save",getPageId()=="note"?1:0);
setNeedCloseConform(false);
d();
}
else{
g.fireMouseEvent(j.S("btn_exit_notsave"),"click");
}
});
g.addEvent(j.S("btn_exit_notsave"),"click",function(){
g.disableAll(true);
j.S("btn_exit_notsave").disabled=true;
setNeedCloseConform(false);
j.close();
d();
});
g.addEvent(j.S("btn_delete_save"),"click",function(){
var k=function(){
if(j.S("btn_exit_notsave"))
{
return g.fireMouseEvent(j.S("btn_exit_notsave"),"click");
}
};
if(i)
{
var l=new g.QMAjaxRequest("/cgi-bin/mail_mgr");
l.onComplete=function(m){
if(m.responseText.indexOf("isMainFrameError")!=-1)
{
l.onError();
}
else{
getTop().hiddenMsg();
getTop().reloadLeftWin();
k();
}
};
l.onError=function(){
g.showError("\u5220\u9664\u8349\u7A3F\u5931\u8D25");
k();
};
l.send(g.T('sid=$sid$&Fun=$fun$&mailaction=$mailaction$&mailid=$mailid$').replace({sid:g.getSid(),fun:"PerDel",mailaction:"mail_del",mailid:i}));
j.S("btn_delete_save").disabled=true;
g.disableAll(true);
g.showInfo("\u6B63\u5728\u5220\u9664\u8349\u7A3F");
}
else{
k();
}
});
g.addEvent(j.S("btn_not_exit"),"click",function(){
j.close();
return false;
});
g.addEvent(j.S("_closebtn_"),"click",function(k){
j.close();
return false;
});
},onbeforeclose:function(){
g.disableAll(false);
enableAutoSave();
return true;
},onclose:function(){
if(getPageEditor())
{
getPageEditor().loadRange();
}
}});
return e;
}
setNeedCloseConform(false);
d();
}
function saveContentGoUrl(a)
{
_createReloadInfo();
setNeedCloseConform(false);
getTop().goUrlMainFrm(a,false,true);
}
function selectGroup(a)
{
a=String(a).indexOf("@groupmail.qq.com")==-1?(a+"@groupmail.qq.com"):a;
var b=getTop().S("Gname_"+a,window);
if(b)
{
getTop().S("qqgroupid",window).value=a;
getTop().S("groupname",window).value=b.innerHTML;
}
}
function useStationery()
{
hideRightArea(true,true);
changeTab("stationery_div");
if((getTop().S("stationery",window).src=="")||(getTop().S("stationery",window).src.indexOf("javascript:")==0))
setTimeout('getTop().S("stationery", window).src="/cgi-bin/readtemplate?t=stationery&sid="+getTop().getSid();',10);
}
function useComposeTmpl()
{
hideRightArea(true,true);
changeTab("compose_tmpl_div");
if(getTop().S("compose_tmpl",window).src=="")
{
var a=getTop().S("compose_tmpl",window);
a.onload=function(){
getTop().S("compose_tmpl_loading",window).style.display="none";
};
a.src="/cgi-bin/readtemplate?t=compose_tmpl&sid="+getTop().getSid();
}
}
function changeTab(a)
{
var f=["AddrTab","stationery_div","card_div","compose_tmpl_div"];
var g=["addr_cmd","stationery_cmd","card_cmd","compose_tmpl_cmd"];
var d=["cptab","cptab cpslt"];
for(var j=0,b=f.length;j<b;j++)
{
var e=getTop().S(f[j],window);
if(e)
{
var c=(a==f[j])?1:0;
getTop().S(g[j],window).className=d[c];
getTop().show(e,c);
}
}
var h=getTop();
h.LogKvEx({businame:'common_stat',item:'webmail|menu|'+a+'|click',sid:h.getSid()});
}
function _autoResizeEditor()
{
var a=arguments.callee;
if(!a._bIsRunning)
{
setTimeout(function(){
_resizeEditor();
setInterval(_resizeEditor,1500);
},getTop().gbIsIE?100:300);
}
}
function _resizeEditor()
{
if(getPageEditor())
{
var h=document.documentElement,g=document.body,i=getPageEditor().getEditorArea(),b=h.clientHeight,f=Math.min(g.scrollHeight,h.scrollHeight)+(getTop().gbIsIE&&getTop().gnIEVer===6?10:0),c=i.clientHeight,d=arguments.callee._nMinHeight||(arguments.callee._nMinHeight=c+15),a=b-f+c;
a=a<d?d:a;
a!=c&&(i.style.height=a+"px");
try{
if(getPageId()=="compose"&&(/Trident\/[67]\./).test(navigator.userAgent)&&!getTop().gbIsEdge)
{
var l=i.getElementsByTagName('iframe')[0];
var k=a*0.9;
if(l.clientHeight<k)
{
l.style.height=k+"px";
}
}
}
catch(j)
{
}
}
}
function autoSave(a)
{
if(a&&_isContentEdited()&&isEnabledAutoSave())
{
getPageId()!="note"?doProcess("autosave","save"):doProcess("note_autosave","save",true);
}
goCompose._oAutoSaveTimer=setTimeout(function(){
autoSave(true);
},getPageId()=="note"?300000:300000);
}
function clearAutoSave()
{
disableAutoSave();
clearTimeout(goCompose._oAutoSaveTimer);
}
function isEnabledAutoSave()
{
var a=arguments.callee._bIsEnableAutoSave;
return typeof a!="boolean"?true:a;
}
function disableAutoSave()
{
isEnabledAutoSave._bIsEnableAutoSave=false;
}
function enableAutoSave()
{
isEnabledAutoSave._bIsEnableAutoSave=true;
}
function _combineBgMusicMail(b,a)
{
if(getTop().S("mailbgmusic",window))
{
getTop().S("mailbgmusic",window).value="use";
}
var c=getTop().getUserInfo("alias");
var d=a.song?getTop().T('<b>$songDisp$</b>($singerDisp$)').replace({songDisp:getTop().htmlEncode(a.song),singerDisp:getTop().htmlEncode(a.singer)}):"";
var e=a.song?getTop().T('<a href="http://music.soso.com/music.cgi?w=$songorg$&pl=$singerorg$" target="_blank">\u67E5\u770B</a>&nbsp;').replace({songorg:a.song,singerorg:a.singer}):getTop().T('<a href="$url$" target="_blank">\u4E0B\u8F7D</a>').replace({url:a.url});
return getTop().T(['$content$','<player id="cmd:bgmusic" url="$url$" song="$song$" singer="$singer$"></player> ','<div id=QQMailBgMusicInfo style="font:12px;color:#909090;">','<br><br><br><br>\u4F60\u7684\u670B\u53CB $alias$ \u4E3A\u8FD9\u5C01\u90AE\u4EF6\u63D2\u5165\u4E86\u80CC\u666F\u97F3\u4E50 - $bgmusic$','$viewurl$&nbsp;','<a id="_bgmusic_play_btn_" href="http://mail.qq.com/zh_CN/htmledition/playmusic.html?song=$song$&singer=$singer$&sender=$encodealias$&url=$encodeurl$" target="_blank">\u64AD\u653E</a>','</div>']).replace({content:b,url:a.url,alias:c,bgmusic:d,viewurl:e,song:a.song?encodeURIComponent(a.song):"",singer:a.singer?encodeURIComponent(a.singer):"",encodeurl:a.url?encodeURIComponent(a.url):"",encodealias:encodeURIComponent(c)});
}
function _checkInRemind(a)
{
var b=a.length;
if(b>20)
{
getTop().msgBox("\u6BCF\u6B21\u53D1\u9001\uFF0C\u597D\u53CB\u4E2A\u6570\u4E0D\u80FD\u8D85\u8FC720\u4E2A\u3002","dialog",true,0,"\u5931\u8D25\u4FE1\u606F");
return false;
}
return true;
}
function doProcessCheck(h,f,e,d)
{
if(f=="voice"&&!CheckVoiceBeforeCompose())
{
return false;
}
if(f=="card"&&window.setBirthCardReceiver&&!setBirthCardReceiver(h=="savedraft"?0:1))
{
return false;
}
var J=getTop(),u=0;
try{
var y={},x=["to","cc","bcc","sc"],k=false,C=[];
var o=false;
if(!(f=="card"&&window.setBirthCardReceiver)&&getPageId()!="qq"&&getPageId()!="note"&&getPageId()!="group"&&getPageId()!="groupsms")
{
for(var p=x.length-1;p>=0;p--)
{
var g=x[p],n=typeof (QMAddrInput)=="undefined",E=window.QMAddrDomainCheck;
if(getPageId()=="card"&&n)
{
var v=y[g]=J.QMAddrInput.get(g,J);
E=J.QMAddrDomainCheck;
}
else if(!n)
{
var z=J.QMDialog('postcard_dlg'),M=window;
if(z)
{
M=z.getDialogWin();
}
var v=y[g]=QMAddrInput.get(g,M);
}
if(!v)
{
continue;
}
if(f=="send"&&E&&!E.permit(v.get('validemail')))
{
J.showError('\u90AE\u4EF6\u5730\u5740\u8FC7\u591A\uFF0C\u65E0\u6CD5\u53D1\u9001\u3002');
return false;
}
if(f=="send"&&(getPageId()=="compose")&&getPageEditor()&&getPageEditor().getContent().indexOf('tmpl_modified="not_modified"')!=-1)
{
J.showError('\u90AE\u4EF6\u4E2D\u6709\u5C1A\u672A\u4FEE\u6539\u7684\u6A21\u677F\u6587\u5B57\uFF0C\u8BF7\u4FEE\u6539');
return false;
}
if(getPageId()=="postcard")
{
if(!checkWordText())
{
return false;
}
}
var w=J.S(g,window);
if(v&&w)
{
var j=w.disabled=v.flush().isDisabled();
var R=w.value=j?"":v.get().join("; ");
if(!j)
{
C=j?"":C.concat(v.get("errhtml"));
if(!k)
{
k=!!R;
}
if(getPageId()=="remind"&&!_checkInRemind(v.get("json")))
{
o=true;
}
}
}
}
if(getPageId()=="remind"&&o)
{
return false;
}
}
else{
k=true;
}
if(getPageId()!="note"&&getPageId()!="group"&&getPageId()!="groupsms"&&!(J.S("separatedcopy",window)&&J.S("separatedcopy",window).disabled)&&(f=="voice"||f=="send"||(f=="card"&&h=="")))
{
if(!k)
{
if(f=="card")
{
J.showError(J.gsMsgNoCardSender);
splashToCtrl(J.QMDialog("GreetingCard").S("bccAreaCtrl"));
J.show(J.S("cardTip",window),true);
}
else if(getPageId()=="postcard")
{
J.showError(J.gsMsgNoSender);
splashToCtrl("bccAreaCtrl");
}
else{
J.showError(J.gsMsgNoSender);
splashToCtrl("toAreaCtrl");
}
for(var T=0,q=x.length;T<q;T++)
{
var v=y[x[T]];
if(v&&!v.isDisabled())
{
v.focus("end");
break;
}
}
return false;
}
u++;
if(e<u)
{
if(C.length)
{
new J.QMDialog({sId:"Address_error",sTitle:"\u6536\u4EF6\u4EBA\u683C\u5F0F\u9519\u8BEF",nWidth:450,nHeight:'auto',sBodyHtml:J.T(['<table width="100%" cellspacing="0" cellpadding="0" style="height:113px;">','<tr><td valign="top" style="line-height:18px;padding:12px 10px 0 12px;text-align:left;word-break:break-all;">','\u60A8\u586B\u5199\u7684\u4EE5\u4E0B\u6536\u4EF6\u4EBA\u5B58\u5728\u683C\u5F0F\u9519\u8BEF\uFF1A','<div style="height:53px;overflow:hidden;margin-top:3px;">','"<b style="color:red;">$result$</b>"','</div>','</td></tr>','</table>']).replace({result:C.join('</b>","<b style="color:red;">')}),sFootHtml:'<input type="button" class="btn_blue btn_input" id="confirm" value="\u786E\u5B9A" />',onload:function(){
var i=this;
J.addEvent(this.S("confirm"),"click",function(){
i.close();
});
},onshow:function(){
this.S("confirm").focus();
}});
return false;
}
}
J.gSendmailSubject=J.S("subject",window).value;
}
}
catch(B)
{
}
try{
var F=J.S("qqgroupid",window);
if((f=="send"||f=="card")&&F&&!F.disabled&&F.value.indexOf("@")==-1)
{
if(f=="card")
{
J.showError("\u8BF7\u9009\u62E9\u4E00\u4E2AQQ\u7FA4");
changeTab("AddrTab");
J.show(J.S("cardTip",window),true);
window.scroll(0,0);
}
else{
J.showError("\u8BF7\u9009\u62E9\u4E00\u4E2AQQ\u7FA4");
}
return false;
}
if(F&&!J.trim(getPageEditor().getContent(true)))
{
J.confirmBox({title:"\u5931\u8D25\u4FE1\u606F",msg:['<div>',"\u7FA4\u90AE\u4EF6\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A\uFF0C\u8BF7\u586B\u5199\u5185\u5BB9",'</div>'].join(""),width:430,onreturn:function(i){
var U=getPageEditor();
U&&U.focus();
}});
return false;
}
if(f=="send"&&getInputObj("mailtype").value=="vote")
{
if(J.S("votesubject",window).value=="")
{
J.showError("\u8BF7\u586B\u5199\u6295\u7968\u4E3B\u9898");
J.S("votesubject",window).focus();
splashToCtrl("votesubject");
return false;
}
var D=J.SN("option",window);
for(var T=0,q=D.length;T<q;T++)
{
if((D[T].value=="")&&(T<2))
{
J.showError(["\u8BF7\u586B\u5199\u9009\u9879",T+1,"\u7684\u5185\u5BB9"].join(""));
D[T].focus();
splashToCtrl(D[T]);
return false;
}
}
}
}
catch(B)
{
}
try{
var G=J.S("subject",window);
if(G.value==J.gsMsgNoSubject)
{
G.value="";
}
var Q=J.isShow(G)?G.value:"";
if(J.getAsiiStrLen(Q)>240)
{
J.showError("\u4E3B\u9898\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7120\u4E2A\u4E2D\u6587\u5B57\u7B26");
return false;
}
u++;
if(e<u)
{
if(!goCompose._bIsSkinSubject&&!J.trim(Q)&&(getPageId()=="compose"||getPageId()=="qfcompose")&&f=="send")
{
J.confirmBox({msg:['<div><strong>',"\u60A8\u7684\u90AE\u4EF6\u6CA1\u6709\u586B\u5199\u4E3B\u9898\u3002",'</strong></div>','<div>',"\u60A8\u786E\u5B9A\u7EE7\u7EED\u53D1\u9001\uFF1F",'</div>'].join(""),width:430,onreturn:function(i){
if(i)
{
setTimeout(function(){
goCompose._bIsSkinSubject=true;
d(u);
},100);
}
}});
return false;
}
}
}
catch(B)
{
}
try{
var K=QMAttach.checkAttachWarnningType();
if(K.length!=0)
{
J.msgBox("\u60A8\u7684\u9644\u4EF6\u4E2D\u5305\u542B\u53EF\u6267\u884C\u6587\u4EF6\uFF1A"+K.join(", ")+"\uFF0C\u51FA\u4E8E\u5B89\u5168\u6027\u8003\u8651\uFF0C\u90AE\u4EF6\u4E2D\u4E0D\u5141\u8BB8\u5305\u542B\u6B64\u7C7B\u9644\u4EF6","dialog",true,0,"\u5931\u8D25\u4FE1\u606F");
return false;
}
var r=QMAttach.getAttachSize('normal'),t=QMAttach.getAttachLimit();
if(r>t)
{
QMAttach.showAttachLimit(t);
return false;
}
if((_isFtnUploading()&&!_isFtnComplete()||_isFtnCenterUploading()&&!_isFtnCenterComplete())&&h!="autosave")
{
u++;
if(e<u)
{
J.confirmBox({sId:"confirmcheckuploading",title:"\u6E29\u99A8\u63D0\u793A",msg:["\u6709\u8D85\u5927\u9644\u4EF6\u8FD8\u672A\u4E0A\u4F20\u5B8C\u6BD5",h=="savedraft"?"\uFF0C\u672A\u4E0A\u4F20\u5B8C\u7684\u9644\u4EF6\u4E0D\u4F1A\u5728\u8349\u7A3F\u4E2D\u4FDD\u5B58":"\uFF0C\u73B0\u5728\u5F3A\u884C\u53D1\u9001\u90AE\u4EF6\u5C06\u4F1A\u4E22\u5931\u9644\u4EF6"].join(""),onreturn:function(i){
if(i)
{
var U=_getSubmitForm();
U&&d(u);
}
}});
return false;
}
}
var I=goCompose._oDomainChecker,m=(getPageConfig().subtmpl=="forward"&&I.getExDomain().length==0),H=_getSubmitForm().sendtime,l=(H&&H.value=="1");
if(I&&h!="savedraft"&&h!="autosave"&&!m&&!l)
{
u++;
if(e<u)
{
var A=I.getAttachLimit(),s=A.nLim,L=A.oUnknown,c=1024*1024,b=QMAttach.mnAttBigSizeIn*c,a=QMAttach.mnAttBigSizeEx*c;
if(!L.length&&r>b&&r<s)
{
A.type=1;
}
else if(A.sDom&&r>s)
{
A.type=2;
}
else if(L.length>0&&r>a)
{
A.type=3;
A.sUnkDom=L[0];
}
if(A.type&&b>0)
{
new J.QMDialog({sTitle:"\u9644\u4EF6\u63D0\u793A",nWidth:430,nHeight:178,sBodyHtml:J.TE(['<div style="padding:10px 0 5px 10px;text-align:left;">','<img src="$image_path$ico_question.gif" align="absmiddle" style="float:left;margin:5px 10px 0;">','<div style="padding-top:10px;word-break:break-all;line-height:150%;margin:0 10px 10px 65px;" class="b_size">','$@$if($type$==1)$@$','<div class="bold" style="margin-bottom:10px;">\u60A8\u6DFB\u52A0\u7684\u9644\u4EF6\u6587\u4EF6\u8D85\u8FC7$baseattsize$</div>','\u5EFA\u8BAE\u60A8\u8F6C\u4E3A\u8D85\u5927\u9644\u4EF6($aboutmore$)\u53D1\u9001\u3002<br>','<div class="addrtitle">\u8D85\u5927\u9644\u4EF6\u4E0D\u6C38\u4E45\u4FDD\u5B58\uFF0C\u66F4\u73AF\u4FDD\uFF0C\u5BF9\u65B9\u4E5F\u53EF\u4EE5\u9AD8\u901F\u4E0B\u8F7D\u3002</div>','$@$else$@$','<div class="bold"  style="margin-bottom:10px;">\u6B64\u5C01\u90AE\u4EF6\u9644\u4EF6\u5DF2\u8FBE$attsize$</div>','$@$if($type$==3)$@$','$sUnkDom$\u90AE\u7BB1\u53EF\u80FD\u65E0\u6CD5\u63A5\u6536\u8F83\u5927\u7684\u90AE\u4EF6\u3002','$@$else if($type$==2)$@$','$sDom$\u90AE\u7BB1\u53EF\u80FD\u4E0D\u63A5\u6536\u8D85\u8FC7$sLim$\u7684\u90AE\u4EF6\u9644\u4EF6\u3002','$@$endif$@$','<br/>\u5EFA\u8BAE\u5C06\u666E\u901A\u9644\u4EF6\u76F4\u63A5\u8F6C\u4E3A\u8D85\u5927\u9644\u4EF6($aboutmore$)\u53D1\u9001\uFF0C','\u8BA9\u90AE\u4EF6\u4E0D\u53D7\u5BF9\u65B9\u90AE\u7BB1\u5927\u5C0F\u9650\u5236\u3002','$@$endif$@$','</div>','</div>','<div style="text-align:right;position:absolute;bottom:0px;right:0;left:0;width:100%;">','<div style="padding:0 27px 12px 0;">','<input type="button" class="btn" id="bigAttSend" value="\u662F\uFF0C\u4F7F\u7528\u8D85\u5927\u9644\u4EF6"> ','$@$if($type$==1)$@$','&nbsp;&nbsp;<a id="send" value="" nocheck="true">\u4E0D\uFF0C\u4F7F\u7528\u666E\u901A\u9644\u4EF6</a> ','$@$else$@$','&nbsp;&nbsp;<a type="button" id="send" value="" nocheck="true">\u4E0D\uFF0C\u4F7F\u7528\u666E\u901A\u9644\u4EF6</a> ','&nbsp;&nbsp;&nbsp;&nbsp;<a type="button" id="compose" value="" nocheck="true">\u53D6\u6D88</a> ','$@$endif$@$','</div>','</div>']).replace(J.extend(A,{image_path:J.getPath("image"),aboutmore:'<a href="http://service.exmail.qq.com/cgi-bin/help?subtype=1&&no=1000593&&id=35" target="_blank">\u8BE6\u60C5</a>',attsize:QMAttach._formatSize(r),baseattsize:QMAttach._formatSize(b),sLim:QMAttach._formatSize(s)})),onshow:function(){
this.S("bigAttSend").focus();
},onload:function(){
var U=this;
function i(V)
{
var X=_getSubmitForm().exstore,W=_getSubmitForm().bigattachcnt;
X&&(X.value=(V==2));
W&&V==2&&(W.value=1);
U.close();
if(V>0)
{
setTimeout(function(){
d(u);
},100);
J.ossLog("delay","all","stat=nothing&locval=,,attbigsize,"+(A.type*10+V));
}
}
J.addEvent(U.S("bigAttSend"),"click",function(){
i(2);
});
J.addEvent(U.S("send"),"click",function(){
i(1);
});
J.addEvent(U.S("compose"),"click",function(){
i(0);
});
J.ossLog("delay","all","stat=nothing&locval=,,attbigsize,"+A.type);
}});
return false;
}
}
}
}
catch(B)
{
debug(["attach check",B.message],61882714);
}
u++;
if(e<u)
{
try{
var P=getPageConfig().subtmpl;
if(!goCompose._bIsSkinNoAttach&&h!="savedraft"&&h!="autosave"&&P!="reply"&&P!="reply_all"&&P!="forward"&&P!="draft"&&P!="content"&&J.S("AttachFrame",window)&&!QMAttach.hasAttach(true))
{
var Q=J.isShow(J.S("subject",window))?J.S("subject",window).value:"";
var N=getPageEditor().getContent(true);
var O=/attachment|attachments/ig;
if(Q.indexOf("\u9644\u4EF6")!=-1||N.indexOf("\u9644\u4EF6")!=-1||Q.search(O)!=-1||N.search(O)!=-1)
{
J.confirmBox({msg:['<div style="padding:0 10px 0 0;"><b>',"\u60A8\u7684\u90AE\u4EF6\u5185\u5BB9\u63D0\u5230\u9644\u4EF6\uFF0C\u4F46\u60A8\u53EF\u80FD\u5FD8\u8BB0\u4E86\u6DFB\u52A0\u9644\u4EF6\u3002",'</b></div>','<div>',"\u60A8\u786E\u5B9A\u7EE7\u7EED\u53D1\u9001\uFF1F",'</div>'].join(""),width:430,onreturn:function(i){
if(i)
{
goCompose._bIsSkinNoAttach=true;
setTimeout(function(){
d(u);
},100);
}
}});
return false;
}
}
}
catch(B)
{
debug(["attach add",B.message],61882714);
}
}
return true;
}
function doProcessSafe(c,b,a)
{
try{
a();
}
catch(d)
{
var e=arguments.callee,f=getPageId()=="note"?"\u65E5\u5FD7\u4FDD\u5B58\u5931\u8D25 ":"\u90AE\u4EF6\u53D1\u9001\u5931\u8D25 ";
if(d.dispmode=="dialog")
{
getTop().msgBox(d.message,"dialog",true,0,f);
}
else if(b=="voice"||b=="send"||(b=="card"&&c==""))
{
getTop().msgBox(getTop().T(['<div>','\u5931\u8D25\u539F\u56E0\uFF1A$desc$ ','<div style="display:$cache$">\u5931\u8D25\u7801\uFF1A$code$ ','(<a href="http://support.qq.com/cgi-bin/beta1/titlelist_simple?pn=0&order=3&fid=350" target="_blank" title="\u628A\u5931\u8D25\u539F\u56E0\u4E0E\u5931\u8D25\u7801\u53D1\u5230\u90AE\u7BB1\u53CD\u9988\u610F\u89C1\uFF0C\u6211\u4EEC\u4F1A\u5C3D\u5FEB\u5904\u7406\uFF01">\u62A5\u544A\u5931\u8D25\u539F\u56E0</a>)','</div>','</div>','<div style="color:red;display:$cache$">','\u8BF7\u5C1D\u8BD5\u6E05\u7A7A\u6D4F\u89C8\u5668\u7F13\u5B58\uFF0C\u7136\u540E\u91CD\u65B0\u8FDB\u5165\u90AE\u7BB1\u3002','<a href="http://service.exmail.qq.com/cgi-bin/help?subtype=1&&id=7&&no=339" target="_blank">\u67E5\u770B\u5E2E\u52A9</a>','</div>']).replace({desc:d.message,code:e._mnCurProcessId,cache:d.clrcache==false?"none":""}),"dialog",true,0,f);
getTop().recodeComposeStatus(4,null,[e._mnCurProcessId,encodeURIComponent(d.message)].join('|'),true);
}
else{
getTop().showError(d.message);
}
getTop().disableAll(false);
enableAutoSave();
}
}
function _patseHTML(b)
{
var e=this;
var a={S:function(f){
return _oTop.S(f,_oTop.getMainWin());
},E:_oTop.E,T:_oTop.T,TE:_oTop.TE,attr:_oTop.attr,insertHTML:_oTop.insertHTML,GelTags:_oTop.GelTags,addEvent:_oTop.addEvent,getEventTarget:_oTop.getEventTarget,isObjContainTarget:_oTop.isObjContainTarget};
function c(j,f)
{
var h=_oTop.getMainWin(),i=a.GelTags("script",f.document.body),g=j;
f.gnScriptIdx=-1;
f.document.write=function(k){
i[f.gnScriptIdx]&&a.insertHTML(i[f.gnScriptIdx],"afterEnd",k);
};
a.E(i,function(l,k){
f.gnScriptIdx=k;
try{
_oTop.globalEval(l.innerHTML,h);
}
catch(m)
{
debug(m);
}
});
}
function d()
{
var f=_oTop.getMainWin();
f.document.body.onbeforeunload=null;
f.clearAutoSave();
}
_oTop.getMainWin().document.body.innerHTML="&nbsp;"+b;
setTimeout(function(){
c(b,_oTop.getMainWin());
d();
});
}
function composeFormSubmit(a,b)
{
if(!a)
{
return;
}
var c,g=getPageId();
var d=QMAttach.getExistList(),h=d.length?QMAttach.getExistInfos()[d[d.length-1]]._sMode:"";
if(("compose"==g||"group"==g)&&"save"!=a.actiontype.value&&"tradition"!=h&&"ie"!=h&&"1"==getTop().gbBackGroundSend&&(c=getTop().BackGroundSend))
{
doProcessSafe._mnCurProcessId=85;
setNeedCloseConform(false);
getTop().showProcess(0);
c.send(a,g);
}
else{
if(navigator.userAgent.indexOf('Edge/17.17134')!==-1&&b=='send')
{
var r=new FormData(a);
jQuery.ajax({url:a.action+'?resp_charset=UTF8',method:'POST',processData:false,contentType:false,headers:{'Content-Type':'multipart/form-data'},data:r,success:function(e){
_patseHTML(e);
}});
}
else{
a.submit();
}
}
doProcessSafe._mnCurProcessId=90;
if(a.verifycode)
{
a.verifycode.value="";
}
if(a.verifycode_cn)
{
a.verifycode_cn.value="";
}
var f=getTop().S('online_document_file_form',window);
if(f&&window.fetch)
{
var w=f['key'].value;
var l=[];
for(var t=0;t<a.elements.length;t++)
{
var u=a.elements[t];
if(u.name=='to')
{
var x=u.value.split(';');
for(var v=0;v<x.length;v++)
{
var k=getTop().trim(x[v]);
try{
var y=/".+?"<(.+?)>/g.exec(k)[1];
l.push(',0,,'+y+',,,,');
}
catch(q)
{
}
}
}
}
var m=[];
for(var t=0;t<l.length;t++)
{
m.push('collaborators='+encodeURIComponent(l[t]));
}
function s(e,z)
{
var j=new RegExp("(^|&)"+e+"=([^&]*)(&|$)");
if(z)
{
var i=z.match(j);
}
else{
var i=getTop().location.search.substr(1).match(j);
}
if(i!=null)
{
if(/^[\u4e00-\u9fa5]+$/.test(decodeURIComponent(i[2])))
{
return i[2];
}
else{
return jQuery("<div/>").text(i[2]).html();
}
}
return null;
}
var n=decodeURIComponent(s('url'));
var o=n.substr(n.indexOf('?'));
var p=s('docsid',o);
jQuery.ajax({url:'https://doc.qmail.com/docs/authority/add?docsid='+p,method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},data:getTop().T('key=$key$&$collaborators$').replace({sid:getTop().getSid(),key:w,collaborators:m.join('&')}),xhrFields:{withCredentials:true},crossDomain:true,success:function(e){
console.log('request succeeded with JSON response',e);
}});
return;
}
}
function doProcess(e,d,a,b,c)
{
doProcessSafe(e,d,function(){
doProcessSafe._mnCurProcessId=00;
if(getTop().isDisableCtl("sendbtn",window))
{
return;
}
doProcessSafe._mnCurProcessId=10;
if(!doProcessCheck(e,d,c||0,function(i){
doProcess(e,d,a,b,i);
}))
{
return;
}
doProcessSafe._mnCurProcessId=20;
disableAutoSave();
var t=_getSubmitForm();
t.target="actionFrame";
doProcessSafe._mnCurProcessId=30;
var u=null;
var o=getPageEditor();
if(!o)
{
if(window.GetSendContent)
{
u=window.GetSendContent(e,d,a,b,c);
}
else{
throw {message:"\u65E0\u6CD5\u83B7\u53D6\u7F16\u8F91\u5668"};
}
}
else{
_fixQQMailStationery("100%");
if(d=="send"&&(getPageId()=="compose"))
{
getTop().removeSelf(getTop().S("tmpl_style",o.getEditWin()));
}
u=o.getContent();
var q=document.getElementById("feedbackform");
if(q!=null)
{
var z="",y="",x="",v=document.getElementsByTagName("input");
for(var w=0;w<v.length;w++)
{
if(v[w].id=="exception")
{
if((v[w].getAttribute("isnull")=="no")&&(v[w].value.length==0))
{
z=v[w].name+"\u4E0D\u80FD\u4E3A\u7A7A!";
v[w].focus();
getTop().showError(z);
return;
}
else{
y+=v[w].name+": "+v[w].value+"<br/>";
}
}
}
var n=document.getElementById("cal");
if(n!=null)
{
x+="\u5F02\u5E38\u90AE\u4EF6\u53D1\u9001\u65F6\u95F4: "+n.innerHTML;
}
var r=document.getElementById("timeh");
if(r!=null)
{
var l=parseInt(r.getAttribute("v"));
if(l>=10)
x+=" "+r.getAttribute("v");
else x+=" 0"+r.getAttribute("v");
}
var s=document.getElementById("timem");
if(s!=null)
{
var m=parseInt(s.getAttribute("v"));
if(m>=10)
x+=" : "+s.getAttribute("v");
else x+=" : 0"+s.getAttribute("v");
}
if(x.length!=0)
{
x+="<br/>";
}
y+=x;
u=y+"\u5907\u6CE8\u4FE1\u606F\u5982\u4E0B: <br/>"+u;
}
_fixQQMailStationery(getTop().gbIsIE?"auto":"100%");
u=_addDefaultFontStyle(u);
try{
getInputObj("content_compare",null,true).value=u;
}
catch(p)
{
}
u=getTop().filteSignatureTag(filterSourceContent(u),"FILTE<:");
}
if(u==null)
{
throw {message:"\u65E0\u6CD5\u83B7\u53D6\u7F16\u8F91\u5668\u5185\u5BB9"};
}
doProcessSafe._mnCurProcessId=31;
doProcessSafe._mnCurProcessId=32;
if(d=="voice")
{
u=CombineVoiceMail(u,getTop().S("voiceid",window).value,getTop().S("voicename",window).value);
DisableRecord();
}
doProcessSafe._mnCurProcessId=33;
if(o&&o.getBgMusicInfo())
{
u=_combineBgMusicMail(u,o.getBgMusicInfo());
}
doProcessSafe._mnCurProcessId=40;
if(d!='save')
{
getTop().audioStop();
}
doProcessSafe._mnCurProcessId=72;
function k()
{
var N="";
var B=((o&&(((o.getContentType&&o.getContentType())=="text")||(o._msEditCore=="txt")))||false),A=(e===""&&d==="send");
if(getTop().S("BigAttach",window))
{
var af=getTop().GelTags("div",getTop().S("BigAttach",window)),E=0,D=new RegExp("bmp|doc|eml|exl|gif|html|jpg|mov|pdf|ppt|psd|rar|swf|tu|txt"),aa=getTop().T(['<div style="padding:10px 0;font-size:12px;">','<div title="%filename%&#10;&#13;\u6587\u4EF6\u5927\u5C0F\uFF1A%filesize%&#10;&#13;\u5230\u671F\u65F6\u95F4\uFF1A%expiredtimeString%" class="bigatt_bt">','<div style="float:left;margin:2px 8px 0 0;">','<a target="_blank" href="%downloadlink%"><img border="0" src="http://res.mail.qq.com/zh_CN/htmledition/images/fj/fu_%filetype%.gif"/></a>','</div>','<div class="name_big" >','<span class=\'qqmailbgattach\' expiretime="%expiretime%" downloadlink="%downloadlink%"	>','<a style="color:#000;" target="_blank" href="%downloadlink%">%filename%</a><span style="color:#A0A0A0;"> (%filesize%, %expiredtimeDesc%)</span>','</span>','<div class="down_big">','<a target="_blank" href="%downloadlink%">\u8FDB\u5165\u4E0B\u8F7D\u9875\u9762</a><span style="display:none;">\uFF1A%downloadlink%</span>','</div>','</div>','</div>','</div>'],"%");
for(var ad=af.length-1;ad>=0;ad--)
{
if(getTop().isShow(af[ad])&&(!af[ad].getAttribute("uncomplete")))
{
var L=getTop().GelTags("span",af[ad])[0],K=getTop().GelTags("a",af[ad])[0].href,F=L.getAttribute("expiretime");
if(!F)
{
L=getTop().GelTags("span",L)[0];
F=L.getAttribute("expiretime");
}
var W=L.firstChild.nodeValue||L.firstChild.innerHTML,R=L.firstChild.nodeValue,U=L.firstChild.nodeValue.split(".").pop(),I=/\(\s*(?:([^,\s]+)\s*|(\S*)\s*,.*)\)/ig.exec(L.childNodes[1].innerText),T=I&&I.length>2&&I[1]||I[2]||"1K",Q=getTop().formatDate(new Date(parseInt(F)*1000),"$YY$\u5E74$MM$\u6708$DD$\u65E5 $hh$:$mm$");
if(!D.test(U))
{
U="qita";
}
if(o&&o.getContentType()=="text")
{
N+=(L.innerText||L.textContent)+(Q!="NaN"?" (\u6709\u6548\u65F6\u95F4\u5230: "+Q+")":"")+"\n\u94FE\u63A5: "+K+"\n\n";
}
else{
N+=aa.replace({filename:R,filesize:T,filetype:U,expiretime:F,expiredtimeString:(Q!="NaN"?Q:""),expiredtimeDesc:(F=="-1"?"\u65E0\u9650\u671F":Q+" \u5230\u671F"),downloadlink:K});
}
E++;
}
}
if(E>0&&t.bigattachcnt)
{
t.bigattachcnt.value=E;
}
}
doProcessSafe._mnCurProcessId=50;
if(N)
{
var G=getTop().T(['<div id=QQMailBigAttach style="padding: 2px; margin-bottom: 15px;background-color:#E0ECF9;width:auto;font-family:Verdana,Arial,Tahoma;font-size:14px;" >','<hr style="display:none;" />','<div style="text-align:left;padding: 6px 0pt 10px 6px;">','<b style="font-size: 14px;"><img border="0" align="absmiddle" style="margin-right:4px;" src="http://res.mail.qq.com/zh_CN/htmledition/images/icon_att.gif"/>\u4ECE%domain%\u90AE\u7BB1\u53D1\u6765\u7684\u8D85\u5927\u9644\u4EF6</b>','</div>','<div style="padding: 0pt 8px 6px 12px;background:#fff;">','<div style="clear:both;" >%bigattachlist%</div>','</div>','</div>'],"%");
var O="";
var P="\u817E\u8BAF\u4F01\u4E1A";
var C=o&&o.getContentType()=="text";
if(C)
{
O="\u4EE5\u4E0B\u6587\u4EF6\u901A\u8FC7"+P+"\u90AE\u7BB1\u7684\u4E2D\u8F6C\u7AD9\u53D1\u7ED9\u60A8\u3002\u4FDD\u5B58\u65F6\u95F4\u6709\u9650\u5236\uFF0C\u8BF7\u53CA\u65F6\u63D0\u53D6\u3002";
u+="\n\n\n"+new Array(60).join("-")+"\n"+O+"\n"+N;
}
else{
u+=G.replace({domain:P,bigattachlist:N});
}
}
doProcessSafe._mnCurProcessId=60;
u=getTop().fixNonBreakSpace(u);
if(QMCharCode.hasNonGbkChar(u))
{
a=true;
getInputObj("sendcharset").value="utf-8";
}
if(!B)
{
if(o&&o.getContentByHasMapWarpLink&&A)
{
u=o.getContentByHasMapWarpLink(u);
}
}
if((d=="send")&&(getPageId()=="compose")&&o&&getTop().S("tmpl_module",o.getEditWin()))
{
u=u.replace(/un="tmpl_default"/ig,"").replace(/tmpl_index="\d+"/ig,"").replace(/tmpl_background="url.*?"/ig,"");
u=u.replace(/BACKGROUND: url\(\/\/exmail.qq.com\//g,"background: url(//exmail.qq.com/");
}
t.content.value=u.replace(/<\/:includetail.*?>/ig,"").replace(/<:includetail.*?>/ig,"").replace(/<\/:sign.*?>/ig,"").replace(/<:sign.*?>/ig,"");
doProcessSafe._mnCurProcessId=70;
getTop().disableAll(true,window);
doProcessSafe._mnCurProcessId=71;
e!=null?t.t.value=e:null;
t.actiontype.value=d;
getTop().isSaveData=false;
QMAttach.setInput(getTop().S("cattachlist",window),getTop().S("upfilelist",window));
try{
var ai=getTop().S("st_replytime",window);
ai.value=(+new Date()-getTop().currentReadMailStartTime);
}
catch(ac)
{
}
doProcessSafe._mnCurProcessId=74;
if(d=="voice"||d=="send"||(d=="card"&&e==""))
{
doProcessSafe._mnCurProcessId=75;
if(d=="card")
{
if(!CheckHasSetCard())
throw {message:getTop().gsMsgNoCard,clrcache:false};
ComposeCard(u);
}
t.actiontype.value="send";
doProcessSafe._mnCurProcessId=76;
if(getPageId()=="note")
{
getTop().showProcess(1,1,"\u8BB0\u4E8B\u4FDD\u5B58\u4E2D");
}
else{
var Z=["<img src='",getTop().getPath("image"),"newicon/a_send.gif' width='14px' height='14px' align='absmiddle'>&nbsp;",getTop().gsMsgSend].join("");
getTop().showProcess(1,false,Z);
}
doProcessSafe._mnCurProcessId=77;
if(getPageId()!="note"&&t.action.indexOf("/cgi-bin/compose_send")!=-1)
{
getTop().gSendTimeStart=new Date();
try{
var H=QMAttach.getExistList(),M={cgitm:getTop().g_cgiTimeStamp||0,clitm:getTop().g_clientTimeStamp||0,comtm:getTop().gSendTimeStart.valueOf(),supflash:getTop().qmFlash.isSupported(),supactivex:getTop().detectActiveX(2,1),suphtml5:QMAttach._isSupportHTML5Drag(),logattcnt:H.length,logattsize:QMAttach.getAttachSize(),logattmethod:H.length?QMAttach.getExistInfos()[H[H.length-1]]._sMode:""};
for(var ae in M)
{
var J=document.createElement("input");
J.type="hidden";
J.name=ae;
J.value=M[ae];
t.appendChild(J);
}
}
catch(ac)
{
}
}
doProcessSafe._mnCurProcessId=78;
}
else{
getTop().isSaveData=true;
if(e=="savedraft")
{
if(d=="card")
{
if(!CheckHasSetCard())
{
throw {message:getTop().gsMsgNoCard};
}
ComposeCard(u);
}
getTop().showProcess(1,1,getTop().gsMsgAutoSave);
}
else{
getTop().showProcess(1,1,getPageId()=="note"?"\u8BB0\u4E8B\u6B63\u5728\u88AB\u4FDD\u5B58":getTop().gsMsgAutoSave);
}
}
doProcessSafe._mnCurProcessId=80;
getTop().isUseActiveXCompose=false;
if(getTop().gbIsOpera)
{
var J=document.createElement("input");
J.type="hidden";
J.name="random";
J.value=Math.random();
t.appendChild(J);
}
if(getPageId()=="groupsms")
{
var ab=getTop(),V=o.getContent().toLowerCase(),X=o.getContent(true),Y=ab.trim(X.replace(/&nbsp;/ig,''));
if(!Y&&V.indexOf("<img")<0)
{
ab.showError("\u7FA4\u90AE\u4EF6\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A\uFF0C\u8BF7\u586B\u5199\u5185\u5BB9");
ab.disableCtl('sendbtn',false,window);
return false;
}
else if(!Y&&V.indexOf("<img")>=0&&!t.subject.value)
{
t.subject.value="\u56FE\u7247";
}
else if(Y)
{
t.subject.value='';
}
}
if(e!="autosave"&&d!="save"&&getTop().QMAddress)
{
getTop().QMAddress.setExpired(true);
}
getInputObj("newsnapcnt",null,true).value=0;
if(getTop().gbIsChrome&&getTop().gsChromeVer.split(".")[0]>41)
{
var ag=/data:image\/jpeg;base64/g,ah=t.content.value.match(ag);
getInputObj("newsnapcnt",null,true).value=(ah!=null)?ah.length:0;
}
composeFormSubmit(t,d);
}
function j(i)
{
getTop().showProcess(2,1,i,"\u9644\u4EF6\u4E0A\u4F20\u4E2D");
}
function g()
{
doProcessSafe(e,d,function(){
k();
});
}
function h(i)
{
doProcessSafe(e,d,function(){
doProcessSafe._mnCurProcessId=71.1;
if(!i&&QMAttach.hasUploadError())
{
return getTop().confirmBox({msg:getTop().T("\u4E0A\u4F20\u9644\u4EF6\u51FA\u9519\uFF01\n\u60A8\u786E\u5B9A\u8981$action$\u8FD9\u5C01\u7F3A\u5931\u9644\u4EF6\u7684\u90AE\u4EF6\u5417\uFF1F").replace({action:d=="save"?"\u4FDD\u5B58":"\u53D1\u9001"}),onreturn:function(A){
doProcessSafe._mnCurProcessId=71.2;
if(A)
{
g();
}
else{
getTop().cancelDoSend();
}
}});
}
doProcessSafe._mnCurProcessId=71.3;
g();
});
}
var f=false;
getTop().createBlankIframe(getTop(),{id:"sendmailFrame",onload:function(){
if(f)
{
getTop().doSendFinishCheck(this);
}
else{
f=true;
doProcessSafe._mnCurProcessId=73;
t.target="sendmailFrame";
if(e=="autosave")
{
h(true);
}
else{
QMAttach.onprogress=j;
QMAttach.onfinish=h;
QMAttach.upload();
}
}
}});
});
}
function _composeKeyDown(a)
{
var d=getTop();
var c=a.srcElement||a.target;
var f=d.addrHint;
f&&f.monitorKeyDown&&f.monitorKeyDown(a);
if(f&&typeof f.isHintPanelShow=='function'&&f.isHintPanelShow()&&typeof f.monitorKeyDown=='function'&&c.tagName.toLowerCase()=='body'&&(a.keyCode==38||a.keyCode==40||a.keyCode==13))
{
a.preventDefault();
return false;
}
else{
var e=location.href;
if(a.keyCode==10||a.keyCode==13||a.keyCode==83)
{
if(((a.keyCode!=83&&a.ctrlKey)||(a.keyCode==83&&a.altKey))&&e.indexOf('compose_postcard_dlg')<0)
{
getTop().fireMouseEvent(getTop().SN("sendbtn",window)[0],"click");
}
else if(a.keyCode==10||a.keyCode==13)
{
if(c.id=="subject"||c.id=="to"||c.id=="cc"||c.id=="bcc")
{
return false;
}
}
}
else if(a.ctrlKey||a.metaKey)
{
if(a.keyCode==83||a.keyCode==115)
{
if(isEnableAutoSave()&&e.indexOf("=compose_")==-1&&e.indexOf("=compose")!=-1)
{
doProcess('savedraft','save');
}
}
else if((a.keyCode==86||a.keyCode==118)&&e.indexOf("t=compose")!=-1&&e.indexOf("_card")==-1&&!a.cancelBubble)
{
QMAttach.selectFile("clipboard",a);
}
}
else if(a.keyCode==27)
{
var b=getPageEditor();
if(b&&b.getEditorCustomVar&&b.getEditorCustomVar('FullScreenToolbar.bUseFullEdtior'))
{
b.getEditorCustomVar('FullScreenToolbar.gooutFullScreenEditor')();
}
}
return true;
}
}
function _composeKeyUp(a)
{
var b=getTop();
var c=b.addrHint;
var e=b.QMAddress;
var d=getPageEditor().getEditWin();
if(c&&e)
{
c.monitorKeyUp(a,d);
}
return true;
}
function _composeBlur(a)
{
var b=_oTop.addrHint;
if(b&&typeof b.closeHint=='function')
{
b.closeHint();
}
}
function initFileTransporter(a)
{
var b=getTop(),c="ftnupload_attach";
var d=b.T("/cgi-bin/readtemplate?sid=$sid$&t=ftn_bigattach$autoselect$").replace({sid:b.getSid(),autoselect:a?"&cmd=bigattachUpload,1,1":""});
b.QMDialog(c,"max")||new b.QMDialog({sId:c,sTitle:"<span class='attach_add_title'>\u6DFB\u52A0\u8D85\u5927\u9644\u4EF6</span>",bMin:true,nWidth:467,nHeight:476,sUrl:d,onbeforeclose:function(){
if(this.getDialogWin()["_msg"])
{
this.getDialogWin()["_msg"]("/FtnUI/Dlg_close");
var e=this.getDialogWin()["_bRet"];
return typeof (e)=="undefined"?true:e;
}
return true;
}});
b.LogKvEx({businame:'common_stat',item:'webmail|menu|bigattach|click',sid:b.getSid()});
}
function showInstallActiveXDialog(a)
{
var b=getTop().detectActiveX(a=="filetransport"?3:0);
var e="\u817E\u8BAF",f=e+"\u90AE\u7BB1"+getTop().QMAXInfo.getTitle()+"\u5B89\u88C5\u63D0\u793A";
var c=getTop().T(['<div id="optContainer">','<div style="padding:20px 0 0 20px;line-height:1.5;height:115px;*height:135px;text-align:left;overflow:hidden;">','<div style="height:100px;float:left;margin-top:-6px;">','<img src="$images_path$ico_question.gif" />','</div>','<div id="setupMsg" >','<b>\u60A8\u8FD8\u672A\u5B89\u88C5\u817E\u8BAF\u90AE\u7BB1\u622A\u5C4F\u63D2\u4EF6\u3002</b><br>\u5B89\u88C5\u540E\uFF0C\u60A8\u53EF\u4EE5\u4F7F\u7528\u4EE5\u4E0B\u529F\u80FD\uFF1A<br>',getTop().gbIsIE||getTop().gbIsFF?'<input hidefocus="" type="button" style="margin:2px 5px 0;" class="ico_att">\u62D6\u62FD\u4E0A\u4F20\u9644\u4EF6<br>':'','<input hidefocus="" type="button" style="margin:2px 5px 0;" class="ico_attbig">\u8D85\u5927\u9644\u4EF6<br>','<input hidefocus="" style="background: url($images_path$newicon/compose.png) no-repeat -80px 0px;margin:2px 5px 0;height:16px;width:16px;padding:0;border:0;" type="button" unselectable="on">\u622A\u5C4F','</div>','</div>','<div class="dialog_operate">','<a id="setup" class="btn_blue" style="width:60px" target="_blank" href="$download$">\u4E0B\u8F7D$opt$</a>','<a id="cancel" class="btn_gray" style="width:40px" href="javascript:;">\u53D6\u6D88</a>','</div>','</div>']);
var d=getTop();
new d.QMDialog({sId:"activexDialog",sTitle:f,sBodyHtml:c.replace({control:getTop().QMAXInfo.getTitle(),images_path:getTop().getPath("image",true),download:"http://mail.qq.com/cgi-bin/readtemplate?t=browser_addon&check=false&returnto="+encodeURIComponent(encodeURIComponent(location.protocol+"//"+location.hostname+"/cgi-bin/frame_html?sid="+getTop().getSid())),opt:b?"\u5347\u7EA7":"\u5B89\u88C5"}),nWidth:400,nHeight:210,onload:function(){
var g=this;
d.addEvent(g.S("cancel"),"click",function(){
d.QMDialog("activexDialog","close");
});
},onshow:function(){
this.S("setup").focus();
}});
if({"compose":true,"card":true,"note":true}[getPageId()])
{
autoSave(true,null);
}
}
function initSendTimeInput(a,b)
{
var k=new Date();
var g=getTop().trim(a.replace(/\D/ig," ").replace(/ +/ig," ")).split(" ");
var f=k.getFullYear();
if(g[0]=="")
{
var g=getTop().trim(a).split("\u6708");
var j={'\u6B63':1,'\u4E00':1,'\u4E8C':2,'\u4E09':3,'\u56DB':4,'\u4E94':5,'\u516D':6,'\u4E03':7,'\u516B':8,'\u4E5D':9,'\u5341':10,'\u5341\u4E00':11,'\u814A':12,'\u521D':0,'\u5EFF':20};
var e=j[g[0]];
var c=j[g[1].charAt(1)];
if(c==10)
{
var d={'\u521D':10,'\u4E8C':20,'\u5EFF':20,'\u4E09':30}[g[1].charAt(0)];
}
else{
var d=j[g[1].charAt(0)]+c;
}
for(var m=f-1;m<f+1;m++)
{
var h=getTop().Lunar||Lunar,l=h.lunarDateToSolar(m,e,d,h.isChangeToLeapMonth(m,e));
if(l.valueOf()+24*60*60*1000>=k.valueOf())
{
f=l.getFullYear();
g[0]=l.getMonth()+1;
g[1]=l.getDate();
break;
}
}
}
else{
if(g[0]<k.getMonth()+1)
{
f++;
}
}
document.write(getTop().T(['<textarea style="display:none;" name="sendtimetip" disabled>','\u53D1\u4FE1\u65F6\u95F4\u5DF2\u8BBE\u5728<b class="grn">%nick%</b>\u597D\u53CB\u751F\u65E5\uFF0C\u60A8\u53EF\u4EE5\u81EA\u884C\u4FEE\u6539\uFF1A','</textarea>','<input type="hidden" name="sendtimeyear" value="%year%" />','<input type="hidden" name="sendtimemonth" value="%month%" />','<input type="hidden" name="sendtimeday" value="%day%" />','<input type="hidden" name="sendtimehour" value="0" />','<input type="hidden" name="sendtimemin" value="0" />'],"%").replace({nick:getTop().htmlEncode(b),year:f,month:g[0],day:g[1]}));
}
function createPostNewWindow(b,c,a,d)
{
var f=window,e=f.document;
var g="_creAtenEWpOstwIn_";
_oNewWinForm=getTop().S(g,f);
if(!_oNewWinForm)
{
_oNewWinForm=e.createElement("form");
_oNewWinForm.id=g;
_oNewWinForm.method="post";
e.body.appendChild(_oNewWinForm);
}
_oNewWinForm.innerHTML="";
if(c.indexOf("sid=")<0)
{
c=[c,c.indexOf("?")<0?"?":"&","sid=",getTop().getSid()].join("");
}
_oNewWinForm.action=c;
_oNewWinForm.target=b;
_oNewWinForm.onsubmit=function(){
f.open('about:blank',b,d);
};
a=a||{};
a.sid=a.sid||getTop().getSid();
getTop().E(a,function(i,h){
var j=e.createElement("input");
j.type="hidden";
j.name=h;
j.value=i;
_oNewWinForm.appendChild(j);
});
_oNewWinForm.submit();
}
function setComposeData(a)
{
getPageEditor().setContent(a.content||"");
getInputObj("subject").value=a.subject||"";
}
function uploadComposeEml()
{
new QMDialog({sId:"uploademldlg",nHeight:100,nWidth:400,sTitle:"\u4E0A\u4F20eml\u6587\u4EF6",sBodyHtml:TE(['<form style="width:100%;" method="post" id="uploademl" name="uploademl" target="actionFrame" action="/cgi-bin/qf_upload" enctype="multipart/form-data">','<div style="padding: 25px 10px;">','<label>\u8BF7\u9009\u62E9eml\u6587\u4EF6:</label><input type="hidden" name="sid" value="$sid$"/>','<input type="file" name="UploadFile" class="btn" value=""/>','</div>','<div class="cnfx_btn">','<input type="submit" value="\u4E0A\u4F20" class="wd2 btn"/>','<input type="button" value="\u53D6\u6D88" class="wd2 btn"  id="cancel"/>','</div>','</form>']).replace({sid:getSid()}),onload:function(){
var a=this;
a.S("cancel").onclick=function(){
getActionWin().location.href="javascript:;";
a.close();
};
}});
}
function _showPreview()
{
var b=getPageEditor(),c;
_fixQQMailStationery("100%");
c=getPageEditor().getContent();
_fixQQMailStationery(getTop().gbIsIE?"auto":"100%");
c=_addDefaultFontStyle(c);
c=getTop().filteSignatureTag(filterSourceContent(c),"FILTE<:");
c=getTop().fixNonBreakSpace(c);
var d=getTop().T('height=$height$,width=$width$,top=$top$,left=$left$,toolbar=no,scrollbars=yes,menubar=no').replace({top:100,left:100,height:500,width:550});
if(location.host.indexOf("set")!=-1&&location.host.indexOf("exmail.qq.com")!=-1)
{
var a;
a=c.replace(/img src=\"\/cgi-bin\/viewfile\?/g,'img src="'+'//'+location.host+'/cgi-bin/viewfile?');
c=a;
}
if(getTop().gsDistributeDomain)
{
createPostNewWindow("newwin",getTop().getTopHost()+"/cgi-bin/readtemplate",{content:c,t:"compose_preview"},d);
}
else{
createPostNewWindow("newwin","/cgi-bin/readtemplate",{content:c,t:"compose_preview"},d);
}
}
function _addDefaultFontStyle(a)
{
var c=a;
if(getPageEditor().getContentType()=="html")
{
var b=getPageEditor().getDefaultFontInfo();
for(var d in b)
{
if(b[d])
{
c=getTop().T(['<div style="$fontName$$fontSize$$fontColor$;">','$content$','</div>']).replace({fontName:b.fontName&&["font-family:",b.fontName,";"].join(""),fontSize:b.fontSize&&["font-size:",b.fontSize,";"].join(""),fontColor:b.fontColor&&["color:",b.fontColor,";"].join(""),content:c});
break;
}
}
}
return c;
}
function setOtherComposeOptionEvent()
{
var c=getTop(),a=c.S("otherComposeOptionBtn",window),b=c.S("otherComposeOptionCntr",window);
c.addEvent(a,"click",function(){
var d=c.isShow(b);
c.show(b,!d);
a.getElementsByTagName("img")[0].className="arrow"+(!d?"up":"down");
_resizeEditor();
return;
c.qmAnimation[d?"fold":"expand"](b,{durlimit:10,type:"wait",speed:"fast",onready:function(){
return {from:b.clientHeight||0};
},onaction:function(){
_resizeEditor();
},oncomplete:function(){
c.show(b,!d);
a.getElementsByTagName("img")[0].className="arrow"+(!d?"up":"down");
_resizeEditor();
}});
});
}
function setMultiSignatureSelect()
{
var h=getTop();
try{
var d=h.goUserInfo.get('RealAllSignature');
}
catch(e)
{
return setTimeout(arguments.callee,500);
}
if(!d)
{
return;
}
var b=h.S("signSelContainer",window);
if(b)
{
var g=h.TE(['<div class="left" style="cursor:pointer;">','\u7B7E\u540D\uFF1A$@$if($sItemValue$)$@$$sItemValue$$@$else$@$\u4E0D\u4F7F\u7528$@$endif$@$<span class="addrtitle" style="font-family: arial,sans-serif; padding-left:4px; font-size:9px; position:relative; top:-1px;" >\u25BC</span>&nbsp;','</div>','<span class="left addrtitle" >&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>']);
var f=[{sId:"-1",sItemValue:"\u4E0D\u4F7F\u7528"}],a=0,j=_getEditorSignId("sign");
for(var i in d)
{
var c=d[i];
if(i>=0&&i<100)
{
f.push({sId:i,sItemValue:(c[1]||"\u7B7E\u540D1")});
}
if(j==i)
{
a=f.length-1;
}
}
if(f.length<=1)
{
return;
}
h.addEvent(b,"click",function(){
var k=h.calcPos(b);
new (h.QMMenu)({oEmbedWin:window,sId:"signatureMenu",nX:k[3],nY:k[2]-f.length*21-30,nItemHeight:21,bAnimation:false,oItems:f,onitemclick:function(m,l){
b.innerHTML=g.replace(l);
setSignature("sign",m);
}});
});
b.innerHTML=g.replace(f[a]);
}
}
function syncMultiSignatureData()
{
setMultiSignatureSelect();
if(setMultiSignatureSelect._selector)
{
var a=_getEditorSignId("sign");
setMultiSignatureSelect._selector.value=getTop().getAllSignature()[a]?a:-1;
}
}
function _getEditorSignId(a)
{
var b=getPageEditor();
if(!b)
{
return -1;
}
var c=b.getContentTags(a)[0];
if(!c)
{
return -1;
}
return c.getAttribute("signid");
}
function _setEditorSignValue(b,c,a)
{
var e=getPageEditor();
if(!e)
{
return;
}
var g={};
function j(k)
{
return g[k]=e.getContentTags(k)[0];
}
function d(m,k,l)
{
if(!e)
{
return;
}
var n=k.parentNode;
if(n&&n.tagName=="DIV"&&n.firstChild==k)
{
k=n;
}
getTop().insertHTML(k,l,getTop().T('<div><$type$></$type$></div>').replace({type:m}));
j(m);
}
j("sign");
j("qzone");
j("includetail");
if(!c&&!g[b])
{
return;
}
if(!g.sign)
{
var h=g.qzone;
var i="beforeBegin";
if(!h)
{
h=e.getContentObj("QQMAILSTATIONERY")||e.getContentTags("body")[0];
i="beforeEnd";
}
d("sign",h,i);
}
if(!g.qzone)
{
d("qzone",g.sign,"afterEnd");
}
var f=g[b];
f.innerHTML=c;
f.setAttribute("signid",a);
if(b=="sign")
{
syncMultiSignatureData();
}
setTimeout(focusPageEditor);
}
function setSignature(a,b)
{
if(getTop().S("tmpl_style",getPageEditor().getEditWin()))
{
return;
}
if(b==-1)
{
return _setEditorSignValue(a,"",-1);
}
var h=arguments.callee;
function f()
{
setTimeout(function(){
h(a,b);
},200);
}
var g="";
try{
switch(a)
{case "sign":
var d=getTop().getAllSignature()[b];
if(d&&parseInt(b)<100)
{
g=getTop().getSignatureHeader(parseInt(b)==98?1:0)+d[0];
}
break;
default:
return;
}
}
catch(c)
{
return f();
}
try{
g=filterComposeContent(g);
}
catch(i)
{
}
_setEditorSignValue(a,g,b);
}
function sendAfterUpload(a)
{
if(a)
{
getTop().getMainWin().gbCkSendafterupload=a;
}
else{
return (getTop().getMainWin().gbCkSendafterupload=="undefined")?0:getTop().getMainWin().gbCkSendafterupload;
}
}
var QMCharCode={_m:[[0,127],[164,164],[167,168],[176,177],[183,183],[215,215],[224,225],[232,234],[236,237],[242,243],[247,247],[249,250],[252,252],[257,257],[275,275],[283,283],[299,299],[324,324],[328,328],[333,333],[363,363],[462,462],[464,464],[466,466],[468,468],[470,470],[472,472],[474,474],[476,476],[593,593],[609,609],[711,711],[713,715],[729,729],[913,929],[931,937],[945,961],[963,969],[1025,1025],[1040,1103],[1105,1105],[8208,8208],[8211,8214],[8216,8217],[8220,8221],[8229,8230],[8240,8240],[8242,8243],[8245,8245],[8251,8251],[8364,8364],[8451,8451],[8453,8453],[8457,8457],[8470,8470],[8481,8481],[8544,8555],[8560,8569],[8592,8595],[8598,8601],[8712,8712],[8719,8719],[8721,8721],[8725,8725],[8730,8730],[8733,8736],[8739,8739],[8741,8741],[8743,8747],[8750,8750],[8756,8759],[8765,8765],[8776,8776],[8780,8780],[8786,8786],[8800,8801],[8804,8807],[8814,8815],[8853,8853],[8857,8857],[8869,8869],[8895,8895],[8978,8978],[9312,9321],[9332,9371],[9472,9547],[9552,9587],[9601,9615],[9619,9621],[9632,9633],[9650,9651],[9660,9661],[9670,9671],[9675,9675],[9678,9679],[9698,9701],[9733,9734],[9737,9737],[9792,9792],[9794,9794],[12288,12291],[12293,12311],[12317,12318],[12321,12329],[12353,12435],[12443,12446],[12449,12534],[12540,12542],[12549,12585],[12832,12841],[12849,12849],[12963,12963],[13198,13199],[13212,13214],[13217,13217],[13252,13252],[13262,13262],[13265,13266],[13269,13269],[19968,40869],[63788,63788],[63865,63865],[63893,63893],[63975,63975],[63985,63985],[64012,64015],[64017,64017],[64019,64020],[64024,64024],[64031,64033],[64035,64036],[64039,64041],[65072,65073],[65075,65092],[65097,65106],[65108,65111],[65113,65126],[65128,65131],[65281,65374]]};
QMCharCode.findGbkChar=function(a){
var d,c,e;
var b=this._m;
d=0;
c=b.length-1;
while(d<=c)
{
e=Math.floor((d+c)/2);
if(a>b[e][1])
{
d=e+1;
}
if(a<b[e][0])
{
c=e-1;
}
if(a>=b[e][0]&&a<=b[e][1])
{
return 1;
}
}
return 0;
};
QMCharCode.hasNonGbkChar=function(a){
for(var c=Math.min(a.length,10000)-1;c>=0;c--)
{
var b=a.charCodeAt(c);
if(this.findGbkChar(b)==0)
{
return true;
}
}
return false;
};
function splashToCtrl(b,a)
{
var e=b.style?b:getTop().S(b,window),d=0,c=isNaN(a)?6:a;
(function(){
e.style.backgroundColor=(d++%2==0)?"#f9f2b3":"#fff";
if(d<c)
{
setTimeout(arguments.callee,100);
}
})();
}
function doVerifySubmit()
{
doProcess('',(getPageId()=="card")?"card":"send",false,false,99);
}
function doVerifyCancel()
{
}
function doFtnUploaded()
{
var a=getTop();
new a.QMDialog({sId:"ftnfinished",sTitle:"\u6B63\u5728\u81EA\u52A8\u53D1\u9001",bClose:false,sBodyHtml:a.T(['<div class="cnfx_content">','<img src="$image_path$ico_question.gif" align="absmiddle" style="float:left;margin:5px 10px 0;">','<div style="padding:12px 0 10px;line-height:1.5;">\u8D85\u5927\u9644\u4EF6\u4E0A\u4F20\u5B8C\u6BD5\uFF0C\u5373\u5C06\u4E8E <strong id="countsecond">10</strong> \u79D2\u540E\u81EA\u52A8\u53D1\u9001\u672C\u90AE\u4EF6\u3002<br/>\u6B64\u524D\u60A8\u53EF\u4EE5\u53D6\u6D88\u81EA\u52A8\u53D1\u9001\uFF0C\u7EE7\u7EED\u7F16\u8F91\u90AE\u4EF6\u3002</div>','</div>']).replace({image_path:a.getPath("image",true)}),sFootHtml:['<input class="btn_gray btn_input" id="cancel" type="button" md="0" nocheck="true" initlized="true" value="\u7ACB\u5373\u53D1\u9001"/>','<input class="btn_blue btn_input" id="confirm" type="button" md="0" nocheck="true" initlized="true" value="\u53D6\u6D88\u81EA\u52A8\u53D1\u9001" />'].join(""),nHeight:'auto',onload:function(){
var e=this;
var b=10;
var c=setInterval(function(){
e.S("countsecond")&&(e.S("countsecond").innerHTML=b--);
},1000);
var d=setTimeout(function(){
e.S("countsecond")&&a.SN("sendbtn",window)[0].click();
clearInterval(c);
e.close();
},10000);
a.addEvent(e.S("confirm"),"click",function(){
clearTimeout(d);
clearInterval(c);
e.close();
});
a.addEvent(e.S("cancel"),"click",function(){
clearTimeout(d);
clearInterval(c);
e.close();
a.SN("sendbtn",window)[0].click();
});
}});
}
function QMDragFile()
{
var a=QMDragFile,b=getTop();
a._moTop=getTop();
a._moMainWin=window;
if(!QMAttach._isSupportHTML5Drag())
{
return;
}
a._initEvent()._addEvent(1);
QMDragFile.bInit=true;
}
QMDragFile.bInit=false;
QMDragFile._getFileList=function(a){
var h=getTop(),f=[];
try{
var g=a,c=g.length;
for(var b=0;b<c;b++)
{
var d=g[b];
f.push({_sCode:h.unikey(),_sName:d.name||d.fileName,_nSize:d.size||d.fileSize,_oFile:d});
}
}
catch(i)
{
debug([i.message,i.lineNumber]);
}
return f;
};
QMDragFile._initEvent=function(){
var c=this,d=getTop(),b=QMAttach,a=null;
c._nCloseTimeout=null;
c._moWinDragover=function(e){
if(d.gbIsSafari&&(""+d.gsSafariVer).split('.')[0]==4)
{
return;
}
var j=e.dataTransfer,i=j.types,f=false;
if(i)
{
for(var h=i.length-1;h>=0;h--)
{
if(i[h]=="Files")
{
f=true;
break;
}
}
}
else if(d.gbIsSafari)
{
f=true;
}
if(f)
{
var l=d.S("qqmail_mask"),g=!(l&&d.isShow(l)),m=d.getEventTarget(e);
if(g)
{
while(m)
{
if(m.id=='html5_dragdrop_area')
{
break;
}
m=m.parentNode;
}
d.preventDefault(e);
b._showDragAndDropContainer(false);
var n=m?'copy':'none',k=d.S("html5_dragdrop_area",c._moMainWin);
j.effectAllowed=n;
j.dropEffect=n;
if(k)
{
k.innerHTML=m?b._msDragOver:b._msDragEnter;
}
}
if(c._nCloseTimeout)
{
d.clearTimeout(c._nCloseTimeout);
}
c._nCloseTimeout=d.setTimeout(function(){
QMAttach.hideDragAndDropContainer();
var o=d.S("html5_dragdrop_area",c._moMainWin);
if(o)
{
o.innerHTML=b._msDragEnter;
}
},500);
}
};
c._moContainerDrop=function(e){
var g=0,i=e.dataTransfer.files,h=c._getFileList(i);
for(var f=h.length-1;f>=0;f--)
{
g+=h[f]._nSize;
}
QMAttach._addControlFile('xhr5',h,g);
d.stopPropagation(e);
d.preventDefault(e);
};
return c;
};
QMDragFile._addEvent=function(b,a){
var g=this,h=getTop(),f=g._moMainWin,d=getPageEditor()&&getPageEditor().getEditWin(),c=h.S("html5_dragdrop_area",g._moMainWin);
if(b&1)
{
h.addEvents([h,f,d],{dragover:g._moWinDragover},a);
}
if((b&2)&&h.gbIsFF)
{
h.addEvents(c,{drop:g._moContainerDrop},a);
}
if(b&4)
{
var e=c.previousSibling;
h.addEvents(e,{change:function(i){
var k=0,m=e.files,l=g._getFileList(m);
for(var j=l.length-1;j>=0;j--)
{
k+=l[j]._nSize;
}
QMAttach._addControlFile('xhr5',l,k);
QMAttach.hideDragAndDropContainer();
}},a);
}
return g;
};
function _getSubmitForm()
{
if(getPageId()=='groupsms')
{
return getTop().S('frmCompose',window);
}
return getTop().S('frm',window);
}
function asyncGetContent(a)
{
var c=getTop(),b=c.htmlDecode(c.trim(a));
if(b&&/^https?:\/\/[\w.]+qq.com(\/)/i.test(b))
{
c.loadJsFile(b,false,c.document,function(){
if(!c.goAsyncContent)
{
c.showError("\u90AE\u4EF6\u5185\u5BB9\u83B7\u53D6\u5931\u8D25");
}
});
}
}
function _isSupportImportWord(a)
{
var b={"txt":1,"eml":1,"rtf":1,"dpt":1,"ett":1,"mht":1,"wpt":1,"pptx":1};
return _getViewTypeByFileName(a)=='doc'&&!b[getTop().getFileExt(a)];
}
function _appendEditorFileContent(c,b,a)
{
var d=getTop();
if(!d.trim(c))
{
return;
}
if(a)
{
if(c.length>1024*1024)
{
return;
}
c='<pre style="word-wrap: break-word; white-space: pre-wrap;">'+d.htmlEncode(c)+'</pre>';
}
b.execCmd('insertHTML',c);
return true;
}
function _getViewTypeByFileName(a)
{
return getTop().getViewTypeByExt(getTop().getFileExt(a));
}
function onClickHintAddr(b)
{
if(getTop().QMProfileTips)
{
var a=b.currentTarget;
getTop().QMProfileTips.doMouseEvent('over',getPageEditor().getEditWin(),a);
}
}
var _getPreviewView=(function(){
var b=getTop();
function a(c)
{
return "txt,html".indexOf(b.getFileTypeByExt(c||""))>-1;
}
return function(c,d){
var h=c.get('sName'),e=b.getFileExt(h),f=b.getFileTypeByExt(e||""),j=b.getViewTypeByExt(e),g=c.get("mailid")?[c.get("mailid"),c.get("attachid"),c.get("attachname")].join("|"):'';
var i=b.T(['/cgi-bin/$appname$?sid=$sid$&upfilelistitem=$upfileid$&mailattach=$mailattach$','&filename=$filename$&filetype=$filetype$&t=$t$&readprev=$compose$&filepath=$filepath$','&action=$action$$viewdocparam$&viewtype=$viewtype$&r=$rand$&sc=false']).replace({sid:b.getSid(),rand:Math.random(),appname:{"txt":"readtemplate","html":"readtemplate","eml":"viewdocument"}[f]||{"compress":"viewcompress","video":"viewfile","music":"viewfile","img":"viewfile"}[j]||"viewdocument",action:j=="compress"?"list":(a(e)?"view":""),compose:"normal",t:d||'attachments_simple',upfileid:c.get("sFileId")||c.get('sFileCattachName'),filename:b.encodeURI(h),filetype:f,filepath:c.get('sFileCattachName')||(c.get("sFilePath"))||"",mailattach:g,viewdocparam:j=="doc"?"&s=yozo&fromattach=1&from=attachfolder":"",viewtype:e=="eml"?"eml":""});
return i;
};
})();
function compose_js()
{
}
