// MarketPulse Intelligence — marketing site
// Lightweight interactions: sticky nav state, scroll reveals, year stamp.

(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 16) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Reveal on scroll — apply to section headers and cards
  const revealSelectors = [
    '.section__header',
    '.problem',
    '.phase',
    '.diff',
    '.tier',
    '.bar-row',
    '.guarantee__inner',
    '.founder',
    '.cta',
    '.hero__heading',
    '.hero__sub',
    '.hero__cta',
    '.hero__stats',
  ];
  const targets = document.querySelectorAll(revealSelectors.join(','));
  targets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('is-visible'), i * 40);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px 0px 0px', threshold: 0 }
    );
    targets.forEach((el) => io.observe(el));
    // Safety: ensure everything is eventually revealed even if observer misses
    setTimeout(() => {
      targets.forEach((el) => el.classList.add('is-visible'));
    }, 1200);
  } else {
    targets.forEach((el) => el.classList.add('is-visible'));
  }

  // Smooth anchor focus management
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id && id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          // Let browser handle scroll (smooth via CSS), but shift focus for a11y
          setTimeout(() => target.setAttribute('tabindex', '-1'), 0);
        }
      }
    });
  });
})();
