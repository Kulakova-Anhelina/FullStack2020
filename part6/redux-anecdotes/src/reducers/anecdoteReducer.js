
import anecdoteService from '../services/anecdotes'
export const numberOfVotes = (id,anecdote ) => {

  return async dispatch => {
const updated = {anecdote, votes: anecdote.votes + 1}
    const updatedAnecdote = await anecdoteService.updateAnecdote(id,updated )
    dispatch({  type: 'VOTE',
    data: updatedAnecdote
  })
  }
}
export const createAnecdote = (content) => {

   return async dispatch => {
     const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })

}

}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes= await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })

  }
}
// const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      // we find id of the anecdote
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes += 1
      }
      const sortedAnecdotes = state.sort((a, b) => b.votes - a.votes)
      console.log(changedAnecdote, "changed anecdote");
      return sortedAnecdotes.map(a =>
        a.id !== id ? a : changedAnecdote
      )
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
      case 'INIT_ANECDOTES':
      return action.data.sort((a, b) => b.votes - a.votes)
    default: // if none of the above matches, code comes here
      return state
  }
}
export default anecdoteReducer