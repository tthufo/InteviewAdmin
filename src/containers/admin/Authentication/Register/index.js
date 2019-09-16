import {
  Col, Row, Button, FormGroup, Label, Input,
} from 'reactstrap';
import React, { Fragment, PureComponent } from 'react';
import { translateWrapper } from 'ter-localization';

class RegisterBoxed extends PureComponent {
  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <div className="h-100 bg-premium-dark">
          <div className="d-flex h-100 justify-content-center align-items-center">
            <Col md="8" className="mx-auto app-login-box">
              <div className="app-logo-inverse mx-auto mb-3" />
              <div className="modal-dialog w-100">
                <div className="modal-content">
                  <div className="modal-body">
                    <h5 className="modal-title">
                      <h4 style={{ textAlign: 'center' }} className="mt-2">
                        <div>{t('welcome')}</div>
                      </h4>
                    </h5>
                    <Row className="divider" />
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Input
                            type="text"
                            name="text"
                            id="exampleName"
                            placeholder={t('first-name')}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Input
                            type="text"
                            name="text"
                            id="exampleName"
                            placeholder={t('last-name')}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                          <Input
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder={t('email')}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Input
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder={t('password')}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Input
                            type="password"
                            name="passwordrep"
                            id="examplePasswordRep"
                            placeholder={t('passwordrep')}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup className="mt-3" check>
                      <Input type="checkbox" name="check" id="exampleCheck" />
                      <Label for="exampleCheck" check>
                        {t('accept-our')}
                        <a href="javascript:void(0);">
                          {t('terms-and-conditions')}
                        </a>
                      </Label>
                    </FormGroup>
                    <Row className="divider" />
                    <FormGroup className="mt-3">
                      {t('already-have-an-Account?')}
                      {' '}
                      {' '}
                      <a href="javascript:void(0);" className="text-primary">{t('sign-in-now')}</a>
                    </FormGroup>
                  </div>
                  <div className="modal-footer d-block text-center">
                    <Button
                      style={{ backgroundColor: '#f49100', border: '0px transparent' }}
                      className="btn-wide btn-pill btn-shadow btn-hover-shine"
                      size="lg"
                    >
                      {t('create-account')}
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

export default translateWrapper('register')(RegisterBoxed);
