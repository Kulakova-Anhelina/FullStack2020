const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const blogsRouter = require('./blogs')

commentsRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({}).populate('blogs', {
    title: 1,
    url: 1,
    likes: 1,
  })
  response.json(comments)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body

  const blogId = await Blog.findById(request.params.id)
  const blogs = await Blog.findById(blogId)

  const newComment = new Comment({
    content: body.content,
    name: body.name,
    blogs: blogId

  })

  const savedComment = await newComment.save()
  blogs.comments = blogs.comments.concat(newComment)
  await blogs.save()
  response.json(savedComment)

})

module.exports = commentsRouter