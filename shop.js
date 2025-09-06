let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to cart
function addToCart(name, price, btn) {
  let qtyInput = btn.parentElement.querySelector("input");
  let quantity = parseInt(qtyInput.value);

  if (quantity < 1) {
    alert("Please select valid quantity!");
    return;
  }

  let existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  saveCart();
  alert(`${name} added to cart!`);
}

// Show cart on cart.html
function displayCart() {
  let cartItemsDiv = document.getElementById("cart-items");
  let totalDiv = document.getElementById("cart-total");
  if (!cartItemsDiv || !totalDiv) return;

  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;

    let div = document.createElement("div");
    div.className = "d-flex justify-content-between align-items-center border p-2 mb-2";
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong> - ₹${item.price} × 
        <input type="number" value="${item.quantity}" min="1" 
          onchange="updateQuantity(${index}, this.value)" 
          style="width:60px;">
      </div>
      <div>
        ₹${itemTotal} 
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">❌</button>
      </div>
    `;
    cartItemsDiv.appendChild(div);
  });

  totalDiv.innerHTML = `<h5>Total: ₹${total}</h5>`;
}

// Update quantity
function updateQuantity(index, qty) {
  qty = parseInt(qty);
  if (qty < 1) {
    removeFromCart(index);
    return;
  }
  cart[index].quantity = qty;
  saveCart();
  displayCart();
}

// Remove item
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

// Checkout via WhatsApp
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let name = prompt("Enter your Name:");
  let address = prompt("Enter your Address:");
  let phone = prompt("Enter your Contact Number:");

  if (!name || !address || !phone) {
    alert("Please fill all details!");
    return;
  }

  let orderText = `🛒 *New Order from BBETA Shop* 🛒\n\n`;
  cart.forEach(item => {
    orderText += `${item.name} - ${item.quantity} × ₹${item.price} = ₹${item.price * item.quantity}\n`;
  });

  let total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  orderText += `\n💰 *Total:* ₹${total}\n\n👤 Name: ${name}\n📍 Address: ${address}\n📞 Contact: ${phone}`;

  let url = `https://wa.me/917093242271?text=${encodeURIComponent(orderText)}`;
  window.open(url, "_blank");

  // Clear cart after checkout
  cart = [];
  saveCart();
  if (document.getElementById("cart-items")) {
    displayCart();
  }
}

// Auto load cart on cart.html
window.onload = function () {
  if (document.getElementById("cart-items")) {
    displayCart();
  }
};
