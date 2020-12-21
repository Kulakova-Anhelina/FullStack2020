import React, { useState } from 'react'

const Blog = ({ blog, updateLike, handleDeleteBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const handleLikesClick = e => {
    updateLike({
      ...blog,
      likes: blog.likes + 1
    })
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
      </div>
      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.author}</p>
          <p>{blog.likes}
            <button onClick={handleLikesClick}> like</button>
          </p>
          <buton onClick={handleDeleteBlog}>delete</buton>
        </div>
      )}
    </div>
  )
}

export default Blog
