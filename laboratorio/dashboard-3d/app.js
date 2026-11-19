const ZONAS=[
{id:'captacion',numero:'01',nombre:'Captación',x:-8,color:0x245bff,tipo:'antena',tope:600},
{id:'diagnostico',numero:'02',nombre:'Diagnóstico',x:-4,color:0x6236ff,tipo:'servidor',tope:140},
{id:'produccion',numero:'03',nombre:'Producción',x:0,color:0xf12bbe,tipo:'taller',tope:65},
{id:'activacion',numero:'04',nombre:'Activación',x:4,color:0xff652f,tipo:'cohete',tope:20},
{id:'medicion',numero:'05',nombre:'Medición',x:8,color:0xefff38,tipo:'grafico',tope:10}
];
const PREFIERE_MENOS_MOVIMIENTO=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=selector=>document.querySelector(selector);
let datos=new Map(),escenario='base',fuente='Simulación CSV',seleccion='captacion',sync3D=()=>{},reiniciarCamara=()=>{};
function csvFilas(texto){
 const lineas=texto.replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n').split('\n').filter(l=>l.trim());
 if(!lineas.length)throw new Error('CSV vacío.');
 const sep=lineas[0].includes(';')?';':',';
 function partir(linea){let celdas=[],actual='',comillas=false;
  for(let i=0;i<linea.length;i++){const ch=linea[i];
   if(ch==='"'){if(comillas&&linea[i+1]==='"'){actual+='"';i++;}else comillas=!comillas;}
   else if(ch===sep&&!comillas){celdas.push(actual.trim());actual='';}
   else actual+=ch;
  }if(comillas)throw new Error('Comillas sin cerrar.');celdas.push(actual.trim());return celdas;
 }
 const cabecera=partir(lineas.shift()).map(v=>v.toLowerCase());
 const columnas=['id','nombre','valor','unidad','estado','descripcion','accion'];
 if(columnas.some((col,i)=>cabecera[i]!==col))throw new Error('Se esperan columnas: '+columnas.join(', '));
 const resultados=new Map();
 for(const linea of lineas){const valores=partir(linea);if(valores.length!==columnas.length)throw new Error('Fila con número incorrecto de columnas.');
  const d=Object.fromEntries(columnas.map((k,i)=>[k,valores[i]]));
  if(!ZONAS.some(z=>z.id===d.id)||resultados.has(d.id))throw new Error('Estación desconocida o repetida: '+d.id);
  d.valor=Number(d.valor.replace(',','.'));
  if(!Number.isFinite(d.valor)||d.valor<0||d.valor>1e9)throw new Error('Valor numérico inválido: '+d.id);
  if(!['normal','atencion','parada'].includes(d.estado))throw new Error('Estado inválido: '+d.id);
  resultados.set(d.id,d);
 }
 if(resultados.size!==ZONAS.length)throw new Error('Deben existir las cinco estaciones.');
 return resultados;
}
async function cargarEscenario(nombre){
 const respuesta=await fetch('datos/'+nombre+'.csv',{cache:'no-store'});
 if(!respuesta.ok)throw new Error('No se pudo cargar el archivo CSV.');
 const texto=await respuesta.text();datos=csvFilas(texto);escenario=nombre;fuente='Simulación CSV';
 document.querySelectorAll('[data-scenario]').forEach(b=>{const activo=b.dataset.scenario===nombre;b.classList.toggle('active',activo);b.setAttribute('aria-pressed',String(activo));});
 $('#file-status').textContent='Escenario '+(nombre==='base'?'estable':'bajo presión')+' cargado · datos ficticios.';
 pintar();
}
function formato(valor){return new Intl.NumberFormat('es-CL',{maximumFractionDigits:1}).format(valor)}
function pintar(){
 const d=datos.get(seleccion);if(!d)return;
 const z=ZONAS.find(z=>z.id===seleccion);
 $('#station-number').textContent=z.numero;
 $('#station-name').textContent=d.nombre;
 $('#station-value').textContent=formato(d.valor);
 $('#station-unit').textContent=d.unidad;
 $('#station-description').textContent=d.descripcion;
 $('#station-action').textContent=d.accion;
 $('#station-source').textContent=fuente;
 const estado=$('#panel-state');estado.className='panel-state '+(d.estado==='atencion'?'attention':d.estado==='parada'?'stopped':'');
 estado.textContent=d.estado==='normal'?'OPERACIÓN NORMAL':d.estado==='atencion'?'REQUIERE ATENCIÓN':'OPERACIÓN DETENIDA';
 const barra=$('#bar-fill');barra.style.width=Math.max(3,Math.min(100,d.valor/z.tope*100))+'%';
 barra.style.background=d.estado==='atencion'?'#FF652F':d.estado==='parada'?'#F12BBE':'#245BFF';
 const alertas=[...datos.values()].filter(v=>v.estado!=='normal').length;
 $('#alert-count').textContent=String(alertas).padStart(2,'0');
 $('#flow-status').textContent=[...datos.values()].some(v=>v.estado==='parada')?'Detenido':alertas?'En riesgo':'Estable';
 document.querySelectorAll('[data-station]').forEach(b=>{const activo=b.dataset.station===seleccion;b.classList.toggle('active',activo);b.setAttribute('aria-pressed',String(activo));});
 sync3D();
}
function seleccionar(id){if(!datos.has(id))return;seleccion=id;pintar();}
document.querySelectorAll('[data-station]').forEach(b=>b.addEventListener('click',()=>seleccionar(b.dataset.station)));
document.querySelectorAll('[data-scenario]').forEach(b=>b.addEventListener('click',async()=>{
 try{await cargarEscenario(b.dataset.scenario)}catch(e){$('#file-status').textContent=e.message}
}));
$('#csv-input').addEventListener('change',async event=>{
 const archivo=event.target.files?.[0];if(!archivo)return;
 if(archivo.size>500000){$('#file-status').textContent='El CSV debe pesar menos de 500 KB.';return}
 try{datos=csvFilas(await archivo.text());fuente='CSV local (no enviado)';$('#file-status').textContent='CSV local cargado: '+archivo.name+'. Nada fue enviado a un servidor.';
 document.querySelectorAll('[data-scenario]').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false');});pintar();}
 catch(e){$('#file-status').textContent='Error en CSV: '+e.message}
 event.target.value='';
});
$('#reset-camera').addEventListener('click',()=>reiniciarCamara());
cargarEscenario('base').catch(e=>{$('#file-status').textContent='No fue posible cargar el CSV. Sirve el sitio con un servidor web: '+e.message;});
async function iniciarMundo(){
 try{
 const THREE=await import('three');
 const {OrbitControls}=await import('three/addons/controls/OrbitControls.js');
 const canvas=$('#scene'),envoltorio=$('#canvas-wrap');
 const gl=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'default'});
 gl.setPixelRatio(Math.min(devicePixelRatio,1.7));gl.setClearColor(0x101729,0);
 gl.outputColorSpace=THREE.SRGBColorSpace;
 const escena=new THREE.Scene();escena.fog=new THREE.Fog(0x111a2c,29,65);
 const camara=new THREE.OrthographicCamera(-15,15,10,-10,.1,150);camara.position.set(21,24,27);
 const puntoObjetivo=new THREE.Vector3(0,.7,0);camara.lookAt(puntoObjetivo);
 const orbit=new OrbitControls(camara,canvas);orbit.enableDamping=true;orbit.dampingFactor=.065;orbit.enablePan=false;orbit.maxPolarAngle=Math.PI/2.35;orbit.minPolarAngle=.25;orbit.minZoom=.75;orbit.maxZoom=2.5;orbit.target.copy(puntoObjetivo);
 const luz=new THREE.HemisphereLight(0xd6e6ff,0x30476a,2.5);escena.add(luz);
 const principal=new THREE.DirectionalLight(0xffffff,3.2);principal.position.set(-6,17,14);escena.add(principal);
 const relleno=new THREE.PointLight(0x436bff,65,35);relleno.position.set(3,8,-5);escena.add(relleno);
 const material=(color,extra={})=>new THREE.MeshStandardMaterial({color,metalness:.38,roughness:.33,...extra});
 const caja=(padre,x,y,z,ax,ay,az,color,extra={})=>{const m=new THREE.Mesh(new THREE.BoxGeometry(ax,ay,az),material(color,extra));m.position.set(x,y,z);padre.add(m);return m};
 const cilindro=(padre,x,y,z,r1,r2,alto,color,lados=20)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,alto,lados),material(color));m.position.set(x,y,z);padre.add(m);return m};
 const esfera=(padre,x,y,z,r,color)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(r,18,12),material(color,{emissive:color,emissiveIntensity:.25}));m.position.set(x,y,z);padre.add(m);return m};
 function aro(padre,x,y,z,radio,color,giroX=Math.PI/2){const m=new THREE.Mesh(new THREE.TorusGeometry(radio,.07,8,38),material(color,{emissive:color,emissiveIntensity:.25}));m.position.set(x,y,z);m.rotation.x=giroX;padre.add(m);return m}
 const piso=caja(escena,0,-.6,0,22,.22,8,0x182943,{metalness:.08,roughness:.75});piso.rotation.y=0;
 for(let x=-11;x<=11;x++){const linea=caja(escena,x,-.45,0,.015,.01,8,0x25436a,{emissive:0x245bff,emissiveIntensity:.08});linea.material.transparent=true;linea.material.opacity=.35}
 for(let z=-4;z<=4;z++){const linea=caja(escena,0,-.44,z,22,.01,.014,0x25436a);linea.material.transparent=true;linea.material.opacity=.22}
 const estaciones=new Map(),animados=[];
 const etiqueta=(padre,nombre,color)=>{
 const c=document.createElement('canvas');c.width=320;c.height=72;const ctx=c.getContext('2d');ctx.clearRect(0,0,320,72);ctx.fillStyle='#152a4e';ctx.fillRect(0,0,320,72);ctx.fillStyle='#ffffff';ctx.font='bold 29px Arial';ctx.textAlign='center';ctx.fillText(nombre.toUpperCase(),160,47);const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;
 const placa=new THREE.Mesh(new THREE.PlaneGeometry(2.85,.64),new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.DoubleSide}));placa.position.set(0,3.45,.14);placa.rotation.y=0;padre.add(placa);
 };
 function estación(z){
 const g=new THREE.Group();g.position.set(z.x,0,0);g.userData.station=z.id;escena.add(g);
 const base=caja(g,0,-.12,0,3.25,.35,4.45,0x304e79,{metalness:.5});
 caja(g,0,.08,0,2.95,.12,4.12,z.color,{emissive:z.color,emissiveIntensity:.28});
 caja(g,0,.22,0,2.72,.26,3.82,0x172744);
 let rotor=null;
 if(z.tipo==='antena'){
 cilindro(g,0,.55,0,.68,.87,.65,0x5175b6);cilindro(g,0,1.4,0,.14,.19,1.25,0xb1c5ed);
 const plato=new THREE.Mesh(new THREE.SphereGeometry(.93,22,11,0,Math.PI*2,0,Math.PI*.5),material(0x729cff,{side:THREE.DoubleSide}));plato.position.set(0,2.1,0);plato.rotation.x=.4;g.add(plato);rotor=aro(g,0,2.15,0,1.04,z.color,0);esfera(g,0,2.45,0,.14,0xefff38);
 }else if(z.tipo==='servidor'){
 for(let i=-1;i<=1;i++){const m=caja(g,i*.7,1.2,0,.55,1.9,1.0,0x526ca3);for(let j=0;j<5;j++)caja(g,i*.7,.48+j*.31,.53,.43,.075,.04,j%2?z.color:0xe2efff,{emissive:z.color,emissiveIntensity:j%2?.35:0})}
 rotor=aro(g,0,2.55,.0,1.22,z.color,.25);
 }else if(z.tipo==='taller'){
 caja(g,0,.48,0,2.2,.43,2.25,0x577399);for(let i=-1;i<=1;i++){const marco=caja(g,i*.65,1.33,-.22,.58,1.05,.14,0x88aef2);caja(g,i*.65,1.36,-.125,.44,.75,.02,i===0?z.color:0x284a85,{emissive:z.color,emissiveIntensity:.35})}
 rotor=aro(g,0,2.35,.13,.63,z.color,0);
 }else if(z.tipo==='cohete'){
 cilindro(g,0,.7,0,.73,.91,.9,0x6987ae);cilindro(g,0,1.65,0,.45,.65,1.45,0xe1eafb);
 const cono=new THREE.Mesh(new THREE.ConeGeometry(.45,.85,16),material(z.color));cono.position.y=2.82;g.add(cono);
 for(let i=0;i<4;i++){let a=i*Math.PI/2;esfera(g,Math.cos(a)*.8,.75,Math.sin(a)*.8,.19,z.color)}
 rotor=aro(g,0,1.65,0,1.08,z.color,0);
 }else if(z.tipo==='grafico'){
 const alturas=[.7,1.2,1.9,2.5];for(let i=0;i<4;i++){caja(g,(i-1.5)*.61,.3+alturas[i]/2,0,.46,alturas[i],.7,i===3?z.color:0x658aca,{emissive:i===3?z.color:0x245bff,emissiveIntensity:.2})}
 rotor=aro(g,0,2.55,.0,.76,z.color,0);
 }
 etiqueta(g,z.nombre,z.color);
 const halo=aro(g,0,.42,0,1.92,z.color);
 estaciones.set(z.id,{g,base,rotor,halo,color:z.color});
 animados.push({id:z.id,rotor,halo});
 }
 ZONAS.forEach(estación);
 const particulas=[];
 for(let k=0;k<4;k++){
  const enlace=caja(escena,-6+k*4,.16,0,1.2,.08,.11,0x789bd4,{emissive:0x245bff,emissiveIntensity:.65});
  for(let i=0;i<2;i++){const punto=esfera(escena,-6.9+k*4+i*.7,.27,0,.105,0xefff38);particulas.push({punto,inicio:-6.9+k*4,segmento:k,i})}
 }
 const rayo=new THREE.Raycaster(),cursor=new THREE.Vector2();
 function buscarEstacion(obj){let p=obj;while(p){if(p.userData?.station)return p.userData.station;p=p.parent}return null}
 function objetivoRayo(e){const rect=canvas.getBoundingClientRect();cursor.x=(e.clientX-rect.left)/rect.width*2-1;cursor.y=-(e.clientY-rect.top)/rect.height*2+1;rayo.setFromCamera(cursor,camara);
 const intersecciones=rayo.intersectObjects([...estaciones.values()].map(s=>s.g),true);
 return intersecciones.length?buscarEstacion(intersecciones[0].object):null}
 canvas.addEventListener('pointermove',e=>{canvas.style.cursor=objetivoRayo(e)?'pointer':'grab'});
 canvas.addEventListener('click',e=>{const id=objetivoRayo(e);if(id)seleccionar(id)});
 canvas.addEventListener('pointerleave',()=>canvas.style.cursor='grab');
 function redimensionar(){
  const w=Math.max(1,envoltorio.clientWidth),h=Math.max(1,envoltorio.clientHeight),aspect=w/h;
  const ancho=aspect<1.15?26:26;const alto=ancho/aspect;camara.left=-ancho/2;camara.right=ancho/2;camara.top=alto/2;camara.bottom=-alto/2;camara.updateProjectionMatrix();gl.setSize(w,h,false);
 }
 new ResizeObserver(redimensionar).observe(envoltorio);redimensionar();
 reiniciarCamara=()=>{camara.position.set(21,24,27);camara.zoom=1;camara.updateProjectionMatrix();orbit.target.copy(puntoObjetivo);orbit.update()};
 sync3D=()=>{
   for(const z of ZONAS){const item=estaciones.get(z.id),d=datos.get(z.id);if(!d)continue;
    const elegido=z.id===seleccion,encendido=d.estado!=='parada';
    item.base.material.color.setHex(d.estado==='parada'?0x6b2e56:d.estado==='atencion'?0x704b34:0x304e79);
    item.halo.scale.setScalar(elegido?1.12:1);
    item.halo.material.emissiveIntensity=elegido?.8:.2;
    item.halo.visible=encendido||elegido;
   }
 };
 sync3D();let ultimo=0;
 gl.setAnimationLoop(tiempo=>{
   const segundos=tiempo*.001,delta=Math.min((tiempo-ultimo)*.001,.06);ultimo=tiempo;
   if(!PREFIERE_MENOS_MOVIMIENTO&&!document.hidden){
    for(const a of animados){if(datos.get(a.id)?.estado!=='parada'){if(a.rotor)a.rotor.rotation.z+=delta*.32;a.halo.rotation.z+=delta*.06}}
    for(const e of particulas){const detenido=[...datos.values()].some(d=>d.estado==='parada');if(!detenido)e.punto.position.x=e.inicio+(segundos*.45+e.i*.27)%1.35}
   }
   orbit.update();gl.render(escena,camara);
 });
 document.addEventListener('visibilitychange',()=>{if(document.hidden)gl.setAnimationLoop(null);else gl.setAnimationLoop(renderLoop)});
 }catch(error){
  console.warn('AR 3D: modo accesible sin WebGL',error);
  $('#stage-fallback').hidden=false;$('#file-status').textContent='Vista de datos disponible. Para la maqueta 3D se requiere WebGL y acceso al módulo Three.js.';
 }
}
iniciarMundo();
