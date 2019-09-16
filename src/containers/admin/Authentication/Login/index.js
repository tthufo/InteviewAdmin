import React, { Fragment, Component } from 'react';
import Slider from 'react-slick';
import {
  Col, Row, Button, Form, FormGroup,
} from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import { UserWrapper } from '../../../../components';
import bg1 from '../../../../assets/utils/images/originals/Login-Slider01.png';
import bg2 from '../../../../assets/utils/images/originals/Login-Slider02.png';
import bg3 from '../../../../assets/utils/images/originals/Login-Slider03.png';
import config from '../../../../config';
import CustomForm from '../../../../components/Form';
import Validation from '../../../../components/Form/validation';
import { setCompany as setCompanyAction, setSimulation } from '../../../../actions/Company/index';
import { setUser as setUserAction } from '../../../../actions/User';
import { getCompany } from '../../../../apis/company';
import apis from '../../../../apis/admin';
import './index.scss';

const template1 = t => ({
  validators: [
    Validation.email('email', 'email'),
    Validation.required('email', 'email'),
    Validation.max('email', 'email', 255),
  ],
  elements: [
    {
      type: 'input',
      input_key: 'email',
      title: t('email'),
      colType: true,
      left_col: 12,
      right_col: 12,
      placeholder: t('email'),
      autocomplete: true,
    },
  ],
});

const template2 = t => ({
  validators: [
    Validation.required('password', 'password'),
    Validation.rangeLength('password', 'password', 6, 33),
    Validation.space('password', 'password'),
  ],
  elements: [
    {
      type: 'input',
      input_key: 'password',
      title: t('password'),
      colType: true,
      left_col: 12,
      right_col: 12,
      typeInput: 'password',
      eye: true,
      placeholder: t('password'),
      paddingRight: 30,
    },
  ],
});

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      forceValidate: false,
      error: false,
    };

    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
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
      handleSuccess(data);
    } catch (error) {
      handleSuccess(error.response);
    }
  }

  async submit(e) {
    e.preventDefault();
    const { t, dispatchSetUserAction } = this.props;
    this.setState({ forceValidate: true });
    if (Validation.isValidated(template1(t).validators)(this.state)
      && Validation.isValidated(template2(t).validators)(this.state)) {
      try {
        const {
          save,
          history,
        } = this.props;
        const { email, password } = this.state;
        const { CLIENT_ID: client_id, CLIENT_SECRET: client_secret } = config;
        const result = await apis.auth.login({
          email,
          password,
          client_id,
          client_secret,
        });
        if (result && result.data) {
          save('userInfo_admin', result.data);
          const user = await apis.auth.getMyProfile();
          dispatchSetUserAction(user.data);
          history.push('/admin');
        } else {
          this.setState({ error: true });
        }
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
  }

  render() {
    const { t } = this.props;
    const { forceValidate, error } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      initialSlide: 0,
      autoplay: true,
      adaptiveHeight: true,
    };
    return (
      <Fragment>
        <div className="h-100">
          <Row className="h-100 no-gutters">
            <Col lg="4" className="d-none d-lg-block">
              <div className="slider-light">
                <Slider {...settings}>
                  <div
                    className="h-100 d-flex justify-content-center align-items-center"
                  >
                    <div
                      className="slide-img-bg"
                      style={{
                        backgroundImage: `url(${bg1})`,
                      }}
                    />
                    <div className="slider-content warp-slide">
                      <h3 className="slide-header">{t('SLIDE-1-1')}</h3>
                      <div className="slide-content">
                        {t('SLIDE-1-2').split('.').map(e => <div>{e}</div>)}
                      </div>
                    </div>
                  </div>

                  <div
                    className="h-100 d-flex justify-content-center align-items-center"
                  >
                    <div
                      className="slide-img-bg opacity-6"
                      style={{
                        backgroundImage: `url(${bg2})`,
                      }}
                    />
                    <div className="slider-content warp-slide">
                      <h3 className="slide-header">{t('SLIDE-3-1')}</h3>
                      <div className="slide-content">
                        <p>{t('SLIDE-3-2').split('.').map(e => <div>{e}</div>)}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="h-100 d-flex justify-content-center align-items-center"
                  >
                    <div
                      className="slide-img-bg"
                      style={{
                        backgroundImage: `url(${bg3})`,
                      }}
                    />
                    <div className="slider-content warp-slide">
                      <h3 className="slide-header">{t('SLIDE-2-1')}</h3>
                      <div className="slide-content">
                        {t('SLIDE-2-2').split('.').map(e => <div>{e}</div>)}
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </Col>
            <Col lg="8" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
              <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                <div
                  style={{
                    marginBottom: '1.5rem',
                  }}
                  className="logo-src__black"
                />
                <h6 className="mb-0">
                  <div>
                    {t('welcome-back')}
                  </div>
                  <span>{t('please-sign-in-to-your-account.')}</span>
                </h6>
                <Row className="divider" />
                <div>
                  <Form onSubmit={this.submit}>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <CustomForm
                            template={template1(t)}
                            value={this.state}
                            onChange={(key, value) => {
                              this.setState(prev => ({
                                ...prev,
                                [key]: value,
                                error: null,
                              }));
                            }}
                            validationResult={
                              Validation.validate(template1(t).validators)(this.state)
                            }
                            forceValidate={forceValidate}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <CustomForm
                            template={template2(t)}
                            value={this.state}
                            onChange={(key, value) => {
                              this.setState(prev => ({
                                ...prev,
                                [key]: value,
                                error: null,
                              }));
                            }}
                            validationResult={
                              Validation.validate(template2(t).validators)(this.state)
                            }
                            forceValidate={forceValidate}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {error && (
                      <Row>
                        <div style={{ marginLeft: 20, color: 'red' }}>{t('The email or password is invalid, please try again.')}</div>
                      </Row>
                    )}
                    <Row className="divider" />
                    <div className="d-flex align-items-center">
                      <div className="ml-auto">
                        <Button
                          onClick={this.submit}
                          style={{ backgroundColor: '#f49100', border: '0px transparent' }}
                          className="btn-wide btn-shadow btn-hover-shine"
                          size="lg"
                        >
                          {t('login-to-dashboard')}
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </Col>
            </Col>
          </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserWrapper(translateWrapper('Login')(Login)));
