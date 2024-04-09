const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesNumber = blogs.map((blog) => blog.likes)
  return likesNumber.reduce((partialSum, like) => partialSum + like, 0)
}

module.exports = {
  dummy,
  totalLikes,
}
