import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../modules/user/selectors';
import { getTours } from '../../modules/tours/selectors';
import TourItem from '../TourItem';
import TourMockItem from '../TourMockItem';

const FavTours = ({ user: { favProducts }, arrOfItem }) => (
  <div className = 'tour-market-container'>
  { favProducts.length !== 0
    ? favProducts.map((favId) => {
      let renderObj = null;
      arrOfItem.forEach((item) => {
        if (favId === item.id) {
          renderObj = <TourItem key = {item.id} tour = {item} />;
        }
      });
      return renderObj;
    })
    : <TourMockItem />}
</div>
);

export default connect(state => ({
  user: getUser(state),
  arrOfItem: getTours(state),
}), { })(FavTours);
