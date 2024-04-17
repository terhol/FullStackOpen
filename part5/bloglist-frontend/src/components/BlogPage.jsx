import blogs from '../services/blogs'
import Blog from './Blog'

export const BlogPage = ({ blogs, username }) => (
  <div>
    <h2>Blogs</h2>
    {`${username} is logged in.`}
    <p></p>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
)
