import React from 'react'
import PropTypes from 'prop-types'
import BlogToggable  from './BlogToggable'

const Blog = ({ blog, updateLike, deleteOneBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
      <BlogToggable>
        <p>{blog.user.name}</p>
        <p>{blog.url}</p>
        <p>{blog.likes}   </p>
        <button onClick={(event) => handleLikesClick(event, blog)}> like</button>

        <button onClick={(event) => handleDeleteBlog(event, blog)}> delete</button>
      </BlogToggable>
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
