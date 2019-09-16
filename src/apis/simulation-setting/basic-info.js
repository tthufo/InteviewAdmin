import axiosCallApi from '../axiosCallApi';

export const postBasicInfo = async params => axiosCallApi('/api/v1/simulations', 'post', params);
export const updateBasicInfo = async (id, params) => axiosCallApi(`/api/v1/simulations/${id}`, 'put', params);
export const getCompany = async id => axiosCallApi(`/api/v1/company/${id}`, 'get');

export default {
  postBasicInfo,
  getCompany,
  updateBasicInfo,
};
