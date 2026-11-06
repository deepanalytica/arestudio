const $=(s)=>document.querySelector(s);
const $$=(s)=>Array.from(document.querySelectorAll(s));
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
/* Detecta fallos de entrega de CSS que las pruebas de contenido no observaban. */
function verifyBrandCSS(){
 const loaded=getComputedStyle(document.documentElement).getPropertyValue('--ar-brand-css-loaded').trim()==='1';
 if(loaded)return;
 const root=document.body.dataset.tokensUrl?.startsWith('../')?'../':'';
 const link=document.createElement('link');link.rel='stylesheet';
 link.href=root+'brand.css?v=2.2.2-retry';
 link.addEventListener('load',()=>{if(getComputedStyle(document.documentElement).getPropertyValue('--ar-brand-css-loaded').trim()!=='1')showStyleWarning()}, {once:true});
 link.addEventListener('error',showStyleWarning,{once:true});
 document.head.appendChild(link);
}
function showStyleWarning(){
 if(document.getElementById('brand-css-warning'))return;
 const notice=document.createElement('aside');notice.id='brand-css-warning';
 notice.setAttribute('role','alert');
 notice.style.cssText='position:relative;z-index:100;background:#EFFF38;color:#101729;padding:12px 20px;font:700 14px/1.5 system-ui,sans-serif;text-align:center';
 notice.textContent='No se pudieron cargar todos los estilos de AR Estudio. ';
 const link=document.createElement('a');link.href=location.pathname+'?v=2.2.2';
 link.textContent='Recargar la versión actual ↗';link.style.cssText='color:#101729;text-decoration:underline';
 notice.append(link);document.body.prepend(notice);
}
window.addEventListener('load',()=>setTimeout(verifyBrandCSS,80),{once:true});

