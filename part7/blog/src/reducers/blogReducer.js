import blogServices from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log(action, "Action")
  console.log(state, "State")

  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOG':
      return action.data
    case 'LIKE':
      const liked = action.data
      return state.map(a => a.id===liked.id ? liked : a)
    case 'DELETE':
      return action
    default:
      return state
  }
}

export const createblog = (data) => {
  return {
    type: 'NEW_BLOG',
    data

  }
}
const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const initializeblogs = (blogs) => {
  return {
    type: 'INIT_BLOG',
    data: blogs,
    id: generateId()
  }
}
export const handleLike =(blog)=>{
  return async dispatch => {
    const toLike = {...blog, likes: blog.likes + 1 }
    const data = await blogServices.update(toLike)
    dispatch({
      type: 'LIKE',
      data
    })
  }
}

export const handleDelete=(blog)=>{
  return async dispatch => {
    const toLike = {...blog, likes: blog.likes + 1 }
    const data = await blogServices.delete(toLike)
    dispatch({
      type: 'DELETE',
      data
    })
  }
}

export default blogReducer