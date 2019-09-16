import React from 'react';
import {
  Row, Col,
  FormGroup, Label, Button,
} from 'reactstrap';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { translateWrapper } from 'ter-localization';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import TextArea from '../../../../components/TextArea';
import Table from './Table';
import { setColumns, setData } from './data';
import API from '../../../../apis/index';
import CompanyWrapper from '../../../../components/CompanyWrapper';

const MAX_DURATION = 5;

const condition = index => [0, 2].includes(index);

class RentOfOffice extends React.PureComponent { //eslint-disable-line

  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {
      monthly_fees: [],
      furniture_investments: [],
      note: '',
      data: setData(t),
    };
    this.duration = localStorage.getItem('duration');
    const { companyInfo: { startYear } } = this.props;
    this.columns = setColumns(this.duration, startYear);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.createRentOffice = this.createRentOffice.bind(this);
    this.createRentOfficeDebounce = _.debounce(this.createRentOffice, 500);
    this.handleAutoCalculate = this.handleAutoCalculate.bind(this);
  }

  componentDidMount() {
    const duration = localStorage.getItem('duration');
    const { match, companyInfo: { startYear }, simulationInfo: { id } } = this.props;
    const monthly_fees = [];
    const furniture_investments = [];
    if (duration !== null) {
      for (let i = 0; i < MAX_DURATION; i += 1) {
        monthly_fees.push({
          year_different: i,
          value: 0,
        });
        furniture_investments.push({
          year_different: i,
          value: 0,
        });
      }
      const { data } = this.state;
      const newData = data.map((item) => {
        const newItem = { ...item };
        for (let j = 0; j < MAX_DURATION; j += 1) {
          newItem[`${startYear + j}`] = '';
        }
        return newItem;
      });
      this.setState({
        monthly_fees,
        furniture_investments,
        data: newData,
      }, () => {
        if (match.params && match.params.id) {
          this.getRentOfficeData(match.params.id);
        } else if (id) {
          this.getRentOfficeData(id);
        }
      });
    }
  }

  async getRentOfficeData(id) {
    try {
      const { companyInfo: { startYear } } = this.props;
      const { data } = this.state;
      const result = await API.rent.getRentOffice({ id });
      const rentData = result.data && result.data.inputValue[0];

      const monthly_fees = [];
      for (let i = 0; i < MAX_DURATION; i += 1) {
        monthly_fees.push({
          year_different: i,
          value: (rentData.monthlyRentFee[i] && rentData.monthlyRentFee[i].value) || 0,
        });
      }

      const furnitureInvestments = [];
      for (let i = 0; i < MAX_DURATION; i += 1) {
        furnitureInvestments.push({
          year_different: i,
          value: (rentData.furnitureInvestments && rentData.furnitureInvestments[i] && rentData.furnitureInvestments[i].value) || 0,
        });
      }

      this.setState({
        monthly_fees,
        furniture_investments: furnitureInvestments,
        note: rentData.note,
      },
      () => {
        const dataClone = data.map(a => ({ ...a }));

        for (let j = 0; j < MAX_DURATION; j += 1) {
          dataClone[0][`${startYear + j}`] = (rentData.monthlyRentFee[j] && rentData.monthlyRentFee[j].value) || '';
          dataClone[1][`${startYear + j}`] = Number((rentData.monthlyRentFee[j] && rentData.monthlyRentFee[j].value) || 0) * 12 === 0 ? '' : Number((rentData.monthlyRentFee[j] && rentData.monthlyRentFee[j].value) || 0) * 12;
          dataClone[2][`${startYear + j}`] = (rentData.furnitureInvestments[j] && rentData.furnitureInvestments[j].value) || '';
        }

        this.setState({
          data: dataClone,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createRentOffice() {
    try {
      const { note, monthly_fees, furniture_investments } = this.state;
      const { nextTab, tabKey } = this.props;
      const { simulationInfo: { id } } = this.props;

      const data = await API.rent.postRentOffice({
        monthly_fees,
        furniture_investments,
        note,
        id,
      });
      if (data.isSuccess === false) {
        this.setState({
          errors: data.invalidParams, //eslint-disable-line
        });
      } else {
        this.resetState(() => {
          nextTab(tabKey);
        });
      }
    } catch (error) {
      const { response } = error;
      if (response && response.data
         && response.data.invalidParams
         && response.data.invalidParams.length > 0) {
        this.setState({
          errors: response.data.invalidParams, //eslint-disable-line
        });
      }
    }
  }

  resetState(callback) {
    this.setState({
      monthly_fees: [],
      furniture_investments: [],
      note: '',
    }, () => {
      callback();
    });
  }

  handleChangeNote(value) {
    this.setState({
      note: value,
    });
  }

  handleTableChange(index, value, ...rest) {
    const id = rest[0][0];
    const { companyInfo: { startYear } } = this.props;
    const { data: numGoods } = this.state;
    let newState = fromJS(numGoods);
    newState = newState.toJS();
    newState[id][index] = value;

    if (id === 0) {
      const { monthly_fees: fees } = this.state;
      let newFees = fromJS(fees);
      newFees = newFees.toJS();
      newFees[index - startYear].value = value === '' ? 0 : value;
      this.setState({
        monthly_fees: newFees,
      });
    } else if (id === 2) {
      const { furniture_investments: furniture } = this.state;
      let newFurniture = fromJS(furniture);
      newFurniture = newFurniture.toJS();
      newFurniture[index - startYear].value = value === '' ? 0 : value;
      this.setState({
        furniture_investments: newFurniture,
      });
    }

    this.setState({ data: newState }, () => this.handleAutoCalculate(index, id, value));
  }

  handleAutoCalculate(columnIndex, rowIndex, value) {
    if (rowIndex !== 2) {
      const key = `${columnIndex}`;
      const { data } = this.state;
      let newData = fromJS(data);
      newData = newData.toJS();
      newData[1][key] = Number(value) * 12; // set value of next line
      this.setState({
        data: newData,
      });
    }
  }

  render() {
    const {
      t, companyInfo,
      tabKey,
      backTab,
    } = this.props;
    const { note, data } = this.state;
    return (
      <div className="form-wizard-content">
        <Row>
          <Col lg={12}>
            <Table
              columns={this.columns}
              data={data}
              defaultPageSize={3}
              condition={index => condition(index)}
              t={t}
              handleChange={this.handleTableChange}
              company={companyInfo}
            />
          </Col>
          <Col lg={12}>
            <FormGroup>
              <Label><b>{t('Note')}</b></Label>
              <TextArea
                note={note}
                handleChangeNote={this.handleChangeNote}
              />
            </FormGroup>
          </Col>
        </Row>
        <div className="clearfix">
          <div>
            <Button
              style={{ color: '#f49100', backgroundColor: '#ffffff', border: '1px #f49100' }}
              className="btn-shadow float-left btn-wide"
              onClick={() => {
                backTab(tabKey);
              }}
            >
              {t('Back')}
            </Button>
            <Button
              style={{ backgroundColor: '#f49100', border: '0px transparent' }}
              className="btn-shadow btn-wide float-right btn-hover-shine"
              onClick={this.createRentOfficeDebounce}
            >
              {t('Next')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    simulationInfo: state.companyInfo.get('simulation').toJS(),
    companyInfo: state.companyInfo.get('company').toJS(),
  };
}

export default translateWrapper('Rent Of Office')(CompanyWrapper(connect(mapStateToProps)(RentOfOffice)));
RentOfOffice.propTypes = {
  t: PropTypes.func.isRequired,
  nextTab: PropTypes.func.isRequired,
  companyInfo: PropTypes.object.isRequired,
  backTab: PropTypes.func.isRequired,
  tabKey: PropTypes.number.isRequired,
  simulationInfo: PropTypes.object,
};

RentOfOffice.defaultProps = {
  simulationInfo: {},
};
