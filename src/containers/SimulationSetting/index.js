import React, { lazy } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Row, Col,
  Card, CardBody,
} from 'reactstrap';
import { translateWrapper, LocalizationComponent } from 'ter-localization';
import { UserWrapper } from '../../components';
import MultiStep from '../../DemoPages/Forms/Elements/Wizard/Wizard';
import PageTitle from '../../Layout/AppMain/PageTitle';
import './index.scss';

const BasicInfo = lazy(() => import('./BasicInfo'));
const InputPastData = lazy(() => import('./InputPastData'));
const InputPlanning = lazy(() => import('./InputPlanning'));
const Finish = lazy(() => import('./Finish'));

const steps = (t, param, history) => [
  { name: t('Basic Info Setting'), component: props => <BasicInfo match={param} {...props} /> },
  { name: t('Input Past Data'), component: props => <InputPastData match={param} {...props} /> },
  { name: t('Input Planning Data'), component: props => <InputPlanning match={param} {...props} /> },
  { name: t('Finish Wizard'), component: props => <Finish history={history} match={param} {...props} /> },
];

class SimulationSetting extends LocalizationComponent { //eslint-disable-line

  constructor(props, context) {
    super(props, context);
    this.state = {
      isEdit: false,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { match } = this.props;
    if (match.params && match.params.id) {
      this.setState({ isEdit: true }, () => { if (match.params.tab) this.wizard.handleJump(match.params.tab === '6' ? 1 : 2); });
    }
  }

  render() {
    const { isEdit } = this.state;
    const {
      t, match, history,
    } = this.props;
    return (
      <React.Fragment>
        <PageTitle
          heading={isEdit ? t('Edit Simulation') : t('Create Simulation')}
          subheading={isEdit ? t('Edit Simulation Description') : t('Create Simulation Description')}
          icon="pe-7s-graph1"
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
                  <MultiStep
                    steps={steps(t, match, history)}
                    onRef={(el) => { this.wizard = el; }}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
      </React.Fragment>
    );
  }
}

export default UserWrapper(translateWrapper('SimulationSetting')(SimulationSetting));
