import React, { Fragment, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardHeader, Row, Button, Col, FormGroup,
} from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import * as _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from 'react-loaders';
import Validation from '../../../components/Form/validation';
import { Form, UploadImage } from '../../../components';
import template from './template';
import API from '../../../apis';
import PageTitle from '../../../Layout/AppMain/PageTitle';
import service from '../../../service';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        profile_image: null,
        first_name: '',
        last_name: '',
        email: '',
      },
      forceValidate: false,
      avatarUrl: '',
      disableSubmit: false,
      active: true,
    };
    this.get = this.get.bind(this);
    this.submit = this.submit.bind(this);
    this.submitDebounce = _.debounce(this.submit, 500);
  }

  async componentDidMount() {
    this.get();
  }

  async get() {
    this.setState({ opacity: 0.1, active: true });
    try {
      const result = await API.account.getMyProfile();
      const data = result && result.data;
      if (data) {
        this.setState({
          opacity: 1,
          active: false,
          item: {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
          },
          avatarUrl: data.avatarUrl,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async submit() {
    const { t } = this.props;
    const { item } = this.state;
    if (Validation.isValidated(template(t).validators)(item)) {
      this.setState({ disableSubmit: true });
      try {
        const formData = new FormData();
        // eslint-disable-next-line
      for (const key in item) {
          formData.append(key, item[key]);
        }
        await API.account.updateAccount(formData);
        this.setState({ disableSubmit: false });
        toast.success(t('successed'), {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        service.setActions();
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
      item,
      forceValidate,
      item: { profile_image: profileImage },
      avatarUrl,
      disableSubmit,
      active,
      opacity,
    } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <PageTitle
            heading={t('My Profile')}
            subheading={t('description')}
            icon="pe-7s-user"
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '60%', opacity }} className="main-card mb-3">
              <CardHeader className="card-header-lg">
                <div
                  className="card-header-title font-size-lg text-capitalize font-weight-normal"
                >
                  {t('my-profile')}
                </div>
                <div className="btn-actions-pane-right">
                  <Button
                    onClick={this.get}
                    size="sm"
                    style={{ color: '#1D3B6C' }}
                    className="mr-2"
                    color="link"
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    disabled={disableSubmit}
                    style={{ backgroundColor: '#f49100', border: 'none' }}
                    className="btn-wide btn-shadow btn-hover-shine"
                    onClick={this.submitDebounce}
                    size="lg"
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
                        style={{ width: 100, height: 100 }}
                        avatarUrl={avatarUrl}
                        t={t}
                        onChange={
                          (_profileImage) => {
                            this.setState(prev => ({
                              ...prev,
                              avatarUrl: _profileImage,
                              item: {
                                ...prev.item,
                                profile_image: _profileImage,
                              },
                            }));
                          }}
                      />
                    </row>
                  </Col>
                  <Col xs={4}>
                    <div style={{ justifyContent: 'center', lineHeight: '6' }}>
                      { (avatarUrl || profileImage) ? '' : t('not-selected-yet')}
                    </div>
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
export default withRouter(translateWrapper('my-profile')(index));

index.propTypes = {
  t: PropTypes.bool,
};

index.defaultProps = {
  t: null,
};
