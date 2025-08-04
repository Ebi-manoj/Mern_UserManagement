import asyncHandler from 'express-async-handler';
import { CustomError } from '../utils/customError.js';
import { loginSchema } from '../../client/src/utils/validations.js';

export const verifyLogin = asyncHandler((req, res) => {
  console.log(req.body);
  const result = loginSchema.safeParse(req.body);
  console.log(result);
  if (!result.success) throw new CustomError('Invalid credintials', 400);
  res.status(200).json({ success: true, message: 'yes' });
});
