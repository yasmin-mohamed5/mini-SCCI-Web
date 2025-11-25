

const ThemeToggle = (function () {
    'use strict';

    const STORAGE_KEY = 'theme';
    const DARK_CLASS = 'dark-mode';

    let root = null;

    // 🎨 HTML الزرار
    const buttonHTML = `
        <button class="theme-toggle" id="themeToggle" aria-label="تغيير الثيم">
            <svg class="icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg class="icon sun-icon " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        </button>
    `;

    // 🚀 Initialize
    function init() {
        root = document.documentElement;

        // Load saved theme FIRST (before injecting button)
        loadTheme();

        // Inject button into page
        injectButton();

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', handleSystemChange);
    }

    // 💉 Inject button into DOM
    function injectButton() {
        document.body.insertAdjacentHTML('beforeend', buttonHTML);

        const btn = document.getElementById('themeToggle');
        if (btn) {
            btn.addEventListener('click', toggle);
        }
    }

    // 📂 Load saved theme
    function loadTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            saved === 'dark' ? enableDark() : enableLight();
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            enableDark();
        }
    }

    // 🔄 Toggle theme
    function toggle() {
        root.classList.contains(DARK_CLASS) ? enableLight() : enableDark();
    }

    // 🌙 Enable dark mode
    function enableDark() {
        root.classList.add(DARK_CLASS);
        localStorage.setItem(STORAGE_KEY, 'dark');
    }

    // ☀️ Enable light mode
    function enableLight() {
        root.classList.remove(DARK_CLASS);
        localStorage.setItem(STORAGE_KEY, 'light');
    }

    // 🖥️ Handle system preference change
    function handleSystemChange(e) {
        if (!localStorage.getItem(STORAGE_KEY)) {
            e.matches ? enableDark() : enableLight();
        }
    }

    // Public API
    return {
        init,
        toggle,
        enableDark,
        enableLight,
        isDark: () => root?.classList.contains(DARK_CLASS)
    };
})();

// 🎬 Auto-init when DOM ready
document.addEventListener('DOMContentLoaded', ThemeToggle.init);
// =========================================================================================================// 
// =========================================== header & footer ===========================================

