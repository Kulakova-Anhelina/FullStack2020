import React, { useState } from 'react'
import {
  useParams
} from "react-router-dom"

import { useDispatch } from 'react-redux'
import { handleLike, creteComment, handleDelete } from '../reducers/blogReducer'

const Blog = ({ blogs }) => {
  const [comment, setComment] = useState()
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)
  const dispatch = useDispatch()
  const handleRemove = async (id) => {
    const toRemove = blogs.find(a => a.id === id)
    dispatch(handleDelete(toRemove))
  }

  const handleLikeBlog = async (id) => {
    const toLike = blogs.find(a => a.id === id)
    dispatch(handleLike(toLike))
  }
  const onChangeComment = (e) => {
    e.preventDefault()
    setComment(e.target.value)
  }
  const handleCreateComment = async (blog) => {
    dispatch(creteComment(comment, blog))
  }




  if (!blog) {
    return null
  }


  return (
    <>
      <div className='blog'>
        <i>{blog.title}</i> by {blog.author}
      </div>
      <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button onClick={() => handleLikeBlog(blog.id)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {<button onClick={() => handleRemove(blog.id)}>remove</button>}
      </div>

      <div>
        <h6>Create comment</h6>

        <textarea type="tex" name="comment" value={comment} rows="4" cols="100" onChange={onChangeComment}></textarea>
        <div><button onClick={() => handleCreateComment(blog.id)}>create comment</button></div>
        {
          blog.comments.content ? (<>
            <h4>Comments</h4>
            <ul>
              <li>{blog.comments.comment}</li>

            </ul>
          </>) : <div></div>
        }

      </div>
    </>
  )
}
export default Blog;