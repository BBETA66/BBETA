let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsDiv = document.getElementById("cart-items");
const totalDiv = document.getElementById("total");

function renderCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.qty;
    total += itemTotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      ${item.name} - ₹${item.price} × ${item.qty} = ₹${itemTotal}
      <button onclick="removeItem(${index})">❌ Remove</button>
    `;
    cartItemsDiv.appendChild(div);
  });

  totalDiv.innerText = "Total: ₹" + total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("customerName").value;
  const phone = document.getElementById("customerPhone").value;
  const address = document.getElementById("customerAddress").value;
  const map = document.getElementById("customerMap").value;

  let orderDetails = "🛍️ *New Order Received* 🛍️\n\n";
  cart.forEach(item => {
    orderDetails += `${item.name} × ${item.qty} = ₹${item.price * item.qty}\n`;
  });

  orderDetails += `\n💰 Total: ₹${cart.reduce((t, i) => t + i.price * i.qty, 0)}`;
  orderDetails += `\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📍 Address: ${address}`;
  if (map) orderDetails += `\n🌐 Map: ${map}`;

  const whatsappURL = `https://wa.me/917093242271?text=${encodeURIComponent(orderDetails)}`;
  window.open(whatsappURL, "_blank");
});

renderCart();
