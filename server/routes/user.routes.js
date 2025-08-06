import express from 'express';
import {
  getRefreshToken,
  getUserDetails,
  userSignup,
  verifyLogin,
  logoutUser,
  profileUpload,
} from '../controllers/user.controller.js';

import { userAuthenticated } from '../middlewares/auth.middleware.js';
import { uploadProfile } from '../config/cloudinary.js';

const router = express.Router();

router.post('/login', verifyLogin);
router.post('/signup', userSignup);
router.get('/details', userAuthenticated, getUserDetails);
router.get('/refresh', getRefreshToken);
router.get('/logout', logoutUser);
router.post(
  '/profile/upload',
  userAuthenticated,
  uploadProfile.single('file'),
  profileUpload
);
export default router;
