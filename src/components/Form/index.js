import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form } from 'reactstrap';
import Input from './input';
import Dropdown from './dropdown';
import DatePicker from './datepicker';
import './datepicker.css';

class CustomForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: props.value,
    };
    this.listOptions = {};
    this.setListOptions = this.setListOptions.bind(this);
    this.getListOptions = this.getListOptions.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prev => ({
      ...prev,
      value: {
        ...prev.value,
        ...nextProps.value,
      },
    }));
  }

  onChange(key, value, label) {
    if (key) {
      this.setState(prev => ({
        value: {
          ...prev.value,
          [key]: value,
        },
      }));

      const { onChange } = this.props;
      if (onChange) {
        if (label) {
          onChange(key, value, label);
        } else {
          onChange(key, value);
        }
      }
    }
  }

  setListOptions(inputKey, options) {
    this.listOptions[inputKey] = options;
  }

  getListOptions() {
    return this.listOptions;
  }

  render() {
    const { template: { elements }, validationResult, forceValidate } = this.props;
    const { value } = this.state;
    return (
      <Form>
        <Row>
          {elements.map((element) => {
            switch (element.type) {
              case 'title':
                return (
                  <h5 style={{ marginLeft: 15 }} className="modal-title">
                    <h4 className="mt-2">
                      <div style={{ color: '#1D3B6C' }}>{element.title}</div>
                    </h4>
                  </h5>
                );
              case 'select':
                return (
                  <Col xs={element.col || 12} key={element.input_key}>
                    <Dropdown
                      {...this.props}
                      {...element}
                      value={value[element.input_key]}
                      formValue={value}
                      onChangeFriendKey={(key, text) => this.onChange(key, text)}
                      onChange={(text, label) => this.onChange(element.input_key, text, label)}
                      validationResult={validationResult}
                      forceValidate={forceValidate}
                      setListOptions={this.setListOptions}
                      getListOptions={this.getListOptions}
                    />
                  </Col>
                );
              case 'datepicker':
                return (
                  <Col xs={element.col || 12} key={element.input_key}>
                    <DatePicker
                      {...this.props}
                      {...element}
                      value={value[element.input_key]}
                      formValue={value}
                      onChange={text => this.onChange(element.input_key, text)}
                      validationResult={validationResult}
                      forceValidate={forceValidate}
                    />
                  </Col>
                );

              case 'textarea':
                return (
                  <Col xs={element.col || 12} key={element.input_key}>
                    <Input
                      {...this.props}
                      {...element}
                      type="textarea"
                      rows="5"
                      style={{ resize: 'none' }}
                      value={value[element.input_key]}
                      onChange={text => this.onChange(element.input_key, text)}
                      validationResult={validationResult}
                      forceValidate={forceValidate}
                    />
                  </Col>
                );

              case 'file':
                return (
                  <Col xs={element.col || 12} key={element.input_key}>
                    <Input
                      {...this.props}
                      {...element}
                      type="file"
                      accept=".png,.jpg"
                      onChangeFile={this.onImageChange}
                      validationResult={validationResult}
                      forceValidate={forceValidate}
                    />
                  </Col>
                );
              default:
                return (
                  <Col xs={element.col || 12} key={element.input_key}>
                    <Input
                      {...this.props}
                      {...element}
                      value={value[element.input_key]}
                      onChange={text => this.onChange(element.input_key, text)}
                      validationResult={validationResult}
                      forceValidate={forceValidate}
                    />
                  </Col>
                );
            }
          })}
        </Row>
      </Form>
    );
  }
}

export default CustomForm;


CustomForm.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  template: PropTypes.object,
  validationResult: PropTypes.object,
  forceValidate: PropTypes.object,
};

CustomForm.defaultProps = {
  onChange: () => {},
  value: '',
  template: null,
  validationResult: null,
  forceValidate: false,
};
