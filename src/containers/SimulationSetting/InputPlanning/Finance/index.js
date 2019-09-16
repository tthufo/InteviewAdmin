import React from 'react';
import {
  Card, CardBody, Row, Col, FormGroup, Label, Button,
  Modal, ModalBody,
} from 'reactstrap';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { translateWrapper } from 'ter-localization';
import { toast, ToastContainer } from 'react-toastify';
import GroupInput from './GroupInput';
import Table from './Table';
import TextArea from '../../../../components/TextArea';
import API from '../../../../apis';
import CompanyWrapper from '../../../../components/CompanyWrapper';

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    height: '100%',
    width: '100px',
    backgroundColor: '#f49100',
    border: '0px transparent',
  },
};

const MAX_DURATION = 5;

const editTypes = t => [{ type: t('Short-term Debt'), opt: 0 }, { type: t('Long-term Debt'), opt: 1 }];

const types = t => [{ type: t('Short-term Debt'), opt: 0 }, { type: t('Long-term Debt'), opt: 1 }];

class Finance extends React.PureComponent {
  constructor(props) {
    super(props);
    const { t } = props;
    this.columns1 = [
      {
        Header: '',
        accessor: 'header',
        eidtable: false,
        sortable: false,
        resizable: true,
        getProps: (state, rowInfo) => ({
          style: {
            'border-bottom': '1px solid #E9ECEF',
          },
        }),
      },
    ];

    this.columns2 = [
      {
        Header: '',
        accessor: 'header',
        eidtable: false,
        sortable: false,
        resizable: true,
        getProps: (state, rowInfo) => ({
          style: {
            'border-bottom': '1px solid #E9ECEF',
          },
        }),
      },
    ];

    this.state = {
      note: '',
      isOpen: false,
      duration: '',
      startYear: '',
      data1: [],
      data3: [],
      registerData: {
        category: t('Long-term Debt'),
        year: '',
        value: '',
        opt: 1,
        percentage: '',
        period: 5,
      },
      editData: {
      },
      forceValidate: false,
      forceValidatePop: false,
      forceValidatePercent: false,
      forceValidatePercentPop: false,
      forceValidatePeriod: false,
      forceValidatePeriodPop: false,
    };
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.createFinance = this.createFinance.bind(this);
    this.createFinanceDebounce = _.debounce(this.createFinance, 500);
    this.reqister = this.reqister.bind(this);
    this.toggle = this.toggle.bind(this);
    this.editData = this.editData.bind(this);
    this.handleTableInputChange = this.handleTableInputChange.bind(this);
  }

  componentDidMount() {
    const duration = localStorage.getItem('duration');
    const { companyInfo: { startYear } } = this.props;
    this.setState({
      duration,
      startYear,
    }, () => this.modifyingColumn());
    const inputData = { ...this.state.registerData };
    inputData.year = startYear;
    this.setState({ registerData: inputData });
  }

  async getFinance(id) {
    try {
      const result = await API.finance.getFinance(id || '');
      const financeData = result.data && result.data.inputValue[0];
      this.setState({ note: financeData.note }, () => {
        this.dataTable(financeData);
      });
    } catch (error) {
      console.log(error);
    }
  }

  modifyingColumn() {
    const { duration } = this.state;
    const { match, simulationInfo: { id }, companyInfo: { startYear } } = this.props;
    for (let i = 0; i < duration; i += 1) {
      this.columns1.push(
        {
          Header: startYear + i,
          accessor: `${startYear + i}`,
          eidtable: false,
          sortable: false,
          resizable: true,
          getProps: (state, rowInfo) => ({
            style: {
              backgroundColor: rowInfo.original.color,
              'border-bottom': '1px solid #E9ECEF',
            },
          }),
        },
      );
    }

    for (let i = 0; i < duration; i += 1) {
      this.columns2.push(
        {
          Header: startYear + i,
          accessor: `${startYear + i}`,
          eidtable: true,
          sortable: false,
          resizable: true,
          getProps: (state, rowInfo) => ({
            style: {
              backgroundColor: rowInfo.original.color,
              'border-bottom': '1px solid #E9ECEF',
            },
          }),
        },
      );
    }
    if (match.params && match.params.id) {
      this.getFinance(match.params.id);
    } else if (id) {
      this.getFinance(id);
    } else {
      this.dataTable();
    }
  }

