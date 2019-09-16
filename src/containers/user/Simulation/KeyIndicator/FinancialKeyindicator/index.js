import React, { Component } from 'react';
import {
  Row, Col, FormGroup, Card, CardBody, CardHeader,
} from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import PropTypes from 'prop-types';
import Table from '../../../../../components/SimulationTable/Table';

class BS extends Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      columns: [
        {
          Header: '',
          width: '50%',
        },
      ],
      data: [
        {
          header: t('ROA (Return On Assets)'),
          key: 'roa',
          color: '#cfe2f3ff',
          symbol: '%',
        },
        {
          header: t('Operating Profit Margin'),
          key: 'operatingProfitMargin',
          symbol: '%',
        },
        {
          header: t('Gross Profit Margin'),
          key: 'grossProfitMargin',
          symbol: '%',
        },
        {
          header: t('SGA Ratio'),
          key: 'sgaRatio',
          symbol: '%',
        },
        {
          header: t('HR Ratio'),
          key: 'hrRatio',
          symbol: '%',
        },
        {
          header: t('Net Asset Turnover'),
          key: 'netAssetTurnover',
        },
        {
          header: t('Cash Turnover'),
          key: 'cashTurnover',
        },
        {
          header: t('Receivable Turnover'),
          key: 'receivableTurnover',
        },
        {
          header: t('Inventory Turnover'),
          key: 'inventoryTurnover',
        },
        {
          header: t('Fixed Assets Turnover'),
          key: 'fixedAssetsTurnover',
        },
        {
          header: t('CCC ( Cash Conversion Cycle)'),
          color: '#cfe2f3ff',
          key: 'ccc',
        },
        {
          header: t('Receivables Turnover Period'),
          key: 'receivablesTurnoverPeriod',
        },
        {
          header: t('Inventory Turnover Period'),
          key: 'inventoryTurnoverPeriod',
        },
        {
          header: t('Payables Turnover Period'),
          key: 'payablesTurnoverPeriod',
        },
        {
          header: t('Gross Burn Rate'),
          key: 'grossBurnRate',
        },
        {
          header: t('Net Burn Rate'),
          key: 'netBurnRate',
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
      t,
      keyIndicator,
      simulation,
      company,
    } = this.props;
    return (
      <Card style={{ marginTop: 30 }}>
        <CardHeader>
          {t('Financial  Key indicator')}
        </CardHeader>
        <CardBody>
          <Row>
            <Col xl={12}>
              <FormGroup>
                <Table
                  company={company}
                  columns={columns}
                  data={data}
                  dataAPI={keyIndicator && keyIndicator.financial}
                  simulation={simulation}
                  normalCurrency
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>

    );
  }
}

export default translateWrapper('input-past-data')(BS);

BS.propTypes = {
  t: PropTypes.func,
  keyIndicator: PropTypes.func,
  simulation: PropTypes.func,
  company: PropTypes.object,
};

BS.defaultProps = {
  t: null,
  keyIndicator: null,
  simulation: null,
  company: null,
};
