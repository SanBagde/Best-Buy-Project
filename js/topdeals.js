const container = document.getElementById("top-deals-container");
const sortSelect = document.getElementById("sort");
let topDeals = [];

async function loadTopDeals() {
  try {
    const res = await fetch('http://localhost:3000/products');
    const products = await res.json();

    topDeals = products.filter(p => p.topDeal === true);

    if (!topDeals.length) {
      container.innerHTML = '<p>No top deals available.</p>';
      return;
    }

    renderDeals(topDeals);
  } catch {
    container.innerHTML = '<p>Failed to load top deals.</p>';
  }
}

function renderDeals(deals) {
  container.innerHTML = deals.map(p => {
    const priceNum = parseFloat(p.price.replace(/[^0-9.]/g, "")) || 0;
    const discountNum = parseFloat(p.discount.replace(/[^0-9.]/g, "")) || 0;
    return `
      <div class="card">
        <img src="${p.img}" alt="${p.name}" />
        <h2>${p.name}</h2>
        <p>Price: $${priceNum.toFixed(2)}</p>
        <p>Discount: $${discountNum}</p>
      </div>
    `;
  }).join('');
}

sortSelect.addEventListener("change", () => {
  let sortedDeals = [...topDeals];

  if (sortSelect.value === "low-to-high") {
    sortedDeals.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.]/g, "")) || 0;
      const priceB = parseFloat(b.price.replace(/[^0-9.]/g, "")) || 0;
      return priceA - priceB;
    });
  } else if (sortSelect.value === "high-to-low") {
    sortedDeals.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.]/g, "")) || 0;
      const priceB = parseFloat(b.price.replace(/[^0-9.]/g, "")) || 0;
      return priceB - priceA;
    });
  } else {
    renderDeals(topDeals);
    return;
  }

  renderDeals(sortedDeals);
});

loadTopDeals();


function renderDeals(deals) {
  container.innerHTML = deals.map(item => `
    <div class="card">
      <div class="card-img">
        ${item.discount ? `<span class="discount">${item.discount} off</span>` : ""}
        <img src="${item.img}" alt="${item.name}" />
      </div>
      <div class="card-body">
        <h3 title="${item.name}">${item.name}</h3>
        <p class="price">${item.price}</p>
        ${item.oldPrice ? `<p class="old-price">${item.oldPrice}</p>` : ""}
        <button onclick="addToCart('${item.name.replace(/'/g, "\\'")}', '${item.price}')">
          <i class="fa-solid fa-cart-plus"></i> Add to cart
        </button>
      </div>
    </div>
  `).join("");
}

function addToCart(name, price) {
  const product = topDeals.find(item => item.name === name);
  const img = product ? product.img : "";

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const idx = cart.findIndex(item => item.name === name);

  const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));

  if (idx > -1) {
    cart[idx].quantity += 1;
  } else {
    cart.push({ name, price: numericPrice, img, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`✅ ${name} added to cart (${price})`);
}

// Sort functionality
sortSelect.addEventListener("change", () => {
  let sortedDeals = [...topDeals];

  if (sortSelect.value === "low-to-high") {
    sortedDeals.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
      const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
      return priceA - priceB;
    });
  } else if (sortSelect.value === "high-to-low") {
    sortedDeals.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
      const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
      return priceB - priceA;
    });
  }

  renderDeals(sortedDeals);
});

loadTopDeals();
