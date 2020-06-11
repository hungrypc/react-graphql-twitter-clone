import { extractFragmentReplacements } from 'prisma-binding'

import Query from './Query'
import Mutation from './Mutation'
// import Subscription from './Subscription'
import User from './User'
import Tweet from './Tweet'

const resolvers = {
  Query,
  Mutation,
  // Subscription,
  User,
  Tweet
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export { resolvers, fragmentReplacements }