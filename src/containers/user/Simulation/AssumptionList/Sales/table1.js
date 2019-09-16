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
          header: t('Sales'),
          key: 'sales',
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
              headers={[`${t('text1_sale')} ${dataAPI && (Number(dataAPI.cagr) * 100).toFixed(2)}${'%'} ${t('text2_sale')} `,
                t('Is that appropriate in terms of market size and market growth?'), '', t('Are you planning for the product / service life cycle?')]}
              footers={[
                `${t('text3_sale')} ${dataAPI && (Number(dataAPI.cagr) * 100).toFixed(2)}${'%'} ${t('text4_sale')} `,
                t('How can you organize measures for how to develop marketing?')]}
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

export default translateWrapper('input-past-data')(WorkingCapital);

WorkingCapital.propTypes = {
  t: PropTypes.func,
  startYear: PropTypes.number,
};

WorkingCapital.defaultProps = {
  t: null,
  startYear: null,
};
