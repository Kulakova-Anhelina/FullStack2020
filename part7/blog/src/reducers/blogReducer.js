import blogServices from '../services/blogs'

const initialState = [{
  title: "",
  url: "",
  author: ""
}]
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_BLOG':
      return action.data
    case 'NEW_BLOG':
      return [...state]
    case 'LIKE':
      const liked = action.data
      const sortedLikes = state.filter(a => a.id === liked.id ? liked : a)
      return [...sortedLikes]
    case 'DELETE':
      const blogToRemove = action.data
      const removedBlog = state.filter(b => b.id !== blogToRemove.id)
      return [...removedBlog]
    case 'ADD_COMMENT':
      console.log(action.data);
      return action.data
    default:
      return state
  }
}

export const creteComment = (blog, comment) => {
  return async dispatch => {
    await blogServices.createComment(blog, comment)
    const data2 = await blogServices.getAll()
    dispatch({
      type: 'ADD_COMMENT',
      data2

    })
  }
}

export const createblog = (blog) => {
  return async dispatch => {

    const data = await blogServices.create(blog)
    dispatch({
      type: 'CREATE',
      title: data.title,
      author: data.author,
      url: data.url

    })
  }
}


export const initializeblogs = () => {
  return async dispatch => {
    const blogs = await blogServices.getAll()

    dispatch({
      type: 'INIT_BLOG',
      data: blogs

    })
  }
}


export const handleLike = (blogs) => {
  return async dispatch => {
    const toLike = { ...blogs, likes: blogs.likes += 1 }
    const data = await blogServices.update(toLike)
    dispatch({
      type: 'LIKE',
      data
    })
  }
}

export const handleDelete = (blog) => {
  return async dispatch => {
    console.log(blog.id, "id from acttion creator")
    const data = await blogServices.remove(blog.id)
    dispatch({
      type: 'DELETE',
      data
    })
  }
}

export default blogReducer