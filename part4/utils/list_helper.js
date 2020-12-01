const dummy = (blogs) => {
  return blogs.length === 0
    ? 1
    : blogs.length / blogs.length
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  const result = blogs.map((blog) => blog.likes)
  return result.reduce(reducer, 0)
}
module.exports = {
  dummy,
  totalLikes
}