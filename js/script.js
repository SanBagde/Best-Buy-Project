
const container = document.getElementById("product-container");

async function loadProducts() {
  try {
    const res = await fetch("http://localhost:3000/products"); // JSON server endpoint
    const data = await res.json();

    container.innerHTML = data.map(item => `
      <div class="card">
        <div class="card-img">
          ${item.discount ? `<span class="discount">${item.discount} off</span>` : ""}
          <img src="${item.img}" alt="${item.name}">
        </div>
        <div class="card-body">
          <h3>${item.name}</h3>
          <p class="price">${item.price}</p>
          ${item.oldPrice ? `<p class="old-price">${item.oldPrice}</p>` : ""}
          <button onclick="addToCart('${item.name}', '${item.price}')">Add to cart</button>
        </div>
      </div>
    `).join("");

  } catch (error) {
    container.innerHTML = `<p class="loading">Failed to load products 😢</p>`;
    console.error(error);
  }
}

function addToCart(name, price) {
  alert(`✅ ${name} added to cart (${price})`);
}

loadProducts();
