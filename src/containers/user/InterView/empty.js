/* eslint-disable class-methods-use-this */
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Label,
} from 'reactstrap';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { name } = this.props;
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div style={{ flex: 1, display: 'flex', height: '100%' }}>
            <Label style={{ margin: 'auto' }}><b>{name}</b></Label>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
export default index;

index.propTypes = {
  t: PropTypes.bool,
};

index.defaultProps = {
  t: null,
};
