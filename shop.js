/* ===== Cart helpers (localStorage) ===== */
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ===== Index page: Add to Cart ===== */
function addToCart(name, price, btn) {
  const qtyInput = btn.previousElementSibling;
  const qty = Math.max(1, parseInt(qtyInput.value || "1", 10));

  let cart = getCart();

  const existing = cart.find(item => item.name === name && item.price === price);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }
  saveCart(cart);

  // Update header count if present
  updateCartCount();

  alert(`${qty} x ${name} added to cart!`);
}

/* ===== Header Cart Count (both pages) ===== */
function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (!el) return;
  const cart = getCart();
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  el.textContent = totalQty;
}

/* ===== Cart page rendering ===== */
function renderCart() {
  const wrap = document.getElementById("cart-items");
  if (!wrap) return;

  const cart = getCart();
  wrap.innerHTML = "";

  if (cart.length === 0) {
    wrap.innerHTML = `<p>Your cart is empty.</p>`;
    document.getElementById("total-qty").textContent = "0";
    document.getElementById("total-price").textContent = "0";
    return;
  }

  let totalQty = 0;
  let totalPrice = 0;

  cart.forEach((item, idx) => {
    totalQty += item.qty;
    totalPrice += item.qty * item.price;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <p><strong>${item.name}</strong><br>₹${item.price} × 
        <input type="number" min="1" value="${item.qty}" class="line-qty" data-index="${idx}" />
        = ₹${item.price * item.qty}
      </p>
      <button onclick="removeItem(${idx})">Remove</button>
    `;
    wrap.appendChild(row);
  });

  document.getElementById("total-qty").textContent = totalQty;
  document.getElementById("total-price").textContent = totalPrice;

  // Attach change listeners for qty inputs
  wrap.querySelectorAll(".line-qty").forEach(inp => {
    inp.addEventListener("change", (e) => {
      const index = parseInt(e.target.getAttribute("data-index"), 10);
      let cartNow = getCart();
      const newQty = Math.max(1, parseInt(e.target.value || "1", 10));
      cartNow[index].qty = newQty;
      saveCart(cartNow);
      renderCart();
      updateCartCount();
    });
  });
}

function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
  updateCartCount();
}

/* ===== GPS capture ===== */
function getLocation() {
  const status = document.getElementById("gpsStatus");
  const gpsLink = document.getElementById("gpsLink");
  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported on this device.";
    return;
  }
  status.textContent = "Getting your location…";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      const link = `https://maps.google.com/?q=${latitude},${longitude}`;
      gpsLink.value = link;
      status.innerHTML = `📍 Location captured: <a href="${link}" target="_blank">Open in Maps</a>`;
    },
    (err) => {
      status.textContent = "Unable to fetch GPS location. Please enter address manually.";
    },
    { enableHighAccuracy: true, timeout: 15000 }
  );
}

/* ===== WhatsApp checkout ===== */
function sendOrder() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  // Customer details
  const name = (document.getElementById("custName") || {}).value || "";
  const phone = (document.getElementById("custPhone") || {}).value || "";
  const addr  = (document.getElementById("custAddress") || {}).value || "";
  const gps   = (document.getElementById("gpsLink") || {}).value || "";

  // Build order text
  let lines = [];
  lines.push("🛒 *New Order from BBETA*");
  lines.push("");

  let total = 0;
  cart.forEach(it => {
    const line = `${it.qty} × ${it.name} = ₹${it.qty * it.price}`;
    total += it.qty * it.price;
    lines.push(line);
  });

  lines.push("");
  lines.push(`*Total:* ₹${total}`);
  lines.push("");
  if (name)  lines.push(`👤 *Name:* ${name}`);
  if (phone) lines.push(`📞 *Contact:* ${phone}`);
  if (addr)  lines.push(`🏠 *Address:* ${addr}`);
  if (gps)   lines.push(`📍 *GPS:* ${gps}`);

  // Destination = Merchant WhatsApp
  const merchant = "917093242271";
  const text = encodeURIComponent(lines.join("\n"));
  const waUrl = `https://wa.me/${merchant}?text=${text}`;

  window.open(waUrl, "_blank");

  // (optional) Clear cart after opening WhatsApp:
  // localStorage.removeItem("cart");
  // renderCart();
  // updateCartCount();
}

/* ===== Init on load ===== */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart(); // will only run on cart page
});
