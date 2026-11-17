import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const source = pathToFileURL(resolve(process.cwd(), 'comercial/index.html')).href;
const browser = await chromium.launch({ headless: true });
const target = resolve(process.cwd(), 'qa-output/comercial');
await mkdir(target, { recursive: true });
const problems = [];
const cases = [
  {label:'desktop',width:1440,height:900},
  {label:'laptop',width:1280,height:800},
  {label:'tablet',width:820,height:1180},
  {label:'mobile',width:390,height:844},
  {label:'small-mobile',width:320,height:740},
];
for (const size of cases) {
  const page = await browser.newPage({ viewport: {width:size.width,height:size.height}, deviceScaleFactor:1, reducedMotion:'reduce' });
  const errors=[];
  page.on('pageerror', error=>errors.push(error.message));
  await page.goto(source,{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(200);
  const serviceButtons=page.locator('.solution-tile');
  const count=await serviceButtons.count();
  if(count!==8) problems.push(`${size.label}: expected 8 service cards, found ${count}`);
  await page.locator('.solution-tile[data-service="tienda"]').click();
  // TASTE_SERVICE_PROOF: the physical site screenshot must decode, not just a CSS placeholder.
  await page.locator('#stage-visual img').first().waitFor({state:'visible',timeout:5000});
  const proofImages=await page.locator('#stage-visual img').evaluateAll(async nodes => {
    await Promise.all(nodes.map(el=>el.decode().catch(()=>null)));
    return nodes.map(el=>({alt:el.alt,loaded:el.naturalWidth>0}));
  });
  if(proofImages.length<2 || proofImages.some(img=>!img.loaded)) problems.push(`${size.label}: commercial service preview images unavailable: ${JSON.stringify(proofImages)}`);
  const selected=await page.locator('.solution-tile[data-service="tienda"]').getAttribute('aria-pressed');
  const stage=await page.locator('#stage-title').innerText();
  if(selected!=='true'||!stage.includes('carrito')) problems.push(`${size.label}: service selector did not update the preview (${stage})`);
  await page.locator('.journey-step[data-step="2"]').click();
  const story=await page.locator('#journey-caption').innerText();
  if(!story.includes('compra')) problems.push(`${size.label}: story selector did not change the chapter`);

  const showroomCount=await page.locator('.showroom-card').count();
  if(showroomCount!==20) problems.push(`${size.label}: expected 20 showroom cards, got ${showroomCount}`);
  await page.locator('[data-gallery-filter="comercio"]').click();
  const commerceVisible=await page.locator('.showroom-card:visible').count();
  if(commerceVisible!==4) problems.push(`${size.label}: showroom commerce filter returned ${commerceVisible}, expected 4`);
  await page.locator('[data-gallery-filter="todos"]').click();
  await page.locator('#showroom-more').click();
  const allVisible=await page.locator('.showroom-card:visible').count();
  if(allVisible!==20) problems.push(`${size.label}: expand gallery returned ${allVisible}, expected 20`);
  await page.locator('.showroom-card').first().locator('[data-gallery-open]').click();
  const dialogOpen=await page.locator('#showroom-dialog').evaluate(el=>el.open);
  if(!dialogOpen) problems.push(`${size.label}: gallery preview dialog did not open`);
  if(dialogOpen) await page.locator('[data-dialog-close]').click();
  if(await page.locator('#showroom-dialog').evaluate(el=>el.open)) problems.push(`${size.label}: gallery dialog did not close`);
  await page.locator('.solution-tile[data-service="redes"]').click();
  const info=await page.evaluate(() => ({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,heroHeight:Math.ceil(document.querySelector('.hero-hub').getBoundingClientRect().height)}));
  if(info.scrollWidth>info.width+2) problems.push(`${size.label}: horizontal overflow ${info.scrollWidth} > ${info.width}`);
  if(errors.length) problems.push(`${size.label}: JS errors: ${errors.join(' | ')}`);
  // Reload before screenshots: focus on a clicked tile can otherwise scroll the viewport.
  await page.goto(source, {waitUntil:'domcontentloaded'});
  await page.waitForTimeout(550);
  await page.evaluate(() => { document.activeElement?.blur(); document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0,0); });
  await page.waitForTimeout(75);
  await page.screenshot({path:`${target}/${size.label}.png`,fullPage:false,animations:'disabled'});
  if(size.label==='mobile') await page.screenshot({path:`${target}/mobile-full.png`,fullPage:true,animations:'disabled'});
  await page.locator('#showroom-title').scrollIntoViewIfNeeded();
  await page.waitForTimeout(160);
  await page.screenshot({path:`${target}/showroom-${size.label}.png`,fullPage:false,animations:'disabled'});
  console.log(`${size.label}: cards=${count} stage=${stage.slice(0,36)} hero=${info.heroHeight}px overflow=${info.scrollWidth-info.width}px`);
  await page.close();
}
await browser.close();
if(problems.length){console.error('QA FAILED:\n'+problems.map(x=>'- '+x).join('\n'));process.exitCode=1;}
else console.log('PASS: all responsive breakpoints, eight service previews, four story chapters and JS console checks.');