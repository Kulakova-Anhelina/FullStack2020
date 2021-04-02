import React, { useState, useEffect } from 'react'
import {
  useParams
} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { handleLike, creteComment, handleDelete } from '../reducers/blogReducer'
import { BsFillHeartFill, BsFillTrashFill } from "react-icons/bs";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'


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



  useEffect(() => {

  }, [blog, comment])

  if (!blog) {
    return null
  }


  return (
    <Container>
      <div className='blog'>
        <i>{blog.title}</i> by {blog.author}
      </div>
      <div>
        <div>{blog.url}</div>
        <div> {blog.likes}<Button
          onClick={() => handleLikeBlog(blog.id)}
          variant='outline-light'
        >
          <BsFillHeartFill color="#DC143C" />
        </Button>
        </div>
        <div>{blog.user.name}</div>
        {<Button onClick={() => handleRemove(blog.id)} variant='outline-light'><BsFillTrashFill color="black" /></Button>}
      </div>
      <Form>
        <Form.Label>Create comment</Form.Label>
        <Form.Control as="textarea" name="comment" value={comment} rows="4" cols="100" onChange={onChangeComment} />
        <div><Button onClick={() => handleCreateComment(blog.id)} variant="outline-success">create comment</Button></div>
        {
          blog.comments ? (<>
            <h4>Comments</h4>
            <ul>
              <li>{ }</li>

            </ul>
          </>) : <div></div>
        }

      </Form>
    </Container>
  )
}
export default Blog;