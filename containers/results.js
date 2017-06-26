import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { getPoll } from '../actions/index';
import PollChart from '../components/pollChart';

class Results extends Component {
  componentWillMount() {
    const id = this.props.match.params.id;

    this.props.getPoll(id);
  }

  render() {
    if (this.props.poll) {
      const responses = this.props.poll.poll.responses;
      const keys = Object.keys(responses);
      const title = this.props.poll.poll.title;

      return (
        <div className='results'>
          <div className='results-title'>{ title }</div>
          <div className='results-container'>
            <PollChart
              keys={ keys }
              responses={ responses } />
            <div className='result-list'>
              { keys.map( (key) => {
                return (
                  <div key={ key }>
                    { `${ key }: ${ responses[key] }` }
                  </div>
                )
              }) }
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='title'>
        Loading
      </div>
    )
  }
}

Results.propTypes = {
  poll: PropTypes.object,
  getPoll: PropTypes.func.isRequired
}

function mapStateToProps({ poll }) {
  return ({ poll });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPoll }, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Results)
)
