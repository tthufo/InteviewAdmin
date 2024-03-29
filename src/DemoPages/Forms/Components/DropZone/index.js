import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Row, Col,
  Card, CardBody,
  CardTitle,
} from 'reactstrap';

import PageTitle from '../../../../Layout/AppMain/PageTitle';

// Examples

import FormDropZoneExample1 from './Examples/example1';

class FormDropZone extends React.Component {
  render() {
    return (
      <Fragment>
        <PageTitle
          heading="DropZone"
          subheading="Create drag & drop zones for uploading files."
          icon="pe-7s-ticket icon-gradient bg-happy-fisher"
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
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Basic</CardTitle>
                  <FormDropZoneExample1 />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

export default FormDropZone;
