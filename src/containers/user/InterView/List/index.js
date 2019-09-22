/* eslint-disable class-methods-use-this */
import React, { Fragment, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardHeader, Row, Col, Button, Modal, ModalBody,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loaders';
import GroupInput from './GroupInput';
import API from '../../../../apis';
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import Emp from '../empty';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isOpen: false,
      editData: [],
      info: {},
      forceValidate: false,
      isEdit: false,
      categoryId: '',
    };
  }

  componentDidMount() {
    this.getListQuestion();
  }

  async getListQuestion() {
    try {
      const result = await API.question.getList();
      const categories = result && result.data;
      this.setState({ categories });
    } catch (error) {
      console.log(error);
    }
  }

  async postListQuestion() {
    const { editData, info } = this.state;
    this.setState({ forceValidate: true });
    const check = editData.filter(data => data.checked && data.checked === 1);
    if (info.description && info.description !== '' && info.name && info.name !== '' && check.length !== 0) {
      this.setState({
        forceValidate: false, isOpen: false, editData: [], info: {}, isEdit: false,
      });
      try {
        await API.question.postList({ name: info.name, desc: info.description, config: JSON.stringify(editData) });
        this.getListQuestion();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async delListQuestion() {
    const { categoryId } = this.state;
    this.setState({ forceValidate: false, isOpen: false });
    try {
      await API.question.delList({ id: categoryId });
      this.getListQuestion();
    } catch (error) {
      console.log(error);
    }
  }

  async editListQuestion() {
    const { editData, info, categoryId } = this.state;
    this.setState({ forceValidate: true });
    const check = editData.filter(data => data.checked && data.checked === 1);
    if (info.description && info.description !== '' && info.name && info.name !== '' && check.length !== 0) {
      this.setState({ forceValidate: false, isOpen: false });
      try {
        await API.question.editList({
          id: categoryId, name: info.name, desc: info.description, config: JSON.stringify(editData),
        });
        this.getListQuestion();
      } catch (error) {
        console.log(error);
      }
    }
  }

  didPressEdit(category) {
    const editData = [...this.state.editData];
    this.setState({
      info: { listId: category.id, name: category.name, description: category.description },
      categoryId: category.id,
      isEdit: true,
      editData,
      isOpen: true,
    });
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }), () => {
      if (!this.state.isOpen) {
        this.setState({
          editData: [], info: {}, isEdit: false, forceValidate: false,
        });
      }
    });
  }

  renderRow(category, onEdit, indexing) {
    return (
      <Row>
        <Col>
          <div style={{
            flexDirection: 'row',
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            justifyItems: 'center',
            minHeight: 50,
          }}
          >
            <text style={{ margin: 'auto', width: '5%' }}>
              {indexing + 1}
              {' | '}
            </text>
            <text style={{ margin: 'auto', width: '35%' }}>
              List:
              {' '}
              {category.name}
            </text>
            <text style={{ margin: 'auto 10px auto 10px', width: '60%' }}>
              Note:
              {' '}
              {category.description}
            </text>
            <Button onClick={onEdit} style={{ margin: 'auto', width: '100' }}>
              Edit
            </Button>
          </div>
          <div style={{
            flexDirection: 'row',
            flex: 1,
            margin: '10px 0px 10px 0px',
            height: 1,
            backgroundColor: 'black',
          }}
          />
        </Col>
      </Row>
    );
  }

  render() {
    const {
      isOpen,
      categories,
      editData,
      forceValidate,
      isEdit,
      info,
    } = this.state;
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
          <PageTitle
            heading="List Questions"
            icon="pe-7s-user"
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '90%' }} className="main-card mb-3">
              <CardHeader className="card-header-lg">
                <div className="btn-actions-pane-right">
                  <Button
                    style={{ backgroundColor: '#f49100', border: 'none' }}
                    className="btn-wide btn-shadow btn-hover-shine"
                    onClick={() => this.setState({ isEdit: false, isOpen: true })}
                    size="md"
                  >
                    Add List Question
                  </Button>
                </div>
              </CardHeader>
              <CardBody style={{ marginLeft: 15 }}>
                {categories.length === 0 ? <Emp name="List Question Empty./" />
                  : categories && categories.map((category, index) => this.renderRow(category, () => this.didPressEdit(category), index))}
              </CardBody>
            </Card>
          </div>
          <Modal
            style={{
              boxShadow: 'none',
            }}
            centered
            size="lg"
            isOpen={isOpen}
            backdrop
            toggle={() => this.toggle()}
          >
            <ModalBody>
              <h5><b>{isEdit ? 'Edit List Question' : 'Create List Question'}</b></h5>
              <GroupInput
                data={editData}
                info={info}
                forceValidate={forceValidate}
                onChangeData={(dat) => { this.setState({ editData: dat }); }}
                onChangeInfo={(info) => { this.setState({ info }); }}
              />
              <Row>
                <Col xl={12}>
                  <Button
                    color="primary"
                    onClick={() => (isEdit ? this.editListQuestion() : this.postListQuestion())}
                  >
                    {isEdit ? 'Update' : 'Create'}
                  </Button>
                  {isEdit
                  && (
                  <Button
                    color="danger"
                    style={{ marginLeft: 10 }}
                    onClick={() => this.delListQuestion()}
                  >
                    Delete
                  </Button>
                  )}
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
export default withRouter(index);

index.propTypes = {
  t: PropTypes.bool,
};

index.defaultProps = {
  t: null,
};
