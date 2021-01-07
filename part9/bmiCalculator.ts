interface BmiValues {
  height: number;
  weight: number;
  bmi?: string
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}
const calculateBmi = (h: number, w: number): string => {
  let bmi = Math.floor(((w / h / h) * 10000))
  let result = ''
  if (bmi < 17) {
    result = 'Underweight'
    console.log(result);
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    result = 'Normal (healthy weight)'
    console.log(result);
  } else if (bmi >= 25) {
    result = 'Overweight'
    console.log(result);
  }
  return result
}

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight)
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}