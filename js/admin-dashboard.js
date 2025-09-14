
let editingProductId = null;

const form = document.getElementById('product-form');
const tbody = document.getElementById('products-tbody');
const submitBtn = form.querySelector('button[type="submit"]');

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.clear(); 
  window.location.href = "/html/index.html"; 
});

async function loadProducts() {
  try {
    const res = await fetch('http://localhost:3000/products');
    const products = await res.json();
    renderProducts(products);
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="5">Failed to load products</td></tr>';
  }
}

function renderProducts(products) {
  tbody.innerHTML = products.map(p => `
    <tr>
      <td>${p.id}</td>
      <td><img src="${p.img || 'https://via.placeholder.com/50'}" alt="${p.name}" /></td>
      <td>${p.name}</td>
      <td>$${p.price.toFixed(2)}</td>
      <td>
        <button onclick="editProduct(${p.id})">Edit</button>
        <button onclick="deleteProduct(${p.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

form.addEventListener('submit', async e => {
  e.preventDefault();

  const productData = {
    name: form.name.value.trim(),
    price: parseFloat(form.price.value),
    oldPrice: parseFloat(form.oldPrice.value) || 0,
    discount: parseFloat(form.discount.value) || 0,
    img: form.img.value.trim() || 'https://via.placeholder.com/200',
    stars: parseFloat(form.stars.value) || 0,
    ratingCount: parseInt(form.ratingCount.value) || 0,
    topDeal: form.topDeal.checked
  };

  try {
    let res;
    if (editingProductId) {
      res = await fetch(`http://localhost:3000/products/${editingProductId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
    } else {
      res = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
    }
    if (!res.ok) throw new Error('Save failed');

    resetForm();
    await loadProducts();

    alert(editingProductId ? 'Product updated!' : 'Product added!');
  } catch (error) {
    alert(error.message);
  }
});

async function editProduct(id) {
  try {
    const res = await fetch(`http://localhost:3000/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    const product = await res.json();

    form.name.value = product.name;
    form.price.value = product.price;
    form.oldPrice.value = product.oldPrice;
    form.discount.value = product.discount;
    form.img.value = product.img;
    form.stars.value = product.stars;
    form.ratingCount.value = product.ratingCount;
    form.topDeal.checked = product.topDeal === true;

    editingProductId = id;
    submitBtn.textContent = 'Update Product';
  } catch (error) {
    alert(error.message);
  }
}

async function deleteProduct(id) {
  if (!confirm('Delete this product?')) return;
  try {
    const res = await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Delete failed');
    await loadProducts();
    alert('Product deleted!');
  } catch (error) {
    alert(error.message);
  }
}

function resetForm() {
  form.reset();
  editingProductId = null;
  submitBtn.textContent = 'Add Product';
}

window.editProduct = editProduct;
window.deleteProduct = deleteProduct;

document.addEventListener('DOMContentLoaded', loadProducts);
