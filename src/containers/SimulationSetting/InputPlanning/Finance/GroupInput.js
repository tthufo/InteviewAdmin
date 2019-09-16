import React from 'react';
import {
  Row, Col, FormGroup, Label,
  Input,
} from 'reactstrap';

import InputComponent from '../../../../components/FormGroup/Input';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const types = t => [{ type: t('Short-term Debt'), opt: 0 }, { type: t('Long-term Debt'), opt: 1 }];

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
    const { onChangeData, onChangeCategory } = this.props;
    const inputData = { ...this.state.data };
    const val = value.target.value;

    if ((val.length <= 15) || val === '' || type === 'category') {
      inputData[type] = val;
      if (opt !== undefined) {
        const select = value.nativeEvent.target.selectedIndex;
        inputData.opt = select;
        if (inputData.opt === 0) {
          inputData.period = '';
        } else {
          inputData.period = '5';
        }
        inputData.value = '';
        onChangeCategory();
      }
      this.setState({ data: inputData }, onChangeData(inputData));
    }
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

  render() {
    // eslint-disable-next-line react/prop-types
    const {
      duration, startYear, edit, t,
      forceValidate, forceValidatePop,
      forceValidatePeriodPop, forceValidatePercentPop,
      forceValidatePercent, forceValidatePeriod,
    } = this.props;
    const { data } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col xl={4}>
            <FormGroup>
              <Label><b>{t('Debt category')}</b></Label>
              <br />
              <Input
                value={data.opt}
                type="select"
                disabled={edit !== undefined}
                onChange={e => this.onChangeValue('category', e, true)}
              >
                {
                  types(t).map(m => <option value={m.opt}>{m.type}</option>)
                }
              </Input>
            </FormGroup>
          </Col>
          <Col xl={4}>
            <FormGroup>
              <Label><b>{t('FY')}</b></Label>
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
          <Col xl={3}>
            <FormGroup>
              <Label><b>{t('Amount')}</b></Label>
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
          <Col xl={3}>
            <FormGroup>
              <Label><b>{t('Pay-back period')}</b></Label>
              <br />
              <InputComponent
                type="number_format"
                name="period"
                errors={[]}
                normal={false}
                limit={2}
                disabled={data.opt === 0}
                onChange={e => this.onChangeValue('period', e)}
                value={data.period}
              />
              { data.opt !== 0
              && (
              <ErrorMessage
                message={t('Period can not be empty')}
                edited={data.period !== '' && Number(data.period) !== 0}
                forceValidate={edit !== undefined ? forceValidatePeriodPop : forceValidatePeriod}
              />
              )}
            </FormGroup>
          </Col>
          <Col xl={2}>
            <FormGroup>
              <Label><b>{t('Interest rate')}</b></Label>
              <br />
              <InputComponent
                type="number_format"
                name="percentage"
                errors={[]}
                limit={3}
                onChange={e => this.onChangeValue('percentage', e)}
                value={data.percentage}
              />
              <ErrorMessage
                message={t('Percentage can not be empty')}
                edited={data.percentage !== ''}
                forceValidate={edit !== undefined ? forceValidatePercentPop : forceValidatePercent}
              />
              <div style={{
                position: 'absolute',
                height: 20,
                width: 20,
                top: 37,
                right: 15,
              }}
              >
                %
              </div>
            </FormGroup>
          </Col>
          <Col xl={4}>
            <FormGroup>
              <Label><b>{t('Repayment method')}</b></Label>
              <br />
              <Input
                disabled
                type="select"
              >
                <option>{t('declining balance calculation method')}</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default GroupInput;
