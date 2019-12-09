import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Rodal from 'rodal';
import InputGroup from '../InputGroup'
import { isEmailUnique, addNewUser } from '../../api/index';
import 'rodal/lib/rodal.css';
import './style.css';

class Register extends Component {
  constructor(props) {
    super();
    this.state = {
      data: {
        email: '',
        fullName: '',
        password: '',
        passwordAgain: '',
      },
      check: {
        email: '',
        fullName: '',
        password: '',
      },
      status: {
        email: '',
        fullName: '',
        password: '',
        registration: false,
      },
      visible: false,
      msg: '',
    };
  }

    handleChangeInput = ({ target: { name, value } }) => {
      this.setState({ data: { ...this.state.data, [name]: value } });
    };

    checkEmail = async ({ target: { value: email } }) => {
      const exp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
      const isUnique = await isEmailUnique({ email });
      const result = ( (exp.test(email)) && isUnique));
      this.setState({
        status: { ...this.state.status, email: result },
        check: { ...this.state.check, email: true },
      });
    };

    checkName = ({ target: { value: name } }) => {
      const exp = /[^A-Za-z\d]/;
      const result = !(((exp.test(name)) || !(name)));
      this.setState({
        status: { ...this.state.status, fullName: result },
        check: { ...this.state.check, fullName: true },
      });
    };

    checkPass = (e) => {
      const { password, passwordAgain } = this.state.data;
      const result = ((password && passwordAgain && password === passwordAgain));
      this.setState({
        status: { ...this.state.status, password: result },
        check: { ...this.state.check, password: true },
      });
    };

    handleContinue = async (e) => {
      const { data: { email, fullName, password }, check, status } = this.state;
      if (check.email && check.fullName && check.password && status.email && status.fullName && status.password) {
        e.preventDefault();
        const { status, msg } = await addNewUser({ email, fullName, password });
        this.setState({
          visible: true,
          status: { ...this.state.status, registration: status },
          msg,
        });
      }
    };

    closeModalAdd = () => {
      if (this.state.status.registration) {
        this.setState({
          data: {
            email: '',
            fullName: '',
            password: '',
            passwordAgain: '',
          },
          check: {
            email: '',
            fullName: '',
            password: '',
          },
          status: {
            email: '',
            fullName: '',
            password: '',
            registration: false,
          },
          visible: false,
          msg: '',
        });
      } else {
        this.setState({
          visible: false,
          msg: '',
          status: { registration: false },
        });
      }
    };

  render() {
    const {
      data, check, status, visible, msg,
    } = this.state;
    return (
            <>
            <form className = 'register-form'>
                <p className = 'login-form-title'>Register</p>
                <InputGroup
                  label = "Email (unique)"
                  type = "text"
                  name = "email"
                  placeholder = 'Example@gmail.com'
                  onChangeFunc = {this.handleChangeInput }
                  onBlurFunc = { this.checkEmail }
                  value = { data.email }
                  check = { check.email }
                  status = { status.email }
                  isRequired
                  />

                <InputGroup
                  label = "Full Name"
                  type = "text"
                  name = "fullName"
                  placeholder = "Tony Stark"
                  onChangeFunc = {this.handleChangeInput }
                  onBlurFunc = { this.checkName }
                  value = { data.fullName }
                  check = { check.fullName }
                  status = { status.fullName }
                  isRequired
                  />

                <InputGroup
                  label = "Password"
                  type = "password"
                  name = "password"
                  onChangeFunc = {this.handleChangeInput }
                  onBlurFunc = { this.checkPass }
                  value = { data.password }
                  check = { check.password }
                  status = { status.password }
                  isRequired
                  />

                <InputGroup
                  label = "Password Again "
                  type = "password"
                  name = "passwordAgain"
                  onChangeFunc = {this.handleChangeInput }
                  onBlurFunc = { this.checkPass }
                  value = { data.passwordAgain }
                  check = { check.password }
                  status = { status.password }
                  isRequired
                  />

                <button className = 'login-form-btn' onClick = {this.handleContinue}>Continue</button>
                <p className = 'log-in'>I already have an account, <span><Link to = '/login' >Log in</Link></span></p>
            </form>

            <Rodal visible = { visible } onClose = { this.closeModalAdd } animation = { 'rotate' } height = { 150 } >
                   <div className = 'registr-modal'>
                      { msg }
                   </div>
                   {
                       status.registration
                         ? <Link to = '/auth/login' > < button className = 'registr-modal-btn' > Log in </button></Link >
                         : null
                   }
            </Rodal>
            </>
    );
  }
}

export default Register;
