/* eslint-disable react/prop-types */
import React from 'react';
import UserService from './service';

const wrapper = Class => class UserWrapper extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.ismounted = false;
  }

  componentDidMount() {
    this.ismounted = true;
    UserService.addListener(this.handleChange);
  }

  componentWillUnmount() {
    this.ismounted = false;
    UserService.removeListener(this.handleChange);
  }

  handleChange() {
    if (this.ismounted) {
      this.forceUpdate();
    }
  }

  render() {
    const { children } = this.props;
    return (
      <Class
        {...this.props}
        getID={UserService.getID}
        user={UserService.getUser()}
        setId={UserService.setId}
        setUser={UserService.setUser}
        loadUser={UserService.loadUser}
        saveUser={UserService.saveUser}
        isAdmin={UserService.isAdmin}
        setAdmin={UserService.setAdmin}
        save={UserService.save}
        load={UserService.load}
        remove={UserService.remove}
      >
        {children}
      </Class>
    );
  }
};

export default wrapper;
