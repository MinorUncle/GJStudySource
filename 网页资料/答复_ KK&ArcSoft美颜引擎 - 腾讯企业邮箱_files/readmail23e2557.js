(function(s){
var f={_sQReply:"quickreply",_sQSource:"source",_sQSendBtn:"sendbtn",_sQReplyTxtContainer:"qmQuickReplyTextContainer",_sQReplyBtnContainer:"qmQuickReplyButtonContainer",_sAfterSendDiv:"afterSendDiv",_sAfterSendingDiv:"afterSendingDiv",_sQuickReplyPart:"QuickReplyPart",_sQMEditorArea:"QMEditorArea",_sQMEditorToolArea:"QMEditorToolBarPlusArea",_sJumpToNewWin:"jumpToNewWin",_sReplyFrm:"replyfrm",_sSubMailStartDiv:"submail_start_div",_sContentDiv:"contentDiv",_sImgStar:"img_star",_sStarStatus:"starStatus",_sTagContainer:'tagContainer',_sMailContainer:"mailContentContainer",_sSendTimeMsg:"send_time_msg",_sAttachment:"attachment",_sPageEnd:"pageEnd",_sNextMailTop:"nextmail_top",_sNextMailBt:"nextmail_bt",_sNextNewMail:"nextnewmail",_sNextNewDiv:"nextnewDiv",_sQQMailBgMusicInfo:"QQMailBgMusicInfo",_sBgMusic:"bgmusic",_sMp3PlayerContainer:"mp3player_container",_sMp3PlayerInfo:"mp3player_info",_sSubMail:"submail",_sFold:"fold",_sDetail:"detail",_sSum:"sum",_sExpand:"expand",_sDetailBtn:"detailBtn",_sReferInfo:"referinfo",_sSettingGroup:"setting_group",_sRmd:"rmd",_sRemarkContent:"remarkContent",_sRemarkContainer:"remarkcontainer",_sRemarkText:"remarktext",_sRemarkWrite:"remarkwrite",_sRemarkRead:"remarkread",_sRemarkSave:"remarksave",_sSenderInfo:"senderInfo",_sSenderInfo2:"senderInfo2",_sSenderInfo3:"senderInfo3",_sMainMail:"mainmail",_sRejectGroupY:"rejectgroupy",_sRejectGroupN:"rejectgroupn",_sCheatCodeBar:"spam",_sGreenBar:"cheatcode_greenbar",_sGreenBarText:"greenbar_text"},j={_sConvReAndFw:"convreandfw",_sSpam:"spam",_sMoreOprContainer:"moreoprContainer"},B="qmTranslate",d="\u8BF7\u5728\u6B64\u8F93\u5165\u5907\u6CE8...",i=T(['<img src="$images_path$spacer.gif" class="icon_addMusic_d"/>','&nbsp;<a href="http://cgi.music.soso.com/fcgi-bin/m.q?w=$title$%20$author$&t=0" target="_blank">$title$ - $author$</a>']),h=TE(["/cgi-bin/mail_list?sid=$sid$",'$@$if($s$=="from_unread_list")$@$','&flag=new&folderid=$folderid$&s=unread','$@$else if($s$=="from_star_list")$@$','&flag=star&folderid=$folderid$&s=star','$@$endif$@$','$@$if($more$)$@$','$more$','$@$endif$@$']),k="/cgi-bin/readmail?sid=$sid$&mailid=$mailid$",l=TE([k,"&t=","$@$if($t$)$@$","$t$","$@$else$@$","compose","$@$endif$@$","&s=$s$&disptype=$disptype$"]),n=TE("/cgi-bin/grouplist?oper=$oper$&sid=$sid$&gid=$gid$@groupmail.qq.com&t=mail_mgr2&mailaction=$action$"),m=TE("/cgi-bin/grouplist?oper=reject&sid=$sid$&reject=$yn$&gid=$gid$@groupmail.qq.com&t=mail_mgr2&mailaction=reject_group"),q=TE("/cgi-bin/reader_list?type=home&classtype=allfriend&uin=$mail.from.qq$&t=reader_personal&sid=$sid$&s=sidebar"),e=TE(['<form method="$sMethod$" id="$sFormId$" name="$sFormId$" target="$sTarget$" action="$sAction$" enctype="multipart/form-data">','$@$for($oInputs$)$@$','<input name="$name$" type="hidden" value="$value$"/>','$@$endfor$@$','</form>']),b='"$name$"<$addr$>; ',a=TE(['$@$for($addrs$)$@$','"$@$eval getTop().encodeNick(getTop().htmlDecode($name$))$@$"<$addr$>; ','$@$endfor$@$']),o=TE(['<div id="container" style="line-height:20px">','<div>','<div style="margin:8px 4px 0 0;">','<a class="right" id="other" href="/cgi-bin/grouplist?sid=$sid$&t=setting_group&oper=list">\u7BA1\u7406\u5176\u4ED6\u7FA4</a>','<p style="margin:0;">\u5BF9\u6B64\u7FA4:</p>','</div>','<div style="margin-bottom:5px;margin-left:8px;">','<div style="padding:5px 0 3px">','<input type="radio" name="qqnotify" value="notifyyes" $@$if(!$bReject$&&$bNotify$)$@$checked="true"$@$endif$@$ id="qqnotify"/>','<label for="qqnotify" style="color:#333">\u63A5\u6536\u65B0\u90AE\u4EF6\uFF0C\u5E76\u5728QQ\u63D0\u9192</label>','</div>','<div style="padding:5px 0 3px">','<input type="radio" name="qqnotify" value="notifyno" $@$if(!$bReject$&&!$bNotify$)$@$checked="true"$@$endif$@$ id="noqqnotify"/>','<label for="noqqnotify" style="color:#333">\u63A5\u6536\u65B0\u90AE\u4EF6\uFF0C\u4E0D\u5728QQ\u63D0\u9192</label>','</div>','<div style="padding:5px 0 3px;">','<input type="radio" name="qqnotify" value="reject" $@$if($bReject$)$@$checked="true"$@$endif$@$ id="reject"/>','<label for="reject" style="color:#333">\u62D2\u6536\u90AE\u4EF6</label>','</div>','</div>','</div>','<div style="position:relative;border-top:1px solid #ccc;padding-top:8px;$@$if($bReject$)$@$display:none;$@$endif$@$;" class="clear" id="setnewdiv">','<p style="margin:0;">\u5BF9\u6B64\u7FA4\u5DF2\u8BFB\u90AE\u4EF6:</p>','<div style="margin-left:8px;">','<div style="padding:5px 0 3px">','<input type="radio" name="unread" value="setnewyes" $@$if($bNewreply$)$@$checked="true"$@$endif$@$ id="setunread"/>','<label for="setunread" style="color:#333">\u6709\u65B0\u56DE\u590D\u65F6\uFF0C\u6807\u4E3A\u672A\u8BFB</label>','</div>','<div style="padding:5px 0 3px">','<input type="radio" name="unread" value="setnewno" $@$if(!$bNewreply$)$@$checked="true"$@$endif$@$ id="setread"/>','<label for="setread" style="color:#333">\u6709\u65B0\u56DE\u590D\u65F6\uFF0C\u4FDD\u6301\u5DF2\u8BFB</label>','</div>','</div>','</div>','<div style="padding:10px 0;overflow:hidden;" class="clear">','<a class="bold button_green_md" style="display:inline-block;" id="save">\u4FDD\u5B58\u66F4\u6539</a>&nbsp;','<a style="margin:3px 0 0 5px;" href="javascript:;" id="cancel">\u53D6\u6D88</a>&nbsp;','</div>','</div>']),r={_REPLY_DLG:T(["<div style='padding:25px 10px 0 35px;text-align:left;'><b>\u60A8\u662F\u5BC6\u9001\u7684\u6536\u4EF6\u4EBA\uFF0C\u5176\u4ED6\u6536\u4EF6\u4EBA\u4E0D\u77E5\u9053\u60A8\u6536\u5230\u4E86\u6B64\u90AE\u4EF6\uFF01<br>\u662F\u5426\u8981\u56DE\u590D\u5168\u90E8\u6536\u4EF6\u4EBA\uFF1F</b></div>","<div style='padding:23px 10px 10px 10px;text-align:right;'>","<input type=button id='replyall' class='btn wd4' value='\u56DE\u590D\u5168\u90E8'>","<input type=button class='btn wd4' value='\u56DE\u590D\u53D1\u4EF6\u4EBA' id='reply'>","<input type=button class='btn wd4' value='\u53D6\u6D88' id='cancel'>","</div>"]),_REFERPART:TE(['<div style="font:Verdana normal 14px;color:#000;padding:8px 0px;">','<div>&nbsp;</div><div>&nbsp;</div>','<div style="FONT-SIZE: 12px;FONT-FAMILY: Arial Narrow;padding:2px 0 2px 0;">','------------------&nbsp;$REFER$&nbsp;------------------','</div>','<div style="FONT-SIZE: 12px;background:#efefef;padding:8px;">','<div><b>$FROM$</b> "$from.name$"<$from.addr$>; </div>','<div><b>$DATE$</b> $date$</div>','<div><b>$TO$</b> $@$for($to$)$@$',b,'$@$endfor$@$</div>','$@$if($cc.length$)$@$','<div><b >$CC$</b> $@$for($cc$)$@$',b,'$@$endfor$@$</div>','$@$endif$@$','<div><b>$SUBJECT$</b> $subject$</div>','</div><div>&nbsp;</div>','$orgcontent$','</div>']),_BODY:T(['<div style="font-family:$fontName$;font-size:$fontSize$;color:$fontColor$;">','$content$','</div>'])},g={_ZH_CN:{REFER:"\u539F\u59CB\u90AE\u4EF6",FROM:"\u53D1\u4EF6\u4EBA:",DATE:"\u53D1\u9001\u65F6\u95F4:",TO:"\u6536\u4EF6\u4EBA:",CC:"\u6284\u9001:",SUBJECT:"\u4E3B\u9898:"},_EN_US:{REFER:"Original",FROM:"From:",DATE:"Date:",TO:"To:",CC:"Cc:",SUBJECT:"Subject:"}},c=T("/cgi-bin/config_blackwhitelist?sid=$sid$&act=whitelist&Fun=submit&pagefrom=readmail&group=$fromaddr$&sloc=readmail_yellow_tip"),p=T("/cgi-bin/report_cgi?r_type=$rtype$&r_result=$rresult$&r_msg=$rmsg$");
function u(F,G)
{
var J=F.sFormId||unikey(),H=S(J,F.oWin),I=[];
if(H)
{
removeSelf(H);
}
G=G||{};
G.sid=G.sid||getSid();
E(G,function(L,K){
I.push({name:K,value:L});
});
F.oInputs=I;
insertHTML(F.oWin.document.body,"beforeEnd",e.replace(extend({sFormId:J,sTarget:"actionFrame",sMethod:"POST"},F)));
return S(J,F.oWin);
}
function t(G,F)
{
rdVer(G,1);
if(!rdVer.check(F))
{
reloadFrm(F);
}
}
function v(K,J,G,H,I)
{
var L=new Date();
var M=new Date(K,J,G,H,I,0);
var F=L>M;
return ["\u6B64\u90AE\u4EF6\u662F\u5B9A\u65F6\u90AE\u4EF6\uFF0C",F?"\u5DF2":"\u5C06","\u5728",'<span style="color:black;">',K,"\u5E74",J,"\u6708",G,"\u65E5",H,"\u65F6",I,"\u5206",'</span>',"\u53D1\u51FA\u3002"].join("");
}
function A(F)
{
return filteScript(F.replace(/<div id=\'?\"?QQMailBgMusicInfo\'?\"?.*?>.*?<\/div>/ig,"").replace(/<player .*?><\/player>/ig,"").replace(/(^\s+)|(\s+$)/ig,""));
}
function w(F)
{
var G=true,I;
try{
I=getDefalutAllMail();
}
catch(J)
{
return false;
}
function H(K)
{
for(var N=0;N<K.length;N++)
{
if(K[N])
{
var L=K[N].addr||"",M=K[N].qq;
if(M==g_admuin)
{
return true;
}
for(var O=0;O<I.length;O++)
{
if((I[O].email||"").toLowerCase()==L.toLowerCase())
{
return true;
}
}
}
}
return false;
}
if(I.length)
{
G=!(H(F.to)||H(F.cc)||H([F.from]));
}
else{
G=false;
}
return G;
}
function x(F,G)
{
return (F.ctrlKey&&F.keyCode==13||F.altKey&&F.keyCode==83);
}
var y={};
var z=y._qmBaseDM=inherit("_qmBaseDM",Object,function(F){
return {$_constructor_:function(){
var G=arguments;
if(G.length)
{
var H=this;
H._moContext=G[G.length-1];
H._moWin=H._moContext.oWin;
H._msModuleName=H._moContext.sModuleName;
H._init.apply(H,arguments);
}
},_initMemVar:function(){
},_setEvent:function(){
},_ready:function(){
},_startSubMod:function(){
},_init:function(){
var G=this;
G._initMemVar.apply(G,arguments);
G._setEvent.apply(G,arguments);
G._ready.apply(G,arguments);
},attr:function(G,H,I){
var J=attr(G,H,I);
if(!J&&G)
{
return I===undefined?G[H]:(G[H]=I);
}
return J;
},S:function(G){
var H=this;
return S(G+(H._moContext.sAux||""),H._moWin);
},SN:function(G){
var H=this;
return SN(G+(H._moContext.sAux||""),H._moWin);
},context:function(G){
var H=this;
G=G||"sContext";
return H._moContext[G];
},_handle:function(H,G){
var K=this,J=getEventTarget(G),I=J.ownerDocument,N=K._msModuleName,P,Q,O,M;
while(J&&J!=I)
{
P=attr(J,H);
if(P)
{
Q=P;
M=J;
}
P=attr(J,z._MOD_ATTR);
if(P)
{
if(P==N)
{
if(O)
{
var L=K._startSubMod(O);
L&&L._handle(H,G);
}
if(Q&&typeof (K[Q])=="function")
{
K[Q](M,K.context("sContext"),G);
}
break;
}
else{
if(attr(J,z._MOD_STATE)!="1")
{
debug([attr(J,z._CON_ATTR),K.context("sContext")]);
O={sModuleName:P,sContext:attr(J,z._CON_ATTR)||K.context("sContext"),sAux:attr(J,z._AUX_ATTR)};
}
else{
O=null;
}
Q=null;
}
}
J=J.parentNode;
}
},evt:function(G,H){
var J=this,I=function(K){
K=typeof (K)=="string"?J.S(K):K;
attr(K,z._MOD_STATE,"1");
E(G,function(L){
var M=z._oEvtMap[L];
M&&addEvent(K,M,function(N){
J._handle(L,N);
});
});
};
if(typeof (H)=="string")
{
H=J.S(H);
}
if(H.nodeType)
{
I(H);
}
else{
E(H,function(K){
I(K);
});
}
}};
},{_MOD_STATE:"_module_state_",_MOD_ATTR:"module",_CON_ATTR:"context",_AUX_ATTR:"aux",_oEvtMap:{ck:"click",md:"mousedown",dck:"dblclick"}});
y.qmReadMail=inherit("qmReadMail",y._qmBaseDM,function(F){
return {_ready:function(){
var G=this;
G._initWinFunc.apply(G,arguments);
setTimeout(function(){
G._pageReady.apply(G,arguments);
},50);
},_rInsPageEnd:function(){
var H=this,G=H.S(f._sPageEnd);
H._moWin.document.body.appendChild(G);
show(G,true);
},_fakeReadMail:function(){
var H=this,G=H._moConfig;
QMAjax.send(T('/cgi-bin/readmail?sid=$sid$&mailid=$mailid$&t=readsubmail&mode=fake&s=r2&base=$base$&pf=$pf$').replace({sid:getSid(),mailid:H.getMailId(),pf:rdVer.isPre(G.folderid)?1:0,base:rdVer("BaseVer",0)}),{method:"GET",headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},onload:function(I,J){
var M=trim(J);
if(I&&M.indexOf("(")==0)
{
var L=evalValue(M);
if(L)
{
H._updatePreAndNext(L);
}
}
else{
var K=getActionWin().document;
K.open();
K.write(J);
}
}});
},_flushFolder:function(){
var H=this,G=H._moConfig,I=H.getMailId();
if((G.bNewMail==1)&&(!QMMailCache.getData(I)))
{
folderOpt({bNewMail:G.bNewMail,sFolderId:G.folderid,sMailId:I,oMatchTag:G.oMatchTag,bStar:G.bStar,bBsm:G.bBsm});
}
else{
getTop().recordCompareReadedMailId(I);
}
},_setEvent:function(){
var G=this,H=G._moWin;
G.evt(["ck","md"],H.document.body);
addEvent(H,"resize",function(){
G._adjustView();
});
},_initWinFunc:function(){
var G=this,H=G._moWin;
H.QMReadMail=G;
H.go=function(I,M,L,J,K){
var N={opt:L};
if(K)
{
N.more=["&loc=",G._moConfig.loc,K].join("");
}
G.optMail(N,G.getMailId(),I);
};
H.fw=function(J,I){
callBack.call(G,G[J],I);
};
H.goback=function(){
G.goback();
};
H.setRemindSpan=function(I){
G.S('remind_edit_'+I).innerHTML=(reminddetail["mailid:"+I]||"").replace(/linktitle=.*&sid=/g,function(J){
return J.replace(/\'/g,"&#039;");
});
};
H.setMoreOperation=function(I,J){
G._moMoreOptSel&&G._moMoreOptSel.switchPair(I,J);
},H.fjGetFlvAttrUrl=function(){
return T("/cgi-bin/readtemplate?sid=$sid$&t=video_ref.smil&vsrc=$vsrc$").replace({sid:getSid(),vsrc:encodeURIComponent(H.sFlvPlayUrl.substr(1))});
};
},_initMemVar:function(G,H){
var I=this;
I._moConfig=G;
I._moMailInfo=H;
},_updatePreAndNext:function(G){
var K=this,L,J=K.S(f._sNextMailTop),I=K.S(f._sNextMailBt),H=K.S(f._sNextNewMail);
if(I&&J&&H)
{
if(G.sPn.indexOf("\u4E0A\u4E00\u5C01")!=-1&&G.sPn.indexOf("\u4E0B\u4E00\u5C01")!=-1)
{
J.innerHTML=I.innerHTML=G.sPn;
}
if(L=trim(G.sPnNew))
{
H.innerHTML=L;
}
show(attr(K.S(f._sNextNewDiv),"mailid",G.sPnNewMailId),L!="");
}
},clearCache:function(){
rdVer(this.getMailId(),1);
},_onMoreOptSel:function(G){
var K=this,L=K.getMailId();
switch(G)
{case "delremark":
case "addremark":
K._moRemark.toggle(L);
break;
case "delremind":
case "addremind":
var I=GelTags("a",S("remind_edit_"+L,document));
if(I&&I[0])
{
if(_aoItem.sId=="addremind")
{
fireMouseEvent(I[0],"click");
}
else{
var J=location.getParams(S("remind_delete",document).href),H=document.remind_frm;
H.ruleid.value=J["ruleid"];
H.from.value=J["from"];
H.submit();
}
}
break;
case "print":
K.optMail2({opt:"print"});
break;
}
},_readMailFinish:function(G){
if(bnewwin)
{
var I=window.opener,J=this,H=J._moConfig;
try{
if(I&&I.readMailFinish)
{
I.readMailFinish(J.getMailId(),H.reandfw,H.folderid);
}
}
catch(K)
{
}
}
},_adjustView:function(){
var I=this,H=I.S(f._sMailContainer),G=I._moWin.document.documentElement.clientWidth;
if(I._moConfig.xqqstyle!="6"&&H)
{
H.style.marginRight=G>1000?"170px":"0px";
}
},_adjustMailContainer:function(){
var H=this,G=H.S(f._sMailContainer)||H.S(f._sContentDiv);
if(G)
{
G.style.overflowY="scroll";
if(G.scrollHeight-G.offsetHeight>10)
{
G.style.height=G.scrollHeight+"px";
}
G.style.overflowY="";
}
},_startSubMod:function(G){
var L=this,K,J=L._moMailInfo,I=extend({},L._moContext,G),H=L._moConfig;
switch(I.sModuleName)
{case "qmRemark":
K=L._moRemark=new y.qmRemark(function(N){
var O=L._moMoreOptSel;
if(O)
{
switch(N)
{case "del":
O.switchPair("addremark","delremark");
break;
case "save":
O.switchPair("delremark","addremark");
}
}
QMMailCache.setExpire();
L.clearCache();
},I);
break;
case "qmMoreOptSel":
K=L._moMoreOptSel=new y.qmMoreOptSel({oMoreOpt:H.oMoreOpt,fOnSelect:function(N){
L._onMoreOptSel(N);
}},I);
break;
case "qmQReply":
K=L._moQReply=new y.qmQReply(H,J,{fCheckBcc:function(){
callBack.call(L,L.checkBcc,arguments);
},sSubTmp:""},I);
break;
case "qmAntiSpam":
K=L._moAntiSpam=new y.qmAntiSpam(H,J,I);
break;
case "qmSenderInfo":
K=new y.qmSenderInfo(H,J,I);
break;
case "qmPlayerParser":
K=new y.qmPlayerParser({oContentDom:L.S(f._sContentDiv),bManuPlay:H.bMusicManuPlay},I);
break;
case B:
var M=getTop();
if(M.getGlobalVarValue("DEF_TRANSLATE")=="1")
{
loadJsFile(M.getPath("js")+M.getFullResSuffix("qmtranslate.js"),true,s.document,function(){
waitFor(function(){
return L.S(f._sContentDiv)&&s.QMTranslate;
},function(N){
if(N)
{
var O=L.S(f._sContentDiv);
new s.QMTranslate({oDom:O});
}
});
});
}
break;
}return K;
},_pageReady:function(){
var N=getTop(),M=this,O=M._moWin,L=M._moMailInfo,I=M._moConfig,J=M.S(f._sContentDiv),K=S("folder_"+I.folderid,N),P=O.document.body.background;
M._adjustView();
M._rInsPageEnd();
M._fakeReadMail();
I.bBccToMe=w(L);
I.sMailContent=f._sMailContainer;
M._readMailFinish();
if(P)
{
J.style.backgroundImage="url("+P+")";
}
swapLink(J,I.disptype,O,M.getMailId());
initMailSelect(I.oMoveItems,true,I.bOpenTag=="1",O,I.folderid,I.bAutoTag);
M._startSubMod({sModuleName:"qmQReply"});
M._startSubMod({sModuleName:"qmMoreOptSel"});
M._startSubMod({sModuleName:"qmRemark"});
M._startSubMod({sModuleName:"qmAntiSpam"});
M._startSubMod({sModuleName:"qmSenderInfo"});
M._startSubMod({sModuleName:"qmPlayerParser"});
var H=O.document.body;
if(H.scrollWidth>H.clientWidth)
{
requestShowTip("tipRemindEdit",19,O);
}
M._addWidth1024Class();
if(K&&K.parentNode.parentNode.id=="folder_pop_td")
{
new QMSender({oWin:O,nCurFolderId:I.folderid,sWidth:210,sCurSaveFrom:I.saveFrom});
}
I.bClearRDCache&&M.clearCache();
M._sendTimeMail();
if(I.flowid)
{
ossLog("realtime","all","flowid="+I.flowid);
}
M._flushFolder();
getTop().QMWebpushTip&&getTop().QMWebpushTip.read(1,M.getMailId());
getTop().goUserInfo.deferget('DEF_TRANSLATE',function(Z){
M._startSubMod({sModuleName:B});
});
container_name="mailContentContainer";
var Y=document.getElementById("mainFrame").contentWindow.document.getElementById(container_name);
var W=0;
var R=Y.getElementsByTagName("*");
var U=R.length;
for(var X=0;X<U;X++)
{
if(R[X].getAttribute("lazybackground")!=null)
{
W=W+1;
}
else if(R[X].tagName.toLowerCase()=="img"&&R[X].getAttribute("lazysrc")!=null)
{
W=W+1;
}
}
if(W>50)
{
function G()
{
var ab=[];
for(var Z=0;Z<U;Z++)
{
if(R[Z].getAttribute("lazybackground")!=null)
{
R[Z].setAttribute("lazybackground",R[Z].getAttribute("lazybackground")+"?"+Math.random());
ab.push(R[Z]);
}
else if(R[Z].tagName.toLowerCase()=="img"&&R[Z].getAttribute("lazysrc")!=null)
{
R[Z].setAttribute("lazysrc",R[Z].getAttribute("lazysrc")+"?"+Math.random());
ab.push(R[Z]);
}
}
var aa=new ImagesLazyLoad({container:container_name,mode:"cross",holder:"",onLoad:function(ac){
},images:ab,getSrc:function(ac){
if(ac.getAttribute("lazybackground")!=null)
{
return ac.getAttribute("lazybackground");
}
else if(ac.tagName.toLowerCase()=="img"&&ac.getAttribute("lazysrc")!=null)
{
return ac.getAttribute("lazysrc");
}
}});
}
G();
}
else{
for(var X=0;X<U;X++)
{
if(R[X].getAttribute("lazybackground")!=null)
{
R[X].setAttribute("background",R[X].getAttribute("lazybackground"));
R[X].removeAttribute("lazybackground");
}
else if(R[X].tagName.toLowerCase()=="img"&&R[X].getAttribute("lazysrc")!=null)
{
R[X].src=R[X].getAttribute("lazysrc");
R[X].removeAttribute("lazysrc");
}
}
}
setTimeout(function(){
M._adjustMailContainer();
},200);
M.hasLeave=false;
getMainWin().exitConfirm=function(Z){
try{
if(!M.hasLeave)
{
N.doReadMailStatistics(M.getMailId(),'st_readtime');
M.hasLeave=true;
}
if(typeof Z=="function")
{
Z();
}
else{
N.globalEval(Z,window);
}
}
catch(aa)
{
}
};
M._fixAbsoluteContent();
var V=M.S('exmail-online-doc-detect-uuid');
if(V)
{
var Q='/cgi-bin/readtemplate?action=get_code_for_online_doc&f=json&sid='+getSid();
QMAjax.send(Q,{method:"GET",timeout:10000,onload:function(Z,aa){
var ab=evalValue(aa);
if(Z&&ab&&ab.RetCode=="0"&&ab.errorcode[0].DATA=='0')
{
var ad=ab.online_doc_code[0].DATA;
var ac=V.getAttribute('href');
V.setAttribute('href',ac+'&qy_online_doc_code='+ad);
}
}});
}
},_fixAbsoluteContent:function(P){
var M=this;
var N=getTop();
var O=f._sContentDiv;
if(typeof P=="string")
{
O=O+P;
}
var L=M.S(O)||S(O,N.getMainWin());
if(!L)
{
return;
}
var J=0;
var K=0;
function I()
{
if(J&&N.isShow(L))
{
var Q=N.calcPos(L,'json');
J-=Q.top;
debug('content height fix',J);
if(J>Q.height)
{
L.style.height=J+'px';
}
}
}
var G=false;
function H()
{
G=true;
N.E(L.getElementsByTagName('*'),function(Q){
if(Q.nodeType!=3)
{
if(N.getStyle(Q,'position')=='absolute')
{
J=Math.max(N.calcPos(Q,'json').bottom,J);
}
}
});
I();
}
N.E(L.getElementsByTagName('*'),function(Q){
if(Q.nodeType!=3)
{
if(N.getStyle(Q,'position')=='absolute')
{
J=Math.max(N.calcPos(Q,'json').bottom,J);
}
}
});
I();
},_addWidth1024Class:function(){
var H=getTop(),G=this;
if(H.document.body.clientWidth<=1024)
{
H.addClass(G.S("mainmail"),"width1024");
}
H.addEvent(H,"resize",function(){
if(H.document.body.clientWidth<=1024)
{
H.addClass(G.S("mainmail"),"width1024");
}
else{
H.rmClass(G.S("mainmail"),"width1024");
}
});
},_sendTimeMail:function(){
var H=this.S(f._sSendTimeMsg),G=[];
if(H)
{
E(["year","month","day","hour","min"],function(I){
G.push(attr(H,I));
});
H.innerHTML=callBack(v,G);
}
},checkDecryptMail:function(){
var G=this;
_oConfig=G._moConfig;
if(_oConfig.bEncrypt)
{
addEvent(G.S("decryptmail_pw"),"keydown",function(H){
if(H.keyCode=="13")
{
fireMouseEvent(G.S("decryptmail"),"click");
}
});
}
},decryptMail:function(H,I,G){
var J=this,K=J._moWin,L=encodeURIComponent(J.S("decryptmail_pw").value);
if(L)
{
QMAjax.send(T("/cgi-bin/readmail?sid=$sid$&mailid=$mailid$&action=decryptmail&t=success&secmailcode=$code$&ef=js&resp_charset=UTF8").replace({mailid:I,sid:getSid(),code:L}),{method:"GET",onload:function(M,N){
if(M)
{
var O=evalValue(N);
if(O.errcode=="0")
{
J._moConfig.bEncrypt=false;
J.afterDecrytMail();
}
else{
showError(O.errmsg);
}
}
}});
}
else{
showError("\u8BF7\u8F93\u5165\u5BC6\u7801");
J.S("decryptmail_pw").focus();
}
},afterDecrytMail:function(){
var H=this,G=H._moConfig;
showInfo("\u90AE\u4EF6\u89E3\u5BC6\u6210\u529F");
if(G.bNeedReceipt&&G.bNewMail)
{
var I=H._moWin.location.href;
H.clearCache();
goUrl(H._moWin,cookQueryString(I,{force_needreceipt:1,r:Math.random()}));
}
else{
t(H.getMailId(),H._moWin);
}
},getMailInfo:function(){
return this._moMailInfo;
},getCBInfo:function(){
var J=this,G=J._moConfig,I=J._moMailInfo,H=I.from||{},K=J.S(f._sImgStar);
return {oWin:J._moWin,sFid:G.folderid,bML:false,oMail:[{sMid:J.getMailId(),bSys:G.bSys,bUnr:false,bSubUnr:false,bStar:K.className=='qm_ico_flagon',bTms:false,oTagIds:G.oMatchTag,sSName:H.name,sSEmail:H.addr,oStar:K,oTCont:J.S(f._sTagContainer)}]};
},notify:function(H,G){
var J=this,I=J._moMailInfo;
switch(H)
{case "delsubmail":
if(--I.nLen<=0)
{
J.goback();
}
QMMailCache.setExpire();
break;
case "toRefer":
var K=J._moSubMails[G];
if(K)
{
K.seek();
}
break;
}
},getMailId:function(){
return this.context("sContext");
},modifyTag:function(G,H){
var J=this._moConfig.oMatchTag;
if(!J)
{
return;
}
for(var I=J.length-1;I>=0;I--)
{
if(J[I]==G)
{
break;
}
}
if(H)
{
if(G<0)
{
J.length=0;
}
else{
J.splice(I,1);
}
}
else{
if(I<0)
{
J.push(G);
}
}
},toAttach:function(G){
var J=this,K=J.S(f._sAttachment+(J.attr(G,"seq")||"")),I;
function H(N,M)
{
var L=arguments.callee;
if(!M||!L.time)
{
L.orgclass=K.className;
L.time=0;
}
K.className=(L.time%2==0)?"toolbg":L.orgclass;
K.style.height=(L.time%2==0)?"auto":"auto";
if(++L.time<N)
{
setTimeout(function(){
L(N,true);
},70);
}
}
if(K)
{
I=J._moWin.document.documentElement;
if(I.scrollHeight<=I.clientHeight)
{
H(6);
}
else{
scrollIntoMidView(K,I,false,0,true);
H(4);
}
}
},prevandnext:function(H,I,G){
var J=this,K=J.attr(H,"mailid");
rdVer.log(K,"hit");
goUrl(J._moWin,["/cgi-bin/readmail?",rdVer.url(K,J._moConfig.folderid,"","",false,"",false,"",true),bnewwin?"&newwin=true":""].join(""),true);
G&&preventDefault(G);
},_makeMailListUrl:function(){
var G=this._moConfig;
return h.replace({sid:getSid(),folderid:G.folderid,s:G.subtmpl});
},goback:function(){
if(bnewwin)
{
goUrlTopWin("/cgi-bin/frame_html?sid="+getSid());
}
else{
trace("history back","","start","mail_list");
if(!QMHistory.tryBackTo("mail_list"))
{
var G=this;
G._moWin.location.href=QMHistory.getUrl("mail_list")||G._makeMailListUrl();
}
}
},tag:function(H,I,G){
var J=this;
QMTag.readclose(G,J.getCBInfo());
},starMail:function(G){
var H=this;
starMail(null,extend(H.getCBInfo(),{oncomplete:function(J,I){
H.clearCache();
show(H.S(f._sStarStatus),I);
return true;
}}),"mailinfo");
},previewAttach:function(H,I,G){
var J=this,K=T(k).replace({sid:getSid(),mailid:I}),L=T("$url$&nocheckframe=true&t=attachments&select=$select$").replace({url:K,select:J.attr(H,"select")});
if(window.location.hostname.indexOf("exmail.qq.com")!=-1)
{
L=getTop().getTopHost()+L;
}
if(getTop().gbIsIE)
{
window.open('/cgi-bin/readtemplate?t=previewAttachRedirect&previewurl='+encodeURIComponent(L),"_blank");
}
else{
window.open(L,"_blank");
}
preventDefault(G);
},archive_previewAtt:function(H,I,G){
var J=this,K=T("/cgi-bin/archive_readmail?sid=$sid$&mailid=$mailid$").replace({sid:getSid(),mailid:I}),L=T("$url$&nocheckframe=true&t=attachments&select=$select$&folderid=$fid$").replace({url:K,select:J.attr(H,"select"),fid:this._moConfig.folderid});
window.open(L,"_blank");
preventDefault(G);
},playAttach:function(G){
var I=this,K=GelTags("span",G.parentNode.parentNode),J=K.length==0?{}:K[0],H=I.S(f._sMp3PlayerContainer);
if(J.getAttribute("player"))
{
show(H,true);
audioPlay({container:H,url:J.getAttribute("player"),title:J.innerHTML,autoplay:true,global:true});
return true;
}
return false;
},checkBcc:function(H,I,G){
var J=this;
if(J._moConfig.bBccToMe)
{
new QMDialog({sId:"reply_dlg",sTitle:"\u56DE\u590D\u63D0\u793A:",sBodyHtml:r._REPLY_DLG.toString(),nWidth:405,nHeight:160,onshow:function(){
this.S("replyall").focus();
},onload:function(){
var K=this;
addEvent(K.S("replyall"),"click",function(){
J._moConfig.bBccToMe=false;
if(H.tagName=="TEXTAREA")
{
J._moQReply.focus();
}
else{
J.optMail({opt:"reply_all"},I);
}
K.close();
});
addEvent(K.S("reply"),"click",function(L){
J.optMail({opt:"reply"},I);
K.close();
});
addEvent(K.S("cancel"),"click",function(){
K.close();
});
}});
preventDefault(G);
return true;
}
},setAutoDel:function(G,H){
var J=this,K=J._moWin,I=J._moConfig;
if(I.xqqstyle=="6")
{
u({oWin:K,sAction:"/cgi-bin/mail_mgr"},{mailid:H,mailaction:"autodel",reporttype:_attr(G,"flag"),s:"autodel"}).submit();
}
},mailRecall:function(G,H){
var J=attr(G,"loccnt"),L=attr(G,"mid"),K=attr(G,"mdata"),M=attr(G,"odd"),I=0;
getTop().QMAjax.send(T("/cgi-bin/send_status?sid=$sid$&t=biz_rf_mgr&ef=jsnew&action=checksender&mailid=$mailid$&r=$r$").replace({sid:getSid(),mailid:H,r:Math.random()}),{method:"GET",onload:function(N,O){
if(N)
{
var P=evalValue(O);
if(P.data&&(P.data.check_res==0))
{
if(J>0&&M!="0")
{
I=1;
new QMDialog({sId:"mailrecall",sTitle:"\u64A4\u56DE\u90AE\u4EF6",sUrl:T("/cgi-bin/readtemplate?sid=$sid$&t=mailrecall_confirm&mailid=$mailid$&localcount=$loccnt$&messageid=$mid$&date=$mdate$&odd=$odd$").replace({sid:getSid(),mailid:H,loccnt:J,mid:L,mdate:K,odd:M}),nWidth:485,nHeight:256});
}
else{
var Q;
if(M=="0")
{
I=2;
Q='\u6B64\u90AE\u4EF6\u8DDD\u53D1\u9001\u65F6\u5DF2\u8D85\u8FC724\u5C0F\u65F6\uFF0C\u65E0\u6CD5\u64A4\u56DE\u3002';
}
else{
I=3;
Q='\u6B64\u90AE\u4EF6\u53D1\u5F80\u975E\u817E\u8BAF\u4F01\u4E1A\u90AE\u548C\u975EQQ\u90AE\u7BB1\uFF0C\u4E0D\u652F\u6301\u64A4\u56DE\u64CD\u4F5C\uFF0C\u8BF7\u8C05\u89E3\u3002<br/>\u4EC5\u652F\u6301\u64A4\u56DE\u53D1\u5F80\u817E\u8BAF\u4F01\u4E1A\u90AE\u548CQQ\u90AE\u7BB1\u7684\u90AE\u4EF6\u3002';
}
msgBox(T(['<b class="b_size">\u6B64\u90AE\u4EF6\u4E0D\u652F\u6301\u64A4\u56DE</b>','<div style="overflow:hidden;margin-top:5px;">','$m$','</div>']).replace({m:Q}),"dialog");
}
}
else{
msgBox("\u64A4\u56DE\u5931\u8D25\uFF0C\u6B64\u90AE\u4EF6\u53D1\u4EF6\u4EBA\u4E0D\u662F\u5F53\u524D\u8D26\u53F7\uFF0C\u65E0\u6CD5\u64A4\u56DE","dialog");
}
}
}});
ossLog("realtime","all",T(["stat=custom&type=MAILRECALL_STAT&info=","$actionid$,$mailid$,$messageid$,$attachlist$"]).replace({actionid:I,mailid:encodeURIComponent(H),messageid:encodeURIComponent(L)}));
},xfDl:function(){
var H=this._moMailInfo.oXfLinkArray;
if(H.length<1)
{
return;
}
var G=new (getTop().clsXfBatchDownload)();
if(!G.init())
{
return;
}
G.makeGetUrlArray=function(){
var J=[];
for(var I in H)
{
J.push(H[I].replace("t=exs_ftn_download","t=exs_ftn_getfiledownload&s=email").replace(/^http:\/\/mail.qq.com/,""));
}
return J;
};
G.DoXfBatchDownload();
},addToAddrBook:function(H,I,G){
var K=H.getAttribute("email"),L=H.getAttribute("name"),M=getTop().T("/cgi-bin/laddr_detail?sid=$sid$&view=normal&t=contact_detail&edit=1&dlgname=newAddr&name=$name$&from=$from$&inbox=true&mailid=$mailid$&resp_charset=UTF8").replace({from:K,name:L,mailid:I,sid:getTop().getSid()});
var J=new (getTop().QMDialog)({sId:"newAddr",sTitle:"\u65B0\u5EFA\u8054\u7CFB\u4EBA",sUrl:M,nHeight:500,nWidth:600,onload:function(){
this.S("_dlgiframe_").scrolling="yes";
}});
},optMail2:function(H,I,G){
var J=this,K=J._moWin,N="_blank",L=J.attr(H,"opt"),M=T(k).replace({sid:getSid(),mailid:I});
switch(L)
{case "remind":
M=T("/cgi-bin/readtemplate?t=calendar&sid=$sid$&cmd=moncal,,new,$subject$,mail,$mailid$").replace({sid:getSid(),mailid:I,subject:encodeURIComponent(J._moMailInfo.subject||"(\u65E0\u4E3B\u9898)")});
N="mainFrame";
rdVer(I,1);
break;
case "print":
M+=T("&t=readmail_print&s=$s$&filterflag=true").replace({s:J.attr(H,"s")||"print"});
if(window.location.hostname.indexOf("exmail.qq.com")!=-1)
{
M=getTop().getTopHost()+M;
}
break;
case "mime":
M+="&action=readmailmime";
break;
case "dleml":
M+="&action=downloademl";
N="actionFrame";
break;
case "code":
M+="&action=readmailcode";
if(window.location.hostname.indexOf("exmail.qq.com")!=-1)
{
M=getTop().getTopHost()+M;
}
break;
case "fwgroup":
M+="&t=compose_group&s=forward";
N="mainFrame";
break;
case "note":
M+="&notefmt=1&t=note_edit_show";
N="mainFrame";
break;
case "fweml":
M+="&t=compose&s=forward&action=readmaileml";
N="mainFrame";
break;
case "addc":
M+="&filterflag=false&t=addr_detail_edit&s=addfrommail";
N="mainFrame";
}K.open(M,N);
preventDefault(G);
},newWinRead:function(H,I,G){
goNewWin(this._moWin.location,false);
preventDefault(G);
},createRule:function(H,I,G){
showSimpleRuleFilter(this.attr(H,"fromaddr"),"readmail");
preventDefault(G);
},showMoreSummary:function(G){
var I=this,J=I._moWin,H=getTop().isShow(getTop().S("sub_summary_info",J));
getTop().show(getTop().S("sub_summary_info",J),!H);
if(!H)
{
getTop().rmClass(getTop().S("display_more_operator",J),"qm_ico_quickdown");
getTop().addClass(getTop().S("display_more_operator",J),"qm_ico_quickup");
}
else{
getTop().rmClass(getTop().S("display_more_operator",J),"qm_ico_quickup");
getTop().addClass(getTop().S("display_more_operator",J),"qm_ico_quickdown");
}
},delMail:function(G){
var I=this,J=I._moWin,H=false;
H=rmMail(I.attr(G,"opt")||0,extend(I.getCBInfo(),{oncomplete:function(L,M){
var N=M.url||"";
if(N.indexOf("/cgi-bin/readmail?")!=-1)
{
I.prevandnext({mailid:J.location.getParams(N)["mailid"]});
return true;
}
}}),I._moMailInfo);
H&&QMHistory.recordActionFrameChange();
if(!I.attr(G,"opt")&&"1"==I._moConfig.folderid)
{
var K=I._moMailInfo;
readmailCheckGrpSendSkipSelf(K);
}
},optMail:function(H,I,G){
var Q=this,R=Q._moWin,M=Q._moConfig,aa=Q.attr(H,"opt"),X=M.folderid,U=l.replace({sid:getSid(),t:Q.attr(H,"t"),s:aa,mailid:I,disptype:M.disptype=="text"?"":"html"});
if((getTop()||window).currentReadMailID&&!Q.hasLeave)
{
U=U+"&currentReadMailID="+(getTop()||window).currentReadMailID+"&currentReadMailSendTime="+(getTop()||window).currentReadMailSendTime+"&st_replytime="+(+new Date()-getTop().currentReadMailStartTime);
Q.hasLeave=true;
}
function ac(ad)
{
var ae=[Q.attr(H,"more")||""];
if(ad=="draft")
{
ae.push("&backurl="+encodeURIComponent(R.location.href));
}
if(bnewwin)
{
ae.push('&newwin=true&fwreplynewwin=true');
}
if(G&&G.shiftKey)
{
window.open(U+ae.join(""));
}
else{
var af=U+ae.join("");
goUrl(R,af,true);
}
preventDefault(G);
}
switch(aa)
{case "reply_all":
case "reply":
case "forward":
if(aa=="forward")
{
var N=[],P=[],O=[],Y,Z;
if(Q._msModuleName=="qmSubMail")
{
P=(_oTop.attr(H,"hasExpired")||"").split("|");
P.pop();
O=(_oTop.attr(H,"hasDeleted")||"").split("|");
O.pop();
}
else{
P=[].concat(M.hadExpiredAttachs&&M.hadExpiredAttachs.hasExpired||[]);
O=[].concat(M.hadExpiredAttachs&&M.hadExpiredAttachs.hasDeleted||[]);
}
var K=P.length,J=O.length;
if(K>0&&J>0)
{
Y=P[0];
Z="\u7B49"+(K+J)+"\u4E2A\u6587\u4EF6\u5DF2\u8FC7\u671F\u6216\u5DF2\u88AB\u53D1\u9001\u8005\u5220\u9664";
}
else if(K>0)
{
Y=P[0];
if(K==1)
{
Z="\u5DF2\u8FC7\u671F";
}
else{
Z="\u7B49"+K+"\u4E2A\u6587\u4EF6\u5DF2\u8FC7\u671F";
}
}
else if(J>0)
{
Y=O[0];
if(J==1)
{
Z="\u5DF2\u88AB\u53D1\u9001\u8005\u5220\u9664";
}
else{
Z="\u7B49"+J+"\u4E2A\u6587\u4EF6\u5DF2\u88AB\u53D1\u9001\u8005\u5220\u9664";
}
}
if(Y)
{
var L=Y.lastIndexOf(".")||Y.length,W=Y.substring(0,L),ab=Y.substring(L);
var V='<span id="span_filename_desc" style="text-overflow: ellipsis;overflow: hidden;max-width:175px;display: inline-block;vertical-align: middle;white-space: nowrap;">'+W+'</span>'+ab;
_oTop.confirmBox({title:"\u63D0\u793A",nWidth:440,msg:['<div class="dialog_f_t" style="font-weight: normal;word-break: break-all;">\u8D85\u5927\u9644\u4EF6 "',V,'" ',Z,'\uFF0C\u8F6C\u53D1\u5C06\u81EA\u52A8\u5220\u9664\u3002</div>'].join(""),confirmBtnTxt:'\u7EE7\u7EED\u8F6C\u53D1',onreturn:function(ad){
if(ad)
{
ac(aa);
}
},onshow:function(){
var ad=this.S('span_filename_desc');
if(ad)
{
_nWidth=_oTop.calcPos(ad)[4];
if(_nWidth>175)
{
ad.style.width="175px";
}
}
}});
break;
}
}
case "draft":
ac(aa);
break;
}
},setStatus:function(G){
var H=this;
H._mnStatus=G;
},addCalEvent:function(H,G,I){
var M=this,N=getTop(),O=M._moWin,L=N.S("showcalpanel",O),P=H.innerHTML,K=/((?!0000)[0-9]{4}\u5E74)?((0?[1-9]|1[0-2])\u6708(0?[1-9]|1[0-9]|2[0-8])\u65E5|(0?[13-9]|1[0-2])\u6708(29|30)\u65E5|(0?[13578]|1[02])\u670831\u65E5)/g,R=T(['<span id="showcalpanel" class="showcalpanel" onmouseover="getTop().attr(this.parentNode, \'isout\', 0);QMReadMail.setStatus(1)" onmouseout="QMReadMail.setStatus(0);QMReadMail.hideCalEvent()">','<a onclick="QMReadMail.goCal(\'$date$\', \'$mailId$\')" class="add2calendar"><span class="ico_add2cal"></span>\u6DFB\u52A0\u5230\u65E5\u5386</a>','</span>']),Q=N.attr(H,"times")||"";
Q&&(P+=(" "+N.trim(Q)));
if(P.match(K))
{
P=P.replace(/\u5E74/,"-").replace(/\u6708/,"-").replace(/\u65E5/,"");
}
P=P.replace(/\//g,"-");
if(P.indexOf("-")<4)
{
var J=new Date();
P=J.getFullYear()+"-"+P;
}
L&&N.removeSelf(L);
if(/^[\d\-\:\s]+$/.test(P)&&!isNaN((new Date(P.replace(/-/g,'/')).getTime())))
{
H.style.cssText="border-bottom:1px dashed #ccc;position:relative;_display:inline-block;";
N.insertHTML(H,"beforeEnd",R.replace({date:P,images_path:N.getPath("images"),mailId:I}));
}
},hideCalEvent:function(H,G){
var J=this,K=getTop(),L=J._moWin,I=K.S("showcalpanel",L);
setTimeout(function(){
if(I&&K.isShow(I)&&J._mnStatus!=1)
{
K.removeSelf(I);
}
},100);
},goCal:function(G,H,I){
var J=this,N=H||J.getMailId(),M='mail',K=getTop(),O=I||(J._moMailInfo.subject||K.tmpSubject);
if(J._msModuleName=='qmGroupMail')
{
M='group';
}
else if(J._msModuleName=='qmNote')
{
M='note';
}
var L=T("/cgi-bin/readtemplate?t=calendar&sid=$sid$&from=readmail&cmd=moncal,$date$,new,$subject$,$from$,$mailId$,&loc=readmail,calendar,,,0,1").replace({sid:K.getSid(),date:G,subject:encodeURIComponent(O||"(\u65E0\u4E3B\u9898)"),mailId:N,from:M});
goUrl(J._moWin,L,true);
}};
});
y.qmQReply=inherit("qmQReply",y._qmBaseDM,function(F){
return {_initMemVar:function(G,H,I){
var J=this;
J._moConfig=G;
J._moReplyMail=H;
J._moSendConfig=I;
J._moSource=J.S(f._sQSource);
J._mbStopFold;
},getSource:function(){
var G=this._moSource;
return (G.className.indexOf('graytext')!=-1)?"":textToHtml(htmlEncode(G.value));
},_combineContent:function(G){
var L=this,H=L._moConfig,K=L.S(H.sMailContent),J=L._moReplyMail,M=[G||textToHtml(htmlEncode(L.S(f._sQSource).value))];
try{
var N=getSignature(H.folderid,H.saveFrom);
if(N)
{
M.push("<div>&nbsp;</div>"+N);
}
}
catch(I)
{
}
if(!H.noIncludeArtcle)
{
J.orgcontent=K?filteSignatureTag(A(K.innerHTML)):"";
var O=r._REFERPART.replace(extend({},J,H.titlePrefix=="1"?g._EN_US:g._ZH_CN));
if(J.orgcontent)
{
M.push(O);
return {content:r._BODY.replace({content:M.join(""),fontName:getGlobalVarValue("DEF_FONT_FAMILY")||"Verdana",fontSize:getGlobalVarValue("DEF_FONT_SIZE")||"14px",fontColor:getGlobalVarValue("DEF_FONT_COLOR")||"#000"})};
}
else{
return {citeprev:"yes",rmref:O,content:M.join("")};
}
}
else{
return {content:M.join("")};
}
},_getValidHtmlContent:function(G){
return G&&trim(G.replace(/<[^(img)]([^>]+)?>/gi,"").replace("&nbsp;",""));
},send:function(G,H){
var M=this,P=M._moWin,I=M._moConfig,K=M._moEditor,N=M._moSendConfig,O=M.S(f._sQSource);
if(G.disabled)
{
return;
}
M.stopFold(true);
if(!K||!M._getValidHtmlContent(K.getContent(false)))
{
showError('\u8BF7\u5148\u8F93\u5165\u56DE\u590D\u5185\u5BB9');
O.focus();
}
else{
var L=M._moReplyMail,J=extend({ReAndFw:"reply",contenttype:"html",from_s:"comm_quick",t:"compose.json",s:N.s||"",ReAndFwMailid:H,to:a.replace({addrs:L.replyTo}),cc:a.replace({addrs:L.replyCc}),subject:(M._moConfig.titlePrefix=="1"?"Re:":"\u56DE\u590D\uFF1A")+L.reSubject,savesendbox:1,sendname:"",sendmailname:M._moConfig.sendmailname,LastMsgId:M._moConfig.sLastMsgId,References:M._moConfig.sReferences},M._combineContent(K.getContent(false)));
waitFor(function(){
return !!(getTop().ComposeLib);
},function(Q){
if(!Q)
{
debug("\u52A0\u8F7DComposeLib\u5931\u8D25");
return;
}
var U,R="1"==getTop().gbBackGroundSend&&(U=getTop().BackGroundSend),V={onready:function(){
if(R)
{
var W=S(f._sQSource,P);
W.value="";
W.blur();
M.stopFold(false);
W.view("sending");
}
else{
M._disableSendBtn(true);
show(f._sAfterSendingDiv,true,P);
}
},oncomplete:function(W,X){
if(R)
{
if(W)
{
var Z=S(f._sQSource,P),Y=evalValue(X);
if(Y&&Y.compose=="ok")
{
Z.view("init");
}
else if(N.fQReplyComplete)
{
callBack(N.fQReplyComplete,[X]);
}
}
}
else{
var Z=S(f._sQSource,P);
if(W)
{
Z.value="";
Z.blur();
Z.view("init");
showInfo("\u60A8\u7684\u90AE\u4EF6\u5DF2\u6210\u529F\u53D1\u9001");
show(f._sAfterSendDiv,true,P);
show(f._sQuickReplyPart,false,P);
callBack(N.fQReplyComplete,[X]);
}
else{
Z.focus();
show(f._sQuickReplyPart,true,P);
}
M._disableSendBtn(false);
}
show(M.S(f._sAfterSendingDiv),false);
}};
if(R)
{
U.quickReply(J,"comm",V);
}
else{
ComposeLib.send(J,V);
}
},100);
}
},readyToWrite:function(G,H){
var I=this;
show(I.S(f._sQuickReplyPart),true);
show(I.S(f._sAfterSendDiv),false);
I.S(f._sQSource).focus();
},checkBcc:function(){
callBack(this._moSendConfig.fCheckBcc,arguments);
},jump:function(H,I,G){
if(H.disabled)
{
return;
}
var K=this,J=K._moEditor,N=J?J.getContent(false):K.getSource(),L=K._moWin,M=l.replace({sid:getSid(),mailid:I,s:"reply_all",disptype:"html"});
setClass(K._moSource,'graytext qm_txt');
u({oWin:L,sTarget:"_self",sAction:M+(getTop().bnewwin?"&newwin=true":"")},{pluscontent:getTop().htmlEncode(N)}).submit();
preventDefault(G);
},_disableSendBtn:function(G){
var H=this;
H.S(f._sJumpToNewWin).disabled=H.S(f._sQSendBtn).disabled=G;
return this;
},_setEvent:function(){
var K=this,N=K._moWin,M=K._moSource,L=K.S(f._sQSendBtn),H=K.S(f._sChangeWriteMode),J=K.S(f._sQReplyTxtContainer),I=K.S(f._sQReplyBtnContainer);
function P(Q)
{
switch(Q)
{case "init":
K._moEditor&&K._moEditor.setContent("");
case "sending":
setClass(M,'graytext qm_txt').value=M.getAttribute('graytxt');
M.style.height="20px";
show("rteContainer",false,N);
show("qmQuickReplyTextContainer",true,N);
show(I,false,N);
break;
case "show":
show("rteContainer",true,N);
show("qmQuickReplyTextContainer",false,N);
show(I,true,N);
K._moEditor&&K._moEditor.focus&&K._moEditor.focus();
break;
default:
}show(f._sAfterSendDiv,Q=="init",N);
show(f._sAfterSendingDiv,Q=="sending",N);
}
;function G()
{
if(M.className.indexOf('graytext')!=-1)
{
M.setAttribute('graytxt',M.value);
setClass(M,'qm_txt b_size').value='';
qmAnimation.expand(M,{to:54,oncomplete:function(){
var Q=this;
show(I,true);
show(H,true);
M.style.overflow="auto";
bodyScroll(N,"scrollTop",bodyScroll(N,"scrollTop")+30);
if(!K._moEditor)
{
QMEditor.createEditor({editorId:"newReadMailQuickSend",editorAreaWin:N,isOpenEditBar:true,funclist:QMEditor.CONST.FUNCLIST.READMAIL,photoCGI:getPhotoCGI(),onshowinstallactive:getTop().showInstallActiveXDialog&&getTop().showInstallActiveXDialog,onkeydown:function(R){
if(x(R))
{
fireMouseEvent(L,"click");
}
},onload:function(){
K._moEditor=this;
S("tooBarContain",N).innerHTML=getTop().outputToolBarControlBtn&&getTop().outputToolBarControlBtn()||"";
show(S("editor_toolbar_btn_container",N),true);
O(false);
setTimeout(function(){
Q.view("show");
});
}}).initialize(QMEditor.getBreakLine(),false,3);
}
else{
Q.view("show");
}
}});
if(!getTop().ComposeLib)
{
loadJsFileToTop(getPath("js"),[getFullResSuffix("libcompose.js")]);
if("1"==getTop().gbBackGroundSend)
{
loadJsFileToTop(getPath("js"),[getFullResSuffix("backsend.js")]);
}
}
}
}
;function O(Q)
{
Q=Q==null?true:Q;
K._moEditor.showToolBar(Q);
var V=getTop().S("editor_toolbar_btn_container",N);
if(!V)
{
return false;
}
var U=getTop().GelTags("span",V);
getTop().show(U[0],Q);
getTop().show(U[1],!Q);
var R=arguments.callee;
V.onclick=function(){
R(!Q);
return false;
};
}
;M.view=P;
addEvents(setClass(M,'graytext qm_txt'),{keydown:function(Q){
if(x(Q))
{
fireMouseEvent(L,"click");
}
},focus:G});
K.evt(["ck","md"],f._sQReply);
addEvent(N,"beforeunload",function(R){
removeEvent(N,"beforeunload",arguments.callee);
try{
K._beforeCancelSend(R);
}
catch(Q)
{
}
});
},focus:function(){
this._moSource.focus();
},stopFold:function(G){
this._mbStopFold=(G==undefined?true:G);
},_cancelSend:function(){
},_beforeCancelSend:function(G){
var I=this,J=I._moSource,H=I._moEditor;
if(J.className.indexOf('graytext')==-1&&(H&&I._getValidHtmlContent(H.getContent(false))||J.value))
{
!I.S(f._sQSendBtn).disabled&&(G.returnValue='\u60A8\u586B\u5199\u7684\u5185\u5BB9\u6CA1\u6709\u53D1\u9001\uFF0C\u786E\u5B9A\u8981\u79BB\u5F00\u5417\uFF1F');
}
}};
});
function C(F)
{
return QMEditor&&QMEditor.getEditor(F);
}
y.qmPlayerParser=inherit("qmPlayerParser",y._qmBaseDM,function(F){
return {_get:function(G,H){
return decodeURIComponent(attr(G,H));
},_fPlay:function(G){
var J=this;
if(!G.auto&&!confirm("\u64AD\u653E\u5916\u90E8\u97F3\u4E50\u6709\u98CE\u9669\uFF0C\u786E\u5B9A\u64AD\u653E\uFF1F"))
{
return;
}
var H=J.S(f._sMp3PlayerContainer),I=J.S(f._sMp3PlayerInfo);
if(G.sosoGet)
{
getMusicUrl(G.title,G.author,function(L,K,M){
J._fPlay({auto:true,url:M||G.url,title:L,author:K,sosoGet:false});
});
return;
}
show(H,true);
audioPlay({container:H,url:G.url,author:G.author,title:G.title,autoplay:true,global:true});
I.innerHTML=i.replace({images_path:getPath('image'),author:htmlEncode(G.author)||'\u672A\u77E5',title:htmlEncode(G.title)||'\u672A\u77E5'});
show(I,true);
},_fPlayBgMusic:function(K,H,G,J){
var N=this,O=N._moWin,L=N.S(f._sBgMusic),M={auto:G,url:K,sosoGet:H?true:false,author:H&&H.author,title:H&&H.title};
if(J=='bgmusic')
{
show(L,true);
var I=GelTags("a",L);
I[0].href=K;
I[1].onclick=function(){
N._fPlay(M);
return false;
};
}
if(G)
{
N._fPlay(M);
}
show(N.S(f._sQQMailBgMusicInfo),false);
},_ready:function(G){
var Q=GelTags("player",G.oContentDom);
if(!Q.length)
{
return;
}
var R=this,W=R._moWin,L=R.S(f._sAttachment),H=false;
for(var I=0;I<Q.length;I++)
{
var O=Q[I],Y=O.id||"",X=Y.toLowerCase();
if(X.indexOf("cmd:")==0)
{
X=X.split(":").pop();
switch(X)
{case "voice":
if(!L)
{
return;
}
var aa=escape(attr(O,"param")),Z=attr(O,"media")||"voice",V=GelTags("span",L),J=V.length,ab="";
for(var af=0,J;af<J;af++)
{
var U=V[af],ab=attr(U,"player");
if(ab&&(U.innerText||U.textContent)==aa)
{
var P=O.parentNode;
if(Z=="video")
{
if(!W.sFlvPlayUrl)
{
W.sFlvPlayUrl=ab;
P.innerHTML=generateFlashCode(unikey("flvplayer"),"/zh_CN/htmledition/swf/WebFlvPlayer.swf",{width:400,height:335},{wmode:"opaque"});
}
}
else{
P.innerHTML='<div style="padding-left:10px;" ></div>';
var N={id:aa,container:P.firstChild,url:ab,title:(O.getAttribute('alias')||'\u60A8\u670B\u53CB')+'\u7684\u8BED\u97F3',dispInfo:{title:(O.getAttribute("alias")||"\u60A8\u670B\u53CB")+"\u7684\u8BED\u97F3"},global:true,autoplay:!H};
H=true;
I--;
audioPlay(N);
var K=GelTags("a",U.parentNode.parentNode);
K[0].onclick=K[K.length-1].onclick=function(){
audioStop();
audioPlay(N);
};
}
break;
}
}
break;
case "bgmusic":
var ae=attr(O,"url"),ad=R._get(O,"song"),ac=R._get(O,"singer");
R._fPlayBgMusic(ae,ae&&!ad&&!ac?null:{author:ac,title:ad},!G.bManuPlay,X);
break;
case "pcbgmusic":
var ae=attr(O,"url"),ad=R._get(O,"song"),ac=R._get(O,"singer"),M=W.document.createElement('div');
M.innerHTML='\u64AD\u653E\u5668\u52A0\u8F7D\u4E2D...';
O.parentNode.insertBefore(M,O);
audioPlay({skin:'Postcard',container:M,author:ac,title:ad,autoplay:Q.length==1,url:ae});
addEvent(W,"unload",function(){
audioStop();
});
break;
default:
break;
}
}
else if(Y)
{
R._fPlayBgMusic(Y);
}
}
}};
});
y.qmMoreOptSel=inherit("qmMoreOptSel",y._qmBaseDM,function(F){
return {_ready:function(G){
var K=this,I=K._moData={},J=G.oMoreOpt,L=["\u5220\u9664\u90AE\u4EF6\u5907\u6CE8","\u6DFB\u52A0\u90AE\u4EF6\u5907\u6CE8","\u53D6\u6D88\u63D0\u9192","\u8BBE\u7F6E\u63D0\u9192","\u6253\u5370"],M=["delremark","addremark","delremind","addremind","print"];
for(var H=M.length-1;H>=0;H--)
{
I[M[H]]=0;
}
for(var H=J.length-1;H>=0;H--)
{
I[J[H]]=1;
}
E(SN(j._sMoreOprContainer,G.oWin),function(N){
new QMSelect({oContainer:N,nWidth:86,sDefaultItemValue:"\u66F4\u591A\u64CD\u4F5C...",oMenu:{nWidth:"auto",nMaxWidth:180,nMaxItemView:10,oItems:QMMenu.makeMenuItem(L,M)},onafteropenmenu:function(Q,O){
for(var P=M.length-1;P>=0;P--)
{
Q.itemOption(M[P],"bDisplay",I[M[P]]);
}
},onselect:function(O){
callBack(G.fOnSelect,[O.sId]);
}});
});
},switchPair:function(G,H){
var I=this;
I._moData[G]=1;
I._moData[G]=0;
}};
});
y.qmRemark=inherit("qmRemark",y._qmBaseDM,function(F){
return {_initMemVar:function(G){
var H=this;
H._mfOnChange=G;
},_setEvent:function(){
var G=this,H=G._moWin;
G.evt(["ck"],[f._sRemarkContainer,f._sRmd]);
addEvents(G.S(f._sRemarkText),{focus:function(){
G.onFocus();
},keydown:function(I){
G.onKeydown(I);
},blur:function(){
G.onBlur();
}});
addEvent(H,"beforeunload",function(I){
var J=G._hasModify();
J&&(I.returnValue=J);
});
return G;
},getMailId:function(){
return this._moContext.sContext;
},toggle:function(G){
var L=this,K=L.S(f._sRmd),H=L.S(f._sRemarkContainer),I=L.S(f._sRemarkText),J=L.S(f._sRemarkWrite);
if(K.title.indexOf("\u5220\u9664")>=0)
{
L.del();
}
else{
G.blur();
show(H,true);
show(J,true);
I.focus();
}
return false;
},del:function(G){
var O=this,N=O.S(f._sRmd),J=O.S(f._sRemarkContent),I=O.S(f._sRemarkContainer),L=O.S(f._sRemarkText),M=O.S(f._sRemarkWrite),K=O.S(f._sRemarkRead);
if(!J.innerHTML)
{
show(I,false);
return false;
}
var P=O.getMailId(),H=new QMAjax("/cgi-bin/mail_mgr?mailaction=remarks&type=del");
H.onError=function(Q){
showError("\u5220\u9664\u5907\u6CE8\u5185\u5BB9\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5");
O._changeButtonMode(false);
};
H.onComplete=function(Q){
if(Q.responseText.indexOf("del successful")==-1)
{
return this.onError();
}
showInfo("\u5220\u9664\u6210\u529F");
if(N)
{
N.title="\u6DFB\u52A0\u90AE\u4EF6\u5907\u6CE8";
N.className="qm_ico_remarkoff";
}
L.value="";
J.innerHTML="";
show(I,0);
show(M,0);
show(K,0);
O._changeButtonMode(false);
callBack(O._mfOnChange,["del"]);
};
confirmBox({msg:"\u60A8\u786E\u5B9A\u8981\u5220\u9664\u6B64\u90AE\u4EF6\u5907\u6CE8\u5417\uFF1F<br/>&nbsp;",title:'QQ\u90AE\u7BB1\u63D0\u793A',cancelBtnTxt:"\u53D6\u6D88",confirmBtnTxt:"\u786E\u5B9A",onreturn:function(Q){
if(Q)
{
O._changeButtonMode(true);
H.send(T("mailaction=remarks&sid=$sid$&type=del&mailid=$mailid$").replace({sid:getSid(),mailid:P}));
}
}});
return false;
},_text2html:function(G){
return htmlEncode(G).replace(/\n/gi,"<br/>").replace(/\x20/gi,"&nbsp;");
},_html2text:function(G){
return htmlDecode(G.replace(/&nbsp;/gi," ").replace(/<br\/?>/gi,"\n"));
},save:function(){
var L=this,M=L._moWin,H=L.S(f._sRemarkContent),J=L.S(f._sRemarkText),K=L.S(f._sRemarkWrite),I=L.S(f._sRemarkRead),G=new QMAjax("/cgi-bin/mail_mgr?mailaction=remarks&type=mdy"),N=J.value;
if(!N||N==d)
{
J.focus();
return !!showError('\u8BF7\u5148\u8F93\u5165\u5907\u6CE8\u5185\u5BB9');
}
if(N.replace(/[^\x00-\xff]/g,"aa").length>=1000)
{
J.focus();
return !!showError('\u90AE\u4EF6\u5907\u6CE8\u7684\u5B57\u7B26\u4E0D\u80FD\u8D85\u8FC71000\u4E2A');
}
G.onError=function(O){
showError("\u4FDD\u5B58\u5907\u6CE8\u5185\u5BB9\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5");
L._changeButtonMode(false);
};
G.onComplete=function(O){
if(O.responseText.indexOf("mdy successful")==-1)
{
return this.onError();
}
showInfo("\u4FDD\u5B58\u6210\u529F");
var P=L.S(f._sRmd);
if(P)
{
P.title="\u5220\u9664\u90AE\u4EF6\u5907\u6CE8";
P.className="qm_ico_remarkon";
}
H.innerHTML=L._text2html(N);
L._changeButtonMode(false);
L.cancel();
callBack(L._mfOnChange,["save"]);
};
if(H.innerHTML==N)
{
return G.onComplete({responseText:"mdy successful"});
}
L._changeButtonMode(true);
G.send(T("mailaction=remarks&sid=$sid$&resp_charset=UTF8&type=mdy&mailid=$mailid$&content=$content$").replace({sid:getSid(),mailid:L.context("sContext"),content:encodeURI(N)}));
return false;
},cancel:function(){
var L=this,H=L.S(f._sRemarkContent),G=L.S(f._sRemarkContainer),J=L.S(f._sRemarkText),K=L.S(f._sRemarkWrite),I=L.S(f._sRemarkRead);
if(H.innerHTML=="")
{
J.value=L._html2text(d);
show(I,false);
show(K,false);
show(G,false);
}
else{
J.value=L._html2text(H.innerHTML);
show(I,true);
show(K,false);
}
},modify:function(G){
var M=this,I=M.S(f._sRemarkContent),H=M.S(f._sRemarkContainer),K=M.S(f._sRemarkText),L=M.S(f._sRemarkWrite),J=M.S(f._sRemarkRead);
K.value=M._html2text(I.innerHTML);
show(J,false);
show(L,true);
K.focus();
},onFocus:function(){
var H=this,I=H._moWin,G=H.S(f._sRemarkText);
if(G.value==d)
{
G.value="";
}
G.style.color="#000";
G.style.fontSize="14px";
return false;
},onBlur:function(){
var H=this,G=H.S(f._sRemarkText);
if(G.value=="")
{
G.value=d;
G.style.color="#A0A0A0";
G.style.fontSize="12px";
}
return false;
},onKeydown:function(G){
if(G.ctrlKey&&G.keyCode==13||G.altKey&&G.keyCode==83)
{
this.save();
preventDefault(G);
}
},_changeButtonMode:function(G){
this.S(f._sRemarkSave).disabled=G;
},_hasModify:function(){
var I=this,G=I.S(f._sRemarkContent),H=I.S(f._sRemarkText);
_bEqual=H&&(H.value.replace(/\r/gi,"")!=I._html2text(G.innerHTML).replace(/\r/gi,""));
return (H&&H.value&&_bEqual&&H.value!=d)?'\u60A8\u586B\u5199\u7684\u5907\u6CE8\u6CA1\u6709\u4FDD\u5B58\uFF0C\u786E\u5B9A\u8981\u79BB\u5F00\u5417\uFF1F':'';
}};
});
y.qmAntiSpam=inherit("qmAntiSpam",y._qmBaseDM,function(F){
return {_initMemVar:function(G,H){
var I=this;
I._moMailInfo=H;
I._moConfig=G;
I._moCheatCodeBar=I.S(f._sCheatCodeBar);
},_setEvent:function(){
var G=this,H=G._moWin;
G.evt(["ck"],G.SN(j._sSpam));
},_locMore:function(G){
var H=this._moWin.location;
H.replace(appendToUrl(cookQueryString(H.href,{ver:""}),G));
},_createMailFrm:function(H,G){
u({oWin:this._moWin,sFormId:"mail_frm",sAction:"/cgi-bin/mail_mgr"},extend({s:"readmail_spam",s_reject_what:"11",isspam:'true',mailid:H,reporttype:"",location:"readmail",srcfolderid:this._moConfig.folderid,mailaction:"mail_spam"},G));
},reject:function(G,H){
var I=this;
I._createMailFrm(H);
I._moWin.QMReadMail.clearCache();
doReject(true,attr(G,"groupmail"),I._moWin,attr(G,"mimefrom"));
},notSpam:function(G,H){
var I=this,J=I._moWin;
reportNoSpamJson({},{oWin:I._moWin,sFid:I._moConfig.folderid,oACB:null,bPop:false,bML:false,oMail:[{sMid:H,bUnr:false}]});
},reportSpam:function(G,H){
var M=this,L=M._moConfig;
var I=M.attr(G,"noaddblack")!="1";
var J=0;
var K=new Array();
var O=M.attr(G,"mimefrom");
var N=M.attr(G,"mailfrom");
if(O&&O.length>0)
K[J++]=O;
if(N&&N.length>0)
K[J++]=N;
reportSpamJson({bBlackList:I,oAddrList:K},{oWin:M._moWin,sFid:M._moConfig.folderid,oACB:null,bPop:false,bML:false,oMail:[{sMid:H,bUnr:false}]});
},openSpam:function(){
this._locMore("&disptype=html&dispimg=1&clickshowimage=1");
},addWhiteSubmit:function(H,I,G){
var J=this,K=J._moWin,L=J._moMailInfo.from.addr;
if(!checkMail(trim(L)))
{
return false;
}
u({oWin:K,sMethod:"POST",sAction:c.replace({sid:getSid(),fromaddr:L})}).submit();
runUrlWithSid(p.replace({rtype:1000006,rmsg:I}));
rdVer(I,1);
J.openSpam();
show(J._moCheatCodeBar,false);
preventDefault(G);
},addSpamVote:function(G,H){
var I=this,K=I.attr(G,"rtype");
runUrlWithSid(p.replace({rtype:K,rmsg:H})+"&r_subtype=spamvote");
if(K=="1")
{
I.S(f._sGreenBar).innerHTML="\u60A8\u8FD8\u53EF\u4EE5\u5C06\u6B64\u53D1\u4EF6\u4EBA\u53D1\u6765\u7684\u90AE\u4EF6\uFF0C\u81EA\u52A8\u5F52\u6863\u5230\"\u90AE\u4EF6\u5F52\u6863\"\u6587\u4EF6\u5939";
I.S(f._sGreenBarText).innerHTML="\u81EA\u52A8\u5F52\u6863";
}
else if(K=="2")
{
I.S(f._sGreenBar).innerHTML="\u5982\u679C\u4E0D\u60F3\u518D\u6536\u5230\u6B64\u53D1\u4EF6\u4EBA\u7684\u90AE\u4EF6\uFF0C\u60A8\u53EF\u4EE5\u9009\u62E9&nbsp;<a ck='reject' href='javascript:;'>\u62D2\u6536</a>";
show(I.S(f._sGreenBarText),false);
}
else{
getTop().showInfo("\u5DF2\u6210\u529F\u53CD\u9988\u60C5\u51B5");
var J=I.S(f._sGreenBar).parentNode;
J.style.display="none";
}
rdVer(H,1);
},openHttpImage:function(H,I,G){
runUrlWithSid(p.replace({rtype:"1000004",rmsg:I,rresult:1}));
this.openSpam();
preventDefault(G);
},openHttpSecureImage:function(H,I,G){
runUrlWithSid(p.replace({rtype:1000005,rresult:1,rmsg:I}));
this._locMore("&dispimg=1");
preventDefault(G);
},openUserEdu:function(G,H){
runUrlWithSid(p.replace({rtype:1000007,rresult:1,rmsg:H}));
},exbookEmlMgr:function(G,H){
var J=this,K=J.attr(G,"book"),I=J.attr(G,"tuan")||0;
loadingBox({model:"\u53CD\u5783\u573E",js:["$js_path$"+getTop().getFullResSuffix("qmantispam.js")],oncheck:function(){
return !!getTop().QMAntiSpam;
},onload:function(){
var L=new QMAntiSpam.qmExbookEmlMgr({sMailId:H,from:J._moMailInfo.from,fOnReload:function(){
t(H,J._moWin);
}});
if(K=="1")
{
L.book1();
}
else{
L.book2(I);
}
}});
}};
});
y.qmSenderInfo=inherit("qmSenderInfo",y._qmBaseDM,function(F){
return {_initMemVar:function(G,H){
this._moMail=H;
this._moConfig=G;
},_setEvent:function(){
var G=this;
G.evt(["ck"],[f._sSenderInfo,f._sSenderInfo2,f._sSenderInfo3]);
},_getBlogList:function(){
var G=this;
createIframe(G._moWin,q.replace({sid:getSid(),mail:G._moMail}),{id:"iframeRss"});
},_getMailList:function(){
var G=this;
},_createMailFrm:function(H,G){
u({oWin:this._moWin,sFormId:"mail_frm",sAction:"/cgi-bin/mail_mgr"},extend({s:"readmail_spam",s_reject_what:"11",isspam:'true',mailid:H,reporttype:"",location:"readmail",srcfolderid:this._moConfig.folderid,mailaction:"mail_spam"},G));
},showSenderDlg:function(G,H){
var J=this,I="ViewContactDetail",K='<div id="info_box" style="height:325px;overflow:hidden;"><div style="padding-top:130px;background:#fff;"><div class="ico_loading_all"</div></div></div>';
new (getTop().QMDialog)({sId:I,sTitle:"\u53D1\u4EF6\u4EBA\u8BE6\u7EC6\u4FE1\u606F",sBodyHtml:K,sFootHtml:'<a class="button_gray button_spaceRight" id="close" md="0" nocheck="true" initlized="true">\u5173\u95ED</a>',nHeight:400,nWidth:600,onload:function(){
var L=this;
getTop().QMAjax.send(getTop().TE("/cgi-bin/mail_list?sid=$sid$&t=mail_list_preview&s=searchcontact&sender=$sender$&receiver=$receiver$&matchtype=include&folderid=all&category=all&from=profile&mailidx=$mailid$&is_get_ww_info=$is_get_ww_info$&r=$r$").replace({sid:getSid(),mailid:H,sender:encodeURIComponent(J._moMail.from.addr),receiver:encodeURIComponent(J._moMail.from.addr),name:encodeURIComponent(J._moMail.from.name),is_get_ww_info:G.getAttribute("is_get_ww_info"),r:Math.random()}),{method:"GET",onload:function(M,N){
if(M)
{
var P=evalValue(N),O=L.S("info_box"),Q=L.getPanelDom();
O.innerHTML="_"+P.sHtml||"";
O.removeChild(O.firstChild);
getTop().addEvent(getTop().finds("#sender_dlg_more",Q)[0],"click",function(){
L.close();
});
getTop().addEvent(getTop().finds("#sender_dlg_reject",Q)[0],"click",function(){
J._moWin.QMReadMail.clearCache();
J._createMailFrm(H);
L.close();
doReject(true,G.getAttribute("groupmail"),J._moWin,G.getAttribute("email"));
});
getTop().addEvent(getTop().finds("#sender_dlg_add",Q)[0],"click",function(R){
var W=G.getAttribute("addrid"),X=(W!="none")?"editAddr":"newAddr",Y=(W!="none")?"\u7F16\u8F91\u8054\u7CFB\u4EBA":"\u65B0\u5EFA\u8054\u7CFB\u4EBA",V=R.target||R.srcElement,Z=getTop().T((W!="none")?"/cgi-bin/laddr_detail?sid=$sid$&view=normal&t=contact_detail&edit=2&dlgname=editAddr&AddrID=$addrid$&inbox=true":"/cgi-bin/laddr_detail?sid=$sid$&view=normal&t=contact_detail&edit=1&dlgname=newAddr&name=$name$&from=$from$&inbox=true&mailid=$mailid$&resp_charset=UTF8").replace({from:V.getAttribute("email"),name:encodeURIComponent(V.getAttribute("name")),addrid:W,mailid:H,sid:getTop().getSid()});
var U=new (getTop().QMDialog)({sId:X,sTitle:Y,sUrl:Z,nHeight:500,nWidth:600,onload:function(){
L.close();
}});
});
getTop().addEvent(getTop().finds("#sender_dlg_qywx_msg",Q)[0],"click",function(){
var R=new QMAjax();
R.method="post";
R.url="/cgi-bin/readtemplate?action=get_self_wework_info&t=rss_mgr&sid="+getSid();
R.send();
R.onComplete=function(U){
var V=null;
if(U)
{
V=evalValue(U.responseText);
if(V.feed.active!="1")
{
getTop().confirmBox({title:'\u4F01\u4E1A\u5FAE\u4FE1\u5DE5\u4F5C\u4FE1\u606F\u5C55\u793A',msg:'<p style="font-size: 12px; margin: 0; line-height: 12px;">\u4F60\u7684\u4F01\u4E1A\u5DF2\u5F00\u901A\u201C\u4F01\u4E1A\u5FAE\u4FE1\u201D\uFF0C\u5B89\u88C5\u540E\u5373\u53EF\u53D1\u9001\u6D88\u606F</p><p style="margin: 0; font-size: 12px; color: #9F9F9F; margin-top: 3px;">\u5DF2\u7ECF\u6709'+V.feed.ww_user_cnt+'\u4EBA\u540C\u4E8B\u4F7F\u7528\u4F01\u4E1A\u5FAE\u4FE1 <a href="http://work.weixin.qq.com/wework_admin/mail_promote_activedcnt?vccode='+V.feed.vcode+'&from=exmail_web_profile_message"  target="_blank">\u4E86\u89E3\u66F4\u591A</a></p> ',confirmBtnTxt:'\u7ACB\u5373\u5B89\u88C5',cancelBtnTxt:'\u53D6\u6D88',onreturn:function(W){
if(W)
{
window.open("https://work.weixin.qq.com/wework_admin/commdownload?vccode="+V.feed.ww_user_cnt+"&from=exmail_web_profile_message");
new Image().src="/cgi-bin/sellonlinestatic?sid="+getSid()+"&type=session_statistics&businame=qywework&item=biz_wwlogo_profile_chat_download&r="+Math.random();
}
}});
new Image().src="/cgi-bin/sellonlinestatic?sid="+getSid()+"&type=session_statistics&businame=qywework&item=biz_wwlogo_profile_chat_dialog&r="+Math.random();
}
}
};
new Image().src="/cgi-bin/sellonlinestatic?sid="+getSid()+"&type=session_statistics&businame=qywework&item=biz_wwlogo_detail_profile_chat&r="+Math.random();
});
getTop().addEvent(getTop().finds("#sender_dlg_qywx_tel",Q)[0],"click",function(){
var R=new QMAjax();
new Image().src="/cgi-bin/sellonlinestatic?sid="+getSid()+"&type=session_statistics&businame=qywework&item=biz_wwlogo_detail_profile_call&r="+Math.random();
R.method="post";
R.url="/cgi-bin/readtemplate?action=get_self_wework_info&t=rss_mgr&sid="+getSid();
R.send();
R.onComplete=function(U){
var W=null;
if(U)
{
W=evalValue(U.responseText);
if(W.feed.active==="1")
{
var V=new QMAjax();
V.method="post";
V.url="/cgi-bin/readtemplate?sid="+getSid()+"&action=call_by_wework&t=rss_mgr&callee_email="+getTop().finds("#sender_dlg_qywx_tel",Q)[0].getAttribute("email");
V.send();
V.onComplete=function(X){
var Y=null;
if(X)
{
Y=evalValue(X.responseText);
if(Y.feed.errcode==="0")
{
new (getTop().QMDialog)({sTitle:'\u547C\u53EB\u5DF2\u7ECF\u53D1\u51FA',sBodyHtml:'<div class="cnfx_content"><span class="dialog_icon icon_finish_b"></span><div class="dialog_f_c"><p style="font-size: 12px; margin: 0; line-height: 12px;">\u547C\u53EB\u5DF2\u7ECF\u53D1\u51FA\u3002\u8BF7\u5148\u5728\u4F60\u7684\u624B\u673A\u4E0A\u63A5\u542C\u6765\u7535\uFF0C\u968F\u540E\u5C06\u81EA\u52A8\u547C\u53EB\u5BF9\u65B9\u3002</p> </div></div>',sFootHtml:'<div class=" txt_right cnfx_btn"><input class="btn_gray btn_input" type="button" id="cancel" value="\u5173\u95ED" />',onload:function(){
var aa=this,Z=aa.S("cancel");
addEvents([Z],{click:function(ab){
aa.close();
}});
}});
}
else{
new (getTop().QMDialog)({sTitle:'\u547C\u53EB\u5931\u8D25',sBodyHtml:'<div class="cnfx_content"><span class="dialog_icon icon_info_b"></span><div class="dialog_f_c"><p style="margin: 0;">'+Y.feed.errmsg+'</p></div></div>',sFootHtml:'<div class=" txt_right cnfx_btn"><input class="btn_gray btn_input" type="button" id="cancel" value="\u5173\u95ED" />',onload:function(){
var aa=this,Z=aa.S("cancel");
addEvents([Z],{click:function(ab){
aa.close();
}});
}});
}
}
};
}
else{
new Image().src="/cgi-bin/sellonlinestatic?sid="+getSid()+"&type=session_statistics&businame=qywework&item=biz_wwlogo_profile_call_dialog&r="+Math.random();
getTop().confirmBox({title:'\u4F01\u4E1A\u5FAE\u4FE1\u5DE5\u4F5C\u4FE1\u606F\u5C55\u793A',msg:'<p style="font-size: 12px; margin: 0; line-height: 18px; margin-top: -10px;">\u4F60\u7684\u4F01\u4E1A\u5DF2\u5F00\u901A\u201C\u4F01\u4E1A\u5FAE\u4FE1\u201D\uFF0C\u5B89\u88C5\u540E\u5373\u53EF\u4F7F\u7528\u516C\u8D39\u7535\u8BDD\u529F\u80FD\u7ED9<br>\u540C\u4E8B\u6253\u7535\u8BDD\u3002</p><p style="margin: 0; font-size: 12px; color: #9F9F9F; margin-top: 3px; margin-bottom: -10px;">\u5DF2\u7ECF\u6709'+W.feed.ww_user_cnt+'\u4F4D\u540C\u4E8B\u4F7F\u7528\u4F01\u4E1A\u5FAE\u4FE1 <a href="http://work.weixin.qq.com/wework_admin/mail_promote_activedcnt?vccode='+W.feed.vcode+'&from=exmail_web_profile_telephone"  target="_blank">\u4E86\u89E3\u66F4\u591A</a></p> ',confirmBtnTxt:'\u7ACB\u5373\u5B89\u88C5',cancelBtnTxt:'\u53D6\u6D88',onreturn:function(X){
if(X)
{
new Image().src="/cgi-bin/sellonlinestatic?sid="+getSid()+"&type=session_statistics&businame=qywework&item=biz_wwlogo_profile_call_download&r="+Math.random();
new (getTop().QMDialog)({nWidth:300,sTitle:'\u626B\u7801\u4E0B\u8F7D\u4F01\u4E1A\u5FAE\u4FE1',sBodyHtml:'<div><img src="https://work.weixin.qq.com/wework_admin/genqrcode?action=commdownload&vccode='+W.feed.vcode+'&from=exmail_profile_tips&qr_size=32" style="width:250px; height:250px; margin-top: 10px;"><p style="margin: 0px;padding-bottom: 30px;">\u626B\u7801\u4E0B\u8F7D\u4F01\u4E1A\u5FAE\u4FE1\u5BA2\u6237\u7AEF</p></div>',onload:function(){
var Z=this,Y=Z.S("cancel");
addEvents([Y],{click:function(aa){
Z.close();
}});
}});
}
}});
}
}
};
});
getTop().addEvent(L.S("close"),"click",function(R){
L.close();
});
}
}});
}});
}};
});
y.qmConvMail=inherit("qmConvMail",y.qmReadMail,function(F){
return {_initMemVar:function(){
var G=this;
F._initMemVar.apply(G,arguments);
G._moSubMails={};
},_setEvent:function(){
var G=this;
G.evt(["ck","dck"],G._moWin.document.body);
},_startSubMod:function(G){
var K=this,J,I=K._moMailInfo,H=extend({},K._moContext,G);
switch(H.sModuleName)
{case "qmSubMail":
var L=I.oSubMails[H.sAux]||[{},{}],N=H.sContext||"";
L[0].cmailid=K.getMailId();
J=new y.qmSubMail(L[0],L[1],H);
N&&(K._moSubMails[N]=J);
break;
case "qmQReply":
var L=I.oSubMails["0"];
J=K._moQReply=new y.qmQReply(L[0],L[1],{fCheckBcc:function(){
callBack.call(K,K.checkBcc,arguments);
},fQReplyComplete:function(O){
K._qReplyComplete(O);
},s:"conv_send"},H);
break;
case B:
var M=getTop();
if(M.getGlobalVarValue("DEF_TRANSLATE")=="1")
{
loadJsFile(M.getPath("js")+M.getFullResSuffix("qmtranslate.js"),true,s.document,function(){
waitFor(function(){
return K.S(f._sContentDiv)&&s.QMTranslate;
},function(O){
if(O)
{
var P=K.S(f._sContentDiv);
new s.QMTranslate({oDom:P});
}
});
});
}
break;
}return J;
},_qReplyComplete:function(G){
var H=evalValue(G),I=this.S(f._sSubMailStartDiv);
if(H)
{
this.S(f._sQSource).view("init");
insertHTML(I,"afterEnd",H.mailstr);
}
else{
this.S(f._sQSource).view("show");
}
},optMail:function(H,I,G){
var M=this,J=M.S('submail_inner_body'),L=finds('div[ck="dispSubMail"]',J),K=M.parentToContextDom(L[0]);
if(K)
{
I=K.getAttribute('context');
}
F.optMail.call(M,H,I,G);
},parentToContextDom:function(G){
return parents("div[module='qmSubMail']",G)[0];
},_pageReady:function(){
var J=this,K=J._moWin,H=J._moConfig,I=J._moMailInfo;
J._fakeReadMail();
J._readMailFinish();
initMailSelect(H.oMoveItems,true,H.bOpenTag=="1",K,H.folderid,H.bAutoTag);
E(I.oSubMails,function(R){
if(R&&!R[1].bAsyn)
{
J._startSubMod(R[2]);
if(R[2].sAux=="0")
{
J._startSubMod({sModuleName:"qmQReply",sAux:"",sContext:R[2].sContext});
}
}
R&&getTop().QMWebpushTip&&getTop().QMWebpushTip.read(1,R[2].sContext);
});
if(H.nRet!=0&&H.bRetry=="")
{
var L=J._moWin.location.href+"";
L=L.replace(/#.*/gi,"")+"&retry=1";
J.clearCache();
J._moWin.location=L;
}
J._flushFolder();
container_name="submail_inner_body";
var Q=document.getElementById("mainFrame").contentWindow.document.getElementById(container_name);
var O=0;
var M=Q.getElementsByTagName("*");
var N=M.length;
for(var P=0;P<N;P++)
{
if(M[P].getAttribute("lazybackground")!=null)
{
O=O+1;
}
else if(M[P].tagName.toLowerCase()=="img"&&M[P].getAttribute("lazysrc")!=null)
{
O=O+1;
}
}
if(O>50)
{
function G()
{
var V=[];
for(var R=0;R<N;R++)
{
if(M[R].getAttribute("lazybackground")!=null)
{
M[R].setAttribute("lazybackground",M[R].getAttribute("lazybackground")+"?"+Math.random());
V.push(M[R]);
}
else if(M[R].tagName.toLowerCase()=="img"&&M[R].getAttribute("lazysrc")!=null)
{
M[R].setAttribute("lazysrc",M[R].getAttribute("lazysrc")+"?"+Math.random());
V.push(M[R]);
}
}
var U=new ImagesLazyLoad({container:container_name,mode:"cross",holder:"",onLoad:function(W){
},images:V,getSrc:function(W){
if(W.getAttribute("lazybackground")!=null)
{
return W.getAttribute("lazybackground");
}
else if(W.tagName.toLowerCase()=="img"&&W.getAttribute("lazysrc")!=null)
{
return W.getAttribute("lazysrc");
}
}});
}
G();
}
else{
for(var P=0;P<N;P++)
{
if(M[P].getAttribute("lazybackground")!=null)
{
M[P].setAttribute("background",M[P].getAttribute("lazybackground"));
M[P].removeAttribute("lazybackground");
}
else if(M[P].tagName.toLowerCase()=="img"&&M[P].getAttribute("lazysrc")!=null)
{
M[P].src=M[P].getAttribute("lazysrc");
M[P].removeAttribute("lazysrc");
}
}
}
},getSubMailWithDom:function(G){
var J=this,I=G,H=G.ownerDocument,L,K;
while(I&&I!=H)
{
if((L=attr(I,z._CON_ATTR))&&(K=J._moSubMails[L]))
{
return K.getMailInfo();
}
I=I.parentNode;
}
return null;
},getSubMailFrom:function(G){
var H=this._moSubMails[G];
if(H)
{
return H.getMailInfo().from.name;
}
}};
});
y.qmSubMail=inherit("qmSubMail",y.qmReadMail,function(F){
return {_setEvent:function(){
var G=this,H=G._moWin;
if(G._moConfig.sIndex=="0")
{
G.evt(["ck"],SN(j._sConvReAndFw,H));
}
G.evt(["ck","dck"],f._sSubMail);
},_ready:function(G){
var K=this,L=K._moWin,H=K._moConfig,J=K._moMailInfo,I=K.S(f._sContentDiv);
H.bMusicManuPlay=H.sIndex!="0";
if(!J.bAsyn)
{
swapLink(I,J.disptype,L,K.getMailId());
K.checkDecryptMail();
}
K._startSubMod({sModuleName:"qmRemark"});
K._startSubMod({sModuleName:"qmAntiSpam"});
K._startSubMod({sModuleName:"qmPlayerParser"});
K._adjustMailContainer();
getTop().goUserInfo.deferget('DEF_TRANSLATE',function(M){
K._startSubMod({sModuleName:B});
});
if(H&&(typeof H.sIndex=="string"))
{
K._fixAbsoluteContent(H.sIndex);
}
},_getCMailId:function(){
return this._moConfig.cmailid;
},clearCache:function(){
rdVer(this._moConfig.cmailid,1);
},afterDecrytMail:function(){
var G=this;
showInfo("\u90AE\u4EF6\u52A0\u5BC6\u6210\u529F");
G._asyncGetSubMail();
G.clearCache();
},_asyncGetMail:function(H,G){
var I=this;
QMAjax.send(T("/cgi-bin/readmail?sid=$sid$&t=readsubmail&s=$s$&mailid=$mailid$&submailid=$submailid$&frid=$frid$&index=$index$").replace({sid:getSid(),mailid:I._getCMailId(),submailid:I.getMailId(),frid:I._moMailInfo.frid,s:H,index:I._moContext.sAux}),{method:"GET",headers:{"If-Modified-Since":"0","Cache-Control":"no-cache, max-age=0"},onload:function(J,K){
var L=trim(K);
if(!J||L.indexOf("<!--cgi exception-->")==0)
{
G();
}
else{
G(evalValue(L));
}
}});
},_setRefer:function(H,G){
var L=this,M=G.innerHTML,I=0,K=GelTags("form",L.S(f._sContentDiv));
for(I=0;I<K.length;I++)
{
var J=K[I];
if(attr(J,"_refer_")=="1")
{
if(H.length)
{
if(I>=H.length)
{
break;
}
try{
J.innerHTML=H[I];
}
catch(N)
{
debug("error:innerHTML readonly "+I);
}
}
J.className=H?"":"qQmAIlcOnV";
}
}
if(H)
{
attr(G,"disp","0");
M=M.replace("\u663E\u793A","\u9690\u85CF");
}
else{
attr(G,"disp","1");
M=M.replace("\u9690\u85CF","\u663E\u793A");
}
G.innerHTML=M;
},seek:function(){
var G=this,H=G._moWin;
scrollIntoMidView(G.S(f._sSubMail),H.document.body);
},newWinRead:function(H,I,G){
goNewWin(T([k,'&t=readmail&folderid=$folderid$']).replace({folderid:this._moConfig.folderid,mailid:I}),false);
},delMail:function(G){
var H=this;
rmMail(H.attr(G,"opt")||0,extend(H.getCBInfo(),{oncomplete:function(I){
rdVer(H._moConfig.cmailid,1);
H._fandx("0",function(){
removeSelf(H.S(f._sSubMail));
H._moWin.QMReadMail.notify("delsubmail");
});
return true;
}}));
},getCBInfo:function(){
var J=this,G=J._moConfig,I=J._moMailInfo,H=I.from||{};
return {oWin:J._moWin,sFid:G.folderid,bML:false,oMail:[{sMid:J.getMailId(),bSys:G.bSys,bUnr:false,bSubUnr:false,bTms:false,sSName:H.name,sSEmail:H.addr}]};
},moreOpt:function(G,H){
var I=calcPos(G),J=this;
new QMMenu({oEmbedWin:J._moWin,sId:"menu_"+H,oItems:[{sId:"reportSpam",sItemValue:"\u4E3E\u62A5"},{sId:"PerDel",sItemValue:"\u5F7B\u5E95\u5220\u9664"},{sId:"note",sItemValue:"\u4FDD\u5B58\u5230\u8BB0\u4E8B\u672C"},{sId:"fweml",sItemValue:"\u4F5C\u4E3A\u9644\u4EF6\u8F6C\u53D1"},{sId:"dleml",sItemValue:"\u5BFC\u51FA\u4E3Aeml\u6587\u4EF6"},{sId:"mime",sItemValue:"\u663E\u793A\u90AE\u4EF6\u539F\u6587"},{sId:"code",sItemValue:"\u90AE\u4EF6\u6709\u4E71\u7801\uFF1F"}],nX:I[3],nY:I[2],onitemclick:function(L,K){
if(L=="reportSpam")
{
J._moAntiSpam.reportSpam(G,H);
J.clearCache();
}
else if(L=="PerDel")
{
J.delMail({opt:"1"});
}
else{
J.optMail2({opt:L},H);
}
}});
},dispRef:function(G){
var H=this,I=H.attr(G,"disp");
if(!G||G.disabled)
{
return;
}
if(I=="1")
{
H._setRefer(true,G);
}
else if(I=="asyn")
{
G.disabled=true;
showProcess(1,true,"\u90AE\u4EF6\u8BFB\u53D6\u4E2D...",null,false);
H._asyncGetMail("refer",function(K){
showProcess(0);
if(K)
{
H._setRefer(K,G);
container_name="submail_inner_body";
var P=document.getElementById("mainFrame").contentWindow.document.getElementById(container_name);
var N=0;
var L=P.getElementsByTagName("*");
var M=L.length;
for(var O=0;O<M;O++)
{
if(L[O].getAttribute("lazybackground")!=null)
{
N=N+1;
}
else if(L[O].tagName.toLowerCase()=="img"&&L[O].getAttribute("lazysrc")!=null)
{
N=N+1;
}
}
if(N>50)
{
function J()
{
var U=[];
for(var Q=0;Q<M;Q++)
{
if(L[Q].getAttribute("lazybackground")!=null)
{
L[Q].setAttribute("lazybackground",L[Q].getAttribute("lazybackground")+"?"+Math.random());
U.push(L[Q]);
}
else if(L[Q].tagName.toLowerCase()=="img"&&L[Q].getAttribute("lazysrc")!=null)
{
L[Q].setAttribute("lazysrc",L[Q].getAttribute("lazysrc")+"?"+Math.random());
U.push(L[Q]);
}
}
var R=new ImagesLazyLoad({container:container_name,mode:"cross",holder:"",onLoad:function(V){
},images:U,getSrc:function(V){
if(V.getAttribute("lazybackground")!=null)
{
return V.getAttribute("lazybackground");
}
else if(V.tagName.toLowerCase()=="img"&&V.getAttribute("lazysrc")!=null)
{
return V.getAttribute("lazysrc");
}
}});
}
J();
}
else{
for(var O=0;O<M;O++)
{
if(L[O].getAttribute("lazybackground")!=null)
{
L[O].setAttribute("background",L[O].getAttribute("lazybackground"));
L[O].removeAttribute("lazybackground");
}
else if(L[O].tagName.toLowerCase()=="img"&&L[O].getAttribute("lazysrc")!=null)
{
L[O].src=L[O].getAttribute("lazysrc");
L[O].removeAttribute("lazysrc");
}
}
}
}
else{
showError("\u90AE\u4EF6\u8BFB\u53D6\u5931\u8D25");
}
G.disabled=false;
});
}
else if(I=="0")
{
H._setRefer(false,G);
}
},dispDetail:function(G){
var N=this,L=N._moMailInfo,P=N.attr(G,"disp"),J=N.S(f._sDetailBtn),I=N.S(f._sDetail),O=N.S(f._sSum),K=GelTags("img",J)[0],H=GelTags("a",J)[0],M=N.S(f._sReferInfo);
if(P=="1")
{
if(isShow(I))
{
return;
}
show(O,false);
qmAnimation.expand(I);
K.title=H.title="\u9690\u85CF\u90AE\u4EF6\u8BE6\u60C5";
K.className="qm_conversation_input_hidemail";
H.innerHTML="\u9690\u85CF";
attr(J,"disp","0");
if(M&&M.innerHTML=="")
{
M.innerHTML=N._moWin.QMReadMail.getSubMailFrom(L.refermailid)||"";
}
}
else{
if(isShow(O))
{
return;
}
qmAnimation.fold(I,{oncomplete:function(){
show(O,true);
}});
K.title=H.title="\u663E\u793A\u90AE\u4EF6\u8BE6\u60C5";
K.className="qm_conversation_input_showmail";
H.innerHTML="\u90AE\u4EF6\u8BE6\u60C5";
attr(J,"disp","1");
}
},_fandx:function(H,G){
var M=this,L=M.S(f._sFold),K=M.S(f._sExpand),N=M.S(f._sSubMail);
if(isShow(L))
{
var I=L.scrollHeight;
show(L,false);
show(K,true);
setClass(N,"qm_con_expand");
qmAnimation.expand(K,{from:I,speed:"fast",tween:"Sine"});
}
else if(isShow(K))
{
show(L,true);
var J=L.scrollHeight;
show(L,false);
qmAnimation.fold(K,{speed:"fast",to:J||48,oncomplete:G||function(){
setClass(N,"qm_con_fold");
show(K,false);
show(L,true);
}});
}
},toReferMail:function(G){
var H=this;
H._moWin.QMReadMail.notify("toRefer",H._moMailInfo.refermailid);
},_asyncGetSubMail:function(){
var G=this;
showProcess(1,true,"\u90AE\u4EF6\u8BFB\u53D6\u4E2D...",null,false);
G._asyncGetMail("submail",function(I){
if(I)
{
showProcess(0);
G.S(f._sSubMail).innerHTML=I.mailstr;
G._fandx();
G._moMailInfo.bAsyn=false;
G._ready();
container_name="submail_inner_body";
var N=document.getElementById("mainFrame").contentWindow.document.getElementById(container_name);
var L=0;
var J=N.getElementsByTagName("*");
var K=J.length;
for(var M=0;M<K;M++)
{
if(J[M].getAttribute("lazybackground")!=null)
{
L=L+1;
}
else if(J[M].tagName.toLowerCase()=="img"&&J[M].getAttribute("lazysrc")!=null)
{
L=L+1;
}
}
if(L>50)
{
function H()
{
var Q=[];
for(var O=0;O<K;O++)
{
if(J[O].getAttribute("lazybackground")!=null)
{
J[O].setAttribute("lazybackground",J[O].getAttribute("lazybackground")+"?"+Math.random());
Q.push(J[O]);
}
else if(J[O].tagName.toLowerCase()=="img"&&J[O].getAttribute("lazysrc")!=null)
{
J[O].setAttribute("lazysrc",J[O].getAttribute("lazysrc")+"?"+Math.random());
Q.push(J[O]);
}
}
var P=new ImagesLazyLoad({container:container_name,mode:"cross",holder:"",onLoad:function(R){
},images:Q,getSrc:function(R){
if(R.getAttribute("lazybackground")!=null)
{
return R.getAttribute("lazybackground");
}
else if(R.tagName.toLowerCase()=="img"&&R.getAttribute("lazysrc")!=null)
{
return R.getAttribute("lazysrc");
}
}});
}
H();
}
else{
for(var M=0;M<K;M++)
{
if(J[M].getAttribute("lazybackground")!=null)
{
J[M].setAttribute("background",J[M].getAttribute("lazybackground"));
J[M].removeAttribute("lazybackground");
}
else if(J[M].tagName.toLowerCase()=="img"&&J[M].getAttribute("lazysrc")!=null)
{
J[M].src=J[M].getAttribute("lazysrc");
J[M].removeAttribute("lazysrc");
}
}
}
}
else{
showError("\u90AE\u4EF6\u8BFB\u53D6\u5931\u8D25");
}
});
},dispSubMail:function(G){
var H=this;
if(H.attr(G,"asyn")=="1")
{
H._asyncGetSubMail();
if(H.attr(G,"newmail")=="true")
{
H.attr(G,"newmail","false");
hasClass(G,"mailunread")&&rmClass(G,"mailunread");
!hasClass(G,"mailread")&&addClass(G,"mailread");
}
}
else{
H._fandx();
}
}};
});
s.QMReadMail=y;
function D(G,H,F)
{
var I=getTop(),J=G,K;
if(J.location&&(/^(set\d\.)?exmail.qq.com$/.test(J.location.hostname)||/dev.exmail.qq.com$/.test(J.location.hostname)))
{
var M=J.document.getElementById("webmail")||null,L=J.document.getElementById("notWebmail")||null;
if(M)
{
M.style.display="";
}
if(L)
{
L.style.display="none";
}
if(F&&F.isNname)
{
K=I.getUserInfoText("alias");
if(K&&K!="")
{
J.document.getElementById("qqmlNickName").innerHTML="Hi\uFF0C"+I.htmlEncode(K)+"\uFF1A";
}
}
}
}
s.readmailSpread=D;
})(window);
