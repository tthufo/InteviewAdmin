import React from 'react';
import {
  Switch, Route, withRouter, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import UserRegister from '../user/Authentication/Register';
import AdminRoutes from './adminRoutes';
import UserLogin from '../user/Authentication/Login';
import UserService from '../../components/UserWrapper/service';
import PasswordReset from '../PasswordReset/index';
import AdminLogin from '../admin/Authentication/Login';
import { setCompany as setCompanyAction, setSimulation } from '../../actions/Company/index';
import { UserWrapper } from '../../components';
import { getCompany } from '../../apis/company';
import connectedRouterRedirect from '../../components/RouteWrapper/connectedAuthWrapper';
import apiAccount from '../../apis/account';
import apiAccountAdmin from '../../apis/admin/account';
import { setUser as setUserAction } from '../../actions/User/index';

const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  authenticatedSelector: state => state && state.userReducer && state.userReducer.get('user') === null,
  wrapperDisplayName: 'UserIsAuthenticated',
});

const PasswordResetFallBack = userIsNotAuthenticatedRedir(PasswordReset, () => <Redirect to="/users" />);

class ExcludeRoute extends React.Component {
  async componentDidMount() {
    const {
      history,
      dispatchSetUser,
    } = this.props;
    const admin = (window.location.href).includes('admin');
    const ad = UserService.load('userInfo_admin');
    const ur = UserService.load('userInfo_user');

    if (admin) {
      if (ad) {
        try {
          const userData = await apiAccountAdmin.getMyProfile();
          dispatchSetUser(userData.data, 'admin');
        } catch (error) {
          console.log(error);
        }
      }
    } else if (ur) {
      try {
        const userData = await apiAccount.getMyProfile();
        dispatchSetUser(userData.data, 'user');
      } catch (error) {
        console.log(error);
      }
      await this.getAPICompany();
      const { companyInfo } = this.props;
      if (companyInfo && !companyInfo.id) {
        history.push('/users/initial-setting');
      }
    }
  }

  async getAPICompany() {
    const handleSuccess = (data) => {
      if (data && data.data && data.data.simulation && data.data.simulation.duration) {
        localStorage.setItem('duration', data.data.simulation.duration);
      }
      const {
        dispatchSetCompany,
        dispatchSetSimulation,
      } = this.props;
      dispatchSetCompany(data.data);
      dispatchSetSimulation(data.data.simulation);
    };
    try {
      const data = await getCompany();
      handleSuccess(data);
    } catch (error) {
      handleSuccess(error.response);
    }
  }

  render() {
    const admin = (window.location.href).includes('admin');
    const ad = UserService.load('userInfo_admin');

    if (ad) {
      return (
        <Switch>
          <Route path="/" name="Route" component={AdminRoutes} />
        </Switch>
      );
    }

    return (
      <Switch>
        <div>
          <Route key={1} exact path="/password-reset/:token" name="Password Reset" component={PasswordResetFallBack} />
          <Route key={2} exact path="/users/register" name="User Register" component={UserRegister} />
          <Route key={3} exact path="/users/login" name="User Login" component={UserLogin} />
          <Route key={4} exact path="/admin/login" name="Admin Login" component={AdminLogin} />
          <Redirect to={admin ? '/admin/login' : '/users/login'} />
        </div>
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    simulationInfo: state.companyInfo.get('simulation').toJS(),
    companyInfo: state.companyInfo.get('company').toJS(),
  };
}

const mapDispatchToProps = dispatch => ({
  dispatchSetCompany: value => dispatch(setCompanyAction(value)),
  dispatchSetSimulation: value => dispatch(setSimulation(value)),
  dispatchSetUser: value => dispatch(setUserAction(value)),
});

export default withRouter(UserWrapper(connect(mapStateToProps, mapDispatchToProps)(ExcludeRoute)));
