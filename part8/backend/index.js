const { ApolloServer, gql } = require("apollo-server");
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const url = require('./url')
const config = require('./utils/config')



console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


function getOccurrence(array, value) {
  return array.filter((v) => v.author === value).length;
}
const { v1: uuid } = require('uuid')


const typeDefs = gql`
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
    allAuthors: [Author!]!
    allBooksview:[Books!]!
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
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => Book.find(({ args: { $in: [args.author, args.genres] } })),

    //(root, args) => books.filter((p) => {
    // console.log((p.author.includes(args.author) && p.genres.includes(args.genres)))
    // if (args.author && args.genres) {
    //   return p.author.includes(args.author) && p.genres.includes(args.genres) ? p : null
    // } else if (args.genres) {
    //   return p.genres.includes(args.genres) ? p : null
    // } else if (args.author) {
    //   return p.author.includes(args.author) ? p : null
    // }
    //}),
    allAuthors: () => Author.find({}),
    allBooksview: () => Book.find({})
  },

  Author: {
    bookCount: (root) => getOccurrence(books, root.name),
  },

  Mutation: {
    addBook: async (root, args) => {

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
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      author.born = born;
      return author
    }

  },
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
