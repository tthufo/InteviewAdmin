import React, { Fragment } from 'react';
import cx from 'classnames';

import { connect } from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import HeaderLogo from '../AppLogo/index';

import SearchBox from '../../../../../Layout/AppHeader/Components/SearchBox';
import UserBox from '../../../../../Layout/AppHeader/Components/UserBox';
import HeaderRightDrawer from '../../../../../Layout/AppHeader/Components/HeaderRightDrawer';

import HeaderDots from '../../../../../Layout/AppHeader/Components/HeaderDots';

class Header extends React.Component {
  render() {
    const {
      headerBackgroundColor,
      enableMobileMenuSmall,
    } = this.props;
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          className={cx('app-header', headerBackgroundColor)}
          transitionName="HeaderAnimation"
          transitionAppear
          transitionAppearTimeout={1500}
          transitionEnter={false}
          transitionLeave={false}
        >

          <HeaderLogo />

          <div className={cx(
            'app-header__content',
            { 'header-mobile-open': enableMobileMenuSmall },
          )}
          >
            <div className="app-header-left">
              <SearchBox />
              <HeaderDots />
            </div>
            <div className="app-header-right">
              <UserBox />
              <HeaderRightDrawer />
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
