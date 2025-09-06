let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart
function addToCart(product, price) {
  cart.push({ product, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product + " added to cart!");
}

// Show Cart Items
function displayCart() {
  let cartItemsDiv = document.getElementById("cart-items");
  let totalDiv = document.getElementById("cart-total");

  if (!cartItemsDiv) return;

  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <p>${item.product} - ₹${item.price}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsDiv.appendChild(div);
    total += item.price;
  });

  totalDiv.textContent = "Total: ₹" + total;
}

// Remove Item
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// GPS Location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      document.getElementById("gps").value =
        pos.coords.latitude + "," + pos.coords.longitude;
      alert("📍 Location captured successfully!");
    });
  } else {
    alert("Geolocation not supported by this browser.");
  }
}

// Send Order to WhatsApp
function sendOrder() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let gps = document.getElementById("gps").value;

  if (!name || !phone || !address) {
    alert("⚠️ Please fill all details!");
    return;
  }

  let orderDetails = "🛒 *New Order* from BBETA\n\n";
  cart.forEach((item) => {
    orderDetails += `- ${item.product} (₹${item.price})\n`;
  });

  orderDetails += `\n*Total:* ₹${cart.reduce((t, i) => t + i.price, 0)}`;
  orderDetails += `\n\n👤 Name: ${name}`;
  orderDetails += `\n📞 Phone: ${phone}`;
  orderDetails += `\n🏠 Address: ${address}`;
  if (gps) orderDetails += `\n📍 GPS: https://maps.google.com/?q=${gps}`;

  let whatsappURL =
    "https://wa.me/917093242271?text=" + encodeURIComponent(orderDetails);
  window.open(whatsappURL, "_blank");
}

// Auto Display Cart
window.onload = displayCart;
