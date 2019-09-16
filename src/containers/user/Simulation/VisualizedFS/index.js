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
import PL from './PL';
import BS from './BS';
import CF from './CF';

const jsUcfirst = string => string && string.charAt(0).toUpperCase() + string.slice(1);

class CardTabsExample extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

    onChangeProp = propsName => (evt) => {
      this.setState({ [propsName]: evt.target.type === 'checkbox' ? evt.target.checked : +evt.target.value });
    };

    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab,
        });
      }
    }

    render() {
      const { company, t, duration } = this.props;
      const { activeTab } = this.state;
      const headerCondition = company && `${company.displayAmountType === 'normal' ? '' : t(`${jsUcfirst(company.displayAmountType)}`)} ${company && company.currencyCode}`;
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
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => {
                              this.toggle('1');
                            }}
                          >
                            {t('B/S')}
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => {
                              this.toggle('2');
                            }}
                          >
                            {t('P/L')}
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: activeTab === '3' })}
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
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                          <BS
                            duration={duration}
                            company={company}
                            jsUcfirst={jsUcfirst}
                            headerCondition={headerCondition}
                          />
                        </TabPane>
                        <TabPane tabId="2">
                          <PL
                            duration={duration}
                            jsUcfirst={jsUcfirst}
                            headerCondition={headerCondition}
                            company={company}
                          />
                        </TabPane>
                        <TabPane tabId="3">
                          <CF
                            duration={duration}
                            jsUcfirst={jsUcfirst}
                            headerCondition={headerCondition}
                            company={company}
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

export default translateWrapper('TabExample')(CardTabsExample);
