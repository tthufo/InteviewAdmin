import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import BasicPagination from './Examples/Basic';
import DynamicPagination from './Examples/Dynamic';

export default class PaginationExamples extends React.Component {
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
            heading="Pagination"
            subheading="Basic and dynamic pagination for use in your next awesome application."
            icon="pe-7s-notebook icon-gradient bg-mixed-hopes"
          />
          <Tabs
            defaultActiveKey="1"
            renderTabBar={() => <ScrollableInkTabBar />}
            renderTabContent={() => <TabContent />}
          >
            <TabPane tab="Basic" key="1"><BasicPagination /></TabPane>
            <TabPane tab="Dynamic Pagination" key="2"><DynamicPagination /></TabPane>
          </Tabs>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
