let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, button) {
  const qty = parseInt(button.parentElement.querySelector(".qty").value);
  cart.push({ name, price, qty });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${qty} x ${name} added to cart`);
}

// Load cart
function loadCart() {
  const cartItems = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");

  if (!cartItems || !totalElement) return;

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item, index) => {
      let itemTotal = item.price * item.qty;
      total += itemTotal;

      cartItems.innerHTML += `
        <div>
          ${item.qty} x ${item.name} - ₹${itemTotal}
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      `;
    });
  }

  totalElement.textContent = "Total: ₹" + total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function placeOrder() {
  const name = document.getElementById("cust-name").value;
  const phone = document.getElementById("cust-phone").value;
  const address = document.getElementById("cust-address").value;

  if (!name || !phone || !address) {
    alert("Please fill all customer details!");
    return;
  }

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  localStorage.removeItem("cart");
  window.location.href = "thankyou.html";
}

if (document.getElementById("cart-items")) {
  loadCart();
}
