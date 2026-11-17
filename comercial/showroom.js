/* AR Estudio · Showroom 3.0: gallery filters, progressive reveal and accessible previews. */
(() => {
  'use strict';
  const section = document.querySelector('#showroom');
  if (!section) return;
  const cards = Array.from(section.querySelectorAll('.showroom-card'));
  const filters = Array.from(section.querySelectorAll('[data-gallery-filter]'));
  const more = section.querySelector('#showroom-more');
  const status = section.querySelector('#showroom-result-count');
  const dlg = document.querySelector('#showroom-dialog');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let active = 'todos', expanded = false, previousFocus = null;
  const INITIAL = 9;
  function update() {
    let matches = cards.filter(card => active === 'todos' || card.dataset.category === active);
    cards.forEach(card => {
      const inFilter = matches.includes(card);
      const inPage = expanded || active !== 'todos' || matches.indexOf(card) < INITIAL;
      card.hidden = !inFilter || !inPage;
    });
    if (status) status.textContent = `${matches.length} piezas y proyectos ${active === 'todos' ? 'en el catálogo' : 'en esta categoría'}`;
    if (more) {
      more.hidden = active !== 'todos' || matches.length <= INITIAL || expanded;
      more.setAttribute('aria-expanded', String(expanded));
      more.textContent = expanded ? 'Todo el trabajo visible' : `Explorar ${matches.length - INITIAL} trabajos más +`;
    }
    filters.forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.galleryFilter === active)));
  }
  filters.forEach(btn => btn.addEventListener('click', () => {
    active = btn.dataset.galleryFilter; expanded = false; update();
  }));
  more?.addEventListener('click', () => {
    expanded = true;
    update();
    const next = cards[INITIAL];
    if (next && !reduced && window.gsap) window.gsap.fromTo(cards.slice(INITIAL), {opacity: 0, y: 25}, {opacity: 1, y: 0, duration: .42, stagger: .04, clearProps: 'all', ease: 'power2.out'});
  });
  const close = () => {
    if (!dlg?.open) return;
    dlg.close();
    previousFocus?.focus({preventScroll: true});
  };
  dlg?.querySelector('[data-dialog-close]')?.addEventListener('click', close);
  dlg?.addEventListener('click', (event) => { if (event.target === dlg) close(); });
  dlg?.addEventListener('close', () => previousFocus?.focus({preventScroll:true}));
  cards.forEach(card => {
    const preview = card.querySelector('[data-gallery-open]');
    preview?.addEventListener('click', () => {
      if (!dlg || typeof dlg.showModal !== 'function') return;
      previousFocus = document.activeElement;
      const title = card.dataset.title || card.querySelector('h3')?.textContent || 'Proyecto';
      const img = card.dataset.preview;
      const source = card.dataset.url;
      const label = card.dataset.stage || 'Proyecto de AR Estudio';
      const info = card.querySelector('.showroom-info p')?.textContent || '';
      const h = dlg.querySelector('#showroom-dialog-title'), subtitle = dlg.querySelector('#showroom-dialog-stage');
      const image = dlg.querySelector('#showroom-dialog-image'), desc = dlg.querySelector('#showroom-dialog-text'), link = dlg.querySelector('#showroom-dialog-link');
      if (h) h.textContent = title;
      if (subtitle) subtitle.textContent = label;
      if (desc) desc.textContent = info;
      if (image) {
        if (img) { image.src = img; image.alt = `Vista de ${title}. ${label}.`; image.hidden = false; }
        else { image.hidden = true; image.removeAttribute('src'); }
      }
      if (link) {
        if (source) { link.href = source; link.hidden = false; link.textContent = 'Abrir proyecto ↗'; }
        else { link.hidden = true; }
      }
      dlg.showModal();
    });
    if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
      card.addEventListener('pointermove', event => {
        const bounds = card.getBoundingClientRect();
        card.style.setProperty('--sx', `${Math.round((event.clientX - bounds.left) / bounds.width * 100)}%`);
        card.style.setProperty('--sy', `${Math.round((event.clientY - bounds.top) / bounds.height * 100)}%`);
      }, {passive:true});
    }
  });
  update();
  // Only animate when available; no content depends on GSAP or ScrollTrigger.
  if (!reduced && window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    window.gsap.fromTo('.showroom-heading', {opacity:0,y:34}, {opacity:1,y:0,duration:.75,ease:'power2.out',clearProps:'all',scrollTrigger:{trigger:'#showroom',start:'top 90%',once:true}});
  }
})();