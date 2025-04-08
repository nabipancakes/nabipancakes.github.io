// main.js

// Get the modal
const modal = document.getElementById('lightbox-modal');
const modalImg = document.getElementById('lightbox-img');

// Get all images with class 'lightbox'
const lightboxLinks = document.querySelectorAll('.lightbox');

// Add event listeners to open modal
lightboxLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default link behavior
        const imgSrc = link.getAttribute('href');
        modalImg.src = imgSrc;
        modal.style.display = "flex"; // Show the modal
    });
});

// Close the modal
const closeModal = document.querySelector('.close');
closeModal.addEventListener('click', function() {
    modal.style.display = "none"; // Hide the modal
});

// Close modal when clicking outside the image
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = "none"; // Hide the modal
    }
});
