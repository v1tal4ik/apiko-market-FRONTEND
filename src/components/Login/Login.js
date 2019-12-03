import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserByEmail , isPassValid, singInById } from '../../api/index';
import { fetchUserDataSuccess, fetchUserDataFailure, userAuth} from '../../modules/user/actions';
import { getUser } from '../../modules/user/reducer';
import './style.css';


class Login extends Component{
    constructor(props) {
        super()
        this.state =  {
            data: {
                email:'',
                password:''
            },
            check:{
                email:'',
                password:''
            },
            status: {
                email:'',
                password:''
            }
        }
    }

    handleChangeInput = ({ target: { name, value } }) => {
        this.setState({ data: { ...this.state.data, [name]: value } });
      };
      
    checkEmail = async (e) => {
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
      
    checkPassword = async (e) => {
        const { email, password } = this.state.data;
        const response = await isPassValid({ email, password });
        this.setState({
          status: { ...this.state.status, password: response },
          check: { ...this.state.check, password: true },
        });
      };
      
    handleContinue = async (e) => {
        const { check, status } = this.state;
        const { user, user:{ id }, userAuth } = this.props;
        if (check.email && check.password && status.email && status.password) {
          e.preventDefault();
          const result = await singInById({ id });
          const path = result ? '/': 'login';
          user.isAuth = true;
          await userAuth(user);
          this.props.history.push(path);
        }
      };
      


    render(){
        const { check, status } = this.state;
        return (
            <>
            <form className='login-form'>
                <p className='login-form-title'>Login</p> 

                <label className='login-form-label'>Email</label> 
                <input className="login-form-input" type="text" name='email' placeholder='Example@gmail.com' onChange={this.handleChangeInput} onBlur={this.checkEmail} required/>
                {check.email ?
                        <div className = 'form-status-icon' > 
                            {status.email ?  <i className="fas fa-check green"></i > : < i className = "fas fa-times red" > </i>} 
                        </div> :
                    null
                }

                <label className='login-form-label'>Password</label>
                <input className="login-form-input" type="password" name='password' onChange={this.handleChangeInput} onBlur={this.checkPassword.bind(this)} />
                {check.password ?
                        <div className = 'form-status-icon' > 
                            {status.password ?  <i className="fas fa-check green"></i > : < i className = "fas fa-times red" > </i>} 
                        </div> :
                    null
                }

                <Link to='#'><p className='login-form-helper'>Don't remember password?</p></Link>
                <button className='login-form-btn' onClick={this.handleContinue}>Continue</button>
            </form>
            <div className='register-block'>
                <p>I have no account, <span><Link to='/auth/registration' >register now</Link></span></p>
            </div>
            </>
        )
    }
}

export default connect(state => ({
  user: getUser(state),
}),{fetchUserDataSuccess,fetchUserDataFailure, userAuth })(Login);