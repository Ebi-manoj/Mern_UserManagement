import express from 'express';
import {
  deleteUser,
  editUser,
  getAllUsers,
  getUser,
} from '../controllers/admin.controller.js';
import { isAdmin, userAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/all-users', userAuthenticated, isAdmin, getAllUsers);
router.get('/user/:id', userAuthenticated, isAdmin, getUser);
router.put('/edit-user/:id', userAuthenticated, isAdmin, editUser);
router.delete('/delete-user/:id', userAuthenticated, isAdmin, deleteUser);

export default router;
