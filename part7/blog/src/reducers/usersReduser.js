import userServices from '../services/user'

const usersReducer = (state = [], action) => {
  console.log(action, "Action")
  console.log(state, "State")

  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const blogs = await userServices.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: blogs,
    })
  }
}



export default usersReducer