import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { numberOfVotes } from '../reducers/anecdoteReducer'
import {notification} from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(numberOfVotes(id))
    let anecdote = anecdotes.find(id => id)
    dispatch(notification(`You vote for ${anecdote.content}`))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>

        </div>
      )}
    </div>
  )
}

export default AnecdoteList