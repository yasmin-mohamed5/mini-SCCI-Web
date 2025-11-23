

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
                    <li class="hideOnMobile"><a href="contact.html">Contact</a></li>
                    <li class="hideOnMobile"><a href="about.html">About Us</a></li>
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
            <hr>
            <p><br>© ${new Date().getFullYear()} Copyright: SCCI IT Committee</p>
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