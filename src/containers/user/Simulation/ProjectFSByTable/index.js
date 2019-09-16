import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import {
  TabContent, TabPane, Nav, NavItem, NavLink,
  Row, Col, CardHeader, CardFooter,
  Card, CardBody,
  Container,
} from 'reactstrap';
import { translateWrapper } from 'ter-localization';

import BS from './BS';
import PL from './PL';
import CF from './CF';

class index extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const { t, company, jsUcfirst } = this.props;
    const startYear = company && company.simulation && company.simulation.startYear;
    const simulation = company && company.simulation;
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
          <Container fluid>
            <Row>
              <Col>
                <Card tabs="true" className="mb-3">
                  <CardHeader className="card-header-tab">
                    <Nav style={{ marginLeft: 0 }}>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '1' })}
                          onClick={() => {
                            this.toggle('1');
                          }}
                        >
                          {t('B/S')}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '2' })}
                          onClick={() => {
                            this.toggle('2');
                          }}
                        >
                          {t('P/L')}
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '3' })}
                          onClick={() => {
                            this.toggle('3');
                          }}
                        >
                          {t('C/F')}
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </CardHeader>
                  <CardBody>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <BS
                          company={company}
                          startYear={startYear}
                          jsUcfirst={jsUcfirst}
                          simulation={simulation}
                        />
                      </TabPane>
                      <TabPane tabId="2">
                        <PL
                          company={company}
                          startYear={startYear}
                          jsUcfirst={jsUcfirst}
                          simulation={simulation}
                        />
                      </TabPane>
                      <TabPane tabId="3">
                        <CF
                          company={company}
                          startYear={startYear}
                          jsUcfirst={jsUcfirst}
                          simulation={simulation}
                        />
                      </TabPane>
                    </TabContent>
                  </CardBody>
                  <CardFooter className="d-block text-right" />
                </Card>
              </Col>
            </Row>
          </Container>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

export default translateWrapper('simulation')(index);
