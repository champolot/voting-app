import React, { Component } from 'react';
import PropTypes from 'prop-types';

import resultsChart from '../utilities/drawChart';

export default class PollChart extends Component {
  componentDidMount() {
    resultsChart.drawChart(this.props.keys, this.props.responses);
  }

  shouldComponentUpdate(nextProps) {
    const currentResponses = this.props.responses;
    const nextResponses = nextProps.responses;

    for (let i in nextResponses) {
      if (currentResponses[i] !== nextResponses[i]) {
        resultsChart.clearChart();
        resultsChart.drawChart(nextProps.keys, nextResponses);
        return true;
      }
    }

    return false;
  }

  render() {
    return (
      <div className='chart'>
        <canvas id='myChart' width='200' height='200' />
      </div>
    )
  }
}

PollChart.proptypes = {
  keys: PropTypes.array.isRequired,
  responses: PropTypes.object.isRequired
}
