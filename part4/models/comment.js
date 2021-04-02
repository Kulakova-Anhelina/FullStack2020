const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
  content: String,
  name: String,
  blogs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
  ,
})

commentsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

mongoose.set('useCreateIndex', true)
const Comment = mongoose.model('Comment', commentsSchema)

module.exports = Comment