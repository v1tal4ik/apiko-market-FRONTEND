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
import Sell from '../Sell';
import FavTours from '../FavTours';

const Router = () => (
  <>
    <BrowserRouter>
      <Header />
      <Switch>
          <Route path = '/auth/login' component = { Login } exact />
          <Route path = '/auth/registration' component = { Register} exact />
          <PrivateRoute path = '/' component = { TourMarket } exact />
          <PrivateRoute path = '/profile' component = { Profile } exact />
          <PrivateRoute path = '/sell' component = { Sell } exact />
          <PrivateRoute path = '/fav-tours' component = { FavTours } exact />
          <Redirect to = '/auth/login' exact />
      </Switch>
    </BrowserRouter>
  </>
);

export default Router;
