import React from "react";
import { CoursePart } from '../type'
import { assertNever } from '../utils'

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <div>
          <h3>Course Name : {part.name}</h3>
          <p>Number of Ex: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
          </div>)
    case "Using props to pass data":
      return (
        <div>
          <h3>Course Name : {part.name}</h3>
          <p>Number of Ex: {part.exerciseCount}</p></div>)
    case "Deeper type usage":
      return (
        <div>
          <h3>Course Name : {part.name}</h3>
          <p>Number of Ex: {part.exerciseCount}</p>
          <p>Description   {part.description}</p>
          <p> Link {part.exerciseSubmissionLink}</p>
        </div>)
    default:
      return assertNever(part)
  }

}
export default Part