const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const assert = require('node:assert')
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')
const { log } = require('node:console')
let tokenNr = ''

describe('API tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogsObject = helper.initialBlogs.map((blog) => new Blog(blog))
    const promiseArray = blogsObject.map((blog) => blog.save())
    await Promise.all(promiseArray)

    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    const tokenInfo = await api.post('/api/login').send({ username: 'root', password: 'secret' })
    tokenNr = `Bearer ${tokenInfo._body.token}`
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
      .set('Authorization', tokenNr)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map((r) => r.author)
    assert.strictEqual(contents.includes(newBlog.author), true)
  })

  test('if authorization fails, response 401 is returned', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      author: 'New author',
      title: 'New title',
      url: 'New url',
      likes: 5,
    }

    await api.post('/api/blogs').send(newBlog).expect(401)
    const blogsAtEnd = await helper.blogsInDb()
    assert.equal(blogsAtStart.length, blogsAtEnd.length)
  })

  test('if likes property is missing 0 is returned', async () => {
    const newBlog = {
      author: 'New author',
      title: 'New title',
      url: 'New url',
    }
    await api.post('/api/blogs').set('Authorization', tokenNr).send(newBlog).expect(201)

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
    await api.post('/api/blogs').set('Authorization', tokenNr).send(newBlog).expect(400)
  })

  test('if url is missing, status 400 is returned', async () => {
    const newBlog = {
      author: 'New author',
      title: 'New title',
      likes: 10,
    }
    await api.post('/api/blogs').set('Authorization', tokenNr).send(newBlog).expect(400)
  })

  test('existing blog is deleted correctly', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const validBlog = blogsAtStart[0]
    const users = await helper.usersInDb()
    validBlog.user = users[0].id
    await api.put(`/api/blogs/${validBlog.id}`).send(validBlog).expect(200)

    await api.delete(`/api/blogs/${validBlog.id}`).set('Authorization', tokenNr).expect(204)

    blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    assert(!blogsAtEnd.map((blog) => blog.title).includes(validBlog.title))
  })

  test('existing blog can be updated correctly', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
      likes: 12345,
      author: 'New Author',
      url: 'New url',
      title: 'New title',
    }
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()

    assert(blogsAtEnd.map((blog) => blog.likes).includes(12345))
  })

  describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('secret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })

    test('creation succeeds with fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'new user',
        name: 'new name',
        password: 'password',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map((user) => user.username)
      assert(usernames.includes(newUser.username))
    })
    test('creation fails with proper status code is username is too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const userWithShortUsername = {
        username: 'a',
        name: 'new name',
        password: 'password',
      }

      const result = await api
        .post('/api/users')
        .send(userWithShortUsername)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert(result.body.error.includes('User validation failed'))
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    test('creation fails with proper status code is password is missing', async () => {
      const usersAtStart = await helper.usersInDb()

      const userWithoutPassword = {
        username: 'admin',
        name: 'new name',
      }

      const result = await api
        .post('/api/users')
        .send(userWithoutPassword)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert(result.body.error.includes('Password is missing or is too short.'))
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
    test('creation fails with proper status code is username is not unique', async () => {
      const usersAtStart = await helper.usersInDb()

      const userWithRepeatingUsername = {
        username: 'root',
        name: 'new name',
        password: 'password',
      }

      const result = await api
        .post('/api/users')
        .send(userWithRepeatingUsername)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert(result.body.error.includes('Username needs to be unique'))
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
