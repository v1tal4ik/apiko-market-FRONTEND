import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { changeSearch, resetSearch } from '../../modules/search';
import './antd-select.css';
import './style.css';

// Path for img when I use server static file
// src='./img/logo.png'

const { Option } = Select;
const initialState = {
  isKeyWasDown: false,
  searchQuery: '',
  searchLocation: 'Location',
};

class SearchBlock extends Component {
  constructor(props) {
    super();
    this.state = initialState;
    this.handleChangeInput = ({ target: { name, value } }) => {
      this.setState({ [name]: value.trim(), isKeyWasDown: !!value });
    };
    this.handleChangeLocation = searchLocation => this.setState({ searchLocation, isKeyWasDown: true });
    this.handleClickSearch = (e) => {
      e.preventDefault();
      const { searchQuery, searchLocation } = this.state;
      const { changeSearch } = this.props;
      if (searchQuery || searchLocation !== 'Location') {
        const searchQueryProp = searchQuery || null;
        const searchLocationProp = searchLocation !== 'Location' ? searchLocation : null;
        changeSearch({ searchQuery: searchQueryProp, searchLocation: searchLocationProp });
      }
    };
    this.handleClickReset = (e) => {
      const { resetSearch } = this.props;
      e.preventDefault();
      resetSearch();
      this.setState(initialState);
    };
  }

  render() {
    const { searchQuery, searchLocation, isKeyWasDown } = this.state;
    const isVisible = isKeyWasDown ? 'inline-block' : 'none';
    return (
      <form className = 'search-block'>
        <i className = 'fas fa-search search-icon' aria-hidden = 'true'></i>
        <input
          type = 'text'
          className = 'search-input'
          name = 'searchQuery'
          value = {searchQuery}
          onChange = {this.handleChangeInput}
          placeholder = 'Search products by name'
        />
        <Select
            optionFilterProp = 'children'
            defaultValue = 'Location'
            name = 'location'
            value = {searchLocation}
            onChange = {this.handleChangeLocation}
            >
            <Option key ='asia' value='asia'>Asia</Option>
            <Option key ='africa' value='africa'>Africa</Option>
            <Option key ='europe' value='europe'>Europe</Option>
            <Option key ='australia' value='australia'>Australia</Option>
            <Option key ='north america' value='north america'>North America</Option>
            <Option key ='south america' value='south america'>South America</Option>
        </Select>
        <button className = 'search-btn' onClick = {this.handleClickSearch}>search</button>
        <button className = 'search-btn' style = {{ display: isVisible }} onClick = {this.handleClickReset}>reset</button>
      </form>
    );
  }
}

export default connect(() => ({}), { changeSearch, resetSearch })(SearchBlock);
