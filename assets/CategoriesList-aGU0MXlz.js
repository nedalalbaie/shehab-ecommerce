import{_ as re}from"./SearchIcon.vue_vue_type_script_setup_true_lang-oMhmWv5l.js";import{ay as ie,d as E,r as D,aG as L,c as x,m as R,F as O,o as v,f as a,h as l,t as w,j as e,k as c,y as F,aM as G,g as h,V as $,aN as K,aO as J,aP as W,aQ as ne,N as M,aA as X,aB as Y,aC as I,aD as Z,aE as ee,aF as T,aH as U,aI as j,aJ as ae,b as Q,e as H,l as z,A as te,u as N,i as B,p as de,aR as ue}from"./index-sE9P4Q9O.js";import{b as ce,c as me,d as ge,e as pe}from"./categories-service-RWCybIS-.js";import{_ as ye}from"./EmptyData.vue_vue_type_script_setup_true_lang-h7VAi8C4.js";import{g as ve}from"./mainCategories-service-w-lFL1KI.js";import{q as _e}from"./queryString-AL1HqB06.js";import{V as A}from"./VTooltip-RkjaeBLA.js";import{_ as oe}from"./ImageUpload.vue_vue_type_script_setup_true_lang-QyoQWSnT.js";import{p as le}from"./pathToFile-cjpw7gPR.js";import{V as se}from"./VDialog-1Ku-f6d7.js";import"./formData-AERYmAuJ.js";import"./DeleteIcon.vue_vue_type_script_setup_true_lang-1ZPx5IJG.js";const fe=k=>ie.addon(_e).url("/subCategories").query(k).get().notFound(()=>({data:[],totalRecords:0})).json();var be={VITE_API_URL:"https://makhazin.com.ly/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const he={class:"flex items-center gap-4"},Ce=["src"],Ve={class:"w-fit"},$e=["onClick"],xe={class:"flex items-center gap-4 mb-2"},Se=["src"],ke={class:"w-fit"},we=["onClick"],De={class:"flex items-center gap-4 mb-2"},Fe=["src"],qe=a("div",{class:"h-[1px] flex-grow bg-gray-500"},null,-1),Ae=E({__name:"CategoriesCards",props:{categoriesArray:{}},emits:["open-category","open-sub-category"],setup(k,{emit:f}){const o=k,y=f,s=be.VITE_API_Storage,i=D([]),t=D([]),m=p=>{i.value[p]=!i.value[p]},g=(p,_)=>{t.value[p][_]=!t.value[p][_]};L(()=>{o.categoriesArray&&(i.value=Array(o.categoriesArray.length).fill(!1),t.value=o.categoriesArray.map(p=>Array(p.children.length).fill(!1)))});const C=p=>{y("open-category",p)},S=p=>{y("open-sub-category",p)};return(p,_)=>(v(!0),x(O,null,R(p.categoriesArray,(n,d)=>(v(),x("div",{key:d,class:"border border-gray-500 rounded-lg py-2 px-6 mb-6"},[a("div",he,[a("img",{class:"w-10 h-10 bg-cover rounded-lg my-2 border border-gray-200",src:`${l(s)}/${n.image_path}`,alt:""},null,8,Ce),a("p",Ve,w(n.name)+" ("+w(n.children.length)+") ",1),e($,{variant:"text",density:"comfortable",icon:"",color:"primary",onClick:b=>C(n)},{default:c(()=>[e(F,{icon:l(G)},null,8,["icon"]),e(A,{activator:"parent",location:"bottom"},{default:c(()=>[h(" إضافة تصنيف ثانوي ")]),_:1})]),_:2},1032,["onClick"]),e($,{variant:"text",density:"comfortable",icon:""},{default:c(()=>[e(F,{color:"primary",icon:l(K)},null,8,["icon"]),e(A,{activator:"parent",location:"bottom"},{default:c(()=>[h(" تعديل ")]),_:1})]),_:1}),a("div",{class:"h-[1px] flex-grow bg-gray-500",onClick:b=>m(d)},null,8,$e),e($,{variant:"text",density:"comfortable",icon:"",color:"primary",onClick:b=>m(d)},{default:c(()=>[e(F,{icon:l(J)},null,8,["icon"])]),_:2},1032,["onClick"])]),a("div",{class:W(["border-r-2 border-gray-300 pr-2 mr-10",i.value[d]?"block":"hidden"])},[(v(!0),x(O,null,R(n.children,(b,q)=>(v(),x("div",{key:b.id,class:"mr-10 mt-7"},[a("div",xe,[a("img",{class:"w-10 h-10 bg-cover rounded-lg my-2 border border-gray-200",src:`${l(s)}/${b.image_path}`,alt:""},null,8,Se),a("p",ke,w(b.name)+" ("+w(b.children.length)+") ",1),e($,{variant:"text",density:"comfortable",icon:"",color:"primary",onClick:r=>S(b)},{default:c(()=>[e(F,{icon:l(G)},null,8,["icon"]),e(A,{activator:"parent",location:"bottom"},{default:c(()=>[h(" إضافة تصنيف فرعي ")]),_:1})]),_:2},1032,["onClick"]),e($,{variant:"text",density:"comfortable",icon:""},{default:c(()=>[e(F,{color:"primary",icon:l(K)},null,8,["icon"]),e(A,{activator:"parent",location:"bottom"},{default:c(()=>[h(" تعديل ")]),_:1})]),_:1}),a("div",{class:"h-[1px] flex-grow bg-gray-500",onClick:r=>g(d,q)},null,8,we),e($,{variant:"text",density:"comfortable",icon:"",color:"primary",onClick:r=>g(d,q)},{default:c(()=>[e(F,{icon:l(J)},null,8,["icon"])]),_:2},1032,["onClick"])]),a("div",{class:W(["border-r-2 border-gray-300 pr-4 mr-10",t.value[d][q]?"block":"hidden"])},[(v(!0),x(O,null,R(b.children,(r,u)=>(v(),x("div",{key:u},[a("div",De,[a("img",{class:"w-10 h-10 bg-cover rounded-lg my-2 border border-gray-200",src:`${l(s)}/${r.image_path}`,alt:""},null,8,Fe),a("p",null,w(r.name),1),e($,{variant:"text",density:"comfortable",icon:""},{default:c(()=>[e(F,{color:"primary",icon:l(K)},null,8,["icon"]),e(A,{activator:"parent",location:"bottom"},{default:c(()=>[h(" تعديل ")]),_:1})]),_:1}),e($,{variant:"text",density:"comfortable",icon:"",color:"primary"},{default:c(()=>[e(F,{icon:l(ne)},null,8,["icon"]),e(A,{activator:"parent",location:"bottom"},{default:c(()=>[h(" عرض ")]),_:1})]),_:1}),qe])]))),128))],2)]))),128))],2)]))),128))}}),Ie={class:"grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2 mt-6"},ze=a("h3",{class:"text-xl"}," قم بالضغط لرفع صورة ",-1),Ee={class:"mt-8 w-1/4"},Pe={class:"mt-6 flex gap-4"},Be=E({__name:"CategoryForm",props:{isLoading:{type:Boolean},category:{},mainCategoryId:{}},emits:["submit","close-dialog"],setup(k,{emit:f}){const o=k,y=f,s=D(null),i=D("empty"),t=M(()=>!!o.category),m=M(()=>!p.value.valid||i.value=="empty"),g=X(Y({name:t.value?I():I().min(1,"يجب إدخال إسم التصنيف "),description:t.value?I():I().min(1,"يجب إدخال التفاصيل  "),cat_zero_id:Z()})),{handleSubmit:C,errors:S,meta:p,setValues:_}=ee({validationSchema:g,initialValues:{cat_zero_id:o.mainCategoryId}}),{value:n}=T("name"),{value:d}=T("description");L(()=>{o.category&&(_({name:o.category.name,description:o.category.description,cat_zero_id:o.category.cat_zero_id}),i.value=o.category.image_path?"filled":"empty",le(o.category.image_path,o.category.image_path.substring(o.category.image_path.lastIndexOf("/")+1)).then(r=>{s.value=r}).catch(r=>{console.error(r)}))});const b=C(r=>{y("submit",{...r,image_path:s.value})}),q=(r,u)=>{s.value=r,i.value=u};return(r,u)=>{var P;return v(),x("form",{onSubmit:u[3]||(u[3]=ae((...V)=>l(b)&&l(b)(...V),["prevent"]))},[a("div",Ie,[e(j,{modelValue:l(n),"onUpdate:modelValue":u[0]||(u[0]=V=>U(n)?n.value=V:null),label:"إسم التصنيف",variant:"outlined",color:"primary",placeholder:"إسم التصنيف","error-messages":l(S).name},null,8,["modelValue","error-messages"]),e(j,{modelValue:l(d),"onUpdate:modelValue":u[1]||(u[1]=V=>U(d)?d.value=V:null),label:"التفاصيل",type:"text",variant:"outlined",color:"primary",placeholder:"التفاصيل","error-messages":l(S).description},null,8,["modelValue","error-messages"])]),a("div",null,[ze,a("div",Ee,[e(oe,{"image-path":(P=o.category)==null?void 0:P.image_path,onHandleImage:q},null,8,["image-path"])])]),a("div",Pe,[e($,{color:"error",size:"large",variant:"elevated",type:"button",onClick:u[2]||(u[2]=V=>y("close-dialog"))},{default:c(()=>[h(" الغاء ")]),_:1}),e($,{disabled:m.value,size:"large",variant:"elevated",color:"primary",type:"submit",loading:o.isLoading},{default:c(()=>[h(w(t.value?"تعديل":"إضافة"),1)]),_:1},8,["disabled","loading"])])],32)}}}),Me={class:"p-8"},Oe={class:"flex justify-between"},Te={class:"text-2xl font-medium"},Ue={class:"bg-gray-200 px-2 rounded-lg"},je=E({__name:"CreateCategoryDialog",props:{mainCategory:{},modelValue:{type:Boolean}},emits:["update:modelValue"],setup(k,{emit:f}){const o=f,y=Q(),s=H({mutationFn:ce,onSuccess:()=>{y.invalidateQueries({queryKey:["categories"]}),o("update:modelValue",!1)},onError:t=>{console.log(t)}}),i=t=>{s.mutate(t)};return(t,m)=>(v(),z(se,{width:"80%","model-value":t.modelValue,"onUpdate:modelValue":m[1]||(m[1]=g=>t.$emit("update:modelValue",g))},{default:c(()=>[e(te,null,{default:c(()=>{var g,C;return[a("div",Me,[a("div",Oe,[a("h1",Te,[h(" إضافة تصنيف تانوي جديد إلي تصنيفات "),a("span",Ue,w("ال"+((g=t.mainCategory)==null?void 0:g.name)),1)])]),e(Be,{"main-category-id":(C=t.mainCategory)==null?void 0:C.id,"is-loading":l(s).isPending.value,onCloseDialog:m[0]||(m[0]=S=>t.$emit("update:modelValue",!1)),onSubmit:i},null,8,["main-category-id","is-loading"])])]}),_:1})]),_:1},8,["model-value"]))}}),Le={class:"grid md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2 mt-6"},Re=a("h3",{class:"text-xl"}," قم بالضغط لرفع صورة ",-1),Ke={class:"mt-8 w-1/4"},Ne={class:"mt-6 flex gap-4"},Qe=E({__name:"SubCategoryForm",props:{isLoading:{type:Boolean},subCategory:{},categoryId:{}},emits:["submit","close-dialog"],setup(k,{emit:f}){const o=k,y=f,s=D(null),i=D("empty"),t=M(()=>!!o.subCategory),m=M(()=>!p.value.valid||i.value=="empty"),g=X(Y({name:I().min(1,"يجب إدخال إسم التصنيف "),description:I().min(1,"يجب إدخال التفاصيل  "),cat_id:Z()})),{handleSubmit:C,errors:S,meta:p,setValues:_}=ee({validationSchema:g,initialValues:{cat_id:o.categoryId}}),{value:n}=T("name"),{value:d}=T("description");L(()=>{o.subCategory&&(_({...o.subCategory}),i.value=o.subCategory.image_path?"filled":"empty",le(o.subCategory.image_path,o.subCategory.image_path.substring(o.subCategory.image_path.lastIndexOf("/")+1)).then(r=>{s.value=r}).catch(r=>{console.error(r)}))});const b=C(r=>{y("submit",{...r,image_path:s.value}),console.log({...r,image_path:s.value})}),q=(r,u)=>{s.value=r,i.value=u};return(r,u)=>{var P;return v(),x("form",{onSubmit:u[3]||(u[3]=ae((...V)=>l(b)&&l(b)(...V),["prevent"]))},[a("div",Le,[e(j,{modelValue:l(n),"onUpdate:modelValue":u[0]||(u[0]=V=>U(n)?n.value=V:null),label:"إسم التصنيف الفرعي",variant:"outlined",color:"primary",placeholder:"إسم التصنيف الفرعي","error-messages":l(S).name},null,8,["modelValue","error-messages"]),e(j,{modelValue:l(d),"onUpdate:modelValue":u[1]||(u[1]=V=>U(d)?d.value=V:null),label:"التفاصيل",type:"text",variant:"outlined",color:"primary",placeholder:"التفاصيل","error-messages":l(S).description},null,8,["modelValue","error-messages"])]),a("div",null,[Re,a("div",Ke,[e(oe,{"image-path":(P=o.subCategory)==null?void 0:P.image_path,onHandleImage:q},null,8,["image-path"])])]),a("div",Ne,[e($,{color:"error",size:"large",variant:"elevated",type:"button",onClick:u[2]||(u[2]=V=>y("close-dialog"))},{default:c(()=>[h(" الغاء ")]),_:1}),e($,{disabled:m.value,size:"large",variant:"elevated",color:"primary",type:"submit",loading:o.isLoading},{default:c(()=>[h(w(t.value?"تعديل":"إضافة"),1)]),_:1},8,["disabled","loading"])])],32)}}}),He={class:"p-8"},Ge={class:"flex justify-between"},Je={class:"text-2xl font-medium"},We={class:"bg-gray-200 px-2 rounded-lg"},Xe=E({__name:"CreateSubCategoryDialog",props:{category:{},modelValue:{type:Boolean}},emits:["update:modelValue"],setup(k,{emit:f}){const o=f,y=Q(),s=H({mutationFn:me,onSuccess:()=>{y.invalidateQueries({queryKey:["sub-categories"]}),o("update:modelValue",!1)},onError:t=>{console.log(t)}}),i=t=>{s.mutate(t)};return(t,m)=>(v(),z(se,{width:"80%","model-value":t.modelValue,"onUpdate:modelValue":m[1]||(m[1]=g=>t.$emit("update:modelValue",g))},{default:c(()=>[e(te,null,{default:c(()=>{var g,C;return[a("div",He,[a("div",Ge,[a("h1",Je,[h(" إضافة تصنيف فرعي جديد إلي تصنيفات "),a("span",We,w("ال"+((g=t.category)==null?void 0:g.name)),1)])]),e(Qe,{"category-id":(C=t.category)==null?void 0:C.id,"is-loading":l(s).isPending.value,onCloseDialog:m[0]||(m[0]=S=>t.$emit("update:modelValue",!1)),onSubmit:i},null,8,["category-id","is-loading"])])]}),_:1})]),_:1},8,["model-value"]))}}),Ye={class:"min-h-[calc(100vh-80px)] flex flex-col"},Ze={class:"text-3xl font-medium"},ea={key:0,class:"bg-gray-200 px-2 rounded-lg text-2xl"},aa={class:"md:flex items-center justify-between mt-6 mb-4"},ta={class:"flex justify-between items-center bg-[#ebf2fc] rounded-xl py-1 px-4 mb-4 md:mb-0"},oa=a("input",{placeholder:"إبحث عن تصنيفات",type:"text",class:"w-56 border-none p-2 rounded-lg outline-none transition-all duration-100 placeholder:text-gray-700"},null,-1),la={key:0,class:"w-full h-96 flex items-center justify-center"},sa={key:1},fa=E({__name:"CategoriesList",setup(k){const f=D(),o=M(()=>!f.value),y=D({open:!1,mainCategory:null}),s=D({open:!1,category:null}),i=D({page:1,limit:100}),{data:t}=N({queryKey:["main-categories",i],queryFn:()=>ve(i.value)}),{data:m}=N({queryKey:["categories",i],queryFn:()=>ge(i.value)}),{data:g}=N({queryKey:["sub-categories",i],queryFn:()=>fe(i.value)}),C=Q();H({mutationFn:pe,onSuccess:()=>{C.invalidateQueries({queryKey:["categories"]})},onError:_=>{console.log(_)}});const S=_=>{y.value={open:!0,mainCategory:_}},p=_=>{s.value={open:!0,category:_}};return L(()=>{t.value&&m.value&&g.value&&(f.value=t.value.data.map(_=>({..._,children:m.value.data.map(n=>({...n,children:g.value.data.map(d=>({...d})).filter(d=>d.cat_id===n.id)})).filter(n=>n.cat_zero_id===_.id)})))}),(_,n)=>(v(),x(O,null,[y.value.open?(v(),z(je,{key:0,modelValue:y.value.open,"onUpdate:modelValue":n[0]||(n[0]=d=>y.value.open=d),"main-category":y.value.mainCategory},null,8,["modelValue","main-category"])):B("",!0),s.value.open?(v(),z(Xe,{key:1,modelValue:s.value.open,"onUpdate:modelValue":n[1]||(n[1]=d=>s.value.open=d),category:s.value.category},null,8,["modelValue","category"])):B("",!0),a("div",Ye,[a("h1",Ze,[h(" التصنيفات "),l(t)&&l(t).data.length>0?(v(),x("span",ea,w(l(t).data.length),1)):B("",!0)]),a("div",aa,[a("div",ta,[oa,e(re,{"custom-style":"w-6 h-6"})]),e($,{"append-icon":l(de),to:{name:"add-main-category"},color:"primary",size:"large",rounded:"xl",variant:"elevated"},{default:c(()=>[h(" إضافة تصنيف أساسي ")]),_:1},8,["append-icon"])]),o.value?(v(),x("div",la,[e(ue,{size:"50",width:"4",indeterminate:"",color:"primary"})])):B("",!0),f.value?(v(),x("div",sa,[f.value.length===0?(v(),z(ye,{key:0})):(v(),z(Ae,{key:1,"categories-array":f.value,onOpenCategory:S,onOpenSubCategory:p},null,8,["categories-array"]))])):B("",!0)])],64))}});export{fa as default};
