import React, { Component, Fragment } from 'react';
import {
  Button,
  Row, Col, TabContent, TabPane, ButtonGroup, ListGroup, ListGroupItem,
  Card, CardBody, CardFooter,
} from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
  faAngleUp,
  faAngleDown,
  faDotCircle,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import avatar1 from '../../../../assets/utils/images/avatars/1.jpg';
import avatar5 from '../../../../assets/utils/images/avatars/5.jpg';
import avatar3 from '../../../../assets/utils/images/avatars/4.jpg';
import avatar4 from '../../../../assets/utils/images/avatars/3.jpg';
import avatar2 from '../../../../assets/utils/images/avatars/8.jpg';
import avatar6 from '../../../../assets/utils/images/avatars/2.jpg';
import avatar9 from '../../../../assets/utils/images/avatars/9.jpg';

import bg1 from '../../../../assets/utils/images/dropdown-header/abstract1.jpg';
import bg2 from '../../../../assets/utils/images/dropdown-header/city2.jpg';
import bg3 from '../../../../assets/utils/images/dropdown-header/city4.jpg';


class ProfileBlocks extends Component {
  render() {
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
          <div>
            <Row>
              <Col md="6" lg="4">
                <Card className="mb-3 profile-block">
                  <div className="dropdown-menu-header">
                    <img src={bg1} className="profile-blur opacity-10" />
                    <div className="profile-inner bg-warning opacity-5" />
                    <div className="menu-header-content">
                      <div className="avatar-icon-wrapper avatar-icon-lg">
                            <div className="avatar-icon rounded btn-hover-shine mr-0">
                                <img src={avatar3} alt="Avatar 5" />
                              </div>
                          </div>
                      <h5 className="menu-header-title">Jessica Walberg</h5>
                      <div className="menu-header-btn-pane">
                            <Button
                                className="btn-icon btn-pill mr-2 btn-icon-only"
                                color="link"
                              >
                                <i className="lnr-inbox btn-icon-wrapper"> </i>
                              </Button>
                            <Button
                                className="btn-icon btn-pill btn-icon-only"
                                color="link"
                              >
                                <i className="lnr-camera btn-icon-wrapper"> </i>
                              </Button>
                          </div>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col md="6" lg="4">
                <Card className="mb-3 profile-block">
                  <div className="dropdown-menu-header">
                    <img src={bg3} className="profile-blur opacity-9" />
                    <div className="menu-header-content">
                      <div className="avatar-icon-wrapper avatar-icon-lg">
                            <div className="avatar-icon rounded-circle btn-hover-shine mr-0">
                                <img src={avatar4} alt="Avatar 5" />
                              </div>
                          </div>
                      <h5 className="menu-header-title">John Rosenberg</h5>
                      <h6 className="menu-header-subtitle">Short Profile description</h6>
                      <div className="menu-header-btn-pane">
                            <Button
                                className="btn-icon btn-pill mr-2 btn-icon-only"
                                color="link"
                              >
                                <i className="lnr-inbox btn-icon-wrapper"> </i>
                              </Button>
                            <Button
                                className="btn-icon btn-pill btn-icon-only"
                                color="link"
                              >
                                <i className="lnr-camera btn-icon-wrapper"> </i>
                              </Button>
                          </div>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col md="6" lg="4">
                <Card className="mb-3 profile-block">
                  <div className="dropdown-menu-header">
                    <img src={bg2} className="profile-blur opacity-10" />
                    <div className="profile-inner bg-dark opacity-6" />
                    <div className="menu-header-content">
                      <div className="avatar-icon-wrapper avatar-icon-lg">
                            <div className="avatar-icon rounded btn-hover-shine mr-0">
                                <img src={avatar5} alt="Avatar 5" />
                              </div>
                          </div>
                      <h5 className="menu-header-title">Jessica Walberg</h5>
                      <div className="menu-header-btn-pane">
                            <Button
                                className="btn-icon btn-pill mr-2 btn-icon-only"
                                color="link"
                              >
                                <i className="lnr-inbox btn-icon-wrapper"> </i>
                              </Button>
                            <Button
                                className="btn-icon btn-pill btn-icon-only"
                                color="link"
                              >
                                <i className="lnr-camera btn-icon-wrapper"> </i>
                              </Button>
                          </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

export default ProfileBlocks;
