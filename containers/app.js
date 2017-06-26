import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Header from '../containers/header';
import Home from '../containers/home';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='app'>
          <div  className='display-container'>
            <div className='nav'>
              { this.props.user
                && (<Link to='/mypolls'>
                  <div className='nav-button'>My Polls</div>
                </Link>) }
              { this.props.user
                && (<Link to='/create'>
                  <div className='nav-button'>Create</div>
                </Link>) }
              <Link to='/'>
                <div className='nav-button'>Home</div>
              </Link>
            </div>
            <Home />
          </div>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  user: PropTypes.object
}

function mapStateToProps({ user }) {
  return { user };
}

export default withRouter(
  connect(mapStateToProps)(App)
);
