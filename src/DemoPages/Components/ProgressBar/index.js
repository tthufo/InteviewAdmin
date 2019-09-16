import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import ProgressBarExample from './Examples/Basic';
import ProgressBarAdvancedExample from './Examples/Advanced';

export default class ProgressBarsExamples extends React.Component {
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
          <PageTitle
            heading="Progress Bar"
            subheading="You can use the progress bars on their own or in combination with other widgets."
            icon="pe-7s-filter icon-gradient bg-grow-early"
          />
          <Tabs
            defaultActiveKey="1"
            renderTabBar={() => <ScrollableInkTabBar />}
            renderTabContent={() => <TabContent />}
          >
            <TabPane tab="Basic" key="1"><ProgressBarExample /></TabPane>
            <TabPane tab="Advanced" key="2"><ProgressBarAdvancedExample /></TabPane>
          </Tabs>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
