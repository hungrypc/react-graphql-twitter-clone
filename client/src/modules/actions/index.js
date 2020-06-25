import { GraphQLClient } from 'graphql-request'
import gql from 'graphql-tag';
import {
  SIGN_IN,
  SIGN_OUT,
} from './types'

const graphQLClient = new GraphQLClient(process.env.REACT_APP_API_URL, {
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_PRISMA_TOKEN}`,
  },
})

const api = process.env.REACT_APP_API_URL

export const login = (username, password) => {
  return async (dispatch) => {
    
    await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_PRISMA_TOKEN}`
        },
        body: JSON.stringify({
          query: `mutation { 
            login(
              data: {
                username: ${username},
                password: ${password}
              }
            ) { 
              token
              user {
                id
                name
                email
              } 
            } 
          }`,
        }),
      })
      .then(response => {
        console.log(response.json())
      })
    
    
    // const mutation = gql`mutation { 
    //   login(
    //     data: {
    //       username: ${username},
    //       password: ${password}
    //     }
    //   ) { 
    //     token
    //     user {
    //       id
    //       name
    //       email
    //     } 
    //   } 
    // }`

    // const data = await graphQLClient.request(mutation)
    // console.log(JSON.stringify(data))
  }
}

export const getUsers = () => {
  return async (dispatch) => {
    await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_PRISMA_TOKEN}`
      },
      body: JSON.stringify({
        query: `query {
          users {
            id
            name
            username
            public
          }
        }`,
      }),
    })
    .then(response => {
      console.log(response)
      const jsonResponse = response.data

      console.log(jsonResponse)
    })

  }
}