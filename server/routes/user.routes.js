import express from 'express';
import {
  getRefreshToken,
  getUserDetails,
  userSignup,
  verifyLogin,
  logoutUser,
} from '../controllers/user.controller.js';
import { userAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', verifyLogin);
router.post('/signup', userSignup);
router.get('/details', userAuthenticated, getUserDetails);
router.get('/refresh', getRefreshToken);
router.get('/logout', logoutUser);
export default router;
