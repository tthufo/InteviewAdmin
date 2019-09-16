import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Row, Col,
  Card, CardBody,
  CardTitle, Container,
} from 'reactstrap';
import DoughnutExample from '../doughnut';
import PieExample from '../pie';
import DynamicDoughnutExample from '../dynamicDoughnut';
import RadarExample from '../radar';
import PolarExample from '../polar';


export default class ChartJsCircular extends React.Component {
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
              <Col lg="6">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Doughnut</CardTitle>
                    <DoughnutExample />
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Dynamic Doughnut Chart</CardTitle>
                    <DynamicDoughnutExample />
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Radar Chart</CardTitle>
                    <RadarExample />
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Polar Chart</CardTitle>
                    <PolarExample />
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Pie Chart</CardTitle>
                    <PieExample />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
