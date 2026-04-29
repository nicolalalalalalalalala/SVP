(() => {
  const grids = Array.from(document.querySelectorAll('.group .grid'));
  if (!grids.length) return;

  grids.forEach((grid, gridIndex) => {
    const profiles = Array.from(grid.querySelectorAll('[data-team-profile]'));
    if (!profiles.length) return;

    const expansion = document.createElement('div');
    expansion.className = 'team-row-bio';
    expansion.id = `team-row-bio-${gridIndex + 1}`;
    expansion.hidden = true;
    expansion.innerHTML = '<div class="team-row-bio__meta"><div class="team-row-bio__name"></div><div class="team-row-bio__role"></div><div class="team-row-bio__links"></div></div><div class="team-row-bio__content"></div>';
    grid.appendChild(expansion);

    const collapseAll = () => {
      profiles.forEach((profile) => {
        profile.classList.remove('team-profile--active');
        profile.querySelectorAll('[aria-expanded]').forEach((control) => control.setAttribute('aria-expanded', 'false'));
      });
      expansion.hidden = true;
    };

    const openProfile = (profile) => {
      const bio = profile.querySelector('.team-profile__bio');
      if (!bio) return;
      collapseAll();
      profile.classList.add('team-profile--active');
      profile.querySelectorAll('[aria-expanded]').forEach((control) => control.setAttribute('aria-expanded', 'true'));

      expansion.querySelector('.team-row-bio__name').textContent = profile.querySelector('.team-profile__name')?.textContent?.trim() || '';
      expansion.querySelector('.team-row-bio__role').textContent = profile.querySelector('.team-profile__role')?.textContent?.trim() || '';
      expansion.querySelector('.team-row-bio__links').innerHTML = profile.querySelector('.team-profile__linkedin')?.outerHTML || '';
      expansion.querySelector('.team-row-bio__content').innerHTML = bio.innerHTML;
      expansion.hidden = false;
      expansion.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    };

    profiles.forEach((profile) => {
      profile.querySelectorAll('.team-profile__photo-btn, .team-profile__bio-toggle').forEach((control) => {
        control.addEventListener('click', () => {
          const isOpen = profile.classList.contains('team-profile--active');
          if (isOpen) collapseAll();
          else openProfile(profile);
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
