const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blogs')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogsObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogsObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

// test 0
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// test 1

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

// test 2
test('verifies that the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(b => b._id)

  expect(contents).toBeDefined()
})


// test 3
test('a valid blog can be added', async () => {
const newBlog = {
  title: "The Castle",
  author:"Franz Kalka",
  url: "https://en.wikipedia.org/wiki/Castle",
  likes:78
}

await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

const blogsAtEnd = await helper.blogsInDb()
expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
const contents = blogsAtEnd.map(b => b.title)
expect(contents).toContain(
  'The Castle')
})

// test 4
test('a valid blog can be added and likes 0 by default', async () => {
  const newBlog = {
    title: "Animal Farm",
    author:"George Orwell",
    url: "https://en.wikipedia.org/wiki/Animal_Farm",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  const contents = blogsAtEnd[blogsAtEnd.length - 1].likes
  expect(contents).toBe(0)
  })

  // test 5

  test('blog without title and url properties is not added', async () => {
    const newBlog = {
      author:"Firdausi",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })

  // tets 6
  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })


  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })


describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    console.log(blogsAtStart.length, "start");
    const blogToDelete = blogsAtStart[0]
    console.log(blogToDelete, "delete");

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()



    const contents = blogsAtEnd.map(r => r.author)
    console.log(contents);

    expect(blogsAtEnd.length).toBe(
      helper.initialBlogs.length - 1
    )
    expect(contents).not.toContain(blogToDelete.author)
  })
})

afterAll(() => {
  mongoose.connection.close()
})