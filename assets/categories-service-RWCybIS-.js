import{ay as t,aS as s}from"./index-sE9P4Q9O.js";import{q as o}from"./queryString-AL1HqB06.js";import{f as a}from"./formData-AERYmAuJ.js";const d=e=>t.addon(a).url("/subCategories").formData(e).post().json(r=>(s.show({message:"تم إضافة التصنيف بنجاح",type:"success"}),r)),i=e=>t.addon(o).url("/getSubCategories").query({cat_id:e}).get().json(),c=e=>t.addon(o).url("/categories").query(e).get().json(),y=e=>t.addon(a).url("/categories").formData(e).post().json(r=>(s.show({message:"تم إضافة التصنيف الثانوي بنجاح",type:"success"}),r)),m=e=>t.url(`/categories/${e}`).delete().json(()=>{s.show({message:"تم حذف التصنيف الثانوي بنجاح",type:"info"})}),C=e=>t.url(`/get-categories/${e}`).get().json();export{i as a,y as b,d as c,c as d,m as e,C as g};
