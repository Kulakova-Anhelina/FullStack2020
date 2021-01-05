import React from 'react'
import { numberOfVotes } from '../reducers/anecdoteReducer'
import { manageNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.numberOfVotes(anecdote.id, anecdote)
    props.manageNotification(`You vote for ${anecdote.content}`, 5000)
  }

  return (
    (
      <div>
        <h2>Anecdotes</h2>
        {props.anecdotes.map(anecdote =>
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
}

const mapStateToProps = (state) => {
  if (state.filter.length <= 0) {
    return {
      anecdotes: state.anecdotes,

    }
  }
  return {
    anecdotes: (state.filter.length > 0
      ? state.anecdotes.filter((an) => an.content.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1)
      : <p>The item you are searching does not exist</p>
    )
  }
}

const mapDispatchToProps = {
  numberOfVotes, manageNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes