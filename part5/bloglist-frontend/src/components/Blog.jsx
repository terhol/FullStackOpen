import { Togglable } from './Togglable'
import blogService from '../services/blogs'
import { useBlogs } from '../contexts/BlogsContext'
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    width: '30%',
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 10,
  }

  const { blogs, setBlogs } = useBlogs()

  const handleLikeIncrease = async () => {
    const updatedLikes = blog.likes + 1
    const updatedBlog = { ...blog, likes: updatedLikes, user: blog.user.id }
    const response = await blogService.update(updatedBlog.id, updatedBlog)
    const updatedBlogs = blogs.map((blog) => (blog.id === response.id ? response : blog))

    setBlogs(updatedBlogs)
  }

  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      await blogService.remove(blog.id)

      const updatedBlogs = blogs.filter((currentBlog) => blog.id !== currentBlog.id)
      setBlogs(updatedBlogs)
    }
  }

  return (
    <div style={blogStyle}>
      <a href={blog.url}>{blog.title}</a> by {blog.author}
      <Togglable buttonLabelOpen="View" buttonLabelClose="Close">
        {blog.url}
        <br />
        {blog.likes} likes &nbsp;
        <button
          className="pure-button pure-button-primary"
          onClick={handleLikeIncrease}
          style={{
            width: 50,
            height: 25,
            padding: 0,
          }}
        >
          Like{' '}
        </button>
        <br />
        Added by: {blog.user.name}
        <br />
        <button
          className="pure-button pure-button-primary"
          style={{ backgroundColor: 'red', float: 'right', width: 100, height: 25, padding: 0 }}
          onClick={handleRemoveBlog}
        >
          {' '}
          Remove blog
        </button>
        <br />
      </Togglable>
    </div>
  )
}

export default Blog
