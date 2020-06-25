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

export const login = (username, password) => {
  return async (dispatch) => {
    const mutation = gql`mutation { 
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
    }`

    const data = await graphQLClient.request(mutation)
    console.log(JSON.stringify(data))
  }
}