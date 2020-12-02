
const _ = require('lodash');
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
const favoriteBlog = (blogs) => {
  const fav = blogs.map((blog) => blog.likes)
  return Math.max(...fav)
}

const mostBlogs = (blogs) => {
  const result = _.maxBy(blogs, function (o) { return o.blogs; });
  console.log(result.author, result.blogs ,"log");
  return result.author + ', ' + result.blogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}