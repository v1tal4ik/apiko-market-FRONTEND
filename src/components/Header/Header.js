import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchBlock from '../SearchBlock';
import { getUser } from '../../modules/user/selectors';
import { userLogOut } from '../../modules/user';
import { store } from '../../index';
import './style.css';


class Header extends Component {
  constructor(props) {
    super();
    this.state = {
      userAuth: false,
      profileNavDisplay: 'none',
    };
    this.userAuthObserver = () => {
      if (this.props.user.isAuth) {
        this.setState({ userAuth: true });
      }
    };
    this.componentDidMount = () => {
      store.subscribe(this.userAuthObserver);
    };
    this.handleClickProfileNav = () => {
      this.setState({ profileNavDisplay: 'flex' });
      setTimeout(() => {
        this.setState({ profileNavDisplay: 'none' });
      }, 3000);
    };
    this.handleLogOut = async () => {
      this.handleCloseProfileNav();
      await this.props.userLogOut();
      this.setState({ userAuth: false });
    };
    this.handleCloseProfileNav = () => {
      this.setState({ profileNavDisplay: 'none' });
    };
  }


  render() {
    const { userAuth, profileNavDisplay } = this.state;
    const logoSrc = userAuth
      ? '../../img/logo-white.png'
      : '../../img/logo-dark.png';
    const lightTheme = {
      color: '#000',
      background: '#fff',
    };
    const darkTheme = {
      color: '#fff',
      background: '#000',
    };
    return (
      <header style = { userAuth ? darkTheme : lightTheme } >
      <Link to = '/' className = 'logo'>
        <img
          src = { logoSrc }
          className = 'logo-img'
          alt = 'apiko'
          />
       </Link>
      { userAuth
        ? <>
        <div className = 'header-nav'>
          <Link to = '/sell' className = 'header-btn'>
            sell
          </Link>
          <Link to = '/fav-tours'>
          <i className = "far fa-heart header-heart"></i>
          </Link>
            <img
              src = {this.props.user.img}
              className = 'avatar-block'
              onClick = {this.handleClickProfileNav}
              alt = "avatar"
            />
        </div>
        <div className = 'profile-nav' style={{ display: profileNavDisplay }}>
        <Link
          to = '/my-list'
          className = 'profile-nav-item'
          onClick = {this.handleCloseProfileNav}>
          my List
        </Link>
        <Link
          to = '/profile'
          className = 'profile-nav-item'
          onClick = {this.handleCloseProfileNav}>
          edit profile
        </Link>
        <Link
          to = '/auth/login'
          className = 'profile-nav-item'
          onClick = {this.handleLogOut}>
          logout
        </Link>
        </div>
        <SearchBlock />
        </>
        : <div className = 'header-nav single'>
           <Link to = '/auth/login'><span>Login</span></Link>
        </div> }
      </header>
    );
  }
}


export default connect(state => ({
  user: getUser(state),
}), { userLogOut })(Header);
