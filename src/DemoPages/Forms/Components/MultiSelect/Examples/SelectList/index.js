import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Row, Col,
  Card, CardBody,
  CardTitle,
} from 'reactstrap';

import { SelectList } from 'react-widgets';

class FormSelectListBasic extends React.Component {
  render() {
    const colors = ['orange', 'red', 'blue', 'green', 'cyan', 'purple'];

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
            <Col md="6">
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Basic</CardTitle>
                  <Row form>
                    <Col md={6}>
                      <SelectList busy />
                    </Col>
                    <Col md={6}>
                      <SelectList
                            data={colors}
                            defaultValue={['orange', 'blue']}
                          />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Disabled</CardTitle>
                  <Row form>
                    <Col md={6}>
                      <SelectList
                            disabled
                            data={colors}
                            defaultValue={['orange', 'blue']}
                          />
                    </Col>
                    <Col md={6}>
                      <SelectList
                            data={colors}
                            defaultValue={['orange', 'blue']}
                            disabled={['red', 'purple']}
                          />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

export default FormSelectListBasic;
