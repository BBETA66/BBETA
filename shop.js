const items = [
  { id: 1, name: "Cold Drink", price: 35 },
  { id: 2, name: "Milk", price: 25 },
  { id: 3, name: "Fresh Apples", price: 50 },
  { id: 4, name: "Snacks", price: 20 }
];

function displayItems() {
  let shopContainer = document.getElementById("shop-items");
  shopContainer.innerHTML = "";

  items.forEach(item => {
    let div = document.createElement("div");
    div.classList.add("col-md-3", "mb-4");

    div.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-body text-center">
          <h5>${item.name}</h5>
          <p>₹${item.price}</p>
          <button class="btn btn-primary" onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
      </div>
    `;

    shopContainer.appendChild(div);
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let item = items.find(i => i.id === id);
  let existing = cart.find(i => i.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(item.name + " added to cart!");
}

displayItems();
