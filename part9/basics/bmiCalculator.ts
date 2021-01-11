export interface BmiValues {
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
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};
const calculateBmi = (h: number, w: number): string => {
  const bmi = Math.floor(((w / h / h) * 10000));
  if (bmi < 17) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25) {
    return 'Overweight';
  }
  return 'Not valid';
};

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}
export default calculateBmi;