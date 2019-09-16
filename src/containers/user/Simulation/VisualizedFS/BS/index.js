import React from 'react';
import Chart from 'chart.js';
import { translateWrapper } from 'ter-localization';
import numeral from 'numeral';
import apis from '../../../../../apis/viewSimulation/projected-FS-by-table';
import formatNumber from '../../formatNumber';

class index extends React.Component {
  async componentDidMount() {
    const { t } = this.props;
    const result = await this.get();
    const ctx = document.getElementById('BS').getContext('2d');
    window.myBar = new Chart(ctx, {
      type: 'bar',
      data: result,
      options: {
        title: {
          display: true,
          text: t('Serirs of Projected Balance Sheet'),
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label(tooltipItems, data) {
              return `${data.datasets[tooltipItems.datasetIndex].label
              }: ${numeral(data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index]).format('0,0.[00]')}`;
            },
          },
        },
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true,
          }],
        },
      },
    });
  }

  async get() {
    try {
      const { company, t } = this.props;
      const displayAmountType = company && company.displayAmountType;
      const id = company && company.simulation && company.simulation.id;
      const result = await apis.BS(id);
      const { data } = result;
      const labels = [];
      const keys = [
        [{ key: 'fixedAsset', color: '#2e70a7' }, { key: 'currentAsset', color: '#4eadc7' }],
        [{ key: 'netAsset', color: '#121554' }, { key: 'liability', color: '#1d3681' }]];
      const dataChart = [];
      keys.map((key, i) => {
        key.map((k) => {
          const dataSet = {
            stack: i,
            label: t(k.key),
            backgroundColor: k.color,
            data: data && data[k.key] && data[k.key].map(d => formatNumber(d.value, displayAmountType)),
          };
          dataChart.push(dataSet);
          return k;
        });
        return i;
      });
      for (let i = 0; i < company.simulation.duration; i += 1) {
        labels.push(company.startYear + i);
      }
      return { labels, datasets: dataChart };
    } catch (error) {
      console.log('error', error);
    }
    return null;
  }

  render() {
    const { headerCondition } = this.props;
    return (
      <div>
        <div style={{ textAlign: 'right' }}>{headerCondition}</div>
        <canvas id="BS" />
      </div>
    );
  }
}

export default translateWrapper('BS')(index);
