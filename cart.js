// Add item to cart
function addToCart(product, price) {
    price = parseFloat(price); // Ensure it's a number
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already in cart
    let existing = cart.find(item => item.product === product);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ product, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(product + " added to cart!");
}

// Display items in cart
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = "";
    let total = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems += `
            <p>${item.product} - ₹${item.price} x ${item.quantity} = ₹${itemTotal}</p>
        `;
    });

    if (cart.length === 0) {
        cartItems = "<p>Your cart is empty!</p>";
    }

    document.getElementById("cartItems").innerHTML = cartItems;
    document.getElementById("totalAmount").innerText = "Total: ₹" + total;
}

// Place order on WhatsApp
function placeOrderOnWhatsApp() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "🛒 My Order:\n\n";
    let total = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${item.product} - ₹${item.price} x ${item.quantity} = ₹${itemTotal}\n`;
    });

    message += `\nTotal: ₹${total}`;

    let phoneNumber = "91XXXXXXXXXX"; // 👈 yaha apna WhatsApp number daalo
    let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}
