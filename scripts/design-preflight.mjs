import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {projects} from '../data.js';

// Heurísticas comprobables de Taste / Impeccable / narrativa AR Estudio.
const html=readFileSync('index.html','utf8');
const js=readFileSync('app.js','utf8');
const styles=readFileSync('brand/portfolio-story-v6.css','utf8');
const lab=readFileSync('brand/lab/index.html','utf8');
const tokens=JSON.parse(readFileSync('brand/tokens.json','utf8')).tokens;
const official=['#245BFF','#6236FF','#F12BBE','#FF652F','#EFFF38','#F5FAFF','#101729'];
const labSwatches=[...lab.matchAll(/class="swatch" data-color="(#[0-9A-F]{6})"/g)].map(x=>x[1]);
assert.deepEqual(labSwatches,official,'Los siete colores oficiales no coinciden con Design System Lab');
for(const hex of official)assert.ok(Object.values(tokens).includes(hex),'Token oficial ausente: '+hex);

const between=(a,b)=>{const i=html.indexOf(a),j=html.indexOf(b,i+1);assert.ok(i>=0&&j>i,'Falta sección: '+a);return html.slice(i,j)};
const hero=between('class="hero container hero-v6"','id="proyectos"');
const strip=hero.match(/<p class="hero-lead">([^<]+)<\/p>/);
assert.ok(strip,'Hero debe tener una sola explicación visible');
assert.ok(strip[1].trim().split(/\s+/).length<=36,'Hero demasiado denso: máximo 36 palabras');
assert.equal((hero.match(/class="btn btn-solid"/g)||[]).length,1,'Hero debe tener una sola CTA');
assert.equal((hero.match(/class="hero-actions"/g)||[]).length,1,'Hero sin acciones redundantes');

const firstFold=between('id="proyectos"','class="problem-section');
assert.equal((firstFold.match(/class="feature-card /g)||[]).length,4,'Deben existir cuatro proyectos destacados');
assert.equal((firstFold.match(/class="feature-visual-signet"/g)||[]).length,4,'Cada obra debe tener una firma visual');
assert.equal((firstFold.match(/class="feature-heading"/g)||[]).length,4,'Una cabecera por obra');
assert.equal((firstFold.match(/class="feature-live-link"/g)||[]).length,3,'Solo tres destinos externos reales');
assert.equal((firstFold.match(/class="feature-public-note"/g)||[]).length,1,'El caso sin demo debe estar etiquetado');
assert.ok(html.indexOf('id="proyectos"')<html.indexOf('id="que-hago"'),'La galería debe preceder a rutas extensas');

assert.equal(projects.length,21,'No reducir el archivo');
const storyChunk=js.split('const caseOpeners={')[1]?.split('};')[0];
assert.ok(storyChunk,'Falta el mapa de aperturas narrativas');
const storyIds=[...storyChunk.matchAll(/^\s*'([^']+)':/gm)].map(x=>x[1]);
assert.equal(new Set(storyIds).size,projects.length,'Falta alguna de las 21 historias');
for(const project of projects)assert.ok(storyIds.includes(project.id),'Sin relato para '+project.id);

assert.ok(js.includes('<details class="case-more">'),'Detalles técnicos deben ser accesibles y progresivos');
assert.ok(js.includes('window.ScrollTrigger'),'GSAP ScrollTrigger debe integrarse progresivamente');
const motionCode=js.slice(js.indexOf('function motion()'),js.indexOf('setTimeout(motion'));
assert.ok(motionCode.includes("$$('.feature-card').forEach"),'GSAP debe recorrer todas las tarjetas, no llamar forEach sobre un elemento');
assert.ok(motionCode.includes("$$('.problem-card').forEach"),'GSAP debe recorrer las tres rutas, no un solo elemento');
assert.ok(html.includes('ScrollTrigger.min.js'),'No se carga ScrollTrigger');
assert.ok(styles.includes('prefers-reduced-motion:reduce'),'Falta reducción de movimiento');
assert.ok(html.includes('brand/logo-kit/svg/horizontal-transparente-tinta.svg'),'Logo maestro ausente');

console.log('DESIGN PREFLIGHT OK: 7 colores, portada breve, 1 CTA, 4 historias, 21 relatos, disclosure, GSAP y reduced-motion');
