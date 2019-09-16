import Validation from '../../../components/Form/validation';

export default t => ({
  validators: [
    Validation.required('first_name', 'first_name'),
    Validation.max('first_name', t('first_name'), 31),
    Validation.required('last_name', 'last_name'),
    Validation.max('last_name', t('last_name'), 31),
    Validation.required('email', 'email'),
  ],
  elements: [
    {
      type: 'input',
      input_key: 'last_name',
      title: t('last_name'),
    },
    {
      type: 'input',
      input_key: 'first_name',
      title: t('fist_name'),
    },
    {
      type: 'input',
      input_key: 'email',
      title: t('email'),
      disabled: true,
    },
  ],
});
