import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Row, Col, CardFooter,
  Card, CardBody,
  Container,
} from 'reactstrap';
import { connect } from 'react-redux';
import { translateWrapper } from 'ter-localization';
import WorkingCapital from './WorkingCapital';
import Sales from './Sales';
import HumanResources from './HumanResources';
import RentOffice from './RentOffice';
import OtherExpenses from './OtherExpenses';
import Assets from './Assets';
import Finance from './Finance';
import API from '../../../../apis/viewSimulation/projected-FS-by-table';

class index extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      assumptionList: null,
    };
    this.getAPIAssumptionList = this.getAPIAssumptionList.bind(this);
  }

  componentDidMount() {
    this.getAPIAssumptionList();
  }

  async getAPIAssumptionList() {
    const { simulation } = this.props;
    if (simulation.id) {
      const data = await API.getAssumptionList(simulation.id);
      if (data.status === 200) {
        this.setState({
          assumptionList: data.data,
        });
      } else {
        console.log('error', data);
      }
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const { simulation, company } = this.props;
    const { assumptionList } = this.state;
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
                  <CardBody>
                    <WorkingCapital
                      simulation={simulation}
                      dataAPI={assumptionList}
                      company={company}
                    />
                    <Sales
                      simulation={simulation}
                      dataAPI={assumptionList}
                      company={company}
                    />
                    <HumanResources
                      simulation={simulation}
                      dataAPI={assumptionList}
                      company={company}
                    />
                    <RentOffice
                      simulation={simulation}
                      dataAPI={assumptionList}
                      company={company}
                    />
                    <OtherExpenses
                      simulation={simulation}
                      dataAPI={assumptionList}
                      company={company}
                    />
                    <Assets
                      simulation={simulation}
                      dataAPI={assumptionList}
                      company={company}
                    />
                    <Finance
                      simulation={simulation}
                      dataAPI={assumptionList}
                      company={company}
                    />
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

function mapStateToProps(state) {
  return {
    simulation: state.companyInfo.get('simulation').toJS(),
  };
}

export default translateWrapper('simulation')(connect(mapStateToProps)(index));
