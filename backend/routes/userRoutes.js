import express from 'express';
import {
  authUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.route('/login').get(authUser);
router.route('/profile').get(protect, getUserProfile);


export default router;
