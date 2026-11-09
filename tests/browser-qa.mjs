import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';

const server=spawn('python3',['-m','http.server','8844'],{stdio:'ignore'});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
await mkdir('artifacts',{recursive:true});
const errors=[];
try{
  // El servidor local arranca de forma asíncrona. Antes la primera navegación
  // podía adelantarse y producir ERR_CONNECTION_REFUSED en CI cargados.
  let ready=false;
  for(let attempt=0;attempt<40;attempt++){
    if(server.exitCode!==null)throw new Error('Servidor de QA terminó antes de responder');
    try{
      const response=await fetch('http://127.0.0.1:8844/');
      if(response.ok){ready=true;break}
    }catch{/* aún arrancando */}
    await new Promise(resolve=>setTimeout(resolve,125));
  }
  assert.ok(ready,'Servidor HTTP listo antes de abrir Chromium');
  for (const [label,width,height] of [['desktop',1440,900],['tablet',768,950],['mobile',390,844]]){
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    page.on('pageerror',e=>errors.push(`${label}: ${e.message}`));
    await page.goto('http://127.0.0.1:8844/',{waitUntil:'domcontentloaded',timeout:30000});
    await page.locator('.work-card').first().waitFor({timeout:25000});
    assert.equal(await page.locator('.feature-card').count(),4,`${label}: cuatro destacados`);
    assert.match(await page.locator('#hero-title').innerText(),/las buenas ideas[\s\S]*se trabajan/i,`${label}: titular editorial breve`);
    assert.match(await page.locator('.hero .eyebrow').innerText(),/Alexis Reyes/i,`${label}: identidad profesional presente`);
    assert.doesNotMatch(await page.locator('#hero-title').innerText(),/Soy Alexis Reyes/i,`${label}: sin presentación genérica`);
    assert.ok(await page.locator('.profile-spotlight-action[href="perfil/"]').count(),`${label}: enlace a trayectoria detallada`);
    assert.match(await page.locator('.hero-lead').innerText(),/marcas.*datos.*software/i,`${label}: presentación breve y concreta de las tres áreas`);
    assert.ok((await page.locator('.hero-lead').innerText()).split(/\s+/).length<=34,`${label}: portada sin párrafo excesivo`);
    assert.equal(await page.locator('#que-hago .problem-card').count(),3,`${label}: tres rutas por problemas con casos reales`);
    assert.equal(await page.locator('#capacidades .capability').count(),6,`${label}: seis capacidades profesionales conservadas`);
    assert.equal(await page.locator('#metodo .direction-steps li').count(),6,`${label}: método de seis decisiones y etapas`);
    assert.equal(await page.locator('#exploracion .creative-shot').count(),2,`${label}: dirección de arte con dos materiales originales declarados`);
    assert.equal(await page.locator('#direccion-ia .ai-diagram').count(),1,`${label}: dirección de IA explicada y rotulada como diagrama`);
    assert.equal(await page.locator('.hero-actions a').count(),1,`${label}: un solo CTA en portada`);
    assert.equal(await page.locator('.hero-actions a[href="#proyectos"]').count(),1,`${label}: CTA abre trabajos`);
    const portfolioOrder=await page.evaluate(()=>document.querySelector('#proyectos').compareDocumentPosition(document.querySelector('#que-hago'))&Node.DOCUMENT_POSITION_FOLLOWING);
    assert.ok(portfolioOrder,`${label}: los casos aparecen antes de rutas extensas`);
    assert.equal(await page.locator('.feature-case-link').count(),4,`${label}: cuatro enlaces a casos completos`);
    assert.equal(await page.locator('.feature-live-link').count(),3,`${label}: sitios y dossier distinguibles`);
    assert.equal(await page.locator('.feature-public-note').count(),1,`${label}: la investigación sin demo no se anuncia como demo`);
    assert.equal(await page.locator('button').evaluateAll(btns=>btns.filter(b=>!b.getAttribute('aria-label')&&!b.textContent.trim()&&!b.getAttribute('title')).length),0,`${label}: todos los botones tienen nombre accesible`);
    assert.equal(await page.locator('.brand-lockup img').count(),2,`${label}: logos vectoriales en header y footer`);
    assert.equal(await page.locator('.creative-section').count(),1,`${label}: caso editorial de exploración y dirección de arte`);
    const identity=await page.evaluate(()=>({
      display:getComputedStyle(document.querySelector('#hero-title')).fontFamily,
      art:getComputedStyle(document.querySelector('.hero-art')).backgroundImage,
      blue:getComputedStyle(document.querySelector('.btn-solid')).backgroundColor,
      cover:document.querySelector('.brand-lockup img').getAttribute('src'),
      typeWeight:getComputedStyle(document.querySelector('.hero-head-bold')).fontWeight
    }));
    assert.match(identity.display,/Archivo/,`${label}: tipografía Archivo aplicada`);
    assert.match(identity.art,/gradient/,`${label}: galería introductoria usa colores oficiales`);
    assert.equal(await page.locator('.hero-project-stage .stage-card').count(),3,`${label}: entrada visual a arte, datos y sistemas`);
    assert.equal(await page.locator('.entry-paths a[data-project]').count(),3,`${label}: rutas móviles accesibles hacia los mismos casos`);
    assert.ok(await page.locator('.entry-paths a[data-project="archivo"]').count(),`${label}: acceso directo a ARCHIVO`);
    assert.equal(identity.blue,'rgb(36, 91, 255)',`${label}: botón usa azul de marca`);
    const palette=await page.evaluate(()=>['--ar-color-blue','--ar-color-violet','--ar-color-magenta','--ar-color-orange','--ar-color-lime','--ar-color-glacier','--ar-color-ink'].map(t=>getComputedStyle(document.documentElement).getPropertyValue(t).trim().toUpperCase()));
    assert.deepEqual(palette,['#245BFF','#6236FF','#F12BBE','#FF652F','#EFFF38','#F5FAFF','#101729'],`${label}: los siete colores oficiales siguen intactos`);
    assert.match(identity.cover,/horizontal-transparente-tinta\.svg/,`${label}: logo maestro original en cabecera`);
    assert.equal(identity.typeWeight,'900',`${label}: jerarquía tipográfica black`);
    assert.equal(await page.locator('.feature-card .art-topline').count(),4,`${label}: cuatro universos de arte con metadata propia`);
    assert.equal(await page.locator('.feature-card .feature-visual-signet').count(),4,`${label}: firma editorial distinta en cuatro casos`);
    assert.equal(await page.locator('.feature-card .feature-heading h3').count(),4,`${label}: nombre aparece una sola vez en el área de lectura de cada caso`);
    assert.equal(await page.locator('.work-card').count(),21,`${label}: catálogo completo`);
    const covers=await page.locator('.work-card img').evaluateAll(elements=>elements.map(el=>el.getAttribute('src')));
    assert.ok(new Set(covers).size>=20,`${label}: dirección de arte individual por proyecto`);
    if(label==='desktop'){const b=await page.locator('.feature-card').first().boundingBox();console.log('FIRST_FOLD_Y_DESKTOP',Math.round(b.y));await page.screenshot({path:'artifacts/desktop-first-fold.png',fullPage:false});assert.ok(b.y<655,'Los proyectos destacados son visibles sin desplazamiento');}
    if(label==='mobile'){const b=await page.locator('.feature-card').first().boundingBox();console.log('FIRST_FOLD_Y_MOBILE',Math.round(b.y));assert.ok(b.y<700,'Los proyectos empiezan dentro de la primera pantalla móvil');}
    await page.waitForTimeout(850);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    if(overflow){const offenders=await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.right>innerWidth+2||r.left< -2}).slice(0,12).map(el=>({tag:el.tagName,cls:el.className?.baseVal||el.className,left:Math.round(el.getBoundingClientRect().left),right:Math.round(el.getBoundingClientRect().right)}))); console.log('Overflow offenders',JSON.stringify(offenders))}
    assert.equal(overflow,false,`${label}: sin scroll horizontal`);
    await page.screenshot({path:`artifacts/${label}.png`,fullPage:true});
    if (label==='desktop'){
      await page.locator('.stage-card-art').click();
      assert.equal(await page.locator('#modal-title').innerText(),'ARCHIVO','La entrada creativa de escritorio abre un proyecto real');
      await page.keyboard.press('Escape');
      await page.locator('.feature-case-link').nth(1).click();
      assert.equal(await page.locator('#modal-title').innerText(),'Deep Geo');
      assert.equal(await page.locator('.case-keypoint').count(),2,'El caso conserva problema y contribución dentro del detalle expandible');
      assert.equal(await page.locator('.case-more').getAttribute('open'),null,'Los detalles técnicos empiezan cerrados');
      assert.match(await page.locator('.case-story-lede').innerText(),/mapa.*preguntas/i,'La historia habla del problema real');
      await page.locator('.case-more summary').click();
      assert.notEqual(await page.locator('.case-more').getAttribute('open'),null,'Se pueden revelar decisiones y evidencia');
      assert.equal(await page.locator('.case-decision').count(),3,'Caso muestra decisiones concretas');
      assert.equal(await page.locator('.case-link-primary').count(),0,'Deep Geo sin demo pública no anuncia demo');
      assert.equal(await page.locator('.featured-direct a').count(),4,'Cuatro rutas adicionales a casos o archivo');
      await page.screenshot({path:'artifacts/case-deep-geo.png',fullPage:false});
      assert.equal(await page.locator('dialog').evaluate(d=>d.open),true);
      assert.match(page.url(),/proyecto=deep-geo/);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('dialog').evaluate(d=>d.open),false);
      await page.getByRole('button',{name:'Filtrar por Datos'}).click();
      assert.equal(await page.getByRole('button',{name:'Filtrar por Datos'}).getAttribute('aria-pressed'),'true','Datos queda seleccionado');
      assert.equal(await page.getByRole('button',{name:'Filtrar por Datos'}).evaluate(el=>el===document.activeElement),true,'El filtro mantiene el foco tras actualizar');
      assert.ok(await page.locator('.work-card').count()>=3);
      await page.locator('#search-projects').fill('Radar');
      assert.equal(await page.locator('.work-card').count(),1);
      await page.locator('#view-list').click();
      assert.equal(await page.locator('#view-list').getAttribute('aria-pressed'),'true','Vista lista activada');
      assert.equal(await page.locator('#view-grid').getAttribute('aria-pressed'),'false','Vista tarjetas desactivada');
      assert.equal(await page.locator('.work-grid').evaluate(el=>el.classList.contains('list-view')),true,'Lista aplicada al catálogo');
      await page.locator('#view-grid').click();
      assert.equal(await page.locator('#view-grid').getAttribute('aria-pressed'),'true','Vista tarjetas reactivada');
      await page.locator('#clear-filters').click();
      assert.equal(await page.getByRole('button',{name:'Filtrar por Todos'}).getAttribute('aria-pressed'),'true','Filtros restablecidos');
      assert.equal(await page.locator('.work-card').count(),21,'Volver a todos muestra todo el trabajo');
      await page.evaluate(()=>scrollTo({top:document.querySelector('#que-hago').offsetTop-100,behavior:'instant'}));
      await page.waitForTimeout(200);
      assert.equal(await page.locator('.main-nav a[href="#que-hago"]').getAttribute('aria-current'),'location','El menú refleja la sección visible');
    }
    if (label==='mobile'){
      await page.locator('.entry-paths a[data-project="archivo"]').click();
      assert.equal(await page.locator('#modal-title').innerText(),'ARCHIVO','Acceso móvil abre caso real');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#mobile-menu').isVisible(),false,'Menú móvil inicialmente oculto');
      await page.locator('#menu-toggle').click();
      assert.equal(await page.locator('#mobile-menu').isVisible(),true,'Menú móvil expandido');
      assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'true','Menú anuncia estado abierto');
      assert.equal(await page.locator('#menu-toggle').getAttribute('aria-label'),'Cerrar menú');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#mobile-menu').isVisible(),false,'Escape cierra menú');
      assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'false','Menú anuncia estado cerrado');
      assert.equal(await page.locator('#menu-toggle').evaluate(el=>el===document.activeElement),true,'Foco vuelve al disparador');
    }
    console.log(`✓ ${label}: contenidos, responsive, interacciones básicas`);
    await page.close();
  }



  // El perfil es un artefacto de primera clase, no un enlace a un sitio legado.
  for(const [label,width,height] of [['profile-desktop',1440,900],['profile-mobile',390,844]]){
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    page.on('pageerror',e=>errors.push(label+': '+e.message));
    const response=await page.goto('http://127.0.0.1:8844/perfil/',{waitUntil:'domcontentloaded',timeout:30000});
    assert.equal(response.status(),200,label+': perfil local disponible');
    assert.match(await page.locator('#page-title').innerText(),/Alexis Reyes/i,label+': identidad completa en perfil');
    assert.equal(await page.locator('.career-grid article').count(),3,label+': tres etapas de experiencia documentadas');
    assert.equal(await page.locator('.skills-grid article').count(),8,label+': ocho áreas de intervención');
    assert.equal(await page.locator('.proof-grid a').count(),4,label+': casos enlazados desde perfil');
    assert.match(await page.locator('.profile-facts').innerText(),/ingeniería en data science[\s\S]*en curso/i,label+': formación indicada claramente en curso');
    assert.doesNotMatch(await page.locator('.profile-facts').innerText(),/no título obtenido|no certificación del producto|estudios en desarrollo/i,label+': no presentar credenciales como una lista de negaciones');
    assert.equal(await page.locator('.profile-facts .profile-fact').count(),3,label+': tres credenciales bien diferenciadas');
    assert.equal(await page.locator('.proof-grid .proof-image img').count(),4,label+': cuatro obras con imagen etiquetada');
    const order=await page.evaluate(()=>document.querySelector('#evidencia').compareDocumentPosition(document.querySelector('#trayectoria'))&Node.DOCUMENT_POSITION_FOLLOWING);
    assert.ok(order,label+': los proyectos se muestran antes de la trayectoria extensa');
    assert.ok(await page.locator('.profile-actions a').count()>=2,label+': acciones del perfil');
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    assert.equal(overflow,false,label+': sin scroll horizontal');
    await page.screenshot({path:'artifacts/'+label+'.png',fullPage:true});
    await page.locator('.proof-grid a').first().click();
    assert.match(page.url(),/proyecto=archivo/,label+': perfil lleva directamente a caso');
    assert.equal(await page.locator('#modal-title').innerText(),'ARCHIVO');
    await page.close();
    console.log('✓ '+label+': trayectoria, formación, áreas, evidencias y navegación');
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
      const title=document.querySelector('#hero-heading'),regular=document.querySelector('.hero-regular'),bold=document.querySelector('.hero-strong');
      const a=getComputedStyle(regular),b=getComputedStyle(bold),rr=regular.getBoundingClientRect(),tr=title.getBoundingClientRect();
      return {regularFont:a.fontFamily,regularStyle:a.fontStyle,regularWeight:a.fontWeight,boldFont:b.fontFamily,boldWeight:b.fontWeight,regularWidth:rr.width,parentWidth:tr.width};
    });
    assert.match(typeState.regularFont,/Archivo/,label+': Archivo Regular');
    assert.equal(typeState.regularWeight,'400',label+': peso regular 400');
    assert.equal(typeState.regularStyle,'normal',label+': sin cursiva');
    assert.match(typeState.boldFont,/Archivo/,label+': Archivo Black');
    assert.equal(typeState.boldWeight,'900',label+': peso black 900');
    assert.ok(typeState.regularWidth<=typeState.parentWidth+3,label+': regular dentro de la columna');
    assert.equal(await page.locator('.hero-regular').count(),1,label+': acento tipográfico regular');


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
    // Los titulares importantes deben caber visualmente incluso con el recorte
    // decorativo del viewport activado.
    const headingClips=await page.evaluate(()=>{
      const ids=['#hero-heading','#concepto-title','#identity-title','#color-title','#app-title','#motion-title'];
      return ids.map(id=>{
        const el=document.querySelector(id);
        const rect=el.getBoundingClientRect(), range=document.createRange();
        range.selectNodeContents(el);
        const glyph=range.getBoundingClientRect();
        return {id,left:Math.round(glyph.left),right:Math.round(glyph.right),width:Math.round(rect.width)};
      }).filter(x=>x.left<-4||x.right>innerWidth+4)
    });
    assert.deepEqual(headingClips,[],label+': titulares sin cortes en el viewport');
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
    await page.locator('.logo-kit-card').first().waitFor({timeout:10000});
    assert.equal(await page.locator('.logo-kit-card').count(),26,label+': 26 variantes disponibles');
    await page.locator('#logo-kit-category').selectOption('Horizontal');
    assert.equal(await page.locator('.logo-kit-card').count(),4,label+': filtro horizontal');
    await page.locator('#logo-kit-category').selectOption('Todas');

    const labCSS=await page.evaluate(()=>({
      loaded:getComputedStyle(document.documentElement).getPropertyValue('--ar-brand-css-loaded').trim(),
      layout:getComputedStyle(document.querySelector('.lab-hero-grid')).display,
      titleSize:parseFloat(getComputedStyle(document.querySelector('.lab-hero h1')).fontSize)
    }));
    assert.equal(labCSS.loaded,'1',label+': CSS externo del laboratorio cargado');
    assert.equal(labCSS.layout,'grid',label+': retícula del laboratorio aplicada');
    assert.equal(await page.locator('.sample.regular-specimen').count(),1,label+': muestra Archivo Regular');
    assert.equal(await page.locator('.typographic-poster').count(),1,label+': composición tipográfica de la marca');
    const specimen=await page.locator('.sample.regular-specimen').evaluate(el=>getComputedStyle(el).fontFamily);
    assert.match(specimen,/Archivo/,label+': familia Archivo documentada');

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
