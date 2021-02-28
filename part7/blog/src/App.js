import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
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



const App = () => {
  const userState = useSelector(state => state.loginUser)
const usersState = useSelector(state => state.users)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const user = storage.loadUser()

  const blogFormRef = React.createRef()

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
      <div>
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
        <div>
          <Link className="padding" to="/">home</Link>
          <Link className="padding" to="/blogs">blogs</Link>
          <Link className="padding" to="/users">users</Link>
        </div>

        <Switch>
          <Route path="/blogs">
            <Blog />
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
              <NewBlog />
            </Togglable>
          </Route>
          <Route path="/users/:id">
            <User users = {usersState}/>
          </Route>
          <Route path="/users">
            <Users users ={usersState}/>
          </Route>
          <Route path="/">
            <h2>blogs</h2>
            <Notification notification={notification} />
            <p>
              {userState.name} logged in <button onClick={handleLogout}>logout</button>
            </p>
          </Route>
        </Switch>

        <div>
          <i>Blog app, Anhelina Kulakova 2020</i>
        </div>
      </Router>
    </div>
  )
}

export default App