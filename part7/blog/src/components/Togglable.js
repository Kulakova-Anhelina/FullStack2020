import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { createblog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form'

const NewBlog = () => {
  const dispatch = useDispatch()
  const handleNewBlog = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    event.target.title.value = ""
    const author = event.target.author.value
    event.target.author.value = ""
    const url = event.target.url.value
    event.target.url.value = ""
    dispatch(createblog({
      title: title,
      author: author,
      url: url
    }))
    handleClose()
  }


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{ marginTop: "100px" }}>
      <Button variant="outline-success" onClick={handleShow} >
        Create a new blog
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Blog</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleNewBlog}>
          <Modal.Body>
            <Form.Group controlId="formAuthor">
              <Form.Label> author</Form.Label>
              <Form.Control
                id='author'
                name="author"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label> title   </Form.Label>
              <Form.Control
                id='title'
                name="title"
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Label>
                url          </Form.Label>
              <Form.Control
                id='url'
                name="url"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
          </Button>
            <Button type="submit" variant="primary">create</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default NewBlog