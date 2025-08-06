import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { CustomError } from '../utils/customError.js';
import dotenv from 'dotenv';

dotenv.config();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new CustomError('Only JPEG, PNG, or WEBP image files are allowed'));
  }
};

const limits = {
  fileSize: 2 * 1024 * 1024,
};
console.log(process.env.CLOUDINARY_API_KEY);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'mern_react/profiles',
    format: async (req, file) => 'webp',
    transformation: [
      { width: 300, height: 300, crop: 'fill', gravity: 'face' },
    ], // Crop around the face
  },
});

export const uploadProfile = multer({
  storage: profileStorage,
  fileFilter,
  limits,
});
