const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const config = require('./utils/config')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

console.log('connecting to', config.MONGODB_URI)
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
mongoose.set('debug', true);

const typeDefs = gql`


type Token {
  value: String!
}

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

  type Author {
    name: String!
    bookCount: Int
    born: Int
  }

  type Books {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: String): [Books!]!
    findRecoms: [Books!]
    allAuthors: [Author!]!
    allBooksview:[Books!]!
    me: User
  }


  type Mutation {
    addBook(
      title: String
      published: Int!
      author:String!
      genres: [String]
    ): Books
    editAuthor(
    name: String!
    born: Int
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded:  Books!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (args.author && args.genres) {
        return Book.find({ genres: { $in: [args.genre] }, author: { $in: [author._id] } }).populate('author')
      } else if (args.genres) {
        return Book.find({ genres: { $in: [args.genres] } }).populate('author')
      } else if (args.author) {
        return Book.find({ author: { $in: [author._id] } }).populate('author')
      }

    },

    allAuthors: async () => {
      const authors = await Author.find({}).populate('books')
      return authors.map(author => {
        return {
          name: author.name,
          born: author.born,
          bookCount: author.books.length
        }
      })
    },

    findRecoms: async (root, args, context) => {

      const currentUser = context.currentUser
      return Book.find({ genres: { $in: [currentUser.favoriteGenre] } }).populate('author')
    },
    allBooksview: async () => {
      const books = await Book.find({})
      return books.map(async book => {
        return {
          title: book.title,
          published: book.published,
          genres: book.genres,
          author: await Author.findById(book.author)
        }
      })
    },
    me: (root, args, context) => {
      console.log(context);
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      // const currentUser = context.currentUser
      // if (!currentUser) {
      //   throw new AuthenticationError("not authenticated")
      // }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = await new Author({ name: args.author });
        await author.save();
      }
      const book = new Book({ ...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },



    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      author.born = args.born;
      return author
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },

  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})