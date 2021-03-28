const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listBlog = [
    {
      author: 'Ernest Hemingway',
      likes: 8
    },
    {
      author: 'Kurukku',
      likes: 1
    },
    {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.mostLikes(listBlog)
    expect(result).toEqual('Edsger W. Dijkstra, 17')
  })
})