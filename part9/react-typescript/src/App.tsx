/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBase, CoursePartDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase, CoursePartDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;
const Header: React.FC<{ name: string }> = ({ name }) => (
  <h1>{name}</h1>
);

const Part: React.FC<{ courseParts: CoursePart }> = ({courseParts }) => {
  switch (courseParts.name) {
    case "Fundamentals":
      return <p>{courseParts.name} {courseParts.exerciseCount} {courseParts.description} </p>
    case "Using props to pass data":
      return <p>{courseParts.name} {courseParts.exerciseCount}</p>
    case "Deeper type usage":
      return <p>{courseParts.name} {courseParts.exerciseCount}
      {courseParts.description} {courseParts.exerciseSubmissionLink}</p>
    default:
      return assertNever(courseParts)
  }

}

const Content: React.FC<{ courses: Array<CoursePartBase> }> = ({ courses })  => (
  <div>
  {courses.map(course => <Part courseParts = {course}/>)}
  </div>
);


const Total: React.FC<{ courses: Array<CoursePartBase> }> = ({ courses }) => (
  // eslint-disable-next-line react/jsx-key
  <p>
    Number of exercises{" "}
    {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;
