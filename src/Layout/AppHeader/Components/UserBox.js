import React from 'react';
import { translateWrapper } from 'ter-localization';
import { connect } from 'react-redux';
import {
  DropdownToggle, DropdownMenu,
  Button,
  UncontrolledButtonDropdown,
} from 'reactstrap';

import {
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import API from '../../../apis/index';
import { deleteSimulation, deleteCompany } from '../../../actions/Company/index';
import { logout } from '../../../actions/User/index';
import { UserWrapper, CompanyWrapper } from '../../../components';
import service from '../../../service';
import city3 from '../../../assets/utils/images/dropdown-header/city3.jpg';
import './index.css';

class UserBox extends React.Component {
  constructor(props) {
    super(props);
    // this.logout = this.logout.bind(this);
    this.state = {
      item: {},
      avatarUrl: 'https://dl.dropboxusercontent.com/s/puqlribtwkkzmg2/nexus-frontier-tech-logo.png',
    };
    // this.refreshNotificationService = this.refreshNotificationService.bind(this);
  }

  // componentWillMount() {
  //   service.addListener(this.refreshNotificationService);
  // }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.getProfile();
  //   }, 500);
  // }

  // componentWillUnmount() {
  //   service.removeListener(this.refreshNotificationService);
  // }

  // async getProfile() {
  //   try {
  //     const admin = (window.location.href).includes('admin');
  //     let result = null;
  //     if (admin) {
  //       try {
  //         result = await API.accountAdmin.getMyProfile();
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       try {
  //         result = await API.account.getMyProfile();
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     const data = result && result.data;
  //     if (data) {
  //       this.setState({
  //         item: {
  //           firstName: data.firstName,
  //           lastName: data.lastName,
  //           email: data.email,
  //         },
  //         avatarUrl: data.avatarUrl,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // refreshNotificationService() {
  //   this.getProfile();
  // }

  // logout() {
  //   const {
  //     history, remove, dispatchDeleteCompany,
  //     dispatchDeleteSimulation, dispatchLogout,
  //   } = this.props;
  //   const admin = (window.location.href).includes('admin');
  //   remove(admin ? 'userInfo_admin' : 'userInfo_user');
  //   dispatchDeleteCompany();
  //   dispatchDeleteSimulation();
  //   dispatchLogout();
  //   if (admin) {
  //     history.push('/admin/login');
  //   } else { history.push('/users/login'); }
  // }

  render() {
    const {
      history, initialSetting, t,
    } = this.props;
    const { item, avatarUrl } = this.state;
    return (
      <div style={{ flex: 1, display: 'flex' }}>
        <div
          style={{
            margin: 'auto auto auto 0',
          }}
        />
        <div className="header-btn-lg">
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left">
                <img
                  src={avatarUrl}
                  alt="Nexus"
                />
                {/* <UncontrolledButtonDropdown> */}
                {/* <DropdownToggle color="link" className="p-0">
                    <img
                      style={{
                        objectFit: 'cover',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                      }}
                      className="rounded-circle"
                      src={avatarUrl}
                      alt=""
                    />
                    <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} />
                  </DropdownToggle> */}
                <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                  <div style={{ height: 90 }} className="dropdown-menu-header">
                    <div style={{ height: 115, borderRadius: 2 }} className="dropdown-menu-header-inner bg-info">
                      <div
                        className="menu-header-image opacity-2"
                        style={{
                          height: '100%',
                          backgroundImage: `url(${city3})`,
                        }}
                      />
                      <div className="menu-header-content text-left">
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left mr-3">
                              {avatarUrl && (
                              <img
                                    style={{
                                      objectFit: 'cover',
                                      borderRadius: 30,
                                      width: 60,
                                      height: 60,
                                    }}
                                    className="rounded-circle"
                                    src={avatarUrl}
                                    alt=""
                                  />
                              )
                                  }
                            </div>
                            <div className="widget-content-left">
                              <div style={{ width: 140 }} className="widget-heading wrap-break-all">
                                {item.lastName}
                                {' '}
                                {item.firstName}
                              </div>
                            </div>
                            <div className="widget-content-right mr-2">
                              <Button
                                className="btn-pill btn-shadow btn-shine"
                                color="focus"
                                onClick={this.logout}
                              >
                                {t('Logout')}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenu>
                {/* </UncontrolledButtonDropdown> */}
              </div>
              <div className="widget-content-left  ml-3 header-user-info">
                <div className="widget-heading">
                  <text style={{ color: 'white' }}>
                    {item.lastName}
                    {' '}
                    {item.firstName}
                  </text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    simulationInfo: state.companyInfo.get('simulation'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchDeleteSimulation: () => dispatch(deleteSimulation()),
    dispatchDeleteCompany: () => dispatch(deleteCompany()),
    dispatchLogout: () => dispatch(logout()),
  };
}

export default
CompanyWrapper(UserWrapper(withRouter(connect(mapStateToProps, mapDispatchToProps)(translateWrapper('route')(UserBox)))));
