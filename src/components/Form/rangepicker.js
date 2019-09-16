import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  FormGroup,
  Label,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import calendar from '../../assets/utils/images/calendar.png';

class Form extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      invalid: false,
    };
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.start !== '' && prevProps.end !== '') {
      const beginningTime = moment(prevProps.start);
      const endTime = moment(prevProps.end);
      this.setState({ invalid: !beginningTime.isSameOrBefore(endTime) });
    }
  }

  onChangeText(text, isStart) {
    const {
      onChangeStart, onChangeEnd,
    } = this.props;
    if (onChangeStart && onChangeEnd) {
      if (text === undefined || text === null) {
        if (isStart) {
          onChangeStart(moment().format('YYYY-MM-DD'));
        } else {
          onChangeEnd(moment().format('YYYY-MM-DD'));
        }
      } else if (text.length !== 0) {
        const text1 = text.length >= 4 ? text.subtring(0, 3) : text;
        const valid = moment(text1, 'YYYY-MM-DD', true).isValid();
        const year = moment(text1, 'YYYY').year() < 10000;
        if (isStart) {
          onChangeStart(valid && year ? moment(text1).format('YYYY-MM-DD') : moment(text.substring(0, 3)).format('YYYY-MM-DD'));
        } else {
          onChangeEnd(valid && year ? moment(text1).format('YYYY-MM-DD') : moment(text.substring(0, 3)).format('YYYY-MM-DD'));
        }
      }
    }
  }

  change() {
    const { onChange } = this.props;
    const { start, end } = this.state;
    const beginningTime = moment(start);
    const endTime = moment(end);
    this.setState({ invalid: !beginningTime.isSameOrBefore(endTime) },
      () => onChange(!beginningTime.isSameOrBefore(endTime)));
  }

  render() {
    const {
      title, validationResult, forceValidate,
      left_col: leftCol,
      right_col: rightCol,
      input_key: inputKey,
      invalidMessage, start, end,
      onChange,
      ...other
    } = this.props;
    const { invalid } = this.state;
    return (
      <FormGroup row>
        <Col md={leftCol} style={{ display: 'flex', alignItems: 'center' }}>
          <Label style={{ fontWeight: 'bold' }} htmlFor="name">{title}</Label>
        </Col>
        <Col md={rightCol}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              border: '1px solid #E3E7EA',
              height: 35,
              borderRadius: 5,
            }}
          >
            <DatePicker
              customInput={(
                <input
                  value={start}
                  style={{
                    textAlign: 'center',
                    border: '0px solid transparent',
                    width: '70%',
                    margin: '5px auto 0px 5px',
                  }}
                />
               )}
              {...other}
              selected={start}
              onSelect={() => setTimeout(() => {
                this.change();
              }, 1000)}
              placeholderText="YYYY/MM/DD"
              onClickOutside={() => this.change()}
              onKeyDown={(event) => { if (event.keyCode === 13) { this.change(); } }}
              onChange={v => this.onChangeText(v, true)}
              showYearDropdown
              showMonthDropdown
              dateFormatCalendar="MMMM"
              scrollableYearDropdown
              dateFormat="yyyy-MM-dd"
              ref={(c) => { this.calendar1 = c; }}
            />
            <h5 style={{ marginLeft: -27, fontWeight: 'bold' }}>_</h5>
            <DatePicker
              customInput={(
                <input
                  value={end}
                  style={{
                    textAlign: 'center',
                    border: '0px solid transparent',
                    width: '70%',
                    margin: '5px auto 0px 3px',
                  }}
                />
               )}
              {...other}
              selected={end}
              onSelect={() => setTimeout(() => {
                this.change();
              }, 1000)}
              placeholderText="YYYY/MM/DD"
              onClickOutside={() => this.change()}
              onKeyDown={(event) => { if (event.keyCode === 13) { this.change(); } }}
              onChange={v => this.onChangeText(v, false)}
              showYearDropdown
              showMonthDropdown
              dateFormatCalendar="MMMM"
              scrollableYearDropdown
              dateFormat="yyyy-MM-dd"
              ref={(c) => { this.calendar2 = c; }}
            />
            <img
              style={{
                width: 20,
                height: 20,
                position: 'absolute',
                top: 7,
                right: 23,
              }}
              src={calendar}
              alt="true"
            />
          </div>
          {invalid
            ? <p style={{ color: 'red', marginBottom: 0 }}>{invalidMessage}</p> : null}
        </Col>
      </FormGroup>
    );
  }
}

export default Form;
Form.propTypes = {
  t: PropTypes.func,
  onChangeStart: PropTypes.func,
  onChangeEnd: PropTypes.func,
  onChange: PropTypes.func,
  title: PropTypes.string,
  left_col: PropTypes.number,
  right_col: PropTypes.number,
  start: PropTypes.any,
  end: PropTypes.any,
  input_key: PropTypes.string,
  validationResult: PropTypes.object,
  forceValidate: PropTypes.bool,
  invalidMessage: PropTypes.string,
};

Form.defaultProps = {
  t: null,
  onChangeStart: null,
  onChangeEnd: null,
  onChange: null,
  title: null,
  left_col: 4,
  right_col: 8,
  start: null,
  end: null,
  input_key: null,
  validationResult: null,
  forceValidate: false,
  invalidMessage: null,
};
