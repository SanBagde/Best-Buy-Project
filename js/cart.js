function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  const cartList = document.getElementById("cart-list");
  const cartSummary = document.getElementById("cart-summary");
  const cart = getCart();

  if (cart.length === 0) {
    cartList.innerHTML = '<p class="empty">Your cart is empty.</p>';
    cartSummary.innerHTML = "";
    document.getElementById("orderBtn").style.display = "none";
    return;
  }

  let total = 0;
  let itemCount = 0;

  cartList.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    itemCount += item.quantity;

    return `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>Price: $${(+item.price).toFixed(2)}</p>
          <p>Quantity: 
            <button onclick="updateQty('${item.name}', -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQty('${item.name}', 1)">+</button>
          </p>
          <button class="remove" onclick="removeItem('${item.name}')">Remove</button>
        </div>
        <div class="item-total">$${itemTotal.toFixed(2)}</div>
      </div>
    `;
  }).join('');

  cartSummary.innerHTML = `
    <p><strong>Total Items:</strong> ${itemCount}</p>
    <p><strong>Total Price:</strong> $${total.toFixed(2)}</p>
  `;
  document.getElementById("orderBtn").style.display = "block";
}


window.updateQty = function(name, delta) {
  let cart = getCart();
  const idx = cart.findIndex(item => item.name === name);
  if (idx > -1) {
    cart[idx].quantity += delta;
    if (cart[idx].quantity < 1) cart[idx].quantity = 1;
    setCart(cart);
    renderCart();
  }
};

window.removeItem = function(name) {
  let cart = getCart().filter(item => item.name !== name);
  setCart(cart);
  renderCart();
};

document.getElementById("orderBtn").addEventListener("click", () => {
  alert("Your order done successfully!");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
});

renderCart();
