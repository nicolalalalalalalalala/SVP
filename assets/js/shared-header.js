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
    'contact.html': 'contact_cn.html',
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
    'investor-access-portal-terms_cn.html': 'investor-access-portal-terms.html',
    'contact_cn.html': 'contact.html'
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

  const headerCtaHref = isCnPath ? 'contact_cn.html' : 'contact.html';
  const headerCtaLabel = isCnPath ? '联系我们' : 'CONTACT';
  const wordmark = '新岸资本';

  mount.innerHTML = `<nav id="nav" class="${isCnPath ? 'nav--cn' : 'nav--en'}">
  <a href="${isCnPath ? 'index_cn.html' : 'index.html'}" class="nav__logo">
    <span class="nav__logo-lockup">
      <span class="nav__logo-en">SHOREVEST</span>
      <span class="nav__logo-cn">${wordmark}</span>
    </span>
  </a>
  <ul class="nav__links" id="nav-links">
    ${navItems.map((item) => `<li class="nav__menu-row"><a class="nav__menu-link" href="${item.href}">${item.label}</a></li>`).join('')}
    <li class="nav__menu-row nav__mobile-investor"><a class="nav__menu-link" href="${headerCtaHref}">${headerCtaLabel}</a></li>
    <li class="nav__menu-row nav__mobile-lang"><a href="${targetLocaleHref}" class="nav__menu-link lang-toggle">${langLabel}</a></li>
  </ul>
  <div class="nav__right">
    <a href="${targetLocaleHref}" class="nav__zh lang-toggle">${langLabel}</a>
    <a href="${headerCtaHref}" class="nav__lp">${headerCtaLabel}</a>
    <button class="nav__menu-btn" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu">
      <span class="nav__menu-btn-label">Menu</span>
      <span class="nav__menu-btn-icon" aria-hidden="true"></span>
    </button>
  </div>
</nav>
<div class="nav__subband"></div>`;

  // Mobile menu panel — appended directly to <body> to avoid stacking context
  // issues caused by #nav / #site-header-mount creating their own stacking contexts.
  const mobilePanel = document.createElement('div');
  mobilePanel.className = `mobile-menu-panel ${isCnPath ? 'nav--cn' : 'nav--en'}`;
  mobilePanel.setAttribute('aria-hidden', 'true');
  mobilePanel.setAttribute('role', 'dialog');
  mobilePanel.setAttribute('aria-label', 'Site navigation');
  mobilePanel.innerHTML = `<nav class="mobile-menu-list">
    ${navItems.map((item) => `<a class="mobile-menu-link" href="${item.href}">${item.label}</a>`).join('')}
    <a class="mobile-menu-link mobile-menu-link--lang" href="${targetLocaleHref}">${langLabel}</a>
    <a class="mobile-menu-link mobile-menu-link--contact" href="${headerCtaHref}">${headerCtaLabel}</a>
  </nav>`;
  document.body.appendChild(mobilePanel);

  const nav = document.getElementById('nav');
  const menuBtn = nav.querySelector('.nav__menu-btn');
  const navLinks = nav.querySelector('.nav__links');

  if (menuBtn && navLinks) {
    const menuBtnLabel = menuBtn.querySelector('.nav__menu-btn-label');
    const mobileMenuQuery = window.matchMedia('(max-width: 980px)');

    const setMenuState = (open) => {
      nav.classList.toggle('menu-open', open);
      document.body.classList.toggle('menu-open', open);
      mobilePanel.classList.toggle('is-open', open);
      mobilePanel.setAttribute('aria-hidden', String(!open));
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (menuBtnLabel) menuBtnLabel.textContent = open ? 'Close' : 'Menu';
      if (mobileMenuQuery.matches) {
        navLinks.setAttribute('aria-hidden', String(!open));
      } else {
        navLinks.setAttribute('aria-hidden', 'false');
      }
    };

    menuBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const open = !nav.classList.contains('menu-open');
      setMenuState(open);
    });

    navLinks.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    const closeOnOutsideInteraction = (event) => {
      if (!nav.classList.contains('menu-open')) return;
      const target = event.target;
      if (target instanceof Node && (nav.contains(target) || mobilePanel.contains(target))) return;
      setMenuState(false);
    };

    document.addEventListener('click', closeOnOutsideInteraction);
    document.addEventListener('pointerdown', closeOnOutsideInteraction);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('menu-open')) {
        setMenuState(false);
      }
    });

    nav.querySelectorAll('.nav__links a').forEach((link) => {
      link.addEventListener('click', () => setMenuState(false));
    });

    mobilePanel.querySelectorAll('a').forEach((link) => {
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
    insights: ['insights.html', 'insights_cn.html'],
    press: ['press.html', 'press_cn.html'],
    team: ['team.html', 'team_cn.html'],
    investor: ['investor-access.html', 'investor-access_cn.html']
  };

  const inferActiveSection = (currentPath) => {
    if (activeMap.firm.includes(currentPath)) return 'firm';
    if (activeMap.strategy.includes(currentPath)) return 'strategy';
    if (activeMap.press.includes(currentPath)) return 'press';
    if (activeMap.team.includes(currentPath)) return 'team';
    if (activeMap.investor.includes(currentPath)) return 'investor';
    if (activeMap.insights.includes(currentPath)) return 'insights';

    const insightsPatterns = [
      /^insight-/i,
      /^china-debt-dynamics/i,
      /^insight-understanding-/i
    ];

    return insightsPatterns.some((pattern) => pattern.test(currentPath))
      ? 'insights'
      : null;
  };

  if (['contact.html', 'contact_cn.html'].includes(path)) {
    nav.querySelectorAll(`a[href="${headerCtaHref}"]`).forEach((contactLink) => {
      contactLink.classList.add('active');
      contactLink.setAttribute('aria-current', 'page');
    });
    mobilePanel.querySelectorAll(`a[href="${headerCtaHref}"]`).forEach((link) => {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    });
  }

  const activeSection = inferActiveSection(path);
  if (activeSection) {
    activeMap[activeSection].forEach((href) => {
      nav.querySelectorAll(`a[href="${href}"]`).forEach((activeLink) => {
        activeLink.classList.add('active');
        activeLink.setAttribute('aria-current', 'page');
      });
      mobilePanel.querySelectorAll(`a[href="${href}"]`).forEach((activeLink) => {
        activeLink.classList.add('active');
        activeLink.setAttribute('aria-current', 'page');
      });
    });
  }
})();
