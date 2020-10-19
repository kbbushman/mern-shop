import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

// ----------------------------------------------- MIDDLEWARE


// ------------------------------------------------- ROUTES

// Root Route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to ProShop API</h1>');
});

// API Products Index
app.get('/api/v1/products', (req, res) => {
  res.json(products);
});

// API Products Show
app.get('/api/v1/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

// ------------------------------------------------ LISTENER

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
