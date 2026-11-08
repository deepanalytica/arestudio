/* Revisar enlaces que se muestran en los casos. Fallos externos se reportan sin
   atribuirlos erróneamente a la lógica del sitio, pero requieren inspección. */
import {caseStudies} from '../data.js';
import {mkdir,writeFile} from 'node:fs/promises';
await mkdir('artifacts',{recursive:true});
const inputs=[...new Set(Object.values(caseStudies).flatMap(c=>c.links||[]).map(x=>x.url))];
async function verify(url){
  const out={url,status:'unknown'};
  for(const method of ['HEAD','GET']){
    try{
      const r=await fetch(url,{method,redirect:'follow',signal:AbortSignal.timeout(9500),headers:{'User-Agent':'AR-Studio-Link-Audit/1.0'}});
      out.http=r.status;out.finalUrl=r.url;out.status=r.ok?'ok':'http_error';
      if(r.status===405&&method==='HEAD')continue;
      break;
    }catch(e){out.status='network_error';out.error=String(e.message||e).slice(0,110);if(method==='GET')break}
  }
  return out;
}
const results=[];
for(let i=0;i<inputs.length;i+=5)results.push(...await Promise.all(inputs.slice(i,i+5).map(verify)));
for(const r of results)console.log('LINK '+r.status+' '+(r.http||'—')+' '+r.url);
const failed=results.filter(r=>r.status!=='ok');
await writeFile('artifacts/link-audit.json',JSON.stringify({generatedAt:new Date().toISOString(),results},null,2));
console.log('LINK_AUDIT '+(results.length-failed.length)+'/'+results.length+' accessible, '+failed.length+' to review');
