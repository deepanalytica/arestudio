import {projects,featured,categories} from './data.js';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const esc=(s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=(s)=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let selected='Todos',query='',view='grid',openedId=null,previousFocus=null;
const filters=$('#filters'),grid=$('#work-grid'),count=$('#result-count'),search=$('#search-projects'),dialog=$('#project-dialog');
const byId=new Map(projects.map(p=>[p.id,p]));

function updateFilters(){
  filters.innerHTML=categories.map(c=>`<button type="button" class="filter-btn" data-category="${esc(c)}" aria-pressed="${selected===c}">${esc(c)} <span class="filter-number">${c==='Todos'?projects.length:projects.filter(p=>p.area===c).length}</span></button>`).join('');
}
function card(p){return `<a class="work-card" href="?proyecto=${encodeURIComponent(p.id)}" data-project="${esc(p.id)}" aria-label="Ver proyecto ${esc(p.name)}, ${esc(p.status)}"><div class="work-card-visual"><img src="${esc(p.cover)}" loading="lazy" decoding="async" alt="Visual editorial del proyecto ${esc(p.name)}" onerror="this.style.opacity='.15'"><span class="mini-area">${esc(p.area)}</span></div><div class="work-card-body"><h3>${esc(p.name)}</h3><p>${esc(p.summary)}</p><div class="work-meta"><span class="work-status">${esc(p.status)}</span><span class="work-open" aria-hidden="true">↗</span></div></div></a>`}
function render(){
  const results=projects.filter(p=>(selected==='Todos'||p.area===selected)&&norm([p.name,p.area,p.type,p.summary,p.status,p.problem,p.solution,p.deliverables.join(' ')].join(' ')).includes(norm(query)));
  grid.innerHTML=results.map(card).join('');
  grid.classList.toggle('list-view',view==='list');
  count.textContent=`${results.length} ${results.length===1?'proyecto':'proyectos'} · ${selected==='Todos'?'Todas las áreas':selected}`;
  $('#no-results').hidden=results.length>0;
  $('#clear-filters').hidden=selected==='Todos'&&!query;
  $('#view-grid').setAttribute('aria-pressed',String(view==='grid'));
  $('#view-list').setAttribute('aria-pressed',String(view==='list'));
  updateFilters();
}
filters.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;selected=b.dataset.category;render()});
search.addEventListener('input',e=>{query=e.target.value.trim();render()});
$('#clear-filters').addEventListener('click',reset);$('#reset-empty').addEventListener('click',reset);
function reset(){selected='Todos';query='';search.value='';render()}
$('#view-grid').addEventListener('click',()=>{view='grid';render()});$('#view-list').addEventListener('click',()=>{view='list';render()});
$('#total-count').textContent=projects.length;
$$('.feature-card').forEach((node,i)=>{const p=featured[i];if(!p)return;node.href=`?proyecto=${encodeURIComponent(p.id)}`;node.dataset.project=p.id;node.setAttribute('aria-label',`Explorar ficha de ${p.name}`)});
render();
function modalMarkup(p){return `<div class="dialog-project-hero"><div class="dialog-project-cover"><img src="${esc(p.cover)}" alt="Dirección de arte para ${esc(p.name)}"><span>VISUAL EDITORIAL · NO CAPTURA DE PRODUCTO</span></div><div class="dialog-project-info"><span class="section-kicker">${esc(p.area.toUpperCase())} / ${esc(p.type.toUpperCase())}</span><h2 id="modal-title">${esc(p.name)}</h2><p id="modal-summary">${esc(p.summary)}</p><div class="dialog-chips"><span>${esc(p.status)}</span>${p.deliverables.slice(0,2).map(x=>`<span>${esc(x)}</span>`).join('')}</div></div></div><div class="dialog-texts"><article><h3>01 / EL RETO</h3><p>${esc(p.problem)}</p></article><article><h3>02 / LA RESPUESTA</h3><p>${esc(p.solution)}</p></article></div><div class="dialog-texts"><article><h3>03 / QUÉ SE DESARROLLÓ</h3><div class="deliverables">${p.deliverables.map(x=>`<span>${esc(x)}</span>`).join('')}</div></article><article><h3>04 / ESTADO Y EVIDENCIA</h3><p>${esc(p.evidence||('Estado informado: '+p.status+'. La ficha enlaza a la documentación disponible del portafolio anterior.'))}</p></article></div><div class="dialog-bottom"><p>Este caso describe el alcance documentado; no implica resultados comerciales ni métricas sin respaldo.</p><div class="dialog-buttons"><button type="button" id="share-project">Compartir ficha ↗</button><a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">Ver evidencia / proyecto ↗</a></div></div>`}
function openProject(id,{push=true}={}){
  const p=byId.get(id);if(!p)return;
  if(!dialog.open)previousFocus=document.activeElement;
  openedId=id;
  $('#dialog-content').innerHTML=modalMarkup(p);
  if(push){const u=new URL(location.href);u.searchParams.set('proyecto',id);history.pushState({project:id},'',u)}
  if(!dialog.open)dialog.showModal();
  $('#close-dialog').focus();
  $('#share-project').addEventListener('click',async()=>{
    const url=new URL(location.href);url.searchParams.set('proyecto',id);
    try{if(navigator.share&&navigator.canShare?.({url:url.href})){await navigator.share({title:`AR/ · ${p.name}`,url:url.href});return}await navigator.clipboard.writeText(url.href);toast('Enlace copiado');}
    catch(err){if(err?.name==='AbortError')return;toast('Copia la URL de la barra para compartir')}
  })
}
function closeProject({replace=true}={}){
  if(dialog.open)dialog.close();openedId=null;
  if(replace){const u=new URL(location.href);u.searchParams.delete('proyecto');history.replaceState({},'',u)}
  previousFocus?.focus?.();previousFocus=null;
}
$('#close-dialog').addEventListener('click',()=>closeProject());
dialog.addEventListener('click',e=>{if(e.target===dialog)closeProject()});
dialog.addEventListener('cancel',e=>{e.preventDefault();closeProject()});
document.addEventListener('click',e=>{const a=e.target.closest('a[data-project]');if(!a)return;e.preventDefault();openProject(a.dataset.project)});
window.addEventListener('popstate',()=>{const id=new URLSearchParams(location.search).get('proyecto');if(id&&byId.has(id))openProject(id,{push:false});else if(dialog.open)closeProject({replace:false})});
const initialId=new URLSearchParams(location.search).get('proyecto');if(initialId&&byId.has(initialId))openProject(initialId,{push:false});
function toast(message){const el=$('#toast');el.textContent=message;el.hidden=false;clearTimeout(toast.timeout);toast.timeout=setTimeout(()=>el.hidden=true,3000)}
// Keyboard shortcuts are opt-in around text inputs and preserve native keyboard behavior.
document.addEventListener('keydown',e=>{const textInput=e.target.matches('input,textarea,[contenteditable="true"]');if(e.key==='/'&&!textInput&&!dialog.open){e.preventDefault();location.hash='explorar';search.focus()}if(e.key==='Escape'&&document.activeElement===search){search.blur()}});
$('.search-launch')?.addEventListener('click',()=>{requestAnimationFrame(()=>search.focus())});
const menu=$('#mobile-menu'),menuBtn=$('#menu-toggle');menuBtn.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;menuBtn.setAttribute('aria-expanded',String(open));menuBtn.textContent=open?'✕':'☰'});$$('a',menu).forEach(a=>a.addEventListener('click',()=>{menu.hidden=true;menuBtn.setAttribute('aria-expanded','false');menuBtn.textContent='☰'}));
$('#year').textContent=String(new Date().getFullYear());
let scheduled=false;addEventListener('scroll',()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$('#scroll-meter').style.transform=`scaleX(${max>0?scrollY/max:0})`;scheduled=false})},{passive:true});
// GSAP progressive enhancement: no dependency on GSAP for content or navigation.
function motion(){if(reduced.matches||!window.gsap)return;const gsap=window.gsap;gsap.from('.hero-copy > *',{y:18,opacity:0,duration:.78,stagger:.09,ease:'power3.out',clearProps:'all'});gsap.from('.hero-mesh',{opacity:0,y:17,duration:1.4,ease:'power3.out',clearProps:'all'});gsap.from('.feature-card',{y:23,opacity:0,stagger:.085,duration:.75,ease:'power3.out',delay:.12,clearProps:'all'});}
setTimeout(motion,180);
// Lightweight pointer interaction. Effect is purely decorative and disabled for reduced motion.
if(!reduced.matches){$$('.feature-card').forEach(card=>{card.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--light-x',`${(x+.5)*100}%`);card.style.setProperty('--light-y',`${(y+.5)*100}%`)});});}
// Optional Three.js wireframe, sampled on capable devices. SVG is always the static fallback.
async function threeAccent(){
  if(reduced.matches||!window.WebGLRenderingContext||innerWidth<1000)return;
  const host=$('.hero-art');if(!host)return;
  try{
    const THREE=await import('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js');
    const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(33,host.clientWidth/host.clientHeight,.1,100);
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(host.clientWidth,host.clientHeight);
    renderer.domElement.className='terrain-canvas';renderer.domElement.setAttribute('aria-hidden','true');renderer.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:.13;mix-blend-mode:multiply';host.insertBefore(renderer.domElement,host.firstChild);
    const geom=new THREE.PlaneGeometry(12,7,46,26);const pos=geom.attributes.position;
    for(let i=0;i<pos.count;i++){let x=pos.getX(i),y=pos.getY(i);let h=1.5*Math.exp(-((x-2)**2/12+(y-1)**2/6))+.4*Math.sin(x*1.5)*Math.cos(y*2)+.2*Math.cos(y*3);pos.setZ(i,h)}geom.computeVertexNormals();
    const mat=new THREE.MeshBasicMaterial({color:0x155b46,wireframe:true,transparent:true,opacity:.68,depthWrite:false});
    const plane=new THREE.Mesh(geom,mat);plane.rotation.x=-.93;plane.rotation.z=-.14;scene.add(plane);camera.position.set(0,-4.7,16);camera.lookAt(0,0,0);
    const onResize=()=>{const w=host.clientWidth,h=host.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h)};addEventListener('resize',onResize,{passive:true});
    let clock=0,raf=0;const animate=()=>{if(document.hidden)return;plane.rotation.z=-.14+Math.sin(clock*.2)*.025;renderer.render(scene,camera);clock+=.016;raf=requestAnimationFrame(animate)};animate();
    document.addEventListener('visibilitychange',()=>{if(!document.hidden){cancelAnimationFrame(raf);animate()}});
  }catch(err){/* Optional effect; site remains fully functional without CDN/WebGL. */}
}
threeAccent();