
export interface Name {
  name: string
}
export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  id: string
}
interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

 interface CoursePartThree extends CoursePartDescription{
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}
interface CoursePartFour extends CoursePartDescription {
  name: "Full Stack Open"


}
export  type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;