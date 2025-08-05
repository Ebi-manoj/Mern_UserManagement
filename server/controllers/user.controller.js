import asyncHandler from 'express-async-handler';
import { CustomError } from '../utils/customError.js';
import { loginSchema, signSchema } from '../utils/validation.js';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';

///////////////////////////////////////////////
///verify Login

export const verifyLogin = asyncHandler(async (req, res) => {
  console.log(req.body);
  const result = loginSchema.safeParse(req.body);
  console.log(result);
  if (!result.success) throw new CustomError('Invalid credintials', 400);
  const { email, password } = result.data;

  const findUser = await User.findOne({ email });
  if (!findUser) throw new CustomError('User not found', 400);
  const isMatch = await bcrypt.compare(password, findUser.password);
  if (!isMatch) throw new CustomError('Invalid Credintials', 400);

  const accessToken = generateAccessToken(findUser);
  const refreshToken = generateRefreshToken(findUser);

  res.cookie('token', refreshToken, {
    httpOnly: true,
    secure: false,
    path: '/auth/refresh',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    accessToken,
    user: {
      id: findUser._id,
      username: findUser.username,
      email: findUser.email,
      isAdmin: findUser.isAdmin,
    },
    success: true,
    message: 'Logged in Successfully',
  });
});

/////////////////////////////////////
///user Signup

export const userSignup = asyncHandler(async (req, res) => {
  console.log(req.body);
  const result = signSchema.safeParse(req.body);
  if (!result.success)
    throw new CustomError('Invalid format of data provided', 400);

  const { username, email, password } = result.data;
  const isExist = await User.findOne({ email });
  if (isExist) throw new CustomError('User already exists!', 400);

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ username, email, password: hashedPassword });

  res.status(201).json({ success: true, message: 'User created Successfully' });
});

export const getUserDetails = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id).select('-password');
  if (!user) throw new CustomError('User not found', 400);
  res.json({ success: true, user });
});
