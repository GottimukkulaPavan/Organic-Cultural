/*
  Smart Crop Recommendation Logic
  Based on simple Indian agricultural data
*/

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recommendation-form');
    const resultsArea = document.getElementById('results-area');
    const outputGrid = document.getElementById('crop-suggestions');

    // Simple Knowledge Base
    // In a real app, this would be an API call or a more complex database
    const cropDB = [
        {
            names: ['Wheat (Gehu)', 'Mustard (Sarson)'],
            season: 'Rabi',
            soils: ['Alluvial', 'Loamy'],
            states: ['Punjab', 'Uttar Pradesh', 'Haryana', 'Madhya Pradesh'],
            duration: '120-140 days',
            water: 'Medium'
        },
        {
            names: ['Rice (Dhan)', 'Sugarcane (Ganna)'],
            season: 'Kharif',
            soils: ['Alluvial', 'Clayey'],
            states: ['Punjab', 'Uttar Pradesh', 'West Bengal', 'Tamil Nadu'],
            duration: '120-150 days',
            water: 'High'
        },
        {
            names: ['Cotton (Kapas)', 'Soybean'],
            season: 'Kharif',
            soils: ['Black'],
            states: ['Maharashtra', 'Gujarat', 'Madhya Pradesh'],
            duration: '150-180 days',
            water: 'Medium'
        },
        {
            names: ['Groundnut (Mungfali)', 'Ragi'],
            season: 'Kharif',
            soils: ['Red', 'Laterite'],
            states: ['Tamil Nadu', 'Karnataka', 'Andhra Pradesh'],
            duration: '100-120 days',
            water: 'Low'
        },
        {
            names: ['Watermelon (Tarbooj)', 'Cucumber (Kheera)'],
            season: 'Zaid',
            soils: ['Sandy', 'Riverbed'],
            states: ['Uttar Pradesh', 'Punjab', 'Haryana'],
            duration: '60-90 days',
            water: 'Medium'
        },
        {
            names: ['Jowar', 'Bajra'],
            season: 'Kharif',
            soils: ['Black', 'Red'],
            states: ['Maharashtra', 'Rajasthan', 'Karnataka'],
            duration: '90-110 days',
            water: 'Low'
        }
    ];

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const state = document.getElementById('state-select').value;
        const soil = document.getElementById('soil-select').value;
        const season = document.getElementById('season-select').value;

        if (!state || !soil || !season) {
            alert('Please select all fields');
            return;
        }

        // Logic: Find crops that match at least Season and Soil, prioritizing State if possible
        const suggestions = cropDB.filter(c =>
            c.season === season &&
            (c.soils.includes(soil) || c.states.includes(state))
        );

        displayResults(suggestions, state, soil, season);
    });

    function displayResults(data, state, soil, season) {
        outputGrid.innerHTML = '';
        resultsArea.classList.remove('d-none');

        if (data.length === 0) {
            outputGrid.innerHTML = `
                <div class="card" style="grid-column: 1 / -1; text-align: center;">
                    <h3>No specific match found for this combination.</h3>
                    <p>Try changing the soil type or season.</p>
                </div>
            `;
            return;
        }

        data.forEach(group => {
            group.names.forEach(cropName => {
                const card = document.createElement('div');
                card.className = 'card';
                card.style.borderTop = '4px solid var(--accent-color)';
                card.innerHTML = `
                    <h3>${cropName}</h3>
                    <div class="mt-2 text-muted">
                        <p><strong>Region:</strong> Best for ${state}</p>
                        <p><strong>Soil Suitability:</strong> ${soil} (Matches: ${group.soils.join(', ')})</p>
                        <p><strong>Duration:</strong> ${group.duration}</p>
                        <p><strong>Water Need:</strong> ${group.water}</p>
                    </div>
                    <button class="btn btn-primary mt-4" onclick="window.location.href='crops.html'">Add to My Crops</button>
               `;
                outputGrid.appendChild(card);
            });
        });

        // Smooth scroll to results
        resultsArea.scrollIntoView({ behavior: 'smooth' });
    }
});
