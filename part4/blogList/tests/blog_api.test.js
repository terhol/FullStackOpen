const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const assert = require('node:assert')

const Blog = require('../models/blog')

describe('API tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogsObject = helper.initialBlogs.map((blog) => new Blog(blog))
    const promiseArray = blogsObject.map((blog) => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })

  test('correct number of blogs is returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('id is correctly named', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    assert.strictEqual(Object.hasOwn(blog, 'id'), true)
  })

  test('new blog is added correctly', async () => {
    const newBlog = {
      author: 'New author',
      title: 'New title',
      url: 'New url',
      likes: 5,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map((r) => r.author)
    assert.strictEqual(contents.includes(newBlog.author), true)
  })

  test('if likes property is missing 0 is returned', async () => {
    const newBlog = {
      author: 'New author',
      title: 'New title',
      url: 'New url',
    }
    await api.post('/api/blogs').send(newBlog).expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    const newlyAddedBlog = blogsAtEnd.filter((blog) => blog.author === newBlog.author)

    assert.strictEqual(newlyAddedBlog[0].likes, 0)
  })

  test('if title is missing, status 400 is returned', async () => {
    const newBlog = {
      author: 'New author',
      url: 'New url',
      likes: 10,
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
  })

  test('if url is missing, status 400 is returned', async () => {
    const newBlog = {
      author: 'New author',
      title: 'New title',
      likes: 10,
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
  })

  test('existing blog is deleted correctly', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const validBlog = blogsAtStart[0]

    await api.delete(`/api/blogs/${validBlog.id}`).expect(204)

    blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    assert(!blogsAtEnd.map((blog) => blog.title).includes(validBlog.title))
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
