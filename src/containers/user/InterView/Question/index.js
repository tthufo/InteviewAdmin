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
      editData: {},
      forceValidate: false,
      isEdit: false,
      categoryId: '',
    };
  }

  componentDidMount() {
    this.getQuestion();
  }

  async getQuestion() {
    try {
      const result = await API.question.getAnswer();
      const categories = result && result.data;
      console.log(categories);
      this.setState({ categories });
    } catch (error) {
      console.log(error);
    }
  }

  async postQuestion() {
    const { editData } = this.state;
    this.setState({ forceValidate: true });
    const question = {
      questions: [{ question: editData.q1 },
        { question: editData.q2 },
        { question: editData.q3 },
        { question: editData.q4 }],
      category: editData.category,
      subject: editData.subject,
      answerId: editData.answerId,
      categoryId: editData.catId,
    };
    if (editData.q1 && editData.q1 !== ''
    && editData.q2 && editData.q2 !== ''
    && editData.q3 && editData.q3 !== ''
    && editData.q4 && editData.q4 !== ''
    && editData.subject && editData.subject !== ''
    && editData.answerId !== undefined
    ) {
      this.setState({ forceValidate: false, isOpen: false });
      try {
        await API.question.postQuestion({ question: JSON.stringify(question) });
        this.getQuestion();
        this.setState({ editData: {} });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async delQuestion() {
    const { categoryId } = this.state;
    this.setState({ forceValidate: false, isOpen: false });
    try {
      await API.question.delQuestion({ questionId: categoryId });
      this.getQuestion();
    } catch (error) {
      console.log(error);
    }
  }

  async editQuestion() {
    const { editData, categoryId } = this.state;
    this.setState({ forceValidate: true });
    const question = {
      questions: [{ question: editData.q1, id: editData.id1 },
        { question: editData.q2, id: editData.id2 },
        { question: editData.q3, id: editData.id3 },
        { question: editData.q4, id: editData.id4 }],
      questionId: categoryId,
      category: editData.category,
      subject: editData.subject,
      answerId: editData.answerId,
      categoryId: editData.catId,
    };
    if (editData.q1 && editData.q1 !== ''
    && editData.q2 && editData.q2 !== ''
    && editData.q3 && editData.q3 !== ''
    && editData.q4 && editData.q4 !== ''
    && editData.subject && editData.subject !== ''
    && editData.answerId !== undefined
    ) {
      this.setState({ forceValidate: false, isOpen: false });
      try {
        await API.question.editQuestion({ question: JSON.stringify(question) });
        this.getQuestion();
        this.setState({ editData: {} });
      } catch (error) {
        console.log(error);
      }
    }
  }

  didPressEdit(category) {
    const editData = { ...this.state.editData };
    editData.category = category.category || '';
    editData.subject = category.subject || '';
    editData.catId = category.catId || '';
    editData.answerId = category.resultId || '';
    editData.questionId = category.questionId || '';
    this.setState({
      categoryId: category.questionId,
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
            <text style={{ margin: 'auto', width: '45%' }}>
              {category.subject}
            </text>
            <text style={{ margin: 'auto 10px auto 10px', width: '50%' }}>
              Category:
              {' '}
              {category.category}
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
            heading="Questions"
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
                    Add Question
                  </Button>
                </div>
              </CardHeader>
              <CardBody style={{ marginLeft: 15 }}>
                {categories && categories.map((category, index) => this.renderRow(category, () => this.didPressEdit(category), index))}
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
              <h5><b>Question</b></h5>
              <GroupInput
                data={editData}
                forceValidate={forceValidate}
                onChangeData={(dat) => { this.setState({ editData: dat }); }}
              />
              <Row>
                <Col xl={12}>
                  <Button
                    color="primary"
                    onClick={() => (isEdit ? this.editQuestion() : this.postQuestion())}
                  >
                    {isEdit ? 'Update' : 'Create'}
                  </Button>
                  {/* {isEdit
                  && (
                  <Button
                    color="danger"
                    style={{ marginLeft: 10 }}
                    onClick={() => this.delQuestion()}
                  >
                    Delete
                  </Button>
                  )} */}
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
