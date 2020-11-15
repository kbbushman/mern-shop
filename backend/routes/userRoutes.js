import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();


router.route('/')
  .get(protect, adminOnly, getUsers)
  .post(registerUser);
router.route('/login').post(authUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);


export default router;
