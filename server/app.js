import express from 'express';
import { errorHandling } from './middlewares/errorHandling.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello word');
});

app.use(errorHandling);
app.listen(PORT, () => console.log(`Server running on PORT${PORT}`));
