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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
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


  return (
    <div>
      <h1>{errorMessage}</h1>
      <div>
        {user === null ?
        <LoginForm
        handleLogin={handleLogin}
        onChangeUser = {({ target }) => setUsername(target.value)}
        username  ={username}
        password = {password}
        onChangePassword= {({ target }) => setPassword(target.value)}
        /> :
          <div>
            <p>{user.name} logged-in</p>
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