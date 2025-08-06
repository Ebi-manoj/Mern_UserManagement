import { CustomError } from '../utils/customError.js';
import multer from 'multer';

export const errorHandling = (err, req, res, next) => {
  let message = 'Something went wrong';
  let statusCode = 500;

  if (err instanceof CustomError) {
    message = err.message;
    statusCode = err.statusCode;
  } else if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File too large. Maximum allowed size is 2MB.';
      statusCode = 400;
    } else {
      message = err.message;
      statusCode = 400;
    }
  }

  console.error(err);
  res.status(statusCode).json({ success: false, message });
};
