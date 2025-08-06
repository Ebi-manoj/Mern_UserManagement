import { CustomError } from '../utils/customError.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const userAuthenticated = asyncHandler(async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer '))
    throw new CustomError('No token Found', 401);
  try {
    const decoded = jwt.verify(auth.split(' ')[1], process.env.ACCESS_TOKEN);
    console.log('id from authmiddleware', decoded);
    req.user = decoded;
    console.log('from midlleware', req.user);
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
});
export const isAdmin = async (req, res, next) => {
  const { id } = req.user;
  if (!id) throw new CustomError('Session expired ,Log in again', 401);
  const user = await User.findById(id).select('-password');

  if (!user?.isAdmin) {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};
