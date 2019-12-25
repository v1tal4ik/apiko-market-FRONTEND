import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { getUser } from '../../modules/user/selectors';
import { arrOfContinent } from '../SearchBlock/SearchBlock';
import { addNewTour, setTourImage } from '../../api';
import { setMainMessage } from '../../modules/mainMessage/actions';
import InputGroup from '../InputGroup';
import MainModal from '../MainModal';
import './antd-select.css';
import './style.css';

const { Option } = Select;
const initialState = {
  name: '',
  location: '',
  description: '',
  img: '',
  price: '',
};

class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChangeInput = ({ target: { name, value } }) => {
      this.setState({ ...this.state.data, [name]: value });
    };
    this.handleChangeLocation = location => this.setState({ ...this.state.data, location });
    this.handleChangeImage = async ({ target }) => {
      const img = target.files[0];
      const result = await setTourImage(img);
      this.setState({ img: result.url });
    };
    this.handleSubmit = async (e) => {
      const {
        name, location, description, img, price,
      } = this.state;
      const { setMainMessage } = this.props;
      const sellerId = this.props.user.id;
      const time = new Date();
      const date = `${time.getFullYear()}-${time.getMonth()}-${time.getDay()}`;
      if (name && location && description && img && price) {
        e.preventDefault();
        const result = await addNewTour({ sellerId, date, ...this.state });
        setMainMessage(result.message);
        this.setState(initialState);
      }
    };
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const {
      location, description, price, img,
    } = this.state;
    const isImgVisible = img ? 'block' : 'none';
    return (
      <>
      <form className = 'apiko-form add-tour'>
          <p className = 'apiko-form-title '>Add product</p>
          <InputGroup
            label = "Title"
            type = "text"
            name = "name"
            value = {this.state.name}
            placeholder = 'For example: Bali Resort'
            onChangeFunc = {this.handleChangeInput }
            isRequired
            />

          <div className = 'set-location'>
            <label className = 'apiko-form-label'>Location</label>
            <Select
              optionFilterProp = 'children'
              className = 'location-select'
              defaultValue = ''
              name = 'location'
              value = {location}
              onChange = {this.handleChangeLocation}
              >
              {arrOfContinent.map((item, index) => <Option key = {index} value={item.value}>{item.text}</Option>)}
            </Select>
          </div>

          <div className = 'description'>
            <label className = 'apiko-form-label'>Description</label>
            <textarea
            cols = '20'
            rows = '5'
            name = 'description'
            value = {description}
            onChange = {this.handleChangeInput}
            required />
          </div>

          <span className = 'apiko-form-label'>Photos</span>
          <div className = 'set-image'>
            <img
              className = "proto-image"
              src = {img}
              style = {{ display: isImgVisible }}
              alt = "tour"
            />
            <input
              type = 'file'
              className = 'images-inpt'
              name = 'img'
              id = 'file'
              accept = 'image/*'
              onChange = {this.handleChangeImage}
             />
            <label htmlFor = 'file' style = {{ display: isImgVisible === 'block' ? 'none' : 'block' }} >+</label>
          </div>

          <InputGroup
            label = "Price ($)"
            type = "number"
            name = "price"
            value = {price}
            onChangeFunc = {this.handleChangeInput }
            onBlurFunc = { this.checkPass }
            isRequired
            />
          <button
            className = 'apiko-form-btn'
            style = {{ margin: '0' }}
            onClick = {this.handleSubmit} >
            Submit
           </button>
      </form>
      <MainModal />
      </>
    );
  }
}

export default connect(state => ({
  user: getUser(state),
}), { setMainMessage })(Sell);
