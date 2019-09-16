import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { adminRoutes } from './routes';
import Admin from '../admin/ManageUser';
import service from '../../service';

class AdminRoutes extends React.Component { //eslint-disable-line
  componentWillMount() {
    const { history } = this.props;
    this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
    this.handleLocationChange(history.location);
  }

  componentWillUnmount() {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
  }

  handleLocationChange = (location) => {
    if (location.pathname === '/admin') {
      service.setActions('changeRoute');
    }
  }

  render() {
    return (
      <Switch>
        {
          adminRoutes.map(r => (
            <Route
              key={r.path}
              {...r}
            />
          ))
        }
        <Redirect to="/admin" />
        <Route component={Admin} />
      </Switch>
    );
  }
}

export default AdminRoutes;
