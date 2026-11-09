import {projects,featured,caseStudies} from '../data.js';

const escapeHtml=(value)=>String(value??'').replace(/[&<>"']/g,char=>({
  '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
})[char]);
const e=escapeHtml;
const A=(src)=>src?.startsWith('https://')?src:'../'+String(src||'');
const projectId=new URLSearchParams(location.search).get('proyecto');
const project=projects.find(p=>p.id===projectId);
const main=document.querySelector('#case-content');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const readyProjects=featured.map(p=>p.id);

const artDirection={
  'archivo':{
    edition:'01 / DISEÑO Y COMERCIO',
    headline:'Doce marcas. Una tienda.',
    intro:'La pregunta no era cómo poner más productos en pantalla. Era cómo dejar que doce marcas distintas convivieran sin volverse iguales.',
    storyTitle:'Una tienda podía ser mucho más que un catálogo.',
    story:'Había colecciones, nombres, estilos y fotografías que tenían que encontrarse en un mismo lugar. Decidí diseñar un sistema de navegación común, pero conservar el carácter editorial de cada marca.',
    mediaTitle:'Cada colección necesitaba su propio escenario.',
    mediaIntro:'Estos son materiales editoriales del catálogo publicado. La ventana de tienda utiliza una captura verificable del sitio, no una interfaz inventada.',
    statusNote:'Tienda y materiales editoriales publicados',
    stage:'archivo'
  },
  'deep-geo':{
    edition:'02 / INTELIGENCIA TERRITORIAL',
    headline:'Un mapa no basta.',
    intro:'Una capa muestra una cosa. Otra puede cambiar por completo la interpretación. Me interesaba cruzarlas y dejar claro qué está observado y qué todavía es una hipótesis.',
    storyTitle:'Mirar el territorio desde más de una fuente.',
    story:'Los datos dispersos pueden ocultar relaciones importantes. El diseño propone conectar mapas, información y evidencia para explorar riesgos sin vender una hipótesis como una certeza.',
    mediaTitle:'No basta con encender una capa.',
    mediaIntro:'La representación visual es conceptual. No son datos territoriales en vivo ni una captura de una consola operativa.',
    statusNote:'Investigación geoespacial · representación conceptual',
    stage:'geo'
  },
  'praxios-os':{
    edition:'03 / ARQUITECTURA Y DIRECCIÓN DE IA',
    headline:'¿Quién comprueba a la IA?',
    intro:'Cuando una tarea pasa entre agentes y herramientas, quise poder responder algo sencillo: qué pasó, quién lo revisó y qué evidencia queda.',
    storyTitle:'El control es parte del diseño.',
    story:'No se trata de poner agentes a trabajar sin supervisión. Se trata de definir objetivos, condiciones, estados y una revisión humana que permita distinguir las salidas útiles de las afirmaciones sin sustento.',
    mediaTitle:'El sistema se explica con estados, no con promesas.',
    mediaIntro:'El flujo de agentes es una representación explicativa. La captura corresponde a un dossier público, no a una consola de producción.',
    statusNote:'Arquitectura, dossier y prototipos · no servicio comercial desplegado',
    stage:'praxios'
  },
  'visual-art-ai':{
    edition:'04 / COMUNICACIÓN Y MARKETING DIGITAL',
    headline:'Lo importante es cómo lo cuentas.',
    intro:'Una persona llega a una web y necesita entender, sin adivinar, qué le ofrecen y qué puede hacer después. Ahí empieza el trabajo de comunicación.',
    storyTitle:'Un mensaje claro abre la conversación.',
    story:'Trabajé la arquitectura de la página, el lenguaje visual y las rutas de contacto. La idea era presentar una oferta comprensible sin abrumar con tecnicismos ni afirmaciones que no pudieran comprobarse.',
    mediaTitle:'Una propuesta que se puede abrir y recorrer.',
    mediaIntro:'La imagen principal es una captura del sitio publicado; si falta, la página conserva su portada conceptual identificada.',
    statusNote:'Web y servicio publicados',
    stage:'visual'
  }
};
const genericStageByArea={
  'Diseño':'design','Datos':'data','Tecnología':'tech',
  'Investigación':'research','Comunicación':'communication'
};

