export const row = [
  { //eslint-disable-line
    type: 'number',
    name: 'product_unit_price',
    placeholder: '',
    value: 'product_unit_price',
    label: 'Products / Service Unit Price',
    grid: {
      lg: 4,
    },
    isOneRow: true,
  }, {
    type: 'number',
    name: 'cost_of_goods_sold',
    value: 'cost_of_goods_sold',
    label: 'Cost of goods sold',
    limit: 3,
    grid: {
      lg: 3,
    },
    isOneRow: true,
  }, {
    type: 'number',
    name: 'inventory_turnover_period',
    value: 'inventory_turnover_period',
    label: 'Inventory',
    limit: 6,
    grid: {
      lg: 3,
    },
    isOneRow: true,
  },
];

export const forms = [{
  type: 'number',
  label: 'Terms of Receivable (Average)',
  name: 'terms_of_receivable',
  value: 'terms_of_receivable',
  limit: 6,
  grid: {
    lg: 4,
  },
}, {
  type: 'number',
  label: 'Terms of Payment (Average)',
  name: 'terms_of_payment',
  value: 'terms_of_payment',
  limit: 6,
  grid: {
    lg: 4,
  },
}];
