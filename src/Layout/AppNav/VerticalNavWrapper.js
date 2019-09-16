import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { translateWrapper, LocalizationComponent } from 'ter-localization';

import { NAV_SIDEBAR, NAV_SIDEBAR_ADMIN } from '../../constants';

import { adminRoutes, userRoutes } from '../../containers/Routes/routes';
import MenuItem from './MenuItem';
import { UserWrapper } from '../../components';

const arrSidebar = Object.keys(NAV_SIDEBAR).map(key => NAV_SIDEBAR[key]);
const arrSidebarAdmin = Object.keys(NAV_SIDEBAR_ADMIN).map(key => NAV_SIDEBAR_ADMIN[key]);

const styles = {
  subHeader: {
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    margin: '0.75rem 0',
    fontWeight: 'bold',
    color: '#1D3B6C',
    whiteSpace: 'nowrap',
    position: 'relative',
  },
};

class Nav extends LocalizationComponent {
    state = {};

    render() {
      return (
        <Fragment>
          {
            arrSidebar.map((item) => {
              const mainNav = userRoutes.filter(route => route.group === item).map(i => ({
                ...i,
                icon: i.icon,
              }));
              return (
                <Fragment>
                  <h5 className="app-sidebar__heading" style={styles.subHeader}>{item}</h5>
                  <MenuItem content={mainNav} className="vertical-nav-menu" />
                </Fragment>
              );
            })
          }
        </Fragment>
      );
    }

    isPathActive(path) {
      return this.props.location.pathname.startsWith(path);
    }
}

export default UserWrapper(withRouter(translateWrapper('SideBar')(Nav)));
