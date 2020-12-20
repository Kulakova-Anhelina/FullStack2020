import React from 'react'



const LoginForm  = ({handleLogin, onChangeUser, username, password, onChangePassword}) => {
  return (
    <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={onChangeUser}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={onChangePassword}
      />
    </div>
    <button type="submit">login</button>
  </form>
  )
}
export default LoginForm