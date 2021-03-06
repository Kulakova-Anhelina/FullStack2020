const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

//________________________________________________________________________________
//get

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 }).populate('comments', { content: 1 })
  response.json(blogs.map(blog => blog))
})



//_________________________________________________________________________________________
//post blog

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})


//_________________________________________________________________________
// get by id

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

//____________________________________________________________________________
//delete blog

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const blog = await Blog.findById(request.params.id)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (blog.user._id.toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndRemove(blog.id)
      response.status(204).end()
    } else {
      //The HTTP 403 is a HTTP status code meaning access to the requested resource is forbidden
      response.status(403).end()
    }
  } catch (exception) {
    next(exception)
  }
})

//__________________________________________________________________________________
//update

blogsRouter.put('/:id', async (request, response, next) => {

  const body = request.body
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }


  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.content
  }


  try {
    const blogId = await Blog.findById(request.params.id)
    if (blogId.user._id.toString() === decodedToken.id.toString()) {
      const updatedBlog = await Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true })
      return response.json(updatedBlog.toJSON())
    }
  } catch (exception) {
    next(exception)
  }

})


module.exports = blogsRouter