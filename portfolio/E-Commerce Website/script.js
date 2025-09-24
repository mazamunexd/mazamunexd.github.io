// Product data with 1000+ items
const products = [
    // Electronics
    ...Array.from({length: 150}, (_, i) => ({
        id: i + 1,
        name: `Smartphone Model ${i + 1}`,
        category: 'electronics',
        price: Math.floor(Math.random() * 800) + 200,
        rating: (Math.random() * 2 + 3).toFixed(1),
        icon: 'fas fa-mobile-alt'
    })),
    ...Array.from({length: 100}, (_, i) => ({
        id: i + 151,
        name: `Laptop Pro ${i + 1}`,
        category: 'electronics',
        price: Math.floor(Math.random() * 1500) + 500,
        rating: (Math.random() * 2 + 3).toFixed(1),
        icon: 'fas fa-laptop'
    })),
    ...Array.from({length: 80}, (_, i) => ({
        id: i + 251,
        name: `Wireless Headphones ${i + 1}`,
        category: 'electronics',
        price: Math.floor(Math.random() * 300) + 50,
        rating: (Math.random() * 2 + 3).toFixed(1),
        icon: 'fas fa-headphones'
    })),
    
    // Clothing
    ...Array.from({length: 120}, (_, i) => ({
        id: i + 331,
        name: `Premium T-Shirt ${i + 1}`,
        category: 'clothing',
        price: Math.floor(Math.random() * 50) + 15,
        rating: (Math.random() * 2 + 3).toFixed(1),
        icon: 'fas fa-tshirt'
    })),
    ...Array.from({length: 100}, (_, i) => ({
        id: i + 451,
        name: `Designer Jeans ${i + 1}`,
        category: 'clothing',
        price: Math.floor(Math.random() * 100) + 40,
        rating: (Math.random() * 2 + 3).toFixed(1),
        icon: 'fas fa-user-tie'
    })),
    ...Array.from({length: 80}, (_, i) => ({
        id: i + 551,
        name: `Winter Jacket ${i + 1}`,
        category: 'clothing',
        price: Math.floor(Math.random() * 200) + 80,
        rating: (Math.random() * 2 + 3).toFixed(1),
        icon: 'fas fa-user-tie'
    })),
    
    // Accessories
    ...Array.from({length: 90}, (_, i) => ({
        id: i + 631,
        name: `Smart Watch ${i + 1}`,
        category: 'accessories',
        price: Math.floor(Math.random() * 400) + 100,
        rating: (Math.random() * 2 + 3).toFixed(1),
        icon: 'fas fa-clock'
    })),
    ...Array.from({length: 70}, (_, i) => ({
        id: i + 721,
        name: `Designer Sunglasses ${i + 1}`,
        category: 'accessories',
        price: Math.floor(Math.random() * 150) + 30,
        rating: (Math.random() * 2 + 3).toFixed(1),
        icon: 'fas fa-glasses'
    })),
    ...Array.from({length: 60}, (_, i) => ({
        id: i + 791,
        name: `Leather Wallet ${i + 1}`,
        category: 'accessories',
        price: Math.floor(Math.random() * 80) + 20,
        rating: (Math.random() * 2 + 3).toFixed(1),
        icon: 'fas fa-wallet'
    })),
    
    // Home & Garden
    ...Array.from({length: 80}, (_, i) => ({
        id: i + 851,
        name: `Home Decor Item ${i + 1}`,
        category: 'home',
        price: Math.floor(Math.random() * 100) + 25,
        rating: (Math.random() * 2 + 3).toFixed(1),
        icon: 'fas fa-home'
    })),
    ...Array.from({length: 60}, (_, i) => ({
        id: i + 931,
        name: `Garden Tool ${i + 1}`,
        category: 'home',
        price: Math.floor(Math.random() * 60) + 15,
        rating: (Math.random() * 2 + 3).toFixed(1),
        icon: 'fas fa-seedling'
    })),
    
    // Books
    ...Array.from({length: 70}, (_, i) => ({
        id: i + 991,
        name: `Bestseller Book ${i + 1}`,
        category: 'books',
        price: Math.floor(Math.random() * 30) + 10,
        rating: (Math.random() * 2 + 3).toFixed(1),
        icon: 'fas fa-book'
    })),
    
    // Sports
    ...Array.from({length: 60}, (_, i) => ({
        id: i + 1061,
        name: `Sports Equipment ${i + 1}`,
        category: 'sports',
        price: Math.floor(Math.random() * 200) + 30,
        rating: (Math.random() * 2 + 3).toFixed(1),
        icon: 'fas fa-dumbbell'
    })),
    
    // Beauty
    ...Array.from({length: 50}, (_, i) => ({
        id: i + 1121,
        name: `Beauty Product ${i + 1}`,
        category: 'beauty',
        price: Math.floor(Math.random() * 80) + 15,
        rating: (Math.random() * 2 + 3).toFixed(1),
        icon: 'fas fa-spa'
    })),
    
    // Toys
    ...Array.from({length: 40}, (_, i) => ({
        id: i + 1171,
        name: `Educational Toy ${i + 1}`,
        category: 'toys',
        price: Math.floor(Math.random() * 60) + 10,
        rating: (Math.random() * 2 + 3).toFixed(1),
        icon: 'fas fa-puzzle-piece'
    }))
];

