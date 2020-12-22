import React, { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm  = ({createBlog}) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })


  const inputChanged = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
  }


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })

  }

  return (
      <form onSubmit={addBlog}>
         <div>
      title
        <input
        type="text"
        value={newBlog.title}
        name="title"
        onChange={inputChanged}
      />
    </div>
    <div>
      author
        <input
        type="text"
        value={newBlog.author}
        name="author"
        onChange={inputChanged}
      />
    </div>
    <div>
      url
        <input
        type="text"
        value={newBlog.url}
        name="url"
        onChange={inputChanged}
      />
    </div>
        <button type="submit">save</button>
      </form>
    )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}
export default BlogForm