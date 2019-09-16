import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { translateWrapper } from 'ter-localization';

class PageTitle extends Component {
  randomize(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
  }

  render() {
    const {
      enablePageTitleIcon,
      enablePageTitleSubheading,
      heading,
      icon,
      subheading,
      subheading1,
    } = this.props;

    return (
      <div className="app-page-title">
        <div style={{ justifyContent: 'space-between' }} className="page-title-wrapper">
          <div className="page-title-heading">
            <div
              className={cx('page-title-icon', { 'd-none': !enablePageTitleIcon })}
            >
              <i className={icon} />
            </div>
            <div>
              {heading}
              <div
                className={cx('page-title-subheading', { 'd-none': !enablePageTitleSubheading })}
              >
                {subheading}
              </div>
            </div>

          </div>
          <div
            style={{ textAlign: 'right' }}
            className={cx('page-title-subheading', { 'd-none': !enablePageTitleSubheading })}
          >
            {subheading1}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  enablePageTitleIcon: state.ThemeOptions.enablePageTitleIcon,
  enablePageTitleSubheading: state.ThemeOptions.enablePageTitleSubheading,
});

const mapDispatchToProps = dispatch => ({});

export default translateWrapper('company-dasboard')(connect(mapStateToProps, mapDispatchToProps)(PageTitle));
