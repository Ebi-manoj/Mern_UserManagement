import express from 'express';
import { userSignup, verifyLogin } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/login', verifyLogin);
router.post('/signup', userSignup);
export default router;
