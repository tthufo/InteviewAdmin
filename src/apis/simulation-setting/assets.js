import axiosCallApi from '../axiosCallApi';

export const createAssets = async (id, params) => axiosCallApi(`/api/v1/simulations/${id}/assets`, 'post', params);
export const getAssets = async id => axiosCallApi(`/api/v1/simulations/${id}/assets`, 'get');
export const getCategory = async () => axiosCallApi('/api/v1/assets', 'get');

export default {
  createAssets,
  getAssets,
  getCategory,
};
