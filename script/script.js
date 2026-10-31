document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer για Fade-In εφέ στο scroll
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  // Helper συνάρτηση για το κλείσιμο του μενού
  const closeMenu = () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  };

  // Toggle mobile menu
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // Κλείσιμο του μενού όταν ο χρήστης πατάει σε κάποιο link
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Κλείσιμο του μενού όταν ο χρήστης κάνει κλικ εκτός μενού
    document.addEventListener('click', (event) => {
      const isMenuOpen = navMenu.classList.contains('active');
      const clickedInsideMenu = navMenu.contains(event.target);
      const clickedHamburger = hamburger.contains(event.target);

      if (isMenuOpen && !clickedInsideMenu && !clickedHamburger) {
        closeMenu();
      }
    });
  }
});

// Ενημέρωση έτους στο footer
if (document.getElementById('current-year')) {
  document.getElementById('current-year').textContent = new Date().getFullYear();
}

if (document.getElementById('last-updated')) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();
  const language = document.documentElement.lang;

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

  const monthName = language === 'el'
    ? months.el[monthIndex]
    : months.en[monthIndex];

  document.getElementById('last-updated').textContent = `${monthName} ${year}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const logoLink = document.getElementById('logo-link');

  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      // Αν ΔΕΝ είμαστε στη ρίζα (δηλαδή είμαστε σε υποφάκελο), 
      // αφήνουμε το link να λειτουργήσει κανονικά!
      const isRoot = window.location.pathname.endsWith('index.html') && window.location.pathname.split('/').length <= 2;
      
      if (isRoot) {
        e.preventDefault();
        e.stopImmediatePropagation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        if (window.location.hash) {
          history.pushState("", document.title, window.location.pathname + window.location.search);
        }
      }
      // Αν είμαστε σε υποφάκελο, δεν κάνουμε τίποτα: ο browser ακολουθεί το href="../index.html" κανονικά!
    });
  }
});

// ==========================================
// MAGIC EMBERS / ASH PARTICLES GENERATOR
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("particles-container");
  
  if (!container) return;

  // Ορισμός ύψους container με βάση το συνολικό περιεχόμενο της σελίδας
  function updateContainerHeight() {
    container.style.height = `${Math.max(
      document.body.scrollHeight, 
      document.documentElement.scrollHeight
    )}px`;
  }

  updateContainerHeight();
  window.addEventListener('resize', updateContainerHeight);

  const particleCount = 100; // Αριθμός σωματιδίων

  for (let i = 0; i < particleCount; i++) {
    createParticle(container);
  }

  function createParticle(parent) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 4 + 2; // από 2px έως 6px
    const leftPos = Math.random() * 100; // ποσοστό επί τοις % στο πλάτος
    
    // Τυχαία κάθετη θέση σε όλο το ύψος της σελίδας
    const totalHeight = Math.max(
      document.body.scrollHeight, 
      document.documentElement.scrollHeight
    );
    const topPos = Math.random() * totalHeight;

    const animDuration = Math.random() * 8 + 4; // διάρκεια animation
    const animDelay = Math.random() * 5;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${leftPos}%`;
    particle.style.top = `${topPos}px`;
    particle.style.animationDuration = `${animDuration}s`;
    particle.style.animationDelay = `${animDelay}s`;

    parent.appendChild(particle);
  }
});