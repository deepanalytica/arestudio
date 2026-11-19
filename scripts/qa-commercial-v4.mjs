/* AR Estudio V4: isolated conversion-first prototype visual and behavioural QA. */
import {chromium} from 'playwright';
import {createServer} from 'node:http';
import {readFile,stat,mkdir} from 'node:fs/promises';
import {resolve,join,extname,sep} from 'node:path';
const root=resolve(process.cwd());
const MIME={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2'};
const srv=createServer(async(req,res)=>{
 try{
  let name=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
  if(name.endsWith('/'))name+='index.html';
  const target=resolve(root,'.'+name);
  if(!target.startsWith(root+sep))throw Error('Forbidden');
  const data=await readFile(target);
  res.writeHead(200,{'Content-Type':MIME[extname(target)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);
 }catch(e){res.writeHead(404);res.end('Not found');}
});
await new Promise(r=>srv.listen(0,'127.0.0.1',r));
const base=`http://127.0.0.1:${srv.address().port}/comercial-v4/`;
const browser=await chromium.launch({headless:true});
const dir=resolve(root,'qa-output/comercial-v4');await mkdir(dir,{recursive:true});
const problems=[];
for(const [name,width,height] of [['desktop',1440,900],['laptop',1024,800],['tablet',820,1180],['mobile',390,844],['small-mobile',320,740]]){
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base,{waitUntil:'domcontentloaded',timeout:30000});
 await page.waitForTimeout(350);
 const info=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,heroHeading:document.querySelector('h1')?.innerText,heroImgs:[...document.querySelectorAll('.hero-stage img')].map(x=>({src:x.getAttribute('src'),loaded:x.naturalWidth>0})),bodyText:document.body.innerText.length}));
 if(info.scroll>width+2){
   const offenders=await page.evaluate(()=>[...document.querySelectorAll('body *')].map(el=>({el,box:el.getBoundingClientRect()})).filter(x=>x.box.right>innerWidth+2 && x.box.width>0 && getComputedStyle(x.el).display!=='none').map(x=>({tag:x.el.tagName,cls:typeof x.el.className==='string'?x.el.className.slice(0,90):'',text:x.el.innerText?.slice(0,35)||'',right:Math.round(x.box.right),left:Math.round(x.box.left)})).slice(0,25));
   console.log('OVERFLOW DEBUG',name,JSON.stringify(offenders));
   problems.push(`${name}: overflow ${info.scroll}>${width}`);
  }
 if(!/encuentren/i.test(info.heroHeading||''))problems.push(`${name}: hero copy missing`);
 if(info.heroImgs.some(x=>!x.loaded))problems.push(`${name}: missing actual hero image ${JSON.stringify(info.heroImgs)}`);
 if(await page.locator('[role="tab"]').count()!==3)problems.push(`${name}: scenario tabs missing`);
 await page.locator('#tab-profesional').click();
 if(!await page.locator('#panel-profesional').isVisible())problems.push(`${name}: professional story not revealed`);
 if(await page.locator('#lead-context').inputValue()!=='Necesito más consultas para mis servicios profesionales')problems.push(`${name}: lead context not propagated`);
 await page.locator('#tab-tienda').focus();await page.keyboard.press('ArrowRight');
 if(await page.locator('#tab-local').getAttribute('aria-selected')!=='true')problems.push(`${name}: arrow-key tab loop failed`);
 await page.locator('details summary').first().click();
 if(!await page.locator('details').first().evaluate(e=>e.open))problems.push(`${name}: FAQ inaccessible`);
 if(width<=850){await page.locator('#menu-trigger').click();if(await page.locator('#menu-trigger').getAttribute('aria-expanded')!=='true')problems.push(`${name}: mobile menu did not open`);await page.locator('.mobile-nav a').first().click();if(await page.locator('#menu-trigger').getAttribute('aria-expanded')!=='false')problems.push(`${name}: mobile menu failed close`)}
 if(errors.length)problems.push(`${name}: JS errors ${errors.join(' | ')}`);
 await page.goto(base,{waitUntil:'domcontentloaded'});await page.waitForTimeout(200);
 await page.screenshot({path:`${dir}/${name}-hero.png`,animations:'disabled'});
 await page.locator('#situaciones').scrollIntoViewIfNeeded();await page.screenshot({path:`${dir}/${name}-situations.png`,animations:'disabled'});
 await page.locator('#evidencia').scrollIntoViewIfNeeded();await page.screenshot({path:`${dir}/${name}-work.png`,animations:'disabled'});
 if(name==='mobile')await page.screenshot({path:`${dir}/mobile-full.png`,fullPage:true,animations:'disabled'});

 // The opt-in dimensional lab must measure the REAL V4 component at each breakpoint.
 const labErrors=[];
 page.on('pageerror',e=>labErrors.push(e.message));
 await page.goto(base+'plano/',{waitUntil:'domcontentloaded',timeout:30000});
 try{
   await page.waitForFunction(()=>document.querySelector('#sheet')?.dataset.measured==='true',null,{timeout:20000});
   const lab=await page.evaluate(()=>{
     const card=document.querySelector('#source').contentDocument.getElementById('tab-local');
     return {pageWidth:document.documentElement.scrollWidth,realWidth:card.getBoundingClientRect().width,
       displayedWidth:parseFloat(document.querySelector('#metrics tr td:last-child')?.textContent||'NaN'),
       rows:document.querySelectorAll('#metrics tr').length,
       state:document.querySelector('#measure-state')?.textContent||''};
   });
   if(lab.pageWidth>width+2)problems.push(name+': dimensional lab horizontal overflow '+lab.pageWidth+'>'+width);
   if(lab.rows<8)problems.push(name+': dimensional measurements missing');
   if(Math.abs(lab.realWidth-lab.displayedWidth)>.11)problems.push(name+': displayed dimension differs from DOM');
   if(!lab.state.includes('Medido: 390 px'))problems.push(name+': default measurement not ready');
   if(name==='desktop'){
     for(const selected of [768,1440,390]){
       await page.locator('[data-width="'+selected+'"]').click();
       await page.waitForFunction(w=>document.querySelector('#measure-state')?.textContent?.includes('Medido: '+w+' px'),selected,{timeout:15000});
       const synced=await page.evaluate(w=>{
         const measured=Number(document.querySelector('#source').contentDocument.documentElement.clientWidth);
         const control=document.querySelector('[data-width="'+w+'"]');
         return measured===w&&control.getAttribute('aria-pressed')==='true';
       },selected);
       if(!synced)problems.push('desktop: dimensional viewport mismatch '+selected);
     }
   }
   if(name==='desktop'||name==='mobile'||name==='small-mobile'){
     await page.locator('.drawing').screenshot({path:dir+'/'+name+'-plano.png',animations:'disabled'});
   }
 }catch(e){problems.push(name+': dimensional lab failed '+e.message)}
 if(labErrors.length)problems.push(name+': dimensional lab JS errors '+labErrors.join(' | '));
 console.log('QA V4',name,JSON.stringify({overflow:info.scroll-width,heroImgs:info.heroImgs.map(x=>x.loaded),errors:errors.length}));
 await page.close();
}
await browser.close();await new Promise(r=>srv.close(r));
if(problems.length){console.error('QA V4 FAILED:\n'+problems.map(x=>'- '+x).join('\n'));process.exit(1)}
console.log('QA V4 PASS: copy, genuine screenshots, three personas, keyboard/touch, mobile nav, FAQ, five widths, zero JS errors');