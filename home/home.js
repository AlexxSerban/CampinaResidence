document.addEventListener('DOMContentLoaded', function() {
    // Inițializare EmailJS
    emailjs.init("G4jMGHU0Iqn6vLlUA");

    // Inițializare AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Disable submit button and show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Se trimite...';

            const userName = document.getElementById('name').value;
            const userEmail = document.getElementById('email').value;
            const userPhone = document.getElementById('phone').value;
            const userSubject = document.getElementById('subject').value;
            const userMessage = document.getElementById('message').value;

            // Get form data - folosim exact variabilele din template
            const formData = {
                nume_prenume: userName,
                email: userEmail,
                telefon: userPhone,
                subiect: userSubject,
                mesaj: userMessage,
                to_email: 'campinaresidence2025@gmail.com'
            };

            // Log form values for debugging
            console.log('Form Values:', {
                name: userName,
                email: userEmail,
                phone: userPhone,
                subject: userSubject,
                message: userMessage
            });

            // Log the formData being sent
            console.log('EmailJS Data:', formData);

            // Send email using EmailJS
            emailjs.send('service_qlh7nbc', 'template_ht1l0h5', formData)
                .then(function(response) {
                    // Log success response
                    console.log('EmailJS Success:', response);
                    // Show success message
                    alert('Mesajul a fost trimis cu succes! Vă vom contacta în curând.');
                    contactForm.reset();
                })
                .catch(function(error) {
                    // Log error details
                    console.error('EmailJS Error:', error);
                    // Show error message
                    alert('A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou.');
                })
                .finally(function() {
                    // Re-enable submit button
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                });
        });
    }

    // Google Maps Initialization
    window.initMap = function() {
        // Coordinates for "Bulevardul Nicolae Bălcescu 41, Câmpina"
        const location = { lat: 45.124769, lng: 25.735605 };

        const map = new google.maps.Map(document.getElementById("googleMap"), {
            zoom: 15,
            center: location,
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                },
            ],
        });

        // Add marker
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: "Campina Residence",
        });
    };

    // Process Cards Animation
    const processSection = document.querySelector('.process');
    const processCards = document.querySelectorAll('.process-card');
    let currentCardIndex = 0;
    let isAnimating = false;

    // Inițializare - primul card activ
    if (processCards.length > 0) {
        processCards[0].classList.add('active');
    }

    function updateCards(scrollPosition) {
        if (!processSection) return;

        const sectionTop = processSection.offsetTop;
        const sectionHeight = processSection.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // Calculăm procentul de scroll în secțiune (0 la 1)
        const scrollPercentage = Math.max(0, Math.min(1, (scrollPosition - sectionTop) / (sectionHeight - viewportHeight)));
        
        // Calculăm care card ar trebui să fie activ (0-4)
        const targetIndex = Math.min(Math.floor(scrollPercentage * 5), 4);

        if (targetIndex !== currentCardIndex && !isAnimating) {
            isAnimating = true;

            // Eliminăm clasa active de pe cardul curent
            if (processCards[currentCardIndex]) {
                processCards[currentCardIndex].classList.remove('active');
                processCards[currentCardIndex].classList.add('exit');
            }

            // Adăugăm clasa active pe noul card
            if (processCards[targetIndex]) {
                processCards[targetIndex].classList.remove('exit');
                processCards[targetIndex].classList.add('active');
            }

            currentCardIndex = targetIndex;

            // Resetăm flag-ul de animație după tranziție
            setTimeout(() => {
                isAnimating = false;
            }, 600);
        }
    }

    // Actualizăm cardurile la scroll
    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            updateCards(window.pageYOffset);
        });
    });

    // Actualizare inițială
    updateCards(window.pageYOffset);

    // Hero Parallax Effect
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        if (!hero || !heroContent) return;
        
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        // Aplicăm efectul de parallax doar pe fundal, nu și pe conținut
        hero.style.backgroundPosition = `center ${-rate * 0.15}px`;
    });

    // Testimonials Slider
    const slider = document.querySelector('.testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    let currentSlide = 0;

    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
            slide.setAttribute('aria-hidden', index !== currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
    }

    // Auto advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // FAQ Accordion functionality
    function initializeFAQItems() {
        console.log('Initializing FAQ functionality...');
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length > 0) {
            console.log(`Found ${faqItems.length} FAQ items`);
            faqItems.forEach((item, index) => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                
                if (question && answer) {
                    console.log(`Adding click handler to FAQ item #${index + 1}`);
                    
                    // Eliminăm eventualele handlere existente pentru a evita duplicarea
                    const newQuestion = question.cloneNode(true);
                    question.parentNode.replaceChild(newQuestion, question);
                    
                    // Adăugăm noul event listener
                    newQuestion.addEventListener('click', function(event) {
                        console.log(`FAQ question #${index + 1} clicked`);
                        event.preventDefault();
                        
                        // Verificăm dacă acest element este deja activ
                        const isActive = item.classList.contains('active');
                        console.log(`Is currently active: ${isActive}`);
                        
                        // Închidem toate răspunsurile
                        faqItems.forEach(faqItem => {
                            faqItem.classList.remove('active');
                        });
                        
                        // Dacă elementul nu era activ, îl activăm
                        if (!isActive) {
                            item.classList.add('active');
                            console.log(`Activated FAQ item #${index + 1}`);
                        }
                    });
                } else {
                    console.warn(`FAQ item #${index + 1} missing question or answer elements`);
                }
            });
        } else {
            console.warn('No FAQ items found on page');
        }
    }
    
    // Asigurăm inițializarea FAQ după încărcarea completă a DOM-ului
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM fully loaded, initializing FAQ items');
        initializeFAQItems();
    });
    
    // Initialize first slide
    updateSlider();
    
    // Dacă DOM-ul este deja încărcat, inițializăm imediat
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        console.log('Document already loaded, initializing FAQ items immediately');
        setTimeout(initializeFAQItems, 100);
    } else {
        window.addEventListener('load', function() {
            console.log('Window loaded, checking FAQ functionality again...');
            setTimeout(initializeFAQItems, 1000);
        });
    }

    // Mobile menu functionality
    // Get the mobile menu button and nav links
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle mobile menu when button is clicked
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a link is clicked
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileMenuButton.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.mobile-menu-button') && 
            navLinks.classList.contains('active')) {
            mobileMenuButton.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Adjust header height on mobile devices
    function adjustHeaderHeight() {
        const header = document.querySelector('.main-header');
        if (header && window.innerWidth <= 768) {
            const viewportHeight = window.innerHeight;
            header.style.height = `${viewportHeight}px`;
        }
    }
    
    // Run on load and resize
    adjustHeaderHeight();
    window.addEventListener('resize', adjustHeaderHeight);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Improve responsiveness of achievement counters
    function checkAchievementVisibility() {
        const achievementsSection = document.querySelector('.achievements-grid');
        if (achievementsSection) {
            const rect = achievementsSection.getBoundingClientRect();
            const isVisible = (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
            
            if (isVisible && !window.hasAnimatedCounters) {
                window.hasAnimatedCounters = true;
                const counters = document.querySelectorAll('.achievement-number');
                
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const suffix = counter.getAttribute('data-suffix') || '';
                    let current = 0;
                    
                    counter.textContent = '0' + suffix;
                    
                    const increment = target / 50;
                    const duration = 2000;
                    const stepTime = duration / 50;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target + suffix;
                        } else {
                            counter.textContent = Math.floor(current) + suffix;
                            setTimeout(updateCounter, stepTime);
                        }
                    };
                    
                    updateCounter();
                });
            }
        }
    }
    
    // Check on scroll and initial load
    window.addEventListener('scroll', checkAchievementVisibility);
    setTimeout(checkAchievementVisibility, 500);
}); 