import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}
const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}: {value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total <= 0) {
    return "No feedback given"
  }
  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="total" value={total} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={`${positive} %`} />
      </tbody>
    </table>
  )



}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const newGoodClick = good + 1
    setGood(newGoodClick);
  }
  const handleBadClick = () => {
    const newBadClick = bad + 1
    setBad(newBadClick)
  }
  const handleNeutralClick = () => {
    const newNeutralClick = neutral + 1
    setNeutral(newNeutralClick)
  }


  const total = () => {
    return bad + good + neutral
  }
  const average = () => {

  return ((((good * 1) + (neutral * 0) + (bad * -1)) / total()).toFixed(1))

  }
  const positive = () => {
   return  ((good * 100) / total()).toFixed(1)
  }


  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Netural" />
      <Button onClick={handleBadClick} text="Bad" />
      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral} bad={bad}
        total={total()}
        average={average()}
        positive={positive()} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)