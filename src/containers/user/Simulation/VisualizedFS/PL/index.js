import React from 'react';
import Chart from 'chart.js';
import { translateWrapper } from 'ter-localization';
import numeral from 'numeral';
import apis from '../../../../../apis/viewSimulation/projected-FS-by-table';
import formatNumber from '../../formatNumber';

function arrayInsertAt(destArray, pos, arrayToInsert) {
  let args = [];
  args.push(pos); // where to insert
  args.push(0); // nothing to remove
  args = args.concat(arrayToInsert); // add on array to insert
  destArray.splice(...args); // splice it in
  return destArray;
}
class index extends React.Component {
  async componentDidMount() {
    const { t } = this.props;
    const result = await this.get();
    const ctx = document.getElementById('PL').getContext('2d');
    window.myBar = new Chart(ctx, {
      type: 'bar',
      data: result,
      options: {
        title: {
          display: true,
          text: t('Serirs of Projected P/L Income Statement'),
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
      const dataChart = [];
      const { company, t } = this.props;
      const id = company && company.simulation && company.simulation.id;
      const displayAmountType = company && company.displayAmountType;
      const result = await apis.PL(id);
      const { data } = result;
      const labels = [];
      const keys = [
        [{ key: 'sales', color: '#2e70a7' }],
        [{ key: 'costOfGoodsSold', color: '#121554' },
          { key: 'salary', color: 'black' },
          { key: 'rent', color: '#0033cc' },
          { key: 'deprecation', color: '#330066' },
          { key: 'otherExpenses', color: '#6495ED' },
          { key: 'corporateTax', color: '#66ff00' },
          { key: 'netProfit', color: '#121554' },
          { key: 'interest', color: '#33ffff' },
        ]];
      const biggestExpensesColors = ['#006699', '#dcdcdc', '#0066ff'];
      const newkeys = [];
      if (data && data.biggestExpenses) {
        data.biggestExpenses.map((b, i) => {
          data[b.expense.name] = b.periods;
          newkeys.push({ key: b.expense.name, color: biggestExpensesColors[i] });
          return b;
        });
      }
      keys[1] = arrayInsertAt(keys[1], 3, newkeys);
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
        <canvas id="PL" />
      </div>
    );
  }
}

export default translateWrapper('PL')(index);
