import axiosCallApi from '../axiosCallApi';

export const otherExpensesData = async params => axiosCallApi(`/api/v1/simulations/${params.id}/other-expenses`, 'post', params);

export const getOtherExpensesData = async params => axiosCallApi(`/api/v1/simulations/${params.id}/other-expenses`, 'get');

export default {
  otherExpensesData,
  getOtherExpensesData,
};
