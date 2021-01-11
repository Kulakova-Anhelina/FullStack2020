import express from 'express';
const app = express();
import cors from 'cors';
import diagnosiesRouter from './src/routes/diagnosies';

app.use(cors());
app.use(express.json());
const PORT = 3001;
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosiesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

