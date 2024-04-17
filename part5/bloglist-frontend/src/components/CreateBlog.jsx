import { useState } from 'react'
import blogService from '../services/blogs'

export const CreateBlog = () => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    blogService.create({ author, title, url })
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleNewBlog}>
        <div className="formFields">
          <div className="formField">
            <div>Title:</div>
            <div>
              <input
                type="text"
                name="Title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
          </div>
          <div className="formField">
            <div>Author:</div>
            <div>
              <input
                type="text"
                name="Author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
          </div>
          <div className="formField">
            <div>Url:</div>
            <div>
              <input
                type="text"
                name="Url"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
          </div>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
