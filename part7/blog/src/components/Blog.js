import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {handleLike, handleDelete} from '../reducers/blogReducer'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const label = visible ? 'hide' : 'view'
  return (
    <>
      <div style={blogStyle} className='blog'>
        <i>{blog.title}</i> by {blog.author}
        <button onClick={() => setVisible(!visible)}>{label}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
            <div>likes {blog.likes}
              <button onClick={() =>handleLike(blog.id)}>like</button>
            </div>
            <div>{blog.user.name}</div>
            {<button onClick={() => handleRemove(blog.id)}>remove</button>}
          </div>
      )}
    </>
  )
}


const Blogs = () => {

  const blogState = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  const like = async (id) => {
   const toLike = blogState.find(a => a.id === id)
    dispatch(handleLike(toLike))
  }


  const handleRemove = async (id) => {
    const toRemove = blogState.find(a => a.id === id)
    dispatch(handleDelete(toRemove))
  }

  return (
    <>
      {blogState.map((blog) =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={()=> like(blog.id)}
          handleRemove={() => handleRemove(blog.id)}
        />
      )}


    </>
  )
}

export default Blogs