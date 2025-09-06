// Checkout via WhatsApp
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let name = document.getElementById("customer-name").value.trim();
  let phone = document.getElementById("customer-phone").value.trim();
  let address = document.getElementById("customer-location").value.trim();

  if (!name || !phone || !address) {
    alert("Please enter all details (Name, Phone, Location).");
    return;
  }

  let orderText = `🛒 *New Order from BBETA Shop* 🛒\n\n`;
  cart.forEach(item => {
    orderText += `${item.name} - ${item.quantity} × ₹${item.price} = ₹${item.price * item.quantity}\n`;
  });

  let total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  orderText += `\n💰 *Total:* ₹${total}\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📍 Location: ${address}`;

  let url = `https://wa.me/917093242271?text=${encodeURIComponent(orderText)}`;
  window.open(url, "_blank");

  // Clear cart
  cart = [];
  saveCart();
  displayCart();
}
