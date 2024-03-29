import React, { Component, Fragment } from 'react';
import {
  Button, Container, ButtonGroup,
  Row, Col,
  Card, CardBody,
  CardTitle,
} from 'reactstrap';

import LaddaButton, {
  EXPAND_LEFT,
  EXPAND_RIGHT,
  EXPAND_UP,
  EXPAND_DOWN,
  SLIDE_LEFT,
  SLIDE_RIGHT,
  SLIDE_UP,
  SLIDE_DOWN,
  ZOOM_IN,
  ZOOM_OUT,
} from 'react-ladda';


class ButtonsShadowGradients extends Component {
    state = {
      expLeft: false,
      expRight: false,
      expUp: false,
      expDown: false,
      expContract: false,
      expOverlay: false,
      expSlideLeft: false,
      expSlideRight: false,
      expSlideUp: false,
      expSlideDown: false,
      expZoomIn: false,
      expZoomOut: false,
    }

    constructor(props) {
      super(props);

      this.state = {
        cSelected: [],
      };

      this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
      this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
    }

    toggle(name) {
      this.setState({
        [name]: !this.state[name],
        progress: 0.5,
      });
    }

    onRadioBtnClick(rSelected) {
      this.setState({ rSelected });
    }

    onCheckboxBtnClick(selected) {
      const index = this.state.cSelected.indexOf(selected);
      if (index < 0) {
        this.state.cSelected.push(selected);
      } else {
        this.state.cSelected.splice(index, 1);
      }
      this.setState({ cSelected: [...this.state.cSelected] });
    }

