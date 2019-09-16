import React from 'react';
import {
  Row, Col, FormGroup,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { translateWrapper } from 'ter-localization';
import EditableTable from './EditableTable';

const jsUcfirst = string => string && string.charAt(0).toUpperCase() + string.slice(1);
class Table extends React.Component { //eslint-disable-line
  render() {
    const {
      data, handleChange, t, normalCurrency,
      headers, footers, header1, company,
    } = this.props;
    const header = company && `${company.displayAmountType === 'normal' ? '' : (normalCurrency ? '' : t(`${jsUcfirst(company.displayAmountType)}`))} ${company && company.currencyCode}`;
    return (
      <React.Fragment>
        <Row>
          <Col>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                {headers && headers.map((h, index) => <h6 style={{ color: index % 2 === 0 && '#1D3B6C' }}>{h}</h6>)}
              </div>
              <div>
                {header && !header1 && (
                <h6 style={{ alignSelf: 'flex-end', textAlign: 'right', verticalAlign: 'bottom' }}>
                  {header}
                </h6>
                )}
              </div>
            </div>
          </Col>
        </Row>
        {header1 && (
        <Row>
          <Col>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <h6 style={{ fontWeight: 'bold', textAlign: 'left' }}>
                {header1}
              </h6>
              <div>
                {header && (
                <h6 style={{ alignSelf: 'flex-end', textAlign: 'right', verticalAlign: 'bottom' }}>
                  {header}
                </h6>
                )}
              </div>
            </div>
          </Col>
        </Row>
        )}
        <Row>
          <Col xl={12}>
            <FormGroup>
              <EditableTable
                {...this.props}
                defaultPageSize={data.length}
                className=""
                handleChange={re => handleChange(re)}
                normalCurrency={normalCurrency}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            {footers && footers.map((f, index) => <h6 style={{ color: index % 2 === 0 && '#1D3B6C' }}>{f}</h6>)}
          </Col>
        </Row>
        <Row />
      </React.Fragment>
    );
  }
}

export default translateWrapper('simulation-table')(Table);

Table.propTypes = {
  header: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};
