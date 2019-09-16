import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { translateWrapper } from 'ter-localization';
import { userRoutes } from './routes';
// import User from '../user/CompanyDashboard/Examples/Demo';
import service from '../../service';

class UserRoutes extends React.Component { //eslint-disable-line
  componentWillMount() {
    // const { history } = this.props;
    // this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
    // this.handleLocationChange(history.location);
  }

  // componentWillUnmount() {
  //   if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
  // }

  // handleLocationChange = (location) => {
  //   if (location.pathname === '/users') {
  //     service.setActions('changeRoute');
  //   }
  // }


  render() {
    const { t } = this.props;
    return (
      <Switch>
        {
          userRoutes.map(r => (
            <Route
              {...r}
              name={t(r.name)}
              key={r.path}
            />
          ))
        }
        {/* <Redirect to="/users" /> */}
        {/* <Route component={User} /> */}
      </Switch>
    );
  }
}

export default translateWrapper('route')(UserRoutes);
