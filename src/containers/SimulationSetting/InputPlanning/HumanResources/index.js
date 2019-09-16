import React from 'react';
import {
  Row, Col,
  FormGroup, Label,
  Button,
} from 'reactstrap';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { translateWrapper } from 'ter-localization';
import EditableTable from '../../../../components/Table/EditableTable';
import InputComponent from '../../../../components/FormGroup/Input';
import './index.scss';
import { setColumns, setData } from './data';
import API from '../../../../apis/index';
import { row } from './form';
import TextArea from '../../../../components/TextArea';
import CompanyWrapper from '../../../../components/CompanyWrapper';

const condition = index => [0, 2, 4].includes(index);

const MAX_JOB_GRADE = 3;

const MAX_DURATION = 5;

const getJobByIndex = (index) => {
  switch (index) {
    case 0:
      return 'job_grade_1';
    case 2:
      return 'job_grade_2';
    case 4:
      return 'job_grade_3';
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

class HumanResources extends React.Component { //eslint-disable-line

  constructor(props) {
    super(props);
    this.state = {
      job_grade_1: '', //eslint-disable-line
      job_grade_2: '', //eslint-disable-line
      job_grade_3: '', //eslint-disable-line
      listOfEmployees: {
        job_grade_1: [],
        job_grade_2: [],
        job_grade_3: [],
      },
      note: '',
      errors: [],
      data: setData(props.t),
    };
    this.duration = localStorage.getItem('duration');
    const { companyInfo: { startYear } } = this.props;
    this.columns = this.duration === null ? [] : setColumns(this.duration, startYear);
    this.handleSetEmployee = this.handleSetEmployee.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.createHumanResources = this.createHumanResources.bind(this);
    this.createHumanResourcesDebounce = _.debounce(this.createHumanResources, 500);
    this.resetState = this.resetState.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
  }

  componentDidMount() {
    const duration = localStorage.getItem('duration');
    const { match, companyInfo: { startYear }, simulationInfo: { id } } = this.props;
    if (duration !== null) {
      const { listOfEmployees } = this.state;
      Object.keys(listOfEmployees).map((key) => {
        const numGoods = [];
        for (let i = 0; i < MAX_DURATION; i += 1) {
          numGoods.push({
            year_different: i,
            value: 0,
          });
        }
        listOfEmployees[key] = numGoods;
        return key;
      });
      const { data } = this.state;
      const newData = data.map((item) => {
        const newItem = { ...item };
        for (let j = 0; j < MAX_DURATION; j += 1) {
          newItem[`${startYear + j}`] = '';
        }
        return newItem;
      });
      this.setState({
        listOfEmployees,
        data: newData,
      }, () => {
        if (match.params && match.params.id) {
          this.getSalaryData(match.params.id);
        } else if (id) {
          this.getSalaryData(id);
        }
      });
    }
  }

  async getSalaryData(id) {
    try {
      const { listOfEmployees } = this.state;
      const { companyInfo: { startYear } } = this.props;
      const { data } = this.state;
      const result = await API.salary.getHumanResources({ id });
      const salaryData = result.data && result.data.inputValue[0];
      const listSalary = salaryData.salaries;

      const obj = Object.assign({}, listOfEmployees);
      const temp = Object.keys(obj).map((key, index) => {
        const numGoods = [];
        for (let i = 0; i < MAX_DURATION; i += 1) {
          numGoods.push({
            year_different: i,
            value: (listSalary && listSalary[index] && listSalary[index].numberOfEmployees && listSalary[index].numberOfEmployees[i] && listSalary[index].numberOfEmployees[i].value) || '',
          });
        }
        obj[key] = numGoods;
        return obj;
      });

      this.setState({
        job_grade_1: (listSalary[0] && listSalary[0].amount) || '',
        job_grade_2: (listSalary[1] && listSalary[1].amount) || '',
        job_grade_3: (listSalary[2] && listSalary[2].amount) || '',
        note: salaryData.note,
        listOfEmployees: temp[0],
      },
      () => {
        const dataClone = data.map(a => ({ ...a }));
        const {
          job_grade_1,
          job_grade_2,
          job_grade_3,
          listOfEmployees,
        } = this.state;

        const range = [0, 2, 4];

        for (let i = 0; i < range.length; i += 1) {
          for (let j = 0; j < MAX_DURATION; j += 1) {
            dataClone[range[i]][`${startYear + j}`] = (listOfEmployees[`job_grade_${i + 1}`][j] && listOfEmployees[`job_grade_${i + 1}`][j].value) || '';
            dataClone[1][`${startYear + j}`] = (listOfEmployees[`job_grade_${1}`][j] && Number(listOfEmployees[`job_grade_${1}`][j].value) * Number(job_grade_1)) || '';
            dataClone[3][`${startYear + j}`] = (listOfEmployees[`job_grade_${2}`][j] && Number(listOfEmployees[`job_grade_${2}`][j].value) * Number(job_grade_2)) || '';
            dataClone[5][`${startYear + j}`] = (listOfEmployees[`job_grade_${3}`][j] && Number(listOfEmployees[`job_grade_${3}`][j].value) * Number(job_grade_3)) || '';
            dataClone[6][`${startYear + j}`] = Number(dataClone[1][`${startYear + j}`]) + Number(dataClone[3][`${startYear + j}`]) + Number(dataClone[5][`${startYear + j}`]) === 0 ? '' : Number(dataClone[1][`${startYear + j}`]) + Number(dataClone[3][`${startYear + j}`]) + Number(dataClone[5][`${startYear + j}`]);
          }
        }

        this.setState({
          data: dataClone,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleChangeInput(e) {
    const { companyInfo: { startYear } } = this.props;
    this.setState({
      [e.target.name]: e.target.value,
    }, () => {
      const {
        job_grade_1,
        job_grade_2,
        job_grade_3,
        listOfEmployees,
        data,
      } = this.state;
      const dataClone = data.map(a => ({ ...a }));

      const range = [0, 2, 4];

      for (let i = 0; i < range.length; i += 1) {
        for (let j = 0; j < MAX_DURATION; j += 1) {
          dataClone[range[i]][`${startYear + j}`] = (listOfEmployees[`job_grade_${i + 1}`][j] && listOfEmployees[`job_grade_${i + 1}`][j].value) || '';
          dataClone[1][`${startYear + j}`] = (listOfEmployees[`job_grade_${1}`][j] && Number(listOfEmployees[`job_grade_${1}`][j].value) * Number(job_grade_1)) || '';
          dataClone[3][`${startYear + j}`] = (listOfEmployees[`job_grade_${2}`][j] && Number(listOfEmployees[`job_grade_${2}`][j].value) * Number(job_grade_2)) || '';
          dataClone[5][`${startYear + j}`] = (listOfEmployees[`job_grade_${3}`][j] && Number(listOfEmployees[`job_grade_${3}`][j].value) * Number(job_grade_3)) || '';
          dataClone[6][`${startYear + j}`] = ((dataClone[1][`${startYear + j}`] !== '' || dataClone[3][`${startYear + j}`] !== '' || dataClone[5][`${startYear + j}`] !== '') && Number(dataClone[1][`${startYear + j}`]) + Number(dataClone[3][`${startYear + j}`]) + Number(dataClone[5][`${startYear + j}`])) || '';
        }
      }

      this.setState({
        data: dataClone,
      });
    });
  }

  handleSetEmployee(job, id, value) {
    const { listOfEmployees } = this.state;
    const { companyInfo: { startYear } } = this.props;
    listOfEmployees[job][id - startYear].value = value === '' ? 0 : value;
    this.setState({
      listOfEmployees: {
        ...this.state.listOfEmployees,//eslint-disable-line
        ...listOfEmployees,
      },
    });
  }

  // rest is the key of column
  // id is the index of row
  // index is the index of column ( start from 0 ->);
  handleTableChange(index, value, ...rest) {
    const id = rest[0][0];
    const job = getJobByIndex(id);
    this.handleAutoCalculate(index, id, job, value, () => {
      this.handleSetEmployee(job, index, value);
    });
  }

  handleAutoCalculateTotal(columnIndex, key) {
    const { data } = this.state;
    let newData = fromJS(data);
    const editableRow = [0, 2, 4];
    const totalJob = editableRow.reduce((total, current) => {
      if (current === '') {
        return total;
      }
      const tempTotal = total === '' ? 0 : Number(total);
      return (tempTotal + Number(data[current + 1][key])).toString();
    }, '');
    newData = newData.setIn([6, key], totalJob);
    newData = newData.toJS();
    this.setState({
      data: newData,
    });
  }

  // lay index la so cot, id la so dong => calculate
  handleAutoCalculate(columnIndex, rowIndex, jobName, jobValue, callBack) {
    const { [jobName]: jobStateValue } = this.state;
    const key = `${columnIndex}`;
    const { data } = this.state;
    // make it become immutable
    let newData = fromJS(data);
    newData = newData.setIn([rowIndex + 1, key], jobStateValue === '' ? '' : Number(jobValue) * Number(jobStateValue));
    newData = newData.setIn([rowIndex, key], jobValue);
    newData = newData.toJS();

    this.setState({
      data: [...newData],
    }, () => {
      this.handleAutoCalculateTotal(columnIndex, key);
      callBack();
    });
  }

  handleChangeNote(value) {
    this.setState({
      note: value,
    });
  }

  async createHumanResources() {
    try {
      const {
        tabKey,
        nextTab,
      } = this.props;
      const { simulationInfo: { id } } = this.props;
      const job_grade = [];
      const { listOfEmployees, note } = this.state;

      for (let i = 0; i < MAX_JOB_GRADE; i += 1) {
        const jobName = `job_grade_${i + 1}`;
        const { [jobName]: job } = this.state;
        let newData = fromJS(listOfEmployees);
        newData = newData.toJS();
        newData[jobName].map((job) => {
          job.value = job.value === '' ? 0 : job.value;
          return null;
        });

        job_grade.push({
          index: i + 1,
          amount: job === '' ? 0 : job,
          number_of_employees: newData[jobName],
        });
      }

      const data = await API.salary.postHumanResources({
        job_grades: job_grade,
        note,
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
      job_grade_1: '', //eslint-disable-line
      job_grade_2: '', //eslint-disable-line
      job_grade_3: '', //eslint-disable-line
      listOfEmployees: {
        job_grade_1: [],
        job_grade_2: [],
        job_grade_3: [],
      },
      errors: [],
    }, () => {
      if (callback) {
        callback();
      }
    });
  }

  renderForm(collection, t) {
    const { errors } = this.state;
    return (
      collection.map((form) => {
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
      t, backTab, tabKey, companyInfo,
    } = this.props;
    const {
      note,
      job_grade_1,
      job_grade_2,
      job_grade_3,
      data,
    } = this.state;
    const duration = localStorage.getItem('duration');
    return (
      <div className="form-wizard-content">
        <Row>
          <Col lg={4}>
            <FormGroup>
              <Label>
                <b>{t('Monthly salary')}</b>
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          {
            this.renderForm(row, t)
          }
        </Row>
        <Row>
          <div />
        </Row>
        <Row>
          <Col lg={12}>
            <FormGroup>
              <Label><b>{t(`${duration} years`)}</b></Label>
              <Row>
                <Col xl={9}>
                  <p>{t('Description')}</p>
                </Col>
                <Col xl={3} align="right">
                  <h6>{companyInfo.currencyCode}</h6>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <EditableTable
                    columns={this.columns}
                    data={data}
                    className=""
                    defaultPageSize={7}
                    condition={condition}
                    handleChange={this.handleTableChange}
                    job_grade_1={job_grade_1}
                    job_grade_2={job_grade_2}
                    job_grade_3={job_grade_3}
                  />
                </Col>
              </Row>

            </FormGroup>
          </Col>
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
              onClick={this.createHumanResourcesDebounce}
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


export default compose(
  translateWrapper('HumanResources'),
  CompanyWrapper,
  connect(mapStateToProps),
)(HumanResources);


HumanResources.propTypes = {
  t: PropTypes.func.isRequired,
  tabKey: PropTypes.number.isRequired,
  nextTab: PropTypes.func.isRequired,
  companyInfo: PropTypes.object.isRequired,
  backTab: PropTypes.func.isRequired,
  simulationInfo: PropTypes.func.isRequired,
};
