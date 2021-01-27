import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogReducer from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'


const Blog = () => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const blogState = useSelector(state => state.blogs)
  console.log(blogState, "blog from Blog")

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const label = visible ? 'hide' : 'view'
  const byLikes = (b1, b2) => b2.likes - b1.likes
  return (
    <>
      {blogState.sort(byLikes).map((blog) =>
        <>
          <div style={blogStyle} className='blog'>
            <i>{blog.title}</i> by {blog.author}
            <button onClick={() => setVisible(!visible)}>{label}</button>
          </div>
          {visible && (
            <div>
              <div>{blog.url}</div>
              <div>likes {blog.likes}
              </div>
            </div>
          )}
        </>

      )}


    </>
  )
}

export default Blog