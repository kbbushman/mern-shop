import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();


router.route('/')
  .get(protect, adminOnly, getUsers)
  .post(registerUser);
router.route('/login')
  .post(authUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/:id')
  .delete(protect, adminOnly, deleteUser);


export default router;
