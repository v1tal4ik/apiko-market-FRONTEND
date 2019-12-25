import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { withRouter } from 'react-router';
import { changeSearch, resetSearch } from '../../modules/search';
import './antd-select.css';
import './style.css';

// Path for img when I use server static file
// src='./img/logo.png'

const { Option } = Select;
const initialState = {
  wasKeyDown: false,
  searchQuery: '',
  searchLocation: 'Location',
};

export const arrOfContinent = [
  {
    value: 'asia',
    text: 'Asia',
  },
  {
    value: 'africa',
    text: 'Africa',
  },
  {
    value: 'europe',
    text: 'Europe',
  },
  {
    value: 'australia',
    text: 'Australia',
  },
  {
    value: 'north america',
    text: 'North America',
  },
  {
    value: 'south america',
    text: 'South America',
  },
];

class SearchBlock extends Component {
  constructor(props) {
    super();
    this.state = initialState;
    this.handleChangeInput = ({ target: { name, value } }) => {
      this.setState({ [name]: value.trim(), wasKeyDown: !!value });
    };
    this.handleChangeLocation = searchLocation => this.setState({ searchLocation, wasKeyDown: true });
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
    const { searchQuery, searchLocation, wasKeyDown } = this.state;
    const isVisible = wasKeyDown ? 'inline-block' : 'none';
    const isComponentVisible = this.props.location.pathname === '/';
    return (
      isComponentVisible ? <form className = 'search-block'>
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
          {arrOfContinent.map((item, index) => <Option key = {index} value={item.value}>{item.text}</Option>)}
      </Select>
      <button className = 'search-btn' onClick = {this.handleClickSearch}>search</button>
      <button className = 'search-btn' style = {{ display: isVisible }} onClick = {this.handleClickReset}>reset</button>
    </form> : null
    );
  }
}

export default connect(() => ({}), { changeSearch, resetSearch })(withRouter(SearchBlock));