    render() {
      return (
        <Fragment>
          <Container fluid>
            <Row>
              <Col lg="6">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Color States</CardTitle>
                    <Button className="mb-2 mr-2 btn-shadow btn-gradient-primary">Primary</Button>
                    <Button className="mb-2 mr-2 btn-shadow btn-gradient-secondary">Secondary</Button>
                    <Button className="mb-2 mr-2 btn-shadow btn-gradient-success">Success</Button>
                    <Button className="mb-2 mr-2 btn-shadow btn-gradient-info">Info</Button>
                    <Button className="mb-2 mr-2 btn-shadow btn-gradient-warning">Warning</Button>
                    <Button className="mb-2 mr-2 btn-shadow btn-gradient-danger">Danger</Button>
                    <Button className="mb-2 mr-2 btn-shadow btn-gradient-focus">Focus</Button>
                    <Button className="mb-2 mr-2 btn-shadow btn-gradient-alternate">Alt</Button>
                    <Button className="mb-2 mr-2 btn-shadow btn-gradient-light">Light</Button>
                    <Button className="mb-2 mr-2 btn-shadow btn-gradient-dark">Dark</Button>
                    <Button className="mb-2 mr-2 btn-shadow btn-gradient-link">link</Button>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Hover Shadow</CardTitle>
                    <Button
                      className="mb-2 mr-2 btn-shadow-primary btn-gradient-primary"
                      color="primary"
                    >
Primary
</Button>
                    <Button
                      className="mb-2 mr-2 btn-shadow-secondary btn-gradient-secondary"
                      color="secondary"
                    >
Secondary
</Button>
                    <Button
                      className="mb-2 mr-2 btn-shadow-success btn-gradient-success"
                      color="success"
                    >
Success
</Button>
                    <Button
                      className="mb-2 mr-2 btn-shadow-info btn-gradient-info"
                      color="info"
                    >
Info
</Button>
                    <Button
                      className="mb-2 mr-2 btn-shadow-warning btn-gradient-warning"
                      color="warning"
                    >
Warning
</Button>
                    <Button className="mb-2 mr-2 btn-shadow-danger btn-gradient-danger" color="danger">Danger</Button>
                    <Button className="mb-2 mr-2 btn-shadow-focus btn-gradient-focus" color="focus">Focus</Button>
                    <Button
                      className="mb-2 mr-2 btn-shadow-alternate btn-gradient-alternate"
                      color="alternate"
                    >
Alt
</Button>
                    <Button className="mb-2 mr-2 btn-shadow-light btn-gradient-light" color="light">Light</Button>
                    <Button
                      className="mb-2 mr-2 btn-shadow-dark btn-gradient-dark"
                      color="dark"
                    >
Dark
</Button>
                    <Button
                      className="mb-2 mr-2 btn-shadow-link btn-gradient-link"
                      color="link"
                    >
link
</Button>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Active State</CardTitle>
                    <Button
                      active
                      className="mb-2 mr-2 btn-shadow btn-gradient-primary"
                    >
Primary
</Button>
                    <Button
                      active
                      className="mb-2 mr-2 btn-shadow btn-gradient-secondary"
                    >
Secondary
</Button>
                    <Button
                      active
                      className="mb-2 mr-2 btn-shadow btn-gradient-success"
                    >
Success
</Button>
                    <Button active className="mb-2 mr-2 btn-shadow btn-gradient-info">Info</Button>
                    <Button
                      active
                      className="mb-2 mr-2 btn-shadow btn-gradient-warning"
                    >
Warning
</Button>
                    <Button active className="mb-2 mr-2 btn-shadow btn-gradient-danger">Danger</Button>
                    <Button active className="mb-2 mr-2 btn-shadow btn-gradient-focus">Focus</Button>
                    <Button active className="mb-2 mr-2 btn-shadow btn-gradient-alternate">Alt</Button>
                    <Button active className="mb-2 mr-2 btn-shadow btn-gradient-light">Light</Button>
                    <Button active className="mb-2 mr-2 btn-shadow btn-gradient-dark">Dark</Button>
                    <Button active className="mb-2 mr-2 btn-shadow btn-gradient-link">link</Button>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Disabled State</CardTitle>
                    <Button
                      disabled
                      className="mb-2 mr-2 btn-shadow btn-gradient-primary"
                    >
Primary
</Button>
                    <Button
                      disabled
                      className="mb-2 mr-2 btn-shadow btn-gradient-secondary"
                    >
Secondary
</Button>
                    <Button
                      disabled
                      className="mb-2 mr-2 btn-shadow btn-gradient-success"
                    >
Success
</Button>
                    <Button disabled className="mb-2 mr-2 btn-shadow btn-gradient-info">Info</Button>
                    <Button
                      disabled
                      className="mb-2 mr-2 btn-shadow btn-gradient-warning"
                    >
Warning
</Button>
                    <Button
                      disabled
                      className="mb-2 mr-2 btn-shadow btn-gradient-danger"
                    >
Danger
</Button>
                    <Button disabled className="mb-2 mr-2 btn-shadow btn-gradient-focus">Focus</Button>
                    <Button
                      disabled
                      className="mb-2 mr-2 btn-shadow btn-gradient-alternate"
                    >
Alt
</Button>
                    <Button disabled className="mb-2 mr-2 btn-shadow btn-gradient-light">Light</Button>
                    <Button disabled className="mb-2 mr-2 btn-shadow btn-gradient-dark">Dark</Button>
                    <Button disabled className="mb-2 mr-2 btn-shadow btn-gradient-link">link</Button>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Block Level</CardTitle>
                    <Button block className="mb-2 mr-2 btn-shadow btn-gradient-primary" size="lg">
Block
                                        Large
                    </Button>
                    <Button block className="mb-2 mr-2 btn-shadow btn-gradient-primary">
Block
                                        Normal
                    </Button>
                    <Button block className="mb-2 mr-2 btn-shadow btn-gradient-primary" size="sm">
Block
                                        Small
                    </Button>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Wider</CardTitle>
                    <div className="text-center">
                      <Button
                        className="btn-wide mb-2 mr-2 btn-shadow btn-gradient-primary"
                        size="lg"
                      >Wider
                                            Large
                      </Button>
                      <Button className="btn-wide mb-2 mr-2 btn-shadow btn-gradient-primary">
Wider
                                            Normal
                      </Button>
                      <Button
                        className="btn-wide mb-2 mr-2 btn-shadow btn-gradient-primary"
                        size="sm"
                      >Wider
                                            Small
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Sizing</CardTitle>
                    <div className="text-center">
                      <Button
                        className="btn-wide mb-2 mr-2 btn-shadow btn-gradient-primary"
                        size="lg"
                      >Large
                      </Button>
                      <Button
                        className="btn-wide mb-2 mr-2 btn-shadow btn-gradient-primary"
                      >Normal
                      </Button>
                      <Button
                        className="btn-wide mb-2 mr-2 btn-shadow btn-gradient-primary"
                        size="sm"
                      >Small
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6">
                <Row>
                  <Col lg="6">
                    <Card className="main-card mb-3">
                      <CardBody>
                        <CardTitle>Checkbox Buttons</CardTitle>
                        <div className="text-center">
                            <ButtonGroup size="sm" className="mb-2">
                                <Button
                                    className="btn-shadow btn-gradient-primary"
                                    onClick={() => this.onCheckboxBtnClick(1)}
                                    active={this.state.cSelected.includes(1)}
                                  >One
                                  </Button>
                                <Button
                                    className="btn-shadow btn-gradient-primary"
                                    onClick={() => this.onCheckboxBtnClick(2)}
                                    active={this.state.cSelected.includes(2)}
                                  >Two
                                  </Button>
                                <Button
                                    className="btn-shadow btn-gradient-primary"
                                    onClick={() => this.onCheckboxBtnClick(3)}
                                    active={this.state.cSelected.includes(3)}
                                  >Three
                                  </Button>
                              </ButtonGroup>
                            <ButtonGroup className="mb-2">
                                <Button
                                    className="btn-shadow btn-gradient-warning"
                                    onClick={() => this.onCheckboxBtnClick(1)}
                                    active={this.state.cSelected.includes(1)}
                                  >One
                                  </Button>
                                <Button
                                    className="btn-shadow btn-gradient-success"
                                    onClick={() => this.onCheckboxBtnClick(2)}
                                    active={this.state.cSelected.includes(2)}
                                  >Two
                                  </Button>
                                <Button
                                    className="btn-shadow btn-gradient-danger"
                                    onClick={() => this.onCheckboxBtnClick(3)}
                                    active={this.state.cSelected.includes(3)}
                                  >Three
                                  </Button>
                              </ButtonGroup>
                            <ButtonGroup size="lg" className="mb-2">
                                <Button
                                    className="btn-shadow btn-gradient-alternate"
                                    onClick={() => this.onCheckboxBtnClick(1)}
                                    active={this.state.cSelected.includes(1)}
                                  >One
                                  </Button>
                                <Button
                                    className="btn-shadow btn-gradient-dark"
                                    onClick={() => this.onCheckboxBtnClick(2)}
                                    active={this.state.cSelected.includes(2)}
                                  >Two
                                  </Button>
                                <Button
                                    className="btn-shadow btn-gradient-info"
                                    onClick={() => this.onCheckboxBtnClick(3)}
                                    active={this.state.cSelected.includes(3)}
                                  >Three
                                  </Button>
                              </ButtonGroup>
                            <p>
Selected:
                                {JSON.stringify(this.state.cSelected)}
                              </p>
                          </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6">
                    <Card className="main-card mb-3">
                      <CardBody>
                        <CardTitle>Radio Buttons</CardTitle>
                        <div className="text-center">
                            <ButtonGroup size="sm" className="mb-2">
                                <Button
                                    className="btn-shadow btn-gradient-primary"
                                    onClick={() => this.onRadioBtnClick(1)}
                                    active={this.state.rSelected === 1}
                                  >One
                                  </Button>
                                <Button
                                    className="btn-shadow btn-gradient-primary"
                                    onClick={() => this.onRadioBtnClick(2)}
                                    active={this.state.rSelected === 2}
                                  >Two
                                  </Button>
                                <Button
                                    className="btn-shadow btn-gradient-primary"
                                    onClick={() => this.onRadioBtnClick(3)}
                                    active={this.state.rSelected === 3}
                                  >Three
                                  </Button>
                              </ButtonGroup>
                            <ButtonGroup className="mb-2">
                                <Button
                                    className="btn-shadow btn-gradient-warning"
                                    onClick={() => this.onRadioBtnClick(1)}
                                    active={this.state.rSelected === 1}
                                  >One
                                  </Button>
                                <Button
                                    className="btn-shadow btn-gradient-success"
                                    onClick={() => this.onRadioBtnClick(2)}
                                    active={this.state.rSelected === 2}
                                  >Two
                                  </Button>
                                <Button
                                    className="btn-shadow btn-gradient-danger"
                                    onClick={() => this.onRadioBtnClick(3)}
                                    active={this.state.rSelected === 3}
                                  >Three
                                  </Button>
                              </ButtonGroup>
                            <ButtonGroup size="lg" className="mb-2">
                                <Button
                                    className="btn-shadow btn-gradient-alternate"
                                    onClick={() => this.onRadioBtnClick(1)}
                                    active={this.state.rSelected === 1}
                                  >One
                                  </Button>
                                <Button
                                    className="btn-shadow btn-gradient-dark"
                                    onClick={() => this.onRadioBtnClick(2)}
                                    active={this.state.rSelected === 2}
                                  >Two
                                  </Button>
                                <Button
                                    className="btn-shadow btn-gradient-info"
                                    onClick={() => this.onRadioBtnClick(3)}
                                    active={this.state.rSelected === 3}
                                  >Three
                                  </Button>
                              </ButtonGroup>
                            <p>
Selected:
                                {this.state.rSelected}
                              </p>
                          </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

              </Col>
              <Col lg="6">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Loading Buttons</CardTitle>
                    <Row className="text-center">
                      <Col md="3">
                        <LaddaButton
                            className="mb-2 mr-2 btn btn-shadow btn-gradient-primary"
                            loading={this.state.expLeft}
                            onClick={() => this.toggle('expLeft')}

                            data-style={EXPAND_LEFT}
                          >
                                                Expand Left
                          </LaddaButton>
                      </Col>
                      <Col md="3">
                        <LaddaButton
                            className="mb-2 mr-2 btn btn-shadow btn-gradient-secondary"
                            loading={this.state.expRight}
                            onClick={() => this.toggle('expRight')}

                            data-style={EXPAND_RIGHT}
                          >
                                                Expand Right
                          </LaddaButton>
                      </Col>
                      <Col md="3">
                        <LaddaButton
                            className="mb-2 mr-2 btn btn-shadow btn-gradient-focus"
                            loading={this.state.expZoomIn}
                            onClick={() => this.toggle('expZoomIn')}

                            data-style={ZOOM_IN}
                          >
                                                Zoom In
                          </LaddaButton>
                      </Col>
                      <Col md="3">
                        <LaddaButton
                            className="mb-2 mr-2 btn btn-shadow btn-gradient-alternate"
                            loading={this.state.expZoomOut}
                            onClick={() => this.toggle('expZoomOut')}

                            data-style={ZOOM_OUT}
                          >
                                                Zoom Out
                          </LaddaButton>
                      </Col>
                      <Col md="3">
                        <LaddaButton
                            className="mb-2 mr-2 btn btn-shadow btn-gradient-light"
                            loading={this.state.expSlideLeft}
                            onClick={() => this.toggle('expSlideLeft')}

                            data-style={SLIDE_LEFT}
                          >
                                                Slide Left
                          </LaddaButton>
                      </Col>
                      <Col md="3">
                        <LaddaButton
                            className="mb-2 mr-2 btn btn-shadow btn-gradient-dark"
                            loading={this.state.expSlideRight}
                            onClick={() => this.toggle('expSlideRight')}

                            data-style={SLIDE_RIGHT}
                          >
                                                Slide Right
                          </LaddaButton>
                      </Col>
                      <Col md="3">
                        <LaddaButton
                            className="mb-2 mr-2 btn btn-shadow btn-gradient-danger"
                            loading={this.state.expSlideUp}
                            onClick={() => this.toggle('expSlideUp')}

                            data-style={SLIDE_UP}
                          >
                                                Slide Up
                          </LaddaButton>
                      </Col>
                      <Col md="3">
                        <LaddaButton
                            className="mb-2 mr-2 btn btn-shadow btn-gradient-warning"
                            loading={this.state.expSlideDown}
                            onClick={() => this.toggle('expSlideDown')}

                            data-style={SLIDE_DOWN}
                          >
                                                Slide Down
                          </LaddaButton>
                      </Col>
                    </Row>
                    <Row className="text-center">
                      <Col md="3">
                        <LaddaButton
                            className="mb-2 mr-2 btn btn-shadow btn-gradient-success"
                            loading={this.state.expUp}
                            onClick={() => this.toggle('expUp')}

                            data-style={EXPAND_UP}
                          >
                                                Expand Up
                          </LaddaButton>
                      </Col>
                      <Col md="3">
                        <LaddaButton
                            className="mb-2 mr-2 btn btn-shadow btn-gradient-info"
                            loading={this.state.expDown}
                            onClick={() => this.toggle('expDown')}

                            data-style={EXPAND_DOWN}
                          >
                                                Expand Down
                          </LaddaButton>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </Fragment>
      );
    }
}

export default ButtonsShadowGradients;
