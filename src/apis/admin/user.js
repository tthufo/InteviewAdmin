import axiosCallApi from '../axiosCallApiAdmin';

const get = async id => axiosCallApi(`/api/admin_jwt/users/${id}`, 'get');
const set = async (id, params) => axiosCallApi(`/api/admin_jwt/users/${id}`, 'post', params);

export default {
  get,
  set,
};
