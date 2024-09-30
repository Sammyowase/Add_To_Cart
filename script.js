

// JSON data for desserts
const desserts = [
    { "image": { "thumbnail": "./assets/images/image-waffle-desktop.jpg" }, "name": "Waffle with Berries", "category": "Waffle", "price": 6.50 },
    { "image": { "thumbnail": "./assets/images/image-creme-brulee-desktop.jpg" }, "name": "Vanilla Bean Crème Brûlée", "category": "Crème Brûlée", "price": 7.00 },
    { "image": { "thumbnail": "./assets/images/image-macaron-desktop.jpg" }, "name": "Macaron Mix of Five", "category": "Macaron", "price": 8.00 },
    { "image": { "thumbnail": "./assets/images/image-tiramisu-desktop.jpg" }, "name": "Classic Tiramisu", "category": "Tiramisu", "price": 5.50 },
    { "image": { "thumbnail": "./assets/images/image-baklava-desktop.jpg" }, "name": "Pistachio Baklava", "category": "Baklava", "price": 4.00 },
    { "image": { "thumbnail": "./assets/images/image-meringue-desktop.jpg" }, "name": "Lemon Meringue Pie", "category": "Pie", "price": 5.00 },
    { "image": { "thumbnail": "./assets/images/image-cake-desktop.jpg" }, "name": "Red Velvet Cake", "category": "Cake", "price": 4.50 },
    { "image": { "thumbnail": "./assets/images/image-brownie-desktop.jpg" }, "name": "Salted Caramel Brownie", "category": "Brownie", "price": 4.50 },
    { "image": { "thumbnail": "./assets/images/image-panna-cotta-desktop.jpg" }, "name": "Vanilla Panna Cotta", "category": "Panna Cotta", "price": 6.50 }
];

// Cart state
let cart = [];

// Display desserts in the menu
const displayDesserts = () => {
    const dessertList = document.getElementById('desserts-list');
    desserts.forEach((dessert, index) => {
        const dessertItem = document.createElement('div');
        dessertItem.classList.add('dessert-item');
        dessertItem.innerHTML = `
            <img src="${dessert.image.thumbnail}" alt="${dessert.name}">
            <p>${dessert.name} - $${dessert.price.toFixed(2)}</p>
            <button class="add-to-cart" data-index="${index}">Add to Cart</button>
        `;
        dessertList.appendChild(dessertItem);
    });
};

// Update the cart
const updateCart = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = ''; // Clear current cart

    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            <button class="decrease-quantity" data-index="${index}">-</button>
            <button class="increase-quantity" data-index="${index}">+</button>
            <button class="remove-from-cart" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotalElement.textContent = total.toFixed(2);

    // Add event listeners to increase, decrease, and remove buttons
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });

    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
};

// Add to cart
const addToCart = (event) => {
    const dessertIndex = event.target.getAttribute('data-index');
    const selectedDessert = desserts[dessertIndex];

    const existingItem = cart.find(item => item.name === selectedDessert.name);

    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if already in cart
    } else {
        cart.push({ ...selectedDessert, quantity: 1 }); // Add new item to cart
    }

    updateCart();
};

// Increase quantity
const increaseQuantity = (event) => {
    const itemIndex = event.target.getAttribute('data-index');
    cart[itemIndex].quantity += 1; // Increase the quantity of the item
    updateCart();
};

// Decrease quantity
const decreaseQuantity = (event) => {
    const itemIndex = event.target.getAttribute('data-index');
    if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity -= 1; // Decrease the quantity of the item
    } else {
        cart.splice(itemIndex, 1); // Remove the item if quantity is 1
    }
    updateCart();
};

// Remove from cart
const removeFromCart = (event) => {
    const itemIndex = event.target.getAttribute('data-index');
    cart.splice(itemIndex, 1); // Remove item from cart
    updateCart();
};

// Initialize the website
const init = () => {
    displayDesserts();

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
};

// Run the init function when the DOM is ready
document.addEventListener('DOMContentLoaded', init);


