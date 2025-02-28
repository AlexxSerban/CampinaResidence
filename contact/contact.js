document.addEventListener('DOMContentLoaded', function() {
    // Inițializare EmailJS
    emailjs.init("G4jMGHU0Iqn6vLlUA");

    // Form animation
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (input) {
            input.addEventListener('focus', () => {
                group.classList.add('active');
            });
            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('active');
                }
            });
        }
    });

    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Dezactivăm butonul inițial
    submitBtn.disabled = true;

    // Form validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    let formIsValid = false;

    function validateForm() {
        let isValid = true;
        const formData = {};

        inputs.forEach(input => {
            const field = validateField(input);
            isValid = isValid && field.isValid;
            formData[input.id] = field.value;
        });

        // Actualizăm starea butonului
        submitBtn.disabled = !isValid;
        formIsValid = isValid;
        return { isValid, formData };
    }

    function validateField(field) {
        const formGroup = field.closest('.form-group');
        let isValid = true;
        let errorMessage = '';

        // Șterge mesajele de eroare existente
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Validare câmp gol
        if (!field.value.trim()) {
            isValid = false;
            errorMessage = 'Acest câmp este obligatoriu';
        }
        // Validare email
        else if (field.type === 'email' && !isValidEmail(field.value)) {
            isValid = false;
            errorMessage = 'Vă rugăm să introduceți o adresă de email validă';
        }
        // Validare telefon
        else if (field.id === 'phone' && !isValidPhone(field.value)) {
            isValid = false;
            errorMessage = 'Vă rugăm să introduceți un număr de telefon valid';
        }

        // Actualizare clase și mesaje de eroare
        if (!isValid) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            showError(field, errorMessage);
        } else {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
        }

        return {
            isValid: isValid,
            value: field.value.trim()
        };
    }

    // Adăugăm event listeners pentru validare în timp real
    inputs.forEach(input => {
        ['input', 'blur'].forEach(eventType => {
            input.addEventListener(eventType, () => {
                validateForm();
            });
        });
    });

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Verificăm din nou validarea înainte de trimitere
            const { isValid, formData } = validateForm();
            
            if (!isValid) {
                showNotification('Vă rugăm să completați toate câmpurile corect.', 'error');
                return;
            }

            // Disable submit button and show loading state
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Se trimite...';

            // Prepare data for EmailJS
            const emailData = {
                nume_prenume: formData.name,
                email: formData.email,
                telefon: formData.phone,
                subiect: formData.subject,
                mesaj: formData.message,
                to_email: 'campinaresidence2025@gmail.com'
            };

            // Send email using EmailJS
            emailjs.send('service_qlh7nbc', 'template_ht1l0h5', emailData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showNotification('Mesajul a fost trimis cu succes! Vă vom contacta în curând.', 'success');
                    contactForm.reset();
                    // Resetăm starea formularului după trimitere
                    inputs.forEach(input => {
                        input.closest('.form-group').classList.remove('success');
                    });
                    submitBtn.disabled = true;
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    showNotification('A apărut o eroare. Vă rugăm să încercați din nou.', 'error');
                })
                .finally(function() {
                    submitBtn.textContent = originalText;
                    // Butonul rămâne dezactivat după reset până când formularul este din nou valid
                });
        });
    }

    // Initialize map if needed
    initMap();
});

// Initialize the map (using a placeholder for demonstration)
function initMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Placeholder for map initialization
        mapElement.innerHTML = '<p style="text-align: center; padding-top: 180px;">Map Placeholder</p>';
    }
}

// Initialize EmailJS
(function() {
    // Add your EmailJS public key here
    emailjs.init("YOUR_PUBLIC_KEY");
})();

// Notification system
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add notification styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '8px';
    notification.style.color = '#fff';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideIn 0.5s ease-out';

    if (type === 'success') {
        notification.style.backgroundColor = '#10B981';
    } else {
        notification.style.backgroundColor = '#EF4444';
    }

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Add to document
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/.test(phone);
}

function showError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#EF4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '4px';
    formGroup.appendChild(errorDiv);
} 