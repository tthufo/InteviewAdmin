import React, { Fragment } from 'react';
import cx from 'classnames';

import { connect } from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import HeaderLogo from '../AppLogo';
import UserBox from './Components/UserBox';


class Header extends React.PureComponent {
  render() {
    const {
      headerBackgroundColor,
      enableMobileMenuSmall,
      enableHeaderShadow,
      initialSetting,
    } = this.props;
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          className={cx('bg-pro', 'app-header', headerBackgroundColor, { 'header-shadow': enableHeaderShadow })}
          transitionName="HeaderAnimation"
          transitionAppear
          transitionAppearTimeout={1500}
          transitionEnter={false}
          transitionLeave={false}
        >

          {/* <HeaderLogo initialSetting={initialSetting} /> */}
          <div className={cx(
            'app-header__content',
            { 'header-mobile-open': enableMobileMenuSmall },
          )}
          >
            <div style={{ width: '100%' }} className="app-header-right">
              <UserBox />
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

// const mapStateToProps = state => ({
//   enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
//   closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
//   headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
//   enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
// });

// const mapDispatchToProps = dispatch => ({});

export default (Header);
