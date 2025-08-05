import jwt from 'jsonwebtoken';

export const generateAccessToken = user => {
  return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN, {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = user => {
  return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN, {
    expiresIn: '7d',
  });
};
