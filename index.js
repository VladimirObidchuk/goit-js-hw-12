import{a as M,S as q,i as m}from"./assets/vendor-D0cagnvz.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();async function I({urlBase:r,apiKey:e,searchExpression:i,type:n,orientation:t,safesearch:s,page:a,perPage:S}){return await M.get(r,{params:{key:e,q:i,image_type:n,orientation:t,safesearch:s,page:a,per_page:S}})}function x(r){return r.map(e=>`<li class="gallery-item">
      <a href="${e.largeImageURL}" class="gallery-link">
        <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" data-source="${e.tags}"
        data-title="${e.tags}"  height="255" width="430"/>
      </a> 
          <ul class="sublist">
        <li class="sublist-item">
            <p class="sublist-title">Likes</p>
            <p class="sublist-text">${e.likes}</p>
         </li>
        <li class="sublist-item">
            <p class="sublist-title">Viewes</p>
            <p class="sublist-text">${e.views}</p>
         </li>
         <li class="sublist-item">
            <p class="sublist-title">Comments</p>
            <p class="sublist-text">${e.comments}</p>
        </li>
         <li class="sublist-item">
            <p class="sublist-title">Download</p>
            <p class="sublist-text">${e.downloads}</p>
        </li>
    </ul>
      </li>`).join("")}const L=15;let w=1;const o={urlBase:"https://pixabay.com/api/",apiKey:"48839660-7b8b283c3689698998fc631e5",searchExpression:null,type:"photo",orientation:"horizontal",safesearch:!0,page:w,perPage:L};class O{constructor(e,i,n,t,s,a){this.title=e,this.message=i,this.position=n,this.timeout=t,this.transitionIn=s,this.transitionOut=a}updateMessage(e){this.message=e}error(){m.error({title:this.title,message:this.message,position:this.position,timeout:this.timeout,transitionIn:this.transitionIn,transitionOut:this.transitionOut})}info(){m.info({title:this.title,message:this.message,position:this.position,timeout:this.timeout,transitionIn:this.transitionIn,transitionOut:this.transitionOut})}}class v extends O{constructor(e){super("Error",e,"topRight",5e3,"fadeInDown","fadeOutUp")}}class j extends O{constructor(e){super("info",e,"topRight",5e3,"blue","fadeInDown","fadeOutUp")}}const d=new v,y=new j,u=document.querySelector(".js-gallery"),f=document.querySelector(".form"),l=document.querySelector(".js-loader"),c=document.querySelector(".js-search-btn"),h=document.querySelector(".js-pageup-btn");f.addEventListener("submit",E);c.addEventListener("click",P);let g="",p=null;function b(){return g=document.querySelector(".js-form-input").value.trim(),g===""?(y.updateMessage("Please enter a search term"),y.info(),u.innerHTML="",c.style.display="none",h.style.display="none",null):g}async function E(r){if(r.preventDefault(),!!b()){o.searchExpression=b();try{console.log(" parametersObject",o.page),o.page=1,l.style.display="inline-block";const i=await I(o);if(i.data.hits.length===0){d.updateMessage("Sorry, there are no images matching your search query. Please try again!"),c.style.display="none",h.style.display="none",d.error(),f.reset(),u.innerHTML="";return}u.innerHTML="",u.insertAdjacentHTML("beforeend",x(i.data.hits)),c.style.display="block",p=new q(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,animationSpeed:300,animationSlide:!0,overlay:!0,overlayOpacity:.8}),p.on("shown.simplelightbox",()=>{document.querySelector(".simple-lightbox")}),p.refresh()}catch(i){c.style.display="none",h.style.display="none",l.style.display="none",console.log(i)}finally{l.style.display="none"}f.reset()}}function P(){o.page+=1,p.refresh(),l.style.display="block",I(o).then(r=>{try{u.insertAdjacentHTML("beforeend",x(r.data.hits,w)),p.refresh();const e=Math.ceil(r.data.totalHits/L);if(o.page>=e){y.updateMessage("We're sorry, but you've reached the end of search results."),y.info(),l.style.display="none",c.style.display="none";return}const i=()=>document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:i().height,left:0,behavior:"smooth"}),l.style.display="none",h.style.display="flex"}catch{d.updateMessage("Sorry, there are no images matching your search query. Please try again!"),d.error()}finally{l.style.display="none"}})}
//# sourceMappingURL=index.js.map
