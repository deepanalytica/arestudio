import fs from 'node:fs';
const root=new URL('../',import.meta.url);
const t=JSON.parse(fs.readFileSync(new URL('tokens.json',root),'utf8'));
for(const [name,ref] of Object.entries(t.semantic)){if(!(ref in t.tokens))throw Error('Referencia ausente '+name+': '+ref)}
const css=`/* AR Estudio ${t.version} · generado desde brand/tokens.json */\n:root{\n`+Object.entries(t.tokens).map(([k,v])=>'--ar-'+k+':'+v+';').join('\n')+'\n'+Object.entries(t.semantic).map(([k,v])=>'--ar-'+k+':var(--ar-'+v+');').join('\n')+'\n}\n';
const target=new URL('tokens.css',root);
if(process.argv.includes('--check')){if(fs.readFileSync(target,'utf8')!==css){console.error('Tokens desincronizados, ejecuta npm run brand:tokens');process.exit(1)}console.log('Tokens AR sincronizados')}
else{fs.writeFileSync(target,css);console.log('Tokens AR generados')}
