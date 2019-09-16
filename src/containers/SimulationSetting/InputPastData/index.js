import React from 'react';
import * as _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { translateWrapper, LocalizationComponent } from 'ter-localization';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Row, Col,
  FormGroup, Button,
} from 'reactstrap';
import API from '../../../apis';
import Table from './Table';
import AlertModal from './Modal.alert';

// eslint-disable-next-line react/prop-types
const Alert = ({ t }) => (
  <div>
    <text style={{ fontStyle: 'italic', color: 'red' }}>
      {t('alert_1')}
      <br />
      {t('alert_2')}
    </text>
  </div>
);

const range = () => {
  const options = [
    { range: [3, 4, 5, 6], target: 2 },
    { range: [8, 9, 10], target: 7 },
    { range: [13, 14, 15], target: 12 },
    { range: [17], target: 16 },
    { range: [21, 22, 23], target: 20 },
  ];
  return options;
};

const clear = value => (value === 0 ? '' : value);

class BS extends LocalizationComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        Header: '',
        accessor: 'header',
        eidtable: false,
        sortable: false,
        resizable: true,
        getProps: (state, rowInfo) => ({
          style: {
            'border-bottom': '1px solid #E9ECEF',
          },
        }),
      },
    ];

    const { t, companyInfo: { startYear } } = this.props;

    this.state = {
      error: false,
      startYear: '',
      forceValidate: false,
      data: [
        {
          header: t('Balance Check'),
          color: '#cfe2f3ff',
          [startYear - 1]: '',
        },
        {
          header: t('Assets'),
          color: '#cfe2f3ff',
          [startYear - 1]: '',
        },
        {
          header: t('Current Assets'),
          color: '#cfe2f3ff',
          margin: 10,
          [startYear - 1]: '',
        },
        {
          header: t('Cash and Cash Equivalent'),
          margin: 20,
          key: 'cash_and_cash_equivalents',
          in: 'cashAndCashEquivalents',
          color: '#DEE7ED',
          [startYear - 1]: '',
        },
        {
          header: t('Trade and Other Receivable'),
          margin: 20,
          key: 'trade_and_other_receivable',
          in: 'tradeAndOtherReceivable',
          color: '#DEE7ED',
          [startYear - 1]: '',
        },
        {
          header: t('Inventories'),
          margin: 20,
          key: 'inventories',
          in: 'inventories',
          color: '#DEE7ED',
          [startYear - 1]: '',
        },
        {
          header: t('Other Current Assets'),
          margin: 20,
          key: 'other_current_assets',
          in: 'otherCurrentAssets',
          color: '#DEE7ED',
          [startYear - 1]: '',
        },
        {
          header: t('Fixed Assets'),
          color: '#cfe2f3ff',
          margin: 10,
          [startYear - 1]: '',
        },
        {
          header: t('Property, Plant and Equipment or Tangible Assets'),
          margin: 20,
          key: 'property_plan_and_equipment_tangible_assets',
          in: 'propertyPlanAndEquipmentTangibleAssets',
          color: '#DEE7ED',
          [startYear - 1]: '',
        },
        {
          header: t('Intangible Assets'),
          margin: 20,
          key: 'intangible_assets',
          in: 'intangibleAssets',
          color: '#DEE7ED',
          [startYear - 1]: '',
        },
        {
          header: t('Other Assets'),
          margin: 20,
          key: 'other_assets',
          in: 'otherAssets',
          color: '#DEE7ED',
          [startYear - 1]: '',
        },
        {
          header: t('Liabilities'),
          color: '#cfe2f3ff',
          [startYear - 1]: '',
        },
        {
          header: t('Current Liabilities'),
          color: '#cfe2f3ff',
          margin: 10,
          [startYear - 1]: '',
        },
        {
          header: t('Accounts Payable'),
          margin: 20,
          key: 'accounts_payable',
          in: 'accountsPayable',
          color: '#DEE7ED',
          [startYear - 1]: '',
        },
        {
          header: t('Short-term Loan'),
          margin: 20,
          key: 'short_term_loan',
          in: 'shortTermLoan',
          color: '#DEE7ED',
          [startYear - 1]: '',
        },
        {
          header: t('Other Current Liabilities'),
          margin: 20,
          key: 'other_current_liabilities',
          in: 'otherCurrentLiabilities',
          color: '#DEE7ED',
          [startYear - 1]: '',
        },
        {
          header: t('None-Current Liabilities'),
          color: '#cfe2f3ff',
          margin: 10,
          [startYear - 1]: '',
        },
        {
          header: t('Long-term Loan'),
          margin: 20,
          key: 'long_term_loan',
          in: 'longTermLoan',
          color: '#DEE7ED',
          [startYear - 1]: '',
        },
        {
          header: t('Repayment Period of the long-term loan'),
          margin: 30,
          key: 'repayment_period_of_long_term_loan',
          in: 'repaymentPeriodOfLongTermLoan',
          color: '#DEE7ED',
          limit: 2,
          normal: false,
          error: t('Period can not be empty'),
          [startYear - 1]: '',
        },
        {
          header: t('Interest Rate'),
          margin: 30,
          key: 'interest_rate',
          in: 'interestRate',
          color: '#DEE7ED',
          symbol: '%',
          limit: 3,
          error: t('Percentage can not be empty'),
          [startYear - 1]: '',
        },
        {
          header: t('Net Assets'),
          color: '#cfe2f3ff',
          [startYear - 1]: '',
        },
        {
          header: t('Share Capital'),
          margin: 10,
          key: 'share_capital',
          in: 'shareCapital',
          color: '#DEE7ED',
          [startYear - 1]: '',
        },
        {
          header: t('Capital Reserve'),
          margin: 10,
          key: 'capital_reserve',
          in: 'capitalReserve',
          color: '#DEE7ED',
          [startYear - 1]: '',
        },
        {
          header: t('Retained Earnings'),
          margin: 10,
          key: 'retained_earnings',
          in: 'retainedEarnings',
          color: '#DEE7ED',
          [startYear - 1]: '',
        },
        {
          header: t('Liabilities and Net Assets'),
          color: '#cfe2f3ff',
          [startYear - 1]: '',
        },
      ],
    };

    this.createInputPastData = this.createInputPastData.bind(this);
    this.createInputPastDataDebounce = _.debounce(this.createInputPastData, 500);
  }

  componentDidMount() {
    const {
      match, companyInfo: { startYear }, simulationInfo: { id },
    } = this.props;
    this.columns.push(
      {
        Header: startYear - 1,
        accessor: `${startYear - 1}`,
        eidtable: true,
        formula: true,
        sortable: false,
        resizable: true,
        minWidth: 250,
        maxWidth: 250,
        getProps: (state, rowInfo) => ({
          style: {
            backgroundColor: rowInfo && rowInfo.original && rowInfo.original.color,
            'border-bottom': '1px solid #E9ECEF',
          },
        }),
      },
    );
    this.setState({
      startYear,
    }, () => {
      if (match.params && match.params.id) {
        this.getInputPastData(match.params.id);
      } else if (id) {
        this.getInputPastData(id);
      }
    });
  }

  async getInputPastData(id) {
    try {
      const inputData = await API.pastData.getPastData(id);
      this.dataTable(inputData.data);
    } catch (error) {
      console.log(error);
    }
  }

  dataTable(input) {
    const { data, startYear } = this.state;
    const header = startYear - 1;
    const newData = [...this.state.data];
    for (let i = 0; i < data.length; i += 1) {
      if (newData[i].in !== undefined) {
        newData[i][startYear - 1] = i === 18 ? input[data[i].in].split('.')[0] : input[data[i].in];
      }
    }

    // eslint-disable-next-line no-plusplus
    for (let k = 0; k < range().length; k++) {
      let temp = 0;
      for (let i = 0; i < range()[k].range.length; i += 1) {
        temp += Number(newData[range()[k].range[i]][header] === undefined
          ? 0 : newData[range()[k].range[i]][header]);
      }
      newData[range()[k].target][header] = temp;

      newData[1][header] = Number(newData[2][header] === undefined
        ? 0 : newData[2][header]) + Number(newData[7][header] === undefined
        ? 0 : newData[7][header]);

      newData[11][header] = Number(newData[12][header] === undefined
        ? 0 : newData[12][header]) + Number(newData[16][header] === undefined
        ? 0 : newData[16][header]);

      newData[24][header] = Number(newData[20][header] === undefined
        ? 0 : newData[20][header]) + Number(newData[11][header] === undefined
        ? 0 : newData[11][header]);

      newData[0][header] = (newData[1][header] !== '' || newData[11][header] !== '' || newData[24][header] !== '') ? Number(newData[1][header] === undefined
        ? 0 : newData[1][header]) - Number(newData[24][header] === undefined
        ? 0 : newData[24][header]) : clear(Number(newData[1][header] === undefined
        ? 0 : newData[1][header]) - Number(newData[24][header] === undefined
        ? 0 : newData[24][header]));
    }
    const check = (newData[0][header] === undefined || newData[0][header] === 0 || newData[0][header] === '');

    this.setState({ data: newData, error: !check });
  }

  async createInputPastData() {
    this.setState({ forceValidate: true });
    const { companyInfo: { startYear } } = this.props;
    const { data } = this.state;
    const keyProps = `${startYear - 1}`;
    if ((data[17][keyProps] !== ''
    && (data[18][keyProps] !== '' && Number(data[18][keyProps]) > 0
    && data[19][keyProps] !== '')) || Number(data[17][keyProps]) === 0 || data[17][keyProps] === '' || data[17][keyProps] === undefined) {
      const { next } = this.props;
      const { simulationInfo: { id } } = this.props;
      const post = {};
      for (let i = 0; i < 25; i += 1) {
        if ('key' in data[i]) {
          post[data[i].key] = (data[i][keyProps] === undefined || data[i][keyProps] === '') ? '0' : data[i][keyProps];
          if (i === 19) {
            if (Number(post[data[17].key]) === 0) {
              post[data[18].key] = '5';
              post[data[19].key] = '0';
            }
          }
        }
      }

      try {
        await API.pastData.createPastData(id, post);
        next();
      } catch (error) {
        this.alertModal.openModal({ message: error.response.data.detail });
      }
    }
  }

  render() {
    const {
      t, previous, companyInfo,
    } = this.props;
    const {
      error, data,
      startYear, forceValidate,
    } = this.state;
    return (
      <React.Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div className="form-wizard-content">
            <Row>
              <Col xl={12}>
                <FormGroup>
                  { startYear !== ''
              && (
              <Table
                company={companyInfo}
                header={t('header')}
                columns={this.columns}
                data={data}
                forceValidate={forceValidate}
                handleChange={(re) => {
                  const check = (re[0][startYear - 1] === undefined || re[0][startYear - 1] === 0 || re[0][startYear - 1] === '');
                  this.setState({ error: !check });
                }}
              />
              )}
                </FormGroup>
              </Col>
            </Row>
            { error
              ? <Alert t={t} /> : null }
            <div style={{ marginTop: 20 }} className="clearfix">
              <div>
                <Button
                  style={{ color: '#f49100', backgroundColor: '#ffffff', border: '1px #f49100' }}
                  className="btn-shadow btn-wide float-left btn-hover-shine"
                  onClick={() => previous()}
                >
                  {t('Back')}
                </Button>
                <Button
                  style={{ backgroundColor: '#f49100', border: '0px transparent' }}
                  className="btn-wide btn-shadow float-right btn-hover-shine"
                  onClick={this.createInputPastDataDebounce}
                >
                  {t('Next')}
                </Button>
              </div>
            </div>
            <AlertModal
              t={t}
              onRef={(modal) => { this.alertModal = modal; }}
            />
          </div>
        </ReactCSSTransitionGroup>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    simulationInfo: state.companyInfo.get('simulation').toJS(),
    companyInfo: state.companyInfo.get('company').toJS(),
  };
}

export default compose(
  translateWrapper('input-past-data'),
  connect(mapStateToProps),
)(BS);


BS.propTypes = {
  t: PropTypes.func,
};

BS.defaultProps = {
  t: null,
};
