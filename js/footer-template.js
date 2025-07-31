// Footer Template
class FooterTemplate {
    constructor() {
        this.init();
    }

    init() {
        this.addFooterLogo();
    }

    addFooterLogo() {
        // 检查是否已经有footer logo
        const existingLogo = document.querySelector('.footer-logo');
        if (existingLogo) return;

        // 找到footer content
        const footerContent = document.querySelector('.footer-content');
        if (footerContent) {
            // 在footer content的开头插入logo
            const logoDiv = document.createElement('div');
            logoDiv.className = 'footer-logo';
            logoDiv.innerHTML = `
                <img src="${window.location.pathname.includes('/articles/') ? '../assets/logo-white.png' : 'assets/logo-white.png'}" alt="Camega Logo" style="height: 50px; margin-bottom: 15px;">
                <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 0;">
                    Your trusted partner in health and wellness
                </p>
            `;
            footerContent.insertBefore(logoDiv, footerContent.firstChild);
        }
    }
}

// Initialize footer template
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.footerTemplate = new FooterTemplate();
    });
} else {
    window.footerTemplate = new FooterTemplate();
} 