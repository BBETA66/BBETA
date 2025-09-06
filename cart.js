<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Cart</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background: #f8f9fa;
    }
    .header {
      background: #007bff;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .cart-item {
      background: white;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .total {
      font-size: 1.3rem;
      font-weight: bold;
      color: green;
      margin-top: 10px;
    }
    .whatsapp-btn {
      background: #25d366;
      color: white;
      font-size: 1.2rem;
      padding: 12px;
      border-radius: 8px;
      border: none;
      width: 100%;
    }
    .whatsapp-btn:hover {
      background: #1ebe5a;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>🛒 Your Cart</h2>
    <a href="index.html" class="btn btn-warning mt-2">← Back to Shop</a>
  </div>

  <div class="container my-4">
    <div id="cart-items"></div>
    <div class="total" id="cart-total"></div>

    <h5 class="mt-4">📝 Enter Your Details</h5>
    <input type="tel" id="phone" class="form-control mb-2" placeholder="📞 Enter your phone number">
    <input type="text" id="location" class="form-control mb-3" placeholder="📍 Enter your location">

    <button class="whatsapp-btn" onclick="placeOrder()">
      <i class="bi bi-whatsapp"></i> 📲 Place Order on WhatsApp
    </button>
  </div>

  <script>
    function loadCart() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let cartItemsContainer = document.getElementById("cart-items");
      let cartTotal = document.getElementById("cart-total");

      cartItemsContainer.innerHTML = "";
      let total = 0;

      cart.forEach(item => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `${item.quantity} x ${item.name} = ₹${item.price * item.quantity}`;
        cartItemsContainer.appendChild(itemDiv);

        total += item.price * item.quantity;
      });

      cartTotal.innerHTML = `Total: ₹${total}`;
    }

    function placeOrder() {
      let phone = document.getElementById("phone").value;
      let location = document.getElementById("location").value;
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (!phone || !location) {
        alert("Please enter your phone number and location.");
        return;
      }

      let orderDetails = "🛒 *New Order*%0A%0A";
      cart.forEach(item => {
        orderDetails += `${item.quantity} x ${item.name} = ₹${item.price * item.quantity}%0A`;
      });
      let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      orderDetails += `%0A*Total:* ₹${total}%0A%0A📞 Phone: ${phone}%0A📍 Location: ${location}`;

      let whatsappURL = `https://wa.me/917093242271?text=${orderDetails}`;
      window.open(whatsappURL, "_blank");
    }

    loadCart();
  </script>
</body>
</html>
