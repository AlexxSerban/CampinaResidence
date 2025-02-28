document.addEventListener('DOMContentLoaded', function() {
    // Apartment Filtering
    const filterButtons = document.querySelectorAll('.filter-button');
    const apartments = document.querySelectorAll('.apartment-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const rooms = button.dataset.rooms;
            
            apartments.forEach(apartment => {
                if (rooms === 'all' || apartment.dataset.rooms === rooms) {
                    apartment.style.display = 'block';
                    setTimeout(() => apartment.classList.add('visible'), 10);
                } else {
                    apartment.classList.remove('visible');
                    setTimeout(() => apartment.style.display = 'none', 300);
                }
            });
        });
    });

    // Price Animation
    const prices = document.querySelectorAll('.price-value');
    
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetPrice = parseInt(entry.target.dataset.price);
                animatePrice(entry.target, targetPrice);
                priceObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    prices.forEach(price => priceObserver.observe(price));

    function animatePrice(element, target) {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepDuration = duration / steps;
        let current = 0;
        
        const increment = target / steps;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            element.textContent = Math.floor(current).toLocaleString() + ' €';
        }, stepDuration);
    }

    // Image Gallery
    const galleryImages = document.querySelectorAll('.apartment-gallery img');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.querySelector('.modal-content');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-image');
    const nextBtn = document.querySelector('.next-image');
    let currentImageIndex = 0;

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImg.src = img.src;
            currentImageIndex = index;
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        modalImg.src = galleryImages[currentImageIndex].src;
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        modalImg.src = galleryImages[currentImageIndex].src;
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
        }
    });
}); 



