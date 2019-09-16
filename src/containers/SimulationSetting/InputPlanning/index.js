import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Tabs from 'react-responsive-tabs';

import {
  Row, Col,
  Card, Container,
} from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import Assets from './Assets';
import Sales from './Sales';
import HumanResources from './HumanResources';
import RentOfOffice from './RentOfOffice';
import OtherExpenses from './OtherExpenses';
import Finance from './Finance';

/**
 * Place your tab-item in here
 *
*/
const tabs = [
  {
    name: 'Sales',
    component: props => <Sales {...props} />,
  },
  {
    name: 'Human Resources',
    component: props => <HumanResources {...props} />,
  },
  {
    name: 'Rent Of Office',
    component: props => <RentOfOffice {...props} />,
  },
  {
    name: 'Other Expenses',
    component: props => <OtherExpenses {...props} />,
  },
  {
    name: 'Asset',
    component: props => <Assets {...props} />,
  },
  {
    name: 'Finance',
    component: props => <Finance {...props} />,
  },
];

class InputPlanning extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      showMore: true,
      transform: true,
      showInkBar: true,
      items: this.getSimpleTabs(),
      selectedTabKey: 0,
      transformWidth: 400,
    };
    this.toggle = this.toggle.bind(this);
    this.nextTab = this.nextTab.bind(this);
    this.backTab = this.backTab.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params && match.params.tab && match.params.tab >= 0 && match.params.tab <= 5) {
      this.handleChangeTab(Number(match.params.tab));
    }
  }

  getSimpleTabs = () => {
    const { t } = this.props;
    return (
      tabs.map(({ name, component }, index) => ({
        key: index,
        title: t(name),
        getContent: () => component({
          ...this.props,
          tabKey: index,
          nextTab: this.nextTab,
          backTab: this.backTab,
        }),
      }))
    );
  };

  toggle(tab) {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  nextTab(tabNum) {
    if (tabNum !== undefined) {
      this.setState({
        selectedTabKey: tabNum + 1,
      });
    }
  }

  backTab(tabNum) {
    if (tabNum !== undefined) {
      this.setState({
        selectedTabKey: tabNum - 1,
      });
    }
  }

  handleChangeTab(index) {
    if (index !== undefined) {
      this.setState({
        selectedTabKey: index,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
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
              <Col md="12">
                <Card className="mb-2 card-tabs">
                  <Tabs
                    tabsWrapperClass="card-header"
                    {...this.state}
                    onChange={this.handleChangeTab}
                  />
                </Card>
              </Col>
            </Row>
          </Container>
        </ReactCSSTransitionGroup>
      </React.Fragment>
    );
  }
}

export default translateWrapper('company-setting')(InputPlanning);
