const { gql } = require('apollo-server')

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

module.exports = typeDefs
