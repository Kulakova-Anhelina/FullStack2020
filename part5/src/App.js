import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleLogOut = async (event) => {

    //window.localStorage.clear(); //clear all localstorage
    window.localStorage.removeItem('loggedBloappUser', JSON.stringify(user)); //remove one item
    setUser(null)

  }


  return (
    <div>
      <h1>{errorMessage}</h1>
      <div>
        {user === null ?
          <LoginForm
            handleLogin={handleLogin}
            onChangeUser={({ target }) => setUsername(target.value)}
            username={username}
            password={password}
            onChangePassword={({ target }) => setPassword(target.value)}
          /> :
          <div>
            <p>{user.name} logged-in</p>
            <button onClick={handleLogOut}>logout</button>
            <div>
              <h2>blogs</h2>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}

            </div>
          </div>
        }
      </div>


    </div>
  )
}

export default App