import React from 'react';
import {
  Row, Col, FormGroup,
} from 'reactstrap';
import { translateWrapper, LocalizationComponent } from 'ter-localization';
import PropTypes from 'prop-types';
import Table from '../../../../../components/SimulationTable/Table';
import apis from '../../../../../apis/viewSimulation/projected-FS-by-table';


function arrayInsertAt(destArray, pos, arrayToInsert) {
  let args = [];
  args.push(pos); // where to insert
  args.push(0); // nothing to remove
  args = args.concat(arrayToInsert); // add on array to insert
  destArray.splice(...args); // splice it in
  return destArray;
}

class BL extends LocalizationComponent {
  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {
      columns: [
        {
          Header: '',
          accessor: 'header',
          width: '50%',
        },
      ],
      data:
       [
         {
           header: t('Sales'),
           color: '#cfe2f3ff',
           key: 'sales',
         },
         {
           header: t('Cost of Goods Sold'),
           margin: 10,
           key: 'costOfGoodsSold',
         },
         {
           header: t('Gross Profit'),
           key: 'grossProfit',
         },
         {
           header: t('SGA'),
           margin: 20,
           key: 'sga',
         },
         {
           header: t('Salary'),
           margin: 20,
           key: 'salary',
         },
         {
           header: t('Rent'),
           margin: 20,
           key: 'rent',
         },
         {
           header: t('Depreciation'),
           margin: 20,
           key: 'deprecation',
         },
         {
           header: t('Other Expenses'),
           margin: 20,
           key: 'otherExpenses',
         },


         {
           header: t('Operating Profit'),
           color: '#cfe2f3ff',
           key: 'operatingProfit',
         },
         {
           header: t('Interest'),
           key: 'interest',
         },
         {
           header: t('Profit before tax'),
           color: '#cfe2f3ff',
           key: 'profitBeforeTax',
         },
         {
           header: t('Corporate Tax'),
           key: 'corporateTax',
         },
         {
           header: t('Net Profit'),
           color: '#cfe2f3ff',
           key: 'netProfit',
         },
       ],
    };
    this.setColumns = this.setColumns.bind(this);
  }

  async componentDidMount() {
    this.setColumns();
    try {
      const {
        t, company: { simulation: { id } },
      } = this.props;
      const { data: rootData } = this.state;
      const result = await apis.PL(id);
      const { data } = result;
      const newData = [];
      if (data && data.biggestExpenses) {
        data.biggestExpenses.map((b) => {
          newData.push({
            header: t(b.expense.name),
            key: b.expense.name,
            margin: 20,
          });
          data[b.expense.name] = b.periods;
          return b;
        });
      }
      this.setState({ dataAPI: data, data: arrayInsertAt(rootData, 6, newData) });
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
    const { t, company, jsUcfirst } = this.props;
    const simulation = company && company.simulation;
    return (
      <div className="form-wizard-content">
        <Row>
          <Col xl={12}>
            <FormGroup>
              <Table
                simulation={simulation}
                header={`${t(`${jsUcfirst(company && company.displayAmountType)}`)} ${t(company && company.currencyCode)}`}
                className="main-card mb-3"
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

export default translateWrapper('input-past-data')(BL);

BL.propTypes = {
  t: PropTypes.func,
};

BL.defaultProps = {
  t: null,
};
