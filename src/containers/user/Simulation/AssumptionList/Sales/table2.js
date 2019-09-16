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
          header: t('Ratio of Cost of goods sold'),
          key: 'costOfGoodsSoldRatio',
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
      t, dataAPI, simulation,
    } = this.props;
    return (
      <Row>
        <Col xl={12}>
          <FormGroup>
            <Table
              headers={[
                t('Is it possible to reduce the cost of sales ratio?'),
                t('On the other hand, is there any possibility that costs will rise due to soaring raw materials and labor costs depending on the market environment?'),
              ]}
              footers={[
                t('Is there a possibility that sales and gross profit margins will decline due to the entry and growth of competitive services?'),
                '',
                t('Are there any costs linked to sales? Is the cost separately estimated in the cost plan?'),
              ]}
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
