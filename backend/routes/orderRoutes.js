import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(protect, adminOnly, getOrders)
  .post(protect, addOrderItems);
router
  .route('/myOrders')
  .get(protect, getMyOrders);
router
  .route('/:id')
  .get(protect, getOrderById);
router
  .route('/:id/pay')
  .put(protect, updateOrderToPaid);


export default router;
