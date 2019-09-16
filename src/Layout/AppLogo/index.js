import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Hamburger from 'react-hamburgers';
import AppMobileMenu from '../AppMobileMenu';
import API from '../../apis/index';
import UserWrapper from '../../components/UserWrapper';
import service from '../../service';

import {
  setEnableClosedSidebar,
  setEnableMobileMenu,
  setEnableMobileMenuSmall,
} from '../../reducers/ThemeOptions';

class HeaderLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      mobile: false,
      logoUrl: null,
      activeSecondaryMenuMobile: false,
    };
    this.refreshNotificationService = this.refreshNotificationService.bind(this);
  }

  componentWillMount() {
    service.addListener(this.refreshNotificationService);
  }

  componentDidMount() {
    if (!window.location.href.includes('admin')) {
      setTimeout(() => {
        this.getCompany();
      }, 500);
    }
  }

  componentWillUnmount() {
    service.removeListener(this.refreshNotificationService);
  }

    toggleEnableClosedSidebar = () => {
      const { enableClosedSidebar, setEnableClosedSidebar } = this.props;
      setEnableClosedSidebar(!enableClosedSidebar);
    }

    state = {
      openLeft: false,
      openRight: false,
      relativeWidth: false,
      width: 280,
      noTouchOpen: false,
      noTouchClose: false,
    };

    async getCompany() {
      const { getID } = this.props;
      const id = getID();
      try {
        const result = await API.companySetting.get(id);
        const { data } = result;
        this.setState({ logoUrl: data.logoImageUrl });
      } catch (error) {
        console.log(error);
      }
    }

    refreshNotificationService() {
      if (!window.location.href.includes('admin')) {
        this.getCompany();
      }
    }

    render() {
      const {
        enableClosedSidebar, isAdmin, initialSetting,
      } = this.props;
      // const admin = isAdmin();
      const admin = (window.location.href).includes('admin');
      const { logoUrl } = this.state;
      const defaultLogo = require('../../assets/utils/images/logo-inverse.png');
      return (
        <Fragment>
          <div className="app-header__logo">
            <div
              className="logo-src"
              onClick={() => {
                if (window.location.href.includes('users/initial-setting')) return;
                this.props.history.push(admin ? '/admin' : '/users');
              }}
            >
              <img
                className="logo-src"
                style={{
                  objectFit: 'cover',
                  border: logoUrl === null ? '' : '0px solid black',
                  borderColor: 'black',
                }}
                src={logoUrl === null ? defaultLogo : logoUrl}
                alt="logo"
              />
            </div>
            {!initialSetting && (
            <div className="header__pane ml-auto">
              <div onClick={this.toggleEnableClosedSidebar}>
                <Hamburger
                  active={enableClosedSidebar}
                  type="elastic"
                  onClick={() => this.setState({ active: !this.state.active })}
                />
              </div>
            </div>
            ) }
          </div>
          <AppMobileMenu />
        </Fragment>
      );
    }
}


const mapStateToProps = state => ({
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = dispatch => ({

  setEnableClosedSidebar: enable => dispatch(setEnableClosedSidebar(enable)),
  setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),
  setEnableMobileMenuSmall: enable => dispatch(setEnableMobileMenuSmall(enable)),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserWrapper(HeaderLogo)));
