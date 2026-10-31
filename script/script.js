// 1. Απενεργοποίηση του Scroll Restoration ΆΜΕΣΑ (πριν καν φορτώσει το DOM)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Εξαναγκασμός κύλισης στην κορυφή αμέσως
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {

    // --- Α. SCROLL RESTORATION & TOP RESET SAFETY ---
    window.scrollTo(0, 0);
    window.addEventListener('beforeunload', () => {
        window.scrollTo(0, 0);
    });

    // --- Β. INTERSECTION OBSERVER (Fade-In) ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

    // --- Γ. HAMBURGER MOBILE MENU ---
    const hamburger = document.querySelector('.hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const closeMenu = () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', (event) => {
            const isMenuOpen = navMenu.classList.contains('active');
            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedHamburger = hamburger.contains(event.target);

            if (isMenuOpen && !clickedInsideMenu && !clickedHamburger) {
                closeMenu();
            }
        });
    }

    // --- Δ. FOOTER YEAR & LAST UPDATED ---
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    const lastUpdatedEl = document.getElementById('last-updated');
    if (lastUpdatedEl) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const monthIndex = currentDate.getMonth();
        const language = document.documentElement.lang || 'en';

        const months = {
            el: [
                'Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος',
                'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'
            ],
            en: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ]
        };

        const monthName = language === 'el' ? months.el[monthIndex] : months.en[monthIndex];
        lastUpdatedEl.textContent = `${monthName} ${year}`;
    }

    // --- Ε. LOGO LINK BEHAVIOR ---
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            const isRoot = window.location.pathname.endsWith('index.html') && window.location.pathname.split('/').length <= 2;
            
            if (isRoot) {
                e.preventDefault();
                e.stopImmediatePropagation();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                if (window.location.hash) {
                    history.pushState("", document.title, window.location.pathname + window.location.search);
                }
            }
        });
    }

    // --- ΣΤ. MAGIC EMBERS / ASH PARTICLES GENERATOR ---
    const container = document.getElementById("particles-container");
    
    if (container) {
        const updateContainerHeight = () => {
            container.style.height = `${Math.max(
                document.body.scrollHeight, 
                document.documentElement.scrollHeight
            )}px`;
        };

        updateContainerHeight();
        window.addEventListener('resize', updateContainerHeight);

        const particleCount = 100;

        for (let i = 0; i < particleCount; i++) {
            createParticle(container);
        }

        function createParticle(parent) {
            const particle = document.createElement("div");
            particle.classList.add("particle");

            const size = Math.random() * 4 + 2; // 2px έως 6px
            const leftPos = Math.random() * 100;
            
            const totalHeight = Math.max(
                document.body.scrollHeight, 
                document.documentElement.scrollHeight
            );
            const topPos = Math.random() * totalHeight;

            const animDuration = Math.random() * 8 + 4;
            const animDelay = Math.random() * 5;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${leftPos}%`;
            particle.style.top = `${topPos}px`;
            particle.style.animationDuration = `${animDuration}s`;
            particle.style.animationDelay = `${animDelay}s`;

            parent.appendChild(particle);
        }
    }

});
