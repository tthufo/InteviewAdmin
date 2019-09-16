import React, { Component } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import {
  FormGroup, Col, Label,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './datepicker';
import { translateWrapper } from 'ter-localization';
import { uniqBy } from 'lodash';

const customStyles = {
  control: base => ({
    ...base,
    borderColor: '#E3E7EA',
  }),
};

class Dropdown extends Component {
  constructor(props, context) {
    super(props, context);
    const {
      mapPropsToState, value, defaultValue,
    } = props;

    this.state = {
      selectedValue: (defaultValue && defaultValue.value) || value,
      options: [],
      params: mapPropsToState ? mapPropsToState(props) : undefined,
      edited: false,
      selectedOption: defaultValue,
    };
  }

  async componentWillReceiveProps(nextProps) {
    const {
      mapPropsToState, request, input_key: inputKey, formValue, value, defaultValue,
    } = nextProps;
    const { params, options } = this.state;
    if (options && !options.length) {
      await this.getOptions();
    }

    const { options: nextOption } = this.state;
    if (value) {
      if (inputKey === 'foundation_date' || inputKey === 'start_year') {
        this.setState({
          selectedOption: {
            value: formValue[inputKey],
            label: formValue[inputKey],
          },
        });
      } else {
        const option = nextOption.find(o => o.value === formValue[inputKey]);
        this.setState({ selectedOption: option || defaultValue });
      }
    }
    if (mapPropsToState && request) {
      const nextParams = mapPropsToState(nextProps);
      if (nextParams !== params) {
        const result = await request(nextProps);
        this.setState(prev => ({
          ...prev,
          options: result,
          params: nextParams,
        }), () => this.onChangeText(null));
      }
    }
  }


  onChangeText(text, actionMeta, label, indexO) {
    const {
      onChange,
      getListOptions,
      friendKeySelects,
      onChangeFriendKey,
    } = this.props;

    if (actionMeta && actionMeta.action === 'create-option') {
      this.setState(prevState => ({
        options: [...prevState.options, { value: text, label }],
      }));
    }

    if (friendKeySelects) {
      friendKeySelects.map((friendKeySelect) => {
        const listOptions = getListOptions();
        this.setState(prev => ({
          ...prev,
        }));
        const friendOptions = listOptions[friendKeySelect];
        if (friendOptions) {
          const index = friendOptions.findIndex(o => o.index === indexO);
          onChangeFriendKey(friendKeySelect, friendOptions[index].value);
        }
        return friendKeySelect;
      });
    }

    if (onChange) {
      if (label) {
        onChange(text, label);
      } else {
        onChange(text);
      }
    }

    this.setState({
      selectedValue: text,
    });
  }

  async getOptions() {
    const {
      request, formValue, custom, setListOptions,
      input_key: inputKey, value, options, ...props
    } = this.props;
    const { selectedValue } = this.state;
    if (request && !options.length) {
      const result = await request({
        ...props,
        formValue,
      });
      setListOptions(inputKey, result);
      this.setState(prev => ({
        ...prev,
        options: result,
      }), () => {
        const { options } = this.state;
        if (!options.find(option => selectedValue === option.value)
        && custom && formValue && formValue.value) {
          this.setState(prev => ({
            ...prev,
            options: [
              ...prev.options,
              {
                value: selectedValue,
                label: formValue.value,
              },
            ],
          }));
        }
      });
    }
  }

  // determineIndex(options, choice) {
  //   let index = 0;
  //   options.forEach((option, i) => {
  //     if (option.value == choice) {
  //       index = i;
  //     }
  //     console.log(option.value, choice);
  //   });
  //   return index;
  // }

  render() {
    const {
      title, validationResult, forceValidate,
      left_col: leftCol,
      right_col: rightCol,
      input_key: inputKey,
      titleLast, lastCol, custom,
      t,
      value,
      ...other
    } = this.props;

    const {
      options, selectedValue, edited, selectedOption,
    } = this.state;
    // const index = this.determineIndex(options, selectedValue);
    return (
      <FormGroup row>
        {title && (
        <Col md={leftCol} style={{ display: 'flex', alignItems: 'center' }}>
          <Label style={{ fontWeight: 'bold' }} htmlFor="name">{title}</Label>
        </Col>
        )}
        <Col md={title ? rightCol : 12}>
          { !custom
            ? (
              <Select
                // defaultValue={options[index]}
                // selectedValue={selectedValue}
                placeholder="..."
                styles={customStyles}
                className="Select-option"
                {...other}
                options={uniqBy(options, 'value')}
                onChange={(_selectedOption) => {
                  this.setState({ selectedOption: _selectedOption });
                  this.onChangeText(_selectedOption.value, '', '', _selectedOption.index);
                }}
                value={selectedOption}
              />
            )
            : (
              <CreatableSelect
                styles={customStyles}
                className="Select-option"
                {...other}
                options={options}
                onChange={(_selectedOption,
                  actionMeta) => this.onChangeText(_selectedOption.value,
                  actionMeta, _selectedOption.label, _selectedOption.index)}
                value={options.find(option => selectedValue === option.value) === undefined ? ''
                  : options.find(option => selectedValue === option.value)}
              />
            ) }
          <ValidationError
            validationResult={validationResult}
            inputKey={inputKey}
            edited={edited}
            t={t}
            forceValidate={forceValidate}
          />
        </Col>
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
    return messages.map(message => (
      <p style={{ color: 'red', marginBottom: 0 }}>{t(message)}</p>
    ));
  }

  return null;
};

export default translateWrapper('validation')(Dropdown);

Dropdown.propTypes = {
  title: PropTypes.string,
  left_col: PropTypes.number,
  right_col: PropTypes.number,
  request: PropTypes.func,
  mapPropsToState: PropTypes.func,
  onChange: PropTypes.func,
  formValue: PropTypes.object,
  value: PropTypes.number,
  input_key: PropTypes.string,
  validationResult: PropTypes.object,
  forceValidate: PropTypes.bool,
  options: PropTypes.array,
  titleLast: PropTypes.string,
  lastCol: PropTypes.number,
  custom: PropTypes.bool,
  setListOptions: PropTypes.object,
  getListOptions: PropTypes.func,
  friendKeySelects: PropTypes.string,
  onChangeFriendKey: PropTypes.func,
  t: PropTypes.func,
  defaultValue: PropTypes.object,
  specialValue: PropTypes.string,
};

Dropdown.defaultProps = {
  title: '',
  left_col: 4,
  right_col: 8,
  request: null,
  mapPropsToState: null,
  onChange: null,
  formValue: null,
  value: null,
  input_key: null,
  validationResult: null,
  forceValidate: false,
  options: [],
  titleLast: null,
  lastCol: 0,
  custom: false,
  setListOptions: null,
  getListOptions: null,
  friendKeySelects: null,
  onChangeFriendKey: null,
  t: null,
  defaultValue: null,
  specialValue: '',
};
