import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email
      }
    })
    if (!user) {
      throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(args.data.password, user.password)
    if (!isMatch) {
      throw new Error('Unable to login')
    }

    return {
      user,
      token: generateToken(user.id)
    }
  },
  async createUser(parent, args, { prisma }, info) {
    // check if email taken
    const emailTaken = await prisma.exists.User({ email: args.data.email })
    if (emailTaken) {
      throw new Error('Email taken')
    }

    // check if username taken
    const usernameTaken = await prisma.exists.User({ username: args.data.username })
    if (usernameTaken) {
      throw new Error('Username taken')
    }

    const password = await hashPassword(args.data.password)

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password,
        public: true
      }
    })

    return {
      user,
      token: generateToken(user.id)
    }
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const userExists = await prisma.exists.User({ id: userId })

    if (!userExists) {
      throw new Error('User not found')
    }

    return prisma.mutation.deleteUser({
      where: {
        id: userId
      }
    }, info)
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password)
    } 

    return await prisma.mutation.updateUser({
      where: {
        id: userId
      },
      data: args.data
    }, info)
  },
  async createTweet(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return await prisma.mutation.createTweet({
      data: {
        text: args.data.text,
        author: {
          connect: {
            id: userId
          }
        }
      }
    }, info)
  },
  async deleteTweet(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const tweetExists = await prisma.exists.Tweet({
      id: args.id,
      author: {
        id: userId
      }
    })

    if (!tweetExists) {
      throw new Error('Unable to delete tweet')
    }

    return await prisma.mutation.deleteTweet({
      where: {
        id: args.id
      }
    }, info)
  }
}

export { Mutation as default }