import { apartmentsC1, apartmentsC2 } from '../apartments.js';

document.addEventListener('DOMContentLoaded', function() {
    const catalogGrid = document.querySelector('.catalog-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let currentFilters = {
        status: 'all',
        rooms: 'all',
        corp: 'all'
    };

    // Funcție pentru a obține parametrii din URL
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            corp: params.get('corp'),
            rooms: params.get('rooms')
        };
    }

    // Funcție pentru a aplica filtrele din URL
    function applyUrlFilters() {
        const params = getUrlParams();
        if (params.rooms) {
            currentFilters.rooms = params.rooms;
            const roomButton = document.querySelector(`.filter-btn[data-rooms="${params.rooms}"]`);
            if (roomButton) {
                document.querySelectorAll('.filter-btn[data-rooms]').forEach(btn => btn.classList.remove('active'));
                roomButton.classList.add('active');
            }
        }
        if (params.corp) {
            currentFilters.corp = params.corp.toUpperCase();
        }
    }

    // Funcție pentru a genera HTML-ul pentru un apartament
    function generateApartmentCard(apartment) {
        const isAvailable = apartment.disponibilitate === "" || apartment.disponibilitate === "DISPONIBIL";
        const status = isAvailable ? "available" : "sold";
        const statusText = isAvailable ? "Disponibil" : "Vândut";
        
        // Determină imaginea în funcție de numărul de camere
        const getImage = (nrCam) => {
            switch(nrCam) {
                case 1: return "../../images/bedroom1.jpg";
                case 2: return "../../images/living2.jpg";
                case 3: return "../../images/living3.jpg";
                case 4: return "../../images/living4.jpg";
                default: return "../../images/living2.jpg";
            }
        };

        return `
            <div class="apartment-card" data-status="${status}" data-rooms="${apartment.nrCam}" data-corp="${apartment.cladire.toLowerCase()}">
                <div class="card-header">
                    <span class="status-badge ${status}">${statusText}</span>
                    <img src="${getImage(apartment.nrCam)}" alt="Apartament ${apartment.nrCam} Camere">
                </div>
                <div class="card-content">
                    <h3>Apartament ${apartment.nrCam} Camere - Corp ${apartment.cladire}</h3>
                    <div class="apartment-details">
                        <span class="detail"><i class="icon">📏</i>${apartment.suprafataUtilaFaraTerasa} mp utili</span>
                        <span class="detail"><i class="icon">🏗️</i>Etaj ${apartment.etaj}</span>
                        <span class="detail"><i class="icon">📍</i>Poziționare ${apartment.pozitie}</span>
                    </div>
                    <div class="price-info">
                        <span class="price">${apartment.pret.standard.toLocaleString()} €</span>
                        <span class="price-details">plus TVA ${apartment.pret.tva}%</span>
                    </div>
                    <a href="../apartment-details/apartment-details.html?id=${apartment.id}&corp=${apartment.cladire}" class="view-details-btn">Vezi detalii complete</a>
                </div>
            </div>
        `;
    }

    // Funcție pentru a afișa toate apartamentele
    function displayApartments() {
        catalogGrid.innerHTML = ''; // Curăță conținutul existent
        
        // Procesează apartamentele din C1
        if (currentFilters.corp === 'all' || currentFilters.corp === 'C1') {
            Object.values(apartmentsC1).forEach(category => {
                if (typeof category === 'object') {
                    Object.values(category).forEach(apartment => {
                        if (apartment.nrCam) { // Verifică dacă este apartament (nu spațiu comercial)
                            if (shouldDisplayApartment(apartment)) {
                                catalogGrid.innerHTML += generateApartmentCard(apartment);
                            }
                        }
                    });
                }
            });
        }

        // Procesează apartamentele din C2
        if (currentFilters.corp === 'all' || currentFilters.corp === 'C2') {
            Object.values(apartmentsC2).forEach(category => {
                if (typeof category === 'object') {
                    Object.values(category).forEach(apartment => {
                        if (apartment.nrCam) { // Verifică dacă este apartament (nu spațiu comercial sau garaj)
                            if (shouldDisplayApartment(apartment)) {
                                catalogGrid.innerHTML += generateApartmentCard(apartment);
                            }
                        }
                    });
                }
            });
        }
    }

    // Funcție pentru a verifica dacă un apartament trebuie afișat conform filtrelor
    function shouldDisplayApartment(apartment) {
        const statusMatch = currentFilters.status === 'all' || 
            (currentFilters.status === 'available' && (apartment.disponibilitate === "" || apartment.disponibilitate === "DISPONIBIL")) ||
            (currentFilters.status === 'sold' && (apartment.disponibilitate === "VANDUT" || apartment.disponibilitate === "VANDUT/RE"));

        const roomsMatch = currentFilters.rooms === 'all' || 
            apartment.nrCam === parseInt(currentFilters.rooms);

        const corpMatch = currentFilters.corp === 'all' || 
            apartment.cladire === currentFilters.corp;

        const priceValid = apartment.pret && apartment.pret.standard > 0;

        return statusMatch && roomsMatch && corpMatch && priceValid;
    }

    // Event listeners pentru butoanele de filtrare
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterType = button.hasAttribute('data-status') ? 'status' : 'rooms';
            const filterValue = button.hasAttribute('data-status') ? 
                button.getAttribute('data-status') : 
                button.getAttribute('data-rooms');

            // Actualizează clasa active pentru butoanele din același grup
            const groupButtons = document.querySelectorAll(`[data-${filterType}]`);
            groupButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Actualizează filtrele curente
            currentFilters[filterType] = filterValue;

            // Reafișează apartamentele cu noile filtre
            displayApartments();
        });
    });

    // Aplică filtrele din URL și afișează apartamentele la încărcarea paginii
    applyUrlFilters();
    displayApartments();
}); 