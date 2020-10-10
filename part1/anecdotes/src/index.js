import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [max, setMax] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)
  const handleNext = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)

  }

  const handleVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  useEffect(() => {
    // Update the document title using the browser API
    theLargestNumOfVotes()
  });
  const theLargestNumOfVotes = () => {
    setMax(Math.max.apply(null, votes));
    setMaxIndex(votes.indexOf(max))


  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>Has votes: {votes[selected]}</p>
      <button onClick={() => handleNext()}>Next anectode</button>
      <button onClick={() => handleVotes()}>Votes</button>
      { max >= 1 && (
        <div>
          <h1>Anecdote with most votes</h1>
          <p>Has votes: {max}</p>
          <p>{props.anecdotes[maxIndex]}</p>
        </div>
      )
      }
    </div>
  )
}
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)