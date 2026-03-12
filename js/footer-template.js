class FooterTemplate {
  constructor() {
    this.basePath = this.getBasePath();
    this.init();
  }

  getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/articles/') || path.includes('/products/')) {
      return '../';
    }
    return '';
  }

  init() {
    this.injectFooter();
  }

  injectFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    const bp = this.basePath;
    const year = new Date().getFullYear();

    placeholder.outerHTML = `
    <footer>
      <div class="footer-content">
        <div class="footer-logo">
          <img src="${bp}assets/logo-white.png" alt="Camega" style="height:50px;margin-bottom:15px;">
          <p>Your trusted partner in health and wellness</p>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <a href="${bp}products.html">Products</a>
          <a href="${bp}index.html#contact">Contact</a>
          <a href="${bp}articles.html">Articles</a>
        </div>
        <div class="footer-section">
          <h4>Follow Us</h4>
          <a href="#" target="_blank">Facebook</a>
          <a href="#" target="_blank">Twitter</a>
          <a href="#" target="_blank">LinkedIn</a>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; ${year} Camega. All rights reserved.
      </div>
    </footer>
    <a class="back-to-top" onclick="scrollToTop()">\u2191</a>`;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { window.footerTemplate = new FooterTemplate(); });
} else {
  window.footerTemplate = new FooterTemplate();
}
