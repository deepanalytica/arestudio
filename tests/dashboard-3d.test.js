import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const leer=r=>readFileSync(new URL(r,import.meta.url),'utf8');
const raiz='../laboratorio/dashboard-3d/';
const claves=['captacion','diagnostico','produccion','activacion','medicion'];
const filas=nombre=>{const lineas=leer(raiz+'datos/'+nombre+'.csv').trim().split(/\r?\n/);
  assert.equal(lineas.shift(),'id;nombre;valor;unidad;estado;descripcion;accion');
  return lineas.map(linea=>{const [id,nombre,valor,unidad,estado,descripcion,accion]=linea.split(';');return{id,nombre,valor:Number(valor),unidad,estado,descripcion,accion}})};
test('ambos CSV cubren las cinco etapas y documentan una decisión útil',()=>{
 for(const archivo of ['base','estres']){
  const datos=filas(archivo);
  assert.deepEqual(datos.map(d=>d.id),claves);
  for(const d of datos){assert.ok(Number.isFinite(d.valor)&&d.valor>=0);assert.ok(d.nombre.length>2);assert.ok(d.descripcion.length>15);assert.ok(d.accion.length>15);assert.ok(['normal','atencion','parada'].includes(d.estado))}
 }
});
test('el escenario de presión muestra alertas y una interrupción real del flujo',()=>{
 const base=filas('base'),presion=filas('estres');
 assert.ok(base.every(d=>d.estado==='normal'));
 assert.ok(presion.some(d=>d.estado==='parada'));
 assert.ok(presion.filter(d=>d.estado!=='normal').length>=3);
});
test('la demo se anuncia como simulación y conserva el fallback accesible',()=>{
 const html=leer(raiz+'index.html'),js=leer(raiz+'app.js'),css=leer(raiz+'style.css');
 assert.match(html,/datos simulados|cifras ficticias/i);
 assert.match(html,/stage-fallback/);
 assert.match(html,/data-station="medicion"/);
 assert.match(html,/role="status"/);
 assert.match(html,/brand\/assets\/mark.svg/);
 assert.match(js,/prefers-reduced-motion/);
 assert.match(js,/textContent/);
 assert.match(css,/@media\(max-width:560px\)/);
});
test('el portafolio ofrece acceso a la demo sin atribuir un caso real',()=>{
 const index=leer('../index.html');
 assert.match(index,/laboratorio\/dashboard-3d\//);
 assert.match(index,/datos simulados/);
});