// Application state
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let filteredProducts = [...products];
let currentPage = 1;
const itemsPerPage = 20;

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const priceFilter = document.getElementById('priceFilter');
const checkoutModal = document.getElementById('checkoutModal');
const successModal = document.getElementById('successModal');
const overlay = document.getElementById('overlay');
const loadingSpinner = document.getElementById('loadingSpinner');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    displayProducts();
    updateCartUI();
});

function initializeApp() {
    // Show loading spinner initially
    showLoadingSpinner();
    
    // Simulate loading time
    setTimeout(() => {
        hideLoadingSpinner();
        displayProducts();
    }, 1000);
}

function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    
    // Filter functionality
    categoryFilter.addEventListener('change', handleFilters);
    sortFilter.addEventListener('change', handleFilters);
    priceFilter.addEventListener('change', handleFilters);
    
    // Navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            categoryFilter.value = category;
            handleFilters();
        });
    });
    
    // Cart functionality
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', closeCart);
    document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
    
    // Checkout functionality
    document.getElementById('cancelCheckout').addEventListener('click', closeCheckout);
    document.getElementById('completeOrder').addEventListener('click', completeOrder);
    document.getElementById('continueShopping').addEventListener('click', continueShopping);
    
    // Form validation
    setupFormValidation();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Close modals when clicking overlay
    overlay.addEventListener('click', closeAllModals);
    
    // Infinite scroll
    window.addEventListener('scroll', handleScroll);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    applyFilters();
    displayProducts();
    
    // Show search results count
    showToast(`Found ${filteredProducts.length} products`, 'info');
}

function handleFilters() {
    const category = categoryFilter.value;
    const sort = sortFilter.value;
    const priceRange = priceFilter.value;
    
    // Start with all products or search results
    let filtered = searchInput.value.trim() === '' ? [...products] : 
        products.filter(product =>
            product.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            product.category.toLowerCase().includes(searchInput.value.toLowerCase())
        );
    
    // Apply category filter
    if (category) {
        filtered = filtered.filter(product => product.category === category);
    }
    
    // Apply price filter
    if (priceRange) {
        const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
        filtered = filtered.filter(product => {
            if (max) {
                return product.price >= parseInt(min) && product.price <= parseInt(max);
            } else {
                return product.price >= parseInt(min);
            }
        });
    }
    
    // Apply sorting
    switch (sort) {
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    filteredProducts = filtered;
    currentPage = 1;
    displayProducts();
}

function applyFilters() {
    handleFilters();
}

function displayProducts() {
    showLoadingSpinner();
    
    setTimeout(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const productsToShow = filteredProducts.slice(0, endIndex);
        
        if (currentPage === 1) {
            productsGrid.innerHTML = '';
        }
        
        if (productsToShow.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: white;">
                    <i class="fas fa-search" style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            `;
            hideLoadingSpinner();
            return;
        }
        
        const newProducts = filteredProducts.slice(startIndex, endIndex);
        
        newProducts.forEach((product, index) => {
            const productCard = createProductCard(product);
            productCard.style.animationDelay = `${index * 0.1}s`;
            productsGrid.appendChild(productCard);
        });
        
        hideLoadingSpinner();
    }, 500);
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.icon}"></i>
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-category">${product.category}</p>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="rating-text">(${product.rating})</span>
            </div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-actions">
                ${getProductActions(product)}
            </div>
        </div>
    `;
    
    setupProductCardEvents(card, product);
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function getProductActions(product) {
    const cartItem = cart.find(item => item.id === product.id);
    
    if (cartItem) {
        return `
            <div class="quantity-controls">
                <button class="quantity-btn decrease-btn" data-id="${product.id}">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity-display">${cartItem.quantity}</span>
                <button class="quantity-btn increase-btn" data-id="${product.id}">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `;
    } else {
        return `
            <button class="add-to-cart-btn" data-id="${product.id}">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        `;
    }
}

function setupProductCardEvents(card, product) {
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    const increaseBtn = card.querySelector('.increase-btn');
    const decreaseBtn = card.querySelector('.decrease-btn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => addToCart(product));
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => increaseQuantity(product.id));
    }
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => decreaseQuantity(product.id));
    }
    
    // Add hover effects
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCart();
    showToast(`${product.name} added to cart!`, 'success');
    
    // Refresh the product display to show quantity controls
    setTimeout(() => {
        displayProducts();
    }, 300);
    
    // Animate cart count
    const cartCountElement = document.getElementById('cartCount');
    cartCountElement.classList.add('cart-count-pulse');
    setTimeout(() => {
        cartCountElement.classList.remove('cart-count-pulse');
    }, 300);
}

function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCartUI();
        saveCart();
        displayProducts();
    }
}

