import { apartmentsC1, apartmentsC2 } from '../apartments.js';

// Funcție pentru a obține parametrii din URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id')
    };
}

// Funcție pentru a găsi apartamentul după ID
function findApartmentById(id) {
    // Caută în toate categoriile din C1
    for (const category of Object.values(apartmentsC1)) {
        if (typeof category === 'object') {
            const found = Object.values(category).find(apt => apt.id === id);
            if (found) return found;
        }
    }
    
    // Caută în toate categoriile din C2
    for (const category of Object.values(apartmentsC2)) {
        if (typeof category === 'object') {
            const found = Object.values(category).find(apt => apt.id === id);
            if (found) return found;
        }
    }
    
    return null;
}

// Funcție pentru a obține imaginile în funcție de numărul de camere
function getApartmentImages(nrCam) {
    const imagesByRooms = {
        1: {
            main: "../../images/living1.jpg",
            additional: [
                "../../images/bedroom1.jpg",
                "../../images/building1.png",
                "../../images/entranceApartment1.jpg"
            ]
        },
        2: {
            main: "../../images/living2.jpg",
            additional: [
                "../../images/bedroom2.jpg",
                "../../images/building2.png",
                "../../images/entranceApartment2.jpg"
            ]
        },
        3: {
            main: "../../images/living3.jpg",
            additional: [
                "../../images/bedroom3.jpg",
                "../../images/building3.png",
                "../../images/entranceApartment1.jpg"
            ]
        },
        4: {
            main: "../../images/living4.jpg",
            additional: [
                "../../images/bedroom4.jpg",
                "../../images/building4.png",
                "../../images/entranceApartment2.jpg"
            ]
        }
    };

    const images = imagesByRooms[nrCam] || imagesByRooms[2];
    console.log('Loading images for apartment with', nrCam, 'rooms:', images);
    return images;
}

// Funcție pentru a încărca datele apartamentului
async function loadApartmentDetails() {
    try {
        const urlParams = getUrlParams();
        console.log('URL params:', urlParams);
        
        const apartment = findApartmentById(urlParams.id);
        console.log('Found apartment:', apartment);
        
        if (!apartment) {
            console.error('Apartment not found');
            return;
        }

        // Actualizare titlu și alte detalii
        document.title = `Apartament ${apartment.nrCam} Camere - Câmpina Residence`;
        document.querySelector('.apartment-hero h1').textContent = `Apartament ${apartment.nrCam} Camere - Corp ${apartment.cladire}`;
        
        // Actualizare preț
        const apartmentPrice = document.getElementById('apartmentPrice');
        const pricePerSqm = document.getElementById('pricePerSqm');
        
        if (apartment.pret?.standard) {
            const price = apartment.pret.standard;
            apartmentPrice.textContent = new Intl.NumberFormat('ro-RO').format(price);
            
            // Calculează și afișează prețul pe metru pătrat
            const pricePerSquareMeter = Math.round(price / apartment.suprafataUtilaFaraTerasa);
            pricePerSqm.textContent = new Intl.NumberFormat('ro-RO').format(pricePerSquareMeter);
        } else {
            apartmentPrice.textContent = 'La cerere';
            pricePerSqm.textContent = '-';
        }

        // Actualizare TVA doar dacă avem preț
        const priceDetails = document.querySelector('.price-details');
        if (apartment.pret?.tva) {
            priceDetails.textContent = `plus TVA ${apartment.pret.tva}%`;
        } else {
            priceDetails.textContent = '';
        }

        // Setează titlul paginii
        document.title = `Apartament ${apartment.nrCam} Camere - Corp ${apartment.cladire} | Câmpina Residence`;

        // Actualizează conținutul
        const titleElement = document.querySelector('.hero-content h1');
        titleElement.textContent = `Apartament ${apartment.nrCam} Camere - Corp ${apartment.cladire}`;

        // Actualizare conținut hero section
        document.querySelector('.hero-content .description').textContent = 
            `Apartament premium cu ${apartment.nrCam} camere, poziționat ${apartment.pozitie}, oferind un spațiu de locuit modern și funcțional.`;

        // Actualizare statistici
        const stats = document.querySelector('.hero-stats');
        stats.innerHTML = `
            <div class="stat">
                <span class="value">${apartment.suprafataUtilaFaraTerasa}</span>
                <span class="label">mp utili</span>
            </div>
            <div class="stat">
                <span class="value">${apartment.nrCam}</span>
                <span class="label">camere</span>
            </div>
            <div class="stat">
                <span class="value">${apartment.etaj}</span>
                <span class="label">etaj</span>
            </div>
        `;

        // Actualizare detalii tehnice
        const specsGrid = document.querySelector('.specs-grid');
        specsGrid.innerHTML = `
            <div class="spec-item">
                <span class="spec-label">Suprafață utilă</span>
                <span class="spec-value">${apartment.suprafataUtilaFaraTerasa} mp</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Suprafață construită</span>
                <span class="spec-value">${apartment.suprafataConstruita} mp</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Suprafață terasă</span>
                <span class="spec-value">${apartment.suprafataTerasa} mp</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Etaj</span>
                <span class="spec-value">${apartment.etaj}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Corp</span>
                <span class="spec-value">${apartment.cladire}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Status</span>
                <span class="spec-value">${apartment.disponibilitate || 'Disponibil'}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Poziționare</span>
                <span class="spec-value">${apartment.pozitie}</span>
            </div>
        `;

        // Actualizare imagini
        const mainPhoto = document.querySelector('.main-photo img');
        const smallPhotos = document.querySelector('.small-photos');
        
        // Obține setul de imagini pentru acest apartament
        const apartmentImages = getApartmentImages(apartment.nrCam);
        
        // Setează imaginea principală
        mainPhoto.src = apartmentImages.main;
        mainPhoto.alt = `Apartament ${apartment.nrCam} Camere - Imagine Principală`;

        // Setează imaginile mici
        smallPhotos.innerHTML = apartmentImages.additional.map(img => `
            <img src="${img}" 
                 alt="Apartament ${apartment.nrCam} Camere" 
                 onclick="openLightbox(this.src)"
                 loading="lazy">
        `).join('');

        // Adaugă event listener pentru a schimba imaginea principală când se face click pe imaginile mici
        smallPhotos.querySelectorAll('img').forEach(img => {
            img.addEventListener('click', (e) => {
                const temp = mainPhoto.src;
                mainPhoto.src = e.target.src;
                e.target.src = temp;
            });
        });

        // Setează imaginea schiței apartamentului
        if (apartment.schitaApartament) {
            const floorPlanImg = document.querySelector('.floor-plan img');
            // Ajustăm calea relativă pentru a se potrivi cu structura de fișiere
            const adjustedPath = apartment.schitaApartament.replace('../', '../../');
            console.log('Floor plan path:', apartment.schitaApartament);
            console.log('Adjusted floor plan path:', adjustedPath);
            floorPlanImg.src = adjustedPath;
            floorPlanImg.alt = `Schița Apartament ${apartment.nrCam} Camere - Corp ${apartment.cladire}`;
            
            // Adăugăm un handler pentru erori la încărcarea imaginii
            floorPlanImg.onerror = () => {
                console.error('Failed to load floor plan image:', adjustedPath);
            };
            
            floorPlanImg.onload = () => {
                console.log('Floor plan image loaded successfully');
            };
        } else {
            console.log('No floor plan image path found for this apartment');
        }

    } catch (error) {
        console.error('Error loading apartment details:', error);
        const apartmentPrice = document.getElementById('apartmentPrice');
        const priceDetails = document.querySelector('.price-details');
        if (apartmentPrice) apartmentPrice.textContent = 'La cerere';
        if (priceDetails) priceDetails.textContent = '';
    }
}

