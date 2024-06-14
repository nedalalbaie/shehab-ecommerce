import{a as q,b as B}from"./orders-service-DZtj4z2A.js";import{d as D,r as T,I as E,u as z,b as A,e as F,aG as R,R as P,c as a,j as i,k as c,h as e,V as v,f as r,g as _,t as l,aT as Q,i as m,l as g,F as p,o as s,aU as U,y as K,aN as L,aR as M,m as b,q as $}from"./index-sE9P4Q9O.js";import{_ as G}from"./OrderDetails.vue_vue_type_script_setup_true_lang-8rhbMVsx.js";import{c as J,S as W,s as H}from"./check-status-1CD4zFK3.js";import{f as X}from"./format-date-q9jp0Fy1.js";import{V as Y}from"./VAlert-TSoO0zFn.js";import"./queryString-AL1HqB06.js";const Z={key:0,class:"flex items-center justify-between mt-6"},ee={class:"text-3xl flex items-center gap-2"},te=r("div",{class:"h-6 w-6 rounded-[50%] bg-orange-300"},null,-1),re={key:0,class:"flex gap-4"},se={key:1,class:"w-full h-96 flex items-center justify-center"},ae={class:"border-b-2 border-neutral-600 pb-1 w-fit"},oe={class:"w-4/5 flex gap-1"},le={class:"mt-2 w-1/4 rounded-tl-lg bg-primary-100 text-white p-3 text-xl"},de={class:"flex justify-between"},ie=r("p",null,"الإجمالي :",-1),ne={key:0,class:"flex justify-between mt-2"},ue=r("p",null,"متأخرات سداد الديون :",-1),ge=D({__name:"ViewCustomerOrder",setup(ce){const n=T();let f=0;const h=E(),x=Number(h.params.orderId),y=Number(h.params.customerId),{data:t,isPending:w,isError:V}=z({queryKey:["orderDetails"],queryFn:()=>q(x)}),k=o=>JSON.parse(o),S=A(),C=F({mutationFn:B,onSuccess:()=>{S.invalidateQueries({queryKey:["orderDetails"]})},onError:o=>{console.log(o)}}),I=(o,u)=>{C.mutate({order_number:o,new_status:u})};return R(()=>{t.value&&(n.value=t.value.order_details.status)}),P(n,o=>{f===1?t.value&&I(t.value.order_details.order_number,o):f++}),(o,u)=>(s(),a(p,null,[i(v,{to:{name:"view-customer-orders",params:{customerId:e(y)}},variant:"outlined",color:"primary",size:"large","prepend-icon":e(U)},{default:c(()=>[_(" الرجوع الى الطلبات ")]),_:1},8,["to","prepend-icon"]),e(t)?(s(),a("div",Z,[r("div",null,[r("h1",ee,[_(" الطلب "+l(e(t).order_details.order_number)+"# - "+l(e(J)(e(t).order_details.status))+" ",1),te]),r("p",null,l(e(X)(e(t).order_details.created_at)),1)]),e(t).order_details.status!=e(W).CANCELD?(s(),a("div",re,[i(Q,{modelValue:n.value,"onUpdate:modelValue":u[0]||(u[0]=d=>n.value=d),class:"w-60",label:"تغيير حالة الطلب",placeholder:"تغيير حالة الطلب",variant:"outlined",density:"comfortable",items:e(H),"item-title":"label","item-value":"value"},null,8,["modelValue","items"]),i(v,{to:{name:"edit-customer-order",params:{customerId:e(y),orderId:e(t).order_details.id}},size:"large",rounded:"xl",variant:"elevated",color:"#004C6B"},{prepend:c(()=>[i(K,{icon:e(L)},null,8,["icon"])]),default:c(()=>[_(" تعديل ")]),_:1},8,["to"])])):m("",!0)])):m("",!0),e(w)?(s(),a("div",se,[i(M,{size:"50",width:"4",indeterminate:"",color:"primary"})])):e(V)?(s(),g(Y,{key:2,type:"error",class:"my-6",title:"خطأ في الوصول الى بيانات الطلب",text:"الرجاء اعادة المحاولة مرة أخرى."})):e(t)?(s(),g(G,{key:3,order:e(t)},{default:c(()=>[(s(!0),a(p,null,b(e(t).products,(d,N)=>(s(),a("div",{key:d.id,class:"grid grid-cols-4 px-8 py-3"},[r("p",ae,l(d.name),1),r("p",null,l(e(t).order_details.quantity_selected[N]),1),r("div",oe,[(s(!0),a(p,null,b(k(d.hex_codes),(O,j)=>(s(),a("div",{key:j,class:"w-8 h-8 rounded-[50%] shadow-full-white border-2 flex items-end",style:$({"background-color":`#${O}`})},null,4))),128))]),r("p",null,l(d.price),1)]))),128)),r("div",le,[r("div",de,[ie,r("p",null,l(e(t).order_details.total_price)+" د.ل",1)]),e(t).order_details.payment_method!=="cash"?(s(),a("div",ne,[ue,r("p",null,l(e(t).order_details.paid_due_value)+" د.ل",1)])):m("",!0)])]),_:1},8,["order"])):m("",!0)],64))}});export{ge as default};
