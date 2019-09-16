import React from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';
import PropTypes from 'prop-types';
import EditableRow from './EditableRow';
import UneditableRow from './UneditableRow';
import EditableFormula from './EditableFormula';

class EditableTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderEditable = this.renderEditable.bind(this);
    this.renderNotEditable = this.renderNotEditable.bind(this);
    this.renderEditableFormula = this.renderEditableFormula.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeInputFomula = this.handleChangeInputFomula.bind(this);
  }

  handleChangeInput(e, index, value, ...rest) {
    const { handleChange } = this.props;
    if (handleChange)handleChange(index, value, rest);
  }

  handleChangeInputFomula(e) {
    const { handleChange } = this.props;
    if (handleChange)handleChange(e);
  }

  checkMethod(props) {
    return typeof (props) === 'function';
  }

  renderEditable(cellInfo) {
    const { data } = this.props;
    const { condition, handleOpenModal } = this.props;

    return (
      <EditableRow
        cellInfo={cellInfo}
        data={data}
        handleChangeInput={this.handleChangeInput}
        condition={condition}
        handleOpenModal={handleOpenModal}
      />
    );
  }

  renderEditableFormula(cellInfo) {
    const { data, condition, forceValidate } = this.props;
    return (
      <EditableFormula
        cellInfo={cellInfo}
        data={data}
        forceValidate={forceValidate}
        handleChangeInput={this.handleChangeInputFomula}
        condition={condition}
      />
    );
  }

  renderNotEditable(cellInfo) {
    const { data } = this.props;
    const { handleOpenModal } = this.props;
    return (
      <UneditableRow
        data={data}
        handleOpenModal={handleOpenModal}
        cellInfo={cellInfo}
        checkMethod={this.checkMethod}
      />
    );
  }

  render() {
    const { data } = this.props;
    const {
      columns, defaultPageSize, className, pageSize,
    } = this.props;
    return (
      <ReactTable
        column={{
          ...ReactTableDefaults.column,
          sortable: false,
          resizable: false,
          filterable: false,
        }}
        data={data}
        columns={columns && columns.map((column) => {
          const { formula, eidtable, ...restColum } = column;
          if (formula !== undefined) {
            restColum.Cell = this.renderEditableFormula;
            return restColum;
          }
          if (eidtable) {
            restColum.Cell = this.renderEditable;
          } else {
            restColum.Cell = this.renderNotEditable;
          }
          return restColum;
        })}
        className={className === undefined ? '-striped -highlight' : className}
        defaultPageSize={defaultPageSize}
        showPageJump={false}
        showPagination={false}
        pageSize={pageSize}
      />
    );
  }
}

export default EditableTable;
EditableTable.propTypes = {
  columns: PropTypes.array.isRequired,
  defaultPageSize: PropTypes.number.isRequired,
  condition: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  handleOpenModal: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
};
