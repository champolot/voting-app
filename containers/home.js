import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouter, { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import AllPolls from '../containers/allPolls';
import ShowPoll from '../containers/showPoll';
import Results from '../containers/results';
import Create from '../containers/create';
import LogoutScreen from '../components/logout';
import MyPolls from '../containers/myPolls';
import FourOhFour from '../components/fourOhFour';
import Success from '../containers/success';

import { mapLocalStore } from '../actions/index';
import setInitialStore from '../utilities/setInitialStore';
import authLocalStore from '../utilities/authLocalStore';

class Home extends Component {
  constructor(props) {
    super(props);

    this.unauthLocalStore = this.unauthLocalStore.bind(this);
  }

  unauthLocalStore() {
    const storeName = 'thekholm80VotingApp';

    if (localStorage.getItem(storeName)) {
      this.props.mapLocalStore(JSON.parse(localStorage.getItem(storeName)));
    } else {
      const store = setInitialStore();

      this.props.mapLocalStore(store);
    }
  }

  componentWillMount() {
    const history = null;
    const user = this.props.user;

    if (user) {
      authLocalStore(user, this.props.mapLocalStore);
    } else {
      this.unauthLocalStore();
    }
  }

  render() {
    return (
      <div className='home'>
        <div className='home-title'>Click, Vote, Share!</div>
        <Switch>
          <Route exact path='/' component={ AllPolls } />
          <Route path='/success/:userID' component={ Success } />
          <Route path='/poll/:id' component={ ShowPoll } />
          <Route path='/results/:id' component={ Results } />
          <Route path='/create' component={ Create } />
          <Route path='/logout' component={ LogoutScreen } />
          <Route path='/mypolls' component={ MyPolls } />
          <Route component={ FourOhFour } />
        </Switch>
      </div>
    );
  }
}

Home.propTypes = {
  user: PropTypes.object,
  mapLocalStore: PropTypes.func.isRequired
}

function mapStateToProps({ user }) {
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ mapLocalStore }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
