import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom';

import { me } from './modules/actions'

import Nav from './components/Nav'
import Explore from './pages/Explore'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Profile from './pages/Profile'

import history from './modules/history'

import './style/css/App.css';
import './style/css/style.css'
require('dotenv').config()


function App(props) {

  useEffect(() => {
    props.me()
  }, [])

  return (
    <Router history={history}>
      <div className="App">
        <Nav />
        <main className="main-view">
          <Switch>
            <Route path="/" component={Explore} exact />
            <Route path="/login" component={Auth} exact />
            <Route path="/home" component={Home} exact />
            <Route path="/:username" component={Profile} exact />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default connect(null, {
  me
})(App);
