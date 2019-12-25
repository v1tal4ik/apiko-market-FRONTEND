import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBlock from '../SearchBlock';
import { connect } from 'react-redux';
import { getUser } from '../../modules/user/selectors';
import { store } from '../../index';
import './style.css';



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

  componentDidMount = () => {
    store.subscribe(this.userAuthObserver);
  }

  render() {
    const { userAuth } = this.state; 
    const logoSrc = userAuth ? 
          '../../img/logo-white.png' 
          : '../../img/logo-dark.png';
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
      <Link to = '/' className = 'logo'>
        <img 
          src = { logoSrc } 
          className = 'logo-img' 
          alt = 'apiko' 
          />
       </Link>
      { userAuth ?
      <>
        <div className = 'header-nav'>
          <Link to = '/sell' className = 'header-btn'>
            sell
          </Link>
          <Link to = '/fav-tours'>
          <i className = "far fa-heart header-heart"></i> 
          </Link>
          <Link 
            to = '/profile' 
            className = 'avatar-block'>
            <img src = {this.props.user.img} alt = "avatar" />
          </Link>
        </div>
        <SearchBlock />
        </>
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
