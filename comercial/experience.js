/* AR/ Estudio — commercial navigation, accessible service selector & storytelling. */
(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const icon = (name, className = '') => `<svg class="ico ${className}" aria-hidden="true"><use href="#ico-${name}"/></svg>`;
  const serviceItems = [
    { id: 'redes', label: 'Gestión de redes sociales', over: 'REDES SOCIALES + CONTENIDOS', title: 'Que tus redes cuenten algo que valga la pena.', text: 'Planificamos las publicaciones, creamos contenido y damos coherencia a tu presencia digital.', tags: ['Plan de contenidos', 'Publicaciones', 'Reels'], preview: `
      <div class="preview social-preview"><div class="social-phone"><div class="social-handle">tunegocio.cl <span style="margin-left:auto;color:#8397b5">•••</span></div><div class="social-image-grid"><span></span><span></span><span></span><span></span><span></span><span></span></div><div style="height:5px;width:60%;background:#edf1f8;margin-top:8px;border-radius:5px"></div></div><div class="social-floating">TU MARCA<br><b>CON<br>IDEAS.</b></div><span class="social-caption">FEED CON IDENTIDAD</span></div>` },
    { id: 'marca', label: 'Creación de marca e identidad visual', over: 'ESTRATEGIA + IDENTIDAD', title: 'Una marca que se reconozca a primera vista.', text: 'Definimos su personalidad visual: logo, colores, tipografías y aplicaciones para tu negocio.', tags: ['Identidad visual', 'Logo', 'Sistema gráfico'], preview: `<div class="preview brand-preview"><div class="brand-monogram">M<span>✳</span></div><div class="brand-stickers"><i></i><i></i><i></i></div><span class="brand-stamp">MARCA / SISTEMA</span></div>` },
    { id: 'graficas', label: 'Gráficas y videos para redes sociales', over: 'CREATIVIDAD + PRODUCCIÓN', title: 'Piezas que hacen detener el dedo.', text: 'Diseñamos gráficas, carruseles, videos cortos y creatividades adaptadas a cada formato.', tags: ['Posts y carruseles', 'Reels', 'Creativos publicitarios'], preview: `<div class="preview graphics-preview"><div class="graphics-sheet"><small>EDICIÓN / 01</small><strong>HOLA<br>IDEAS.</strong><i></i></div><div class="graphics-sheet"><small>NUEVA COLECCIÓN</small><strong>MIRA<br>ESTO.</strong><i></i></div><div class="graphics-sheet"><small>TU NEGOCIO</small><strong>DALE<br>COLOR.</strong><i></i></div></div>` },
    { id: 'ads', label: 'Publicidad pagada y captación de clientes', over: 'META ADS + CAPTACIÓN', title: 'De ver un anuncio a pedir información.', text: 'Conectamos los anuncios con una oferta clara, una landing y un canal de consultas que puedas medir.', tags: ['Meta Ads', 'Anuncios creativos', 'Landing + seguimiento'], preview: `<div class="preview ads-preview"><div class="ads-flow"><div class="ads-flow-item"><b>ANUNCIO</b><span></span><em>La atención</em></div>${icon('arrow-right','ads-flow-arrow')}<div class="ads-flow-item"><b>LANDING</b><span></span><em>La oferta</em></div>${icon('arrow-right','ads-flow-arrow')}<div class="ads-flow-item"><b>CONTACTO</b><span></span><em>La consulta</em></div></div></div>` },
    { id: 'chatbots', label: 'Chatbots y automatización para WhatsApp', over: 'WHATSAPP + AUTOMATIZACIÓN', title: 'Respuestas más rápidas, incluso cuando estás ocupado.', text: 'Diseñamos flujos de atención, preguntas frecuentes y derivación a una persona cuando sea necesario.', tags: ['WhatsApp Business', 'Chatbots', 'Flujos de atención'], preview: `<div class="preview chat-preview"><div class="chat-window"><div class="chat-header">Atención del negocio <span style="margin-left:auto;opacity:.7">●</span></div><div class="chat-body"><div class="chat-bubble self">Hola, ¿tienen disponibilidad?</div><div class="chat-bubble">¡Hola! 👋 ¿Qué servicio necesitas?</div><div class="chat-bubble">1. Cotizar &nbsp; 2. Agendar &nbsp; 3. Hablar con alguien</div></div></div><span class="chat-note">EJEMPLO DE FLUJO</span></div>` },
    { id: 'web', label: 'Página web o landing page', over: 'DISEÑO WEB + EXPERIENCIA', title: 'Una web que explique y facilite el siguiente paso.', text: 'Construimos sitios claros, rápidos y adaptados al móvil. También diseñamos interfaces intuitivas para aplicaciones y paneles de negocio.', tags: ['Web responsive', 'Landing', 'UX/UI de apps'], preview: `<div class="preview web-preview"><div class="web-window"><div class="web-browserbar"><span>● ● ●</span><span>tunegocio.cl</span><span>⌕</span></div><div class="web-window-body"><div class="web-window-copy"><small>HECHO PARA TI</small><strong>LO BUENO<br>SE NOTA.</strong><span>Conocer servicios ↗</span></div><div class="web-window-visual"><i></i></div></div></div></div>` },
    { id: 'tienda', label: 'Tienda online con carrito y pasarelas de pago', over: 'E-COMMERCE + COMPRAS', title: 'Tu catálogo, carrito y pagos en un mismo lugar.', text: 'Diseñamos tiendas con fichas de producto, carrito, métodos de pago y procesos de compra configurables.', tags: ['Catálogo y carrito', 'Pasarelas de pago', 'Shopify / integración'], preview: `<div class="preview shop-preview"><div class="shop-window"><div class="shop-header"><span>TIENDA.</span><small>PRODUCTOS &nbsp; ♡ &nbsp; 🛒</small></div><div class="shop-body"><div class="shop-product"></div><div class="shop-details"><strong>Tu producto<br>especial</strong><small>Un detalle que enamora</small><div class="shop-pills"><i></i><i></i><i></i></div><div class="shop-button">AGREGAR AL CARRITO ↗</div></div></div></div><span class="shop-toast">✓ LISTO PARA COMPRAR</span></div>` },
    { id: 'datos', label: 'Análisis de datos y embudos de captación', over: 'DATOS + DECISIONES', title: 'Menos suposiciones, más información útil.', text: 'Organizamos indicadores, visualizamos el recorrido de clientes y detectamos oportunidades para mejorar.', tags: ['Dashboards', 'Embudos', 'Automatizaciones'], preview: `<div class="preview data-preview"><div class="data-window"><div class="data-nav"><span>TU NEGOCIO / PANEL</span><span>● ● ●</span></div><div class="data-panels"><div class="data-box"><small>Visitas / ejemplo</small><strong>•••</strong></div><div class="data-box"><small>Tendencia ilustrativa</small><div class="data-bars"><i></i><i></i><i></i><i></i><i></i><i></i></div></div><div class="data-line"></div></div></div><span class="data-stamp">DATOS DEMOSTRATIVOS</span></div>` }
  ];
  const byId = Object.fromEntries(serviceItems.map((s, i) => [s.id, { ...s, index: i }]));
  const stage = $('#detail-stage'), visual = $('#stage-visual');
  let currentService = 'redes';
  function selectService(key, options = {}) {
    const s = byId[key]; if (!s) return;
    currentService = key;
    $$('.solution-tile').forEach(btn => {
      const selected = btn.dataset.service === key;
      btn.classList.toggle('is-selected', selected);
      btn.setAttribute('aria-pressed', String(selected));
    });
    const replace = () => {
      stage.dataset.active = key;
      $('#stage-overline').textContent = s.over;
      $('#stage-counter').textContent = `${String(s.index + 1).padStart(2, '0')} / 08`;
      $('#stage-title').textContent = s.title;
      $('#stage-text').textContent = s.text;
      $('#stage-tags').replaceChildren(...s.tags.map(label => {
        const span = document.createElement('span'); span.textContent = label; return span;
      }));
      $('#stage-link').dataset.service = s.label;
      $('#stage-link').setAttribute('aria-label', `Consultar por ${s.label}`);
      visual.innerHTML = s.preview;
      const note = document.createElement('span');
      note.className = 'preview-note'; note.textContent = 'VISTA ILUSTRATIVA';
      note.style.cssText = 'position:absolute;bottom:1px;left:1px;letter-spacing:.12em;font:8px "IBM Plex Mono",monospace;color:#a2b4ea;pointer-events:none';
      visual.appendChild(note);
    };
    if (window.gsap && !reduce && options.animate !== false) {
      const target = $('#stage-title');
      window.gsap.killTweensOf([visual,target]);
      window.gsap.to([visual,target], {opacity:0,y:8,duration:.13,overwrite:true,onComplete:() => {
        replace();
        window.gsap.fromTo([visual,target], {opacity:0,y:13}, {opacity:1,y:0,stagger:.05,duration:.42,ease:'power2.out',clearProps:'all'});
      }});
    } else replace();
    if (options.scroll && window.matchMedia('(max-width:850px)').matches) {
      stage.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});
    }
  }
  $$('.solution-tile').forEach(btn => btn.addEventListener('click',() => selectService(btn.dataset.service,{scroll:true})));
  selectService(currentService,{animate:false});
  function preselect(service) {
    const select = $('#lead-service');
    if (select && [...select.options].some(opt => opt.value === service)) select.value = service;
    $('#contacto')?.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
    if (select) setTimeout(() => select.focus({preventScroll:true}),reduce?0:500);
  }
  $('#stage-link')?.addEventListener('click',e=>{e.preventDefault();preselect(e.currentTarget.dataset.service)});
  // Four explicit, navigable mini-stories. No fabricated sales metrics.
  const journey=[
    {key:'01 · ATRACCIÓN',title:'Una persona descubre tu anuncio o contenido.',text:'Llamamos la atención con un mensaje claro y una pieza visual pensada para el público correcto.',visual:`<div class="journey-demo"><div class="demo-card demo-ad"><span class="ad-kicker">TU MARCA / SOCIAL</span><span class="ad-hero">HAY<br>ALGO<br>NUEVO.</span><small>DESCUBRE →</small></div><span class="demo-icon">${icon('megaphone')}</span></div>`},
    {key:'02 · PRESENTACIÓN',title:'Entra a una página donde entiende qué ofreces.',text:'Una identidad coherente y una web clara responden sus dudas antes de que tenga que preguntar.',visual:`<div class="journey-demo"><div class="demo-card demo-web"><div class="demo-browser">● ● ● &nbsp; tunegocio.cl</div><div class="demo-web-main"><div class="demo-web-title"><strong>BIENVENIDO<br>A LO BUENO.</strong><small>Conoce lo que hacemos →</small></div><div class="demo-web-blob"></div></div></div></div>`},
    {key:'03 · CONVERSIÓN',title:'Puede escribirte o completar una compra.',text:'Conectamos el llamado a la acción con WhatsApp, un formulario, el carrito o una pasarela de pago.',visual:`<div class="journey-demo"><div class="demo-card demo-wa"><strong>◉ &nbsp; Tu negocio</strong><p>Hola, quiero cotizar 👋</p><p class="wa-answer">¡Hola! Cuéntanos qué necesitas y te ayudamos.</p></div></div>`},
    {key:'04 · APRENDIZAJE',title:'Revisas lo que ocurrió y decides qué mejorar.',text:'Observamos consultas, eventos y resultados disponibles. Una mejora útil empieza con una medición honesta.',visual:`<div class="journey-demo"><div class="demo-card demo-charts"><div class="demo-metric"><small>Tráfico</small><b>↗</b></div><div class="demo-metric"><small>Consultas</small><b>→</b></div><div class="demo-graph"><i></i><i></i><i></i><i></i><i></i><i></i></div></div><span style="position:absolute;bottom:-4px;color:#bbc6eb;font-size:9px">ESQUEMA ILUSTRATIVO · SIN MÉTRICAS REALES</span></div>`}
  ];
  let step=0;
  function updateJourney(next) {
    step=(next+journey.length)%journey.length;
    const s=journey[step];
    $$('.journey-step').forEach((el,i)=>{const active=i===step;el.classList.toggle('is-current',active);el.setAttribute('aria-pressed',String(active));});
    $('#journey-count').textContent=`PASO ${String(step+1).padStart(2,'0')} / 04`;
    $('#journey-kicker').textContent=s.key;
    $('#journey-caption').textContent=s.title;
    $('#journey-description').textContent=s.text;
    $('#journey-illustration').innerHTML=s.visual;
    $$('.journey-dots span').forEach((x,i)=>x.classList.toggle('active',i===step));
    if(!reduce && window.gsap)window.gsap.fromTo('#journey-illustration > *',{autoAlpha:0,y:20,rotate:-2},{autoAlpha:1,y:0,rotate:0,duration:.46,ease:'power2.out'});
  }
  $$('.journey-step').forEach(btn=>btn.addEventListener('click',()=>updateJourney(Number(btn.dataset.step))));
  $('#journey-next')?.addEventListener('click',()=>updateJourney(step+1));
  $('#journey-prev')?.addEventListener('click',()=>updateJourney(step-1));
  updateJourney(0);
  // Mobile navigation.
  const toggle=$('#menu-toggle'),nav=$('#mobile-links');
  const setMenu=open=>{toggle?.setAttribute('aria-expanded',String(open));toggle?.setAttribute('aria-label',open?'Cerrar navegación':'Abrir navegación');if(nav)nav.hidden=!open;document.body.classList.toggle('menu-open',open)};
  toggle?.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
  $$('.mobile-links a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
  window.addEventListener('resize',()=>{if(window.innerWidth>850)setMenu(false)},{passive:true});
  const y=$('#year');if(y)y.textContent=String(new Date().getFullYear());
  // Only create a WhatsApp message. No local submission, storage or CRM claim.
  $('#lead-form')?.addEventListener('submit',e=>{
    e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;
    const val=id=>($(id)?.value||'').trim();
    const message=['Hola, vi AR Estudio y quiero conversar sobre mi negocio.',`Mi nombre: ${val('#lead-name')}`,val('#lead-business')?`Negocio: ${val('#lead-business')}`:'',`Servicio: ${val('#lead-service')}`,`Lo que necesito: ${val('#lead-goal')}`];
    const utm=new URLSearchParams(window.location.search);
    ['utm_source','utm_medium','utm_campaign','utm_content'].forEach(k=>{const v=utm.get(k)?.replace(/[\r\n\t]/g,' ').trim().slice(0,64);if(v)message.push(`${k}: ${v}`)});
    window.location.href='https://wa.me/56958039450?text='+encodeURIComponent(message.filter(Boolean).join('\n'));
  });
  // Spotlight / revealing content: effects do not hide content if animation libraries fail.
  if(!reduce && window.gsap && window.ScrollTrigger){
    const gsap=window.gsap;gsap.registerPlugin(window.ScrollTrigger);
    gsap.fromTo('.hero-intro .intro-copy > *',{autoAlpha:0,y:17},{autoAlpha:1,y:0,stagger:.095,duration:.8,ease:'power3.out',clearProps:'all'});
    gsap.fromTo('.solution-tile',{autoAlpha:0,y:20},{autoAlpha:1,y:0,stagger:.043,duration:.57,delay:.18,ease:'power3.out',clearProps:'all'});
    ['.journey-left h2','.journey-left>p','.journey-canvas','.work-heading','.work-card','.contact-copy','.contact-form'].forEach(sel=>{
      $$(sel).forEach(el=>gsap.fromTo(el,{autoAlpha:0,y:30},{scrollTrigger:{trigger:el,start:'top 93%',once:true},autoAlpha:1,y:0,duration:.68,ease:'power2.out',clearProps:'all'}));
    });
  }
  if(!reduce && matchMedia('(hover:hover) and (pointer:fine)').matches){
    $$('.solution-tile').forEach(btn=>btn.addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect();btn.style.setProperty('--px',`${e.clientX-r.left}px`);btn.style.setProperty('--py',`${e.clientY-r.top}px`)},{passive:true}));
  }
  // GPU-limited optional 3D orbital field. Lazy, decorative, absent on mobile and reduced motion.
  const canvas=$('#stage-three');
  if(canvas && !reduce && matchMedia('(hover:hover) and (pointer:fine)').matches && innerWidth>=1100){
    let supportsWebGL=false;
    try{const c=document.createElement('canvas');supportsWebGL=!!(c.getContext('webgl2',{failIfMajorPerformanceCaveat:true})||c.getContext('webgl',{failIfMajorPerformanceCaveat:true}));}catch(_){supportsWebGL=false;}
    if(supportsWebGL){
      const start=()=>import('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js').then(T=>{
        const renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:false,powerPreference:'low-power'});
        renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.35));
        const scene=new T.Scene(),camera=new T.PerspectiveCamera(42,1,.1,100);camera.position.set(0,0,13);
        const group=new T.Group();scene.add(group);
        const g=new T.TorusGeometry(3.2,.012,4,100);
        const ring=new T.Mesh(g,new T.MeshBasicMaterial({color:0x90aaff,transparent:true,opacity:.34}));ring.rotation.x=.8;group.add(ring);
        const ring2=new T.Mesh(new T.TorusGeometry(2.35,.012,4,100),new T.MeshBasicMaterial({color:0xb69fff,transparent:true,opacity:.24}));ring2.rotation.y=.68;group.add(ring2);
        const resize=()=>{const r=canvas.getBoundingClientRect();renderer.setSize(Math.max(r.width,1),Math.max(r.height,1),false);camera.aspect=Math.max(r.width,1)/Math.max(r.height,1);camera.updateProjectionMatrix()};resize();window.addEventListener('resize',resize,{passive:true});
        let active=true,last=0,disposed=false;const watcher=new IntersectionObserver(e=>{active=e[0].isIntersecting},{threshold:.01});watcher.observe(canvas);
        canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();disposed=true;canvas.hidden=true},{once:true});
        function tick(t){if(disposed)return;requestAnimationFrame(tick);if(!active||document.hidden||t-last<45)return;last=t;group.rotation.z+=.0013;renderer.render(scene,camera)}requestAnimationFrame(tick);
      }).catch(()=>{canvas.hidden=true});
      if('requestIdleCallback' in window)requestIdleCallback(start,{timeout:3000});else setTimeout(start,1300);
    }
  }
})();