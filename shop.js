const products = [
  { id: 1, name: "Fresh Fruits", price: 50, image: "https://i.ibb.co/8m2tWgJ/fruits.jpg" },
  { id: 2, name: "Vegetables", price: 30, image: "https://i.ibb.co/1ZcL2L7/vegetables.jpg" },
  { id: 3, name: "Bakery", price: 80, image: "https://i.ibb.co/6bKQdX9/bakery.jpg" },
  { id: 4, name: "Bread", price: 30, image: "https://i.ibb.co/3cG9NDb/bread.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const shopContainer = document.getElementById("shop");

products.forEach(product => {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>₹${product.price} / kg</p>
    <input type="number" id="qty-${product.id}" min="1" value="1">
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  shopContainer.appendChild(card);
});

function addToCart(id) {
  const qty = parseInt(document.getElementById(`qty-${id}`).value);
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product.name + " added to cart!");
}
