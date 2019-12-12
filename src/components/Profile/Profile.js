import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeUser } from '../../modules/user';
import { getUser } from '../../modules/user/selectors';
import InputGroup from '../InputGroup';
import './style.css';


class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      data: {
        fullName: '',
        phone: '',
      },
      check: {
        fullName: '',
        phone: '',
      },
      status: {
        fullName: '',
        phone: '',
      },
    };
    this.componentDidMount = () => {
      const { fullName, phone } = this.props.user;
      this.setState({ data: { fullName, phone } });
    };
    this.handleChangeInput = ({ target: { name, value } }) => (this.setState({ data: { ...this.state.data, [name]: value } }));
    this.handleChangeImage = () => {
      console.log('work change image');
    }
    this.checkFullName = ({ target: { value: name } }) => {
      const exp = /[^A-Za-z\d]/;
      const result = !(((exp.test(name)) || !(name)));
      this.setState({
        status: { ...this.state.status, fullName: result },
        check: { ...this.state.check, fullName: true },
      });
    };
    this.checkPhone = ({ target: { value: phone } }) => {
      const exp = /^[+]{1}[0-9]{12,16}$/;
      const result = (exp.test(phone) && !!(phone));
      this.setState({
        status: { ...this.state.status, phone: result },
        check: { ...this.state.check, phone: true },
      });
    };
    this.handleSave = (e) => {
      e.preventDefault();
      const { data, check, status } = this.state;
      const { changeUser } = this.props;
      if (!status.fullName && !status.phone) {
        console.log('fetch user(name,phone)');
        return;
      }
      changeUser(data);
    };
  }

  render() {
    const { data, check, status } = this.state;
    return (
      <form className = 'apiko-form profile'>
        <p className = 'apiko-form-title'>Edit Profile</p>
        <div className = 'profile-img'>
          <img src = '../../img/sea.jpg' />
        </div>
        <input type = 'file' name = 'img' id = 'file' onChange = {this.handleChangeImage} />
        <label htmlFor = 'file' className = 'btn-2'>Upload</label>
        <InputGroup
          label = "Full Name"
          type = "text"
          name = "fullName"
          value = { data.fullName }
          placeholder = 'full name ...'
          onChangeFunc = {this.handleChangeInput }
          onBlurFunc = {this.checkFullName }
          check = { check.fullName }
          status = { status.fullName }
          />

        <InputGroup
          label = "Phone Number"
          type = "text"
          name = "phone"
          value = { data.phone }
          placeholder = '+30971234567'
          onChangeFunc = {this.handleChangeInput }
          onBlurFunc = {this.checkPhone }
          check = { check.phone }
          status = { status.phone }
          />
        <button className = 'apiko-form-btn' onClick = {this.handleSave}>Save</button>
    </form>
    );
  }
}


export default connect(state => ({
  user: getUser(state),
}), { changeUser })(Profile);