// Funcție pentru deschiderea lightbox-ului
function openLightbox(imageSrc) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-image');
    lightboxImg.src = imageSrc;
    lightbox.style.display = 'flex';
}

// Make openLightbox available globally
window.openLightbox = openLightbox;

// Event listeners pentru lightbox
document.addEventListener('DOMContentLoaded', () => {
    loadApartmentDetails();

    // Închidere lightbox
    const lightbox = document.querySelector('.lightbox');
    const closeButton = document.querySelector('.lightbox-close');
    
    closeButton.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Navigare cu tastatura
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
        }
    });
});

// Loan Calculator
document.addEventListener('DOMContentLoaded', function() {
    const loanAmount = document.getElementById('loanAmount');
    const interestRate = document.getElementById('interestRate');
    const loanTerm = document.getElementById('loanTerm');
    const monthlyPaymentElement = document.getElementById('monthlyPayment');
    const totalPaymentElement = document.getElementById('totalPayment');
    const totalInterestElement = document.getElementById('totalInterest');
    let loanChart = null;

    // Load Chart.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    document.head.appendChild(script);

    script.onload = function() {
        // Initialize empty chart
        const ctx = document.getElementById('loanChart').getContext('2d');
        loanChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Suma împrumutată', 'Dobândă totală'],
                datasets: [{
                    data: [0, 0],
                    backgroundColor: ['#4CAF50', '#FF5722'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    };

    function calculateLoan() {
        const principal = parseFloat(loanAmount.value);
        const annualRate = parseFloat(interestRate.value);
        const years = parseInt(loanTerm.value);

        if (isNaN(principal) || isNaN(annualRate) || isNaN(years)) {
            alert('Vă rugăm completați toate câmpurile cu valori valide');
            return;
        }

        // Calculate monthly values
        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = years * 12;

        // Calculate monthly payment
        const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        // Calculate total payment and interest
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - principal;

        // Update results with Euro formatting
        const formatter = new Intl.NumberFormat('ro-RO', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        monthlyPaymentElement.textContent = formatter.format(monthlyPayment);
        totalPaymentElement.textContent = formatter.format(totalPayment);
        totalInterestElement.textContent = formatter.format(totalInterest);

        // Update chart
        if (loanChart) {
            loanChart.data.datasets[0].data = [principal, totalInterest];
            loanChart.update();
        }
    }

    // Attach calculate function to window for the onclick event
    window.calculateLoan = calculateLoan;
});


