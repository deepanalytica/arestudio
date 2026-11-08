import {projects,featured,categories,caseStudies} from './data.js';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const esc=(s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=(s)=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let selected='Todos',query='',view='grid',openedId=null,previousFocus=null;
const filters=$('#filters'),grid=$('#work-grid'),count=$('#result-count'),search=$('#search-projects'),dialog=$('#project-dialog');
const byId=new Map(projects.map(p=>[p.id,p]));

function updateFilters(){
  // Conservar el foco al actualizar los botones: sin esto se pierde al filtrar con teclado.
  const focusedCategory=filters.contains(document.activeElement)?document.activeElement.dataset.category:null;
  filters.innerHTML=categories.map(c=>`<button type="button" class="filter-btn" data-category="${esc(c)}" aria-label="Filtrar por ${esc(c)}" aria-pressed="${selected===c}">${esc(c)} <span class="filter-number" aria-hidden="true">${c==='Todos'?projects.length:projects.filter(p=>p.area===c).length}</span></button>`).join('');
  if(focusedCategory) [...filters.querySelectorAll('button')].find(b=>b.dataset.category===focusedCategory)?.focus({preventScroll:true});
}
function card(p){
  const serial=String(projects.indexOf(p)+1).padStart(2,'0');
  return `<a class="work-card" href="?proyecto=${encodeURIComponent(p.id)}" data-project="${esc(p.id)}" data-area="${esc(p.area)}" aria-label="Ver proyecto ${esc(p.name)}, ${esc(p.status)}"><div class="work-card-visual"><img src="${esc(p.cover)}" loading="lazy" decoding="async" alt="Visual editorial conceptual de ${esc(p.name)}" onerror="this.style.opacity='.15'"><span class="mini-area">${esc(p.area)}</span><span class="work-card-serial" aria-hidden="true">AR/ ${serial}</span></div><div class="work-card-body"><h3>${esc(p.name)}</h3><p>${esc(p.summary)}</p><div class="work-meta"><span class="work-status">${esc(p.status)}</span><span class="work-open" aria-hidden="true">Ver caso ↗</span></div></div></a>`
}
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
  if (!reduced.matches&&window.gsap&&results.length){
    window.gsap.fromTo($$('.work-card',grid),{autoAlpha:.86,y:9},{autoAlpha:1,y:0,duration:.36,stagger:.018,ease:'power2.out',clearProps:'all'});
  }
}
filters.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;selected=b.dataset.category;render()});
search.addEventListener('input',e=>{query=e.target.value.trim();render()});
$('#clear-filters').addEventListener('click',reset);$('#reset-empty').addEventListener('click',reset);
function reset(){selected='Todos';query='';search.value='';render()}
$('#view-grid').addEventListener('click',()=>{view='grid';render()});$('#view-list').addEventListener('click',()=>{view='list';render()});
$('#total-count').textContent=projects.length;
$('.feature-case-link').forEach((node,i)=>{const p=featured[i];if(!p)return;node.href=`?proyecto=${encodeURIComponent(p.id)}`;node.dataset.project=p.id;node.setAttribute('aria-label',`Ver caso de ${p.name}: qué problema resuelve, qué hice y qué decisiones tomé`)});
render();
function mediaMarkup(p){
  if(!Array.isArray(p.media)||!p.media.length)return '';
  return `<section class="case-media"><h3 class="case-media-label">GALERÍA / MATERIALES DEL PROYECTO</h3><div class="case-media-strip">${p.media.slice(0,3).map((m,i)=>`<figure><img src="${esc(m.src)}" alt="${esc(m.alt)}" loading="lazy" onerror="this.closest('figure').hidden=true"><figcaption>${esc(m.caption||'Material publicado')}</figcaption></figure>`).join('')}</div></section>`;
}
function modalMarkup(p){
  const c=caseStudies[p.id]||null;
  const preview=p.media?.[0]?.src||p.cover;
  const genuine=!!p.media?.[0]?.src;
  const links=c?.links?.length?c.links:[{label:'Consultar ficha o evidencia disponible',url:p.url,kind:'source'}];
  const actions=links.map(x=>'<a class="case-link '+(x.kind==='demo'?'case-link-primary':'case-link-secondary')+'" href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer">'+esc(x.label)+' <span aria-hidden="true">↗</span></a>').join('');
  const decisions=c?.decisions?.length?'<section class="case-section case-decisions" aria-labelledby="case-decisions-title"><span class="case-kicker">03 / CRITERIO</span><h3 id="case-decisions-title">Decisiones de diseño y producto</h3><div class="case-decision-grid">'+c.decisions.map((d,i)=>'<article class="case-decision"><span class="case-number">0'+(i+1)+'</span><h4>'+esc(d.title)+'</h4><p>'+esc(d.detail)+'</p></article>').join('')+'</div></section>':'';
  const built=c?.built?.length?c.built:p.deliverables;
  const proof=c?.proofNote||p.evidence||'Esta ficha resume el estado documentado del proyecto; no se declaran métricas ni resultados no verificados.';
  return '<div class="case-study">'+
    '<div class="case-overview">'+
      '<div class="case-visual"><img src="'+esc(preview)+'" alt="'+esc(genuine?(p.media[0].alt||'Material publicado de '+p.name):'Composición editorial conceptual para '+p.name)+'" loading="eager" decoding="async"><span class="case-visual-label">'+(genuine?'MATERIAL DEL PROYECTO':'ARTE EDITORIAL · NO ES CAPTURA DEL PRODUCTO')+'</span></div>'+
      '<div class="case-intro"><span class="case-kicker">'+esc(p.area.toUpperCase())+' / '+esc(p.status.toUpperCase())+'</span><h2 id="modal-title">'+esc(p.name)+'</h2><p class="case-summary" id="modal-summary">'+esc(p.summary)+'</p>'+
        '<div class="case-keypoint"><span>EL PROBLEMA</span><p>'+esc(p.problem)+'</p></div>'+
        '<div class="case-keypoint"><span>'+(c?'MI CONTRIBUCIÓN':'ENFOQUE DOCUMENTADO')+'</span><p>'+esc(c?.contribution||p.solution)+'</p></div>'+
        '<div class="case-top-actions">'+actions+'</div>'+
      '</div>'+
    '</div>'+
    '<div class="case-story-header"><span class="case-kicker">CASO / '+esc(p.type.toUpperCase())+'</span><span>'+esc(c?.role||p.status)+'</span></div>'+
    '<section class="case-section" aria-labelledby="case-built-title"><span class="case-kicker">02 / DESARROLLO</span><h3 id="case-built-title">'+(c?'Qué construí':'Trabajo y materiales documentados')+'</h3><ul class="case-built">'+built.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></section>'+
    decisions+
    mediaMarkup(p)+
    '<section class="case-section case-evidence" aria-labelledby="case-evidence-title"><span class="case-kicker">04 / EVIDENCIA Y LÍMITES</span><h3 id="case-evidence-title">Qué puedes comprobar</h3><p>'+esc(proof)+'</p><div class="case-evidence-actions">'+actions+'</div></section>'+
    '<div class="case-end"><button type="button" id="share-project">Compartir este caso ↗</button><span>Las hipótesis, materiales conceptuales y demos se distinguen de los productos publicados.</span></div>'+
  '</div>';
}
function openProject(id,{push=true}={}){
  const p=byId.get(id);if(!p)return;
  if(!dialog.open)previousFocus=document.activeElement;
  openedId=id;
  $('#dialog-content').innerHTML=modalMarkup(p);
  if(push){const u=new URL(location.href);u.searchParams.set('proyecto',id);history.pushState({project:id},'',u)}
  if(!dialog.open)dialog.showModal();
  if(!reduced.matches&&window.gsap){window.gsap.fromTo($('.dialog-project-info',dialog),{y:12,opacity:.7},{y:0,opacity:1,duration:.38,ease:'power3.out',clearProps:'all'});}
  $('#close-dialog').focus();
  $('#share-project').addEventListener('click',async e=>{
    const button=e.currentTarget;
    if(button.disabled)return;
    const url=new URL(location.href);url.searchParams.set('proyecto',id);
    button.disabled=true;button.setAttribute('aria-busy','true');button.textContent='Preparando enlace…';
    try{
      if(navigator.share&&navigator.canShare?.({url:url.href})){await navigator.share({title:`AR/ · ${p.name}`,url:url.href});toast('Opciones para compartir abiertas');return}
      await navigator.clipboard.writeText(url.href);toast('Enlace del caso copiado');
    }
    catch(err){if(err?.name!=='AbortError')toast('No se pudo copiar. Puedes copiar la dirección de la página.')}
    finally{button.disabled=false;button.removeAttribute('aria-busy');button.textContent='Compartir este caso ↗'}
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
const menu=$('#mobile-menu'),menuBtn=$('#menu-toggle');
function setMenu(open,{restoreFocus=false}={}){
  menu.hidden=!open;
  menuBtn.setAttribute('aria-expanded',String(open));
  menuBtn.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
  menuBtn.textContent=open?'✕':'☰';
  if(!open&&restoreFocus)menuBtn.focus({preventScroll:true});
}
menuBtn.addEventListener('click',()=>setMenu(menu.hidden));
$$('a',menu).forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){setMenu(false,{restoreFocus:true})}});
document.addEventListener('click',e=>{if(!menu.hidden&&!menu.contains(e.target)&&!menuBtn.contains(e.target))setMenu(false)});
const navLinks=$$('.main-nav a[href^="#"]');
function updateActiveNav(){
  const threshold=scrollY+$('.header').offsetHeight+90;
  let active='';
  for(const link of navLinks){
    const section=$(link.getAttribute('href'));
    if(section&&section.offsetTop<=threshold)active=link.getAttribute('href');
  }
  // El estado activo corresponde a la sección visible, nunca queda fijo.
  for(const link of navLinks){
    const isActive=link.getAttribute('href')===active;
    link.classList.toggle('nav-active',isActive);
    if(isActive)link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  }
}
addEventListener('hashchange',updateActiveNav);
updateActiveNav();
$('#year').textContent=String(new Date().getFullYear());
let scheduled=false;addEventListener('scroll',()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$('#scroll-meter').style.transform=`scaleX(${max>0?scrollY/max:0})`;updateActiveNav();scheduled=false})},{passive:true});
// GSAP progressive enhancement: no dependency on GSAP for content or navigation.
function motion(){if(reduced.matches||!window.gsap)return;const gsap=window.gsap;gsap.from('.hero-copy > *',{y:12,opacity:.85,duration:.48,stagger:.045,ease:'power3.out',clearProps:'all'});gsap.from('.hero-mesh',{opacity:.75,y:9,duration:.65,ease:'power3.out',clearProps:'all'});gsap.from('.feature-card',{y:11,opacity:.94,stagger:.04,duration:.4,ease:'power3.out',clearProps:'all'});}
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