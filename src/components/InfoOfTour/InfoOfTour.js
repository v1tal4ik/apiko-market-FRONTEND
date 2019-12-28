import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getTours } from '../../modules/tours/selectors';
import { getUser } from '../../modules/user/selectors';
import { getUserById, updateUserFavList } from '../../api';

import { addTourToFav, removeTourFromFav } from '../../modules/user';
import './style.css';


class InfoOfTour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tourInfo: {
        name: '',
        price: '',
        img: 'https://res.cloudinary.com/v1tal4ik-cloud/image/upload/v1577205096/vxpyrzxeuqsn862nfiuj.png',
        location: '',
        extraInfo: {
          date: '',
          description: '',
          sellerId: '',
        },
        isFavourite: '',
      },
      sellerInfo: {
        fullName: '',
        img: 'https://res.cloudinary.com/v1tal4ik-cloud/image/upload/v1577205096/vxpyrzxeuqsn862nfiuj.png',
        phone: '',
        email: '',
      },
      isFavourite: '',
    };
    this.isTourFavourite = id => (this.props.user.favProducts.includes(id));
    this.componentDidMount = async () => {
      const tourId = this.props.match.params.id.split('').splice(1).join('');
      const { arrOfItem } = this.props;
      let userId;

      // set Tour information with id
      arrOfItem.forEach((element) => {
        if (tourId === element.id) {
          userId = element.extraInfo.sellerId;
          this.setState({ tourInfo: element });
        }
      });

      // is tour favourite
      const isFavourite = this.isTourFavourite(tourId);
      this.setState({ isFavourite });

      // get and set info about seller
      const { status, user } = await getUserById(userId);
      if (status) {
        // eslint-disable-next-line object-curly-newline
        const { fullName, img, phone, email } = user;
        this.setState({
          sellerInfo: {
            fullName,
            img,
            phone,
            email,
          },
        });
      }
    };
    this.toggleTourOfFavList = () => {
      const { id } = this.state.tourInfo;
      const { addTourToFav, removeTourFromFav } = this.props;
      const { isFavourite } = this.state;
      isFavourite ? removeTourFromFav(id) : addTourToFav(id);
      this.setState({ isFavourite: !isFavourite });
    };
    this.componentWillUnmount = async () => {
      const { id, favProducts } = this.props.user;
      await updateUserFavList({ id, favProducts });
    };
  }

  render() {
    // eslint-disable-next-line object-curly-newline
    const { name, price, img, location, extraInfo: { description, date } } = this.state.tourInfo;
    // eslint-disable-next-line object-curly-newline
    const { fullName, phone, email, img: sellerImg } = this.state.sellerInfo;
    const { isFavourite } = this.state;
    return (
      <div className = 'tour-details-container'>
        <div className = 'tour-details-block'>
          <img
          src = {img}
          className = 'tour-details-img'
          alt = "tour"
          />
          <span className = 'tour-details-price'>{price} $</span>
          <div className = 'tour-details-title-block'>
            <h4 className = 'tour-details-name'>{name}</h4>
            <span className = 'tour-details-date' >{moment(+date).fromNow()}</span>
            <p>
            <i className = 'fas fa-map-marker-alt map-icon'></i>
              {location}
            </p>
          </div>
            <p className = 'tour-details-description'> {description}</p>
        </div>
        <div className = 'tour-details-seller-block'>
          <img
            src = {sellerImg}
            className = 'tour-details-seller-img'
            alt = "seller"
          />
          <h4 className = 'tour-details-seller-fullName'>{fullName}</h4>
          <span className = 'tour-details-seller-email' >{email}</span>
          <span className = 'tour-details-seller-phone' >{phone}</span>
          <button className = 'tour-details-btn' >chat with seller</button>
          <button className = 'tour-details-btn' onClick = {this.toggleTourOfFavList}>
          {isFavourite ? 'delete from favourite' : 'add to favourite'}
          </button>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  user: getUser(state),
  arrOfItem: getTours(state),
}), { addTourToFav, removeTourFromFav })(InfoOfTour);
