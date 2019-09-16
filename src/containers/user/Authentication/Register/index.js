/* eslint-disable react/jsx-no-target-blank */
import {
  Col, Row, Button, FormGroup, Label, Input,
} from 'reactstrap';
import React, { Fragment, Component } from 'react';
import { translateWrapper } from 'ter-localization';
import { toast, ToastContainer } from 'react-toastify';
import { Form } from '../../../../components';
import Validation from '../../../../components/Form/validation';
import config from '../../../../config';
import API from '../../../../apis';
import './index.scss';
import template from './teamplate';
import template1 from './teamplate1';

class RegisterBoxed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forceValidate: false,
      isCheck: false,
      item: {},
      errors: {},
      successedModal: false,
      modal: false,
      isSubmit: false,
    };
    this.submit = this.submit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  }

  async submit() {
    this.setState({ forceValidate: true });
    const { isCheck, item } = this.state;
    const { t, history } = this.props;
    if (isCheck && Validation.isValidated(template(t).validators)(item)) {
      this.setState({ isSubmit: true });
      try {
        const { CLIENT_SECRET, CLIENT_ID } = config;
        const params = {
          ...item,
          client_secret: CLIENT_SECRET,
          client_id: CLIENT_ID,
        };
        await API.auth.signUp(params);
        history.push('/users/login');
        toast.success(t('Thank you for your registration. \n Please check your email for activation details.'), {
          position: 'top-center',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        this.setState({ isSubmit: false });
        toast.error(error.response.data.invalidParams.map(p => p.message).join('\n'), {
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
      forceValidate, isCheck, item, isSubmit,
    } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <div className="grad">
          <div className="d-flex h-100 justify-content-center align-items-center">
            <Col md="8" className="mx-auto app-login-box">
              <div className="logo-container">
                <div className="logo-src__white" />
              </div>
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
                      <Form
                        template={document.documentElement.lang === 'ja' ? template1(t) : template(t)}
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
                    <FormGroup className="mt-3" check>
                      <Input
                        onChange={() => this.setState({ isCheck: !isCheck })}
                        type="checkbox"
                        name="check"
                        id="exampleCheck"
                      />
                      <a target="_blank" href="https://www.profinanss.com/terms" htmlFor="exampleCheck">{t('accept-our-1')}</a>
                      <a>{t('accept-our-3')}</a>
                      <a target="_blank" href="https://www.profinanss.com/privacy">{t('accept-our-2')}</a>
                      <a>{t('accept-our-4')}</a>
                    </FormGroup>
                    {!isCheck && forceValidate && (
                    <Row>
                      <small style={{ color: 'red', marginLeft: 15 }}>{t('accept-condition')}</small>
                    </Row>
                    )}
                    <Row className="divider" />
                    <FormGroup className="mt-3">
                      {t('already-have-an-Account?')}
                      <a
                        href="/#/users/login"
                        style={{ color: '1D3B6C' }}
                      >
                        {t('sign-in-now')}
                      </a>
                    </FormGroup>
                  </div>
                  <div className="modal-footer d-block text-center">
                    <Button
                      disabled={isSubmit}
                      style={{ backgroundColor: '#f49100', border: '0px transparent' }}
                      className="btn-wide btn-shadow btn-hover-shine"
                      size="lg"
                      onClick={this.submit}
                    >
                      {t('create-account')}
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
        />
      </Fragment>
    );
  }
}

export default translateWrapper('register')(RegisterBoxed);
