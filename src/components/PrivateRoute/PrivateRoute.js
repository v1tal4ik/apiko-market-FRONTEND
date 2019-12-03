import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../modules/user/reducer';


const PrivateRouter = ({ component: Component, ...rest }) => {
  try {
    if (!rest.user.isAuth) { throw new Error(); }
    return <Route {...rest} render = { props => <Component {...props} />}/>;
  } catch (e) {
    return <Redirect to = '/login' />;
  }
};


export default connect(state => ({
  user: getUser(state),
}), {})(PrivateRouter);
