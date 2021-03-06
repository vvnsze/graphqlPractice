//Apollo Provider is glue layer between Apollo Store and React Application

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
//Apollo client is agnostic, react-apollo is 'glue'
import { ApolloProvider } from 'react-apollo';
import './style/style.css'

import App from './components/App'
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});
//o for object
//fetch every data, look at them, and use the id field off that record to identify data
//Apollo does not want to automatically assume that you have unique id

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);

//SongDetail has a parameter id
