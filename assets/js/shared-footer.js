(() => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const isCnPath = /_cn\.html$/i.test(path);

  const footerTemplateEn = `
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

  const footerTemplateCn = `
  <div class="sv-footer__inner">
    <div class="sv-footer__main">
      <div class="sv-footer__brand">ShoreVest Partners</div>
      <div class="sv-footer__contact">
        <span class="sv-footer__contact-label">联系我们</span>
        <a href="mailto:partners@shorevest.com">PARTNERS@SHOREVEST.COM</a>
      </div>
    </div>

    <div class="sv-footer__bottom">
      <div class="sv-footer__copyright">&copy; ShoreVest Partners, Ltd. 保留所有权利。</div>
      <details class="sv-footer__legal-toggle">
        <summary>法律声明</summary>
        <div class="sv-footer__legal">本网站使用 Cookie 及类似技术用于网站运行、分析和安全目的。为保障网站正常功能，某些 Cookie 可能为必需。继续使用本网站即表示您确认并同意本《Cookie 通知》所述内容；另请同时查阅《隐私政策》《使用条款》及《法律声明与免责声明》。</div>
      </details>
      <div class="sv-footer__legal-links"><a href="privacy-policy_cn.html">隐私政策</a><a href="cookie-notice_cn.html">Cookie 通知</a><a href="terms-of-use_cn.html">使用条款</a><a href="disclaimers_cn.html">法律声明与免责声明</a></div>
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
      force(node, 'font-family', isCnPath ? '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif' : '"Inter", system-ui, sans-serif');
    });
  };

  ensureTypographySystem();

  const mountFooter = (node) => {
    node.className = `sv-footer ${isCnPath ? 'sv-footer--cn' : 'sv-footer--en'}`;
    node.innerHTML = isCnPath ? footerTemplateCn : footerTemplateEn;
    setTypographyTokens(node);
  };

  document.querySelectorAll('footer.sv-footer').forEach(mountFooter);
})();
