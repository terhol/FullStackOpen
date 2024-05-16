import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { BlogsProvider } from '../contexts/BlogsContext'

const blog = {
  title: 'Title 1',
  author: 'Author 1',
  url: 'google.com',
  likes: 10,
  user: {
    name: 'admin',
  },
}

test('Correctly renders component and displays correct information', async () => {
  render(
    <BlogsProvider>
      <Blog blog={blog} />
    </BlogsProvider>,
  )

  await screen.findByText('Title 1', { exact: false })
  await screen.findByText('Author 1', { exact: false })

  const blogUrl = screen.queryByText('google.com')
  expect(blogUrl).toBeNull()

  const blogLikes = screen.queryByText('10 likes')
  expect(blogLikes).toBeNull()
})
