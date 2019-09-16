import React from 'react';
import {
  Row, Col, Card, CardBody, CardHeader,
} from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import PropTypes from 'prop-types';
import Table1 from './table1';
import Table2 from './table2';
import Table3 from './table3';
import Table4 from './table4';


class WorkingCapital extends React.PureComponent {
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
              {t('Finance')}
            </div>
            <div>
              <a style={{ textDecoration: 'underline' }} href={`#/users/simulation-setting/${simulation.id}/edit/5`}>{t('Edit')}</a>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xl={12}>
              <Table1
                company={company}
                startYear={startYear}
                simulation={simulation}
                dataAPI={dataAPI && dataAPI.finance}
              />
              <Table4
                company={company}
                startYear={startYear}
                simulation={simulation}
                dataAPI={dataAPI && dataAPI.finance}
              />
              <Table2
                company={company}
                startYear={startYear}
                simulation={simulation}
                dataAPI={dataAPI && dataAPI.finance}
              />
              <Table3
                company={company}
                startYear={startYear}
                simulation={simulation}
                dataAPI={dataAPI && dataAPI.finance}
              />
            </Col>
          </Row>
          <Card>
            <CardBody>
              <p>{dataAPI && dataAPI.finance && dataAPI.finance.note}</p>
            </CardBody>
          </Card>
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
