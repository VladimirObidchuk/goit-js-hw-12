import{a as M,S as q,i as f}from"./assets/vendor-D0cagnvz.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();async function b({urlBase:r,apiKey:e,searchExpression:i,type:n,orientation:t,safesearch:s,page:a,perPage:O}){return await M.get(r,{params:{key:e,q:i,image_type:n,orientation:t,safesearch:s,page:a,per_page:O}})}function I(r){return r.map(e=>`<li class="gallery-item">
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
      </li>`).join("")}const x=15;let L=1;const c={urlBase:"https://pixabay.com/api/",apiKey:"48839660-7b8b283c3689698998fc631e5",searchExpression:null,type:"photo",orientation:"horizontal",safesearch:!0,page:L,perPage:x};class w{constructor(e,i,n,t,s,a){this.title=e,this.message=i,this.position=n,this.timeout=t,this.transitionIn=s,this.transitionOut=a}updateMessage(e){this.message=e}error(){f.error({title:this.title,message:this.message,position:this.position,timeout:this.timeout,transitionIn:this.transitionIn,transitionOut:this.transitionOut})}info(){f.info({title:this.title,message:this.message,position:this.position,timeout:this.timeout,transitionIn:this.transitionIn,transitionOut:this.transitionOut})}}class v extends w{constructor(e){super("Error",e,"topRight",5e3,"fadeInDown","fadeOutUp")}}class E extends w{constructor(e){super("info",e,"topRight",5e3,"blue","fadeInDown","fadeOutUp")}}const d=new v,h=new E,u=document.querySelector(".js-gallery"),g=document.querySelector(".form"),o=document.querySelector(".js-loader"),l=document.querySelector(".js-search-btn"),S=document.querySelector(".js-pageup-btn");g.addEventListener("submit",P);l.addEventListener("click",j);let y="",p=null;function m(){return y=document.querySelector(".js-form-input").value.replace(/\d+/g,"").replace(/ /g,"+").trim(),y===""?(h.updateMessage("Please enter a search term"),h.info(),u.innerHTML="",l.style.display="none",null):y}async function P(r){if(r.preventDefault(),!!m()){c.searchExpression=m();try{o.style.display="inline-block";const i=await b(c);if(i.data.hits.length===0){d.updateMessage("Sorry, there are no images matching your search query. Please try again!"),l.style.display="none",d.error(),g.reset(),u.innerHTML="";return}u.innerHTML="",u.insertAdjacentHTML("beforeend",I(i.data.hits)),l.style.display="block",p=new q(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,animationSpeed:300,animationSlide:!0,overlay:!0,overlayOpacity:.8}),p.on("shown.simplelightbox",()=>{document.querySelector(".simple-lightbox")}),p.refresh()}catch(i){l.style.display="none",S.style.display="none",o.style.display="none",console.log(i)}finally{o.style.display="none"}g.reset()}}function j(){c.page+=1,p.refresh(),o.style.display="block",b(c).then(r=>{try{u.insertAdjacentHTML("beforeend",I(r.data.hits,L)),p.refresh();const e=Math.ceil(r.data.totalHits/x);if(c.page>=e){h.updateMessage("We're sorry, but you've reached the end of search results."),h.info(),o.style.display="none",l.style.display="none";return}const i=()=>document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:i().height,left:0,behavior:"smooth"}),o.style.display="none",S.style.display="flex"}catch{d.updateMessage("Sorry, there are no images matching your search query. Please try again!"),d.error()}finally{o.style.display="none"}})}
//# sourceMappingURL=index.js.map
