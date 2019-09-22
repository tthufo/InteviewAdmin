/* eslint-disable class-methods-use-this */
import React, { Fragment, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardHeader, Row, Col, Button, Modal, ModalBody,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loaders';
import { toast } from 'react-toastify';
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
      editData: {},
      forceValidate: false,
      isEdit: false,
      categoryId: '',
    };
  }

  componentDidMount() {
    this.getCategory();
  }

  async getCategory() {
    try {
      const result = await API.category.getCategory();
      const categories = result && result.data;
      this.setState({ categories });
    } catch (error) {
      console.log(error);
    }
  }

  async postCategory() {
    const { editData } = this.state;
    this.setState({ forceValidate: true });
    if (editData.name && editData.name !== '' && editData.desc && editData.desc !== '') {
      this.setState({ forceValidate: false, isOpen: false });
      try {
        await API.category.postCategory({ name: editData.name, desc: editData.desc });
        this.getCategory();
        this.setState({ editData: {} });
      } catch (error) {
        console.log(error);
        toast.error('Create category error, new category proly existed', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  }

  async delCategory() {
    const { categoryId } = this.state;
    this.setState({ forceValidate: false, isOpen: false });
    try {
      await API.category.delCategory({ catId: categoryId });
      this.getCategory();
      this.setState({ editData: {} });
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
        this.setState({ editData: {} });
      } catch (error) {
        console.log(error);
        toast.error('Edit category error, new category proly existed', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
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
    }), () => {
      if (!this.state.isOpen) {
        this.setState({ editData: {}, isEdit: false });
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
            <text style={{ margin: 'auto', width: '25%' }}>
              Category:
              {' '}
              {category.name}
            </text>
            <text style={{ margin: 'auto 10px auto 10px', width: '70%' }}>
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
            heading="Category"
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
                    Add Category
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {categories.length === 0 ? <Emp name="Category Empty./" />
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
              <h5><b>{isEdit ? 'Edit Category' : 'Create Category'}</b></h5>
              <GroupInput
                data={editData}
                forceValidate={forceValidate}
                onChangeData={(dat) => { this.setState({ editData: dat }); }}
              />
              <Row>
                <Col xl={12}>
                  <Button
                    color="primary"
                    onClick={() => (isEdit ? this.editCategory() : this.postCategory())}
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
