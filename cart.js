// Load cart from localStorage
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemsDiv = document.getElementById("cart-items");
  let cartTotalSpan = document.getElementById("cart-total");

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "Your cart is empty.";
    cartTotalSpan.innerText = "0";
    return;
  }

  let total = 0;
  let html = "<ul>";
  cart.forEach(item => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;
    html += `<li>${item.name} (${item.quantity}) - ₹${itemTotal}</li>`;
  });
  html += "</ul>";

  cartItemsDiv.innerHTML = html;
  cartTotalSpan.innerText = total;
}

// Handle Place Order
document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("customerName").value;
  let phone = document.getElementById("customerPhone").value;
  let address = document.getElementById("customerAddress").value;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty. Please add items before placing order.");
    return;
  }

  let orderDetails = {
    customer: { name, phone, address },
    items: cart,
    total: document.getElementById("cart-total").innerText
  };

  console.log("Order Placed:", orderDetails);

  // Clear cart after placing order
  localStorage.removeItem("cart");
  alert("✅ Order Placed Successfully!\nThank you for shopping with BBETA.");
  window.location.href = "thankyou.html";
});

window.onload = loadCart;
