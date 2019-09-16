import axiosCallApi from '../axiosCallApiAdmin';

const getUsers = async params => axiosCallApi('/api/admin_jwt/users', 'get', params);
const resetPassword = async id => axiosCallApi(`/api/admin_jwt/users/${id}/forgot-password`, 'post');
const active = async id => axiosCallApi(`/api/admin_jwt/users/${id}/active`, 'post');
const deActive = async id => axiosCallApi(`/api/admin_jwt/users/${id}/active`, 'delete');

export default {
  resetPassword,
  active,
  deActive,
  getUsers,
};
