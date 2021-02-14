import blogServices from '../services/blogs'

const byLikes = (a1, a2) => a2.likes - a1.likes

const blogReducer = (state = [], action) => {
  //console.log(action, "Action")
  //console.log(state, "State")

  switch (action.type) {

    case 'INIT_BLOG':
      return action.data.sort(byLikes)

    case 'NEW_BLOG':
      console.log(state)
      console.log(action.data)
      return [...state, action.data]

    case 'LIKE':
      const liked = action.data
      console.log(liked, "liked")
      return state.map(a => a.id===liked.id ? liked : a)

    case 'DELETE':
      const blogToRemove = action.data
      console.log(blogToRemove, "id from delete")
      return state.filter(b=> b.id !== blogToRemove.id )
    default:
      return state
  }
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createblog = (blog) => {
  return async dispatch => {

    const data = await blogServices.create(blog)
    console.log(blog, "b")
    console.log(data, "c")

    dispatch({
      type: 'CREATE',
      data: data,
      id: generateId()
    })
  }
}


export const initializeblogs = () => {
  return async dispatch => {
    const blogs = await blogServices.getAll()
    dispatch({
      type: 'INIT_BLOG',
      data: blogs,
    })
  }
}


export const handleLike =(blogs)=>{
  return async dispatch => {
    const toLike = {...blogs, likes: blogs.likes += 1 }
    console.log(toLike)
    const data = await blogServices.update(toLike)
    dispatch({
      type: 'LIKE',
      data:data
    })
  }
}

export const handleDelete=(id)=>{
  return async dispatch => {
    console.log(id, "id from acttion creator")
    const data = await blogServices.remove(id)
    dispatch({
      type: 'DELETE',
      data
    })
  }
}

export default blogReducer