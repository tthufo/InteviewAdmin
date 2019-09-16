/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import NumberFormat from 'react-number-format';
import { convertJapanCurrency } from '../../utils/currency';

const getIndex = (header) => {
  if (!header.includes('N')) {
    return header;
  }
  if (header === 'N') {
    return 0;
  }
  return header.substring(1);
};

function addCommas(nStr) {
  if (nStr === undefined) return '';
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

class EditableRow extends React.Component {
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

  shouldComponentUpdate(nextProps) {
    const {
      cellInfo, data, condition,
    } = this.props;
    const { data: nextData, condition: nextCondition } = nextProps;
    const check = data[cellInfo.index][cellInfo.column.id]
    !== nextData[cellInfo.index][cellInfo.column.id];

    if (check === false) {
      const { index } = cellInfo;
      return !isEqual(nextCondition(index), condition(index));
    }

    return check;
  }

  render() {
    const {
      cellInfo, data, handleChangeInput, condition,
    } = this.props;
    const { index } = cellInfo;
    const {
      limit,
    } = data[index];
    const validLimit = limit === undefined ? 12 : limit;
    const changeData = data[index][cellInfo.column.id];
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
              <NumberFormat
                style={{ width: '100%', textAlign: 'right', paddingRight: 15 }}
                value={changeData}
                thousandSeparator
                decimalScale={2}
                allowNegative={false}
                onValueChange={(values) => {
                  const { value } = values;
                  let text = value;
                  if (!text.includes('.') && text.length > validLimit + (text.includes('.') ? 1 : 0)) {
                    text = text.substring(0, validLimit);
                  }
                  this.default = text;
                  handleChangeInput(null,
                    getIndex(cellInfo.column.id), text, cellInfo.index);
                }}
                onKeyDown={(evt) => {
                  // eslint-disable-next-line no-unused-expressions
                  (!this.default.includes('.') ? this.default.length >= validLimit + (this.default.includes('-') ? 1 : 0) && evt.keyCode !== 8 && evt.keyCode !== 37 && evt.keyCode !== 39 && evt.key !== '.' && evt.preventDefault()
                    : this.default.split('.')[0].length >= validLimit + (this.default.includes('-') ? 1 : 0) && evt.target.selectionStart <= (validLimit + (limit ? 0 : 3) + (this.default.includes('-') ? 1 : 0)) ? evt.keyCode !== 8 && evt.keyCode !== 37 && evt.keyCode !== 39 && evt.preventDefault()
                      : this.default.length >= (validLimit + 3 + (this.default.includes('-') ? 1 : 0)) && evt.keyCode !== 8 && evt.keyCode !== 37 && evt.keyCode !== 39 && evt.preventDefault());
                }}
              />
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
