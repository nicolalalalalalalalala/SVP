(() => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const isCnPath = /_cn\.html$/i.test(path);

  /* The brand line uses class="sv-footer__brand footer-brand-lockup" so that
     both the legacy selector and the canonical role class apply the
     spaced all-caps Brand Lockup treatment defined in:
       shared-footer.css  →  .footer-brand-lockup / .sv-footer__brand
       shorevest-typography-system.css  →  .footer-brand-lockup
     Text content is normal mixed-case; CSS handles uppercase + tracking. */

  const footerTemplateEn = `
  <div class="sv-footer__inner">
    <div class="sv-footer__main">
      <div class="sv-footer__brand footer-brand-lockup">ShoreVest Partners</div>
      <div class="sv-footer__contact">
        <span class="sv-footer__contact-label">CONTACT</span>
        <a href="mailto:partners@shorevest.com">PARTNERS@SHOREVEST.COM</a>
      </div>
    </div>

    <div class="sv-footer__bottom">
      <div class="sv-footer__copyright">&copy; ShoreVest Partners, Ltd. All rights reserved.</div>
      <details class="sv-footer__legal-toggle">
        <summary>LEGAL NOTICE</summary>
        <div class="sv-footer__legal">This website uses cookies and similar technologies for operational, analytical, and security purposes. Certain cookies are required for core site functionality. By continuing to use this website, you acknowledge our use of cookies as described in the Cookie Notice and encourage you to review our Privacy Policy, Terms of Use, and Legal Notices &amp; Disclaimers.</div>
      </details>
      <nav class="sv-footer__legal-links" aria-label="Footer legal links"><a href="privacy-policy.html">Privacy Policy</a><a href="cookie-notice.html">Cookie Notice</a><a href="terms-of-use.html">Terms of Use</a><a href="legal-notices-disclaimers.html">Legal Notices &amp; Disclaimers</a></nav>
    </div>
  </div>`;

  const footerTemplateCn = `
  <div class="sv-footer__inner">
    <div class="sv-footer__main">
      <div class="sv-footer__brand footer-brand-lockup">ShoreVest Partners</div>
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
      <nav class="sv-footer__legal-links" aria-label="页脚法律链接"><a href="privacy-policy_cn.html">隐私政策</a><a href="cookie-notice_cn.html">Cookie 通知</a><a href="terms-of-use_cn.html">使用条款</a><a href="legal-notices-disclaimers_cn.html">法律声明与免责声明</a></nav>
    </div>
  </div>`;

  /* Ensure Noto Serif SC is loaded for Chinese footer content.
     DIN 2014 is a commercial font served via CSS font-face on the host;
     no Google Fonts URL is needed for it. */
  const ensureChineseFonts = () => {
    if (document.getElementById('sv-footer-cn-fonts')) return;
    const link = document.createElement('link');
    link.id = 'sv-footer-cn-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;700&display=swap';
    document.head.appendChild(link);
  };

  const mountFooter = (node) => {
    node.className = `sv-footer ${isCnPath ? 'sv-footer--cn' : 'sv-footer--en'}`;
    node.innerHTML = isCnPath ? footerTemplateCn : footerTemplateEn;

    /* CSS handles all font-family, letter-spacing, and colour via:
         shared-footer.css  (highest specificity footer rules)
         shorevest-typography-system.css  (canonical role system)
       No inline style overrides are applied here so that the CSS
       system remains the authoritative source of truth. */

    if (isCnPath) {
      ensureChineseFonts();
    }
  };

  document.querySelectorAll('footer.sv-footer, footer[data-shared-footer]').forEach(mountFooter);
})();
