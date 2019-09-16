import React from 'react';
import PropTypes from 'prop-types';

function addCommas(Str, displayAmountType, normalCurrency) {
  if (Str === undefined) return '';
  let nStr = (Str / (normalCurrency ? 1 : ((displayAmountType === 'million') ? 1000000 : (displayAmountType === 'thousand') ? 1000 : 1))).toFixed(2);
  nStr += '';
  const x = nStr.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? `.${x[1]}` : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

const formatNumber = (num, displayAmountType, normalCurrency) => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(num)) {
    return 'N/A';
  }
  return addCommas(num, displayAmountType, normalCurrency);
};

class EditableTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      dataAPI: props.dataAPI,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dataAPI, data } = this.props;
    if (dataAPI !== nextProps.dataAPI || data !== nextProps.data) {
      this.setState({ dataAPI: nextProps.dataAPI, data: nextProps.data });
    }
  }

  render() {
    const { data, dataAPI } = this.state;
    const {
      columns, simulation, company, normalCurrency,
    } = this.props;
    const displayAmountType = company && company.displayAmountType;
    return (
      <table style={{ width: '100%' }} className="table-bordered">
        <thead>
          <tr style={{ textAlign: 'center', height: 40 }}>
            { columns && columns.map(c => <th width={c.width} scope="col">{c.Header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr style={{
              backgroundColor: d.color, textAlign: 'right', height: 40,
            }}
            >
              {d.firstHeader !== undefined && d.firstHeader !== null && (
              <th style={{ 'border-bottom': d.bottom !== undefined ? '1px solid white' : '', backgroundColor: d.color, textAlign: 'left' }}>
                {d.firstHeader}
              </th>
              )}
              <td style={{ paddingLeft: (d.margin || 0) + 3, textAlign: 'left' }}>{d.header}</td>
              <React.Fragment>
                {
                    simulation
                    && simulation.duration
                    && Array.from({ length: simulation.duration })
                      .map((item, index) => {
                        const rowData = dataAPI && dataAPI[d.key]
                         && Array.from(dataAPI[d.key]).find(each => each.yearDifference === index);
                        return (
                          <td style={{ paddingRight: 3 }}>
                            {rowData
                            && formatNumber((Number(rowData.value) * (d.symbol !== undefined ? 100 : 1)), displayAmountType, normalCurrency) + (d.symbol || '')}
                          </td>
                        );
                      })
                  }
              </React.Fragment>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default EditableTable;
EditableTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  dataAPI: PropTypes.array.isRequired,
  simulation: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
};
