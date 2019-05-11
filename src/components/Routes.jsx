import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Post from './Post';

const Routes = () => (
  <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/posts/:id" component={Post} />
      <Route exact path="*" component={Login} />
  </Switch>
);

export default Routes;
