import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rodal from 'rodal';
import MockItem from '../MockItem';
import MarketItem from '../MarketItem';
import { store } from '../../index';
import { getUser } from '../../modules/user/selectors';
import { getItems } from '../../modules/items/selectors';
import { isLoading } from '../../modules/isLoading/selectors';
import { getMainError } from '../../modules/mainError/selectors';
import { fetchItemList } from '../../modules/items';
import 'rodal/lib/rodal.css';
import './style.css';


class Market extends Component {
  constructor(props) {
    super();
    this.state = {
      visible: false,
    };
    this.componentDidMount = () => {
      const { fetchItemList } = this.props;
      fetchItemList();
      store.subscribe(this.errorObserver);
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
    const { isLoading, arrOfItem, mainError } = this.props;
    const w = 300;
    const h = 100;
    return (
            <>
            <div className = 'market-container'>
            { arrOfItem !== 0 && !isLoading && mainError === null ? arrOfItem.map(item => <MarketItem key = {item.id} {...item} />) : <MockItem />}
            </div>
            <Rodal visible = {visible} animation = {'rotate'} duration = {500} wigth = {w} height = {h} onClose = {this.closeModal} >
                <div className='modal-error'>{mainError}</div>
            </Rodal>
            </>
    );
  }
}

export default connect(state => ({
  user: getUser(state),
  arrOfItem: getItems(state),
  isLoading: isLoading(state),
  mainError: getMainError(state),
}), { fetchItemList })(Market);
