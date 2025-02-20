import{a as M,S as q,i as f}from"./assets/vendor-D0cagnvz.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();async function I({urlBase:r,apiKey:e,searchExpression:i,type:n,orientation:t,safesearch:s,page:o,perPage:S}){const y=await M.get(r,{params:{key:e,q:i,image_type:n,orientation:t,safesearch:s,page:o,per_page:S}});return console.log(" response",y),y}function x(r){return r.map(e=>`<li class="gallery-item">
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
      </li>`).join("")}const w=15;let v=1;const a={urlBase:"https://pixabay.com/api/",apiKey:"48839660-7b8b283c3689698998fc631e5",searchExpression:null,type:"photo",orientation:"horizontal",safesearch:!0,page:v,perPage:w};class L{constructor(e,i,n,t,s,o){this.title=e,this.message=i,this.position=n,this.timeout=t,this.transitionIn=s,this.transitionOut=o}updateMessage(e){this.message=e}error(){f.error({title:this.title,message:this.message,position:this.position,timeout:this.timeout,transitionIn:this.transitionIn,transitionOut:this.transitionOut})}info(){f.info({title:this.title,message:this.message,position:this.position,timeout:this.timeout,transitionIn:this.transitionIn,transitionOut:this.transitionOut})}}class E extends L{constructor(e){super("Error",e,"topRight",5e3,"fadeInDown","fadeOutUp")}}class P extends L{constructor(e){super("info",e,"topRight",5e3,"blue","fadeInDown","fadeOutUp")}}const m=new E,d=new P,p=document.querySelector(".js-gallery"),g=document.querySelector(".form"),l=document.querySelector(".loader"),c=document.querySelector(".js-search-btn"),O=document.querySelector(".js-pageup-btn");g.addEventListener("submit",$);c.addEventListener("click",j);let h="",u=null;function b(){if(h=document.querySelector(".js-form-input").value.replace(/\d+/g,"").replace(/ /g,"+").trim(),h===""){d.updateMessage("Please enter a search term"),d.info();return}return h}async function $(r){if(r.preventDefault(),!!b()){a.searchExpression=b();try{l.style.display="inline-block";const i=await I(a);if(i.data.hits.length===0){m.updateMessage("Sorry, there are no images matching your search query. Please try again!"),c.style.display="none",m.error(),g.reset(),p.innerHTML="";return}p.innerHTML="",p.insertAdjacentHTML("beforeend",x(i.data.hits)),c.style.display="block",u=new q(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,animationSpeed:300,animationSlide:!0,overlay:!0,overlayOpacity:.8}),u.on("shown.simplelightbox",()=>{document.querySelector(".simple-lightbox")}),u.refresh()}catch(i){c.style.display="none",O.style.display="none",console.log(i)}finally{l.style.display="none"}g.reset()}}function j(){a.page+=1,l.style.display="block",u.refresh(),I(a).then(r=>{p.insertAdjacentHTML("beforeend",x(r.data.hits)),u.refresh();const e=Math.ceil(r.data.totalHits/w),i=()=>document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:i().height*2,left:0,behavior:"smooth"}),l.style.display="none",O.style.display="flex",a.page===e&&(d.updateMessage("We're sorry, but you've reached the end of search results."),d.info(),l.style.display="none",c.style.display="none")})}
//# sourceMappingURL=index.js.map
