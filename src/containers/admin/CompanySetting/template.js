import Validation from '../../../components/Form/validation';
import API from '../../../apis/admin';

export default t => ({
  validators: [
    Validation.required('name', 'name'),
    Validation.max('name', 'name', 255),
    Validation.requiredSelect('representatives', 'representatives'),
    Validation.max('representatives', 'representatives', 255),
    Validation.required('capital_amount', 'capital_amount'),
    Validation.max('head_office_address', 'head_office_address', 255),
    Validation.requiredSelect('language', 'language'),
    Validation.requiredSelect('currency_code', 'currency_code'),
    Validation.maxNumber('capital_amount', 'capital_amount', 12),
    Validation.negativeNumber('capital_reserve_ratio', 'capital_reserve_ratio'),
    Validation.maxValue('capital_reserve_ratio', 'capital_reserve_ratio', 100),
    Validation.space('capital_amount', 'capital_amount'),
  ],
  elements: [
    {
      type: 'title',
      title: `${t('input-company-profile')}`,
    },
    {
      type: 'input',
      input_key: 'name',
      title: `${t('name')} *`,
    },
    {
      type: 'input',
      input_key: 'representatives',
      title: `${t('representatives')} *`,
    },
    {
      defaultValue: { label: t('Japan'), value: 'JP' },
      type: 'select',
      input_key: 'country_code',
      title: `${t('country_code')} *`,
      friendKeySelects: ['tax_rate_id'],
      request: async () => {
        const result = await API.company.dropdownList();
        return (result
          && result.data
          && result.data.locations.map((l, index) => ({ label: l.name, value: l.value, index })));
      },
    },
    {
      type: 'input',
      input_key: 'head_office_address',
      title: `${t('head_office_address')}`,
    },
    {
      type: 'select',
      input_key: 'foundation_date',
      specialValue: true,
      title: `${t('foundation_date')} *`,
      defaultValue: { label: new Date().getFullYear(), value: new Date().getFullYear() },
      request: () => {
        const currentYear = new Date().getFullYear();
        const arr = [];
        for (let i = currentYear - 100; i < currentYear + 100; i += 1) {
          arr.push({ label: i, value: i });
        }
        return arr;
      },
    },
    {
      type: 'input',
      input_key: 'capital_amount',
      title: `${t('capital_amount')} *`,
      number: true,
    },
    {
      title: `${t('start_year')}*`,
      defaultValue: { label: new Date().getFullYear(), value: new Date().getFullYear() },
      specialValue: true,
      type: 'select',
      input_key: 'start_year',
      request: () => {
        const currentYear = new Date().getFullYear();
        const arr = [];
        for (let i = currentYear - 100; i < currentYear + 100; i += 1) {
          arr.push({ label: i, value: i });
        }
        return arr;
      },
    },
    {
      defaultValue: { value: '12', label: 'December' },
      type: 'select',
      input_key: 'financial_year_end_month',
      title: `${t('financial_year_end_month')} *`,
      request: () => [
        { label: t('January'), value: '1' },
        { label: t('February'), value: '2' },
        { label: t('March'), value: '3' },
        { label: t('April'), value: '4' },
        { label: t('May'), value: '5' },
        { label: t('June'), value: '6' },
        { label: t('July'), value: '7' },
        { label: t('August'), value: '8' },
        { label: t('September'), value: '9' },
        { label: t('October'), value: '10' },
        { label: t('November'), value: '11' },
        { label: t('December'), value: '12' },
      ],
    },
    {
      type: 'title',
      title: t('input-company-setting'),
    },
    {
      type: 'select',
      input_key: 'language',
      defaultValue: { label: '日本語', value: 'ja' },
      title: `${t('language')} *`,
      request: async () => {
        try {
          const result = await API.company.dropdownList();
          return result.data.languages.map(l => ({ label: l.value, value: l.name }));
        } catch (error) {
          return [];
        }
      },
    },
    {
      defaultValue: { label: 'JPY', value: 'JPY' },
      type: 'select',
      isDisabled: true,
      input_key: 'currency_code',
      title: `${t('currency_code')} *`,
      request: async () => {
        try {
          const result = await API.company.dropdownList();
          return result.data.currencies.map((l, index) => ({ label: l.name, value: l.value, index }));
        } catch (error) {
          return [];
        }
      },
    },
    {
      defaultValue: { label: 'Normal', value: 'normal' },
      type: 'select',
      input_key: 'display_amount_type',
      title: `${t('display_amount_type')} *`,
      request: () => [
        { label: t('Normal'), value: 'normal' },
        { label: t('Thousand'), value: 'thousand' },
        { label: t('Million'), value: 'million' },
      ],
    },
    {
      type: 'select',
      input_key: 'tax_rate_id',
      defaultValue: { label: 'Japan (34.60%)', value: 1 },
      title: `${t('tax_rate_id')} *`,
      request: async () => {
        try {
          const result = await API.company.taxRates();
          return result.data.items.map((l, index) => ({ label: l.name, value: l.id, index }));
        } catch (error) {
          return [];
        }
      },
    },
    {
      type: 'select',
      input_key: 'tax_ross_carry_limit',
      title: t('tax_ross_carry_limit'),
      defaultValue: { label: `${t('10 year')}`, value: 10 },
      isDisabled: true,
    },
    {
      type: 'input',
      input_key: 'capital_reserve_ratio',
      title: t('capital_reserve_ratio'),
      fixedCharacter: '%',
      typeInput: 'number',
      max: 100,
      min: 0,
      paddingRight: 40,
      defaultValue: 50,
    },
  ],
});
