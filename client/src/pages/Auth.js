import React, { useState } from 'react'
import { connect } from 'react-redux';
import { login } from '../modules/actions'

function Auth(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] =  useState('')

  const submitHandler = () => {
    console.log('submit', username, password)
    props.login(username, password)
  }

  return (
    <div className="login">
      <div className="login__container">
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" autoComplete="off"
            onChange={e => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" 
            onChange={e => setPassword(e.target.value)}
          />
          <div 
            onClick={() => submitHandler()}
            className="login__button"
          >
            Log in
          </div>
        </form>
      </div>
    </div>
  )
}

export default connect(null, {
  login
})(Auth)
