(() => {
  const DESKTOP_BREAKPOINT = 1180;
  const TABLET_BREAKPOINT = 700;

  const getProfilesPerRow = () => {
    const width = window.innerWidth;
    if (width <= TABLET_BREAKPOINT) return 1;
    if (width <= DESKTOP_BREAKPOINT) return 2;
    return 4;
  };

  const closeGrid = (grid) => {
    const panel = grid.querySelector('.team-bio-panel');
    if (panel) panel.remove();

    grid.querySelectorAll('.team-profile.is-active').forEach((profile) => {
      profile.classList.remove('is-active');
      const toggle = profile.querySelector('.team-profile__bio-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  };

  const createPanel = (profile, bioSource) => {
    const panel = document.createElement('div');
    panel.className = 'team-bio-panel';

    const meta = document.createElement('div');
    meta.className = 'team-bio-panel__meta';

    const title = document.createElement('h3');
    title.textContent = profile.querySelector('.team-profile__name')?.textContent?.trim() || '';

    const role = document.createElement('p');
    role.textContent = profile.querySelector('.team-profile__role')?.textContent?.trim() || '';

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'team-bio-panel__close';
    closeButton.textContent = 'Close Bio';
    closeButton.setAttribute('aria-label', 'Close biography panel');

    meta.append(title, role, closeButton);

    const body = document.createElement('div');
    body.className = 'team-bio-panel__body';

    const paragraphs = bioSource.querySelectorAll('p');
    paragraphs.forEach((paragraph) => body.appendChild(paragraph.cloneNode(true)));

    panel.append(meta, body);
    return { panel, closeButton };
  };

  const openProfile = (grid, profile, bioId) => {
    const bioSource = grid.querySelector(`#${CSS.escape(bioId)}`);
    if (!bioSource) return;

    const alreadyActive = profile.classList.contains('is-active');
    closeGrid(grid);
    if (alreadyActive) return;

    profile.classList.add('is-active');
    const toggle = profile.querySelector('.team-profile__bio-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');

    const profiles = Array.from(grid.querySelectorAll('.team-profile[data-team-profile]'));
    const profileIndex = profiles.indexOf(profile);
    const profilesPerRow = getProfilesPerRow();
    const rowEndIndex = Math.min(Math.ceil((profileIndex + 1) / profilesPerRow) * profilesPerRow - 1, profiles.length - 1);
    const rowAnchor = profiles[rowEndIndex];

    const { panel, closeButton } = createPanel(profile, bioSource);
    rowAnchor.insertAdjacentElement('afterend', panel);

    closeButton.addEventListener('click', () => closeGrid(grid));
  };

  const initGrid = (grid) => {
    const profiles = grid.querySelectorAll('.team-profile[data-team-profile]');

    profiles.forEach((profile) => {
      const toggle = profile.querySelector('.team-profile__bio-toggle');
      const photo = profile.querySelector('.team-profile__photo[data-team-photo]');

      const activate = (bioId) => {
        if (!bioId) return;
        openProfile(grid, profile, bioId);
      };

      if (toggle) {
        toggle.addEventListener('click', () => {
          const bioId = toggle.getAttribute('aria-controls');
          activate(bioId);
        });
      }

      if (photo) {
        photo.setAttribute('role', 'button');
        photo.setAttribute('tabindex', '0');
        photo.setAttribute('aria-label', `Read bio for ${profile.querySelector('.team-profile__name')?.textContent?.trim() || 'team member'}`);
        photo.addEventListener('click', () => activate(photo.dataset.teamPhoto));
        photo.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            activate(photo.dataset.teamPhoto);
          }
        });
      }
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    const grids = Array.from(document.querySelectorAll('[data-team-grid]'));
    grids.forEach(initGrid);

    let resizeDebounce;
    window.addEventListener('resize', () => {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(() => grids.forEach(closeGrid), 120);
    });
  });
})();
