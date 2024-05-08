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
      <br />
      {blog.url}
      <br />
      {blog.likes} likes &nbsp;
      <button className="pure-button pure-button-primary">Like </button>
    </div>
  )
}

export default Blog
