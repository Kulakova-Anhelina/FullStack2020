import React, { useState } from 'react'

const BlogToggable = ((props) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  const label = visible ? 'hide' : 'view'
  return (
    <div>
      <button
        onClick={toggleVisibility} id='view'>
        {
          label
        }
      </button>
      <div className="togglableContent" style={hideWhenVisible}>{props.children}</div>

    </div>
  )
})


export default BlogToggable