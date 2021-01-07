type BMI = string;

const calculateBmi = (h: number, w: number): string => {
  let bmi = Number(((w / h / h) * 10000).toFixed(2))

  if (bmi < 17) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25) {
    return 'Overweight'
  }
}
console.log(calculateBmi(180, 74))