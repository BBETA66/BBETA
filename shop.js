// Add product to cart
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name: name, price: price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

// Display cart items
function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItems = document.getElementById("cart-items");
  let totalElement = document.getElementById("total");
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItems.innerHTML += `
      <div class="d-flex justify-content-between align-items-center border p-2 mb-2">
        <span><b>${item.name}</b> - ₹${item.price} × 
          <input type="number" min="1" value="${item.quantity}" 
            onchange="updateQuantity(${index}, this.value)" style="width:50px;">
        </span>
        <span>₹${itemTotal}</span>
        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">❌</button>
      </div>
    `;
  });

  totalElement.innerText = "₹" + total;
}

// Update quantity
function updateQuantity(index, qty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = parseInt(qty);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Remove item
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Place order on WhatsApp
function placeOrder() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let name = document.getElementById("customer-name").value;
  let phone = document.getElementById("customer-phone").value;
  let location = document.getElementById("customer-location").value;

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  if (!name || !phone || !location) {
    alert("Please fill all details.");
    return;
  }

  let orderText = `🛒 *New Order from ${name}* \n📞 Phone: ${phone} \n📍 Location: ${location}\n\n*Items:*\n`;

  cart.forEach(item => {
    orderText += `- ${item.name} (₹${item.price} × ${item.quantity}) = ₹${item.price * item.quantity}\n`;
  });

  let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  orderText += `\n💰 *Total: ₹${total}*`;

  let whatsappURL = `https://wa.me/917093242271?text=${encodeURIComponent(orderText)}`;
  window.open(whatsappURL, "_blank");
}

// Load cart on cart.html
if (document.getElementById("cart-items")) {
  displayCart();
}
