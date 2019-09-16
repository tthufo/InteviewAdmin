import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import MetisMenu from 'react-metismenu';
// import service from '../../service';
import {
  UserNav, UserNav1, AdminNav,
} from './NavItems';
import './metis-menu.scss';
// import { translateWrapper } from 'ter-localization';

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

class NavDummy extends Component {
  constructor(props) {
    super(props);
    this.state = { active: '1', ac: '1' };
    // this.refreshNotificationService = this.refreshNotificationService.bind(this);
  }

  // componentWillMount() {
  //   service.addListener(this.refreshNotificationService);
  // }

  // componentWillUnmount() {
  //   service.removeListener(this.refreshNotificationService);
  // }

  // refreshNotificationService(value) {
  //   if (value && value === 'changeRoute') {
  //     this.reset();
  //   }
  // }

  // reset() {
  //   this.setState({ active: '11', ac: '11' }, () => this.setState({ active: '1', ac: '1' }, () => {
  //     this.menu1.changeActiveLinkFromLocation();
  //     if (this.menu2) {
  //       this.menu2.changeActiveLinkFromLocation();
  //     }
  //   }));
  // }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  render() {
    // const { t } = this.props;
    // const admin = (window.location.href).includes('admin');
    // if (!admin) {
    return (
      <Fragment>
        <h5 className="app-sidebar__heading" style={styles.subHeader}>Menu</h5>
        <MetisMenu ref={menu1 => this.menu1 = menu1} activeLinkFromLocation onSelected={() => this.setState({ active: '11' }, () => this.setState({ active: '1' }))} content={this.state.ac === '1' ? UserNav : []} className="vertical-nav-menu" />
        {/* <h5 className="app-sidebar__heading" style={styles.subHeader}>{t('MY ACCOUNT')}</h5>
          <MetisMenu ref={menu2 => this.menu2 = menu2} activeLinkFromLocation onSelected={() => this.setState({ ac: '11' }, () => this.setState({ ac: '1' }))} content={this.state.active === '1' ? UserNav1 : []} className="vertical-nav-menu" /> */}
      </Fragment>
    );
    // }
    // return (
    //   <Fragment>
    //     <h5 className="app-sidebar__heading" style={styles.subHeader}>{t('MENU')}</h5>
    //     <MetisMenu ref={menu1 => this.menu1 = menu1} activeLinkFromLocation onSelected={() => this.setState({ active: '11' }, () => this.setState({ active: '1' }))} content={this.state.ac === '1' ? AdminNav : []} className="vertical-nav-menu" />
    //   </Fragment>
    // );
  }
}

export default withRouter(NavDummy);
