let cart = [];
let cartCount = 0;

function addToCart(name, price, unit, qtyId) {
  let qty = parseInt(document.getElementById(qtyId).value);
  if (qty > 0) {
    cart.push({ name, price, unit, qty });
    cartCount += qty;
    document.getElementById("cart-count").innerText = cartCount;
    alert(`${qty} ${unit} ${name} added to cart!`);
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  let message = "🛒 *New Order from BBETA*%0A%0A";
  let total = 0;

  cart.forEach(item => {
    message += `• ${item.name} - ${item.qty} ${item.unit} x ₹${item.price} = ₹${item.qty * item.price}%0A`;
    total += item.qty * item.price;
  });

  message += `%0A*Total: ₹${total}*`;

  let phoneNumber = "917093242271"; // apna WhatsApp number
  let url = `https://wa.me/${phoneNumber}?text=${message}`;

  window.open(url, "_blank");
}
