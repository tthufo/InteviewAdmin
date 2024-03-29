import React, { Fragment } from 'react';
import Slider, { Range } from 'rc-slider';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Row, Col,
  Card, CardBody,
  CardTitle,
} from 'reactstrap';

const marks = {
  '-10': '-10°C',
  0: <strong>0°C</strong>,
  26: '26°C',
  37: '37°C',
  50: '50°C',
  100: {
    style: {
      color: 'red',
    },
    label: <strong>100°C</strong>,
  },
};

const style = { textAlign: 'center' };
const style2 = {
  height: 400, marginTop: 20, textAlign: 'center', width: 200,
};
const parentStyle = { overflow: 'hidden' };

class FormRangeSliderVertical extends React.Component {
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
          <Row style={parentStyle}>
            <Col md="3">
              <Card className="mb-3" style={style}>
                <CardBody>
                  <CardTitle>Slider with marks, `step=null`</CardTitle>
                  <div style={style2}>
                    <Slider vertical min={-10} marks={marks} step={null} defaultValue={20} />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="3">
              <Card className="mb-3" style={style}>
                <CardBody>
                  <CardTitle>Slider with marks and steps</CardTitle>
                  <div style={style2}>
                    <Slider vertical dots min={-10} marks={marks} step={10} defaultValue={20} />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="3">
              <Card className="mb-3" style={style}>
                <CardBody>
                  <CardTitle>Slider with marks, `included=false`</CardTitle>
                  <div style={style2}>
                    <Slider vertical min={-10} marks={marks} included={false} defaultValue={20} />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="3">
              <Card className="mb-3" style={style}>
                <CardBody>
                  <CardTitle>Slider with marks and steps</CardTitle>
                  <div style={style2}>
                    <Slider
                      vertical min={-10} marks={marks} step={10} included={false}
                      defaultValue={20}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="3">
              <Card className="mb-3" style={style}>
                <CardBody>
                  <CardTitle>Range with marks</CardTitle>
                  <div style={style2}>
                    <Slider.Range vertical min={-10} marks={marks} defaultValue={[20, 40]} />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="3">
              <Card className="mb-3" style={style}>
                <CardBody>
                  <CardTitle>Range with marks and steps</CardTitle>
                  <div style={style2}>
                    <Slider.Range
                      vertical min={-10} marks={marks} step={10}
                      defaultValue={[20, 40]}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="3">
              <Card className="mb-3" style={style}>
                <CardBody>
                  <CardTitle>Slider with marks and steps</CardTitle>
                  <div style={style2}>
                    <Slider
                      className="rc-slider-danger" vertical dots min={-10} marks={marks}
                      step={10} defaultValue={20}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="3">
              <Card className="mb-3" style={style}>
                <CardBody>
                  <CardTitle>Slider with marks and steps</CardTitle>
                  <div style={style2}>
                    <Slider
                      className="rc-slider-success" vertical dots min={-10} marks={marks}
                      step={10} defaultValue={20}
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

export default FormRangeSliderVertical;
