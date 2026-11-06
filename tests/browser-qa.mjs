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
    assert.equal(await page.locator('.work-card').count(),21,`${label}: catálogo completo`);
    const geometry=await page.evaluate(()=>({
      inner:innerWidth, root:document.documentElement.scrollWidth,
      body:document.body.scrollWidth,
      htmlOverflow:getComputedStyle(document.documentElement).overflowX,
      bodyOverflow:getComputedStyle(document.body).overflowX,
      offenders:[...document.querySelectorAll('body *')].filter(el=>{
        const r=el.getBoundingClientRect();const c=getComputedStyle(el);
        return (r.right>innerWidth+2||r.left< -2)&&c.position!=='fixed';
      }).slice(0,20).map(el=>{let r=el.getBoundingClientRect();return {tag:el.tagName,class:typeof el.className==='string'?el.className.slice(0,90):'',left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width)};})
    }));
    console.log('VIEW_GEOMETRY',label,JSON.stringify(geometry));
    await page.screenshot({path:`artifacts/${label}.png`,fullPage:true});
    const overflow=geometry.root>geometry.inner+1;
    assert.equal(overflow,false,`${label}: sin scroll horizontal (${geometry.root}px > ${geometry.inner}px)`);
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
  assert.equal(errors.length,0,`Sin errores JS: ${errors.join('; ')}`);
  console.log('✓ Sin errores JavaScript');
}finally{await browser.close();server.kill('SIGTERM')}