const dealsContainer = document.getElementById("deals-container");

async function loadDeals() {
  try {
    const res = await fetch("http://localhost:3000/deals");
    const products = await res.json();

    dealsContainer.innerHTML = products.map(deal => `
      <div class="deal-card">
        <span class="deal-save">Save $${deal.discount}</span>
        <img src="${deal.img}" alt="${deal.name}" onerror="this.src='https://via.placeholder.com/200'">
        <div class="deal-title">${deal.name}</div>
        <div class="deal-rating">
          <span class="stars">${"★".repeat(Math.round(deal.stars || 0))}</span>
          <span class="count">(${deal.ratingCount || 0})</span>
        </div>
        <div class="price-section">
          <div class="deal-price">$${deal.price.toFixed(2)}</div>
          <div class="deal-old-price">$${deal.oldPrice.toFixed(2)}</div>
        </div>
        <div class="deal-actions">
          <button class="add-cart" onclick="addToCart('${deal.name}', ${deal.price}, '${deal.img}')">Add to cart</button>
          <button class="save-btn"><i class="fa-regular fa-heart"></i></button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    dealsContainer.innerHTML = `<p class="loading">Failed to load deals 😢</p>`;
  }
}

loadDeals();



window.addToCart = function(name, price, img) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const idx = cart.findIndex(item => item.name === name);
  if (idx > -1) {
    cart[idx].quantity += 1;
  } else {
    cart.push({ name, price, img, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
};

loadDeals();
