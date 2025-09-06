// Add to cart function
function addToCart(name, price, btn) {
  let qty = parseInt(btn.previousElementSibling.value);
  if (qty <= 0) {
    alert("⚠️ Quantity must be at least 1");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${qty} x ${name} added to cart ✅`);
}

// Display cart on cart.html
function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItems = document.getElementById("cart-items");
  let cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    let div = document.createElement("div");
    div.classList.add("cart-item");
    div.textContent = `${item.qty} x ${item.name} = ₹${item.price * item.qty}`;
    cartItems.appendChild(div);
    total += item.price * item.qty;
  });

  cartTotal.textContent = `Total: ₹${total}`;
}

// Place order on WhatsApp
function placeOrder() {
  let name = document.getElementById("customerName").value.trim();
  let phone = document.getElementById("customerPhone").value.trim();
  let location = document.getElementById("customerLocation").value.trim();

  if (!name || !phone || !location) {
    alert("⚠️ Please enter your Name, Phone, and Location!");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("⚠️ Your cart is empty!");
    return;
  }

  let orderText = "🛒 *New Order from BBETA*%0A%0A";
  cart.forEach(item => {
    orderText += `${item.qty} x ${item.name} = ₹${item.price * item.qty}%0A`;
  });

  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  orderText += `%0A*Total:* ₹${total}%0A%0A`;
  orderText += `👤 Name: ${name}%0A📞 Phone: ${phone}%0A📍 Location: ${location}`;

  // Replace with your WhatsApp number
  let whatsappUrl = `https://wa.me/917093242271?text=${orderText}`;
  window.open(whatsappUrl, "_blank");
}

// Run displayCart when cart.html loads
document.addEventListener("DOMContentLoaded", displayCart);
