/* AR Estudio — Conversion V4.0: problem-based journey, honest tracking, mobile nav. */
(() => {
  'use strict';
  const $ = (s,root=document) => root.querySelector(s);
  const $$ = (s,root=document) => Array.from(root.querySelectorAll(s));
  const tabs = $$('.situation-tab');
  const panels = $$('.situation-panel');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const setSituation = (key,{focus=false}={}) => {
    const target = tabs.find(t=>t.dataset.case===key);
    if(!target)return;
    tabs.forEach(t=>{const active=t===target;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;});
    panels.forEach(panel=>{panel.hidden=panel.dataset.panel!==key;});
    if(focus)target.focus({preventScroll:true});
    const select=$('#lead-context');
    const options={local:'Voy a abrir un negocio local',profesional:'Necesito más consultas para mis servicios profesionales',tienda:'Quiero mejorar las compras de mi tienda online'};
    if(select&&options[key])select.value=options[key];
  };
  tabs.forEach((t,index)=>{
    t.addEventListener('click',()=>setSituation(t.dataset.case));
    t.addEventListener('keydown',e=>{
      let i=index;
      if(e.key==='ArrowRight'||e.key==='ArrowDown')i=(index+1)%tabs.length;
      else if(e.key==='ArrowLeft'||e.key==='ArrowUp')i=(index-1+tabs.length)%tabs.length;
      else if(e.key==='Home')i=0;
      else if(e.key==='End')i=tabs.length-1;
      else return;
      e.preventDefault();setSituation(tabs[i].dataset.case,{focus:true});
    });
  });
  setSituation('local');
  $$('[data-context]').forEach(a=>a.addEventListener('click',()=>{const select=$('#lead-context');if(select){select.value=a.dataset.context;}}));
  const menu=$('#menu-trigger'),nav=$('#mobile-nav');
  const toggleMenu=open=>{if(!menu||!nav)return;menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');nav.hidden=!open;document.body.classList.toggle('menu-open',open);};
  menu?.addEventListener('click',()=>toggleMenu(menu.getAttribute('aria-expanded')!=='true'));
  $$('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')toggleMenu(false)});
  window.addEventListener('resize',()=>{if(innerWidth>850)toggleMenu(false)},{passive:true});
  $('#year').textContent=new Date().getFullYear();
  // This only prepares the message; the user must review and send it in WhatsApp.
  $('#lead-form')?.addEventListener('submit',e=>{
    e.preventDefault();const f=e.currentTarget;if(!f.reportValidity())return;
    const val=id=>$(id)?.value?.trim()||'';
    const lines=[
      'Hola, vi AR Estudio y quiero conversar sobre mi negocio.',
      'Nombre: '+val('#lead-name'),
      val('#lead-business')?'Negocio o rubro: '+val('#lead-business'):'',
      'Situación: '+val('#lead-context'),
      'Lo que quiero lograr: '+val('#lead-need')
    ];
    const qs=new URLSearchParams(location.search);
    for(const k of ['utm_source','utm_medium','utm_campaign','utm_content']){
      const value=qs.get(k)?.replace(/[\r\n\t]/g,' ').slice(0,60);if(value)lines.push(k+': '+value);
    }
    location.href='https://wa.me/56958039450?text='+encodeURIComponent(lines.filter(Boolean).join('\n'));
  });
  // Purposeful entrance only. No scroll-fade on every card; content is visible without JS.
  if(!reduce&&'animate' in HTMLElement.prototype){
    const elements=['.kicker','.hero h1','.hero-lede','.hero-detail','.hero-actions','.hero-stage'];
    elements.forEach((sel,index)=>{
      $(sel)?.animate([{opacity:0,transform:'translateY(17px)'},{opacity:1,transform:'translateY(0)'}],{duration:520,delay:index*75,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
    });
  }
})();