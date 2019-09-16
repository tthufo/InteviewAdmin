
import Validation from '../../components/Form/validation';

const template = t => ({
  validators: [
    Validation.required('password', 'password'),
    Validation.required('password_confirmation', 'password_confirmation'),
    Validation.rangeLength('password', 'password', 6, 33),
    Validation.rangeLength('password_confirmation', 'password_confirmation', 6, 33),
    Validation.confirmPassword('password_confirmation', 'password'),
    Validation.space('password', 'password'),
    Validation.space('password_confirmation', 'password_confirmation'),
  ],
  elements: [
    {
      type: 'input',
      input_key: 'password',
      colType: true,
      left_col: 12,
      right_col: 12,
      placeholder: t('New Password'),
      title: t('New Password'),
      col: 6,
      paddingRight: 30,
      typeInput: 'password',
      eye: true,
      paddingLeftCol: 5,
      paddingRightCol: 5,
      autocomplete: 'off',
    },
    {
      type: 'input',
      input_key: 'password_confirmation',
      colType: true,
      left_col: 12,
      paddingRight: 30,
      right_col: 12,
      placeholder: t('password_confirmation'),
      title: t('password_confirmation'),
      typeInput: 'password',
      eye: true,
      col: 6,
      paddingLeftCol: 5,
      paddingRightCol: 5,
      autocomplete: 'off',
    },
  ],
});

export default template;
