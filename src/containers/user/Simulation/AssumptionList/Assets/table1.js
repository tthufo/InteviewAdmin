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
    this.state = {
      columns: [
        {
          Header: '',
          width: '50%',
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
        width: `${width}%`,
      });
    }
    this.setState({
      columns: newState,
    });
  }

  render() {
    const { columns } = this.state;
    const {
      t, dataAPI, data, simulation, company,
    } = this.props;
    return (
      <Row>
        <Col xl={12}>
          <FormGroup>
            <Table
              headers={[
                t('What is your view on capital investment in each year?'),
                t('1) New investment: Investment for new business'),
                '',
                t('2) Rationalized investment: Investment aimed at improving productivity to improve future profitability'),
                '',
                t('3) Renewal investment: minimum investment required to maintain the current business'),
              ]}
              header1={t('Property, Plant and Equipment or Tangible Assets')}
              columns={columns}
              data={data}
              simulation={simulation}
              dataAPI={dataAPI}
              company={company}
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
