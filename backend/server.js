import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandlers.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 4000;
const app = express();

// ----------------------------------------------- MIDDLEWARE


// ------------------------------------------------- ROUTES

// Root Route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to ProShop API</h1>');
});

// API Products
app.use('/api/v1/products', productRoutes);


// ---------------------------------------------- ERROR HANDLERS

// 404
app.use(notFound);

// Object ID
app.use(errorHandler);


// ------------------------------------------------ LISTENER

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta.bold);
});