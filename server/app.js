import express from 'express';
import { errorHandling } from './middlewares/errorHandling.js';
import userRouter from '../server/routes/user.routes.js';
import { connectDb } from './config/connectDb.js';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

configDotenv();
const app = express();
const PORT = process.env.PORT || 3000;
connectDb();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/users/random', (req, res) => {
  res.status(200).json({ message: 'Hello word' });
});

app.use('/user', userRouter);

app.use(errorHandling);
app.listen(PORT, () => console.log(`Server running on PORT${PORT}`));
