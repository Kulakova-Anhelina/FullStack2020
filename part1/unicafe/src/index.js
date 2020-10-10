import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'


const Statistics = (props) => {
  console.log(props)
  if (props.total <= 0) {
    return "No feedback given"
  }
    return (
      <div>
        <p>good : {props.good}</p>
        <p > neutral : {props.neutral}</p>
        <p>bad : {props.bad}</p>
        <p> total : {props.total}</p>
        <p> avg : {props.average}</p>
        <p> positive : {props.positive} %</p>
      </div>
    )



}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  useEffect(() => {
    // Update the document title using the browser API
    handleTotal();
    handlePositive();
    handleAverage();

  });

  const handleTotal = () => {
    setTotal(bad + good + neutral)
  }
  const handleAverage = () => {

    setAverage(((good * 1) + (neutral * 0) + (bad * -1)) / total)

  }
  const handlePositive = () => {
    if (total) {
      setPositive((good * 100) / total)
    } else {
      setPositive(0)
    }

  }


  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Netural</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <h1>Statistics</h1>
      <Statistics good={good}
        neutral={neutral} bad={bad}
        total={total}
        average={average}
        positive={positive} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)