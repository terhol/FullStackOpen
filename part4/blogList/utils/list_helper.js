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

const mostLikes = (blogs) => {
  const authors = _.uniq(_.map(blogs, 'author'))
  let highestLikeNumber = 0
  let highestLikeAuthor = ''
  authors.forEach((author) => {
    let likes = 0
    blogs.forEach((blog) => {
      if (blog.author === author) {
        likes += blog.likes
      }
    })
    if (likes > highestLikeNumber) {
      highestLikeNumber = likes
      highestLikeAuthor = author
    }
  })
  return { author: highestLikeAuthor, likes: highestLikeNumber }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