  dataTable(financeData) {
    const { duration } = this.state;
    const { t, companyInfo: { startYear } } = this.props;
    const data1 = [];
    const header1 = [t('Short-term Debt'), t('Long-term Debt')];
    header1.map((h, index) => {
      const obj = {};
      const data = index !== 1 ? financeData && financeData.shortTerm : financeData && financeData.longTerm;

      obj.header = h;
      for (let i = 0; i < duration; i += 1) {
        obj[`${startYear + i}`] = (data && data[i] && data[i].price) || '';
        obj[`${startYear + i}_percentage`] = (data && data[i] && data[i].interestRate) || '';
        obj[`${startYear + i}_period`] = (data && data[i] && data[i].payBackPeriod) || '';
      }
      obj.color = '#DEE7ED';
      data1.push(obj);
      return null;
    });
    this.setState({ data1 });

    const data3 = [];
    const header3 = [t('Equity Finance')];
    header3.map((h) => {
      const obj = {};
      const data = financeData && financeData.equityFinance;

      obj.header = h;
      for (let i = 0; i < duration; i += 1) {
        obj[`${startYear + i}`] = (data && data[i] && data[i].value) || '';
      }
      obj.color = '#DEE7ED';
      data3.push(obj);
      return null;
    });

    this.setState({ data3 });
  }

