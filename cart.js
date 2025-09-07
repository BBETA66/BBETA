let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cart-items");
const totalEl = document.getElementById("total");

function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty!</p>";
    totalEl.innerText = "";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <p><strong>${item.name}</strong> - ₹${item.price} / ${item.unit}</p>
      <p>Qty: ${item.quantity}</p>
      <p>Subtotal: ₹${item.price * item.quantity}</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;

    cartContainer.appendChild(div);
    total += item.price * item.quantity;
  });

  totalEl.innerText = `Total: ₹${total}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function checkout() {
  window.location.href = "checkout.html";
}

renderCart();
