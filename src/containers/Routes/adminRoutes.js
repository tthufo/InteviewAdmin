import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import {
  Switch, Route, HashRouter, withRouter,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppSidebar from '../../Layout/AppSidebar';
import AppHeader from '../../Layout/AppHeader';
import RouteSuspense from './RouteSuspense';
import { UserWrapper } from '../../components';
import { setCompany as setCompanyAction, setSimulation } from '../../actions/Company/index';
import AdminRoutes from './admin';

class Routes extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <AppHeader />
        <Suspense fallback={<RouteSuspense />}>
          <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
              <div className="app-main__inner">
                <HashRouter>
                  <Switch>
                    <Route path="/admin" name="Admin" component={AdminRoutes} />
                  </Switch>
                </HashRouter>
              </div>
            </div>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
        </Suspense>
      </React.Fragment>
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
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)((UserWrapper(Routes))));
