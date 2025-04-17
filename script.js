document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const skillInput = document.getElementById('skill');
    const portfolioInput = document.getElementById('portfolio');
    
    
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        clearErrors();
        
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'name-error', 'Please enter your name');
            isValid = false;
        }
        
        // Validate email 
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'email-error', 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'email-error', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate skill
        if (skillInput.value === '' || skillInput.value === null) {
            showError(skillInput, 'skill-error', 'Please select a skill category');
            isValid = false;
        }
        
        if (portfolioInput.value.trim() === '') {
            showError(portfolioInput, 'portfolio-error', 'Please enter your portfolio URL');
            isValid = false;
        } else if (!isValidURL(portfolioInput.value)) {
            showError(portfolioInput, 'portfolio-error', 'Please enter a valid URL (e.g., https://example.com)');
            isValid = false;
        }
        
        if (isValid) {
            showSuccessMessage();
        }
    });
    
    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim() !== '') {
            clearError('name-error');
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() !== '') {
            if (isValidEmail(emailInput.value)) {
                clearError('email-error');
            }
        }
    });
    
    skillInput.addEventListener('change', function() {
        if (skillInput.value !== '') {
            clearError('skill-error');
        }
    });
    
    portfolioInput.addEventListener('input', function() {
        if (portfolioInput.value.trim() === '') {
            showError(portfolioInput, 'portfolio-error', 'Please enter your portfolio URL');
        } else if (isValidURL(portfolioInput.value)) {
            clearError('portfolio-error');
        } else {
            showError(portfolioInput, 'portfolio-error', 'Please enter a valid URL (e.g., https://example.com)');
        }
    });
    
    function showError(input, errorId, message) {
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = message;
        errorElement.classList.add('active');
        input.classList.add('error');
    }
    
    function clearError(errorId) {
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = '';
        errorElement.classList.remove('active');
        
        const inputId = errorId.replace('-error', '');
        const input = document.getElementById(inputId);
        if (input) {
            input.classList.remove('error');
        }
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.classList.remove('active');
        });
        
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.classList.remove('error');
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `
            <div class="success-icon">✓</div>
            <h2>Sign Up Successful!</h2>
            <p>Thank you for joining GigFloww. We'll be in touch soon.</p>
        `;

        const formContainer = document.querySelector('.form-container');
        formContainer.innerHTML = '';
        formContainer.appendChild(successMessage);
        
        const style = document.createElement('style');
        style.textContent = `
            .success-message {
                text-align: center;
                padding: 30px 0;
                animation: fadeIn 0.5s ease;
            }
            
            .success-icon {
                width: 80px;
                height: 80px;
                background-color: #4CAF50;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 40px;
                margin: 0 auto 20px;
                animation: scaleIn 0.5s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes scaleIn {
                from { transform: scale(0); }
                to { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
});
