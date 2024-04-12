const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const userList = await User.find({})
  const firstUser = userList[0]

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: firstUser.id,
  })
  const savedBlog = await blog.save()
  if (blog.user) {
    firstUser.blogs = firstUser.blogs.concat(savedBlog._id)
    await firstUser.save()
  }
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
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
