// Counter Animation Script
console.log("Counter script loaded");

// Function to animate counters
function animateCounters() {
    console.log("Starting counter animation");
    const counters = document.querySelectorAll(".achievement-number");
    
    counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        const suffix = counter.getAttribute("data-suffix") || "";
        let current = 0;
        
        // Calculate increment and timing for smooth animation
        const duration = 2000; // Animation duration in milliseconds
        const steps = 50; // Number of steps in the animation
        const increment = target / steps;
        const stepTime = duration / steps;
        
        // Reset counter to 0 before starting animation
        counter.textContent = "0" + suffix;
        
        const updateCounter = () => {
            current += increment;
            if (current >= target) {
                // Ensure we end exactly at the target value
                counter.textContent = target + suffix;
            } else {
                counter.textContent = Math.floor(current) + suffix;
                setTimeout(updateCounter, stepTime);
            }
        };
        
        updateCounter();
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Handle scroll event to trigger counter animation
let hasAnimated = false;
function handleScroll() {
    const achievementsSection = document.querySelector(".achievements-grid");
    if (!achievementsSection || hasAnimated) return;
    
    if (isInViewport(achievementsSection)) {
        console.log("Achievements section is in viewport");
        animateCounters();
        hasAnimated = true;
        // Remove scroll listener after animation is triggered
        window.removeEventListener('scroll', handleScroll);
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Check on initial load in case section is already visible
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - checking if achievements section is visible");
    // Wait a short time to ensure DOM is fully processed
    setTimeout(handleScroll, 500);
});

// Force check when window is resized
window.addEventListener('resize', function() {
    if (!hasAnimated) {
        handleScroll();
    }
});

// Manually trigger animation if needed (for testing)
window.triggerCounterAnimation = function() {
    if (!hasAnimated) {
        console.log("Manually triggering counter animation");
        animateCounters();
        hasAnimated = true;
    }
}; 