const $=(s)=>document.querySelector(s), $$=(s)=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let toastTimer;
function notify(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2200)}
$$('[data-color]').forEach(el=>el.addEventListener('click',async()=>{const value=el.dataset.color;try{await navigator.clipboard.writeText(value);notify('Color '+value+' copiado')}catch{notify('Código: '+value)}}));
const sizes=[4,8,12,16,20,24,32,48,64,96];const space=$('#spacing-demo');
sizes.forEach(v=>{const row=document.createElement('div');row.className='spacing-item';const label=document.createElement('span');label.textContent='space-'+v;const bar=document.createElement('i');bar.style.width=v*2+'px';const value=document.createElement('code');value.textContent=v+'px';row.append(label,bar,value);space.append(row)});
$$('.chip').forEach(el=>el.addEventListener('click',()=>{$$('.chip').forEach(x=>x.setAttribute('aria-pressed','false'));el.setAttribute('aria-pressed','true');notify('Seleccionado: '+el.textContent.trim())}));
$('#demo-action').addEventListener('click',()=>notify('Acción primaria activada'));
$('#demo-secondary').addEventListener('click',()=>notify('Acción secundaria activada'));
$('#validate-email').addEventListener('click',()=>{const field=$('#demo-field'),feedback=$('#field-feedback'),valid=field.value.trim()!==''&&field.checkValidity();field.setAttribute('aria-invalid',String(!valid));feedback.textContent=valid?'Correo válido · estado success':'Introduce un correo válido · estado error';feedback.style.color=valid?'var(--ar-success)':'var(--ar-error)'});
function replay(){const el=$('#motion-target');if(reduce.matches){notify('Movimiento reducido activado');return}if(window.gsap){window.gsap.fromTo(el,{x:-28,rotation:-14,opacity:.5,scale:.85},{x:0,rotation:0,opacity:1,scale:1,duration:.74,ease:'power4.out',overwrite:'auto'})}else{el.animate([{transform:'translateX(-28px) rotate(-14deg) scale(.85)',opacity:.5},{transform:'none',opacity:1}],{duration:740,easing:'cubic-bezier(.22,1,.36,1)'})}}
$('#replay').addEventListener('click',replay);
if(!reduce.matches&&window.gsap){window.gsap.from('.hero h1,.hero .lead',{y:13,opacity:.75,duration:.58,stagger:.08,ease:'power4.out',clearProps:'all'})}
async function initThree(){
  if(reduce.matches||!window.WebGLRenderingContext||innerWidth<1024||navigator.connection?.saveData)return;
  const host=$('#hero-art');if(!host)return;
  let renderer,geom,mat,mesh,raf=0,active=true;
  try{
    const THREE=await import('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js');
    const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(45,1,.1,100);camera.position.z=8;
    renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.4));renderer.domElement.setAttribute('aria-hidden','true');host.insertBefore(renderer.domElement,host.firstChild);
    geom=new THREE.TorusKnotGeometry(1.55,.28,90,9,2,3);mat=new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true,transparent:true,opacity:.42});mesh=new THREE.Mesh(geom,mat);scene.add(mesh);
    const resize=()=>{const w=host.clientWidth,h=host.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false)};resize();
    const observer=new IntersectionObserver(entries=>{active=entries[0]?.isIntersecting??false;if(active)tick()},{threshold:.04});observer.observe(host);
    let frame=0;const tick=()=>{cancelAnimationFrame(raf);if(!active||document.hidden)return;mesh.rotation.y=frame*.002;mesh.rotation.z=frame*.001;renderer.render(scene,camera);frame++;raf=requestAnimationFrame(tick)};
    const visibility=()=>{if(document.hidden)cancelAnimationFrame(raf);else if(active)tick()};document.addEventListener('visibilitychange',visibility);addEventListener('resize',resize,{passive:true});tick();
    addEventListener('pagehide',()=>{active=false;cancelAnimationFrame(raf);observer.disconnect();removeEventListener('resize',resize);document.removeEventListener('visibilitychange',visibility);geom.dispose();mat.dispose();renderer.dispose();renderer.domElement.remove()},{once:true});
  }catch(e){if(geom)geom.dispose();if(mat)mat.dispose();if(renderer){renderer.dispose();renderer.domElement.remove()}}
}
initThree();
