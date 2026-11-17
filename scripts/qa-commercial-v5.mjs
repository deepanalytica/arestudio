/* AR Estudio 5.0: QA de captación, recursos, herramientas, SEO y diseño adaptable. */
import { chromium } from 'playwright';
import {createServer} from 'node:http';
import {readFile,mkdir} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve(process.cwd());
const MIME={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.pdf':'application/pdf','.txt':'text/plain; charset=utf-8','.csv':'text/csv; charset=utf-8','.xml':'application/xml'};
const server=createServer(async(req,res)=>{
 try{
  let filename=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
  if(filename.endsWith('/'))filename+='index.html';
  const target=resolve(root,'.'+filename);
  if(!target.startsWith(root+sep))throw Error('path outside root');
  const content=await readFile(target);
  res.writeHead(200,{'Content-Type':MIME[extname(target)]||'application/octet-stream','Cache-Control':'no-store'});res.end(content);
 }catch(err){res.writeHead(404);res.end('Not found');}
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=`http://127.0.0.1:${server.address().port}/comercial/`,origin=base.replace(/\/comercial\/$/,'/');
const browser=await chromium.launch({headless:true});
const output=resolve(root,'qa-output/comercial-v5');await mkdir(output,{recursive:true});
const problems=[];
const check=(condition,message)=>{if(!condition)problems.push(message)};
try{
 for(const [label,width,height] of [['desktop',1440,900],['laptop',1024,800],['tablet',820,1180],['mobile',390,844],['small-mobile',320,740]]){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const res=await page.goto(base,{waitUntil:'domcontentloaded',timeout:30000});
  check(res?.status()===200,`${label}: main route is not HTTP 200`);
  await page.waitForTimeout(220);
  const info=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,heading:document.querySelector('h1')?.textContent||'',kits:document.querySelectorAll('.offer-card').length,resources:document.querySelectorAll('.resource').length,articles:document.querySelectorAll('.article-card').length}));
  if(info.scroll>width+2){const offenders=await page.evaluate(()=>[...document.querySelectorAll('body *')].map(el=>({el,rect:el.getBoundingClientRect()})).filter(x=>x.rect.width>0&&x.rect.right>innerWidth+2&&getComputedStyle(x.el).position!=='fixed').slice(0,12).map(x=>({tag:x.el.tagName,klass:typeof x.el.className==='string'?x.el.className.slice(0,60):'',right:Math.round(x.rect.right)})));problems.push(`${label}: horizontal overflow ${info.scroll}>${width} ${JSON.stringify(offenders)}`);}
  check(info.heading.toLowerCase().includes('encuentren')&&info.heading.toLowerCase().includes('elijan'),`${label}: editorial hero lost the promise to clients`);
  check(info.kits===3,`${label}: expected 3 service kits, found ${info.kits}`);
  check(info.resources===3,`${label}: expected 3 free resources, found ${info.resources}`);
  check(info.articles===3,`${label}: expected 3 useful articles, found ${info.articles}`);
  check((await page.locator('.art-editorial').count())===8,`${label}: missing full-screen editorial scenes`);
  check((await page.locator('.art-logo-tile img').count())===12,`${label}: expected 12 authentic ARCHIVO logo vectors`);
  check((await page.locator('.art-campaign-photo img').count())===6,`${label}: missing original campaign montage`);
  check((await page.locator('.art-fall-logo img').count())===5,`${label}: platform logos must be five real SVG assets`);
  check((await page.locator('.art-full-bleed-rail img').count())===5,`${label}: visual rail missing original campaigns`);
  check((await page.locator('.art-intro-mark img').getAttribute('src'))==='../brand/assets/mark.svg',`${label}: AR official mark missing`);

  await page.locator('[data-situation="ventas"]').click();
  check((await page.locator('#quick-result').innerText()).includes('tráfico'),`${label}: choice did not explain priorities`);
  check((await page.locator('#quick-cta').getAttribute('href'))==='#kit-ventas',`${label}: choice did not link to correct kit`);
  await page.locator('[data-lead-interest="Kit Más Consultas"]').click();
  check((await page.locator('#lead-interest').inputValue())==='Conseguir más consultas o reservas',`${label}: selected offer did not populate contact context`);
  if(width<=920){await page.locator('#nav-toggle').click();check((await page.locator('#nav-toggle').getAttribute('aria-expanded'))==='true',`${label}: mobile menu did not open`);await page.locator('#mobile-menu a').first().click();check((await page.locator('#nav-toggle').getAttribute('aria-expanded'))==='false',`${label}: mobile menu did not close`);}
  await page.locator('.faq-items summary').first().click();check(await page.locator('.faq-items details').first().evaluate(x=>x.open),`${label}: FAQ does not open`);
  for(const img of await page.locator('.work-image img,.need-scene img,.art-intro-picture img,.art-logo-tile img,.art-campaign-photo img,.art-fall-logo img,.art-mockup-canvas img,.art-fortia-gallery img,.art-full-bleed-rail img').all()){
   await img.scrollIntoViewIfNeeded();await img.evaluate(async e=>e.decode().catch(()=>null));
   const src=await img.getAttribute('src'),n=await img.evaluate(e=>e.naturalWidth);
   check(n>0,`${label}: real image failed to load: ${src}`);
  }
  check(!errors.length,`${label}: JS errors: ${errors.join(' | ')}`);
  await page.goto(base,{waitUntil:'domcontentloaded'});await page.waitForTimeout(180);
  await page.screenshot({path:`${output}/${label}-hero.png`,animations:'disabled'});
  if(label==='desktop'||label==='mobile'){
   for(const sect of ['kits','recursos','articulos']){await page.locator(`#${sect}`).scrollIntoViewIfNeeded();await page.waitForTimeout(100);await page.screenshot({path:`${output}/${label}-${sect}.png`,animations:'disabled'});}
  }
  if(label==='desktop'||label==='mobile'){
   for(const [id,shot] of [['art-pantalla-archivo','mockup-archivo'],['art-identidades','identidades'],['art-campanas','campanas'],['art-canales','canales'],['art-fortia','mockup-fortia']]){
    await page.locator('#'+id).scrollIntoViewIfNeeded();
    await page.waitForTimeout(260);
    await page.screenshot({path:`${output}/${label}-${shot}.png`,animations:'disabled'});
   }
  }
  if(label==='mobile'){await page.goto(base,{waitUntil:'domcontentloaded'});await page.screenshot({path:`${output}/mobile-full.png`,fullPage:true,animations:'disabled'});}
  console.log(`QA V5 ${label}: hero=${info.heading.slice(0,46)} kits=${info.kits} resources=${info.resources} articles=${info.articles} overflow=${info.scroll-width}`);
  await page.close();
 }
 // Acceleration runs only without reduced motion; verify the five icons move on scroll.
 const motion=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'no-preference'});
 await motion.goto(base,{waitUntil:'domcontentloaded'});
 await motion.evaluate(()=>{const e=document.querySelector('#art-canales');window.scrollTo(0,e.offsetTop-innerHeight);});
 await motion.waitForTimeout(110);
 const firstY=await motion.locator('.art-fall-logo').first().evaluate(el=>new DOMMatrix(getComputedStyle(el).transform).m42);
 await motion.evaluate(()=>{const e=document.querySelector('#art-canales');window.scrollTo(0,e.offsetTop+e.offsetHeight*.3);});
 await motion.waitForTimeout(110);
 const laterY=await motion.locator('.art-fall-logo').first().evaluate(el=>new DOMMatrix(getComputedStyle(el).transform).m42);
 check(laterY>firstY+50,'animated channel logo did not fall as scroll progressed');
 await motion.close();
 const diagnostic=await browser.newPage({viewport:{width:390,height:844}});await diagnostic.goto(`${base}herramientas/diagnostico/`);
 for(const [n,v] of [['sector','local'],['pain','discover'],['presence','none'],['capacity','time']])await diagnostic.locator(`input[name="${n}"][value="${v}"]`).check();
 await diagnostic.locator('#diagnostic button[type="submit"]').click();
 check((await diagnostic.locator('#diagnostic-result h2').innerText()).includes('te encuentren'),'diagnostic did not compute priority');
 await diagnostic.screenshot({path:`${output}/tool-diagnostic.png`,animations:'disabled'});await diagnostic.close();
 const calc=await browser.newPage({viewport:{width:390,height:844}});await calc.goto(`${base}herramientas/calculadora/`);await calc.locator('#calc-form button[type="submit"]').click();
 const result=await calc.locator('#calc-result').innerText();check(result.includes('14.690'),'calculator returned wrong contribution margin');check(result.includes('5'),'calculator returned wrong break-even quantity');
 await calc.locator('#cost').fill('25000');await calc.locator('#calc-form button[type="submit"]').click();check((await calc.locator('#calc-result').innerText()).includes('no deja margen'),'calculator fails on negative margin');
 await calc.screenshot({path:`${output}/tool-calculator.png`,animations:'disabled'});await calc.close();
 for(const slug of ['abrir-cafeteria-conseguir-clientes','web-profesionales-conseguir-consultas','tienda-online-visitas-sin-ventas']){
  const page=await browser.newPage();const response=await page.goto(`${base}articulos/${slug}/`);
  check(response?.status()===200,`article ${slug} not found`);check((await page.locator('h2').count())>=4,`article ${slug} is too thin`);
  check(!(await page.locator('meta[name="robots"]').getAttribute('content')).includes('noindex'),`article ${slug} blocks indexing`);
  const ld=await page.locator('script[type="application/ld+json"]').innerText();try{const schema=JSON.parse(ld);check(schema['@graph']?.[0]?.['@type']==='BlogPosting',`article ${slug} missing BlogPosting`)}catch{problems.push(`article ${slug} has invalid JSON-LD`)}
  await page.close();
 }
 const home=await browser.newPage();await home.goto(base);const schema=await home.locator('script[type="application/ld+json"]').innerText();try{const j=JSON.parse(schema);check(j['@graph']?.some(x=>x['@type']==='ProfessionalService'),'homepage missing business schema')}catch{problems.push('homepage invalid JSON-LD')}
 await home.close();
 for(const route of ['descargas/kit-arranque-negocio.pdf','descargas/checklist-conversion-tienda.pdf','descargas/calendario-30-dias.csv','descargas/plantilla-oferta-servicios.txt']){
  const resp=await fetch(base+route);check(resp.status===200,`download missing: ${route}`);const body=await resp.arrayBuffer();check(body.byteLength>700,`download empty: ${route}`);
 }
 for(const route of ['sitemap.xml','robots.txt','llms.txt']){const res=await fetch(origin+route);check(res.status===200,`SEO file missing: ${route}`)}
}finally{await browser.close();await new Promise(r=>server.close(r));}
if(problems.length){console.error('QA V5 FAIL\n'+problems.map(x=>'- '+x).join('\n'));process.exitCode=1;}
else console.log('QA V5 PASS: 5 breakpoints, 3 kits, 2 interactive tools, 4 resources, 3 articles, schema, full image decoding, mobile nav and contact context.');