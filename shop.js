// ========== Add to Cart ==========
function addToCart(name, price, btn) {
  let qty = btn.previousElementSibling.value;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    name: name,
    price: price,
    qty: parseInt(qty)
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(qty + " x " + name + " added to cart!");
}

// ========== Load Cart Items ==========
function loadCart() {
  let cartItemsDiv = document.getElementById("cart-items");
  if (!cartItemsDiv) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    let div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <p>${item.qty} x ${item.name} = ₹${itemTotal}</p>
      <button onclick="removeFromCart(${index})">❌ Remove</button>
    `;
    cartItemsDiv.appendChild(div);
  });

  let totalDiv = document.createElement("div");
  totalDiv.classList.add("cart-total");
  totalDiv.innerText = "Total: ₹" + total;
  cartItemsDiv.appendChild(totalDiv);
}

// ========== Remove from Cart ==========
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ========== Send Order on WhatsApp ==========
function sendOrderOnWhatsApp() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let name = document.getElementById("customer-name").value;
  let phone = document.getElementById("customer-phone").value;
  let location = document.getElementById("customer-location").value;

  if (!name || !phone || !location) {
    alert("Please fill all customer details!");
    return;
  }

  let message = "🛒 *New Order from BBETA*:%0A%0A";
  cart.forEach(item => {
    message += `${item.qty} x ${item.name} = ₹${item.price * item.qty}%0A`;
  });

  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  message += `%0A*Total:* ₹${total}%0A%0A`;
  message += `👤 *Name:* ${name}%0A📞 *Phone:* ${phone}%0A🏠 *Location:* ${location}%0A`;

  let whatsappNumber = "917093242271"; // Your number
  let url = `https://wa.me/${whatsappNumber}?text=${message}`;
  window.open(url, "_blank");
}

// ========== Get GPS Location ==========
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      let gpsLink = `https://www.google.com/maps?q=${lat},${long}`;
      document.getElementById("customer-location").value = gpsLink;
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Auto load cart on page load
window.onload = loadCart;
