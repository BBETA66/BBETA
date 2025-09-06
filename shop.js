const products = [
  { name: "Bakery", price: 150, image: "assets/bakery.jpg" },
  { name: "Bread", price: 60, image: "assets/bread.jpg" },
  { name: "Oil", price: 150, image: "assets/oil.jpg" },
  { name: "Rice", price: 70, image: "assets/rice.jpg" },
  { name: "Milk", price: 50, image: "assets/milk.jpg" },
  { name: "Sugar", price: 45, image: "assets/sugar.jpg" },
  { name: "Snacks", price: 80, image: "assets/snacks.jpg" },
  { name: "Vegetables", price: 130, image: "assets/vegetables.jpg" },
  { name: "Fruits", price: 100, image: "assets/fruits.jpg" },
  { name: "Tea", price: 110, image: "assets/tea.jpg" },
  { name: "Dairy", price: 90, image: "assets/dairy.jpg" },
  { name: "Groceries", price: 200, image: "assets/groceries.jpg" },
  { name: "Medicines", price: 250, image: "assets/medicines.jpg" },
  { name: "Cold Drink", price: 35, image: "assets/cold_drink.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;
  productList.innerHTML = "";
  products.forEach((p, index) => {
    productList.innerHTML += `
      <div class="col-md-3">
        <div class="card product-card shadow-sm">
          <img src="${p.image}" class="card-img-top" alt="${p.name}">
          <div class="card-body text-center">
            <h5>${p.name}</h5>
            <p>₹${p.price}</p>
            <input type="number" id="qty-${index}" value="1" min="1" class="form-control mb-2">
            <button class="btn btn-primary w-100" onclick="addToCart(${index})">Add to Cart</button>
          </div>
        </div>
      </div>`;
  });
}

function addToCart(index) {
  const qty = parseInt(document.getElementById(`qty-${index}`).value);
  const product = products[index];
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    const sub = item.price * item.qty;
    total += sub;
    cartItems.innerHTML += `
      <div class="d-flex justify-content-between align-items-center border p-2 mb-2">
        <span>${item.name} (x${item.qty})</span>
        <span>₹${sub}</span>
        <button class="btn btn-danger btn-sm" onclick="removeItem(${i})">X</button>
      </div>`;
  });

  cartTotal.innerText = total;
}

function removeItem(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      document.getElementById("gps-location").value = `https://maps.google.com/?q=${lat},${lon}`;
    });
  } else {
    alert("GPS not supported!");
  }
}

function sendToWhatsApp() {
  const name = document.getElementById("customer-name").value;
  const phone = document.getElementById("customer-phone").value;
  const address = document.getElementById("customer-address").value;
  const gps = document.getElementById("gps-location").value;

  let message = `🛒 New Order from BBETA\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n🏠 Address: ${address}\n📍 GPS: ${gps}\n\nItems:\n`;
  let total = 0;
  cart.forEach(item => {
    const sub = item.price * item.qty;
    total += sub;
    message += `- ${item.name} x${item.qty} = ₹${sub}\n`;
  });
  message += `\nTotal: ₹${total}`;

  const url = `https://wa.me/917093242271?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

displayProducts();
displayCart();
