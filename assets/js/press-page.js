(() => {
  const carousel = document.querySelector('[data-speaking-carousel]');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.press-speaking__slide'));
  const prevButton = carousel.querySelector('[data-speaking-prev]');
  const nextButton = carousel.querySelector('[data-speaking-next]');
  const counter = carousel.querySelector('[data-speaking-counter]');
  let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));

  const renderSlide = () => {
    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });

    if (counter) {
      counter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    }
  };

  prevButton?.addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + slides.length) % slides.length;
    renderSlide();
  });

  nextButton?.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % slides.length;
    renderSlide();
  });

  renderSlide();
})();

(() => {
  const yearSelect = document.getElementById('press-year-select');
  const publicationSelect = document.getElementById('press-publication-select');
  const archive = document.getElementById('press-archive');
  const countLabel = document.getElementById('press-results-count');
  const moreButton = document.getElementById('press-more-btn');
  const PAGE_SIZE = 12;

  if (!yearSelect || !publicationSelect || !archive || !countLabel || !moreButton) return;

  const rows = Array.from(archive.querySelectorAll('.press-row'));
  const rowMeta = rows.map((row) => {
    const publication = row.querySelector('.press-publication')?.textContent?.trim() ?? '';
    const datetime = row.querySelector('.press-date')?.getAttribute('datetime') ?? '';
    const year = datetime ? String(new Date(datetime).getUTCFullYear()) : '';
    return { row, publication, year };
  });

  const uniqueYears = Array.from(new Set(rowMeta.map((item) => item.year).filter(Boolean))).sort((a, b) => Number(b) - Number(a));
  const uniquePublications = Array.from(new Set(rowMeta.map((item) => item.publication).filter(Boolean))).sort((a, b) => a.localeCompare(b));

  uniqueYears.forEach((year) => yearSelect.insertAdjacentHTML('beforeend', `<option value="${year}">${year}</option>`));
  uniquePublications.forEach((publication) => publicationSelect.insertAdjacentHTML('beforeend', `<option value="${publication}">${publication}</option>`));

  let shownCount = PAGE_SIZE;

  const renderRows = () => {
    const selectedYear = yearSelect.value;
    const selectedPublication = publicationSelect.value;
    const filtered = rowMeta.filter((item) => (selectedYear === 'All' || item.year === selectedYear) && (selectedPublication === 'All' || item.publication === selectedPublication));

    rowMeta.forEach((item) => {
      item.row.style.display = 'none';
    });

    filtered.slice(0, shownCount).forEach((item) => {
      item.row.style.display = '';
    });

    const visibleCount = Math.min(filtered.length, shownCount);
    countLabel.textContent = `Showing ${visibleCount} of ${filtered.length}`;
    moreButton.hidden = shownCount >= filtered.length;
    moreButton.disabled = shownCount >= filtered.length;
  };

  const applyFilters = () => {
    shownCount = PAGE_SIZE;
    renderRows();
  };

  yearSelect.addEventListener('change', applyFilters);
  publicationSelect.addEventListener('change', applyFilters);
  moreButton.addEventListener('click', () => {
    shownCount += PAGE_SIZE;
    renderRows();
  });

  renderRows();
})();
