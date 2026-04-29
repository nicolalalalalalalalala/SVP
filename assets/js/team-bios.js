(() => {
  const grids = Array.from(document.querySelectorAll('.group .grid'));
  if (!grids.length) return;

  grids.forEach((grid, gridIndex) => {
    const profiles = Array.from(grid.querySelectorAll('[data-team-profile]'));
    if (!profiles.length) return;

    let expansion = null;

    const createExpansion = () => {
      if (expansion) return expansion;

      const drawer = document.createElement('div');
      drawer.className = 'team-row-bio team-bio-drawer bio-drawer';
      drawer.id = `team-row-bio-${gridIndex + 1}`;
      drawer.innerHTML = '<div class="team-row-bio__meta"><div class="team-row-bio__name"></div><div class="team-row-bio__role"></div><div class="team-row-bio__links"></div></div><div class="team-row-bio__content"></div>';
      grid.appendChild(drawer);
      expansion = drawer;

      return expansion;
    };

    const removeExpansion = () => {
      if (expansion) {
        expansion.remove();
        expansion = null;
      }
    };

    const collapseAll = () => {
      profiles.forEach((profile) => {
        profile.classList.remove('team-profile--active', 'is-open');
        profile.querySelectorAll('[aria-expanded]').forEach((control) => control.setAttribute('aria-expanded', 'false'));
      });
      removeExpansion();
    };

    const getBioContent = (profile) => {
      const control = profile.querySelector('.team-profile__bio-toggle[aria-controls], .team-profile__photo-btn[aria-controls]');
      const bioId = control?.getAttribute('aria-controls')?.trim();
      if (!bioId) return null;

      const bio = document.getElementById(bioId);
      if (!bio) return null;

      const html = bio.innerHTML.trim();
      if (!html) return null;

      return { bio, html };
    };

    const openProfile = (profile) => {
      const bioContent = getBioContent(profile);
      if (!bioContent) return;

      collapseAll();
      profile.classList.add('team-profile--active', 'is-open');
      profile.querySelectorAll('[aria-expanded]').forEach((control) => control.setAttribute('aria-expanded', 'true'));

      const drawer = createExpansion();
      drawer.querySelector('.team-row-bio__name').textContent = profile.querySelector('.team-profile__name')?.textContent?.trim() || '';
      drawer.querySelector('.team-row-bio__role').textContent = profile.querySelector('.team-profile__role')?.textContent?.trim() || '';
      drawer.querySelector('.team-row-bio__links').innerHTML = profile.querySelector('.team-profile__linkedin')?.outerHTML || '';
      drawer.querySelector('.team-row-bio__content').innerHTML = bioContent.html;

      drawer.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    };

    profiles.forEach((profile) => {
      profile.querySelectorAll('.team-profile__photo-btn, .team-profile__bio-toggle').forEach((control) => {
        control.addEventListener('click', () => {
          const isOpen = profile.classList.contains('team-profile--active');
          if (isOpen) {
            collapseAll();
            return;
          }

          openProfile(profile);
        });
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth < 560) {
        const active = grid.querySelector('.team-profile--active');
        if (active) openProfile(active);
      }
    });
  });
})();
