import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Label, FormGroup, Button,
} from 'reactstrap';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { translateWrapper } from 'ter-localization';
import InputComponent from '../../../../components/FormGroup/Input';
import Table from './Table';
import TextArea from '../../../../components/TextArea';
import { forms as setForms, options as formOptions } from './form';
import { setColumns, setData } from './data';
import API from '../../../../apis/index';
import CompanyWrapper from '../../../../components/CompanyWrapper';

const NUM_OF_EXPENSES = 3;

const MAX_DURATION = 5;

const getExpensesByIndex = (index) => {
  switch (index) {
    case 0:
      return 'biggest_expenses_1';
    case 1:
      return 'biggest_expenses_2';
    case 2:
      return 'biggest_expenses_3';
    case 3:
      return 'other_expenses';
    default:
      return 0;
  }
};
const filterError = (errors) => {
  const newErrors = errors.map((error) => {
    const arrayMesssage = error.name.split('.');
    arrayMesssage[0] = arrayMesssage[0].slice(0, arrayMesssage[0].length - 1);
    return {
      name: `${arrayMesssage[0]}_${parseInt(arrayMesssage[1], 10) + 1}`,
      message: error.message,
    };
  });
  return newErrors;
};

class OtherExpenses extends React.Component {
  constructor(props) {
    super(props);
    const { t } = props;
    this.duration = localStorage.getItem('duration');
    const { companyInfo: { startYear } } = this.props;
    this.state = {
      biggest_expenses_1: {}, //eslint-disable-line
      biggest_expenses_2: {}, //eslint-disable-line
      biggest_expenses_3: {}, //eslint-disable-line
      note: '',
      other_expenses: [],
      errors: [],
      forms: setForms(t),
      data: setData(props.t).map((item) => {
        const newItem = { ...item };
        for (let j = 0; j < this.duration; j += 1) {
          newItem[`${startYear + j}`] = '';
        }
        return newItem;
      }),
    };
    this.selectedArr = [];

    this.columns = this.duration === null ? [] : setColumns(this.duration, startYear);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeBiggestExpenses = this.handleChangeBiggestExpenses.bind(this);
    this.handleChangeInputTable = this.handleChangeInputTable.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.createOtherExpense = this.createOtherExpense.bind(this);
    this.createOtherExpenseDebounce = _.debounce(this.createOtherExpense, 500);
  }

  componentDidMount() {
    // set default value for other_expenses
    // if user does not input in orther_expenses
    // default value for each year is 0
    const { match, simulationInfo: { id } } = this.props;
    const new_other_expenses = [];
    for (let i = 0; i < MAX_DURATION; i += 1) {
      new_other_expenses.push({
        year_different: i,
        value: 0,
        month_different: 0,
      });
    }
    const new_biggest_expenses = [];
    for (let j = 0; j < NUM_OF_EXPENSES; j += 1) {
      new_biggest_expenses.push({
        index: j + 1,
        expense_id: '',
        periods: Array.from({
          length: MAX_DURATION,
        }).map((item, index) => ({
          year_different: index,
          value: 0,
          month_different: 0,
        })),
      });
    }
    this.setState({
      other_expenses: new_other_expenses,
      biggest_expenses_1: new_biggest_expenses[0], //eslint-disable-line
      biggest_expenses_2: new_biggest_expenses[1], //eslint-disable-line
      biggest_expenses_3: new_biggest_expenses[2], //eslint-disable-line
    }, () => {
      if (match.params && match.params.id) {
        this.getOtherExpense(match.params.id);
      } else if (id) {
        this.getOtherExpense(id);
      }
    });
  }

