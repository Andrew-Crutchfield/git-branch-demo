import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import chirpsRouter from './routes/chirps'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use('/chirps', chirpsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Chirper API!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));