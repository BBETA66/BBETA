// Add to Cart
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

// Display Cart Items
function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemsDiv = document.getElementById("cart-items");
  let total = 0;
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty 🛒</p>";
  } else {
    cart.forEach((item, index) => {
      total += item.price;
      cartItemsDiv.innerHTML += `
        <div class="cart-item d-flex justify-content-between">
          <span>${item.name}</span>
          <span>₹${item.price}</span>
          <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">❌</button>
        </div>
      `;
    });
  }

  document.getElementById("cart-total").innerText = "Total: ₹" + total;
}

// Remove Item
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Checkout via WhatsApp
function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  let message = "🛒 BBETA Order:%0A";
  let total = 0;

  cart.forEach(item => {
    message += `- ${item.name}: ₹${item.price}%0A`;
    total += item.price;
  });

  message += `%0ATotal: ₹${total}`;
  let phone = "917093242271"; // WhatsApp number
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}

// Load Cart on Page Open
if (document.getElementById("cart-items")) {
  displayCart();
}
