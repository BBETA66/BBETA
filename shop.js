let cart = [];

// Add item to cart
function addToCart(name, price) {
  const item = cart.find(product => product.name === name);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCart();
}

// Remove item from cart
function removeFromCart(name) {
  cart = cart.filter(product => product.name !== name);
  updateCart();
}

// Update cart display
function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
      <p>${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}</p>
      <button onclick="removeFromCart('${item.name}')">❌ Remove</button>
    `;
    cartItemsContainer.appendChild(itemElement);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = total;
}

// Get GPS Location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const gpsInput = document.getElementById("gps");
  gpsInput.value = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
}

function showError(error) {
  alert("Unable to fetch location. Please allow GPS access.");
}

// Send Order via WhatsApp
function sendOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const gps = document.getElementById("gps").value;

  if (!name || !phone || !address) {
    alert("Please fill all required details.");
    return;
  }

  let orderDetails = "🛒 *New Order Received*\n\n";
  cart.forEach(item => {
    orderDetails += `• ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}\n`;
  });

  orderDetails += `\n💰 *Total:* ₹${document.getElementById("cart-total").textContent}\n\n`;
  orderDetails += `👤 *Customer:* ${name}\n📞 *Phone:* ${phone}\n🏠 *Address:* ${address}\n`;

  if (gps) {
    orderDetails += `📍 *Location:* ${gps}\n`;
  }

  const whatsappURL = `https://wa.me/917093242271?text=${encodeURIComponent(orderDetails)}`;
  window.open(whatsappURL, "_blank");
}
