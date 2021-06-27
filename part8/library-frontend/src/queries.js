import { gql } from '@apollo/client';


export const BOOK_DETAILS = gql`
  fragment BookDetails on Books {
    title
    author {
      name
      bookCount
      born
    }
    published
    genres
  }

`


export const ALL_AUTHORS = gql`

query {
  allAuthors {
    name
    bookCount
    born
  }
}

`


export const ALL_BOOKS = gql`
query {
  allBooksview {
   ...BookDetails

  }
}
${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
mutation createBook(
  $title: String
  $published: Int!
  $author: String!
  $genres: [String!]!
  ) {
  addBook(
    title:  $title
    published: $published
    author: $author
    genres:$genres
  ) {
    title
    published
    author{
      name
      bookCount
      born
    }
    genres
  }
}
`


export const EDIT_YEAR = gql`
  mutation  editAuthor($name:String! , $born: Int!){
    editAuthor(name: $name, born: $born)  {
    name
    born
    bookCount
    }
  }
`


export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }

`

export const FIND_BOOK_BY_GENRE = gql`
query findBookByGenre($genres: String!) {
  allBooks(genres: $genres) {
    title
    author {
      name
    }
    published
    genres
  }
}
`


export const FIND_RECOMS = gql`
query {
  findRecoms {
    title
    published
    author{name}
  }
}

`



export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

${BOOK_DETAILS}
`