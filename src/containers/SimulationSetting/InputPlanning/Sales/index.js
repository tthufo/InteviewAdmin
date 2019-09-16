import React from 'react';
import {
  Row, Col,
  FormGroup, Label, Button,
} from 'reactstrap';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { translateWrapper } from 'ter-localization';
import InputComponent from '../../../../components/FormGroup/Input';
import EditableTable from '../../../../components/Table/EditableTable';
import TextArea from '../../../../components/TextArea';
import { setData, setColumns } from './data';
import { forms, row } from './form';
import './index.scss';
import API from '../../../../apis/index';
import CompanyWrapper from '../../../../components/CompanyWrapper';

const condition = index => index === 0;

const MAX_ROW = 3;

const MAX_DURATION = 5;

class Sales extends React.PureComponent { //eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      note: '',
      product_unit_price: '',   //eslint-disable-line
      cost_of_goods_sold: '',   //eslint-disable-line
      inventory_turnover_period: '', //eslint-disable-line
      terms_of_receivable: '', //eslint-disable-line
      terms_of_payment: '', //eslint-disable-line
      number_of_goods: [],
      errors: [],
      data: setData(props.t),
    };
    this.columns = [];
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.resetState = this.resetState.bind(this);
    this.createSales = this.createSales.bind(this);
    this.createSalesDebounce = _.debounce(this.createSales, 500);
    this.handleSaveTableInput = this.handleSaveTableInput.bind(this);
    this.handleTableInputChange = this.handleTableInputChange.bind(this);
  }

  componentDidMount() {
    const duration = localStorage.getItem('duration');
    const { match, companyInfo: { startYear }, simulationInfo: { id } } = this.props;
    if (duration !== null) {
      const numGoods = [];
      for (let i = 0; i < MAX_DURATION; i += 1) {
        numGoods.push({
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
      this.columns = setColumns(duration, startYear);
      this.setState({
        number_of_goods: numGoods,
        data: newData,
      }, () => {
        if (match.params && match.params.id) {
          this.getSalesData(match.params.id);
        } else if (id) {
          this.getSalesData(id);
        }
      });
    }
  }

  async getSalesData(id) {
    try {
      const { companyInfo: { startYear } } = this.props;
      const result = await API.sale.getSales({ id });
      const saleData = result.data;
      this.setState({
        product_unit_price: saleData.productUnitPrice,
        cost_of_goods_sold: saleData.costOfGoodsSold,
        inventory_turnover_period: saleData.inventoryTurnoverPeriod,
        terms_of_receivable: saleData.termsOfReceivable,
        terms_of_payment: saleData.termsOfPayment,
        note: saleData.note,
        number_of_goods: saleData.numberOfGoods,
      }, () => {
        const {
          product_unit_price,
          cost_of_goods_sold,
          number_of_goods,
          data,
        } = this.state;
        const dataClone = data.map(a => ({ ...a }));
        const goods = number_of_goods.map(a => ({ ...a }));
        for (let j = 0; j < MAX_DURATION; j += 1) {
          dataClone[0][`${startYear + j}`] = Number((number_of_goods[j] && number_of_goods[j].value) || 0);
          dataClone[1][`${startYear + j}`] = Number((number_of_goods[j] && number_of_goods[j].value) || 0) * Number(product_unit_price);
          dataClone[2][`${startYear + j}`] = Number((number_of_goods[j] && number_of_goods[j].value) || 0) * Number(product_unit_price) * (Number(cost_of_goods_sold) / 100);

          if (goods[j]) {
            goods[j].year_different = j;
            goods[j].value = Number(number_of_goods[j] && number_of_goods[j].value);
          } else {
            goods.push({
              year_different: j,
              value: 0,
            });
          }
        }

        this.setState({
          number_of_goods: goods,
          data: dataClone,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleChangeNote(value) {
    this.setState({
      note: value,
    });
  }

  handleChangeInput(e) {
    const { companyInfo: { startYear } } = this.props;
    this.setState({
      [e.target.name]: e.target.value,
    }, () => {
      const {
        product_unit_price,
        cost_of_goods_sold,
        data,
      } = this.state;
      const dataClone = data.map(a => ({ ...a }));

      for (let j = 0; j < MAX_DURATION; j += 1) {
        dataClone[1][`${startYear + j}`] = product_unit_price === '' ? '' : Number(dataClone[0][`${startYear + j}`]) * Number(product_unit_price);
        dataClone[2][`${startYear + j}`] = (cost_of_goods_sold === '' || product_unit_price === '') ? '' : Number(dataClone[0][`${startYear + j}`]) * Number(product_unit_price) * (Number(cost_of_goods_sold) / 100);
      }

      this.setState({
        data: dataClone,
      });
    });
  }

  handleSaveTableInput(index, id, value) {
    const { data: input, number_of_goods: numGoods } = this.state;
    const { companyInfo: { startYear } } = this.props;
    let newState = fromJS(input);
    newState = newState.toJS();
    newState[id][index] = value;

    let newGoods = fromJS(numGoods);
    newGoods = newGoods.toJS();
    newGoods[index - startYear].value = value;

    this.setState({
      data: newState,
      number_of_goods: newGoods,
    }, () => this.handleAutoCalculate(index, id, value));
  }

  handleTableInputChange(index, value, ...rest) {
    const id = rest[0][0];
    this.handleSaveTableInput(index, id, value);
  }

  // lay index la so cot, id la so dong => calculate
  handleAutoCalculate(columnIndex, rowIndex, jobValue) {
    const {
      product_unit_price,
      cost_of_goods_sold,
    } = this.state;
    const key = `${columnIndex}`;
    // make it become immutable
    const { data: numGoods } = this.state;
    let newData = fromJS(numGoods);
    newData = newData.toJS();

    newData[rowIndex + 1][key] = product_unit_price === '' ? '' : Number(jobValue) * Number(product_unit_price);
    newData[rowIndex + 2][key] = cost_of_goods_sold === '' ? '' : Number(jobValue) * Number(product_unit_price) * (Number(cost_of_goods_sold) / 100);

    this.setState({
      data: [...newData],
    });
  }

  async createSales() {
    try {
      const {
        tabKey,
        nextTab,
        simulationInfo: { id },
      } = this.props;
      const { number_of_goods } = this.state;
      let newState = fromJS(number_of_goods);
      newState = newState.toJS();
      newState.map((obj) => {
        obj.value = obj.value === '' ? 0 : obj.value;
        return null;
      });

      this.setState({ number_of_goods: newState });

      const data = await API.sale.postSales({ ...this.state, id });
      if (data.isSuccess === false) {
        this.setState({
          errors: data.invalidParams,
        });
      } else {
        this.setState({
          openModal: true,
        }, () => {
          this.resetState(() => {
            nextTab(tabKey);
          });
        });
      }
    } catch (error) {
      const { response } = error;
      if (response && response.data
         && response.data.invalidParams
         && response.data.invalidParams.length > 0) {
        this.setState({
          errors: response.data.invalidParams,
        });
      }
    }
  }

  resetState(callback) {
    this.setState({
      note: '',
      product_unit_price: '',   //eslint-disable-line
      cost_of_goods_sold: '',   //eslint-disable-line
      inventory_turnover_period: '', //eslint-disable-line
      terms_of_receivable: '', //eslint-disable-line
      terms_of_payment: '', //eslint-disable-line
      number_of_goods: [],
      errors: [],
      data: [],
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
        if (form.options) {
          const { [form.name]: value } = this.state;
          return (
            <React.Fragment>
              <Col lg={form.grid.lg}>
                <FormGroup>
                  <Label>
                    <b>{t(form.label)}</b>
                  </Label>
                  {
                    form.type === 'select' && (
                      <InputComponent
                        onChange={this.handleChangeInput}
                        label={t(form.label)}
                        errors={errors}
                        type="select"
                        value={value}
                        name={form.name}
                        options={form.options.map(option => ({
                          value: option.value,
                          label: t(option.label),
                          disabled: option.disabled,
                        }))}
                        style={{
                          backgroundImage: 'none',
                        }}
                      />
                    )
                  }
                  {
                    form.type === 'radio' && (
                    <React.Fragment>
                      {
                        form.options.map(option => (
                          <InputComponent
                            {...option}
                            onChange={this.handleChangeInput}
                            label={t(option.label)}
                            errors={errors}
                            type={form.type}
                            value={option.value}
                            checked={value === option.value}
                            name={form.name}
                            style={{
                              backgroundImage: 'none',
                            }}
                          />
                        ))
                      }
                    </React.Fragment>
                    )
                }
                </FormGroup>
              </Col>
            </React.Fragment>
          );
        }
        const { [form.name]: value } = this.state;
        return (
          <React.Fragment>
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
                  limit={form.limit}
                  errors={errors}
                  style={{
                    paddingRight: form.name === 'cost_of_goods_sold' ? '30px' : '0.75rem',
                    backgroundImage: 'none',
                  }}
                  t={t}
                />
              </FormGroup>
            </Col>
            {
              (form.name === 'terms_of_receivable' || form.name === 'terms_of_payment') && (
                <Col xl={8} />
              )
            }
          </React.Fragment>
        );
      })
    );
  }

  render() {
    const {
      t,
      companyInfo,
      previous,
    } = this.props;
    const { note, data } = this.state;
    const duration = localStorage.getItem('duration');
    return (
      <div className="form-wizard-content">
        <Row>
          {this.renderForm(row, t)}
        </Row>
        <Row>
          {this.renderForm(forms, t)}
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
              <EditableTable
                columns={this.columns}
                data={data}
                className=""
                defaultPageSize={MAX_ROW}
                condition={condition} // which row needs to editable
                pageSize={MAX_ROW}
                handleChange={this.handleTableInputChange}
              />
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
              className="btn-shadow btn-wide float-left btn-hover-shine"
              onClick={previous}
            >
              {t('Back')}
            </Button>
            <Button
              style={{ backgroundColor: '#f49100', border: '0px transparent' }}
              className="btn-wide btn-shadow float-right btn-hover-shine"
              onClick={this.createSalesDebounce}
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
  translateWrapper('Input Planning'),
  CompanyWrapper,
  connect(mapStateToProps),
)(Sales);

Sales.propTypes = {
  t: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  previous: PropTypes.func.isRequired,
  tabKey: PropTypes.number.isRequired,
  nextTab: PropTypes.func.isRequired,
  simulationInfo: PropTypes.object,
  companyInfo: PropTypes.object,
};

Sales.defaultProps = {
  simulationInfo: {},
  companyInfo: {},
};
