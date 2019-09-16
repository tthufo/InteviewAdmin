export const setCompany = company => ({
  type: 'SET_COMPANY_INFO',
  value: company,
});

export const setSimulation = simulation => ({
  type: 'SET_SIMULATION',
  value: simulation,
});

export const deleteSimulation = () => ({
  type: 'DELETE_SIMULATION',
});

export const deleteCompany = () => ({
  type: 'DELETE_COMPANY',
});

export const changeRoute = value => ({
  type: 'ROUTE_CHANGED',
  value,
});
