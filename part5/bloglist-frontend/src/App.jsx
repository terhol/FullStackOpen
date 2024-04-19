import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import { LoginForm } from './components/LoginForm'
import { logToApp } from './services/login'
import { BlogPage } from './components/BlogPage'
import { setToken } from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await logToApp({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setToken(user.token)
      setUser(user)
      setPassword('')
      setUsername('')
    } catch (exception) {
      setIsError(true)
      setMessage('Username or password is incorrect.')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <div className="pure-g">
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          message={message}
          isError={isError}
        />
      ) : (
        <BlogPage
          blogs={blogs}
          setBlogs={setBlogs}
          username={user.username}
          handleLogOut={handleLogOut}
          message={message}
          setMessage={setMessage}
          isError={isError}
          setIsError={setIsError}
        />
      )}
    </div>
  )
}

export default App
