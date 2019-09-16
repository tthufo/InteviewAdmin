
import React, { Fragment, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PropTypes from 'prop-types';
import {
  Card, CardBody, CardHeader, Row, Button, Col, FormGroup,
} from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import Loader from 'react-loaders';
import { toast } from 'react-toastify';
import Validation from '../../../../components/Form/validation';
import { Form, UploadImage } from '../../../../components';
import template from './template';
import API from '../../../../apis';
import UserWrapper from '../../../../components/UserWrapper';
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import './index.scss';
import { setCompany as setCompanyAction, setSimulation } from '../../../../actions/Company/index';
import { setUser as setUserAction } from '../../../../actions/User';
import { getCompany } from '../../../../apis/company';
import service from '../../../../service';

const formatNumber = num => num && num.toString().split(',').join('');
class index extends Component {
  translationGroup='my-profile'

  constructor(props) {
    super(props);
    this.state = {
      item: {},
      forceValidate: false,
      disableSubmit: false,
      opacity: 0.1,
      isSet: false,
    };
    this.get = this.get.bind(this);
    this.submit = this.submit.bind(this);
    this.submitDebounce = _.debounce(this.submit, 500);
  }

  componentDidMount() {
    const { t } = this.props;
    const item = {};
    template(t).elements.map((e) => {
      item[e.input_key] = (e && e.defaultValue && e.defaultValue.value) || (e && e.defaultValue);
      return e;
    });
    this.setState({ item });
    this.get();
  }

  async getAPICompany() {
    const handleSuccess = (data) => {
      if (data.data && data.data.simulation && data.data.simulation.duration) {
        localStorage.setItem('duration', data.data.simulation.duration);
      }
      const {
        dispatchSetCompany,
        dispatchSetSimulation,
      } = this.props;
      dispatchSetCompany(data.data);
      dispatchSetSimulation(data.data.simulation);
    };
    try {
      const data = await getCompany();
      handleSuccess(data);
    } catch (error) {
      handleSuccess(error.response);
    }
  }

  async get() {
    const { getID } = this.props;
    const id = getID();
    this.setState({ opacity: 0.1, active: true, isSet: true });
    try {
      const result = await API.companySetting.get(id);
      const { data } = result;
      this.setState(prev => ({
        ...prev,
        opacity: 1,
        active: false,
        item: {
          ...prev.item,
          name: data.name,
          representatives: data.representatives,
          head_office_address: data.headOfficeAddress || '',
          capital_amount: data.capitalAmount,
          capital_reserve_ratio: data.capitalReserveRatio,
          country_code: data.countryCode,
          foundation_date: Number(data.foundationDate),
          tax_ross_carry_limit: data.taxRossCarryLimit,
          tax_rate_id: data.taxRateId,
          financial_year_end_month: data.financialYearEndMonth,
          display_amount_type: data.displayAmountType,
          start_year: Number(data.startYear) || new Date().getFullYear(),
          language: data.language || prev.item.language,
          currency_code: data.currencyCode || prev.item.currency_code,
          logoImageUrl: data.logoImageUrl,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async submit() {
    const { t } = this.props;
    const { item } = this.state;
    this.setState({ forceValidate: true });
    if (Validation.isValidated(template(t).validators)(item)) {
      this.setState({ disableSubmit: true });
      if (item && !item.capital_reserve_ratio) {
        item.capital_reserve_ratio = 0;
        console.log('112312321');
      }
      item.capital_amount = formatNumber(item.capital_amount);
      console.log(item);
      try {
        const formData = new FormData();
        // eslint-disable-next-line
        for (const key in item) {
          if (item[key] || item[key] === '' || item[key] === 0) { formData.append(key, item[key]); }
        }
        const result = await API.companySetting.edit(formData);
        if (result && result.data) {
          this.setState({ disableSubmit: false });
          toast.success(t('company-setting-susscessed'), {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          await this.getAPICompany();
          service.setActions();
        }
      } catch (error) {
        this.setState({ disableSubmit: false });
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
  }


  render() {
    const {
      item, forceValidate, item: { logoImageUrl, logo_image_file }, disableSubmit, opacity, active,
    } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <PageTitle
          heading={t('Company setting')}
          subheading={t('description company setting')}
          icon="pe-7s-config"
          rightSubheading={t('Company setting')}
        />
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '60%', opacity }} className="main-card mb-3">
              <CardHeader className="card-header-lg">
                <div
                  className="card-header-title font-size-lg text-capitalize font-weight-normal"
                >
                  {t('company-profile-and-setting')}
                </div>
                <div className="btn-actions-pane-right">
                  <Button
                    onClick={this.get}
                    size="sm"
                    className="mr-2"
                    color="link"
                    style={{ color: '#1D3B6C' }}
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    size="lg"
                    disabled={disableSubmit}
                    onClick={this.submitDebounce}
                    style={{ backgroundColor: '#f49100', border: '0px transparent' }}
                    className="btn-wide btn-shadow btn-hover-shine"
                  >
                    {t('save')}
                  </Button>
                </div>
              </CardHeader>
              <CardBody style={{ marginLeft: 15 }}>
                <FormGroup row>
                  <Col xs={4}>
                    <row style={{ textAlign: 'center' }}>
                      <UploadImage
                        style={{ width: 130, height: 35 }}
                        t={t}
                        rectangle
                        avatarUrl={logoImageUrl}
                        onChange={(img) => {
                          this.setState(prev => ({
                            ...prev,
                            item: {
                              ...prev.item,
                              logoImageUrl: img,
                              logo_image_file: img,
                            },
                          }));
                        }}
                      />
                    </row>
                  </Col>
                  <Col xs={6}>
                    {(!logoImageUrl || logoImageUrl === null) && (
                    <div style={{ justifyContent: 'center', lineHeight: '3' }}>
                      {t('not-selected-yet')}
                    </div>
                    )}
                  </Col>
                </FormGroup>
                <Row form>
                  <div>
                    <Row style={{ margin: 10 }} form>
                      <Form
                        template={template(t)}
                        value={item}
                        onChange={(key, value) => {
                          this.setState(prev => ({
                            ...prev,
                            item: {
                              ...prev.item,
                              [key]: value,
                            },
                          }));
                        }}
                        validationResult={Validation.validate(template(t).validators)(item)}
                        forceValidate={forceValidate}
                      />
                    </Row>
                  </div>
                </Row>
              </CardBody>
            </Card>
            {active && (
            <div style={{ position: 'fixed' }}>
              <div
                className="loader-wrapper d-flex justify-content-center align-items-center"
              >
                <Loader color="#1D3B6C" type="ball-pulse-rise" />
              </div>
            </div>
            )}
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}


function mapStateToProps(state) {
  return {
    simulationInfo: state.companyInfo.get('simulation'),
    companyInfo: state.companyInfo.get('company'),
  };
}

const mapDispatchToProps = dispatch => ({
  dispatchSetCompany: value => dispatch(setCompanyAction(value)),
  dispatchSetSimulation: value => dispatch(setSimulation(value)),
  dispatchSetUserAction: value => dispatch(setUserAction(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserWrapper(translateWrapper('company-setting')(index)));

index.propTypes = {
  t: PropTypes.bool,
  dispatchSetCompany: PropTypes.func,
  dispatchSetSimulation: PropTypes.func,
  getID: PropTypes.func,
};

index.defaultProps = {
  t: null,
  dispatchSetCompany: null,
  dispatchSetSimulation: null,
  getID: null,
};
