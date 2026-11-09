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
    assert.match(await page.locator('#hero-title').innerText(),/mira lo que[\s\S]*construí/i,`${label}: el trabajo se presenta antes del discurso`);
    assert.match(await page.locator('.hero .eyebrow').innerText(),/Alexis Reyes/i,`${label}: identidad profesional presente`);
    assert.doesNotMatch(await page.locator('#hero-title').innerText(),/Soy Alexis Reyes/i,`${label}: sin presentación genérica`);
    assert.ok(await page.locator('.profile-spotlight-action[href="perfil/"]').count(),`${label}: enlace a trayectoria detallada`);
    assert.match(await page.locator('.hero-lead').innerText(),/cuatro proyectos.*problema.*abordé/i,`${label}: invitación breve a explorar cuatro casos`);
    assert.ok((await page.locator('.hero-lead').innerText()).split(/\s+/).length<=34,`${label}: portada sin párrafo excesivo`);
    assert.equal(await page.locator('#que-hago .problem-card').count(),3,`${label}: tres rutas por problemas con casos reales`);
    assert.equal(await page.locator('#capacidades .capability').count(),6,`${label}: seis capacidades profesionales conservadas`);
    assert.equal(await page.locator('#metodo .direction-steps li').count(),6,`${label}: método de seis decisiones y etapas`);
    assert.equal(await page.locator('#exploracion .creative-shot').count(),2,`${label}: dirección de arte con dos materiales originales declarados`);
    assert.equal(await page.locator('#direccion-ia .ai-diagram').count(),1,`${label}: dirección de IA explicada y rotulada como diagrama`);
    assert.equal(await page.locator('.hero-actions a').count(),0,`${label}: los proyectos, no un botón intermedio, son la primera acción`);
    assert.equal(await page.locator('.hero-archive-link[href="#explorar"]').count(),1,`${label}: acceso directo al archivo completo`);
    const portfolioOrder=await page.evaluate(()=>document.querySelector('#proyectos').compareDocumentPosition(document.querySelector('#que-hago'))&Node.DOCUMENT_POSITION_FOLLOWING);
    assert.ok(portfolioOrder,`${label}: los casos aparecen antes de rutas extensas`);
    assert.ok(await page.locator('.featured').evaluate(el=>el.previousElementSibling?.classList.contains('hero-v8')),`${label}: la galería sigue de inmediato a una presentación mínima`);
    const order2=await page.evaluate(()=>document.querySelector('#proyectos').compareDocumentPosition(document.querySelector('#explorar'))&Node.DOCUMENT_POSITION_FOLLOWING);
    assert.ok(order2,`${label}: archivo íntegro llega después de la selección visual`);
    const order3=await page.evaluate(()=>document.querySelector('#explorar').compareDocumentPosition(document.querySelector('#que-hago'))&Node.DOCUMENT_POSITION_FOLLOWING);
    assert.ok(order3,`${label}: los 21 proyectos anteceden a las explicaciones largas`);

    assert.equal(await page.locator('.feature-case-link').count(),4,`${label}: cuatro enlaces a casos completos`);
    assert.equal(await page.locator('.feature-live-link').count(),3,`${label}: sitios y dossier distinguibles`);
    assert.equal(await page.locator('.feature-public-note').count(),1,`${label}: la investigación sin demo no se anuncia como demo`);
    assert.equal(await page.locator('button').evaluateAll(btns=>btns.filter(b=>!b.getAttribute('aria-label')&&!b.textContent.trim()&&!b.getAttribute('title')).length),0,`${label}: todos los botones tienen nombre accesible`);
    assert.equal(await page.locator('.brand-lockup img').count(),2,`${label}: logos vectoriales en header y footer`);
    assert.equal(await page.locator('.creative-section').count(),1,`${label}: caso editorial de exploración y dirección de arte`);
    const identity=await page.evaluate(()=>({
      display:getComputedStyle(document.querySelector('#hero-title')).fontFamily,
      art:getComputedStyle(document.querySelector('.feature-visual')).backgroundColor,
      blue:getComputedStyle(document.documentElement).getPropertyValue('--ar-color-blue').trim()==='#245BFF'?'rgb(36, 91, 255)':'missing',
      cover:document.querySelector('.brand-lockup img').getAttribute('src'),
      typeWeight:getComputedStyle(document.querySelector('.hero-head-bold')).fontWeight
    }));
    assert.match(identity.display,/Archivo/,`${label}: tipografía Archivo aplicada`);
    assert.match(identity.art,/rgb\(/,`${label}: tarjeta usa superficie cromática definida`);
    assert.equal(await page.locator('.hero-project-stage .stage-card').count(),0,`${label}: no se duplica una galería decorativa antes de las obras`);
    assert.equal(await page.locator('.project-browser-preview img').count(),1,`${label}: material público usado como vista de interfaz dentro del arte`);
    assert.ok(await page.locator('.feature-card [data-project="archivo"]').count(),`${label}: ARCHIVO abre desde su pieza protagonista`);
    assert.equal(identity.blue,'rgb(36, 91, 255)',`${label}: azul de marca disponible sin añadir botones al hero`);
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
    if(label==='desktop'){const b=await page.locator('.feature-card').first().boundingBox();const visual=await page.locator('.feature-card .feature-visual').first().boundingBox();console.log('FIRST_FOLD_Y_DESKTOP',Math.round(b.y),'ART_HEIGHT',Math.round(visual.height));await page.screenshot({path:'artifacts/desktop-first-fold.png',fullPage:false});assert.ok(b.y<430,'La primera obra ocupa la mitad superior del primer viewport');assert.ok(visual.height>=300,'La obra tiene espacio visual real, no aspecto de thumbnail');}
    if(label==='mobile'){const b=await page.locator('.feature-card').first().boundingBox();const visual=await page.locator('.feature-card .feature-visual').first().boundingBox();console.log('FIRST_FOLD_Y_MOBILE',Math.round(b.y),'ART_HEIGHT',Math.round(visual.height));assert.ok(b.y<390,'El primer proyecto es protagonista desde la mitad superior de la pantalla móvil');assert.ok(visual.height>=270,'La imagen principal en móvil debe tener altura editorial, no 140px');}
    await page.waitForTimeout(850);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    if(overflow){const offenders=await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.right>innerWidth+2||r.left< -2}).slice(0,12).map(el=>({tag:el.tagName,cls:el.className?.baseVal||el.className,left:Math.round(el.getBoundingClientRect().left),right:Math.round(el.getBoundingClientRect().right)}))); console.log('Overflow offenders',JSON.stringify(offenders))}
    assert.equal(overflow,false,`${label}: sin scroll horizontal`);
    await page.screenshot({path:`artifacts/${label}.png`,fullPage:true});
    if (label==='desktop'){
      await page.locator('.feature-case-link').first().click();
      await page.waitForURL(/\/casos\/\?proyecto=archivo/);
      assert.match(await page.locator('#case-title').innerText(),/doce marcas/i,'ARCHIVO abre una experiencia editorial completa');
      assert.equal(await page.locator('.stage-archivo').count(),1,'ARCHIVO tiene escena original');
      assert.equal(await page.locator('.archive-browser').count(),1,'ARCHIVO incluye composición editorial del catálogo');
      assert.match(await page.locator('.shop-concept-disclosure').innerText(),/NO CAPTURA DE INTERFAZ/i,'El montaje no se hace pasar por una captura exacta');
      await page.screenshot({path:'artifacts/case-archivo-first.png',fullPage:false});
      await page.goBack({waitUntil:'domcontentloaded'});
      await page.locator('.feature-case-link').nth(1).click();
      await page.waitForURL(/\/casos\/\?proyecto=deep-geo/);
      assert.equal(await page.locator('.stage-geo').count(),1,'Deep Geo tiene composición territorial propia');
      assert.match(await page.locator('.scene-caption').innerText(),/conceptual/i,'Mapa no se anuncia como vista operativa');
      assert.equal(await page.locator('.decision').count(),3,'Deep Geo explica decisiones verificadas');
      await page.screenshot({path:'artifacts/case-deep-geo.png',fullPage:false});
      await page.goBack({waitUntil:'domcontentloaded'});
      await page.locator('.problem-card a[data-project="deep-geo"]').click();
      assert.equal(await page.locator('#modal-title').innerText(),'Deep Geo','La vista rápida histórica sigue disponible');
      assert.equal(await page.locator('.case-keypoint').count(),2,'Vista rápida conserva problema y contribución');
      assert.equal(await page.locator('.case-more').getAttribute('open'),null,'Los detalles técnicos empiezan cerrados');
      await page.locator('.case-more summary').click();
      assert.notEqual(await page.locator('.case-more').getAttribute('open'),null,'El detalle se puede expandir');
      assert.equal(await page.locator('.case-decision').count(),3,'Vista rápida conserva decisiones');
      assert.equal(await page.locator('.case-link-primary').count(),0,'Deep Geo no anuncia demo operativa');
      assert.equal(await page.locator('.case-link-page').count(),1,'La vista rápida ofrece presentación extensa');
      assert.equal(await page.locator('.featured-direct a').count(),4,'Cuatro rutas adicionales a casos o archivo');
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
      await page.locator('.feature-case-link').first().click();
      await page.waitForURL(/\/casos\/\?proyecto=archivo/);
      assert.equal(await page.locator('.stage-archivo').count(),1,'Acceso móvil abre experiencia visual de ARCHIVO');
      await page.screenshot({path:'artifacts/case-archivo-mobile-first.png',fullPage:false});
      await page.goBack({waitUntil:'domcontentloaded'});
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
    assert.match(await page.locator('#case-title').innerText(),/doce marcas/i,'El perfil conecta con la experiencia de caso');
    await page.close();
    console.log('✓ '+label+': trayectoria, formación, áreas, evidencias y navegación');
  }

  // Estándar de las presentaciones inmersivas: cuatro direcciones visuales y
  // una ficha editorial para los otros diecisiete proyectos.
  for (const [id,sceneClass] of [
    ['archivo','stage-archivo'],
    ['deep-geo','stage-geo'],
    ['praxios-os','stage-praxios'],
    ['visual-art-ai','stage-visual'],
    ['conv-os','stage-tech']
  ]){
    for (const [label,width,height] of [['desktop',1440,900],['mobile',390,844]]){
      const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
      page.on('pageerror',err=>errors.push('case-'+id+'-'+label+': '+err.message));
      const response=await page.goto('http://127.0.0.1:8844/casos/?proyecto='+id,{waitUntil:'domcontentloaded',timeout:30000});
      assert.equal(response.status(),200,id+' '+label+': URL propia disponible');
      await page.locator('#case-title').waitFor({timeout:15000});
      assert.equal(await page.locator('.'+sceneClass).count(),1,id+' '+label+': arte específico de su caso');
      assert.equal(await page.locator('.case-stage').count(),1,id+' '+label+': la obra visual es protagonista');
      assert.equal(await page.locator('.story-section').count(),1,id+' '+label+': relato');
      assert.equal(await page.locator('.decision').count()>=2,true,id+' '+label+': decisiones del proyecto');
      assert.equal(await page.locator('.evidence-section').count(),1,id+' '+label+': evidencia y límites visibles');
      assert.equal(await page.locator('.case-header a.case-back').getAttribute('href'),'../#proyectos',id+' '+label+': vuelta a portafolio');
      const stageBox=await page.locator('.case-stage').boundingBox();
      assert.ok(stageBox.width>=width-60,id+' '+label+': escena ocupa casi todo el ancho');
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
      assert.equal(overflow,false,id+' '+label+': sin desbordamiento horizontal');
      if(id==='deep-geo'){
        assert.match(await page.locator('.scene-caption').innerText(),/conceptual/i,'No se confunde ilustración con mapa activo');
        assert.equal(await page.locator('.evidence-links a').count()>=0,true,'No se inventan demos');
      }
      if(id==='praxios-os')assert.match(await page.locator('.flow-label').innerText(),/NO CONSOLA/i,'Diagrama IA rotulado');
      if(id==='archivo'){assert.equal(await page.locator('.material-1').count(),1,'Galería con material editorial real');assert.match(await page.locator('.shop-concept-disclosure').innerText(),/MONTAJE EDITORIAL/i,'Visual conceptual etiquetado');}
      if(id==='visual-art-ai')assert.equal(await page.locator('.visual-device').count(),1,'Visual Art AI tiene presentación de dispositivo');
      await page.screenshot({path:'artifacts/case-'+id+'-'+label+'.png',fullPage:true});
      await page.close();
    }
    console.log('✓ historia inmersiva:',id);
  }
  // Enlace no reconocido: sin error JS, selección clara de proyectos.
  {
    const page=await browser.newPage({viewport:{width:390,height:844}});
    page.on('pageerror',err=>errors.push('case-index: '+err.message));
    await page.goto('http://127.0.0.1:8844/casos/?proyecto=inexistente',{waitUntil:'domcontentloaded'});
    assert.equal(await page.locator('.case-not-found .related-card').count(),4,'Ruta desconocida propone cuatro proyectos documentados');
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
