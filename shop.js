let products = [
  { id: 1, name: "Bakery", price: 150, image: "images/bakery.jpg" },
  { id: 2, name: "Bread", price: 60, image: "images/bread.jpg" },
  { id: 3, name: "Oil", price: 150, image: "images/oil.jpg" },
  { id: 4, name: "Rice", price: 70, image: "images/rice.jpg" },
  { id: 5, name: "Milk", price: 50, image: "images/milk.jpg" },
  { id: 6, name: "Sugar", price: 45, image: "images/sugar.jpg" },
  { id: 7, name: "Snacks", price: 80, image: "images/snacks.jpg" },
  { id: 8, name: "Vegetables", price: 130, image: "images/vegetables.jpg" },
  { id: 9, name: "Fruits", price: 100, image: "images/fruits.jpg" },
  { id: 10, name: "Tea", price: 110, image: "images/tea.jpg" },
  { id: 11, name: "Dairy", price: 90, image: "images/dairy.jpg" },
  { id: 12, name: "Groceries", price: 200, image: "images/groceries.jpg" },
  { id: 13, name: "Medicines", price: 250, image: "images/medicines.jpg" },
  { id: 14, name: "Cold Drink", price: 35, image: "images/cold_drink.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to render products on homepage
function renderProducts() {
  let productsDiv = document.getElementById("products");
  productsDiv.innerHTML = "";
  products.forEach(product => {
    let productDiv = document.createElement("div");
    productDiv.classList.add("product-card");
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <input type="number" id="qty-${product.id}" value="1" min="1" style="width:50px;">
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsDiv.appendChild(productDiv);
  });
}

// Function to add product to cart
function addToCart(id) {
  let qty = parseInt(document.getElementById(`qty-${id}`).value);
  let product = products.find(p => p.id === id);

  let existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty: qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Function to update cart count in header
function updateCartCount() {
  let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cart-count").textContent = totalQty;
}

// Function to render cart items in cart.html
function renderCart() {
  let cartDiv = document.getElementById("cart-items");
  let totalPrice = 0;
  cartDiv.innerHTML = "";

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Cart is empty</p>";
    document.getElementById("total-price").textContent = "₹0";
    return;
  }

  cart.forEach((item, index) => {
    totalPrice += item.price * item.qty;
    let itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>₹${item.price} x ${item.qty} = ₹${item.price * item.qty}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartDiv.appendChild(itemDiv);
  });

  document.getElementById("total-price").textContent = "₹" + totalPrice;
}

// Function to remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// On page load
if (document.getElementById("products")) {
  renderProducts();
  updateCartCount();
}
if (document.getElementById("cart-items")) {
  renderCart();
  updateCartCount();
}
