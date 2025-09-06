// 🛒 Add to Cart
function addToCart(product, price, element) {
  let qty = element.parentElement.querySelector(".qty").value;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ product, price, qty });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${qty} x ${product} added to cart ✅`);
}

// 🛒 Display Cart
function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("cart-items");
  let total = 0;
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty 🛒</p>";
    document.getElementById("cart-total").textContent = "Total: ₹0";
    return;
  }

  cart.forEach((item, index) => {
    let subtotal = item.price * item.qty;
    total += subtotal;
    container.innerHTML += `
      <div class="cart-item">
        ${item.qty} x ${item.product} = ₹${subtotal}
        <button onclick="removeItem(${index})">❌ Remove</button>
      </div>
    `;
  });

  document.getElementById("cart-total").textContent = `Total: ₹${total}`;
}

// 🗑 Remove Item
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// ✅ Place Order via WhatsApp
function placeOrder() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty 🛒");
    return;
  }

  let name = document.getElementById("customer-name").value;
  let phone = document.getElementById("customer-phone").value;
  let address = document.getElementById("customer-address").value;
  let gps = document.getElementById("customer-gps").value;

  if (!name || !phone || !address) {
    alert("Please fill in all required fields (Name, Phone, Address)");
    return;
  }

  let orderText = `🛒 *New Order from BBETA* 🛒\n\n👤 Name: ${name}\n📱 Phone: ${phone}\n📍 Address: ${address}\n🌐 GPS: ${gps || "Not provided"}\n\n*Order Details:*\n`;

  let total = 0;
  cart.forEach(item => {
    let subtotal = item.price * item.qty;
    total += subtotal;
    orderText += `${item.qty} x ${item.product} = ₹${subtotal}\n`;
  });

  orderText += `\n💰 Total: ₹${total}\n\n✅ Thank you for shopping with *BBETA - Apka Apna Bada Beta*`;

  let whatsappUrl = `https://wa.me/917093242271?text=${encodeURIComponent(orderText)}`;
  window.open(whatsappUrl, "_blank");

  localStorage.removeItem("cart");
}

// Load cart on cart.html
if (document.getElementById("cart-items")) {
  displayCart();
}
