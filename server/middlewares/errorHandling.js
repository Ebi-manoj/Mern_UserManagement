import { CustomError } from '../utils/customError.js';

export const errorHandling = (err, req, res, next) => {
  const message =
    err instanceof CustomError ? err.message : 'Something went Wrong';
  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  console.log(err);
  res.status(statusCode).json({ success: false, message });
};
