// Finishes specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any finishes-specific functionality
    
    // Example: Image gallery functionality
    const galleryImages = document.querySelectorAll('.finish-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            // Open image in lightbox
        });
    });

    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Open first accordion item by default
    if (accordionItems.length > 0) {
        accordionItems[0].classList.add('active');
    }

    // Close accordion when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.accordion-item')) {
            accordionItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Bento card expansion functionality
    const bentoCards = document.querySelectorAll('.bento-card');

    bentoCards.forEach(card => {
        card.addEventListener('click', function(event) {
            // Prevent event bubbling
            event.stopPropagation();
            
            const isCurrentlyExpanded = this.classList.contains('expanded');
            
            // First, close all cards
            bentoCards.forEach(c => {
                c.classList.remove('expanded');
            });
            
            // Then, if the clicked card wasn't expanded, expand it
            if (!isCurrentlyExpanded) {
                this.classList.add('expanded');
            }
        });
    });

    // Close expanded card when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.bento-card')) {
            bentoCards.forEach(card => {
                card.classList.remove('expanded');
            });
        }
    });

    // Before/After Image Slider
    const sliders = document.querySelectorAll('.before-after-slider');
    
    sliders.forEach(slider => {
        const before = slider.querySelector('.before-image');
        const after = slider.querySelector('.after-image');
        const handle = slider.querySelector('.slider-handle');
        let isResizing = false;

        // Handle mouse events
        handle.addEventListener('mousedown', startSliding);
        document.addEventListener('mousemove', slide);
        document.addEventListener('mouseup', stopSliding);

        // Handle touch events
        handle.addEventListener('touchstart', startSliding);
        document.addEventListener('touchmove', slide);
        document.addEventListener('touchend', stopSliding);

        function startSliding(e) {
            isResizing = true;
            slider.classList.add('active');
        }

        function stopSliding(e) {
            isResizing = false;
            slider.classList.remove('active');
        }

        function slide(e) {
            if (!isResizing) return;

            let x;
            if (e.type === 'mousemove') {
                x = e.pageX;
            } else if (e.type === 'touchmove') {
                x = e.touches[0].pageX;
            }

            x -= slider.getBoundingClientRect().left;
            let position = (x / slider.offsetWidth) * 100;
            
            if (position > 100) position = 100;
            if (position < 0) position = 0;

            handle.style.left = position + '%';
            after.style.width = position + '%';
        }
    });

    // Specifications Animation
    const specs = document.querySelectorAll('.specification');
    
    const specObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate the progress bar if it exists
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const targetWidth = progressBar.dataset.progress + '%';
                    progressBar.style.width = targetWidth;
                }
                
                specObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    specs.forEach(spec => {
        specObserver.observe(spec);
    });
}); 