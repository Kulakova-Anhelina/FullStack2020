const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blogs')


beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

// test 0
test('notes are returned as json', async () => {
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
test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(b => b.title)
  expect(contents).toContain(
    'A Time to Be Happy'
  )
})


// test 3
test('a valid blog can be added', async () => {
const newBlog = {
  title: "Animal Farm",
  author:"George Orwell",
  url: "https://en.wikipedia.org/wiki/Animal_Farm",
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
  'Animal Farm')
})

// test 4
test('blog without author is not added', async () => {
  const newBlog = {
    title: "Ccc",
    url: "https://en.wikipedia.org/wiki/Animal_Farm",
    likes:78
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
// check the state stored in the database after the saving operation
const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

 // test 5
 test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api

  .get(`/api/blogs/${blogToView.id}`)
  .expect(200)
  .expect('Content-Type', /application\/json/)
  // const processedBlogToView = JSON.parse(JSON.stringify(noteToView))
  expect(resultBlog.body).toEqual(blogToView)







})

// test 6

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialblogs.length - 1
  )

  const contents = blogsAtEnd.map(r => r.title)

  expect(contents).not.toContain(blogToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})