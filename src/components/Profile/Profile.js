import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from '../../index';
import { changeUser } from '../../modules/user';
import { setMainMessage } from '../../modules/mainMessage/actions';
import { getUser } from '../../modules/user/selectors';
import InputGroup from '../InputGroup';
import MainModal from '../MainModal';
import { saveProfileImg } from '../../api/user';
import './style.css';

const initialState = {
  data: {
    id: 0,
    fullName: '',
    phone: '',
    img: '',
  },
  check: {
    fullName: '',
    phone: '',
  },
  status: {
    fullName: '',
    phone: '',
    img: '',
  },
};

class Profile extends Component {
  constructor(props) {
    super();
    this.state = initialState;
    this.componentDidMount = () => {
      this.setUserToState();
      store.subscribe(this.setUserToState);
    };
    this.setUserToState = () => {
      const {
        id, fullName, phone, img,
      } = this.props.user;
      const { data } = this.state;
      if (data.fullName !== fullName || data.phone !== phone || data.img !== img) {
        this.setState({
          data: {
            fullName, phone, id, img,
          },
        });
      }
    };
    this.handleChangeInput = ({ target: { name, value } }) => (this.setState({ data: { ...this.state.data, [name]: value } }));
    this.handleChangeImage = async ({ target }) => {
      const { setMainMessage } = this.props;
      const img = target.files[0];
      const result = await saveProfileImg(img);
      if (result) {
        return this.setState({
          data: { ...this.state.data, img: result.url },
          status: { ...this.state.status, img: true },
        });
      }
      this.setState({ status: { ...this.state.status, img: false } });
      setMainMessage(result.message);
    };
    this.checkFullName = ({ target: { value: name } }) => {
      const exp = /[^A-Za-z\d][ ]/;
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
      const { data, status } = this.state;
      const { changeUser } = this.props;
      if (!status.fullName && !status.phone && !status.img) { return; }
      changeUser(data);
    };
  }

  render() {
    const { data, check, status } = this.state;
    return (
      <>
      <form className = 'apiko-form profile'>
        <p className = 'apiko-form-title'>Edit Profile</p>
        <div className = 'profile-img'>
          <img src = {data.img} alt = 'avatar'/>
        </div>
        <input type = 'file' name = 'img' id = 'file' accept = 'image/*' onChange = {this.handleChangeImage} />
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
      <MainModal />
    </>
    );
  }
}


export default connect(state => ({
  user: getUser(state),
}), { changeUser, setMainMessage })(Profile);
