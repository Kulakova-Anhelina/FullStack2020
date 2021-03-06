

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AcivityConfig {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

//trainingDays
const tainingDay =(arr_hours : number[]) :number =>{


   const result = arr_hours.filter(h =>h > 0);
   console.log(result, "Hello I am result");
  console.log(arr_hours, "Hello, I am array");

   return result.length;
};


  // success
const sucessful = (trainingDif: number):boolean =>{
let sucs;
  if (trainingDif === 0) {
    sucs = true;
  } else {
    sucs = false;
  }
  return sucs;
};
// rate

const rate =(periodLength: number,trainingDays: number ):number =>{
  const trainingDif = periodLength- trainingDays;
  return trainingDif;
};



//raiting description
const rateOverview =(rating: number): string =>{

  let d = '';
  if (rating === 0) {
    d = 'well done';
  } else if (rating >= 2) {
    d = 'not too bad but could be better';
  } else {
    d = 'too bad ';
  }
  return d;
};

// calculate average

const averageCalculation = (arr_hours: number[]): number=>{
  const sum = arr_hours.reduce((a, b) => a + b, 0);
  const avrg = sum/arr_hours.length;
  return avrg;
};


const calculateExercises = (daily_exercises: Array<number>, t: number): AcivityConfig => {

   const periodLength =daily_exercises.length;
    const trainingDays =tainingDay(daily_exercises);
    const rating = rate(periodLength, trainingDays);
    const success =sucessful(rating);
    const ratingDescription = rateOverview(rating);
    const average = averageCalculation(daily_exercises);
    const targrt = t;



  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targrt,
    average: average
  };
};
export default calculateExercises;