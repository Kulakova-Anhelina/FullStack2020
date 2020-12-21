import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [sucessMessage, setSucessMessage] = useState(null)
  const blogFormRef = React.createRef()

  const blogsSorted = blogs.sort(function (a, b) {
    return b.likes - a.likes;
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


  const handleClicks = (blog) => {
    const changedBlog = { ...blog, likes: blog.likes += 1 }
    const id = blog.id
    blogService
      .updateBlog(id, changedBlog)
      .then(
        blogService
          .getAll()
          .then(returnedBlog =>
            setBlogs(returnedBlog),
            setSucessMessage(`number of ${blog.likes} was changed`),
            setTimeout(() => {
              setSucessMessage(null)
            }, 5000),

            console.log(blogs, "here")
          )

      ).catch(error => {
        setErrorMessage(
          error
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleDeleteBlog = () => {
    console.log()
  }


  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSucessMessage(`added ${returnedBlog.title}`)
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
  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )


  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification messageSucsess={sucessMessage} />
      <div>
        {user === null ?
          loginForm() :
          <div>
            <p>{user.name} logged-in</p>
            <button onClick={handleLogOut}>logout</button>
            <div>
              <h2>blogs</h2>
              {blogsSorted.map(blog =>
                <>
                  <Blog
                    key={blog.id}
                    blog={blog}
                    updateLike={handleClicks}
                    handleDeleteBlog={handleDeleteBlog}
                  />
                </>
              )}
              <h2>Create a blog</h2>
              {blogForm()}

            </div>
          </div>
        }
      </div>


    </div>
  )
}

export default App