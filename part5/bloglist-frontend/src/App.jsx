import { UserProvider } from './contexts/UserContext.jsx'
import { MainLayout } from './components/MainLayout.jsx'
import { MessageProvider } from './contexts/MessageContext.jsx'

const App = () => (
  <UserProvider>
    <MessageProvider>
      <MainLayout />
    </MessageProvider>
  </UserProvider>
)

export default App
