import{ay as e,aS as s}from"./index-sE9P4Q9O.js";import{q as t}from"./queryString-AL1HqB06.js";const u=r=>e.addon(t).url("/orders").query(r).get().notFound(()=>({data:[],totalRecords:0})).json(),c=r=>e.addon(t).url("/get-item-details").query({id:r}).get().json(),g=r=>e.url(`/show-all-orders/${r}`).get().json(),l=(r,o)=>e.url(`/orders/${r}`).post({...o,_method:"put"}).json(a=>(s.show({message:"تم تعديل الطلب بنجاح",type:"success"}),a)),p=r=>e.url(`/orders/${r}`).delete().json(()=>{s.show({message:"تم حذف الطلب بنجاح",type:"info"})}),m=r=>e.url("/chnage-order-status").post(r).json(()=>{s.show({message:"تم تغيير حالة الطلب بنجاح",type:"info"})});export{c as a,m as b,p as c,g as d,u as g,l as p};
