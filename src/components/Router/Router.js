import React from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Header from '../Header';
import Login from '../Login';
import Register from '../Register';
import TourMarket from '../TourMarket';
import Profile from '../Profile';

const Router = () => (
  <>
    <BrowserRouter>
      <Header />
      <Switch>
          <Route path = '/auth/login' component = { Login } exact/>
          <Route path = '/auth/registration' component = { Register} exact/>
          <PrivateRoute path = '/' component = { TourMarket } exact/>
          <Route path = '/profile' component = { Profile } exact/>
          {/* <PrivateRoute path = '/profile' component = { Profile } exact/> */}
          <Redirect to = '/auth/login' exact />
      </Switch>
    </BrowserRouter>
  </>
);

export default Router;
