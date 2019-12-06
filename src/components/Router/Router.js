import React, { Component } from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Header from '../Header';
import Login from '../Login';
import Register from '../Register';
import Market from '../Market';

const Router = () => (
  <>
    <BrowserRouter>
      <Header />
      <Switch>
          <Route path = '/auth/login' component = { Login } exact/>
          <Route path = '/auth/registration' component = { Register} exact/>
          <PrivateRoute path = '/' component = { Market } exact/>
          <Redirect to = '/auth/login' exact />
      </Switch>
    </BrowserRouter>
  </>
);

export default Router;
