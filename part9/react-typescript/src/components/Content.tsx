/* eslint-disable react/jsx-key */
import React from "react";
import Part from './Part'
import {CoursePart} from '../type'
const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts })  => {
  console.log(courseParts, "Hello course parts")
  return(
    <div>
    {courseParts.map(course => <p> Parts <Part key ={course.id} part = {course}/> </p>)}
    </div>
  )
}


export default Content