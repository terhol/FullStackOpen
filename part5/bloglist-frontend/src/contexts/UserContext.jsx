import { useCallback, useEffect, useState, createContext, useContext } from 'react'

import { setToken } from '../services/blogs.js'
import { logToApp } from '../services/login.js'

const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
})

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)
      setToken(user.token)
    }
  }, [])

  const login = useCallback(async ({ username, password }) => {
    const user = await logToApp({ username, password })

    setUser(user)
    setToken(user.token)

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }, [])

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>
}

const useUser = () => useContext(UserContext)

export { UserProvider, useUser }
