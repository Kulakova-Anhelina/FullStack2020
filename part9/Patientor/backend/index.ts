import express from 'express';
const app = express();
import cors from 'cors';
import diagnosiesRouter from './src/routes/diagnosies';
import patientsRouter from './src/routes/patients';
import bodyParser from 'body-parser';


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const PORT = 3001;
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosiesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

