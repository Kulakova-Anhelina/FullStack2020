import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { numberOfVotes } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'


const AnecdoteList = ({ notification }) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    let anecdote = anecdotes.find(id => id.id)
    dispatch(numberOfVotes(id))
    console.log(anecdote.id, "anecdote id");
    notification = `You vote for ${anecdote.content}`
    dispatch(setNotification(notification))

    dispatch(removeNotification())
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