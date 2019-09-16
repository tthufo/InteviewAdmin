/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

function addCommas(nStr) {
  if (nStr === undefined || nStr === '') return '';
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

const ErrorMessage = ({
  message, forceValidate, edited,
}) => {
  if (!forceValidate || edited) {
    return null;
  }

  if (message) {
    return <p style={{ color: 'red', marginBottom: 0 }}>{message}</p>;
  }

  return null;
};

const check = (index) => {
  const options = [
    { range: [3, 4, 5, 6], target: 2 },
    { range: [8, 9, 10], target: 7 },
    { range: [13, 14, 15], target: 12 },
    { range: [17], target: 16 },
    { range: [21, 22, 23], target: 20 },
  ];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < options.length; i++) {
    if (options[i].range.includes(index)) {
      return options[i];
    }
  }
  return { range: [], target: -1 };
};

const clear = value => (value === undefined || value === 0 || isNaN(value) ? '' : value);

class EditableRow extends React.PureComponent {
  // eslint-disable-next-line class-methods-use-this
  constructor(props) {
    super(props);
    this.default = '';
  }

  componentDidMount() {
    const {
      cellInfo, data,
    } = this.props;
    this.default = (data && cellInfo && cellInfo.index
    && data[cellInfo.index] && data[cellInfo.index][cellInfo.column.id]) || '';
  }

  // eslint-disable-next-line class-methods-use-this
  handleChangeData1(val, cellInfo, data, index, handleChangeInput) {
    const newData = [...data];
    const key = [cellInfo.column.id];
    newData[cellInfo.index][key] = val;
    let temp = 0;
    const rank = check(index);
    if (rank.length !== 0) {
      for (let i = 0; i < rank.range.length; i += 1) {
        temp += Number(newData[rank.range[i]][key] === undefined
          ? 0 : newData[rank.range[i]][key]);
      }
    }
    if (rank.target >= 0) {
      newData[rank.target][key] = clear(temp);

      newData[1][key] = clear(Number(newData[2][key] === undefined
        ? 0 : newData[2][key]) + Number(newData[7][key] === undefined
        ? 0 : newData[7][key]));

      newData[11][key] = clear(Number(newData[12][key] === undefined
        ? 0 : newData[12][key]) + Number(newData[16][key] === undefined
        ? 0 : newData[16][key]));

      newData[24][key] = clear(Number(newData[20][key] === undefined
        ? 0 : newData[20][key]) + Number(newData[11][key] === undefined
        ? 0 : newData[11][key]));

      newData[0][key] = (newData[1][key] !== '' || newData[11][key] !== '' || newData[24][key] !== '') ? Number(newData[1][cellInfo.column.id] === undefined
        ? 0 : newData[1][key]) - Number(newData[24][key] === undefined
        ? 0 : newData[24][key]) : clear(Number(newData[1][key] === undefined
        ? 0 : newData[1][key]) - Number(newData[24][key] === undefined
        ? 0 : newData[24][key]));
    }

    if (newData[17][key] === '' || Number(newData[17][key]) === 0) {
      newData[18][key] = '';
      newData[19][key] = '';
    }

    handleChangeInput(newData);
  }

  render() {
    const {
      cellInfo, data, forceValidate,
      handleChangeInput, condition,
    } = this.props;
    const { index } = cellInfo;
    const {
      symbol, limit, error, normal,
    } = data[index];
    const changeData = data[index][cellInfo.column.id];
    const validLimit = limit === undefined ? 12 : limit;
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {
          condition && condition(index)
            ? (
              <div
                style={{ width: '100%', flexDirection: 'row', position: 'relative' }}
              >
                <NumberFormat
                  style={{ width: '100%', textAlign: 'right', paddingRight: symbol ? 28 : 15 }}
                  value={changeData}
                  disabled={!!((index === 18 || index === 19) && (data[17][cellInfo.column.id] === undefined || data[17][cellInfo.column.id] === '' || Number(data[17][cellInfo.column.id]) === 0))}
                  thousandSeparator={normal !== undefined ? normal : true}
                  decimalScale={normal !== undefined ? 0 : 2}
                  allowNegative={limit === undefined}
                  onPaste={(e) => {
                    e.persist();
                    setTimeout(() => {
                      let text = e.target.value.replace(',', '');
                      if (text.includes('.') && text.split('.')[0].length > validLimit) {
                        text = text.substring(0, validLimit);
                        this.default = text;
                        this.handleChangeData1(text, cellInfo, data, index, handleChangeInput, validLimit);
                      }
                    }, 1);
                  }
                  }
                  onValueChange={(values) => {
                    const { value } = values;
                    let text = value;
                    if (!text.includes('.') && text.length > validLimit + ((text.includes('.') || text.includes('-')) ? 1 : 0)) {
                      text = text.substring(0, validLimit + (text.includes('-') ? 1 : 0));
                    }
                    this.default = text;
                    this.handleChangeData1(text, cellInfo, data, index, handleChangeInput, validLimit);
                  }}
                  onKeyDown={(evt) => {
                    // eslint-disable-next-line no-unused-expressions
                    (!this.default.includes('.') ? this.default.length >= validLimit + (this.default.includes('-') ? 1 : 0) && evt.keyCode !== 8 && evt.keyCode !== 37 && evt.keyCode !== 39 && evt.key !== '.' && evt.key !== '-' && evt.preventDefault()
                      : this.default.split('.')[0].length >= validLimit + (this.default.includes('-') ? 1 : 0) && evt.target.selectionStart <= (validLimit + (limit ? 0 : 3) + (this.default.includes('-') ? 1 : 0)) ? evt.keyCode !== 8 && evt.keyCode !== 37 && evt.keyCode !== 39 && evt.preventDefault()
                        : this.default.length >= (validLimit + 3 + (this.default.includes('-') ? 1 : 0)) && evt.keyCode !== 8 && evt.keyCode !== 37 && evt.keyCode !== 39 && evt.preventDefault());
                  }}
                />
                {symbol
                && (
                <div style={{
                  position: 'absolute',
                  height: 20,
                  width: 20,
                  top: 3,
                  right: 5,
                }}
                >
                  {symbol}
                </div>
                )}
                { (data[17][cellInfo.column.id] && (data[17][cellInfo.column.id] !== '' && Number(data[17][cellInfo.column.id]) !== 0))
                && (
                <ErrorMessage
                  message={error !== undefined ? error : ''}
                  // eslint-disable-next-line no-nested-ternary
                  edited={cellInfo.index === 18 ? changeData && changeData !== '' && Number(changeData) > 0
                    : cellInfo.index === 19 ? changeData && (changeData !== '') : false}
                  forceValidate={forceValidate}
                />
                )
              }
              </div>
            )
            : (
              <p
                style={{
                  width: '100%',
                  wordBreak: 'break-word',
                  margin: 'auto 15px',
                  textAlign: 'right',
                }}
              >
                {addCommas(Number(data[cellInfo.index][cellInfo.column.id]).toFixed(2))}
              </p>
            )
        }
      </div>
    );
  }
}

export default EditableRow;
EditableRow.propTypes = {
  cellInfo: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  condition: PropTypes.func.isRequired,
};
