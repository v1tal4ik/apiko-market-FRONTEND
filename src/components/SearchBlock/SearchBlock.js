import React, { Component } from 'react';
import { Select } from 'antd';
import './antd-select.css';
import './style.css';

// Path for img when I use server static file
// src='./img/logo.png'

const { Option } = Select;

class SearchBlock extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <form className = 'search-block'>
        <i className = 'fas fa-search search-icon' aria-hidden = 'true'></i>
        <input type = 'text' className = 'search-input' placeholder = 'Search products by name' />
        <Select
            optionFilterProp = 'children'
            className = ''
            style = {{ heigth: '160px' }}
            defaultValue = 'Location'
            onChange = {this.foo}
            >
            <Option key ='asia' value='asia'>Asia</Option>
            <Option key ='africa' value='africa'>Africa</Option>
            <Option key ='europe' value='europe'>Europe</Option>
            <Option key ='australia' value='australia'>Australia</Option>
            <Option key ='north america' value='north america'>North America</Option>
            <Option key ='south america' value='south america'>South America</Option>
        </Select>
        <button className = 'search-btn'>search</button>
        <button className = 'search-btn'>reset</button>
      </form>
    );
  }
}


export default SearchBlock;
