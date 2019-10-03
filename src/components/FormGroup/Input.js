/* eslint-disable no-nested-ternary */
import React from 'react';
import { Input, CustomInput } from 'reactstrap';
import { isEqual } from 'lodash';
import NumberFormat from 'react-number-format';
import './index.scss';

class InputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.default = '';
  }

  componentDidMount() {
    const {
      value,
    } = this.props;
    this.default = (value && value.toString()) || '';
  }

  shouldComponentUpdate(nextProps) {
    const {
      value, errors, checked, options,
    } = this.props;

    const {
      value: nextValue, errors: nextErrors, checked: nextCheck, options: nextOptions,
    } = nextProps;
    if (!isEqual(nextErrors, errors)) {
      return true;
    }
    if (value !== nextValue) {
      return true;
    }
    if (checked !== undefined && nextCheck !== undefined) {
      if (checked !== nextCheck) {
        return true;
      }
    }
    if (options && nextOptions) {
      if (!isEqual(nextOptions, options)) {
        return true;
      }
    }

    return false;
  }

  findError(name) {
    const { errors } = this.props;
    const error = errors.filter(err => err.name === name);
    if (error.length > 0) {
      return {
        isError: true,
        error: error[0].message,
      };
    }
    return {
      isError: false,
      error: '',
    };
  }

  render() {
    const {
      error, type, options, normal, limit,
      name, t, value, onChange, disabled, maxHeight,
    } = this.props;
    const input_err = this.findError(name);
    const validLimit = limit === undefined ? 12 : limit;
    switch (type) {
      case 'number_format':
        return (
          <React.Fragment>
            <NumberFormat
              style={{ width: '100%', paddingRight: 25 }}
              className={input_err.isError ? 'is-invalid form-control' : 'form-control'}
              value={value}
              disabled={disabled}
              thousandSeparator={normal !== undefined ? normal : true}
              decimalScale={normal !== undefined ? 0 : 2}
              allowNegative={false}
              onPaste={(e) => {
                e.persist();
                setTimeout(() => {
                  let text = e.target.value.replace(',', '');
                  if (text.includes('.') && text.split('.')[0].length > validLimit) {
                    text = text.substring(0, validLimit);
                    this.default = text;
                    onChange({ target: { name, value: text } });
                  }
                }, 1);
              }
              }
              onValueChange={(values) => {
                const { value } = values;
                let text = value;
                if (!text.includes('.') && text.length > validLimit + (text.includes('.') ? 1 : 0)) {
                  text = text.substring(0, validLimit);
                }
                this.default = text;
                if (onChange) {
                  onChange({ target: { name, value: text } });
                }
              }}
              onKeyDown={(evt) => {
                // eslint-disable-next-line no-unused-expressions
                (!this.default.includes('.') ? this.default.length >= validLimit + (this.default.includes('-') ? 1 : 0) && evt.keyCode !== 8 && evt.keyCode !== 37 && evt.keyCode !== 39 && evt.key !== '.' && evt.preventDefault()
                  : this.default.split('.')[0].length >= validLimit + (this.default.includes('-') ? 1 : 0) && evt.target.selectionStart <= (validLimit + (limit && limit === 3 ? 0 : limit && limit === 6 ? 1 : 3) + (this.default.includes('-') ? 1 : 0)) ? evt.keyCode !== 8 && evt.keyCode !== 37 && evt.keyCode !== 39 && evt.preventDefault()
                    : this.default.length >= (validLimit + 3 + (this.default.includes('-') ? 1 : 0)) && evt.keyCode !== 8 && evt.keyCode !== 37 && evt.keyCode !== 39 && evt.preventDefault());
              }}
            />
            <div
              style={{
                display: 'block',
              }}
              className="invalid-feedback"
            >
              {input_err.isError ? input_err.error : ''}
            </div>
          </React.Fragment>
        );
      case 'text':
        return (
          <React.Fragment>
            <Input
              {...this.props}
              style={{ backgroundImage: 'none' }}
              className={input_err.isError ? 'is-invalid form-control' : ''}
            />
            <div
              style={{
                display: 'block',
              }}
              className="invalid-feedback"
            >
              {input_err.isError ? input_err.error : ''}
            </div>
          </React.Fragment>
        );
      case 'text_area':
        return (
          <React.Fragment>
            <Input
              {...this.props}
              type="textarea"
              style={{ height: maxHeight || 120, resize: 'none', backgroundImage: 'none' }}
              className={input_err.isError ? 'is-invalid form-control' : ''}
            />
            <div
              style={{
                display: 'block',
              }}
              className="invalid-feedback"
            >
              {input_err.isError ? input_err.error : ''}
            </div>
          </React.Fragment>
        );
      case 'select':
        return (
          <React.Fragment>
            <Input
              {...this.props}
            >
              {
              options && options.length > 0
              && options
                .map(option => (
                  <option
                    value={option.value}
                    disabled={option.value === '' ? false : option.disabled}
                  >
                    {option.label}
                  </option>
                ))
              }
            </Input>
          </React.Fragment>
        );
      case 'radio':
        return (
          <React.Fragment>
            <CustomInput
              style={{ color: 'orange' }}
              {...this.props}
            />
            <div
              style={{
                display: 'block',
              }}
              className="invalid-feedback"
            >
              {input_err.isError ? input_err.error : ''}
            </div>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <div style={{
              position: 'relative',
            }}
            >
              <NumberFormat
                style={{
                  width: '100%',
                  textAlign: 'right',
                  paddingRight: 15,
                  ...this.props.style,
                }}
                className={input_err.isError ? 'is-invalid form-control' : 'form-control'}
                value={value}
                disabled={disabled}
                thousandSeparator={normal !== undefined ? normal : true}
                decimalScale={normal !== undefined ? 0 : 2}
                allowNegative={false}
                onPaste={(e) => {
                  e.persist();
                  setTimeout(() => {
                    let text = e.target.value.replace(',', '');
                    if (text.includes('.') && text.split('.')[0].length > validLimit) {
                      text = text.substring(0, validLimit);
                      this.default = text;
                      onChange({ target: { name, value: text } });
                    }
                  }, 1);
                }
                }
                onValueChange={(values) => {
                  const { value } = values;
                  let text = value;
                  if (!text.includes('.') && text.length > validLimit + (text.includes('.') ? 1 : 0)) {
                    text = text.substring(0, validLimit);
                  }
                  this.default = text;
                  if (onChange) {
                    onChange({ target: { name, value: text } });
                  }
                }}
                onKeyDown={(evt) => {
                  // eslint-disable-next-line no-unused-expressions
                  (!this.default.includes('.') ? this.default.length >= validLimit + (this.default.includes('-') ? 1 : 0) && evt.keyCode !== 8 && evt.keyCode !== 37 && evt.keyCode !== 39 && evt.key !== '.' && evt.preventDefault()
                    : this.default.split('.')[0].length >= validLimit + (this.default.includes('-') ? 1 : 0) && evt.target.selectionStart <= (validLimit + (limit && limit === 3 ? 0 : limit && limit === 6 ? 1 : 3) + (this.default.includes('-') ? 1 : 0)) ? evt.keyCode !== 8 && evt.keyCode !== 37 && evt.keyCode !== 39 && evt.preventDefault()
                      : this.default.length >= (validLimit + 3 + (this.default.includes('-') ? 1 : 0)) && evt.keyCode !== 8 && evt.keyCode !== 37 && evt.keyCode !== 39 && evt.preventDefault());
                }}
              />
              {
                  name === 'cost_of_goods_sold' && (
                  <div style={{
                    position: 'absolute',
                    right: '10px',
                    top: ' 50%',
                    transform: 'translateY(-50%)',
                  }}
                  >
%
                  </div>
                  )
              }
              {
                name === 'inventory_turnover_period' && (
                  <div style={{
                    position: 'absolute',
                    left: '110%',
                    top: ' 50%',
                    transform: 'translateY(-50%)',
                    whiteSpace: 'nowrap',
                  }}
                  >
                    <b>{t('month portion')}</b>
                  </div>
                )
              }
              { (name === 'terms_of_receivable' || name === 'terms_of_payment')
                && (
                <div
                  style={{
                    position: 'absolute',
                    left: '110%',
                    top: ' 50%',
                    transform: 'translateY(-50%)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <b>{t('months')}</b>
                  {' '}
                  <span style={{
                    paddingLeft: 20,
                    fontSize: 12,
                  }}
                  >
                    {name === 'terms_of_receivable' ? t('How long will you need to make sales into cash?') : t('When will you pay for the goods?')}
                  </span>
                </div>
                )
              }
            </div>
            <div
              style={{
                display: 'block',
              }}
              className="invalid-feedback"
            >
              {input_err.isError ? input_err.error : ''}
            </div>
          </React.Fragment>
        );
    }
  }
}

export default InputComponent;
