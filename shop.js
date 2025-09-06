// shop.js

const products = [
  { name: "Fresh Fruits", price: 50, unit: "/kg", image: "images/fruits.jpg" },
  { name: "Vegetables", price: 30, unit: "/kg", image: "images/vegetables.jpg" },
  { name: "Bakery", price: 50, unit: "/item", image: "images/bakery.jpg" },
  { name: "Bread", price: 30, unit: "/item", image: "images/bread.jpg" },
  { name: "Cold Drink", price: 35, unit: "/bottle", image: "images/cold_drink.jpg" },
  { name: "Dairy", price: 25, unit: "/litre", image: "images/milk.jpg" },
  { name: "Snacks", price: 20, unit: "/packet", image: "images/snacks.jpg" },
  { name: "Cooking Oil", price: 150, unit: "/litre", image: "images/oil.jpg" }
];

function loadProducts() {
  const shopContainer = document.getElementById("shop");
  shopContainer.innerHTML = "";

  products.forEach((product, index) => {
    const productCard = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price} ${product.unit}</p>
        <input type="number" id="qty-${index}" value="1" min="1">
        <button onclick="addToCart(${index})">Add to Cart</button>
      </div>
    `;
    shopContainer.innerHTML += productCard;
  });
}

function addToCart(index) {
  const qty = parseInt(document.getElementById(`qty-${index}`).value);
  const product = products[index];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ ...product, qty });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

window.onload = loadProducts;
