import { connect } from 'react-redux';

import authWrapper from './authWrapper';

const connectedDefaults = {
  authenticatingSelector: () => false,
};

export default (args) => {
  const { authenticatedSelector, authenticatingSelector } = {
    ...connectedDefaults,
    ...args,
  };

  return (DecoratedComponent, FailureComponent) => connect((state, ownProps) => ({
    isAuthenticated: authenticatedSelector(state, ownProps),
    isAuthenticating: authenticatingSelector(state, ownProps),
  }))(authWrapper({ ...args, FailureComponent })(DecoratedComponent));
};
