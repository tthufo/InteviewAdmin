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
          width: '50%',
        },
      ],
      data: [
        {
          header: t('Receivables Turnover Period'),
          key: 'receivablesTurnoverPeriod',
        }, {
          header: t('Inventory Turnover Period'),
          key: 'inventoryTurnoverPeriod',
        }, {
          header: t('Payables turnover period'),
          key: 'payablesTurnoverPeriod',
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
      t, dataAPI, simulation,
    } = this.props;
    return (
      <Row>
        <Col xl={12}>
          <FormGroup>
            <Table
              headers={[t('Are there any room for improvement on the CCC, such as accounts receivable collection term, inventory amount, accounts payable payment term?'),
                t('Shorten trade receivables turnover period / squeeze inventory / extend payment period')]}
              columns={columns}
              data={data}
              dataAPI={dataAPI}
              simulation={simulation}
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
