import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import ListGroup from 'react-bootstrap/ListGroup'


const Blogs = ({ blogs }) => {

  return (
    <ListGroup variant="flush">
      {blogs.map((blog) =>
        <ListGroup.Item key={blog.id} variant="light">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </ListGroup.Item>

      )}
    </ListGroup>
  )
}

export default Blogs