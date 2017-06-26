import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { userLogin } from '../actions/index';

class Success extends Component {
  componentWillMount() {
    const userID = this.props.match.params.userID;

    this.props.userLogin(userID);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>Success</div>
    )
  }
}

Success.propTypes = {
  userLogin: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ userLogin }, dispatch);
}

export default withRouter(
  connect(null, mapDispatchToProps)(Success)
);
