// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Add product to cart
function addToCart(name, price, btn) {
  let qtyInput = btn.parentElement.querySelector("input");
  let quantity = parseInt(qtyInput.value);

  if (quantity < 1 || isNaN(quantity)) quantity = 1;

  let cart = loadCart();
  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  saveCart(cart);
  alert(`${name} (${quantity} added)`);
}

// Display cart items
function displayCart() {
  let cart = loadCart();
  let cartItemsDiv = document.getElementById("cart-items");
  let cartTotalDiv = document.getElementById("cart-total");

  if (!cartItemsDiv || !cartTotalDiv) return;

  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItemsDiv.innerHTML += `
      <div class="d-flex justify-content-between align-items-center border p-2 mb-2 rounded">
        <strong>${item.name}</strong> - ₹${item.price} × 
        <input type="number" min="1" value="${item.quantity}" class="form-control d-inline w-25 me-2" onchange="updateQuantity(${index}, this.value)">
        <span>₹${itemTotal}</span>
        <button class="btn btn-danger btn-sm ms-2" onclick="removeFromCart(${index})">❌</button>
      </div>
    `;
  });

  cartTotalDiv.innerHTML = `<h4 class="text-success">Total: ₹${total}</h4>`;
}

// Update quantity
function updateQuantity(index, newQty) {
  let cart = loadCart();
  newQty = parseInt(newQty);

  if (newQty > 0) {
    cart[index].quantity = newQty;
  } else {
    cart[index].quantity = 1;
  }

  saveCart(cart);
  displayCart();
}

// Remove product from cart
function removeFromCart(index) {
  let cart = loadCart();
  cart.splice(index, 1);
  saveCart(cart);
  displayCart();
}

// Place order on WhatsApp
function placeOrder() {
  let name = document.getElementById("customer-name").value.trim();
  let phone = document.getElementById("customer-phone").value.trim();
  let location = document.getElementById("customer-location").value.trim();

  if (!name || !phone || !location) {
    alert("Please enter your Name, Phone, and Location.");
    return;
  }

  let cart = loadCart();
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let orderText = `🛒 *New Order Received* 🛒\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📍 Location: ${location}\n\n*Order Details:*\n`;

  let total = 0;
  cart.forEach(item => {
    let itemTotal = item.price * item.quantity;
    orderText += `- ${item.name} × ${item.quantity} = ₹${itemTotal}\n`;
    total += itemTotal;
  });

  orderText += `\n💰 *Total: ₹${total}*`;

  // WhatsApp number
  let whatsappNumber = "917093242271"; // Change if needed
  let whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;

  window.open(whatsappURL, "_blank");
}

// Run when cart.html loads
if (window.location.pathname.includes("cart.html")) {
  displayCart();
}
