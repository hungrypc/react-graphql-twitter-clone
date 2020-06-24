import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Explore from './pages/Explore'
import Auth from './pages/Auth'

import history from './modules/history'

import './style/css/App.css';
require('dotenv').config()

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route path="/" component={Explore} exact />
          <Route path="/login" component={Auth} exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
