import Blog from './Blog'

export const BlogList = ({ blogs }) => (
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
