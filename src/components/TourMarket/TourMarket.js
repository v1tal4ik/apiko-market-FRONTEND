import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../modules/user/selectors';
import { getTours } from '../../modules/tours/selectors';
import { getSearch } from '../../modules/search/selectors';
import { isLoading } from '../../modules/isLoading/selectors';
import { fetchTours } from '../../modules/tours';
import { updateUserFavList } from '../../api';
import TourItem from '../TourItem';
import TourMockItem from '../TourMockItem';
import MainModal from '../MainModal';
import './style.css';


class TourMarket extends Component {
  constructor(props) {
    super();
    this.componentDidMount = () => {
      const { fetchTours } = this.props;
      fetchTours();
    };
    this.renderTours = (item) => {
      const { searchQuery, searchLocation } = this.props.search;
      const { id, name: prevName, location } = item;
      const name = prevName.toUpperCase();

      if (searchQuery && searchLocation) {
        if (name.includes(searchQuery) && location.includes(searchLocation)) {
          return <TourItem key = {id} tour = {item} />;
        }
        return null;
      }

      if (searchQuery) {
        return name.includes(searchQuery) ? <TourItem key = {id} tour = {item} /> : null;
      }

      if (searchLocation) {
        return location.includes(searchLocation) ? <TourItem key = {id} tour = {item} /> : null;
      }
      return <TourItem key = {id} tour = {item} />;
    };
    this.componentWillUnmount = async () => {
      const { id, favProducts } = this.props.user;
      await updateUserFavList({ id, favProducts });
    };
  }

  render() {
    const {
      isLoading,
      arrOfItem,
    } = this.props;
    return (
            <>
            <div className = 'tour-market-container'>
            { arrOfItem.length !== 0 && !isLoading
              ? arrOfItem.map(this.renderTours)
              : <TourMockItem />}
            </div>
            <MainModal />
            </>
    );
  }
}

export default connect(state => ({
  user: getUser(state),
  arrOfItem: getTours(state),
  search: getSearch(state),
  isLoading: isLoading(state),
}), { fetchTours })(TourMarket);
