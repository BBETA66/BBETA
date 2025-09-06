// =======================
// Cart System
// =======================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add product to cart
function addToCart(name, price, btn) {
  const qtyInput = btn.parentElement.querySelector(".qty");
  const quantity = parseInt(qtyInput.value);

  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// Load cart on cart.html
function loadCart() {
  const container = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");

  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <p>${item.quantity} x ${item.name} = ₹${item.price * item.quantity}</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    container.appendChild(div);

    total += item.price * item.quantity;
  });

  totalContainer.innerText = `Total: ₹${total}`;
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// =======================
// WhatsApp Order
// =======================
function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();

  if (!name || !phone) {
    alert("Please enter your name and phone number.");
    return;
  }

  let orderText = `🛒 *New Order from BBETA*:%0A%0A`;
  cart.forEach(item => {
    orderText += `${item.quantity} x ${item.name} = ₹${item.price * item.quantity}%0A`;
  });

  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  orderText += `%0A💰 Total: ₹${total}`;
  orderText += `%0A👤 Name: ${name}`;
  orderText += `%0A📞 Customer Phone: ${phone}`;
  orderText += `%0A📍 Location: Nalgonda, Telangana 508001`;

  // ✅ Send to your WhatsApp number
  const whatsappURL = `https://wa.me/917093242271?text=${orderText}`;
  window.open(whatsappURL, "_blank");
}
