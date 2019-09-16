import React from 'react';
import { connect } from 'react-redux';

const getNavStates = (indx, length) => {
  const styles = [];
  for (let i = 0; i < length; i += 1) {
    if (i < indx) {
      styles.push('done');
    } else if (i === indx) {
      styles.push('done');
    } else {
      styles.push('todo');
    }
  }
  return { current: indx, styles };
};

const checkNavState = (currentStep, stepsLength) => {
  if (currentStep > 0 && currentStep < stepsLength - 1) {
    return {
      showPreviousBtn: true,
      showNextBtn: true,
    };
  } if (currentStep === 0) {
    return {
      showPreviousBtn: false,
      showNextBtn: true,
    };
  }
  return {
    showPreviousBtn: true,
    showNextBtn: false,
  };
};

class MultiStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreviousBtn: false,
      showNextBtn: true,
      compState: 0,
      navState: getNavStates(0, props.steps.length),
    };
    this.handleJump = this.handleJump.bind(this);
  }

  componentDidMount() {
    const { onRef } = this.props;
    if (onRef) {
      onRef(this, this.handleJump);
    }
  }

    setNavState = (next) => {
      this.setState({
        navState: getNavStates(next, this.props.steps.length),
      });
      if (next < this.props.steps.length) {
        this.setState({ compState: next });
      }
      this.setState(checkNavState(next, this.props.steps.length));
    }

    handleKeyDown = (evt) => {
      if (evt.which === 13) {
        this.next();
      }
    }

    handleOnClick = (evt) => {
      if (
        evt.currentTarget.value === this.props.steps.length - 1
            && this.state.compState === this.props.steps.length - 1
      ) {
        this.setNavState(this.props.steps.length);
      } else {
        this.setNavState(evt.currentTarget.value);
      }
    }

    next = () => {
      this.setNavState(this.state.compState + 1);
    }

    previous = () => {
      if (this.state.compState > 0) {
        this.setNavState(this.state.compState - 1);
      }
    }

    getClassName = (className, i) => `${className}-${this.state.navState.styles[i]}`

    renderSteps = () => this.props.steps.map((s, i) => (
      <li
        className={this.getClassName('form-wizard-step', i)}
        onClick={this.props.simulationInfo && this.props.simulationInfo.businessName ? this.handleOnClick : null}
        key={i}
        value={i}
      >
        <em>{i + 1}</em>
        <span>{this.props.steps[i].name}</span>
      </li>
    ))

    handleJump(position) {
      this.setNavState(position);
    }

    render() {
      const { component } = this.props.steps[this.state.compState];
      return (
        <div>
          <ol className="forms-wizard">
            {this.renderSteps()}
          </ol>
          {component({
            next: this.next,
            previous: this.previous,
          })}
          {/* <div className="divider" />
          <div className="clearfix">
            <div style={this.props.showNavigation ? {} : { display: 'none' }}>
              <Button
                color="secondary"
                className="btn-shadow float-left btn-wide btn-pill"
                outline
                style={this.state.showPreviousBtn ? {} : { display: 'none' }}
                onClick={this.previous}
              >
                Back
              </Button>

              <Button
                color="primary"
                className="btn-shadow btn-wide float-right btn-pill btn-hover-shine"
                style={this.state.showNextBtn ? {} : { display: 'none' }}
                onClick={this.next}
              >
                Next
              </Button>
            </div>
          </div> */}
        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    simulationInfo: state.companyInfo.get('simulation').toJS(),
  };
}

export default connect(mapStateToProps)(MultiStep);

MultiStep.defaultProps = {
  showNavigation: true,
};
