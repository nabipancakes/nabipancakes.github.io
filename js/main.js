// Mobile menu toggle functionality
const mobileMenuIcon = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');

if (mobileMenuIcon && navMenu) {
  mobileMenuIcon.addEventListener('click', function () {
    navMenu.classList.toggle('active');
  });
}

// Lightbox (guarded for pages that include the modal)
const modal = document.getElementById('lightbox-modal');
const modalImg = document.getElementById('lightbox-img');
const lightboxImages = document.querySelectorAll('.lightbox');

if (modal && modalImg && lightboxImages.length > 0) {
  lightboxImages.forEach((img) => {
    img.addEventListener('click', function () {
      modalImg.src = this.src;
      modal.style.display = 'flex';
    });
  });

  const closeBtn = document.querySelector('.lightbox-modal .close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  }

  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Scroll reveal animations
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Count up animation for stats
function animateCountUp(element) {
  const target = parseInt(element.getAttribute('data-target'), 10);
  if (!target || Number.isNaN(target)) return;

  const duration = 1500;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(target * ease);
    element.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCountUp(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll('[data-target]').forEach((el) => counterObserver.observe(el));

// Back to top button
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Gallery filters
const filterContainer = document.getElementById('gallery-filters');
if (filterContainer) {
  filterContainer.addEventListener('click', (e) => {
    const button = e.target.closest('button[data-filter]');
    if (!button) return;
    const filter = button.getAttribute('data-filter');
    const images = document.querySelectorAll('.gallery img');
    images.forEach((img) => {
      if (filter === 'all') {
        img.style.display = '';
      } else {
        img.style.display = img.classList.contains(filter) ? '' : 'none';
      }
    });
    // active state
    [...filterContainer.querySelectorAll('button')].forEach((b) => b.classList.remove('primary'));
    button.classList.add('primary');
  });
}

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const root = document.documentElement;
  const saved = localStorage.getItem('tbd-theme');
  if (saved) root.setAttribute('data-theme', saved);

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', current);
    localStorage.setItem('tbd-theme', current);
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-moon', current !== 'dark');
      icon.classList.toggle('fa-sun', current === 'dark');
    }
  });
}
