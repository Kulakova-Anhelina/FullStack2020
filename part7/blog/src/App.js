import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import { useDispatch, useSelector } from 'react-redux'
import storage from './utils/storage'
import { initializeblogs } from './reducers/blogReducer'
import { showUser, logOut, logIn } from './reducers/loginReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import Users from './components/Users';
import User from './components/User'
import { handleLike, handleDelete } from './reducers/blogReducer'
import Blog from './components/Blog'
import { Nav, Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'




const App = () => {

  const padding = {
    padding: 5,
    color: "#fffff",
  }
  const userState = useSelector(state => state.loginUser)
  const usersState = useSelector(state => state.users)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const user = storage.loadUser()
  const blogFormRef = React.createRef()
  const blogState = useSelector(state => state.blogs)

  const like = async (id) => {
    const toLike = blogState.find(a => a.id === id)
    dispatch(handleLike(toLike))
  }


  const handleRemove = async (id) => {
    const toRemove = blogState.find(a => a.id === id)
    dispatch(handleDelete(toRemove))
  }


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeblogs())
  }, [dispatch])



  useEffect(() => {
    dispatch(showUser(user))
  }, [dispatch])

  const notifyWith = (message, type = 'success') => {
    setNotification({
      message, type
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(logIn(password, username))
      dispatch(showUser(user))
      notifyWith(`${userState.name} welcome back!`)
      console.log(userState)
      dispatch(showUser(user))
      setUsername('')
      setPassword('')


    } catch (exception) {
      notifyWith('wrong username/password', 'error')
    }
  }



  const handleLogout = () => {
    dispatch(logOut(storage.logoutUser()))
  }

  if (!userState) {
    return (
      <div className="container">
        <h2>login to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            Blogs
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">home</Link></Nav.Link>
            <Nav.Link href="#" as="span"><Link style={padding} to="/blogs">blogs</Link></Nav.Link>
            <Nav.Link href="#" as="span"><Link style={padding} to="/users">users</Link></Nav.Link>
          </Nav>
        </Navbar>
        <div className="container">
          <Image  src="./blog.jpg" fluid />
          <h2>Blogs</h2>
          <Notification notification={notification} />
          <p>
            {userState.name} logged in <Button variant="info" onClick={handleLogout}>logout</Button>
          </p>

          <Switch>
            <Route path="/blogs/:id">
              <Blog
                blogs={blogState}
                handleLike={like}
                handleRemove={handleRemove}
              />
            </Route>
            <Route path="/blogs">
              <Blogs blogs={blogState} />
              <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <NewBlog />
              </Togglable>
            </Route>
            <Route path="/users/:id">
              <User users={usersState} />
            </Route>
            <Route path="/users">
              <Users users={usersState} />
            </Route>
            <Route path="/">
            </Route>
          </Switch>
          <div>
            <i>Blog app, Anhelina Kulakova 2020</i>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App