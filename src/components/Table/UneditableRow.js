import React from 'react';
import './index.css';
import * as _ from 'lodash';
import plus from '../../assets/utils/images/PlusSign.png';

const styles = {
  hoverValue: {
    margin: 'auto 15px auto auto',
  },
  hoverTitle: {
    margin: 'auto 1px',
  },
};

function addCommas(nStr) {
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

class UneditableRow extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {
      cellInfo, data,
    } = this.props;
    const { data: nextData } = nextProps;
    if (`${cellInfo.column.id}_percentage` in data[cellInfo.index]) {
      return data[cellInfo.index][cellInfo.column.id]
       !== nextData[cellInfo.index][cellInfo.column.id]
       || data[cellInfo.index][`${cellInfo.column.id}_percentage`]
       !== nextData[cellInfo.index][`${cellInfo.column.id}_percentage`]
       || data[cellInfo.index][`${cellInfo.column.id}_period`]
       !== nextData[cellInfo.index][`${cellInfo.column.id}_period`];
    }
    return data[cellInfo.index][cellInfo.column.id]
    !== nextData[cellInfo.index][cellInfo.column.id];
  }

  render() {
    const {
      data, handleOpenModal, cellInfo, checkMethod,
    } = this.props;
    const clickAble = cellInfo.column.Header !== '';
    const click = data[cellInfo.index].disableClick === undefined;
    const changeData = data[cellInfo.index][cellInfo.column.id];
    return (
      <div //eslint-disable-line
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: changeData === '' ? 'center' : 'flex-start',
          marginLeft: data[cellInfo.index].margin === undefined ? 0 : data[cellInfo.index].margin,
        }}
        // eslint-disable-next-line no-nested-ternary
        onClick={!clickAble || !click ? null
        // eslint-disable-next-line no-nested-ternary
          : (handleOpenModal !== undefined ? (checkMethod(handleOpenModal)
            ? () => handleOpenModal(data[cellInfo.index],
              cellInfo.column.Header) : handleOpenModal) : null)}
      >
        { (clickAble || click) && changeData === ''
          ? (
            <img
              className="on"
              style={{
                justifySelf: 'center',
                alignSelf: 'center',
                height: 25,
                width: 25,
              }}
              src={plus}
              alt=""
            />
          )
          : (
            <p
              className={(!clickAble || !click) ? '' : 'on'}
              style={!clickAble ? styles.hoverTitle : styles.hoverValue}
            >
              {_.isNaN(changeData) ? addCommas(changeData) : addCommas(changeData)}
            </p>
          )
            }
      </div>
    );
  }
}

export default UneditableRow;
