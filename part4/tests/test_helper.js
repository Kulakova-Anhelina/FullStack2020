const Blog = require('../models/blogs')
const initialBlogs = [
  {
    title: "Kurukku",
    author: "Faustina Bama",
    url: "https://www.amazon.com/Karukku-Bama-Faustina/dp/0199450412",
    likes: 59
  },
  {
    title: "A Time to Be Happy",
    author: "Nayantara Sahgal",
    url: "https://www.questia.com/library/7232327/a-time-to-be-happy",
    likes: 56
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: "Faustina Bama" })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}