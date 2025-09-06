function addToCart(name, price, btn) {
  let qty = btn.previousElementSibling.value;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    name: name,
    price: price,
    qty: parseInt(qty)
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(qty + " x " + name + " added to cart!");
}
