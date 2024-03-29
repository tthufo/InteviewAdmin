import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Row, Col,
  Card, CardBody,
  CardTitle,
} from 'reactstrap';

import Gauge from 'react-svg-gauge';

function getHexColor(value) {
  const string = value.toString(16);
  return (string.length === 1) ? `0${string}` : string;
}

export default class ChartsjustGageExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
    };
  }

    onChange = (e) => {
      this.setState({ value: parseInt(e.currentTarget.value, 10) });
    };

    render() {
      const r = Math.floor(this.state.value * 2.55);
      const g = Math.floor(255 - (this.state.value * 2.55));
      const b = 0;
      const colorHex = `#${getHexColor(r)}${getHexColor(g)}${getHexColor(b)}`;
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
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>justGage</CardTitle>
                    <Row className="text-center">
                      <Col md="6" lg="4">
                        <Gauge
                            value={this.state.value} width={200} height={160}
                            color={colorHex} label="Example 1"
                            valueFormatter={value => `${value}%`}
                          />
                      </Col>
                      <Col md="6" lg="4">
                        <Gauge
                            value={this.state.value} width={200} height={160}
                            label="Example 2" color="#3f6ad8"
                          />
                      </Col>
                      <Col md="6" lg="4">
                        <Gauge
                            value={this.state.value}
                            width={200}
                            height={160}
                            label="Example 3"
                            color="#3ac47d"
                            valueFormatter={(value) => {
                                if (value > 80) {
                                  return '😁';
                                }

                                if (value > 20) {
                                  return '😒';
                                }

                                return '😣';
                              }

                                                }
                          />
                      </Col>
                    </Row>
                    <div className="divider" />
                    <div className="text-center">
                      <input
                        type="range" min="0" max="100"
                        value={this.state.value}
                        onChange={this.onChange}
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
