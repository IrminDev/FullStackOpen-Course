const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

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
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: () => books,
    allAuthors: () => authors.map(author => {
      const bookCount = books.filter(book => book.author === author.name).length
      return { ...author, bookCount }
    })
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()
        author = newAuthor
      }
      const book = new Book({ ...args, author: author._id })
      return book.save()
    },
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name === args.name)
      if (!author) return null
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(author => author.name === args.name ? updatedAuthor : author)
      return updatedAuthor
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