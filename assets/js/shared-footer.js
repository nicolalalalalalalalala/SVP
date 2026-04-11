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


  const ensureTypographySystem = () => {
    const typographyHref = 'assets/css/shorevest-typography-reset.css';
    if (!document.querySelector(`link[href="${typographyHref}"]`)) {
      const typeLink = document.createElement('link');
      typeLink.rel = 'stylesheet';
      typeLink.href = typographyHref;
      document.head.appendChild(typeLink);
    }
  };

  ensureTypographySystem();

  const mountFooter = (node) => {
    node.className = 'sv-footer';
    node.innerHTML = footerTemplate;
  };

  document.querySelectorAll('footer.sv-footer').forEach(mountFooter);
})();
