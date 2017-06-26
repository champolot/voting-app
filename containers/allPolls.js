import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import { getAllPolls } from '../actions/index';

class AllPolls extends Component {
  componentWillMount() {
    this.props.getAllPolls();
  }

  render() {
    return (
      <div className='poll-list-container'>
        { this.props.allPolls.map( (item) => {
          return (
            <Link
              key={ item._id }
              to={ `/poll/${ item._id }` }>
              <div
                className='poll-list-item'>
                { item.poll.title }
              </div>
            </Link>
          )
        }) }
      </div>
    )
  }
}

AllPolls.propTypes = {
  allPolls: PropTypes.array.isRequired,
  getAllPolls: PropTypes.func.isRequired
}

function mapStateToProps({ allPolls }) {
  return { allPolls };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAllPolls }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllPolls)
);
