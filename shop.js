let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, el) {
  let qty = parseInt(el.parentElement.querySelector(".qty").value);
  let item = cart.find(i => i.name === name);
  if (item) {
    item.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${qty} x ${name} added to cart ✅`);
}

function renderCart() {
  let cartItemsDiv = document.getElementById("cart-items");
  let totalDiv = document.getElementById("total");
  if (!cartItemsDiv) return;

  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <p>${item.qty} x ${item.name} = ₹${item.qty * item.price}</p>
      <button onclick="removeItem(${index})">❌ Remove</button>
    `;
    cartItemsDiv.appendChild(div);
    total += item.qty * item.price;
  });

  totalDiv.innerText = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function confirmOrder() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let gps = document.getElementById("gps").value;
  if (!name || !phone || !address) {
    alert("⚠️ Please fill all required fields!");
    return;
  }

  let orderText = "🛒 New Order from BBETA:%0A";
  cart.forEach(item => {
    orderText += `${item.qty} x ${item.name} = ₹${item.qty * item.price}%0A`;
  });
  orderText += `------------------------%0A`;
  orderText += `Total: ₹${cart.reduce((t,i)=>t+i.qty*i.price,0)}%0A`;
  orderText += `📍 Name: ${name}%0A📞 Phone: ${phone}%0A🏠 Address: ${address}%0A`;
  if (gps) orderText += `🌐 GPS: ${gps}%0A`;

  window.open(`https://wa.me/917093242271?text=${orderText}`, "_blank");
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;
      document.getElementById("gps").value = `${lat}, ${lon}`;
    }, function() {
      alert("❌ GPS access denied!");
    });
  } else {
    alert("❌ GPS not supported!");
  }
}

document.addEventListener("DOMContentLoaded", renderCart);
