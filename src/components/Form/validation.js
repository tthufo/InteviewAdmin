import { TranslateService } from 'ter-localization';
import Isemail from 'isemail';
import _ from 'lodash';

function isEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const space = (field, title) => (data) => {
  if (data && data[field] && data[field].indexOf(' ') >= 0) {
    return {
      field,
      message: `${title} ${TranslateService.t('validation')('is_have_space', { title })}`,
    };
  }
  return true;
};

const negativeNumber = (field, title) => (data) => {
  if (data[field] < 0) {
    return {
      field,
      message: `${title} ${TranslateService.t('validation')('is_navigate_number', { title })}`,
    };
  }
  return true;
};

const required = (field, title) => (data) => {
  if (data && data[field]) {
    return true;
  }
  return {
    field,
    message: `${title} ${TranslateService.t('validation')('is_required', { title })}`,
  };
};

const confirmPassword = (field, field1) => (data) => {
  if (data[field] === data[field1]) { return true; }

  return {
    field,
    message: 'password is not match',
  };
};

const rangeLength = (field, title, range1, range2) => (data) => {
  if (data && data[field]
    && data[field].length
    && (data[field].length >= range1 && data[field].length < range2)) {
    return true;
  }
  return {
    field,
    message: TranslateService.t('validation')(`${title} is_have_range from ${range1} to ${range2 - 1}`, { title }),
  };
};

const requiredSelect = (field, title) => (data) => {
  if (data && data[field]) {
    return true;
  }
  return {
    field,
    message: `${title} ${TranslateService.t('validation')('is_required_select', { title })}`,
  };
};

const maxValue = (field, title, numberMax) => (data) => {
  if (data && data[field] && _.isNaN(+data[field])) {
    return true;
  }
  if (data && (!data[field] || (data[field] && data[field] && data[field] <= numberMax))) {
    return true;
  }
  return {
    field, message: TranslateService.t('validation')(`required_max_value ${numberMax}`, { title }),
  };
};

const rangeValue = (field, title) => (data) => {
  if (data && data[field] && _.isNaN(+data[field])) {
    return true;
  }
  if (data && (!data[field] || (data[field]
    && data[field]
    && parseFloat(data[field]) >= -999999999
    && parseFloat(data[field]) <= 999999999))) {
    return true;
  }
  return {
    field, message: TranslateService.t('validation')('required_range_value', { title }),
  };
};

const positiveValue = (field, title) => (data) => {
  if (data && (!data[field] || (data[field] && data[field] > 0))) {
    return true;
  }
  return {
    field, message: TranslateService.t('validation')('required_positive_value', { title }),
  };
};

const max = (field, title, maxLength) => (data) => {
  if (data && (!data[field]
    || (data[field] && (data[field].length <= maxLength || data[field].length === 0)))) {
    return true;
  }
  return {
    field, message: TranslateService.t('validation')(`${title} must be between 1 and ${maxLength} characters`, { title }),
  };
};

const maxNumber = (field, title, maxLength) => (data) => {
  if (data && (!data[field]
    || (data[field] && (data[field].split('.')[0].length <= maxLength || data[field].length === 0)))) {
    return true;
  }
  return {
    field, message: TranslateService.t('validation')(`${title} must be between 1 and ${maxLength} characters`, { title }),
  };
};

const number = (field, title) => (data) => {
  if (data && (!data[field] || (data[field] && !_.isNaN(+data[field])) || data[field].includes(','))) {
    return true;
  }
  return {
    field, message: TranslateService.t('validation')(`${title} must be number, please try again`, { title }),
  };
};

const numberPositive = (field, title, zeroAllowed) => (data) => {
  if (!zeroAllowed) {
    if (data && (!data[field]
     || (parseFloat(data[field]) > 0 && parseFloat(data[field]) <= 1000000000
     && data[field] && !_.isNaN(+data[field])))) {
      return true;
    }
  } else if (data && (!data[field]
    || (parseFloat(data[field]) >= 0 && parseFloat(data[field]) <= 1000000000
    && data[field] && !_.isNaN(+data[field])))) {
    return true;
  }

  return {
    field, message: TranslateService.t('validation')(`${title} ${parseFloat(data[field]) >= 1000000000 ? 'must not be greater than 1000000000' : 'is invalid'}, please try again`, { title }),
  };
};

const email = (field, title) => (data) => {
  if (data && (!data[field]
    || (Isemail.validate(data[field])
     && isEmail(data[field])
     && data[field].length <= 255))) {
    return true;
  }

  return {
    field,
    message: TranslateService.t('validation')('is_email', { title }),
  };
};

const shop = (field, title) => (data) => {
  if (data && (!data[field] || (String(data[field]).length <= 255))) {
    return true;
  }

  return {
    field,
    message: TranslateService.t('validation')('is_shop', { title }),
  };
};

const phone = (field, title) => (data) => {
  if (data && (!data[field] || (/^\d+$/.test(data[field]) && !data[field].match(/[a-z]/i) && data[field].length <= 16))) {
    return true;
  }

  return {
    field,
    message: TranslateService.t('validation')('is_phone', { title }),
  };
};

const password = (field, title) => (data) => {
  if (data && (!data[field] || (!data[field].match(/ /) && data[field].length >= 6 && data[field].length <= 32))) {
    return true;
  }

  return {
    field,
    message: TranslateService.t('validation')('is_password', { title }),
  };
};

const validate = validators => (data) => {
  const totalResult = validators
    .map(validator => validator(data))
    .filter(result => result !== true);
  const fieldsValidation = totalResult.reduce((total, current) => {
    if (!total[current.field]) {
      return {
        ...total,
        [current.field]: [current.message],
      };
    }

    return {
      ...total,
      [current.field]: [
        ...total[current.field],
        current.message,
      ],
    };
  }, {});

  return {
    fields: fieldsValidation,
    total: totalResult,
  };
};

const isValidated = validators => data => validate(validators)(data).total.length === 0;

const Validator = {
  required,
  validate,
  isValidated,
  email,
  shop,
  positiveValue,
  phone,
  password,
  max,
  number,
  requiredSelect,
  maxValue,
  rangeValue,
  numberPositive,
  rangeLength,
  confirmPassword,
  space,
  negativeNumber,
  maxNumber,
};

export default Validator;