// Apartamente Corp C1
export const apartmentsC1 = {
    // Spatii Comerciale
    spatiiComerciale: {
        SP_COM_1: {
            id: "SP_COM_1",
            etaj: "P",
            cladire: "C1",
            suprafataConstruita: 182.33,
            suprafataUtilaFaraTerasa: 164.10,
            suprafataTerasa: 0.00,
            pozitie: "N-E",
            pret: {
                standard: 0,
                tva: 19,
                final: 0
            },
            disponibilitate: "VANDUT"
        },
        SP_COM_2: {
            id: "SP_COM_2",
            etaj: "P",
            cladire: "C1",
            suprafataConstruita: 182.20,
            suprafataUtilaFaraTerasa: 164.50,
            suprafataTerasa: 0.00,
            pozitie: "S-E",
            pret: {
                standard: 0,
                tva: 19,
                final: 0
            },
            disponibilitate: "VANDUT"
        },
        SP_COM_3: {
            id: "SP_COM_3",
            etaj: "P",
            cladire: "C1",
            suprafataConstruita: 164.72,
            suprafataUtilaFaraTerasa: 146.70,
            suprafataTerasa: 0.00,
            pozitie: "S-V",
            pret: {
                standard: 264060,
                tva: 19,
                final: 314200
            },
            disponibilitate: ""
        },
        SP_COM_4: {
            id: "SP_COM_4",
            etaj: "P",
            cladire: "C1",
            suprafataConstruita: 152.27,
            suprafataUtilaFaraTerasa: 134.90,
            suprafataTerasa: 0.00,
            pozitie: "N-V",
            pret: {
                standard: 0,
                tva: 19,
                final: 0
            },
            disponibilitate: "VANDUT"
        }
    },
    
    // Apartamente cu 1 camera
    unCamera: {},
    
    // Apartamente cu 2 camere
    douaCamere: {
        AP_3: {
            id: "AP_3",
            etaj: 1,
            cladire: "C1",
            nrCam: 2,
            suprafataConstruita: 92.62,
            suprafataUtilaFaraTerasa: 74.80,
            suprafataTerasa: 5.50,
            pozitie: "E",
            schitaApartament: "../images/sketchApartment/Corp1Et1Ap03Cam2.jpg",
            pret: {
                standard: 124146,
                tva: 19,
                final: 147700
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_4: {
            id: "AP_4",
            etaj: 1,
            cladire: "C1",
            nrCam: 2,
            suprafataConstruita: 95.88,
            suprafataUtilaFaraTerasa: 74.30,
            suprafataTerasa: 9.00,
            pozitie: "E",
            schitaApartament: "../images/sketchApartment/Corp1Et1Ap04Cam2.jpg",
            pret: {
                standard: 126429,
                tva: 19,
                final: 150500
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_5: {
            id: "AP_5",
            etaj: 1,
            cladire: "C1",
            nrCam: 2,
            suprafataConstruita: 98.89,
            suprafataUtilaFaraTerasa: 73.40,
            suprafataTerasa: 9.10,
            pozitie: "S-E",
            schitaApartament: "../images/sketchApartment/Corp1Et1Ap05Cam2.jpg",
            pret: {
                standard: 125081,
                tva: 19,
                final: 148800
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_6: {
            id: "AP_6",
            etaj: 1,
            cladire: "C1",
            nrCam: 2,
            suprafataConstruita: 92.38,
            suprafataUtilaFaraTerasa: 67.00,
            suprafataTerasa: 9.10,
            pozitie: "S-V",
            schitaApartament: "../images/sketchApartment/Corp1Et1Ap06Cam2.jpg",
            pret: {
                standard: 114873,
                tva: 9,
                final: 125200
            },
            disponibilitate: "VANDUT/RE"
        },
        AP_7: {
            id: "AP_7",
            etaj: 1,
            cladire: "C1",
            nrCam: 2,
            suprafataConstruita: 82.49,
            suprafataUtilaFaraTerasa: 61.60,
            suprafataTerasa: 8.70,
            pozitie: "V",
            schitaApartament: "../images/sketchApartment/Corp1Et1Ap07Cam2.jpg",
            pret: {
                standard: 105908,
                tva: 9,
                final: 115400
            },
            disponibilitate: "VANDUT/RE"
        },
        AP_10: {
            id: "AP_10",
            etaj: 2,
            cladire: "C1",
            nrCam: 2,
            suprafataConstruita: 92.67,
            suprafataUtilaFaraTerasa: 74.80,
            suprafataTerasa: 5.90,
            pozitie: "E",
            pret: {
                standard: 128612,
                tva: 19,
                final: 153000
            },
            disponibilitate: "VANDUT/RE"
        },
        AP_11: {
            id: "AP_11",
            etaj: 2,
            cladire: "C1",
            nrCam: 2,
            suprafataConstruita: 95.86,
            suprafataUtilaFaraTerasa: 74.30,
            suprafataTerasa: 9.00,
            pozitie: "E",
            pret: {
                standard: 130515,
                tva: 19,
                final: 155300
            },
            disponibilitate: "VANDUT/RE"
        },
        AP_12: {
            id: "AP_12",
            etaj: 2,
            cladire: "C1",
            nrCam: 2,
            suprafataConstruita: 98.89,
            suprafataUtilaFaraTerasa: 73.40,
            suprafataTerasa: 9.10,
            pozitie: "S-E",
            pret: {
                standard: 129118,
                tva: 19,
                final: 153700
            },
            disponibilitate: "VANDUT/RE"
        },
        AP_13: {
            id: "AP_13",
            etaj: 2,
            cladire: "C1",
            nrCam: 2,
            suprafataConstruita: 92.38,
            suprafataUtilaFaraTerasa: 67.00,
            suprafataTerasa: 9.10,
            pozitie: "S-V",
            pret: {
                standard: 118558,
                tva: 9,
                final: 129200
            },
            disponibilitate: "VANDUT/RE"
        },
        AP_14: {
            id: "AP_14",
            etaj: 2,
            cladire: "C1",
            nrCam: 2,
            suprafataConstruita: 82.56,
            suprafataUtilaFaraTerasa: 59.2,
            suprafataTerasa: 9.7,
            pozitie: "V",
            pret: {
                standard: 0,
                tva: 9,
                final: 0
            },
            disponibilitate: "VANDUT"
        }
    },
    
    // Apartamente cu 3 camere
    treiCamere: {
        AP_2: {
            id: "AP_2",
            etaj: 1,
            cladire: "C1",
            nrCam: 3,
            suprafataConstruita: 125.06,
            suprafataUtilaFaraTerasa: 96.10,
            suprafataTerasa: 10,
            pozitie: "N-E",
            schitaApartament: "../images/sketchApartment/Corp1Et1Ap02Cam3.jpg",
            pret: {
                standard: 162080,
                tva: 19,
                final: 192900
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_9: {
            id: "AP_9",
            etaj: 2,
            cladire: "C1",
            nrCam: 3,
            suprafataConstruita: 125.06,
            suprafataUtilaFaraTerasa: 92.60,
            suprafataTerasa: 13.00,
            pozitie: "N-E",
            pret: {
                standard: 164230,
                tva: 19,
                final: 195400
            },
            disponibilitate: "DISPONIBIL"
        }
    },
    
    // Apartamente cu 4 camere
    patruCamere: {
        AP_1: {
            id: "AP_1",
            etaj: 1,
            cladire: "C1",
            nrCam: 4,
            suprafataConstruita: 147.89,
            suprafataUtilaFaraTerasa: 119.70,
            suprafataTerasa: 5.50,
            pozitie: "N",
            schitaApartament: "../images/sketchApartment/Corp1Et1Ap01Cam4.jpg",
            pret: {
                standard: 197815,
                tva: 19,
                final: 235400
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_8: {
            id: "AP_8",
            etaj: 2,
            cladire: "C1",
            nrCam: 4,
            suprafataConstruita: 131.25,
            suprafataUtilaFaraTerasa: 102.5,
            suprafataTerasa: 8.4,
            pozitie: "N-V",
            pret: {
                standard: 176055,
                tva: 19,
                final: 209500
            },
            disponibilitate: "DISPONIBIL"
        }
    }
};

// Apartamente Corp C2
export const apartmentsC2 = {
    // Garaje
    garaje: {
        GARAJ_1: {
            id: "GARAJ_1",
            etaj: "",
            cladire: "C2",
            suprafataConstruita: 16.50,
            suprafataUtilaFaraTerasa: 16.50,
            suprafataTerasa: 0.00,
            pozitie: "E",
            pret: {
                standard: 0,
                tva: 9,
                final: 0
            },
            disponibilitate: "VANDUT"
        },
        GARAJ_2: {
            id: "GARAJ_2",
            etaj: "",
            cladire: "C2",
            suprafataConstruita: 16.50,
            suprafataUtilaFaraTerasa: 16.50,
            suprafataTerasa: 0.00,
            pozitie: "E",
            pret: {
                standard: 0,
                tva: 9,
                final: 0
            },
            disponibilitate: "VANDUT"
        },
        GARAJ_3: {
            id: "GARAJ_3",
            etaj: "",
            cladire: "C2",
            suprafataConstruita: 16.50,
            suprafataUtilaFaraTerasa: 16.50,
            suprafataTerasa: 0.00,
            pozitie: "E",
            pret: {
                standard: 0,
                tva: 9,
                final: 0
            },
            disponibilitate: "VANDUT"
        },
        GARAJ_4: {
            id: "GARAJ_4",
            etaj: "",
            cladire: "C2",
            suprafataConstruita: 16.50,
            suprafataUtilaFaraTerasa: 16.50,
            suprafataTerasa: 0.00,
            pozitie: "E",
            pret: {
                standard: 0,
                tva: 9,
                final: 0
            },
            disponibilitate: "VANDUT"
        },
        GARAJ_5: {
            id: "GARAJ_5",
            etaj: "",
            cladire: "C2",
            suprafataConstruita: 16.50,
            suprafataUtilaFaraTerasa: 16.50,
            suprafataTerasa: 0.00,
            pozitie: "E",
            pret: {
                standard: 0,
                tva: 9,
                final: 0
            },
            disponibilitate: "VANDUT"
        },
        GARAJ_6: {
            id: "GARAJ_6",
            etaj: "",
            cladire: "C2",
            suprafataConstruita: 16.50,
            suprafataUtilaFaraTerasa: 16.50,
            suprafataTerasa: 0.00,
            pozitie: "E",
            pret: {
                standard: 0,
                tva: 9,
                final: 0
            },
            disponibilitate: "VANDUT"
        },
        GARAJ_7: {
            id: "GARAJ_7",
            etaj: "",
            cladire: "C2",
            suprafataConstruita: 16.50,
            suprafataUtilaFaraTerasa: 16.50,
            suprafataTerasa: 0.00,
            pozitie: "E",
            pret: {
                standard: 0,
                tva: 9,
                final: 0
            },
            disponibilitate: "VANDUT"
        },
        GARAJ_8: {
            id: "GARAJ_8",
            etaj: "",
            cladire: "C2",
            suprafataConstruita: 18.52,
            suprafataUtilaFaraTerasa: 16.50,
            suprafataTerasa: 0.00,
            pozitie: "E",
            pret: {
                standard: 12000,
                tva: 9,
                final: 13100
            },
            disponibilitate: ""
        },
        GARAJ_9: {
            id: "GARAJ_9",
            etaj: "",
            cladire: "C2",
            suprafataConstruita: 18.50,
            suprafataUtilaFaraTerasa: 16.50,
            suprafataTerasa: 0.00,
            pozitie: "E",
            pret: {
                standard: 12000,
                tva: 9,
                final: 13100
            },
            disponibilitate: ""
        },
        GARAJ_10: {
            id: "GARAJ_10",
            etaj: "",
            cladire: "C2",
            suprafataConstruita: 19.60,
            suprafataUtilaFaraTerasa: 16.50,
            suprafataTerasa: 0.00,
            pozitie: "S-E",
            pret: {
                standard: 12000,
                tva: 9,
                final: 13100
            },
            disponibilitate: ""
        }
    },
    
    // Spatii Comerciale
    spatiiComerciale: {
        SP_COM_1: {
            id: "SP_COM_1",
            etaj: "",
            cladire: "C2",
            suprafataConstruita: 86.90,
            suprafataUtilaFaraTerasa: 73.30,
            suprafataTerasa: 0.00,
            pozitie: "S",
            pret: {
                standard: 131940,
                tva: 9,
                final: 143800
            },
            disponibilitate: ""
        }
    },
    
    // Apartamente cu 1 camera
    unCamera: {
        AP_6: {
            id: "AP_6",
            etaj: 1,
            cladire: "C2",
            nrCam: 1,
            suprafataConstruita: 58.89,
            suprafataUtilaFaraTerasa: 46.70,
            suprafataTerasa: 0.00,
            pozitie: "S",
            schitaApartament: "../images/sketchApartment/Corp2Et1Ap06Cam1.jpg",
            pret: {
                standard: 79412,
                tva: 19,
                final: 94500
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_12: {
            id: "AP_12",
            etaj: 2,
            cladire: "C2",
            nrCam: 1,
            suprafataConstruita: 55.87,
            suprafataUtilaFaraTerasa: 41.70,
            suprafataTerasa: 3.90,
            pozitie: "V",
            pret: {
                standard: 71320,
                tva: 9,
                final: 77700
            },
            disponibilitate: ""
        },
        AP_18: {
            id: "AP_18",
            etaj: 3,
            cladire: "C2",
            nrCam: 1,
            suprafataConstruita: 55.87,
            suprafataUtilaFaraTerasa: 41.70,
            suprafataTerasa: 3.90,
            pozitie: "V",
            pret: {
                standard: 0,
                tva: 9,
                final: 0
            },
            disponibilitate: "VANDUT"
        }
    },
    
    // Apartamente cu 2 camere
    douaCamere: {
        AP_1: {
            id: "AP_1",
            etaj: 1,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 92.62,
            suprafataUtilaFaraTerasa: 74.80,
            suprafataTerasa: 5.50,
            pozitie: "N-E",
            schitaApartament: "../images/sketchApartment/Corp2Et1Ap01Cam2.jpg",
            pret: {
                standard: 124146,
                tva: 19,
                final: 147700
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_2: {
            id: "AP_2",
            etaj: 1,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 95.88,
            suprafataUtilaFaraTerasa: 74.30,
            suprafataTerasa: 9.00,
            pozitie: "E",
            schitaApartament: "../images/sketchApartment/Corp2Et1Ap02Cam2.jpg",
            pret: {
                standard: 126429,
                tva: 19,
                final: 150500
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_3: {
            id: "AP_3",
            etaj: 1,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 98.89,
            suprafataUtilaFaraTerasa: 73.40,
            suprafataTerasa: 9.10,
            pozitie: "S-E",
            schitaApartament: "../images/sketchApartment/Corp2Et1Ap03Cam2.jpg",
            pret: {
                standard: 125081,
                tva: 19,
                final: 148800
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_5: {
            id: "AP_5",
            etaj: 1,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 92.38,
            suprafataUtilaFaraTerasa: 67.00,
            suprafataTerasa: 9.10,
            pozitie: "S-V",
            schitaApartament: "../images/sketchApartment/Corp2Et1Ap05Cam2.jpg",
            pret: {
                standard: 114873,
                tva: 19,
                final: 136700
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_7: {
            id: "AP_7",
            etaj: 1,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 89.29,
            suprafataUtilaFaraTerasa: 67.00,
            suprafataTerasa: 7.80,
            pozitie: "N-V",
            pret: {
                standard: 0,
                tva: 9,
                final: 0
            },
            disponibilitate: "VANDUT"
        },
        AP_8: {
            id: "AP_8",
            etaj: 2,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 89.04,
            suprafataUtilaFaraTerasa: 67.00,
            suprafataTerasa: 7.80,
            pozitie: "N-E",
            pret: {
                standard: 0,
                tva: 9,
                final: 0
            },
            disponibilitate: "VANDUT"
        },
        AP_9: {
            id: "AP_9",
            etaj: 2,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 79.05,
            suprafataUtilaFaraTerasa: 59.40,
            suprafataTerasa: 9.30,
            pozitie: "E",
            pret: {
                standard: 104887,
                tva: 9,
                final: 114300
            },
            disponibilitate: ""
        },
        AP_10: {
            id: "AP_10",
            etaj: 2,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 79.12,
            suprafataUtilaFaraTerasa: 55.90,
            suprafataTerasa: 9.10,
            pozitie: "S-E",
            pret: {
                standard: 105283,
                tva: 9,
                final: 114800
            },
            disponibilitate: ""
        },
        AP_11: {
            id: "AP_11",
            etaj: 2,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 83.16,
            suprafataUtilaFaraTerasa: 61.60,
            suprafataTerasa: 7.20,
            pozitie: "S-V",
            pret: {
                standard: 110840,
                tva: 9,
                final: 120800
            },
            disponibilitate: ""
        },
        AP_13: {
            id: "AP_13",
            etaj: 3,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 89.29,
            suprafataUtilaFaraTerasa: 67.00,
            suprafataTerasa: 7.80,
            pozitie: "N-V",
            pret: {
                standard: 118151,
                tva: 9,
                final: 128800
            },
            disponibilitate: ""
        },
        AP_14: {
            id: "AP_14",
            etaj: 3,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 90.04,
            suprafataUtilaFaraTerasa: 67.00,
            suprafataTerasa: 7.80,
            pozitie: "N-E",
            pret: {
                standard: 116985,
                tva: 9,
                final: 127500
            },
            disponibilitate: ""
        },
        AP_15: {
            id: "AP_15",
            etaj: 3,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 79.05,
            suprafataUtilaFaraTerasa: 59.40,
            suprafataTerasa: 9.30,
            pozitie: "E",
            pret: {
                standard: 0,
                tva: 9,
                final: 0
            },
            disponibilitate: "VANDUT"
        },
        AP_16: {
            id: "AP_16",
            etaj: 3,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 79.12,
            suprafataUtilaFaraTerasa: 55.90,
            suprafataTerasa: 9.10,
            pozitie: "S-E",
            pret: {
                standard: 100858,
                tva: 9,
                final: 109900
            },
            disponibilitate: ""
        },
        AP_17: {
            id: "AP_17",
            etaj: 3,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 83.16,
            suprafataUtilaFaraTerasa: 61.60,
            suprafataTerasa: 7.20,
            pozitie: "S-V",
            pret: {
                standard: 0,
                tva: 9,
                final: 0
            },
            disponibilitate: "VANDUT"
        },
        AP_19: {
            id: "AP_19",
            etaj: 4,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 89.29,
            suprafataUtilaFaraTerasa: 67.00,
            suprafataTerasa: 7.80,
            pozitie: "N-V",
            pret: {
                standard: 120362,
                tva: 9,
                final: 131200
            },
            disponibilitate: ""
        },
        AP_20: {
            id: "AP_20",
            etaj: 4,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 90.04,
            suprafataUtilaFaraTerasa: 67.00,
            suprafataTerasa: 7.80,
            pozitie: "N-E",
            pret: {
                standard: 120362,
                tva: 9,
                final: 131200
            },
            disponibilitate: ""
        },
        AP_21: {
            id: "AP_21",
            etaj: 4,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 79.05,
            suprafataUtilaFaraTerasa: 59.40,
            suprafataTerasa: 9.30,
            pozitie: "E",
            pret: {
                standard: 108808,
                tva: 9,
                final: 118600
            },
            disponibilitate: ""
        },
        AP_22: {
            id: "AP_22",
            etaj: 4,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 79.12,
            suprafataUtilaFaraTerasa: 55.9,
            suprafataTerasa: 9.10,
            pozitie: "S-E",
            pret: {
                standard: 109303,
                tva: 9,
                final: 119100
            },
            disponibilitate: ""
        }
    },
    
    // Apartamente cu 3 camere
    treiCamere: {
        AP_24: {
            id: "AP_24",
            etaj: 5,
            cladire: "C2",
            nrCam: 3,
            suprafataConstruita: 157.81,
            suprafataUtilaFaraTerasa: 92.2,
            suprafataTerasa: 40.30,
            pozitie: "N",
            pret: {
                standard: 194693,
                tva: 19,
                final: 231700
            },
            disponibilitate: ""
        },
        AP_25: {
            id: "AP_25",
            etaj: 5,
            cladire: "C2",
            nrCam: 3,
            suprafataConstruita: 148.78,
            suprafataUtilaFaraTerasa: 86.4,
            suprafataTerasa: 40.80,
            pozitie: "E",
            pret: {
                standard: 0,
                tva: 19,
                final: 0
            },
            disponibilitate: "VANDUT"
        },
        AP_26: {
            id: "AP_26",
            etaj: 5,
            cladire: "C2",
            nrCam: 3,
            suprafataConstruita: 170.42,
            suprafataUtilaFaraTerasa: 86.3,
            suprafataTerasa: 57.90,
            pozitie: "S",
            pret: {
                standard: 0,
                tva: 19,
                final: 0
            },
            disponibilitate: "VANDUT"
        }
    },
    
    // Apartamente cu 4 camere
    patruCamere: {
        AP_23: {
            id: "AP_23",
            etaj: 5,
            cladire: "C2",
            nrCam: 4,
            suprafataConstruita: 149.02,
            suprafataUtilaFaraTerasa: 101.3,
            suprafataTerasa: 11.10,
            pozitie: "S-V",
            pret: {
                standard: 0,
                tva: 19,
                final: 0
            },
            disponibilitate: "VANDUT"
        }
    }
}; 