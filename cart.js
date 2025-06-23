let cart = JSON.parse(localStorage.getItem('cart')) || {};

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '<h2>Your Selected Items</h2>';
    let totalPrice = 0;

    for (const [name, item] of Object.entries(cart)) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="Image of ${name}" width="50" height="50"/>
            <div>
                <h3>${name}</h3>
                <p>₹${item.price} x ${item.quantity}</p>
            </div>
            <div class="controls">
                <button onclick="decreaseQuantity('${name}')">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity('${name}')">+</button>
                <button onclick="deleteItem('${name}')">Delete</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
    }

    document.getElementById('total-price').textContent = `₹${totalPrice.toLocaleString('en-IN')}`;

    if (Object.keys(cart).length === 0) {
        document.getElementById('cart-sidebar').classList.add('hidden');
    }
}

function addToCart(name, price, image) {
    if (!image.startsWith("/Images/")) {
        image = "/Images/" + image;
    }

    if (cart[name]) {
        cart[name].quantity += 1;
    } else {
        cart[name] = { price, quantity: 1, image };
    }
    updateCart();
    document.getElementById('cart-sidebar').classList.remove('hidden');
}

function increaseQuantity(name) {
    cart[name].quantity += 1;
    updateCart();
}

function decreaseQuantity(name) {
    if (cart[name].quantity > 1) {
        cart[name].quantity -= 1;
    } else {
        delete cart[name];
    }
    updateCart();
}

function deleteItem(name) {
    delete cart[name];
    updateCart();
}

function closeSidebar() {
    document.getElementById('cart-sidebar').classList.add('hidden');
}

// Load cart when the page loads
window.onload = function () {
    updateCart();
};

async function placeOrder() {
    let name = document.getElementById("customer-name").value.trim();
    let phone = document.getElementById("customer-phone").value.trim();
    let table = document.getElementById("customer-table").value.trim();

    if (!name || !phone || !table) {
        alert("Please enter your name, phone number, and table number.");
        return;
    }

    let phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.");
        return;
    }

    let tableNumber = parseInt(table, 10);
    if (isNaN(tableNumber)) {
        alert("Please enter a valid table number.");
        return;
    }

    let totalPrice = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);

    let orderData = { 
        name, 
        phone, 
        table: tableNumber, 
        items: Object.entries(cart).map(([name, item]) => ({
            name, 
            price: item.price, 
            quantity: item.quantity
        })), // ❌ Removed 'image' field
        totalPrice 
    };

    try {
        let response = await fetch("http://localhost:5000/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        let result = await response.json();
        if (response.ok) {
            alert("✅ Order is confirmed! Thank you for ordering.");
            cart = {};
            updateCart();
        } else {
            alert("⚠️ Order failed: " + result.error);
        }
    } catch (error) {
        alert("❌ Error connecting to server: " + error.message);
    }
}
