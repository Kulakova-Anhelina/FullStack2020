import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLike, deleteOneBlog }) => {
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
  const handleLikesClick = () => {
    updateLike({
      ...blog,
      likes: blog.likes
    })
  }
  const handleDeleteBlog = () => {
    deleteOneBlog({
      ...blog
    })
  }

  return (
    <div style={blogStyle}>
      <div className="blog">
        {blog.title} {blog.author}
      </div>
      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible && (
        <div>
          <p>{blog.user.name}</p>
          <p>{blog.url}</p>
          <p>{blog.likes}
            <button onClick={(event) => handleLikesClick(event, blog)}> like</button>
          </p>
          <button onClick={(event) => handleDeleteBlog(event, blog)}> delete</button>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  updateLike: PropTypes.func,
  deleteOneBlog: PropTypes.func,
  blog: PropTypes.object
}
Blog.defaultProps = {
  deleteOneBlog: null,
  updateLike: null
}

export default Blog
