// Load Cart
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalSpan = document.getElementById("cart-total");

  if (cartItemsDiv) {
    if (cart.length === 0) {
      cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      let html = "<ul>";
      let total = 0;
      cart.forEach(item => {
        html += `<li>${item.name} - ${item.qty} x ₹${item.price} = ₹${item.qty * item.price}</li>`;
        total += item.qty * item.price;
      });
      html += "</ul>";
      cartItemsDiv.innerHTML = html;
      cartTotalSpan.textContent = total;
    }
  }
}
loadCart();

// Add to Cart
function addToCart(name, price, btn) {
  const qty = parseInt(btn.previousElementSibling.value);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, qty });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${qty} ${name} added to cart`);
}

// Place Order
const placeOrderBtn = document.getElementById("place-order");
if (placeOrderBtn) {
  placeOrderBtn.addEventListener("click", () => {
    const name = document.getElementById("cust-name").value.trim();
    const phone = document.getElementById("cust-phone").value.trim();
    const address = document.getElementById("cust-address").value.trim();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!name || !phone || !address || cart.length === 0) {
      alert("Please fill details and add items to cart.");
      return;
    }

    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const orderDetails = {
      items: cart,
      total,
      customer: { name, phone, address }
    };

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    localStorage.removeItem("cart");
    window.location.href = "thankyou.html";
  });
}
