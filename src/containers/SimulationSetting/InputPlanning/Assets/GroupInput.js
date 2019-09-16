import React from 'react';
import {
  Row, Col, FormGroup, Label,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import InputComponent from '../../../../components/FormGroup/Input';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

  onChangeValue(type, value, opt) {
    const { onChangeData, types, onChangeCategory } = this.props;
    const inputData = { ...this.state.data };
    const result = value.target.value;
    inputData[type] = result;
    if (opt !== undefined) {
      const select = value.nativeEvent.target.selectedIndex;
      inputData.type = types[select].type;
      inputData.code = types[select].code;
      inputData.value = '';
      onChangeCategory();
    }
    this.setState({ data: inputData }, onChangeData(inputData));
  }

  // eslint-disable-next-line class-methods-use-this
  duration(duration, startYear) {
    const temp = [];
    if (duration !== '') {
      for (let i = 0; i < duration; i += 1) {
        temp.push(`${startYear + i}`);
      }
    }
    return temp;
  }

  durable() {
    const { data } = this.state;
    const { types } = this.props;
    for (let i = 0; i < types.length; i += 1) {
      if (types[i].code === data.code && types[i].type === data.type) {
        return types[i].durableLife;
      }
    }
    return 3;
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const {
      duration, startYear,
      edit, t,
      forceValidate,
      forceValidatePop, types,
    } = this.props;
    const { data } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col xl={4}>
            <FormGroup>
              <Label><b>{t('Asset Category')}</b></Label>
              <br />
              <Input
                value={`${data.type + data.code}`}
                type="select"
                disabled={edit !== undefined}
                onChange={e => this.onChangeValue('category', e, true)}
              >
                {
                  types.map(m => <option value={`${m.type + m.code}`}>{m.name}</option>)
                }
              </Input>
            </FormGroup>
          </Col>
          <Col xl={4}>
            <FormGroup>
              <Label><b>{t('Assumed acquisition FY')}</b></Label>
              <br />
              <Input
                value={data.year}
                type="select"
                disabled={edit !== undefined}
                onChange={e => this.onChangeValue('year', e)}
              >
                {
                  this.duration(duration, startYear).map(m => <option>{m}</option>)
                }
              </Input>
            </FormGroup>
          </Col>
          <Col xl={4}>
            <FormGroup>
              <Label><b>{t('Assumed acquisition months')}</b></Label>
              <br />
              <Input disabled type="select">
                {
                  months.map(m => <option>{t(m)}</option>)
                }
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xl={4}>
            <FormGroup>
              <Label><b>{t('Acquisition price')}</b></Label>
              <br />
              <InputComponent
                type="number_format"
                name="value"
                errors={[]}
                onChange={e => this.onChangeValue('value', e)}
                value={data.value}
              />
              <ErrorMessage
                message={t('Amount can not be empty')}
                edited={data.value !== ''}
                forceValidate={edit !== undefined ? forceValidatePop : forceValidate}
              />
            </FormGroup>
          </Col>
          <Col xl={4}>
            <FormGroup>
              <Label><b>{t('Durable life')}</b></Label>
              <br />
              <Input
                disabled
                value={duration === '' ? '' : `${this.durable()} ${t('years')}`}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col xl={4}>
            <FormGroup>
              <Label><b>{t('Depreciation')}</b></Label>
              <br />
              <Input
                disabled
                type="select"
              >
                <option>{t('Straight-line depreciation')}</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default GroupInput;

GroupInput.propTypes = {
  t: PropTypes.func.isRequired,
  types: PropTypes.any.isRequired,
};
