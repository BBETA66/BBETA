// Cart array
let cart = [];

// Add to Cart function
function addToCart(productName, price) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    saveCart();
    alert(productName + " added to cart!");
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

// Render cart page
function renderCart() {
    loadCart();
    const cartItemsContainer = document.getElementById("cart-items");
    const cartSummaryContainer = document.getElementById("cart-summary");
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
        cartSummaryContainer.innerHTML = "";
        return;
    }

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price}</span>
            <input type="number" class="qty-input" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            <span>₹${itemTotal}</span>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartSummaryContainer.innerHTML = `
        <h3>Total: ₹${total}</h3>
        <button id="checkout-btn" onclick="checkout()">Checkout via WhatsApp</button>
    `;
}

// Update quantity
function updateQuantity(index, qty) {
    qty = parseInt(qty);
    if (qty > 0) {
        cart[index].quantity = qty;
    }
    saveCart();
    renderCart();
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// Checkout using WhatsApp
function checkout() {
    let message = "🛒 *New Order from BBETA Apka Apna Beta*%0A%0A";
    cart.forEach(item => {
        message += `${item.name} - ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}%0A`;
    });

    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `%0A*Total: ₹${total}*%0A%0A📍 Location: Nalgonda, Telangana 508001`;

    const phoneNumber = "917093242271"; // ✅ आपका WhatsApp नंबर
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("cart-items")) {
        renderCart();
    }
});
