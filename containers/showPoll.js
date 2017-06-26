import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { getPoll } from '../actions/index';
import PollDetails from '../containers/pollDetails';

class ShowPoll extends Component {
  componentWillMount() {
    const id = this.props.match.params.id;

    this.props.getPoll(id);
  }

  render() {
    const id = this.props.match.params.id;

    return (
      <div>
        { this.props.poll
              ? (this.props.poll._id === id)
                    && <PollDetails poll={ this.props.poll }/>
              : <div className='title'>Loading</div> }
      </div>
    )
  }
}

ShowPoll.propTypes = {
  poll: PropTypes.object,
  getPoll: PropTypes.func.isRequired
}

function mapStateToProps({ poll }) {
  return { poll };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPoll }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShowPoll)
);
