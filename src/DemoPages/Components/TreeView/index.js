import React, { Component, Fragment } from 'react';
import SortableTree from 'react-sortable-tree';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
  Row, Col,
  Card, CardBody,
  CardTitle,
} from 'reactstrap';
import PageTitle from '../../../Layout/AppMain/PageTitle';

import treeData from './Examples/SampleData';


class TreeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData,
    };
  }

  render() {
    return (
      <Fragment>
        <PageTitle
          heading="Tree View"
          subheading="Create stunning tree like views with this awesome React plugin."
          icon="pe-7s-switch icon-gradient bg-plum-plate"
        />
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Row>
            <Col lg="12">
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>
                                        Basic
                  </CardTitle>
                  <div style={{ height: '100vh' }}>
                    <SortableTree
                          treeData={this.state.treeData}
                          onChange={treeData => this.setState({ treeData })}
                        />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

export default TreeView;
