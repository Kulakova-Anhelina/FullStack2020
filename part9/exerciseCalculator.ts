interface AcivityConfig {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number

}

const calculateExercises = (args: Array<number>, t: number): AcivityConfig => {
  //trainingDays
  let newArr = []
  let sum = 0
  for (let index = 0; index < args.length; index++) {
    if (args[index] > 0) {
      newArr.push(args[index])
    }
    sum += args[index]
  }
  // success
  let sucs;
  let trainingDif = args.length - newArr.length
  if (trainingDif === 0) {
    sucs = true
  } else {
    sucs = false
  }

  //rating
  let r = 0
  let d = ''
  if (trainingDif === 0) {
    r = 3
    d = 'well done'
  } else if (trainingDif >= 2) {
    r = 2
    d = 'not too bad but could be better'
  } else {
    r = 1
    d = 'too bad '
  }
  return {
    periodLength: args.length,
    trainingDays: newArr.length,
    success: sucs,
    rating: r,
    ratingDescription: d,
    target: t,
    average: sum / args.length
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))