// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-icon');

    mobileMenuButton.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu-button') && !event.target.closest('.nav-links')) {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('active');
        }
    });
});

// Funcții pentru formatarea numerelor
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Funcții pentru animarea valorilor statisticilor
function findDifferentDigit(oldStr, newStr) {
    for (let i = 0; i < oldStr.length; i++) {
        if (oldStr[i] !== newStr[i]) return i;
    }
    return -1;
}

function animateValue(element, oldValue, newValue, isIncrement = true) {
    const oldStr = formatNumber(oldValue);
    const newStr = formatNumber(newValue);
    const diffIndex = findDifferentDigit(oldStr, newStr);
    
    if (diffIndex === -1) return;

    // Adăugăm clasa pentru direcția animației
    const direction = isIncrement ? 'increment' : 'decrement';
    
    element.innerHTML = oldStr.split('').map((char, index) => {
        const className = index === diffIndex ? `old-digit ${direction}` : '';
        return `<span class="${className}${char === ',' ? ' comma' : ''}">${char}</span>`;
    }).join('');

    const digitElement = element.children[diffIndex];
    const rect = digitElement.getBoundingClientRect();
    const parentRect = element.getBoundingClientRect();
    const leftOffset = rect.left - parentRect.left;

    const newDigit = document.createElement('span');
    newDigit.className = `new-value ${direction}`;
    newDigit.style.left = `${leftOffset}px`;
    newDigit.textContent = newStr[diffIndex];
    element.appendChild(newDigit);

    // Adăugăm efectul de highlight
    element.classList.add('highlight');
    
    setTimeout(() => {
        element.innerHTML = newStr.split('').map(char => 
            `<span class="${char === ',' ? 'comma' : ''}">${char}</span>`
        ).join('');
        element.classList.remove('highlight');
    }, 500);
}

// Funcții pentru incrementarea și decrementarea statisticilor
function updateStats(elementId, isIncrement = true) {
    const element = document.getElementById(elementId);
    const currentValue = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const newValue = isIncrement ? currentValue + 1 : Math.max(0, currentValue - 1);
    animateValue(element, currentValue, newValue, isIncrement);
}

function incrementViews() {
    updateStats('viewCount', true);
}

function decrementViews() {
    updateStats('viewCount', false);
}

function incrementLikes() {
    updateStats('likeCount', true);
}

function decrementLikes() {
    updateStats('likeCount', false);
}

function incrementComments() {
    updateStats('commentCount', true);
}

function decrementComments() {
    updateStats('commentCount', false);
}

// Inițializare intervale pentru incrementare automată
let autoIncrement = true;

function toggleAutoIncrement() {
    autoIncrement = !autoIncrement;
    if (autoIncrement) {
        startAutoIncrement();
    } else {
        stopAutoIncrement();
    }
}

let intervals = [];

function startAutoIncrement() {
    intervals.push(setInterval(incrementViews, 3000));    // Increment views every 3 seconds
    intervals.push(setInterval(incrementLikes, 7000));    // Increment likes every 7 seconds
    intervals.push(setInterval(incrementComments, 10000)); // Increment comments every 10 seconds
}

function stopAutoIncrement() {
    intervals.forEach(interval => clearInterval(interval));
    intervals = [];
}

// Inițializare
document.addEventListener('DOMContentLoaded', function() {
    // Inițializăm valorile inițiale
    const stats = {
        viewCount: 100000,
        likeCount: 24000,
        commentCount: 549
    };

    // Setăm valorile inițiale
    Object.entries(stats).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = formatNumber(value);
        }
    });

    // Pornim auto-increment
    startAutoIncrement();
    
    // Adăugăm event listeners pentru click manual pe statistici
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(stat => {
        stat.addEventListener('click', function(event) {
            const statId = this.querySelector('.stat-number').id;
            if (event.shiftKey) {
                // Shift + Click pentru decrementare
                switch(statId) {
                    case 'viewCount': decrementViews(); break;
                    case 'likeCount': decrementLikes(); break;
                    case 'commentCount': decrementComments(); break;
                }
            } else {
                // Click normal pentru incrementare
                switch(statId) {
                    case 'viewCount': incrementViews(); break;
                    case 'likeCount': incrementLikes(); break;
                    case 'commentCount': incrementComments(); break;
                }
            }
        });
    });
});

// Video player functionality
document.addEventListener('DOMContentLoaded', function() {
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    let currentVideo = null;

    // Funcție pentru a opri toate videoclipurile
    function stopAllVideos() {
        videoWrappers.forEach(wrapper => {
            const video = wrapper.querySelector('video');
            if (video) {
                video.pause();
                wrapper.classList.remove('playing');
            }
        });
    }

    // Adăugare event listeners pentru fiecare video wrapper
    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('video');
        const playButton = wrapper.querySelector('.play-button');
        const muteButton = wrapper.querySelector('.mute-button');
        const volumeOn = muteButton.querySelector('.volume-on');
        const volumeOff = muteButton.querySelector('.volume-off');

        // Click pe wrapper pentru play/pause
        wrapper.addEventListener('click', (e) => {
            // Ignoră click-ul dacă este pe butonul de mute
            if (e.target.closest('.mute-button')) return;

            if (video.paused) {
                stopAllVideos(); // Oprește alte videoclipuri
                video.play();
                wrapper.classList.add('playing');
                currentVideo = video;
            } else {
                video.pause();
                wrapper.classList.remove('playing');
                currentVideo = null;
            }
        });

        // Gestionare mute/unmute
        muteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (video.muted) {
                video.muted = false;
                volumeOn.style.display = 'block';
                volumeOff.style.display = 'none';
            } else {
                video.muted = true;
                volumeOn.style.display = 'none';
                volumeOff.style.display = 'block';
            }
        });

        // Event listener pentru când videoclipul se termină
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            wrapper.classList.remove('playing');
            currentVideo = null;
        });

        // Preîncarcă videoclipul
        video.load();
    });
}); 