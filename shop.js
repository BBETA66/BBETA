// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart function
function addToCart(productName, price) {
  const item = cart.find(p => p.name === productName);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(productName + " added to cart!");
}

// Display cart items
function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.classList.add("cart-item");
    itemEl.innerHTML = `
      <p><strong>${item.name}</strong> - ₹${item.price} × ${item.quantity}</p>
      <button onclick="removeFromCart(${index})">❌ Remove</button>
    `;
    cartItemsContainer.appendChild(itemEl);
    total += item.price * item.quantity;
  });

  totalPriceEl.innerText = total;
}

// Remove item
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// GPS location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      document.getElementById("address").value = `https://www.google.com/maps?q=${lat},${lon}`;
    });
  } else {
    alert("Geolocation not supported");
  }
}

// Confirm order via WhatsApp
const form = document.getElementById("customer-form");
if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    let message = `*New Order from BBETA*%0A%0A`;
    message += `👤 Name: ${name}%0A`;
    message += `📞 Phone: ${phone}%0A`;
    message += `🏠 Address: ${address}%0A%0A`;
    message += `🛒 *Order Details*%0A`;

    cart.forEach(item => {
      message += `- ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}%0A`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `%0A💰 Total: ₹${total}`;

    const whatsappUrl = `https://wa.me/917093242271?text=${message}`;
    window.open(whatsappUrl, "_blank");
  });
}

// Show cart when opening cart.html
displayCart();
