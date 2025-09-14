const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

let products = [
  {
    id: 1,
    name: "Bose - QuietComfort Wireless Noise Cancelling Over-the-Ear Bluetooth Headphones - Black",
    price: 229.00,
    oldPrice: 359.00,
    discount: 130,
    img: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6418/6418599_sd.jpg",
    stars: 4.5,
    ratingCount: 862
  },
  {
    id: 2,
    name: "Bose - SoundLink Max Portable Bluetooth Speaker - Black",
    price: 329.00,
    oldPrice: 399.00,
    discount: 70,
    img: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6507/6507982_sd.jpg",
    stars: 4.8,
    ratingCount: 442
  },
  {
    id: 3,
    name: "Bose - Smart Ultra Soundbar with Dolby Atmos and Voice Assistant - Black",
    price: 699.99,
    oldPrice: 999.99,
    discount: 300,
    img: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6535/6535041_sd.jpg",
    stars: 4.6,
    ratingCount: 598
  }
];

let nextId = products.length + 1;


app.get('/api/products', (req, res) => {
  console.log('GET /api/products - Fetching all products');
  res.json(products);
});

app.get('/', (req, res) => {
  res.redirect('/html/deals-of-the-day.html'); 
});


app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  console.log(`GET /api/products/${id} - Found product:`, product.name);
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const { name, price, oldPrice, discount, img, stars, ratingCount } = req.body;
  
  const newProduct = {
    id: nextId++,
    name: name || 'New Product',
    price: parseFloat(price) || 0,
    oldPrice: parseFloat(oldPrice) || 0,
    discount: parseFloat(discount) || 0,
    img: img || 'https://via.placeholder.com/200',
    stars: parseFloat(stars) || 0,
    ratingCount: parseInt(ratingCount) || 0
  };
  
  products.push(newProduct);
  console.log('POST /api/products - Created new product:', newProduct.name);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const { name, price, oldPrice, discount, img, stars, ratingCount } = req.body;
  
  products[productIndex] = {
    ...products[productIndex],
    name: name || products[productIndex].name,
    price: parseFloat(price) || products[productIndex].price,
    oldPrice: parseFloat(oldPrice) || products[productIndex].oldPrice,
    discount: parseFloat(discount) || products[productIndex].discount,
    img: img || products[productIndex].img,
    stars: parseFloat(stars) || products[productIndex].stars,
    ratingCount: parseInt(ratingCount) || products[productIndex].ratingCount
  };
  
  console.log(`PUT /api/products/${id} - Updated product:`, products[productIndex].name);
  res.json(products[productIndex]);
});

app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const deletedProduct = products.splice(productIndex, 1)[0];
  console.log(`DELETE /api/products/${id} - Deleted product:`, deletedProduct.name);
  res.json({ message: 'Product deleted successfully', product: deletedProduct });
});

app.get('/deals', (req, res) => {
  console.log('GET /deals - Legacy endpoint called');
  res.json(products);
});


app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/top-deals', (req, res) => {
  const topDeals = products.filter(p => p.topDeal === true);
  res.json(topDeals);
});


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📱 Admin Dashboard: http://localhost:${port}/html/admin-dashboard.html`);
  console.log(`🛒 Deals Page: http://localhost:${port}/html/deals-of-the-day.html`);
});
