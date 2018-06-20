(function(b){
var c=getTop(),a={document:c.document,window:c,gsAgent:gsAgent,gbIsFF:gbIsFF,gbIsChrome:gbIsChrome,gbIsSafari:gbIsSafari,gbIsOpera:gbIsOpera,gbIsWebKit:gbIsWebKit,gbIsIE:gbIsIE,gnIEVer:gnIEVer,gbIsMac:gbIsMac,evalCss:evalCss,S:S,T:T,TE:TE,E:E,createBlankIframe:createBlankIframe,createIframe:createIframe,GelTags:GelTags,insertHTML:insertHTML,attr:attr,getStyle:getStyle,setClass:setClass,finds:finds,isShow:isShow,show:show,callBack:callBack,addEvent:addEvent,addEvents:addEvents,removeEvent:removeEvent,getEventTarget:getEventTarget,preventDefault:preventDefault,stopPropagation:stopPropagation,isObjContainTarget:isObjContainTarget,loadJsFile:loadJsFile,waitFor:waitFor,calcPos:calcPos,calcAdjPos:calcAdjPos,calcPosFrame:calcPosFrame,bodyScroll:bodyScroll,getPath:getPath,getPaths:getPaths,getRes:getRes,extend:extend,trim:trim,now:now,unikey:unikey,subAsiiStr:subAsiiStr,debug:debug,QMMenu:QMMenu,QMDialog:QMDialog,QMSelect:QMSelect};
window.QMEditorAdapter=a;
})();
(function(a){
var b=getTop();
QMEditorAdapter.extend(QMEditorAdapter,{calcPos:b.calcPos,calcAdjPos:b.calcAdjPos,calcPosFrame:b.calcPosFrame,showError:b.showError,QMAjax:b.QMAjax,ossLog:b.ossLog,getSid:b.getSid,searchMusic:b.searchMusic,QMAXInfo:b.QMAXInfo,detectActiveX:b.detectActiveX,createActiveX:b.createActiveX,getAttachList:b.getAttachList,hasClass:b.hasClass,addClass:b.addClass,rmClass:b.rmClass,subAsiiStr:b.subAsiiStr,parents:b.parents,finds:b.finds,getDomWin:b.getDomWin,removeSelf:b.removeSelf,LogKV:b.LogKV});
})();
(function(a,c){
var e=['.QMEditorBtnIcon,.qmEditorMenuIcon{width:24px;height:17px;text-align:center;padding:1px;border:none;}.qmEditorMenuIcon{overflow:hidden;}.qmEditorBtnIconOver{padding:1px 0 0 1px;border-left:none;border-top:none;border-right:1px solid gray;border-bottom:1px solid gray;}.qmEditorBtnIconCheck,.qmEditorBtnIconPrevCheck{padding:0;border-left:1px solid gray;border-top:1px solid gray;border-right:1px solid white;border-bottom:1px solid white;}.qmEditorBtnA,.qmEditorFormatting{padding:2px 0 3px 8px;color:#039;font:normal 12px "lucida Grande",Verdana;cursor:pointer;white-space:nowrap;-moz-user-select:none}.qmpanel_shadow .arrow{position:absolute;top:-4px;width:11px;height:11px;overflow:hidden;border:1px solid #bababa;background:#FFFFFF;clip:rect(-3px,10px,10px,-3px);-moz-box-shadow:0 0 3px rgba(0,0,0,0.15);-webkit-box-shadow:0 0 3px rgba(0,0,0,0.15);-o-box-shadow:0 0 3px rgba(0,0,0,0.15);box-shadow:0 0 3px rgba(0,0,0,0.15);-moz-transform:rotate(45deg);-webkit-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg);top:-10px\u005C9;clip:rect(-3px 100px 100px -3px)\u005C9;clip:rect(-3px 100px 100px -3px)\u005C9\u005C0;filter:progid:DXImageTransform.Microsoft.Matrix(Dx=-2,Dy=12,M11=0.7,M12=0.7,M21=-0.7,M22=0.7);}@media screen and (-webkit-min-device-pixel-ratio:0){.qmpanel_shadow .arrow{clip:rect(-3px,10px,10px,-3px);}}@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){.qmpanel_shadow .arrow{top:-4px;clip:rect(-3px,10px,10px,-3px);}}.qmpanel_shadow .btn_close{position:absolute;z-index:3;right:8px;top:8px;width:13px;height:13px;overflow:hidden;vertical-align:middle;background:url($js_path$qqmaileditor/images/mail.png) no-repeat scroll -96px -19px;-moz-border-radius:2px;-webkit-border-radius:2px;-o-border-radius:2px;border-radius:2px;}.qmpanel_shadow .btn_close:hover{background-position:-107px -19px;background-color:#999;}.qmpanel_shadow .btn_close:active{opacity:0.6;filter:alpha(opacity=60);}.qm_addinput{height:22px;line-height:1;border-width:1px;border-color:#9a9a9a #7c7c7c #c3c3c3 #c3c3c3;box-shadow:0 1px 1px #d4d4d4 inset;margin:0 5px 0 0;padding:0 5px;padding:5px\u005C9;height:12px\u005C9;width:295px;border-radius:3px;background:#FFFFFF;}.qmEdMap_head{padding:20px 0;text-align:center;}.qmEdMap_search{position:relative;width:427px;margin:0 auto;text-align:left;overflow:hidden;*zoom:1;}.qmEdMap_search .qm_addinput{float:left;width:356px;margin-right:5px;_width:353px;}.qmEdMap_search .button_gray_s{float:left;width:52px;}.qmEdMap_searchPlaceholder{position:absolute;top:4px;*top:5px;left:6px;color:#999;cursor:text;}.qmEdMap_bg{height:126px;margin-top:80px;background-image:url($js_path$qqmaileditor/images/editor_map.png);background-repeat:no-repeat;background-position:130px 0;}.qmEdMap_resultTitle{position:relative;border-top:1px solid #ddd;}.qmEdMap_resultTitleText{position:absolute;left:50%;top:-9px;width:100px;margin-left:-50px;line-height:normal;text-align:center;color:#c4c4c4;background:#fff;}.qmEdMap_resultList{position:relative;height:317px;margin:10px 0 8px;overflow-x:hidden;overflow-y:auto;}.qmEdMap_resultList .itemSplit{position:absolute;left:0;width:100%;height:10px;line-height:0;background:#fff;}.qmEdMap_resultList .itemSplit_Top{top:0;}.qmEdMap_resultList .itemSplit_Bottom{bottom:0;}.qmEdMap_resultItem a{display:block;padding:5px 20px 4px;line-height:20px;border-bottom:1px solid #eaeaea;_width:411px;}.qmEdMap_resultItem a:hover{background:#f0f1f1;text-decoration:none;}.qmEdMap_resultItem .title,.qmEdMap_resultItem .text{display:block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;word-break:break-all;color:#a4a4a4;_width:411px;}.qmEdMap_resultItem .title{color:#000;}.qmEdMap_resultLocation{padding:20px 20px 0;overflow:hidden;}.qmEdMap_resultMap{position:relative;height:250px;border:1px solid #b0b0b0;overflow:hidden;}.qmEdMap_resultMapList{position:absolute;left:0;width:100%;}.qmEdMap_resultMapControl{width:16px;height:33px;margin:11px 0 0 13px;background-color:#fff;border:1px solid #d7d7d7;border-color:rgba(0,0,0,.2);border-radius:2px;}.qmEdMap_resultMapControl_btn{display:block;height:16px;background:url($js_path$qqmaileditor/images/common.png) no-repeat -48px 0;}.qmEdMap_resultMapControl_btn:hover{text-decoration:none;}.qmEdMap_resultMapControl_btn_Increase{border-bottom:1px solid #ccc;}.qmEdMap_resultMapControl_btn_Decrease{background-position:-64px 0;}.qmEdMap_resultItem_MapWrap{position:relative;}.qmEdMap_resultItem_MapWrap .mask{position:absolute;top:0;left:0;bottom:0;right:0;width:100%;_height:204px;background:#000;opacity:.9;-moz-opacity:.9;filter:Alpha(Opacity=90);-ms-filter:alpha(opacity=90);}.qmEdMap_resultItem_MapWrap .listWrap{position:relative;height:204px;overflow-x:hidden;overflow-y:auto;}.qmEdMap_resultItem_MapWrap .listWrap::-webkit-scrollbar{width:15px;}.qmEdMap_resultItem_MapWrap .listWrap::-webkit-scrollbar-button{width:0;height:0;display:none}.qmEdMap_resultItem_MapWrap .listWrap::-webkit-scrollbar-corner{background-color:transparent;}.qmEdMap_resultItem_MapWrap .listWrap::-webkit-scrollbar-thumb{background-color:#7b7b7b;border-radius:10px;border:3px solid #494949;border-top-width:2px;border-bottom-width:2px;}.qmEdMap_resultItem_MapWrap .listWrap::-webkit-scrollbar-thumb:hover{background-color:#a3a3a3;border-radius:10px;}.qmEdMap_resultItem_MapWrap .listWrap::-webkit-scrollbar-track{background-color:#494949;}.qmEdMap_resultItem_Map a{padding:4px 10px;line-height:16px;border-color:#505050;_width:390px;}.qmEdMap_resultItem_Map a:hover{background:#505050;}.qmEdMap_resultItem_Map .more{float:right;position:relative;width:50px;height:36px;border-left:1px solid #505050;padding-left:0;padding-right:0;}.qmEdMap_resultItem_Map .trangle{position:absolute;top:20px;left:18px;display:block;content:" ";width:0;line-height:0;font-size:0;border-style:solid;border-color:transparent;border-width:6px;_border-color:red;_filter:chroma(color=red);}.qmEdMap_resultItem_Map .trangle_top{border-top:0;border-bottom-color:#fff;_border-bottom-color:#fff;}.qmEdMap_resultItem_Map .trangle_down{border-bottom:0;border-top-color:#fff;_border-top-color:#fff;}.qmEdMap_resultItem_Map .now{background:none!important;cursor:default;overflow:hidden;_float:left;}.qmEdMap_resultItem_Map .now .text{color:#a4a4a4;}.qmEdMap_resultItem_Map .text,.qmEdMap_resultItem_Map .title{_width:390px;}.qmEdMap_resultItem_Map .title{color:#fff;}.qmEdMap_resultItem_MapWrap_Curr .mask{_height:46px;opacity:.8;-moz-opacity:.8;filter:Alpha(Opacity=80);-ms-filter:alpha(opacity=80);}.qmEdMap_resultItem_MapWrap_Curr ul{position:relative;_height:46px;_overflow:hidden;}.qmEdMap_resultItem_MapWrap_Curr .qmEdMap_resultItem_Map{border-top:1px solid #505050;_zoom:1;}.qmEdMap_resultItem_MapWrap_Curr a{width:354px;height:36px;padding:5px 10px 3px;line-height:18px;}.qmEdMap_resultItem_MapWrap_Curr .title,.qmEdMap_resultItem_MapWrap_Curr .text{_width:354px;}.qmEdMap_resultAddBtn{display:block;width:145px;height:30px;margin:15px auto;line-height:30px;text-align:center;background:#5d99db;border:1px solid #5293db;-moz-border-radius:3px;-khtml-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;color:#fff!important;text-decoration:none!important;}.qmEdMap_resultEmpty,.qmEdMap_resultLoading{position:relative;height:335px;overflow:hidden;}.qmEdMap_resultEmptyTips{position:absolute;top:50%;margin-top:-10px;width:100%;line-height:20px;text-align:center;color:#000;}.qmEdMap_resultLoading img{position:absolute;top:50%;left:50%;margin:-16px 0 0 -16px;}.qmEdMap_iconLocation{display:inline-block;width:42px;height:34px;background-size:100% 100%;background-image:url($js_path$qqmaileditor/images/icon_location.png);background-repeat:no-repeat;_width:22px;_height:32px;_background-image:url($js_path$qqmaileditor/images/icon_location_ie6.png);}.QMEditorToolPop .qmEditorHead{color:#494949;padding:10px 10px 10px 15px;border-bottom:1px solid #bababa;text-align:left;}.editor_btn{position:relative;margin-right:14px;display:inline-block;white-space:nowrap;}.editor_btn_text{display:inline-block;padding:0 0 2px 18px;padding-top:1px\u005C0;*padding:2px 0 0 18px;width:auto;height:auto;}.MacOS .editor_btn_text{padding-top:1px;}.menu_bd .editor_btn_text{padding-top:0;padding-bottom:0;}.editor_btn .ico_moreupload{margin-left:3px;cursor:pointer;}.qmEditorMap{background-position:0 -691px;}.menu_item_high .qmEditorMap{background-position:0 -741px;}.qmEditorToolBarItem .qmEditorPhoto,.qmEditorToolBarItem .qmEditorScreenSnap,.qmEditorToolBarItem .qmEditorMo,.qmEditorToolBarItem .qmEditorWord{background:none;}@media only screen and (-webkit-min-device-pixel-ratio:2),only screen and (min-device-pixel-ratio:2){.menu_item_high .qmEditorMap{background-position:0 -691px;}.qmEditorToolBarItem .qmEditorPhoto,.qmEditorToolBarItem .qmEditorScreenSnap,.qmEditorToolBarItem .qmEditorMo,.qmEditorToolBarItem .qmEditorWord{background:none;}.qmEdMap_bg{background-image:-webkit-image-set(url($js_path$qqmaileditor/images/editor_map.png) 1x,url($js_path$qqmaileditor/images/editor_map_2x.png) 2x);}.qmEdMap_iconLocation{background-image:-webkit-image-set(url($js_path$qqmaileditor/images/icon_location.png) 1x,url($js_path$qqmaileditor/images/icon_location_2x.png) 2x);}.qmEdMap_resultMapControl_btn{background-image:-webkit-image-set(url($js_path$qqmaileditor/images/common.png) 1x,url($js_path$qqmaileditor/images/common_2x.png) 2x);}}.qmEdMap_resultEmpty{text-align:initial;}.qmEdMap_resultItem{text-align:initial;}.qmEdMap_body .qmEdMap_resultItem{text-align:left;}'].join('\n');
function b(f)
{
if(!f)
{
f={};
}
this._msEditorId=f.editorId||["QMEditor",(new Date()).valueOf()].join("");
this._msTbExternId=f.tbExternId||"QMEditorToolBarPlusArea";
this._moTbExternObj=f.tbExternObj;
this._moEditorAreaWin=f.editorAreaWin||window;
this._msEditorAreaId=f.editorAreaId||"QMEditorArea";
this._moEditorAreaObj=f.editorAreaObj;
this._mnFixedHeight=f.height;
this._moAllowCustomTag=f.customtags;
this._msResPath=f.resPath||getPath("image");
this._moLanguage=f.language||b.CONST.LANGUAGE.zh_CN;
this._moTemplate=b.CONST._TEMPLATE;
this._msStyle=[";",f.style].join("").toLowerCase();
this._moFuncList=f.funclist||b.CONST.FUNCLIST.BASE;
this._msEditMode="html";
this._msEditorStatus="NotInited";
this._moDefaultFontInfo={};
this._moLoaddingFile={};
this._moInfile={};
this._mbIsOpenEditBar=f.isOpenEditBar;
var g=b.CONST._FILES;
for(var k in g)
{
var h=g[k].split(" ");
for(var l=h.length-1;l>=0;l--)
{
this._moInfile[h[l]]=k;
}
}
this._mfOnLoad=f.onload;
this._mfOnFocus=f.onfocus;
this._mfOnBlur=f.onblur;
this._mfOnClick=f.onclick;
this._mfOnMouseDown=f.onmousedown;
this._mfOnKeyDown=f.onkeydown;
this._mfOnKeyUp=f.onkeyup;
this._mfOnPaste=f.onpaste;
this._mfOnPutContent=f.onputcontent;
this._mfOnBeforeSaveRange=f.onbeforesaverange;
this._mfOnUserSelectChange=f.onselectionchange;
this._mfOnChangeContentType=f.onchangecontenttype;
this._mfOnChangeBgMusic=f.onchangebgmusic;
this._mfOnShowInstallactive=f.onshowinstallactive;
this._mfOnPreview=f.onpreview;
this._mfOnUploadEml=f.onuploademl;
this._msPhotoActionSrc=f.photoCGI;
this._moPhotoConfig=f.photoConfig;
this._moParamSet=f;
this._moCustomVar=f.customVar||{};
this._moPrevCmdList=[];
this._moResizeEditorHeightList=[];
}
;b.prototype.appendContent=function(f){
function p(s,u,t)
{
if(!s)
{
return false;
}
try{
if(s.insertAdjacentHTML)
{
s.insertAdjacentHTML(u,t);
}
else{
var x=s.ownerDocument.createRange(),q=u.indexOf("before")==0,r=u.indexOf("Begin")!=-1;
if(q==r)
{
x[q?"setStartBefore":"setStartAfter"](s);
s.parentNode.insertBefore(x.createContextualFragment(t),r?s:s.nextSibling);
}
else{
var v=s[q?"lastChild":"firstChild"];
if(v)
{
x[q?"setStartAfter":"setStartBefore"](v);
s[q?"appendChild":"insertBefore"](x.createContextualFragment(t),v);
}
else{
s.innerHTML=t;
}
}
}
return true;
}
catch(w)
{
return false;
}
}
var h=this;
if(h.getContentType()=='text')
{
h.setContent(h.getContent()+f);
}
else{
var l=b.getTopWin();
if(h.getContentType()=='html')
{
var j=h.getContentTags('sign')[0];
if(j)
{
p(j,'beforeBegin',f);
return this;
}
var k=h.getContentObj("QQMAILSTATIONERY");
if(k)
{
p(k,'beforeEnd',f);
return this;
}
var i=h.getContentTags('includetail')[0];
if(i)
{
p(i,'beforeBegin',f);
return this;
}
h.setContent(h.getContent()+f);
}
else{
var m=h.getContent();
var g=false;
var n='';
var o=m.replace(/<includetail>[\s\S]*<\/includetail>/g,function(q){
n+=q;
return '';
});
o=o.replace(/<sign +signid=\S+? +nreadytime=\S+? *>[\s\S]*<\/sign>/,function(q){
g=true;
return f+q;
});
if(!g&&o.indexOf('QQMAILSTATIONERY')!=-1)
{
o=o.replace(/<\/td>[\s\S]*?$/,function(q){
g=true;
return f+q;
});
}
if(g)
{
m=o+n;
}
else{
m=m.replace(/<includetail>[\s\S]*<\/includetail>/,function(q){
g=true;
return f+q;
});
}
if(!g)
{
m+=f;
}
h.setContent(m);
}
}
return this;
};
b.prototype.getEditorId=function(){
return this._msEditorId;
};
b.prototype.getPhotoActionSrc=function(){
return this._msPhotoActionSrc;
};
b.prototype.getTbExtern=function(){
var g=this,f=g._moTbExternObj;
return f?f:(g._moTbExternObj=S(g._msTbExternId,g._moEditorAreaWin));
};
b.prototype.getEditorArea=function(){
var g=this,f=g._moEditorAreaObj;
return f?f:(g._moEditorAreaObj=S(g._msEditorAreaId,g._moEditorAreaWin));
};
b.prototype.getEditorAreaWin=function(){
return this._moEditorAreaWin;
};
b.prototype.getEditorCustomVar=function(f){
if(!f)
{
return this._moCustomVar;
}
else{
var g=f.split('.');
var h=this._moCustomVar;
for(var j=0,k=g.length;j<k;j++)
{
if(h&&typeof (h)=='object'&&h[g[j]])
{
h=h[g[j]];
}
else{
return;
}
}
return h;
}
};
b.prototype.setEditorCustomVar=function(f,g){
var h=f.split('.');
var k=h.pop();
var j=this._moCustomVar;
for(var l=0,m=h.length;l<m;l++)
{
if(j&&typeof (j)=='object')
{
j=j[h[l]];
}
else{
j[h[l]]={};
}
}
j[k]=g;
return this;
};
b.prototype.getContentType=function(){
return this._msEditMode=="text"?"text":"html";
};
b.prototype.adjustBodyStyle=function(f,g){
try{
"txt"!==this._msEditCore&&(this._moEditBody.style[f]=g);
}
catch(h)
{
debug("QMEditor adjustBodyStyle err:"+h.message);
}
return this;
};
b.prototype.getBodyStyle=function(f){
return "txt"!==this._msEditCore?this._moEditBody.style[f]:"";
};
b.prototype.getEditWin=function(){
return this._moEditWin;
};
b.prototype.initialize=function(h,f,g){
var i=this;
if(!(i.getEditorArea())||i._msEditorStatus!="NotInited")
{
return false;
}
i._msEditorStatus="Initlizing";
if(typeof evalCssNew=='function')
{
evalCssNew(e,this._moEditorAreaWin.parent,"qmEditor");
evalCssNew(e,this._moEditorAreaWin,"qmEditor");
}
else{
evalCss(e,this._moEditorAreaWin.parent,"qmEditor");
evalCss(e,this._moEditorAreaWin,"qmEditor");
}
((/android|ipad|iphone|ipod/i).test(gsAgent)?i._initializeForTxt:i._initializeForIframe).call(i,b.getBreakLine(),g,function(){
h&&i.setContent(h);
if("txt"!==i._msEditCore)
{
i._fixHtmlContent();
i._setFixFocusEvent();
i._setFixIEBreakLineEvent();
i._setFixIEBackSpaceEvent();
i._setEditorSelectionChangeEvent();
}
i._setUnloadEvent();
i._setMouseEvent();
i._setKeyDownEvent();
i._setFocusEvent();
if(i._mbIsOpenEditBar)
{
i._moEditMenuObj=new b.EditMenu({editor:i,editorAreaWin:i._moEditorAreaWin});
}
i._msEditorStatus="Ready";
b.setEditor(i);
if("txt"!==i._msEditCore)
{
i._initializeToolbar();
f&&i.showToolBar(true);
}
if(typeof (i._mfOnLoad)=="function")
{
i._moEditorAreaWin.setTimeout(function(){
i._mfOnLoad.call(i);
});
}
});
return true;
};
b.prototype.isInitialized=function(){
return this._msEditorStatus=="Ready";
};
b.prototype.isSelectionInObject=function(f){
if(!f||"txt"===this._msEditCore)
{
return;
}
if(this._moEditWin.getSelection)
{
var o=this._moEditWin.getSelection();
if(o&&o.rangeCount>0)
{
var m=o.getRangeAt(0),l=this._moEditDoc.createRange();
l.selectNode(f.firstChild||f);
var h=m.compareBoundaryPoints(Range.START_TO_START,l)==1;
l.selectNode(f.lastChild||f);
var g=m.compareBoundaryPoints(Range.END_TO_END,l)==-1;
if(!(h&&g))
{
return false;
}
}
else{
return false;
}
}
else{
var m=this._moEditDoc.body.createTextRange();
m.moveToElementText(f);
var o=this._moEditDoc.selection;
var n=o.createRange();
if(o.type=="Control")
{
for(var p=0,j=n.length;p<j;p++)
{
if(n(p).parentNode)
{
var k=n(p).parentNode;
n=this._moEditDoc.body.createTextRange();
n.moveToElementText(k);
break;
}
}
}
if(!m.inRange(n))
{
return false;
}
}
return true;
};
b.prototype.focus=function(f,g){
var h=null;
if("txt"===this._msEditCore)
{
h=this._moEditBody;
}
else{
switch(this._msEditMode)
{case "text":
this._moEditorAreaWin.focus();
this._moTextBody.focus();
h=this._moTextBody;
break;
case "source":
this._moEditorAreaWin.focus();
this._moSrceBody.focus();
h=this._moSrceBody;
break;
case "html":
default:
if(!(h=g))
{
h=this._hasDesignMode(this._moEditDoc)?this._moEditWin:this._moEditBody;
h.focus();
!f&&h.innerText===""&&(f=1);
}
break;
}
}
this._setCursorPos(h,f);
};
b.prototype.scrollTo=function(f){
var g=this;
switch(g._msEditMode)
{case "html":
g._moEditBody.scrollTop=f;
break;
case "text":
g._moTextBody.scrollTop=f;
break;
case "source":
g._moSrceBody.scrollTop=f;
break;
}
};
b.prototype.showCursor=function(){
try{
this._moEditDoc.selection.createRange().select();
}
catch(f)
{
}
};
b.prototype.changeContentType=function(g,f){
var h=!g?(this.getContentType()=="text"?true:false):(g=="text"?false:true);
g=h?"html":"text";
if(g==this.getContentType())
{
return true;
}
if("txt"!==this._msEditCore)
{
if(!h&&!confirm(this._moLanguage.CHG_CONTENTTYPE))
{
return false;
}
this._moEditObj.style.display=h?"block":"none";
this._moTextBody.style.display=h?"none":"block";
this._moSrceBody.style.display="none";
if(!h)
{
this._syncHtmlContentTo("text");
}
else{
this._syncTextContentTo("html");
}
this.showToolBar(h?this.isShowToolBar():false,true);
show(this.getTbExtern(),h);
}
this._msEditMode=g;
this.focus(0);
if(typeof (this._mfOnChangeContentType)=="function")
{
this._mfOnChangeContentType.call(this);
}
return true;
};
b.prototype.showToolBar=function(g,f){
var h=this;
if("txt"!==h._msEditCore)
{
g=g==null?!h.isShowToolBar():g;
!f&&h._moToolBarObj.setAttribute("disp",g?"true":"false");
h._moToolBarObj.parentNode.style.display=g?"":"none";
h._fixHeight();
}
};
b.prototype.isShowToolBar=function(){
return "txt"!==this._msEditCore&&this._moToolBarObj&&this._moToolBarObj.getAttribute("disp")=="true";
};
b.prototype.isSupportToolBar=function(){
return "txt"!==this._msEditCore;
};
b.prototype.getBgMusicInfo=function(){
return "txt"!==this._msEditCore?this._moBgMusicInfo:null;
};
b.prototype.getContent=function(f){
var g=this;
return ("txt"!==g._msEditCore?g._getEditContent:g._getEditContentForTxt).call(g,g._msEditMode,f);
};
b.prototype.getContentByHasMapWarpLink=function(f){
var t;
try{
var o=this;
if("txt"===o._msEditCore)
{
return f;
}
var q=getTop();
var i;
try{
i=((q.getActionWin&&q.getActionWin()||q).document);
}
catch(u)
{
i=document;
}
;var j=i.createElement('div'),p=i.createElement('div'),k=q.TE(['<a href="$jump$" target="_blank" notForEdit="true" attr-hasmapwrap="1">$img$</a>']),s,l,n,r,m,g;
j.style.display='none';
p.style.display='none';
i.body.appendChild(j);
j.innerHTML=f;
n=q.finds('img[ui-type="share_map"]',j);
for(var h=n.length-1;h>-1;--h)
{
l=n[h];
r=q.attr(l,"jump");
m=l.parentNode;
if(!(r&&/apis\.map\.qq\.com/i.test(r))||(m&&/^a$/i.test(m.tagName)&&q.attr(m,"attr-hasmapwrap")=="1"))
{
continue;
}
p.appendChild(l.cloneNode());
s=k.replace({jump:r,img:p.innerHTML});
p.innerHTML="";
q.replaceHTML(l,s);
g=true;
}
t=j.innerHTML;
q.removeSelf(p);
q.removeSelf(j);
}
catch(u)
{
t=f;
}
return t;
};
b.prototype.getContentWidthSpellcheck=function(f){
var g=this;
return ("txt"!==g._msEditCore?g._getEditContent:g._getEditContentForTxt).call(g,g._msEditMode,f,1);
};
b.prototype.getContentObj=function(f){
return "txt"!==this._msEditCore?S(f,this._moEditWin):null;
};
b.prototype.getContentTags=function(f){
return "txt"!==this._msEditCore?GelTags(f,this._moEditDoc):[];
};
b.prototype.getDefaultFontInfo=function(){
return "txt"!==this._msEditCore?this._moDefaultFontInfo:{};
};
b.prototype.setContent=function(f){
var g=this;
return ("txt"!==g._msEditCore?g._setEditContent:g._setEditContentForTxt).call(g,g._msEditMode,f);
};
b.prototype.setBgMusicInfo=function(h,g,i){
if("txt"!==this._msEditCore)
{
var f=this._moBgMusicInfo||{},l=f.song,k=f.singer,m=f.url,j=!l&&!h?i!=m:(l!=h||k!=g);
this._moBgMusicInfo=!h&&!i?null:{song:h,singer:g,url:i};
if(!j)
{
return;
}
if(typeof (this._onprivatechangebgmusic)=="function")
{
this._onprivatechangebgmusic(this);
}
if(typeof (this._mfOnChangeBgMusic)=="function")
{
this._mfOnChangeBgMusic.call(this);
}
}
};
var d=b.prototype.hideMenu;
b.prototype.setDefaultFontInfo=function(g,h,f){
return this.adjustBodyStyle("fontFamily",(this._moDefaultFontInfo.fontName=g)||"Verdana").adjustBodyStyle("fontSize",(this._moDefaultFontInfo.fontSize=h)||"14px").adjustBodyStyle("color",(this._moDefaultFontInfo.fontColor=f)||"#000");
};
b.prototype.hideNewMenu=function(f,g){
var h=QMMenu();
for(var j in h)
{
h[j].close();
}
};
b.prototype.hideMenu=function(f,g){
var h=this;
if(this._getCurMenuFuncObj())
{
this._getCurMenuFuncObj()._hideMenu(f);
}
g&&b.prototype.hideNewMenu.call(h,f,g);
h._mbIsOpenEditBar&&!g&&h._moEditMenuObj.hideEditMenu();
};
b.prototype.addEvent=function(g,f){
if(typeof (f)!="function")
{
return false;
}
var h=["on",g,"List"].join("");
if(!this[h])
{
this[h]=[];
}
this[h].push(f);
return true;
};
b.prototype.saveRange=function(){
if("txt"!==this._msEditCore)
{
if(typeof (this._mfOnBeforeSaveRange)=="function")
{
this._mfOnBeforeSaveRange.call(this);
}
this._moEditorRange=this._getRange();
}
};
b.prototype.loadRange=function(f){
if("txt"!==this._msEditCore)
{
if(f=="last")
{
this._loadLastRange();
}
else if(this._setRange(this._moEditorRange))
{
if(f!="notclear")
{
this.clearRange();
}
}
}
};
b.prototype.clearRange=function(){
this._moEditorRange=null;
};
b.prototype.paste=function(){
"txt"!==this._msEditCore&&this._execCmd("paste");
};
b.prototype.updateToolBarUI=function(f){
if("txt"!==this._msEditCore)
{
var g=function(h){
E(h,function(i){
if(i.funcObj&&i.funcName==f)
{
i.funcObj._updateUI();
}
});
};
g(this._moToolBarInfo);
g(this._moTbExternInfo);
}
};
b.prototype.setSelection=function(f){
var i=this;
if(i._moEditWin.getSelection)
{
var h=i._moEditWin.getSelection();
var g=i._moEditDoc.createRange();
h.removeAllRanges();
g.selectNodeContents(f);
h.addRange(g);
}
else if(i._moEditDoc.selection)
{
var j=i._moEditBody.createTextRange();
j.moveToElementText(f);
j.select();
}
};
b.prototype.getSelectionDom=function(){
var f=this;
if(f._moEditDoc.selection)
{
return f._moEditDoc.selection.createRange().parentElement();
}
else if(f._moEditWin.getSelection)
{
if(f._moEditWin.getSelection().anchorNode)
{
if(f._moEditWin.getSelection().anchorNode.nodeName=="SPAN")
{
return f._moEditWin.getSelection().anchorNode;
}
else{
return f._moEditWin.getSelection().anchorNode.parentNode;
}
}
}
};
b.prototype.getPhotoConfig=function(){
return this._moPhotoConfig;
};
b.prototype.loadLastRange=function(){
return this._loadLastRange();
};
b.prototype.test=function(){
try{
return (this.getEditorArea().getAttribute("QMEditorId")==this._msEditorId&&("txt"===this._msEditCore?true:GelTags("td",this._moEditorAreaObj)[1].firstChild==this._moEditObj));
}
catch(f)
{
return false;
}
};
b.prototype.resetFixHeight=function(){
var f=this;
f._moEditorAreaObj.style.height=f._mnFixedHeight;
gbIsIE&&(GelTags("td",f._moEditorAreaObj)[1].style.height=f._mnFixedHeight);
f._moEditObj.style.height=f._mnFixedHeight;
};
b.prototype.setMapImgFlag=function(f){
if(f)
{
this._moMapImg?this._moMapImg.push(true):(this._moMapImg=[true]);
}
else{
this._moMapImg?this._moMapImg.pop():"";
}
};
b.prototype.hasMapImg=function(){
return (this._moMapImg&&this._moMapImg.length>0);
};
b.prototype.execCmdNew=function(g,h,f){
var j=this;
if(j._mbIsFinish&&!j._mbIsFocus)
{
j.focus();
j._mbIsFocus=true;
setTimeout(function(){
j.execCmdNew(g,h,f);
});
return true;
}
else{
this.loadLastRange();
var i=j._doCmd("execCommand",g,h);
if(i)
{
if(typeof (f)=="function")
{
f.call(j);
}
j._mbIsFinish&&j._doOnSelectionChange({},true);
}
return i;
}
};
b.prototype.insertImage=function(h,f,g){
var i=this,j=getTop(),k=(g&&g.cmd||"InsertImage");
this.execCmdNew(k,h,function(){
var r=i._moEditDoc.selection,l=g&&g.bIsFromMap,n;
if(r&&r.type=="Control")
{
n=i.getSelectionElement();
var q=i._moEditDoc.body.createTextRange();
q.moveToElementText(n);
q.moveEnd("character",l?0:1);
q.collapse(false);
q.select();
}
else{
var q=i._moEditWin.getSelection().getRangeAt(0);
n=q.startContainer.childNodes[q.startOffset-1];
}
if(l)
{
var o=i.getImgDom(n);
if(o)
{
if(g.isLoading)
{
o.style.cssText="padding: 109px 196px 109px 197px;border: 1px solid #b0b0b0;*padding: 0;*margin: 109px 196px 109px 197px;*border: 0;";
j.attr(o,"ui-type","qqmail_share_map_loading");
try{
if(o.previousSibling&&!(/^br$/i.test(o.previousSibling.tagName))||o.previousSibling.nodeType==3)
{
j.insertHTML(o,"beforeBegin","<div></br></div>");
}
}
catch(s)
{
}
}
else{
o.height=250;
o.width=425;
j.attr(o,"ui-type","share_map");
j.attr(o,"stitle",g.title);
j.attr(o,"center",g.center);
j.attr(o,"skwd",g.searchkeyword);
j.attr(o,"pos",g.pos);
j.attr(o,"jump",g.sMapRedirectUrl);
j.attr(o,"desc",g.detaildesc);
j.attr(o,"zoom",g.zoom);
o.style.cssText="border: 1px solid #b0b0b0;";
try{
if(j.gbIsIE)
{
o.contentEditable=false;
var p=o.previousSibling||o.parentNode,m=true;
while(!(j.attr(p,"ui-type")=="qqmail_share_map_loading"&&/img/i.test(p.tagName))&&(9!=p.nodeType)||(m=false))
{
p=p.previousSibling||p.parentNode;
}
!m&&j.removeSelf(p);
}
else{
if(o.previousSibling&&/img/i.test(o.previousSibling.tagName))
j.removeSelf(o.previousSibling);
}
if(o.nextSibling)
{
if(!(/^br$/i.test(o.nextSibling.tagName))||o.nextSibling.nodeType==3)
{
j.insertHTML(o,"afterEnd","</br>");
}
o.nextSibling.nextSibling&&i._setCursorPos(o.nextSibling.nextSibling,0);
}
else{
if(o.parentNode.nextSibling&&o.parentNode.nextSibling.nodeType==1)
{
i._setCursorPos(o.parentNode.nextSibling,0);
}
else{
j.insertHTML(o,"afterEnd","<div></br></div>");
o.nextSibling&&i._setCursorPos(o.nextSibling,0);
}
}
}
catch(s)
{
}
}
}
}
i.autoScaleImg(n,h);
typeof f=="function"&&f.call(i,h,n);
typeof i.onafterinsertimage=="function"&&i.onafterinsertimage(_asPicUrl);
});
};
b.prototype.getImgDom=function(f){
var g,h;
if(f.nodeName=="IMG")
{
g=f;
}
else{
h=f.getElementsByTagName&&f.getElementsByTagName("IMG");
g=(h&&h.length)&&h[0];
}
return g;
};
b.prototype.autoScaleImg=function(f,g){
var n=this,m=n.getImgDom(f);
if(m)
{
var r=g.match(/originalwidth=.*&/),p=g.match(/originalheight=.*/),q=r&&r[0],o=p&&p[0],k=q&&parseInt(q.split('=')[1]),j=o&&parseInt(o.split('=')[1]),h=!!k&&!!j,l=parseInt(n._moEditorAreaObj.clientWidth*0.8||960);
if(h)
{
i(l,k,j);
n.resizeNoScrollEditor();
}
else{
addEvent(m,"load",function(){
i(l);
n.resizeNoScrollEditor();
});
}
}
function i(u,t,s)
{
var z=t||parseInt(m.naturalWidth||m.offsetWidth),y=s||parseInt(m.naturalHeight||m.offsetHeight),C=m.getAttribute("modifysize"),A,B,x;
!m.naturalWidth&&(m["naturalW"]=z);
!m.naturalWidth&&(m["naturalH"]=y);
if(C)
{
var A=parseInt(C||100),B=parseInt(z*(A/100)),x=parseInt(y*(A/100));
m.style.width=B+"px";
m.style.height=x+"px";
}
else if(z>u)
{
var x=parseInt(u*(y/z)),B=u,A=B/z,v=A<0.25,w=parseInt((A-(v?0:0.25))*60*(v?1:(100/175)))+(-1);
m.style.width=B+"px";
m.style.height=x+"px";
m.setAttribute("modifysize",(parseInt(A*100)||1)+"%");
m.setAttribute("diffpixels",w+"px");
m.setAttribute("scalingmode",v?"normal":"zoom");
}
}
};
b.prototype.getEditorConfig=function(f){
return f?this._moParamSet[f]:this._moParamSet;
};
b.prototype._initializeForIframe=function(h,g,f){
var i=this,j=i._moTemplate,k=i._mnFixedHeight?"height:"+i._mnFixedHeight:"";
i._moEditorAreaObj.innerHTML=j._FRAME_BASE.replace({border:i._msStyle.indexOf(";border:none")!=-1?"border:none;":"",style:k});
createBlankIframe(i._moEditorAreaWin,{obj:GelTags("textarea",i._moEditorAreaObj)[0].parentNode,where:"afterBegin",className:"QMEditorIfrmEditArea",scrolling:"auto",style:k,attrs:["hideFocus",isNaN(g)?"":" tabIndex="+g].join(""),header:j._FRAME_HEADER,body:j._FRAME_BODY.replace({editable:i._hasDesignMode(document)?"":"contentEditable=true",content:h}),defcss:false,onload:function(){
i._msEditCore="iframe";
i._moEditObj=this;
i._moEditWin=i._moEditObj.contentWindow;
i._moEditDoc=i._moEditWin.document;
i._moEditBody=i._moEditDoc.body;
i._moSrceBody=i._moEditObj.nextSibling;
i._moTextBody=i._moSrceBody.nextSibling;
i._setContentEditable();
i._setAllowCustomTag();
i._fixHeight();
i._mbIsFinish=true;
f.call(i);
},useCache:false});
};
b.prototype._initializeForTxt=function(h,g,f){
var i=this,j=i._moTemplate,k=i._mnFixedHeight?"height:"+i._mnFixedHeight:"";
i._moEditorAreaObj.innerHTML=i._moTemplate._FRAME_BASE.replace({editcontainer:i._moTemplate._FRAME_TXT.replace({style:k,tabIdx:g}),border:i._msStyle.indexOf(";border:none")!=-1?"border:none;":"",style:k});
i._msEditCore="txt";
i._moEditObj=GelTags("td",i._moEditorAreaObj)[1].firstChild;
i._moEditBody=i._moEditObj;
i._setContentEditable();
f.call(i);
};
b.prototype._initializeToolbar=function(){
this._moToolBarObj=GelTags("td",this._moEditorAreaObj)[0];
this.getTbExtern();
this._moRichToolBarObj=this._moToolBarObj.firstChild.firstChild;
this._moSrceToolBarObj=this._moRichToolBarObj.nextSibling;
if((this._moToolBarInfo=this._pasteFuncList(this._moFuncList.toolbar)).length>0)
{
for(var g=this._moToolBarInfo.length-1;g>=0;g--)
{
insertHTML(this._moRichToolBarObj,"afterBegin",this._moTemplate._TOOLBAR_ITEM);
this._moToolBarInfo[g].funcArea=this._moRichToolBarObj.firstChild;
}
}
if((this._moTbExternInfo=(this._moTbExternObj&&this._pasteFuncList(this._moFuncList.tbExtern))||[]).length>0)
{
for(var g=this._moTbExternInfo.length-1;g>=0;g--)
{
insertHTML(this._moTbExternObj,"afterBegin",this._moTemplate._TBEXTERN_ITEM);
this._moTbExternInfo[g].funcArea=this._moTbExternObj.firstChild;
}
}
var f=this;
this._moEditorAreaWin.setTimeout(function(){
f._setupFunction();
},100);
};
b.prototype._setContentEditable=function(){
if(this._hasDesignMode(this._moEditDoc))
{
this._moEditDoc.designMode="on";
this._execCmd("useCSS",false);
this._moEditorAreaWin.focus();
}
this._moEditorAreaObj.setAttribute("QMEditorId",this._msEditorId);
};
b.prototype._setAllowCustomTag=function(){
var f=this._moAllowCustomTag,g=this._moEditDoc;
if(f)
{
E(f,function(h){
g.createElement(h);
});
}
return this;
};
b.prototype._pasteFuncList=function(f){
var g=[];
E((f||"").replace(/\|/ig,"Separate").split(" "),function(h){
if(h)
{
g.push({funcName:h});
}
});
return g;
};
b.prototype._setupFunction=function(){
var g=this,f={};
function h(i,j)
{
E(i,function(k){
if(!k.funcObj)
{
var m=k.funcName;
if(b.FUNCLIB[m])
{
k.funcObj=new b.FUNCLIB[m]({oParamSet:g._moParamSet,editor:g});
k.funcObj._setup({container:k.funcArea,uiType:j});
if(m=="Map")
{
g.setMapFunc(k.funcObj);
removeSelf(k.funcArea);
}
else if(m=="More")
{
var l=(function(n){
return function(){
if(g._mbIsGuideMap)
{
try{
n.funcObj._doShowMenuClick.call(n.funcObj,{srcElement:n.funcArea});
n.funcObj._moMenu.selectItem("map");
}
catch(o)
{
}
}
};
})(k);
g.setMoreFunc(l);
}
}
else{
f[g._moInfile[m]]=true;
}
}
});
}
;h(this._moToolBarInfo,"icon");
h(this._moTbExternInfo,this._msStyle.indexOf(";icon:big")!=-1?"big":"text");
this._loadFile(f);
};
b.prototype._loadFile=function(f){
if(!this._moLoaddingFile)
{
this._moLoaddingFile={};
}
for(var i in f)
{
var h=this._moLoaddingFile[i],g=h?(now()-h>2000):true;
if(g)
{
loadJsFile(getPath("js")+getFullResSuffix(i));
this._moLoaddingFile[i]=now();
}
}
return this;
};
b.prototype.loadFile=function(g,f){
if(!this._moLoaddingFile)
{
this._moLoaddingFile={};
}
for(var j in g)
{
var i=this._moLoaddingFile[j],h=i?(now()-i>2000):true;
if(h)
{
loadJsFile(getRes(j),false,document,f);
this._moLoaddingFile[j]=now();
}
}
return this;
};
b.prototype._getCurMenuFuncObj=function(){
return this._moCurMenuFuncObj;
};
b.prototype.setMapFunc=function(f){
this._moMapFunc=f;
};
b.prototype.getMapFunc=function(){
return this._moMapFunc;
};
b.prototype.setMoreFunc=function(f){
this._moMoreFunc=f;
};
b.prototype.getMoreFunc=function(){
return this._moMoreFunc;
};
b.prototype._setCurMenuFuncObj=function(f){
var g=this._moCurMenuFuncObj;
this._moCurMenuFuncObj=f;
return g;
};
b.prototype._hasDesignMode=function(f){
var g=f&&f.designMode&&f.designMode.toString().toLowerCase()||"";
return (g=="off"||g=="on")&&!gbIsWebKit;
};
b.prototype._getEditContent=function(h,f,g){
switch(h)
{case "html":
var j=this._moEditBody,k=this._moToolBarInfo&&this._moToolBarInfo.SpellCheck;
if(!g&&k&&(k._mnStatus&2))
{
var i=F("spellcheckDocument",getTop()).document,l=j.innerHTML;
if(i.body&&l!=i.body.innerHTML)
{
i.body.innerHTML=l;
k._removeAllSpellCheck(i);
j=i.body;
}
}
return f?(j.innerText||j.textContent||""):j.innerHTML;
case "text":
return this._moTextBody.value;
case "source":
return this._moSrceBody.value;
}return "";
};
b.prototype._getEditContentForTxt=function(g,f){
if(f||g=="text")
{
return this._moEditBody.value;
}
else{
return (gbIsIE||gbIsOpera?textToHtml:textToHtmlForNoIE)(this._moEditBody.value);
}
};
b.prototype._setEditContent=function(g,f){
switch(g)
{case "html":
this._moEditBody.innerHTML=f||b.getBreakLine();
this._fixHtmlContent()._clearLastRange();
var h=this._moToolBarInfo&&this._moToolBarInfo.SpellCheck;
h&&h._setSpellCheckEvent();
break;
case "text":
this._moTextBody.value=f;
break;
case "source":
this._moSrceBody.value=f;
break;
}return this;
};
b.prototype._setEditContentForTxt=function(g,f){
var h=htmlDecode(f.replace(/\n/ig,"").replace(/<div>[ \t]*<br>[ \t]*<\/div>/ig,"\n").replace(/<div .*?>[ \t]*<br .*?>[ \t]*<\/div>/ig,"\n").replace(/(<\/div>)|(<\/p>)|(<br\/?>)/ig,"\n").replace(/<.*?>/ig,"")).replace(/&nbsp;/ig," ").replace(/[\t ]*\n/g,"\n").replace(/\s*$/,"");
this._moEditBody.value=h;
};
b.prototype._syncHtmlContentTo=function(f){
switch(f)
{case "text":
if(!gbIsIE&&!gbIsWebKit)
{
this._setEditContent("html",htmlToText(this._getEditContent("html")));
}
this._setEditContent("text",this._getEditContent("html",true));
break;
case "source":
this._setEditContent("source",this._getEditContent("html"));
break;
}return this;
};
b.prototype._syncTextContentTo=function(f){
if(f=="html"||f=="source")
{
this._setEditContent("html",(gbIsIE||gbIsOpera?textToHtml:textToHtmlForNoIE)(this._getEditContent("text")));
}
if(f=="source")
{
this._syncHtmlContentTo("source");
}
};
b.prototype._setCursorPos=function(g,f){
if(typeof (f)=="number")
{
if(!window.getSelection)
{
var i=(g.createTextRange?g:this._moEditBody).createTextRange();
i.moveToElementText(g);
i.moveStart("character",f);
i.collapse(true);
i.select();
}
else if(g.tagName!="TEXTAREA")
{
var j=this;
function h()
{
j._moEditWin.focus();
var l=j._moEditWin.getSelection();
if(!l)
{
return false;
}
if(l.rangeCount>0)
{
l.removeAllRanges();
}
if(g instanceof window.constructor)
{
return false;
}
var k=j._moEditDoc.createRange();
k.selectNode(g&&g.firstChild||g||j._moEditBody.firstChild||j._moEditBody);
k.collapse(true);
l.addRange(k);
return true;
}
if(!h())
{
this._moEditorAreaWin.setTimeout(h);
}
}
else{
g.selectionStart=f;
g.selectionEnd=f;
}
}
return this;
};
b.prototype._isSelectionInEditArea=function(f){
if(f!="equal")
{
return true;
}
var h=this._moEditDoc.body.createTextRange();
h.moveToElementText(f=="equal"?this._moEditBody:this._moEditorAreaObj);
try{
return h[f=="equal"?"isEqual":"inRange"](this._moEditDoc.selection.createRange());
}
catch(g)
{
return false;
}
};
b.prototype._fixHtmlContent=function(){
if(typeof (this._mfOnPutContent)=="function")
{
try{
this._mfOnPutContent.call(this);
}
catch(f)
{
}
}
if(gbIsIE)
{
E(GelTags("div",this._moEditBody),function(g){
var h=g.firstChild,i=h&&h.nodeType==3&&!h.nextSibling?h.nodeValue:"";
if(i.length==1&&fixNonBreakSpace(i)==" ")
{
g.innerHTML="";
}
});
}
return this;
};
b.prototype._fixHeight=function(){
if(gbIsIE)
{
var j=this,i=j.getEditorArea(),f=i.clientHeight||i.offsetHeight||(+i.style.height),g=j.isShowToolBar()?j._moToolBarObj.clientHeight:0,h=f-g-2;
!isNaN(h)&&h>0&&(j._moEditObj.parentNode.style.height=j._moSrceBody.style.height=j._moTextBody.style.height=h+"px");
!j._mbIsSetFixHeightEvent&&(j._mbIsSetFixHeightEvent=true)&&i.attachEvent("onpropertychange",function(){
j._fixHeight();
});
}
};
b.prototype._setUnloadEvent=function(){
var f=this;
addEvent(f._moEditorAreaWin,"unload",function(){
b.delEditor(f._msEditorId);
});
return f;
};
b.prototype._setMouseEvent=function(){
var g=this,f=g._moEditDoc;
function h()
{
g.hideMenu(null,true);
}
if(g._msEditCore=="iframe")
{
addEvent(f,"mousedown",function(){
g._clearLastRange();
});
addEvent(f,"mousedown",h);
}
if(typeof (g._mfOnMouseDown)=="function")
{
addEvent("txt"===g._msEditCore?g._moEditBody:f,"mousedown",function(i){
g._mfOnMouseDown.call(g,i);
});
}
if(typeof (g._mfOnMouseOver)=="function")
{
addEvent("txt"===g._msEditCore?g._moEditBody:f,"mouseover",function(i){
g._mfOnMouseOver.call(g,i);
});
}
if(typeof (g._mfOnMouseOut)=="function")
{
addEvent("txt"===g._msEditCore?g._moEditBody:f,"mouseout",function(i){
g._mfOnMouseOut.call(g,i);
});
}
if(typeof (this._mfOnClick)=="function")
{
addEvent("txt"===g._msEditCore?g._moEditBody:f,"click",function(i){
g._mfOnClick.call(g,i);
});
}
return g;
};
b.prototype._setClickEvent=function(){
var g=this,f=g._moEditDoc;
function h()
{
g.hideMenu();
}
if(g._msEditCore=="iframe")
{
addEvent(f,"mousedown",function(){
g._clearLastRange();
});
addEvent(f,"mousedown",h);
}
if(typeof (g._mfOnMouseDown)=="function")
{
addEvent("txt"===g._msEditCore?g._moEditBody:f,"mousedown",function(i){
g._mfOnMouseDown.call(g,i);
});
}
if(typeof (this._mfOnClick)=="function")
{
addEvent("txt"===g._msEditCore?g._moEditBody:f,"click",function(i){
g._mfOnClick.call(g,i);
});
}
return g;
};
b.prototype._moveToAncestorNode=function(f){
var g=this._getSelectionElement();
while(g&&g.nodeName!=f)
{
g=g.parentNode;
}
return g;
};
b.prototype._getSelectionElement=function(){
var g,h,j=this._moEditDoc.selection;
if(this._mbIsFocus!==true)
{
return g;
}
if(j)
{
h=j.createRange();
if(j.type=="Control")
{
if(h.length==1&&h(0).nodeType==1)
{
g=h(0);
}
else{
for(var l=0,f=h.length;l<f;l++)
{
if(h(l).parentNode)
{
g=h(l).parentNode;
break;
}
}
}
}
else{
g=h.parentElement();
}
}
else{
try{
h=this._moEditWin.getSelection().getRangeAt(0);
if(!(h.startContainer!=h.endContainer||h.startContainer.nodeType!=1||h.startOffset!=h.endOffset-1))
{
g=h.startContainer.childNodes[h.startOffset];
if(g.nodeType!=1)
{
g=null;
}
}
if(!g)
{
g=h.endContainer;
}
}
catch(k)
{
}
}
return g;
};
b.prototype.getSelectionElement=function(){
var h,j,k=this._moEditDoc.selection;
if(this._mbIsFocus!==true)
{
return h;
}
if(k)
{
j=k.createRange();
if(k.type=="Control")
{
if(j.length==1&&j.item(0).nodeType==1)
{
h=j.item(0);
}
else{
for(var n=0,f=j.length;n<f;n++)
{
if(j(n).parentNode)
{
h=j(n).parentNode;
break;
}
}
}
}
else{
h=j.parentElement();
}
}
else{
try{
j=this._moEditWin.getSelection().getRangeAt(0);
if(!(j.startContainer!=j.endContainer||j.startContainer.nodeType!=1||j.startOffset!=j.endOffset-1))
{
h=j.startContainer.childNodes[j.startOffset];
if(h.nodeType!=1)
{
h=null;
}
}
if(!h)
{
var l=j.startContainer,g=j.endContainer;
if(gbIsFF&&l.nodeType==3&&g.tagName=="BODY")
{
h=l;
}
else{
h=j.endContainer;
}
}
}
catch(m)
{
}
}
return h;
};
b.prototype._setKeyDownEvent=function(){
var f=this;
if(typeof (f._mfOnKeyDown)=="function")
{
addEvent("txt"===f._msEditCore?f._moEditBody:f._moEditDoc,"keydown",function(g){
f._mfOnKeyDown.call(f,g);
});
}
if(typeof (f._mfOnKeyUp)=="function")
{
addEvent("txt"===f._msEditCore?f._moEditBody:f._moEditDoc,"keyup",function(g){
f._mfOnKeyUp.call(f,g);
});
}
if(typeof (f._mfOnPaste)=="function")
{
addEvent("txt"===f._msEditCore?f._moEditBody:f._moEditDoc.body,"paste",function(g){
f._mfOnPaste.call(f,g);
});
}
return f;
};
b.prototype._setFocusEvent=function(){
var g=this;
addEvents("txt"===g._msEditCore?g._moEditBody:g._moEditWin,{focus:function(h){
if(!g._mbIsFocus)
{
g._mbIsFocus=true;
g._loadLastRange();
typeof (g._mfOnFocus)=="function"&&g._mfOnFocus.call(g,h);
}
},blur:function(h){
if(g._mbIsFocus)
{
g._mbIsFocus=false;
typeof (g._mfOnBlur)=="function"&&g._mfOnBlur.call(g,h);
}
}});
var f=0;
addEvents(g._moEditBody,{dragenter:function(h){
if(!g._mbIsFocus)
{
g._mbIsFocus=true;
typeof (g._mfOnFocus)=="function"&&g._mfOnFocus.call(g,h);
}
f&&(g._moEditorAreaWin.clearTimeout(f)||(f=0));
},dragleave:function(h){
if(g._mbIsFocus)
{
f&&g._moEditorAreaWin.clearTimeout(f);
f=g._moEditorAreaWin.setTimeout(function(){
if(g._mbIsFocus)
{
g._mbIsFocus=false;
typeof (g._mfOnBlur)=="function"&&g._mfOnBlur.call(g,h);
}
},500);
}
}});
return g;
};
b.prototype._setFixFocusEvent=function(){
var f=this;
if(!gbIsIE)
{
addEvent(f._moEditWin,"focus",function(g){
try{
var i=f._moEditWin.getSelection();
if(i.focusNode&&i.focusNode.tagName=="HTML")
{
i.collapse(f._moEditBody.firstChild||f._moEditBody,0);
}
}
catch(h)
{
b.getTopWin().doPageError(["editor focus error: ",h.message].join(""));
}
});
}
else{
addEvent(f._moEditWin,"blur",function(g){
try{
f._moEditBody.ownerDocument.selection.empty();
}
catch(h)
{
}
});
}
};
b.prototype._setFixIEBreakLineEvent=function(){
var h=this;
if(gbIsIE)
{
function g(i)
{
var j=i.keyCode;
if(!i.altKey&&!i.ctrlKey&&(j>=48&&j<=57||j>=65&&j<=90||j>=96&&j<=111||j>=186&&j<=192||j>=219&&j<=222||j==8||j==32||j==13||j==46||j==229))
{
f(j==8?i:null);
}
}
function f(k,j,i)
{
if(!h._isSelectionInEditArea("equal"))
{
return;
}
function l()
{
h._moEditBody.innerHTML="<div>&nbsp;</div>";
h._fixHtmlContent().focus(0);
if(!i&&k)
{
preventDefault(k);
}
}
if(typeof (j)=="number")
{
h._moEditorAreaWin.setTimeout(l,j);
}
else{
l();
}
}
addEvent(h._moEditBody,"keydown",g);
addEvent(h._moEditBody,"cut",function(){
f(null,0,true);
});
}
return h;
};
b.prototype._setFixIEBackSpaceEvent=function(){
var f=this;
if(gbIsIE)
{
addEvent(this._moEditBody,"keydown",function(g){
if(f._isSelectionInEditArea()&&g.keyCode==8&&f._moEditDoc.selection.type=="Control")
{
f._moEditDoc.selection.clear();
preventDefault(g);
return;
}
});
}
return f;
};
b.prototype._setEditorSelectionChangeEvent=function(){
var g=this;
if(g._mbIsSetSelectionChangeEvent)
{
throw new Error("*** can not set once again!!");
}
g._mbIsSetSelectionChangeEvent=true;
var f=g._moEditDoc;
addEvent(f,"mouseup",function(h){
g._doOnSelectionChange(h,true);
});
addEvent(f,"keyup",function(h){
g._doOnSelectionChange(h,true);
});
addEvent(f,"keydown",function(h){
var i=h.keyCode;
if(h.ctrlKey&&i>=65&&i<=90)
g._doOnEvent("keydown",h);
});
addEvent(f,"contextmenu",function(h){
g._doOnEvent("contextmenu",h);
});
addEvent(g._moEditBody,"paste",function(h){
g._doOnEvent("paste",h);
});
return g;
};
b.prototype._getRange=function(){
if(this._msEditMode!="html")
{
return null;
}
if(window.getSelection)
{
var g=this._moEditWin.getSelection(),f=null;
try{
f=g?g.getRangeAt(0):null;
}
catch(h)
{
f=null;
}
return f;
}
else{
return this._moEditDoc.selection.createRange();
}
};
b.prototype._setRange=function(f){
if(!f)
{
return false;
}
this.focus();
if(window.getSelection)
{
var g=this._moEditWin.getSelection();
g.removeAllRanges();
g.addRange(f);
}
else{
f.select();
}
return true;
};
b.prototype._saveLastRange=function(){
this._moEditorLastRange=this._getRange();
};
b.prototype._loadLastRange=function(){
this._setRange(this._moEditorLastRange);
};
b.prototype._clearLastRange=function(){
this._moEditorLastRange=null;
};
b.prototype._doOnEvent=function(g,f){
var k=this,j=k[["on",g,"List"].join("")],h=j&&j.length||0;
if(h>0&&k._isSelectionInEditArea())
{
for(var l=0;l<h;l++)
{
if(j[l](f)===true)
{
break;
}
}
}
return k;
};
b.prototype._doOnSelectionChange=function(g,f){
var i=this,h=i.onselectionchangeList||[];
if(i._mnOnSelectionChangeTimer)
{
i._moEditorAreaWin.clearTimeout(i._mnOnSelectionChangeTimer);
}
if(i._isSelectionInEditArea())
{
function j()
{
i._saveLastRange();
for(var l=0,k=h.length;l<k;l++)
{
if(h[l](g)===true)
{
break;
}
}
if(typeof (i._mfOnUserSelectChange)=="function")
{
i._mfOnUserSelectChange.call(i);
}
}
;if(f)
{
j();
}
else{
i._mnOnSelectionChangeTimer=this._moEditorAreaWin.setTimeout(function(){
i._mnOnSelectionChangeTimer=null;
j();
},100);
}
}
return i;
};
b.prototype._doCmd=function(g,f,h){
if(this._msEditMode!="html")
{
return false;
}
if(g=="execCommand")
{
this.focus();
}
try{
return this._moEditDoc[g](f,false,h||false);
}
catch(i)
{
return false;
}
};
b.prototype.execCmd=b.prototype._execCmd=function(g,h,f){
var i=this._doCmd("execCommand",g,h);
if(i)
{
if(typeof (f)=="function")
{
f.call(this);
}
this._doOnSelectionChange({},true);
}
return i;
};
b.prototype._queryCmdState=function(f){
return this._doCmd("queryCommandState",f);
};
b.prototype._queryCmdEnabled=function(f){
return this._doCmd("queryCommandEnabled",f);
};
b.prototype._queryCmdValue=function(f){
return this._doCmd("queryCommandValue",f);
};
b.prototype.queryFormatBlockState=function(){
function g(h)
{
var i=h;
while(i&&i.parentNode)
{
if(i.tagName&&i.tagName=="BLOCKQUOTE"&&attr(i,"formatblock"))
{
return true;
}
else{
i.parentNode&&(i=i.parentNode);
}
}
return false;
}
function f(h)
{
function i()
{
var m=h.cloneContents(),l=m.ownerDocument.createElement("div"),n="";
l.appendChild(m);
n=l.innerHTML;
m=l=c;
return n;
}
;try{
var j=gbIsIE?(h.htmlText||""):i();
return /<blockquote[^>]+formatblock[^>]+>.*?<\/blockquote>/gi.test(j);
}
catch(k)
{
return false;
}
}
return g(this._getSelectionElement())||f(this._getRange());
};
b.prototype.getTemplate=function(){
return this._moTemplate;
};
b.prototype.getLanguage=function(){
return this._moLanguage;
};
b.prototype.getEditBody=function(){
return this._moEditBody;
};
b.prototype.getEditDoc=function(){
return this._moEditDoc;
};
b.prototype.getEditObj=function(){
return this._moEditObj;
};
b.prototype.resizeNoScrollEditor=function(f,g){
var o=this,h=gbIsIE,i=h&&gnIEVer===6,n=o._moEditBody,k=o._mDefHeight||o._mnAutoRisizeMinHeight||(o._mDefHeight=n.clientHeight),l=n.scrollHeight;
if(o._mbNoEditScroll&&k!=0)
{
if(l>k)
{
var m=o._moEditorAreaObj;
if(h&&f)
{
GelTags("td",o._moEditorAreaObj)[1].style.height=(l+"px");
m.style.height=(l)+"px";
}
else{
var j=o._calEditBodyRealHeight();
j<k&&(j=k);
if(o._mnFixedHeight||i)
{
o._moEditObj.style.height=(j-5-o._moToolBarObj.offsetHeight)+"px";
getTop.scrollTop=j;
}
!i&&(m.style.height=j+"px");
}
}
}
};
b.createEditor=function(f){
return new this(f);
};
b.getEditorSet=function(){
return this.getTopWin().gQmEditorSet||{};
};
b.getEditor=function(f){
var g=this.getTopWin(),h=g.gQmEditorSet&&g.gQmEditorSet[f];
if(h)
{
if(h.test())
{
return h;
}
else{
this.delEditor(f);
}
}
return null;
};
b.getTopWin=function(){
try{
var f=getTop().document;
return getTop();
}
catch(g)
{
return window;
}
};
b.setEditor=function(f){
if(!this.getEditor)
{
return false;
}
var h=f.getEditorId(),g=this.getTopWin();
this.delEditor(h);
if(!g.gQmEditorSet)
{
g.gQmEditorSet={};
}
g.gQmEditorSet[h]=f;
return true;
};
b.delEditor=function(f){
var g=this.getTopWin();
if(g.gQmEditorSet&&g.gQmEditorSet[f])
{
delete g.gQmEditorSet[f];
}
};
b.hideEditorMenu=function(){
var f=this.getEditorSet();
for(var g in f)
{
try{
f[g].hideMenu();
}
catch(h)
{
this.delEditor(g);
}
}
};
b.getBreakLine=function(f){
var g="<BR>";
if(gbIsIE)
{
g="<DIV>&nbsp;</DIV>";
}
else if(gbIsOpera||gbIsWebKit)
{
g="<DIV><BR></DIV>";
}
return (new Array((f||1)+1)).join(g);
};
b.setupFunc=function(){
E(this.getEditorSet(),function(f){
f._setupFunction();
});
};
b.CONST={};
b.CONST._name="QMEditor_45t62ASG^TfgSDA@#!Raaf";
b.CONST.LANGUAGE={};
b.CONST.LANGUAGE.zh_CN={CHG_CONTENTTYPE:"\u8F6C\u6362\u5185\u5BB9\u4E3A\u7EAF\u6587\u672C\u683C\u5F0F\u6709\u53EF\u80FD\u4E22\u5931\u67D0\u4E9B\u683C\u5F0F\uFF0C\u786E\u5B9A\u4F7F\u7528\u7EAF\u6587\u672C\u5417\uFF1F"};
b.CONST._FILES={"qqmaileditor/editor_toolbar.js":"Separate Bold Italic Underline FontName FontName FontSize ForeColor BackColor AlignMode Serial Indent Quot CreateLink SourceEdit Preview SpellCheck UploadEml FullScreen FormatMatch","qqmaileditor/editor_toolbar_plus.js":"Photo Mo ScreenSnap Word Music More Map"};
b.CONST.FUNCLIST={};
b.CONST.FUNCLIST.BASE={toolbar:"Bold Italic Underline | FontName FontSize ForeColor BackColor | AlignMode Serial Indent | CreateLink Mo Photo ScreenSnap SourceEdit",tbExtern:"Photo Word Mo ScreenSnap More Map"};
b.CONST.FUNCLIST.SETTING={toolbar:"Bold Italic Underline | FontName FontSize ForeColor BackColor | AlignMode Serial Indent | CreateLink Mo PhotoOld ScreenSnap SourceEdit",tbExtern:"PhotoOld Word Mo ScreenSnap More Map"};
b.CONST.FUNCLIST.COMPOSE={toolbar:"Bold Italic Underline | FontName FontSize ForeColor BackColor | AlignMode Serial Indent Quot | CreateLink FormatMatch SourceEdit Preview SpellCheck FullScreen",tbExtern:"Photo Word Mo ScreenSnap More Map"};
b.CONST.FUNCLIST.BIZMAIL_COMPOSE={toolbar:"Bold Italic Underline | FontName FontSize ForeColor BackColor | AlignMode Serial Indent Quot | CreateLink FormatMatch SourceEdit Preview SpellCheck FullScreen",tbExtern:"Photo Mo ScreenSnap More Map"};
b.CONST.FUNCLIST.QF_COMPOSE={toolbar:"Bold Italic Underline | FontName FontSize ForeColor BackColor | AlignMode Serial Indent Quot | CreateLink FormatMatch SourceEdit Preview UploadEml",tbExtern:""};
b.CONST.FUNCLIST.GROUP={toolbar:"Bold Italic Underline | FontName FontSize ForeColor BackColor | AlignMode Serial Indent Quot | CreateLink FormatMatch SourceEdit",tbExtern:"Photo Word Mo ScreenSnap More Map"};
b.CONST.FUNCLIST.NOTE={toolbar:"Bold Italic Underline | FontName FontSize ForeColor BackColor | AlignMode Serial Indent Quot | CreateLink SourceEdit",tbExtern:"Photo Mo ScreenSnap"};
b.CONST.FUNCLIST.READMAIL={toolbar:"Bold Italic Underline | FontName FontSize ForeColor BackColor | AlignMode Serial Indent Quot | CreateLink SourceEdit",tbExtern:"Photo Mo ScreenSnap"};
b.CONST.FUNCLIST.MO={toolbar:"Bold Italic Underline | FontName FontSize ForeColor BackColor | AlignMode Serial Indent | CreateLink Mo SourceEdit"};
b.CONST._TEMPLATE={_FRAME_BASE:T(['<table cellspacing=0 cellpadding=0 class="QMEditorBase" style="$border$" >','<tr style="display:none;"><td height="1%" class="QMEditorToolBar" valign="top" unselectable="on" onmousedown="return false;" >','<div class="QMEditorToolBarDiv">','<div></div><div style="display:none;"></div><div class="QMEditorBtnIcon" style="width:1px;" ></div>','</div>','</td></tr>','<tr><td height="99%" valign="top" unselectable="on" class="QMEditorContent">','$editcontainer$','<textarea class="QMEditorText" style="display:none;font-size:12px;$style$"></textarea>','<textarea class="QMEditorText" style="display:none;font-size:12px;$style$"></textarea>','</td></tr>','</table><div class="QMEditorBaseBd"></div>']),_FRAME_DIV:T(['<div class="QMEditorDivEditArea">$content$</div>']),_FRAME_TXT:T(['<textarea class="QMEditorText" tabindex="$tabIdx$" style="font-size:12px;$style$"></textarea>']),_FRAME_HEADER:T(['<script>','window.onerror = function() { return true; };','</script>','<style>','body {margin:0;overflow:auto;font:normal 14px Verdana;background:#fff;padding:2px 4px 0;cursor:text;}','body, p, font, div, li { line-height: 1.5;}','body, td, th {color:#000000;}','.i {width:100%;*width:auto;table-layout:fixed;}','pre {white-space: pre-wrap;white-space: -moz-pre-wrap;white-space: -pre-wrap;white-space: -o-pre-wrap;word-wrap: break-word;}','a img {border:none;}','a { color: -moz-hyperlinktext !important;text-decoration: -moz-anchor-decoration;}','</style>']),_FRAME_BODY:T(['<body $editable$ >$content$</body>']),_TOOLBAR_ITEM:T(['<div class="QMEditorToolBarItem" unselectable="on" onmousedown="return false;" style="float:$floatPositon$"></div>']),_TBEXTERN_ITEM:T(['<span class="QMEditorTBExternItem"></span>']),BOTTON_ICON:T(['<div class="QMEditorBtnIcon" style="width:$width$px;margin:$margin$;$style$;overflow:hidden;" ',' unselectable="on" onmousedown="return false;" title="$title$" >','<div style="$imgstyle$">','<img src="$path$$src$" style="margin-left:$bgleft$px;margin-top:$topNum$px;" unselectable="on" onmousedown="return false;" />','</div>','</div>']),BOTTON_TEXT:TE(['<span style="font-size:12px;cursor:pointer;margin:$margin$;" title="$title$" unselectable="on" onmousedown="return false;" >','<input unselectable="on" style="background:url($path$$src$) $bgleft$px $bgup$px no-repeat;" class="qmEditorToolBarPlusIcon"  />','<a style="margin:$lbMargin$;" href="javascript:;" unselectable="on">$label$</a>','$@$if($imgUpload$==1)$@$','<div id="composeImgUploadDiv" style="width: 44px;height: 15px;position: absolute;top: 0;left: 0;" unselectable="on" onmousedown="return false;">','<div style="width:44px;height:15px;">','</div>','</div>','$@$endif$@$','</span>','$@$if($moreBtn$==1)$@$','<span class="ico_moreupload" opt="more"></span>','$@$endif$@$']),BOTTON_BIG:T(['<a unselectable="on">','<img src="$src$" align="absmiddle">$label$','</a>']),_MENU_BORDER:T(['<div class="QMEditorMenuBorder" style="display:none;$style$" unselectable="on" onmousedown="return false;" >$innerHTML$</div>']),_MENU_ITEM:T(['<div class="QMEditorMenuItem" param="$param$" style="$style$;" title="$title$" unselectable="on" $event$ >','$content$','</div>']),_MENU_ITEM_EVENT:T(['onmouseover="','if ( this.className != \'QMEditorMenuItemDisabled\' && this.className != \'QMEditorMenuItemOver\' )','{','this.className = \'QMEditorMenuItemOver\';','}','" onmouseout="','var _sClassName = this.getAttribute( \'curclass\' ) || \'QMEditorMenuItem\';','if ( this.className != _sClassName )','{','this.className = _sClassName','}','" '])};
window.QMEditor=b;
})(QMEditorAdapter);
(function(a,b){
QMEditor.FUNCLIB={};
QMEditor.CONST.getTemplate=function(){
return QMEditor.CONST._TEMPLATE;
};
QMEditor.FUNCLIB._inheritFrom=function(d,c){
d.prototype=new c();
return d;
};
QMEditor.FUNCLIB._BASE=function(c){
this._msId="_BASE";
this._msType="label";
this._mbIsSelected=false;
this._msContainerClassName="";
this._moUiConfig={};
this._moParamSet={};
};
QMEditor.FUNCLIB._BASE.prototype._setup=function(c){
if(this._isSetuped())
{
return false;
}
this._moContainer=c.container;
this._msUiType=c.uiType;
if(!this._moBindEditor||!this._moContainer)
{
return false;
}
this._moContainer.innerHTML=this._getUI();
if(this._msContainerClassName)
{
this._moContainer.className=this._msContainerClassName;
}
if(!this._msCmd)
{
this._msCmd=this._msId;
}
if(typeof (this._msType)!="string")
{
this._msType="label";
}
if(this._msType!="label")
{
if(typeof (this._mfOnClick)!="function")
{
var e=this,d={btn:e._doDefaultClick,checkbox:e._doDefaultClick,menu:e._doShowMenuClick}[e._msType];
if(this._msCmd=="Word")
{
d.call(this);
}
e._mfOnClick=function(f){
if(e._moBindEditor._changeEditMode)
{
e._moBindEditor._changeEditMode("html");
}
d.call(this,f);
};
}
if(this._msType=="menu"&&typeof (this._mfOnMenuClick)!="function")
{
this._mfOnMenuClick=this._doDefaultMenuClick;
}
if(this._msType=="btn")
{
this._mfOnSelectionChange=this._doDefaultSelectionChange;
}
this._setEditorEvent("keydown");
this._setEditorEvent("selectionchange");
this._setEditorEvent("contextmenu");
this._setEditorEvent("paste");
this._setMouseOverEvent();
this._setClickEvent();
if(this._msId=="FormatMatch"||this._msId=="FullScreen"||this._msId=="Photo")
{
this.init_();
}
}
this._mbIsSetupOK=true;
return true;
};
QMEditor.FUNCLIB._BASE.prototype.getUiType=function(){
return this._msUiType;
};
QMEditor.FUNCLIB._BASE.prototype._isSetuped=function(){
return this._mbIsSetupOK;
};
QMEditor.FUNCLIB._BASE.prototype._setfDoDefaultClick=function(c){
this._doDefaultClick=c;
};
QMEditor.FUNCLIB._BASE.prototype._getUI=function(){
if(typeof (this._msUiType)!="string")
{
this._msUiType="icon";
}
var c=this._moUiConfig[this._msUiType];
if(!c)
{
return "";
}
var d=this._moBindEditor._moTemplate[["BOTTON_",this._msUiType.toUpperCase(),(this._msType=="custom"?"_"+this._msId.toUpperCase():"")].join("")];
if(!d)
{
return "";
}
if(!c.path)
{
c.path=this._moBindEditor._msResPath;
}
if(!c.src)
{
c.src="newicon/editor_new.gif";
}
if(!gbIsIE&&this._msUiType=="icon")
{
c.width=c.width-2;
}
return d.replace(c);
};
QMEditor.FUNCLIB._BASE.prototype._updateUI=function(){
if(this._updateUIInfo)
{
this._updateUIInfo();
this._moContainer.innerHTML=this._getUI();
}
};
QMEditor.FUNCLIB._BASE.prototype._getStatus=function(){
return this._mbIsSelected;
};
QMEditor.FUNCLIB._BASE.prototype._changeStatus=function(c){
this._mbIsSelected=c;
if(this._msUiType=="icon")
{
var d=this._moContainer.firstChild;
setClass(d,d.className.replace(" qmEditorBtnIconCheck","")+(c?" qmEditorBtnIconCheck":""));
}
};
QMEditor.FUNCLIB._BASE.prototype._setEditorEvent=function(c){
var d={"keydown":this._mfOnKeyDown,"selectionchange":this._mfOnSelectionChange,"contextmenu":this._mfOnContextMenu,"paste":this._mfOnPaste}[c];
var e=this;
if(typeof (d)=="function")
{
e._moBindEditor.addEvent(c,function(f){
d.call(e,f);
});
}
return e;
};
QMEditor.FUNCLIB._BASE.prototype._setMouseOverEvent=function(){
var d=this;
if(d._msUiType=="icon")
{
var c=d._moContainer;
addEvent(c,'mouseover',function(){
setClass(c.firstChild,c.firstChild.className.replace(" qmEditorBtnIconOver","")+" qmEditorBtnIconOver");
});
addEvent(c,'mouseout',function(){
setClass(c.firstChild,c.firstChild.className.replace(" qmEditorBtnIconOver",""));
});
}
return d;
};
QMEditor.FUNCLIB._BASE.prototype._setClickEvent=function(){
var c=this;
if(typeof (c._mfOnClick)!="function")
{
return false;
}
c._moContainer.onclick=function(d){
d=d||c._moBindEditor._moEditorAreaWin.event;
c._mfOnClick.call(c,d);
preventDefault(d);
stopPropagation(d);
try{
var f=getTop().addrHint;
if(f&&typeof f.closeHint=='function')
{
f.closeHint();
}
}
catch(g)
{
}
};
return true;
};
QMEditor.FUNCLIB._BASE.prototype._createMenu=function(){
if(this._moBindMenu)
{
return false;
}
var c=this._moBindEditor._moEditorAreaWin.document.body;
insertHTML(c,"afterBegin",this._moBindEditor._moTemplate._MENU_BORDER.replace({innerHTML:this._getMenuUI()}));
this._moBindMenu=c.firstChild;
this._initMenuElements();
this._setMenuClickEvent();
return true;
};
QMEditor.FUNCLIB._BASE.prototype._getMenuUI=function(){
var f=this._moBindEditor,e=f._moTemplate[this._msTmplName||("MENU_"+this._msId.toUpperCase())]||f._moTemplate._MENU_ITEM,g=[];
for(var j=0,c=(this._moMenuData||[]).length;j<c;j++)
{
var d=this._moMenuData[j],h=d._moTemplate||e;
d.event=d.event||f._moTemplate._MENU_ITEM_EVENT;
d.path=d.path||f._msResPath;
d.src=d.src||"newicon/editor.gif";
g.push(h.replace(d));
if(d.param||d.cmd)
{
this._moParamSet[(d.param||d.cmd).toUpperCase()]=d;
}
}
return g.join("");
};
QMEditor.FUNCLIB._BASE.prototype._initMenuElements=function(){
};
QMEditor.FUNCLIB._BASE.prototype._setMenuClickEvent=function(){
var c=this;
if(typeof (c._mfOnMenuClick)!="function")
{
return false;
}
c._moBindMenu.onclick=function(d){
d=d||c._moBindEditor._moEditorAreaWin.event;
if(!c._mfOnMenuClick.call(c,d))
{
preventDefault(d);
}
stopPropagation(d);
};
return true;
};
QMEditor.FUNCLIB._BASE.prototype._adjustMenuPos=function(){
var k=calcPos(this._moContainer),h=k[2],e=k[3];
if(this._msUiType=="text")
{
h+=1;
}
var j=this._moBindMenu,i=j.ownerDocument.body,g=j.offsetWidth,f=j.offsetHeight,d=i.clientWidth+i.scrollLeft,c=i.clientHeight+i.scrollTop;
if(h+f>c)
{
h=c-f;
}
if(e+g>d)
{
e=d-g;
}
j.style.top=(h<0?0:h)+"px";
j.style.left=(e<0?0:e)+"px";
};
QMEditor.FUNCLIB._BASE.prototype._showMenu=function(c){
if(!this._moBindMenu)
{
return false;
}
var d=this._moBindEditor._getCurMenuFuncObj();
if(d==this)
{
return true;
}
if(d)
{
d._hideMenu(c);
}
this._moBindEditor._setCurMenuFuncObj(this);
if(this._mbIsSaveRange)
{
this._moBindEditor.saveRange();
}
this._changeStatus(true);
show(this._moBindMenu,true);
this._adjustMenuPos();
if(typeof (this._mfOnShowMenu)=="function")
{
this._mfOnShowMenu();
}
return true;
};
QMEditor.FUNCLIB._BASE.prototype._hideMenu=function(c){
if(!this._moBindMenu)
{
return false;
}
if(this._moBindEditor._getCurMenuFuncObj()==this)
{
this._moBindEditor._setCurMenuFuncObj(null);
}
if(isShow(this._moBindMenu))
{
show(this._moBindMenu,false);
}
if(this._mbIsSaveRange&&c)
{
this._moBindEditor.loadRange();
}
this._changeStatus(false);
this._afterHideMenu();
return true;
};
QMEditor.FUNCLIB._BASE.prototype._afterHideMenu=function(){
};
QMEditor.FUNCLIB._BASE.prototype._doDefaultClick=function(c){
this._moBindEditor._execCmd(this._msCmd);
this._moBindEditor.hideMenu();
};
QMEditor.FUNCLIB._BASE.prototype._doDefaultSelectionChange=function(c){
var d=this._moBindEditor;
if(d._queryCmdEnabled(this._msCmd))
{
this._changeStatus(d._queryCmdState(this._msCmd));
}
};
QMEditor.FUNCLIB._BASE.prototype._doShowMenuClick=function(c){
if(!this._moBindMenu)
{
this._createMenu();
}
if(this._msCmd=="Word")
{
return;
}
if(this._getStatus())
{
this._hideMenu(true);
}
else{
this._showMenu(true);
}
};
QMEditor.FUNCLIB._BASE.prototype._doDefaultMenuClick=function(c){
var d=c.target||c.srcElement,e=d&&d.getAttribute("cmd"),f=d&&d.getAttribute("param");
if(f||e)
{
this._moBindEditor._execCmd(e||this._msCmd,f);
this._hideMenu();
}
};
QMEditor.FUNCLIB._BASE.prototype.setCmd=function(c){
this._msCmd=c;
};
QMEditor.FUNCLIB._BASE.prototype.getCmd=function(){
return this._msCmd;
};
QMEditor.FUNCLIB._BASE.prototype.setBindEditor=function(c){
this._moBindEditor=c;
};
QMEditor.FUNCLIB._BASE.prototype.getBindEditor=function(){
return this._moBindEditor;
};
QMEditor.FUNCLIB._BASE.prototype.getContainer=function(){
return this._moContainer;
};
QMEditor.FUNCLIB._BASE.prototype.setId=function(c){
this._msId=c;
};
QMEditor.FUNCLIB._BASE.prototype.getId=function(){
return this._msId;
};
QMEditor.FUNCLIB._BASE.prototype.setType=function(c){
this._msType=c;
};
QMEditor.FUNCLIB._BASE.prototype.getType=function(){
return this._msType;
};
QMEditor.FUNCLIB._BASE.prototype.setUiConfig=function(c){
this._moUiConfig=c;
};
QMEditor.FUNCLIB._BASE.prototype.getUiConfig=function(){
return this._moUiConfig;
};
QMEditor.FUNCLIB._BASE.prototype.setfOnClick=function(c){
this._mfOnClick=c;
};
QMEditor.FUNCLIB._BASE.prototype.setfDoDefaultClick=function(c){
this._doDefaultClick=c;
};
QMEditor.FUNCLIB._BASE.prototype.setContainerClassName=function(c){
this._msContainerClassName=c;
};
QMEditor.FUNCLIB._BASE.prototype.setFuncConfig=function(c){
this._moFuncConfig=c;
};
QMEditor.FUNCLIB._BASE.prototype.getFuncConfig=function(c){
return this._moFuncConfig;
};
})(QMEditorAdapter);
(function(a,b){
QMEditor.EditMenu=function(c){
this.init(c);
};
QMEditor.EditMenu._TEMPLATE={_EDIT_MENU_CONTAINER:'<div unselectable="on" onclick="getTop().stopPropagation(event);" id="QMEditorMenuBar" class="menubarbg editormenubar" style="display:none;z-index:120;"></div>',_IMG_MENU_CONTENT:TE(['<a func="zoom1_1" class="menubarbg imgzoomoriginal" title="\u539F\u59CB\u5927\u5C0F" unselectable="on"></a>','<a func="zoomout" class="menubarbg imgzoomout" title="\u7F29\u5C0F" href="javascript:;" unselectable="on" onclick="getTop().preventDefault(event);"></a>','<span class="menubarbg imgzoombar" unselectable="on"><a id="zoomhandle" func="drag" class="menubarbg zoomhandle" title="$size$" unselectable="on" style="left:$pixels$"></a></span>','<a func="zoomin" class="menubarbg imgzoomin" title="\u653E\u5927" href="javascript:;" unselectable="on" onclick="getTop().preventDefault(event);"></a>','<span class="menubarbg menubarspl" unselectable="on"></span>','<a func="del" unselectable="on" class="menubarbg menubarremove" title="\u5220\u9664\u56FE\u7247" href="javascript:;" onclick="getTop().preventDefault(event);"></a>']),_IMG_MENU_BAR_IMG:TE(['<span id="QMEditorIMGMenu">$imgcontent$</span>']),_IMG_MENU_BAR_LINK:TE(['<span class="menubarbg menubariconlink" unselectable="on"></span>','<span id="QMEditMenuCommon" class="linkcommon" unselectable="on">','<a class="menubarlink" id="QMEditMenuLink" href="$link$" unselectable="on" target="blank">$link$</a>','<span class="menubarbg menubarspl" unselectable="on"></span>','<a href="javascript:;" func="modify" class="menubarbg linkmodify" title="\u4FEE\u6539\u94FE\u63A5" unselectable="on"></a>','<span class="menubarbg menubarspl" unselectable="on"></span>','<a func="unlink" unselectable="on" class="menubarbg menubarremove" title="\u6E05\u9664\u94FE\u63A5" unselectable="on"></a>','</span>','<span id="QMEditMenuModify" class="linkedit" style="display:none;" unselectable="on">','<input type="text" id="QMEditMenuInput" class="menubarinput"/>','<span class="menubarbg menubarspl" unselectable="on"></span>','<a func="save" class="menubarbg menubarfinish" title="\u786E\u5B9A" unselectable="on"></a>','</span>']),_IMG_MENU_BAR_IMG_MAP:TE(['<span id="QMEditorIMGMenu">','<a href="javascript:;" func="editmap" class="menubarbg linkmodify" title="\u7F16\u8F91" unselectable="on" src="$img_map$"></a>','<span class="menubarbg menubarspl" unselectable="on"></span>','<a href="javascript:;" func="jumptomap" class="menubarbg menubarpreview" title="\u9884\u89C8" unselectable="on" src="$img_map$"></a>','<span class="menubarbg menubarspl" unselectable="on"></span>','<a href="javascript:;" func="del" class="menubarbg menubarremove" title="\u5220\u9664\u56FE\u7247" unselectable="on"></a>','</span>']),_IMG_MENU_BAR:TE(['<a func="showimg" class="menubarbg menubariconimg" title="\u7F16\u8F91\u56FE\u7247"></a>','<span class="menubarbg menubarspl"></span>','<a func="showlink" class="menubarbg menubariconlink2" title="\u7F16\u8F91\u94FE\u63A5"></a>'])};
QMEditor.EditMenu.prototype.init=function(c){
var e=this,d;
e._moBindEditor=c.editor;
e._moBindEditAreaWin=d=c.editorAreaWin;
e._moCurrentEditObj=null;
insertHTML(d.document.body,"afterBegin",QMEditor.EditMenu._TEMPLATE._EDIT_MENU_CONTAINER);
e._moEditMenuBar=S("QMEditorMenuBar",d);
e._setMouseDownEvent();
d.setInterval(function(){
var f=e._moBindEditor._getSelectionElement(),g=e._moEditMenuBar;
if(isShow(S("QMEditMenuModify",d)))
{
return;
}
var h=e._checkEditMenuType(f);
if(h&&h.sHtml!="")
{
if(e._moCurrentEditObj==h.oEditObj)
{
return;
}
g.innerHTML=h.sHtml;
e._moCurrentEditObj=h.oEditObj;
if(!isShow(g))
{
e._adjustEditMenuPos(h.oEditObj);
}
else{
show(g,true);
}
}
else{
show(g,false);
e._moCurrentEditObj=null;
}
},500);
};
QMEditor.EditMenu.prototype._setMouseDownEvent=function(){
var f=this,c=f._moBindEditAreaWin,e=f._moEditMenuBar,d=f._moBindEditor,g=QMEditor.EditMenu._TEMPLATE;
addEvent("txt"===d._msEditCore?d._moEditBody:d._moEditDoc,"mousedown",function(h){
f.showEditMenu(h);
});
addEvent(e,"mousedown",function(h){
var r=S("QMEditMenuInput",c),w=getEventTarget(h);
if(w)
{
var y=attr(w,"func");
switch(y)
{case "del":
{
d._execCmd("Delete");
show(e,false);
break;
}
case "unlink":
{
if(!gbIsIE)
{
var v=d._moEditWin.getSelection(),u=d._moEditDoc.createRange();
if(gbIsOpera&&f._moCurrentEditObj.nodeName=="IMG")
{
u.selectNode(f._moCurrentEditObj);
v.removeAllRanges();
v.addRange(u);
}
else if(f._moCurrentEditObj.nodeName=="A")
{
u.selectNode(d._moveToAncestorNode("A"));
v.removeAllRanges();
v.addRange(u);
}
}
show(e,false);
d._execCmd("Unlink");
break;
}
case "modify":
{
var s=S("QMEditMenuLink",c),m=S("QMEditMenuCommon",c),t=S("QMEditMenuModify",c);
show(m,false);
show(t,true);
d.saveRange();
r.value=s.href;
r.focus();
break;
}
case "save":
{
var s=S("QMEditMenuLink",c),m=S("QMEditMenuCommon",c),t=S("QMEditMenuModify",c),x=r.value,o=f._moCurrentEditObj,l=o.nodeName=="A"?o:o.parentNode;
if(/[a-zA-Z_0-9.-]+@[a-zA-Z_0-9.-]+\.\w+/.test(x))
{
x=trim(x).toLowerCase().indexOf("mailto")==0?x:"mailto:"+x;
}
else{
x=trim(x).indexOf("://")==-1?"http://"+x:x;
}
l.href=s.href=s.innerHTML=x;
d.loadRange();
show(m,true);
show(t,false);
break;
}
case "close":
{
show(e,false);
break;
}
case "showimg":
{
e.innerHTML=g._IMG_MENU_BAR_IMG.replace({"imgcontent":f._getImgMenuContent(f._moCurrentEditObj,g)});
break;
}
case "showlink":
{
var o=f._moCurrentEditObj,l=o.nodeName=="A"?o:o.parentNode;
e.innerHTML=g._IMG_MENU_BAR_LINK.replace({"link":l.href});
break;
}
case "drag":
{
var q=w,k=h.clientX,n=c.document;
var j=function(){
removeEvent(n,"mousemove",i);
removeEvent(n,"mouseup",j);
callBack.call(f,f._fView,[w,h,y,parseInt(w.style.left)]);
};
var i=function(z){
var C=parseInt(w.style.left),B=C+(z.clientX-k),A=false;
if(B<-5||B>65)
{
A=true;
}
if(B<=-1)
{
B=-1;
}
else if(B>=59)
{
B=59;
}
w.style.left=B+"px";
k=z.clientX;
if(A)
{
j();
}
};
addEvents(n,{mousemove:i,mouseup:j});
break;
}
case "editmap":
{
preventDefault(h);
var w=f._moCurrentEditObj;
if(w&&attr(w,"ui-type")=="share_map")
{
var p=d.getMapFunc();
p._doDefaultClick.call(p,{searchKeyword:attr(w,"skwd")||"",title:attr(w,"stitle")||"",center:attr(w,"center")||"",pos:attr(w,"pos")||"",zoom:parseInt(attr(w,"zoom")||15),posDesc:attr(w,"desc")||""});
}
break;
}
case "jumptomap":
{
preventDefault(h);
window.open(attr(w,"src"),"_blank");
break;
}
default:
{
callBack.call(f,f._fView,[w,h,y]);
}
}
}
if(!isShow(r))
{
getTop().preventDefault(h);
getTop().stopPropagation(h);
}
});
return f;
};
QMEditor.EditMenu.prototype._checkEditMenuType=function(d,c){
var k=this,i=k._moBindEditor,g=null,h=null,e=true,f=0,n="",o="",p="",l=QMEditor.EditMenu._TEMPLATE,m={"1":l._IMG_MENU_BAR_LINK,"2":l._IMG_MENU_BAR_IMG,"3":l._IMG_MENU_BAR,"4":l._IMG_MENU_BAR_IMG_MAP};
if(!d)
{
return {"sHtml":"","oEditObj":null};
}
if(d.nodeName=="A")
{
g=d;
}
else if(d.parentNode&&d.parentNode.nodeName=="A"&&attr(d,"ui-type")!="share_map")
{
g=d.parentNode;
}
else if(d.nodeName=="DIV"&&d.firstChild&&d.firstChild==d.lastChild&&d.firstChild.nodeName=="A")
{
g=d.firstChild;
}
if(g&&g.name!="spellcheck")
{
f=1;
h=g;
}
!c&&(e=(gbIsIE?i._moEditDoc.selection.type!="None":!i._moEditWin.getSelection().getRangeAt(0).collapsed));
if(e&&d&&(d.nodeName=="IMG")&&!d.src.match(/soso/))
{
f+=2;
h=d;
}
else if(e&&!gbIsIE&&f==1)
{
var j=d.getElementsByTagName&&d.getElementsByTagName("IMG");
d=(j&&j.length)&&j[0];
if(d&&(d.nodeName=="IMG")&&!d.src.match(/soso/))
{
f+=2;
h=d;
}
}
if(f==2&&getTop().attr(d,"ui-type")=="share_map")
{
f=4;
}
;(f==2||f==3)&&(o=k._getImgMenuContent(h,l));
n=m[f]?m[f].replace({"link":((g&&g.href)||""),"images_path":i._msResPath,"imgcontent":o,"img_map":getTop().attr(h,"jump")}):"";
return {"sHtml":n,"oEditObj":h};
};
QMEditor.EditMenu.prototype._getImgMenuContent=function(c,d){
return (d._IMG_MENU_CONTENT.replace({"size":c.getAttribute("modifysize")||"100%","pixels":c.getAttribute("diffpixels")||"25px"}));
};
QMEditor.EditMenu.prototype._adjustEditMenuPos=function(c){
var s=this,o=s._moBindEditor,n=s._moBindEditAreaWin,q=s._moEditMenuBar,r=calcPos(o._moEditorAreaObj),k=r[0],h=r[3],m=r[2],l=getTop().document.body.clientHeight,j=bodyScroll(n,"scrollTop"),g=bodyScroll(o._moEditWin,"scrollTop"),i,f=k,e=h,p=c.getElementsByTagName("IMG");
(p.length>0)&&(c=p[0]);
r=calcPos(c);
k+=r[2]+3;
h+=r[3];
k-=g;
if(o.isShowToolBar())
{
var d=o._moToolBarObj.offsetHeight;
k+=d;
m+=d;
f+=d;
}
i=k;
(k>m)&&(k=m);
if((k-j)>(l-95))
{
if((r[2]-g)>(c.offsetHeight+20))
{
k=i-(c.offsetHeight+35);
}
else{
k=i-(r[2]-g+10);
}
}
(c.nodeName=="IMG")&&(k=i-c.offsetHeight);
q.style.top=(k<f?f:k)+"px";
q.style.left=(h<e?e:h)+"px";
setTimeout(function(){
show(q,true);
},100);
};
QMEditor.EditMenu.prototype._fView=function(d,c,e,f){
var h=this,g=h._moCurrentEditObj,i=S("zoomhandle",h._moBindEditAreaWin);
if(!(e&&e.match(/zoom/))&&!f)
{
return;
}
var k={"25":"-1px","50":"8px","75":"16px","100":"25px","125":"33px","150":"42px","175":"51px","200":"59px"},j="";
_nWidth=g.naturalWidth||g["naturalW"],_nHeight=g.naturalHeight||g["naturalH"],_nSize=parseInt(g.getAttribute("modifysize")||100),_nRemainder=_nSize%25;
!_nWidth&&(_nWidth=g["naturalW"]=g.offsetWidth);
!_nHeight&&(_nHeight=g["naturalH"]=g.offsetHeight);
if(e=="zoomin")
{
if(_nRemainder>0)
{
_nSize+=(25-_nRemainder);
}
else{
_nSize+=25;
}
(_nSize>200)&&(_nSize=200);
}
else if(e=="zoomout")
{
if(_nRemainder>0)
{
_nSize-=_nRemainder;
}
else{
_nSize-=25;
}
(_nSize<25)&&(_nSize=25);
}
else if(e=="zoom1_1")
{
_nSize=100;
}
else if(f)
{
_nSize=parseInt((f+1)/60*175)+25;
j=f+"px";
}
i.setAttribute("title",_nSize+"%");
i.style.left=k[_nSize]||j;
g.style.width=parseInt(parseInt(_nWidth)*(_nSize/100))+"px";
g.style.height=parseInt(parseInt(_nHeight)*(_nSize/100))+"px";
g.setAttribute("modifysize",_nSize+"%");
g.setAttribute("diffpixels",k[_nSize]||j);
h._adjustEditMenuPos(g);
};
QMEditor.EditMenu.prototype.hideEditMenu=function(){
show(this._moEditMenuBar,false);
};
QMEditor.EditMenu.prototype.showEditMenu=function(c){
var l=this,g=l._moBindEditor,f=("txt"===g._msEditCore?g._moEditBody:g._moEditDoc),d=f.body?f.body:f,h=l._moEditMenuBar,e=getEventTarget(c),m;
if(!h)
{
return;
}
if(e.nodeName.match(/IMG|A/))
{
m=l._checkEditMenuType(e,true);
}
if(m&&m.sHtml!="")
{
var i=e.parentNode.nodeName=="A"?e.parentNode:e;
h.innerHTML=m.sHtml;
l._moCurrentEditObj=m.oEditObj;
l._adjustEditMenuPos(i);
if(gbIsChrome||gbIsSafari)
{
var k=g._moEditWin.getSelection(),j=g._moEditDoc.createRange();
j.selectNode(i);
k.removeAllRanges();
k.addRange(j);
}
}
};
})(QMEditorAdapter);
(function(a,b){
QMEditor.prototype.isUsedFSEditor=function(){
var c=this;
if(!c.getEditorCustomVar)
{
return;
}
return c.getEditorCustomVar('FullScreenToolbar.bUseFullEdtior');
};
QMEditor.prototype.getCurrentEditor=function(){
if(this.isUsedFSEditor())
{
return this.getEditorCustomVar('FullScreenToolbar.oFullEditor');
}
else if(this.getEditorId()=='__FullScreenEditor__')
{
return this.getEditorCustomVar('FullScreenToolbar.oSrcEditor')||this;
}
return this;
};
})(QMEditorAdapter);
(function(a,b){
})(QMEditorAdapter);
