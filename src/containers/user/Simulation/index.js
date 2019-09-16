import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { translateWrapper } from 'ter-localization';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import {
  withRouter,
} from 'react-router-dom';
import {
  Button, FormGroup, Label, Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import ProjectFSByTable from './ProjectFSByTable';
import VisualizedFS from './VisualizedFS';
import KeyIndicator from './KeyIndicator';
import AssumptionList from './AssumptionList';
import Prerequisites from './Prerequisites';
import { setCompany as setCompanyAction, setSimulation } from '../../../actions/Company/index';
import { UserWrapper } from '../../../components';
import PageTitle from '../../../Layout/AppMain/PageTitle';

function jsUcfirst(string) {
  return string && string.charAt(0).toUpperCase() + string.slice(1);
}

class TabExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
    };
  }

  render() {
    const {
      t, companyInfo, simulationInfo, history,
    } = this.props;
    const { status } = this.state;
    const id = simulationInfo && simulationInfo.id;
    return (
      <Fragment>
        <PageTitle
          heading={simulationInfo.businessName}
          subheading={t(simulationInfo.businessType)}
          icon="pe-7s-note2"
        />
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >

          <ProjectFSByTable
            company={companyInfo}
            duration={simulationInfo.duration}
            jsUcfirst={jsUcfirst}
          />
          <Tabs
            defaultActiveKey="1"
            renderTabBar={() => <ScrollableInkTabBar />}
            renderTabContent={() => <TabContent />}
          >
            <TabPane tab={t('Project FS by Table')} key="1">
              <ProjectFSByTable
                company={companyInfo}
                duration={simulationInfo.duration}
                jsUcfirst={jsUcfirst}
              />
            </TabPane>
            <TabPane tab={t('Visualized FS')} key="2">
              <VisualizedFS
                duration={simulationInfo.duration}
                company={companyInfo}
                jsUcfirst={jsUcfirst}
              />
            </TabPane>
            <TabPane tab={t('Key indicator')} key="3">
              <KeyIndicator
                duration={simulationInfo.duration}
                company={companyInfo}
                jsUcfirst={jsUcfirst}
              />
            </TabPane>
            <TabPane tab={t('Assumpition List')} key="5">
              <AssumptionList
                duration={simulationInfo.duration}
                company={companyInfo}
                jsUcfirst={jsUcfirst}
              />
            </TabPane>
            <TabPane tab={t('Prerequisites')} key="6">
              <Prerequisites
                duration={simulationInfo.duration}
                company={companyInfo}
                jsUcfirst={jsUcfirst}
              />
            </TabPane>
          </Tabs>
          <div style={{
            position: 'absolute',
            right: 230,
            height: 50,
            width: 180,
            marginBottom: 20,
            top: 80,
          }}
          >
            <FormGroup>
              <Label>
                <b>{t('Status')}</b>
                {' '}
                {t('Comming soon')}
              </Label>
              <br />
              <Input
                value={status}
                type="select"
                disabled
                onChange={e => this.setState({ status: e.target.value })}
              >
                <option value={0}>{t('Approved')}</option>
                <option value={1}>{t('Denied')}</option>
              </Input>
            </FormGroup>
          </div>
          <Button
            color="primary"
            style={{
              position: 'absolute',
              right: 30,
              height: 50,
              width: 150,
              marginBottom: 20,
              top: 100,
              backgroundColor: '#f49100',
              border: '0px transparent',
            }}
            onClick={() => history.push(`/users/simulation-setting/${id}/edit`)}
          >
            {t('Edit Simulation')}
          </Button>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    simulationInfo: state.companyInfo.get('simulation').toJS(),
    companyInfo: state.companyInfo.get('company').toJS(),
  };
}


const mapDispatchToProps = dispatch => ({
  dispatchSetCompany: value => dispatch(setCompanyAction(value)),
  dispatchSetSimulation: value => dispatch(setSimulation(value)),
});

export default withRouter(UserWrapper(connect(mapStateToProps, mapDispatchToProps)(translateWrapper('TabExample')(TabExample))));
