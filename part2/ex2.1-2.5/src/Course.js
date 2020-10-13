import React from 'react'

const Header = ({course}) => {
  console.log(course)
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Part = ({course}) => {
  console.log(course,"part")
  return (
    <div>
      {course.parts.map((item, id) => <p key={id}>{item.name} {item.exercises}</p>)}
    </div>
  )
}


const Content = ({course}) => {
  console.log(course,"content")
  return (
    <div>
      <Part course={course}/>
    </div>
  )
}
const Total = ({course}) => {
  console.log(course,"total")
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  return (
    <div>
      <p>
        Total number of exercises:
        { course.parts.map((exresise) => exresise.exercises).reduce(reducer)}
      </p>
    </div>
  )
}



const Course = ({course}) => {
  // console.log(course)

  return (
    <div>
    <Header course={course.name} />
    <Content course={course}/>
    <Total course={course}/>

  </div>
  )
}
export default Course;