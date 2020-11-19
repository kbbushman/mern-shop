import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandlers.js';

dotenv.config();
connectDB();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 4000;

// ----------------------------------------------- MIDDLEWARE

// BodyParser
app.use(express.json());

// Static Assets
app.use(express.static(path.join(__dirname, '/uploads')));

// ------------------------------------------------- ROUTES

// Root Route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to ProShop API</h1>');
});

// API Products
app.use('/api/v1/products', productRoutes);
// API Users
app.use('/api/v1/users', userRoutes);
// API Orders
app.use('/api/v1/orders', orderRoutes);
// API Uploads
app.use('/api/v1/upload', uploadRoutes);

// GET PayPal Client ID for Payment Processing
app.get('/api/v1/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});


// ---------------------------------------------- ERROR HANDLERS

// 404
app.use(notFound);

// Object ID
app.use(errorHandler);


// ------------------------------------------------ LISTENER

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta.bold);
});
