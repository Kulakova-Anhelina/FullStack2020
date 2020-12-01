const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      title: "Ernest Hemingway",
      author: "For whom the Bell Tolls",
      likes: 12
    },
    {
      title: "Faustina Bama",
      author: "Kurukku",
      likes: 1
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 5
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(12)
  })
})