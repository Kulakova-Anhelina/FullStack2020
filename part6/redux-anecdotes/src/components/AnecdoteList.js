import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { numberOfVotes } from '../reducers/anecdoteReducer'
import { manageNotification } from '../reducers/notificationReducer'


const AnecdoteList = ({ notification }) => {
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('anecdote obj', anecdote.id)
    dispatch(numberOfVotes(anecdote.id, anecdote))
    console.log(anecdote, "anecdote id");
    notification = `You vote for ${anecdote.content}`
    dispatch(manageNotification(notification, 5000))
  }

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter.length <= 3) {
      return (
        (
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

      )
    } else if (filter.length > 4) {
      let filtered = anecdotes.filter((an) => an.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
      return filtered.map((f) => <p>{f.content}   <div>
      has {f.votes}
      <button onClick={() => vote(f)}>vote</button>
    </div></p>)

    }

return <div/>

  })

return anecdotes
}

export default AnecdoteList