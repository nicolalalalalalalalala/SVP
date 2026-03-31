(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const markReady = () => {
    document.body.classList.add('site-ready');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markReady, { once: true });
  } else {
    markReady();
  }

  const primeImages = () => {
    const viewportH = window.innerHeight || 0;
    document.querySelectorAll('img').forEach((img) => {
      if (!img.loading) {
        const rect = img.getBoundingClientRect();
        const nearViewport = rect.top < viewportH * 1.2;
        img.loading = nearViewport ? 'eager' : 'lazy';
      }
      if (!img.decoding) img.decoding = 'async';
      if (!img.fetchPriority) {
        const rect = img.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < viewportH * 0.75) {
          img.fetchPriority = 'high';
        }
      }
    });
  };

  const installReveals = () => {
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    const candidates = document.querySelectorAll('section, article, main > *, .card, .tile, .stat, .timeline__item');
    candidates.forEach((el, idx) => {
      if (el.classList.contains('rev') || el.classList.contains('sv-reveal') || el.closest('.hero__sliver')) return;
      if (idx < 2) return;
      el.classList.add('sv-reveal');
      el.style.transitionDelay = `${Math.min((idx % 5) * 60, 240)}ms`;
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.sv-reveal').forEach((el) => observer.observe(el));
  };

  const smoothHashJump = () => {
    if (reduceMotion || !window.location.hash) return;
    const node = document.getElementById(window.location.hash.slice(1));
    if (!node) return;
    requestAnimationFrame(() => {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const init = () => {
    primeImages();
    installReveals();
    smoothHashJump();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
