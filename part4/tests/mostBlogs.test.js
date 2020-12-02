const listHelper = require('../utils/list_helper')

describe('total blogs', () => {
  const listBlog = [
    {
      author: "Ernest Hemingway",
      blogs: 7
    },
    {
      author: "Kurukku",
      blogs: 3
    },
    {
      author: "Edsger W. Dijkstra",
      blogs: 3
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.mostBlogs(listBlog)
    expect(result).toEqual("Ernest Hemingway, 7")
  })
})