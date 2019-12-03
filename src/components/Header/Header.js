import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../modules/user/reducer';
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

  componentDidMount = () =>{
    store.subscribe(this.userAuthObserver);
  }

  foo = () =>{
    console.log('work');
  }


  render() {
    const { userAuth } = this.state;
    return (
      <header>
      <Link to ='/auth/login'><img src='../../img/logo.png' className='logo' alt='apiko' /></Link>
      {/* src='./img/logo.png' */}
      { userAuth ?
        <div className='header-nav'>
          <button className='header-btn'>sell</button>
          <i className="far fa-heart"></i> 
          <div className='avatar-block' onClick = {this.foo}>
              <img src="../../img/avatar.jpg" alt="avatar" />
          </div>
        </div>  
                :
        <div className='header-nav single'>
           <Link to='/auth/login'><span>Login</span></Link>
        </div> }
      </header>
    );
  }
}


export default connect(state => ({
  user: getUser(state),
}), {})(Header);


// <Link to='/auth/login'><span>Logout</span></Link> 