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
          'border-bottom': rowInfo && rowInfo.original && rowInfo.original.merge ? `1px solid ${rowInfo.original.merge}` : '1px solid transparent',
        },
      }),
    },
    {
      Header: '',
      accessor: 'header_detail',
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
    header: t('Job Grade 1'),
    header_detail: t('Total number of employee'),
    color: '#DEE7ED',
  },
  {
    header: ' ',
    header_detail: t('Unit Monthly salary'),
    color: '#cfe2f3ff',
    merge: '#E9ECEF',
  },
  {
    header: t('Job Grade 2'),
    header_detail: t('Total number of employee'),
    color: '#DEE7ED',
  },
  {
    header: ' ',
    header_detail: t('Unit Monthly salary'),
    color: '#cfe2f3ff',
    merge: '#E9ECEF',
  },
  {
    header: t('Job Grade 3'),
    header_detail: t('Total number of employee'),
    color: '#DEE7ED',
  },
  {
    header: ' ',
    header_detail: t('Unit Monthly salary'),
    color: '#cfe2f3ff',
    merge: '#E9ECEF',
  },
  {
    header: ' ',
    header_detail: t('Total Salary'),
    color: '#cfe2f3ff',
  },
]);
