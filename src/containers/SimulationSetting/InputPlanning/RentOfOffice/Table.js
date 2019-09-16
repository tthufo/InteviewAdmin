import React from 'react';
import {
  FormGroup, Label, Row, Col,
} from 'reactstrap';
import PropTypes from 'prop-types';
import EditableTable from '../../../../components/Table/EditableTable';

class Table extends React.PureComponent {
  render() {
    const {
      condition, data, defaultPageSize, columns, t, handleChange, company,
    } = this.props;
    const duration = localStorage.getItem('duration');
    return (
      <FormGroup>
        <Label for="exampleEmail55"><b>{t(`${duration} years`)}</b></Label>
        <Row>
          <Col xl={9}>
            <p>{t('Description')}</p>
          </Col>
          <Col xl={3} align="right">
            <h6>{company.currencyCode}</h6>
          </Col>
        </Row>
        <EditableTable
          columns={columns || []}
          data={data || []}
          className=""
          defaultPageSize={defaultPageSize}
          condition={index => condition(index)}
          handleChange={handleChange}
        />
      </FormGroup>
    );
  }
}

export default Table;
Table.propTypes = {
  condition: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  defaultPageSize: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
};
