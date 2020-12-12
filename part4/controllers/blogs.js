const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = await User.findById(body.userId)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedNote._id)
    await user.save()

    response.json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', (request, response) => {

  const body = request.body

  const blog = { // <-- Here
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,

  }

  Blog.findByIdAndUpdate(request.params.id, blog)
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => console.log(error))
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter