import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../modules/user/selectors';
import { addTourToFav, removeTourFromFav } from '../../modules/user';

import './style.css';


class TourItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
    };
    this.componentDidMount = () => {
      const { id } = this.props.tour;
      const { favProducts } = this.props.user;
      this.setState({ view: favProducts.includes(id) ? 'bold' : 'normal' });
    };
    this.toggleTourOfFavList = ({ target }) => {
      const idTour = target.getAttribute('data-id');
      const { addTourToFav, removeTourFromFav } = this.props;
      const { view } = this.state;
      this.setState({ view: view === 'normal' ? 'bold' : 'normal' });
      view === 'normal' ? addTourToFav(idTour) : removeTourFromFav(idTour);
    };
  }

  render() {
    // eslint-disable-next-line object-curly-newline
    const { id, img, name, price } = this.props.tour;
    return (
        <>
        <div className = "tour-item" data-id = {id}>
            <img src = { img } alt = "icon"/>
            <i
            className = "far fa-heart item-heart"
            style = {{ fontWeight: this.state.view }}
            data-id = {id}
            onClick = {this.toggleTourOfFavList}
            ></i>
            <h5 className = "tour-title">{ name }</h5>
            <h4 className = "tour-price">{ price }$</h4>
        </div>
        </>
    );
  }
}

export default connect(state => ({
  user: getUser(state),
}), { addTourToFav, removeTourFromFav })(TourItem);
