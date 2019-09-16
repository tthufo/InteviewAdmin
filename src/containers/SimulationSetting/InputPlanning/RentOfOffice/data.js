export const setColumns = (duration, startYear) => {
  const defaultColumns = [
    {
      Header: '',
      accessor: 'header',
      eidtable: false,
      sortable: false,
      resizable: true,
      getProps: (state, rowInfo) => ({
        style: {
          'border-bottom': '1px solid #E9ECEF',
        },
      }),
    },
  ];
  for (let i = 0; i < duration; i += 1) {
    defaultColumns.push({
      Header: `${startYear + i}`,
      accessor: `${startYear + i}`,
      eidtable: true,
      sortable: false,
      resizable: true,
      getProps: (state, rowInfo) => ({
        style: {
          backgroundColor: rowInfo && rowInfo.original && rowInfo.original.color,
          'border-bottom': '1px solid #E9ECEF',
        },
      }),
    });
  }
  return defaultColumns;
};

export const setData = t => ([
  {
    header: t('Monthly Rent Fee'),
    color: '#DEE7ED',
  },
  {
    header: t('Annual Rent Fee'),
    color: '#cfe2f3ff',
  },
  {
    header: t('Invest Office furniture'),
    color: '#DEE7ED',
  },
]);
