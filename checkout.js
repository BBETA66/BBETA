let cart = JSON.parse(localStorage.getItem("cart")) || [];
const summary = document.getElementById("order-summary");

function renderSummary() {
  if (cart.length === 0) {
    summary.innerHTML = "<p>No items in cart!</p>";
    return;
  }

  let msg = "🛒 Your Order:\n\n";
  let total = 0;

  cart.forEach(item => {
    msg += `${item.name} - ${item.quantity} ${item.unit} x ₹${item.price} = ₹${item.price * item.quantity}\n`;
    total += item.price * item.quantity;
  });

  msg += `\n💰 Total: ₹${total}`;
  summary.innerText = msg;
}

function sendWhatsApp() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  let text = "Hello, I want to place this order:\n\n";
  let total = 0;

  cart.forEach(item => {
    text += `${item.name} - ${item.quantity} ${item.unit} = ₹${item.price * item.quantity}\n`;
    total += item.price * item.quantity;
  });

  text += `\nTotal: ₹${total}`;
  text += "\n\nPlease confirm my order.";

  const phone = "917093242271"; // WhatsApp Number
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank");
}

renderSummary();
