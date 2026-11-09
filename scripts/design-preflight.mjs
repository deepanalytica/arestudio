import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {projects} from '../data.js';

/* AR Estudio V10 — contracts for an image-led, genuinely low-density portfolio. */
const html=readFileSync('index.html','utf8');
const home=readFileSync('home.js','utf8');
const style=readFileSync('brand/gallery-fullscreen-v10.css','utf8');
const caseHtml=readFileSync('casos/index.html','utf8');
const caseJs=readFileSync('casos/case.js','utf8');
const caseStyle=readFileSync('casos/fullscreen-openings-v10.css','utf8');
const profile=readFileSync('perfil/index.html','utf8');
const lab=readFileSync('brand/lab/index.html','utf8');
const tokens=JSON.parse(readFileSync('brand/tokens.json','utf8')).tokens;
const official=['#245BFF','#6236FF','#F12BBE','#FF652F','#EFFF38','#F5FAFF','#101729'];
assert.deepEqual([...lab.matchAll(/class="swatch" data-color="(#[0-9A-F]{6})"/g)].map(m=>m[1]),official,
 'No alterar los siete colores del Design System Lab');
for(const swatch of official)assert.ok(Object.values(tokens).includes(swatch),swatch+' no es token maestro');

assert.equal(projects.length,21,'Conservar el archivo de 21 obras');
assert.equal((html.match(/class="scene scene-/g)||[]).length,4,'Cuatro experiencias inmersivas, no miniaturas');
for(const id of ['archivo','deep-geo','praxios-os','visual-art-ai']){
  assert.ok(html.includes('casos/?proyecto='+id),'La portada debe enlazar a '+id);
  assert.ok(caseJs.includes("'"+id+"':{"),'Falta dirección de arte en '+id);
}
assert.ok(html.includes('fetchpriority="high"'),'Primera foto descubierta con prioridad alta en HTML');
assert.ok(style.includes('100svh'),'Cada obra ocupa toda la altura de pantalla');
assert.ok(!html.includes('class="feature-grid"'),'La portada no debe duplicar los casos en miniaturas');
assert.ok(!html.includes('class="hero-copy"'),'No hay hero autorreferencial antes de la obra');
assert.ok(!html.includes('autoplay'),'No reproducir transiciones sin control');
assert.ok(html.indexOf('id="proyectos"')<html.indexOf('id="explorar"') &&
          html.indexOf('id="explorar"')<html.indexOf('id="metodo"'),'Obra > archivo > explicación');
assert.ok(html.includes('href="perfil/"')&&html.includes('id="contacto"'),'Perfil y contacto siguen accesibles');
assert.ok(html.includes('brand/logo-kit/svg/horizontal-transparente-tinta.svg'),'Logo maestro original');
assert.ok(home.includes('location.replace('),'Enlaces legacy a proyectos requieren redirección');
assert.ok(home.includes('aria-pressed'),'Filtros accesibles');
assert.ok(style.includes('prefers-reduced-motion:reduce'),'Respeto por movimiento reducido');

assert.ok(caseHtml.includes('fullscreen-openings-v10.css'),'Casos deben usar nueva primera pantalla');
assert.ok(caseJs.includes('class="case-opening"'),'Caso comienza por una imagen y copy superpuesto');
assert.ok(caseStyle.includes('100svh'),'Casos llenan pantalla');
assert.ok(caseJs.includes('caseData.proofNote')&&caseJs.includes('caseData.decisions'),
 'Decisiones, evidencia y límites se conservan en cada caso');
assert.ok(caseJs.includes('case-archive-hero'),'Fotografía auténtica de ARCHIVO en el primer frame');
assert.match(profile,/Ingeniería en Data Science<\/strong><small>En curso<\/small>/,
 'Formación académica exacta y positiva');
assert.ok(!/no título obtenido|no certificación del producto/i.test(profile),'Evitar copys defensivos');

console.log('DESIGN PREFLIGHT V10 OK — 4 pantallas completas, imagen real/pruebas, 21 casos, 7 tokens, contenido breve, a11y');
