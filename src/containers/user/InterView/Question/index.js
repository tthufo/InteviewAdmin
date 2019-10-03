/* eslint-disable class-methods-use-this */
import React, { Fragment, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardHeader, Row, Col, Button, Modal, ModalBody, Input, Label,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loaders';
import { toast } from 'react-toastify';
import Markdown from 'markdown-to-jsx';
import GroupInput from './GroupInput';
import API from '../../../../apis';
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import Emp from '../empty';

function trim(input, length) {
  if (input.length > length) { return `${input.substring(0, length)}...`; }
  return input;
}
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      cats: [],
      selectCat: '',
      search: '',
      isOpen: false,
      editData: {},
      forceValidate: false,
      isEdit: false,
      isDisable: false,
      categoryId: '',
    };
    this.timeout = 0;
  }

  componentDidMount() {
    this.getQuestion();
    this.getCategory();
  }

  async getCategory() {
    try {
      const result = await API.category.getCategory();
      const cats = result && result.data;
      this.setState({ cats, selectCat: cats[0].name });
    } catch (error) {
      console.log(error);
    }
  }

  async getQuestion() {
    try {
      const result = await API.question.getAnswer();
      const categories = result && result.data;
      this.setState({ categories });
    } catch (error) {
      console.log(error);
    }
  }

  doSearch() {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {

    }, 300);
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
    && editData.category !== undefined && editData.catId !== undefined
    ) {
      this.setState({ forceValidate: false, isOpen: false });
      try {
        await API.question.postQuestion({ question: JSON.stringify(question) });
        this.getQuestion();
        this.setState({ editData: {}, isEdit: false, forceValidate: false });
      } catch (error) {
        console.log(error);
        toast.error('Create question error, new question proly existed', {
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
        this.setState({ editData: {}, isEdit: false, forceValidate: false });
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
    }, () => this.setState({ isOpen: true }));
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }), () => {
      if (!this.state.isOpen) {
        this.setState({
          editData: {}, isEdit: false, forceValidate: false, isDisable: false,
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
            {/* <text style={{ margin: 'auto', width: '45%' }}> */}
            <Markdown style={{ margin: 'auto', width: '45%' }}>
              {trim(category.subject, 135)}
            </Markdown>
            {/* </text> */}
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
      isEdit, isDisable,
      cats, selectCat, search,
    } = this.state;

    const filterd = search !== '' ? categories && categories.filter(cat => cat.category === selectCat && cat.subject.toLowerCase().includes(search.toLowerCase()))
      : categories && categories.filter(cat => cat.category === selectCat);

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
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Label style={{ margin: 'auto' }}>
                      Category
                    </Label>
                    <Input
                      style={{ width: 160, marginLeft: 10 }}
                      value={selectCat}
                      type="select"
                      onChange={(e) => {
                        const indexing = e.nativeEvent.target.selectedIndex;
                        this.setState({ selectCat: cats[indexing].name });
                      }}
                    >
                      {
                        cats.map(m => <option>{m.name}</option>)
                      }
                    </Input>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Label style={{ margin: 'auto' }}>
                      Search
                    </Label>
                    <Input
                      style={{ width: 160, marginLeft: 10 }}
                      value={search}
                      type="input"
                      onChange={(e) => {
                        this.setState({ search: e.target.value }, () => this.doSearch());
                      }}
                    />
                  </div>
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
                {categories.length === 0 ? <Emp name="Question Empty./" />
                  : filterd.length !== 0 ? filterd.map((category, index) => this.renderRow(category, () => this.didPressEdit(category), index)) : <Emp name={`Question about: ${selectCat} Empty./`} />}
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
              <h5><b>{isEdit ? 'Edit Question' : 'Create Question'}</b></h5>
              <GroupInput
                data={editData}
                forceValidate={forceValidate}
                onChangeData={(dat) => { this.setState({ editData: dat }); }}
                onDisable={() => this.setState({ isDisable: true })}
              />
              <Row>
                <Col xl={12}>
                  {!isDisable
                    ? (
                      <Button
                        color="primary"
                        onClick={() => (isEdit ? this.editQuestion() : this.postQuestion())}
                      >
                        {isEdit ? 'Update' : 'Create'}
                      </Button>
                    ) : (
                      null
                      // <Button
                      //   color="primary"
                      //   onClick={() => this.props.history.push('/category')}
                      // >
                      //   Go to Category
                      // </Button>
                    )}
                  {isEdit
                  && (
                  <Button
                    color="danger"
                    style={{ marginLeft: 10 }}
                    onClick={() => this.delQuestion()}
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
