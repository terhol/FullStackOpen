export const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }
  const notificationStyle = {
    color: 'green',
    backgroundColor: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
  }

  return (
    <div style={isError ? { ...notificationStyle, color: 'red' } : notificationStyle}>
      {message}
    </div>
  )
}
