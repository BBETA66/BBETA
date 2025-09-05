function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemsDiv = document.getElementById("cart-items");
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("total").innerText = 0;
    return;
  }

  cartItemsDiv.innerHTML = "";
  cart.forEach((item, index) => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItemsDiv.innerHTML += `
      <div class="card cart-card p-3 mb-3">
        <h5>${item.name}</h5>
        <p>₹${item.price} x ${item.quantity} = ₹${itemTotal}</p>
        <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, -1)">➖</button>
        <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, 1)">➕</button>
        <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">🗑 Remove</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = total;
}

function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index]) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  let message = "🛍 *New Order from BBETA* 🛍\n\n";
  let total = 0;
  cart.forEach(item => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `• ${item.name} - ${item.quantity} x ₹${item.price} = ₹${itemTotal}\n`;
  });
  message += `\n💰 *Total: ₹${total}*`;

  let phone = "917093242271"; // ✅ Tumhara WhatsApp number yaha set hai
  let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");

  localStorage.removeItem("cart"); // clear after checkout
}

window.onload = loadCart;
