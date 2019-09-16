import React from 'react';
import PropTypes from 'prop-types';
import {
  Col, FormGroup,
} from 'reactstrap';
import EditableTable from '../../../../components/Table/EditableTable';

class Table extends React.PureComponent {
  render() {
    const {
      columns, data, condition, handleChange, t,
    } = this.props;
    return (
      <Col xl={12}>
        <FormGroup>
          <EditableTable
            columns={columns}
            data={data}
            className=""
            defaultPageSize={4}
            condition={condition}
            t={t}
            handleChange={handleChange}
          />
        </FormGroup>
      </Col>
    );
  }
}

export default Table;
Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  condition: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};