let toastTimer;
function notify(message){
 const el=$('#toast');if(!el)return;
 el.textContent=message;el.classList.add('show');
 clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2300);
}
const menu=$('#brand-menu-toggle'),nav=$('#brand-nav');
function closeMenu(){if(!menu||!nav)return;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');nav.classList.remove('is-open')}
if(menu&&nav){
 menu.addEventListener('click',()=>{const opened=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!opened));menu.setAttribute('aria-label',opened?'Abrir menú':'Cerrar menú');nav.classList.toggle('is-open',!opened)});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
}
$$('[data-color]').forEach(el=>el.addEventListener('click',async()=>{
 const value=el.dataset.color;
 try{await navigator.clipboard.writeText(value);notify(value+' copiado')}catch{notify('Código de color: '+value)}
}));
function toRGB(hex){const s=hex.replace('#','');return [0,2,4].map(i=>parseInt(s.slice(i,i+2),16)/255)}
function luminance(hex){return toRGB(hex).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0)}
function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
const contrastFG=$('#contrast-fg'),contrastBG=$('#contrast-bg');
function updateContrast(){
 if(!contrastFG||!contrastBG)return;
 const fg=contrastFG.value,bg=contrastBG.value,ratio=contrast(fg,bg);
 const sample=$('#contrast-preview'),result=$('#contrast-result');sample.style.color=fg;sample.style.backgroundColor=bg;
 const normal=ratio>=4.5?'AA normal ✓':'AA normal ✕',large=ratio>=3?'AA grande ✓':'AA grande ✕';
 result.textContent=ratio.toFixed(2)+':1 · '+normal+' · '+large;
}
if(contrastFG&&contrastBG){contrastFG.addEventListener('change',updateContrast);contrastBG.addEventListener('change',updateContrast);updateContrast()}
async function initTokens(){
 const holder=$('#spacing-demo'),semantic=$('#semantic-list');
 if(!holder&&!semantic)return;
 try{
  const response=await fetch(document.body.dataset.tokensUrl||'tokens.json',{cache:'no-cache'});
  if(!response.ok)throw new Error('HTTP '+response.status);
  const data=await response.json();
  if(holder){
   const values=Object.entries(data.tokens).filter(([k,v])=>/^space-\d+$/.test(k)&&/^\d+px$/.test(v)).sort((a,b)=>parseInt(a[1])-parseInt(b[1]));
   const max=Math.max(...values.map(([,v])=>parseInt(v)));
   values.forEach(([name,v])=>{
    const row=document.createElement('div');row.className='spacing-item';
    const label=document.createElement('span');label.textContent=name;
    const track=document.createElement('div');
    const bar=document.createElement('div');bar.className='spacing-bar';bar.style.width=(parseInt(v)/max*100)+'%';
    track.append(bar);const measure=document.createElement('code');measure.textContent=v;row.append(label,track,measure);holder.append(row);
   });
  }
  if(semantic){
   semantic.replaceChildren();
   Object.entries(data.semantic).forEach(([name,ref])=>{
    const row=document.createElement('div');row.className='token-row';
    const key=document.createElement('code');key.textContent='--ar-'+name;
    const value=document.createElement('span');value.textContent=data.tokens[ref]||ref;
    row.append(key,value);semantic.append(row);
   });
  }
 }catch(error){if(holder)holder.textContent='No fue posible cargar la escala.';if(semantic)semantic.textContent='No fue posible cargar los tokens.';console.warn('AR tokens',error)}
}
initTokens();
$$('.chip').forEach(el=>el.addEventListener('click',()=>{
 $$('.chip').forEach(x=>x.setAttribute('aria-pressed','false'));el.setAttribute('aria-pressed','true');
 notify('Estado seleccionado: '+el.textContent.trim());
}));
$('#demo-action')?.addEventListener('click',()=>notify('Acción primaria activada'));
$('#demo-secondary')?.addEventListener('click',()=>notify('Acción secundaria activada'));
$('#validate-email')?.addEventListener('click',()=>{
 const field=$('#demo-field'),feedback=$('#field-feedback');
 const valid=field.value.trim()!==''&&field.checkValidity();
 field.setAttribute('aria-invalid',String(!valid));
 feedback.textContent=valid?'Correo válido · estado success':'Introduce un correo válido · estado error';
 feedback.style.color=valid?'var(--ar-success)':'var(--ar-error)';
});
$('#loading-demo')?.addEventListener('click',()=>{
 const el=$('#loading-demo'),feedback=$('#loading-feedback');
 el.disabled=true;el.textContent='Cargando…';el.setAttribute('aria-busy','true');
 feedback.textContent='Simulación de carga';
 setTimeout(()=>{el.disabled=false;el.textContent='Probar loading ↻';el.setAttribute('aria-busy','false');feedback.textContent='Simulación finalizada'},950);
});
function replay(){
 const el=$('#motion-target');if(!el)return;
 if(reduce.matches){notify('Movimiento reducido activado');return}
 if(window.gsap)window.gsap.fromTo(el,{x:-34,rotation:-11,opacity:.36,scale:.86},{x:0,rotation:0,opacity:1,scale:1,duration:.74,ease:'power4.out',overwrite:'auto'});
 else el.animate([{transform:'translateX(-34px) rotate(-11deg) scale(.86)',opacity:.36},{transform:'none',opacity:1}],{duration:740,easing:'cubic-bezier(.22,1,.36,1)'});
}
$('#replay')?.addEventListener('click',replay);
if(!reduce.matches&&window.gsap&&$('.hero-copy h1')){
 window.gsap.from('.hero-copy h1,.hero-copy .hero-summary',{y:18,opacity:.5,duration:.7,stagger:.12,ease:'power4.out',clearProps:'all'});
}
/* Una escultura del slash en 3D. Mejora progresiva: la identidad permanece sin WebGL. */
async function initBrand3D(){
 const host=$('#three-host');
 if(!host||reduce.matches||innerWidth<1024||navigator.connection?.saveData||!window.WebGLRenderingContext)return;
 let renderer,geom,mat,mesh,observer,raf=0,visible=false,disposed=false,resize;
 try{
  const THREE=await import('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js');
  if(reduce.matches||disposed)return;
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(42,1,.1,100);
  camera.position.z=8;
  renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.25));renderer.domElement.setAttribute('aria-hidden','true');
  host.append(renderer.domElement);
  const sculpture=new THREE.Group();scene.add(sculpture);
  geom=new THREE.BoxGeometry(.4,5.6,.42);mat=new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true,transparent:true,opacity:.7});
  mesh=new THREE.Mesh(geom,mat);mesh.rotation.z=-.43;sculpture.add(mesh);sculpture.position.set(2,-.2,0);
  resize=()=>{if(disposed)return;const w=host.clientWidth,h=host.clientHeight;camera.aspect=w/Math.max(1,h);camera.updateProjectionMatrix();renderer.setSize(w,h,false)};
  resize();
  let frame=0;
  function tick(){if(!visible||document.hidden||disposed)return;sculpture.rotation.y=Math.sin(frame*.005)*.24;sculpture.rotation.x=Math.cos(frame*.004)*.11;renderer.render(scene,camera);frame++;raf=requestAnimationFrame(tick)}
  observer=new IntersectionObserver(entries=>{visible=!!entries[0]?.isIntersecting;cancelAnimationFrame(raf);if(visible)tick()},{threshold:.05});
  observer.observe(host);addEventListener('resize',resize,{passive:true});
  const visibility=()=>{cancelAnimationFrame(raf);if(!document.hidden&&visible)tick()};
  document.addEventListener('visibilitychange',visibility);
  addEventListener('pagehide',()=>{disposed=true;cancelAnimationFrame(raf);observer.disconnect();removeEventListener('resize',resize);document.removeEventListener('visibilitychange',visibility);geom.dispose();mat.dispose();renderer.dispose();renderer.domElement.remove()},{once:true});
 }catch(error){if(geom)geom.dispose();if(mat)mat.dispose();if(renderer){renderer.dispose();renderer.domElement.remove()}}
}
initBrand3D();
