(function(b,a){
if(b.QMAddress)
{
return;
}
var c=10000;
function e(f)
{
c++;
return (f||"")+c;
}
var d={};
d._moAddrBook={};
d._moMap={};
d.initAddress=function(f){
var g=this;
if(typeof (f)=="function")
{
g._mbIgnoreNoEmail=false;
}
else{
g._mbIgnoreNoEmail=true;
}
if(g._sStatus==="loading")
{
f&&f('loading');
return;
}
g._sStatus="loading";
f&&f(g._sStatus);
var h=a.T("/cgi-bin/laddr_lastlist?sid=$sid$&action=show_all_fast&t=addr_data_fast&type=list_recent_contact").replace({sid:a.getSid()});
a.QMAjax.send(h,{onload:function(i,j){
try{
var k=a.evalValue(j||"")||{};
}
catch(l)
{
var k={};
}
if(i&&k.error==="0")
{
try{
g._initData(k);
g._sStatus="succeed";
}
catch(m)
{
g._sStatus="fail";
}
}
else{
g._sStatus="fail";
}
return f&&f(g._sStatus);
}});
};
d._initData=function(g){
var w=this,v=g;
w._moShared=v.shared;
var u=v.personalGroups;
for(var z=0;z<u.length;z++)
{
var s=u[z];
u[z]={nid:e("group"),bParty:true,name:s[0],id:s[1],children:[]};
w._moMap["per_group_"+u[z].id]=u[z];
w._moMap[u[z].nid]=u[z];
}
w._moPersonalTree={nid:e("group"),bParty:true,id:"none",children:u};
w._moMap[w._moPersonalTree.nid]=w._moPersonalTree;
w._moMap["per_group_"+w._moPersonalTree.id]=w._moPersonalTree;
w._moPersonalGroups=u;
var r=v.clientGroups;
for(var z=0;z<r.length;z++)
{
var s=r[z];
r[z]={nid:e("clientGroup"),bParty:true,name:s[0],id:s[1],children:[]};
w._moMap["client_group_"+r[z].id]=r[z];
w._moMap[r[z].nid]=r[z];
}
w._moClientTree={nid:e("clientGroup"),bParty:true,id:"none",children:r};
w._moMap[w._moClientTree.nid]=w._moClientTree;
w._moMap["client_group_"+w._moClientTree.id]=w._moClientTree;
w._moClientGroups=r;
for(var y in v.addrlist)
{
var l=v.addrlist[y]||[],n=[];
for(var z=0;z<l.length;z++)
{
var f=l[z];
var h=f;
if(h[0]=="")
{
h[0]="\u65E0\u59D3\u540D";
}
if((h[1]=="")&&!w._mbIgnoreNoEmail)
{
continue;
}
if(y=='biz')
{
var m={name:h[0],email:h[1],pinyin:h[2],uin:h[3],kind:y,nid:e("addr")};
n.push(m);
w._moMap[m.nid]=m;
m.email&&(w._moMap[m.email]=m);
var o=h[4].split(',');
for(var B=0;h[4]!=""&&B<o.length;B++)
{
var p={name:h[0],email:o[B],pinyin:h[2],uin:h[3],kind:y,nid:e("addr")};
n.push(p);
w._moMap[p.nid]=p;
p.email&&(w._moMap[p.email]=p);
}
}
else{
var m={name:h[0],email:h[1],pinyin:h[2],kind:y,nid:e("addr")};
if(y=="personal"||y=="client")
{
m.id=h[4];
}
if(y=="personal")
{
var x=h[3].split(",");
m.subgroups=x;
for(var A=0;A<x.length;A++)
{
if(x[A])
{
var t=w._moMap["per_group_"+x[A]];
t&&t.children.push(m);
if(x[A].substring(0,2)=="g_"&&x[A].indexOf('@')==-1)
{
w._moPersonalTree.children.push(m);
}
}
else{
w._moPersonalTree.children.push(m);
}
}
}
else if(y=="client")
{
var x=h[3].split(",");
m.subgroups=x;
for(var A=0;A<x.length;A++)
{
if(x[A])
{
var q=w._moMap["client_group_"+x[A]];
q&&q.children.push(m);
}
else{
w._moClientTree.children.push(m);
}
}
}
n.push(m);
w._moMap[m.nid]=m;
m.email&&(w._moMap[m.email]=m);
}
}
w._moAddrBook[y]=n;
}
};
d.getPartyTree=function(f){
var g=this;
if(g._moPartyTree)
{
return f&&f(g._moPartyTree);
}
var h=a.T("/cgi-bin/laddr_biz?sid=$sid$&action=show_party_list&t=addr_data_party").replace({sid:a.getSid()});
a.QMAjax.send(h,{onload:function(j,k){
var n=a.evalValue(k||"")||{};
if(j&&n.error==="0")
{
var m=n.oPartyList;
for(var o=0;o<m.length;o++)
{
var l=m[o];
l.nid=e("party");
l.children=[];
l.bParty=true;
g._moMap[l.id]=l;
g._moMap[l.nid]=l;
}
g._moPartyTree=g._makeTree(m);
f(g._moPartyTree);
}
}});
};
d._makeTree=function(f){
var k,j=f;
for(var n=0;n<j.length;n++)
{
var h=j[n],m=h.pid;
if(m!="0")
{
h.parent=this._moMap[h.pid];
if(!h.parent)
{
continue;
}
h.parent.children=h.parent.children||[];
h.parent.children.push(h);
}
else{
k=h;
}
}
var h,l=[k];
while(h=l.pop())
{
var g=h.children;
if(g)
{
g.sort(function(i,o){
return (parseInt(i.order)-parseInt(o.order));
});
for(var n=0;n<g.length;n++)
{
l.push(g[n]);
}
}
}
return k;
};
d.getFullParty=function(g,f){
var i=this,h=i._moMap[g];
if(h.bUserLoaded)
{
return f&&f(h);
}
var j=a.T("/cgi-bin/laddr_biz?sid=$sid$&action=show_party&t=addr_data_party&limit=50000&partyid=$partyid$").replace({partyid:h.id,sid:a.getSid()});
a.QMAjax.send(j,{onload:function(k,l){
var m=a.evalValue(l||"")||{};
if(k&&m.error==="0")
{
var o=m.oUserList;
for(var p=0;p<o.length;p++)
{
var n=o[p];
n.nid=e("biz");
n.kind="biz";
i._moMap[n.nid]=n;
h.children.push(n);
}
h.bUserLoaded=true;
f(h);
}
}});
};
d.getAddressFromRemote=function(g,f){
var i=this,h=i._moMap[g];
if(h.bBizUser)
{
return f&&f(h.bBizUser);
}
var j=a.T("/cgi-bin/laddr_biz?sid=$sid$&action=show_party&t=addr_data_party&limit=50000&partyid=$partyid$&recursive=on").replace({partyid:h.id,sid:a.getSid()});
a.QMAjax.send(j,{onload:function(k,l){
var m=a.evalValue(l||"")||{};
if(k&&m.error==="0")
{
h.bBizUser=m.oUserList;
f(m.oUserList);
}
}});
};
d.getAddress=function(f){
var h=this._moMap[f];
if(h)
{
h.isgroup=false;
var g=getTop().QMAddress.getGroup('emailgroup');
for(var j=0;j<g.length;j++)
{
if(g[j].email==f||g[j].nid==f)
{
h.isgroup=true;
break;
}
}
return h;
}
else{
return {};
}
};
d.getPersonalAddrById=function(f){
var h=this._moAddrBook["personal"]||[];
var j=null;
for(var k=0;k<h.length;k++)
{
var g=h[k];
if(g.id==f)
{
j=g;
break;
}
}
return j;
};
d.getClientAddrById=function(f){
var h=this._moAddrBook["client"]||[];
var j=null;
for(var k=0;k<h.length;k++)
{
var g=h[k];
if(g.id==f)
{
j=g;
break;
}
}
return j;
};
d.search=function(h,f,g){
var o=[],p={},l=f||20,q=g||["hot","personal","client","biz","emailgroup"],r=h.toUpperCase();
if(r==="")
{
return o;
}
for(var t=0;t<q.length;t++)
{
var n=this._moAddrBook[q[t]]||[];
for(var s=0;s<n.length;s++)
{
var m=n[s];
if(p[m.email+m.name])
{
continue;
}
;var k=false;
k=k||(m.email.toUpperCase().indexOf(r)!==-1);
k=k||(m.name.toUpperCase().indexOf(r)!==-1);
k=k||(m.pinyin.toUpperCase().indexOf(r)!==-1);
if(k)
{
p[m.email+m.name]=true;
o.push(m);
}
if(o.length>=l)
{
return o;
}
}
;
}
return o;
};
d.getGroup=function(f){
return this._moAddrBook[f];
};
d.getPersonalGroups=function(){
return this._moPersonalGroups;
};
d.getPersonalTree=function(){
return this._moPersonalTree;
};
d.getClientGroups=function(){
return this._moClientGroups;
};
d.getClientTree=function(){
return this._moClientTree;
};
d.isInit=function(){
return this._sStatus=="succeed";
};
d.isShared=function(f){
return this._moShared[f];
};
d.isExpired=function(){
return this._bExpired;
};
d.setExpired=function(f){
this._bExpired=f;
};
d.isBizRoot=function(f){
if(!f)
{
return false;
}
var g=this._moMap[f];
if(g&&g.pid==0)
{
return true;
}
else{
return false;
}
};
b.QMAddress=d;
})(window,getTop());
