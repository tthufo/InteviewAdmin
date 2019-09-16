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
          header: t('ROA (Sales)'),
          key: 'sales',
        },
        {
          header: t('SGA'),
          key: 'sga',
        },
        {
          header: t('Operating income'),
          key: 'operatingIncome',
        },
        {
          header: t('Net income'),
          key: 'netIncome',
        },
        {
          header: t('Gross profit margin'),
          key: 'grossProfitMargin',
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
      t,
      simulation,
      keyIndicator,
      company,
      jsUcfirst,
    } = this.props;
    return (
      <Card style={{ marginTop: 30 }}>
        <CardHeader>
          {t('Annual P/L Key indicator')}
        </CardHeader>
        <CardBody>
          <Row>
            <Col xl={12}>
              <FormGroup>
                <Table
                  header={`${t(`${jsUcfirst(company && company.displayAmountType)}`)} ${t(company && company.currencyCode)}`}
                  columns={columns}
                  data={data}
                  dataAPI={keyIndicator && keyIndicator.annualPl}
                  simulation={simulation}
                  {...this.props}
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
  simulation: PropTypes.func,
  keyIndicator: PropTypes.func,
  company: PropTypes.func,
  jsUcfirst: PropTypes.func,
};

BS.defaultProps = {
  t: null,
  simulation: null,
  keyIndicator: null,
  company: null,
  jsUcfirst: null,
};