function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(productId);
            return;
        }
        updateCartUI();
        saveCart();
        displayProducts();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCart();
    displayProducts();
    showToast('Item removed from cart', 'info');
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    
    // Update cart items display
    updateCartItemsDisplay();
    
    // Enable/disable checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.disabled = cart.length === 0;
}

function updateCartItemsDisplay() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <i class="${item.icon}"></i>
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity(${item.id})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleCart() {
    cartSidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

function closeCart() {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('show');
}

function openCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    
    closeCart();
    checkoutModal.classList.add('show');
    overlay.classList.add('show');
    
    // Update checkout items
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = total.toFixed(2);
}

function closeCheckout() {
    checkoutModal.classList.remove('show');
    overlay.classList.remove('show');
}

function completeOrder() {
    const form = document.getElementById('checkoutForm');
    
    if (!validateForm(form)) {
        showToast('Please fill in all required fields correctly', 'error');
        return;
    }
    
    // Show loading state
    const completeBtn = document.getElementById('completeOrder');
    completeBtn.classList.add('btn-loading');
    completeBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Generate order ID
        const orderId = 'ORD-' + Date.now().toString(36).toUpperCase();
        document.getElementById('orderId').textContent = orderId;
        
        // Clear cart
        cart = [];
        updateCartUI();
        saveCart();
        
        // Close checkout and show success
        closeCheckout();
        successModal.classList.add('show');
        overlay.classList.add('show');
        
        // Reset button state
        completeBtn.classList.remove('btn-loading');
        completeBtn.disabled = false;
        
        // Play success animation
        playSuccessAnimation();
        
        showToast('Order placed successfully!', 'success');
    }, 2000);
}

function continueShopping() {
    successModal.classList.remove('show');
    overlay.classList.remove('show');
    
    // Refresh products display
    displayProducts();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        let fieldValid = true;
        
        // Remove previous error messages
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Basic validation
        if (!value) {
            fieldValid = false;
            showFieldError(input, 'This field is required');
        } else {
            // Specific validation based on input type
            switch (input.type) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        fieldValid = false;
                        showFieldError(input, 'Please enter a valid email address');
                    }
                    break;
                case 'text':
                    if (input.placeholder.includes('Card Number')) {
                        const cardRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
                        if (!cardRegex.test(value)) {
                            fieldValid = false;
                            showFieldError(input, 'Please enter a valid card number (1234 5678 9012 3456)');
                        }
                    } else if (input.placeholder.includes('MM/YY')) {
                        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
                        if (!expiryRegex.test(value)) {
                            fieldValid = false;
                            showFieldError(input, 'Please enter a valid expiry date (MM/YY)');
                        }
                    } else if (input.placeholder.includes('CVV')) {
                        const cvvRegex = /^\d{3}$/;
                        if (!cvvRegex.test(value)) {
                            fieldValid = false;
                            showFieldError(input, 'Please enter a valid CVV (3 digits)');
                        }
                    }
                    break;
            }
        }
        
        // Update input styling
        if (fieldValid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
            isValid = false;
        }
    });
    
    return isValid;
}

