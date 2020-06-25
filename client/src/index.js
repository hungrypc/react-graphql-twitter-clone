import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import reducers from './modules/reducers';
import './style/css/index.css';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_URL,
  headers: {
    authorization: `Bearer ${
      process.env.REACT_APP_PRISMA_TOKEN
    }`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  // {},
  // compose(
  //   applyMiddleware(client.middleware(thunk)),
  //   (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  // )
  composeEnhancers(applyMiddleware(thunk))
);



ReactDOM.render(
  <ApolloProvider client={client} store={store}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
