/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import NumberFormat from 'react-number-format';
import { translateWrapper } from 'ter-localization';

const formatNumber = num => num && num.toString().split(',').join('').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

class Form extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      edited: false,
    };
    this.onChangeText = this.onChangeText.bind(this);
  }


  onChangeText(text) {
    const { onChange } = this.props;
    this.setState({ edited: true });
    const { value } = text.target;
    if (onChange) {
      if (value.trim().length === 0) {
        onChange('');
      } else {
        onChange(value);
      }
    }
  }

  onChangeFile(event) {
    const { onChangeFile } = this.props;
    this.setState({ edited: true });

    if (onChangeFile) {
      onChangeFile(event);
    }
  }

  render() {
    const {
      title, validationResult, forceValidate,
      title_right: titleRight,
      left_col: leftCol,
      right_col: rightCol,
      input_key: inputKey,
      titleLast, lastCol,
      typeInput,
      plainText, isFile,
      colType,
      fixedCharacter,
      eye,
      value,
      number,
      paddingLeftCol,
      paddingRightCol,
      t,
      paddingRight,
      defaultValue,
      autocomplete,
      onChange,
      ...other
    } = this.props;
    const { edited, isShow } = this.state;
    const formatValue = (number ? formatNumber(value) : value);
    return (
      <FormGroup
        autocomplete="off"
        row={!colType}
      >
        {title && (
        <Col md={leftCol} style={{ display: 'flex', alignItems: 'center' }}>
          <Label style={{ fontWeight: 'bold' }} htmlFor="name">{title}</Label>
        </Col>
        )}
        <Col style={{ paddingLeft: paddingLeftCol, paddingRight: paddingRightCol }} md={title ? rightCol : 12} lg={titleRight && '4'}>
          <form autoComplete={autocomplete || 'off'} action="" onSubmit={e => e.preventDefault()}>
            <div style={{ flexDirection: 'row', position: 'relative' }}>
              {number ? (
                <NumberFormat
                  style={{
                    width: '100%',
                    paddingLeft: 10,
                    height: 40,
                    borderRadius: 5,
                    border: '1px solid #ddd',
                  }}
                  thousandSeparator
                  decimalScale={2}
                  allowNegative={false}
                  onValueChange={(values) => {
                    const { value: newValue } = values;
                    this.setState({ edited: true });
                    onChange(newValue);
                  }}
                  value={value}
                  {...other}
                />
              )
                : (
                  <Input
                    style={plainText ? { borderWidth: 0, backgroundColor: 'white', paddingRight } : { paddingRight }}
                    className="form-control"
                    {...other}
                    onChange={this.onChangeText}
                    type={isShow ? null : typeInput}
                    value={formatValue}
                    autocomplete={autocomplete}
                  />
                )}
              {fixedCharacter
               && (
               <div style={{
                 position: 'absolute',
                 height: 20,
                 width: 20,
                 bottom: 10,
                 right: 10,
               }}
               >
                 {fixedCharacter}
               </div>
               )}
              {eye && (
              <img
                onClick={() => this.setState({ isShow: !isShow })}
                alt=""
                onKeyPress={() => this.setState({ isShow: !isShow })}
                style={{
                  position: 'absolute',
                  height: 20,
                  width: 20,
                  bottom: 10,
                  right: 10,
                }}
                src={isShow
                  ? require('../../assets/utils/images/eyes/view.png')
                  : require('../../assets/utils/images/eyes/hide.png')}
              />
              )}
            </div>
          </form>
          <ValidationError
            validationResult={validationResult}
            inputKey={inputKey}
            edited={edited}
            forceValidate={forceValidate}
            t={t}
          />
        </Col>
        {titleRight && (
          <Col md={leftCol} style={{ display: 'flex', alignItems: 'center' }}>
            <Label style={{ fontWeight: 'bold' }} htmlFor="name">{titleRight}</Label>
          </Col>
        )}
        {titleLast && (
          <Col md={lastCol} style={{ display: 'flex', alignItems: 'center' }}>
            <Label style={{ fontWeight: 'bold' }} htmlFor="name">{titleLast}</Label>
          </Col>
        )}
      </FormGroup>
    );
  }
}

const ValidationError = ({
  validationResult, inputKey, edited, forceValidate, t,
}) => {
  if (!edited && !forceValidate) {
    return null;
  }

  if (validationResult && validationResult.fields && validationResult.fields[inputKey]) {
    const messages = validationResult.fields[inputKey];
    const message = messages && messages[0];
    return (
      <p style={{ color: 'red', marginBottom: 0 }}>{t(message)}</p>
    );
  }

  return null;
};

export default translateWrapper('validation')(Form);
Form.propTypes = {
  t: PropTypes.func,
  onChange: PropTypes.func,
  onChangeFile: PropTypes.func,
  type: PropTypes.string,
  title: PropTypes.string,
  left_col: PropTypes.number,
  right_col: PropTypes.number,
  input_key: PropTypes.string,
  validationResult: PropTypes.object,
  forceValidate: PropTypes.bool,
  title_right: PropTypes.string.isRequired,
  titleLast: PropTypes.string,
  lastCol: PropTypes.number,
  plainText: PropTypes.bool,
  isFile: PropTypes.bool,
  colType: PropTypes.bool,
  typeInput: PropTypes.string,
  fixedCharacter: PropTypes.string,
  eye: PropTypes.string,
  value: PropTypes.string,
  number: PropTypes.string,
  paddingRight: PropTypes.number,
  paddingLeftCol: PropTypes.number,
  paddingRightCol: PropTypes.number,
  defaultValue: PropTypes.string,
  autocomplete: PropTypes.string,
};

Form.defaultProps = {
  eye: null,
  value: '',
  number: null,
  fixedCharacter: null,
  t: null,
  onChange: null,
  onChangeFile: null,
  type: null,
  title: null,
  left_col: 4,
  right_col: 8,
  input_key: null,
  validationResult: null,
  forceValidate: false,
  titleLast: null,
  lastCol: 0,
  plainText: false,
  isFile: false,
  colType: false,
  typeInput: null,
  paddingRight: null,
  paddingLeftCol: null,
  paddingRightCol: null,
  defaultValue: null,
  autocomplete: null,
};
