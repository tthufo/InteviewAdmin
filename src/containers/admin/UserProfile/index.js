import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardHeader, Row, Button, Col, FormGroup,
} from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import { toast } from 'react-toastify';
import Loader from 'react-loaders';
import { cloneDeep, debounce } from 'lodash';
import API from '../../../apis/admin';
import Validation from '../../../components/Form/validation';
import { Form, UploadImage } from '../../../components';
import template from './template';
import PageTitle from '../../../Layout/AppMain/PageTitle';

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      forceValidate: false,
      disableSubmit: false,
      loading: false,
    };
    this.submitDebounce = debounce(this.submit.bind(this), 500);
    this.resetPasswordDebounce = debounce(this.resetPassword.bind(this), 500);
    this.deActiveDebounce = debounce(this.deActive.bind(this), 500);
    this.activeDebounce = debounce(this.active.bind(this), 500);
    this.get = this.get.bind(this);
  }

  async componentDidMount() {
    await this.get();
  }

  async deActive() {
    const { match: { params: { id } }, t } = this.props;
    this.setState({ loading: true });
    try {
      await API.managerment.deActive(id);
      await this.get();
      this.setState({ loading: false });
      toast.success(t('Deactive successfully!.'), {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async active() {
    const { match: { params: { id } }, t } = this.props;
    this.setState({ loading: true });
    try {
      await API.managerment.active(id);
      await this.get();
      this.setState({ loading: false });
      toast.success(t('active successfully!.'), {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword() {
    const { match: { params: { id } }, t } = this.props;
    this.setState({ loading: true });
    try {
      await API.managerment.resetPassword(id);
      await this.get();
      this.setState({ loading: false });
      toast.success(t('Reset password successfully!.'), {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async get() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    try {
      const result = await API.user.get(id);
      const { data } = result;
      this.setState(prev => ({
        ...prev,
        item: {
          ...prev.item,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          status: data.status,
          profile_image: data.profileImage,
        },
        loading: false,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async submit() {
    const { match: { params: { id } }, t } = this.props;
    const { item } = this.state;
    this.setState({ forceValidate: true });
    if (Validation.isValidated(template(t).validators)(item)) {
      this.setState({ loading: true });
      try {
        const form_data = new FormData();
        const profile_image = item && item.profile_image;
        if (typeof profile_image === 'string') {
          const newItem = cloneDeep(item);
          newItem.profile_image = undefined;
          await API.user.set(id, newItem);
        } else {
        // eslint-disable-next-line
      for (const key in item) {
            form_data.append(key, item[key]);
          }
          await API.user.set(id, form_data);
        }
        this.setState({ loading: false });
        toast.success(t('Update successful!.'), {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
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
    const {
      item,
      forceValidate,
      disableSubmit,
      item: { profile_image },
      loading,
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
            heading={t('Edit User Information')}
            subheading={t('Update or disable login account')}
            icon="pe-7s-user"
          />
          <div style={{ opacity: loading ? 0.5 : 1, display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '60%' }} className="main-card mb-3">
              <CardHeader className="card-header-lg">
                <div
                  className="card-header-title font-size-lg text-capitalize font-weight-normal"
                >
                  {t('my-profile-admin')}
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
                        avatarUrl={profile_image}
                        t={t}
                        onChange={img => this.setState(prev => ({
                          ...prev,
                          item: {
                            ...prev.item,
                            profile_image: img,
                          },
                        }))}
                      />
                    </row>
                  </Col>
                  <Col xs={6}>
                    {!profile_image && (
                    <div style={{ justifyContent: 'center', lineHeight: '6' }}>
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
                      { loading && (
                      <div style={{ marginLeft: '18%', position: 'fixed' }}>
                        <div
                          className="loader-wrapper d-flex justify-content-center align-items-center"
                        >
                          <Loader color="#1D3B6C" type="ball-pulse-rise" />
                        </div>
                      </div>
                      )
                      }
                    </Row>
                  </div>
                </Row>
                {
                  item.status !== 'unverified' && (
                  <Row>
                    <Col xl={4}>
                      {item.status === 'disabled'
                        ? (
                          <Button
                            onClick={this.activeDebounce}
                            size="sm"
                            className="mr-2"
                            color="link"
                          >
                            {t('Enable account')}

                          </Button>
                        )
                        : (
                          <Button
                            onClick={this.deActiveDebounce}
                            size="sm"
                            className="mr-2"
                            color="link"
                          >
                            {t('Disable account')}
                          </Button>
                        )
                    }
                    </Col>
                    <Col xl={4}>
                      <Button
                        onClick={this.resetPasswordDebounce}
                        size="sm"
                        className="mr-2"
                        color="link"
                      >
                        {t('Reset password')}

                      </Button>
                    </Col>
                  </Row>
                  )
                }
              </CardBody>
            </Card>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
export default translateWrapper('my-profile')(index);

index.propTypes = {
  t: PropTypes.bool,
  match: PropTypes.object,
};

index.defaultProps = {
  t: null,
  match: null,
};
