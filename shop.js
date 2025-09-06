// 🛍️ Product Data
const products = [
  { name: "Fresh Apples", price: 50, img: "assets/fruits.jpg" },
  { name: "Tomatoes", price: 30, img: "assets/vegetables.jpg" },
  { name: "Rice", price: 60, img: "assets/rice.jpg" },
  { name: "Sugar", price: 40, img: "assets/sugar.jpg" },
  { name: "Cooking Oil", price: 150, img: "assets/oil.jpg" },
  { name: "Milk", price: 25, img: "assets/milk.jpg" },
  { name: "Bread", price: 30, img: "assets/bread.jpg" },
  { name: "Tea", price: 120, img: "assets/tea.jpg" },
  { name: "Snacks", price: 20, img: "assets/snacks.jpg" },
  { name: "Cold Drink", price: 35, img: "assets/cold_drink.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 📌 Show Products in Index
function displayProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";
  products.forEach(p => {
    productList.innerHTML += `
      <div class="product">
        <img src="${p.img}" alt="${p.name}">
        <h2>${p.name}</h2>
        <p>₹${p.price}</p>
        <input type="number" value="1" min="1" class="qty">
        <button onclick="addToCart('${p.name}', ${p.price}, this)">Add to Cart</button>
      </div>
    `;
  });
}

// 🛒 Add to Cart
function addToCart(name, price, btn) {
  const qty = parseInt(btn.parentElement.querySelector(".qty").value);
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// 📌 Show Cart in cart.html
function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    cartItems.innerHTML += `
      <div class="cart-item">
        <p>${item.name} - ₹${item.price} x ${item.qty} = ₹${itemTotal}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });

  cartTotal.innerText = `Total: ₹${total}`;
}

// 🗑 Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// ✅ Place Order via WhatsApp
function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const phone = document.getElementById("customer-phone").value.trim();
  const location = document.getElementById("customer-location").value.trim();

  if (!phone || !location) {
    alert("Please enter your phone number and location!");
    return;
  }

  let orderMsg = "🛒 *New Order from BBETA:*\n\n";
  cart.forEach(item => {
    orderMsg += `${item.qty} x ${item.name} = ₹${item.price * item.qty}\n`;
  });

  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  orderMsg += `\n💰 *Total:* ₹${total}\n`;
  orderMsg += `📞 *Customer Number:* ${phone}\n`;
  orderMsg += `📍 *Location:* ${location}\n`;

  const whatsappNumber = "917093242271"; // Your WhatsApp number
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderMsg)}`;

  window.open(url, "_blank");
}

// 📌 Run
displayProducts();
displayCart();
