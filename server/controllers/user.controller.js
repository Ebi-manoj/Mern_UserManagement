import asyncHandler from 'express-async-handler';
import { CustomError } from '../utils/customError.js';
import { loginSchema, signSchema } from '../utils/validation.js';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';

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
    path: '/user/refresh',
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
      profileImg: findUser?.profileImg ?? null,
    },
    success: true,
    message: 'Logged in Successfully',
  });
});

/////////////////////////////////////
///user Signup

export const userSignup = asyncHandler(async (req, res) => {
  const result = signSchema.safeParse(req.body);
  if (!result.success)
    throw new CustomError('Invalid format of data provided', 400);

  const { username, email, password } = result.data;
  const isExist = await User.findOne({ email });
  if (isExist) throw new CustomError('User already exists!', 400);

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res
    .status(201)
    .json({ success: true, message: 'User created Successfully', createdUser });
});

///////////////////////////////////////////
///GET USER DETAILS
export const getUserDetails = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id).select('-password');
  if (!user) throw new CustomError('User not found', 400);
  res.json({ success: true, user });
});

////////////////////////////////////////////////
/////PROFILE UPLOAD

export const profileUpload = asyncHandler(async (req, res) => {
  console.log('Reached here');
  const { id } = req.user;
  const user = await User.findById(id).select('-password');
  if (user?.profileImg) {
    const publicId = user.profileImg.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`mern_react/profiles/${publicId}`);
  }
  user.profileImg = req.file.path;
  await user.save();
  res.json({ success: true, user, message: 'Uploaded succefully' });
});

////////////////////////////////////////////////
/////LOGOUT THE USER

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    path: '/user/refresh',
  });
  res.status(200).json({ success: true, message: 'Logout succefully' });
});

//////////////////////////////////////////////
////GET REFRESH TOKEN

export const getRefreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.token;
  if (!token) throw new CustomError('No token Provided', 401);

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
    const user = await User.findById(decoded.id).select('-password');
    const accessToken = generateAccessToken(user);
    res.status(200).json({ accessToken, user, success: true });
  } catch (error) {
    throw new CustomError('Token expired', 403);
  }
});
