import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const label = visible ? 'hide' : 'view'

  return(
    <>
    <div style={blogStyle} className='blog'>
      <i>{blog.title}</i> by {blog.author}
      <button onClick={() => setVisible(!visible)}>{label}</button>
      </div>
      {visible&&(
      <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
        </div>
      </div>
    )}
  </>
  )
}


const Blogs = () => {

  const dispatch = useDispatch()
  const blogState = useSelector(state => state.blogs)
  console.log(blogState, "blog from Blog")
  const byLikes = (b1, b2) => b2.likes - b1.likes
  return (
    <>
      {blogState.sort(byLikes).map((blog) =>
       <Blog
       blog={blog}
       />
      )}


    </>
  )
}

export default Blogs