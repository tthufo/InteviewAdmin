import React from 'react';
import {
  Row, Col, FormGroup,
} from 'reactstrap';
import { translateWrapper, LocalizationComponent } from 'ter-localization';
import PropTypes from 'prop-types';
import Table from '../../../../../components/SimulationTable/Table';
import apis from '../../../../../apis/viewSimulation/projected-FS-by-table';

class BS extends LocalizationComponent {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      dataAPI: {},
      error: false,
      columns: [
        {
          Header: '',
          width: '50%',
        },
      ],

      data: [
        {
          header: t('Net Profit before Income Tax'),
          key: 'profitBeforeTax',
        },
        {
          header: t('Depreciation'),
          key: 'deprecation',
        },
        {
          header: t('Decrease in Accounts Receivable'),
          key: 'decreaseInAccountsReceivable',
        },
        {
          header: t('Decrease in Inventory'),
          key: 'decreaseInInventory',
        },
        {
          header: t('Decrease in Accounts Payable'),
          key: 'decreaseInAccountsPayable',
        },
        {
          header: t('Decrease in Other Current Assets'),
          key: 'decreaseInOtherCurrentAsset',
        },
        {
          header: t('Decrease in Other Current Liability'),
          key: 'decreaseInOtherCurrentLiability',
        },
        {
          header: t('Payment of Corporate Income Tax'),
          key: 'corporateTax',
        },
        {
          header: t('Operating Cash Flow '),
          color: '#cfe2f3ff',
          key: 'operatingCashFlow',
        },
        {
          header: t('Investment in Fixed Asset'),
          key: 'investmentInAsset',
        },
        {
          header: t('Investment in Software'),
          key: 'investmentInSoftware',
        },
        {
          header: t('Investment in Other Asset'),
          key: 'investmentInOtherAsset',
        },
        {
          header: t('Investment Cash Flow'),
          color: '#cfe2f3ff',
          key: 'investmentCashFlow',
        },
        {
          header: t('Long-term Loan'),
          key: 'longTermLoan',
        },
        {
          header: t('Long-term loan Repayment'),
          key: 'longTermLoanRepayment',
        },
        {
          header: t('Short-term loan'),
          key: 'shortTermLoan',
        },
        {
          header: t('Short-term loan Repayment'),
          key: 'shortTermLoanRepayment',
        },
        {
          header: t('Equity Finance'),
          key: 'equityFinance',
        },
        {
          header: t('Financial Cash Flow'),
          color: '#cfe2f3ff',
          key: 'financialCashFlow',
        },
        {
          header: t('Net Cash Flow'),
          color: '#cfe2f3ff',
          key: 'netCashFlow',
        },
        {
          header: t('Cash Balance at the beginning'),
          key: 'cashBalanceAtTheBeginning',
        },
        {
          header: t('Cash Balance at the end'),
          color: '#cfe2f3ff',
          key: 'cashBalanceAtTheEnd',
        },
      ],
    };
    this.setColumns = this.setColumns.bind(this);
  }

  async componentDidMount() {
    const { company, startYear } = this.props;
    const { columns } = this.state;
    const id = company && company.simulation && company.simulation.id;
    this.setColumns();
    try {
      const result = await apis.CF(id);
      const { data } = result;
      this.setState({ dataAPI: data, columns });
    } catch (error) {
      // alert(error);
    }
  }


  setColumns() {
    const { simulation } = this.props;
    const { duration, startYear } = simulation;
    const width = (100 - 50) / duration;
    const { columns: newState } = this.state;
    for (let i = 0; i < duration; i += 1) {
      newState.push({
        Header: startYear + i,
        width: `${width}%`,
      });
    }
    this.setState({
      columns: newState,
    });
  }

  render() {
    const {
      columns, data, dataAPI,
    } = this.state;
    const { t, company, jsUcfirst } = this.props;
    const simulation = company && company.simulation;
    return (
      <div className="form-wizard-content">
        <Row>
          <Col xl={12}>
            <FormGroup>
              <Table
                header={`${t(`${jsUcfirst(company && company.displayAmountType)}`)} ${t(company && company.currencyCode)}`}
                dataAPI={dataAPI}
                columns={columns}
                data={data}
                simulation={simulation}
                {...this.props}
              />
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default translateWrapper('input-past-data')(BS);

BS.propTypes = {
  t: PropTypes.func,
  startYear: PropTypes.number,
};

BS.defaultProps = {
  t: null,
  startYear: null,
};
