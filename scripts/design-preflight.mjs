import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {projects} from '../data.js';

// Heurísticas comprobables de Taste / Impeccable / narrativa AR Estudio.
const html=readFileSync('index.html','utf8');
const js=readFileSync('app.js','utf8');
const styles=readFileSync('brand/portfolio-story-v6.css','utf8');
const stageStyles=readFileSync('brand/work-first-v8.css','utf8');
const lab=readFileSync('brand/lab/index.html','utf8');
const tokens=JSON.parse(readFileSync('brand/tokens.json','utf8')).tokens;
const official=['#245BFF','#6236FF','#F12BBE','#FF652F','#EFFF38','#F5FAFF','#101729'];
const labSwatches=[...lab.matchAll(/class="swatch" data-color="(#[0-9A-F]{6})"/g)].map(x=>x[1]);
assert.deepEqual(labSwatches,official,'Los siete colores oficiales no coinciden con Design System Lab');
for(const hex of official)assert.ok(Object.values(tokens).includes(hex),'Token oficial ausente: '+hex);

const between=(a,b)=>{const i=html.indexOf(a),j=html.indexOf(b,i+1);assert.ok(i>=0&&j>i,'Falta sección: '+a);return html.slice(i,j)};
const hero=between('class="hero container hero-v6','id="proyectos"');
const strip=hero.match(/<p class="hero-lead">([^<]+)<\/p>/);
assert.ok(strip,'Hero debe tener una sola explicación visible');
assert.ok(strip[1].trim().split(/\s+/).length<=36,'Hero demasiado denso: máximo 36 palabras');
assert.equal((hero.match(/class="btn btn-solid"/g)||[]).length,0,'Los trabajos tienen prioridad sobre botones decorativos');
assert.equal((hero.match(/class="hero-actions"/g)||[]).length,0,'No duplicar navegación antes de la galería');
assert.equal((hero.match(/class="stage-card /g)||[]).length,0,'No colocar mosaico duplicado antes de los casos');
assert.equal((hero.match(/class="path-dot /g)||[]).length,0,'No duplicar enlaces que repiten las obras visibles');
assert.ok(hero.includes('class="hero-archive-link"'),'El archivo de 21 casos sigue accesible desde arriba');
const profile=readFileSync('perfil/index.html','utf8');
assert.match(profile,/Ingeniería en Data Science<\/strong><small>En curso<\/small>/,'Formación académica positiva y exacta');
assert.ok(!/no título obtenido|no certificación del producto|estudios en desarrollo/i.test(profile),'Evitar negaciones en credenciales');
assert.ok(profile.indexOf('id="evidencia"')<profile.indexOf('id="trayectoria"'),'Perfil muestra trabajo antes de CV');


const firstFold=between('id="proyectos"','class="problem-section');
assert.equal((firstFold.match(/class="feature-card /g)||[]).length,4,'Deben existir cuatro proyectos destacados');
assert.equal((firstFold.match(/class="feature-visual-signet"/g)||[]).length,4,'Cada obra debe tener una firma visual');
assert.equal((firstFold.match(/class="feature-heading"/g)||[]).length,4,'Una cabecera por obra');
assert.equal((firstFold.match(/class="feature-live-link"/g)||[]).length,3,'Solo tres destinos externos reales');
assert.equal((firstFold.match(/class="feature-public-note"/g)||[]).length,1,'El caso sin demo debe estar etiquetado');
assert.ok(html.indexOf('id="proyectos"')<html.indexOf('id="explorar"')&&html.indexOf('id="explorar"')<html.indexOf('id="que-hago"'),'Primero cuatro obras, luego 21 casos y finalmente explicaciones');
assert.equal((firstFold.match(/class="project-browser-preview"/g)||[]).length,1,'ARCHIVO incorpora captura publicada como interfaz en la composición');

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
assert.ok(stageStyles.includes('prefers-reduced-motion:reduce'),'La nueva portada respeta la reducción de movimiento');
assert.ok(html.includes('brand/work-first-v8.css'),'La portada carga la capa V8');
assert.ok(html.includes('brand/logo-kit/svg/horizontal-transparente-tinta.svg'),'Logo maestro ausente');

console.log('DESIGN PREFLIGHT OK: 7 colores, primera pantalla de obra visual, 4 destacados, 21 casos antes del contenido explicativo, disclosure, GSAP y reduced-motion');
