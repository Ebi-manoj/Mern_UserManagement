import express from 'express';
import { verifyLogin } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/login', verifyLogin);

export default router;
