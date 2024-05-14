import { useEffect } from 'react'

import { Message } from './Message.jsx'
import { UserSection } from './UserSection.jsx'
import { CreateBlog } from './CreateBlog.jsx'
import { BlogList } from './BlogList.jsx'
import blogService from '../services/blogs.js'
import { useUser } from '../contexts/UserContext.jsx'
import { useMessage } from '../contexts/MessageContext.jsx'
import { Togglable } from './Togglable.jsx'
import { useToggle } from './useToggle.js'
import { useBlogs } from '../contexts/BlogsContext.jsx'

export const MainLayout = () => {
  const { user } = useUser()
  const { message } = useMessage()
  const createBlogToggle = useToggle()
  const { setBlogs } = useBlogs()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  return (
    <div className="pure-g">
      <div className="pure-u-1">
        {message !== null && (
          <Message message={message.messageText} isError={message.isErrorMessage} />
        )}
      </div>
      <div className="pure-u-1">
        <UserSection />
      </div>
      {user !== null && (
        <>
          <div className="pure-u-1">
            <hr style={{ border: '0.5px solid #cce4fa' }} />
          </div>
          <div className="pure-u-1">
            <h2>Blogs</h2>
            <div className="pure-u-1">
              <Togglable
                buttonLabelOpen="Add New Blog"
                buttonLabelClose="Cancel"
                toggle={createBlogToggle}
              >
                <CreateBlog onCreate={createBlogToggle.toggle} />
              </Togglable>
            </div>
            <div className="pure-u-1">
              <BlogList />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
