import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(protect, adminOnly, createProduct);
  
router
  .route('/:id/reviews')
  .post(protect, createProductReview);

router.get('/top', getTopProducts);

router
  .route('/:id')
  .get(getProductById)
  .put(protect, adminOnly, updateProduct)
  .delete(protect, adminOnly, deleteProduct);


export default router;
