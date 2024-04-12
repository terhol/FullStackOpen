const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Author 1',
    url: 'Url 1',
    likes: 10,
  },
  {
    title: 'Blog 2',
    author: 'Author 2',
    url: 'Url 2',
    likes: 1000,
  },
  {
    title: 'Blog 3',
    author: 'Author 1',
    url: 'Url 3',
    likes: 5,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})

  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
}
