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
    const ctx = document.getElementById('CF').getContext('2d');
    window.myBar = new Chart(ctx, {
      type: 'bar',
      data: result,
      options: {
        title: {
          display: true,
          text: t('Serirs of Projected Cash Flow'),
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
      const id = company && company.simulation && company.simulation.id;
      const displayAmountType = company && company.displayAmountType;
      const result = await apis.CF(id);
      const { data } = result;
      const labels = [];
      const keys = [
        [{ key: 'operatingCashFlow', color: '#0099ff' }],
        [{ key: 'investmentCashFlow', color: '#00ccff' }],
        [{ key: 'financialCashFlow', color: '#00ffff' }],
        [{ key: 'netCashFlow', color: '#1e3b6c' }],
      ];
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
        });
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
        <canvas id="CF" />
      </div>
    );
  }
}

export default translateWrapper('CF')(index);
