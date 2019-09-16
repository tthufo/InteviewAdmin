export const options = t => [
  {
    value: '',
    label: '',
    disabled: false,
  },
  {
    value: '1',
    label: t('Marketing & Advertisement'),
    disabled: false,
  }, {
    value: '2',
    label: t('Travel/Transportation'),
    disabled: false,
  }, {
    value: '3',
    label: t('Professional Fees'),
    disabled: false,
  },
  {
    value: '4',
    label: t('R&D'),
    disabled: false,
  },
  {
    value: '5',
    label: t('Communication'),
    disabled: false,
  },
  {
    value: '6',
    label: t('Entertainment'),
    disabled: false,
  },
  {
    value: '7',
    label: t('Utilities'),
    disabled: false,
  },
  {
    value: '8',
    label: t('Office Supplies'),
    disabled: false,
  },
];


export const forms = t => ([{
  type: 'select',
  name: 'biggest_expenses_1',
  value: 'biggest_expenses_1',
  label: 'Biggest expenses 1',
  grid: {
    lg: 4,
  },
  options: options(t),
}, {
  type: 'select',
  name: 'biggest_expenses_2',
  value: 'biggest_expenses_2',
  label: 'Biggest expenses 2',
  grid: {
    lg: 4,
  },
  options: options(t),
}, {
  type: 'select',
  name: 'biggest_expenses_3',
  value: 'biggest_expenses_3',
  label: 'Biggest expenses ',
  grid: {
    lg: 4,
  },
  options: options(t),
}]);
