import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';

const ROOT='http://127.0.0.1:8844/';
const server=spawn('python3',['-m','http.server','8844','--bind','127.0.0.1'],{stdio:'ignore'});
await mkdir('artifacts',{recursive:true});
let browser;
const errors=[];
const watch=(page,label)=>page.on('pageerror',e=>errors.push(label+': '+e.message));

try{
  let ready=false;
  for(let i=0;i<60;i++){
    if(server.exitCode!==null)throw Error('Local QA server stopped');
    try{const res=await fetch(ROOT);if(res.ok){ready=true;break}}catch{}
    await new Promise(resolve=>setTimeout(resolve,100));
  }
  assert.ok(ready,'Local HTTP server must be ready before browser tests');
  browser=await chromium.launch({headless:true,args:['--no-sandbox']});

  for(const [label,width,height] of [
    ['desktop',1440,900],['tablet',768,950],['mobile',390,844]
  ]){
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    watch(page,label);
    const response=await page.goto(ROOT,{waitUntil:'domcontentloaded',timeout:30000});
    assert.equal(response.status(),200,label+': home serves 200');
    await page.locator('.index-row').first().waitFor({timeout:18000});
    assert.equal(await page.locator('.gallery .scene').count(),4,label+': four real fullscreen projects');
    assert.equal(await page.locator('#project-index .index-row').count(),21,label+': 21 catalog entries');
    assert.equal(await page.locator('.hero-copy,.feature-card,.feature-grid').count(),0,label+': no competing hero/cards');
    assert.equal(await page.locator('.site-nav a').count(),3,label+': three top navigation choices');
    assert.equal(await page.locator('.scene-cta').count(),4,label+': direct CTA for each real case');
    assert.equal(await page.locator('#contacto a').count(),2,label+': only two contact channels');
    assert.equal(await page.locator('.scene-next').count(),4,label+': user-controlled progression');
    const box=await page.locator('.scene').first().boundingBox();
    assert.ok(Math.abs(box.y)<=2,label+': first image starts at top of viewport');
    assert.ok(box.height>=height*.96,label+': first image fills viewport');
    const cta=await page.locator('.scene-cta').first().boundingBox();
    assert.ok(cta.y>=0&&cta.y+cta.height<=height-12,label+': first project action visible without scrolling');
    assert.equal(await page.locator('.scene-archive-photo').first().getAttribute('fetchpriority'),'high',
      label+': hero image prioritized in initial HTML');
    const palette=await page.evaluate(()=>[
      '--ar-color-blue','--ar-color-violet','--ar-color-magenta',
      '--ar-color-orange','--ar-color-lime','--ar-color-glacier','--ar-color-ink'
    ].map(t=>getComputedStyle(document.documentElement).getPropertyValue(t).trim().toUpperCase()));
    assert.deepEqual(palette,['#245BFF','#6236FF','#F12BBE','#FF652F','#EFFF38','#F5FAFF','#101729'],
      label+': original seven colors');
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    assert.equal(overflow,false,label+': no horizontal overflow');
    await page.screenshot({path:'artifacts/v10-home-'+label+'.png',fullPage:false});

    if(label==='desktop'){
      await page.locator('.scene-next').first().click();
      await page.waitForTimeout(380);
      assert.ok(await page.evaluate(()=>scrollY>=innerHeight*.75),'Next is ordinary anchor navigation');
      await page.locator('.site-nav a[href="#proyectos"]').click();
      await page.waitForTimeout(380);
      await page.locator('.scene-cta').first().click();
      await page.waitForURL(/\/casos\/\?proyecto=archivo/);
      assert.equal(await page.locator('#case-title').innerText(),'ARCHIVO','Direct link opens real case');
      await page.goBack({waitUntil:'domcontentloaded'});
      await page.locator('.filter[data-filter="Datos"]').click();
      assert.equal(await page.locator('.filter[data-filter="Datos"]').getAttribute('aria-pressed'),'true',
        'Filtering controls expose selected state');
      assert.ok(await page.locator('.index-row').count()>=3,'Datos filter has results');
      await page.locator('#search-projects').fill('Radar');
      assert.equal(await page.locator('.index-row').count(),1,'Search narrows to Radar');
      await page.locator('.filter[data-filter="Todos"]').click();
      await page.locator('#search-projects').fill('');
      assert.equal(await page.locator('.index-row').count(),21,'Reset restores all 21 cases');
      await page.screenshot({path:'artifacts/v10-archive-desktop.png',fullPage:false});
    }
    if(label==='mobile'){
      const href=await page.locator('.site-nav a').last().getAttribute('href');
      assert.equal(href,'#contacto','Contact navigation remains visible on mobile');
      await page.locator('.scene-next').first().click();
      await page.waitForTimeout(380);
      assert.ok(await page.evaluate(()=>scrollY>=innerHeight*.73),'Mobile can scroll to second immersive work');
      await page.screenshot({path:'artifacts/v10-second-mobile.png',fullPage:false});
    }
    console.log('✓ fullscreen home:',label);
    await page.close();
  }

  for(const [id,expected] of [
    ['archivo','ARCHIVO'],['deep-geo','Deep Geo'],
    ['praxios-os','Praxios OS'],['visual-art-ai','Visual Art AI'],
    ['conv-os','Conv OS']
  ]){
    for(const [label,width,height] of [['desktop',1440,900],['mobile',390,844]]){
      const page=await browser.newPage({viewport:{width,height}});
      watch(page,'case-'+id+'-'+label);
      const res=await page.goto(ROOT+'casos/?proyecto='+id,{waitUntil:'domcontentloaded'});
      assert.equal(res.status(),200,id+': case URL serves 200');
      await page.locator('.case-opening').waitFor();
      assert.equal(await page.locator('#case-title').innerText(),expected,id+': project name, not generic claim');
      assert.equal(await page.locator('.case-opening .case-stage').count(),1,id+': visual precedes case copy');
      const opening=await page.locator('.case-opening').boundingBox();
      assert.ok(opening.height>=height*.7,id+': immersive hero is nearly viewport height');
      const title=await page.locator('#case-title').boundingBox();
      assert.ok(title.y>=0&&title.y+title.height<=height-5,id+': title visible in first viewport');
      assert.equal(await page.locator('#historia').count(),1,id+': context remains');
      assert.equal(await page.locator('#decisiones').count(),1,id+': decisions remain');
      assert.equal(await page.locator('#evidencia').count(),1,id+': evidence remains');
      assert.ok(await page.locator('.decision').count()>=2,id+': documented decision detail');
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
      assert.equal(overflow,false,id+': no horizontal overflow');
      if(id==='archivo')assert.equal(await page.locator('.case-archive-hero').count(),1,'Real original photo prioritized');
      if(id==='deep-geo')assert.match(await page.locator('.scene-caption').innerText(),/conceptual/i,'Map is explicitly conceptual');
      if(id==='praxios-os')assert.match(await page.locator('.scene-caption').innerText(),/dossier/i,'Dossier not operational console');
      await page.screenshot({path:'artifacts/v10-case-'+id+'-'+label+'.png',fullPage:false});
      await page.close();
    }
    console.log('✓ fullscreen case:',id);
  }

  for(const [path,selector,label] of [
    ['perfil/','.profile-facts','profile'],['brand/','body','brand'],['brand/lab/','.swatch','design-lab']
  ]){
    const page=await browser.newPage({viewport:{width:390,height:844}});
    watch(page,label);
    const res=await page.goto(ROOT+path,{waitUntil:'domcontentloaded'});
    assert.equal(res.status(),200,label+': route accessible');
    await page.locator(selector).first().waitFor();
    if(label==='profile'){
      assert.match(await page.locator('.profile-facts').innerText(),/Ingeniería en Data Science[\s\S]*En curso/,
        'Degree described positively and precisely');
      assert.equal(await page.locator('.proof-grid a').count(),4,'Profile has four proof cards');
    }
    if(label==='design-lab')assert.equal(await page.locator('.swatch').count(),7,'Seven brand swatches');
    await page.screenshot({path:'artifacts/v10-'+label+'-mobile.png',fullPage:false});
    await page.close();
  }

  // Emulation of reduced motion: no animation required for reading or navigation.
  const reducedPage=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  watch(reducedPage,'reduced-motion');
  await reducedPage.goto(ROOT,{waitUntil:'domcontentloaded'});
  assert.ok(await reducedPage.locator('.scene-cta').first().isVisible(),'Reduced motion keeps work actionable');
  await reducedPage.close();

  assert.equal(errors.length,0,'No JavaScript errors: '+errors.join('; '));
  console.log('✓ V10 visual QA: no JS errors, fullscreen mobile/desktop, 21 cases and evidence routes');
}finally{
  if(browser)await browser.close();
  server.kill('SIGTERM');
}
