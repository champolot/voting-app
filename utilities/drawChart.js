import Chart from 'chart.js';

const resultsChart = {
  myChart: null,

  drawChart: function (keys, responses) {
    const context = document.getElementById('myChart');
    const dataset = keys.map( (key) => {
      return responses[key];
    });
    const data = {
      datasets: [{
        data: dataset,
        backgroundColor: [
          'rgba(99, 99, 176, 0.4)',
          'rgba(102, 51, 102, 0.4)',
          'rgba(51, 102, 51, 0.4)',
          'rgba(176, 176, 99, 0.4)',
          'rgba(72, 72, 142, 0.4)',
          'rgba(77, 51, 102, 0.4)',
          'rgba(102, 102, 51, 0.4)',
          'rgba(102, 52, 51, 0.4)',
          'rgba(102, 51, 76, 0.4)',
          'rgba(102, 51, 101, 0.4)',
          'rgba(101, 102, 51, 0.4)',
          'rgba(142, 108, 72, 0.4)',
          'rgba(142, 142, 72, 0.4)',
          'rgba(51, 102, 77, 0.4)'
        ],
        borderColor: [
          'rgba(99, 99, 176, 1)',
          'rgba(102, 51, 102, 1)',
          'rgba(51, 102, 51, 1)',
          'rgba(176, 176, 99, 1)',
          'rgba(72, 72, 142, 1)',
          'rgba(77, 51, 102, 1)',
          'rgba(102, 102, 51, 1)',
          'rgba(102, 52, 51, 1)',
          'rgba(102, 51, 76, 1)',
          'rgba(102, 51, 101, 1)',
          'rgba(101, 102, 51, 1)',
          'rgba(142, 108, 72, 1)',
          'rgba(142, 142, 72, 1)',
          'rgba(51, 102, 77, 1)'
        ],
        borderWidth: 1
      }],
      labels: keys
    }
    this.myChart = new Chart(context, {
      type: 'doughnut',
      data
    })
  },

  clearChart: function () {
    this.myChart.destroy();
  }
}

export default resultsChart;
