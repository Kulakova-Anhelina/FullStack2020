const dummy = (blogs) => {
  return blogs.length === 0
    ? 1
    : blogs.length/blogs.length
}
module.exports = {
  dummy
}