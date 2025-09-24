document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');

    const fields = ['fullName', 'email', 'password', 'confirmPassword', 'dob', 'country', 'terms', 'gender'];

    // Function to check if all required fields are valid
    const validateForm = () => {
        let isFormValid = true;
        
        // Check text/select inputs
        fields.forEach(fieldId => {
            const input = document.getElementById(fieldId);
            if (input && input.required && !input.checkValidity()) {
                isFormValid = false;
            }
        });

        // Check password confirmation
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        if (passwordInput.value !== confirmPasswordInput.value) {
            isFormValid = false;
        }

        // Check gender radio buttons
        const genderRadios = form.querySelectorAll('input[name="gender"]');
        const isGenderSelected = Array.from(genderRadios).some(radio => radio.checked);
        if (!isGenderSelected) {
            isFormValid = false;
        }

        // Check terms checkbox
        const termsCheckbox = document.getElementById('terms');
        if (!termsCheckbox.checked) {
            isFormValid = false;
        }

        submitBtn.disabled = !isFormValid;
    };

    // Function to show an error message
    const showError = (input, message) => {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('invalid');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    };

    // Function to clear an error message
    const clearError = (input) => {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('invalid');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    };

    // Validation for specific fields
    const validateField = (input) => {
        if (input.type === 'text' || input.type === 'email' || input.type === 'password' || input.tagName === 'SELECT') {
            if (input.validity.valueMissing) {
                showError(input, 'This field is required.');
                return false;
            }
        }

        if (input.id === 'email') {
            if (!input.validity.valid) {
                showError(input, 'Please enter a valid email address.');
                return false;
            }
        }

        if (input.id === 'dob') {
            const today = new Date();
            const dob = new Date(input.value);
            if (dob > today) {
                showError(input, 'Date of birth cannot be in the future.');
                return false;
            }
        }

        if (input.id === 'password') {
            const password = input.value;
            let message = '';
            if (password.length < 8) {
                message = 'Password must be at least 8 characters long.';
            } else if (!/[A-Z]/.test(password)) {
                message = 'Password must contain at least one uppercase letter.';
            } else if (!/[a-z]/.test(password)) {
                message = 'Password must contain at least one lowercase letter.';
            } else if (!/[0-9]/.test(password)) {
                message = 'Password must contain at least one number.';
            } else if (!/[^A-Za-z0-9]/.test(password)) {
                message = 'Password must contain at least one special character.';
            }
            if (message) {
                showError(input, message);
                return false;
            }
        }

        if (input.id === 'confirmPassword') {
            const password = document.getElementById('password').value;
            if (input.value !== password) {
                showError(input, 'Passwords do not match.');
                return false;
            }
        }
        
        clearError(input);
        return true;
    };

    // Handle password strength visualization
    const passwordStrength = (password) => {
        const strengthBar = document.getElementById('strength-bar');
        let strength = 0;
        if (password.length > 7) strength++;
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        strengthBar.className = ''; // Clear all classes
        if (password.length === 0) {
            strengthBar.style.width = '0%';
        } else if (strength <= 1) {
            strengthBar.classList.add('weak');
        } else if (strength <= 3) {
            strengthBar.classList.add('medium');
        } else {
            strengthBar.classList.add('strong');
        }
    };

    // Event listeners for real-time validation
    fields.forEach(fieldId => {
        const input = document.getElementById(fieldId);
        if (input) {
            input.addEventListener('input', () => {
                validateField(input);
                if (fieldId === 'password') {
                    passwordStrength(input.value);
                }
                validateForm();
            });
            input.addEventListener('change', () => {
                validateField(input);
                validateForm();
            });
        }
    });

    // Handle radio button validation dynamically
    const genderRadios = form.querySelectorAll('input[name="gender"]');
    genderRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const isGenderSelected = Array.from(genderRadios).some(r => r.checked);
            const radioGroup = document.querySelector('.radio-group');
            if (isGenderSelected) {
                radioGroup.classList.remove('invalid');
                radioGroup.querySelector('.error-message').style.display = 'none';
            } else {
                radioGroup.classList.add('invalid');
                radioGroup.querySelector('.error-message').style.display = 'block';
            }
            validateForm();
        });
    });

    // Initial check on page load
    validateForm();

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Final validation before submission
        let formIsValid = true;
        fields.forEach(fieldId => {
            const input = document.getElementById(fieldId);
            if (input && !validateField(input)) {
                formIsValid = false;
            }
        });
        
        // Special checks for non-input elements
        const genderRadios = form.querySelectorAll('input[name="gender"]');
        const isGenderSelected = Array.from(genderRadios).some(radio => radio.checked);
        if (!isGenderSelected) {
            formIsValid = false;
            showError(document.querySelector('.radio-group'), 'Please select a gender.');
        } else {
            clearError(document.querySelector('.radio-group input'));
        }

        const termsCheckbox = document.getElementById('terms');
        if (!termsCheckbox.checked) {
            formIsValid = false;
            showError(termsCheckbox, 'You must agree to the terms.');
        } else {
            clearError(termsCheckbox);
        }

        if (formIsValid) {
            alert('Form submitted successfully!');
            // You can add your AJAX submission code here
            // e.g., fetch('/api/register', { method: 'POST', body: new FormData(form) });
        } else {
            alert('Please fix the errors in the form.');
        }
    });
});