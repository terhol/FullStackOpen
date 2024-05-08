import { Togglable } from './Togglable'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginRight: 900,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 10,
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
          style={{
            width: 50,
            height: 25,
            padding: 0,
          }}
        >
          Like{' '}
        </button>
        <br />
      </Togglable>
    </div>
  )
}

export default Blog
