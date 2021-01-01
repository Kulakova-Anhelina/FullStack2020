import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'


const App = () => {

  return (
    <div>
      <Filter />
      <Notification/>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App