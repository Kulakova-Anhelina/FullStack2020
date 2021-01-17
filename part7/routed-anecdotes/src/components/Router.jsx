import React from "react";
import About from './About'
import AnecdoteList from './AnecdoteList'
import CreateNew from './Createnew'



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function MainRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">about</Link>
            </li>
            <li>
              <Link to="/create">Create New</Link>
            </li>
            <li>
              <Link to="/anecdotes">Anecdotes</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/create">
            <CreateNew />
          </Route>
          <Route path="/anecdotes">
            <AnecdoteList />
          </Route>
          <Route path="/">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


