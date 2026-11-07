
const mount=document.getElementById('logo-kit-gallery');
const search=document.getElementById('logo-kit-search');
const category=document.getElementById('logo-kit-category');
const counter=document.getElementById('logo-kit-count');
const dir='../logo-kit/';
function textElement(tag,value,className){const e=document.createElement(tag);e.textContent=value;if(className)e.className=className;return e}
async function exportPNG(url,id,layout){
 const response=await fetch(url);if(!response.ok)throw Error('SVG inaccesible');
 const source=await response.text();
 const dom=new DOMParser().parseFromString(source,'image/svg+xml');
 const dims=dom.documentElement.getAttribute('viewBox').split(/\s+/).map(Number);
 const width=layout==='icon'?1024:layout==='slash'?1000:1600;
 const height=Math.round(width*dims[3]/dims[2]);
 const object=URL.createObjectURL(new Blob([source],{type:'image/svg+xml;charset=utf-8'}));
 try{
  const img=new Image();img.src=object;await img.decode();
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
  canvas.getContext('2d').drawImage(img,0,0,width,height);
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
  if(!blob)throw Error('Fallo de exportación PNG');
  const pngUrl=URL.createObjectURL(blob);const a=document.createElement('a');
  a.href=pngUrl;a.download=id+'.png';document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(pngUrl),1200);
 }finally{URL.revokeObjectURL(object)}
}
async function init(){
 if(!mount)return;
 try{
  const response=await fetch(dir+'manifest.json',{cache:'no-cache'});
  if(!response.ok)throw Error('No se pudo cargar manifest.json');
  const manifest=await response.json();
  const all=manifest.variants;
  function render(){
   const q=(search.value||'').toLocaleLowerCase('es');
   const current=category.value;
   const shown=all.filter(x=>(current==='Todas'||x.category===current)&&(!q||[x.id,x.label,x.usage].join(' ').toLocaleLowerCase('es').includes(q)));
   mount.replaceChildren();
   for(const item of shown){
    const card=document.createElement('article');card.className='logo-kit-card';
    const preview=document.createElement('div');preview.className='logo-kit-preview';
    if(item.background==='transparent')preview.classList.add('logo-kit-transparent');
    if(item.id.includes('blanco-transparente')||item.id==='simbolo-monocromo-blanco')preview.classList.add('logo-kit-preview-dark');
    const img=new Image();img.loading='lazy';img.src=dir+item.svg;img.alt=item.label;preview.append(img);
    card.append(preview,textElement('span',item.category.toUpperCase(),'logo-kit-overline'),textElement('h3',item.label,'logo-kit-name'));
    const buttons=document.createElement('div');buttons.className='logo-kit-actions';
    const file=dir+item.svg;
    const link=document.createElement('a');link.textContent='Descargar SVG';link.href=file;link.download=item.id+'.svg';
    const png=document.createElement('button');png.type='button';png.textContent='PNG ↓';
    png.addEventListener('click',async()=>{png.disabled=true;png.textContent='Exportando…';try{await exportPNG(file,item.id,item.layout)}catch{png.title='No fue posible convertirlo. Usa el SVG.';png.textContent='Error PNG'}finally{png.disabled=false;setTimeout(()=>png.textContent='PNG ↓',1300)}});
    const copy=document.createElement('button');copy.type='button';copy.textContent='Copiar HTML';
    copy.addEventListener('click',async()=>{const absolute=new URL(file,location.href).href;const snippet='<img src="'+absolute+'" alt="AR Estudio" class="ar-logo">';try{await navigator.clipboard.writeText(snippet);copy.textContent='Copiado ✓'}catch{copy.textContent='Copia no disponible'}setTimeout(()=>copy.textContent='Copiar HTML',1300)});
    buttons.append(link,png,copy);card.append(buttons);mount.append(card);
   }
   counter.textContent=shown.length+' de '+all.length+' variantes';
  }
  search.addEventListener('input',render);category.addEventListener('change',render);render();
 }catch(error){
  mount.replaceChildren(textElement('p','No se pudo cargar el catálogo de logotipos. Consulta el manifiesto JSON.'));
  counter.textContent='Catálogo no disponible';
 }
}
init();