const Components = (function () {
    'use strict';

    // ===============================
    // 🧭 NAVBAR HTML
    // ===============================
    const navbarHTML = `
        <header>
            <nav>
                <ul class="sidebar">
                    <li class="close-button">
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                            </svg>
                        </a>
                    </li>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="workshops.html">Workshops</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
                <ul>
                    <li>
                        <a href="index.html">
                            <img src="assets/images/logo/logo.png" alt="SCCI Logo">SCCI
                        </a>
                    </li>
                    <li class="hideOnMobile"><a href="index.html">Home</a></li>
                    <li class="hideOnMobile"><a href="workshops.html">Workshops</a></li>
                    <li class="hideOnMobile"><a href="about.html">About Us</a></li>
                    <li class="hideOnMobile"><a href="contact.html">Contact</a></li>
                    <li class="menu-button" id="menu-icon">
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    `;

    // ===============================
    // 🦶 FOOTER HTML
    // ===============================
    const footerHTML = `
        <footer>
            <div>
                <img src="assets/images/logo/logo.png" alt="SCCI Logo">
                <p id="footer-scci">SCCI</p>
            </div>
            
            <p id="scci-footer-description">SCCI Is An Abbreviation For Student's Conference For Communication And Information, Which Helps You In Bridging The Gap Between The Technical Life And The Practical Life In The Market Place. You Can Know More About Our Organization Right Here.</p>
            <div class="social-media">
                
                <a class="facebook" href="https://www.facebook.com/scci.cu"><svg fill="#" width="#" height="#" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z"/></svg></a>
                
                <a class="tiktok" href="https://www.tiktok.com/@sccicu">
                    <svg width="#" height="#" viewBox="0 0 24 24" fill="#" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.8218 5.1344C16.0887 4.29394 15.648 3.19805 15.648 2H14.7293C14.9659 3.3095 15.7454 4.43326 16.8218 5.1344Z" fill="#"/>
                    <path d="M8.3218 11.9048C6.73038 11.9048 5.43591 13.2004 5.43591 14.7931C5.43591 15.903 6.06691 16.8688 6.98556 17.3517C6.64223 16.8781 6.43808 16.2977 6.43808 15.6661C6.43808 14.0734 7.73255 12.7778 9.324 12.7778C9.62093 12.7778 9.90856 12.8288 10.1777 12.9124V9.40192C9.89927 9.36473 9.61628 9.34149 9.324 9.34149C9.27294 9.34149 9.22654 9.34614 9.1755 9.34614V12.0394C8.90176 11.9558 8.61873 11.9048 8.3218 11.9048Z" fill="#"/>
                    <path d="M19.4245 6.67608V9.34614C17.6429 9.34614 15.9912 8.77501 14.6456 7.80911V14.7977C14.6456 18.2851 11.8108 21.127 8.32172 21.127C6.97621 21.127 5.7235 20.6998 4.69812 19.98C5.8534 21.2198 7.50049 22 9.32392 22C12.8083 22 15.6478 19.1627 15.6478 15.6707V8.68211C16.9933 9.64801 18.645 10.2191 20.4267 10.2191V6.78293C20.0787 6.78293 19.7446 6.74574 19.4245 6.67608Z" fill="#"/>
                    <path d="M14.6456 14.7977V7.80911C15.9912 8.77501 17.6429 9.34614 19.4245 9.34614V6.67608C18.3945 6.45788 17.4899 5.90063 16.8218 5.1344C15.7454 4.43326 14.9704 3.3095 14.7245 2H12.2098L12.2051 15.7775C12.1495 17.3192 10.8782 18.5591 9.32393 18.5591C8.35884 18.5591 7.50977 18.0808 6.98085 17.3564C6.06219 16.8688 5.4312 15.9076 5.4312 14.7977C5.4312 13.205 6.72567 11.9094 8.31708 11.9094C8.61402 11.9094 8.90168 11.9605 9.17079 12.0441V9.35079C5.75598 9.42509 3 12.2298 3 15.6707C3 17.3331 3.64492 18.847 4.69812 19.98C5.7235 20.6998 6.97621 21.127 8.32172 21.127C11.8061 21.127 14.6456 18.2851 14.6456 14.7977Z" fill="#"/>
                    </svg>
                </a>
                <a class="instagram" href="https://www.instagram.com/scci.cu/">
                    <svg width="29" height="#" viewBox="0 0 24 24" id="meteor-icon-kit__solid-instagram" fill="#" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9962 0.0078125C8.73824 0.0078125 8.32971 0.021622 7.05019 0.080003C5.77333 0.138241 4.90129 0.341051 4.13824 0.637622C3.34938 0.944146 2.68038 1.35434 2.01343 2.02124C1.34652 2.68819 0.936333 3.35719 0.629809 4.14605C0.333238 4.9091 0.130429 5.78115 0.0721905 7.058C0.0138095 8.33753 0 8.74605 0 12.0041C0 15.262 0.0138095 15.6705 0.0721905 16.9501C0.130429 18.2269 0.333238 19.099 0.629809 19.862C0.936333 20.6509 1.34652 21.3199 2.01343 21.9868C2.68038 22.6537 3.34938 23.0639 4.13824 23.3705C4.90129 23.667 5.77333 23.8698 7.05019 23.9281C8.32971 23.9864 8.73824 24.0002 11.9962 24.0002C15.2542 24.0002 15.6627 23.9864 16.9422 23.9281C18.2191 23.8698 19.0911 23.667 19.8542 23.3705C20.643 23.0639 21.312 22.6537 21.979 21.9868C22.6459 21.3199 23.0561 20.6509 23.3627 19.862C23.6592 19.099 23.862 18.2269 23.9202 16.9501C23.9786 15.6705 23.9924 15.262 23.9924 12.0041C23.9924 8.74605 23.9786 8.33753 23.9202 7.058C23.862 5.78115 23.6592 4.9091 23.3627 4.14605C23.0561 3.35719 22.6459 2.68819 21.979 2.02124C21.312 1.35434 20.643 0.944146 19.8542 0.637622C19.0911 0.341051 18.2191 0.138241 16.9422 0.080003C15.6627 0.021622 15.2542 0.0078125 11.9962 0.0078125ZM7.99748 12.0041C7.99748 14.2125 9.78776 16.0028 11.9962 16.0028C14.2047 16.0028 15.995 14.2125 15.995 12.0041C15.995 9.79557 14.2047 8.00529 11.9962 8.00529C9.78776 8.00529 7.99748 9.79557 7.99748 12.0041ZM5.836 12.0041C5.836 8.60181 8.594 5.84381 11.9962 5.84381C15.3984 5.84381 18.1564 8.60181 18.1564 12.0041C18.1564 15.4062 15.3984 18.1642 11.9962 18.1642C8.594 18.1642 5.836 15.4062 5.836 12.0041ZM18.3998 7.03996C19.1949 7.03996 19.8394 6.39548 19.8394 5.60043C19.8394 4.80538 19.1949 4.16086 18.3998 4.16086C17.6048 4.16086 16.9603 4.80538 16.9603 5.60043C16.9603 6.39548 17.6048 7.03996 18.3998 7.03996Z" fill="#"/></svg>
                </a>
            </div>
            <hr>
            <p class="copyright">© ${new Date().getFullYear()} Copyright: SCCI IT Committee</p>
            
            
        </footer>
    `;

    // ===============================
    // 🚀 FUNCTIONS
    // ===============================

    function init() {
        injectNavbar();
        injectFooter();
        initSidebar();
        setActiveLink();
    }

    function injectNavbar() {
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    }

    function injectFooter() {
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    // 📱 Sidebar Toggle
    function initSidebar() {
        const menuButton = document.querySelector('.menu-button');
        const closeButton = document.querySelector('.close-button');
        const sidebar = document.querySelector('.sidebar');

        if (menuButton && sidebar) {
            menuButton.addEventListener('click', (e) => {
                e.preventDefault();
                sidebar.style.display = 'flex';
            });
        }

        if (closeButton && sidebar) {
            closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                sidebar.style.display = 'none';
            });
        }
    }

    // ✨ Set Active Link
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('nav a');

        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            }
        });
    }

    return { init };
})();

// 🎬 Auto-init
document.addEventListener('DOMContentLoaded', Components.init);