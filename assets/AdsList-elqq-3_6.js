import{g as A,d as B}from"./ads-service-5mcBpyhy.js";import{aY as x,o as a,c as l,f as e,d as y,aP as h,F as w,m as k,u as E,b as S,e as j,j as t,k as s,h as c,V as u,g as i,i as p,l as F,p as I,t as g,x as M,A as P,B as D,C as q}from"./index-sE9P4Q9O.js";import{_ as N}from"./DeleteIcon.vue_vue_type_script_setup_true_lang-1ZPx5IJG.js";import{_ as Q}from"./EmptyData.vue_vue_type_script_setup_true_lang-h7VAi8C4.js";import{V as R}from"./VSpacer-1dX4bruf.js";import{V as T}from"./VDialog-1Ku-f6d7.js";import"./formData-AERYmAuJ.js";const z={},Z={width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},K=e("path",{d:"M0.25 11.095V13.375C0.25 13.585 0.415 13.75 0.625 13.75H2.905C3.0025 13.75 3.1 13.7125 3.1675 13.6375L11.3575 5.45504L8.545 2.64254L0.3625 10.825C0.2875 10.9 0.25 10.99 0.25 11.095ZM13.5325 3.28004C13.825 2.98754 13.825 2.51504 13.5325 2.22254L11.7775 0.467544C11.485 0.175044 11.0125 0.175044 10.72 0.467544L9.3475 1.84004L12.16 4.65254L13.5325 3.28004Z",fill:"white"},null,-1),O=[K];function U(m,o){return a(),l("svg",Z,O)}const H=x(z,[["render",U]]),Y=["fill"],v=y({__name:"CheckIcon",props:{fill:{},customStyle:{}},setup(m){return(o,n)=>(a(),l("svg",{width:"14",height:"11",class:h(o.customStyle),viewBox:"0 0 14 11",fill:o.fill,xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M4.75012 8.12738L1.62262 4.99988L0.557617 6.05738L4.75012 10.2499L13.7501 1.24988L12.6926 0.192383L4.75012 8.12738Z",class:h(o.fill)},null,2)],10,Y))}}),G={},J={class:"grid md:grid-cols-2 gap-3"},W=e("div",{class:"skeleton w-full h-36 rounded-lg"},null,-1),X=[W];function ee(m,o){return a(),l("div",J,[(a(),l(w,null,k(6,n=>e("div",{key:n,class:"rounded-lg bg-white dark:bg-[#363636] shadow-lg dark:shadow-full-dark p-4 mt-3"},X)),64))])}const te=x(G,[["render",ee]]);var se={VITE_API_URL:"https://makhazin.com.ly/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const ae={class:"flex justify-end"},le={class:"flex items-center justify-between mt-8"},oe=e("h1",{class:"text-3xl"},[i(" الإعلانات "),e("span",null,"(3)")],-1),ne={class:"flex gap-4"},de={class:"bg-sky-200 py-1 px-2 rounded-md flex items-center gap-2"},ie={class:"py-1 px-2 rounded-md flex items-center gap-2 border-2 border-gray-300"},re={key:0},ce={key:1,class:"mt-8"},ue={class:"grid grid-cols-2 gap-6"},_e={class:"px-4 flex flex-col gap-8"},me={class:"flex gap-2 text-2xl font-medium mt-4"},pe={class:"text-green-700"},fe={class:"flex gap-5 py-4"},he=["src"],$e=y({__name:"AdsList",setup(m){const o=se.VITE_API_Storage,n=E({queryKey:["ads"],queryFn:()=>A()}),C=S(),L=j({mutationFn:B,onSuccess:()=>{C.invalidateQueries({queryKey:["ads"]})},onError:r=>{console.log(r)}}),$=r=>{L.mutate(r)},b=r=>`حذف الإعلان ${r} ?`;return(r,ge)=>{var f;return a(),l("div",null,[e("div",ae,[t(u,{"append-icon":c(I),to:{name:"add-ad"},color:"primary",size:"large",rounded:"xl",variant:"elevated"},{default:s(()=>[i(" إضافة إعلان ")]),_:1},8,["append-icon"])]),e("div",le,[oe,e("div",ne,[e("button",de,[i(" مفعل "),t(v,{fill:"black"})]),e("button",ie,[i(" معطل "),t(v,{fill:"black"})])])]),c(n).data.value?p("",!0):(a(),l("div",re,[t(te)])),c(n).data.value?(a(),l("div",ce,[c(n).data.value.data.length===0?(a(),F(Q,{key:0})):p("",!0),e("div",ue,[(a(!0),l(w,null,k((f=c(n).data.value)==null?void 0:f.data,d=>(a(),l("div",{key:d.id,class:"h-40 flex justify-between rounded-md shadow-md bg-white"},[e("div",_e,[e("div",null,[e("div",me,[e("p",null,g(d.name),1),e("p",pe," - "+g(d.show===1?"مفعل":"معطل"),1)])]),e("div",fe,[t(u,{rounded:"xl",variant:"elevated",color:"primary",to:{name:"edit-ad",params:{id:d.id}}},{prepend:s(()=>[t(H)]),default:s(()=>[i(" تعديل ")]),_:2},1032,["to"]),t(T,{width:"500"},{activator:s(({props:_})=>[t(u,M(_,{rounded:"xl",variant:"elevated",color:"#004C6B",type:"submit"}),{prepend:s(()=>[t(N,{fill:"fill-white"})]),default:s(()=>[i(" حذف ")]),_:2},1040)]),default:s(({isActive:_})=>[t(P,{title:b(d.name),rounded:"lg",color:"#EFE9F5",style:{"padding-block":"1.75rem !important"}},{default:s(()=>[t(D,null,{default:s(()=>[i(" سيتم الغاء هذا الإعلان بشكل نهائي . ")]),_:1}),t(q,null,{default:s(()=>[t(R),t(u,{text:"لا",onClick:V=>_.value=!1},null,8,["onClick"]),t(u,{text:"نعم",onClick:V=>{_.value=!1,$(d.id)}},null,8,["onClick"])]),_:2},1024)]),_:2},1032,["title"])]),_:2},1024)])]),e("div",null,[e("img",{src:`${c(o)}/${d.url}`,alt:"",class:"w-60 h-full object-cover object-center rounded-l-md"},null,8,he)])]))),128))])])):p("",!0)])}}});export{$e as default};
