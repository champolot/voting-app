import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { userLogin, userLogout, mapLocalStore } from '../actions/index';
import authLocalStore from '../utilities/authLocalStore';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    if (this.props.user) {
      const currentPath = this.props.location.pathname;

      this.props.userLogout();

      switch (currentPath) {
        case "/mypolls":
        case "/create":
          this.props.history.push('/logout');
          break;
        default:
          break;
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      authLocalStore(nextProps.user.username, this.props.mapLocalStore);
    }
  }

  render() {
    return (
      <div className='header'>
        <div className='title'>thekholm80 Voting App</div>
        <div className='userArea'>
          { this.props.user
            ? (<div className='login'
              onClick={ this.handleLogin }>
              Logout
            </div>)
            : (<a href='https://thekholm80-voting.herokuapp.com/auth/github'>
              <div className='login'>Login</div>
            </a>) }
          <div className='user'>
            { this.props.user
                ? "Welcome, " + this.props.user.username
                : 'You are not logged in' }
          </div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  user: PropTypes.object,
  userLogin: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
  mapLocalStore: PropTypes.func.isRequired
}

function mapStateToProps({ user }) {
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ userLogin, userLogout, mapLocalStore }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);
