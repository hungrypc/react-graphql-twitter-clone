import {
  SIGN_IN, SIGN_OUT, ME,
  NO_TOKEN,
  GET_PROFILE_DATA
} from './types'
import { render } from 'react-dom'

const api = process.env.REACT_APP_API_URL
const opt = (token = process.env.REACT_APP_PRISMA_TOKEN) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
}



/////////////////////////// AUTH ///////////////////////////

export const login = (username, password) => {
  return async (dispatch) => {
    await fetch(api, {
      ...opt(),
      body: JSON.stringify({
        query: `mutation { 
            login(
              data: {
                username: "${username}",
                password: "${password}"
              }
            ) { 
              token
              user {
                id
                name
                email
                username
              } 
            } 
          }`,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        if (resJson.errors) {
          console.log('errors', resJson.errors)
        }

        const { token, user } = resJson.data.login
        localStorage.setItem('auth_token', token)

        dispatch({
          type: SIGN_IN,
          payload: user
        })
      })
      .catch(console.error);
  }
}

export const me = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('auth_token')

    if (token) {
      await fetch(api, {
        ...opt(token),
        body: JSON.stringify({
          query: `query {
            me {
              id
              name
              username
              public
              email
              followers {
                id
                name
              }
              following {
                id
                name
              }
            }
          }`,
        }),
      })
        .then(res => res.json())
        .then(resJson => {
          dispatch({
            type: ME,
            payload: resJson.data.me
          })
          // console.log(resJson)
        })
        .catch(console.error);

    } else {
      console.log('no token')
      dispatch({
        type: NO_TOKEN
      })
    }
  }
}


/////////////////////////// USER ///////////////////////////

export const getUserProfileData = (username) => {
  return async (dispatch) => {
    const token = localStorage.getItem('auth_token')
    await fetch(api, {
      ...opt(token),
      body: JSON.stringify({
        query: `query {
          user (
            username: "${username}"
          ) {
            id
            name
            username
            public
            followers {
              id
              name
            }
            following {
              id
              name
            }
          }
        }`,
      }),
    })
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson)
      if (resJson.errors) {
        throw new Error('user not found')  
      } else {
        dispatch({
          type: GET_PROFILE_DATA,
          payload: resJson.data.user
        })
      }
    })
    .catch(console.error);
  }
}