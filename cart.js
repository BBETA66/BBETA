// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartItems = document.getElementById("cart-items");
let totalEl = document.getElementById("total");

// Display Cart
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty!</p>";
    totalEl.innerText = "Total: ₹0";
    return;
  }

  cart.forEach((item, index) => {
    let price = item.price * item.qty;
    total += price;

    cartItems.innerHTML += `
      <div style="border-bottom:1px solid #ddd; padding:10px;">
        ${item.name} × ${item.qty} = ₹${price}
        <button onclick="removeItem(${index})" style="color:red; margin-left:10px;">❌ Remove</button>
      </div>
    `;
  });

  totalEl.innerText = "Total: ₹" + total;
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// Send order via WhatsApp
function sendOrder() {
  let name = document.getElementById("customerName").value;
  let phone = document.getElementById("customerPhone").value;
  let address = document.getElementById("customerAddress").value;
  let location = document.getElementById("customerLocation").value;

  if (!name || !phone || !address) {
    alert("Please fill in all required fields.");
    return;
  }

  let orderText = `🛒 *New Order from BBETA Shop* \n\n`;
  cart.forEach(item => {
    orderText += `• ${item.name} × ${item.qty} = ₹${item.price * item.qty}\n`;
  });
  orderText += `\nTotal: ${totalEl.innerText}\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n🏠 Address: ${address}\n📍 Location: ${location}`;

  let whatsappURL = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(orderText)}`;
  window.open(whatsappURL, "_blank");
}

// Initialize
renderCart();
