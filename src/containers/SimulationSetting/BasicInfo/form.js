export const forms = [{ //eslint-disable-line
  type: 'text',
  name: 'business_name',
  placeholder: 'Business Name Placeholder',
  value: 'business_name',
  label: 'Business Name',
  secondLabel: '*',
}, {
  type: 'select',
  name: 'business_type',
  value: 'business_type',
  label: 'Business type',
  options: [
    {
      value: 'it_services',
      label: 'It Service',
      disabled: false,
    },
    {
      value: 'retail',
      label: 'Retail',
      disabled: false,
    },
    {
      value: 'wholesales',
      label: 'Whole Sale',
      disabled: false,
    }, {
      value: 'trading',
      label: 'Trading',
      disabled: false,
    },
    {
      value: 'restaurant_and_bar',
      label: 'Restaurant And Bar',
      disabled: false,
    },
    {
      value: 'maker',
      label: 'Maker',
      disabled: false,
    }, {
      value: 'agriculture_or_fisher',
      label: 'Agriculture or Fisher',
      disabled: false,
    }, {
      value: 'nature_resource',
      label: 'Nature Resource',
      disabled: false,
    },
    {
      value: 'financial_service',
      label: 'Financial Service',
      disabled: false,
    },
    {
      value: 'education',
      label: 'Education',
      disabled: false,
    }, {
      value: 'health_care',
      label: 'Health Care',
      disabled: false,
    }, {
      value: 'other_service',
      label: 'Other Service',
      disabled: false,
    },
  ],
}, {
  type: 'select',
  name: 'revenue_model_type',
  value: 'revenue_model_type',
  label: 'Revenue model',
  description: 'Revenue description',
  options: [
    {
      value: 'product_sales',
      label: 'Product-Sales (Sales - Cost of goods sold = Gross Profit)',
      disabled: false,
    },
  ],
}, {
  title: 'Simulation setting',
  type: 'radio',
  label: 'Duration',
  name: 'duration',
  options: [
    {
      id: 'duration-1',
      name: 'duration',
      label: '3 years',
      value: '3',
    }, {
      id: 'duration-2',
      name: 'duration',
      label: '5 years',
      value: '5',
    },
  ],
}, {
  type: 'checkbox',
  label: '12months Simulation (1s year)',
  secondLabel: 'Coming soon',
  name: 'simulation_duration',
  options: [
    {
      id: 'sales-design-1',
      name: 'sale_design_type',
      label: 'Design manually',
      value: 'manually',
    }, {
      id: 'sales-design-2',
      name: 'sale_design_type',
      label: 'Design automaticaly',
      value: 'automaticaly',
      disabled: true,
    },
  ],
}, {
  type: 'radio',
  label: 'Sales Design',
  name: 'sale_design_type',
  options: [
    {
      id: 'sales-design-1',
      name: 'sale_design_type',
      label: 'Design manually',
      value: 'manually',
    }, {
      id: 'sales-design-2',
      name: 'sale_design_type',
      label: 'Design automaticaly',
      value: 'automaticaly',
      disabled: true,
    },
  ],
}];
