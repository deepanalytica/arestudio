import {projects,featured,categories,caseStudies} from './data.js';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const esc=(s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=(s)=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let selected='Todos',query='',view='grid',openedId=null,previousFocus=null;
const filters=$('#filters'),grid=$('#work-grid'),count=$('#result-count'),search=$('#search-projects'),dialog=$('#project-dialog');
const byId=new Map(projects.map(p=>[p.id,p]));
// Introducciones editoriales. Se basan en los problemas y entregables documentados
// en data.js; no atribuyen cifras comerciales, clientes o capacidades no verificadas.
const caseOpeners={
 'archivo':'Doce marcas podían compartir una tienda, pero no quería que terminaran pareciéndose. El desafío estaba en darles un lugar común sin quitarles su voz.',
 'deep-geo':'Un mapa puede mostrar muchísimas cosas y aun así dejarte con las mismas preguntas. Por eso empecé a cruzar capas y buscar relaciones que valiera la pena investigar.',
 'praxios-os':'Cuando varios agentes de IA trabajan en una tarea, aparece una pregunta inevitable: ¿quién comprueba qué hicieron y de dónde salió cada respuesta?',
 'visual-art-ai':'Un servicio puede ser valioso y estar mal explicado. Aquí trabajé el mensaje, la navegación y la forma en que alguien descubre qué le pueden ofrecer.',
 'conv-os':'Una consulta entra por un lado, una tarea queda por otro y al final nadie sabe qué pasó. Diseñé una forma de ordenar el recorrido, todavía como demostración.',
 'msj':'Las conversaciones no siempre se quedan en un solo canal. Quería explorar cómo reunirlas sin perder el hilo ni la posibilidad de intervenir.',
 'radar-conv-os':'Un producto puede llamar la atención y no ser un buen negocio. Por eso el radar separa señales, costos y evidencia antes de recomendar probar algo.',
 'deep-living':'Las decisiones cambian con el contexto. Esta investigación explora esas diferencias sin convertir hipótesis sobre personas en conclusiones comprobadas.',
 'meta-harness':'Que un agente diga “terminé” no explica qué hizo. Este trabajo investiga cómo pedir evidencia, establecer límites y dejar decisiones revisables.',
 'atalaya':'Cuando un sistema trabaja por ti, necesitas saber qué pasa detrás. Atalaya explora cómo mostrar estados, tareas y errores sin adivinarlos.',
 'eureka':'A veces una idea importante aparece en medio de un proyecto y se pierde. Me interesaba conservarla junto a las pruebas y el contexto que la hacen útil.',
 'el-tiburon':'Si una conclusión vale algo, debería resistir preguntas difíciles. Este método pone las objeciones sobre la mesa antes de presentar una idea como definitiva.',
 'la-escalera':'Volver a empezar una tarea larga porque cambió la sesión es una pérdida enorme. Aquí exploré cómo entregar contexto y decisiones sin empezar de cero.',
 'super-prompt-euler':'Muchas veces el problema no es construir, sino entender bien el encargo. Este método convierte intenciones ambiguas en condiciones comprobables.',
 'geoanalytica':'Me interesaba hacer más accesibles las relaciones que aparecen en los datos geográficos. Esta es una exploración técnica previa, no un producto final.',
 'inverse-reality-lab':'Una hipótesis puede sonar convincente hasta que buscas un contraejemplo. Construí un espacio para examinar escenarios y hacer explícitos sus límites.',
 'deep-licita':'Leer bases extensas y comparar requisitos exige paciencia y cuidado. Investigué cómo ordenar oportunidades sin sustituir la revisión de documentos oficiales.',
 'sin-humo':'Quería que el lector pudiera seguir una idea y también discutirla. Por eso trabajé la estructura, los argumentos y una forma navegable de leerlos.',
 'el-puente':'Hay temas que se vuelven difíciles solo por cómo están contados. Organicé una lectura por capítulos para poder seguir el hilo sin perder el rigor.',
 'deep-audio':'En audio, cualquier demora importa. Este proyecto explora una experiencia de grabación que separa el trabajo en tiempo real de los procesos de IA.',
 'wal':'Una campaña de regalos familiares no conversa igual que una propuesta para empresas. Diseñé mensajes y piezas diferentes según la ocasión.'
};



// Mejoras progresivas: las capturas reales solo sustituyen el arte si están disponibles.
// Si una captura externa falló en el despliegue, no aparece una imagen rota ni una atribución falsa.
function hydrateProofImages(root=document){
  $$('img[data-proof-image]',root).forEach(img=>{
    const src=img.dataset.proofImage;
    if(!src)return;
    const proof=new Image();
    proof.onload=()=>{
      if(!img.isConnected)return;
      img.src=src;
      img.alt=img.dataset.proofAlt||img.alt;
      img.classList.add('proof-loaded');
      const badge=img.closest('.case-visual')?.querySelector('.case-visual-label');
      if(badge)badge.textContent=img.dataset.proofLabel||'CAPTURA DE SITIO PUBLICADO';
    };
    proof.onerror=()=>{img.dataset.proofUnavailable='true'};
    proof.src=src;
  });
}
function updateFilters(){
  // Conservar el foco al actualizar los botones: sin esto se pierde al filtrar con teclado.
  const focusedCategory=filters.contains(document.activeElement)?document.activeElement.dataset.category:null;
  filters.innerHTML=categories.map(c=>`<button type="button" class="filter-btn" data-category="${esc(c)}" aria-label="Filtrar por ${esc(c)}" aria-pressed="${selected===c}">${esc(c)} <span class="filter-number" aria-hidden="true">${c==='Todos'?projects.length:projects.filter(p=>p.area===c).length}</span></button>`).join('');
  if(focusedCategory) [...filters.querySelectorAll('button')].find(b=>b.dataset.category===focusedCategory)?.focus({preventScroll:true});
}
function card(p){
  const serial=String(projects.indexOf(p)+1).padStart(2,'0');
  return `<a class="work-card" href="casos/?proyecto=${encodeURIComponent(p.id)}" data-project="${esc(p.id)}" data-case-page data-area="${esc(p.area)}" aria-label="Ver proyecto ${esc(p.name)}, ${esc(p.status)}"><div class="work-card-visual"><img src="${esc(p.cover)}" data-proof-image="${esc(p.preview||'')}" data-proof-label="${esc(p.previewLabel||'')}" data-proof-alt="Captura real de ${esc(p.name)}" loading="lazy" decoding="async" alt="Composición editorial conceptual de ${esc(p.name)}" onerror="this.style.opacity='.15'"><span class="mini-area">${esc(p.area)}</span><span class="work-card-serial" aria-hidden="true">AR/ ${serial}</span></div><div class="work-card-body"><h3>${esc(p.name)}</h3><p>${esc(p.summary)}</p><div class="work-meta"><span class="work-status">${esc(p.status)}</span><span class="work-open" aria-hidden="true">Ver caso ↗</span></div></div></a>`
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
  hydrateProofImages(grid);
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
$$('.feature-case-link').forEach((node,i)=>{const p=featured[i];if(!p)return;node.href=`casos/?proyecto=${encodeURIComponent(p.id)}`;node.dataset.project=p.id;node.setAttribute('data-case-page','');node.setAttribute('aria-label',`Entrar al caso completo de ${p.name}: historia, dirección de arte y evidencia`)});
render();
hydrateProofImages($('#featured-grid'));
function mediaMarkup(p){
  if(!Array.isArray(p.media)||!p.media.length)return '';
  return `<section class="case-media"><h3 class="case-media-label">GALERÍA / MATERIALES DEL PROYECTO</h3><div class="case-media-strip">${p.media.slice(0,3).map((m,i)=>`<figure><img src="${esc(m.src)}" alt="${esc(m.alt)}" loading="lazy" onerror="this.closest('figure').hidden=true"><figcaption>${esc(m.caption||'Material publicado')}</figcaption></figure>`).join('')}</div></section>`;
}
function modalMarkup(p){
  const c=caseStudies[p.id]||null;
  const preview=p.media?.[0]?.src||p.cover;
  const genuine=!!p.media?.[0]?.src;
  const links=c?.links??[];
  const actions=links.map(x=>'<a class="case-link '+(x.kind==='demo'?'case-link-primary':'case-link-secondary')+'" href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer">'+esc(x.label)+' <span aria-hidden="true">↗</span></a>').join('');
  const casePage='<a class="case-link case-link-page" href="casos/?proyecto='+encodeURIComponent(p.id)+'">Ver presentación completa <span aria-hidden="true">↗</span></a>';
  const actionNote=casePage+(actions||'<p class="case-no-demo">Este trabajo no tiene una demostración pública verificada. Puedes revisar aquí su alcance y sus límites.</p>');
  const decisions=c?.decisions?.length?'<section class="case-section case-decisions" aria-labelledby="case-decisions-title"><span class="case-kicker">02 / CRITERIO</span><h3 id="case-decisions-title">Por qué tomé estas decisiones</h3><div class="case-decision-grid">'+c.decisions.map((d,i)=>'<article class="case-decision"><span class="case-number">0'+(i+1)+'</span><h4>'+esc(d.title)+'</h4><p>'+esc(d.detail)+'</p></article>').join('')+'</div></section>':'';
  const built=c?.built?.length?c.built:p.deliverables;
  const proof=c?.proofNote||p.evidence||'Esta ficha describe lo que está documentado; no se presentan resultados no verificados.';
  const opener=caseOpeners[p.id]||p.problem;
  return '<div class="case-study">'+
    '<div class="case-overview">'+
      '<div class="case-visual"><img src="'+esc(preview)+'" data-proof-image="'+esc(p.preview||'')+'" data-proof-label="'+esc(p.previewLabel||'')+'" data-proof-alt="Captura pública de '+esc(p.name)+'" alt="'+esc(genuine?(p.media[0].alt||'Material publicado de '+p.name):'Composición editorial conceptual de '+p.name)+'" loading="eager" decoding="async"><span class="case-visual-label">'+(genuine?'MATERIAL PUBLICADO':'REPRESENTACIÓN EDITORIAL · NO ES CAPTURA DEL PRODUCTO')+'</span></div>'+
      '<div class="case-intro"><span class="case-kicker">'+esc(p.area.toUpperCase())+' / '+esc(p.status.toUpperCase())+'</span><h2 id="modal-title">'+esc(p.name)+'</h2>'+
        '<p class="case-story-lede" id="modal-summary">'+esc(opener)+'</p>'+
        '<div class="case-top-actions">'+actionNote+'</div>'+
      '</div>'+
    '</div>'+
    '<details class="case-more"><summary>Te cuento cómo lo pensé y qué puedes comprobar</summary>'+
      '<div class="case-keypoint"><span>EL PROBLEMA</span><p>'+esc(p.problem)+'</p></div>'+
      '<div class="case-keypoint"><span>'+(c?'MI CONTRIBUCIÓN':'QUÉ SE HA DOCUMENTADO')+'</span><p>'+esc(c?.contribution||p.solution)+'</p></div>'+
      decisions+
      '<section class="case-section" aria-labelledby="case-built-title"><span class="case-kicker">03 / EJECUCIÓN</span><h3 id="case-built-title">Qué hice</h3><ul class="case-built">'+built.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></section>'+
      mediaMarkup(p)+
      '<section class="case-section case-evidence" aria-labelledby="case-evidence-title"><span class="case-kicker">04 / EVIDENCIA Y LÍMITES</span><h3 id="case-evidence-title">Qué puedes comprobar</h3><p>'+esc(proof)+'</p><div class="case-evidence-actions">'+actions+'</div></section>'+
    '</details>'+
    '<div class="case-end"><button type="button" id="share-project">Compartir este caso ↗</button><span>Distingo material conceptual, investigación, demo y producto publicado.</span></div>'+
  '</div>';
}
function openProject(id,{push=true}={}){
  const p=byId.get(id);if(!p)return;
  if(!dialog.open)previousFocus=document.activeElement;
  openedId=id;
  $('#dialog-content').innerHTML=modalMarkup(p);
  hydrateProofImages($('#dialog-content'));
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
document.addEventListener('click',e=>{const a=e.target.closest('a[data-project]');if(!a||a.hasAttribute('data-case-page'))return;e.preventDefault();openProject(a.dataset.project)});
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
const navLinks=$$('.main-nav a[href^="#"], #mobile-menu a[href^="#"]');
function updateActiveNav(){
  const threshold=scrollY+$('.header').offsetHeight+90;
  // Las secciones pueden cambiar de orden en el documento mientras el menú
  // conserva una jerarquía editorial distinta. Elegir la más próxima arriba,
  // no el último enlace de la lista, evita estados activos incorrectos.
  let active='',nearest=-Infinity;
  for(const link of navLinks){
    const section=$(link.getAttribute('href'));
    if(section&&section.offsetTop<=threshold&&section.offsetTop>=nearest){
      nearest=section.offsetTop;
      active=link.getAttribute('href');
    }
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
function motion(){
  if(reduced.matches||!window.gsap)return;
  const gsap=window.gsap;
  gsap.from('.hero-copy > *',{y:10,opacity:.72,duration:.62,stagger:.085,ease:'power3.out',clearProps:'all'});
  if(window.ScrollTrigger){
    gsap.registerPlugin(window.ScrollTrigger);
    $$('.feature-card').forEach((card)=>{
      gsap.fromTo(card,{y:22,opacity:.91},{y:0,opacity:1,duration:.8,ease:'power3.out',clearProps:'all',
        scrollTrigger:{trigger:card,start:'top 92%',once:true}});
    });
    gsap.fromTo('.creative-stamp',{rotate:-12,y:26,opacity:.5},{
      rotate:-9,y:0,opacity:1,duration:.9,ease:'power3.out',clearProps:'transform,opacity',
      scrollTrigger:{trigger:'.creative-work',start:'top 80%',once:true}});
    $$('.problem-card').forEach(card=>{
      gsap.fromTo(card,{y:14,opacity:.8},{y:0,opacity:1,duration:.55,ease:'power2.out',clearProps:'all',
        scrollTrigger:{trigger:card,start:'top 96%',once:true}});
    });
  }
}
setTimeout(motion,180);
// Lightweight pointer interaction. Effect is purely decorative and disabled for reduced motion.
if(!reduced.matches){$$('.feature-card').forEach(card=>{card.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--light-x',`${(x+.5)*100}%`);card.style.setProperty('--light-y',`${(y+.5)*100}%`)});});}
// Optional Three.js wireframe, sampled on capable devices. SVG is always the static fallback.
async function threeAccent(){
  if(reduced.matches||!window.WebGLRenderingContext||innerWidth<1000)return;
  const host=$('.hero-art:not(.hero-project-stage)');if(!host)return;
  try{
    const THREE=await import('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js');
    const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(33,host.clientWidth/host.clientHeight,.1,100);
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(host.clientWidth,host.clientHeight);
    renderer.domElement.className='terrain-canvas';renderer.domElement.setAttribute('aria-hidden','true');renderer.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:.13;mix-blend-mode:multiply';host.insertBefore(renderer.domElement,host.firstChild);
    const geom=new THREE.PlaneGeometry(12,7,46,26);const pos=geom.attributes.position;
    for(let i=0;i<pos.count;i++){let x=pos.getX(i),y=pos.getY(i);let h=1.5*Math.exp(-((x-2)**2/12+(y-1)**2/6))+.4*Math.sin(x*1.5)*Math.cos(y*2)+.2*Math.cos(y*3);pos.setZ(i,h)}geom.computeVertexNormals();
    const mat=new THREE.MeshBasicMaterial({color:0x245BFF,wireframe:true,transparent:true,opacity:.68,depthWrite:false});
    const plane=new THREE.Mesh(geom,mat);plane.rotation.x=-.93;plane.rotation.z=-.14;scene.add(plane);camera.position.set(0,-4.7,16);camera.lookAt(0,0,0);
    const onResize=()=>{const w=host.clientWidth,h=host.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h)};addEventListener('resize',onResize,{passive:true});
    let clock=0,raf=0;const animate=()=>{if(document.hidden)return;plane.rotation.z=-.14+Math.sin(clock*.2)*.025;renderer.render(scene,camera);clock+=.016;raf=requestAnimationFrame(animate)};animate();
    document.addEventListener('visibilitychange',()=>{if(!document.hidden){cancelAnimationFrame(raf);animate()}});
  }catch(err){/* Optional effect; site remains fully functional without CDN/WebGL. */}
}
threeAccent();