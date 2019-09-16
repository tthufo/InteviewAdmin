import React, { PureComponent } from 'react';
import { translateWrapper } from 'ter-localization';

export class error extends PureComponent {
  render() {
    const { t, notFound } = this.props;
    if (notFound) {
      return (
        null
      );
    }
    return (
      <h2 style={{
        textAlign: 'center', justifyContent: 'center', display: 'flex', marginTop: '25%',
      }}
      >
        {t('Sorry, this verification link is no longer valid. Please contact with the administrator for help.')}
      </h2>
    );
  }
}

export default translateWrapper('error')(error);
