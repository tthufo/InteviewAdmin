import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { CardBody, Card } from 'reactstrap';
import Table from './table';
import PageTitle from '../../../Layout/AppMain/PageTitle';

class ManageUser extends React.PureComponent {
  render() {
    return (
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <PageTitle
          heading="Manage User account"
          icon="pe-7s-users"
        />
        <Card className="main-card mb-3">
          <CardBody>
            <Table
              {...this.props}
              onRef={(ref) => { this.table = ref; }}
              onDeleteClick={this.handleDeleteEmployee}
            />
          </CardBody>
        </Card>
      </ReactCSSTransitionGroup>
    );
  }
}

export default ManageUser;
