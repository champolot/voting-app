import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class LogoutScreen extends Component {
  componentDidMount() {
    window.setTimeout( () => {
      this.props.history.push('/');
    }, 2500);
  }

  render() {
    return (
      <div className='fourOhFour'>
        <div>You have logged out</div>
        <div>You are being returned home</div>
      </div>
    )
  }
}

export default withRouter(LogoutScreen);
