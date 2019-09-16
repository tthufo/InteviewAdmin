import React, { Component } from 'react';
import {
  Row, Col, Card, CardBody, CardHeader,
} from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import PropTypes from 'prop-types';
import Table1 from './table1';


class WorkingCapital extends Component { //eslint-disable-line
  render() {
    const {
      t, simulation, dataAPI, company,
    } = this.props;
    const startYear = simulation && simulation.startYear;
    const newDataApi = {
      sales: dataAPI && dataAPI.sales && dataAPI.sales.sales,
    };
    if (dataAPI && dataAPI.salaries && dataAPI.salaries.jobGrades) {
      dataAPI.salaries.jobGrades.map((item, index) => {
        newDataApi[`job_grade_${index + 1}`] = item.numberOfEmployees;
        newDataApi[`unit_monthly_salary_${index + 1}`] = item.numberOfEmployees.map((number) => {
          const newNumber = { ...number };
          newNumber.value *= Number(item.amount);
          return newNumber;
        });
        return item;
      });
      newDataApi.totalSalary = dataAPI.salaries.totalSalary;
      newDataApi.note = dataAPI.salaries.note;
      newDataApi.hrRatio = dataAPI.salaries.hrRatio;
    }
    return (
      <Card style={{ marginTop: 30 }}>
        <CardHeader>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
            <div>
              {t('Human Resources')}
            </div>
            <div>
              <a style={{ textDecoration: 'underline' }} href={`#/users/simulation-setting/${simulation.id}/edit/1`}>{t('Edit')}</a>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xl={12}>
              <Table1
                company={company}
                headers={[t('Do you have a plan to increase staff?'),
                  t('Do you have any ideas on how to improve productivity in light of the change in labor cost ratio relative to sales?'),
                  '',
                  t('Are the raise rate and average salary for each grade sufficient?'),
                ]}
                startYear={startYear}
                dataAPI={newDataApi}
                simulation={simulation}
              />
            </Col>
          </Row>
          <Card>
            <CardBody>
              <p>{newDataApi && newDataApi.note}</p>
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
