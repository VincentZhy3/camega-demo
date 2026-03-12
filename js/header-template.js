class HeaderTemplate {
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
    this.injectHeader();
    this.addFirebaseSDKs();
    if (!window.skipUserAuth) {
      this.addUserAuthScript();
    }
    this.setupToggleNav();
    this.setupBackToTop();
  }

  injectHeader() {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    const bp = this.basePath;
    placeholder.outerHTML = `
    <header>
      <h1><a href="${bp}index.html"><img src="${bp}assets/logo.png" alt="Camega Logo"></a></h1>
      <button class="nav-toggle" onclick="toggleNav()">\u2630</button>
      <nav id="main-nav">
        <a href="${bp}products.html" data-page="products">Products</a>
        <a href="${bp}index.html#contact" data-page="contact">Contact</a>
        <a href="${bp}articles.html" data-page="articles">Articles</a>
      </nav>
      <div class="user-section">
        <div id="user-info" class="header-user-info hidden">
          <span id="user-name-display"></span>
          <button class="user-avatar-btn" onclick="toggleUserMenu()" id="user-avatar-btn">U</button>
          <div class="user-dropdown" id="user-dropdown">
            <a href="${bp}user-management.html">User Center</a>
            <a href="#" onclick="handleLogout()">Logout</a>
          </div>
        </div>
        <div id="login-btn" class="login-btn">
          <a href="${bp}user-management.html">Login</a>
        </div>
      </div>
    </header>`;

    this.setActiveNav();
  }

  setActiveNav() {
    const path = window.location.pathname.toLowerCase();
    document.querySelectorAll('nav#main-nav a[data-page]').forEach(link => {
      const page = link.dataset.page;
      if (page === 'products' && path.includes('products')) {
        link.classList.add('active');
      } else if (page === 'articles' && path.includes('articles')) {
        link.classList.add('active');
      }
    });
  }

  addFirebaseSDKs() {
    if (document.querySelector('script[src*="firebase-app-compat.js"]')) return;

    const sdks = [
      'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js',
      'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js'
    ];
    sdks.forEach(src => {
      const s = document.createElement('script');
      s.src = src;
      document.head.appendChild(s);
    });

    const cfg = document.createElement('script');
    cfg.src = this.basePath + 'config.js';
    document.head.appendChild(cfg);
  }

  addUserAuthScript() {
    if (document.querySelector('script[src*="user-auth.js"]')) return;
    const s = document.createElement('script');
    s.src = this.basePath + 'js/user-auth.js';
    document.head.appendChild(s);
  }

  setupToggleNav() {
    window.toggleNav = function () {
      const nav = document.getElementById('main-nav');
      const btn = document.querySelector('.nav-toggle');
      if (nav) {
        nav.classList.toggle('show');
        if (btn) btn.classList.toggle('active', nav.classList.contains('show'));
      }
    };
  }

  setupBackToTop() {
    window.scrollToTop = function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('scroll', function () {
      const btn = document.querySelector('.back-to-top');
      if (btn) {
        btn.classList.toggle('visible', window.scrollY > 300);
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { window.headerTemplate = new HeaderTemplate(); });
} else {
  window.headerTemplate = new HeaderTemplate();
}
