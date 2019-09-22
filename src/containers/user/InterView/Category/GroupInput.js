import React from 'react';
import {
  Row, Col, FormGroup, Label,
} from 'reactstrap';

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
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
    });
  }

  onChangeValue(type, value) {
    const { onChangeData } = this.props;
    const inputData = { ...this.state.data };
    const val = value.target.value;
    inputData[type] = val;
    this.setState({ data: inputData }, onChangeData(inputData));
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const {
      forceValidate,
    } = this.props;
    const { data } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col xl={3}>
            <FormGroup>
              <Label><b>Category Name</b></Label>
              <br />
              <InputComponent
                type="text"
                errors={[]}
                onChange={e => this.onChangeValue('name', e)}
                value={data.name}
              />
              <ErrorMessage
                message="Category empty./"
                edited={data.name && data.name !== ''}
                forceValidate={forceValidate}
              />
            </FormGroup>
          </Col>
          <Col xl={8}>
            <FormGroup>
              <Label><b>Description</b></Label>
              <br />
              <InputComponent
                type="text"
                errors={[]}
                onChange={e => this.onChangeValue('desc', e)}
                value={data.desc}
              />
              <ErrorMessage
                message="Description empty./"
                edited={data.desc && data.desc !== ''}
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
