/*
  Idea Submission Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    let ideas = JSON.parse(localStorage.getItem('ideas') || '[]');
    const grid = document.getElementById('ideas-grid');
    const modal = document.getElementById('idea-modal');
    const form = document.getElementById('idea-form');
    const addBtn = document.getElementById('add-idea-btn');
    const closeBtn = document.querySelector('#idea-modal .close-modal');

    // Render Ideas
    function renderIdeas() {
        grid.innerHTML = '';
        if (ideas.length === 0) {
            grid.innerHTML = '<p class="text-muted" style="grid-column: 1 / -1; text-align: center;">No ideas submitted yet. Be the first!</p>';
            return;
        }

        ideas.forEach(idea => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="d-flex justify-between align-center mb-2">
                    <span style="background: var(--primary-light); color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">${idea.category}</span>
                    <small class="text-muted">${new Date(idea.date).toLocaleDateString()}</small>
                </div>
                <h3>${idea.title}</h3>
                <p class="text-muted mt-2" style="min-height: 60px;">${idea.desc}</p>
                <div class="mt-3 d-flex gap-2 align-center">
                    <button class="btn btn-secondary" onclick="voteIdea(${idea.id})" style="padding: 0.25rem 0.75rem; font-size: 0.9rem;">👍 Like (${idea.votes || 0})</button>
                    <span class="text-muted" style="font-size: 0.8rem;">By Farmer</span>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Modal Handling
    addBtn.addEventListener('click', () => {
        form.reset();
        modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    window.onclick = (e) => {
        if (e.target == modal) {
            modal.classList.remove('active');
        }
    };

    // Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const newIdea = {
            id: Date.now(),
            title: document.getElementById('idea-title').value,
            category: document.getElementById('idea-category').value,
            desc: document.getElementById('idea-desc').value,
            date: new Date().toISOString(),
            votes: 0
        };

        ideas.unshift(newIdea);
        localStorage.setItem('ideas', JSON.stringify(ideas));

        renderIdeas();
        modal.classList.remove('active');
        showNotification('Idea submitted successfully!', 'success');
    });

    // Voting Logic
    window.voteIdea = (id) => {
        const idea = ideas.find(i => i.id === id);
        if (idea) {
            idea.votes = (idea.votes || 0) + 1;
            localStorage.setItem('ideas', JSON.stringify(ideas));
            renderIdeas();
            showNotification('Vote recorded!', 'success');
        }
    };

    renderIdeas();
});
