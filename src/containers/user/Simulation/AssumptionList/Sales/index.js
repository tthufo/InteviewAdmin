import React, { PureComponent } from 'react';
import {
  Row, Col, Card, CardBody, CardHeader,
} from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import PropTypes from 'prop-types';
import Table1 from './table1';
import Table2 from './table2';

class WorkingCapital extends PureComponent {
  render() {
    const {
      t, simulation, dataAPI, company,
    } = this.props;
    const startYear = simulation && simulation.startYear;
    return (
      <Card style={{ marginTop: 30 }}>
        <CardHeader>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
            <div>
              {t('Sales')}
            </div>
            <div>
              <a style={{ textDecoration: 'underline' }} href={`#/users/simulation-setting/${simulation.id}/edit/0`}>{t('Edit')}</a>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xl={12}>
              <Table1
                company={company}
                startYear={startYear}
                dataAPI={dataAPI && dataAPI.sales}
                simulation={simulation}
              />
              <Table2
                company={company}
                startYear={startYear}
                dataAPI={dataAPI && dataAPI.sales}
                simulation={simulation}
              />
              <Card>
                <CardBody>
                  <p>
                    {
                    dataAPI && dataAPI.sales && dataAPI.sales.note
                    }
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default translateWrapper('input-past-data')(WorkingCapital);

WorkingCapital.propTypes = {
  t: PropTypes.func,
  startYear: PropTypes.number,
};

WorkingCapital.defaultProps = {
  t: null,
  startYear: null,
};
