import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isEmailUnique, addNewUser } from '../../api/index';
import Rodal from 'rodal';
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
      const exp = /@/;
      const isUnique = await isEmailUnique({ email });
      const result = ((email.search(exp) !== -1 && isUnique));
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
            <form className='register-form'>
                <p className='login-form-title'>Register</p>

                <label className='login-form-label'>Email <span>(unique)</span></label>
                <input className="login-form-input" type="text" name='email' value={data.email} placeholder='Example@gmail.com' onChange={this.handleChangeInput} onBlur={this.checkEmail.bind(this)} required/>
                {check.email
                  ? <div className = 'form-status-icon' >
                            {status.email ? <i className="fas fa-check green"></i > : < i className = "fas fa-times red" > </i>}
                        </div>
                  : null
                }

                <label className='login-form-label'>Full Name</label>
                <input className="login-form-input" type="text" name='fullName' value={data.fullName} placeholder='Tony Stark' onChange={this.handleChangeInput} onBlur={this.checkName} required />
                {check.fullName
                  ? <div className = 'form-status-icon' >
                            {status.fullName ? <i className="fas fa-check green"></i > : < i className = "fas fa-times red" > </i>}
                        </div>
                  : null
                }

                <label className='login-form-label'>Password</label> <br/>
                <input className="login-form-input" type="password" name='password' value={data.password} onChange={this.handleChangeInput} onBlur={this.checkPass} required />
                {check.password
                  ? <div className = 'form-status-icon' >
                            {status.password ? <i className="fas fa-check green"></i > : < i className = "fas fa-times red" > </i>}
                        </div>
                  : null
                }

                <label className='login-form-label'>Password Again</label> <br/>
                <input className="login-form-input" type="password" name='passwordAgain' value={data.passwordAgain} onChange={this.handleChangeInput} onBlur={this.checkPass} required />
                {check.password
                  ? <div className = 'form-status-icon' >
                            {status.password ? <i className="fas fa-check green"></i > : < i className = "fas fa-times red" > </i>}
                        </div>
                  : null
                }

                <button className='login-form-btn' onClick={this.handleContinue}>Continue</button>
                <p className='log-in'>I already have an account, <span><Link to='/login' >Log in</Link></span></p>
            </form>

            <Rodal visible={visible} onClose={this.closeModalAdd} animation={'rotate'} height={150} >
                   <div className='registr-modal'>
                      {msg}
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
