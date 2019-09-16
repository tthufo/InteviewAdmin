import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import '../../localization';

import ResizeDetector from 'react-resize-detector';
import ExcludeRouteUs from '../../containers/Routes/ExcludeRoute';
// import ExcludeRouteAd from '../../containers/Routes/ExcludeRoute_Ad';
// import NotFound from './404';
import { adminRoutes, userRoutes } from '../../containers/Routes/routes';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closedSmallerSidebar: false,
    };
  }

  render() {
    const {
      colorScheme,
      enableFixedHeader,
      enableFixedSidebar,
      enableFixedFooter,
      enableClosedSidebar,
      closedSmallerSidebar,
      enableMobileMenu,
      enablePageTabsAlt,
      location,
    } = this.props;
    // const admin = (window.location.href).includes('admin');
    // const routeAd = adminRoutes.filter(ad => ad.path === location.pathname);
    // const routeUs = userRoutes.filter(us => us.path === location.pathname);
    return (
      <ResizeDetector
        handleWidth
        render={({ width }) => (
          <Fragment>
            <div className={cx(
              `app-container app-theme-${colorScheme}`,
              { 'fixed-header': enableFixedHeader },
              { 'fixed-sidebar': enableFixedSidebar || width < 1250 },
              { 'fixed-footer': enableFixedFooter },
              { 'closed-sidebar': enableClosedSidebar || width < 1250 },
              { 'closed-sidebar-mobile': closedSmallerSidebar || width < 1250 },
              { 'sidebar-mobile-open': enableMobileMenu },
              { 'body-tabs-shadow-btn': enablePageTabsAlt },
            )}
            >
              {/* {admin ? routeAd.length !== 0 ? <ExcludeRoute_Ad /> : <NotFound />
                : routeUs.length !== 0 ? <ExcludeRoute_Us /> : <NotFound /> } */}
              <ExcludeRouteUs />
            </div>
          </Fragment>
        )}
      />
    );
  }
}

const mapStateToProp = state => ({
  colorScheme: state.ThemeOptions.colorScheme,
  enableFixedHeader: state.ThemeOptions.enableFixedHeader,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  enableFixedFooter: state.ThemeOptions.enableFixedFooter,
  enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
  enablePageTabsAlt: state.ThemeOptions.enablePageTabsAlt,
});

export default withRouter(connect(mapStateToProp)(Main));
