import React from 'react';
import {
  Row, Col, FormGroup, Label, Input,
} from 'reactstrap';
import API from '../../../../apis';
import InputComponent from '../../../../components/FormGroup/Input';

const ErrorMessage = ({
  message, forceValidate, edited,
}) => {
  if (!forceValidate || edited) {
    return null;
  }

  if (message) {
    return <p style={{ color: 'red', marginBottom: 0 }}>{message}</p>;
  }

  return null;
};

class GroupInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      categories: [],
    };
  }

  componentDidMount() {
    this.getCategory();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
    });
  }

  onChangeValue(type, value) {
    const { onChangeData } = this.props;
    const { categories } = this.state;
    const inputData = { ...this.state.data };
    if (type === 'category') {
      const indexing = value.nativeEvent.target.selectedIndex;
      inputData.catId = categories[indexing].id;
    }
    if (type === 'answerId') {
      inputData.answerId = value;
    } else {
      const val = value.target.value;
      inputData[type] = val;
    }
    console.log(inputData);
    this.setState({ data: inputData }, onChangeData(inputData));
  }

  async getCategory() {
    try {
      const result = await API.category.getCategory();
      const categories = result && result.data;
      this.setState({ categories });
      const inputData = { ...this.state.data };
      inputData.category = categories[0].name;
      inputData.catId = categories[0].id;
      this.setState({ data: inputData });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const {
      forceValidate,
    } = this.props;
    const { data, categories } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col xl={12}>
            <FormGroup>
              <Label><b>Category</b></Label>
              <br />
              <Input
                value={data.category}
                type="select"
                onChange={e => this.onChangeValue('category', e)}
              >
                {
                  categories.map(m => <option>{m.name}</option>)
                }
              </Input>
            </FormGroup>
          </Col>
          <Col xl={12}>
            <FormGroup>
              <Label><b>Question</b></Label>
              <br />
              <InputComponent
                type="text_area"
                errors={[]}
                onChange={e => this.onChangeValue('subject', e)}
                value={data.subject}
              />
              <ErrorMessage
                message="Empty"
                edited={data.subject && data.subject !== ''}
                forceValidate={forceValidate}
              />
            </FormGroup>
          </Col>
          <Col xl={6}>
            <FormGroup>
              <Label><b>Q1</b></Label>
              <input
                style={{ marginLeft: 10 }}
                type="radio"
                checked={data.answerId === 0}
                onChange={() => this.onChangeValue('answerId', 0)}
              />
              <ErrorMessage
                message="Check"
                edited={data.answerId !== undefined}
                forceValidate={forceValidate}
              />
              <br />
              <InputComponent
                type="text_area"
                errors={[]}
                onChange={e => this.onChangeValue('q1', e)}
                value={data.q1}
              />
              <ErrorMessage
                message="Empty"
                edited={data.q1 && data.q1 !== ''}
                forceValidate={forceValidate}
              />
            </FormGroup>
          </Col>
          <Col xl={6}>
            <FormGroup>
              <Label><b>Q2</b></Label>
              <input
                style={{ marginLeft: 10 }}
                type="radio"
                checked={data.answerId === 1}
                onChange={() => this.onChangeValue('answerId', 1)}
              />
              <ErrorMessage
                message="Check"
                edited={data.answerId !== undefined}
                forceValidate={forceValidate}
              />
              <br />
              <InputComponent
                type="text_area"
                errors={[]}
                onChange={e => this.onChangeValue('q2', e)}
                value={data.q2}
              />
              <ErrorMessage
                message="Empty"
                edited={data.q2 && data.q2 !== ''}
                forceValidate={forceValidate}
              />
            </FormGroup>
          </Col>
          <Col xl={6}>
            <FormGroup>
              <Label><b>Q3</b></Label>
              <input
                style={{ marginLeft: 10 }}
                type="radio"
                checked={data.answerId === 2}
                onChange={() => this.onChangeValue('answerId', 2)}
              />
              <ErrorMessage
                message="Check"
                edited={data.answerId !== undefined}
                forceValidate={forceValidate}
              />
              <br />
              <InputComponent
                type="text_area"
                errors={[]}
                onChange={e => this.onChangeValue('q3', e)}
                value={data.q3}
              />
              <ErrorMessage
                message="Empty"
                edited={data.q3 && data.q3 !== ''}
                forceValidate={forceValidate}
              />
            </FormGroup>
          </Col>
          <Col xl={6}>
            <FormGroup>
              <Label><b>Q4</b></Label>
              <input
                style={{ marginLeft: 10 }}
                type="radio"
                checked={data.answerId === 3}
                onChange={() => this.onChangeValue('answerId', 3)}
              />
              <ErrorMessage
                message="Check"
                edited={data.answerId !== undefined}
                forceValidate={forceValidate}
              />
              <br />
              <InputComponent
                type="text_area"
                errors={[]}
                onChange={e => this.onChangeValue('q4', e)}
                value={data.q4}
              />
              <ErrorMessage
                message="Empty"
                edited={data.q4 && data.q4 !== ''}
                forceValidate={forceValidate}
              />
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default GroupInput;
