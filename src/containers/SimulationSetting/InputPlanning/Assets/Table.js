import React from 'react';
import {
  Row, Col, FormGroup, Label,
} from 'reactstrap';
import PropTypes from 'prop-types';
import EditableTable from '../../../../components/Table/EditableTable';

class Table extends React.Component { //eslint-disable-line
  render() {
    const {
      header, year, description, columns, data, handleOpenModal, t, company, handleChange,
    } = this.props;
    return (
      <React.Fragment>
        <div>
          <h6><b>{header}</b></h6>
        </div>
        <Row>
          <Col xl={12}>
            <Label>
              <b>
                {year}
                {' '}
                {t('years')}
              </b>
            </Label>
            <Row>
              <Col xl={10}>
                <h6>{description}</h6>
              </Col>
              <Col xl={2} align="right">
                <h6>{company.currencyCode}</h6>
              </Col>
            </Row>
          </Col>
          <Col xl={12}>
            <FormGroup>
              <EditableTable
                columns={columns}
                data={data}
                className=""
                defaultPageSize={(data && data.length) || 0}
                condition={index => [0, 1, 2].includes(index)}
                handleOpenModal={handleOpenModal}
                handleChange={handleChange}
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
  year: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
