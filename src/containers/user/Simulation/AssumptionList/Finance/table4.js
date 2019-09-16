import React, { Component } from 'react';
import {
  Row, Col, FormGroup,
} from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import PropTypes from 'prop-types';
import Table from '../../../../../components/SimulationTable/Table';


class Table4 extends Component {
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
          header: t('Interest'),
          key: 'interest',
        },
        {
          header: t('Weighted-average coupon'),
          key: 'weightedAverageCoupon',
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
      t, dataAPI, simulation, company,
    } = this.props;
    return (
      <Row>
        <Col xl={12}>
          <FormGroup>
            <Table
              headers={[t('How much is the equity ratio changing?')]}
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

export default translateWrapper('input-past-data')(Table4);

Table4.propTypes = {
  t: PropTypes.func,
  startYear: PropTypes.number,
};

Table4.defaultProps = {
  t: null,
  startYear: null,
};
