(() => {
  const mount = document.getElementById('site-header-mount');
  if (!mount) return;
  const HOMEPAGE_CN_WORDMARK = '新岸資本';
  const HOMEPAGE_CN_LANGUAGE_LABEL = '中文';

  mount.innerHTML = `<nav id="nav">
  <a href="index.html" class="nav__logo">
        <img class="nav__logo-mark" src="assets/images/edited-photo-3.svg" alt="ShoreVest logo">
        <span class="nav__logo-lockup">
          <span class="nav__logo-en">S H O R E V E S T</span>
          <span class="nav__logo-cn">${HOMEPAGE_CN_WORDMARK}</span>
        </span>
      </a>
  <ul class="nav__links" id="nav-links">
    <li><a href="firm.html">The Firm</a></li>
    <li><a href="strategy.html">Strategy</a></li>
    <li><a href="insights.html">Insights</a></li>
    <li><a href="press.html">Press</a></li>
    <li><a href="team.html">Team</a></li>
    <li class="nav__mobile-investor"><a href="investor-access.html">Investor Access</a></li>
  <li class="nav__mobile-lang"><a href="index_cn.html">${HOMEPAGE_CN_LANGUAGE_LABEL}</a></li></ul><div class="nav__right">
    <a href="index_cn.html" class="nav__zh lang-toggle">${HOMEPAGE_CN_LANGUAGE_LABEL}</a>
    <a href="investor-access.html" class="nav__lp">Investor Access</a>
    <button class="nav__menu-btn" type="button" aria-expanded="false" aria-controls="nav-links">MENU</button>
  </div>
</nav>`;

  const nav = document.getElementById('nav');
  const menuBtn = nav.querySelector('.nav__menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target)) {
        nav.classList.remove('menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const path = window.location.pathname.split('/').pop() || 'index.html';
  const activeMap = {
    'firm.html': 'firm.html',
    'firm_cn.html': 'firm.html',
    'strategy.html': 'strategy.html',
    'strategy_cn.html': 'strategy.html',
    'insights.html': 'insights.html',
    'insights_cn.html': 'insights.html',
    'press.html': 'press.html',
    'press_cn.html': 'press.html',
    'team.html': 'team.html',
    'team_cn.html': 'team.html',
    'investor-access.html': 'investor-access.html',
    'investor-access_cn.html': 'investor-access.html'
  };

  const activeHref = activeMap[path];
  if (activeHref) {
    const activeLinks = nav.querySelectorAll(`a[href="${activeHref}"]`);
    activeLinks.forEach((activeLink) => activeLink.classList.add('active'));
  }
})();
