const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [{
  username: 'antia',
  password: process.env.SECRET
}
]


const initialBlogs = [
  {
    title: 'Kurukku',
    author: 'Faustina Bama',
    url: 'https://www.amazon.com/Karukku-Bama-Faustina/dp/0199450412',
    likes: 59,
  },
  {
    title: 'A Time to Be Happy',
    author: 'Nayantara Sahgal',
    url: 'https://www.questia.com/library/7232327/a-time-to-be-happy',
    likes: 56,
  },
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars', author:
      'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,

  }
]

const nonExistingId = async () => {
  const blog = new Blog({})
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}