const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2
  },
  author: {
    type: String,
    minlength: 2
  },
  url: {
    type: String,
    minlength: 2
  },
  likes: Number
})

module.exports = mongoose.model('Blog', blogSchema)