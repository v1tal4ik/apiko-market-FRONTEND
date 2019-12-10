import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rodal from 'rodal';
import { store } from '../../index';
import { getUser } from '../../modules/user/selectors';
import { getTours } from '../../modules/tours/selectors';
import { getSearch } from '../../modules/search/selectors';
import { isLoading } from '../../modules/isLoading/selectors';
import { getMainError } from '../../modules/mainError/selectors';
import { fetchTours } from '../../modules/tours';
import TourItem from '../TourItem';
import TourMockItem from '../TourMockItem';
import 'rodal/lib/rodal.css';
import './style.css';


class TourMarket extends Component {
  constructor(props) {
    super();
    this.state = {
      visible: false,
    };
    this.componentDidMount = () => {
      const { fetchTours } = this.props;
      fetchTours();
      store.subscribe(this.errorObserver);
    };
    this.renderTours = (item) => {
      const { searchQuery, searchLocation } = this.props.search;
      const { id, name, location } = item;

      if (searchQuery && searchLocation) {
        if (name.includes(searchQuery) && item.location.includes(searchLocation)) {
          return <TourItem key = {id} {...item} />;
        }
        return null;
      }

      if (searchQuery) {
        return name.includes(searchQuery) ? <TourItem key = {id} {...item} /> : null;
      }

      if (searchLocation) {
        return location.includes(searchLocation) ? <TourItem key = {id} {...item} /> : null;
      }
      return <TourItem key = {id} {...item} />;
    };
    this.errorObserver = () => {
      const { mainError } = this.props;
      if (mainError) {
        this.setState({ visible: true });
      }
    };
    this.closeModal = () => {
      this.setState({ visible: false });
    };
  }

  render() {
    const { visible } = this.state;
    const {
      isLoading,
      arrOfItem,
      mainError,
    } = this.props;
    // Prop for modal window
    const w = 300;
    const h = 100;
    return (
            <>
            <div className = 'tour-market-container'>
            { arrOfItem !== 0 && !isLoading && mainError === null
              ? arrOfItem.map(this.renderTours)
              : <TourMockItem />}
            </div>
            <Rodal visible = {visible} animation = {'rotate'} duration = {500} wigth = {w} height = {h} onClose = {this.closeModal} >
                <div className = 'tour-market-modal-error'>{mainError}</div>
            </Rodal>
            </>
    );
  }
}

export default connect(state => ({
  user: getUser(state),
  arrOfItem: getTours(state),
  search: getSearch(state),
  isLoading: isLoading(state),
  mainError: getMainError(state),
}), { fetchTours })(TourMarket);
