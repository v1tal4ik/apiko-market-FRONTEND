import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserByEmail, isPassValid, singInById } from '../../api/index';
import { fetchUserDataSuccess, fetchUserDataFailure, userAuth } from '../../modules/user/actions';
import { getUser } from '../../modules/user/selectors';
import InputGroup from '../InputGroup';
import './style.css';


class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      data: {
        email: '',
        password: '',
      },
      check: {
        email: '',
        password: '',
      },
      status: {
        email: '',
        password: '',
      },
    };
    this.handleChangeInput = ({ target: { name, value } }) => {
      this.setState({ data: { ...this.state.data, [name]: value } });
    };
    this.checkEmail = async () => {
      const { email } = this.state.data;
      const { fetchUserDataSuccess, fetchUserDataFailure } = this.props;
      const { status: result, user } = await getUserByEmail({ email });

      (result) ? fetchUserDataSuccess(user) : fetchUserDataFailure(user);
      this.setState({
        status: { ...this.state.status, email: result },
        check: { ...this.state.check, email: true },
      });
      this.checkPassword();
    };
    this.checkPassword = async () => {
      const { email, password } = this.state.data;
      const response = await isPassValid({ email, password });
      this.setState({
        status: { ...this.state.status, password: response },
        check: { ...this.state.check, password: true },
      });
    };
    this.handleContinue = async (e) => {
      const { check, status } = this.state;
      const { user, user: { id }, userAuth } = this.props;
      if (check.email && check.password && status.email && status.password) {
        e.preventDefault();
        const result = await singInById({ id });
        const path = result ? '/' : 'login';
        user.isAuth = true;
        await userAuth(user);
        this.props.history.push(path);
      }
    };
  }


  render() {
    const { check, status } = this.state;
    return (
            <>
            <form className = 'apiko-form'>
                <p className = 'apiko-form-title'>Login</p>
                <InputGroup
                  label = "Login"
                  type = "text"
                  name = "email"
                  placeholder = 'Example@gmail.com'
                  onChangeFunc = {this.handleChangeInput }
                  onBlurFunc = { this.checkEmail }
                  check = { check.email }
                  status = { status.email }
                  />

                <InputGroup
                  label = "Password"
                  type = "password"
                  name = "password"
                  onChangeFunc = {this.handleChangeInput }
                  onBlurFunc = { this.checkPassword }
                  check = { check.password }
                  status = { status.password }
                  />

                <Link to='#'><p className = 'apiko-form-helper'>Don't remember password?</p></Link>
                <button className = 'apiko-form-btn' onClick = {this.handleContinue}>Continue</button>
            </form>
            <div className = 'register-block'>
                <p>I have no account, <span><Link to = '/auth/registration' >register now</Link></span></p>
            </div>
            </>
    );
  }
}

export default connect(state => ({
  user: getUser(state),
}), { fetchUserDataSuccess, fetchUserDataFailure, userAuth })(Login);
