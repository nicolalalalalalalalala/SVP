(() => {
  const footerTemplate = `
  <div class="sv-footer__inner">
    <div class="sv-footer__main">
      <div class="sv-footer__brand">ShoreVest Partners</div>
      <div class="sv-footer__contact">
        <span class="sv-footer__contact-label">CONTACT</span>
        <a href="mailto:partners@shorevest.com">PARTNERS@SHOREVEST.COM</a>
      </div>
    </div>

    <div class="sv-footer__bottom">
      <div class="sv-footer__copyright">&copy; ShoreVest Partners, Ltd. All rights reserved.</div>
      <details class="sv-footer__legal-toggle">
        <summary>LEGAL NOTICE</summary>
        <div class="sv-footer__legal">This website uses cookies and similar technologies for operational, analytical, and security purposes. Certain cookies may be required for the Site to function. By using this website, you acknowledge the use of cookies as described in this Cookie Notice. Please also review our Privacy Policy, Terms of Use, and Legal Notices &amp; Disclaimers.</div>
      </details>
      <div class="sv-footer__legal-links"><a href="privacy-policy.html">Privacy Policy</a><a href="cookie-notice.html">Cookie Notice</a><a href="terms-of-use.html">Terms of Use</a><a href="disclaimers.html">Legal Notices &amp; Disclaimers</a></div>
    </div>
  </div>`;

  const setTypographyTokens = (footerNode) => {
    const force = (node, property, value) => node?.style.setProperty(property, value, 'important');
    const brand = footerNode.querySelector('.sv-footer__brand');
    const contactLabel = footerNode.querySelector('.sv-footer__contact-label');
    const contactLink = footerNode.querySelector('.sv-footer__contact a');
    const copyright = footerNode.querySelector('.sv-footer__copyright');
    const legalSummary = footerNode.querySelector('.sv-footer__legal-toggle > summary');
    const legalBody = footerNode.querySelector('.sv-footer__legal');
    const legalLinks = footerNode.querySelectorAll('.sv-footer__legal-links a');

    force(brand, 'font-family', '"DIN 2014", "Helvetica Neue", Arial, sans-serif');
    force(brand, 'font-size', '15px');
    force(brand, 'font-weight', '700');
    force(brand, 'letter-spacing', '0.05em');
    force(brand, 'line-height', '1.2');
    force(brand, 'text-transform', 'uppercase');

    [contactLabel, contactLink, copyright, legalSummary, legalBody, ...legalLinks].forEach((node) => {
      force(node, 'font-family', '"Inter", system-ui, sans-serif');
    });
  };

  const mountFooter = (node) => {
    node.className = 'sv-footer';
    node.innerHTML = footerTemplate;
    setTypographyTokens(node);
  };

  document.querySelectorAll('footer.sv-footer').forEach(mountFooter);
})();
