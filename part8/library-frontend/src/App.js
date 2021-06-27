
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/loginForm'
import { ALL_AUTHORS, ALL_BOOKS, FIND_RECOMS, BOOK_ADDED } from './queries'
import Recommendations from './components/Recomends'
import {
  useQuery, useMutation, useSubscription, useApolloClient
} from '@apollo/client'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const recoms = useQuery(FIND_RECOMS)
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert("Book added")
      console.log(subscriptionData);
    }
  })

  if (authors.loading | books.loading) {
    return <div>loading...</div>
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }



  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }



  // ...



  // const updateCacheWith = (addedPerson) => {
  //   const includedIn = (set, object) =>
  //     set.map(p => p.id).includes(object.id)

  //   const dataInStore = client.readQuery({ query: ALL_PERSONS })
  //   if (!includedIn(dataInStore.allPersons, addedPerson)) {
  //     client.writeQuery({
  //       query: ALL_BOOKS,
  //       data: { al : dataInStore.allPersons.concat(addedPerson) }
  //     })
  //   }
  // }





  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <button onClick={logout}>
        logout
      </button>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recoomendations')}>Recommendations</button>
      </div>
      <Recommendations
        show={page === 'recoomendations'}
        recomBooks={recoms}
        setPage={setPage}

      />
      <Authors
        show={page === 'authors'}
        authors={authors}
        setPage={setPage}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
        setError={setErrorMessage}
      />


    </div>
  )
}

export default App