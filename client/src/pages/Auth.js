import React from 'react'

function Auth() {

  const submitHandler = (event) => {
    console.log('submit')
  }

  return (
    <div className="login">
      <div className="login__container">
        <form>
          <label for="username">Username</label>
          <input type="text" name="username" autoComplete="off"></input>
          <label for="password">Password</label>
          <input type="password" name="password"></input>
          <button>Log in</button>
        </form>
      </div>
    </div>
  )
}

export default Auth
