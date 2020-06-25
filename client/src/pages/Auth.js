import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, me } from '../modules/actions'

function Auth(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] =  useState('')

  let history = useHistory()

  const submitHandler = () => {
    // implement better check, react to response
    if (username && password) {
      props.login(username, password)
    }
  }

  useEffect(() => {
    props.me()
    if (props.isSignedIn) {
      history.push('/home')
    }
  }, [props.isSignedIn])

  const render = () => {
    // wondering if this part is necessary, must be better way to load
    if (props.callsInProgress.auth) {
      return (
        <div>loading...</div>
      )
    } else if (props.callsInProgress.auth === false) {
      return (
        <div className="login">
          <div className="login__container">
            <form onSubmit={() => submitHandler()}>
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
    } else {
      return null
    }
  }

  return render()
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    callsInProgress: state.callsInProgress
  }
}

export default connect(mapStateToProps, {
  login, me
})(Auth)
