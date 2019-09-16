import React from 'react';
import Loader from 'react-loaders';

class RouteSuspense extends React.PureComponent {
  render() {
    return (
      <div className="loader-container">
        <div className="loader-container-inner">
          <div className="text-center">
            <Loader color="#1D3B6C" type="ball-pulse-rise" />
          </div>
        </div>
      </div>
    );
  }
}


export default RouteSuspense;
