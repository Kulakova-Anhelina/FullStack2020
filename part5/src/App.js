import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [sucessMessage, setSucessMessage] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })


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
      blogService.setToken(user.token)
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

  const inputChanged = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
        setSucessMessage(`added ${newBlog.title}`)
        setTimeout(() => {
          setSucessMessage(null)
        }, 5000)
      }).catch(error => {
        setErrorMessage(error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification messageSucsess={sucessMessage} />
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
              <h2>Create a blog</h2>
              <BlogForm
                addBlog={addBlog}
                inputChanged={inputChanged}
                title={newBlog.title}
                author={newBlog.author}
                url={newBlog.url}
              />

            </div>
          </div>
        }
      </div>


    </div>
  )
}

export default App