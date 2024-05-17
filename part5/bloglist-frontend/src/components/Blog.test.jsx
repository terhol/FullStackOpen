import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { BlogsProvider } from '../contexts/BlogsContext'
import userEvent from '@testing-library/user-event'
import { describe } from 'vitest'

const blog = {
  title: 'Title 1',
  author: 'Author 1',
  url: 'google.com',
  likes: 10,
  user: {
    name: 'admin',
  },
}

const renderBlog = () => {
  render(
    <BlogsProvider>
      <Blog blog={blog} />
    </BlogsProvider>,
  )
}

const openBlog = async () => {
  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)
}

describe('Blog', () => {
  beforeEach(() => {
    renderBlog()
  })

  it('should display title', () => {
    const blogTitle = screen.getByText('Title 1')
    expect(blogTitle).toBeInTheDocument()
  })

  it('should display author', () => {
    const blogAuthor = screen.getByText('by Author 1')
    expect(blogAuthor).toBeInTheDocument()
  })

  describe('when blog post in closed', () => {
    it('should NOT display URL', () => {
      const url = screen.queryByText('google.com')
      expect(url).not.toBeInTheDocument()
    })
  })
  it('should NOT display likes', () => {
    const likes = screen.queryByText('10 likes')
    expect(likes).not.toBeInTheDocument()
  })

  describe('when blog post in opened', () => {
    it('should display URL', async () => {
      await openBlog()

      const url = screen.getByText('google.com')
      expect(url).toBeInTheDocument()
    })
    it('should display likes', async () => {
      await openBlog()

      const blogLikes = screen.getByText('10 likes')
      expect(blogLikes).toBeInTheDocument()
    })
  })
})
