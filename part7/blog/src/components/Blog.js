import React from 'react'
import {
  useParams
} from "react-router-dom"



const Blog = ({ blogs, handleLike, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)
  if (!blog) {
    return null
  }

  console.log(blog)
  return (
    <>
      <div style={blogStyle} className='blog'>
        <i>{blog.title}</i> by {blog.author}
      </div>
      <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button onClick={() => handleLike(blog.id)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {<button onClick={() => handleRemove(blog.id)}>remove</button>}
      </div>
      <h4>Comments</h4>
      <ul>
        <li>{blog.comments}</li>
      </ul>
    </>
  )
}
export default Blog;