import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';

const server=spawn('python3',['-m','http.server','8844'],{stdio:'ignore'});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
await mkdir('artifacts',{recursive:true});
const errors=[];
try{
  for (const [label,width,height] of [['desktop',1440,900],['tablet',768,950],['mobile',390,844]]){
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    page.on('pageerror',e=>errors.push(`${label}: ${e.message}`));
    await page.goto('http://127.0.0.1:8844/',{waitUntil:'domcontentloaded',timeout:30000});
    await page.locator('.work-card').first().waitFor({timeout:25000});
    assert.equal(await page.locator('.feature-card').count(),4,`${label}: cuatro destacados`);
    assert.equal(await page.locator('.feature-card .art-topline').count(),4,`${label}: cuatro universos de arte con metadata propia`);
    assert.equal(await page.locator('.feature-card .art-title, .feature-card .art-visible-stamp').count(),4,`${label}: dirección tipográfica diferenciada`);
    assert.equal(await page.locator('.work-card').count(),21,`${label}: catálogo completo`);
    const covers=await page.locator('.work-card img').evaluateAll(elements=>elements.map(el=>el.getAttribute('src')));
    assert.ok(new Set(covers).size>=20,`${label}: dirección de arte individual por proyecto`);
    if(label==='desktop'){const b=await page.locator('.feature-card').first().boundingBox();console.log('FIRST_FOLD_Y_DESKTOP',Math.round(b.y));await page.screenshot({path:'artifacts/desktop-first-fold.png',fullPage:false});assert.ok(b.y<655,'Los proyectos destacados son visibles sin desplazamiento');}
    if(label==='mobile')assert.ok((await page.locator('.feature-card').first().boundingBox()).y<700,'Los proyectos empiezan dentro de la primera pantalla móvil');
    await page.waitForTimeout(850);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    if(overflow){const offenders=await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.right>innerWidth+2||r.left< -2}).slice(0,12).map(el=>({tag:el.tagName,cls:el.className?.baseVal||el.className,left:Math.round(el.getBoundingClientRect().left),right:Math.round(el.getBoundingClientRect().right)}))); console.log('Overflow offenders',JSON.stringify(offenders))}
    assert.equal(overflow,false,`${label}: sin scroll horizontal`);
    await page.screenshot({path:`artifacts/${label}.png`,fullPage:true});
    if (label==='desktop'){
      await page.locator('.feature-card').nth(1).click();
      assert.equal(await page.locator('#modal-title').innerText(),'Deep Geo');
      assert.equal(await page.locator('dialog').evaluate(d=>d.open),true);
      assert.match(page.url(),/proyecto=deep-geo/);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('dialog').evaluate(d=>d.open),false);
      await page.getByRole('button',{name:/Datos/}).first().click();
      assert.ok(await page.locator('.work-card').count()>=3);
      await page.locator('#search-projects').fill('Radar');
      assert.equal(await page.locator('.work-card').count(),1);
    }
    if (label==='mobile'){
      await page.locator('#menu-toggle').click();
      assert.equal(await page.locator('#mobile-menu').isVisible(),true);
      await page.locator('#menu-toggle').click();
    }
    console.log(`✓ ${label}: contenidos, responsive, interacciones básicas`);
    await page.close();
  }


  // AR Estudio Brand Experience: portada editorial, archivos de marca y responsive.
  for(const [label,width,height] of [['brand-desktop',1440,900],['brand-tablet',768,950],['brand-mobile',390,844]]){
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    page.on('pageerror',e=>errors.push(label+': '+e.message));
    await page.goto('http://127.0.0.1:8844/brand/',{waitUntil:'domcontentloaded',timeout:30000});
    assert.equal(await page.locator('.palette-card').count(),4,label+': cuatro sistemas cromáticos');
    assert.equal(await page.locator('.application-image img').count(),3,label+': tres piezas editoriales');
    assert.equal(await page.locator('.showcase-main img').count(),1,label+': signo principal');
    assert.ok(await page.locator('#hero-heading').isVisible(),label+': hero visible');
    const cssState=await page.evaluate(()=>{
      const loaded=getComputedStyle(document.documentElement).getPropertyValue('--ar-brand-css-loaded').trim();
      const hero=getComputedStyle(document.querySelector('.hero-copy h1'));
      const visual=getComputedStyle(document.querySelector('.hero-visual'));
      const grid=getComputedStyle(document.querySelector('.hero-shell'));
      return {loaded,font:parseFloat(hero.fontSize),grid:grid.display,gradient:visual.backgroundImage};
    });
    assert.equal(cssState.loaded,'1',label+': CSS externo cargado');
    assert.equal(cssState.grid,'grid',label+': hero con dos columnas en desktop y composición responsiva');
    assert.ok(cssState.font>40,label+': tipografía display aplicada');
    assert.match(cssState.gradient,/gradient/,label+': hero con identidad cromática');
    const typeState=await page.evaluate(()=>{
      const title=document.querySelector('#hero-heading');
      const serif=document.querySelector('.hero-serif');
      const bold=document.querySelector('.hero-strong');
      const a=getComputedStyle(serif),b=getComputedStyle(bold);
      const sr=serif.getBoundingClientRect(),tr=title.getBoundingClientRect();
      return {serifFont:a.fontFamily,serifStyle:a.fontStyle,boldFont:b.fontFamily,boldWeight:b.fontWeight,serifWidth:sr.width,parentWidth:tr.width}
    });
    assert.match(typeState.serifFont,/Instrument Serif/,label+': serif editorial declarada');
    assert.equal(typeState.serifStyle,'italic',label+': serif italiana real, no cursiva falsa');
    assert.match(typeState.boldFont,/Syne/,label+': sans expresiva declarada');
    assert.equal(typeState.boldWeight,'800',label+': titulares extra bold');
    assert.ok(typeState.serifWidth<=typeState.parentWidth+3,label+': serif dentro de la columna');
    assert.equal(await page.locator('.hero-serif').count(),1,label+': contrapunto editorial principal');


    assert.ok(await page.locator('a[href="lab/"]').count()>=1,label+': acceso al laboratorio');
    if(width<=900){
      await page.locator('#brand-menu-toggle').click();
      assert.equal(await page.locator('#brand-menu-toggle').getAttribute('aria-expanded'),'true');
      assert.equal(await page.locator('#brand-nav').isVisible(),true);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#brand-nav').isVisible(),false);
    }
    await page.locator('.palette-card').first().click();
    await page.waitForTimeout(350);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    if(overflow)console.log(label+' overflow:',await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(el=>{let r=el.getBoundingClientRect();return r.right>innerWidth+2||r.left<-2}).slice(0,12).map(x=>({tag:x.tagName,class:x.className}))));
    assert.equal(overflow,false,label+': sin desplazamiento horizontal');
    await page.screenshot({path:'artifacts/'+label+'.png',fullPage:true});
    await page.close();
    console.log('✓ '+label+': identidad, aplicaciones y responsive');
  }
  // Design System Lab: escala real de tokens, contrastes y estados.
  for(const [label,width,height] of [['lab-desktop',1440,900],['lab-tablet',768,950],['lab-mobile',390,844]]){
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    page.on('pageerror',e=>errors.push(label+': '+e.message));
    await page.goto('http://127.0.0.1:8844/brand/lab/',{waitUntil:'domcontentloaded',timeout:30000});
    assert.equal(await page.locator('.swatch').count(),7,label+': siete colores');
    const labCSS=await page.evaluate(()=>({
      loaded:getComputedStyle(document.documentElement).getPropertyValue('--ar-brand-css-loaded').trim(),
      layout:getComputedStyle(document.querySelector('.lab-hero-grid')).display,
      titleSize:parseFloat(getComputedStyle(document.querySelector('.lab-hero h1')).fontSize)
    }));
    assert.equal(labCSS.loaded,'1',label+': CSS externo del laboratorio cargado');
    assert.equal(labCSS.layout,'grid',label+': retícula del laboratorio aplicada');
    assert.equal(await page.locator('.sample.editorial').count(),1,label+': specimen serif expresiva');
    assert.equal(await page.locator('.typographic-poster').count(),1,label+': composición tipográfica de la marca');
    const specimen=await page.locator('.sample.editorial').evaluate(el=>getComputedStyle(el).fontFamily);
    assert.match(specimen,/Instrument Serif/,label+': fuente serif documentada');

    assert.ok(labCSS.titleSize>40,label+': escala editorial aplicada');

    await page.locator('#spacing-demo .spacing-item').first().waitFor({timeout:10000});
    assert.equal(await page.locator('#spacing-demo .spacing-item').count(),10,label+': 10 espacios desde tokens.json');
    assert.equal((await page.locator('#spacing-demo .spacing-item').first().innerText()).replace(/\s+/g,' ').trim(),'space-1 4px',label+': space-1 representa 4px');
    assert.ok(await page.locator('#semantic-list .token-row').count()>=10,label+': tokens semánticos');
    await page.locator('#contrast-fg').selectOption('#F12BBE');
    await page.locator('#contrast-bg').selectOption('#FFFFFF');
    assert.match(await page.locator('#contrast-result').innerText(),/AA normal ✕/);
    await page.locator('#demo-field').fill('correo-invalido');
    await page.locator('#validate-email').click();
    assert.equal(await page.locator('#demo-field').getAttribute('aria-invalid'),'true');
    await page.locator('#demo-field').fill('demo@ejemplo.cl');
    await page.locator('#validate-email').click();
    assert.equal(await page.locator('#demo-field').getAttribute('aria-invalid'),'false');
    await page.locator('.chip').nth(1).click();
    assert.equal(await page.locator('.chip').nth(1).getAttribute('aria-pressed'),'true');
    await page.locator('#loading-demo').click();
    assert.equal(await page.locator('#loading-demo').getAttribute('aria-busy'),'true');
    if(width<=900){await page.locator('#brand-menu-toggle').click();assert.equal(await page.locator('#brand-nav').isVisible(),true);}
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    assert.equal(overflow,false,label+': sin desplazamiento horizontal');
    await page.screenshot({path:'artifacts/'+label+'.png',fullPage:true});
    await page.close();
    console.log('✓ '+label+': tokens, contrastes, controles y responsive');
  }
  const reducedPage=await browser.newPage({viewport:{width:1200,height:800},reducedMotion:'reduce'});
  await reducedPage.goto('http://127.0.0.1:8844/brand/lab/',{waitUntil:'domcontentloaded'});
  await reducedPage.locator('#replay').click();
  assert.match(await reducedPage.locator('#toast').innerText(),/Movimiento reducido/);
  await reducedPage.close();

  // Falla controlada de CSS externo: el HTML debe mantener una composición editorial básica.
  const fallbackPage=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1});
  await fallbackPage.route('**/brand.css?*',route=>route.abort());
  await fallbackPage.goto('http://127.0.0.1:8844/brand/',{waitUntil:'load'});
  await fallbackPage.locator('#brand-css-warning').waitFor({timeout:10000});
  const fallback=await fallbackPage.evaluate(()=>({
    titleSize:parseFloat(getComputedStyle(document.querySelector('#hero-heading')).fontSize),
    heroDisplay:getComputedStyle(document.querySelector('.hero-shell')).display,
    artBG:getComputedStyle(document.querySelector('.hero-visual')).backgroundImage
  }));
  assert.ok(fallback.titleSize>40,'CSS crítico mantiene jerarquía si falla el externo');
  assert.equal(fallback.heroDisplay,'grid','CSS crítico mantiene retícula');
  assert.match(fallback.artBG,/gradient/,'CSS crítico conserva base cromática');
  await fallbackPage.screenshot({path:'artifacts/brand-css-fallback.png',fullPage:false});
  await fallbackPage.close();
  assert.equal(errors.length,0,'Sin errores JavaScript: '+errors.join('; '));
  console.log('✓ Sin errores JavaScript');
}finally{await browser.close();server.kill('SIGTERM')}
