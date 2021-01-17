import React from 'react'

const Anecdote = ({ anecdote }) => {

  return (
    <div>
      <h2>Notes</h2>
        <p>{anecdote.content} {anecdote.author}</p>
        <p>has {anecdote.votes} votes</p>
    </div>
  )


}


export default Anecdote
