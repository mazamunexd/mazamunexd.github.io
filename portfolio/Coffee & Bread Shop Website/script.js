        // Product data
        const products = [
            // Coffee
            { id: 1, name: 'Espresso', price: 3.50, category: 'coffee', icon: 'fas fa-mug-hot', rating: 4.8 },
            { id: 2, name: 'Cappuccino', price: 4.25, category: 'coffee', icon: 'fas fa-mug-hot', rating: 4.6 },
            { id: 3, name: 'Latte', price: 4.75, category: 'coffee', icon: 'fas fa-mug-hot', rating: 4.7 },
            { id: 4, name: 'Americano', price: 3.75, category: 'coffee', icon: 'fas fa-mug-hot', rating: 4.5 },
            
            // Milk Tea
            { id: 5, name: 'Classic Milk Tea', price: 4.50, category: 'milktea', icon: 'fas fa-glass-whiskey', rating: 4.9 },
            { id: 6, name: 'Taro Milk Tea', price: 5.25, category: 'milktea', icon: 'fas fa-glass-whiskey', rating: 4.7 },
            { id: 7, name: 'Matcha Milk Tea', price: 5.75, category: 'milktea', icon: 'fas fa-glass-whiskey', rating: 4.8 },
            { id: 8, name: 'Brown Sugar Boba', price: 6.00, category: 'milktea', icon: 'fas fa-glass-whiskey', rating: 4.9 },
            
            // Milkshake
            { id: 9, name: 'Chocolate Milkshake', price: 5.50, category: 'milkshake', icon: 'fas fa-wine-bottle', rating: 4.6 },
            { id: 10, name: 'Vanilla Milkshake', price: 5.25, category: 'milkshake', icon: 'fas fa-wine-bottle', rating: 4.5 },
            { id: 11, name: 'Strawberry Milkshake', price: 5.75, category: 'milkshake', icon: 'fas fa-wine-bottle', rating: 4.7 },
            { id: 12, name: 'Oreo Milkshake', price: 6.25, category: 'milkshake', icon: 'fas fa-wine-bottle', rating: 4.8 },
            
            // Bread
            { id: 13, name: 'Croissant', price: 3.25, category: 'bread', icon: 'fas fa-bread-slice', rating: 4.4 },
            { id: 14, name: 'Baguette', price: 2.75, category: 'bread', icon: 'fas fa-bread-slice', rating: 4.3 },
            { id: 15, name: 'Sourdough Bread', price: 4.50, category: 'bread', icon: 'fas fa-bread-slice', rating: 4.6 },
            { id: 16, name: 'Cinnamon Roll', price: 3.75, category: 'bread', icon: 'fas fa-bread-slice', rating: 4.7 }
        ];

        // Cart state
        let cart = [];
        let currentCategory = 'all';
        let searchQuery = '';

        // DOM Elements
        const productsGrid = document.getElementById('productsGrid');
        const cartIcon = document.getElementById('cartIcon');
        const cartSidebar = document.getElementById('cartSidebar');
        const cartOverlay = document.getElementById('cartOverlay');
        const closeCart = document.getElementById('closeCart');
        const cartItems = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');
        const totalPrice = document.getElementById('totalPrice');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const searchInput = document.getElementById('searchInput');
        const categoryBtns = document.querySelectorAll('.category-btn');
        const orderConfirmation = document.getElementById('orderConfirmation');

        // Initialize the app
        function init() {
            renderProducts();
            setupEventListeners();
        }

        // Render products based on current filters
        function renderProducts() {
            const filteredProducts = products.filter(product => {
                const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
                const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            });

            productsGrid.innerHTML = filteredProducts.map(product => `
                <div class="product-card">
                    <div class="product-image ${product.category}">
                        <i class="${product.icon}"></i>
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <span>${product.rating}</span>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <button class="add-to-cart" data-id="${product.id}">
                            <i class="fas fa-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');

            // Add event listeners to add-to-cart buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
                    addToCart(productId);
                });
            });
        }

        // Add item to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            updateCartUI();
            showCart();
        }

        // Remove item from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartUI();
        }

        // Update item quantity
        function updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                removeFromCart(productId);
                return;
            }

            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
                updateCartUI();
            }
        }

        // Update cart UI
        function updateCartUI() {
            // Update cart count
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;

            // Update cart items
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Your cart is empty</p>
                    </div>
                `;
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <i class="${item.icon}"></i>
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                            <div class="quantity-controls">
                                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            </div>
                        </div>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `).join('');

                // Add event listeners to cart item buttons
                document.querySelectorAll('.quantity-btn.minus').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const productId = parseInt(e.target.closest('.quantity-btn').dataset.id);
                        const item = cart.find(item => item.id === productId);
                        updateQuantity(productId, item.quantity - 1);
                    });
                });

                document.querySelectorAll('.quantity-btn.plus').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const productId = parseInt(e.target.closest('.quantity-btn').dataset.id);
                        const item = cart.find(item => item.id === productId);
                        updateQuantity(productId, item.quantity + 1);
                    });
                });

                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const productId = parseInt(e.target.closest('.remove-item').dataset.id);
                        removeFromCart(productId);
                    });
                });
            }

            // Update total price
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            totalPrice.textContent = `$${total.toFixed(2)}`;
        }

        // Show cart
        function showCart() {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
        }

        // Hide cart
        function hideCart() {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
        }

        // Place order
        function placeOrder() {
            if (cart.length === 0) return;

            // Show confirmation
            orderConfirmation.classList.add('active');
            
            // Reset cart
            cart = [];
            updateCartUI();
            
            // Hide cart
            setTimeout(() => {
                hideCart();
                orderConfirmation.classList.remove('active');
            }, 3000);
        }

        // Set up event listeners
        function setupEventListeners() {
            // Cart icon click
            cartIcon.addEventListener('click', showCart);
            
            // Close cart
            closeCart.addEventListener('click', hideCart);
            cartOverlay.addEventListener('click', hideCart);
            
            // Checkout button
            checkoutBtn.addEventListener('click', placeOrder);
            
            // Search input
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                renderProducts();
            });
            
            // Category buttons
            categoryBtns.forEach(button => {
                button.addEventListener('click', () => {
                    categoryBtns.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    currentCategory = button.dataset.category;
                    renderProducts();
                });
            });
        }

        // Initialize the app when DOM is loaded
        document.addEventListener('DOMContentLoaded', init);