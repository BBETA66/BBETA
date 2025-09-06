// Sample Products (Add images in /images folder)
const products = [
  { id: 1, name: "Tomato", price: 40, image: "images/tomato.jpg" },
  { id: 2, name: "Apple", price: 120, image: "images/apple.jpg" },
  { id: 3, name: "Mango", price: 100, image: "images/mango.jpg" },
  { id: 4, name: "Bread", price: 50, image: "images/bread.jpg" },
  { id: 5, name: "Bakery", price: 150, image: "images/bakery.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Show Products
if (document.getElementById("product-list")) {
  const productList = document.getElementById("product-list");
  products.forEach(p => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price} / kg</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Add to Cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product.name + " added to cart!");
}

// Show Cart
if (document.getElementById("cart-items")) {
  function renderCart() {
    const cartDiv = document.getElementById("cart-items");
    cartDiv.innerHTML = "";
    let total = 0;
    cart.forEach((item, i) => {
      total += item.price * item.qty;
      cartDiv.innerHTML += `
        <div class="cart-item">
          <p>${item.name} - ₹${item.price} x ${item.qty}</p>
          <button onclick="removeFromCart(${i})">Remove</button>
        </div>
      `;
    });
    document.querySelector(".cart-total").innerText = "Total: ₹" + total;
  }
  renderCart();

  function removeFromCart(i) {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Place Order
function placeOrder() {
  const name = document.getElementById("cust-name").value;
  const phone = document.getElementById("cust-phone").value;
  const address = document.getElementById("cust-address").value;
  const location = document.getElementById("cust-location").value;

  if (!name || !phone || !address) {
    alert("Please fill all required fields!");
    return;
  }

  let order = "🛒 *BBETA Order*\n\n";
  cart.forEach(item => {
    order += `${item.name} - ${item.qty}kg = ₹${item.price * item.qty}\n`;
  });
  order += `\n📦 Total: ₹${cart.reduce((t, i) => t + i.price * i.qty, 0)}\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n🏠 Address: ${address}\n📍 Location: ${location}`;

  const url = `https://wa.me/917093242271?text=${encodeURIComponent(order)}`;
  window.open(url, "_blank");
}

// GPS Location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      document.getElementById("cust-location").value = `https://www.google.com/maps?q=${lat},${lon}`;
    });
  } else {
    alert("Geolocation not supported");
  }
}
