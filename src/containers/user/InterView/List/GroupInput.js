/* eslint-disable no-nested-ternary */
/* eslint-disable class-methods-use-this */
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
      info: props.info,
      categories: [],
    };
  }

  componentDidMount() {
    this.getListConfig();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
    });
  }

  onChangeValue(type, value) {
    const { onChangeData, onChangeInfo } = this.props;
    if (type === 'name' || type === 'description') {
      const inputData = { ...this.state.info };
      inputData[type] = value.target.value;
      this.setState({ info: inputData }, onChangeInfo(inputData));
    }
    const catId = type.split('_')[0];
    const typing = type.split('_')[1];
    const val = typing === 'checked' ? value.target.checked : value.target.value;
    const inputData = [...this.state.data];
    inputData.map((map) => {
      if (map.categoryId === Number(catId)) {
        map[typing] = typing === 'questions' ? Number(val) : val ? 1 : 0;
      }
      return null;
    });
    this.setState({ data: inputData }, onChangeData(inputData));
  }

  async getListConfig() {
    const { onChangeData } = this.props;
    const { info: { listId } } = this.state;
    try {
      const result = await API.question.getListConfig();
      const categories = result && result.data;
      const temp = [];
      categories.map(list => temp.push({ categoryId: list.categoryId, questions: 1 }));
      this.setState({ data: temp, categories }, onChangeData(temp));
      if (listId) {
        this.getListConfigId();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getListConfigId() {
    const { onChangeData } = this.props;
    const { info: { listId }, categories } = this.state;
    try {
      const result = await API.question.getListConfigId({ id: listId });
      const list = result && result.data;
      const config = JSON.parse(list.config);
      const temp = [];
      config.map((con) => {
        categories.map((cat) => {
          if (cat.categoryId === con.categoryId) {
            temp.push({ categoryId: cat.categoryId, questions: con.questions >= cat.total ? cat.total : con.questions, checked: (con.checked && con.checked === 1) ? 1 : 0 });
          }
          return null;
        });
        return null;
      });
      this.setState({ data: temp }, onChangeData(temp));
    } catch (error) {
      console.log(error);
    }
  }

  renderOptions(option) {
    const opt = [];
    for (let i = 1; i < option + 1; i += 1) {
      opt.push(i);
    }
    return opt;
  }

  renderRow(category, index) {
    const { data } = this.state;
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
              {index + 1}
              {' | '}
            </text>
            <input
              style={{ margin: 'auto', width: '5%' }}
              type="checkbox"
              disabled={category.total === 0}
              checked={data[index] && data[index].checked === 1}
              onChange={e => this.onChangeValue(`${category.categoryId}_checked`, e)}
            />
            <text style={{ textAlign: 'center', margin: 'auto', width: '70%' }}>
              Category:
              {' '}
              {category.category}
              {' '}
              |
              Question(s):
              {' '}
              {`(${category.total})`}
            </text>
            <Input
              value={data[index] && data[index].questions}
              style={{ width: '25%', margin: 'auto' }}
              type="select"
              disabled={category.total === 0}
              onChange={e => this.onChangeValue(`${category.categoryId}_questions`, e)}
            >
              {
                this.renderOptions(category.total).map(m => <option>{m}</option>)
              }
            </Input>
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
    // eslint-disable-next-line react/prop-types
    const {
      forceValidate,
    } = this.props;
    const { data, categories, info } = this.state;
    const check = (data && data.filter(data => data.checked && data.checked === 1)) || [];
    return (
      <React.Fragment>
        <Row>
          <Col xl={12}>
            <FormGroup>
              <Label><b>Name</b></Label>
              <br />
              <InputComponent
                type="text"
                errors={[]}
                onChange={e => this.onChangeValue('name', e)}
                value={info.name}
              />
              <ErrorMessage
                message="Name empty./"
                edited={info.name && info.name !== ''}
                forceValidate={forceValidate}
              />
            </FormGroup>
          </Col>
          <Col xl={12}>
            <FormGroup>
              <Label><b>Description</b></Label>
              <br />
              <InputComponent
                type="text_area"
                errors={[]}
                onChange={e => this.onChangeValue('description', e)}
                value={info.description}
              />
              <ErrorMessage
                message="Description empty./"
                edited={info.description && info.description !== ''}
                forceValidate={forceValidate}
              />
            </FormGroup>
          </Col>
          <Col xl={12}>
            <FormGroup>
              <Label><b>Option(s)</b></Label>
              <br />
              {categories.map((category, index) => this.renderRow(category, index))}
              <ErrorMessage
                message="Option empty./"
                edited={check.length !== 0}
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
