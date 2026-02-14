/*
  Admin Panel Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    window.showTab = (tab) => {
        const content = document.getElementById('admin-content');
        content.innerHTML = '';

        if (tab === 'users') {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.length === 0) {
                content.innerHTML = '<p class="text-muted">No users registered.</p>';
                return;
            }

            let html = `
                <h3>Registered Farmers</h3>
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Location</th>
                                <th>Farm Size</th>
                                <th>Joined</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            users.forEach(u => {
                html += `
                    <tr>
                        <td>${u.name}</td>
                        <td>${u.email}</td>
                        <td>${u.location}</td>
                        <td>${u.farmSize} Acres</td>
                        <td>${new Date(u.joined).toLocaleDateString()}</td>
                    </tr>
                `;
            });
            html += `</tbody></table></div>`;
            content.innerHTML = html;

        } else if (tab === 'queries') {
            const queries = JSON.parse(localStorage.getItem('queries') || '[]');
            if (queries.length === 0) {
                content.innerHTML = '<p class="text-muted">No queries available.</p>';
                return;
            }

            let html = `
                <h3>Farmer Queries</h3>
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            queries.forEach(q => {
                const statusClass = q.status === 'Resolved' ? 'success' : 'warning';
                html += `
                    <tr>
                        <td>${q.subject}</td>
                        <td>${q.category}</td>
                        <td><span style="color: var(--${statusClass}); font-weight: bold;">${q.status}</span></td>
                        <td>${new Date(q.date).toLocaleDateString()}</td>
                    </tr>
                `;
            });
            html += `</tbody></table></div>`;
            content.innerHTML = html;

        } else if (tab === 'ideas') {
            const ideas = JSON.parse(localStorage.getItem('ideas') || '[]');
            if (ideas.length === 0) {
                content.innerHTML = '<p class="text-muted">No ideas submitted yet.</p>';
                return;
            }

            let html = `
                <h3>Submitted Ideas</h3>
                <div class="grid grid-2">
            `;
            ideas.forEach(i => {
                html += `
                    <div class="card">
                        <h4>${i.title}</h4>
                        <span style="font-size: 0.85rem; background: var(--border-color); padding: 2px 6px; border-radius: 4px;">${i.category}</span>
                        <p class="mt-2 text-muted">${i.desc}</p>
                    </div>
                `;
            });
            html += `</div>`;
            content.innerHTML = html;
        }
    };

    // Default Tab
    showTab('users');
});
