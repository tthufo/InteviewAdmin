import React, { Component } from 'react';
import {
  Row, Col, FormGroup,
} from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import PropTypes from 'prop-types';
import Table from '../../../../../components/SimulationTable/Table';


class WorkingCapital extends Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      columns: [
        {
          Header: '',
          width: '25%',
        },
        {
          firstHeader: '',
          width: '25%',
        },
      ],
      data: [
        {
          firstHeader: ' ',
          header: t('Sales'),
          key: 'sales',
        },
        {
          firstHeader: t('Job Grade 1'),
          header: t('Total number of employee'),
          key: 'job_grade_1',
          bottom: 'white',
        },
        {
          firstHeader: '',
          header: t('Unit Monthly salary'),
          key: 'unit_monthly_salary_1',
        },
        {
          firstHeader: t('Job Grade 2'),
          header: t('Total number of employee'),
          key: 'job_grade_2',
          bottom: 'white',
        },
        {
          firstHeader: '',
          header: t('Unit Monthly salary'),
          key: 'unit_monthly_salary_2',
        },
        {
          firstHeader: t('Job Grade 3'),
          header: t('Total number of employee'),
          key: 'job_grade_3',
          bottom: 'white',
        },
        {
          firstHeader: '',
          header: t('Unit Monthly salary'),
          key: 'unit_monthly_salary_3',
        },
        {
          firstHeader: '',
          header: t('Total Salary'),
          key: 'totalSalary',
        },
        {
          firstHeader: '',
          header: t('HR Ratio'),
          key: 'hrRatio',
          symbol: '%',
        },
      ],
    };
    this.setColumns = this.setColumns.bind(this);
  }

  async componentDidMount() {
    this.setColumns();
  }

  setColumns() {
    const { simulation } = this.props;
    const { duration, startYear } = simulation;
    const width = (100 - 50) / duration;
    const { columns: newState } = this.state;
    for (let i = 0; i < duration; i += 1) {
      newState.push({
        Header: startYear + i,
        width,
      });
    }
    this.setState({
      columns: newState,
    });
  }


  render() {
    const { data, columns } = this.state;
    const {
      t, simulation, dataAPI, company,
    } = this.props;
    return (
      <Row>
        <Col xl={12}>
          <FormGroup>
            <Table
              headers={[t('Do you have a plan to increase staff?'),
                t('Do you have any ideas on how to improve productivity in light of the change in labor cost ratio relative to sales?'), '', t('Is the pace and average salary for each class sufficient?')]}
              headerLeft={t('Thounsand JPY')}
              columns={columns}
              data={data}
              dataAPI={dataAPI}
              simulation={simulation}
              company={company}
              normalCurrency
            />
          </FormGroup>
        </Col>
      </Row>
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
