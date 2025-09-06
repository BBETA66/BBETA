function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemsDiv = document.getElementById("cart-items");
  let totalDiv = document.getElementById("cart-total");
  cartItemsDiv.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    let div = document.createElement("div");
    div.textContent = `${item.qty} x ${item.name} - ₹${item.price * item.qty}`;
    cartItemsDiv.appendChild(div);
    total += item.price * item.qty;
  });

  totalDiv.textContent = "Total: ₹" + total;
}

document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;

  if (!name || !phone || !address) {
    alert("Please fill all details");
    return;
  }

  alert("Order placed successfully!\nThank you " + name);
  localStorage.removeItem("cart");
  window.location.href = "thankyou.html";
});

window.onload = loadCart;
