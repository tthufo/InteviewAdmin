import Validation from '../../../components/Form/validation';

export default t => ({
  validators: [
    Validation.required('first_name', t('first_name')),
    Validation.required('last_name', t('last_name')),
    Validation.max('first_name', t('first_name'), 31),
    Validation.max('last_name', t('last_name'), 31),
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
      title: t('mail_adress'),
      disabled: true,
    },
    {
      type: 'select',
      input_key: 'status',
      title: t('status'),
      request: () => [{ label: 'Active', value: 'active' }, { label: 'Unverified', value: 'unverified' }, { label: 'Disabled', value: 'disabled' }],
      isDisabled: true,
    },
  ],
});
