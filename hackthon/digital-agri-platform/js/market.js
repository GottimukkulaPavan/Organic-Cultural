/*
  Marketplace Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    const marketGrid = document.getElementById('market-grid');
    const sellModal = document.getElementById('sell-modal');
    const closeSellModal = document.querySelector('#sell-modal .close-modal');
    const sellForm = document.getElementById('sell-form');
    const cartCount = document.getElementById('cart-count');

    // Seed initial data if empty
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify([
            { id: 1, name: 'Fresh Tomatoes', qty: '100 kg', price: '$1.50/kg', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500', seller: 'Farmer John' },
            { id: 2, name: 'Organic Potatoes', qty: '200 kg', price: '$0.80/kg', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500', seller: 'Green Earth Farm' },
            { id: 3, name: 'Sweet Corn', qty: '500 pcs', price: '$0.50/pc', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500', seller: 'Valley Agro' }
        ]));
    }

    let products = JSON.parse(localStorage.getItem('products') || '[]');
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    function renderProducts() {
        marketGrid.innerHTML = '';
        products.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'card product-card';

            // Use placeholder if image fails or missing
            const imgUrl = prod.img || 'https://via.placeholder.com/300x200?text=Fresh+Produce';

            card.innerHTML = `
                <div style="margin: -1.5rem -1.5rem 1rem -1.5rem;">
                    <img src="${imgUrl}" alt="${prod.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px 12px 0 0;">
                </div>
                <div>
                    <div class="d-flex justify-between align-center mb-2">
                        <h3 style="margin: 0;">${prod.name}</h3>
                        <span style="font-weight: bold; color: var(--primary-color); font-size: 1.1rem;">${prod.price}</span>
                    </div>
                    <p class="text-muted mb-1">Quantity: ${prod.qty}</p>
                    <p class="text-muted" style="font-size: 0.85rem;">Seller: ${prod.seller}</p>
                </div>
                <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" onclick="addToCart(${prod.id})">Add to Cart</button>
            `;
            marketGrid.appendChild(card);
        });
    }

    // Sell Logic
    window.showSellModal = () => sellModal.classList.add('active');
    window.hideSellModal = () => sellModal.classList.remove('active');

    sellForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newProd = {
            id: Date.now(),
            name: document.getElementById('prod-name').value,
            qty: document.getElementById('prod-qty').value,
            price: document.getElementById('prod-price').value,
            img: document.getElementById('prod-img').value,
            seller: 'Me' // In a real app, this would be the logged-in user
        };

        products.unshift(newProd);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
        hideSellModal();
        showNotification('Item listed for sale!', 'success');
        e.target.reset();
    });

    // Cart Logic
    window.addToCart = (id) => {
        const prod = products.find(p => p.id === id);
        if (prod) {
            cart.push(prod);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showNotification(`${prod.name} added to cart!`, 'success');
        }
    };

    updateCartCount();
    renderProducts();
});