  async getOtherExpense(id) {
    try {
      const { companyInfo: { startYear } } = this.props;
      const { data } = this.state;
      const result = await API.otherExpense.getOtherExpensesData({ id });
      const expenseData = result.data && result.data.inputValue[0];

      const other_expenses = [];
      const otherExpenseData = expenseData.otherExpense;
      for (let i = 0; i < MAX_DURATION; i += 1) {
        other_expenses.push({
          year_different: i,
          month_different: 0,
          value: (otherExpenseData[i] && otherExpenseData[i].value) || 0,
        });
      }

      const new_biggest_expenses = [];
      const biggiestExpenseData = expenseData.biggestExpenses;

      for (let j = 0; j < NUM_OF_EXPENSES; j += 1) {
        new_biggest_expenses.push({
          index: j + 1,
          expense_id: (biggiestExpenseData && biggiestExpenseData[j] && biggiestExpenseData[j].expense && biggiestExpenseData[j].expense.id) || '',
          periods: Array.from({
            length: MAX_DURATION,
          }).map((item, index) => ({
            year_different: index,
            value: (biggiestExpenseData && biggiestExpenseData[j] && biggiestExpenseData[j].periods && biggiestExpenseData[j].periods[index] && biggiestExpenseData[j].periods[index].value) || 0,
            month_different: 0,
          })),
        });
      }

      this.setState({
        other_expenses,
        biggest_expenses_1: new_biggest_expenses[0],
        biggest_expenses_2: new_biggest_expenses[1],
        biggest_expenses_3: new_biggest_expenses[2],
        note: expenseData.note,
      },
      () => {
        const {
          other_expenses, biggest_expenses_1, forms,
          biggest_expenses_2, biggest_expenses_3,
        } = this.state;
        const dataClone = data.map(a => ({ ...a }));

        for (let j = 0; j < MAX_DURATION; j += 1) {
          dataClone[0][`${startYear + j}`] = (biggest_expenses_1.periods && biggest_expenses_1.periods[j] && biggest_expenses_1.periods[j].value) || '';
          dataClone[1][`${startYear + j}`] = (biggest_expenses_2.periods && biggest_expenses_2.periods[j] && biggest_expenses_2.periods[j].value) || '';
          dataClone[2][`${startYear + j}`] = (biggest_expenses_3.periods && biggest_expenses_3.periods[j] && biggest_expenses_3.periods[j].value) || '';
          dataClone[3][`${startYear + j}`] = (other_expenses[j] && other_expenses[j].value) || '';
        }

        if (forms[0].options.filter(option => Number(option.value) === biggest_expenses_1.expense_id)[0]) {
          dataClone[0].header = forms[0].options.filter(option => Number(option.value) === biggest_expenses_1.expense_id)[0].label;
        }
        if (forms[1].options.filter(option => Number(option.value) === biggest_expenses_2.expense_id)[0]) {
          dataClone[1].header = forms[1].options.filter(option => Number(option.value) === biggest_expenses_2.expense_id)[0].label;
        }
        if (forms[2].options.filter(option => Number(option.value) === biggest_expenses_3.expense_id)[0]) {
          dataClone[2].header = forms[2].options.filter(option => Number(option.value) === biggest_expenses_3.expense_id)[0].label;
        }

        let initForm = fromJS(forms);
        initForm = initForm.toJS();

        initForm.map((form) => {
          form.options.map((option) => {
            if (Number(option.value) === biggest_expenses_1.expense_id
              || Number(option.value) === biggest_expenses_2.expense_id
              || Number(option.value) === biggest_expenses_3.expense_id) {
              option.disable = true;
            }
            return null;
          });
          return null;
        });

        this.setState({
          forms: initForm,
          data: dataClone,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  controlInputTable = () => {
    const { state } = this;
    return (index) => {
      const indexOfEditable = [];
      for (let i = 0; i < NUM_OF_EXPENSES; i += 1) {
        const { [`biggest_expenses_${i + 1}`]: biggest_expenses } = state;
        if (biggest_expenses.expense_id !== '' && biggest_expenses.expense_id !== undefined) {
          indexOfEditable.push(i);
        }
      }
      indexOfEditable.push(3);
      return indexOfEditable.includes(index);
    };
  }

  async createOtherExpense() {
    try {
      const { nextTab, tabKey } = this.props;
      let biggest_expenses = [];
      const { note, other_expenses } = this.state;
      for (let i = 0; i < NUM_OF_EXPENSES; i += 1) {
        const name = `biggest_expenses_${i + 1}`;
        let { [name]: expenses } = this.state;
        expenses = fromJS(expenses);
        expenses = expenses.toJS();
        expenses.periods.map((obj) => {
          if (obj.value === '') {
            obj.value = '0';
          }
          return null;
        });
        biggest_expenses.push(expenses);
      }
      let otherExpenses = fromJS(other_expenses);
      otherExpenses = otherExpenses.toJS();
      otherExpenses.map((o) => {
        o.value = o.value === '' ? '0' : o.value;
        return null;
      });

      biggest_expenses = biggest_expenses.filter(item => item.expense_id !== '');
      const { simulationInfo: { id } } = this.props;
      const data = await API.otherExpense.otherExpensesData({
        biggest_expenses,
        note,
        other_expenses: otherExpenses,
        id,
      });
      if (data.isSuccess === false) {
        this.setState({
          errors: filterError(data.invalidParams),
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
          errors: filterError(response.data.invalidParams),
        });
      }
    }
  }

  resetState(callback) {
    this.setState({
      biggest_expenses_1: {}, //eslint-disable-line
      biggest_expenses_2: {}, //eslint-disable-line
      biggest_expenses_3: {}, //eslint-disable-line
      note: '',
      other_expenses: [],
      errors: [],
    }, () => {
      if (callback) {
        callback();
      }
    });
  }

  handleChangeNote(value) {
    this.setState({
      note: value,
    });
  }

  handleChangeBiggestExpenses(e) {
    const indexArr = [1, 2, 3];
    const { t, companyInfo: { startYear } } = this.props;
    const { name } = e.target;
    let { [name]: biggest_expenses } = this.state;
    const index = Number(name.split('_')[2]);
    this.selectedArr[index - 1] = e.target.value;

    biggest_expenses = fromJS(biggest_expenses);
    biggest_expenses = biggest_expenses.toJS();
    biggest_expenses.expense_id = e.target.value;

    const filterOption = indexArr.map((item) => {
      let biggest_expenses_item = this.state.forms[item - 1];
      biggest_expenses_item = fromJS(biggest_expenses_item);
      biggest_expenses_item = biggest_expenses_item.toJS();
      biggest_expenses_item.options = biggest_expenses_item.options.map((option) => {
        const newOption = option;
        if (this.selectedArr.includes(option.value)) {
          if (option.value === '' && item !== index) {
            newOption.disabled = false;
          } else {
            newOption.disabled = true;
          }
        } else {
          newOption.disabled = false;
        }
        if (option.value === '') {
          newOption.disabled = false;
        }
        return newOption;
      });
      return biggest_expenses_item;
    });
    const { data: clone } = this.state;
    let newData = fromJS(clone);
    newData = newData.toJS();
    const value = filterOption[0]
    && filterOption[0].options
    && filterOption[0].options.filter(item => item.value === e.target.value);
    newData[index - 1].header = e.target.value === ''
      ? t(`{Biggest expenses ${index}}`) : (value.length > 0 && value[0].label);

    if (e.target.value === '') {
      biggest_expenses.periods.map((obj, i) => {
        obj.value = '';
        newData[index - 1][`${startYear + i}`] = '';
        return null;
      });
    }

    this.setState({
      [name]: biggest_expenses,
      forms: filterOption,
      data: newData,
    });
  }

  handleChangeInput(e) {
    const { name } = e.target;
    const { [name]: biggest_expenses } = this.state;
    biggest_expenses.expense_id = e.target.value;
    this.setState({
      [name]: biggest_expenses,
    });
  }

  handleChangeInputTable(expenses, index, id, value) {
    const { [expenses]: newExpenses, data: numGoods } = this.state;
    const { companyInfo: { startYear } } = this.props;
    let newState = fromJS(numGoods);
    newState = newState.toJS();
    newState[id][index] = value;

    if (expenses === 'other_expenses') {
      newExpenses[index - startYear].value = value;
    } else {
      newExpenses.periods[index - startYear].value = value;
    }

    this.setState({
      [expenses]: newExpenses,
      data: newState,
    });
  }

  handleTableChange(index, value, ...rest) {
    const id = rest[0][0];
    const expenses = getExpensesByIndex(id);
    this.handleChangeInputTable(expenses, index, id, value);
  }

  renderForm(collection, t) {
    const {
      errors, biggest_expenses_1, biggest_expenses_2, biggest_expenses_3,
    } = this.state;
    const { match, simulationInfo: { id } } = this.props;
    const isEdit = (match.params && match.params.id) || id;
    return (
      collection.map((form) => {
        if (form.options) {
          const { [form.name]: value } = this.state;
          return (
            <Col lg={form.grid.lg}>
              <FormGroup>
                <Label>
                  <b>{t(form.label)}</b>
                </Label>
                {
                  form.type === 'select' && (
                    <InputComponent
                      onChange={this.handleChangeBiggestExpenses}
                      label={t(form.label)}
                      errors={errors}
                      type="select"
                      value={value.expense_id}
                      name={form.name}
                      options={form.options.map(option => ({
                        value: option.value,
                        label: option.label,
                        disabled: !isEdit ? option.disabled : (
                          Number(option.value) === Number(biggest_expenses_1.expense_id)
                          || Number(option.value) === Number(biggest_expenses_2.expense_id)
                          || Number(option.value) === Number(biggest_expenses_3.expense_id)
                        ),
                      }))}
                    />
                  )
                }
              </FormGroup>
            </Col>
          );
        }
        const { [form.name]: value } = this.state;
        return (
          <Col lg={form.grid.lg}>
            <FormGroup>
              <Label>
                <b>{t(form.label)}</b>
              </Label>
              <InputComponent
                type={form.type}
                name={form.name}
                onChange={this.handleChangeInput}
                value={value}
                errors={errors}
              />
            </FormGroup>
          </Col>
        );
      })
    );
  }

  render() {
    const {
      t, tabKey,
      backTab, companyInfo,
    } = this.props;
    const { note, forms, data } = this.state;
    const duration = localStorage.getItem('duration');
    return (
      <div className="form-wizard-content">
        <Label>{t('header_expense')}</Label>
        <Row>
          {this.renderForm(forms, t)}
        </Row>
        <Row>
          <Col xl={12}>
            <Label>
              <b>
                {`${duration} ${t('years')}`}
              </b>
            </Label>
            <Row>
              <Col xl={10}>
                <p>
                  {t('Please try to identify 3 biggest expenses (except above).')}
                </p>
              </Col>
              <Col xl={2} align="right">
                <h6>{companyInfo.currencyCode}</h6>
              </Col>
            </Row>
          </Col>
          <Table
            columns={this.columns}
            data={data}
            defaultPageSize={4}
            condition={this.controlInputTable()}
            t={t}
            handleChange={this.handleTableChange}
            company={companyInfo}
          />
        </Row>
        <Row>
          <Col xl={12}>
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
              onClick={this.createOtherExpenseDebounce}
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


export default translateWrapper('Other Expenses')(CompanyWrapper(connect(mapStateToProps)(OtherExpenses)));

OtherExpenses.propTypes = {
  t: PropTypes.func.isRequired,
  companyInfo: PropTypes.object.isRequired,
  nextTab: PropTypes.func.isRequired,
  tabKey: PropTypes.number.isRequired,
  backTab: PropTypes.func.isRequired,
  simulationInfo: PropTypes.object.isRequired,
};
