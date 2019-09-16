import React, { Component } from 'react';
import { Row, Col, FormGroup } from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import PropTypes from 'prop-types';
import Table from '../../../../../components/SimulationTable/Table';
import apis from '../../../../../apis/viewSimulation/projected-FS-by-table';

class BS extends Component {
  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {
      dataAPI: {},
      columns: [
        {
          Header: '',
          width: '50%',
        },
      ],
      data: [
        {
          header: t('Assets'),
          color: '#cfe2f3ff',
          key: 'asset',
        },
        {
          header: t('Current Assets'),
          margin: 10,
          key: 'currentAsset',
        },
        {
          header: t('Cash and Cash Equivalent'),
          margin: 20,
          key: 'cashAndCashEquivalents',
        },
        {
          header: t('Trade and Other Receivable'),
          margin: 20,
          key: 'tradeAndOtherReceivable',
        },
        {
          header: t('Inventories'),
          margin: 20,
          key: 'inventories',
        },
        {
          header: t('Other Current Assets'),
          margin: 20,
          key: 'otherCurrentAsset',
        },
        {
          header: t('Fixed Assets'),
          margin: 10,
          key: 'fixedAsset',
        },
        {
          header: t('Property, Plant and Equipment or Tangible Assets'),
          margin: 20,
          key: 'tangibleAsset',
        },
        {
          header: t('Intangible Assets'),
          margin: 20,
          key: 'intangibleAsset',
        },
        {
          header: t('Other Assets'),
          margin: 20,
          key: 'otherAssets',
        },
        {
          header: t('Liabilities'),
          color: '#cfe2f3ff',
          key: 'liability',
        },
        {
          header: t('Current Liabilities'),
          key: 'currentLiability',
          margin: 10,
        },
        {
          header: t('Accounts Payable'),
          margin: 20,
          key: 'accountPayable',
        },
        {
          header: t('Short-term Loan'),
          margin: 20,
          key: 'shortTermLoan',
        },
        {
          header: t('Other Current Liabilities'),
          margin: 20,
          key: 'otherCurrentLiabilities',
        },
        {
          header: t('None-Current Liabilities'),
          margin: 10,
          key: 'nonCurrentLiabilities',
        },
        {
          header: t('Long-term Loan'),
          margin: 20,
          key: 'longTermLoan',
        },
        {
          header: t('Net Assets'),
          color: '#cfe2f3ff',
          key: 'netAsset',
        },
        {
          header: t('Share Capital'),
          margin: 10,
          key: 'shareCapital',
        },
        {
          header: t('Capital Reserve'),
          margin: 10,
          key: 'capitalReserve',
        },
        {
          header: t('Retained Earnings'),
          margin: 10,
          key: 'retainedEarnings',
        },
        {
          header: t('Liabilities and Net Assets'),
          color: '#cfe2f3ff',
          key: 'liabilityAndNetAsset',
        },
      ],
    };
    this.setColumns = this.setColumns.bind(this);
  }


  async componentDidMount() {
    const { company } = this.props;
    const { columns } = this.state;
    this.setColumns();
    try {
      const id = company.simulation.id;
      const result = await apis.BS(id);
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
    const { data, columns, dataAPI } = this.state;
    const { company } = this.props;
    const simulation = company && company.simulation;
    return (
      <div className="form-wizard-content">
        <Row>
          <Col xl={12}>
            <FormGroup>
              <Table
                simulation={simulation}
                columns={columns}
                data={data}
                dataAPI={dataAPI}
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
