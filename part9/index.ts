import express from 'express';
import  { BmiValues } from './bmiCalculator';
import calculateBmi from './bmiCalculator'
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
if(isNaN(bmi.weight) || isNaN(bmi.height)){
  res.status(400).send({error: 'malformatted parameters'})
}
const m : string = calculateBmi(bmi.weight, bmi.height)
res.send({weight: bmi.weight, height: bmi.height, bmi: m})
});