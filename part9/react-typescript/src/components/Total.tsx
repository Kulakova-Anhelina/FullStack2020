import React from "react";
import { CoursePart } from '../type'

const Total: React.FC<{ courses: CoursePart[] }> = ({ courses }) => {
  return (
    <p>
    Total number of exercises {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
  )
}

export default Total;