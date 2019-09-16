import React from 'react';
import {
  Row, Col,
  FormGroup, Label, Input,
  CustomInput,
  Button,
} from 'reactstrap';
import * as _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { translateWrapper, LocalizationComponent } from 'ter-localization';
import './index.scss';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { UserWrapper } from '../../../components';
import InputComponent from '../../../components/FormGroup/Input';
import { forms } from './form';
import { setCompany, setSimulation } from '../../../actions/Company/index';
import { postBasicInfo, updateBasicInfo, getCompany } from '../../../apis/simulation-setting/basic-info';

class BasicInfo extends LocalizationComponent { //eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      business_name: '',
      company_id: 1,
      business_type: 'retail',
      revenue_model_type: 'product_sales',
      duration: '3',
      sale_design_type: 'manually',
      errors: [],
      openModal: false,
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.getCompany = this.getCompany.bind(this);
    this.createBasicInfo = this.createBasicInfo.bind(this);
    this.createBasicInfoDebounce = _.debounce(this.createBasicInfo, 500);
    this.resetState = this.resetState.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const { match, simulationInfo: { id } } = this.props;
    if (match.params && match.params.id) {
      this.getCompany(match.params.id);
    } else if (id) {
      this.getCompany(id);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getCompany(id) {
    try {
      const company = await getCompany(id || '');
      const companyInfo = company.data;
      if (companyInfo.simulation !== undefined) {
        const data = companyInfo.simulation;
        this.setState({
          business_name: data.businessName,
          company_id: data.companyId,
          business_type: data.businessType,
          revenue_model_type: data.revenueModelType,
          duration: data.duration.toString(),
          sale_design_type: 'manually',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createBasicInfo() {
    try {
      const { next } = this.props;
      const { simulationInfo: { id } } = this.props;
      const data = id
        ? await updateBasicInfo(id, this.state) : await postBasicInfo(this.state);
      this.setState({
        openModal: true,
      }, () => {
        localStorage.setItem('duration', data.data.duration);
        this.resetState(next);
      });
      await this.getAPICompany();
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

  async getAPICompany() {
    const handleSuccess = (data) => {
      if (data.data && data.data.simulation && data.data.simulation.duration) {
        localStorage.setItem('duration', data.data.simulation.duration);
      }
      const {
        dispatchSetCompany, dispatchSetSimulation,
      } = this.props;
      dispatchSetCompany(data.data);
      dispatchSetSimulation(data.data.simulation);
    };
    try {
      const data = await getCompany();
      // set duration to localstorage
      handleSuccess(data);
    } catch (error) {
      handleSuccess(error.response);
    }
  }

  resetState(callback) {
    this.setState({
      business_name: '',
      company_id: 1,
      business_type: 'retail',
      revenue_model_type: 'product_sales',
      duration: 3,
      sale_design_type: '',
      errors: [],
    }, () => {
      if (callback) {
        callback();
      }
    });
  }

  handleChangeInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  toggle() {
    this.setState(prev => ({
      openModal: !prev.openModal,
    }));
  }

  render() {
    const { t } = this.props;
    const {
      errors,
    } = this.state;
    return (
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="form-wizard-content">
          <Row>
            <Col lg={6}>
              <FormGroup>
                <h4>
                  {t('Business Setting')}
                </h4>
              </FormGroup>
            </Col>
          </Row>
          {
          forms.map((form) => {
            if (form.options) {
              const { [form.name]: value } = this.state;
              return (
                <Row>
                  <Col lg={6}>
                    <FormGroup>
                      { form.title
                        ? (
                          <FormGroup>
                            <h4>
                              {t(form.title)}
                            </h4>
                          </FormGroup>
                        ) : null
                      }
                      <Label>
                        <b>{t(form.label)}</b>
                        {' '}
                        <span className="coming_soon">
                         *
                          {' '}
                          {t(form.secondLabel)}
                        </span>
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
                          />
                        )
                      }
                      { form.description
                        ? (
                          <Label style={{ marginTop: 5 }}>
                            <b>{t(form.description)}</b>
                          </Label>
                        ) : null
                      }
                      {
                        form.type === 'checkbox' && (
                          <CustomInput
                            type="checkbox"
                            label={t('Want to create 12 month simulation')}
                            disabled
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
                                />
                              ))
                            }
                          </React.Fragment>
                        )
                      }
                    </FormGroup>
                  </Col>
                </Row>
              );
            }
            const { [form.name]: value } = this.state;
            return (
              <Row>
                <Col lg={6}>
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
                      placeholder={t(form.placeholder)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            );
          })
        }
          <Row>
            <Col lg={6}>
              <FormGroup>
                <Row>
                  <Col lg={12}>
                    <Label>
                      <b>
                        {t('Auto Growth rate')}
                      </b>
                      {' '}
                      <span className="coming_soon">
                        *
                        {t('Coming soon')}
                      </span>
                    </Label>
                  </Col>
                  <Col lg={12}>
                    <Input type="text" disabled />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </Row>
          <div className="clearfix">
            <div>
              <Button
                style={{ backgroundColor: '#f49100', border: '0px transparent' }}
                className="btn-shadow btn-wide float-right btn-hover-shine"
                onClick={this.createBasicInfoDebounce}
              >
                {t('Next')}
              </Button>
            </div>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

function mapStateToProps(state) {
  return {
    simulationInfo: state.companyInfo.get('simulation').toJS(),
  };
}

const mapDispatchToProps = dispatch => ({
  dispatchSetCompany: value => dispatch(setCompany(value)),
  dispatchSetSimulation: value => dispatch(setSimulation(value)),
});


export default compose(
  translateWrapper('BasicInfo'),
  UserWrapper,
  connect(mapStateToProps, mapDispatchToProps),
)(BasicInfo);

BasicInfo.propTypes = {
  t: PropTypes.func.isRequired,
  dispatchSetCompany: PropTypes.func.isRequired,
  dispatchSetSimulation: PropTypes.func.isRequired,
};
