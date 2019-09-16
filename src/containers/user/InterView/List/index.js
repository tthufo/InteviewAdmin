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
    // const question = {
    //   config: editData,
    // };
    const check = editData.filter(data => data.checked && data.checked === 1);
    if (info.description && info.description !== '' && info.name && info.name !== '' && check.length !== 0) {
      this.setState({ forceValidate: false, isOpen: false });
      try {
        await API.question.postList({ name: info.name, desc: info.description, config: JSON.stringify(editData) });
        this.getListQuestion();
        this.setState({ editData: [], info: {} });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async delCategory() {
    const { categoryId } = this.state;
    this.setState({ forceValidate: false, isOpen: false });
    try {
      await API.category.delCategory({ catId: categoryId });
      this.getCategory();
    } catch (error) {
      console.log(error);
    }
  }

  async editCategory() {
    const { editData, categoryId } = this.state;
    this.setState({ forceValidate: true });
    if (editData.name && editData.name !== '' && editData.desc && editData.desc !== '') {
      this.setState({ forceValidate: false, isOpen: false });
      try {
        await API.category.editCategory({ catId: categoryId, name: editData.name, desc: editData.desc });
        this.getCategory();
      } catch (error) {
        console.log(error);
      }
    }
  }

  didPressEdit(category) {
    const editData = { ...this.state.editData };
    editData.name = category.name || '';
    editData.desc = category.description || '';
    this.setState({
      categoryId: category.id,
      isEdit: true,
      editData,
      isOpen: true,
    });
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  renderRow(category, onEdit) {
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
            <text style={{ margin: 'auto', width: '25%' }}>
              {category.name}
            </text>
            <text style={{ margin: 'auto 10px auto 10px', width: '70%' }}>
              {category.description}
            </text>
            {/* <Button onClick={onEdit} style={{ margin: 'auto', width: '100' }}>
              Edit
            </Button> */}
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
                {categories && categories.map(category => this.renderRow(category, () => this.didPressEdit(category)))}
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
              <h5><b>Config</b></h5>
              <GroupInput
                data={editData}
                info={info}
                forceValidate={forceValidate}
                onChangeData={(dat) => { this.setState({ editData: dat }); console.log(dat); }}
                onChangeInfo={(info) => { this.setState({ info }); }}
              />
              <Row>
                <Col xl={12}>
                  <Button
                    color="primary"
                    onClick={() => (isEdit ? this.editCategory() : this.postListQuestion())}
                  >
                    {isEdit ? 'Update' : 'Create'}
                  </Button>
                  {isEdit
                  && (
                  <Button
                    color="danger"
                    style={{ marginLeft: 10 }}
                    onClick={() => this.delCategory()}
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
