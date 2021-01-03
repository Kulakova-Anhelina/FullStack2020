import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { numberOfVotes } from '../reducers/anecdoteReducer'
import { manageNotification } from '../reducers/notificationReducer'


const AnecdoteList = ({ notification }) => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter.length <= 3) {
      return anecdotes
    } else if (filter.length > 4) {
      return anecdotes.filter((anecdote) => anecdote.content.includes(filter))
    }


  })
  const dispatch = useDispatch()

  const vote = (anecdote ) => {
    console.log('anecdote obj', anecdote.id)
    dispatch(numberOfVotes(anecdote.id, anecdote))
    console.log(anecdote, "anecdote id");
    notification = `You vote for ${anecdote.content}`
    dispatch(manageNotification(notification, 5000))
  }





  return (
    <div>

      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>

        </div>
      )}
    </div>
  )
}

export default AnecdoteList