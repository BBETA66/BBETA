// Save cart to localStorage
function addToCart(product, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ product, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product + " added to cart!");
  window.location.href = "cart.html"; // direct cart page open
}

// Load cart items on cart.html
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemsDiv = document.getElementById("cart-items");
  let totalPrice = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p class='text-center'>🛒 Your cart is empty</p>";
    document.getElementById("total-price").innerText = "₹0";
    return;
  }

  cartItemsDiv.innerHTML = "";
  cart.forEach((item, index) => {
    totalPrice += item.price;
    let div = document.createElement("div");
    div.className = "card p-2 mb-2";
    div.innerHTML = `
      ${index + 1} x ${item.product} = ₹${item.price}
      <button class="btn btn-sm btn-danger float-end" onclick="removeItem(${index})">Remove</button>
    `;
    cartItemsDiv.appendChild(div);
  });

  document.getElementById("total-price").innerText = "₹" + totalPrice;
}

// Remove item from cart
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Place order on WhatsApp
function placeOrder() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let phone = document.getElementById("phone").value;
  let location = document.getElementById("location").value;

  if (!phone || !location) {
    alert("Please enter phone number and location!");
    return;
  }

  let message = "🛒 *New Order from BBETA Shop*%0A%0A";
  cart.forEach((item, index) => {
    message += `${index + 1}) ${item.product} - ₹${item.price}%0A`;
  });

  let total = cart.reduce((sum, item) => sum + item.price, 0);
  message += `%0ATotal: ₹${total}%0A📞 Phone: ${phone}%0A📍 Location: ${location}`;

  let whatsappNumber = "917093242271"; // your WhatsApp number
  let url = `https://wa.me/${whatsappNumber}?text=${message}`;
  window.open(url, "_blank");
}
