import axiosCallApi from '../axiosCallApi';

export const createFinance = async (id, params) => axiosCallApi(`/api/v1/simulations/${id}/debts`, 'post', params);
export const getFinance = async id => axiosCallApi(`/api/v1/simulations/${id}/debts`, 'get');

export default {
  createFinance,
  getFinance,
};
