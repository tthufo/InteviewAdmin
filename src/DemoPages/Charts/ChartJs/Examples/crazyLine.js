import React from 'react';
import { Bar } from 'react-chartjs-2';
import color from 'rcolor';

const initialState = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};


const Graph = React.createClass({
  displayName: 'Graph',
  componentWillMount() {
    this.setState(initialState);
  },
  componentDidMount() {
    const _this = this;

    setInterval(() => {
      const oldDataSet = _this.state.datasets[0];
      const newData = [];

      for (let x = 0; x < _this.state.labels.length; x++) {
        newData.push(Math.floor(Math.random() * 100));
      }

      const newDataSet = {
        ...oldDataSet,
      };

      newDataSet.data = newData;
      newDataSet.backgroundColor = color();
      newDataSet.borderColor = color();
      newDataSet.hoverBackgroundColor = color();
      newDataSet.hoverBorderColor = color();

      const newState = {
        ...initialState,
        datasets: [newDataSet],
      };

      _this.setState(newState);
    }, 5000);
  },
  render() {
    return (
      <Bar data={this.state} />
    );
  },
});


class CrazyDataLineExample extends React.Component {
  render() {
    return (
      <div>
        <Graph />
      </div>
    );
  }
}

export default CrazyDataLineExample;
