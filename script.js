document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add this to your JavaScript file
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            faqItem.classList.toggle('active');
        });
    });

    // Form submission handling
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Vă mulțumim pentru interes! Vă vom contacta în curând.');
        form.reset();
    });

    // Navigation background change on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Initialize the map
    initMap();

    // Scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Animate elements with .scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach(element => {
        scrollObserver.observe(element);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrolled * 0.003);
        }
    });

    // Smooth reveal for sections
    const revealSections = document.querySelectorAll('section');
    revealSections.forEach(section => {
        section.classList.add('reveal-section');
        scrollObserver.observe(section);
    });

    const tabButtons = document.querySelectorAll('.tab-button');
    const apartmentGrids = document.querySelectorAll('.apartments-grid');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Hide all apartment grids
            apartmentGrids.forEach(grid => grid.classList.add('hidden'));
            // Show selected grid
            const buildingId = button.dataset.building;
            document.getElementById(`${buildingId}-apartments`).classList.remove('hidden');
        });
    });

    // Testimonials Slider
    const slider = document.querySelector('.testimonials-slider');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function updateSlider() {
        const offset = currentIndex * -100;
        slider.style.transform = `translateX(${offset}%)`;
        slider.style.transition = 'transform 0.5s ease';
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 2) {
            currentIndex++;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Initialize slider
    updateSlider();
});

// Initialize the map (using a placeholder for demonstration)
function initMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Placeholder for map initialization
        mapElement.innerHTML = '<p style="text-align: center; padding-top: 180px;">Map Placeholder</p>';
    }
}

function findDifferentDigit(oldStr, newStr) {
    for (let i = 0; i < oldStr.length; i++) {
        if (oldStr[i] !== newStr[i]) return i;
    }
    return -1;
}

function animateValue(element, oldValue, newValue) {
    const oldStr = oldValue.toString();
    const newStr = newValue.toString();
    const diffIndex = findDifferentDigit(oldStr, newStr);
    
    if (diffIndex === -1) return;

    // Split the number into spans for each digit and comma
    element.innerHTML = oldStr.split('').map((char, index) => {
        const className = index === diffIndex ? 'old-digit' : '';
        return `<span class="${className}${char === ',' ? ' comma' : ''}">${char}</span>`;
    }).join('');

    // Calculate the exact position for the new digit
    const digitElement = element.children[diffIndex];
    const rect = digitElement.getBoundingClientRect();
    const parentRect = element.getBoundingClientRect();
    const leftOffset = rect.left - parentRect.left;

    // Insert the new digit at the exact position
    const newDigit = document.createElement('span');
    newDigit.className = 'new-value';
    newDigit.style.left = `${leftOffset}px`;
    newDigit.textContent = newStr[diffIndex];
    element.appendChild(newDigit);

    // Update the content after animation
    setTimeout(() => {
        element.innerHTML = newStr.split('').map(char => 
            `<span class="${char === ',' ? 'comma' : ''}">${char}</span>`
        ).join('');
    }, 500);
}

// Increment functions
function incrementViews() {
    const viewsElement = document.getElementById('viewCount');
    const currentViews = parseInt(viewsElement.textContent.replace(/,/g, ''));
    const newViews = currentViews + 1;
    animateValue(viewsElement, currentViews, newViews);
}

function incrementLikes() {
    const likesElement = document.getElementById('likeCount');
    const currentLikes = parseInt(likesElement.textContent.replace(/,/g, ''));
    const newLikes = currentLikes + 1;
    animateValue(likesElement, currentLikes, newLikes);
}

function incrementComments() {
    const commentsElement = document.getElementById('commentCount');
    const currentComments = parseInt(commentsElement.textContent.replace(/,/g, ''));
    const newComments = currentComments + 1;
    animateValue(commentsElement, currentComments, newComments);
}

// Set up intervals for automatic increments
setInterval(incrementViews, 5000);  // Increment views every 5 seconds
setInterval(incrementLikes, 8000);  // Increment likes every 8 seconds
setInterval(incrementComments, 12000);  // Increment comments every 12 seconds
