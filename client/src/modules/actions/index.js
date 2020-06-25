import {
  SIGN_IN,
  SIGN_OUT,
  ME,
  NO_TOKEN
} from './types'


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