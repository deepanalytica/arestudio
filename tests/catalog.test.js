import {test} from 'node:test';
import assert from 'node:assert/strict';
import {projects,featured,categories} from '../data.js';
test('identificadores únicos',()=>assert.equal(new Set(projects.map(p=>p.id)).size,projects.length));
test('proyectos destacados completos',()=>{assert.equal(featured.length,4);for(const p of featured){assert.ok(p.cover&&p.summary&&p.url&&p.evidence)}});
test('fichas sin campos vacíos',()=>{for(const p of projects){for(const key of ['id','name','area','status','summary','problem','solution','url'])assert.ok(p[key],`${p.id} ${key}`);assert.ok(categories.includes(p.area));assert.ok(p.url.startsWith('https://'));}});
test('no métricas falsas de impacto en catálogo',()=>{for(const p of projects){assert.ok(!/\+\d+%|clientes satisfechos|ventas comprobadas/i.test(p.summary))}});