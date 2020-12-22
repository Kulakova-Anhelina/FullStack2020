import React, { useState } from 'react'

const Blog = ({ blog, updateLike, deleteOneBlog}) => {
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
      likes: blog.likes
    })
  }
 const handleDeleteBlog=e=>{
   deleteOneBlog({
     ...blog
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
            <button onClick={(event) =>handleLikesClick(event, blog)}> like</button>
          </p>
          <button onClick={(event) =>handleDeleteBlog(event, blog)}> delete</button>
        </div>
      )}
    </div>
  )
}

export default Blog
