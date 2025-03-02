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

// Function to process links with the site configuration
function processLinks() {
    // Process all links with data-href attributes
    document.querySelectorAll('a[data-href]').forEach(link => {
        const path = link.getAttribute('data-href');
        // Use the site configuration to get the correct URL
        if (window.siteConfig) {
            link.href = window.siteConfig.getUrl(path);
        } else {
            console.warn('Site configuration not loaded. Using fallback path.');
            link.href = path;
        }
    });

    // Process all images with data-src attributes
    document.querySelectorAll('img[data-src]').forEach(img => {
        const path = img.getAttribute('data-src');
        // Use the site configuration to get the correct URL
        if (window.siteConfig) {
            img.src = window.siteConfig.getUrl(path);
        } else {
            console.warn('Site configuration not loaded. Using fallback path.');
            img.src = path;
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Process links with the site configuration
    processLinks();
    
    // Set active link based on current page
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        // Remove any existing active classes first
        link.classList.remove('active');
        
        // Get the original path from data-href
        const linkPath = link.getAttribute('data-href');
        
        // Check if the current path contains the link path
        // This handles both exact matches and subdirectory matches
        if (currentPath.endsWith(linkPath) || 
            (linkPath !== '/home/home.html' && currentPath.includes(linkPath.split('/').slice(0, -1).join('/'))) ||
            (linkPath === '/home/home.html' && (currentPath === '/' || currentPath.endsWith('index.html')))) {
            link.classList.add('active');
        }
    });

    // Initialize mobile menu
    initializeMobileMenu();
    
    console.log('Navbar initialized on page load');
});

// Export the initialization functions for use after dynamic loading
window.initializeNavbar = function() {
    // Process links with the site configuration
    processLinks();
    
    // Set active link based on current page
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        // Remove any existing active classes first
        link.classList.remove('active');
        
        // Get the original path from data-href
        const linkPath = link.getAttribute('data-href');
        
        // Check if the current path contains the link path
        // This handles both exact matches and subdirectory matches
        if (currentPath.endsWith(linkPath) || 
            (linkPath !== '/home/home.html' && currentPath.includes(linkPath.split('/').slice(0, -1).join('/'))) ||
            (linkPath === '/home/home.html' && (currentPath === '/' || currentPath.endsWith('index.html')))) {
            link.classList.add('active');
        }
    });
    
    initializeMobileMenu();
    console.log('Navbar initialized after dynamic loading');
} 