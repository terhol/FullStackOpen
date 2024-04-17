import blogs from '../services/blogs'
import Blog from './Blog'
import { CreateBlog } from './CreateBlog'

export const BlogPage = ({ blogs, username, handleLogOut }) => (
  <div>
    <h2>Blogs</h2>
    {`${username} is logged in.`} <button onClick={handleLogOut}>Log out</button>
    <p></p>
    <CreateBlog />
    <p></p>
    <h2>List of blogs</h2>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
)
