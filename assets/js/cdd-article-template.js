(async () => {
  document.body.dataset.cddReady = 'false';

  const query = new URLSearchParams(window.location.search);
  const sourceFromQuery = query.get('source') || query.get('src');
  const source = sourceFromQuery || document.body.dataset.articleSource || document.body.dataset.defaultArticleSource;
  if (!source) return;

  const response = await fetch(source);
  if (!response.ok) throw new Error('Unable to load article content.');
  const data = await response.json();

  const meta = document.querySelector('[data-cdd-meta]');
  const title = document.querySelector('[data-cdd-title]');
  const dek = document.querySelector('[data-cdd-dek]');
  const body = document.querySelector('[data-cdd-body]');
  const findings = document.querySelector('[data-cdd-findings]');
  const disclaimer = document.querySelector('[data-cdd-disclaimer]');
  const contact = document.querySelector('[data-cdd-contact]');
  const copyright = document.querySelector('[data-cdd-copyright]');

  if (!meta || !title || !dek || !body || !findings || !disclaimer || !contact || !copyright) return;

  meta.innerHTML = `<span>${data.series}</span><span>${data.volumeIssue}</span><span>Published ${data.published}</span><span>${data.edition}</span>`;
  title.textContent = data.title;
  dek.textContent = data.dek;
  document.title = `${data.title} | ShoreVest`;

  data.sections.forEach((section) => {
    if (section.heading) {
      const h2 = document.createElement('h2');
      h2.textContent = section.heading;
      body.appendChild(h2);
    }

    (section.paragraphs || []).forEach((paragraph) => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      body.appendChild(p);
    });

    if (section.bullets?.length) {
      const ul = document.createElement('ul');
      section.bullets.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      });
      body.appendChild(ul);
    }
  });

  findings.innerHTML = '';
  (data.keyFindings || []).forEach((finding) => {
    const li = document.createElement('li');
    li.textContent = finding;
    findings.appendChild(li);
  });

  if (!data.keyFindings?.length) {
    const sidecard = findings.closest('.cdd-sidecard');
    if (sidecard) sidecard.hidden = true;
  }

  disclaimer.textContent = data.disclaimer;
  contact.textContent = data.contact;
  copyright.textContent = data.copyright;

  document.querySelectorAll('[data-print-action="print"]').forEach((button) => {
    button.addEventListener('click', () => window.print());
  });

  const shouldAutoPrint =
    document.body.dataset.autoPrint === 'true' ||
    query.get('pdf') === '1';

  document.body.dataset.cddReady = 'true';

  if (shouldAutoPrint) {
    requestAnimationFrame(() => {
      setTimeout(() => window.print(), 120);
    });
  }
})();
