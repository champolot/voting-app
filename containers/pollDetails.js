import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { mapLocalStore } from '../actions/index';
import authLocalStore from '../utilities/authLocalStore';

class PollDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pollResponse: null,
      addResponse: false,
      newResponse: ""
    }

    this.handleResponseChange = this.handleResponseChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleNewResponse = this.handleNewResponse.bind(this);
    this.onAddResponse = this.onAddResponse.bind(this);
    this.updateLocalStore = this.updateLocalStore.bind(this);
    this.updateUserHistory = this.updateUserHistory.bind(this);
  }

  handleResponseChange(event) {
    this.setState({ pollResponse: event.target.value });
  }

  updateUserHistory() {
    const id = this.props.poll._id;
    const user = this.props.user.username;
    // const url = `http://localhost:8000/user/vote/${ user }?id=${ id }`;  // development
    const url = `/user/vote/${ user }?id=${ id }`;  // production

    axios.get(url)
         .then( () => {
           authLocalStore(user, this.props.mapLocalStore);
         })
         .catch( (error) => {
           console.warn("Axios error", error);
         });
  }

  updateLocalStore(id) {
    const storeName = 'thekholm80VotingApp';
    let store = [ id, ...JSON.parse(localStorage.getItem(storeName)) ];

    localStorage.setItem(storeName, JSON.stringify(store));
    this.props.mapLocalStore(JSON.parse(localStorage.getItem(storeName)));
  }

  onFormSubmit() {
    if (this.state.pollResponse) {
      const url = '/polls/update';
      const instance = axios.create({
        baseURL: 'https://thekholm80-voting.herokuapp.com/',
        headers: { type: 'application/x-www-form-urlencoded'}
      });
      const postData = {
        "response": this.state.pollResponse,
        "previous": this.props.poll
      }

      instance({
        method: 'post',
        url: '/polls/update',
        data: postData
      }).then( (response) => {
        this.props.history.push(`/results/${ this.props.poll._id }`);
      }).catch( (error) => {
        console.warn("axios post error on submit");
      });

      if (this.props.user) {
        this.updateUserHistory();
      } else {
        this.updateLocalStore(this.props.poll._id);
      }
    }
  }

  handleNewResponse(event) {
    this.setState({
      newResponse: event.target.value,
      pollResponse: event.target.value
    });
  }

  onAddResponse() {
    this.setState({ addResponse: true });
  }

  componentWillMount() {
    const history = this.props.localStore.polls;
    const id = this.props.poll._id;

    for (let i of history) {
      if (i === id) {
        this.props.history.push(`/results/${ id }`);
        break;
      }
    }
  }

  render() {
    const poll = this.props.poll.poll;
    const keys = Object.keys(poll.responses);

    return (
      <div>
        <div className='poll-title'>{ poll.title }</div>
        <div className='poll-details'>
          { keys.map( (key) => {
            return (
              <div key={ key } className='poll-response'>
                <label>
                  <input
                    type='radio'
                    value={ key }
                    checked={ this.state.pollResponse === key }
                    onChange={ this.handleResponseChange } />
                  { key }
                </label>
              </div>
            );
          }) }
        </div>
        <div className='button-container'>
          { (this.state.addResponse && this.props.user)
            && (<input
              type='text'
              maxLength='80'
              onChange={ this.handleNewResponse }
              placeholder="Enter response"
              value={ this.state.newResponse } />) }
        </div>
        <div className='button-container'>
          { (this.props.user && !this.state.addResponse)
            && (<div className='poll-button'
              onClick={ this.onAddResponse }>
              Add Response
            </div>) }
          <div className='poll-button'
            onClick={ this.onFormSubmit }>Vote</div>
        </div>
      </div>
    );
  }
}

PollDetails.propTypes = {
  user: PropTypes.object,
  poll: PropTypes.object.isRequired,
  localStore: PropTypes.object.isRequired,
  mapLocalStore: PropTypes.func.isRequired
}

function mapStateToProps({ user, localStore }) {
  return { user, localStore };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ mapLocalStore }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PollDetails)
);
