
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
  return result.author + ', ' + result.blogs
}

const mostLikes = (blogs) => {
  const result = _.maxBy(blogs, function (o) { return o.likes; });
  console.log(result.author, result.likes ,"log");
  return result.author + ', ' + result.likes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}