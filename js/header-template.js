// Common Header Template
class HeaderTemplate {
    constructor() {
        this.init();
    }

    init() {
        this.addFirebaseSDKs();
        this.addUserAuthScript();
        this.setupToggleNav();
    }

    addFirebaseSDKs() {
        // Check if Firebase SDKs are already loaded
        if (document.querySelector('script[src*="firebase-app-compat.js"]')) {
            return;
        }

        // Add Firebase SDKs
        const firebaseAppScript = document.createElement('script');
        firebaseAppScript.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js';
        document.head.appendChild(firebaseAppScript);

        const firebaseAuthScript = document.createElement('script');
        firebaseAuthScript.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js';
        document.head.appendChild(firebaseAuthScript);

        // Add config.js
        const configScript = document.createElement('script');
        configScript.src = this.getConfigPath();
        document.head.appendChild(configScript);
    }

    getConfigPath() {
        // Determine the correct path to config.js based on current page
        const path = window.location.pathname;
        if (path.includes('/articles/')) {
            return '../config.js';
        } else {
            return 'config.js';
        }
    }

    addUserAuthScript() {
        // Check if user-auth.js is already loaded
        if (document.querySelector('script[src*="user-auth.js"]')) {
            return;
        }

        // Add user-auth.js
        const userAuthScript = document.createElement('script');
        userAuthScript.src = this.getUserAuthPath();
        document.head.appendChild(userAuthScript);
    }

    getUserAuthPath() {
        // Determine the correct path to user-auth.js based on current page
        const path = window.location.pathname;
        if (path.includes('/articles/')) {
            return '../js/user-auth.js';
        } else {
            return 'js/user-auth.js';
        }
    }

    setupToggleNav() {
        // Setup global toggleNav function
        window.toggleNav = function() {
            const nav = document.getElementById('main-nav');
            const navToggle = document.querySelector('.nav-toggle');
            
            console.log('toggleNav called');
            
            if (nav) {
                nav.classList.toggle('show');
                console.log('nav show class:', nav.classList.contains('show'));
                
                // Update button state
                if (navToggle) {
                    if (nav.classList.contains('show')) {
                        navToggle.classList.add('active');
                        console.log('added active class');
                    } else {
                        navToggle.classList.remove('active');
                        console.log('removed active class');
                    }
                }
            }
        };

        // Setup header placeholder
        this.setupHeaderPlaceholder();
    }

    setupHeaderPlaceholder() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = `
                <header>
                    <h1><a href="index.html"><img src="assets/logo.png" alt="Camega Logo"></a></h1>
                    <button class="nav-toggle" onclick="toggleNav()">☰</button>
                    <nav id="main-nav">
                        <a href="products.html">Products</a>
                        <a href="index.html#contact">Contact</a>
                        <a href="articles.html">Articles</a>
                    </nav>
                    <div class="user-section">
                        <div id="user-info" class="header-user-info hidden">
                            <span id="user-name-display"></span>
                            <button class="user-avatar-btn" onclick="toggleUserMenu()" id="user-avatar-btn">U</button>
                            <div class="user-dropdown" id="user-dropdown">
                                <a href="user-management.html">User Center</a>
                                <a href="#" onclick="handleLogout()">Logout</a>
                            </div>
                        </div>
                        <div id="auth-buttons" class="header-auth-buttons">
                            <button onclick="showLoginModal()" class="login-btn">Login</button>
                            <button onclick="showSignupModal()" class="signup-btn">Sign Up</button>
                        </div>
                    </div>
                </header>
            `;
        }
    }
}

// Initialize header template
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.headerTemplate = new HeaderTemplate();
    });
} else {
    window.headerTemplate = new HeaderTemplate();
} 