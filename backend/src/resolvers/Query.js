import getUserId from '../utils/getUserId'

const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    }

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query
        }]
      }
    }

    return prisma.query.users(opArgs, info)
  },
  async user(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        username: args.username
      }
    }, info)

    if (!user) {
      throw new Error('User does not exist')
    }

    return user
  },
  async me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return prisma.query.user({
      where: {
        id: userId
      }
    }, info)
  },
  tweets(parent, args, { prisma }, info) {
    const opArgs = {
      where: {
        author: {
          public: true
        }
      },
      orderBy: 'createdAt_DESC'
    }

    return prisma.query.tweets(opArgs, info)
  },
  async tweet(parent, args, { prisma, request }, info) {
    const getTweet = await prisma.query.tweets({
      where: {
        id: args.id,
        OR: [{
          author: {
            public: true
          }
        }]
      }
    }, info)

    if (getTweet.length === 0) {
      throw new Error('Tweet not found')
    }

    return getTweet[0]
  }
}

export { Query as default }