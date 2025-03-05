// Gallery filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const photoItems = document.querySelectorAll('.photo-item');

    // Function to remove diacritics
    function removeDiacritics(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    // Function to show/hide items
    function toggleItemVisibility(item, show) {
        if (show) {
            item.style.display = 'block';
            item.style.opacity = '1';
            item.style.visibility = 'visible';
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
            item.style.visibility = 'hidden';
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = removeDiacritics(button.textContent.toLowerCase());
            
            photoItems.forEach(item => {
                if (category === 'toate') {
                    toggleItemVisibility(item, true);
                } else {
                    // Map Romanian categories to English data-category values
                    let dataCategory = '';
                    switch(category) {
                        case 'cladire': dataCategory = 'building'; break;
                        case 'living': dataCategory = 'living'; break;
                        case 'dormitor': dataCategory = 'bedroom'; break;
                        case 'baie': dataCategory = 'bathroom'; break;
                        case 'intrare': dataCategory = 'entrance'; break;
                        default: dataCategory = category;
                    }
                    
                    toggleItemVisibility(item, item.dataset.category === dataCategory);
                }
            });
        });
    });

    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    let currentImageIndex = 0;
    const images = Array.from(document.querySelectorAll('.photo-item img'));

    // Open lightbox
    photoItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Navigate through images
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
    });

    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxPrev.click();
        if (e.key === 'ArrowRight') lightboxNext.click();
    });
}); 