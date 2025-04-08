// Mobile menu toggle functionality
const mobileMenuIcon = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');

// Toggle mobile menu visibility
mobileMenuIcon.addEventListener('click', function () {
    navMenu.classList.toggle('active');  // Toggle 'active' class to show/hide menu
});

// Get the modal elements for lightbox (already in your current code)
const modal = document.getElementById('lightbox-modal');
const modalImg = document.getElementById('lightbox-img');

// Get all images with the lightbox class
const lightboxImages = document.querySelectorAll('.lightbox');

// Open modal on image click
lightboxImages.forEach(img => {
    img.addEventListener('click', function () {
        modalImg.src = this.src;
        modal.style.display = "flex";
    });
});

// Close modal on close button click
document.querySelector('.close').addEventListener('click', function () {
    modal.style.display = "none";
});

// Close modal when clicking outside the image
modal.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
