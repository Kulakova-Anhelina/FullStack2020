const loginReducer = (state = [], action) => {
  console.log(action, "Action")
  console.log(state, "State")

  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOG':

      return action.data
    default:
      return state
  }
}

export const createblog = (title, author, url) => {
  return {
    type: 'NEW_BLOG',
    data: {
      title, author, url
    }
  }
}

export const initializeblogs = (blogs) => {
  return {
    type: 'INIT_BLOG',
    data: blogs,
  }
}

export default loginReducer