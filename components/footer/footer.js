// Footer Component JavaScript - Simplified Version
document.addEventListener('DOMContentLoaded', function() {
    // Check if navbar placeholder exists and load the navbar if needed
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder && navbarPlaceholder.innerHTML.trim() === '') {
        // Load navbar if it's not already loaded
        fetch('/components/navbar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load navbar: ' + response.status);
                }
                return response.text();
            })
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                // Initialize navbar after loading
                if (typeof initializeNavbar === 'function') {
                    initializeNavbar();
                }
            })
            .catch(error => {
                console.error('Error loading navbar:', error);
            });
    }

    // Check if footer placeholder exists and load the footer
    if (document.getElementById('footer-placeholder')) {
        loadFooter();
    } else {
        // If no placeholder, just initialize the footer functionality
        initFooter();
    }
});

function initFooter() {
    // Update copyright year dynamically
    updateCopyrightYear();
    
    // Add hover effects for social links
    initSocialLinks();
    
    // Highlight active page in footer navigation
    highlightActivePage();
}

function updateCopyrightYear() {
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        const copyrightText = copyrightElement.textContent;
        copyrightElement.textContent = copyrightText.replace(/\d{4}/, currentYear);
    }
}

function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        // Eliminăm efectul de hover care era gestionat prin JavaScript
        // deoarece acum este gestionat prin CSS
        
        // Add click tracking (optional)
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('aria-label') || 'social';
            console.log(`Social link clicked: ${platform}`);
            // Here you could add analytics tracking if needed
        });
    });
}

// Highlight active page in footer navigation
function highlightActivePage() {
    const currentPath = window.location.pathname;
    const footerLinks = document.querySelectorAll('.footer-nav-link');
    
    footerLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if current path includes the link path or matches exactly
        if (currentPath.includes(linkPath) || 
            (currentPath.endsWith('/') && linkPath.includes(currentPath.slice(0, -1))) ||
            (linkPath.includes('/home/') && (currentPath === '/' || currentPath.endsWith('index.html')))) {
            
            link.classList.add('active');
        }
    });
}

// Ensure footer is visible
function ensureFooterVisibility() {
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.style.display = 'block';
    }
    
    const footerContent = document.querySelector('.footer-content');
    if (footerContent) {
        footerContent.style.display = 'flex';
    }
    
    const footerColumns = document.querySelector('.footer-columns');
    if (footerColumns) {
        footerColumns.style.display = 'flex';
    }
}

// Initialize footer if DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    if (document.getElementById('footer-placeholder')) {
        loadFooter();
    } else {
        initFooter();
    }
}

// Load footer content
function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        // Folosim căi absolute pentru a asigura că imaginile se încarcă corect în toate paginile
        
        // Try direct injection first (more reliable)
        const footerHTML = `
        <footer class="footer">
            <div class="footer-content container">
                <div class="footer-columns">
                    <!-- Coloana stângă: Logo, text și social media -->
                    <div class="footer-column footer-branding">
                        <img src="/images/logo.jpg" alt="Câmpina Residence Logo" class="footer-logo">
                        <p class="footer-text">Descoperă un nou standard în confort și eleganță, unde fiecare detaliu este atent selecționat pentru a-ți oferi experiența locuirii perfecte.</p>
                        
                        <div class="social-links">
                            <a href="https://www.facebook.com/p/C%C3%A2mpina-Residence-61552922501380/" class="social-link" aria-label="Facebook">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/campinaresidence/" class="social-link" aria-label="Instagram">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.059 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="https://www.tiktok.com/@campinaresidence" class="social-link" aria-label="TikTok">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Coloana dreaptă: Navigare și Legal -->
                    <div class="footer-column footer-nav-combined">
                        <div class="footer-nav footer-nav-horizontal">
                            <a href="/home/home.html" class="footer-nav-link">Acasă</a>
                            <a href="/apartments/apartments.html" class="footer-nav-link">Apartamente</a>
                            <a href="/finishes/finishes.html" class="footer-nav-link">Finisaje</a>
                            <a href="/interior-design/interior-design.html" class="footer-nav-link">Design Interior</a>
                            <a href="/project.html" class="footer-nav-link">Proiect</a>
                            <a href="/contact/contact.html" class="footer-nav-link">Contact</a>
                        </div>
                        
                        <div class="footer-legal-section">
                            <div class="footer-nav footer-legal-links">
                                <a href="/cookies.html" class="footer-nav-link">Cookies</a>
                                <a href="/privacy.html" class="footer-nav-link">Confidențialitate</a>
                            </div>
                            
                            <div class="footer-legal-images">
                                <a href="https://reclamatiisal.anpc.ro/" class="footer-legal-image-link" target="_blank" rel="noopener noreferrer">
                                    <img src="/images/solutionarea alternativa.png" alt="Soluționarea Alternativă" class="footer-legal-image">
                                </a>
                                <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO" class="footer-legal-image-link" target="_blank" rel="noopener noreferrer">
                                    <img src="/images/solutionarea online.png" alt="Soluționarea Online" class="footer-legal-image">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Copyright la baza footer-ului -->
                <div class="footer-bottom">
                    <p class="copyright">© 2025 CAMPINA RESIDENCE. Toate drepturile rezervate. Toate materialele publicate in acest site sunt cu titlu informativ si sunt supuse modificarilor fara notificari prealabile si nu reprezinta o oferta comerciala concreta.</p>
                </div>
            </div>
        </footer>
        `;
        
        // Insert the footer HTML directly
        footerPlaceholder.innerHTML = footerHTML;
        console.log('Footer injected directly');
        
        // Initialize the footer functionality
        setTimeout(function() {
            initFooter();
            ensureFooterVisibility();
            console.log('Footer initialized after direct injection');
        }, 100);
    }
}

// Exportăm funcțiile pentru a putea fi folosite în alte scripturi
window.loadFooter = loadFooter; 