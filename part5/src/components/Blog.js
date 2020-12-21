import React, { useState } from 'react'

const Blog = ({ blog, handleClicks }) => {
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
            <button onClick={handleClicks}> like</button>
          </p>
        </div>
      )}
    </div>
  )
}

export default Blog
