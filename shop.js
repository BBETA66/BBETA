// shop.js

let cart = [];

// Add item to cart
function addToCart(name, price) {
  let item = cart.find(product => product.name === name);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCart();
}

// Update cart display
function updateCart() {
  let cartItemsContainer = document.getElementById("cart-items");
  let totalContainer = document.getElementById("cart-total");
  cartItemsContainer.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <span>${item.name} (x${item.quantity})</span>
        <span>₹${item.price * item.quantity}</span>
        <button onclick="removeFromCart(${index})">❌</button>
      </div>
    `;
  });

  totalContainer.innerText = `Total: ₹${total}`;
}

// Remove item
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Place order
function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  let name = document.getElementById("customer-name").value.trim();
  let address = document.getElementById("customer-address").value.trim();
  let phone = document.getElementById("customer-phone").value.trim();
  let location = document.getElementById("customer-location").value.trim();

  if (!name || !address || !phone) {
    alert("Please enter your name, address, and phone number.");
    return;
  }

  let orderText = `🛒 *New Order from BBETA* \n\n`;
  cart.forEach(item => {
    orderText += `${item.quantity} x ${item.name} = ₹${item.price * item.quantity}\n`;
  });

  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  orderText += `\n💰 Total: ₹${total}\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📍 Address: ${address}`;
  if (location) {
    orderText += `\n📌 Location: ${location}`;
  }

  let whatsappNumber = "917093242271"; // Your WhatsApp number
  let url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;
  window.open(url, "_blank");
}

// Auto fetch GPS
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        document.getElementById("customer-location").value = mapLink;
      },
      error => {
        alert("Unable to fetch location. Please enable GPS.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