function showFieldError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function setupFormValidation() {
    const form = document.getElementById('checkoutForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', () => {
            validateSingleField(input);
        });
        
        // Format card number input
        if (input.placeholder.includes('Card Number')) {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                e.target.value = value;
            });
        }
        
        // Format expiry date input
        if (input.placeholder.includes('MM/YY')) {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value;
            });
        }
        
        // Format CVV input
        if (input.placeholder.includes('CVV')) {
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
            });
        }
    });
}

function validateSingleField(input) {
    const value = input.value.trim();
    let isValid = true;
    
    // Remove previous error
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        showFieldError(input, 'This field is required');
    }
    
    // Update styling
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
    }
    
    return isValid;
}

function playSuccessAnimation() {
    const checkmark = document.querySelector('.checkmark');
    checkmark.style.animation = 'none';
    setTimeout(() => {
        checkmark.style.animation = 'checkmarkPulse 0.6s ease';
    }, 10);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas ${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

function getToastIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'info': return 'fa-info-circle';
        default: return 'fa-info-circle';
    }
}

function handleKeyboardShortcuts(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        closeAllModals();
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Ctrl/Cmd + Enter to add first product to cart (if search is focused)
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && document.activeElement === searchInput) {
        const firstProduct = document.querySelector('.add-to-cart-btn');
        if (firstProduct) {
            firstProduct.click();
        }
    }
}

function closeAllModals() {
    checkoutModal.classList.remove('show');
    successModal.classList.remove('show');
    cartSidebar.classList.remove('open');
    overlay.classList.remove('show');
}

function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    // Infinite scroll - load more products when near bottom
    if (scrollTop + clientHeight >= scrollHeight - 1000) {
        loadMoreProducts();
    }
    
    // Show/hide scroll to top button
    const scrollToTopBtn = document.querySelector('.fab');
    if (scrollTop > 500) {
        if (!scrollToTopBtn) {
            createScrollToTopButton();
        }
    } else {
        if (scrollToTopBtn) {
            scrollToTopBtn.remove();
        }
    }
}

function loadMoreProducts() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    
    if (currentPage < totalPages && !document.querySelector('.loading-spinner').style.display) {
        currentPage++;
        displayProducts();
    }
}

function createScrollToTopButton() {
    const fab = document.createElement('div');
    fab.className = 'fab';
    fab.innerHTML = '<i class="fas fa-arrow-up"></i>';
    fab.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(fab);
}

function showLoadingSpinner() {
    loadingSpinner.style.display = 'block';
}

function hideLoadingSpinner() {
    loadingSpinner.style.display = 'none';
}

// Advanced search functionality
function setupAdvancedSearch() {
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length === 0) {
            clearSearchHighlights();
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performAdvancedSearch(query);
        }, 300);
    });
}

function performAdvancedSearch(query) {
    // Search in product names, categories, and even partial matches
    filteredProducts = products.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(query);
        const categoryMatch = product.category.toLowerCase().includes(query);
        const priceMatch = product.price.toString().includes(query);
        
        return nameMatch || categoryMatch || priceMatch;
    });
    
    // Sort by relevance (exact matches first, then partial matches)
    filteredProducts.sort((a, b) => {
        const aExactName = a.name.toLowerCase() === query;
        const bExactName = b.name.toLowerCase() === query;
        const aExactCategory = a.category.toLowerCase() === query;
        const bExactCategory = b.category.toLowerCase() === query;
        
        if (aExactName && !bExactName) return -1;
        if (!aExactName && bExactName) return 1;
        if (aExactCategory && !bExactCategory) return -1;
        if (!aExactCategory && bExactCategory) return 1;
        
        return 0;
    });
    
    currentPage = 1;
    displayProducts();
    highlightSearchResults();
}

function highlightSearchResults() {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) return;
    
    document.querySelectorAll('.product-card').forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        if (productName.includes(query)) {
            card.classList.add('search-highlight');
        }
    });
}

