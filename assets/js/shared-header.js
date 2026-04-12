(() => {
  const mount = document.getElementById('site-header-mount');
  if (!mount) return;

  const path = window.location.pathname.split('/').pop() || 'index.html';
  const isCnPath = /_cn\.html$/i.test(path);

  const localeMap = {
    'index.html': 'index_cn.html',
    'firm.html': 'firm_cn.html',
    'strategy.html': 'strategy_cn.html',
    'insights.html': 'insights_cn.html',
    'press.html': 'press_cn.html',
    'team.html': 'team_cn.html',
    'privacy-policy.html': 'privacy-policy_cn.html',
    'cookie-notice.html': 'cookie-notice_cn.html',
    'terms-of-use.html': 'terms-of-use_cn.html',
    'legal-notices-disclaimers.html': 'legal-notices-disclaimers_cn.html',
    'disclaimers.html': 'disclaimers_cn.html',
    'investor-access.html': 'investor-access_cn.html',
    'investor-access-portal-terms.html': 'investor-access-portal-terms_cn.html',
    'index_cn.html': 'index.html',
    'firm_cn.html': 'firm.html',
    'strategy_cn.html': 'strategy.html',
    'insights_cn.html': 'insights.html',
    'press_cn.html': 'press.html',
    'team_cn.html': 'team.html',
    'privacy-policy_cn.html': 'privacy-policy.html',
    'cookie-notice_cn.html': 'cookie-notice.html',
    'terms-of-use_cn.html': 'terms-of-use.html',
    'legal-notices-disclaimers_cn.html': 'legal-notices-disclaimers.html',
    'disclaimers_cn.html': 'disclaimers.html',
    'investor-access_cn.html': 'investor-access.html',
    'investor-access-portal-terms_cn.html': 'investor-access-portal-terms.html'
  };

  const targetLocaleHref = localeMap[path] || (isCnPath ? 'index.html' : 'index_cn.html');
  const langLabel = isCnPath ? 'EN' : '中文';

  const navItems = isCnPath
    ? [
        { href: 'firm_cn.html', label: '公司概览' },
        { href: 'strategy_cn.html', label: '投资策略' },
        { href: 'insights_cn.html', label: '研究洞察' },
        { href: 'press_cn.html', label: '新闻动态' },
        { href: 'team_cn.html', label: '团队' }
      ]
    : [
        { href: 'firm.html', label: 'THE FIRM' },
        { href: 'strategy.html', label: 'STRATEGY' },
        { href: 'insights.html', label: 'INSIGHTS' },
        { href: 'press.html', label: 'PRESS' },
        { href: 'team.html', label: 'TEAM' }
      ];

  const headerCtaHref = 'mailto:partners@shorevest.com';
  const headerCtaLabel = isCnPath ? '联系我们' : 'CONTACT';
  const wordmark = '新岸資本';

  mount.innerHTML = `<nav id="nav" class="${isCnPath ? 'nav--cn' : 'nav--en'}">
  <a href="${isCnPath ? 'index_cn.html' : 'index.html'}" class="nav__logo">
    <img class="nav__logo-mark" src="assets/images/edited-photo-3.svg" alt="ShoreVest logo">
    <span class="nav__logo-lockup">
      <span class="nav__logo-en">S H O R E V E S T</span>
      <span class="nav__logo-cn">${wordmark}</span>
    </span>
  </a>
  <ul class="nav__links" id="nav-links">
    ${navItems.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join('')}
    <li class="nav__mobile-investor"><a href="${headerCtaHref}">${headerCtaLabel}</a></li>
    <li class="nav__mobile-lang"><a href="${targetLocaleHref}" class="lang-toggle">${langLabel}</a></li>
  </ul>
  <div class="nav__right">
    <a href="${targetLocaleHref}" class="nav__zh lang-toggle">${langLabel}</a>
    <a href="${headerCtaHref}" class="nav__lp">${headerCtaLabel}</a>
    <button class="nav__menu-btn" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu">
      <span class="nav__menu-btn-label">Menu</span>
      <span class="nav__menu-btn-icon" aria-hidden="true"></span>
    </button>
  </div>
</nav>`;

  const nav = document.getElementById('nav');
  const menuBtn = nav.querySelector('.nav__menu-btn');
  const navLinks = nav.querySelector('.nav__links');

  if (menuBtn && navLinks) {
    const menuBtnLabel = menuBtn.querySelector('.nav__menu-btn-label');
    const mobileMenuQuery = window.matchMedia('(max-width: 980px)');

    const setMenuState = (open) => {
      nav.classList.toggle('menu-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (menuBtnLabel) menuBtnLabel.textContent = open ? 'Close' : 'Menu';
      if (mobileMenuQuery.matches) {
        navLinks.setAttribute('aria-hidden', String(!open));
      } else {
        navLinks.setAttribute('aria-hidden', 'false');
      }
    };

    menuBtn.addEventListener('click', () => {
      const open = !nav.classList.contains('menu-open');
      setMenuState(open);
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target)) {
        setMenuState(false);
      }
    });

    nav.querySelectorAll('.nav__links a').forEach((link) => {
      link.addEventListener('click', () => setMenuState(false));
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 980 && nav.classList.contains('menu-open')) {
        setMenuState(false);
      }
    });

    navLinks.setAttribute('aria-hidden', 'true');
  }

  const activeMap = {
    firm: ['firm.html', 'firm_cn.html'],
    strategy: ['strategy.html', 'strategy_cn.html'],
    insights: [
      'insights.html',
      'insights_cn.html',
      'china-debt-dynamics-v10i1.html',
      'china-debt-dynamics-v10i1-print.html',
      'china-debt-dynamics-viewer.html'
    ],
    press: ['press.html', 'press_cn.html'],
    team: ['team.html', 'team_cn.html'],
    investor: ['investor-access.html', 'investor-access_cn.html']
  };

  Object.values(activeMap).forEach((hrefs) => {
    if (hrefs.includes(path)) {
      hrefs.forEach((href) => {
        nav.querySelectorAll(`a[href="${href}"]`).forEach((activeLink) => activeLink.classList.add('active'));
      });
    }
  });
})();
