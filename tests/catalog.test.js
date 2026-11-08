import {test} from 'node:test';
import assert from 'node:assert/strict';
import {projects,featured,categories,caseStudies} from '../data.js';
test('identificadores únicos',()=>assert.equal(new Set(projects.map(p=>p.id)).size,projects.length));
test('proyectos destacados completos',()=>{assert.equal(featured.length,4);for(const p of featured){assert.ok(p.cover&&p.summary&&p.url&&p.evidence)}});
test('fichas sin campos vacíos',()=>{for(const p of projects){for(const key of ['id','name','area','status','summary','problem','solution','url'])assert.ok(p[key],`${p.id} ${key}`);assert.ok(categories.includes(p.area));assert.ok(p.url.startsWith('https://'));}});
test('no métricas falsas de impacto en catálogo',()=>{for(const p of projects){assert.ok(!/\+\d+%|clientes satisfechos|ventas comprobadas/i.test(p.summary))}});

test('casos prioritarios incluyen contribución, decisiones y trabajo realizado',()=>{
  for(const p of featured){
    const c=caseStudies[p.id];
    assert.ok(c,p.id+' debe tener caso ampliado');
    assert.ok(c.role&&c.contribution,p.id+' debe distinguir aporte personal');
    assert.ok(c.decisions.length>=2,p.id+' debe explicar criterios de decisión');
    assert.ok(c.built.length>=3,p.id+' debe listar trabajo concreto');
    assert.ok(c.proofNote,p.id+' debe distinguir evidencia y límites');
  }
});
test('accesos públicos de casos usan destinos explícitos y no se inventan demos',()=>{
  for(const [id,c] of Object.entries(caseStudies)){
    assert.ok(projects.some(p=>p.id===id));
    for(const link of c.links){
      assert.ok(link.url.startsWith('https://'),id+' requiere enlace absoluto');
      assert.ok(['demo','source'].includes(link.kind));
    }
  }
  for(const id of ['deep-geo','praxios-os'])assert.equal(caseStudies[id].links.some(x=>x.kind==='demo'),false);
  assert.ok(caseStudies['conv-os'].proofNote.includes('datos ficticios'));
});


test('cada uno de los 21 proyectos cuenta con expediente propio',()=>{
  assert.equal(Object.keys(caseStudies).length,projects.length);
  for(const p of projects){
    const c=caseStudies[p.id];
    assert.ok(c,p.id+' carece de ficha ampliada');
    assert.ok(c.role&&c.contribution&&c.proofNote,p.id+' necesita rol, contribución y límites');
    assert.ok(c.decisions.length>=2,p.id+' necesita criterios explícitos');
    assert.ok(c.built.length>=2,p.id+' requiere materiales definidos');
  }
});
test('capturas de pantalla solo para sitios o demos públicos identificados',()=>{
  const declared=projects.filter(p=>p.preview);
  assert.equal(declared.length,9);
  for(const p of declared){
    assert.match(p.preview,/^assets\/proof\/[a-z0-9-]+\.jpg$/);
    assert.ok(p.previewLabel);
    assert.ok(caseStudies[p.id].links.some(l=>l.kind==='demo'||l.kind==='source'),p.id+' debe mostrar procedencia pública');
  }
  for(const id of ['deep-geo','atalaya','meta-harness','deep-living']){
    assert.ok(!projects.find(p=>p.id===id).preview,id+' no debe simular una captura operativa');
  }
});
