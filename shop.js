// shop.js

let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// Products list
const products = [
  { id: 1, name: "Fresh Apples", price: 50, unit: "kg" },
  { id: 2, name: "Tomatoes", price: 30, unit: "kg" },
  { id: 3, name: "Rice", price: 60, unit: "kg" },
  { id: 4, name: "Sugar", price: 40, unit: "kg" },
  { id: 5, name: "Cooking Oil", price: 120, unit: "litre" },
  { id: 6, name: "Medicines", price: 250, unit: "pack" },
  { id: 7, name: "Cold Drink", price: 35, unit: "bottle" }
];

// Add to Cart function
function addToCart(id) {
  const qtyInput = document.getElementById(`qty-${id}`);
  const quantity = parseInt(qtyInput.value);

  if (quantity < 1) {
    alert("Quantity must be at least 1");
    return;
  }

  const product = products.find(p => p.id === id);

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Update cart count
function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  const el = document.getElementById("cart-count");
  if (el) el.innerText = count;
}
