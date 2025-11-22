

const ThemeToggle = (function () {
    'use strict';

    const STORAGE_KEY = 'theme';
    const DARK_CLASS = 'dark-mode';

    let root = null;

    // 🎨 HTML الزرار
    const buttonHTML = `
        <button class="theme-toggle" id="themeToggle" aria-label="تغيير الثيم">
            <svg class="icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
            <svg class="icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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