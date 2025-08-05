import { CustomError } from '../utils/customError.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

export const userAuthenticated = asyncHandler(async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer '))
    throw new CustomError('No token Found', 401);
  try {
    const decoded = jwt.verify(auth.split(' ')[1], process.env.ACCESS_TOKEN);
    console.log('id from authmiddleware', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
});
