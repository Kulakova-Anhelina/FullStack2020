import React from 'react'
import PropTypes from 'prop-types'
import BlogToggable from './BlogToggable'

const Blog = ({ blog, handleLikesClick, handleDeleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogsSorted = blog.sort((a, b) => b.likes - a.likes)
  return (
    <>
      {
        blogsSorted.map((blog, index) =>
          <div
            key={index}
            style={blogStyle}>
            <div className="blog">
              {blog.title} {blog.author}
            </div>
            <BlogToggable key={blog.id}>
              <p>{blog.user.name}</p>
              <p>{blog.url}</p>
              <p>{blog.likes}   </p>
              <button id ='like' onClick={() => handleLikesClick(blog.id)}> like</button>
              <button onClick={() => handleDeleteBlog(blog.id, blog.title)}> delete</button>
            </BlogToggable>
          </div>)
      }
    </>
  )
}

Blog.propTypes = {
  handleLikesClick: PropTypes.func,
  deleteOneBlog: PropTypes.func,
  blog: PropTypes.arrayOf(PropTypes.object)
}
Blog.defaultProps = {
  deleteOneBlog: null,
  handleLikesClick: null
}

export default Blog
