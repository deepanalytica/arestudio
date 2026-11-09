import {projects} from './data.js';

/*
 AR ESTUDIO V10 — No autoplay, no scroll trapping, no JS-dependent hero.
 The four works are complete HTML in the initial response. This module only
 enhances archive navigation and handles missing external screenshots.
*/

const valid=new Map(projects.map(p=>[p.id,p]));
const oldId=new URLSearchParams(location.search).get('proyecto');
if(oldId&&valid.has(oldId)){
  location.replace('casos/?proyecto='+encodeURIComponent(oldId));
}

const el=(tag,className,text)=>{
  const node=document.createElement(tag);
  if(className)node.className=className;
  if(text!==undefined)node.textContent=text;
  return node;
};

function imageFallback(img,fallback,caption){
  let attempted=false;
  img.addEventListener('error',()=>{
    if(attempted){
      img.hidden=true;
      if(caption)caption.textContent='Imagen temporalmente no disponible';
      return;
    }
    if(fallback&&fallback!==img.getAttribute('src')){
      attempted=true;
      img.src=fallback;
      if(caption)caption.textContent='Ilustración conceptual del proyecto';
    }else{
      img.hidden=true;
      if(caption)caption.textContent='Imagen temporalmente no disponible';
    }
  });
  if(img.complete&&img.naturalWidth===0)img.dispatchEvent(new Event('error'));
}

document.querySelectorAll('.scene-archive-photo[data-fallback]').forEach(img=>
  imageFallback(img,img.dataset.fallback,document.querySelector('.scene-archivo .scene-category'))
);
document.querySelectorAll('.scene-proof[data-proof-fallback]').forEach(img=>{
  // Preserve the themed SVG as a full-bleed backdrop when a captured page fails.
  // Do not silently present an illustration as a real screenshot.
  img.addEventListener('error',()=>{
    img.hidden=true;
    const disclosure=img.closest('.scene')?.querySelector('.scene-disclosure');
    if(disclosure)disclosure.textContent='Visualización conceptual · captura temporalmente no disponible';
  },{once:true});
  if(img.complete&&img.naturalWidth===0)img.dispatchEvent(new Event('error'));
});

const list=document.querySelector('#project-index');
const count=document.querySelector('#results-label');
const empty=document.querySelector('#empty-results');
const search=document.querySelector('#search-projects');
const buttons=[...document.querySelectorAll('.filter')];
let current='Todos',term='';

function normalized(value){
  return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es-CL');
}
function projectRow(p,index){
  const a=el('a','index-row');
  a.href='casos/?proyecto='+encodeURIComponent(p.id);
  a.setAttribute('aria-label','Explorar el proyecto '+p.name+', '+p.area);
  a.dataset.project=p.id;

  const no=el('span','index-number',String(index+1).padStart(2,'0'));
  const main=el('span','index-main');
  const img=el('img','index-thumb');
  img.src=p.preview||p.cover;
  img.alt='';
  img.loading='lazy';
  img.decoding='async';
  img.addEventListener('error',()=>{
    if(p.preview&&img.src!==new URL(p.cover,location.href).href){
      img.src=p.cover;
    }else{
      img.hidden=true;
    }
  });
  const name=el('span','index-title',p.name);
  const type=el('span','index-type',p.type||p.area);
  const arrow=el('span','index-arrow','↗');arrow.setAttribute('aria-hidden','true');
  main.append(img,name);
  a.append(no,main,type,arrow);
  return a;
}
function render(){
  const filtered=projects.filter(p=>
    (current==='Todos'||p.area===current) &&
    normalized([p.name,p.type,p.area,p.summary].join(' ')).includes(normalized(term))
  );
  const fragment=document.createDocumentFragment();
  for(const project of filtered){
    fragment.appendChild(projectRow(project,projects.indexOf(project)));
  }
  list.replaceChildren(fragment);
  count.textContent=filtered.length===1?'1 proyecto':filtered.length+' proyectos';
  empty.hidden=filtered.length!==0;
}
buttons.forEach(btn=>btn.addEventListener('click',()=>{
  current=btn.dataset.filter;
  for(const other of buttons){
    const on=other===btn;
    other.classList.toggle('is-current',on);
    other.setAttribute('aria-pressed',String(on));
  }
  render();
}));
search.addEventListener('input',()=>{term=search.value.trim();render()});
document.querySelector('#reset-search')?.addEventListener('click',()=>{
  current='Todos';term='';search.value='';
  for(const btn of buttons){
    const on=btn.dataset.filter==='Todos';
    btn.classList.toggle('is-current',on);
    btn.setAttribute('aria-pressed',String(on));
  }
  render();
});
render();

const year=document.querySelector('#year');
if(year)year.textContent=new Date().getFullYear();

// Quiet visual transition for the title only, and only if motion is permitted.
// No autoplay, forced wheel gestures, focus stealing or oversized WebGL bundles.
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
if(!reduced.matches&&'IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(entry.isIntersecting){
        entry.target.classList.add('is-in-view');
      }
    }
  },{threshold:.23});
  document.querySelectorAll('.scene').forEach(scene=>observer.observe(scene));
}
