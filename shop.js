// ====== CART MANAGEMENT ======
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

// ====== DISPLAY CART ======
function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-items");
  let totalContainer = document.getElementById("cart-total");
  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <p>${item.qty} x ${item.name} = ₹${item.price * item.qty}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;

    cartContainer.appendChild(div);
    total += item.price * item.qty;
  });

  totalContainer.innerText = "Total: ₹" + total;
}

// ====== REMOVE FROM CART ======
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// ====== GPS LOCATION ======
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  let gpsInput = document.getElementById("gps");
  gpsInput.value = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
}

function showError(error) {
  alert("Error fetching location. Please allow GPS access.");
}

// ====== PLACE ORDER ======
function placeOrder() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let name = document.getElementById("customer-name").value.trim();
  let phone = document.getElementById("customer-phone").value.trim();
  let address = document.getElementById("customer-address").value.trim();
  let gps = document.getElementById("gps").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill all customer details.");
    return;
  }

  let message = `🛒 *New Order from BBETA*%0A`;
  cart.forEach(item => {
    message += `${item.qty} x ${item.name} = ₹${item.price * item.qty}%0A`;
  });

  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  message += `%0A*Total:* ₹${total}%0A`;
  message += `%0A👤 *Name:* ${name}`;
  message += `%0A📞 *Phone:* ${phone}`;
  message += `%0A🏠 *Address:* ${address}`;
  if (gps) message += `%0A📍 *GPS:* ${gps}`;

  // WhatsApp Number (replace with yours)
  let whatsappNumber = "917093242271";
  let whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

  window.open(whatsappURL, "_blank");
}

// ====== AUTO LOAD CART ======
window.onload = function () {
  if (document.getElementById("cart-items")) {
    displayCart();
  }
};
