const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => await Book.countDocuments(),
      authorCount: async () => await Author.countDocuments(),
      allBooks: async () => 
        await Book.find({}).populate('author'),
      allAuthors: async () => {
        const authors = await Author.find({})
        return authors.map(async author  => {
          const bookCount = await Book.find({ author: author._id }).count()
          return { name: author.name, born: author?.born, bookCount }
        })
      },
      allBooksByGenre: async (root, args) => {
        const books = await Book.find({ genres: { $in: [args.genre] } }).populate('author')
        return books
      },
      me: (root, args, context) => {
        return context.currentUser
      },
      favoriteBooks: async (root, args, context) => {
        const currentUser = context.currentUser
        if(!currentUser) {
          throw new GraphQLError('Not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        const books = await Book.find({ genres: { $in: [currentUser.favoriteGenre] } }).populate('author')
        return books
      }
    },
    Mutation: {
      addBook: async (root, args, context) => {
        if(!args.title || !args.author || !args.published || !args.genres) {
          throw new GraphQLError('All fields are required', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
        if(args.title.length < 4 || args.author.length < 4 || args.published < 0) {
          throw new GraphQLError('Invalid input', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
        const author = await Author.findOne({ name: args.author })
        const currentUser = context.currentUser
  
        if(!currentUser) {
          throw new GraphQLError('Not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
        if (!author) {
          const newAuthor = new Author({ name: args.author })
          await newAuthor.save()
          author = newAuthor
        }
        const book = new Book({ ...args, author: author._id })
        const bookSaved = await book.save()

        pubsub.publish('BOOK_ADDED', { bookAdded: bookSaved })
  
        return bookSaved
      },
  
      createUser: async (root, args) => {
        const user = new User({ ...args })
        return user.save()
          .catch(error => {
            throw new GraphQLError(error.message, {
              extensions: {
                code: 'BAD_USER_INPUT',
              }
            })
          })
      },
  
      editAuthor: async (root, args) => {
        if(!args.name || !args.setBornTo) {
          throw new GraphQLError('All fields are required', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
        if(args.name.length < 4 || args.setBornTo < 0) {
          throw new GraphQLError('Invalid input', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
        const author = await Author.findOne({ name: args.author })
        const currentUser = context.currentUser
  
        if(!currentUser) {
          throw new GraphQLError('Not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
        if (!author) return null
        
        author.born = args.setBornTo
        return author.save()
      },
  
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
        if(!user || args.password !== 'secret') {
          throw new GraphQLError('Invalid username or password', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
        const userForToken = {
          username: user.username,
          id: user._id,
        }
  
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      }
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
      }
    }
}

module.exports = resolvers