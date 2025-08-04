import express from 'express';
import { errorHandling } from './middlewares/errorHandling.js';
import userRouter from '../server/routes/user.routes.js';
import { connectDb } from './config/connectDb.js';
import { configDotenv } from 'dotenv';

configDotenv();
const app = express();
const PORT = process.env.PORT || 3000;
connectDb();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello word');
});

app.use('/user', userRouter);

app.use(errorHandling);
app.listen(PORT, () => console.log(`Server running on PORT${PORT}`));
