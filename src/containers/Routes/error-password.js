import React, { PureComponent } from 'react';
import { translateWrapper } from 'ter-localization';

export class error extends PureComponent {
  render() {
    const { t } = this.props;
    return (
      <h2 style={{
        textAlign: 'center', justifyContent: 'center', display: 'flex', marginTop: '25%',
      }}
      >
        {t('Sorry, this reset password link is no longer valid. Please contact with the administrator for help.')}
      </h2>
    );
  }
}

export default translateWrapper('error')(error);
