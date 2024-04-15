const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401), json({ error: 'Invalid token' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })
  const savedBlog = await blog.save()
  if (blog.user) {
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  }
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blogToDelete = await Blog.findById(request.params.id)
  console.log(blogToDelete)
  if (blogToDelete.user.toString() === decodedToken.id)
    await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { author, title, url, likes } = request.body

  const result = await Blog.findByIdAndUpdate(
    request.params.id,
    { author, title, url, likes },
    {
      new: true,
      runValidators: true,
      context: 'query',
    },
  )
  response.json(result)
})

module.exports = blogsRouter