function image(src,alt,extraClass='',priority=false){
  return '<img class="'+extraClass+'" src="'+e(A(src))+'" alt="'+e(alt)+'" loading="'+(priority?'eager':'lazy')+'" decoding="async">';
}
function screenshot(p,caption,extraClass=''){
  if(!p.preview)return '';
  return '<div class="evidence-shot '+e(extraClass)+'">'+
    image(p.preview,'Captura documentada de '+p.name,'evidence-shot-img')+
    '<span class="evidence-shot-label">'+e(caption||p.previewLabel||'Captura pública')+'</span></div>';
}
function frame(src,alt,label,classes=''){
  return '<figure class="art-frame '+e(classes)+'">'+image(src,alt)+
    '<figcaption>'+e(label)+'</figcaption></figure>';
}
function browserFrame(p,classes=''){
  if(!p.preview)return '';
  return '<div class="browser-frame '+e(classes)+'" aria-label="Vista capturada del proyecto">'+
    '<div class="browser-top"><span class="browser-dots" aria-hidden="true"><i></i><i></i><i></i></span>'+
      '<span class="browser-origin">AR/ · '+e(p.name)+'</span><span class="browser-lock" aria-hidden="true">↗</span></div>'+
    image(p.preview,'Captura: '+(p.previewLabel||p.name),'browser-screenshot')+
    '<div class="browser-caption">'+e(p.previewLabel||'Captura de sitio publicado')+'</div>'+
  '</div>';
}
function scene(p,direction){
  const stage=direction?.stage||genericStageByArea[p.area]||'research';
  let inner='';
  if(stage==='archivo'){
    const media=p.media||[];
    inner='<div class="scene-archive-art">'+
      '<div class="archive-image archive-image-one">'+image(media[0]?.src||p.cover,'Fotografía editorial Ownform')+'</div>'+
      '<div class="archive-image archive-image-two">'+image(media[2]?.src||p.cover,'Fotografía editorial Imago')+'</div>'+
      browserFrame(p,'archive-browser')+
      '<span class="archive-graphic" aria-hidden="true">ARCHIVO<span>®</span></span>'+
    '</div>';
  } else if(stage==='geo'){
    inner='<div class="geo-artwork">'+image(p.cover,'Ilustración conceptual de capas territoriales de Deep Geo','geo-base',true)+
      '<div class="geo-gridlines" aria-hidden="true"></div>'+
      '<div class="geo-layer geo-layer-one"><span class="geo-pin" aria-hidden="true"></span><span>FUENTES / CAPAS</span><strong>Comparar</strong></div>'+
      '<div class="geo-layer geo-layer-two"><span>OBSERVAR</span><strong>↓</strong><span>CONTRASTAR</span><strong>↓</strong><span>PRIORIZAR</span></div>'+
      '<div class="geo-coordinate" aria-hidden="true">GEO / INVESTIGACIÓN / 2D — 3D</div>'+
    '</div>';
  } else if(stage==='praxios'){
    inner='<div class="praxios-artwork">'+
      '<div class="praxios-flow" aria-label="Diagrama conceptual de supervisión de agentes">'+
      '<div><span>01 / INTENCIÓN</span><strong>Definir qué hay que hacer</strong></div>'+
      '<i aria-hidden="true">↓</i><div><span>02 / AGENTES</span><strong>Ejecutar con límites</strong></div>'+
      '<i aria-hidden="true">↓</i><div><span>03 / EVIDENCIA</span><strong>Comprobar y revisar</strong></div>'+
      '<span class="flow-label">ESQUEMA EXPLICATIVO · NO CONSOLA OPERATIVA</span></div>'+
      browserFrame(p,'praxios-browser')+
    '</div>';
  } else if(stage==='visual'){
    inner='<div class="visual-artwork">'+
      '<div class="visual-orbit visual-orbit-a" aria-hidden="true"></div><div class="visual-orbit visual-orbit-b" aria-hidden="true"></div>'+
      '<div class="visual-device"><div class="visual-device-camera" aria-hidden="true"></div>'+
      image(p.preview||p.cover,'Sitio web Visual Art AI publicado','visual-device-screen',true)+'</div>'+
      '<div class="visual-statement"><span>UNA IDEA, CLARA.</span><strong>Hay personas buscando lo que vendes.</strong><small>Fragmento de comunicación del sitio publicado</small></div>'+
    '</div>';
  } else {
    inner='<div class="generic-art">'+
      '<div class="generic-orbit generic-orbit-a" aria-hidden="true"></div><div class="generic-orbit generic-orbit-b" aria-hidden="true"></div>'+
      image(p.cover,'Ilustración conceptual de '+p.name,'generic-illustration',true)+
      (p.preview?browserFrame(p,'generic-browser'):'')+
      '<div class="generic-label">'+e(p.area)+' / AR ESTUDIO</div>'+
    '</div>';
  }
  const label=(p.media?.length?'Material editorial publicado':p.preview?e(p.previewLabel||'Captura pública'):'Composición conceptual · no captura de producto');
  return '<div class="case-stage stage-'+e(stage)+'" id="escena" aria-label="Presentación visual del proyecto">'+
    '<div class="scene-top"><span>AR/ · '+e(p.name.toUpperCase())+'</span><span>'+e(p.status.toUpperCase())+'</span></div>'+
    inner+
    '<div class="scene-caption"><span>'+label+'</span><span>DESLIZA PARA EXPLORAR ↓</span></div>'+
  '</div>';
}
function projectCard(p,style=''){
  const cover=p.preview||p.cover;
  return '<a class="related-card '+e(style)+'" href="?proyecto='+encodeURIComponent(p.id)+'">'+
    '<div class="related-visual">'+image(cover,'Vista de '+p.name)+
    '<span>'+e(p.area.toUpperCase())+'</span></div>'+
    '<div class="related-copy"><strong>'+e(p.name)+'</strong><small>Ver historia <span aria-hidden="true">↗</span></small></div>'+
  '</a>';
}
function build(p){
  const caseData=caseStudies[p.id]||{};
  const direction=artDirection[p.id];
  const story=direction?.story||p.solution;
  const lead=direction?.intro||p.problem;
  const title=direction?.headline||p.name;
  const edition=direction?.edition||p.area.toUpperCase()+' / '+p.type.toUpperCase();
  const decisions=caseData.decisions||[];
  const evidence=caseData.proofNote||p.evidence||'La información disponible documenta el estado del trabajo. No acredita resultados comerciales.';
  const links=(caseData.links||[]).filter(link=>/^https:\/\//.test(link.url));
  const built=caseData.built||p.deliverables||[];
  const next=projects[(projects.indexOf(p)+1)%projects.length];
  const btns=links.map(link=>
    '<a class="evidence-link" href="'+e(link.url)+'" target="_blank" rel="noopener noreferrer">'+
      e(link.label)+' <span aria-hidden="true">↗</span></a>').join('');
  const mobileUrl=location.href;

  const designNotes=decisions.length?decisions.map((decision,i)=>
    '<article class="decision" data-reveal><span class="decision-index">0'+(i+1)+'</span>'+
      '<div><h3>'+e(decision.title)+'</h3><p>'+e(decision.detail)+'</p></div></article>'
  ).join(''):'<p>El proyecto sigue en documentación y no tiene decisiones verificadas publicadas.</p>';
  let gallery='';
  if(p.media?.length){
    gallery='<div class="materials-grid">'+p.media.slice(0,3).map((m,i)=>frame(m.src,m.alt,m.caption||'Material editorial','material-'+(i+1))).join('')+'</div>';
  }else if(p.preview){
    gallery='<div class="evidence-scene">'+browserFrame(p,'evidence-large')+'</div>';
  }else{
    gallery='<div class="concept-scene">'+image(p.cover,'Ilustración conceptual de '+p.name)+
      '<div><span>REPRESENTACIÓN CONCEPTUAL</span><p>No hay captura pública de interfaz verificada para este proyecto.</p></div></div>';
  }
  return '<div class="case-layout" data-case="'+e(p.id)+'">'+
    '<section class="case-intro container" aria-labelledby="case-title">'+
      '<div class="intro-meta"><span>'+e(edition)+'</span><span>CASO / AR ESTUDIO</span></div>'+
      '<div class="intro-grid"><div><p class="intro-status">'+e(p.status)+'</p>'+
        '<h1 id="case-title">'+e(title)+'</h1></div>'+
        '<div class="intro-side"><p>'+e(lead)+'</p><a href="#escena">Ver el proyecto <span aria-hidden="true">↓</span></a></div></div>'+
    '</section>'+
    scene(p,direction)+
    '<section class="story-section container" id="historia" aria-labelledby="story-title">'+
      '<div class="story-kicker"><span>01 / EL CONTEXTO</span><span>'+e(p.area.toUpperCase())+'</span></div>'+
      '<div class="story-grid"><div><span class="story-watermark" aria-hidden="true">01</span><h2 id="story-title">'+e(direction?.storyTitle||'Esto es lo que había que resolver.')+'</h2></div>'+
      '<div class="story-body"><p>'+e(story)+'</p><div class="story-problem"><span>EL PUNTO DE PARTIDA</span><p>'+e(p.problem)+'</p></div></div></div>'+
    '</section>'+
    '<section class="decision-section" id="decisiones" aria-labelledby="decisions-title"><div class="container">'+
      '<div class="decision-head"><span>02 / CRITERIO Y EXPLORACIÓN</span><h2 id="decisions-title">No elegí el primer camino.</h2>'+
      '<p>'+e(caseData.contribution||p.solution)+'</p></div>'+
      '<div class="decisions">'+designNotes+'</div>'+
      '</div></section>'+
    '<section class="experience-section container" id="experiencia" aria-labelledby="experience-title">'+
      '<div class="experience-head"><span>03 / LA EXPERIENCIA</span><h2 id="experience-title">'+e(direction?.mediaTitle||'Así se presenta este trabajo.')+'</h2>'+
        '<p>'+e(direction?.mediaIntro||(p.preview?'Se muestra material público acreditado del proyecto.':'La imagen es conceptual y no debe confundirse con una captura de producto.'))+'</p></div>'+
      gallery+
    '</section>'+
    '<section class="evidence-section" id="evidencia" aria-labelledby="evidence-title"><div class="container">'+
      '<div class="evidence-head"><span>04 / LO QUE PUEDES COMPROBAR</span><h2 id="evidence-title">Lo hecho. Lo comprobable. Lo que falta.</h2></div>'+
      '<div class="evidence-grid"><div><h3>Qué construí</h3><ul>'+built.map(item=>'<li>'+e(item)+'</li>').join('')+'</ul></div>'+
      '<div class="evidence-proof"><h3>Estado y límites</h3><p>'+e(evidence)+'</p>'+
      '<p class="project-state">'+e(direction?.statusNote||p.status)+'</p>'+
      (btns?'<div class="evidence-links">'+btns+'</div>':'<div class="no-demo">No hay una demo pública acreditada. Esta página documenta el alcance y las decisiones disponibles.</div>')+
      '</div></div></div></section>'+
    '<section class="next-section container" aria-label="Siguiente caso">'+
      '<div><span>¿SEGUIMOS?</span><p>Cada problema pide una respuesta distinta.</p></div>'+
      '<div class="next-grid">'+projectCard(next,'next-main')+
      '<a class="all-projects-link" href="../#explorar">Explorar los 21 proyectos <span aria-hidden="true">↗</span></a></div>'+
    '</section>'+
  '</div>';
}

if(!project){
  document.title='Explora proyectos · AR Estudio';
  main.innerHTML='<section class="case-not-found container"><span>AR/ ARCHIVO DE PROYECTOS</span><h1>Elige por dónde empezar.</h1><p>Estos proyectos están documentados y puedes abrir cualquiera de ellos.</p>'+
    '<div class="related-grid">'+featured.map(p=>projectCard(p)).join('')+'</div>'+
    '<a href="../#explorar">Ver los 21 proyectos <span aria-hidden="true">↗</span></a></section>';
  document.querySelector('.case-header-nav').hidden=true;
} else {
  document.title=project.name+' — Historia y decisiones | AR Estudio';
  document.querySelector('meta[name="description"]').setAttribute('content',
    project.name+': '+project.summary+' Historia, decisiones, materiales y evidencia. AR Estudio.');
  document.documentElement.dataset.case=project.id;
  main.innerHTML=build(project);
}

document.querySelectorAll('img').forEach(img=>{
  img.addEventListener('error',()=>{
    if(img.closest('.art-frame'))img.closest('.art-frame').hidden=true;
    else if(img.closest('.browser-frame'))img.closest('.browser-frame').hidden=true;
    else if(img.classList.contains('visual-device-screen')){
      img.src=A(project.cover);img.classList.remove('visual-device-screen');
    } else if(img.closest('.evidence-shot'))img.closest('.evidence-shot').hidden=true;
    else img.hidden=true;
  },{once:true});
  if(img.complete&&img.naturalWidth===0)img.dispatchEvent(new Event('error'));
});

const progress=document.querySelector('#progress-bar');
let ticking=false;
function updateProgress(){
  if(ticking)return;ticking=true;
  requestAnimationFrame(()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    progress.style.transform='scaleX('+(max>0?Math.min(1,scrollY/max):0)+')';
    ticking=false;
  });
}
addEventListener('scroll',updateProgress,{passive:true});updateProgress();

if(!reduced&&window.gsap&&window.ScrollTrigger&&project){
  window.gsap.registerPlugin(window.ScrollTrigger);
  window.gsap.from('.case-intro h1',{y:22,opacity:.7,duration:.75,ease:'power3.out',clearProps:'all'});
  document.querySelectorAll('.decision').forEach(node=>{
    window.gsap.fromTo(node,{y:25,opacity:.7},{
      y:0,opacity:1,duration:.7,ease:'power3.out',clearProps:'all',
      scrollTrigger:{trigger:node,start:'top 91%',once:true}
    });
  });
}
