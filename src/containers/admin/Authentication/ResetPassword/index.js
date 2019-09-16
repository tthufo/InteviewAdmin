import React, { Fragment } from 'react';
import Slider from 'react-slick';

import {
  Col, Row, Button, Form, FormGroup, Label, Input,
} from 'reactstrap';
import { translateWrapper, LocalizationComponent } from 'ter-localization';
import bg1 from '../../../../assets/utils/images/originals/Login-Slider01.png';
import bg2 from '../../../../assets/utils/images/originals/Login-Slider02.png';
import bg3 from '../../../../assets/utils/images/originals/Login-Slider03.png';

export class Login extends LocalizationComponent {
  translationGroup = 'Login';

  componentDidMount() {
    super.componentDidMount();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  render() {
    const { t } = this.props;
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
                    <div className="slider-content">
                      <h3>{t('SLIDE-1-1')}</h3>
                      <p>{t('SLIDE-1-2')}</p>
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
                    <div className="slider-content">
                      <h3>{t('SLIDE-2-1')}</h3>
                      <p>{t('SLIDE-2-2')}</p>
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
                    <div className="slider-content">
                      <h3>{t('SLIDE-3-1')}</h3>
                      <p>{t('SLIDE-3-2')}</p>
                    </div>
                  </div>
                </Slider>
              </div>
            </Col>
            <Col lg="8" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
              <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                <div className="app-logo" />
                <h4 className="mb-0">
                  <div>
                    {t('Reset Password')}
                  </div>
                </h4>
                <h6 className="mt-3">
                  {t('Remember your password?')}
                  <a href="/register" className="text-primary">{t('sign-in-now')}</a>
                </h6>
                <Row className="divider" />
                <div>
                  <Form>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail">{t('password')}</Label>
                          <Input
                            type="password"
                            name="password"
                            id="exampleEmail"
                            placeholder={t('password')}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="examplePassword">{t('new password')}</Label>
                          <Input
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder={t('new password')}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="divider" />
                    <div className="d-flex align-items-center">
                      <div className="ml-auto">
                        <Button
                          style={{ backgroundColor: '#f49100', border: '0px transparent' }}
                          size="lg"
                        >
                          {t('Submit')}
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default translateWrapper('forgor-password')(Login);
