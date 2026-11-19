import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { readFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';

const address='http://127.0.0.1:8846/laboratorio/dashboard-3d/';
const server=spawn('python3',['-m','http.server','8846'],{stdio:'ignore'});
const problems=[];
let browser;
try{
 let ready=false;
 for(let i=0;i<40;i++){try{const res=await fetch(address);if(res.ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,125))}
 assert.ok(ready,'servidor del laboratorio listo');
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--enable-webgl','--use-gl=angle','--use-angle=swiftshader']});
 await mkdir('artifacts',{recursive:true});
 const origen=await readFile('laboratorio/dashboard-3d/datos/base.csv','utf8');
 const modificado=origen.replace('captacion;Captación;340;','captacion;Captación;999;');
 for(const [tipo,w,h] of [['desktop',1440,900],['tablet',768,950],['mobile',390,844]]){
  const page=await browser.newPage({viewport:{width:w,height:h},deviceScaleFactor:1,reducedMotion:'reduce'});
  const pageErrors=[];page.on('pageerror',error=>pageErrors.push(error.message));
  await page.goto(address,{waitUntil:'domcontentloaded',timeout:30000});
  await page.waitForFunction(()=>document.querySelector('#station-value')?.textContent==='340',null,{timeout:20000});
  assert.equal(await page.locator('[data-station]').count(),5,tipo+': estaciones');
  assert.ok((await page.locator('h1').innerText()).includes('Desde otra dimensión'),tipo+': título');
  assert.equal(await page.locator('#alert-count').innerText(),'00',tipo+': sin alertas en base');
  // No basta con que exista un canvas: comprobar que el renderer le dio dimensiones.
  await page.waitForFunction(()=>document.querySelector('#scene')?.width>200,null,{timeout:25000});
  assert.equal(await page.locator('#stage-fallback').isVisible(),false,tipo+': se inicializa Three.js');
  await page.screenshot({path:'artifacts/lab-3d-'+tipo+'.png',fullPage:true});
  await page.locator('[data-scenario="estres"]').click();
  await page.waitForFunction(()=>document.querySelector('#flow-status')?.textContent==='Detenido');
  assert.equal(await page.locator('#alert-count').innerText(),'05',tipo+': alertas escenario presión');
  await page.locator('[data-station="produccion"]').click();
  assert.equal(await page.locator('#station-value').innerText(),'52',tipo+': indicador producción');
  assert.match(await page.locator('#panel-state').innerText(),/DETENIDA/,tipo+': bloqueo');
  await page.locator('#csv-input').setInputFiles({name:'datos-ejemplo.csv',mimeType:'text/csv',buffer:Buffer.from(modificado)});
  await page.locator('[data-station="captacion"]').click();
  assert.equal(await page.locator('#station-value').innerText(),'999',tipo+': importación CSV');
  assert.match(await page.locator('#station-source').innerText(),/CSV local/,tipo+': fuente local');
  assert.ok((await page.evaluate(()=>document.documentElement.scrollWidth))<=w+3,tipo+': sin desbordamiento horizontal');
  assert.deepEqual(pageErrors,[],tipo+': errores de navegador');
  await page.close();
 }
 console.log('AR/ 3D browser QA: estaciones, datos, alertas, CSV, WebGL y 3 resoluciones: OK');
}catch(error){problems.push(error?.stack||String(error));}
finally{await browser?.close();server.kill('SIGTERM')}
if(problems.length){console.error(problems.join('\n'));process.exitCode=1;}