  async createFinance() {
    const {
      data1,
      data3, note,
      startYear,
    } = this.state;

    const finance = {};
    const k = ['short_term', 'long_term'];
    const years = [];
    const period = [];
    const percent = [];

    for (let i = 0; i < MAX_DURATION; i += 1) {
      years.push(`${startYear + i}`);
      percent.push(`${startYear + i}_percentage`);
      period.push(`${startYear + i}_period`);
    }

    const data1Clone = data1.map(a => ({ ...a }));

    data1Clone.map((as, index) => {
      const finalData = data1Clone[index];
      const tempArr = [];
      for (let i = 0; i < MAX_DURATION; i += 1) {
        const tempObj = {};
        tempObj.year_different = Number(years[i]) - startYear;
        tempObj.month_different = 0;
        tempObj.value = (finalData && finalData[years[i]] && finalData[years[i]] === '' ? 0 : finalData[years[i]]) || 0;
        tempObj.pay_back_period = (finalData && finalData[period[i]] && finalData[period[i]] === '' ? 5 : finalData[period[i]]) || 5;
        tempObj.interest_rate = (finalData && finalData[percent[i]] && finalData[percent[i]] === '' ? 0 : finalData[percent[i]]) || 0;
        tempArr.push(tempObj);
      }
      finance[k[index]] = tempArr;
      return null;
    });

    const data3Clone = data3.map(a => ({ ...a }));

    data3Clone.map((as) => {
      const tempArr = [];
      delete as.header;
      delete as.color;
      for (let i = 0; i < MAX_DURATION; i += 1) {
        const tempObj = {};
        tempObj.year_different = i;
        tempObj.month_different = 0;
        tempObj.value = (as && as[`${startYear + i}`] === '' ? 0 : as[`${startYear + i}`]) || 0;
        tempArr.push(tempObj);
      }
      finance.equity_finance = tempArr;
    });

    finance.note = note;

    try {
      const { simulationInfo: { id } } = this.props;
      await API.finance.createFinance(id, finance);
      const {
        next,
      } = this.props;
      next();
    } catch (error) {
      toast.error(error.response.data.invalidParams.length !== 0 ? error.response.data.invalidParams.map(p => p.message).join('\n') : error.response.data.detail, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  reqister(isEdit) {
    let { registerData, editData } = this.state;
    registerData = fromJS(registerData);
    registerData = registerData.toJS();
    editData = fromJS(editData);
    editData = editData.toJS();
    const periodKeyRegister = `${registerData.year}_period`;
    const percentKeyRegister = `${registerData.year}_percentage`;
    const periodKeyEdit = `${editData.year}_period`;
    const percentKeyEdit = `${editData.year}_percentage`;
    if (!isEdit) {
      this.setState({ forceValidate: true, forceValidatePercent: true, forceValidatePeriod: true });
    } else {
      this.setState({
        forceValidatePop: editData.value === '',
        forceValidatePercentPop: editData.percentage === '',
        forceValidatePeriodPop: editData.opt === 0 ? false : (editData.period === '' || Number(editData.period) <= 0),
      }, () => { if (!this.state.forceValidatePop && !this.state.forceValidatePercentPop && !this.state.forceValidatePeriodPop) { this.toggle(); } });
    }
    let { data1 } = this.state;
    data1 = fromJS(data1);
    data1 = data1.toJS();
    const newItems = data1;

    if (isEdit && editData.value !== '' && editData.percentage !== '' && (editData.opt === 0 ? true : editData.period !== '' && Number(editData.period) > 0)) {
      newItems[editData.opt][editData.year] = Number(editData.value);
      newItems[editData.opt][percentKeyEdit] = editData.percentage;
      newItems[editData.opt][periodKeyEdit] = editData.period;
    }
    if (!isEdit && registerData.value !== '' && registerData.percentage !== '' && (registerData.opt === 0 ? true : registerData.period !== '' && Number(registerData.period) > 0)) {
      newItems[registerData.opt][registerData.year] = Number(registerData.value);
      newItems[registerData.opt][percentKeyRegister] = registerData.percentage;
      newItems[registerData.opt][periodKeyRegister] = registerData.period;
    }
    this.setState({ data1: newItems });
  }

  editData(data, header) {
    const { t } = this.props;
    for (let i = 0; i < editTypes(t).length; i += 1) {
      if (editTypes(t)[i].type === data.header) {
        const periodKey = `${header}_period`;
        const percentKey = `${header}_percentage`;
        this.setState({
          editData: {
            category: types(t)[editTypes(t)[i].opt].type,
            year: header,
            value: data[header],
            opt: editTypes(t)[i].opt,
            // period: data[periodKey] === '' ? editTypes(t)[i].opt === 0 ? '' : 5 : data[periodKey],
            // eslint-disable-next-line no-nested-ternary
            period: editTypes(t)[i].opt === 0 ? '' : data[periodKey] === '' ? 5 : data[periodKey],
            percentage: data[percentKey],
          },
        }, () => this.toggle());
      }
    }
  }

  handleChangeNote(value) {
    this.setState({
      note: value,
    });
  }

  toggle() {
    this.setState(prev => ({
      isOpen: !prev.isOpen,
    }), () => {
      if (!this.state.isOpen) {
        this.setState({
          forceValidatePop: false,
          forceValidatePercentPop: false,
          forceValidatePeriodPop: false,
        });
      }
    });
  }

  handleTableInputChange(index, value) {
    const { data3: numGoods } = this.state;
    let newState = fromJS(numGoods);
    newState = newState.toJS();
    newState[0][index] = value;
    this.setState({
      data3: newState,
    });
  }

  render() {
    const {
      note, isOpen,
      duration, startYear,
      data1, forceValidate, forceValidatePop,
      forceValidatePercentPop, forceValidatePeriodPop,
      forceValidatePercent, forceValidatePeriod,
      data3, registerData, editData,
    } = this.state;
    const {
      t, backTab, tabKey, companyInfo,
    } = this.props;
    return (
      <div className="form-wizard-content">
        <h6><b>{t('Debt Finance')}</b></h6>
        <Card className="main-card mb-3">
          <CardBody>
            <h6>{t('Register Debt')}</h6>
            <GroupInput
              t={t}
              duration={duration}
              startYear={startYear}
              data={registerData}
              forceValidate={forceValidate}
              forceValidatePercent={forceValidatePercent}
              forceValidatePeriod={forceValidatePeriod}
              onChangeCategory={() => this.setState({ forceValidate: false })}
              onChangeData={dat => this.setState({ registerData: dat })}
            />
            <div style={styles.buttonContainer}>
              <Button
                onClick={() => this.reqister(false)}
                color="primary"
                style={styles.button}
              >
                {t('Register')}
              </Button>
            </div>
          </CardBody>
        </Card>
        <Row>
          <Col xl={12}>
            <FormGroup>
              { data1.length !== 0
              && (
              <Table
                t={t}
                header=""
                year={duration}
                description={t('discussion..discussion..discussion..discussion.')}
                columns={this.columns1}
                data={data1}
                handleOpenModal={(data, header) => this.editData(data, header)}
                defaultPageSize={2}
                company={companyInfo}
              />
              )
            }
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <FormGroup>
              { data3.length !== 0
              && (
              <Table
                t={t}
                header={t('Equity Finance')}
                year={duration}
                description={t('How much do you plan to finance with equity in each year?')}
                columns={this.columns2}
                data={data3}
                defaultPageSize={1}
                company={companyInfo}
                handleChange={this.handleTableInputChange}
              />
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <FormGroup>
              <Label>{t('Note')}</Label>
              <TextArea
                note={note}
                handleChangeNote={this.handleChangeNote}
              />
            </FormGroup>
          </Col>
        </Row>
        <Modal
          style={{
            boxShadow: 'none',
          }}
          centered
          size="lg"
          isOpen={isOpen}
          toggle={this.toggle}
        >
          <ModalBody>
            <h5><b>{t('Register Debt')}</b></h5>
            <GroupInput
              t={t}
              duration={duration}
              startYear={startYear}
              data={editData}
              forceValidatePop={forceValidatePop}
              forceValidatePercentPop={forceValidatePercentPop}
              forceValidatePeriodPop={forceValidatePeriodPop}
              edit=""
              onChangeData={(dat) => { this.setState({ editData: dat }); }}
            />
            <Row>
              <Col xl={12}>
                <div style={styles.buttonContainer}>
                  <Button
                    color="primary"
                    style={styles.button}
                    onClick={() => { this.reqister(true); }}
                  >
                    {t('Update')}
                  </Button>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
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
              onClick={this.createFinanceDebounce}
            >
              {t('Next')}
            </Button>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
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


Finance.propTypes = {
  t: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
};

export default translateWrapper('Finance')(CompanyWrapper(connect(mapStateToProps)(Finance)));
