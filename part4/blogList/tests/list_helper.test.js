const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { testBlog, testBlogs } = require('../tests/testBlogs')

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe('totalLikes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('when list as only one blog equals the likes of blog', () => {
    assert.strictEqual(listHelper.totalLikes([].concat(testBlog)), 10)
  })

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(listHelper.totalLikes(testBlogs), 1015)
  })
})

describe('favoriteBlog', () => {
  test('of a bigger list is found right', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(testBlogs), {
      title: 'Blog 2',
      author: 'Author 2',
      url: 'Url 2',
      likes: 1000,
    })
  })
  test('when there is only one blog then it is returned', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([].concat(testBlog)), {
      title: 'Blog 1',
      author: 'Author 1',
      url: 'Url 1',
      likes: 10,
    })
  })
  test('when there is no blog given null is returned', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })
})

describe('mostBlogs', () => {
  test('of a bigger list correct author is returned', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(testBlogs), { author: 'Author 1', blogs: 2 })
  })
  test('of one blog one author is returned', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([].concat(testBlog)), {
      author: 'Author 1',
      blogs: 1,
    })
  })
  test('if no blogs are given no info is returned is returned', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([]), { author: undefined, blogs: 0 })
  })
})
