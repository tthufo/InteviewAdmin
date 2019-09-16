import React from 'react';
import {
  Row, Col, Button,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { translateWrapper } from 'ter-localization';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { setCompany as setCompanyAction, setSimulation } from '../../../actions/Company/index';
import { getCompany } from '../../../apis/company';
import { UserWrapper } from '../../../components';

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    height: '100%',
    width: '200px',
    backgroundColor: '#f49100',
    border: '0px transparent',
  },
  bold: {
    fontWeight: 'bold',
  },
  finishContainer: {
    paddingTop: 30,
  },
};

class Finish extends React.PureComponent {
  async getAPICompany() {
    const handleSuccess = (data) => {
      if (data.data && data.data.simulation && data.data.simulation.duration) {
        localStorage.setItem('duration', data.data.simulation.duration);
      }
      const {
        dispatchSetCompany, dispatchSetSimulation,
      } = this.props;
      dispatchSetCompany(data.data);
      dispatchSetSimulation(data.data.simulation);
    };
    try {
      const data = await getCompany();
      handleSuccess(data);
    } catch (error) {
      handleSuccess(error.response);
    }
  }

  render() {
    const { t, history } = this.props;
    return (
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="form-wizard-content" style={styles.finishContainer}>
          <Row>
            <Col xl={12}>
              <div style={styles.buttonContainer}>
                <h4>
                  {t('Finished to design your simulation')}
                  {' '}
                  <span role="img" aria-label="image">🎉</span>
                </h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <div style={styles.buttonContainer}>
                <p>{t('Now you have finished you design! Great job!')}</p>
                <p>{t('You now have "initial draft of your business projection"')}</p>
                <p>{t("Wait, wait, wait! Don't hury up ! Keep calm !")}</p>
                <p>
                  {t('Before sending this toinvestors or other stakeholders, please check it by your self')}
                  {' '}
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <div style={styles.buttonContainer}>
                <Button
                  onClick={async () => {
                    await this.getAPICompany();
                    history.push('/users/simulation');
                  }}
                  color="primary"
                  style={styles.button}
                >
                  {t('View simulation result')}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

function mapStateToProps(state) {
  return {
    simulationInfo: state.companyInfo.get('simulation'),
    companyInfo: state.companyInfo.get('company'),
  };
}

const mapDispatchToProps = dispatch => ({
  dispatchSetCompany: value => dispatch(setCompanyAction(value)),
  dispatchSetSimulation: value => dispatch(setSimulation(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserWrapper(translateWrapper('Finish')(Finish)));

Finish.propTypes = {
  t: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  dispatchSetCompany: PropTypes.func.isRequired,
  dispatchSetSimulation: PropTypes.func.isRequired,
};
