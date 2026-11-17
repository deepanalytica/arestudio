#!/usr/bin/env node
/* Ejecuta Taste Skill contra la web existente sin editar archivos ni activar sus hooks.
   Conserva resultados completos en artifacts/taste-audit para revisión. */
import {spawn} from 'node:child_process';
import {mkdir,writeFile,readFile,realpath,stat} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
const out=resolve('artifacts/taste-audit');
await mkdir(out,{recursive:true});
const choices=['.agents/skills/design-taste-frontend','.codex/skills/design-taste-frontend','.claude/skills/design-taste-frontend','skills/taste-skill'];
let dir='';
for(const c of choices){if(existsSync(join(c,'SKILL.md'))){dir=await realpath(c);break;}}
if(!dir){console.error('Taste Skill no quedó instalado. Directorios inspeccionados:',choices);process.exit(2);}
const skillText=await readFile(join(dir,'SKILL.md'),'utf8');
const version=skillText.match(/tasteskill\s+([0-9.]+)/)?.[1]||'sin versión identificada';
const results={status:'audit_only',source:'Leonxlnx/taste-skill',version,skillDir:dir,page:'comercial/index.html',pageKind:'service',checks:[],notes:['Auditoría no aplica automáticamente reglas incompatibles con brand/tokens.css','La página publicada no se modifica en este job','Los resultados de Chrome son sintéticos, no datos de campo']};
function run(cmd,args,id,timeoutMs=120000){
 return new Promise((done)=>{
  let stdout='',stderr='',finished=false,timedOut=false;
  const child=spawn(cmd,args,{env:{...process.env,TASTE_SKILL_HISTORY:resolve('.taste-skill/history.json')},stdio:['ignore','pipe','pipe']});
  const limit=2500000;
  child.stdout.on('data',x=>{stdout=(stdout+x).slice(-limit)});
  child.stderr.on('data',x=>{stderr=(stderr+x).slice(-limit)});
  const timer=setTimeout(()=>{timedOut=true;child.kill('SIGTERM')},timeoutMs);
  child.on('error',e=>{stderr+='\n'+e.message});
  child.on('close',async(code,signal)=>{
   if(finished)return;finished=true;clearTimeout(timer);
   const report={id,exitCode:code,signal,timedOut,stdoutFile:`${id}.stdout.txt`,stderrFile:`${id}.stderr.txt`,bytesStdout:stdout.length,bytesStderr:stderr.length};
   await Promise.all([writeFile(join(out,report.stdoutFile),stdout),writeFile(join(out,report.stderrFile),stderr)]);
   console.log(`TASTE_CHECK ${id} status=${timedOut?'TIMEOUT':code===0?'PASS':'ISSUES'} exit=${code} bytes=${stdout.length}`);
   done(report);
  });
 });
}
console.log('Taste Skill installed:',dir,'version',version);
const copy=await run('node',[join(dir,'scripts/copy-lint.mjs'),'comercial/index.html','--kind','service','--json'],'copy',45000);
results.checks.push(copy);
const consistency=await run('node',[join(dir,'scripts/consistency.mjs'),'comercial/index.html','--widths','1440,1024,820,768,390','--page','service','--category','Diseño y marketing digital para pymes','--primary','Preparar mensaje por WhatsApp','--json'],'consistency',240000);
results.checks.push(consistency);
const perf=await run('node',[join(dir,'scripts/perf.mjs'),'comercial/index.html','--w','1440','--w','390','--runs','1','--json',join(out,'perf-data.json')],'perf',210000);
results.checks.push(perf);
const arm=await run('node',[join(dir,'scripts/gate.mjs'),'--start','comercial/index.html','--kind','service','--category','Diseño y marketing digital para pymes','--primary','Preparar mensaje por WhatsApp'],'gate-start',45000);
results.checks.push(arm);
const gate=await run('node',[join(dir,'scripts/gate.mjs'),'--quick'],'gate-quick',240000);
results.checks.push(gate);
results.summary={passed:results.checks.filter(x=>x.exitCode===0).length,withIssues:results.checks.filter(x=>x.exitCode!==0).length};
await writeFile(join(out,'summary.json'),JSON.stringify(results,null,2));
console.log('TASTE_AUDIT_SUMMARY',JSON.stringify(results.summary));
console.log('NOTE: nonzero checker exit means detected issues, not an installation failure.');
