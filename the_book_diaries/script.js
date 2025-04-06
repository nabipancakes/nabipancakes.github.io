// Toggle mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove('active');
  }
});

// Scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  { threshold: 0.1 }
);

// Observe elements with .fade-in class
document.querySelectorAll('.fade-in').forEach((element) => {
  observer.observe(element);
});

// Form validation
const forms = document.querySelectorAll('form');
forms.forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form fields
    const formFields = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    // Simple validation
    formFields.forEach((field) => {
      if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        field.classList.add('error');
      } else {
        field.classList.remove('error');
      }
    });
    
    if (isValid) {
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.classList.add('success-message');
      successMessage.textContent = 'Form submitted successfully! We will get back to you soon.';
      
      form.appendChild(successMessage);
      
      // Reset form
      form.reset();
      
      // Remove success message after 3 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    }
  });
});