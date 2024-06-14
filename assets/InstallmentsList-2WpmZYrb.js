import{d as I,r as _,u as F,b as B,e as P,c as g,f as d,g as u,h as t,t as S,i as f,j as e,aI as T,k as a,V as m,l as D,F as q,o as c,p as E,x as N,y as Q,z as L,A as j,B as K,C as M}from"./index-sE9P4Q9O.js";import{g as U,d as $}from"./installment-service-QRNfZonm.js";import{d as z}from"./index-AJYIkLwR.js";import{V as A,L as O}from"./VDataTableServer-KxNtiX_H.js";import{V as G}from"./VDialog-1Ku-f6d7.js";import{V as H}from"./VTooltip-RkjaeBLA.js";import{V as J}from"./VSpacer-1dX4bruf.js";import"./queryString-AL1HqB06.js";import"./formData-AERYmAuJ.js";import"./_commonjsHelpers-5-cIlDoe.js";import"./filter-ySkqEX_B.js";const R={class:"text-3xl font-medium"},W={key:0,class:"bg-gray-200 px-2 rounded-lg text-2xl"},X={class:"flex justify-between mt-8"},Y={class:"w-72"},Z={key:1,class:"shadow-lg rounded-lg mt-4 border border-gray-200"},ee={class:"flex gap-1"},pe=I({__name:"InstallmentsList",setup(te){const p=_(""),o=_({page:1,limit:10,search_value:""}),{data:s,isPending:v}=F({queryKey:["installments",o],queryFn:()=>U(o.value)}),y=[{title:"الأيام المتبقية",value:"days_late",width:"300px",sortable:!1},{title:"النسبة",value:"percentage",width:"300px",sortable:!1},{title:"العرض",value:"show",width:"300px",sortable:!1},{title:"الإجرائات",key:"actions",width:"300px",sortable:!1}],h=B(),x=({page:l,limit:n})=>{o.value={...o.value,page:l??1,limit:n??10}},V=z(()=>{o.value.search_value=p.value},300),b=P({mutationFn:$,onSuccess:()=>{h.invalidateQueries({queryKey:["installments"]})},onError:l=>{console.log(l)}}),k=l=>{b.mutate(l)},C=l=>`حذف الإستحقاق ${l}# ؟`;return(l,n)=>(c(),g(q,null,[d("h2",R,[u(" الأقساط "),t(s)&&t(s).total>0?(c(),g("span",W,S(t(s).total),1)):f("",!0)]),d("div",X,[d("div",Y,[e(T,{modelValue:p.value,"onUpdate:modelValue":n[0]||(n[0]=i=>p.value=i),label:"البحث",variant:"outlined",color:"primary",clearable:"",placeholder:"البحث",density:"compact",onInput:t(V)},null,8,["modelValue","onInput"])]),e(m,{"append-icon":t(E),to:{name:"add-installment"},color:"primary",variant:"elevated",rounded:"xl"},{default:a(()=>[u(" إضافة قسط ")]),_:1},8,["append-icon"])]),t(v)?(c(),D(O,{key:0})):f("",!0),t(s)?(c(),g("div",Z,[e(A,{sticky:"","items-per-page":o.value.limit,page:o.value.page,headers:y,"items-length":t(s).total,items:t(s).data,loading:t(v),"onUpdate:options":n[1]||(n[1]=i=>x({page:i.page,limit:i.itemsPerPage}))},{"item.actions":a(({item:i})=>[d("div",ee,[e(G,{width:"500"},{activator:a(({props:r})=>[e(m,N(r,{variant:"text",class:"mx-1",density:"comfortable",icon:"",color:"error"}),{default:a(()=>[e(Q,{icon:t(L)},null,8,["icon"]),e(H,{activator:"parent",location:"bottom"},{default:a(()=>[u(" حذف ")]),_:1})]),_:2},1040)]),default:a(({isActive:r})=>[e(j,{title:C(""),rounded:"lg",color:"#EFE9F5",style:{"padding-block":"1.75rem !important"}},{default:a(()=>[e(K,null,{default:a(()=>[u(" سيتم حذف هذه الإستحقاق بشكل نهائي . ")]),_:1}),e(M,null,{default:a(()=>[e(J),e(m,{text:"لا",onClick:w=>r.value=!1},null,8,["onClick"]),e(m,{text:"نعم",onClick:w=>{r.value=!1,k(i.id)}},null,8,["onClick"])]),_:2},1024)]),_:2},1032,["title"])]),_:2},1024)])]),_:2},1032,["items-per-page","page","items-length","items","loading"])])):f("",!0)],64))}});export{pe as default};
