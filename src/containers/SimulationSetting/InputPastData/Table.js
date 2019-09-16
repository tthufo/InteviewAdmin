import React from 'react';
import {
  Row, Col, FormGroup, Label,
} from 'reactstrap';
import PropTypes from 'prop-types';
import EditableTable from '../../../components/Table/EditableTable';

// eslint-disable-next-line no-sparse-arrays
const condition = index => [3, 4, 5, 6, , 8, 9, 10, 13,
  14, 15, 17, 18, 19, 21, 22, 23].includes(index);

class Table extends React.Component { //eslint-disable-line
  render() {
    const {
      header, columns, data,
      handleChange, company, forceValidate,
    } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col xl={10}>
            <Label style={{ marginBottom: 20 }}><h6>{header}</h6></Label>
          </Col>
          <Col xl={2} align="right">
            <h6>{company && company.currencyCode}</h6>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <FormGroup>
              <EditableTable
                forceValidate={forceValidate}
                columns={columns}
                data={data}
                defaultPageSize={data.length}
                className=""
                condition={condition}
                handleChange={re => handleChange(re)}
              />
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Table;
Table.propTypes = {
  header: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
};
