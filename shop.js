// Save cart in localStorage
function addToCart(name, price, qty) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ name, price, qty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}

// Render cart items
function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let totalPrice = 0;
    cartContainer.innerHTML = "";

    cart.forEach(item => {
        let itemTotal = item.price * item.qty;
        totalPrice += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name} (x${item.qty})</span>
                <span>₹${itemTotal}</span>
            </div>
        `;
    });

    document.getElementById("total").innerText = "Total: ₹" + totalPrice;
}

// Send order on WhatsApp
function sendOrder() {
    let name = document.getElementById("cust-name").value;
    let phone = document.getElementById("cust-phone").value;
    let address = document.getElementById("cust-address").value;
    let mapLink = document.getElementById("cust-map").value;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    let orderText = `🛒 *New Order from ${name}*%0A📞 Phone: ${phone}%0A🏠 Address: ${address}%0A📍 Map: ${mapLink}%0A%0A*Items:*%0A`;

    cart.forEach(item => {
        orderText += `- ${item.name} (x${item.qty}) = ₹${item.price * item.qty}%0A`;
    });

    let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    orderText += `%0A💰 Total: ₹${totalPrice}`;

    let whatsappUrl = `https://wa.me/917093242271?text=${orderText}`;
    window.open(whatsappUrl, "_blank");
}
