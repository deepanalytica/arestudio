/* AR Estudio 5.0: decisiones por necesidad, navegación y captación honesta. */
(() => {
  'use strict';
  const $=(s,base=document)=>base.querySelector(s);
  const $$=(s,base=document)=>Array.from(base.querySelectorAll(s));
  const menu=$('#nav-toggle'),nav=$('#mobile-menu');
  function setMenu(open){if(!menu||!nav)return;menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');nav.hidden=!open;}
  menu?.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
  $$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
  window.addEventListener('resize',()=>{if(innerWidth>920)setMenu(false)},{passive:true});
  if($('#year'))$('#year').textContent=String(new Date().getFullYear());
  const choices={
    apertura:{label:'Abrir un negocio',reply:'Empieza por tres cosas: que tu barrio te encuentre, que entienda lo que ofreces y que sepa cuándo visitarte. No partiría pagando anuncios sin revisar eso.',kit:'apertura',contact:'Abrir y dar a conocer mi negocio'},
    consultas:{label:'Conseguir más consultas',reply:'Tu web y redes deben explicar a quién atiendes, por qué confiar en ti y cómo reservar o escribir. Primero eliminamos las dudas que frenan la consulta.',kit:'consultas',contact:'Conseguir más consultas o reservas'},
    ventas:{label:'Mejorar ventas de tienda',reply:'Antes de invertir más en tráfico, revisaría fotos, oferta, envío, pagos y preguntas frecuentes. Si hay fricción en la compra, más visitas no lo arreglan.',kit:'ventas',contact:'Mejorar las ventas de mi tienda'},
    tiempo:{label:'Ahorrar tiempo con automatización',reply:'Anota las preguntas y tareas que repites a diario. Las automatizaciones útiles empiezan por una tarea pequeña, verificable y con control humano.',kit:null,contact:'Automatizar tareas y WhatsApp'}
  };
  const result=$('#quick-result'),quickCta=$('#quick-cta');
  $$('.decision-choice').forEach(btn=>btn.addEventListener('click',()=>{
    const choice=choices[btn.dataset.situation];if(!choice)return;
    $$('.decision-choice').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
    if(result){const tag=document.createElement('span');tag.textContent='TU PRIMERA PRIORIDAD';const p=document.createElement('p');p.textContent=choice.reply;result.replaceChildren(tag,p);}
    if(quickCta){quickCta.href=choice.kit?'#kit-'+choice.kit:'#contacto';quickCta.firstChild.textContent=choice.kit?'Ver el kit recomendado ':'Hablemos de esa tarea ';}
    const select=$('#lead-interest');if(select)select.value=choice.contact;
  }));
  const kitMap={'apertura':'Abrir y dar a conocer mi negocio','consultas':'Conseguir más consultas o reservas','ventas':'Mejorar las ventas de mi tienda'};
  $$('[data-select-kit]').forEach(a=>a.addEventListener('click',()=>{
    const kit=a.dataset.selectKit,card=$('#kit-'+kit),select=$('#lead-interest');
    if(card){card.classList.add('offer-selected');setTimeout(()=>card.classList.remove('offer-selected'),2200)}
    if(select&&kitMap[kit])select.value=kitMap[kit];
  }));
  $$('[data-lead-interest]').forEach(a=>a.addEventListener('click',()=>{
    const value=a.dataset.leadInterest||'';const select=$('#lead-interest');
    if(!select)return;
    const match=Array.from(select.options).find(o=>o.value===value);
    if(match){select.value=match.value;return;}
    const closest=/apertura/i.test(value)?kitMap.apertura:/consulta/i.test(value)?kitMap.consultas:/tienda/i.test(value)?kitMap.ventas:/automatizaci/i.test(value)?'Automatizar tareas y WhatsApp':'Pedir un servicio o kit específico';
    select.value=closest;
    select.dataset.requestedService=value;
  }));
  const form=$('#lead-form');
  form?.addEventListener('submit',e=>{
    e.preventDefault();if(!form.reportValidity())return;
    const clean=(x,max=600)=>String(x||'').replace(/[\r\n\t]+/g,' ').trim().slice(0,max);
    const name=clean($('#lead-name')?.value,90),business=clean($('#lead-business')?.value,120),interest=clean($('#lead-interest')?.value,120),details=clean($('#lead-details')?.value,600),selected=clean($('#lead-interest')?.dataset.requestedService,120);
    const message=['Hola, llegué desde AR Estudio y quiero conversar sobre mi negocio.',`Nombre: ${name}`,`Negocio: ${business}`,`Objetivo: ${interest}`,selected?`Servicio que me interesó: ${selected}`:'',details?`Contexto: ${details}`:''];
    const utms=new URLSearchParams(location.search);
    for(const k of ['utm_source','utm_medium','utm_campaign','utm_content']){const v=clean(utms.get(k),70);if(v)message.push(`${k}: ${v}`);}
    const uri=`https://wa.me/56958039450?text=${encodeURIComponent(message.filter(Boolean).join('\n'))}`;
    // No envío ficticio: la persona confirma su mensaje en WhatsApp.
    location.assign(uri);
  });
})();