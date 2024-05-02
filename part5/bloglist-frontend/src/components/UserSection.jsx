import { useState } from 'react'

import { useUser } from '../contexts/UserContext.jsx'
import { useMessage } from '../contexts/MessageContext.jsx'

export const UserSection = () => {
  const { user, login, logout } = useUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setMessage } = useMessage()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await login({ username, password })

      setPassword('')
      setUsername('')
    } catch (exception) {
      setMessage({ messageText: 'Username or password is incorrect.', isErrorMessage: true })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()

    logout()
  }

  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin} className="pure-form pure-form-stacked">
          <fieldset>
            <input
              placeholder="Username"
              type="text"
              name="Username"
              value={username}
              onChange={({ target }) => {
                setUsername(target.value)
              }}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => {
                setPassword(target.value)
              }}
            />
            <button className="pure-button pure-button-primary" type="submit">
              Log in
            </button>
          </fieldset>
        </form>
      </>
    )
  }
  return (
    <>
      <div>
        User <pre style={{ display: 'inline' }}>{user.username}</pre> is logged in.
      </div>
      <form onSubmit={handleLogOut} className="pure-form pure-form-stacked">
        <fieldset>
          <button className="pure-button pure-button-primary" type="submit">
            Log out
          </button>
        </fieldset>
      </form>
    </>
  )
}
