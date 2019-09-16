import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import {
  Switch, Route, HashRouter, withRouter, Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppSidebar from '../../Layout/AppSidebar';
import AppHeader from '../../Layout/AppHeader';
import RouteSuspense from './RouteSuspense';
import InitialSetting from '../user/Authentication/InitialSetting';
import { setCompany as setCompanyAction, setSimulation } from '../../actions/Company/index';
import UserRoutes from './users';
// import CompanyDashboard from '../user/CompanyDashboard/Examples/Demo';
// import Err from './error';

class Routes extends React.PureComponent {
  render() {
    // const { companyInfo } = this.props;
    // const ur = localStorage.getItem('userInfo_user');
    // if (ur && (!companyInfo || (companyInfo && !companyInfo.id))) {
    //   return (
    //     <React.Fragment>
    //       <AppHeader initialSetting />
    //       <Suspense fallback={<RouteSuspense />}>
    //         <div style={{ paddingTop: 0 }} className="app-main">
    //           <div style={{ paddingBottom: 0, paddingLeft: 0 }} className="app-main__outer">
    //             <div style={{ padding: 0 }} className="app-main__inner">
    //               <HashRouter>
    //                 <Switch>
    //                   <Route path="/users/initial-setting" name="User" component={InitialSetting} />
    //                   <Err notFound />
    //                 </Switch>
    //               </HashRouter>
    //             </div>
    //           </div>
    //         </div>
    //         <ToastContainer
    //           position="top-center"
    //           autoClose={5000}
    //           hideProgressBar
    //           newestOnTop
    //           closeOnClick
    //           rtl={false}
    //           pauseOnVisibilityChange
    //           draggable
    //           pauseOnHover
    //         />
    //       </Suspense>
    //     </React.Fragment>
    //   );
    // }
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
                    <Route path="/category" name="User" component={UserRoutes} />
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

// function mapStateToProps(state) {
//   return {
//     simulationInfo: state.companyInfo.get('simulation').toJS(),
//     companyInfo: state.companyInfo.get('company').toJS(),
//   };
// }

// const mapDispatchToProps = dispatch => ({
//   dispatchSetCompany: value => dispatch(setCompanyAction(value)),
//   dispatchSetSimulation: value => dispatch(setSimulation(value)),
// });

export default withRouter(Routes);
