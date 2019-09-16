import axiosCallApi from '../axiosCallApi';

const createPastData = async (id, params) => axiosCallApi(`/api/v1/simulations/${id}/past-data`, 'post', params);

const getPastData = async id => axiosCallApi(`/api/v1/simulations/${id}/past-data`, 'get');

export default {
  createPastData,
  getPastData,
};
