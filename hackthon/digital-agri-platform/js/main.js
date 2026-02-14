/* 
  Common Logic for AgriConnect
  Handles Theme, Navigation, Notifications, and Auth Checks
*/

// --- Theme Management ---
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.innerText = savedTheme === 'dark' ? '☀️' : '🌙';
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Sidebar Toggle
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // Check Auth for protected pages
    const protectedPages = ['dashboard.html', 'crops.html', 'market.html', 'ideas.html', 'queries.html', 'schemes.html', 'admin.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (protectedPages.includes(currentPage)) {
        const user = localStorage.getItem('currentUser');
        if (!user) {
            window.location.href = 'login.html';
        } else {
            // Update UI with user info if available
            const userData = JSON.parse(user);
            const userNameDisplay = document.getElementById('user-name-display');
            if (userNameDisplay) userNameDisplay.textContent = userData.name;
        }
    }
});

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const btn = document.getElementById('theme-toggle');
    if (btn) btn.innerText = newTheme === 'dark' ? '☀️' : '🌙';
}

// --- Notification System ---
// --- Notification System ---
function showNotification(message, type = 'success') {
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'notification-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span style="font-size: 1.2rem; margin-right: 10px;">${type === 'success' ? '✅' : '⚠️'}</span>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="margin-left: auto; background: none; border: none; font-size: 1.2rem; cursor: pointer;">&times;</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// --- Simulation Logic ---
// Generate dummy data if not exists
if (!localStorage.getItem('crops')) {
    localStorage.setItem('crops', JSON.stringify([
        { id: 1, name: 'Wheat', season: 'Rabi', sowingDate: '2025-11-15', harvestDate: '2026-04-10', fertilizer: 'NPK 14-35-14' },
        { id: 2, name: 'Rice', season: 'Kharif', sowingDate: '2025-06-20', harvestDate: '2025-10-25', fertilizer: 'Urea' }
    ]));
}

if (!localStorage.getItem('queries')) {
    localStorage.setItem('queries', JSON.stringify([
        { id: 1, title: 'Yellow rust on wheat', status: 'Resolved', date: '2026-01-15' },
        { id: 2, title: 'Best fertilizer for cotton?', status: 'Pending', date: '2026-02-10' }
    ]));
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Offline Detection
window.addEventListener('online', () => showNotification('You are back online!', 'success'));
window.addEventListener('offline', () => showNotification('You are currently offline. Changes may not be saved.', 'error'));
