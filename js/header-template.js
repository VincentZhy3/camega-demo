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
            if (nav) {
                nav.classList.toggle('show');
            }
        };
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