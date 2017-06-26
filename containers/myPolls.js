import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import ShareModal from '../components/shareModal';
import DeleteModal from '../components/deleteModal';

class MyPolls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userPolls: [],
      isShareModalOpen: false,
      isDeleteModalOpen: false,
      shareTarget: null,
      deleteTitle: null,
      deleteID: null
    }

    this.getPolls = this.getPolls.bind(this);
    this.toggleShare = this.toggleShare.bind(this);
    this.deletePoll = this.deletePoll.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
  }

  getPolls() {
    const user = this.props.user.username;
    // const url = `http://localhost:8000/polls/user/${ user }`;  // development
    const url = `/polls/user/${ user }`;  // production

    axios.get(url)
         .then( (response) => {
           this.setState({ userPolls: response.data });
         })
         .catch( (error) => {
           console.warn("axios error", error);
         });
  }

  toggleShare(targetID) {
    const open = this.state.isShareModalOpen;
    const target = targetID;

    this.setState({
      isShareModalOpen: !open,
      shareTarget: target
    });
  }

  deletePoll(id) {
    const url = `http://localhost:8000/polls/delete/${ id }`;

    axios.get(url)
         .then( () => {
           this.getPolls();
         })
         .catch( (error) => {
           console.warn("axios error", error);
         });
  }

  toggleDelete(id, title) {
    this.setState({
      isDeleteModalOpen: true,
      deleteTitle: title,
      deleteID: id
    });
  }

  confirmDelete(id) {
    this.deletePoll(id);
    this.setState({
      isDeleteModalOpen: false,
      deleteTitle: null,
      deleteID: null
    });
  }

  cancelDelete() {
    this.setState({
      isDeleteModalOpen: false,
      deleteTitle: null,
      deleteID: null
    });
  }

  componentWillMount() {
    if (!this.props.user) {
      this.props.history.push('/');
    } else {
      this.getPolls();
    }
  }

  render() {
    return (
      <div className='mypolls-container'>
        { this.state.isShareModalOpen
          && (<ShareModal
            url={ this.state.shareTarget }
            close={ () => this.toggleShare(null) } />) }
        { this.state.isDeleteModalOpen
          && (<DeleteModal
            title={ this.state.deleteTitle }
            id={ this.state.deleteID }
            confirm={ this.confirmDelete }
            cancel={ this.cancelDelete } />) }
        { this.state.userPolls.map( (item) => {
          return (
            <div key={ item._id } className='mypoll-list-item'>
              <Link to={ `/results/${ item._id }` }>
                <div className='mypoll-list-link'>
                  { item.poll.title }
                </div>
              </Link>
              <div className='mypoll-button-row'>
                <div
                  className='mypoll-item-button'
                  onClick={ () => this.toggleShare(item._id) }>
                  Share
                </div>
                <div
                  className='mypoll-item-button'
                  onClick={ () => this.toggleDelete(item._id, item.poll.title) }>
                  Delete
                </div>
              </div>
            </div>
          )
        }) }
      </div>
    )
  }
}

MyPolls.propTypes = {
  user: PropTypes.object.isRequired
}

function mapStateToProps({ user }) {
  return { user };
}

export default withRouter(
  connect(mapStateToProps)(MyPolls)
);
