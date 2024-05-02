import {  useState, createContext, useContext } from 'react'

const MessageContext = createContext({
    message: null,
    setMessage: () => {},
})

const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState(null)

    return <MessageContext.Provider value={{ message, setMessage }}>{children}</MessageContext.Provider>
}

const useMessage = () => useContext(MessageContext)

export { MessageProvider, useMessage }
