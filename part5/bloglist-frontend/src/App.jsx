import { UserProvider } from './contexts/UserContext.jsx'
import { MainLayout } from './components/MainLayout.jsx'
import { MessageProvider } from './contexts/MessageContext.jsx'
import { BlogsProvider } from './contexts/BlogsContext.jsx'

const App = () => (
  <UserProvider>
    <MessageProvider>
      <BlogsProvider>
        <MainLayout />
      </BlogsProvider>
    </MessageProvider>
  </UserProvider>
)

export default App
