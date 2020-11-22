import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
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

// Morgan Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// BodyParser
app.use(express.json());

// Static Assets
app.use(express.static(path.join(__dirname, '/uploads')));

// ------------------------------------------------- ROUTES

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/upload', uploadRoutes);

// GET PayPal Client ID for Payment Processing
app.get('/api/v1/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('<h1>Welcome to ProShop API</h1>');
  });
}


// ---------------------------------------------- ERROR HANDLERS

// 404
app.use(notFound);

// Unhandled Errors
app.use(errorHandler);


// ------------------------------------------------ LISTENER

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta.bold);
});
