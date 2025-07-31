// Global User Authentication Management
class UserAuthManager {
    constructor() {
        this.init();
    }

    init() {
        // Initialize Firebase if available
        if (typeof firebase !== 'undefined' && firebase.auth) {
            this.auth = firebase.auth();
            this.setupAuthListener();
        }
        
        // Check user status on page load
        this.checkUserStatus();
        
        // Setup global event listeners
        this.setupEventListeners();
    }

    setupAuthListener() {
        this.auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in
                const userInfo = {
                    name: user.displayName || user.email.split('@')[0],
                    email: user.email,
                    uid: user.uid
                };
                localStorage.setItem('currentUser', JSON.stringify(userInfo));
                this.checkUserStatus();
            } else {
                // User is signed out
                localStorage.removeItem('currentUser');
                localStorage.removeItem('authToken');
                this.checkUserStatus();
            }
        });
    }

    checkUserStatus() {
        const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
        const userInfo = document.getElementById('user-info');
        const loginBtn = document.getElementById('login-btn');
        
        if (!userInfo || !loginBtn) return;

        const userAvatarBtn = document.getElementById('user-avatar-btn');
        const userNameDisplay = document.getElementById('user-name-display');

        if (user) {
            userInfo.classList.remove('hidden');
            loginBtn.classList.add('hidden');
            if (userAvatarBtn) {
                userAvatarBtn.textContent = user.name ? user.name.charAt(0).toUpperCase() : 'U';
            }
            if (userNameDisplay) {
                userNameDisplay.textContent = user.name || user.email;
            }
        } else {
            userInfo.classList.add('hidden');
            loginBtn.classList.remove('hidden');
        }
    }

    async handleLogout() {
        try {
            // Sign out from Firebase if available
            if (this.auth) {
                await this.auth.signOut();
            } else if (typeof firebase !== 'undefined' && firebase.auth) {
                await firebase.auth().signOut();
            }
            
            // Clear localStorage
            localStorage.removeItem('currentUser');
            localStorage.removeItem('authToken');
            
            // Update UI
            this.checkUserStatus();
            
            // Reload page to ensure clean state
            window.location.reload();
        } catch (error) {
            console.error('Logout error:', error);
            // Fallback: just clear localStorage
            localStorage.removeItem('currentUser');
            localStorage.removeItem('authToken');
            this.checkUserStatus();
            window.location.reload();
        }
    }

    toggleUserMenu() {
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    }

    setupEventListeners() {
        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            const dropdown = document.getElementById('user-dropdown');
            const userAvatarBtn = document.getElementById('user-avatar-btn');
            
            if (dropdown && userAvatarBtn && 
                !userAvatarBtn.contains(event.target) && 
                !dropdown.contains(event.target)) {
                dropdown.classList.remove('show');
            }
        });

        // Setup global logout handler
        window.handleLogout = () => this.handleLogout();
        window.toggleUserMenu = () => this.toggleUserMenu();
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.userAuthManager = new UserAuthManager();
    });
} else {
    window.userAuthManager = new UserAuthManager();
} 