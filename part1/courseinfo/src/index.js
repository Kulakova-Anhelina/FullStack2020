import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
console.log(props)
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}


const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.parts.map((item) => <p>{item.name} {item.exercises}</p>)}/>
    </div>
  )
}
const Total = (props) => {
  console.log(props)
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const sum = props.parts.map((exresise) => exresise.exercises).reduce(reducer);

  return (
    <div>
      <p>
        {sum}
      </p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts}/>
    <Total parts={course.parts} />
  </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))