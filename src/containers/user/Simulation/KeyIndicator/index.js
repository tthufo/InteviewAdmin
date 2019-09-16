import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Row, Col, CardFooter,
  Card, CardBody,
  Container,
} from 'reactstrap';
import { connect } from 'react-redux';
import { translateWrapper } from 'ter-localization';
import AnnualPLKeyIndicator from './AnnualPLKeyIndicator';
import FinancialKeyindicator from './FinancialKeyindicator';
import AnnualCFKeyIndicator from './AnnualCFKeyIndicator';
import API from '../../../../apis/viewSimulation/projected-FS-by-table';


class index extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      keyIndicator: null,
    };
    this.getAPIKeyIndicator = this.getAPIKeyIndicator.bind(this);
  }

  componentDidMount() {
    this.getAPIKeyIndicator();
  }

  async getAPIKeyIndicator() {
    const { simulation } = this.props;
    if (simulation.id) {
      const data = await API.getKeyIndicator(simulation.id);
      if (data.status === 200) {
        this.setState({
          keyIndicator: data.data,
        });
      } else {
        console.log('error', data);
      }
    }
  }

  toggle(tab) {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const {
      company, simulation, jsUcfirst,
    } = this.props;
    const { keyIndicator } = this.state;
    const startYear = company && company.simulation && company.simulation.startYear;
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
                    {
                      simulation && simulation.id && (
                        <AnnualPLKeyIndicator
                          startYear={startYear}
                          keyIndicator={keyIndicator}
                          jsUcfirst={jsUcfirst}
                          {...this.props}
                        />
                      )
                    }

                    {
                      simulation && simulation.id && (
                        <AnnualCFKeyIndicator
                          startYear={startYear}
                          keyIndicator={keyIndicator}
                          jsUcfirst={jsUcfirst}
                          {...this.props}
                        />
                      )
                    }

                    {
                      simulation && simulation.id && (
                      <FinancialKeyindicator
                        indicator
                        startYear={startYear}
                        keyIndicator={keyIndicator}
                        jsUcfirst={jsUcfirst}
                        {...this.props}
                      />
                      )
                    }

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

export default translateWrapper('simulation')(connect(mapStateToProps, null)(index));
