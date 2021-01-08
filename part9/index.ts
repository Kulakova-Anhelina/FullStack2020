import express  from 'express';
import  { BmiValues } from './bmiCalculator';

console.log()
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.get('/bmi?', (req, res) => {
  const bmi : BmiValues ={
    weight: Number(req.query.weight),
    height: Number(req.query.height)

  }
  console.dir(bmi)

  res.send();
});