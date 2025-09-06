// Add item to cart
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

// Load cart
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItems = document.getElementById("cart-items");
  let total = 0;

  if (!cartItems) return;

  cartItems.innerHTML = "";
  cart.forEach(item => {
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    cartItems.innerHTML += `
      <div class="cart-item">
        <p>${item.qty} x ${item.name} = ₹${itemTotal}</p>
      </div>
    `;
  });

  document.getElementById("cart-total").innerText = "Total: ₹" + total;
}

// Place order via WhatsApp
function placeOrder() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let name = document.getElementById("customer-name").value.trim();
  let phone = document.getElementById("customer-phone").value.trim();
  let total = 0;
  let orderText = "🛒 New Order from BBETA:\n";

  cart.forEach(item => {
    let itemTotal = item.price * item.qty;
    total += itemTotal;
    orderText += `${item.qty} x ${item.name} = ₹${itemTotal}\n`;
  });

  orderText += `\nTotal: ₹${total}`;
  orderText += `\n👤 Name: ${name || "N/A"}`;
  orderText += `\n📞 Customer Phone: ${phone || "N/A"}`;
  orderText += `\n📍 Location: Nalgonda, Telangana 508001`;

  let encodedText = encodeURIComponent(orderText);
  let whatsappURL = `https://wa.me/917093242271?text=${encodedText}`;

  window.open(whatsappURL, "_blank");
  localStorage.removeItem("cart");
}