function clearSearchHighlights() {
    document.querySelectorAll('.search-highlight').forEach(card => {
        card.classList.remove('search-highlight');
    });
}

// Product recommendations
function getRecommendedProducts(currentProduct) {
    return products
        .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
}

// Price tracking and alerts
function trackPriceChanges() {
    // Simulate dynamic pricing
    setInterval(() => {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const oldPrice = randomProduct.price;
        const priceChange = (Math.random() - 0.5) * 20; // ±$10 change
        randomProduct.price = Math.max(1, Math.round(oldPrice + priceChange));
        
        // Update display if product is visible
        const productCard = document.querySelector(`[data-product-id="${randomProduct.id}"]`);
        if (productCard) {
            const priceElement = productCard.querySelector('.product-price');
            if (priceElement) {
                priceElement.textContent = `$${randomProduct.price.toFixed(2)}`;
                priceElement.classList.add('price-highlight');
                setTimeout(() => {
                    priceElement.classList.remove('price-highlight');
                }, 1000);
            }
        }
    }, 30000); // Update prices every 30 seconds
}

// Wishlist functionality
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('Removed from wishlist', 'info');
    } else {
        wishlist.push(productId);
        showToast('Added to wishlist', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
}

function updateWishlistUI() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const productId = parseInt(btn.dataset.productId);
        const isInWishlist = wishlist.includes(productId);
        
        btn.innerHTML = isInWishlist ? 
            '<i class="fas fa-heart"></i>' : 
            '<i class="far fa-heart"></i>';
        
        btn.classList.toggle('active', isInWishlist);
    });
}

// Recently viewed products
let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

function addToRecentlyViewed(productId) {
    const index = recentlyViewed.indexOf(productId);
    if (index > -1) {
        recentlyViewed.splice(index, 1);
    }
    
    recentlyViewed.unshift(productId);
    recentlyViewed = recentlyViewed.slice(0, 10); // Keep only last 10
    
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
}

// Product comparison
let compareList = [];

function addToCompare(product) {
    if (compareList.length >= 4) {
        showToast('You can compare up to 4 products', 'error');
        return;
    }
    
    if (compareList.find(p => p.id === product.id)) {
        showToast('Product already in comparison', 'info');
        return;
    }
    
    compareList.push(product);
    showToast(`${product.name} added to comparison`, 'success');
    updateCompareUI();
}

function removeFromCompare(productId) {
    compareList = compareList.filter(p => p.id !== productId);
    updateCompareUI();
}

function updateCompareUI() {
    // Update compare button states and counter
    const compareCount = document.getElementById('compareCount');
    if (compareCount) {
        compareCount.textContent = compareList.length;
    }
}

// Analytics and tracking
function trackUserInteraction(action, productId = null, category = null) {
    const interaction = {
        timestamp: new Date().toISOString(),
        action: action,
        productId: productId,
        category: category,
        sessionId: getSessionId()
    };
    
    // Store in localStorage for demo purposes
    let analytics = JSON.parse(localStorage.getItem('analytics')) || [];
    analytics.push(interaction);
    
    // Keep only last 100 interactions
    analytics = analytics.slice(-100);
    localStorage.setItem('analytics', JSON.stringify(analytics));
}

function getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
}

// Performance optimization
function optimizeImages() {
    // Lazy loading for product images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Error handling and retry logic
function handleApiError(error, retryFunction) {
    console.error('API Error:', error);
    
    showToast('Something went wrong. Retrying...', 'error');
    
    // Retry after 2 seconds
    setTimeout(() => {
        if (typeof retryFunction === 'function') {
            retryFunction();
        }
    }, 2000);
}

// Initialize advanced features
document.addEventListener('DOMContentLoaded', function() {
    setupAdvancedSearch();
    trackPriceChanges();
    optimizeImages();
    
    // Track page load
    trackUserInteraction('page_load');
    
    // Set up periodic cart save
    setInterval(saveCart, 10000); // Save cart every 10 seconds
});

// Service Worker for offline functionality (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for testing
window.ShopZone = {
    addToCart,
    removeFromCart,
    updateCartUI,
    handleSearch,
    handleFilters,
    toggleWishlist,
    addToCompare,
    trackUserInteraction
};
