import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../modules/user/selectors';
import { getTours } from '../../modules/tours/selectors';
import TourItem from '../TourItem';
import TourMockItem from '../TourMockItem';
import MainModal from '../MainModal';

class FavTours extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    const { user: { favProducts }, arrOfItem } = this.props;
    return (
      <>
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
        <MainModal />
      </>
    );
  }
}

export default connect(state => ({
  user: getUser(state),
  arrOfItem: getTours(state),
}), { })(FavTours);
