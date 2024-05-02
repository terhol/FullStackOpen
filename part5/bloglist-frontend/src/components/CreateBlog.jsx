import { useState } from 'react'

import blogService from '../services/blogs'
import { useMessage } from '../contexts/MessageContext.jsx'

export const CreateBlog = ({ blogs, setBlogs }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const { setMessage } = useMessage()

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = await blogService.create({ author, title, url })

    setMessage({ messageText: `Successfully added blog ${title} by ${author}.`, isError: false })

    setTimeout(() => {
      setMessage(null)
    }, 5000)

    setAuthor('')
    setTitle('')
    setUrl('')

    setBlogs(blogs.concat(newBlog))
  }

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={handleNewBlog} className="pure-form pure-form-stacked">
        <fieldset>
          <input
            placeholder="Title"
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />

          <input
            placeholder="Author"
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />

          <input
            placeholder="URL"
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <button className="pure-button pure-button-primary" type="submit">
            Create
          </button>
        </fieldset>
      </form>
    </>
  )
}
