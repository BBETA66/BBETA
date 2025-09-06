// -----------------------------
// 🛒 SHOP.JS (Final Version)
// -----------------------------

// Get cart from localStorage or empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ Add to Cart Function
function addToCart(productName, price, button) {
  const qtyInput = button.parentElement.querySelector(".qty");
  const qty = parseInt(qtyInput.value);

  if (qty > 0) {
    cart.push({ name: productName, price: price, qty: qty });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${qty} x ${productName} added to cart 🛒`);
  }
}

// ✅ Load Cart Items on cart.html
function loadCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  const totalAmountSpan = document.getElementById("total-amount");

  if (!cartItemsDiv || !totalAmountSpan) return;

  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    if (item.qty && item.price) {
      const itemTotal = item.qty * item.price;
      total += itemTotal;

      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        ${item.qty} x ${item.name} = ₹${itemTotal}
        <button onclick="removeItem(${index})" style="margin-left:10px;color:red;">❌</button>
      `;
      cartItemsDiv.appendChild(div);
    }
  });

  totalAmountSpan.textContent = total;
}

// ✅ Remove item from cart
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ✅ Clear Cart
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  loadCart();
}

// ✅ Place Order on WhatsApp
function placeOrder() {
  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const address = document.getElementById("customer-address").value.trim();

  if (!name || !phone) {
    alert("⚠️ Please enter your name & mobile number");
    return;
  }

  let orderText = `🛒 *New Order from BBETA* 🛒\n\n`;
  cart.forEach(item => {
    orderText += `${item.qty} x ${item.name} = ₹${item.qty * item.price}\n`;
  });
  orderText += `\n*Total:* ₹${document.getElementById("total-amount").textContent}\n\n`;
  orderText += `👤 Name: ${name}\n📞 Phone: ${phone}\n🏠 Address: ${address || "Not Provided"}\n`;

  const whatsappNumber = "917093242271"; // Change if needed
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;
  window.open(url, "_blank");
}

// ✅ Detect Current Location
function useCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      document.getElementById("customer-address").value =
        `https://www.google.com/maps?q=${lat},${lng}`;
    });
  } else {
    alert("Geolocation not supported on this browser.");
  }
}

// ✅ Run loadCart if on cart.html
window.onload = function () {
  if (document.getElementById("cart-items")) {
    loadCart();
  }
};
