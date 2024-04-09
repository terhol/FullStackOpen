const _ = require('lodash')
const blog = require('../models/blog')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesNumber = blogs.map((blog) => blog.likes)
  return likesNumber.reduce((partialSum, like) => partialSum + like, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes)
  const maxLikes = Math.max(...likes)

  return blogs.length === 0 ? null : blogs.find((blog) => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author)
  const mostCommonAuthor = _.head(_(authors).countBy().entries().maxBy(_.last))
  var numberOfBlogs = 0
  blogs.forEach((element) => {
    if (element.author === mostCommonAuthor) {
      numberOfBlogs++
    }
  })
  return {
    author: mostCommonAuthor,
    blogs: numberOfBlogs,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
