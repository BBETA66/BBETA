// =====================
// CART FUNCTIONS
// =====================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart
function addToCart(product, price, element) {
  let qty = parseInt(element.parentElement.querySelector(".qty").value);
  let existing = cart.find(item => item.product === product);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ product, price, qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${qty} x ${product} added to cart!`);
}

// Load Cart Items on Cart Page
function loadCart() {
  let cartItems = document.getElementById("cart-items");
  let cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.innerText = "Total: ₹0";
    return;
  }

  cart.forEach(item => {
    let div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <p>${item.qty} x ${item.product} = ₹${item.price * item.qty}</p>
    `;
    cartItems.appendChild(div);
    total += item.price * item.qty;
  });

  cartTotal.innerText = `Total: ₹${total}`;
}

// =====================
// ORDER FUNCTIONS
// =====================

// Place Order on WhatsApp
function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let name = document.getElementById("customer-name").value.trim();
  let phone = document.getElementById("customer-phone").value.trim();
  let address = document.getElementById("customer-address").value.trim();
  let location = document.getElementById("customer-location").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill all required fields!");
    return;
  }

  let message = `🛒 *New Order from BBETA*\n\n`;
  cart.forEach(item => {
    message += `${item.qty} x ${item.product} = ₹${item.price * item.qty}\n`;
  });

  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  message += `\n💰 *Total: ₹${total}*\n\n`;
  message += `👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n🏠 *Address:* ${address}\n`;

  if (location) {
    message += `📍 *Location:* ${location}\n`;
  }

  let whatsappNumber = "917093242271"; // ✅ Your WhatsApp number
  let whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");

  // Clear cart after order
  localStorage.removeItem("cart");
  cart = [];
}

// =====================
// GPS Location
// =====================
function getGPSLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let locationLink = `https://www.google.com/maps?q=${lat},${lon}`;
      document.getElementById("customer-location").value = locationLink;
    },
    error => {
      alert("Unable to retrieve location. Please allow location access.");
    }
  );
}

// Load cart items when cart page opens
window.onload = loadCart;
