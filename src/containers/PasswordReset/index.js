import React, { Fragment } from 'react';
import {
  Row, Col, Button, Form,
} from 'reactstrap';
import Slider from 'react-slick';
import { translateWrapper } from 'ter-localization';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {
  withRouter,
} from 'react-router-dom';
import bg1 from '../../assets/utils/images/originals/Login-Slider01.png';
import bg2 from '../../assets/utils/images/originals/Login-Slider02.png';
import bg3 from '../../assets/utils/images/originals/Login-Slider03.png';
import { Form as FormInput } from '../../components';
import template from './template';
import Validation from '../../components/Form/validation';
import { CLIENT_ID, CLIENT_SECRET, URL } from '../../config';

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      forceValidate: false,
      isValidatedLink: false,
    };
    this.submit = this.submit.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
  }

  async componentDidMount() {
    this.verifyToken();
  }

  async verifyToken() {
    const {
      match: { params: { token } },
      history,
    } = this.props;
    try {
      const axiosSetUp = {
        url: '/api/v1/reset-password/check-token',
        data: {
          token,
        },
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        method: 'post',
      };
      await axios(axiosSetUp);
      this.setState({ isValidatedLink: true });
    } catch (error) {
      history.push('/error-password');
    }
  }

  async submit(e) {
    e.preventDefault();
    const { t } = this.props;
    const { item } = this.state;
    this.setState({ forceValidate: true });
    if (Validation.isValidated(template(t).validators)(item)) {
      const {
        match: { params: { token } },
        history,
      } = this.props;
      axios.defaults.baseURL = URL;
      try {
        const axiosSetUp = {
          url: '/api/v1/reset-password',
          data: {
            token,
            ...item,
          },
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          method: 'post',
        };
        await axios(axiosSetUp);
        history.push('/');
        toast.success(t('reset password susscessfully!'), {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    const { t } = this.props;
    const { forceValidate, item, isValidatedLink } = this.state;
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
    if (isValidatedLink) {
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
                  <h4 className="mb-0">
                    {t('Reset Password')}
                  </h4>
                  <h6 className="mt-3">
                    {t('Remember your password ?')}
                    {' '}
                    <a href="/" className="text-primary">{t('Sign in now')}</a>
                  </h6>
                  <Row className="divider" />
                  <div>
                    <Form onSubmit={this.submit}>
                      <FormInput
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
                      <div className="d-flex align-items-center">
                        <div className="ml-auto">
                          <Button
                            onClick={this.submit}
                            style={{ backgroundColor: '#f49100', border: '0px transparent' }}
                            className="btn-wide btn-shadow btn-hover-shine"
                            size="lg"
                          >
                            {t('submit')}
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </div>
                </Col>
              </Col>
            </Row>
            <ToastContainer
              position="top-center"
              autoClose={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
            />
          </div>
        </Fragment>
      );
    } return <div />;
  }
}

export default withRouter(translateWrapper('Login')(PasswordReset));
