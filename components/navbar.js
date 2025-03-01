// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.mobile-menu-button') && 
                !event.target.closest('.nav-links')) {
                mobileMenuButton.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Set active link based on current page
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        // Remove any existing active classes first
        link.classList.remove('active');
        
        const linkPath = link.getAttribute('href');
        const currentPageName = currentPath.split('/').pop();
        const linkPageName = linkPath.split('/').pop();
        
        if (currentPageName === linkPageName) {
            link.classList.add('active');
        }
    });

    // Initialize mobile menu
    initializeMobileMenu();
});

// Export the initialization functions for use after dynamic loading
window.initializeNavbar = function() {
    initializeMobileMenu();
} 