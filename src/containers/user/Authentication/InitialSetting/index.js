import React, { Fragment, Component } from 'react';
import {
  Col, Row, Button,
} from 'reactstrap';
import './index.css';
import { translateWrapper } from 'ter-localization';
import { connect } from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import template from './template';
import { Form } from '../../../../components';
import Validation from '../../../../components/Form/validation';
import API from '../../../../apis';
import { setCompany as setCompanyAction, setSimulation } from '../../../../actions/Company/index';
import { getCompany } from '../../../../apis/company';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      forceValidate: false,
    };
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { t } = this.props;
    const item = {};
    template(t).elements.map((e) => {
      item[e.input_key] = (e && e.defaultValue && e.defaultValue.value) || (e && e.defaultValue);
      return e;
    });
    this.setState({ item });
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

  async submit() {
    const { history, t } = this.props;
    const { item } = this.state;
    if (item && !item.capital_reserve_ratio) {
      item.capital_reserve_ratio = 0;
    }
    this.setState({ forceValidate: true });
    if (Validation.isValidated(template(t).validators)(item)) {
      try {
        const result = await API.companySetting.add(item);
        await this.getAPICompany();
        if (result && result.data) {
          history.push('/users');
        }
      } catch (error) {
        alert(error);
      }
    }
  }

  render() {
    const { t } = this.props;
    const { item, forceValidate } = this.state;
    return (
      <Fragment>
        <div style={{ paddingTop: 80, paddingBottom: 80 }} className="grad">
          <div className="d-flex h-300 justify-content-center align-items-center">
            <Col md="7" className="mx-auto app-login-box">
              <div className="logo-src__white mx-auto mb-3" />
              <div style={{ maxWidth: 1000 }} className="modal-dialog w-200">
                <div className="modal-content">
                  <div className="modal-body">
                    <Row style={{ justifyContent: 'center' }} form>
                      <h5 style={{ marginLeft: 15 }} className="modal-title">
                        <h3 className="mt-2">
                          <div>{t('initial-setting')}</div>
                        </h3>
                      </h5>
                    </Row>
                    <Row form>
                      <Form
                        template={template(t)}
                        value={item}
                        onChange={(key, value) => {
                          this.setState(prev => ({
                            ...prev,
                            item: {
                              ...prev.item,
                              [key]: key === 'capital_reserve_ratio' ? (value || 0) : value,
                              [key]: key === 'capital_amount' ? (value && value.split(',').join('')) : value,
                            },
                          }));
                        }}
                        validationResult={Validation.validate(template(t).validators)(item)}
                        forceValidate={forceValidate}
                      />
                    </Row>
                  </div>
                  <div className="modal-footer d-block text-center">
                    <Button
                      style={{ backgroundColor: '#f49100', border: '0px transparent' }}
                      className="btn-wide btn-shadow btn-hover-shine"
                      size="lg"
                      onClick={this.submit}
                    >
                      {t('confirm')}
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    simulationInfo: state.companyInfo.get('simulation').toJS(),
    companyInfo: state.companyInfo.get('company').toJS(),
  };
}

const mapDispatchToProps = dispatch => ({
  dispatchSetCompany: value => dispatch(setCompanyAction(value)),
  dispatchSetSimulation: value => dispatch(setSimulation(value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translateWrapper('initial-setting')(index)));
