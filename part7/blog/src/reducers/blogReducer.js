import blogServices from '../services/blogs'

const byLikes = (a1, a2) => a2.likes - a1.likes

const blogReducer = (state = [], action) => {
  //console.log(action, "Action")
  //console.log(state, "State")

  switch (action.type) {

    case 'INIT_BLOG':
      return action.data.sort(byLikes)
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
    default:
      return state
  }
}

export const createblog = (blog) => {
  return async dispatch => {

    const data = await blogServices.create(blog)
    console.log(blog, "b")
    console.log(data, "c")
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
      data: blogs,
    })
  }
}


export const handleLike = (blogs) => {
  return async dispatch => {
    const toLike = { ...blogs, likes: blogs.likes += 1 }
    console.log(toLike)
    const data = await blogServices.update(toLike)
    dispatch({
      type: 'LIKE',
      data: data
    })
  }
}

export const handleDelete = (blog) => {
  return async dispatch => {
    console.log(blog.id, "id from acttion creator")
    const data = await blogServices.remove(blog.id)
    dispatch({
      type: 'DELETE',
      data: data
    })
  }
}

export default blogReducer