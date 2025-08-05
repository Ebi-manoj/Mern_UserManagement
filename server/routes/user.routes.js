import express from 'express';
import {
  getUserDetails,
  userSignup,
  verifyLogin,
} from '../controllers/user.controller.js';
import { userAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', verifyLogin);
router.post('/signup', userSignup);
router.get('/details', userAuthenticated, getUserDetails);
export default router;
