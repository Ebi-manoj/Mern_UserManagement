import asyncHandler from 'express-async-handler';
import { loginSchema } from '../utils/validation';
import { CustomError } from '../utils/customError';

export const verifyLogin = asyncHandler((req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) throw new CustomError('Invalid credintials', 400);
});
