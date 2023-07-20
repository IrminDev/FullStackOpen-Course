const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
import { GraphQLError } from 'graphql';

mongoose.set('strictQuery', false)

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    allBooksByGenre(genre: String!): [Book!]!
    allBooksByAuthor(author: String!): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ) : Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
  }
`

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
    }
  },
  Mutation: {
    addBook: async (root, args) => {
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
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()
        author = newAuthor
      }
      const book = new Book({ ...args, author: author._id })
      return book.save()
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
      if (!author) return null
      author.born = args.setBornTo
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})