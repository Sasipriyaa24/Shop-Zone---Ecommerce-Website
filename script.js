// Elements
const productContainer = document.getElementById('product-container');
const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItems = document.getElementById('cart-items');
const searchInput = document.getElementById('search-input');
const homeBtn = document.getElementById('home-btn');  // Home button element
const loginBtn = document.getElementById('login-btn');  // Login button
const loginModal = document.getElementById('login-modal'); // Login modal
const closeModalBtn = document.getElementById('close-modal'); // Close button of modal
const usernameInput = document.getElementById('username'); // Username input
const passwordInput = document.getElementById('password'); // Password input
const loginSubmitBtn = document.getElementById('login-submit'); // Submit button of modal

let cart = [];
let isLoggedIn = false;

// Function to display products
const displayProducts = (filteredProducts) => {
    productContainer.innerHTML = '';  // Clear existing products
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="buyNow(${product.id})">Buy Now</button>
        `;
        productContainer.appendChild(productCard);
    });
};

// Initialize products display
const products = [
    { id: 1, name: 'Laptop', price: 799, image: 'assets/images/product1.jpg' },
    { id: 2, name: 'Phone', price: 499, image: 'assets/images/product2.jpg' },
    { id: 3, name: 'Headphones', price: 199, image: 'assets/images/product3.jpg' },
    { id: 4, name: 'Smart Watch', price: 89, image: 'assets/images/product4.jpg' },
    { id: 5, name: 'Tablet', price: 999, image: 'assets/images/product5.jpg' },
    { id: 6, name: 'Camera', price: 299, image: 'assets/images/product6.jpg' },
    { id: 7, name: 'Smart Speaker', price: 129, image: 'assets/images/product7.jpg' },
    { id: 8, name: 'Keyboard', price: 499, image: 'assets/images/product8.jpg' },
    { id: 9, name: 'Mouse', price: 599, image: 'assets/images/product9.jpg' },
    { id: 10, name: 'Monitor', price: 799, image: 'assets/images/product10.jpg' },
    { id: 11, name: 'Printer', price: 199, image: 'assets/images/product11.jpg' },
    { id: 12, name: 'Gaming Console', price: 49, image: 'assets/images/product12.jpg' },
    { id: 13, name: 'Charger', price: 29, image: 'assets/images/product13.jpg' },
    { id: 14, name: 'Disc', price: 79, image: 'assets/images/product14.jpg' },
    { id: 15, name: 'Plazo Set', price: 19, image: 'assets/images/product15.jpg' },
];
displayProducts(products);

// Search products based on input
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
});

// Add product to cart
const addToCart = (productId) => {
    if (!isLoggedIn) {
        alert('Please login to add items to the cart.');
        return;
    }
    const product = products.find(product => product.id === productId);
    cart.push(product);
    cartIcon.textContent = `🛒 Cart (${cart.length})`;
    updateCartDropdown();
};

// Buy Now functionality
const buyNow = (productId) => {
    if (!isLoggedIn) {
        alert('Please login to purchase items.');
        return;
    }
    const product = products.find(product => product.id === productId);
    cart = [product];  // Only one item for the Buy Now
    cartIcon.textContent = `🛒 Cart (1)`;
    updateCartDropdown();
    alert('Thank you for your purchase!');
};

// Update cart dropdown
const updateCartDropdown = () => {
    cartItems.innerHTML = '';  // Clear existing items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <p>$${item.price}</p>
        `;
        cartItems.appendChild(cartItem);
    });
    cartDropdown.style.display = cart.length > 0 ? 'block' : 'none';
};

// Cart icon click - Toggle cart visibility
cartIcon.addEventListener('click', () => {
    cartDropdown.style.display = cartDropdown.style.display === 'none' ? 'block' : 'none';
});

// Home button functionality
homeBtn.addEventListener('click', () => {
    cart = [];  // Reset cart when going home
    cartIcon.textContent = '🛒 Cart (0)';  // Reset cart display
    displayProducts(products);  // Show all products again
    cartDropdown.style.display = 'none';  // Hide cart dropdown
});

// Login functionality
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';  // Show the login modal
});

closeModalBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';  // Close the login modal
});

// Login form submission
loginSubmitBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Basic validation (username and password should not be empty)
    if (username === '' || password === '') {
        alert('Please enter both username and password.');
        return;
    }

    // Simulate successful login (you can expand this with real authentication)
    isLoggedIn = true;
    alert('Login successful!');
    loginModal.style.display = 'none';  // Close the modal
    loginBtn.textContent = `Logout (${username})`;  // Change login button to show logged-in state
    cartIcon.style.display = 'inline-block';  // Show the cart icon after login
});

// Initialize the cart dropdown to be hidden
cartDropdown.style.display = 'none';
cartIcon.style.display = 'none';  // Initially hide the cart icon

