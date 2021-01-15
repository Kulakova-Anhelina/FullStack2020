import React from "react";


interface CoursesProps {
  name: string,
  exerciseCount: number
}
const Header: React.FC<{ name: string }> = ({ name }) => (
  <h1>{name}</h1>
);

const Content: React.FC<{ courses: Array<CoursesProps> }> = ({ courses }) => (
  // eslint-disable-next-line react/jsx-key
  <p>{courses.map(course => <p>{course.name} {course.exerciseCount}</p>)}</p>
);

const Total: React.FC<{ courses: Array<CoursesProps> }> = ({ courses }) => (
  // eslint-disable-next-line react/jsx-key
  <p>
    Number of exercises{" "}
    {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);



const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;
