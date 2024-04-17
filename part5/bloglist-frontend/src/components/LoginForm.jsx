export const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          name="Username"
          value={username}
          onChange={({ target }) => {
            setUsername(target.value)
          }}
        />
      </div>
      <div>
        Password
        <input
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => {
            setPassword(target.value)
          }}
        />
      </div>
      <button type="submit">Log in</button>
    </form>
  </div>
)
