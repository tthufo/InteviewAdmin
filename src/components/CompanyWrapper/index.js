/* eslint-disable react/prop-types */
import React from 'react';
import CompanyService from './service';

const wrapper = Class => class CompanyWrapper extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.ismounted = false;
  }

  componentDidMount() {
    this.ismounted = true;
    CompanyService.addListener(this.handleChange);
  }

  componentWillUnmount() {
    this.ismounted = false;
    CompanyService.removeListener(this.handleChange);
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
        getCompany={CompanyService.getCompany}
        company={CompanyService.getCompany()}
        setCompany={CompanyService.setCompany}
        loadCompany={CompanyService.loadCompany}
        saveCompany={CompanyService.saveCompany}
      >
        {children}
      </Class>
    );
  }
};

export default wrapper;
