import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Book from './components/Book/Book';
import Header from './components/Header/Header';
import Private from './components/Private';
export const userContext = createContext()

function App() {

 const [loggedINUser, setLoggedInUser] = useState({})

  return (
    <userContext.Provider value={[loggedINUser, setLoggedInUser]}>
    <p>Name:{loggedINUser.name}</p>
      <Router>
          <Header/>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Private path="/book/:bedType">
              <Book />
            </Private>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
      </userContext.Provider>
  );
}

export default App;
