(function(b,a){
function g(h)
{
h=h||"";
if(h.length>25)
{
h=[h.substr(0,25)+"<wbr/>"+g(h.substr(25))].join("");
}
return h;
}
function f(h)
{
return h==a.g_admuin;
}
function e(h)
{
return h==(a.g_admuin+"@qq.com")||(h.toLowerCase().indexOf("postmaster@")==0);
}
var c,d;
var d=function(h){
this._moWin=h;
this._mnStatus;
this._moTriggerDom;
this._mnTimeId;
this._moInfoCard;
this._msUin;
this._msDomId;
this._msEmail;
this._moTmpTR;
this._moAjax;
};
c=d.prototype;
d._TEMPLATE={};
d._TEMPLATE._INSTANCE="_QmProfileTipsInst_";
d._TEMPLATE._OPERATE_COMMON_ITEM=TE(['$@$if($addrid$)$@$','<a href="javascript:;" ck="profile_add" email="$email$" addrid="$addrid$" mailid="$mailid$">\u7F16\u8F91</a>','$@$else$@$','<a href="javascript:;" ck="profile_add" email="$email$" name="$jsname$" mailid="$mailid$">\u6DFB\u52A0</a>','$@$endif$@$','<a href="javascript:;" ck="profile_history" email="$email$" name="$jsname$" class="personOperate3_last">\u5F80\u6765\u90AE\u4EF6</a>','<a href="javascript:;" ck="profile_compose" email="$email$" name="$jsname$">\u53D1\u90AE\u4EF6</a>','']);
d._TEMPLATE._OPERATE=TE(['$@$if($bindqq$>10000)$@$','<div class="personOperate personOperate4">',d._TEMPLATE._OPERATE_COMMON_ITEM,'<a href="javascript:;" ck="profile_qq" bindqq="$bindqq$" class="personOperate4_last">\u53D1QQ\u6D88\u606F</a>','</div>','$@$else$@$','<div class="personOperate personOperate3">',d._TEMPLATE._OPERATE_COMMON_ITEM,'</div>','$@$endif$@$']);
d._TEMPLATE._INFOCARD_DETAIL=TE(['<div class="tipInner">','<div class="left" style="width:43px;  padding:15px 5px 0 10px;">','<div class="icon_user" style="background:#fff url($icon$); float:none; width:40px; height:40px; overflow:hidden; display:block; margin-left:0px;">','<a><img src="$images_path$spacer.gif" title="$title.DATA$" class="iconMask_gray" ></a>','<img src="$images_path$spacer.gif" class="icon_getblogW" uin="$uin$" name="qqicon" id="icon_getblogW" style="position: absolute;$@$if($ownfeedcount$>0)$@$display:inline;$@$endif$@$" title="\u5DF2\u8BA4\u9886\u535A\u5BA2" />','</div>','</div>','<div class="left gray" style="padding:17px 0 5px 0; width:230px; *margin-left:-2px;" >','<div class="b_size"><a class="green bold b_size">$dispname$</a>&nbsp;','</div>','<div style="margin:5px 0;" class="graytext">$dispemail$</div>','</div>','<div class="clr"></div>','$@$if($bNotMyCard$)$@$',d._TEMPLATE._OPERATE,'$@$endif$@$','</div>']);
d._TEMPLATE._INFOCARD_GMEMBERS=TE(['<div class="tipInner">','<div style="overflow-y: auto; width: 320px;$@$if($count$>9)$@$height:258px;$@$endif$@$" class="txtflow">',' <div class="menu_item_nofun" style="height:35px;line-height:35px;">','<div class="bold black" style="height:15px;line-height:15px;padding-top:10px;padding-bottom:10px"><img title="\u90AE\u4EF6\u7FA4\u7EC4" src="$images_path$spacer.gif" class="lm_groupAutoIcon" style="margin-left:0;"/>$groupName$&nbsp;\u7FA4\u7EC4\u6210\u5458</div>',' </div>',' <div class="menu_item_nofun" style="height:8px;line-height:8px;">','  <div style="background:#CCC; height:1px; overflow:hidden; margin:0 15px 0 0;"></div>',' </div>',' $@$if($count$==0)$@$',' <div class="menu_item_nofun" style="height:24px;line-height:24px;">','  <span style="color:#666">\u8BE5\u7FA4\u7EC4\u6CA1\u6709\u6210\u5458</span>',' </div>',' $@$else$@$',' $@$for($members$)$@$',' <div class="menu_item_nofun" style="height:24px;line-height:24px;">','  $@$if($bStatus$==1)$@$','   <span style="color:#333;margin-left:17px;">$sNickName$</span>&nbsp;<span class="tcolor">&lt;$sEmail$&gt;</span>','  $@$else if($bStatus$==2)$@$','   <img title="\u90AE\u4EF6\u7FA4\u7EC4" src="$images_path$spacer.gif" class="lm_groupAutoIcon" style="margin-left:0;"/>','   <span style="color:#333">$sNickName$</span>&nbsp;<span class="tcolor">&lt;$sEmail$&gt;</span>','  $@$else if($bStatus$==3)$@$','   <span style="color:#333;margin-left:17px;">$sNickName$</span>&nbsp;<span class="tcolor">(\u90E8\u95E8)</span>','  $@$endif$@$',' </div>',' $@$endfor$@$',' $@$endif$@$',' <div class="menu_item_nofun">','   <div style="height:5px;overflow:hidden;"></div>',' </div>','</div>','</div>']);
d._TEMPLATE._CORP_PROFILETIPS_DETAIL=TE(['<div class="tipInner tipVerified">','$@$if($sCorpHomePage$)$@$','<a href="$sCorpHomePage$" target="_blank" class="ico_verified pointer"></a>','<a class="tipVerified_logo pointer" href="$sCorpHomePage$" target="_blank" title="$@$eval htmlEncode($sCorpName$)$@$" style="background-image:url($sLogoUrl$);"></a>','$@$else$@$','<span class="ico_verified"></span>','<span class="tipVerified_logo" title="$@$eval htmlEncode($sCorpName$)$@$" style="background-image:url($sLogoUrl$);"></span>','$@$endif$@$','<div class="tipVerified_name green" title="$@$eval htmlEncode($sCorpName$)$@$" test="$sLogoUrl$" style="padding:20px 0 3px;">$@$eval htmlEncode($sCorpName$)$@$</div>','<div class="tipVerified_addr" style="word-break:break-all;"><span class="">\u5730\u5740\uFF1A</span><span>$@$eval htmlEncode($sCorpAddr$)$@$</span></div>','<div class="tipVerified_desc graytext" style="word-break:break-all;">$@$eval htmlEncode($sCorpRemark$)$@$</div>','<div class="tipVerified_from"><a class="pointer" href="http://service.exmail.qq.com/cgi-bin/help?subtype=1&&id=23&&no=1001001" target="_blank">\u817E\u8BAF\u4F01\u4E1A\u90AE\u7BB1\u8BA4\u8BC1</a></div>','</div>']);
d._TEMPLATE._INFOCARD=TE(['$@$if($bIsQywx$)$@$','<div class="profileTip" id="infocard_$id$" style="border: 1px solid #D8D8D8;box-shadow: 0px 1px 10px 0px rgba(0,0,0,0.24);padding: 0;border-radius: 4px display:none;">','	<div class="tipInner" style="width: 370px;">','		<div class="qywx_user_card">','			<label class="biz_icon biz_icon_card_right_corner right"></label>','			<div class="user_info">','				<div class="user_detail">','				<img src="$headImg$" class="avatar left">','					<div class="line">','						$qywx_name$<label class="biz_icon biz_icon_icon_$@$if($gender$==2)$@$female$@$else$@$male$@$endif$@$"></label>','           <span class="tip">\u6B63\u5728\u4F7F\u7528<a style="color: #275770; cursor: pointer;" href="$@$if($vcode$=="")$@$https://work.weixin.qq.com/$@$else$@$https://work.weixin.qq.com/wework_admin/mail_promote_activedcnt?vccode=$vcode$&from=exmail_web_profile_stat$@$endif$@$" target="_blank">\u4F01\u4E1A\u5FAE\u4FE1</a></span>','					</div>','					<div class="line">','						$english_name$','					</div>','					<div class="line">','						<span class="pos">$positon$</span>','					</div>','				</div>','				<div class="info">','					<div class="line">','						<label class="left">\u624B\u673A</label><label class="">$mobile$</label>','					</div>','				$@$if($landline$!="")$@$','					<div class="line">','						<label class="left">\u7535\u8BDD</label><label class="">$landline$</label>','					</div>','				$@$endif$@$','					<div class="line">','						<label class="left">\u90AE\u7BB1</label><label class="">$email$</label>','					</div>			','				</div>','				$@$if($party_path$!="")$@$','				<div class="info">','					<div class="line">','						<label class="left">\u90E8\u95E8</label><label class="" style="display: block; margin-left: 36px;">$party_path$</label>','					</div>	','				</div>','				$@$endif$@$','			</div>','			<div class="operate_cnt">','				<a href="javascript:;" ck="profile_compose" email="$email$" name="$jsname$" >\u5199\u90AE\u4EF6</a>','				<a href="$@$if($active$==1)$@$wxwork://message/?email=$email$$@$else$@$javascript:;$@$endif$@$" target="_blank" ck="profile_qywx_send_msg" class="btn_operate" ><label class="biz_icon biz_icon_mail_list_qywx_logo"></label>\u53D1\u6D88\u606F</a>','				<a href="javascript:;" ck="profile_qywx_call" class="btn_operate last" email="$email$">\u6253\u7535\u8BDD</a>','			</div>','		</div>   ','	</div>   ','</div>','$@$else$@$','<div class="profileTip" id="infocard_$id$" style="display:none;user-select:none">','<div class="infoArrowUp" id="infoarrowup_$id$" style="display:none;"></div>','$@$if($bIsCorp$)$@$',d._TEMPLATE._CORP_PROFILETIPS_DETAIL,'$@$else if($bGroupMem$)$@$',d._TEMPLATE._INFOCARD_GMEMBERS,'$@$else$@$',d._TEMPLATE._INFOCARD_DETAIL,'$@$endif$@$','<div class="infoArrowDown" id="infoarrowdown_$id$" style="display:none;"></div>','</div>','$@$endif$@$']);
c._setStatus=function(h){
var i=this;
i._mnStatus=h;
switch(h)
{case 0:
i._showInfoCard(false);
break;
case 1:
i._mnTimeId=setTimeout(function(){
if(i._mnStatus==1)
{
if(!i._moInfoCard)
{
i._buildInfoCard();
}
else{
i._setStatus(2);
}
}
},i._mnWaitTime);
break;
case 2:
try{
if(i._moTriggerDom.id=="imglogo")
{
break;
}
}
catch(j)
{
}
i._showInfoCard(true);
i._computeCardPos();
break;
case 3:
i._mnTimeId=setTimeout(function(){
if(i._mnStatus==3)
{
i._setStatus(0);
if(i._moTmpTR)
{
i._doMouseOver(i._moTmpTR);
}
}
},100);
break;
case 4:
break;
}
};
c._showInfoCard=function(h){
var j=this,i=j._moInfoCard;
if(!i)
{
return;
}
if(h&&!a.isShow(i)||!h&&a.isShow(i))
{
a.qmAnimation.play(i,{from:h?0.5:1,to:h?1:0.5,speed:'fast',onaction:function(k){
show(i,true);
setOpacity(i,k);
},oncomplete:function(){
a.setOpacity(i,h?1:0.5);
a.show(i,h&&j._mnStatus==2);
a.gbIsIE&&(i.style.filter='');
}});
}
};
c._computeCardPos=function(){
var o=this,q=o._moTriggerDom,n=o._moInfoCard,s=o._msDomId,r=o._moWin,l=r.document,t=q.getAttribute('beside'),p=t?a.S(t,o._moWin):q,m=a.calcPos(p),k=a.calcPos(n),j=a.S('infoarrowup_'+s,r),i=a.S('infoarrowdown_'+s,r),h=l.body.clientWidth;
if((m[1]+k[4])<h)
{
if((p.tagName=='IMG'||m[3]<50)&&p.id!="imglogo")
{
a.show(j,false);
a.show(i,false);
n.style.top=m[0]+'px';
n.style.left=m[1]+5+'px';
}
else{
var u=(m[0]-k[5])>a.bodyScroll(r,'scrollTop');
a.show(j,!u);
a.show(i,u);
n.style.top=u?(m[0]-k[5]-5+'px'):(m[0]+m[5]+8+'px');
n.style.left=m[1]-m[4]/2-65+'px';
}
}
else{
a.show(j,true);
a.show(i,false);
n.style.top=m[2]+'px';
n.style.left=(m[3])+'px';
}
};
c._buildInfoCard=function(){
var m=this,u=m._msUin,p=m._msDomId,q=m._msEmail,o=m._msBindQQ,i=m._mbIsGroup,h=m._mbIsCorp,n=m._msAddrId,r=m._msIcon,s=m._sMailid,t=m._msQQFnd,j=m._mbIsPgroup,k=m._mbIsQywx;
_fBuildHelp=function(v){
var z=m._moTriggerDom,A=m._msNickName,x=f(u),w=e(q),y=q&&!w,v=v||{};
if(A)
{
v.name=A;
}
var C=a.htmlEncode(a.encodeNick(v.name)),B=g(a.htmlEncode(v.name));
extend(v,{'id':p,'uin':u,'email':q,'bindqq':o,'dispname':B,'jsname':C,'dispemail':g(q),'sid':a.getSid(),'images_path':a.getPath('image'),'arrow':z.tagName=="IMG"?0:1,'bmail':y,'addrid':n,'bIsCorp':h,'bIsQywx':k,'bNotMyCard':a.g_encryptuin!==u,"mailid":s});
if(k)
{
extend(v,{qywx_name:v.qywx_name,gender:v.gender,positon:v.positon,english_name:v.english_name,headImg:v.headImg,mobile:v.mobile,landline:v.landline,email:v.email,vcode:v.vcode,active:v.active,party_path:v.party_path.replace(";","<br>")});
}
a.insertHTML(m._moWin.document.body,'afterBegin',d._TEMPLATE._INFOCARD.replace(v));
m._moInfoCard=_oInfoCard=a.S('infocard_'+p,m._moWin);
a.addEvents(_oInfoCard,{mouseover:function(D){
m._setStatus(4);
},mouseout:function(D){
m._setStatus(3);
}});
m._setStatus(2);
m._initEvents();
};
if(k)
{
var l=m._moAjax=new a.QMAjax();
l.method="post";
l.url="/cgi-bin/readtemplate?action=get_wework_user_info&t=rss_mgr&sid="+a.getSid()+"&sender_email="+m._msEmail;
l.send();
l.onComplete=function(v){
var w=null;
if(v&&m._mnStatus==1)
{
w=a.evalValue(v.responseText);
if(w)
{
_fBuildHelp(w.feed);
}
}
};
new Image().src="/cgi-bin/sellonlinestatic?sid="+a.getSid()+"&type=session_statistics&businame=qywework&item=biz_wwlogo_profile_show&r="+Math.random();
}
else if(h)
{
var l=m._moAjax=new a.QMAjax();
l.method="post";
l.url="/cgi-bin/getauthbizinfo?t=infocard&s=corp&bizdomain="+m._msEmail+"&sid="+a.getSid();
l.send();
l.onComplete=function(v){
var w=null;
if(v&&m._mnStatus==1)
{
w=a.evalValue(v.responseText);
if(w)
{
_fBuildHelp(w);
}
}
};
}
else if(i)
{
var l=m._moAjax=new a.QMAjax();
l.method="get",l.url=["/cgi-bin/addr_listall?sid=",a.getSid(),"&t=mail_group&category=mailgroup&groupaddr=",q].join('');
l.onComplete=function(v){
var y=null;
if(v&&m._mnStatus==1)
{
if(v.responseText)
{
y=a.evalValue(v.responseText);
if(y&&y.members)
{
var A=a,x={id:p,groupName:a.htmlEncode(m._msNickName),bGroupMem:true,count:y.members.length,members:[]};
for(var B=0,z=y.members,w=z.length;B<w;B++)
{
x.members.push({sNickName:A.limitString(z[B].sNickName,14),bStatus:z[B].bStatus,sEmail:A.limitString(z[B].sEmail,28)});
}
insertHTML(m._moWin.document.body,'afterBegin',d._TEMPLATE._INFOCARD.replace(x));
m._moInfoCard=_oInfoCard=S('infocard_'+p,m._moWin);
a.addEvents(_oInfoCard,{mouseover:function(C){
m._setStatus(4);
},mouseout:function(C){
m._setStatus(3);
}});
m._setStatus(2);
}
}
}
};
l.send();
}
else if(j)
{
var l=m._moAjax=new a.QMAjax();
l.method="get",l.url=["/cgi-bin/addr_listall?sid=",a.getSid(),"&t=mail_group&category=mailgroup&groupaddr=",q].join('');
l.onComplete=function(v){
var y=null;
if(v&&m._mnStatus==1)
{
if(v.responseText)
{
y=a.evalValue(v.responseText);
if(y&&y.members)
{
var A=a,x={id:p,groupName:a.htmlEncode(m._msNickName),bGroupMem:true,count:y.members.length,members:[]};
for(var B=0,z=y.members,w=z.length;B<w;B++)
{
x.members.push({sNickName:A.limitString(z[B].sNickName,14),bStatus:z[B].bStatus,sEmail:A.limitString(z[B].sEmail,28)});
}
debugger;
insertHTML(m._moWin.document.body,'afterBegin',d._TEMPLATE._INFOCARD.replace(x));
m._moInfoCard=_oInfoCard=S('infocard_'+p,m._moWin);
a.addEvents(_oInfoCard,{mouseover:function(C){
m._setStatus(4);
},mouseout:function(C){
m._setStatus(3);
}});
m._setStatus(2);
}
}
}
};
l.send();
}
else if(u&&!f(u))
{
var l=m._moAjax=new a.QMAjax();
l.method="post";
l.url="/cgi-bin/readtemplate";
l.onComplete=function(v){
var w=null;
if(v&&m._mnStatus==1)
{
w=a.evalValue(v.responseText);
if(w)
{
w.feed.icon="/cgi-bin/getqqicon?uin="+u+"&time="+now();
_fBuildHelp(w.feed);
}
}
};
l.send(T("func=infocard&uin=$uin$&sid=$sid$&t=rss_mgr&s=infocard").replace({sid:a.getSid(),uin:u}));
}
else{
_fBuildHelp({icon:[getPath("image"),"rss/",(e(q)?"face_admin.gif":"male.gif")].join("")});
}
};
c._initEvents=function(){
var j=this;
var i=({click:{profile_add:{bPropagable:false},profile_reject:{bPropagable:false},profile_compose:{bPropagable:false},profile_history:{bPropagable:false},profile_qq:{bPropagable:false},profile_qywx_send_msg:{bPropagable:false},profile_qywx_call:{bPropagable:false}}});
var h=({profile_add:function(k,l){
var m=l.getAttribute("addrid"),n=m?"editAddr":"newAddr",o=m?"\u7F16\u8F91\u8054\u7CFB\u4EBA":"\u65B0\u5EFA\u8054\u7CFB\u4EBA",p=a.T(m?"/cgi-bin/laddr_detail?sid=$sid$&view=normal&t=contact_detail&edit=2&dlgname=editAddr&AddrID=$addrid$":"/cgi-bin/readtemplate?sid=$sid$&view=normal&t=contact_detail&edit=1&dlgname=newAddr&user=$user$&email=$email$&resp_charset=UTF8").replace({email:l.getAttribute("email"),user:encodeURIComponent(l.getAttribute("name")),addrid:m,sid:a.getSid()});
new (a.QMDialog)({sId:n,sTitle:o,sUrl:p,nHeight:500,nWidth:600});
},profile_reject:function(k,l){
a.fireMouseEvent(a.S("qmAntiSpam_reject",a.getMainWin()),"click");
},profile_compose:function(k,l){
var m=a.T("$name$<$email$>").replace({name:a.htmlEncode(l.getAttribute("name")),email:l.getAttribute("email")});
a.openComposeDlg("normal",{sDefAddrs:m,bUinEncrypt:true,bAddrEdit:false});
},profile_history:function(k,l){
a.getMainWin().location.replace(a.T(["/cgi-bin/mail_list?sid=$sid$&sender=$sender$&receiver=$receiver$&name=$name$","&s=searchcontact&matchtype=include&folderid=all&pagesize=50&category=all&from=profile"]).replace({sid:a.getSid(),sender:l.getAttribute("email"),receiver:l.getAttribute("email"),name:l.getAttribute("name")}));
},profile_qq:function(k,l){
a.QMAjax.send(a.T("/cgi-bin/getinvestigate?sid=$sid$&stat=qqbindchart&qqbindno=$qqbindno$").replace({sid:a.getSid(),qqbindno:l.getAttribute("bindqq")}));
window.open(a.T("http://wpa.qq.com/msgrd?v=3&uin=$qqbindno$&site=qq&menu=yes").replace({qqbindno:l.getAttribute("bindqq")}));
},profile_qywx_send_msg:function(k,l){
var m=new a.QMAjax();
m.method="post";
m.url="/cgi-bin/readtemplate?action=get_self_wework_info&t=rss_mgr&sid="+a.getSid();
m.send();
m.onComplete=function(n){
var o=null;
if(n)
{
o=a.evalValue(n.responseText);
if(o.feed.active!="1")
{
getTop().confirmBox({title:'\u4F01\u4E1A\u5FAE\u4FE1\u5DE5\u4F5C\u4FE1\u606F\u5C55\u793A',msg:'<p style="font-size: 12px; margin: 0; line-height: 12px;">\u4F60\u7684\u4F01\u4E1A\u5DF2\u5F00\u901A\u201C\u4F01\u4E1A\u5FAE\u4FE1\u201D\uFF0C\u5B89\u88C5\u540E\u5373\u53EF\u53D1\u9001\u6D88\u606F</p><p style="margin: 0; font-size: 12px; color: #9F9F9F; margin-top: 3px;">\u5DF2\u7ECF\u6709'+o.feed.ww_user_cnt+'\u4EBA\u540C\u4E8B\u4F7F\u7528\u4F01\u4E1A\u5FAE\u4FE1 <a href="http://work.weixin.qq.com/wework_admin/mail_promote_activedcnt?vccode='+o.feed.vcode+'&from=exmail_web_profile_message"  target="_blank">\u4E86\u89E3\u66F4\u591A</a></p> ',confirmBtnTxt:'\u7ACB\u5373\u5B89\u88C5',cancelBtnTxt:'\u53D6\u6D88',onreturn:function(p){
if(p)
{
window.open("https://work.weixin.qq.com/wework_admin/commdownload?vccode="+o.feed.ww_user_cnt+"&from=exmail_web_profile_message");
new Image().src="/cgi-bin/sellonlinestatic?sid="+a.getSid()+"&type=session_statistics&businame=qywework&item=biz_wwlogo_profile_chat_download&r="+Math.random();
}
}});
new Image().src="/cgi-bin/sellonlinestatic?sid="+a.getSid()+"&type=session_statistics&businame=qywework&item=biz_wwlogo_profile_chat_dialog&r="+Math.random();
}
}
};
new Image().src="/cgi-bin/sellonlinestatic?sid="+a.getSid()+"&type=session_statistics&businame=qywework&item=biz_wwlogo_profile_chat&r="+Math.random();
},profile_qywx_call:function(k,l){
var m=new a.QMAjax();
new Image().src="/cgi-bin/sellonlinestatic?sid="+a.getSid()+"&type=session_statistics&businame=qywework&item=biz_wwlogo_profile_call&r="+Math.random();
m.method="post";
m.url="/cgi-bin/readtemplate?action=get_self_wework_info&t=rss_mgr&sid="+a.getSid();
m.send();
m.onComplete=function(n){
var p=null;
if(n)
{
p=a.evalValue(n.responseText);
if(p.feed.active==="1")
{
var o=new a.QMAjax();
o.method="post";
o.url="/cgi-bin/readtemplate?sid="+a.getSid()+"&action=call_by_wework&t=rss_mgr&callee_email="+l.getAttribute("email");
o.send();
o.onComplete=function(q){
var r=null;
if(q)
{
r=a.evalValue(q.responseText);
if(r.feed.errcode==="0")
{
new (getTop().QMDialog)({sTitle:'\u547C\u53EB\u5DF2\u7ECF\u53D1\u51FA',sBodyHtml:'<div class="cnfx_content"><span class="dialog_icon icon_finish_b"></span><div class="dialog_f_c"><p style="font-size: 12px; margin: 0; line-height: 12px;">\u547C\u53EB\u5DF2\u7ECF\u53D1\u51FA\u3002\u8BF7\u5148\u5728\u4F60\u7684\u624B\u673A\u4E0A\u63A5\u542C\u6765\u7535\uFF0C\u968F\u540E\u5C06\u81EA\u52A8\u547C\u53EB\u5BF9\u65B9\u3002</p> </div></div>',sFootHtml:'<div class=" txt_right cnfx_btn"><input class="btn_gray btn_input" type="button" id="cancel" value="\u5173\u95ED" />',onload:function(){
var t=this,s=t.S("cancel");
addEvents([s],{click:function(u){
t.close();
}});
}});
}
else{
new (getTop().QMDialog)({sTitle:'\u547C\u53EB\u5931\u8D25',sBodyHtml:'<div class="cnfx_content"><span class="dialog_icon icon_info_b"></span><div class="dialog_f_c"><p style="margin: 0;">'+r.feed.errmsg+'</p></div></div>',sFootHtml:'<div class=" txt_right cnfx_btn"><input class="btn_gray btn_input" type="button" id="cancel" value="\u5173\u95ED" />',onload:function(){
var t=this,s=t.S("cancel");
addEvents([s],{click:function(u){
t.close();
}});
}});
}
}
};
}
else{
new Image().src="/cgi-bin/sellonlinestatic?sid="+a.getSid()+"&type=session_statistics&businame=qywework&item=biz_wwlogo_profile_call_dialog&r="+Math.random();
getTop().confirmBox({title:'\u4F01\u4E1A\u5FAE\u4FE1\u5DE5\u4F5C\u4FE1\u606F\u5C55\u793A',msg:'<p style="font-size: 12px; margin: 0; line-height: 18px; margin-top: -10px;">\u4F60\u7684\u4F01\u4E1A\u5DF2\u5F00\u901A\u201C\u4F01\u4E1A\u5FAE\u4FE1\u201D\uFF0C\u5B89\u88C5\u540E\u5373\u53EF\u4F7F\u7528\u516C\u8D39\u7535\u8BDD\u529F\u80FD\u7ED9<br>\u540C\u4E8B\u6253\u7535\u8BDD\u3002</p><p style="margin: 0; font-size: 12px; color: #9F9F9F; margin-top: 3px; margin-bottom: -10px;">\u5DF2\u7ECF\u6709'+p.feed.ww_user_cnt+'\u4F4D\u540C\u4E8B\u4F7F\u7528\u4F01\u4E1A\u5FAE\u4FE1 <a href="http://work.weixin.qq.com/wework_admin/mail_promote_activedcnt?vccode='+p.feed.vcode+'&from=exmail_web_profile_telephone"  target="_blank">\u4E86\u89E3\u66F4\u591A</a></p> ',confirmBtnTxt:'\u7ACB\u5373\u5B89\u88C5',cancelBtnTxt:'\u53D6\u6D88',onreturn:function(q){
if(q)
{
new Image().src="/cgi-bin/sellonlinestatic?sid="+a.getSid()+"&type=session_statistics&businame=qywework&item=biz_wwlogo_profile_call_download&r="+Math.random();
new (getTop().QMDialog)({nWidth:300,sTitle:'\u626B\u7801\u4E0B\u8F7D\u4F01\u4E1A\u5FAE\u4FE1',sBodyHtml:'<div><img src="https://work.weixin.qq.com/wework_admin/genqrcode?action=commdownload&vccode='+p.feed.vcode+'&from=exmail_profile_tips&qr_size=32" style="width:250px; height:250px; margin-top: 10px;"><p style="margin: 0px;padding-bottom: 30px;">\u626B\u7801\u4E0B\u8F7D\u4F01\u4E1A\u5FAE\u4FE1\u5BA2\u6237\u7AEF</p></div>',onload:function(){
var s=this,r=s.S("cancel");
addEvents([r],{click:function(t){
s.close();
}});
}});
}
}});
}
}
};
}});
a.liveEvent(j._moInfoCard,{rule:function(){
return i;
},events:function(){
return h;
}});
};
c._forceStop=function(){
var i=this,h=i._moInfoCard;
if(h)
{
a.qmAnimation.stop(h);
a.show(h,false);
}
clearTimeout(i._mnTimeId);
i._moAjax&&i._moAjax.abort();
};
c._doMouseOver=function(h){
var n=this;
if(n._moTriggerDom!=h)
{
if(n._mnStatus==3)
{
n._moTmpTR=h;
return;
}
var u=h.getAttribute('u'),t=h.getAttribute('n'),q=h.getAttribute('e')||"",p=h.getAttribute('b'),j=h.getAttribute('g')==1,r=h.getAttribute('i'),o=h.getAttribute('addrid'),i=h.getAttribute("r")=="corpprofile",s=h.getAttribute("mailid"),l=h.getAttribute("hasOpenQywx")=="1",m=h.getAttribute("w")||500;
var k=false;
if(q.substring(0,2)=="g_"&&q.indexOf('@')==-1)
{
k=true;
i=false;
j=false;
}
if(u=="0"||!u||u==a.g_encryptzero)
{
u="";
}
if(/\D/g.test(o))
{
o="";
}
n._forceStop();
n._moTmpTR=null;
n._moTriggerDom=h;
n._msUin=u;
n._msDomId=[u,q.replace(/\W/gi,"")].join("");
n._mnStatus=0;
n._moInfoCard=S('infocard_'+n._msDomId,n._moWin);
n._msNickName=t;
n._msEmail=q||(u?u+"@qq.com":"");
n._msBindQQ=p;
n._mbIsGroup=j;
n._mbIsPgroup=k;
n._msIcon=r;
n._msAddrId=o;
n._mbIsCorp=i;
n._sMailid=s;
n._mbIsQywx=l;
n._mnWaitTime=parseInt(m,10);
}
n._setStatus(n._mnStatus==0?1:2);
};
c._doMouseOut=function(h){
var j=this,i=j._mnStatus;
j._moTmpTR=null;
j._setStatus((i==2||i==3)?3:0);
};
d._getInstance=function(h){
if(h)
{
var j=d._TEMPLATE._INSTANCE,i=h[j];
if(!i)
{
i=h[j]=new d(h);
addEvent(h,"unload",function(k){
var l=d._getInstance(h);
l&&l._forceStop();
});
}
return i;
}
};
d.doMouseEvent=function(j,i,h){
if(j=="over")
{
d._getInstance(i)._doMouseOver(h);
}
else if(j=="out")
{
d._getInstance(i)._doMouseOut(h);
}
};
b.QMProfileTips=d;
})(window,getTop());
