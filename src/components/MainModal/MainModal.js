import React, { Component } from 'react';
import Rodal from 'rodal';
import { connect } from 'react-redux';
import { resetMainMessage } from '../../modules/mainMessage/actions';
import { getMainMessage, getMainMessageVisible } from '../../modules/mainMessage/selectors';
import 'rodal/lib/rodal.css';
import './style.css';


class MainModal extends Component {
  constructor(props) {
    super();
    this.closeModal = () => {
      const { resetMainMessage } = this.props;
      resetMainMessage();
    };
  }

  render() {
    const { visible, mainMessage } = this.props;
    const w = 300;
    const h = 100;
    return (
      <Rodal visible = {visible} animation = {'rotate'} duration = {500} wigth = {w} height = {h} onClose = {this.closeModal} >
          <div className = 'tour-market-modal-error'>{mainMessage}</div>
      </Rodal>
    );
  }
}

export default connect(state => ({
  mainMessage: getMainMessage(state),
  visible: getMainMessageVisible(state),
}), { resetMainMessage })(MainModal);
