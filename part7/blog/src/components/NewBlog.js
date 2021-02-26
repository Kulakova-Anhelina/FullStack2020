import React from 'react'
import { createblog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const NewBlog = (props) => {
  const dispatch = useDispatch()

  const handleNewBlog = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    event.target.title.value=""
    const author = event.target.author.value
    event.target.author.value=""
    const url = event.target.url.value
    event.target.url.value=""
    dispatch(createblog({
      title: title,
      author: author,
      url: url
    }))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          author
          <input
            id='author'
            name="author"
          />
        </div>
        <div>
          title
          <input
            id='title'
            name="title"
          />
        </div>
        <div>
          url
          <input
            id='url'
            name="url"
          />
        </div>
        <button id="create">create</button>
      </form>
    </div>
  )
}

export default NewBlog