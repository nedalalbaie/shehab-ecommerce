import{d as r,b as c,e as u,c as m,f as n,j as o,k as l,h as s,V as d,F as p,o as _,g as f,G as g,H as h}from"./index-sE9P4Q9O.js";import{p as x}from"./discounts-service-8_GhC-Cv.js";import{_ as y}from"./DiscountForm.vue_vue_type_script_setup_true_lang-9JDA3uKy.js";import"./queryString-AL1HqB06.js";import"./format-date-q9jp0Fy1.js";import"./VAutocomplete-OZIwKkOo.js";import"./filter-ySkqEX_B.js";import"./VDatePicker-LLTWplpV.js";import"./VSpacer-1dX4bruf.js";import"./VSheet-MtFhQ-QK.js";const C={class:"flex justify-between"},V=n("h1",{class:"text-2xl font-medium"}," إضافة تخفيض جديد ",-1),M=r({__name:"CreateDiscount",setup(b){const a=c(),t=u({mutationFn:x,onSuccess:()=>{h.replace({name:"discounts"}),a.invalidateQueries({queryKey:["discounts"]})},onError:e=>{console.log(e)}}),i=e=>{t.mutate(e)};return(e,v)=>(_(),m(p,null,[n("div",C,[V,o(d,{to:{name:"discounts"},variant:"outlined",color:"primary",size:"large","append-icon":s(g)},{default:l(()=>[f(" الرجوع إلى التخفيضات ")]),_:1},8,["append-icon"])]),o(y,{"is-loading":s(t).isPending.value,onSubmit:i},null,8,["is-loading"])],64))}});export{M as default};
