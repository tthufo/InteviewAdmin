import React, { Component } from 'react';
import {
  Row, Col, Card, CardBody, CardHeader,
} from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import Table1 from './table1';

class WorkingCapital extends Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      data1: [
        {
          header: t('Biggest expenses 1'),
          key: 'periods',
        },
        {
          header: t('Sales Ratio'),
          key: 'salesRatio',
          symbol: '%',
        },
      ],
      data2: [
        {
          header: t('Biggest expenses 2'),
          key: 'software',
        },
        {
          header: t('Sales Ratio'),
          key: 'salesRatio',
          symbol: '%',
        },
      ],
      data3: [
        {
          header: t('Biggest expenses 3'),
          key: 'software',
        },
        {
          header: t('Sales Ratio'),
          key: 'salesRatio',
          symbol: '%',
        },
      ],
      data4: [
        {
          header: t('Other Expenses'),
          key: 'periods',
        },
        {
          header: t('Sales Ratio'),
          key: 'salesRatio',
          symbol: '%',
        },
      ],
    };
    this.parseDataAPI = this.parseDataAPI.bind(this);
  }

  parseDataAPI(item) {
    const { t, simulation } = this.props;
    const newData = [];
    const key = item.expense && item.expense.name;
    newData.push({
      header: key,
      key,
    });
    newData.push({
      header: t('Sales Ratio'),
      key: 'salesRatio',
      symbol: '%',
    });
    const newDataAPI = { salesRatio: item.salesRatio };
    newDataAPI[key] = item.periods;
    return {
      newData,
      newDataAPI,
    };
  }

  addDataAPI(item) {
    const { t, simulation } = this.props;
    const newData = [];
    let newState = fromJS(item);
    newState = newState.toJS();
    newState.expense = { id: 1, name: t('Other Expense') };
    newData.push(newState);
    return newData;
  }

  render() {
    const {
      t, simulation, dataAPI, company,
    } = this.props;
    const {
      data1, data2, data3, data4,
    } = this.state;
    const empty = [data1, data2, data3];
    const startYear = simulation && simulation.startYear;
    return (
      <Card style={{ marginTop: 30 }}>
        <CardHeader>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
            <div>
              {t('Other Expenses')}
            </div>
            <div>
              <a style={{ textDecoration: 'underline' }} href={`#/users/simulation-setting/${simulation.id}/edit/3`}>{t('Edit')}</a>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xl={12}>
              {
                dataAPI && dataAPI.otherExpenses && dataAPI.otherExpenses.biggestExpenses
                  ? dataAPI.otherExpenses.biggestExpenses.map((item) => {
                    const { newData, newDataAPI } = this.parseDataAPI(item);
                    return (
                      <Table1
                        header={newData && newData[0] && newData[0].header}
                        startYear={startYear}
                        dataAPI={newDataAPI}
                        simulation={simulation}
                        data={newData}
                        company={company}
                      />
                    );
                  })
                  : empty.map(item => (
                    <Table1
                      header={item[0].header}
                      startYear={startYear}
                      dataAPI={dataAPI && dataAPI.otherExpenses && dataAPI.otherExpenses.biggestExpenses}
                      simulation={simulation}
                      data={item}
                      company={company}
                    />
                  ))
              }
              {
                dataAPI && dataAPI.otherExpenses && dataAPI.otherExpenses.otherExpense
                  ? this.addDataAPI(dataAPI.otherExpenses.otherExpense).map((item) => {
                    const { newData, newDataAPI } = this.parseDataAPI(item);
                    return (
                      <Table1
                        header={t('Other Expenses')}
                        startYear={startYear}
                        dataAPI={newDataAPI}
                        simulation={simulation}
                        data={newData}
                        company={company}
                      />
                    );
                  })
                  : (
                    <Table1
                      header={t('Other Expenses')}
                      startYear={startYear}
                      dataAPI={dataAPI && dataAPI.otherExpenses && dataAPI.otherExpenses.otherExpense}
                      simulation={simulation}
                      data={data4}
                      company={company}
                    />
                  )
              }

            </Col>
          </Row>
          <Card>
            <CardBody>
              <p>{dataAPI && dataAPI.otherExpenses && dataAPI.otherExpenses.note}</p>
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
