import React from 'react'

const Header = ({ title }) => {
  return (
    <h1>
      {title}
    </h1>
  )
}

const Part = ({ courses }) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  console.log(courses, "part")
  return (
    <div>
      {courses.map((course) =>
        <div key={course.id}>
          <h2 >{course.name}</h2>
          {course.parts.map((item) => <p key={item.id}>{item.name} {item.exercises}</p>)}
          <p> Total number of exercises:  {course.parts.map((ex) => ex.exercises).reduce(reducer)} </p>
        </div>

      )}
    </div>
  )
}


const Content = ({ courses }) => {
  console.log(courses, "content")
  return (
    <div>
      <Part courses={courses} />
    </div>
  )
}


const Course = ({ courses }) => {
  console.log(courses)

  return (
    <div>
      <Header title="Web development curriculumn" />
      <Content courses={courses} />

    </div>
  )
}
export default Course;