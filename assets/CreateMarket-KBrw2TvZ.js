import{d as i,b as l,e as c,c as m,f as o,j as a,k as u,h as s,V as d,F as p,o as _,g as f,G as k,H as g}from"./index-sE9P4Q9O.js";import{p as h}from"./markets-service-9CeRDKxI.js";import{_ as x}from"./MarketForm.vue_vue_type_script_setup_true_lang-B6xVAKnI.js";import"./queryString-AL1HqB06.js";import"./formData-AERYmAuJ.js";const y={class:"flex justify-between"},C=o("h1",{class:"text-2xl font-medium"}," إضافة محل جديد ",-1),N=i({__name:"CreateMarket",setup(M){const n=l(),t=c({mutationFn:h,onSuccess:()=>{g.replace({name:"markets-list"}),n.invalidateQueries({queryKey:["markets"]})},onError:e=>{console.log(e)}}),r=e=>{t.mutate(e)};return(e,V)=>(_(),m(p,null,[o("div",y,[C,a(d,{to:{name:"markets-list"},variant:"outlined",color:"primary",size:"large","append-icon":s(k)},{default:u(()=>[f(" الرجوع الى المحلات ")]),_:1},8,["append-icon"])]),a(x,{"is-loading":s(t).isPending.value,onSubmit:r},null,8,["is-loading"])],64))}});export{N as default};
