/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {CoursePart} from './type'
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total';
import { v4 as uuidv4 } from 'uuid';


const App: React.FC = () => {

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      id: uuidv4(),
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {id: uuidv4(),
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {id: uuidv4(),
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      id: uuidv4(),
      name: "Full Stack Open",
      exerciseCount: 200,
      description: "Full Stack course"
    }
  ]
  const courseName = "Half Stack application development";
  return (
    <div>
<Header name ={courseName}/>
<Content courseParts ={courseParts}/>
<Total courses = {courseParts}/>

    </div>
  );
};

export default App;
