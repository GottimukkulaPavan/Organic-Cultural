/* 
  Authentication Logic
  Handles Login and Registration
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- Login Form ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simple validation
            if (!email || !password) {
                showNotification('Please fill all fields', 'error');
                return;
            }

            // Check against stored users
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                showNotification('Login successful! Redirecting...', 'success');
                setTimeout(() => window.location.href = 'dashboard.html', 1500);
            } else {
                showNotification('Invalid email or password', 'error');
            }
        });
    }

    // --- Registration Form ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Registration submitted');

            try {
                // Get form data
                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const passwordInput = document.getElementById('password');
                const confirmInput = document.getElementById('confirm-password');
                const mobileInput = document.getElementById('mobile');
                const locationInput = document.getElementById('location');
                const farmSizeInput = document.getElementById('farm-size');

                if (!nameInput || !emailInput || !passwordInput || !confirmInput) {
                    console.error('Missing input elements');
                    alert('Error: Some form fields are missing in the HTML.');
                    return;
                }

                const name = nameInput.value;
                const email = emailInput.value;
                const password = passwordInput.value;
                const confirmPassword = confirmInput.value;
                const mobile = mobileInput ? mobileInput.value : '';
                const location = locationInput ? locationInput.value : '';
                const farmSize = farmSizeInput ? farmSizeInput.value : '';

                // Validation
                if (password !== confirmPassword) {
                    showNotification('Passwords do not match', 'error');
                    return;
                }

                if (password.length < 6) {
                    showNotification('Password must be at least 6 characters', 'error');
                    return;
                }

                // Check existing user
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                if (users.find(u => u.email === email)) {
                    showNotification('Email already registered', 'error');
                    return;
                }

                // Save user
                const newUser = { name, email, password, mobile, location, farmSize, joined: new Date().toISOString() };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                console.log('User registered:', newUser);
                showNotification('Registration successful! Please login.', 'success');

                // Redirect
                setTimeout(() => window.location.href = 'login.html', 2000);

            } catch (err) {
                console.error('Registration error:', err);
                alert('An error occurred during registration. Check console for details.');
            }
        });
    }
});
