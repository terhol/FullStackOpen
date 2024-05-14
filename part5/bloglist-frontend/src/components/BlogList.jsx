import { useBlogs } from '../contexts/BlogsContext'
import Blog from './Blog'

export const BlogList = () => {
  const { blogs } = useBlogs()
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return (
    <>
      <h2>List of blogs</h2>
      <ul>
        {sortedBlogs.map((blog) => (
          <li key={blog.url}>
            <Blog key={blog.id} blog={blog} />
          </li>
        ))}
      </ul>
    </>
  )
}
