/* 
  Crop Management Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#crops-table tbody');
    const modal = document.getElementById('crop-modal');
    const form = document.getElementById('crop-form');
    const addBtn = document.getElementById('add-crop-btn');
    const closeModal = document.querySelector('.close-modal');
    const searchInput = document.getElementById('search-crop');
    const filterSeason = document.getElementById('filter-season');

    let crops = JSON.parse(localStorage.getItem('crops') || '[]');

    // Render Table
    function renderTable(data = crops) {
        tableBody.innerHTML = '';
        if (data.length === 0) {
            document.getElementById('no-data').classList.remove('d-none');
            return;
        }
        document.getElementById('no-data').classList.add('d-none');

        data.forEach((crop, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${crop.name}</td>
                <td><span style="background-color: var(--primary-light); color: white; padding: 2px 8px; border-radius: 4px;">${crop.season}</span></td>
                <td>${crop.sowingDate}</td>
                <td>${crop.harvestDate}</td>
                <td>${crop.fertilizer}</td>
                <td>
                    <button class="btn btn-secondary" onclick="editCrop(${index})" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;">✏️</button>
                    <button class="btn btn-primary" onclick="deleteCrop(${index})" style="padding: 0.25rem 0.5rem; font-size: 0.8rem; background-color: var(--error);">🗑️</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // Modal Handling
    addBtn.addEventListener('click', () => {
        document.getElementById('modal-title').textContent = 'Add New Crop';
        form.reset();
        document.getElementById('edit-id').value = '';
        modal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
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

        const id = document.getElementById('edit-id').value;
        const newCrop = {
            id: id ? id : Date.now(),
            name: document.getElementById('crop-name').value,
            season: document.getElementById('crop-season').value,
            sowingDate: document.getElementById('sowing-date').value,
            harvestDate: document.getElementById('harvest-date').value,
            fertilizer: document.getElementById('fertilizer').value
        };

        if (id) {
            crops[parseInt(id)] = newCrop; // Using index for simplicity in this demo
            showNotification('Crop updated successfully!', 'success');
        } else {
            crops.push(newCrop);
            showNotification('Crop added successfully!', 'success');
        }

        localStorage.setItem('crops', JSON.stringify(crops));
        renderTable();
        modal.classList.remove('active');
    });

    // Edit Function
    window.editCrop = (index) => {
        const crop = crops[index];
        document.getElementById('modal-title').textContent = 'Edit Crop';
        document.getElementById('edit-id').value = index;
        document.getElementById('crop-name').value = crop.name;
        document.getElementById('crop-season').value = crop.season;
        document.getElementById('sowing-date').value = crop.sowingDate;
        document.getElementById('harvest-date').value = crop.harvestDate;
        document.getElementById('fertilizer').value = crop.fertilizer;
        modal.classList.add('active');
    };

    // Delete Function
    window.deleteCrop = (index) => {
        if (confirm('Are you sure you want to delete this crop?')) {
            crops.splice(index, 1);
            localStorage.setItem('crops', JSON.stringify(crops));
            renderTable();
            showNotification('Crop deleted', 'warning');
        }
    };

    // Filters
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = crops.filter(c => c.name.toLowerCase().includes(term));
        renderTable(filtered);
    });

    filterSeason.addEventListener('change', (e) => {
        const season = e.target.value;
        if (!season) {
            renderTable(crops);
        } else {
            const filtered = crops.filter(c => c.season === season);
            renderTable(filtered);
        }
    });

    // CSV Export
    window.exportCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Name,Season,Sowing Date,Harvest Date,Fertilizer\n";

        crops.forEach(row => {
            csvContent += `${row.name},${row.season},${row.sowingDate},${row.harvestDate},${row.fertilizer}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_crops.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Initial Render
    renderTable();
});
