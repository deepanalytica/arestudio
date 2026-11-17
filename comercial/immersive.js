/* AR Estudio — Immersive editorial motion. Progressive enhancement.
 * True scroll-driven acceleration for falling channel logos; parallax for owned imagery.
 * No scroll hijacking, no anonymous analytics, no claim of channel partnerships. */
(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sections = [...document.querySelectorAll('.art-editorial')];
  if (!sections.length) return;
  const fallScene = document.querySelector('#art-canales');
  const falling = [...document.querySelectorAll('[data-fall]')];
  const parallax = [...document.querySelectorAll('[data-parallax]')];
  const browserFrame = document.querySelector('.art-mockup-browser');
  const phoneFrame = document.querySelector('.art-mockup-phone');
  const number = (value, fallback = 1) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  };
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  let raf = 0;
  let animationActive = !reduced.matches;
  const observerSupported = typeof IntersectionObserver !== 'undefined';
  let revealObserver = null;

  function reset() {
    document.documentElement.classList.remove('art-motion-ready');
    for (const el of document.querySelectorAll('.art-reveal')) {
      el.classList.add('art-revealed');
    }
    [...falling, ...parallax].forEach(el => el.style.removeProperty('transform'));
    if (browserFrame) browserFrame.style.removeProperty('transform');
    if (phoneFrame) phoneFrame.style.removeProperty('transform');
  }

  function buildReveals() {
    if (!observerSupported || !animationActive) return;
    const nodes = [...document.querySelectorAll('.art-reveal')];
    if (!nodes.length) return;
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('art-revealed');
        revealObserver?.unobserve(entry.target);
      });
    }, {rootMargin:'0px 0px -5% 0px',threshold:0.06});
    nodes.forEach(el => {
      if (el.getBoundingClientRect().top < innerHeight * .88) {
        el.classList.add('art-revealed');
      } else revealObserver.observe(el);
    });
    // Only apply hidden-before-reveal styles after observing the target nodes.
    document.documentElement.classList.add('art-motion-ready');
  }

  function progress(el) {
    if (!el) return 0;
    const b = el.getBoundingClientRect();
    // Starts when scene enters bottom and completes as it exits top.
    return clamp((innerHeight - b.top) / (innerHeight + Math.max(b.height, 1)), 0, 1);
  }

  function drawScroll() {
    raf = 0;
    if (!animationActive || document.hidden) return;
    if (fallScene && falling.length) {
      const p = progress(fallScene);
      const travel = Math.pow(p, 2.4);
      falling.forEach((el, i) => {
        const speed = number(el.dataset.fallSpeed, 1);
        const y = (-innerHeight * .43) + (innerHeight * 1.9 * travel * speed);
        const drift = Math.sin(p * 7 + i * .7) * (18 + i * 4);
        const rotation = number(el.dataset.angle, 0) + (p * 75 * (i % 2 ? -1 : 1));
        el.style.transform = `translate3d(${drift.toFixed(2)}px,${y.toFixed(2)}px,0) rotate(${rotation.toFixed(2)}deg)`;
      });
    }
    for (const el of parallax) {
      const scene = el.closest('.art-editorial') || el.parentElement;
      if (!scene) continue;
      const bounds = scene.getBoundingClientRect();
      if (bounds.bottom < -150 || bounds.top > innerHeight + 150) continue;
      const p = progress(scene);
      const speed = number(el.dataset.parallax, 1);
      const y = (p - .5) * 90 * speed;
      const scale = number(el.dataset.parallaxScale, 1.06);
      el.style.transform = `translate3d(0,${y.toFixed(2)}px,0) scale(${scale})`;
    }
    const screen = document.querySelector('#art-pantalla-archivo');
    if (screen && browserFrame && innerWidth >= 800) {
      const p = progress(screen);
      const eased = p * p * (3 - 2 * p);
      browserFrame.style.transform = `perspective(1300px) rotateY(${(-8 + 8 * eased).toFixed(2)}deg) rotateX(${(3 - 3 * eased).toFixed(2)}deg) scale(${(1 + .03 * eased).toFixed(3)})`;
      if (phoneFrame) phoneFrame.style.transform = `translate3d(0,${((.5 - p) * 70).toFixed(1)}px,0) rotate(${(12 - 7 * eased).toFixed(2)}deg)`;
    }
  }

  function schedule() {
    if (!animationActive || raf || document.hidden) return;
    raf = requestAnimationFrame(drawScroll);
  }

  function begin() {
    animationActive = !reduced.matches;
    if (!animationActive) {
      if (revealObserver) revealObserver.disconnect();
      reset();
      return;
    }
    buildReveals();
    schedule();
  }

  const prefersListener = () => {
    if (revealObserver) revealObserver.disconnect();
    begin();
  };
  if (reduced.addEventListener) reduced.addEventListener('change', prefersListener);
  else if (reduced.addListener) reduced.addListener(prefersListener);
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule, {passive:true});
  document.addEventListener('visibilitychange', schedule);

  // GSAP/ScrollTrigger are optional. They add pinned editorial timing only on large
  // screens, with no dependency for photos, copy, CTAs or the physics-style fall.
  if (!reduced.matches && window.gsap && window.ScrollTrigger && innerWidth >= 1200) {
    try {
      window.gsap.registerPlugin(window.ScrollTrigger);
      const frame = document.querySelector('#art-pantalla-archivo');
      if (frame) {
        window.ScrollTrigger.create({
          trigger: frame,
          start:'top top',
          end:'+=30%',
          pin:true,
          pinSpacing:true,
          invalidateOnRefresh:true
        });
      }
    } catch (error) {
      // Every scene remains usable without GSAP and even if CDNs are unavailable.
      console.warn('AR Estudio: movimiento editorial sin pinning', error);
    }
  }
  begin();
})();
