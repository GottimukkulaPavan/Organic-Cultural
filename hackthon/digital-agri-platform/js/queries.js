/*
  Query Management Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('queries-list');
    const formCard = document.getElementById('query-form-card');
    const form = document.getElementById('query-form');
    const raiseBtn = document.getElementById('raise-query-btn');

    let queries = JSON.parse(localStorage.getItem('queries') || '[]');

    // Render Queries
    function renderQueries() {
        list.innerHTML = '';
        if (queries.length === 0) {
            list.innerHTML = `<div class="card text-center p-4">No queries found. Start by running one!</div>`;
            return;
        }

        queries.forEach(q => {
            const statusClass = q.status === 'Resolved' ? 'success' : 'warning';
            const statusIcon = q.status === 'Resolved' ? '✅' : '⏳';

            const card = document.createElement('div');
            card.className = 'card d-flex justify-between align-center mb-3';
            card.style.borderLeft = `5px solid var(--${statusClass})`;

            card.innerHTML = `
                <div>
                    <h3 style="margin-bottom: 0.5rem;">${q.subject}</h3>
                    <p class="text-muted" style="margin-bottom: 0.5rem;">${q.desc.substring(0, 100)}${q.desc.length > 100 ? '...' : ''}</p>
                    <div class="d-flex gap-2 text-muted" style="font-size: 0.85rem;">
                        <span>📂 ${q.category}</span>
                        <span>📅 ${new Date(q.date).toLocaleDateString()}</span>
                    </div>
                    ${q.response ? `<div style="background: var(--bg-color); padding: 0.5rem; margin-top: 0.5rem; border-radius: 4px;"><strong>Admin:</strong> ${q.response}</div>` : ''}
                </div>
                <div class="text-center" style="min-width: 100px;">
                    <div style="font-size: 1.5rem;">${statusIcon}</div>
                    <div style="font-weight: bold; color: var(--${statusClass});">${q.status}</div>
                </div>
            `;
            list.appendChild(card);
        });
    }

    // Toggle Form
    raiseBtn.addEventListener('click', () => {
        formCard.style.display = formCard.style.display === 'none' ? 'block' : 'none';
    });

    // Handle Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const newQuery = {
            id: Date.now(),
            subject: document.getElementById('query-subject').value,
            category: document.getElementById('query-category').value,
            desc: document.getElementById('query-desc').value,
            date: new Date().toISOString(),
            status: 'Pending',
            response: null
        };

        queries.unshift(newQuery);
        localStorage.setItem('queries', JSON.stringify(queries));

        renderQueries();
        form.reset();
        formCard.style.display = 'none';
        showNotification('Query raised successfully!', 'success');

        // Simulate Admin Response
        setTimeout(() => {
            const index = queries.findIndex(q => q.id === newQuery.id);
            if (index !== -1) {
                queries[index].status = 'Resolved';
                queries[index].response = "We have received your query. Our expert will contact you shortly.";
                localStorage.setItem('queries', JSON.stringify(queries));
                renderQueries();
                showNotification('New response to your query!', 'info');
            }
        }, 10000); // 10 seconds delay
    });

    renderQueries();
});
