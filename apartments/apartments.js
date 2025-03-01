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
            suprafataConstruita: 182,
            suprafataUtilaFaraTerasa: 164,
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
            suprafataConstruita: 92,
            suprafataUtilaFaraTerasa: 74,
            suprafataTerasa: 5.5,
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
            suprafataConstruita: 95,
            suprafataUtilaFaraTerasa: 74,
            suprafataTerasa: 9,
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
            suprafataConstruita: 98,
            suprafataUtilaFaraTerasa: 73,
            suprafataTerasa: 9,
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
            suprafataConstruita: 92,
            suprafataUtilaFaraTerasa: 67,
            suprafataTerasa: 9,
            pozitie: "S-V",
            schitaApartament: "../images/sketchApartment/Corp1Et1Ap06Cam2.jpg",
            pret: {
                standard: 114873,
                tva: 9,
                final: 125200
            },
            disponibilitate: "VANDUT"
        },
        AP_7: {
            id: "AP_7",
            etaj: 1,
            cladire: "C1",
            nrCam: 2,
            suprafataConstruita: 82,
            suprafataUtilaFaraTerasa: 61,
            suprafataTerasa: 8.7,
            pozitie: "V",
            schitaApartament: "../images/sketchApartment/Corp1Et1Ap07Cam2.jpg",
            pret: {
                standard: 105908,
                tva: 9,
                final: 115400
            },
            disponibilitate: "VANDUT"
        },
        AP_10: {
            id: "AP_10",
            etaj: 2,
            cladire: "C1",
            nrCam: 2,
            suprafataConstruita: 92,
            suprafataUtilaFaraTerasa: 74,
            suprafataTerasa: 5.9,
            pozitie: "E",
            schitaApartament: "../images/sketchApartment/Corp1Et2Ap10Cam2.jpg",
            pret: {
                standard: 128612,
                tva: 19,
                final: 153000
            },
            disponibilitate: "VANDUT"
        },
        AP_11: {
            id: "AP_11",
            etaj: 2,
            cladire: "C1",
            nrCam: 2,
            suprafataConstruita: 95,
            suprafataUtilaFaraTerasa: 74,
            suprafataTerasa: 9,
            pozitie: "E",
            schitaApartament: "../images/sketchApartment/Corp1Et2Ap11Cam2.jpg",
            pret: {
                standard: 130515,
                tva: 19,
                final: 155300
            },
            disponibilitate: "VANDUT"
        },
        AP_12: {
            id: "AP_12",
            etaj: 2,
            cladire: "C1",
            nrCam: 2,
            suprafataConstruita: 98,
            suprafataUtilaFaraTerasa: 73,
            suprafataTerasa: 9,
            pozitie: "S-E",
            schitaApartament: "../images/sketchApartment/Corp1Et2Ap12Cam2.jpg",
            pret: {
                standard: 129118,
                tva: 19,
                final: 153700
            },
            disponibilitate: "VANDUT"
        },
        AP_13: {
            id: "AP_13",
            etaj: 2,
            cladire: "C1",
            nrCam: 2,
            suprafataConstruita: 92,
            suprafataUtilaFaraTerasa: 67,
            suprafataTerasa: 9,
            pozitie: "S-V",
            schitaApartament: "../images/sketchApartment/Corp1Et2Ap13Cam2.jpg",
            pret: {
                standard: 118558,
                tva: 9,
                final: 129200
            },
            disponibilitate: "VANDUT"
        },
        AP_14: {
            id: "AP_14",
            etaj: 2,
            cladire: "C1",
            nrCam: 2,
            suprafataConstruita: 82,
            suprafataUtilaFaraTerasa: 59,
            suprafataTerasa: 9.7,
            pozitie: "V",
            schitaApartament: "../images/sketchApartment/Corp1Et2Ap14Cam2.jpg",
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
            suprafataConstruita: 125,
            suprafataUtilaFaraTerasa: 96,
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
            suprafataConstruita: 125,
            suprafataUtilaFaraTerasa: 92,
            suprafataTerasa: 13.00,
            pozitie: "N-E",
            schitaApartament: "../images/sketchApartment/Corp1Et2Ap09Cam3.jpg",
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
            suprafataConstruita: 131,
            suprafataUtilaFaraTerasa: 102,
            suprafataTerasa: 8.4,
            pozitie: "N-V",
            schitaApartament: "../images/sketchApartment/Corp1Et1Ap01Cam4.jpg",
            pret: {
                standard: 170879,
                tva: 19,
                final: 203300
            },
            disponibilitate: "VANDUT"
        },
        AP_8: {
            id: "AP_8",
            etaj: 2,
            cladire: "C1",
            nrCam: 4,
            suprafataConstruita: 131,
            suprafataUtilaFaraTerasa: 102,
            suprafataTerasa: 8.4,
            pozitie: "N-V",
            schitaApartament: "../images/sketchApartment/Corp1Et2Ap08Cam4.jpg",
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
            suprafataConstruita: 16,
            suprafataUtilaFaraTerasa: 16,
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
            suprafataConstruita: 56,
            suprafataUtilaFaraTerasa: 41,
            suprafataTerasa: 4.4,
            pozitie: "V",
            schitaApartament: "../images/sketchApartment/Corp2Et1Ap06Cam1.jpg",
            pret: {
                standard: 0,
                tva: 19,
                final: 0
            },
            disponibilitate: "VANDUT"
        },
        AP_12: {
            id: "AP_12",
            etaj: 2,
            cladire: "C2",
            nrCam: 1,
            suprafataConstruita: 55,
            suprafataUtilaFaraTerasa: 41,
            suprafataTerasa: 3.9,
            pozitie: "V",
            schitaApartament: "../images/sketchApartment/Corp2Et2Ap12Cam1.jpg",
            pret: {
                standard: 71320,
                tva: 9,
                final: 77700
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_18: {
            id: "AP_18",
            etaj: 3,
            cladire: "C2",
            nrCam: 1,
            suprafataConstruita: 55,
            suprafataUtilaFaraTerasa: 41,
            suprafataTerasa: 3.9,
            pozitie: "V",
            schitaApartament: "../images/sketchApartment/Corp2Et3Ap18Cam1.jpg",
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
            suprafataConstruita: 75,
            suprafataUtilaFaraTerasa: 57,
            suprafataTerasa: 3.3,
            pozitie: "N-V",
            schitaApartament: "../images/sketchApartment/Corp2Et1Ap01Cam2.jpg",
            pret: {
                standard: 95095,
                tva: 9,
                final: 103700
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_2: {
            id: "AP_2",
            etaj: 1,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 75,
            suprafataUtilaFaraTerasa: 57,
            suprafataTerasa: 3.3,
            pozitie: "N-E",
            schitaApartament: "../images/sketchApartment/Corp2Et1Ap02Cam2.jpg",
            pret: {
                standard: 95095,
                tva: 9,
                final: 103700
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_3: {
            id: "AP_3",
            etaj: 1,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 79,
            suprafataUtilaFaraTerasa: 59,
            suprafataTerasa: 9,
            pozitie: "E",
            schitaApartament: "../images/sketchApartment/Corp2Et1Ap03Cam2.jpg",
            pret: {
                standard: 102927 ,
                tva: 9,
                final: 112200
            },
            disponibilitate: "VANDUT"
        },
        AP_4: {
            id: "AP_3",
            etaj: 1,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 79,
            suprafataUtilaFaraTerasa: 55,
            suprafataTerasa: 9.1,
            pozitie: "S-E",
            schitaApartament: "../images/sketchApartment/Corp2Et1Ap04Cam2.jpg",
            pret: {
                standard: 103257  ,
                tva: 9,
                final: 105900
            },
            disponibilitate: "VANDUT"
        },
        AP_5: {
            id: "AP_5",
            etaj: 1,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 83,
            suprafataUtilaFaraTerasa: 61,
            suprafataTerasa: 7,
            pozitie: "S-V",
            schitaApartament: "../images/sketchApartment/Corp2Et1Ap05Cam2.jpg",
            pret: {
                standard: 114873,
                tva: 19,
                final: 136700
            },
            disponibilitate: "VANDUT"
        },
        AP_7: {
            id: "AP_7",
            etaj: 1,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 89,
            suprafataUtilaFaraTerasa: 67,
            suprafataTerasa: 7.8,
            pozitie: "N-V",
            schitaApartament: "../images/sketchApartment/Corp2Et1Ap07Cam2.jpg",
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
            suprafataConstruita: 89,
            suprafataUtilaFaraTerasa: 67,
            suprafataTerasa: 7.8,
            pozitie: "N-E",
            schitaApartament: "../images/sketchApartment/Corp2Et2Ap08Cam2.jpg",
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
            suprafataConstruita: 79,
            suprafataUtilaFaraTerasa: 59,
            suprafataTerasa: 9.3,
            pozitie: "E",
            schitaApartament: "../images/sketchApartment/Corp2Et2Ap09Cam2.jpg",
            pret: {
                standard: 104887,
                tva: 9,
                final: 114300
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_10: {
            id: "AP_10",
            etaj: 2,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 79,
            suprafataUtilaFaraTerasa: 55,
            suprafataTerasa: 9.1,
            pozitie: "S-E",
            schitaApartament: "../images/sketchApartment/Corp2Et2Ap10Cam2.jpg",
            pret: {
                standard: 105283,
                tva: 9,
                final: 114800
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_11: {
            id: "AP_11",
            etaj: 2,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 83,
            suprafataUtilaFaraTerasa: 61,
            suprafataTerasa: 7,
            pozitie: "S-V",
            schitaApartament: "../images/sketchApartment/Corp2Et2Ap11Cam2.jpg",
            pret: {
                standard: 110840,
                tva: 9,
                final: 120800
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_13: {
            id: "AP_13",
            etaj: 3,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 89,
            suprafataUtilaFaraTerasa: 67,
            suprafataTerasa: 7.8,
            pozitie: "N-V",
            schitaApartament: "../images/sketchApartment/Corp2Et3Ap13Cam2.jpg",
            pret: {
                standard: 118151,
                tva: 9,
                final: 128800
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_14: {
            id: "AP_14",
            etaj: 3,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 90,
            suprafataUtilaFaraTerasa: 67,
            suprafataTerasa: 7.8,
            pozitie: "N-E",
            schitaApartament: "../images/sketchApartment/Corp2Et3Ap14Cam2.jpg",
            pret: {
                standard: 116985,
                tva: 9,
                final: 127500
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_15: {
            id: "AP_15",
            etaj: 3,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 79,
            suprafataUtilaFaraTerasa: 59,
            suprafataTerasa: 9,
            pozitie: "E",
            schitaApartament: "../images/sketchApartment/Corp2Et3Ap15Cam2.jpg",
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
            suprafataConstruita: 79,
            suprafataUtilaFaraTerasa: 55,
            suprafataTerasa: 9,
            pozitie: "S-E",
            schitaApartament: "../images/sketchApartment/Corp2Et3Ap16Cam2.jpg",
            pret: {
                standard: 100858,
                tva: 9,
                final: 109900
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_17: {
            id: "AP_17",
            etaj: 3,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 83,
            suprafataUtilaFaraTerasa: 61,
            suprafataTerasa: 7.20,
            pozitie: "S-V",
            schitaApartament: "../images/sketchApartment/Corp2Et3Ap17Cam2.jpg",
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
            suprafataConstruita: 89,
            suprafataUtilaFaraTerasa: 67,
            suprafataTerasa: 7,
            pozitie: "N-V",
            schitaApartament: "../images/sketchApartment/Corp2Et4Ap19Cam2.jpg",
            pret: {
                standard: 120362,
                tva: 9,
                final: 131200
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_20: {
            id: "AP_20",
            etaj: 4,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 90,
            suprafataUtilaFaraTerasa: 67,
            suprafataTerasa: 7,
            pozitie: "N-E",
            schitaApartament: "../images/sketchApartment/Corp2Et4Ap20Cam2.jpg",
            pret: {
                standard: 120362,
                tva: 9,
                final: 131200
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_21: {
            id: "AP_21",
            etaj: 4,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 79,
            suprafataUtilaFaraTerasa: 59,
            suprafataTerasa: 9,
            pozitie: "E",
            schitaApartament: "../images/sketchApartment/Corp2Et4Ap21Cam2.jpg",
            pret: {
                standard: 108808,
                tva: 9,
                final: 118600
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_22: {
            id: "AP_22",
            etaj: 4,
            cladire: "C2",
            nrCam: 2,
            suprafataConstruita: 79,
            suprafataUtilaFaraTerasa: 55,
            suprafataTerasa: 9,
            pozitie: "S-E",
            schitaApartament: "../images/sketchApartment/Corp2Et4Ap22Cam2.jpg",
            pret: {
                standard: 109303,
                tva: 9,
                final: 119100
            },
            disponibilitate: "DISPONIBIL"
        }
    },
    
    // Apartamente cu 3 camere
    treiCamere: {
        AP_24: {
            id: "AP_24",
            etaj: 5,
            cladire: "C2",
            nrCam: 3,
            suprafataConstruita: 157,
            suprafataUtilaFaraTerasa: 92,
            suprafataTerasa: 40,
            pozitie: "N",
            schitaApartament: "../images/sketchApartment/Corp2Et5Ap24Cam3.jpg",
            pret: {
                standard: 194693,
                tva: 19,
                final: 231700
            },
            disponibilitate: "DISPONIBIL"
        },
        AP_25: {
            id: "AP_25",
            etaj: 5,
            cladire: "C2",
            nrCam: 3,
            suprafataConstruita: 148,
            suprafataUtilaFaraTerasa: 86,
            suprafataTerasa: 40,
            pozitie: "E",
            schitaApartament: "../images/sketchApartment/Corp2Et5Ap25Cam3.jpg",
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
            suprafataConstruita: 170,
            suprafataUtilaFaraTerasa: 86,
            suprafataTerasa: 57,
            pozitie: "S",
            schitaApartament: "../images/sketchApartment/Corp2Et5Ap26Cam3.jpg",
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
            suprafataConstruita: 139,
            suprafataUtilaFaraTerasa: 103,
            suprafataTerasa: 11,
            pozitie: "S-V",
            schitaApartament: "../images/sketchApartment/Corp2Et5Ap23Cam4.jpg",
            pret: {
                standard: 0,
                tva: 19,
                final: 0
            },
            disponibilitate: "VANDUT"
        }
    }
}; 