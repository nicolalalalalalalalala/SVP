(function () {
  const section = document.querySelector('[data-history-timeline]');
  if (!section) return;

  const milestones = [
    {
      year: '2004',
      title: 'The strategy begins',
      body:
        'The investment strategy began in 2004 with a focused approach to onshore, asset-backed credit in China. Early work centered on legal enforceability, collateral quality, and downside protection in a market with uneven data and evolving creditor behavior. This period established a discipline of combining local sourcing with conservative structuring rather than relying on broad market direction.',
      imageSlot: null,
    },
    {
      year: '2005',
      title: 'First institutional NPL cycle',
      body:
        'As institutional non-performing loan activity expanded, the team moved from opportunistic transactions to a repeatable underwriting framework. Execution required coordination across counterparties, legal advisers, and local courts, with attention to process risk at each stage. Lessons from this cycle clarified that entry price alone was insufficient without operational control through resolution.',
      imageSlot: null,
    },
    {
      year: '2008',
      title: 'Investing through the global financial crisis',
      body:
        'During the 2008 crisis, the strategy was tested under stressed liquidity and shifting risk assumptions. Portfolio decisions prioritized capital preservation, enforceability of claims, and selective deployment into structures with clear collateral coverage. The period reinforced an operating principle that cycle pressure can create opportunity only when legal execution and servicing capacity remain intact.',
      imageSlot: null,
    },
    {
      year: '2011–2015',
      title: 'Refining the playbook',
      body:
        'From 2011 through 2015, the approach was refined through multiple transaction outcomes and varied borrower situations. Underwriting standards were tightened around covenant quality, collateral pathways, and recovery planning from day one. This was a consolidation phase: fewer assumptions, tighter controls, and clearer role definition across sourcing, legal work, and portfolio management.',
      imageSlot: null,
    },
    {
      year: '2016',
      title: 'ShoreVest is established',
      body:
        'In 2016, ShoreVest was established as a formal firm. This marked an institutional step-change in governance, reporting, and platform structure, while building on strategy experience that began in 2004. The distinction matters: the investment discipline was cycle-tested before formation, and the firm structure was then designed to scale that discipline for long-duration institutional capital.',
      imageSlot: null,
    },
    {
      year: '2017–2018',
      title: 'A new market window opens',
      body:
        'Regulatory and financing conditions in 2017–2018 created a new set of private credit opportunities in onshore markets. Execution required selective origination and careful structuring as policy direction and borrower access shifted. The team applied established underwriting controls to a changing opportunity set, emphasizing recoverability and process certainty over transaction volume.',
      imageSlot: null,
    },
    {
      year: '2018–2024',
      title: 'Proof through execution',
      body:
        'Across 2018–2024, results were shaped by disciplined deployment, active servicing, and consistent workout execution through volatile conditions. This period tested whether process design held under policy change and uneven macro sentiment. The record reflects practical learning over multiple situations rather than a single market call: structure rigor, local execution, and continuous portfolio oversight.',
      imageSlot: null,
    },
    {
      year: '2025 onward',
      title: 'Building the hundred-year firm',
      body:
        'From 2025 onward, the priority is institutional continuity: maintaining underwriting discipline while strengthening platform durability across cycles. The focus remains on governance quality, team succession, and execution standards that can be repeated over decades. The objective is not expansion for its own sake, but preserving a specialist onshore credit capability that remains reliable under changing market conditions.',
      imageSlot: null,
    },
  ];

  const introText =
    'This history reflects the development of a specialist onshore credit platform in China across changing market cycles. It captures how investment discipline evolved through regulatory change, credit dislocation, and practical execution constraints. Strategy experience begins in 2004, while ShoreVest as a formal firm begins in 2016. The sequence emphasizes process learning, risk control, and continuity of onshore implementation over time.';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const railList = section.querySelector('[data-timeline-rail-list]');
  const panelStack = section.querySelector('[data-timeline-panel-stack]');
  const cardStack = section.querySelector('[data-timeline-mobile-stack]');
  const introNode = section.querySelector('[data-history-intro]');
  const scrollArea = section.querySelector('[data-history-scroll-area]');

  if (!railList || !panelStack || !introNode || !scrollArea) return;

  introNode.textContent = introText;

  const railButtons = [];
  const panelItems = [];

  const createImagePanel = () => {
    const wrap = document.createElement('aside');
    wrap.className = 'history-image-panel';
    wrap.setAttribute('aria-label', 'Archival material placeholder.');

    const label = document.createElement('span');
    label.className = 'history-image-panel__label';
    label.textContent = 'archival material';

    wrap.appendChild(label);
    return wrap;
  };

  milestones.forEach((milestone, index) => {
    const railItem = document.createElement('li');
    const railButton = document.createElement('button');
    railButton.type = 'button';
    railButton.className = 'history-rail__year';
    railButton.textContent = milestone.year;
    railButton.setAttribute('data-year-index', String(index));
    railButton.setAttribute('aria-controls', `history-panel-${index}`);
    railButton.setAttribute('aria-label', `Go to ${milestone.year}`);
    railButton.addEventListener('click', () => {
      if (window.innerWidth < 980) return;
      const viewport = window.innerHeight || 1;
      const targetProgress = milestones.length === 1 ? 0 : index / (milestones.length - 1);
      const sectionTop = scrollArea.offsetTop;
      const totalRange = Math.max(scrollArea.offsetHeight - viewport, 1);
      const targetScroll = sectionTop + targetProgress * totalRange;
      window.scrollTo({ top: targetScroll, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    railItem.appendChild(railButton);
    railList.appendChild(railItem);
    railButtons.push(railButton);

    const panel = document.createElement('article');
    panel.className = 'history-panel__item';
    panel.id = `history-panel-${index}`;
    panel.setAttribute('aria-hidden', 'true');

    const content = document.createElement('div');
    content.className = 'history-panel__content';

    const year = document.createElement('p');
    year.className = 'history-panel__year';
    year.textContent = milestone.year;

    const title = document.createElement('h3');
    title.className = 'history-panel__title';
    title.textContent = milestone.title;

    const body = document.createElement('p');
    body.className = 'history-panel__body';
    body.textContent = milestone.body;

    content.append(year, title, body);
    panel.append(content, createImagePanel());
    panelStack.appendChild(panel);
    panelItems.push(panel);

    const card = document.createElement('article');
    card.className = 'history-card';
    card.innerHTML = `
      <p class="history-card__year">${milestone.year}</p>
      <h3 class="history-card__title">${milestone.title}</h3>
      <p class="history-card__body">${milestone.body}</p>
    `;
    card.appendChild(createImagePanel());
    if (cardStack) cardStack.appendChild(card);
  });

  const state = {
    activeIndex: 0,
    latestProgress: 0,
  };

  function updateStage(index, progress) {
    state.activeIndex = index;
    section.style.setProperty('--sv-history-progress', String(progress));

    railButtons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === index;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-current', isActive ? 'true' : 'false');
      button.tabIndex = isActive ? 0 : -1;
    });

    panelItems.forEach((panel, panelIndex) => {
      const isActive = panelIndex === index;
      panel.classList.toggle('is-active', isActive);
      panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      if (!reduceMotion) {
        panel.style.transform = isActive ? 'translateY(0px)' : panelIndex < index ? 'translateY(-10px)' : 'translateY(10px)';
      }
    });
  }

  function desktopTick() {
    if (window.innerWidth < 980) return;
    const viewport = window.innerHeight || 1;
    const rect = scrollArea.getBoundingClientRect();
    const totalScrollable = Math.max(scrollArea.offsetHeight - viewport, 1);
    const traveled = Math.min(Math.max(-rect.top, 0), totalScrollable);
    const progress = traveled / totalScrollable;
    state.latestProgress = progress;

    const floatIndex = progress * (milestones.length - 1);
    const nextIndex = Math.round(floatIndex);
    if (nextIndex !== state.activeIndex) {
      updateStage(nextIndex, progress);
      return;
    }
    section.style.setProperty('--sv-history-progress', String(progress));
  }

  function resizeTimelineHeight() {
    if (window.innerWidth < 980) {
      scrollArea.style.removeProperty('--history-scroll-height');
      return;
    }
    const viewport = window.innerHeight || 1;
    const multiplier = reduceMotion ? 0.55 : 0.72;
    const totalHeight = Math.max(Math.round(viewport * (1 + (milestones.length - 1) * multiplier)), viewport * 2);
    scrollArea.style.setProperty('--history-scroll-height', `${totalHeight}px`);
  }

  let raf = null;
  const onScroll = () => {
    if (raf) return;
    raf = window.requestAnimationFrame(() => {
      desktopTick();
      raf = null;
    });
  };

  updateStage(0, 0);
  resizeTimelineHeight();
  desktopTick();

  window.addEventListener('resize', () => {
    resizeTimelineHeight();
    desktopTick();
  });
  window.addEventListener('scroll', onScroll, { passive: true });

  if (!cardStack) return;

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const cards = cardStack.querySelectorAll('.history-card');
    const cardObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );
    cards.forEach((card) => cardObserver.observe(card));
  } else {
    cardStack.querySelectorAll('.history-card').forEach((card) => card.classList.add('is-in'));
  }
})();
