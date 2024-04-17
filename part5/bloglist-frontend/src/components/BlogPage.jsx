import blogs from '../services/blogs'
import Blog from './Blog'
import { CreateBlog } from './CreateBlog'

export const BlogPage = ({ blogs, username, handleLogOut }) => (
  <div className="pure-u-1">
    <h2>Blogs</h2>
    <div>
      User <pre style={{ display: 'inline' }}>{username}</pre> is logged in.
    </div>
    <button
      className="pure-button pure-button-primary"
      onClick={handleLogOut}
      style={{ marginTop: '0.5rem' }}
    >
      Log out
    </button>

    <hr style={{ margin: '1.5rem 0', border: '0.5px solid #cce4fa' }} />

    <CreateBlog />

    <h2>List of blogs</h2>
    <ul>
      {blogs.map((blog) => (
        <li key={blog.url}>
          <Blog key={blog.id} blog={blog} />
        </li>
      ))}
    </ul>
  </div>
)
