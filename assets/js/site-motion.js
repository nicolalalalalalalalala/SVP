(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onIdle = (cb) => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(cb, { timeout: 700 });
      return;
    }
    window.setTimeout(cb, 120);
  };

  const markReady = () => {
    document.body.classList.add('site-ready');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markReady, { once: true });
  } else {
    markReady();
  }

  const primeImages = () => {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.getAttribute('loading')) {
        img.loading = index < 3 ? 'eager' : 'lazy';
      }
      if (!img.getAttribute('decoding')) img.decoding = 'async';
      if (!img.getAttribute('fetchpriority') && index === 0) {
        img.fetchPriority = 'high';
      }
    });
  };

  const installReveals = () => {
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    const candidates = document.querySelectorAll('section, article, main > *, .card, .tile, .stat, .timeline__item');
    candidates.forEach((el, idx) => {
      if (
        el.classList.contains('rev') ||
        el.classList.contains('sv-reveal') ||
        el.closest('.hero__sliver') ||
        el.classList.contains('reading') ||
        el.closest('.reading-grid')
      ) return;
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

  const installBackToTop = () => {
    if (!window.matchMedia('(max-width: 768px)').matches) return;

    const button = document.createElement('button');
    button.className = 'sv-back-to-top';
    button.type = 'button';
    button.setAttribute('aria-label', 'Back to top');
    button.textContent = '↑';

    const toggleVisibility = () => {
      const shouldShow = window.scrollY > 320;
      button.classList.toggle('is-visible', shouldShow);
    };

    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    document.body.appendChild(button);
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
  };

  const init = () => {
    primeImages();
    smoothHashJump();
    onIdle(() => {
      installReveals();
      installBackToTop();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
