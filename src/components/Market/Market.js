import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../modules/user/reducer';
import { test } from '../../api/index';
import './style.css';


class Market extends Component {
  constructor(props) {
    super();

  }

  test = async () => {
      console.log('work');
      test();
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
