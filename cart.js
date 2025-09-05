// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart function
function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product + " added to cart ✅");
}

// Display cart items
function displayCart() {
  const cartContainer = document.getElementById("cartItems");
  const totalAmount = document.getElementById("totalAmount");

  if (!cartContainer) return; // Agar cart.html pe nahi ho toh skip karo

  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 🛍️</p>";
    if (totalAmount) totalAmount.innerText = "Total: ₹0";
    return;
  }

  cart.forEach((item, index) => {
    // Price nikalne ke liye
    let price = parseInt(item.split("₹")[1]) || 0;
    total += price;

    let div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item}</span>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
  });

  if (totalAmount) totalAmount.innerText = "Total: ₹" + total;
}

// Remove item from cart
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Checkout via WhatsApp
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "🛍️ *New Order from BBETA*%0A%0A";
  let total = 0;

  cart.forEach((item, i) => {
    let price = parseInt(item.split("₹")[1]) || 0;
    total += price;
    message += (i + 1) + ". " + item + "%0A";
  });

  message += "%0A*Total: ₹" + total + "*";

  // Apna WhatsApp number (without +91)
  let phone = "7093242271"; 

  // WhatsApp open karo
  window.open(`https://wa.me/91${phone}?text=${message}`, "_blank");

  // Cart clear
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "thankyou.html"; // Thank You page
}

// Run displayCart if on cart.html
displayCart();
