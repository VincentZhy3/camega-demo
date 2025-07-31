// Common Header Template
class HeaderTemplate {
    constructor() {
        this.init();
    }

    init() {
        this.setupHeader();
        this.setupNavigation();
    }

    setupHeader() {
        // Add Firebase SDKs if not already present
        this.addFirebaseSDKs();
        
        // Add user auth script
        this.addUserAuthScript();
    }

    addFirebaseSDKs() {
        if (!document.querySelector('script[src*="firebase-app-compat"]')) {
            const firebaseApp = document.createElement('script');
            firebaseApp.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js';
            document.head.appendChild(firebaseApp);
        }
        
        if (!document.querySelector('script[src*="firebase-auth-compat"]')) {
            const firebaseAuth = document.createElement('script');
            firebaseAuth.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js';
            document.head.appendChild(firebaseAuth);
        }
        
        if (!document.querySelector('script[src="config.js"]')) {
            const config = document.createElement('script');
            config.src = 'config.js';
            document.head.appendChild(config);
        }
    }

    addUserAuthScript() {
        if (!document.querySelector('script[src="js/user-auth.js"]')) {
            const userAuth = document.createElement('script');
            userAuth.src = 'js/user-auth.js';
            document.head.appendChild(userAuth);
        }
    }

    setupNavigation() {
        // Add navigation toggle functionality
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