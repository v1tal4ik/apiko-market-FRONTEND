import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../modules/user/selectors';
import './style.css';


class Market extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
            <div>
                Market App
                <button onClick={this.test}>test</button>
            </div>
    );
  }
}

export default connect(state => ({
  user: getUser(state),
}), {})(Market);
