import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import PopoversExample from './Examples/Popovers';
import TooltipsExample from './Examples/Tooltips';

export default class TooltipsPopoversExample extends React.Component {
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
            heading="Tooltips & Popovers"
            subheading="These React components are used to add interaction or extra information for your app's content."
            icon="pe-7s-note2 icon-gradient bg-happy-fisher"
          />
          <Tabs
            defaultActiveKey="1"
            renderTabBar={() => <ScrollableInkTabBar />}
            renderTabContent={() => <TabContent />}
          >
            <TabPane tab="Popovers" key="1"><PopoversExample /></TabPane>
            <TabPane tab="Tooltips" key="2"><TooltipsExample /></TabPane>
          </Tabs>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
