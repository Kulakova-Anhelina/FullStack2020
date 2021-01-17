
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import React, { useState } from 'react'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import CreateNew from './components/Createnew'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification("The anecdote was created" + anecdote.content)
    setTimeout(() => {
      setNotification('')
    }, 10000);

  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(note => note.id === match.params.id)
    : null


  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }


  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <div>
          <Link to="/">about</Link> {" "}
          <Link to="/create">Create New</Link> {" "}
          <Link to="/anecdotes">Anecdotes</Link>{" "}
        </div>

        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote anecdote={anecdote} />
          </Route>
          <Route path="/anecdotes">
            <AnecdoteList anecdotes={anecdotes} notification={notification} />
          </Route>
          <Route path="/create"  render={() =>
          notification ?   <Redirect to="/anecdotes"/>:
        <CreateNew addNew={addNew} />
          } />
       <Route path="/">
            <About />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
