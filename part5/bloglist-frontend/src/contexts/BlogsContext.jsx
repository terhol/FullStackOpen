import { createContext, useContext, useState } from 'react'

const BlogsContext = createContext({
  blogs: [],
  setBlogs: () => {},
})

const BlogsProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([])

  return <BlogsContext.Provider value={{ blogs, setBlogs }}>{children}</BlogsContext.Provider>
}

const useBlogs = () => useContext(BlogsContext)

export { BlogsProvider, useBlogs }
