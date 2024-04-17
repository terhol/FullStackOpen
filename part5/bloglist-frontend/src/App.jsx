import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import { LoginForm } from './components/LoginForm'
import { logToApp } from './services/login'
import { BlogPage } from './components/BlogPage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await logToApp({ username, password })
      setUser(user)
      setPassword('')
      setUsername('')
    } catch (exception) {
      console.log('Wrong credentials.')
    }
  }

  return (
    <div>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <BlogPage blogs={blogs} username={user.username} />
      )}
    </div>
  )
}

export default App
