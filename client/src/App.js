import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Explore from './pages/Explore'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Profile from './pages/Profile'

import history from './modules/history'

import './style/css/App.css';
require('dotenv').config()

// console.log(process.env.REACT_APP_API_URL)

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route path="/" component={Explore} exact />
          <Route path="/login" component={Auth} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/:username" component={Profile} exact/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
