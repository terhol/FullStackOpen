import { useBlogs } from '../contexts/BlogsContext'
import Blog from './Blog'

export const BlogList = () => {
  const { blogs } = useBlogs()
  return (
    <>
      <h2>List of blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.url}>
            <Blog key={blog.id} blog={blog} />
          </li>
        ))}
      </ul>
    </>
  )
}
