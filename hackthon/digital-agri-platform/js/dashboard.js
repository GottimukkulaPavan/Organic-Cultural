/* 
  Dashboard Specific Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Update User Info
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.name) {
        document.getElementById('user-name-display').textContent = user.name.split(' ')[0];
        document.getElementById('user-location').textContent = user.location || 'Unknown';
    }

    // 2. Update Stats
    const crops = JSON.parse(localStorage.getItem('crops') || '[]');
    const queries = JSON.parse(localStorage.getItem('queries') || '[]');
    const marketItems = JSON.parse(localStorage.getItem('products') || '[]');

    document.getElementById('active-crops-count').textContent = crops.length;
    document.getElementById('pending-queries-count').textContent = queries.filter(q => q.status === 'Pending').length;
    document.getElementById('market-listings-count').textContent = marketItems.length;

    // 3. Initialize Chart
    const ctx = document.getElementById('yieldChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Wheat Field Yield (Quintals)',
                data: [45, 48, 42, 50, 55],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                tension: 0.4
            }, {
                label: 'Rice Field Yield (Quintals)',
                data: [40, 42, 38, 45, 48],
                borderColor: '#FFC107',
                backgroundColor: 'rgba(255, 193, 7, 0.2)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            }
        }
    });

    // 4. Activity Simulation
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';
    const activities = [
        `Logged in from ${user.location || 'New Device'}`,
        'Checked weather forecast',
        'Updated market prices'
    ];

    // Check if added crop recently
    if (crops.length > 0) {
        activities.unshift(`Added crop record: ${crops[crops.length - 1].name}`);
    }

    activities.slice(0, 5).forEach(act => {
        const li = document.createElement('li');
        li.style.padding = '0.75rem 0';
        li.style.borderBottom = '1px solid var(--border-color)';
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.innerHTML = `<span style="margin-right: 0.5rem; color: var(--primary-color);">●</span> ${act}`;
        activityList.appendChild(li);
    });
});
