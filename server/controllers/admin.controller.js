import asyncHandler from 'express-async-handler';
import { User } from '../models/user.model.js';
import { CustomError } from '../utils/customError.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { success } from 'zod';

////////////////////////////////////////////////////
////GET ALL USERS
export const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({ isAdmin: false })
    .select('-password')
    .lean();
  res.status(200).json({ success: true, allUsers });
});

/////////////////////////////////////////////////////
/////GET A USER

export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id))
    throw new CustomError('User Not found', 400);
  const user = await User.findById(id).select('-password').lean();
  res.json({ success: true, user });
});

////////////////////////////////////////////////////////
/////EDIT A USER

export const editUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  if (!mongoose.isValidObjectId(id))
    throw new CustomError('User Not found', 400);
  const user = await User.findById(id);
  if (!user) throw new CustomError('User not found', 400);
  user.username = username || user.username;
  user.email = email || user.email;
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }
  await user.save();
  res
    .status(200)
    .json({ success: true, message: 'Updated Successfully', user });
});

///////////////////////////////////////////////////////////////
/////////////DELETE A USER
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id))
    throw new CustomError('User not found', 400);
  await User.findByIdAndDelete(id);
  res.status(200).json({ success: true, message: 'User deleted succefully' });
});
