// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }
import anecdoteService from '../services/anecdotes'
export const numberOfVotes = (id) => {
  return {
    type: 'VOTE',
    data: { id }
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
      return sortedAnecdotes.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
      case 'INIT_ANECDOTES':
      return action.data
    default: // if none of the above matches, code comes here
      return state
  }
}
export default anecdoteReducer