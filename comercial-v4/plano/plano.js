/* AR Estudio V4 — live dimensional drawing; every displayed measurement comes from the real DOM. */
(() => {
  'use strict';
  const frame = document.getElementById('source');
  const host = document.querySelector('.measure-host');
  const sheet = document.getElementById('sheet');
  const metrics = document.getElementById('metrics');
  const state = document.getElementById('measure-state');
  const controls = Array.from(document.querySelectorAll('[data-width]'));
  let width = 390;
  let sourceReady = false;
  let generation = 0;
  const fmt = n => Number.isFinite(n) ? String(Math.round(n * 10) / 10) : 'TBD';
  const num = value => {
    const n = parseFloat(value);
    return Number.isFinite(n) ? n : NaN;
  };
  const svgText = (x,y,s,cls='label',anchor='start') => '<text x="'+fmt(x)+'" y="'+fmt(y)+'" class="'+cls+'" text-anchor="'+anchor+'">'+s+'</text>';
  const svgLine = (x1,y1,x2,y2,cls='dim') => '<line x1="'+fmt(x1)+'" y1="'+fmt(y1)+'" x2="'+fmt(x2)+'" y2="'+fmt(y2)+'" class="'+cls+'"/>';
  const svgRect = (x,y,w,h,r,cls='line') => '<rect x="'+fmt(x)+'" y="'+fmt(y)+'" width="'+fmt(Math.max(0,w))+'" height="'+fmt(Math.max(0,h))+'" rx="'+fmt(Math.max(0,r))+'" class="'+cls+'"/>';
  const dimH = (a,b,y,ext,label) =>
    svgLine(a,y,b,y) + svgLine(a,ext,a,y-7) + svgLine(b,ext,b,y-7) +
    svgText((a+b)/2,y-10,label,'value','middle') +
    '<path d="M'+fmt(a)+','+fmt(y)+' l9,-4 v8 z M'+fmt(b)+','+fmt(y)+' l-9,-4 v8 z" fill="#555"/>';
  const dimV = (a,b,x,ext,label) =>
    svgLine(x,a,x,b)+svgLine(x+7,a,ext,a)+svgLine(x+7,b,ext,b)+
    svgText(x-13,(a+b)/2,label,'value','end')+
    '<path d="M'+fmt(x)+','+fmt(a)+' l-4,9 h8 z M'+fmt(x)+','+fmt(b)+' l-4,-9 h8 z" fill="#555"/>';
  const row=(code,name,value)=> '<tr><td>'+code+'</td><td>'+name+'</td><td>'+fmt(value)+' px</td></tr>';
  const draw = data => {
    const d=data; const scale=Math.min(520/d.w,285/d.h);
    const X=420,Y=190,W=d.w*scale,H=d.h*scale;
    const sx=(r)=>X+(r.left-d.x)*scale;
    const sy=(r)=>Y+(r.top-d.y)*scale;
    const sw=(r)=>r.width*scale;
    const sh=(r)=>r.height*scale;
    let g='<title id="sheet-title">Plano dimensional de la tarjeta de situaciones</title><desc id="sheet-desc">Vista en planta y capas con cotas medidas en el navegador para el ancho elegido.</desc><defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#444"/></marker><pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8"><path d="M0,8 L8,0" stroke="#ddd" stroke-width="1"/></pattern></defs>';
    g+='<rect x="1" y="1" width="1348" height="773" rx="9" fill="#fff" stroke="#222"/>';
    g+=svgText(46,50,'01 / NOTAS GENERALES','value');
    g+=svgLine(46,66,325,66,'line');
    g+=svgText(46,100,'[1] UNIDADES EN PX CSS','minor');
    g+=svgText(46,126,'[2] SLOTS: NO TEXTO REAL','minor');
    g+=svgText(46,152,'[3] COTAS DESDE DOM VIVO','minor');
    g+=svgText(46,178,'[4] ESCALA ESQUEMÁTICA','minor');
    g+=svgText(46,240,'VARIABLES SIN DATOS: TBD','minor');
    g+=svgText(X,103,'02 / VISTA EN PLANTA','value');
    g+=svgText(X,129,'TARJETA DE SITUACIÓN / '+d.viewport+' PX DE VIEWPORT','minor');
    g+=svgRect(X,Y,W,H,d.radius*scale);
    g+=svgRect(X+d.border*scale,Y+d.border*scale,W-2*d.border*scale,H-2*d.border*scale,Math.max(0,(d.radius-d.border))*scale,'dash');
    g+=svgRect(sx(d.title),sy(d.title),sw(d.title),sh(d.title),3,'slot');
    g+=svgRect(sx(d.subtitle),sy(d.subtitle),sw(d.subtitle),sh(d.subtitle),3,'slot');
    g+=svgText(sx(d.title)+Math.max(5,sw(d.title)/2),sy(d.title)+Math.min(19,sh(d.title)/2+4),'TITLE SLOT · FLEX','minor','middle');
    g+=svgText(sx(d.subtitle)+Math.max(5,sw(d.subtitle)/2),sy(d.subtitle)+Math.min(15,sh(d.subtitle)/2+4),'META SLOT · FLEX','minor','middle');
    g+=dimH(X,X+W,Y-39,Y,'W1');
    g+=dimV(Y,Y+H,X-39,X,'H1');
    g+=svgLine(X+W,Y+Math.min(25,H/2),X+W+50,Y-9);
    g+=svgText(X+W+55,Y-12,'R1','value');
    g+=svgLine(X,Y+Math.min(31,H/2),X-65,Y+63);
    g+=svgText(X-70,Y+76,'B1','value','end');
    g+=svgLine(X, Y+H+20, X+d.padL*scale,Y+H+20);
    g+=svgText(X+d.padL*scale/2,Y+H+39,'S1','value','middle');
    g+=svgLine(X+W+18,Y,X+W+18,Y+d.padT*scale);
    g+=svgText(X+W+27,Y+Math.max(12,d.padT*scale/2),'S2','value');
    g+=svgText(X,Math.min(490,Y+H+110),'W1 / H1 DIMENSIONES EXTERNAS · SIN ZOOM','minor');
    g+=svgText(60,408,'03 / VISTA EXPLOSIONADA','value');
    g+=svgText(60,430,'ESTRUCTURA ESQUEMÁTICA, NO A ESCALA','minor');
    const bx=105, by=570;
    for(const [i,offset,caption] of [[0,0,'01  CONTENEDOR'],[1,49,'02  SUPERFICIE'],[2,98,'03  SLOTS']]){
      const yy=by-offset;
      g+='<path d="M'+(bx+i*10)+','+yy+' l210,0 l47,30 l-210,0 z" fill="'+(i===0?'#ededed':'#fafafa')+'" stroke="#444" stroke-width="1.5"/>';
      g+=svgText(365,yy+17,caption,'minor');
      g+=svgLine(315+i*10,yy+12,355,yy+12);
    }
    g+=svgText(950,55,'04 / TABLA DE VARIABLES','value');
    g+=svgLine(950,70,1294,70,'line');
    const rows=[['W1','ANCHO',d.w],['H1','ALTO',d.h],['S1','PAD IZQUIERDO',d.padL],['S2','PAD SUPERIOR',d.padT],['S3','GAP TITULAR / META',d.titleGap],['G1','GAP ENTRE TARJETAS',d.cardGap],['R1','RADIO EXTERNO',d.radius],['B1','BORDE',d.border]];
    rows.forEach((r,i)=>{
      const y=110+i*54;
      g+=svgLine(950,y+13,1295,y+13,'dim');
      g+=svgText(951,y-3,r[0],'value');
      g+=svgText(998,y-3,r[1],'minor');
      g+=svgText(1290,y-3,fmt(r[2])+' px','value','end');
    });
    g+=svgText(952,595,'S3 MEDIDO ENTRE CAJAS DE TEXTO','minor');
    g+=svgText(952,618,'G1 ORIENTACIÓN SEGÚN BREAKPOINT','minor');
    g+=svgLine(45,728,1305,728,'line');
    g+=svgText(46,754,'ARQUITECTURA DE INTERFAZ / FUENTE LOCAL','minor');
    g+=svgText(1302,754,'HOJA 1 DE 1','minor','end');
    sheet.innerHTML=g;
    sheet.dataset.measured='true';
    metrics.innerHTML=rows.map(r=>row(r[0],r[1],r[2])).join('') +
      row('P1','Padding derecho',d.padR) + row('P2','Padding inferior',d.padB);
    state.textContent='Medido: '+d.viewport+' px · '+fmt(d.w)+' × '+fmt(d.h)+' px';
  };
  const measure = async () => {
    const ticket=++generation;
    if(!sourceReady)return;
    state.textContent='Midiendo interfaz…';
    try{
      const doc=frame.contentDocument;
      if(!doc)throw Error('Documento no disponible');
      if(doc.fonts && doc.fonts.ready)await doc.fonts.ready;
      await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
      if(ticket!==generation)return;
      const card=doc.getElementById('tab-local');
      const next=doc.getElementById('tab-profesional');
      if(!card||!next)throw Error('Componente no encontrado');
      const t=card.querySelector('strong'),sub=card.querySelector('small');
      if(!t||!sub)throw Error('Slots de contenido no encontrados');
      const r=card.getBoundingClientRect(), n=next.getBoundingClientRect(), tr=t.getBoundingClientRect(),sr=sub.getBoundingClientRect();
      const css=frame.contentWindow.getComputedStyle(card);
      if(r.width<=0||r.height<=0)throw Error('Medida vacía');
      const vertical=n.top>=r.bottom-1;
      draw({viewport:width,w:r.width,h:r.height,x:r.left,y:r.top,title:tr,subtitle:sr,
        border:num(css.borderLeftWidth),radius:num(css.borderTopLeftRadius),
        padL:num(css.paddingLeft),padR:num(css.paddingRight),padT:num(css.paddingTop),padB:num(css.paddingBottom),
        titleGap:sr.top-tr.bottom,cardGap:vertical?n.top-r.bottom:n.left-r.right});
    }catch(e){
      sheet.dataset.measured='false';
      state.textContent='No se pudieron verificar las medidas: '+e.message;
      metrics.innerHTML='<tr><td>—</td><td>Datos no disponibles</td><td>TBD</td></tr>';
    }
  };
  const choose=w=>{
    width=w;
    host.style.width=w+'px';
    controls.forEach(btn=>btn.setAttribute('aria-pressed',String(Number(btn.dataset.width)===w)));
    measure();
  };
  controls.forEach(btn=>btn.addEventListener('click',()=>choose(Number(btn.dataset.width))));
  frame.addEventListener('load',()=>{sourceReady=true;choose(width)});
  frame.addEventListener('error',()=>{state.textContent='Fuente no disponible; cotas TBD'});
  if(frame.contentDocument?.readyState==='complete'){sourceReady=true;choose(width)}
})();