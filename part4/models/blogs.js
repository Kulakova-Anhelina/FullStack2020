const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2
  },
  author: {
    type: String,
    required: true,
    minlength: 2
  },
  url: {
    type: String,
    required: true,
    minlength: 2
  },
  likes: Number
})

module.exports = mongoose.model('Blog', blogSchema)