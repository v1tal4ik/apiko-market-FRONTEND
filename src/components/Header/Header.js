import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../modules/user/selectors';
import { store } from '../../index';
import './style.css';

// Path for img when I use server static file 
// src='./img/logo.png'


class Header extends Component {
  constructor(props) {
    super();
    this.state = {
      userAuth: false,
    };
  }

  userAuthObserver = () => {
    if(this.props.user.isAuth){
      this.setState({ userAuth: true });
    }
  }

  componentDidMount = () =>{
    store.subscribe(this.userAuthObserver);
  }

  render() {
    const { userAuth } = this.state;
    const lightTheme = {
      color:'#000',
      background:'#fff',
    }
    const darkTheme = {
      color:'#fff',
      background:'#000',
    }
    return (
      <header style = { userAuth ? darkTheme: lightTheme } >
      <Link to = '/auth/login'><img src = { userAuth ? '../../img/logo-white.png' : '../../img/logo-dark.png'} className = 'logo' alt = 'apiko' /></Link>
      { userAuth ?
        <div className = 'header-nav'>
          <button className = 'header-btn'>sell</button>
          <i className = "far fa-heart header-heart"></i> 
          <div className = 'avatar-block' onClick = {this.foo}>
              <img src="../../img/avatar.jpg" alt = "avatar" />
          </div>
        </div>  
                :
        <div className = 'header-nav single'>
           <Link to = '/auth/login'><span>Login</span></Link>
        </div> }
      </header>
    );
  }
}


export default connect(state => ({
  user: getUser(state),
}), {})(Header);
