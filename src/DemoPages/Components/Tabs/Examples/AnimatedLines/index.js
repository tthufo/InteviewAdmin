import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Tabs from 'react-responsive-tabs';

import {
  Row, Col,
  Card, Container,
} from 'reactstrap';

import dummyData from '../dummyData';

export default class AnimatedLinesTabsExample extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      showMore: true,
      transform: true,
      showInkBar: true,
      items: this.getSimpleTabs(),
      selectedTabKey: 0,
      transformWidth: 400,
    };
  }

    getSimpleTabs = () => dummyData.map(({ name, biography }, index) => ({
      key: index,
      title: name,
      getContent: () => biography,
    }));

    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab,
        });
      }
    }

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
            <Container fluid>
              <Row>
                <Col md="12">
                  <Card className="mb-3 card-tabs card-tabs-animated">
                    <Tabs tabsWrapperClass="card-header" {...this.state} />
                  </Card>
                  <Card className="mb-3 card-tabs text-white card-border" color="focus">
                    <Tabs tabsWrapperClass="card-header" {...this.state} />
                  </Card>
                  <Card className="mb-3 card-tabs">
                    <Tabs tabsWrapperClass="card-header" {...this.state} />
                  </Card>
                  <div className="mb-3">
                    <Tabs tabsWrapperClass="body-tabs" {...this.state} />
                  </div>
                </Col>
              </Row>
            </Container>
          </ReactCSSTransitionGroup>
        </Fragment>
      );
    }
}
