import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PageTitle from '../../../../Layout/AppMain/PageTitle';

// Examples

import FormInputMaskExample from './Examples/example1';

class FormInputMask extends React.Component {
  render() {
    return (
      <Fragment>
        <PageTitle
          heading="Input Mask"
          subheading="Add all kind of input masks for inputs for a better user experience."
          icon="pe-7s-global icon-gradient bg-happy-itmeo"
        />
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <FormInputMaskExample />
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

export default FormInputMask;
