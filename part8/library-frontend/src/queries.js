import { gql } from '@apollo/client';

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
    title
    author {
      name
      bookCount
      born
    }
    published
    genres

  }
}
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