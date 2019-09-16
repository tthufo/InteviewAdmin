import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import PageTitle from '../../../../Layout/AppMain/PageTitle';

// Examples

import FormDropdownExample from './Examples/Dropdown';
import FormComboboxExample from './Examples/Combobox';

class FormDropdown extends React.Component {
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
            heading="Form Dropdowns"
            subheading="Widgets that help you build good looking react dropdown menus, easily."
            icon="pe-7s-volume1 icon-gradient bg-plum-plate"
          />
          <Tabs
            defaultActiveKey="1"
            renderTabBar={() => <ScrollableInkTabBar />}
            renderTabContent={() => <TabContent />}
          >
            <TabPane tab="Dropdown" key="1"><FormDropdownExample /></TabPane>
            <TabPane tab="Combobox" key="2"><FormComboboxExample /></TabPane>
          </Tabs>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

export default FormDropdown;
