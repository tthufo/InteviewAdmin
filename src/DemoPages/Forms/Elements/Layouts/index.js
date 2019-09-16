import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import PageTitle from '../../../../Layout/AppMain/PageTitle';

// Examples

import FormGrid from './Examples/FormGrid';
import FormGridFormRow from './Examples/FormGridFormRow';

class FormElementsLayouts extends React.Component {
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
            heading="Form Layouts"
            subheading="Build whatever layout you need with our ArchitectUI framework."
            icon="pe-7s-graph text-success"
          />
          <Tabs
            defaultActiveKey="1"
            renderTabBar={() => <ScrollableInkTabBar />}
            renderTabContent={() => <TabContent />}
          >
            <TabPane tab="Layout" key="1"><FormGridFormRow /></TabPane>
            <TabPane tab="Grid" key="2"><FormGrid /></TabPane>
          </Tabs>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

export default FormElementsLayouts;
