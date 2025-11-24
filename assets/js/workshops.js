const elements = document.querySelectorAll('.highlight-text-auto');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0 });

elements.forEach(el => observer.observe(el));