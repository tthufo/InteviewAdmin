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
          header: t('Cash Balance'),
          key: 'cashBalance',
        },
        {
          header: t('Operating Cash Flow'),
          key: 'operatingCashFlow',
        },
        {
          header: t('Net Cash Flow'),
          key: 'netCashFlow',
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
      jsUcfirst,
      company,
    } = this.props;
    return (
      <Card style={{ marginTop: 30 }}>
        <CardHeader>
          {t('Annual C/F Key indicator')}
        </CardHeader>
        <CardBody>
          <Row>
            <Col xl={12}>
              <FormGroup>
                <Table
                  header={`${t(`${jsUcfirst(company && company.displayAmountType)}`)} ${t(company && company.currencyCode)}`}
                  columns={columns}
                  data={data}
                  dataAPI={keyIndicator && keyIndicator.annualCf}
                  normalCurrency
                  {...this.props}
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
  startYear: PropTypes.number,
};

BS.defaultProps = {
  t: null,
  startYear: null,
};
