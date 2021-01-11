/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';
import { BmiValues } from './bmiCalculator';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import { AcivityConfig } from './exerciseCalculator';
import bodyParser from 'body-parser';



const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi?', (req, res) => {
  const bmi: BmiValues = {
    weight: Number(req.query.weight),
    height: Number(req.query.height)
  };
  if (isNaN(bmi.weight) || isNaN(bmi.height)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  const m: string = calculateBmi(bmi.weight, bmi.height);
  res.send({ weight: bmi.weight, height: bmi.height, bmi: m });
});

app.get('/exercises', (req, res) => {
  const activity: AcivityConfig = {
    periodLength: Number(req.query.periodLength),
    trainingDays: Number(req.query.trainingDays),
    success: Boolean(req.query.success),
    rating: Number(req.query.rating),
    ratingDescription: String(req.query.ratingDescription),
    target: Number(req.query.target),
    average: Number(req.query.average)
  };

  res.send(activity);

});

app.post('/exercises', (req, res) => {
  const body = req.body;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
console.log(body, "I am body");
  const daily_exercises: number[] = body.daily_exercises;
  const target: number = body.target;
  if (!body.daily_exercises || !body.target) {
    res.status(400).json({
      status: 'error',
      error: 'parameters missing',
    });
  }
  if(isNaN(Number(target) )){
    res.status(400).json({
      header: "application/json",
      status: 'error',
      error: 'malformatted parameters',
    });
  }else if(!Array.isArray((daily_exercises))){
    res.status(400).json({
      header: "application/json",
      status: 'error',
      error: 'malformatted parameters',
    });
  }



  return  res.json(calculateExercises(daily_exercises, target));

});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
